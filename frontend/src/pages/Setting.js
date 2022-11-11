import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../components/Button";
import Input from "../components/Input";
import Sidebar from "../components/sidebar";
import { logout } from "../components/logout.js";

const Setting = () => {
	const [nama, setNama] = useState(localStorage.getItem("nama"));
	const [password, setPassword] = useState("");
	const [passwordBaru, setPasswordBaru] = useState("");

	const update = (e) => {
		e.preventDefault();
		const requestingData = {
			nip: localStorage.getItem("nip"),
			passwordBaru: passwordBaru,
			password: password,
			nama: nama,
		};
		axios({
			method: "PUT",
			url: "http://localhost:3200/users",
			data: requestingData,
		})
			.then(() => {
				alert("anda akan keluar dari sistem, silahkan login kembali.");
				logout();
			})
			.catch(() => {
				alert(`Pastikan password benar`);
			});
	};

	useEffect(() => {
		if (!localStorage.getItem("nama") && !localStorage.getItem("nip")) {
			console.log("user belum login");
			window.location.replace("/login");
		}
	});

	return (
		<section className="flex bg-dark-blue">
			<Sidebar />
			<div className="text-xl text-white font-semibold bg-dark-blue min-h-screen w-full p-6">
				<div className="h-max w-full bg-blue-second rounded-md p-4">
					<div>
						<header className="flex justify-between border-b-2 pb-1 mb-7">
							<h1 className="text-xl">Setting</h1>
							<h3 className="text-lg">nip: {localStorage.getItem("nip")}</h3>
						</header>
						<div>
							<form onSubmit={(e) => update(e)}>
								<Input
									type="text"
									title="Nama"
									titleClass="text-white"
									labelClass="w-80"
									className="bg-slate-100 text-dark-blue font-medium text-lg"
									defaultValue={localStorage.getItem("nama")}
									onChange={(event) => setNama(event.target.value)}
								/>
								<Input
									type="password"
									title="Password"
									required
									titleClass="text-white "
									labelClass="w-80"
									className="bg-slate-100 text-dark-blue font-medium text-lg"
									onChange={(event) => setPassword(event.target.value)}
								/>
								<Input
									type="password"
									title="Password Baru"
									required
									titleClass="text-white"
									labelClass="w-80"
									className="bg-slate-100 text-dark-blue font-medium text-lg"
									onChange={(event) => setPasswordBaru(event.target.value)}
								/>
								<Button type="submit">Update Data</Button>
							</form>
							<Button className="mt-4 bg-red-600 text-white" onClick={() => logout()}>
								Logout
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Setting;
