import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useSelector } from "react-redux";
export const FullPost = () => {
  const { id } = useParams();
  const dataAuth = useSelector((state) => state.auth.user.data);
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [commetData, setCommmentData] = React.useState();
  const onSubmit = async (text) => {
    const data = await axios.post(`/posts/${id}`, { text });
    setCommmentData(data);
  };

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
  }, [commetData]);
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
        items={data.commentary}
        dataAuth={dataAuth}
        isLoading={false}
      >
        <Index id={id} addComment={onSubmit} />
      </CommentsBlock>
    </>
  );
};
