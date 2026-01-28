import "./NavBar.css";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

import { Navbar, Nav, Container, Button } from "react-bootstrap";

import logo from "../../assets/mm-nav.svg";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.pathname + location.search;

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="mm-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="money-mentor-logo" className="nav-logo" />
        </Navbar.Brand>

        {/* Sandwich button */}
        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto gap-lg-5">
            {user ? (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>

                <Nav.Link as={Link} to="/transactions">
                  Transactions
                </Nav.Link>

                <Nav.Link as={Link} to="/transactions/new" state={{ from }}>
                  New Transaction
                </Nav.Link>

                <Nav.Link as={Link} to="/summary">
                  Monthly Summary
                </Nav.Link>

                <Nav.Link as={Link} to="/mentors">
                  Profile
                </Nav.Link>

                <Button
                  type="button"
                  variant="outline-light"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>

                <Nav.Link as={Link} to="/sign-up">
                  Sign Up
                </Nav.Link>

                <Nav.Link as={Link} to="/sign-in">
                  Sign In
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
