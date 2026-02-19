// Name: Ethan Marxen
// Date: February 2, 2026
// Assignment: Dog Years Calculator

// 1) Store the value of my current age as a number
const myAge = 20;

// 2) Store the value of 2, representing the first two years of a dog's life
let earlyYears = 2;

// 3) Multiply earlyYears by 10.5 using the multiplication assignment operator
//    (the first 2 human years each count as 10.5 dog years)
earlyYears *= 10.5;

// 4) Calculate the remaining years after the first two by subtracting 2 from myAge.
//    This value will be updated next to convert it into dog years.
let laterYears = myAge - 2;

// 5) Multiply laterYears by 4 using the multiplication assignment operator
//    to convert the remaining human years into dog years (4 dog years per human year).
laterYears *= 4;

// 6) Print earlyYears and laterYears to the console to check our work
console.log(earlyYears);
console.log(laterYears);

// 7) Add earlyYears and laterYears together and store the total in myAgeInDogYears
const myAgeInDogYears = earlyYears + laterYears;

// 8) Store my name as a string, converted to all lowercase using the .toLowerCase() method
const myName = "Ethan".toLowerCase();

// 9) Use string interpolation to display my name and age in dog years in a sentence
console.log(`My name is ${myName} and I am ${myAgeInDogYears} in dog years.`);

// 10) Display the result on the webpage using document.getElementById and innerHTML
//     instead of writing to the console
document.getElementById("output").innerHTML = `My name is ${myName} and I am ${myAgeInDogYears} in dog years.`;