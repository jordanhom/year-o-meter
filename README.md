# Year-O-Meter

A visually engaging, single-page web application that displays the time remaining until the end of the current year, providing an immediate, dynamic visualization of the year's progression.

**(Note: A screenshot or GIF of the application in action would be beneficial here.)**

## Purpose

Year-O-Meter aims to make the abstract concept of time passing within a year more tangible. It provides:

*   A live countdown to the end of the year.
*   A dynamic progress bar showing the percentage of the year elapsed.
*   Optional visualizations like a daily grid and seasonal themes for deeper reflection.

It's designed as a simple, focused tool for time awareness that requires no user input for its core functionality.

## Features

*   **Live Countdown:** Displays remaining Days, Hours, Minutes, and Seconds until the New Year, updating dynamically.
*   **Live Date & Time:** Shows the current date and time.
*   **Year Progress Bar:** Visually represents the percentage of the year completed.
*   **Optional Milliseconds:** Toggle to display milliseconds in the countdown and time for higher precision updates.
*   **Optional Seasonal Themes:** Applies color themes (Spring, Summer, Autumn, Winter) to the UI based on the current date and approximate hemisphere.
*   **Optional Year Grid:**
    *   Displays a grid of blocks representing each day of the year (approx. 30x13 layout).
    *   Color-codes blocks for past, present (today), and future days.
    *   Optionally render blocks as circles instead of squares.
    *   Optionally highlight major US holidays.
    *   Optionally highlight approximate solstice days (longest/shortest).
    *   Provides tooltips on grid days showing the date and any special designation.
*   **Collapsible Options Panel:** Neatly organizes toggles for all optional features.
*   **Responsive Design:** Adapts layout for desktop, tablet, and mobile screens.
*   **Zero Dependencies:** Runs entirely with vanilla HTML, CSS, and JavaScript.

## Technology Stack

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+ features)
*   **Structure:** Separate files for structure (`index.html`), styling (`css/style.css`), and logic (`js/main.js`).
*   **Libraries:** None
*   **Development:** Runs directly in the browser. No build process required.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd year-o-meter
    ```
2.  **Open the file:** Simply open the `index.html` file directly in your web browser (e.g., double-click the file or use `File > Open` in your browser).
    *   *(Note: Using a local HTTP server during development is still good practice.)*
3.  **Use the application:**
    *   The countdown and progress bar will start automatically.
    *   Expand the "Customize View" panel (previously "Extra Options…") to toggle features like milliseconds, seasonal styling, and the year grid.
    *   If the grid is enabled, explore its sub-options (circles, holidays, solstice).

## Current Status

*   **Functionally Complete:** The application includes all features described above.
*   **Refactored:** The codebase has been split into separate HTML, CSS, and JavaScript files for better organization and maintainability.
*   **Initial Documentation:** Core Memory Bank files have been created and updated.
*   **Next Steps:** Potential next steps include implementing UX refinements (accessibility, clarity), code review, or adding new features.

## Future Ideas (Potential)

*   Saving user preferences (e.g., using `localStorage`).
*   Support for different locales (holidays, date formats).
*   More configuration options (colors, grid layout).
*   Adding unit tests.

## Contributing

This is currently a personal project in a private repository, so contributions are not being sought at this time.

## License

All rights reserved. (No open-source license currently applied).
