import { Fragment } from "react";

const Input = ({ title, labelClass, titleClass, className, ...props }) => {
	return (
		<Fragment>
			<label className={`flex flex-col mb-4 ${labelClass}`}>
				<span className={`mb-1 text-dark-blue font-[500] text-lg ${titleClass}`}>{title}</span>
				<input
					className={`block h-10 px-2 py-1 border-none outline-none rounded-sm ${className}`}
					{...props}
				/>
			</label>
		</Fragment>
	);
};

export default Input;
