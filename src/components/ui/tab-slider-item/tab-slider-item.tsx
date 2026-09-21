import Image from "next/image";
import "./tab-slider-item.scss";

interface TabItemProps {
	text: string;
	icon?: string;
	image?: string;
	active?: boolean;
	onClick?: () => void;
}

const TabItem = ({
	text,
	icon,
	image,
	active = false,
	onClick,
}: TabItemProps) => {
	const iconEl = icon && (
		<span className="tab-item--icon">
			<Image
				src={icon}
				alt=""
				width={32}
				height={32}
			/>
		</span>
	);

	if (image) {
		return (
			<article
				className="tab-item"
				data-stacked>
				{iconEl}
				<h3 className="tab-item--text">{text}</h3>
				<div className="tab-item--image">
					<Image
						src={image}
						alt={text}
						width={775}
						height={470}
					/>
				</div>
			</article>
		);
	}

	return (
		<div
			className="tab-item"
			data-active={active || undefined}
			role="button"
			tabIndex={0}
			onClick={onClick}
			onKeyDown={(event) => {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					onClick?.();
				}
			}}>
			<span className="tab-item--head">
				{iconEl}
				<span className="tab-item--text">{text}</span>
			</span>
		</div>
	);
};

export default TabItem;
