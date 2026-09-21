interface SvgIconProps {
	url: string;
	width?: number;
	height?: number;
	className?: string;
}

export const SvgIcon = ({
	url,
	width = 16,
	height = 16,
	className = "",
}: SvgIconProps) => {
	return (
		<span
			aria-hidden="true"
			className={className}
			style={{
				display: "inline-block",
				width,
				height,
				flexShrink: 0,
				backgroundColor: "currentColor",
				mask: `url(${url}) center / 100% no-repeat`,
			}}
		/>
	);
};
