// Prompt user for their favorite color
let favoriteColor = prompt("What is your favorite color?");

// Log the information to the console with a friendly message using escape character
console.log("=================================");
console.log("Welcome to the Favorite Color Logger!\n"); // \n is an escape character for new line
console.log("User's favorite color: " + favoriteColor);
console.log("Thank you for sharing your color preference!");
console.log("We hope you have a \"wonderful\" day!"); // \" is an escape character for quotes
console.log("=================================");

// Additional friendly message with escape characters
console.log("\n\tYour color choice is amazing!\n"); // \t is an escape character for tab

// Display message on the page as well
if (favoriteColor) {
    console.log("✓ Data successfully logged at: " + new Date().toLocaleString());
}
