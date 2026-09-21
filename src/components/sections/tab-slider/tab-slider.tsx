"use client";

import { useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import Image from "next/image";
import { animate } from "animejs";
import TabItem from "@/components/ui/tab-slider-item/tab-slider-item";
import BadgeHeading from "@/components/ui/badge-heading/badge-heading";
import { useDeviceWidth } from "@/context/device-width";
import "./tab-slider.scss";

const groups = [
	{
		title: "Accelerate Business Growth",
		items: [
			{
				text: "Get more volume in your serviceable pincodes",
				icon: "/assets/svg/tab-slider/pincodes.svg",
				image: "/assets/image/bento/bento-1.png",
			},
			{
				text: "Manage all allocations on a single tool allowing you to maximize resource utilization.",
				icon: "/assets/svg/tab-slider/tool-connect.svg",
				image: "/assets/image/bento/bento-2.png",
			},
			{
				text: "Discover pincodes with high potential to expand your serviceability",
				icon: "/assets/svg/tab-slider/maginify-glass.svg",
				image: "/assets/image/bento/bento-1.png",
			},
		],
	},
	{
		title: "Technology & Data driven operations",
		items: [
			{
				text: "Get more volume in your serviceable pincodes",
				icon: "/assets/svg/tab-slider/pincodes.svg",
				image: "/assets/image/bento/bento-1.png",
			},
			{
				text: "Manage all allocations on a single tool allowing you to maximize resource utilization.",
				icon: "/assets/svg/tab-slider/tool-connect.svg",
				image: "/assets/image/bento/bento-2.png",
			},
			{
				text: "Discover pincodes with high potential to expand your serviceability",
				icon: "/assets/svg/tab-slider/maginify-glass.svg",
				image: "/assets/image/bento/bento-1.png",
			},
		],
	},
];

const SWIPE_DISTANCE = 50;

const TabSlider = () => {
	const { mode } = useDeviceWidth();
	const isMobile = mode === "mobile";

	const [activeGroup, setActiveGroup] = useState(0);
	const [activeItem, setActiveItem] = useState(0);

	const sliderRef = useRef<HTMLDivElement | null>(null);
	const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const isFirstRender = useRef(true);
	const touchStart = useRef<{ x: number; y: number } | null>(null);

	const handleGroup = (index: number) => {
		if (index < 0 || index >= groups.length) return;
		setActiveGroup(index);
		setActiveItem(0);
	};

	// mobile: swipe left/right to change the group
	const onTouchStart = (e: TouchEvent) => {
		const t = e.touches[0];
		touchStart.current = { x: t.clientX, y: t.clientY };
	};

	const onTouchEnd = (e: TouchEvent) => {
		const start = touchStart.current;
		touchStart.current = null;
		if (!start || !isMobile) return;

		const t = e.changedTouches[0];
		const dx = t.clientX - start.x;
		const dy = t.clientY - start.y;

		// ignore vertical scrolls and tiny moves
		if (Math.abs(dx) < SWIPE_DISTANCE || Math.abs(dx) < Math.abs(dy))
			return;

		handleGroup(activeGroup + (dx < 0 ? 1 : -1));
	};

	useEffect(() => {
		const move = (duration: number) => {
			const tab = tabRefs.current[activeGroup];
			if (!tab || !sliderRef.current) return;

			animate(sliderRef.current, {
				x: tab.offsetLeft,
				width: tab.offsetWidth,
				duration,
				ease: "outSine",
			});
		};

		move(isFirstRender.current ? 0 : 300);
		isFirstRender.current = false;

		const onResize = () => move(0);
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, [activeGroup, mode]);

	const group = groups[activeGroup];
	const image = group.items[activeItem].image;

	return (
		<section className="tab-slider">
			<div className="tab-slider--header">
				<BadgeHeading
					text="We fuel demand and empower agencies to execute with unmatched efficiency and reliability."
					badgeText="For Agencies"
				/>
			</div>

			<div className="tab-slider--tabs">
				<div
					ref={sliderRef}
					className="tab-slider--tabs--slider"
				/>
				{groups.map((g, index) => (
					<button
						key={g.title}
						ref={(el) => {
							tabRefs.current[index] = el;
						}}
						type="button"
						className="tab-slider--tabs--tab"
						data-active={index === activeGroup || undefined}
						onClick={() => handleGroup(index)}>
						{g.title}
					</button>
				))}
			</div>

			<div
				className="tab-slider--body"
				onTouchStart={isMobile ? onTouchStart : undefined}
				onTouchEnd={isMobile ? onTouchEnd : undefined}>
				{/* desktop/tablet: one shared image */}
				{!isMobile && (
					<div className="tab-slider--image">
						<Image
							key={image}
							src={image}
							alt={group.items[activeItem].text}
							width={540}
							height={470}
						/>
					</div>
				)}

				{/* key remounts the list on group change so the cards fade in */}
				<div
					className="tab-slider--items"
					key={activeGroup}>
					{group.items.map((item, index) => (
						<TabItem
							key={item.text}
							text={item.text}
							icon={item.icon}
							image={isMobile ? item.image : undefined}
							active={!isMobile && index === activeItem}
							onClick={() => setActiveItem(index)}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default TabSlider;
