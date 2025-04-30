# Tech Context: Year-O-Meter

## 1. Core Technologies

*   **HTML5:** Used for structuring the web page content in `index.html`. Utilizes semantic elements like `<section>`, `<button>`, `<input type="checkbox">`.
*   **CSS3:** Used for all styling and layout, externalized in `css/style.css`. Leverages Flexbox for layout, CSS Variables (implicitly via color definitions), transitions for animations (progress bar, options panel), and media queries for responsiveness.
*   **JavaScript (ES6+ Features):** Used for all client-side logic, including date/time calculations, DOM manipulation, event handling, and state management. Code is externalized in `js/main.js`, loaded with `defer`. Uses modern features like `const`, `let`, arrow functions, `padStart`, `Intl.DateTimeFormat`.

*(Based on `projectbrief.md` and analysis)*

## 2. Key Libraries & Dependencies

*   **None:** The application currently uses only standard browser APIs (HTML, CSS, JavaScript). No external libraries or frameworks are used.

*(Based on `projectbrief.md` and analysis)*

## 3. Development Setup & Environment

*   **Environment:** Standard web browser environment supporting HTML5, CSS3, and ES6+ JavaScript.
*   **File Structure:**
    *   `index.html` (Root)
    *   `css/style.css`
    *   `js/main.js`
    *   `README.md`
    *   `memory-bank/` (Contains documentation)
*   **Build Process:** None required. The application runs directly by opening `index.html`.
*   **Development Server:** Not strictly necessary as there are no ES Modules loaded via `import` statements that require specific server MIME types. `index.html` can likely be opened directly via the `file://` protocol. However, using a simple local HTTP server (like `live-server`, Python's `http.server`) remains good practice.

*(Based on `projectbrief.md` and analysis)*

## 4. Technical Constraints

*   **Client-Side Only:** No backend infrastructure. All logic executes within the browser.
*   **Browser Compatibility:** Primarily targets modern evergreen browsers. Compatibility with older browsers (e.g., IE11) is not expected due to ES6+ features and modern CSS. `Intl.DateTimeFormat` with `fractionalSecondDigits` might have limitations in some environments (fallback implemented).
*   **No Persistence:** User preferences for options are not saved between sessions.

*(Based on `projectbrief.md` and analysis)*

## 5. Tool Usage Patterns

*   **Version Control:** Git is used (repository exists).
*   **Editor:** Visual Studio Code (mentioned previously).
*   **Code Formatting/Linting:** No specific tools configured. Code style is generally consistent.

*(Based on user input and analysis)*
