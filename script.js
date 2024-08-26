

const questionElement = document.querySelector(".question");
const ansBtn = document.querySelector(".ans-btn");
const nxtBtn = document.querySelector(".next-btn");

const questions = [
    {
        question: "Which the country won the last world cup?",
        answers: [
            { text: "Ghana", correct: false},
            { text: "Argentina", correct: true},
            { text: "France", correct: false},
            { text: "Ronaldo", correct: false}
        ]
    }, 
    {
        question: "Which of the following is not a programming language",
        answers: [
            {text: "HTML", correct: false},
            {text: "Javascript", correct: false},
            {text: "Python", correct: false},
            {text: "Ms Excel", correct: true}
        ]
    },
    {
        question: "Who are the big 3 in the hiphop game",
        answers: [
            {text: "Kendrick Lamar, Drake & Kanye West", correct: false},
            {text: "Kanye West, Drake & Future", correct: false},
            {text: "Drake, Kendrick Lamar & J.Cole", correct: true},
            {text: "Lil Baby, Gunna & 21 Savage", correct: false}
        ]
    },
    {
        question: "Who are the Afrobeats Big 4",
        answers: [
            {text: "Wizkid, Burna Boy, Olamide & Davido", correct: true},
            {text: "Asake, Rema, Tems & Burna Boy", correct: false},
            {text: "Wizkid, Davido, Burna Boy & Rema", correct: false},
            {text: "Rema, Asake, Ayra Starr & Buju", correct: false}
        ]
    }
]

let questionIndex = 0;
let score = 0;

function start() {
    questionIndex = 0;
    screen = 0;
    nxtBtn.innerHTML = "Next";
    display();
}

start();

function display() {
    resetDefault();
    let currentQuestion = questions[questionIndex];
    let questionNo = questionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        ansBtn.appendChild(button);
        if (answers.correct) {
            button.dataset.correct = answers.correct
        }
        button.addEventListener('click', selectAns);
    })
}

function resetDefault() {
    nxtBtn.style.display = "none";
    while (ansBtn.firstChild) {
        ansBtn.removeChild(ansBtn.firstChild);
    }
}

function selectAns (e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ansBtn.children).forEach(button => {
        if (button.dataset.correct === 'true')  {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nxtBtn.style.display = 'block'
}

nxtBtn.addEventListener('click', ()=> {
    if (questionIndex < questions.length) {
        handleNxtBtn();
    } else {
        start();
    }
});

function handleNxtBtn () {
    questionIndex++;
    if (questionIndex < questions.length) {
        display();
    } else {
        showScore();
    }
};

function showScore () {
    resetDefault();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nxtBtn.innerHTML = 'Play Again';
    nxtBtn.style.display = 'block';
}