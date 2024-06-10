import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import {
  fetchPosts,
  fetchTags,
  fetchRemovePosts,
  setSortBy,
} from "../redux/slices/posts";
import { fetchLastComments } from "../redux/slices/comments";

export const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.user.data);
  const [sort, setSort] = React.useState(0);
  const { posts, tags, initialTag, sorting } = useSelector(
    (state) => state.posts
  );
  const dataofC = useSelector((state) => state.comments.lastComments);
  const isPostLoading = posts.status === "loading";
  const [isDeliting, setIsDeleting] = React.useState(false);
  const isTagsLoading = tags.status === "loading";
  const onClickRemove = (_id) => {
    if (window.confirm("really?")) {
      setIsDeleting(true);
      dispatch(fetchRemovePosts(_id));
    }
  };

  React.useEffect(() => {
    dispatch(fetchPosts({ tag: initialTag.tag, sortBy: sorting }));
    dispatch(fetchTags());
    dispatch(fetchLastComments());
    setIsDeleting(false);
  }, [initialTag, isDeliting, sorting]);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={sort}
        aria-label="basic tabs example"
      >
        <Tab
          onClick={() => {
            dispatch(setSortBy("Новые"));
            setSort(0);
          }}
          label="Новые"
        />
        <Tab
          onClick={() => {
            dispatch(setSortBy("Популярные"));
            setSort(1);
          }}
          label="Популярные"
        />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                _id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl
                    ? `https://back-blog-5ns0.onrender.com${obj.imageUrl}`
                    : ""
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.commentary}
                tags={obj.tags}
                isEditable={
                  data?._id === obj.user._id || data?.role === "admin"
                }
                us_id={data?._id}
                onClickRemove={onClickRemove}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={dataofC.comments}
            dataAuth={data}
            fromHome={true}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
