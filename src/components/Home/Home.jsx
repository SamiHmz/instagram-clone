/******* third party packages*******/
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { FilePicker, Button } from "evergreen-ui";
import { storage, db } from "../../services/firebase";
import firebase from "firebase";

/******* created components*******/
import Header from "./Header/Header";
import Posts from "./Posts/Posts";
import post from "../../img/post.svg";
import { useDataLayer } from "../../services/DataLayer";
/******* styles*******/
import "./Home.css";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,

    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    width: 400,
    height: 250,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
}));

function Home(prop) {
  const classes = useStyles();
  const [{ username }, dispatch] = useDataLayer();
  const [modalStyle] = React.useState(getModalStyle);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const [model, setModel] = useState(false);

  const handldeImageUploadChange = (files) => {
    if (files[0]) {
      console.log(files[0]);
      setImage(files[0]);
    }
  };
  const handlePostUpload = () => {
    if (image === null) {
      alert("You should upload an image ");
    } else {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        // progress bar logic
        (snapshot) => {
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        //error handling
        (error) => {
          console.log(error.message);
        },
        // upload complete
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              //insert post in the db
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: url,
                username: username,
              });
            });
          setProgress(0);
          setImage(null);
          setCaption("");
          setModel(false);
        }
      );
    }
  };

  return (
    <div className="home">
      <Header />
      <Posts />
      <Modal open={model} onClose={() => setModel(false)}>
        <div style={modalStyle} className={classes.paper}>
          <div className="home__post">
            <textarea
              type="text"
              className="home--input"
              placeholder="Caption ..."
              onChange={(e) => setCaption(e.target.value)}
            />

            <FilePicker
              multiple
              width={250}
              onChange={handldeImageUploadChange}
              placeholder="Select image!"
            />
            <progress value={progress} max={100} />
            <Button appearance="primary" onClick={handlePostUpload}>
              Post
            </Button>
          </div>
        </div>
      </Modal>
      <div className="home__upload">
        <img src={post} alt="upload" onClick={() => setModel(true)} />
      </div>
    </div>
  );
}

export default Home;
