/******* third party packages*******/
import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";

/******* created components*******/
import { auth } from "../../../services/firebase";
import logo from "../../../img/instagram_text_logo.png";
import search from "../../../img/search.svg";
import home from "../../../img/home.svg";
import msg from "../../../img/msg.svg";
import explore from "../../../img/explore.svg";
import heart from "../../../img/heart.svg";
import profile from "../../../img/profile.svg";
import save from "../../../img/save.svg";
import gear from "../../../img/gear.svg";

/******* styles*******/
import "./Header.css";

function Header(props) {
  const [visibility, setVisibility] = useState("");

  const handleVisibility = () => {
    visibility === "" ? setVisibility("visible") : setVisibility("");
  };

  const logOut = () => {
    auth.signOut();
    window.location = "/";
  };

  return (
    <div className="header">
      <div className="header__content">
        <img src={logo} className="header__content__logo" />
        <div className="header__search">
          <img src={search} alt="" />
          <input type="text" placeholder="Search" className="input--search" />
        </div>
        <div className="header__content__navbar">
          <img src={home} alt="home" />
          <img src={msg} alt="home" />
          <img src={explore} alt="home" />
          <img src={heart} alt="home" />
          <Avatar
            className="header__content__navbar__avatar"
            onClick={handleVisibility}
          />
          <div className={`header__content_more ${visibility}`}>
            <div className="header__content_more__item">
              <img src={profile} alt="" />
              <div>Profile</div>
            </div>
            <div className="header__content_more__item">
              <img src={save} alt="" />
              <div>Saved</div>
            </div>
            <div className="header__content_more__item">
              <img src={gear} alt="" />
              <div>Settings</div>
            </div>
            <div className="line"></div>
            <div onClick={logOut}>Log Out</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
