import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";

function Post() {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);

  const [comment, setComment] = useState("");
  const [postDetail, setPostDetail] = useState(null);
  const [postComments, setPostComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const config = {
    headers: {
      accessToken: localStorage.getItem("accessToken"),
    },
  };

  useEffect(() => {
    handleFetchDetailPost();
  }, [id]);

  const handleFetchDetailPost = async () => {
    let time;
    setIsLoading(true);
    try {
      const postDetailRes = await axios.get(
        `http://localhost:3001/posts/byId/${id}`
      );
      const commentRes = await axios.get(
        `http://localhost:3001/comments/${id}`
      );

      clearTimeout(time);
      time = setTimeout(() => {
        setIsLoading(false);

        setPostDetail(postDetailRes.data);
        setPostComments(commentRes.data);
      }, 500);
    } catch (error) {
      console.log("🚀 ~ file: App.js:19 ~ handleFetchPosts ~ error", error);
    }
  };

  const handlePostComments = async () => {
    const body = {
      commentBody: comment,
      PostId: id,
    };
    try {
      const res = await axios.post(
        "http://localhost:3001/comments",
        body,
        config
      );
      if (res.data.error) {
        alert(res.data.error);
      } else {
        console.log("post success🥳");

        const newCommentsList = await [
          { ...body, username: res.data.username },
          ...postComments,
        ];

        await setPostComments(newCommentsList);
        await setComment("");
      }
    } catch (error) {
      console.log("🚀 ~ file: Post.js:50 ~ handlePostComments ~ error", error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/comments/${id}`,
        config
      );
      console.log("🚀 ~ file: Post.js:76 ~ handleDeleteComment ~ res", res);
      if (res.data.error) console.log("something went wrong!");
      else {
        // const index = await postComments.findIndex((el) => el.id === id);

        // const newCommentsList = await postComments.splice(index, 1);
        // await setPostComments(newCommentsList);
        setPostComments(
          postComments.filter((el) => {
            return el.id !== id;
          })
        );
        console.log("delete success");
      }
    } catch (error) {
      console.log("🚀 ~ file: Post.js:76 ~ handleDeleteComment ~ error", error);
    }
  };

  const handleEditPost = async (options) => {
    console.log(
      "🚀 ~ file: Post.js:105 ~ handleEditPost ~ auth.id",
      auth.id,
      postDetail.UserId
    );
    if (auth.id === postDetail.UserId) {
      let newContent;
      if (options === "title") {
        newContent = await prompt("Enter new title: ");
      } else {
        newContent = await prompt("Enter new Text: ");
      }
      const body = await {
        options: options,
        content: newContent,
      };
      try {
        const res = await axios.put(
          `http://localhost:3001/posts/${id}`,
          body,
          config
        );
        if (res.status === 200) {
          if (options === "title") {
            setPostDetail({ ...postDetail, title: newContent });
          } else {
            setPostDetail({ ...postDetail, postText: newContent });
          }
        }
      } catch (error) {
        console.log("🚀 ~ file: Post.js:122 ~ handleEditPost ~ error", error);
      }
    } else alert("You are not the author so can not edit this page😢");
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      {postDetail && (
        <div className="postPage">
          <div className="leftSide">
            <div className="post" id="individual">
              <div className="title" onClick={() => handleEditPost("title")}>
                {postDetail.title}
              </div>
              <div className="body" onClick={() => handleEditPost("body")}>
                {postDetail.postText}
              </div>
              <div className="footer">{postDetail.username}</div>
            </div>
          </div>
          <div className="rightSide">
            <div className="addCommentContainer">
              <input
                type="text"
                name="add comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comment ..."
                autoComplete="off"
              />
              <button
                disabled={!comment ? true : false}
                onClick={handlePostComments}
              >
                Add comment
              </button>
            </div>
            <div className="listOfComments">
              {postComments.map((comments, key) => {
                return (
                  <div key={key} className="comment">
                    {comments.commentBody} -{" "}
                    <label htmlFor="">By : {comments.username} </label>
                    {auth.username === comments.username && (
                      <button onClick={() => handleDeleteComment(comments.id)}>
                        X
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Post;
