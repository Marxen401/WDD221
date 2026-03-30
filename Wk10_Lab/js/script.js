// Ethan Marxen 03/29/2026
//  This function is enclosed in parenthesis, something you haven't seen yet
//  This type of function is invoked immediately, AKA Immediately-Invoked Function Expression
//  IIFE, pronounced iffy

(function() 
{
  function buildQuiz() 
  {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
	// observe the => syntax, which is basically the same as using return
	
    myQuestions.forEach((currentQuestion, questionNumber) => 
	{
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) 
	  {
        // ...add an HTML radio button, use the push method to add an array item
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() 
  {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => 
	{
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) 
	  {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else 
	  {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

 /* 
    The purpose of this assignment is for you to create at least five (5) 
      JavaScript quiz questions.
	  
	It's also a good lesson in observing functional code to clarify the concepts

*/
	  
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = 
  [
    {
      question: "Which keyword is used to declare a variable that cannot be reassigned?",
      answers: 
	  {
        a: "var",
        b: "let",
        c: "const"
      },
      correctAnswer: "c"
    },
    {
      question: "What will console.log(typeof []) output in JavaScript?",
      answers: 
	  {
        a: "array",
        b: "object",
        c: "undefined"
      },
      correctAnswer: "b"
    },
    {
      question: "Which method adds one or more elements to the END of an array and returns the new length?",
      answers: 
	  {
        a: "unshift()",
        b: "splice()",
        c: "push()"
      },
      correctAnswer: "c"
    },
    {
      question: "What is the correct way to write an arrow function that returns the square of a number?",
      answers: 
	  {
        a: "const square = (n) => { n * n }",
        b: "const square = (n) => n * n",
        c: "const square = function => n * n"
      },
      correctAnswer: "b"
    },
    {
      question: "Which of the following is used to select an element by its ID using the DOM?",
      answers: 
	  {
        a: "document.querySelector('.myId')",
        b: "document.getElement('myId')",
        c: "document.getElementById('myId')"
      },
      correctAnswer: "c"
    }
  ];

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
