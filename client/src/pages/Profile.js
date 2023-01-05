import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../helpers/AuthContext";
import NotFound from "../components/NotFound";
import axios from "axios";

function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    handleFetchUsers();
  }, [userId]);

  const handleFetchUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/auth/profile/${userId}`
      );

      await setUserProfile(res.data);
    } catch (error) {
      console.log("🚀 ~ file: Profile.js:15 ~ handleFetchUsers ~ error", error);
    }
  };

  return (
    <div className="profilePageContainer">
      {userProfile ? (
        <>
          <div className="basicInfo">
            <h1>username :{userProfile.profile.username}</h1>
            {auth.username === userProfile.profile.username && (
              <button onClick={() => navigate(`/changepassword`)}>
                Change my password
              </button>
            )}
          </div>
          <div className="listOfPost">
            {userProfile.posts.map((posts, key) => {
              return (
                <div className="post" key={key}>
                  <div className="title">{posts.title}</div>
                  <div
                    className="body"
                    onClick={() => navigate(`/post/${posts.id}`)}
                  >
                    {posts.postText}
                  </div>
                  <div className="footer">
                    <div
                      className="username"
                      onClick={() => navigate(`/profile/${posts.UserId}`)}
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
                      <label htmlFor="">{posts.Likes.length} </label>
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
        </>
      ) : (
        <NotFound title="Cannot find your person you want😢 Please try again!" />
      )}
    </div>
  );
}

export default Profile;
