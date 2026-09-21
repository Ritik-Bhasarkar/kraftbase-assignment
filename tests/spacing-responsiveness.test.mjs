import assert from "node:assert/strict";
import { test } from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as sass from "sass";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const compiledSpacing = () =>
	sass.compile(path.join(projectRoot, "src/styles/variables/spacing.scss")).css;

const spacingValue = (css, mediaQuery, token) => {
	const block = mediaQuery
		? css.match(new RegExp(`${mediaQuery}\\s*\\{([\\s\\S]*?)\\n\\}`))?.[1]
		: css.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1];

	assert.ok(block, `could not find spacing block for ${mediaQuery ?? "default"}`);

	const declaration = block.match(new RegExp(`${token}\\s*:\\s*([^;]+);`));
	assert.ok(declaration, `could not find ${token} in ${mediaQuery ?? "default"}`);

	return declaration[1].trim();
};

test("spacing tokens shrink below the 1992px design tier and again at 480px", () => {
	const css = compiledSpacing();
	const desktop = spacingValue(css, "@media \\(min-width: 1992px\\)", "--spacing-16");
	const defaultSpacing = spacingValue(css, null, "--spacing-16");
	const mobile = spacingValue(css, "@media \\(max-width: 480px\\)", "--spacing-16");

	assert.equal(desktop, "4rem");
	assert.equal(defaultSpacing, "3.5rem");
	assert.equal(mobile, "2.5rem");

	assert.ok(
		parseFloat(defaultSpacing) < parseFloat(desktop),
		"default spacing must be smaller than the 1992px spacing",
	);
	assert.ok(
		parseFloat(mobile) < parseFloat(defaultSpacing),
		"480px spacing must be smaller than the default spacing",
	);
});

test("the spacing tiers cover the tokens used for layout gaps and smaller spacing", () => {
	const css = compiledSpacing();

	assert.equal(
		spacingValue(css, "@media \\(min-width: 1992px\\)", "--spacing-8"),
		"2rem",
	);
	assert.equal(spacingValue(css, null, "--spacing-8"), "1.75rem");
	assert.equal(
		spacingValue(css, "@media \\(max-width: 480px\\)", "--spacing-8"),
		"1.25rem",
	);

	assert.equal(
		spacingValue(css, "@media \\(min-width: 1992px\\)", "--spacing-4"),
		"1rem",
	);
	assert.equal(spacingValue(css, null, "--spacing-4"), "0.75rem");
	assert.equal(
		spacingValue(css, "@media \\(max-width: 480px\\)", "--spacing-4"),
		"0.625rem",
	);
});
