"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useDeviceWidth } from "@/context/device-width";
import { animate } from "animejs";
import "./marquee.scss";

const brands = [
	{
		src: "/assets/svg/client-logo/bajaj.svg",
		alt: "bajaj",
		width: 150,
		height: 19.92,
	},
	{
		src: "/assets/svg/client-logo/icici.svg",
		alt: "icici",
		width: 130,
		height: 26.15,
	},
	{
		src: "/assets/svg/client-logo/indusind.svg",
		alt: "indusind",
		width: 161,
		height: 17.29,
	},
	{
		src: "/assets/svg/client-logo/udaan.svg",
		alt: "udaan",
		width: 96,
		height: 26.23,
	},
	{
		src: "/assets/svg/client-logo/yes-bank.svg",
		alt: "yes-bank",
		width: 138,
		height: 27.22,
	},
];

const Marquee = () => {
	const trackRef = useRef<HTMLDivElement>(null);
	const { mode } = useDeviceWidth();

	useEffect(() => {
		const track = trackRef.current;
		if (!track) return;

		const anim = animate(track, {
			translateX: ["0%", "-50%"],
			duration: mode === "desktop" ? 20000 : 40000,
			loop: true,
			ease: "linear",
		});

		return () => {
			anim.revert();
		};
	}, []);

	const items = [...brands, ...brands, ...brands];

	return (
		<div className="marquee">
			<div className="marquee--heading">
				<span
					className="marquee--heading--line"
					aria-hidden="true"
				/>
				<p>
					Join{" "}
					<span className="marquee--heading--highlight">4,000+</span>{" "}
					companies already grow
				</p>
				<span
					className="marquee--heading--line"
					aria-hidden="true"
				/>
			</div>
			<div className="marquee--wrapper">
				<div
					className="marquee--track"
					ref={trackRef}>
					{items.map((brand, i) => (
						<div
							className="marquee--item"
							key={i}
							aria-hidden={i >= brands.length}>
							<Image
								src={brand.src}
								width={brand.width}
								height={brand.height}
								alt={brand.alt}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Marquee;
