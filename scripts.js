// 1: Select / (get) the element with the ID 'about'. 
//    Store the element in the variable `about`.
//	  Use a method to modify the about id with a color border of your choice

const about = document.getElementById('about');

about.style.border = "3px solid #1a73e8";


// 2: Select all the <h2> elements in the document.
//    Using a loop, set the color of the <h2> elements to a different color.

const h2Elements = document.querySelectorAll('h2');

for (let i = 0; i < h2Elements.length; i++) {
  h2Elements[i].style.color = "#e8531a";
}


// 3: Select all elements with the class '.card'.
//    Using a loop, set their background color to the color of your choice.

const cards = document.querySelectorAll('.card');

for (let i = 0; i < cards.length; i++) {
  cards[i].style.backgroundColor = "#d6eaf8";
}

// 4: Select only the first <ul> in the document.
//    Assign it to a variable named `ul`.
//    Modify the color to one of your choice.

const ul = document.querySelector('ul');

ul.style.border = "2px solid #e83e8c";  // changed hex value to pink


// 5: Select only the second element with the class '.container'.
//    Assign it to a variable named `container`.

const container = document.querySelectorAll('.container')[1];


// 6: Select all <a> elements that have a 'title' attribute.
//    Set their color value to the color of your choice.

const titledLinks = document.querySelectorAll('a[title]');

for (let i = 0; i < titledLinks.length; i++) {
  titledLinks[i].style.color = "#9b59b6";
}


// 7: BONUS - Change the jumbotron background to a blue gradient
//    to make the page feel more polished and unique.

const jumbotron = document.querySelector('.jumbotron');
if (jumbotron) {
  jumbotron.style.background = "linear-gradient(135deg, #1a73e8, #0d47a1)";
}
