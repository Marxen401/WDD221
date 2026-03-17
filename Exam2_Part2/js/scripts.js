// 1: Select / (get) the element with the ID 'about'. 
//    Store the element in the variable `about`.
//	  Use a method to modify the about id with a color border of your choice

const about = document.getElementById('about');

about.style.border = "3px solid #1a73e8";


// 2: Select all the <h2> elements in the document.
//    Using a loop, set the color of the <h2> elements to a different color.

const h2s = document.querySelectorAll('h2');

for (let i = 0; i < h2s.length; i++) {
  h2s[i].style.color = "#e8531a";
}


// 3: Select all elements with the class '.card'.
//    Using a loop, set their background color to the color of your choice.

const cards = document.querySelectorAll('.card');

for (let i = 0; i < cards.length; i++) {
  cards[i].style.backgroundColor = "#cce5ff";
}

// 4: Select only the first <ul> in the document.
//    Assign it to a variable named `ul`.
//    Modify the color to one of your choice.

const ul = document.querySelector('ul');

ul.style.border = "2px solid #e83e8c";  // just need to change the hex value

// 5: Select only the second element with the class '.container'.
//    Assign it to a variable named `container`.

const container = document.querySelectorAll('.container')[1];


// 6: Select all <a> elements that have a 'title' attribute.
//    Set their color value to the color of your choice.

const titledLinks = document.querySelectorAll('a[title]');

for (let i = 0; i < titledLinks.length; i++) {
  titledLinks[i].style.color = "#9b59b6";
}


// 7: Additional DOM change - change the jumbotron background color to blue
//    so the page header stands out with a bold conference feel.

const jumbotron = document.querySelector('.jumbotron');
jumbotron.style.backgroundColor = "#1a73e8";


// -------------------------------------------------------
// PART 2: Interactive Sum Program
// -------------------------------------------------------

function sumInput() { //create a function
  let numbers = []; //creates an array

  // Ask the user for their name
  let userName = prompt('Please enter your name!');

  while (true) { //loop
    let valNum = prompt('Please enter a number! (Leave blank and press OK to finish)'); //asks user for input

    // Check for cancel (null), empty string, or non-finite numbers (NaN, Infinity)
    if (valNum === "" || valNum === null || !isFinite(valNum)) {
      break;
    }

    numbers.push(+valNum); //populates the array
  }

  let sum = 0; //sum set to zero to begin
  for (let number of numbers) { //loops through array and adds numbers
    sum += number;
  }

  // Build a list of all entered numbers for the webpage
  let numbersList = '';
  for (let i = 0; i < numbers.length; i++) {
    numbersList += '<li>' + numbers[i] + '</li>';
  }

  // Display the name, entered values, and sum on the webpage instead of an alert box
  document.getElementById('results').innerHTML =
    '<h4>Results for ' + userName + '</h4>' +
    '<p><strong>Numbers entered:</strong></p>' +
    '<ul>' + (numbersList !== '' ? numbersList : '<li>No numbers entered.</li>') + '</ul>' +
    '<p><strong>Total Sum: ' + sum + '</strong></p>';

  return sum;
}

sumInput(); //call the function
