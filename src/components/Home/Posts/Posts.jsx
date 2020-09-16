/******* third party packages*******/
import { useEffect } from "react";
import React from "react";

/******* created components*******/
import Post from "./post/Post";
import { useDataLayer } from "../../../services/DataLayer";
import { db } from "../../../services/firebase";

/******* styles*******/
import "./Posts.css";

function Posts(props) {
  const [{ posts }, dispatch] = useDataLayer();

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }));
        dispatch({ type: "SET_POSTS", data });
      });
  }, []);

  return (
    <div className="posts">
      {posts.map(({ id, post }) => (
        <Post
          key={id}
          postId={id}
          imageUrl={post.imageUrl}
          caption={post.caption}
          postUsername={post.username}
        />
      ))}
    </div>
  );
}

export default Posts;
