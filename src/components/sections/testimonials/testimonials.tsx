"use client";

import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button/button";
import BadgeHeading from "@/components/ui/badge-heading/badge-heading";
import { SvgIcon } from "@/components/ui/svgIcon/svg-icon";
import { useDeviceWidth } from "@/context/device-width";
import "./testimonials.scss";

interface Testimonial {
	name: string;
	role: string;
	image: string;
	rating: number;
	text: string;
	socialUrl: string;
}

const testimonials: Testimonial[] = [
	{
		name: "Priya Nair",
		role: "Head of Risk & Collections",
		image: "/assets/image/testimonial/priya-nair.jpg",
		rating: 5,
		socialUrl: "/assets/svg/social/facebook-muted.svg",
		text: "Since implementing the Collectedge platform, we've seen a 40% improvement in resolving delinquent payment disputes within the first 30 days. The automation and transparency it brings have transformed how our collections team operates — reducing manual overhead and improving customer trust. It’s become an essential part of our risk management toolkit.",
	},
	{
		name: "David Koroma",
		role: "CEO, NeoBank Africa",
		image: "/assets/image/testimonial/amit-sharma.jpg",
		rating: 4,
		socialUrl: "/assets/svg/social/x-muted.svg",
		text: "We used to get a lot of complaints about dispute clarity. Since deploying Collectedge customer complaints related to payment disputes have dropped by over 50%. The self-service portal and clear communication flows have been game-changers. Since implementing the Collectedge platform, we've seen a 40% improvement in resolving delinquent payment",
	},
	{
		name: "Amit Sharma",
		role: "Compliance Lead",
		image: "/assets/image/testimonial/amit-sharma.jpg",
		rating: 5,
		socialUrl: "/assets/svg/social/x-muted.svg",
		text: "We used to get a lot of complaints about dispute clarity. Since deploying Collectedge customer complaints related to payment disputes have dropped by over 50%. The self-service portal and clear communication flows have been game-changers.",
	},
];

const total = testimonials.length;
const RANGE = [-2, -1, 0, 1, 2]; // -2 and 2 wait off-screen

const mod = (n: number) => ((n % total) + total) % total;

interface TestimonialCardProps {
	item: Testimonial;
	offset?: number;
	isStatic?: boolean; // mobile: plain scroll card
	onSelect?: () => void;
}

const TestimonialCard = ({
	item,
	offset = 0,
	isStatic = false,
	onSelect,
}: TestimonialCardProps) => {
	const state = isStatic
		? "static"
		: offset === 0
			? "active"
			: Math.abs(offset) === 1
				? "side"
				: "hidden";

	const big = state === "active" || state === "static";

	return (
		<article
			className="testimonial-card"
			data-state={state}
			aria-hidden={state === "side" || state === "hidden"}
			onClick={state === "side" ? onSelect : undefined}
			style={
				isStatic ? undefined : ({ "--offset": offset } as CSSProperties)
			}>
			<div className="testimonial-card--head">
				<div className="testimonial-card--head--top">
					<div className="testimonial-card--head--top--avatar">
						<Image
							src={item.image}
							alt={item.name}
							width={72}
							height={72}
						/>
					</div>
					<div className="testimonial-card--head--info">
						<p className="testimonial-card--head--info--name">
							{item.name}
						</p>
						<p className="testimonial-card--head--info--role">
							{item.role}
						</p>
					</div>
				</div>
				<div className="testimonial-card--quote-icon">
					<SvgIcon
						url="./assets/svg/quote.svg"
						width={big ? 60 : 40}
						height={big ? 42 : 28}
					/>
				</div>
			</div>

			<p className="testimonial-card--text">{item.text}</p>

			<div className="testimonial-card--footer">
				<div
					className="testimonial-card--footer--stars"
					role="img"
					aria-label={`${item.rating} out of 5`}>
					{Array.from({ length: 5 }).map((_, s) => (
						<span
							className="testimonial-card--footer--stars--star"
							key={s}
							data-filled={s < item.rating || undefined}>
							<SvgIcon
								url="/assets/svg/star.svg"
								width={24}
								height={24}
							/>
						</span>
					))}
				</div>
				<div className="testimonial-card--footer--social">
					<Image
						src={item.socialUrl}
						alt="social-url"
						width={24}
						height={24}
					/>
				</div>
			</div>
		</article>
	);
};

interface ControlsProps {
	onPrev: () => void;
	onNext: () => void;
	inline?: boolean; // mobile: sits below the scroller instead of inside the frame
}

const Controls = ({ onPrev, onNext, inline = false }: ControlsProps) => (
	<div
		className={
			inline
				? "testimonials--controls testimonials--controls--inline"
				: "testimonials--controls"
		}>
		<button
			className="testimonials--control"
			type="button"
			aria-label="Previous testimonial"
			onClick={onPrev}>
			<SvgIcon
				url="/assets/svg/arrow-left.svg"
				width={24}
				height={24}
			/>
		</button>
		<button
			className="testimonials--control testimonials--control--filled"
			type="button"
			aria-label="Next testimonial"
			onClick={onNext}>
			<SvgIcon
				url="/assets/svg/arrow-right.svg"
				width={24}
				height={24}
			/>
		</button>
	</div>
);

const Testimonials = () => {
	const { mode } = useDeviceWidth();
	const isMobile = mode === "mobile";

	// unbounded counter: never wraps, so cards always keep moving the same way
	const [step, setStep] = useState(0);
	const scrollerRef = useRef<HTMLDivElement | null>(null);

	// desktop
	const prev = () => setStep((s) => s - 1);
	const next = () => setStep((s) => s + 1);

	// mobile: scroll one card, loop at the ends
	const scrollByCard = (dir: 1 | -1) => {
		const el = scrollerRef.current;
		if (!el) return;

		const card = el.querySelector("article") as HTMLElement | null;
		if (!card) return;

		const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
		const amount = card.offsetWidth + gap;
		const atStart = el.scrollLeft <= 4;
		const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;

		if (dir === 1 && atEnd) {
			el.scrollTo({ left: 0, behavior: "smooth" });
		} else if (dir === -1 && atStart) {
			el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
		} else {
			el.scrollBy({ left: dir * amount, behavior: "smooth" });
		}
	};

	return (
		<section className="testimonials">
			<div className="testimonials--header">
				<BadgeHeading
					badgeText="Testimonial"
					text="Trusted by Professionals"
				/>
			</div>

			{isMobile ? (
				<>
					<div
						className="testimonials--scroller"
						ref={scrollerRef}>
						{testimonials.map((t) => (
							<TestimonialCard
								key={t.name}
								item={t}
								isStatic
							/>
						))}
					</div>

					<Controls
						inline
						onPrev={() => scrollByCard(-1)}
						onNext={() => scrollByCard(1)}
					/>
				</>
			) : (
				<div className="testimonials--stage">
					<div
						className="testimonials--frame"
						aria-hidden="true"
					/>

					<div
						className="testimonials--cards"
						aria-live="polite">
						{RANGE.map((r) => {
							const k = step + r; // absolute slot id, used as the key

							return (
								<TestimonialCard
									key={k}
									item={testimonials[mod(k)]}
									offset={r}
									onSelect={() => setStep((s) => s + r)}
								/>
							);
						})}
					</div>

					<Controls
						onPrev={prev}
						onNext={next}
					/>
				</div>
			)}

			<Button
				text="View All"
				variant="primary"
				size="small"
				whiteBorder
			/>
		</section>
	);
};

export default Testimonials;
