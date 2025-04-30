# System Patterns: Year-O-Meter

## 1. Architecture Overview

`Year-O-Meter` is a client-side, single-page web application implemented using standard web technologies with a clear separation of concerns.

*   **Frontend Only:** All structure (HTML), styling (CSS), and logic (JavaScript) reside and execute in the user's browser. No backend component.
*   **Separated Structure:**
    *   `index.html`: Contains the semantic structure of the page.
    *   `css/style.css`: Contains all presentation rules, linked from the HTML head.
    *   `js/main.js`: Contains all application logic and DOM manipulation, loaded via a `<script>` tag with the `defer` attribute in the HTML body.
*   **Logical JS Structure (within `js/main.js`):** The JavaScript file maintains a logical separation:
    *   **State Variables:** Module-level `let` variables track the state of user-toggled options (e.g., `showMilliseconds`, `showGrid`).
    *   **DOM References:** Constants hold references to frequently accessed DOM elements, cached on load.
    *   **Initialization:** Code runs after the DOM is parsed (due to `defer`) to set initial checkbox states and attach event listeners.
    *   **Event Listeners:** Functions attached to checkboxes and the options toggle button handle user interactions and update state variables.
    *   **Core Logic Functions:** Separate functions handle time/progress calculations (`getTimeRemaining`, `getYearProgressPercent`), holiday/solstice data (`getHolidays`, `getSolsticeDays`), seasonal detection (`getSeason`), and utility tasks (`pad`, `isLeapYear`).
    *   **Rendering Functions:** Dedicated functions update specific parts of the UI (`renderCountdown`, `renderDateTime`, `renderProgress`, `renderYearGrid`).
    *   **Main Update Loop:** A `renderAll` function calls all individual rendering functions. This is executed by `setInterval`.
    *   **Interval Management:** `setupUpdateInterval` manages the `setInterval` timer, adjusting its frequency based on the `showMilliseconds` state.

*(Based on analysis of `index.html`, `css/style.css`, `js/main.js`)*

## 2. Key Technical Decisions & Patterns

*   **Separation of Concerns:** HTML for structure, CSS for style, JS for behavior, improving maintainability and readability over the previous single-file approach.
*   **Vanilla JavaScript (ES6+ Features):** Avoids external library dependencies. Uses modern syntax like `const`, `let`, arrow functions, template literals, `padStart`.
*   **Direct DOM Manipulation:** UI updates are performed by directly setting `innerHTML`, `textContent`, `style` properties, and manipulating CSS classes (`classList`).
*   **`defer` Script Loading:** Ensures the HTML DOM is fully parsed before `js/main.js` executes, preventing errors from trying to access elements that don't exist yet.
*   **`setInterval` for Updates:** Drives the dynamic countdown and progress bar updates. The interval frequency is adjusted based on whether milliseconds need to be displayed.
*   **State Management via Module Variables:** Simple `let` variables track the on/off state of optional features. Event listeners update these variables directly.
*   **Event Delegation (Not Used):** Event listeners are attached directly to individual checkboxes and the toggle button.
*   **CSS Styling (`css/style.css`):** All styles are externalized. Uses classes extensively for styling and state changes (e.g., `.season-*`, `.circles`, `.past`, `.today`, `.future`, `.collapsed`).
*   **Responsive Design:** Media queries within the CSS adjust layout and sizing for smaller screens.
*   **Grid Rendering Optimization:**
    *   **Pattern:** The `renderYearGrid` function builds the grid's DOM structure (`div.day-block` elements) only once per year (or when forced by options like `showGrid` or `showCircles`). It stores references to these elements in an array (`dayBlockElements`). On subsequent updates within the same year, it only iterates through the stored elements to update their CSS classes (`past`, `today`, `future`, `holiday`, etc.) and `title` attributes.
    *   **Rationale:** Significantly improves performance by avoiding costly DOM rebuilds on every interval tick. Updating classes/attributes is much faster.
*   **Collapsible Section Pattern:** Uses a `<button>` to toggle a `collapsed` class on the content `div`, combined with CSS transitions on `max-height` and `opacity` for smooth animation. ARIA attributes (`aria-expanded`, `aria-controls`, `aria-hidden`) are used for accessibility.
*   **Conditional Logic for Dependent Options:** JavaScript (`updateGridOptionStates`) enables/disables checkboxes for grid sub-options based on the main grid toggle's state.

*(Based on analysis of `index.html`, `css/style.css`, `js/main.js`)*

## 3. Component Relationships & Data Flow

1.  **Load:** Browser parses `index.html`. It encounters `<link rel="stylesheet" href="css/style.css">` and fetches/applies CSS. It encounters `<script src="js/main.js" defer>` and fetches the script but defers execution until the HTML is parsed.
2.  **DOM Ready, JS Execution:**
    *   `js/main.js` executes.
    *   DOM element references are cached.
    *   Initial checkbox states are set.
    *   Event listeners are attached to checkboxes and the options toggle.
    *   `updateGridOptionStates` sets initial disabled states.
    *   `setupUpdateInterval` starts the main timer calling `renderAll`.
    *   `renderAll` is called once immediately to populate the UI.
3.  **Update Tick (`setInterval -> renderAll`):**
    *   `applySeasonStyle` checks `styleSeason` flag and updates container class.
    *   `renderDateTime` gets `new Date()`, formats it based on `showMilliseconds`, updates DOM.
    *   `renderCountdown` calls `getTimeRemaining`, formats result based on `showMilliseconds`, updates DOM.
    *   `renderProgress` calls `getYearProgressPercent`, updates progress bar width and countdown text class.
    *   `renderYearGrid` checks `showGrid`:
        *   If hidden, ensures container is hidden.
        *   If visible:
            *   Ensures container is visible.
            *   Checks if DOM structure needs rebuild (`currentYearGridRendered !== year`). If so, clears grid, creates `div.day-block`s, stores references in `dayBlockElements`.
            *   Toggles `circles` class on grid based on `showCircles`.
            *   Calculates `dayOfYear`.
            *   Gets holiday/solstice data if `showHolidays`/`showSolstice` are true.
            *   Iterates through `dayBlockElements`, updating classes (`past`/`today`/`future`/`holiday`/etc.) and `title` based on current date and options.
4.  **User Interaction (Checkbox Change):**
    *   Event listener fires.
    *   Associated state variable (`showGrid`, `showMilliseconds`, etc.) is updated.
    *   If `toggle-ms`, `setupUpdateInterval` is called to adjust timer speed.
    *   If `toggle-grid`, `updateGridOptionStates` is called, `currentYearGridRendered` is reset.
    *   If `toggle-circles`, `currentYearGridRendered` is reset.
    *   `renderAll` is called immediately to reflect the change.
5.  **User Interaction (Options Toggle):**
    *   Event listener fires (`click` or `keydown`).
    *   `toggleOptionsPanel` updates `optionsOpen` state, toggles CSS classes (`collapsed`, `open`), and updates ARIA attributes.

*(Based on analysis of `index.html`, `css/style.css`, `js/main.js`)*
