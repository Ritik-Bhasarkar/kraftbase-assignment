import Image from "next/image";
import "./card-tab-stack.scss";

interface CardTabStackItem {
	image: string;
}

interface CardTabStackProps {
	items: CardTabStackItem[];
	floatingImage?: string;
	className?: string;
}

const CardTabStackComponent = ({
	items,
	className = "",
	floatingImage,
}: CardTabStackProps) => {
	const stackClasses = ["card-tab-stack", className]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={stackClasses}>
			{items.slice(0, 3).map((item, i) => (
				<div
					className="card-tab-stack--card"
					key={i}>
					<Image
						src={item.image}
						alt="card-stack"
						width={290}
						height={96}
						style={{ width: "100%", height: "100%" }}
					/>
				</div>
			))}

			{floatingImage && (
				<div className="card-tab-stack--floating">
					<Image
						src={floatingImage}
						alt="floating-assets"
						width={60}
						height={60}
						aria-hidden
					/>
				</div>
			)}
		</div>
	);
};

const cardTabStack = () => {
	return (
		<CardTabStackComponent
			floatingImage="/assets/image/bento/stack-cards/card-profile.png"
			items={[
				{
					image: "/assets/image/bento/stack-cards/card-1.png",
				},
				{
					image: "/assets/image/bento/stack-cards/card-2.png",
				},
				{
					image: "/assets/image/bento/stack-cards/card-3.png",
				},
			]}
		/>
	);
};

export default cardTabStack;
