import './NavBar.css';
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      {user ? (
        <>
          <div className="nav-left">
            <Link to="/" state={{ from: location.pathname + location.search }}>
              <img
                src="src/assets/mm-nav.svg"
                alt="money-mentor-logo"
                className="nav-logo"
              />
            </Link>
          </div>

          <div className="nav-right">
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/transactions">Transactions</Link>
              </li>
              <li>
                <Link
                  to="/transactions/new"
                  state={{ from: location.pathname + location.search }}
                >
                  New Transaction
                </Link>
              </li>
              <li>
                <Link to="/summary">Monthly Summary</Link>
              </li>
              <li>
                <Link to="/mentors">Profile</Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="signout-btn"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
