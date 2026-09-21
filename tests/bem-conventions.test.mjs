import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const componentStyles = [
	"src/components/sections/bento-grid/_components/analytics-card/analytics-card.scss",
	"src/components/sections/bento-grid/_components/card-tab-stack/card-tab-stack.scss",
	"src/components/sections/bento-grid/_components/integration-card/integration-card.scss",
	"src/components/sections/bento-grid/bento-grid.scss",
	"src/components/sections/footer/footer.scss",
	"src/components/sections/hero-section/hero-section.scss",
	"src/components/sections/tab-slider/tab-slider.scss",
	"src/components/sections/testimonials/testimonials.scss",
	"src/components/ui/avatar-group/avatar-group.scss",
	"src/components/ui/badge-heading/badge-heading.scss",
	"src/components/ui/bento-item/bento-item.scss",
	"src/components/ui/button/button.scss",
	"src/components/ui/marquee/marquee.scss",
	"src/components/ui/navbar/navbar.scss",
	"src/components/ui/reveal-text/reveal-text.scss",
	"src/components/ui/tab-slider-item/tab-slider-item.scss",
];

test("component styles keep media queries top-level", () => {
	for (const path of componentStyles) {
		const source = read(path);

		assert.doesNotMatch(
			source,
			/^[ \t]+@media\s/m,
			`${path} contains a nested media query; re-nest the block inside it`,
		);
	}
});

test("section-specific testimonial markup is part of the testimonials BEM block", () => {
	const component = read("src/components/sections/testimonials/testimonials.tsx");
	const styles = read("src/components/sections/testimonials/testimonials.scss");

	assert.match(component, /className="testimonials--card"/);
	assert.match(styles, /&--card\s*\{/);
	assert.doesNotMatch(component, /className="testimonial-card"/);
});

test("reduced-motion rules keep BEM descendants nested", () => {
	const analytics = read(
		"src/components/sections/bento-grid/_components/analytics-card/analytics-card.scss",
	);
	const footer = read("src/components/sections/footer/footer.scss");

	assert.match(analytics, /&--chart\s*\{\s*&--bar\s*\{/s);
	assert.match(analytics, /&--gauge\s*\{\s*&--arc[\s\S]*&--value\s*\{/s);
	assert.match(
		footer,
		/&--orbit\s*\{[\s\S]*&--icon\s*\{\s*&--upright\s*\{/s,
	);
});
