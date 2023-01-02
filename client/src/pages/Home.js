import { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    handleFetchPosts();
  }, []);

  const handleFetchPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/posts`);

      await setPostsList(res.data);
    } catch (error) {
      console.log("🚀 ~ file: App.js:19 ~ handleFetchPosts ~ error", error);
    }
  };

  return (
    <div className="App">
      {postsList.map((items, key) => {
        return (
          <div
            className="post"
            key={key}
            onClick={() => navigate(`/post/${items.id}`)}
          >
            <div className="title">{items.title}</div>
            <div className="body">{items.postText}</div>
            <div className="footer">{items.username}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
