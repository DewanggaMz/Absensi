import ReactTypingEffect from "react-typing-effect";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
const Home = () => {
	return (
		<>
			<div className="w-full min-h-screen bg-dark-blue">
				<Navbar></Navbar>
				<div className="flex px-4 lg:items-center">
					<div className="container mx-auto min-h-max flex justify-between items-center flex-col-reverse lg:flex-row">
						<div className="basis-1/2 shrink grow text-white transition-all duration-300">
							<ReactTypingEffect
								text={["MINI ABSENSI APP", "Make Your School Better"]}
								speed={150}
								eraseDelay={1000}
								eraseSpeed={150}
								typingDelay={150}
								className="text-3xl font-[500] lg:text-5xl"
							/>
							<p className="my-4 text-sm ">
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum obcaecati temporibus
								blanditiis, aperiam magni similique libero tenetur alias fugit voluptatum dolorem
								mollitia. Quod nam ut accusantium eligendi officiis, fugiat debitis?
							</p>
							<Button href="/login" className="font-[500]">
								Start Now
							</Button>
						</div>
						<div className="basis-1/2 shrink grow flex items-center justify-center relative">
							<img src="asset/heroimg.png" alt="" className="absolute z-10 h-3/5 lg:h-4/5" />
							<svg
								viewBox="0 0 200 200"
								xmlns="http://www.w3.org/2000/svg"
								className="h-4/5 w-4/5 top-2">
								<path
									fill="#08BDBA"
									d="M47.1,-41.7C58.6,-23.3,63.5,-3.8,57.8,9.9C52,23.5,35.5,31.4,18.7,39.8C2,48.3,-15,57.2,-32.7,54C-50.5,50.8,-69.2,35.4,-75.7,14.9C-82.3,-5.5,-76.7,-31.1,-62.1,-50.3C-47.4,-69.5,-23.7,-82.2,-2.9,-79.9C17.9,-77.5,35.7,-60.1,47.1,-41.7Z"
									transform="translate(100 100)"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
