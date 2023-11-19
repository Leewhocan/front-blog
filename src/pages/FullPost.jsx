import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDeleteComment,
  fetchCommentsForPost,
  fetchPostComment,
} from "../redux/slices/comments";
export const FullPost = () => {
  const { id } = useParams();
  const dataAuth = useSelector((state) => state.auth.user.data);
  const commentData = useSelector((state) => state.comments.allComments);
  const [data, setData] = React.useState();
  const [isUpdateOnComment, setIsUpdateOnComment] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const dispatch = useDispatch();
  const onSubmit = async (text) => {
    dispatch(fetchPostComment({ id: id, text: text }));
    setIsUpdateOnComment(true);
  };

  const onClickDelete = async (commentId) => {
    dispatch(fetchDeleteComment({ postId: id, commentId: commentId }));
    setIsUpdateOnComment(true);
  };

  React.useEffect(() => {
    dispatch(fetchCommentsForPost(id));

    setIsUpdateOnComment(false);
  }, [isUpdateOnComment]);

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }, []);
  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={`http://localhost:4444${data.imageUrl}`}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p>
          <ReactMarkdown children={data.text} />
        </p>
      </Post>
      <CommentsBlock
        onClickDelete={onClickDelete}
        items={commentData.commentary}
        dataAuth={dataAuth}
        isLoading={false}
      >
        <Index id={id} addComment={onSubmit} />
      </CommentsBlock>
    </>
  );
};
