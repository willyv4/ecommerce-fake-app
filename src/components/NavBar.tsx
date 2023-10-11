import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<header className="fixed z-50 top-0 w-full bg-slate-800 h-20 flex flex-row justify-between">
			<div className="bg-gray-700 border-r-4 border-gray-50 w-72">
				<h3 className="h-20 align-middle py-4 ml-6 font-bold text-4xl text-gray-50">
					Fake Store
				</h3>
			</div>
			<nav>
				<ol className="flex flex-row mr-4">
					<NavLink
						to={"/products"}
						className="font-semibold text-gray-50 text-lg py-6"
					>
						Shop
					</NavLink>
				</ol>
			</nav>
		</header>
	);
};

export default Navbar;
