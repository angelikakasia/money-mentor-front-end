import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav className="navbar">
      {user ? (
        <>
          <div className="nav-left">
            <Link to="/">
              <img
                src="src/assets/Money Mentor (3) 1.svg"
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
                <Link to="/transactions/new">New Transaction</Link>
              </li>
              <li>
                <Link to="/summary">Monthly Summary</Link>
              </li>
              <li>
                <button onClick={handleSignOut} className="signout-btn">
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
