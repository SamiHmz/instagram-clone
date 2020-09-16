/******* third party packages*******/
import React, { useState } from "react";
import { Link } from "react-router-dom";
/******* created components*******/
import { auth } from "../../services/firebase";
import logo from "../../img/instagram_text_logo.png";
import login_img from "../../img/login.png";
import facebook_logo from "../../img/facebook.svg";
import google_play from "../../img/google_play.png";
import app_store from "../../img/app_store.png";
import { useDataLayer } from "../../services/DataLayer";
/******* styles*******/
import "./Login.css";
function Login(props) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [{ username }, dispatch] = useDataLayer();
  const handleChange = (e) => {
    const { value, name } = e.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const authUser = await auth.signInWithEmailAndPassword(
        user.email,
        user.password
      );
      dispatch({ type: "LOGIN", username: authUser.user.displayName });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login">
      <img src={login_img} alt="" className="login__img" />
      <div className="login__form">
        <div className="login__form__top">
          <img src={logo} className="login__form__top_logo" />
          <form className="login__form__submit" onSubmit={handleLogIn}>
            <input
              type="text"
              name="email"
              className="login--input"
              placeholder="Phone number, username, or email"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              className="login--input"
              placeholder="Password"
              onChange={handleChange}
            />
            <button type="submit" className="login--btn">
              Log In
            </button>
          </form>
          <div className="login__form__top_or">
            <div className="or--line"></div>
            <div className="or">OR</div>
            <div className="or--line"></div>
          </div>
          <div className="login__form__top_facebook">
            <img src={facebook_logo} />
            <div className="login__form__top__facebook_text">
              {" "}
              Login with Facebook
            </div>
          </div>
          <div className="login__form__top__forget_password">
            Forgot password ?
          </div>
        </div>
        <div className="login__form__bottom">
          <div className="login__form__bottom_singup">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="blue">Sign up</span>
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
    </div>
  );
}

export default Login;
