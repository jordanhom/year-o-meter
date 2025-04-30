# Tech Context: time_left_this_year

## 1. Core Technologies

*   **HTML5:** Used for structuring the web page content within `time_left.html`. Utilizes semantic elements like `<section>`, `<button>`, `<input type="checkbox">`.
*   **CSS3:** Used for all styling and layout, embedded within a `<style>` block in `time_left.html`. Leverages Flexbox for layout, CSS Variables (implicitly via color definitions), transitions for animations (progress bar, options panel), and media queries for responsiveness.
*   **JavaScript (ES6+ Features):** Used for all client-side logic, including date/time calculations, DOM manipulation, event handling, and state management. Code is embedded within a `<script>` block in `time_left.html`. Uses modern features like `const`, `let`, arrow functions, `padStart`, `Intl.DateTimeFormat`.

*(Based on `projectbrief.md` and analysis of `time_left.html`)*

## 2. Key Libraries & Dependencies

*   **None:** The application currently uses only standard browser APIs (HTML, CSS, JavaScript). No external libraries like `date-fns` or frameworks are used.

*(Based on `projectbrief.md` and analysis of `time_left.html`)*

## 3. Development Setup & Environment

*   **Environment:** Standard web browser environment supporting HTML5, CSS3, and ES6+ JavaScript.
*   **Build Process:** None required. The application runs directly from the single `time_left.html` file.
*   **Development Server:** Not strictly necessary as there are no ES Modules loaded via `import` statements. The `time_left.html` file can likely be opened directly via the `file://` protocol in most modern browsers. However, using a simple local HTTP server (like `live-server`, Python's `http.server`) is still good practice during development.

*(Based on `projectbrief.md` and analysis of `time_left.html`)*

## 4. Technical Constraints

*   **Client-Side Only:** No backend infrastructure. All logic executes within the browser.
*   **Single File:** All code (HTML, CSS, JS) is currently in one file. This could become harder to manage if the project grows significantly.
*   **Browser Compatibility:** Primarily targets modern evergreen browsers. Compatibility with older browsers (e.g., IE11) is not expected due to ES6+ features and modern CSS. `Intl.DateTimeFormat` with `fractionalSecondDigits` might have limitations in some environments (fallback implemented).
*   **No Persistence:** User preferences for options are not saved between sessions.

*(Based on `projectbrief.md` and analysis of `time_left.html`)*

## 5. Tool Usage Patterns

*   **Version Control:** Git is likely used (assumed, standard practice), but no specific repository details are available in the provided context for *this* project.
*   **Editor:** Visual Studio Code was mentioned as being used during the initial "vibe coding" phase.
*   **Code Formatting/Linting:** No specific tools configured. Code style is generally consistent within the file.

*(Based on user input and analysis of `time_left.html`)*
