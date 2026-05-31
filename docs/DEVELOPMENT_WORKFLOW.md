# GroupAuth Development Workflow

Design-driven development pipeline for implementing GroupAuth from wireframe
designs. Governs the full lifecycle from design handoff to production-ready UI.

## Overview

```
Design Handoff → Analysis → Issue Breakdown → User Approval → Phased Development → UX/UI Final Gate → Done
```

## Phase 0: Design Handoff & Analysis

### Input
User provides wireframe screenshots (Figma exports, v0 renders, or other design tool output).

### Steps
1. Store design assets in `design/` folder in the repo (not `/tmp/` — implementation timeline is unbounded). Remove from repo after all development is complete.
2. Extract design tokens from screenshots via vision analysis → JSON:
   - Color palette (all hex values, semantic names)
   - Typography scale (font family, weights, sizes per text level)
   - Spacing scale (values used for padding, margin, gap)
   - Border radius values
   - Shadow values
   - Component states (default, hover, active, disabled, focus)
3. Write extracted tokens into Tailwind v4 `@theme` in `src/index.css`.
4. Generate `design/SYSTEM_MANIFEST.md` — compiled design system reference (~1,000 tokens) that every subagent reads instead of scanning the codebase.

### Output
- `design/*.png` — wireframe screenshots
- `design/tokens.json` — extracted design tokens
- `design/SYSTEM_MANIFEST.md` — compiled manifest for subagents
- Updated `@theme` section in `src/index.css`

---

## Phase 1: Issue Breakdown

### Rules
1. **Full spec per issue.** Every issue must contain complete implementation details: exact styles (referencing design tokens), behavior, all UX/UI interactions, accessibility requirements. An agent reading only the issue must be able to implement without asking questions.

2. **State matrix required.** Every data-display component must enumerate visual states in a `## State Matrix` section:
   - Data components: `loading`, `empty`, `error`, `single-item`, `full-page`, `overflow`
   - Forms: `pristine`, `validating`, `field-errors`, `submit-loading`, `success`, `server-error`
   - Static components: `default` only (no matrix needed)
   - Each state defines its mock data shape.

3. **Wave assignment.** Every issue is assigned a development wave (integer). Wave rules:
   - Wave 0 (Foundation): layout shell, routing skeleton, shared types, design token config, shared components used across pages.
   - Wave N: issues within a wave must NOT conflict on the same files. Issues that depend on each other go in sequential waves.
   - The wireframe screenshot path and relevant design tokens must be cited in the issue.

4. **Definition of Done per issue:**
   - Builds clean (`npm run build` passes)
   - Matches wireframe section (cited by path in `design/`)
   - One Storybook story per state in the state matrix
   - Uses only design token utility classes (no raw hex/px values)
   - Code review passes

5. **Priority ordering.** Issues within a wave are ordered by implementation priority. Shared/reusable components before page-specific ones.

### Linear Setup
- Dedicated Linear project: **GroupAuth**
- Cycle per wave (Wave 0, Wave 1, Wave 2, ...)
- Labels: `foundation`, `component`, `page`, `backend`

### Output
- Linear issues with full specs, state matrices, wave assignments
- User reviews and approves before development begins

---

## Phase 2: Development

### Wave Execution

Each wave follows this sequence:

```
Wave N issues ready
  → Dispatch subagents (one per issue, worktree-isolated)
  → Agents implement + self-test + create PRs
  → Code review per PR
  → Merge PRs (within-wave order doesn't matter — they don't conflict)
  → Regenerate SYSTEM_MANIFEST.md from merged state
  → Wave-boundary coherence sweep
  → /handoff to next wave
```

### Subagent Protocol

Each subagent receives:
1. The Linear issue spec (full spec, state matrix, wireframe path)
2. `design/SYSTEM_MANIFEST.md` (compiled design system, ~1,000 tokens)
3. The relevant wireframe screenshot path

Each subagent produces:
1. Implementation code (React + Tailwind + shadcn)
2. Storybook stories (one per state in the matrix)
3. A PR against main

### Agent Warnings

Agents encountering issues mid-implementation write warnings as comments on their Linear issue:
- `[WARNING]` — informational, included in wave handoff
- `[BLOCKING]` — halts the wave, surfaces to user for decision

Examples: design ambiguity, missing design tokens, component API conflicts, layout assumptions that don't hold.

### Wave Boundary Protocol

After all PRs in a wave merge:

1. **Regenerate manifest.** Run the manifest generation script to update `design/SYSTEM_MANIFEST.md` with new components, props, and token values.

2. **Coherence sweep.** Screenshot every route at desktop viewport. A coherence-judge agent evaluates:
   - Consistent spacing rhythm across pages
   - Consistent typography hierarchy
   - Consistent color usage
   - Consistent interactive patterns
   - Navigation continuity
   
   Output: coherence report posted to Linear. If issues found, they become fix-up issues in the current wave (re-merge before advancing).

3. **Handoff.** Use `/handoff` to capture:
   - What was built this wave
   - What deviated from the design
   - Any warnings agents raised
   - What the next wave should know

### Pause & Resume

- **State is in Linear.** In-progress issues have active worktrees. Done issues are merged.
- **Pause:** Stop dispatching new agents. Active agents finish their current PR.
- **Resume:** Read Linear state. Pick up from the current wave's remaining issues.
- No ambient state to reconstruct — Linear + git are the source of truth.

---

## Phase 3: Visual Quality Gate

After all development waves complete:

### Adversarial Visual Judge

A separate agent (not the one that wrote the code) performs final visual verification:

**Layer 1 — Deterministic (no LLM):**
- Assert computed CSS values against design tokens via Playwright `getComputedStyle`
- Check heading hierarchy via accessibility tree
- Verify all components use token utility classes (no raw values)
- Count Storybook stories vs state matrix rows

**Layer 2 — Vision (LLM):**
- Composite image: wireframe on left, screenshot on right, same viewport
- Agent never sees source code
- Verdict: SHIP or REVISE with specific region callouts

### UX/UI Final Approval Loop

After the visual judge runs:

1. Screenshot every page, compare against every wireframe
2. Produce a punch list of all visual drifts
3. Run in `/loop` fixing issues one by one, re-screenshotting after each fix
4. Only when the full comparison passes → SHIP verdict
5. User decides what happens next (demo, deploy, etc.)

---

## Phase 4: Cleanup

1. Remove `design/` folder from the repo (design assets served their purpose)
2. Lock Storybook story baselines as visual regression snapshots
3. Final commit + push

---

## Backend Development

Backend waves (auth logic, JWT handling, database schema, API routes) follow the same wave structure with two differences:

1. **No visual layer.** Design token extraction, screenshot comparison, and coherence sweeps don't apply.
2. **API contract first.** Before implementation, define OpenAPI spec or TypeScript types for the API surface. Frontend and backend waves can reference the same contract.

All other rules apply identically: full spec per issue, state matrix (for API edge cases: empty responses, validation errors, auth failures, rate limiting), wave ordering, code review, wardens.

---

## Design System Enforcement

### Token Lint
ESLint rule bans:
- Raw hex color values in className strings
- Raw pixel values for spacing/sizing
- `className` strings not using design token utility classes

This mechanically prevents the silent merge-wave failure: two agents using different grays for the same semantic role. Git sees no conflict; the lint catches it at build time.

### Manifest Regeneration
After each wave merges, the manifest regeneration script:
1. Reads Tailwind v4 `@theme` tokens
2. Scans component exports (name, props, slot interface)
3. Emits `design/SYSTEM_MANIFEST.md` (~800-1,200 tokens)
4. Every subsequent wave's agents read this instead of scanning the codebase

---

## Generalization Note

This workflow is specific to GroupAuth. A generalized, reusable `/design-to-dev` Deus skill (with toggle between free-form and design-driven development) is tracked separately as a Deus project Linear issue. It will go through its own /plan → plan-reviewer → SHIP cycle.
