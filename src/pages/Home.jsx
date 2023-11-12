import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { fetchComments } from "../redux/slices/comments";
export const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.user.data);
  const [sort, setSort] = React.useState(0);
  const { posts, tags, initialTag } = useSelector((state) => state.posts);
  const dataofC = useSelector((state) => state.comments);
  const isPostLoading = posts.status === "loading";

  const isTagsLoading = tags.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPosts(initialTag.tag));
    dispatch(fetchTags());
    dispatch(fetchComments());
  }, [initialTag]);
  console.log(dataofC.comments);
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={sort}
        aria-label="basic tabs example"
      >
        <Tab onClick={() => setSort(0)} label="Новые" />
        <Tab onClick={() => setSort(1)} label="Популярные" />
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
                  obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={data?._id === obj.user._id}
                us_id={data?._id}
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
