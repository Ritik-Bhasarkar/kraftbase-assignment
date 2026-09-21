import Image from "next/image";
import "./integration-card.scss";

interface IntegrationHubProps {
	centerIcon: string;
	leftTopIcon: string;
	leftBottomIcon: string;
	rightTopIcon: string;
	rightBottomIcon: string;
	text?: string;
	className?: string;
}

// paths are drawn from the outer node towards the center
const lines = [
	"M164 148 H245 L285 172", // left top
	"M164 296 H245 L285 240", // left bottom
	"M584 148 H505 L462 172", // right top
	"M584 296 H505 L462 238", // right bottom
	"M308 0 V95 L332 128", // top left
	"M436 0 V95 L412 128", // top right
	"M374 345 V290", // bottom (pill)
];

const IntegrationHubComponent = ({
	centerIcon,
	leftTopIcon,
	leftBottomIcon,
	rightTopIcon,
	rightBottomIcon,
	text,
	className = "",
}: IntegrationHubProps) => {
	const hubClasses = ["integration-hub", className].filter(Boolean).join(" ");

	const nodes = [
		{ icon: leftTopIcon, position: "left-top" },
		{ icon: leftBottomIcon, position: "left-bottom" },
		{ icon: rightTopIcon, position: "right-top" },
		{ icon: rightBottomIcon, position: "right-bottom" },
	];

	return (
		<div className={hubClasses}>
			<svg
				className="integration-hub--lines"
				viewBox="0 0 720 455"
				preserveAspectRatio="none"
				aria-hidden="true">
				{lines.map((d, i) => (
					<g key={i}>
						<path
							className="integration-hub--lines--base"
							d={d}
							pathLength={100}
						/>
						<path
							className="integration-hub--lines--pulse"
							d={d}
							pathLength={100}
							style={{ animationDelay: `${i * 0.35}s` }}
						/>
					</g>
				))}
			</svg>

			{nodes.map((node) => (
				<div
					className={`integration-hub--node integration-hub--node--${node.position}`}
					key={node.position}>
					<Image
						src={node.icon}
						alt="intergation-hub-icon"
						width={28}
						height={28}
					/>
				</div>
			))}

			<div className="integration-hub--center">
				<div className="integration-hub--center--inner">
					<Image
						src={centerIcon}
						width={20}
						height={20}
						alt="center-icon"
					/>
				</div>
			</div>

			{text && (
				<div className="integration-hub--label">
					<span className="integration-hub--label--text">{text}</span>
				</div>
			)}
		</div>
	);
};

const IntegrationHub = () => {
	return (
		<IntegrationHubComponent
			text="API integration"
			centerIcon="/assets/svg/brand/collect-edge.svg"
			leftTopIcon="/assets/svg/bento/integration-card/settings.svg"
			leftBottomIcon="/assets/svg/bento/integration-card/code.svg"
			rightTopIcon="/assets/svg/bento/integration-card/database-02.svg"
			rightBottomIcon="/assets/svg/bento/integration-card/sidebar-top.svg"
		/>
	);
};

export default IntegrationHub;
