# Actionable UX Refinement Guide: Year-O-Meter

**Source:** UX Review by Dr. Evelyn Reed (based on initial `time_left.html` and Memory Bank, reviewed against refactored code)
**Purpose:** To list the specific, actionable tasks required to implement Dr. Reed's recommendations for improving the user experience of Year-O-Meter.

---

## High Priority Tasks (Fundamental Usability & Accessibility)

1.  **Accessibility - Color Contrast (Grid & Special Days):**
    *   **Task:** Systematically review and adjust CSS colors in `css/style.css` to meet WCAG AA contrast minimums (4.5:1 normal, 3:1 large). Use a contrast checking tool.
    *   **Elements/Classes:**
        *   `.day-block.holiday` background vs. outline/text.
        *   `.day-block.longest-day` background vs. outline/text.
        *   `.day-block.shortest-day` background vs. outline/text.
        *   `.day-block.today` background vs. border (across themes).
        *   `.day-block.past` background (seasonal) vs. foreground.
        *   `.day-block.future` background (seasonal) vs. foreground.
    *   **Rationale:** Ensure readability and usability for users with visual impairments.

2.  **Accessibility - Grid Semantics & Navigation:**
    *   **Task:** Implement proper semantic structure and keyboard navigation for the year grid.
    *   **HTML Changes (`index.html`):**
        *   Add `role="grid"` to `#year-grid`. (Done)
        *   *If feasible:* Refactor `renderYearGrid` in `js/main.js` to wrap rows and add `role="row"` to row wrappers.
        *   Add `role="gridcell"` to each `.day-block` (in `renderYearGrid` build step in `js/main.js`).
        *   Add a dynamic `aria-label` to `#year-grid-component` (e.g., "Grid showing days of the year 2024"). (Done)
    *   **JavaScript Changes (`js/main.js`):**
        *   Implement keyboard navigation (Arrow keys) for focus movement between `.day-block` elements.
        *   Manage `tabindex` (e.g., `0` for one active/current block, `-1` for others).
        *   Add keydown event listeners to the grid container (`#year-grid`) to handle focus shifts.
    *   **Rationale:** Enable screen reader users and keyboard-only users to navigate and understand the grid structure.

3.  **Accessibility - Live Regions:**
    *   **Task:** Wrap dynamically updating content areas with `aria-live` attributes.
    *   **HTML Changes (`index.html`):**
        *   Wrap the content of `#time-line` in a `<span>` with `aria-live="polite"` (or `off`) and `aria-atomic="true"`. (Done - applied directly to `#time-line`)
        *   Wrap the content of `#countdown` in a `<span>` (or apply directly) with `aria-live="polite"` (or `off`) and `aria-atomic="true"`. (Done - applied directly to `#countdown`)
    *   **Testing:** Test thoroughly with a screen reader to ensure updates are announced appropriately (not too verbose).
    *   **Rationale:** Inform screen reader users about dynamic content changes.

4.  **Consistency - Page Title:**
    *   **Task:** Update the HTML `<title>` tag in `index.html`.
    *   **Change:** From "Countdown to New Year" to "Year-O-Meter". (Done)
    *   **Rationale:** Ensure consistency between the project name and the browser tab/window title.

## Medium Priority Tasks (Core Interaction & Clarity)

1.  **Readability - Countdown Text Shadow:**
    *   **Task:** Refine the `text-shadow` CSS property for the `.countdown` class in `css/style.css`.
    *   **Goal:** Enhance readability against all potential backgrounds (gradient, seasonal themes). Experiment with smaller offsets, reduced blur, or adjusted colors. (Initial refinement applied in `style.css`)
    *   **Testing:** Verify readability across different seasonal themes and progress levels.
    *   **Rationale:** Improve visual clarity of the primary countdown display.

2.  **Interaction - Options Panel Toggle Text:**
    *   **Task:** Change the text content of the `#extra-options-toggle` button in `index.html`.
    *   **Change:** From `<span>Extra Options…</span>` to `<span>Customize View</span>` or `<span>Display Options</span>`. (Done - Changed to "Customize View")
    *   **Rationale:** Improve clarity and engagement of the options panel control.

3.  **Layout - Options Panel Hierarchy:**
    *   **Task:** Increase the `margin-left` CSS value for the `.grid-options-group` class in `css/style.css`.
    *   **Goal:** Make the indentation of grid sub-options more visually distinct from the main toggles. (Done - Increased to `2.2em`)
    *   **Rationale:** Improve visual hierarchy within the options panel.

## Low Priority Tasks (Aesthetics & Minor Refinements)

1.  **Aesthetics - Progress Bar Background:**
    *   **Task:** Consider simplifying or refining the `background` for `.progress-bar-inner` in `css/style.css`.
    *   **Options:**
        *   Use a solid color derived from the active seasonal theme (requires JS style update in `js/main.js`).
        *   Adjust seasonal gradient definitions (`.container.season-* .progress-bar-inner`) for better harmony.
    *   **Rationale:** Potentially improve visual integration with seasonal themes.

2.  **Aesthetics - Options Panel Separator:**
    *   **Task:** Consider replacing the `<hr>` element within `.features-toggles` in `index.html`.
    *   **Options:** Use CSS `border-top` on the subsequent element or increased `margin-top` on the "Show year grid" `.toggle-block` in `css/style.css`.
    *   **Rationale:** Potentially achieve a cleaner visual separation within the options panel.

3.  **Aesthetics - Checkbox Styling:**
    *   **Task:** Consider adding minimal custom styling for `input[type="checkbox"]` elements in `css/style.css`.
    *   **Goal:** Ensure a consistent appearance across browsers, aligning with the overall aesthetic.
    *   **Rationale:** Improve visual consistency of form elements.

4.  **Layout - Ultra-Wide Screens:**
    *   **Task:** Review layout on ultra-wide monitors. If the centered container looks too constrained, consider increasing `max-width` for `.container` and `.year-grid-component` via a media query (e.g., `@media (min-width: 1600px)`) in `css/style.css`. (Placeholder media query added)
    *   **Rationale:** Improve visual balance on very large screens.

5.  **Visual Clarity - Grid Overflow Blocks:**
    *   **Task:** Consider adding a subtle border or slightly different background to `.day-block.overflow` in `css/style.css`.
    *   **Goal:** Visually differentiate the active grid area from unused space within the 30x13 structure, if deemed necessary after review. (Currently hidden via `visibility: hidden`)
    *   **Rationale:** Minor visual refinement for grid boundary clarity.

---

**Next Step:** Prioritize and implement these tasks, starting with the remaining High Priority items (Color Contrast, Grid Semantics/Navigation). Update this guide or the main `progress.md` as tasks are completed.
