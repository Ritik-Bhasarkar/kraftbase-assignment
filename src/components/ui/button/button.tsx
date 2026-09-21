import type { ButtonHTMLAttributes } from "react";
import { SvgIcon } from "../svgIcon/svg-icon";
import "./button.scss";

interface ButtonProps extends Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	"children"
> {
	variant: "primary" | "secondary" | "tertiary";
	size: "small" | "large";
	text?: string;
	leadingIcon?: string;
	trailingIcon?: string;
	whiteBorder?: boolean;
	rounded?: boolean;
}

export const Button = ({
	variant,
	size,
	text,
	leadingIcon,
	trailingIcon,
	rounded = false,
	whiteBorder = false,
	disabled = false,
	className = "",
	type = "button",
	...rest
}: ButtonProps) => {
	const buttonClasses = [
		"button",
		`button--${variant}`,
		`button--${size}`,
		rounded && "button--rounded",
		whiteBorder && "button--white-border",
		className,
	]
		.filter(Boolean)
		.join(" ");

	const iconSize = size === "small" ? 8 : 12;

	return (
		<button
			{...rest}
			type={type}
			disabled={disabled}
			className={buttonClasses}>
			{leadingIcon && (
				<span className="button--icon button--icon--leading">
					<SvgIcon
						url={leadingIcon}
						width={iconSize}
						height={iconSize}
					/>
				</span>
			)}

			{text && <span className="button--text">{text}</span>}

			{trailingIcon && (
				<span className="button--icon button--icon--trailing">
					<SvgIcon
						url={trailingIcon}
						width={iconSize}
						height={iconSize}
					/>
				</span>
			)}
		</button>
	);
};
