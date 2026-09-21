# Claude Code — Workspace Rules

## Stack

- **Next.js** (App Router) + **TypeScript** (strict) + **SCSS Modules** + **Node.js**

## Code Style

- Server Components by default; `'use client'` only when needed (event handlers, hooks, browser APIs)
- `interface` over `type` unless union/mapped types are needed
- No `any` — use `unknown` and narrow, or define a proper type
- Keep files under 300 lines; split when they grow beyond that

## SCSS Conventions

### BEM Naming

- Block: `.about`, `.navbar`, `.not-found`
- Children use `--` separator: `.about--hero-section`, `.navbar--top`
- Grandchildren continue chaining: `.about--hero-section--top`
- Never use single `_` or camelCase for class names

### File Structure

- Parent block contains all children via `&--child` nesting — never write flat selectors
- Media queries go at the bottom of the file, re-nesting the block with `&--child` syntax
- Mobile breakpoint: `@media (max-width: 480px)`

### Example Pattern

```scss
.block {
	// block styles

	&--child {
		// child styles

		&--grandchild {
			color: var(--color-text-primary);
		}
	}
}

@media (max-width: 480px) {
	.block {
		&--child {
			&--grandchild {
			}
		}
	}
}
```
