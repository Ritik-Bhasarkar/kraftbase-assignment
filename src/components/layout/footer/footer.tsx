import Image from "next/image";
import type { CSSProperties } from "react";
import "./footer.scss";
import BadgeHeading from "@/components/ui/badge-heading/badge-heading";
import { SvgIcon } from "@/components/ui/svgIcon/svg-icon";

const links = [
	{ label: "Home", href: "/" },
	{ label: "For Lenders", href: "/lenders" },
	{ label: "For Collection Agencies", href: "/agencies" },
];

const socials = [
	{
		name: "facebook",
		icon: "/assets/svg/social/facebook.svg",
		angle: -52,
		ring: "outer",
	},
	{
		name: "instagram",
		icon: "/assets/svg/social/instagram.svg",
		angle: -36,
		ring: "inner",
	},
	{
		name: "youtube",
		icon: "/assets/svg/social/youtube.svg",
		angle: 36,
		ring: "inner",
	},
	{
		name: "x",
		icon: "/assets/svg/social/x.svg",
		angle: 52,
		ring: "outer",
	},
] as const;

const Footer = () => {
	return (
		<footer className="footer">
			<div
				className="footer--ring"
				aria-hidden="true">
				<div className="footer--orbit">
					{socials.map((social) => (
						<div
							className="footer--orbit--item"
							key={social.name}
							data-ring={social.ring}
							style={
								{
									"--base": social.angle,
								} as CSSProperties
							}>
							<div className="footer--orbit--icon">
								<div className="footer--orbit--icon--upright">
									<Image
										src={social.icon}
										alt=""
										width={28}
										height={28}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div
				className="footer--ring-outer"
				aria-hidden="true"
			/>

			<div className="footer--cta">
				<div className="footer--cta--logo">
					<Image
						src="/assets/svg/brand/collect-edge.svg"
						alt="Collectedge"
						width={24}
						height={24}
					/>
				</div>
				<div className="footer--cta--heading">
					<BadgeHeading
						badgeText="Contact us"
						text="We also need to have contact form on the website"
						subText="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
						buttonText="Get Started"
						buttonTrailingIcon="/assets/svg/arrow-upright.svg"
					/>
				</div>
			</div>

			<div className="footer--main">
				<div className="footer--main--column">
					<h3 className="footer--main--heading">Navigation</h3>

					<ul className="footer--main--list">
						{links.map((link) => (
							<li key={link.href}>
								<span className="footer--main--link">
									{link.label}
								</span>
							</li>
						))}
					</ul>
				</div>

				<div className="footer--main--column footer--main--column--brand">
					<div className="footer--main--brand">
						<Image
							src="/assets/svg/brand/collect-edge.svg"
							alt=""
							width={28}
							height={30}
						/>

						<span className="footer--main--brand--name">
							Collectedge
						</span>
					</div>

					<p className="footer--main--brand--text">
						Our tool is designed with agencies & collection managers
						in mind, ensuring user-friendly experience tailored to
						their needs
					</p>
				</div>

				<div className="footer--main--column">
					<h3 className="footer--main--heading">Contact</h3>

					<p className="footer--main--contact">
						<span className="footer--main--contact--icon">
							<SvgIcon
								url="/assets/svg/mail.svg"
								width={24}
								height={24}
							/>
						</span>
						info@letsdial.com
					</p>

					<p className="footer--main--contact">
						<span className="footer--main--contact--icon">
							<SvgIcon
								url="/assets/svg/location.svg"
								width={24}
								height={24}
							/>
						</span>
						Lorem Ipsum is simply dummy text of the printing
					</p>
				</div>
			</div>

			<p className="footer--copyright">
				© 2024, Lorem Ipsum is simply dummy
			</p>
		</footer>
	);
};

export default Footer;
