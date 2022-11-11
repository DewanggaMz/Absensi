import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import { Icon } from "react-icons-kit";
import { view, view_off } from "react-icons-kit/ikons";

const Login = () => {
	const [NIP, setNIP] = useState("");
	const [password, setPassword] = useState("");
	const [type, setType] = useState("password");
	const [icon, setIcon] = useState(view_off);

	const handleNIP = (inputNIP) => setNIP(inputNIP);
	const handlePassword = (inputPassword) => setPassword(inputPassword);
	const userLogin = (e) => {
		e.preventDefault();
		const requestingData = {
			nip: NIP,
			password: password,
		};

		axios({
			method: "POST",
			url: "http://localhost:3200/users/login",
			data: requestingData,
		})
			.then((result) => {
				localStorage.setItem("nip", result.data.users.nip);
				localStorage.setItem("nama", result.data.users.nama);
				window.location.replace("/dashboard");
			})
			.catch(() => {
				alert("pastikan data login benar");
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
						Login Form
					</h1>
					<form className="text-white" onSubmit={(e) => userLogin(e)}>
						<label className="flex flex-col mb-3">
							<span className="mb-2 text-dark-blue font-[500]">NIP User</span>
							<input
								type="number"
								required
								className="block h-10 bg-dark-blue px-2 py-1 border-none outline-none rounded-sm"
								onChange={(event) => handleNIP(event.target.value)}
							/>
						</label>
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
							Login
						</Button>
					</form>
					<span className="text-sm">
						Belum Punya Akun? <a href="/register">Daftar</a>
					</span>
				</div>
			</div>
		</>
	);
};

export default Login;
