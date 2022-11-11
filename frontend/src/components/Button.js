export const Button = ({ children, className, href, ...props }) => {
	if (!href) {
		return (
			<button
				className={`py-2 px-5 rounded-sm bg-slate-100 text-dark-blue text-lg ${className}`}
				{...props}>
				{children}
			</button>
		);
	}
	return (
		<a
			href={href}
			className={`py-2 px-5 rounded-sm bg-slate-100 text-dark-blue text-lg ${className}`}
			{...props}>
			{children}
		</a>
	);
};
