"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, stagger } from "animejs";
import "./avatar-group.scss";

const avatars = [
	{ src: "/assets/image/testimonial/amit-sharma.jpg", alt: "User 1" },
	{ src: "/assets/image/testimonial/priya-nair.jpg", alt: "User 2" },
	{ src: "/assets/image/testimonial/david-koram.jpg", alt: "User 3" },
];

const AvatarGroup = () => {
	const groupRef = useRef<HTMLDivElement>(null);
	const countRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const group = groupRef.current;
		if (!group) return;

		const items = group.querySelectorAll(".avatar-group--item");

		// avatars pop in one after another
		const intro = animate(items, {
			opacity: [0, 1],
			scale: [0.4, 1],
			translateX: [-16, 0],
			delay: stagger(120),
			duration: 700,
			ease: "outBack",
		});

		// "+5K" counts up
		const counter = { value: 0 };
		const count = animate(counter, {
			value: 5,
			duration: 1400,
			delay: 500,
			ease: "outExpo",
			onUpdate: () => {
				if (countRef.current) {
					countRef.current.textContent = `+${Math.round(counter.value)}K`;
				}
			},
		});

		// gentle wave after the intro, one avatar at a time
		const wave = animate(items, {
			translateY: [0, -4, 0],
			delay: stagger(150, { start: 1600 }),
			duration: 1200,
			loop: true,
			loopDelay: 2500,
			ease: "inOutSine",
		});

		return () => {
			intro.revert();
			count.revert();
			wave.revert();
		};
	}, []);

	return (
		<div className="avatar-group">
			<div
				className="avatar-group--avatars"
				ref={groupRef}>
				{avatars.map((avatar) => (
					<div
						className="avatar-group--item"
						key={avatar.src}>
						<Image
							className="avatar-group--image"
							src={avatar.src}
							alt={avatar.alt}
							width={36}
							height={36}
						/>
					</div>
				))}

				<div className="avatar-group--item avatar-group--item--count">
					<span
						className="avatar-group--count"
						ref={countRef}>
						+0K
					</span>
				</div>
			</div>

			<p className="avatar-group--text">Businesses Rely On Collectedge</p>
		</div>
	);
};

export default AvatarGroup;
