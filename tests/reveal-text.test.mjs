import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const component = readFileSync(
	new URL("../src/components/ui/reveal-text/reveal-text.tsx", import.meta.url),
	"utf8",
);
const styles = readFileSync(
	new URL("../src/components/ui/reveal-text/reveal-text.scss", import.meta.url),
	"utf8",
);
const svgIcon = readFileSync(
	new URL("../src/components/ui/svgIcon/svg-icon.tsx", import.meta.url),
	"utf8",
);

const dimension = (source, name, syntax = "css") => {
	const pattern =
		syntax === "jsx"
			? `${name}\\s*=\\s*\\{(\\d+)\\}`
			: `${name}\\s*[=:]\\s*["']?(\\d+)`;
	const match = source.match(new RegExp(pattern));
	assert.ok(match, `could not find ${name}`);
	return Number(match[1]);
};

const cssDeclaration = (source, selector, property) => {
	const match = source.match(
		new RegExp(`${selector}\\s*\\{[\\s\\S]*?${property}\\s*:\\s*(\\d+)`),
	);
	assert.ok(match, `could not find ${property} in ${selector}`);
	return Number(match[1]);
};

test("the reveal trail SVG is rendered at the trail dimensions and fills them", () => {
	const trailWidth = cssDeclaration(styles, "&--trail", "width");
	const trailHeight = cssDeclaration(styles, "&--trail", "height");
	const renderedWidth = dimension(component, "width", "jsx");
	const renderedHeight = dimension(component, "height", "jsx");

	assert.equal(renderedWidth, trailWidth);
	assert.equal(renderedHeight, trailHeight);
	assert.equal(cssDeclaration(styles, "&--line", "width"), trailWidth);
	assert.equal(cssDeclaration(styles, "&--line", "height"), trailHeight);
	assert.match(component, /fit="fill"/);
	assert.match(svgIcon, /fit === "fill" \? "100% 100%" : "contain"/);
});
