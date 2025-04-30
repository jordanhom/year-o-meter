# Product Context: Year-O-Meter

## 1. Purpose & Problem Solved

`Year-O-Meter` provides an immediate, visually engaging way to see the progression of the current year and the time remaining until its end. It addresses the abstract concept of time passing within a year by making it tangible through a countdown, progress bar, and optional daily grid.

The primary goal is to offer a passive, ambient display of time's passage throughout the year, requiring no user input for its core function, while also providing optional visualizations for deeper reflection. It serves as a simple, focused tool for time awareness.

*(Based on `projectbrief.md` and analysis)*

## 2. Target User & Experience Goals

*   **Target User:** Anyone interested in a simple, visual representation of the year's progress. Useful for personal dashboards, ambient displays, or moments of reflection on time.
*   **Experience Goals:**
    *   **Immediacy:** Core information (countdown, progress) is visible and updates automatically on page load.
    *   **Clarity:** Displays (time, countdown, progress bar, grid) should be easy to understand.
    *   **Engagement (Optional):** The optional grid and seasonal themes provide visual interest and additional layers of information.
    *   **Simplicity:** Core function requires no interaction. Optional features are grouped and clearly labeled.
    *   **Accuracy:** Time calculations (countdown, progress, leap years) must be correct.
    *   **Responsiveness:** The layout should adapt cleanly to different screen sizes.
    *   **Low Friction:** No setup, login, or complex configuration needed.

*(Based on `projectbrief.md` and analysis)*

## 3. How It Should Work (User Flow)

1.  **Initial Load:**
    *   User visits the web page (`index.html`).
    *   The page immediately displays:
        *   Current Date and Time (dynamically updating).
        *   A title ("Time remaining this year").
        *   A progress bar showing the percentage of the year elapsed (dynamically updating).
        *   A countdown overlay on the progress bar showing Days, Hours, Minutes, Seconds remaining (dynamically updating).
    *   A "Customize View" section is present but collapsed by default.
    *   The optional Year Grid is hidden by default.
2.  **Passive Viewing:**
    *   The date, time, progress bar, and countdown update automatically at a set interval.
3.  **Optional Interaction (Customize View):**
    *   User clicks the "Customize View" header to expand the panel.
    *   User can toggle checkboxes to:
        *   Show milliseconds in the time and countdown displays.
        *   Apply seasonal color themes to the UI.
        *   Show the Year Grid visualization.
    *   If the Year Grid is toggled on:
        *   The grid appears below the progress bar/countdown.
        *   Checkboxes for grid-specific options (Circles, Holidays, Solstice) become enabled.
        *   User can toggle these sub-options to modify the grid's appearance.
    *   Changes take effect immediately. Dependent options are disabled/enabled appropriately.
4.  **Grid Interaction:**
    *   If the grid is visible, hovering over a day block shows a tooltip with the date and any special designation (holiday, solstice).

*(Based on analysis of `index.html`, `css/style.css`, `js/main.js`)*

## 4. Key Product Decisions (Rationale)

*   **Zero-Input Core Function:** Maximizes immediacy and allows for passive use.
*   **Combined Progress Bar & Countdown:** Visually links the remaining time units to the overall year progression.
*   **Optional Features:** Provides depth without cluttering the core experience. Grouped in a collapsible section.
*   **Vanilla JS / Separated Files:** Keeps the project simple and lightweight, while improving organization and maintainability compared to the initial single-file structure. Easy to deploy/understand.
*   **Dynamic Updates (`setInterval`):** Provides the live countdown effect. Interval adjusts based on whether milliseconds are shown.
*   **Seasonal Theming:** Adds visual variety and subtle connection to the time of year. Basic hemisphere detection adds a small layer of context.
*   **Year Grid Visualization:** Offers a granular, day-by-day view of the year, inspired by "year in pixels" concepts.
*   **Grid Sub-Options (Circles, Holidays, Solstice):** Adds layers of customization and information to the grid visualization.

*(Based on `projectbrief.md` and analysis)*
