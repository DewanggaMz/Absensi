import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import { Icon } from "react-icons-kit";
import { view, view_off } from "react-icons-kit/ikons";
import Input from "../components/Input";

const Register = () => {
	const [NIP, setNIP] = useState("");
	const [password, setPassword] = useState("");
	const [nama, setNama] = useState("");
	const [type, setType] = useState("password");
	const [icon, setIcon] = useState(view_off);

	const handleNIP = (inputNIP) => setNIP(inputNIP);
	const handleNama = (inputNama) => setNama(inputNama);
	const handlePassword = (inputPassword) => setPassword(inputPassword);
	const userRegister = (e) => {
		e.preventDefault();
		const requestingData = {
			nip: NIP,
			nama: nama,
			password: password,
		};

		axios({
			method: "POST",
			url: "http://localhost:3200/users",
			data: requestingData,
		})
			.then(() => {
				alert("Pendaftaran berhasil");
				window.location.replace("/login");
			})
			.catch(() => {
				alert("Gagal mendaftar, NIP sudah terdaftar");
			});
	};

	const hidePassord = () => {
		if (type === "password") {
			setType("text");
			setIcon(view);
		} else {
			setType("password");
			setIcon(view_off);
		}
	};

	useEffect(() => {
		if (localStorage.getItem("nama") && localStorage.getItem("nip")) {
			window.location.replace("/dashboard");
		}
	}, []);

	return (
		<>
			<div className="w-full min-h-screen bg-dark-blue flex items-center justify-center px-5">
				<div className="max-w-[400px] w-full mx-auto bg-gray-300 p-4 rounded-lg lg:w-[30%]">
					<h1 className="w-full h-1/5 text-center font-semibold text-4xl fot-bold text-dark-blue mb-6">
						Register Form
					</h1>
					<form className="text-white" onSubmit={(e) => userRegister(e)}>
						<Input
							type="number"
							title="NIP User"
							required
							onChange={(event) => handleNIP(event.target.value)}
							className="bg-dark-blue"
						/>
						<Input
							type="text"
							title="Nama"
							required
							onChange={(event) => handleNama(event.target.value)}
							className="bg-dark-blue"
						/>
						<label className="flex flex-col mb-9 relative">
							<span className="mb-2 text-dark-blue font-[500]">Password</span>
							<input
								type={type}
								required
								className="block h-10 bg-dark-blue px-2 py-1 border-none outline-none rounded-sm"
								onChange={(event) => handlePassword(event.target.value)}
							/>
							<span onClick={hidePassord} className="absolute right-2 bottom-[10px] cursor-pointer">
								<Icon icon={icon} size={20} />
							</span>
						</label>
						<Button
							className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300 font-[500] text-white mb-3"
							type="submit">
							Register
						</Button>
					</form>
					<span className="text-sm">
						Sudah Punya Akun? <a href="/login">Login</a>
					</span>
				</div>
			</div>
		</>
	);
};

export default Register;
