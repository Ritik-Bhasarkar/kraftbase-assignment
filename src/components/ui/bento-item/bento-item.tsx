import type { ReactNode } from "react";
import { SvgIcon } from "../svgIcon/svg-icon";
import "./bento-item.scss";

interface BentoItemProps {
	icon?: string;
	text: string;
	subText: string;
	children?: ReactNode;
	className?: string;
}

const BentoItem = ({
	icon,
	text,
	subText,
	children,
	className = "",
}: BentoItemProps) => {
	const sectionClasses = ["bento-item", className].filter(Boolean).join(" ");

	return (
		<div className={sectionClasses}>
			<div className="bento-item--top">
				<div className="bento-item--top--header">
					{icon && (
						<span className="bento-item--top--header--icon">
							<SvgIcon
								url={icon}
								width={28}
								height={28}
							/>
						</span>
					)}
					{text && (
						<h2 className="bento-item--top--header--text">
							{text}
						</h2>
					)}
				</div>

				{subText && (
					<p className="bento-item--top--subtext">{subText}</p>
				)}
			</div>

			{children && <div className="bento-item--content">{children}</div>}
		</div>
	);
};

export default BentoItem;
