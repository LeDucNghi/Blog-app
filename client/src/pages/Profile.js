import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    handleFetchUsers();
  }, [userId]);

  const handleFetchUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/auth/profile/${userId}`
      );
      console.log(
        "🚀 ~ file: Profile.js:16 ~ handleFetchUsers ~ res",
        res.data
      );
      setUserProfile(res.data);
    } catch (error) {
      console.log("🚀 ~ file: Profile.js:15 ~ handleFetchUsers ~ error", error);
    }
  };

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        username :
        {userProfile && userProfile.profile
          ? userProfile.profile.username
          : "Cant find any name as you want 😢"}{" "}
      </div>
      <div className="listOfPost">
        {userProfile &&
          userProfile.posts &&
          userProfile.posts.length !== 0 &&
          userProfile.posts.map((posts, key) => {
            return (
              <div className="post" key={key}>
                <div className="title">{posts.title}</div>
                <div
                  className="body"
                  onClick={() => navigate(`/post/${posts.userId}`)}
                >
                  {posts.postText}
                </div>
                <div className="footer">
                  <div
                    className="username"
                    onClick={() => navigate(`/profile/${posts.id}`)}
                  >
                    {posts.username}{" "}
                  </div>

                  <div className="buttons">
                    {/* {likedPosts.includes(items.id) ? (
                <FavoriteIcon
                  // className={
                  //   likedPosts.includes(items.id) ? "unlikeBttn" : "likeBttn"
                  // }
                  className="unlikeBttn"
                  onClick={() => handleLikePost(items.id)}
                />
              ) : (
                <FavoriteBorderIcon
                  className="unlikeBttn"
                  onClick={() => handleLikePost(items.id)}
                />
              )} */}
                    {/* <label htmlFor="">{posts.Likes.length} </label> */}
                  </div>

                  {/* {auth.username === items.username && (
              <button onClick={() => handleDeletePost(items.id)}>
                {" "}
                Delete{" "}
              </button>
            )} */}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Profile;
