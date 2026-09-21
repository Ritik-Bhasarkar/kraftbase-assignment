"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import AvatarGroup from "@/components/ui/avatar-group/avatar-group";
import { Button } from "@/components/ui/button/button";
import RevealText from "@/components/ui/reveal-text/reveal-text";
import Marquee from "@/components/ui/marquee/marquee";

import "./hero-section.scss";

const cards = [
	{
		name: "operational-health",
		src: "/assets/image/hero-section/left-top.png",
		width: 300,
		height: 150,
	},
	{
		name: "agency-profile",
		src: "/assets/image/hero-section/left-bottom.png",
		width: 270,
		height: 250,
	},
	{
		name: "left-extra",
		src: "/assets/image/hero-section/hero-blank.png",
		width: 320,
		height: 120,
	},
	{
		name: "left-extra-2",
		src: "/assets/image/hero-section/hero-blank.png",
		width: 230,
		height: 150,
	},
	{
		name: "interactions",
		src: "/assets/image/hero-section/right-top.png",
		width: 340,
		height: 360,
	},
	{
		name: "contact",
		src: "/assets/image/hero-section/right-bottom.png",
		width: 320,
		height: 190,
	},
	{
		name: "right-extra",
		src: "/assets/image/hero-section/hero-blank-solid.png",
		width: 280,
		height: 230,
	},
];

const icons = [
	{ name: "gauge", src: "/assets/svg/hero-section/left-top-flotter.svg" },
	{ name: "bolt", src: "/assets/svg/hero-section/left-bottom-flotter.svg" },
	{ name: "dollar", src: "/assets/svg/hero-section/right-top-flotter.svg" },
	{
		name: "phone",
		src: "/assets/svg/hero-section/right-bottom-flotter.svg",
	},
];

const revealWords = [
	"DPD Resolution.",
	"Agency Allocation.",
	"Collection Efficiency.",
];

const HeroSection = () => {
	const sizerRef = useRef<HTMLSpanElement>(null);
	const [revealWidth, setRevealWidth] = useState<number>();

	const longestWord = revealWords.reduce((a, b) =>
		b.length > a.length ? b : a,
	);

	// measure the longest word once, using its actual rendered font/size
	useLayoutEffect(() => {
		if (sizerRef.current) {
			setRevealWidth(sizerRef.current.offsetWidth);
		}
	}, []);

	return (
		<section className="hero-section">
			<div className="hero-section--top">
				<div
					className="hero-section--visuals"
					aria-hidden="true">
					{cards.map((card) => (
						<div
							className={`hero-section--card hero-section--card--${card.name}`}
							key={card.name}
							style={
								{
									"--w": `${card.width}px`,
									"--h": `${card.height}px`,
								} as React.CSSProperties
							}>
							<Image
								src={card.src}
								alt=""
								width={card.width}
								height={card.height}
							/>
						</div>
					))}

					{icons.map((icon) => (
						<div
							className={`hero-section--icon hero-section--icon--${icon.name}`}
							key={icon.name}>
							<Image
								src={icon.src}
								alt=""
								width={40}
								height={40}
							/>
						</div>
					))}
				</div>

				<div className="hero-section--content">
					<AvatarGroup />

					<h1 className="hero-section--content--title">
						Unified Platform for Late-
						<br />
						Stage
						<span
							className="hero-section--content--title--reveal"
							style={
								revealWidth
									? { width: `calc(${revealWidth}px + 40px)` }
									: undefined
							}>
							<span
								ref={sizerRef}
								className="hero-section--content--title--reveal--sizer"
								aria-hidden="true">
								{longestWord}
							</span>
							<span className="hero-section--content--title--reveal--word">
								<RevealText words={revealWords} />
							</span>
						</span>
					</h1>

					<p className="hero-section--content--text">
						Our tool is designed with agencies & collection managers
						in mind, ensuring user-friendly experience tailored to
						their needs
					</p>

					<div className="hero-section--content--actions">
						<Button
							text="Get free Trial"
							variant="primary"
							size="large"
							trailingIcon="/assets/svg/arrow-upright.svg"
							whiteBorder
						/>
						<Button
							text="How We work"
							variant="secondary"
							size="large"
							trailingIcon="/assets/svg/arrow-downright.svg"
							whiteBorder
						/>
					</div>
				</div>
			</div>

			<Marquee />
		</section>
	);
};

export default HeroSection;
