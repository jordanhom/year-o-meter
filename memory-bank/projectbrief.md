# Project Brief: Year-O-Meter

## 1. Core Concept & Goal

This project, **`Year-O-Meter`** (formerly `time_left_this_year`), aims to create a visually engaging, single-page web application that displays the time remaining until the end of the current year.

The primary goal is to provide an immediate, dynamic visualization of the year's progression and the time left, requiring no user input for its core functionality. It also offers optional features to enhance the visualization and user experience.

*(Derived from initial analysis and subsequent refactoring)*

## 2. Core Requirements

*   **Core Display:**
    *   Show the current date and time, updating dynamically.
    *   Display a countdown showing the time remaining in the current year (Days, Hours, Minutes, Seconds).
    *   Display a progress bar visually representing the percentage of the year that has elapsed.
*   **Calculations:**
    *   Accurately calculate the time difference between the current moment and the end of the year.
    *   Accurately calculate the percentage of the year elapsed.
    *   Handle leap years correctly for progress and grid calculations.
*   **Optional Features (User-Togglable):**
    *   Display milliseconds in the countdown and current time display.
    *   Apply seasonal color themes to the UI based on the current date and hemisphere (basic detection).
    *   Display a grid visualization representing the days of the current year (approx. 30x13 layout).
        *   Color-code grid blocks to indicate past, present (today), and future days.
        *   Optionally render grid blocks as circles instead of squares.
        *   Optionally highlight major US holidays on the grid.
        *   Optionally highlight approximate solstice days (longest/shortest) on the grid.
*   **User Interface:**
    *   Present information clearly upon page load.
    *   Provide a collapsible "Customize View" section containing toggles (checkboxes) for all optional features.
    *   Ensure dependent options (e.g., grid shape, holidays) are disabled/enabled based on the main grid toggle.
    *   Provide tooltips (title attribute) on grid days showing the date and any special designation (holiday, solstice).
*   **Technical:**
    *   Implement using HTML, CSS, and modern vanilla JavaScript (ES6+ features).
    *   **Structure:** Separate files for HTML (`index.html`), CSS (`css/style.css`), and JavaScript (`js/main.js`).
    *   Update displays dynamically using `setInterval`.
    *   Implement a responsive design suitable for various screen sizes.
    *   Maintain clean, understandable code with comments explaining logic.
    *   No external libraries required for core functionality.

*(Derived from initial analysis and subsequent refactoring)*

## 3. Scope

*   **In Scope:**
    *   All core requirements listed above.
    *   Dynamic updates via `setInterval`.
    *   Basic seasonal theming (Spring, Summer, Autumn, Winter) with approximate hemisphere detection.
    *   Year grid visualization (30x13 fixed layout).
    *   Calculation and display of major US holidays (fixed and calculated).
    *   Calculation and display of approximate solstice dates.
    *   Responsive CSS adjustments.
*   **Out of Scope (Assumed based on current implementation):**
    *   User accounts or data persistence.
    *   Saving user preferences for options.
    *   Support for different locales (holiday calculations, date/time formatting beyond browser defaults).
    *   Configurable grid layouts or color schemes beyond seasonal.
    *   Backend integration or data fetching.
    *   Build process or bundling.

## 4. Technology Stack (Current)

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+ features).
*   **Structure:** Separate files: `index.html`, `css/style.css`, `js/main.js`.
*   **Libraries:** None currently used.
*   **Development:** Runs directly in the browser; no build step required.

*(Derived from initial analysis and subsequent refactoring)*

## 5. Source of Truth

This document serves as the foundational definition of the project's scope and core requirements. All other Memory Bank files will build upon this brief.
