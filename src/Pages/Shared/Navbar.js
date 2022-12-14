import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import { useDoctor } from "../../Hooks/useDoctor";
import { Loading } from "./Loading";
import logo from "../../assets/images/logo.png"
export const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const [doctor] = useDoctor(user);
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth);
    navigate("/");
    localStorage.removeItem("accessToken");
  };
  if (loading) {
    return <Loading />;
  }
  if (error) {
    console.log(error);
  }
  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      
      <li>
        <Link to="/diseases">Diseases</Link>
      </li>
      {<li>
        <Link to="/appoinment">Appoinment</Link>
      </li>}
      {user && (
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      )}
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>{user ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}</li>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {menuItems}
          </ul>
        </div>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0 mr-5">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        <label tabIndex="1" htmlFor="dashboard-sidebar" className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
      </div>
    </div>
  );
};
