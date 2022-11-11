import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const Sidebar = () => {
	const [open, setOpen] = useState(false);

	const handleMenu = () => {
		setOpen(!open);
		localStorage.setItem("menu", !open);
	};

	useEffect(() => {
		if (localStorage.key("menu") === null) {
			localStorage.setItem("menu", false);
		} else {
			if (localStorage.getItem("menu") === "true") {
				setOpen(localStorage.getItem("menu"));
			}
		}
	}, [open]);

	const menus = [
		{ name: "dashboard", link: "/dashboard", icon: MdOutlineDashboard },
		{ name: "Setting", link: "/dashboard/setting", icon: RiSettings4Line },
	];

	return (
		<div
			className={`bg-[#0f1025] min-h-screen duration-500 text-gray-100 px-4 ${
				open ? "w-72" : "w-[70px]"
			}`}>
			<div className="py-3 flex justify-between transition-all duration-500">
				{open ? <h1 className={`font-semibold text-lg text-white`}>Menu</h1> : ""}
				<HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => handleMenu()} />
			</div>
			<div className="mt-4 flex flex-col gap-4 relative">
				{menus?.map((menu, i) => (
					<Link
						to={menu.link}
						key={i}
						className={`group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}>
						<div>{React.createElement(menu?.icon, { size: "20" })}</div>
						<h2
							style={{
								transitionDelay: `${i + 3}00ms`,
							}}
							className={`whitespace-pre duration-500 ${
								!open && "opacity-0 translate-x-28 overflow-hidden"
							}`}>
							{menu?.name}
						</h2>
						<h2
							className={`absolute left-20 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit ${
								open && "hidden"
							}`}>
							{menu?.name}
						</h2>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
