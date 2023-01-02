import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

function Post() {
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleFetchDetailPost();
  }, [id]);

  const handleFetchDetailPost = async () => {
    let time;
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:3001/posts/byId/${id}`);

      clearTimeout(time);
      time = setTimeout(() => {
        setIsLoading(false);

        setPostDetail(res.data);
      }, 500);
    } catch (error) {
      console.log("🚀 ~ file: App.js:19 ~ handleFetchPosts ~ error", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      {postDetail && (
        <div className="postPage">
          <div className="leftSide">
            <div className="post" id="individual">
              <div className="title">{postDetail.title}</div>
              <div className="body">{postDetail.postText}</div>
              <div className="footer">{postDetail.username}</div>
            </div>
          </div>
          <div className="rightSide">Comment Section</div>
        </div>
      )}
    </>
  );
}

export default Post;
