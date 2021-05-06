import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Link } from "react-router-dom";
import "./cssFiles/navbar.css";
import store from "../redux/store";

function NavBar(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav class="navbar navbar-light bg-light customNavbar">
      <span class="navbar-brand mb-0 h1">
        <Link
          style={{
            textDecoration: "none",
          }}
          to="/"
        >
          Property
        </Link>
      </span>
      <div className="navbarItems">
        {window.gapi.auth2.getAuthInstance().isSignedIn.get() ? (
          <>
            <div className="navbarDropdown">
              <Avatar>{store.getState().auth.name[0]}</Avatar>
              <ArrowDropDownIcon
                style={{ cursor: "pointer" }}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    style={{
                      textDecoration: "none",
                    }}
                    to="/postland"
                  >
                    Post Land
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    style={{
                      textDecoration: "none",
                    }}
                    to="/lands"
                  >
                    My Posted Lands
                  </Link>
                </MenuItem>
              </Menu>
            </div>

            <button
              style={{
                marginLeft: "2rem",
              }}
              onClick={() => {
                window.gapi.auth2.getAuthInstance().signOut();
              }}
              className="btn btn-outline-success my-2 my-sm-0"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link
            to="/signin"
            style={{
              textDecoration: "none",
              marginLeft: "1rem",
            }}
          >
            <button className="btn btn-outline-success my-2 my-sm-0">
              Sign in
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
