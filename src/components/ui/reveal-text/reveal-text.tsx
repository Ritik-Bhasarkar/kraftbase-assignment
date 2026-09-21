"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { SvgIcon } from "@/components/ui/svgIcon/svg-icon";
import "./reveal-text.scss";

interface RevealTextProps {
	words: string[];
	scanDuration?: number;
	holdDuration?: number;
	className?: string;
}

const RevealText = ({
	words,
	scanDuration = 900,
	holdDuration = 1800,
	className = "",
}: RevealTextProps) => {
	const rootRef = useRef<HTMLSpanElement>(null);
	const [cycle, setCycle] = useState(0);

	const word = words[cycle % words.length];

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			root.style.setProperty("--p", "100");
			root.dataset.revealed = "true";
			return;
		}

		const state = { p: 0 };
		const update = () => root.style.setProperty("--p", String(state.p));
		let hide: ReturnType<typeof animate> | undefined;

		delete root.dataset.revealed;
		update();

		const reveal = animate(state, {
			p: 100,
			duration: scanDuration,
			ease: "inOutQuad",
			onUpdate: update,
			onComplete: () => {
				root.dataset.revealed = "true"; // fully visible, show the svg

				// hold, then hide the svg first and scan back
				hide = animate(state, {
					p: 0,
					duration: scanDuration,
					delay: holdDuration,
					ease: "inOutQuad",
					onBegin: () => {
						delete root.dataset.revealed;
					},
					onUpdate: update,
					onComplete: () => setCycle((c) => c + 1),
				});
			},
		});

		return () => {
			reveal.revert();
			hide?.revert();
		};
	}, [cycle, scanDuration, holdDuration]);

	const classes = ["reveal-text", className].filter(Boolean).join(" ");

	return (
		<span
			className={classes}
			ref={rootRef}>
			<span className="reveal-text--clip">
				<span className="reveal-text--clip--word">{word}</span>
			</span>

			<span
				className="reveal-text--scan"
				aria-hidden="true"
			/>

			<span
				className="reveal-text--trail"
				aria-hidden="true">
				<SvgIcon
					url="/assets/svg/reveal-underline.svg"
					width={150}
					height={10}
				/>
			</span>
		</span>
	);
};

export default RevealText;
