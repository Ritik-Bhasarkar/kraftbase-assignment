import Image from "next/image";
import "./agency-card.scss";

interface AgencyCardProps {
	className?: string;
}

const ITEMS = [
	{
		key: "profile",
		src: "/assets/image/bento/agency-card/agency-profile.png",
		width: 1110,
		height: 890,
	},
	{
		key: "badge",
		src: "/assets/image/bento/agency-card/agency-badge.png",
		width: 60,
		height: 60,
	},
	{
		key: "enquiry",
		src: "/assets/image/bento/agency-card/agency-enquiry.png",
		width: 800,
		height: 380,
	},
] as const;

const AgencyCard = ({ className = "" }: AgencyCardProps) => {
	const classes = ["agency-card", className].filter(Boolean).join(" ");

	return (
		<div className={classes}>
			{ITEMS.map((item) => (
				<div
					key={item.key}
					className={`agency-card--item agency-card--${item.key}`}>
					<Image
						className="agency-card--image"
						src={item.src}
						width={item.width}
						height={item.height}
						alt=""
						style={{ width: "100%", height: "auto" }}
					/>
				</div>
			))}
		</div>
	);
};

export default AgencyCard;
