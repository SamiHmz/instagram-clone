import React, { useState } from "react";
import { auth } from "../../../services/firebase";
/******* created components*******/
import logo from "../../../img/instagram_text_logo.png";
import facebook_logo from "../../../img/facebook _white.svg";
import google_play from "../../../img/google_play.png";
import app_store from "../../../img/app_store.png";
// import app_store from "../../img/app_store.png";
import { Link } from "react-router-dom";
/********* styles *****/
import "./SingUp.css";
function SingUp(props) {
  const [user, setUser] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authUser = await auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      authUser.user.updateProfile({ displayName: user.username });
      setTimeout(() => (window.location = "/"), 1500);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="signup">
      <div className="signup__form__top">
        <img src={logo} className="login__form__top_logo" />
        <div className="singup__description">
          Sign up to see photos and videos from your friends.
        </div>
        <div className="signup__form__top_facebook">
          <img src={facebook_logo} />
          <div className="login__form__top__facebook_text">
            {" "}
            Login with Facebook
          </div>
        </div>
        <div className="login__form__top_or">
          <div className="or--line"></div>
          <div className="or">OR</div>
          <div className="or--line"></div>
        </div>
        <form className="singup__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="login--input"
            placeholder="Mobile number, or email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="text"
            className="login--input"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          <input
            type="password"
            className="login--input"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <button className="login--btn" type="submit">
            Sing Up
          </button>
        </form>
        <div className="signup__conditions">
          By signing up, you agree to our Terms , Data Policy and Cookies Policy
          .
        </div>
      </div>
      <div className="login__form__bottom">
        <div className="login__form__bottom_singup">
          Have an account?{" "}
          <Link to="/">
            <span className="blue">Log in</span>
          </Link>{" "}
        </div>
        <div className="login__form__bottom_getapp">Get the app.</div>
        <div className="login__form__bottom_img">
          <a
            href="https://apps.apple.com/app/instagram/id389801252?vt=lo"
            target="_blank"
          >
            <img
              src={app_store}
              alt="App Store"
              className="login__form__bottom_img_app_store"
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3DA091347B-6C67-441D-8F82-AC42A13B3A13%26utm_content%3Dlo%26utm_medium%3Dbadge"
            target="_blank"
          >
            <img
              src={google_play}
              alt="google play"
              className="login__form__bottom_img_google_play"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default SingUp;
