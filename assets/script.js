//questions for javasrcipt quiz
var questions = [
    {
        title: "Javacript is a(n)_______language",
        choices: ["Procedural", "Object-Oriented", "Foreign", "None of the Above"],
        answer: "Object-Oriented"
    },
    {
        title: "Which of the following keywords is used to define a variable in Javascript?",
        choices: ["var", "varmit", "parsecs", "change"],
        answer: "var"
    },
    {
        title: "Which function is used to serialize an object into a JSON string in Javascript?",
        choices: ["parse()", "stringify()", "convert()", "Vorhees"],
        answer: "stringify"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "Which of the following are closures in Javascript?",
        choices: ["variables", "functions", "objects", "All of the Above"],
        answer: "All of the Above"
    }
];


var score = 0;
var questionIndex = 0;

// variables for html elements, qdiv,timer, wrapper

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var qdiv = document.querySelector("#qdiv");
var wrapper = document.querySelector("#wrapper");

var timeLeft = 75;
var penalty = 10;

// Creates new element
var ulCreate = document.createElement("ul");

var holdInterval;
timer.addEventListener("click", function () {
    holdInterval = setInterval(function () {
        timeLeft--;
        currentTime.textContent = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(holdInterval);
            complete();
            currentTime.textContent = "Time's up!";
        }
    }, 1000);

    render(questionIndex);
});

function render(questionIndex) {
    // Clears existing data 
    qdiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all info in array
    for (var i = 0; i < questions.length; i++) {

        var userq = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        qdiv.textContent = userq;
    }

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        qdiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // condition if correct answer
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;

        } else {
            //condition if incorrect answer
            timeLeft = timeLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }


        questionIndex++;

        if (questionIndex >= questions.length) {

            complete();
            createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
        } else {
            render(questionIndex);
        }
    }
}



//funtion for heading, paragraph
function complete() {
    qdiv.innerHTML = "";
    currentTime.innerHTML = "";


    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Quiz Complete!"

    qdiv.appendChild(createH1);


    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    qdiv.appendChild(createP);


    if (timeLeft >= 0) {
        var timeRemaining = timeLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + Math.round((score / questions.length) * 100);

        qdiv.appendChild(createP2);

        var createLabel = document.createElement("label");
        createLabel.setAttribute("id", "createLabel");
        createLabel.textContent = "Enter your initials: ";

        qdiv.appendChild(createLabel);


        var createInput = document.createElement("input");
        createInput.setAttribute("type", "text");
        createInput.setAttribute("id", "initials");
        createInput.textContent = "";

        qdiv.appendChild(createInput);


        var createSubmit = document.createElement("button");
        createSubmit.setAttribute("type", "submit");
        createSubmit.setAttribute("id", "Submit");
        createSubmit.textContent = "Submit";

        qdiv.appendChild(createSubmit);

        // event listener for initials and score
        createSubmit.addEventListener("click", function () {
            var initials = createInput.value;

            if (initials === null) {

            } else {
                var finalScore = {
                    initials: initials,
                    score: Math.round((score / questions.length) * 100)
                };
                console.log(finalScore);
                var allScores = localStorage.getItem("allScores");
                if (allScores === null) {
                    allScores = [];
                } else {
                    allScores = JSON.parse(allScores);
                }
                allScores.push(finalScore);
                var newScore = JSON.stringify(allScores);
                localStorage.setItem("allScores", newScore);
                // 
                window.location.replace("index2.html");
            }
        });

    }
}
