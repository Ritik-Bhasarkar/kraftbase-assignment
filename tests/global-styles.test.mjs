import assert from "node:assert/strict";
import { test } from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as sass from "sass";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("app globals emits the shared color and typography tokens", () => {
	const result = sass.compile(path.join(projectRoot, "src/app/globals.scss"));

	assert.match(result.css, /--color-primary:\s*#1952f1;/);
	assert.match(result.css, /--font-size-display:/);
});
