/*
    Week 13: Countdown JavaScript
    Author: Student
    Date: April 20, 2026
    Description: Uses jQuery to handle the countdown button click.
                 Reads user-entered event name and date, validates the input,
                 calculates days remaining (or elapsed), and displays a message.

    Notes on JavaScript Dates:
    - Dates are stored as milliseconds since midnight January 1, 1970 (Unix epoch).
    - Month numbers start at 0 (January = 0, December = 11).
    - new Date() with no arguments returns the current date/time.
*/

// Wrap all code in jQuery's document-ready function so the DOM is fully
// loaded before we try to attach event listeners.
$(document).ready(function () {

    // --- Attach click handler to the Countdown button ---
    // jQuery selects the button by its ID and listens for a click event.
    $("#countdown").click(function () {

        // Read the user-entered event name and trim extra whitespace
        var event = $("#event").val().trim();

        // Read the user-entered date string and trim extra whitespace
        var dt = $("#date").val().trim();

        // Build the default message using the event name the user typed
        // (will be overwritten below once we validate and calculate)
        var message = "Counting down to " + event + "!";

        // --- Validation: make sure both fields have input ---
        if (event === "" || dt === "") {
            // Alert the user if either field is empty
            $("#message").text("Please enter both an event name and a date.");
            return; // Stop further processing
        }

        // --- Validate date format: expect MM/DD/YYYY ---
        // Regular expression checks for two digits / two digits / four digits
        var datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!datePattern.test(dt)) {
            $("#message").text("Please enter the date in MM/DD/YYYY format.");
            return; // Stop further processing
        }

        // --- Parse the date string into month, day, and year parts ---
        // Split on "/" to get an array: ["MM", "DD", "YYYY"]
        var dateParts = dt.split("/");
        var month = parseInt(dateParts[0], 10) - 1; // Months are 0-indexed in JS
        var day   = parseInt(dateParts[1], 10);
        var year  = parseInt(dateParts[2], 10);

        // --- Create a Date object from the parsed parts ---
        // new Date(year, month, day) uses local time zone
        var eventDate = new Date(year, month, day);

        // --- Verify the Date object is valid ---
        // If the month/day combo was impossible (e.g. 13/45/2026),
        // JavaScript silently rolls the date forward. We catch this by
        // comparing the constructed date's parts back to what we entered.
        if (
            eventDate.getFullYear() !== year  ||
            eventDate.getMonth()    !== month ||
            eventDate.getDate()     !== day
        ) {
            $("#message").text("That doesn't appear to be a valid date. Please check and try again.");
            return; // Stop further processing
        }

        // --- Get today's date (time stripped to midnight for clean comparison) ---
        var today = new Date();
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        // --- Calculate the difference in milliseconds, then convert to days ---
        // Subtract today from the event date; positive = future, negative = past
        var diffMs   = eventDate - today;                        // milliseconds difference
        var diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24)); // convert to whole days

        // --- Build the output message based on the day difference ---
        if (diffDays > 0) {
            // Event is in the future
            message = "There are " + diffDays + " days until " + event + "!";
        } else if (diffDays === 0) {
            // Event is today
            message = "Today is " + event + "!";
        } else {
            // Event has already passed (diffDays is negative, so Math.abs gives days elapsed)
            message = event + " was " + Math.abs(diffDays) + " days ago.";
        }

        // --- Display the message in the #message paragraph ---
        // jQuery's .text() safely sets the text content of the element
        $("#message").text(message);

    }); // end click handler

}); // end document ready
