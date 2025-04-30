'use strict';

// --- State Variables ---
// These variables control the application's features and are toggled by the checkboxes.
let showMilliseconds = false; // Display milliseconds in countdown/time?
let showGrid = false;         // Display the year grid visualization?
let showCircles = false;      // Use circles instead of squares in the grid?
let showHolidays = false;     // Highlight holidays on the grid?
let showSolstice = false;     // Highlight solstice days on the grid?
let styleSeason = false;      // Apply seasonal color themes?

// --- Grid Rendering Optimization Variables ---
let currentYearGridRendered = null; // Tracks the year the grid DOM was last built for. Avoids rebuilding unnecessarily.
let dayBlockElements = [];          // Stores references to the created grid cell DOM elements for quick updates.

// --- DOM Element References ---
// Get references to frequently used elements upfront for performance.
const checkboxMs = document.getElementById('toggle-ms');
const checkboxGrid = document.getElementById('toggle-grid');
const checkboxCircles = document.getElementById('toggle-circles');
const checkboxHolidays = document.getElementById('toggle-holidays');
const checkboxSolstice = document.getElementById('toggle-solstice');
const checkboxSeason = document.getElementById('toggle-season');
const gridWrap = document.getElementById('year-grid-component'); // The container for the grid
const gridEl = document.getElementById('year-grid');             // The grid element itself
const container = document.getElementById('main-container');     // The main page container for seasonal styling
const dateLineEl = document.getElementById('date-line');
const timeLineEl = document.getElementById('time-line');
const countdownEl = document.getElementById('countdown');
const progressEl = document.getElementById('progress');
const extraOptionsToggle = document.getElementById("extra-options-toggle");
const carrot = document.getElementById("carrot");
const featuresToggles = document.getElementById("features-toggles");

// --- Initialization ---
// Set the initial state of checkboxes to match the default state variables.
if (checkboxMs) checkboxMs.checked = showMilliseconds;
if (checkboxSeason) checkboxSeason.checked = styleSeason;
if (checkboxGrid) checkboxGrid.checked = showGrid;
if (checkboxCircles) checkboxCircles.checked = showCircles;
if (checkboxHolidays) checkboxHolidays.checked = showHolidays;
if (checkboxSolstice) checkboxSolstice.checked = showSolstice;

/**
 * Enables or disables grid-specific option checkboxes based on whether the grid is shown.
 * Also resets the state of dependent options if the grid is hidden.
 */
function updateGridOptionStates() {
  const gridIsEnabled = showGrid;
  if (checkboxCircles) checkboxCircles.disabled = !gridIsEnabled;
  if (checkboxHolidays) checkboxHolidays.disabled = !gridIsEnabled;
  if (checkboxSolstice) checkboxSolstice.disabled = !gridIsEnabled;

  // If grid is turned off, uncheck and reset state for dependent options
  if (!gridIsEnabled) {
    if (checkboxCircles) checkboxCircles.checked = false;
    if (checkboxHolidays) checkboxHolidays.checked = false;
    if (checkboxSolstice) checkboxSolstice.checked = false;
    showCircles = false;
    showHolidays = false;
    showSolstice = false;
  }
}
// Run once on load to set initial disabled states.
updateGridOptionStates();

// --- Update Interval Management ---
let updateInterval = 200; // Default update frequency (milliseconds)
let intervalId = null;    // Stores the ID returned by setInterval

/**
 * Sets or resets the main update interval timer (`setInterval`).
 * Uses a faster interval (50ms) if milliseconds are shown, otherwise slower (200ms).
 */
function setupUpdateInterval() {
    if (intervalId) clearInterval(intervalId); // Clear any existing interval first
    updateInterval = showMilliseconds ? 50 : 200; // Adjust speed based on option
    intervalId = setInterval(renderAll, updateInterval); // Start the new interval
    // console.log(`Interval set to ${updateInterval}ms`); // Optional debug log
}

// --- Event Listeners for Options ---

// Listener for Milliseconds toggle
if (checkboxMs) {
    checkboxMs.addEventListener('change', function() {
        showMilliseconds = this.checked; // Update state variable
        setupUpdateInterval();           // Adjust timer speed
        renderAll();                     // Re-render immediately with new setting
    });
}

// Listener for Seasonal Styling toggle
if (checkboxSeason) {
    checkboxSeason.addEventListener('change', function() {
      styleSeason = this.checked; // Update state variable
      applySeasonStyle();         // Apply/remove seasonal CSS classes
      renderAll();                // Re-render (mainly for grid colors if shown)
    });
}

// Listener for Year Grid toggle
if (checkboxGrid) {
    checkboxGrid.addEventListener('change', function() {
      showGrid = this.checked;          // Update state variable
      updateGridOptionStates();       // Enable/disable dependent options
      // Force the grid structure to be rebuilt next time renderAll runs,
      // because visibility changed or dependent options might reset.
      currentYearGridRendered = null;
      renderAll();                    // Re-render (shows/hides grid, updates dependent options)
    });
}

// Listener for Grid Circles toggle
if (checkboxCircles) {
    checkboxCircles.addEventListener('change', function() {
      showCircles = this.checked; // Update state variable
      // Force grid rebuild because the 'circles' class needs to be added/removed
      // at the grid container level, affecting all blocks.
      currentYearGridRendered = null;
      renderAll();                // Re-render grid
    });
}

// Listener for Holidays toggle
if (checkboxHolidays) {
    checkboxHolidays.addEventListener('change', function() {
      showHolidays = this.checked; // Update state variable
      // No need to rebuild grid structure, just update styles.
      renderAll();                 // Re-render grid to apply/remove holiday class
    });
}

// Listener for Solstice toggle
if (checkboxSolstice) {
    checkboxSolstice.addEventListener('change', function() {
      showSolstice = this.checked; // Update state variable
      // No need to rebuild grid structure, just update styles.
      renderAll();                 // Re-render grid to apply/remove solstice classes
    });
}

// --- Extra Options Panel Logic ---
let optionsOpen = false; // State for the collapsible panel

/**
 * Toggles the visibility of the extra options panel and updates ARIA attributes.
 */
function toggleOptionsPanel() {
  optionsOpen = !optionsOpen;
  // Toggle CSS classes for visual state and animation
  if (featuresToggles) featuresToggles.classList.toggle("collapsed", !optionsOpen);
  if (carrot) carrot.classList.toggle("open", optionsOpen);
  // Update ARIA attributes for accessibility
  if (extraOptionsToggle) extraOptionsToggle.setAttribute("aria-expanded", optionsOpen ? "true" : "false");
  if (featuresToggles) featuresToggles.setAttribute("aria-hidden", optionsOpen ? "false" : "true");
}
// Toggle panel on button click
if (extraOptionsToggle) {
    extraOptionsToggle.addEventListener("click", toggleOptionsPanel);
    // Toggle panel on Space or Enter key press for accessibility
    extraOptionsToggle.addEventListener("keydown", function(e) {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault(); // Prevent default button action (like scrolling)
        toggleOptionsPanel();
      }
    });
}

// --- Seasonal Styling Logic ---

/**
 * Determines the current season based on the date and locale (basic hemisphere detection).
 * @param {Date} [date=new Date()] - The date to check.
 * @param {string} [locale=navigator.language] - The browser locale (e.g., 'en-US', 'en-AU').
 * @returns {string} The season ('spring', 'summer', 'autumn', 'winter').
 */
function getSeason(date = new Date(), locale = navigator.language) {
  const month = date.getMonth(); // 0-11
  // Very basic check for Southern Hemisphere locales
  const southernLocales = ['AU','NZ','ZA','AR','BR','CL','UY','PY','BO','PE','EC'];
  let isSouthern = southernLocales.some(code => locale.toUpperCase().includes('-' + code));

  // Determine season based on month (adjusting for hemisphere)
  // Note: These are meteorological season approximations (Dec-Feb = Winter/Summer, etc.)
  if (!isSouthern) { // Northern Hemisphere
    if (month >= 2 && month <= 4) return 'spring';  // Mar, Apr, May
    if (month >= 5 && month <= 7) return 'summer';  // Jun, Jul, Aug
    if (month >= 8 && month <= 10) return 'autumn'; // Sep, Oct, Nov
    return 'winter'; // Dec, Jan, Feb
  } else { // Southern Hemisphere
    if (month >= 2 && month <= 4) return 'autumn';
    if (month >= 5 && month <= 7) return 'winter';
    if (month >= 8 && month <= 10) return 'spring';
    return 'summer';
  }
}

/**
 * Applies the appropriate seasonal CSS class to the main container element.
 * Removes existing season classes first.
 */
function applySeasonStyle() {
  if (!container) return;
  // Remove all possible season classes first
  container.classList.remove('season-spring','season-summer','season-autumn','season-winter');
  // Add the current season class if the option is enabled
  if (styleSeason) {
    const season = getSeason();
    container.classList.add('season-' + season);
  }
}

// --- Time & Progress Calculation Functions ---

/**
 * Calculates the time remaining until the end of the current year.
 * @returns {object} Object containing days, hours, minutes, seconds, milliseconds remaining.
 */
function getTimeRemaining() {
  const now = new Date();
  const year = now.getFullYear();
  // Target is the very end of the last day of the year
  const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999);
  let diff = endOfYear - now; // Difference in milliseconds

  // Handle edge case where calculation might be slightly negative right at year change
  if (diff < 0) diff = 0;

  // Calculate individual units
  const ms = diff % 1000;
  diff = Math.floor(diff / 1000); // Convert to seconds
  const s = diff % 60;
  diff = Math.floor(diff / 60); // Convert to minutes
  const m = diff % 60;
  diff = Math.floor(diff / 60); // Convert to hours
  const h = diff % 24;
  const d = Math.floor(diff / 24); // Full days remaining

  return { days: d, hours: h, minutes: m, seconds: s, milliseconds: ms };
}

/**
 * Calculates the percentage of the current year that has elapsed.
 * @returns {number} Percentage (0-100).
 */
function getYearProgressPercent() {
  const now = new Date();
  const year = now.getFullYear();
  const startOfYear = new Date(year, 0, 1, 0, 0, 0, 0); // Start of Jan 1st
  const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999); // End of Dec 31st
  const elapsed = now - startOfYear; // Milliseconds elapsed since start of year
  const total = endOfYear - startOfYear; // Total milliseconds in the year

  let percent = (elapsed / total) * 100;

  // Clamp percentage between 0 and 100
  if (percent < 0) percent = 0;
  if (percent > 100) percent = 100;

  return percent;
}

/**
 * Helper function to pad a number with leading zeros.
 * @param {number} n - The number to pad.
 * @param {number} [width=2] - The desired minimum width.
 * @returns {string} The padded number as a string.
 */
function pad(n, width = 2) {
  return n.toString().padStart(width, '0');
}

// --- UI Rendering Functions ---

/**
 * Updates the countdown display (Days, Hours, Minutes, Seconds, optional Milliseconds).
 */
function renderCountdown() {
  if (!countdownEl) return;
  const t = getTimeRemaining();
  // Prepare the HTML string for the milliseconds unit (only added if showMilliseconds is true)
  let msUnit = `
    <div class="unit ms"><span class="number">${pad(t.milliseconds, 3)}</span><span class="label">ms</span></div>
  `;
  // Main HTML structure for the countdown units
  // Conditionally include milliseconds unit based on showMilliseconds flag
  let html = `
    <div class="unit"><span class="number">${t.days}</span><span class="label">Days</span></div>
    <div class="unit"><span class="number">${pad(t.hours)}</span><span class="label">Hours</span></div>
    <div class="unit"><span class="number">${pad(t.minutes)}</span><span class="label">Minutes</span></div>
    <div class="unit"><span class="number">${pad(t.seconds)}</span><span class="label">Seconds</span></div>
    ${showMilliseconds ? msUnit : ''}
  `;
  // Update the DOM
  countdownEl.innerHTML = html;
}

/**
 * Updates the current date and time display. Uses Intl.DateTimeFormat for robust formatting,
 * especially when including milliseconds.
 */
function renderDateTime() {
    if (!dateLineEl || !timeLineEl) return;
    const now = new Date();
    // Format the date (e.g., "October 26, 2023")
    const dateStr = now.toLocaleDateString(undefined, { // 'undefined' uses browser default locale
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    // Determine user locale, fallback to 'en-US'
    const userLocale = navigator.language || 'en-US';

    let timeStr;
    if (showMilliseconds) {
        // Use Intl.DateTimeFormat for reliable time formatting with milliseconds
        try {
          timeStr = new Intl.DateTimeFormat(userLocale, {
              hour: 'numeric', // e.g., 1, 11
              minute: '2-digit', // e.g., 05, 59
              second: '2-digit', // e.g., 08, 45
              fractionalSecondDigits: 3, // Include milliseconds (e.g., .123)
              hour12: true // Use AM/PM (can be set based on locale or preference)
          }).format(now);
        } catch (e) {
          // Fallback if Intl or fractionalSecondDigits isn't fully supported
          console.warn("Intl.DateTimeFormat with fractionalSecondDigits might not be fully supported. Falling back.", e);
          const basicTimeStr = now.toLocaleTimeString(); // Get basic time string
          const ms = now.getMilliseconds().toString().padStart(3, '0');
          // Attempt to insert ms before AM/PM using regex (less reliable)
          timeStr = basicTimeStr.replace(/(:\d{2})(?!.*:\d{2})/, `$1.${ms}`);
          // If regex failed (e.g., different locale format), just append ms
          if (timeStr === basicTimeStr) {
             timeStr += `.${ms}`;
          }
        }
    } else {
        // Get standard time string without milliseconds
        timeStr = now.toLocaleTimeString();
    }

    // Update the DOM elements
    dateLineEl.textContent = dateStr;
    timeLineEl.textContent = timeStr;
}

/**
 * Updates the width of the progress bar and applies/removes the 'low-progress'
 * class to the countdown text for styling adjustments.
 */
function renderProgress() {
  if (!progressEl || !countdownEl) return;
  const percent = getYearProgressPercent();

  // Set the width style of the inner progress bar
  progressEl.style.width = percent + '%';

  // Add a class to the countdown text when progress is low (e.g., < 10%)
  // This allows styling the labels differently (e.g., making them lighter).
  if (percent < 10) {
    countdownEl.classList.add('low-progress');
  } else {
    countdownEl.classList.remove('low-progress');
  }
}

// --- Holiday & Solstice Data Functions ---

/**
 * Generates a list of major US holidays for a given year.
 * Includes fixed dates and calculated dates (e.g., Nth weekday of a month).
 * @param {number} year - The year for which to calculate holidays.
 * @returns {Array<object>} An array of holiday objects {month, day, name}.
 */
function getHolidays(year) {
  /**
   * Helper to find the date of the Nth specific weekday within a given month and year.
   * @param {number} n - The occurrence (1-4 for 1st-4th, 5 for *last*).
   * @param {number} weekday - The target day of the week (0=Sun, 1=Mon, ..., 6=Sat).
   * @param {number} month - The target month (0=Jan, ..., 11=Dec).
   * @param {number} year - The target year.
   * @returns {number|null} The day of the month (1-31), or null if not found.
   */
  function findNthWeekdayOfMonth(n, weekday, month, year) {
    const date = new Date(year, month, 1); // Start at the 1st of the month
    let count = 0; // How many times we've found the target weekday
    let dayOfMonth = null;

    if (n === 5) { // Special case: Find the *last* occurrence
      date.setMonth(date.getMonth() + 1); // Go to the 1st day of the *next* month
      date.setDate(0); // Go back one day to the *last* day of the target month
      // Now, go backwards from the end of the month until we hit the target weekday
      while (date.getDay() !== weekday) {
        date.setDate(date.getDate() - 1);
      }
      return date.getDate(); // Return the date of that last occurrence
    } else { // Find the Nth (1st, 2nd, 3rd, or 4th) occurrence
      // Loop through the days of the month
      while (date.getMonth() === month) { // Ensure we stay within the target month
        if (date.getDay() === weekday) { // Check if the current day is the target weekday
          count++; // Increment the count if it is
          if (count === n) { // If this is the Nth occurrence we're looking for...
            dayOfMonth = date.getDate(); // Store the date
            break; // Found it, exit the loop
          }
        }
        date.setDate(date.getDate() + 1); // Move to the next day
      }
      return dayOfMonth; // Return the found date, or null if not found (e.g., 5th Monday in Feb)
    }
  }

  // Define fixed-date holidays
  const holidays = [
    { month: 0, day: 1, name: "New Year's Day" },     // Jan 1
    { month: 5, day: 19, name: "Juneteenth" },        // June 19
    { month: 6, day: 4, name: "Independence Day" },  // July 4
    { month: 10, day: 11, name: "Veterans Day" },     // Nov 11
    { month: 11, day: 25, name: "Christmas Day" }     // Dec 25
  ];

  // Calculate holidays based on weekday occurrences
  const mlkDay = findNthWeekdayOfMonth(3, 1, 0, year); // 3rd Monday in Jan
  if (mlkDay) holidays.push({ month: 0, day: mlkDay, name: "Martin Luther King Jr. Day" });

  const presidentsDay = findNthWeekdayOfMonth(3, 1, 1, year); // 3rd Monday in Feb
  if (presidentsDay) holidays.push({ month: 1, day: presidentsDay, name: "Presidents' Day" });

  const memorialDay = findNthWeekdayOfMonth(5, 1, 4, year); // Last Monday in May
  if (memorialDay) holidays.push({ month: 4, day: memorialDay, name: "Memorial Day" });

  const laborDay = findNthWeekdayOfMonth(1, 1, 8, year); // 1st Monday in Sep
  if (laborDay) holidays.push({ month: 8, day: laborDay, name: "Labor Day" });

  const columbusDay = findNthWeekdayOfMonth(2, 1, 9, year); // 2nd Monday in Oct
  if (columbusDay) holidays.push({ month: 9, day: columbusDay, name: "Columbus Day" });

  const thanksgivingDay = findNthWeekdayOfMonth(4, 4, 10, year); // 4th Thursday in Nov
  if (thanksgivingDay) holidays.push({ month: 10, day: thanksgivingDay, name: "Thanksgiving Day" });

  // Sort holidays by date (optional, but can be helpful)
  holidays.sort((a, b) => {
    if (a.month !== b.month) return a.month - b.month;
    return a.day - b.day;
  });

  return holidays;
}

/**
 * Returns approximate dates for the longest and shortest days of the year (solstices).
 * Note: Actual solstice dates vary slightly year to year. These are common approximations.
 * @param {number} year - The year.
 * @returns {object} Object containing Date objects for 'longest' and 'shortest' days.
 */
function getSolsticeDays(year) {
  // Approximate longest day (Summer Solstice in Northern Hemisphere)
  let longest = new Date(year, 5, 21); // June 21
  // Approximate shortest day (Winter Solstice in Northern Hemisphere)
  let shortest = new Date(year, 11, 21); // Dec 21
  return { longest, shortest };
}

/**
 * Checks if a given year is a leap year.
 * @param {number} year - The year to check.
 * @returns {boolean} True if it's a leap year, false otherwise.
 */
function isLeapYear(year) {
  // Leap year rules: Divisible by 4, unless divisible by 100 but not by 400.
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// --- Year Grid Rendering ---

/**
 * Renders the year grid visualization.
 * This function is optimized:
 * 1. It only builds the grid DOM elements once per year (or when options force it).
 * 2. On subsequent calls within the same year, it only updates the CSS classes and titles
 *    of the existing elements, which is much faster.
 */
function renderYearGrid() {
    if (!gridWrap || !gridEl) return; // Exit if grid elements aren't found

    const now = new Date();
    const year = now.getFullYear();

    // --- 1. Check Visibility ---
    // If the grid shouldn't be shown, hide the container and exit early.
    if (!showGrid) {
        if (gridWrap.style.display !== "none") {
          gridWrap.style.display = "none"; // Hide if not already hidden
        }
        return; // Don't proceed further
    } else {
        // If grid should be shown, ensure the container is visible
        if (gridWrap.style.display === "none") {
          gridWrap.style.display = ""; // Show if hidden (restore default display)
        }
    }

    // --- 2. Build Grid Structure (if necessary) ---
    // Only rebuild the grid DOM if the year has changed or if an option
    // (like 'showGrid' or 'showCircles') requires a structural update.
    if (currentYearGridRendered !== year) {
        // console.log(`Grid structure rebuild needed for ${year}`); // Debug log
        gridEl.innerHTML = ''; // Clear any previous grid elements
        dayBlockElements = []; // Reset the stored element references
        const totalDays = isLeapYear(year) ? 366 : 365;
        const cols = 30; // Grid dimensions
        const rows = 13;
        let dayIndex = 0; // Track which day of the year we are creating

        // Create the grid cells (divs)
        for (let row = 0; row < rows; row++) {
          // TODO: Consider adding role="row" wrapper here if feasible
          for (let col = 0; col < cols; col++) {
              const gridCell = document.createElement('div');
              gridCell.className = 'day-block'; // Assign base class
              // TODO: Add role="gridcell" here (High Priority)
              // TODO: Add tabindex="-1" here (High Priority)

              if (dayIndex < totalDays) {
                // If this cell represents a valid day of the year, store its reference
                dayBlockElements.push(gridCell);
                dayIndex++;
              } else {
                // If this cell is beyond the number of days in the year, mark it as overflow
                gridCell.classList.add('overflow');
                gridCell.tabIndex = -1; // Make it non-focusable
              }
              gridEl.appendChild(gridCell); // Add the cell to the grid container
          }
        }
        currentYearGridRendered = year; // Mark that the grid has been built for this year
        // Update grid container aria-label with the current year
        gridWrap.setAttribute('aria-label', `Grid showing days of the year ${year}`);
    }

    // --- 3. Update Styles and Attributes on Existing Elements ---
    // This part runs frequently to update the appearance of the grid cells.

    // Toggle the 'circles' class on the grid container based on the option
    gridEl.classList.toggle("circles", showCircles);

    // Calculate the current day of the year (0-indexed)
    const startOfYear = new Date(year, 0, 1);
    const dayOfYear = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));

    // Get holiday and solstice data *once* before the loop if options are enabled
    const holidaysData = showHolidays ? getHolidays(year) : [];
    // Create efficient ways to check for holidays/solstices
    const holidayMap = showHolidays ? new Map(holidaysData.map(h => [(new Date(year, h.month, h.day)).toDateString(), h.name])) : null;
    const solstice = showSolstice ? getSolsticeDays(year) : {};
    const longestDayStr = showSolstice && solstice.longest ? solstice.longest.toDateString() : null;
    const shortestDayStr = showSolstice && solstice.shortest ? solstice.shortest.toDateString() : null;

    // Loop through the stored day block elements and update their classes and titles
    dayBlockElements.forEach((gridCell, index) => {
        const dayIndex = index; // The 0-based index corresponds to the day of the year
        const date = new Date(year, 0, 1 + dayIndex); // Get the Date object for this day
        const dateStr = date.toDateString(); // Get a comparable string representation (e.g., "Thu Oct 26 2023")
        // Get a locale-friendly string for the tooltip
        const dateLocaleStr = date.toLocaleDateString(undefined, {weekday:'short', month:'short', day:'numeric', year:'numeric'});

        // Reset dynamic classes first
        gridCell.classList.remove('past', 'today', 'future', 'holiday', 'longest-day', 'shortest-day');
        let title = dateLocaleStr; // Default tooltip text

        // Apply the appropriate class(es) based on the day's status
        if (showHolidays && holidayMap.has(dateStr)) {
          gridCell.classList.add('holiday');
          title += ' — ' + holidayMap.get(dateStr); // Add holiday name to tooltip
        } else if (showSolstice && longestDayStr === dateStr) {
          gridCell.classList.add('longest-day');
          title += ' — Longest Day';
        } else if (showSolstice && shortestDayStr === dateStr) {
          gridCell.classList.add('shortest-day');
          title += ' — Shortest Day';
        } else {
          // If not a special day, mark as past, today, or future
          if (dayIndex < dayOfYear) {
            gridCell.classList.add('past');
          } else if (dayIndex === dayOfYear) {
            gridCell.classList.add('today');
            // TODO: Set tabindex="0" for the 'today' block (High Priority)
          } else {
            gridCell.classList.add('future');
          }
        }
        // Update the tooltip (title attribute) for the cell
        gridCell.title = title;
    });
    // TODO: Implement keyboard navigation listeners here (High Priority)
}

// --- Main Render Loop ---

/**
 * Main function called repeatedly by setInterval to update all dynamic UI elements.
 */
function renderAll() {
  applySeasonStyle(); // Update seasonal styles if needed
  renderDateTime();   // Update current date/time display
  renderCountdown();  // Update countdown timer
  renderProgress();   // Update progress bar
  renderYearGrid();   // Update year grid (efficiently)
}

// --- Initial Setup ---
// Ensure DOM is loaded before running setup (though 'defer' should handle this)
document.addEventListener('DOMContentLoaded', () => {
    // Add null checks for all elements accessed during initialization
    if (checkboxMs) checkboxMs.checked = showMilliseconds;
    if (checkboxSeason) checkboxSeason.checked = styleSeason;
    if (checkboxGrid) checkboxGrid.checked = showGrid;
    if (checkboxCircles) checkboxCircles.checked = showCircles;
    if (checkboxHolidays) checkboxHolidays.checked = showHolidays;
    if (checkboxSolstice) checkboxSolstice.checked = showSolstice;

    updateGridOptionStates(); // Set initial disabled states
    setupUpdateInterval();    // Set the initial update interval
    renderAll();              // Call renderAll once immediately to populate UI
});
