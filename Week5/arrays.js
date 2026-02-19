/**********************************************************
 * Purpose of this code - Create and print arrays
 * Author: Ethan Marxen
 * Date: February 16, 2026
 **********************************************************/
// Initialize the array using the array() constructor
let colorArray = new Array(); // create an empty array with no elements
// Add your elements to the array
colorArray[0] = "Green";
colorArray[1] = "Yellow";
colorArray[2] = "Blue";
colorArray[3] = "Black";
colorArray[4] = "Gray";
colorArray[5] = "Red";
// Print the elements of the array
// Initialize a counter and then loop through the array to print each element to the document window
let counter1 = 0;
document.write("<h1>Elements of the First Array:</h1>");
for (counter1 = 0; counter1 < colorArray.length; counter1++) {
    document.write(colorArray[counter1] + "<br>");
}
// ===== ENHANCEMENT: Second Array (Video Games) =====
// Create an array of favorite video games
let gamesArray = ["Overwatch", "Marvel Rivals", "Guardians of the Galaxy", "Pokemon Sun", 
                  "Metal Gear Solid", "Mortal Kombat 11", "Lego DC Supervillains", "Lego Star Wars The Complete Saga"];
// Print the games array
document.write("<h1>Games that I Like to Play Array:</h1>");
for (let i = 0; i < gamesArray.length; i++) {
    document.write(gamesArray[i] + "<br>");
}
// ===== BONUS: Print favorite color and favorite game =====
document.write("<br>");
document.write("<h2>My Favorites:</h2>");
document.write("<p class='favorite'>My favorite color is <strong>" + colorArray[2] + "</strong> and my favorite game is <strong>" + gamesArray[2] + "</strong>!</p>");