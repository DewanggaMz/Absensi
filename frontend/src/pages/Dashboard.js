import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import axios from "axios";
import { Button } from "../components/Button";
import { FaUserAlt } from "react-icons/fa";
import {
	Chart as ChartJs,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
	const [list, setList] = useState([]);
	const [absenNotif, setAbsenNotif] = useState(false);
	const [date] = useState(new Date().getDate());

	const formatDate = (date) => {
		const convert = new Date(date);
		return convert.toLocaleString();
	};

	const getAllAbsensi = (status, minus) => {
		const filter = list.filter(
			(el) => new Date(el.createdAt).getDate() === date - minus && el.status === status
		);
		return filter.length;
	};

	const absen = (params) => {
		const date = new Date().toLocaleDateString();
		let status = null;
		let compare = null;

		if (params === "checkin") {
			status = "in";
			compare = list.map((e) => {
				if (Number(localStorage.getItem("nip")) === e.users_nip) {
					if (new Date(e.createdAt).toLocaleDateString() === date && e.status === status) {
						return true;
					}
				}
				return false;
			});
		} else {
			status = "out";
			compare = list.map((e) => {
				if (Number(localStorage.getItem("nip")) === e.users_nip) {
					if (new Date(e.createdAt).toLocaleDateString() === date && e.status === status) {
						return true;
					}
				}
				return false;
			});
		}

		if (!compare.every((val) => val === false)) {
			alert(`Anda Sudah melakukan ${params} hari ini lakukan besok lagi!`);
		} else {
			const requestingData = {
				nip: localStorage.getItem("nip"),
			};
			axios({
				method: "POST",
				url: `http://localhost:3200/absensi/${params}`,
				data: requestingData,
			}).then(() => {
				setAbsenNotif(!absenNotif);
			});
		}
	};

	useEffect(() => {
		if (!localStorage.getItem("nama") && !localStorage.getItem("nip")) {
			console.log("user belum login");
			window.location.replace("/login");
		}

		axios({
			method: "GET",
			url: "http://localhost:3200/absensi",
		}).then((result) => {
			setList(result.data.absensi);
		});
	}, [absenNotif]);

	return (
		<section className="flex bg-dark-blue">
			<Sidebar />
			<div className="text-xl text-white font-semibold bg-dark-blue min-h-screen w-full p-6 flex flex-col gap-12">
				<header className="grid grid-cols-3 gap-4">
					<div className="bg-blue-second min-h-[9rem] rounded-md p-4">
						<div className="flex items-center gap-4 mb-6">
							<FaUserAlt size={30} />
							<span>{localStorage.getItem("nama")}</span>
						</div>
						<div>
							<span className="font-medium text-md">nip: {localStorage.getItem("nip")}</span>
						</div>
					</div>
					<div className="bg-blue-second min-h-[9rem] rounded-md">
						<Bar
							options={{
								responsive: true,
								plugin: {
									position: "top",
								},
								title: {
									display: true,
									text: "mini absensi",
								},
							}}
							data={{
								labels: [
									`tgl ${date - 5}`,
									`tgl ${date - 4}`,
									`tgl ${date - 3}`,
									`tgl ${date - 2}`,
									`tgl ${date - 1}`,
									`tgl ${date}`,
								],
								datasets: [
									{
										label: "All Users Checkin",
										data: [
											getAllAbsensi("in", 5),
											getAllAbsensi("in", 4),
											getAllAbsensi("in", 3),
											getAllAbsensi("in", 2),
											getAllAbsensi("in", 1),
											getAllAbsensi("in", 0),
										],
										backgroundColor: [
											"rgba(255, 99, 132, 0.4)",
											"rgba(54, 162, 235, 0.4)",
											"rgba(255, 206, 86, 0.4)",
											"rgba(75, 192, 192, 0.4)",
											"rgba(153, 102, 255, 0.4)",
											"rgba(255, 159, 64, 0.4)",
										],
										borderColor: [
											"rgba(255, 99, 132, 1)",
											"rgba(54, 162, 235, 1)",
											"rgba(255, 206, 86, 1)",
											"rgba(75, 192, 192, 1)",
											"rgba(153, 102, 255, 1)",
											"rgba(255, 159, 64, 1)",
										],
										borderWidth: 1,
									},
								],
							}}
						/>
					</div>
					<div className="bg-blue-second min-h-[9rem] rounded-md">
						<Bar
							options={{
								responsive: true,
								plugin: {
									position: "top",
								},
								title: {
									display: true,
									text: "mini absensi",
								},
							}}
							data={{
								labels: [
									`tgl ${date - 5}`,
									`tgl ${date - 4}`,
									`tgl ${date - 3}`,
									`tgl ${date - 2}`,
									`tgl ${date - 1}`,
									`tgl ${date}`,
								],
								datasets: [
									{
										label: "All Users Checkout",
										data: [
											getAllAbsensi("out", 5),
											getAllAbsensi("out", 4),
											getAllAbsensi("out", 3),
											getAllAbsensi("out", 2),
											getAllAbsensi("out", 1),
											getAllAbsensi("out", 0),
										],
										backgroundColor: [
											"rgba(255, 99, 132, 0.4)",
											"rgba(54, 162, 235, 0.4)",
											"rgba(255, 206, 86, 0.4)",
											"rgba(75, 192, 192, 0.4)",
											"rgba(153, 102, 255, 0.4)",
											"rgba(255, 159, 64, 0.4)",
										],
										borderColor: [
											"rgba(255, 99, 132, 1)",
											"rgba(54, 162, 235, 1)",
											"rgba(255, 206, 86, 1)",
											"rgba(75, 192, 192, 1)",
											"rgba(153, 102, 255, 1)",
											"rgba(255, 159, 64, 1)",
										],
										borderWidth: 1,
									},
								],
							}}
						/>
					</div>
				</header>
				<div className="bg-blue-second w-full basis-full rounded-md p-4 overflow-auto">
					<table className="table-auto w-full border border-solid">
						<thead>
							<tr>
								<th className="border border-solid h-16">No.</th>
								<th className="border border-solid">NIP</th>
								<th className="border border-solid">Status</th>
								<th className="border border-solid">Tanggal</th>
							</tr>
						</thead>
						<tbody>
							{list.map((absensi, i) => {
								const { users_nip, status, createdAt } = absensi;
								return (
									<tr className={`${i % 2 === 1 ? "bg-slate-600/70" : ""}`} key={i}>
										<td className="border border-solid text-center">{i + 1}</td>
										<td className="border border-solid px-4">{users_nip}</td>
										<td className="border border-solid text-center">{status}</td>
										<td className="border border-solid px-4">{formatDate(createdAt)}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<div className="flex gap-4 mt-4 justify-center">
						<Button onClick={() => absen("checkin")}>checkin</Button>
						<Button onClick={() => absen("checkout")}>checkout</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
