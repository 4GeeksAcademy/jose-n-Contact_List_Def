import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3 d-flex justify-content-end">

			<div className="ml-auto mx-4">
				<Link to="/demo">
					<button className="btn btn-success">Add New Contact</button>
				</Link>
			</div>
		</nav>
	);
};
