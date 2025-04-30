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
*   **Libraries:** None
*   **Development:** Runs directly in the browser from the single `time_left.html` file. No build process required.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd year-o-meter
    ```
2.  **Open the file:** Simply open the `time_left.html` file directly in your web browser (e.g., double-click the file or use `File > Open` in your browser).
    *   *(Note: While a local HTTP server isn't strictly required because this project doesn't use ES Modules across files, using one during development is still good practice.)*
3.  **Use the application:**
    *   The countdown and progress bar will start automatically.
    *   Expand the "Extra Options…" panel to toggle features like milliseconds, seasonal styling, and the year grid.
    *   If the grid is enabled, explore its sub-options (circles, holidays, solstice).

## Current Status

*   **Functionally Complete:** The application as implemented in `time_left.html` includes all features described above.
*   **Initial Documentation:** Core Memory Bank files have been created based on the existing code.
*   **Next Steps:** Potential next steps include code review, refactoring into separate files (HTML, CSS, JS) for better organization, or adding new features.

## Future Ideas (Potential)

*   Refactoring into separate files/modules.
*   Saving user preferences (e.g., using `localStorage`).
*   Support for different locales (holidays, date formats).
*   More configuration options (colors, grid layout).

## Contributing

This is currently a personal project in a private repository, so contributions are not being sought at this time.

## License

All rights reserved. (No open-source license currently applied).
