import { Fragment } from "react";
import { Button } from "./Button";

export const Navbar = ({ children }) => {
	return (
		<Fragment>
			<div className="container mx-auto px-4 sticky top-0 h-16 flex items-center text-white justify-between">
				<a href="/">
					<span className="text-inherit font-bold text-3xl">
						MIN
						<span className="text-orange-600 font-bold text-3xl">.APPS</span>
					</span>
				</a>
				<ul className="flex gap-2 font-[500]">
					<li className="ml-6">
						<Button href="/register" className="font-[500] hidden md:inline">
							Register
						</Button>
					</li>
				</ul>
				{children}
			</div>
		</Fragment>
	);
};
