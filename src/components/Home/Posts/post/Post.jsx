/******* third party packages*******/
import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import firebase from "firebase";

/******* created components*******/
import { db } from "../../../../services/firebase";
import more from "../../../../img/more.svg";
import heart from "../../../../img/heart.svg";
import share from "../../../../img/msg.svg";
import commentIcon from "../../../../img/comment.svg";
import save from "../../../../img/save.svg";
import { useDataLayer } from "../../../../services/DataLayer";

/******* styles*******/
import "./Post.css";

function Post({ postUsername, imageUrl, caption, postId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [{ username }, dispatch] = useDataLayer();

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              comment: doc.data(),
            }))
          );
        });
    }
    return () => {
      unsubscribe();
    };
  }, []);

  const handlePostComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      comment,
      username,
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__top">
        <div className="post__top__info">
          <Avatar />
          <div className="post--username">{postUsername}</div>
        </div>
        <img src={more} alt="" />
      </div>
      <img src={imageUrl} alt="" className="post__img" />
      <div className="post__bottom">
        <div className="post___icons">
          <div className="post__icons_left">
            <img src={heart} alt="" />
            <img src={share} alt="" />
            <img src={commentIcon} alt="" />
          </div>
          <div className="post__icons_right">
            <img src={save} alt="" />
          </div>
        </div>
        <div className="post__bottom__info">
          <div className="post--username">{postUsername}</div>
          <div className="post__bottom__info__caption">{caption}</div>
        </div>
        <div className="post__bottom__comments">
          {comments.map(({ comment, id }) => (
            <div key={id}>
              <span className="post--username">{comment.username}</span>
              <span className="post--comment">{comment.comment}</span>
            </div>
          ))}
        </div>
        <form className="post__bottom__from" onSubmit={handlePostComment}>
          <input
            type="text"
            name=""
            id=""
            placeholder="Add a comment"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <button type="submit" disabled={!comment}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Post;
