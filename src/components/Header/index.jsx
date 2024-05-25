import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, selectIsAuth } from "../../redux/slices/auth";
import { logout } from "../../redux/slices/auth";
import { setSearchTag } from "../../redux/slices/posts";
import { Avatar } from "@mui/material";
import { deepOrange, red } from "@mui/material/colors";
export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.user.data);
  const dispath = useDispatch();
  console.log(userData);
  const handleClick = (name) => {
    dispath(setSearchTag(name));
  };
  const onClickLogout = () => {
    dispath(logout());
    window.localStorage.removeItem("token");
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/" onClick={() => handleClick("")}>
            <div>SuperBlog</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link
                  to={userData.role === "admin" ? "/test" : "/"}
                  onClick={() => handleClick("")}
                >
                  <Avatar
                    sx={{ width: 36, height: 36, bgcolor: deepOrange["A700"] }}
                  >
                    AP
                  </Avatar>
                </Link>

                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
