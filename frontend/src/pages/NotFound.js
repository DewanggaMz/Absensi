import { Button } from "../components/Button";

const NotFound = () => {
	return (
		<div className="min-h-screen w-full bg-dark-blue text-white flex items-center justify-center">
			<div className="flex flex-col items-center justify-center gap-4">
				<img src="asset/404.png" alt="404" />
				<Button className="font-semibold" onClick={() => window.location.replace("/")}>
					Back to Home
				</Button>
			</div>
		</div>
	);
};

export default NotFound;
