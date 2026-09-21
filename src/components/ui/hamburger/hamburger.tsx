"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button/button";
import "./hamburger.scss";

interface HamburgerItem {
	label: string;
	href: string;
	active?: boolean;
}

interface HamburgerProps {
	open: boolean;
	items: HamburgerItem[];
	onClose: () => void;
}

const Hamburger = ({ open, items, onClose }: HamburgerProps) => {
	return (
		<div
			className="hamburger"
			data-open={open || undefined}
			aria-hidden={!open}>
			<div className="hamburger--header">
				<div className="hamburger--logo">
					<Image
						src="/assets/svg/brand/collect-edge.svg"
						alt="Collectedge"
						width={24}
						height={24}
					/>
					<span className="hamburger--logo--name">Collectedge</span>
				</div>

				<button
					type="button"
					className="hamburger--close"
					aria-label="Close menu"
					tabIndex={open ? 0 : -1}
					onClick={onClose}>
					<svg
						viewBox="0 0 24 24"
						width="24"
						height="24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						aria-hidden="true">
						<path d="M6 6l12 12M18 6L6 18" />
					</svg>
				</button>
			</div>

			<nav
				className="hamburger--nav"
				aria-label="Mobile navigation">
				{items.map((item) => (
					<span
						key={item.label}
						className="hamburger--nav--item"
						data-active={item.active || undefined}
						tabIndex={open ? 0 : -1}
						onClick={onClose}>
						{item.label}
					</span>
				))}
			</nav>

			<div className="hamburger--action">
				<Button
					text="Get in touch"
					variant="primary"
					size="large"
				/>
			</div>
		</div>
	);
};

export default Hamburger;
