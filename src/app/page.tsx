import BentoGrid from "@/components/sections/bento-grid/bento-grid";
import HeroSection from "@/components/sections/hero-section/hero-section";
import TabSlider from "@/components/sections/tab-slider/tab-slider";
import Testimonials from "@/components/sections/testimonials/testimonials";
import "./page.scss";

export default function Home() {
	return (
		<div className="home">
			<HeroSection />
			<BentoGrid />
			<TabSlider />
			<Testimonials />
		</div>
	);
}
