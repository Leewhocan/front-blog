import Container from "@mui/material/Container";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { fetchAuthUser, selectIsAuth } from "./redux/slices/auth";
import { AdminPage } from "./pages/TestPage";

function App() {
  const dispath = useDispatch();

  React.useEffect(() => {
    dispath(fetchAuthUser());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/test" element={<AdminPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
