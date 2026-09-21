"use client";

import Image from "next/image";
import BadgeHeading from "@/components/ui/badge-heading/badge-heading";
import BentoItem from "@/components/ui/bento-item/bento-item";
import CardTabStack from "./_components/card-tab-stack/card-tab-stack";
import IntegrationHub from "./_components/integration-card/intergration-card";
import AnalyticsPreview from "./_components/analytics-card/analytics-card";
import { useDeviceWidth } from "@/context/device-width";
import "./bento-grid.scss";
import AgencyCard from "./_components/agency-card/agency-card";

export default function BentoGrid() {
	const { mode } = useDeviceWidth();
	return (
		<section className="bento-grid">
			<div className="bento-grid--header">
				<BadgeHeading
					badgeText="For Lenders"
					text="We're changing the game with one complete agency management tool"
				/>
			</div>
			<div className="bento-grid--items">
				<BentoItem
					className="bento-grid--item"
					text="Intuitive & Agent Focused "
					subText="Our tool is designed with agencies & collection managers in mind, ensuring user-friendly experience tailored to their needs"
					icon="./assets/svg/bento/user-group.svg">
					{mode === "desktop" ? (
						<CardTabStack />
					) : (
						<Image
							className="bento-image"
							src="/assets/image/bento/bento-1.png"
							width={720}
							height={455}
							alt=""
							style={{ width: "100%", height: "auto" }}
						/>
					)}
				</BentoItem>
				<BentoItem
					className="bento-grid--item"
					text="Highly Customizable "
					subText="Our tool is designed with agencies & collection managers in mind, ensuring user-friendly experience tailored to their needs"
					icon="./assets/svg/bento/customize.svg">
					<IntegrationHub />
				</BentoItem>
				<BentoItem
					className="bento-grid--item"
					text="Driven by Data"
					subText="Our data-driven approach equips collection managers with insights to make informed & actionable decisions"
					icon="./assets/svg/bento/analytics-up.svg">
					{mode === "desktop" ? (
						<AnalyticsPreview />
					) : (
						<Image
							className="bento-image"
							src="/assets/image/bento/bento-3.png"
							width={720}
							height={455}
							alt=""
							style={{ width: "100%", height: "auto" }}
						/>
					)}
				</BentoItem>
				<BentoItem
					className="bento-grid--item"
					text="Discover Agency partners"
					subText="Discover top-performing, tech-driven agencies designed to deliver results with minimal overhead."
					icon="./assets/svg/bento/search-02.svg">
					<AgencyCard />
				</BentoItem>
			</div>
		</section>
	);
}
