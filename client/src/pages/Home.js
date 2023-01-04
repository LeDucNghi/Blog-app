import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../helpers/AuthContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotFound from "../components/NotFound";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const accessToken = localStorage.getItem("accessToken");

  const [postsList, setPostsList] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    handleFetchPosts();
  }, []);

  const handleFetchPosts = async () => {
    if (!auth.isLogged || !accessToken) navigate(`/login`);
    else {
      const config = {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      };
      try {
        const res = await axios.get(`http://localhost:3001/posts`, config);

        console.log("🚀 ~ file: Home.js:33 ~ handleFetchPosts ~ res", res.data);
        await setPostsList(res.data.listOfPosts);
        await setLikedPosts(
          res.data.likedPosts.map((liked) => {
            return liked.PostId;
          })
        );
      } catch (error) {
        console.log("🚀 ~ file: App.js:19 ~ handleFetchPosts ~ error", error);
      }
    }
  };

  const handleLikePost = async (id) => {
    const config = {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    };

    const body = {
      PostId: id,
    };
    try {
      const res = await axios.post(`http://localhost:3001/like`, body, config);

      setPostsList(
        postsList.map((el) => {
          if (el.id === id) {
            // setIsLiked(true);
            if (res.data.liked) {
              // setIsLiked()
              return { ...el, Likes: [...el.Likes, 0] };
            } else {
              const unlikeList = el.Likes;
              unlikeList.pop();
              return { ...el, Likes: unlikeList };
            }
          } else {
            return el;
          }
        })
      );

      if (postsList.includes(id)) {
        setLikedPosts(likedPosts.filter((el) => el.id !== id));
      } else setLikedPosts([...likedPosts, id]);
    } catch (error) {
      console.log("🚀 ~ file: Home.js:29 ~ handleLikePost ~ error", error);
    }
  };

  const handleDeletePost = async (id) => {
    const config = {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    };
    try {
      const res = await axios.delete(
        `http://localhost:3001/posts/${id}`,
        config
      );
      if (!res.data.error) {
        setPostsList(postsList.filter((el) => el.id !== id));
      } else console.log("something went wrong 😢");
    } catch (error) {
      console.log("🚀 ~ file: Home.js:95 ~ handleDeletePost ~ error", error);
    }
  };

  return (
    <div className="App">
      {postsList.map((items, key) => {
        return (
          <div className="post" key={key}>
            <div className="title">{items.title}</div>
            <div
              className="body"
              onClick={() => navigate(`/post/${items.userId}`)}
            >
              {items.postText}
            </div>
            <div className="footer">
              <div
                className="username"
                onClick={() => navigate(`/profile/${items.id}`)}
              >
                {items.username}{" "}
              </div>

              <div className="buttons">
                {likedPosts.includes(items.id) ? (
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
                )}
                <label htmlFor="">{items.Likes.length} </label>
              </div>

              {auth.username === items.username && (
                <button onClick={() => handleDeletePost(items.id)}>
                  {" "}
                  Delete{" "}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
