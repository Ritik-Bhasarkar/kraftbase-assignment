"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button/button";
import HamburgerMenu from "@/components/ui/hamburger/hamburger";
import "./navbar.scss";

export const navItems = [
	{ label: "Home", href: "/", active: true },
	{ label: "For Lenders", href: "/lenders", active: false },
	{ label: "For Collection Agencies", href: "/agencies", active: false },
];

const Navbar = () => {
	const [open, setOpen] = useState(false);

	// lock page scroll and close on Escape while the menu is open
	useEffect(() => {
		if (!open) return;

		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};

		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKey);

		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", onKey);
		};
	}, [open]);

	return (
		<header className="navbar">
			<div className="navbar--section">
				<div className="navbar--container">
					<div className="navbar--logo">
						<Image
							src="/assets/svg/brand/collect-edge.svg"
							alt="Collectedge"
							width={24}
							height={24}
						/>

						<span className="navbar--logo--name">Collectedge</span>
					</div>

					<nav
						className="navbar--nav"
						aria-label="Main navigation">
						{navItems.map((item) => (
							<span
								key={item.label}
								className="navbar--nav--item"
								data-active={item.active || undefined}>
								{item.label}
							</span>
						))}
					</nav>

					<div className="navbar--action">
						<Button
							text="Get in touch"
							variant="primary"
							size="small"
							rounded
						/>
					</div>

					<button
						type="button"
						className="navbar--toggle"
						aria-label="Open menu"
						aria-expanded={open}
						onClick={() => setOpen(true)}>
						<svg
							viewBox="0 0 24 24"
							width="24"
							height="24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							aria-hidden="true">
							<path d="M4 7h16M4 12h16M4 17h16" />
						</svg>
					</button>
				</div>
			</div>

			<HamburgerMenu
				open={open}
				items={navItems}
				onClose={() => setOpen(false)}
			/>
		</header>
	);
};

export default Navbar;
