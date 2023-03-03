import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Navbar = () => {
	const { user, dispatch } = useContext(AuthContext);
	const logout = () => {
		dispatch({ type: "LOGOUT" });
	};
	return (
		<div className="navbar">
			<div className="navContainer">
				<Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
					<span className="logo">goatbooking</span>
				</Link>
				{user ? (
					<div className="navItems">
						<span>{user.username}</span>
						<button onClick={logout} className="navButton">
							Logout
						</button>
					</div>
				) : (
					<div className="navItems">
						<button className="navButton">Register</button>
						<Link to="/login">
							<button className="navButton">Login</button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};
