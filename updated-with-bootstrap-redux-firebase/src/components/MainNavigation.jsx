import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import "./MainNavigation.css";

function MainNavigation() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">TRACK YOUR THINGS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            {!isLoggedIn && (
              <Nav.Link as={NavLink} to="/auth">
                Login
              </Nav.Link>
            )}
            {isLoggedIn && (
              <>
                <Nav.Link as={NavLink} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link as={NavLink} to="/contact">
                  Contact
                </Nav.Link>
                <Nav.Link as={NavLink} to="/expenses">
                  Expenses
                </Nav.Link>
              </>
            )}
          </Nav>
          {isLoggedIn && (
            <Nav className="ms-auto">
              <Button variant="outline-light" onClick={logoutHandler}>
                Logout
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;
