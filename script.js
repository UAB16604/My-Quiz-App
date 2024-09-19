const quizData = [
    {
        question: "Which word is a synonym for 'abundant'?",
        options: ["Sparse", "Scarce", "Plentiful", "Meager"],
        correctAnswer: "Plentiful"
    },
    {
        question: "Which of the following doesn't belong in this group?",
        options: ["Dog", "Cat", "Lion", "Eagle"],
        correctAnswer: "Eagle"
    },
    {
        question: "Which word is the opposite of 'expand'?",
        options: ["Enlarge", "Grow", "Shrink", "Stretch"],
        correctAnswer: "Shrink"
    },
    {
        question: "Which of the following does not belong?",
        options: ["Car", "Bus", "Bicycle", "Helicopter"],
        correctAnswer: "Helicopter"
    },
    {
        question: "What is the capital of Canada?",
        options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
        correctAnswer: "Ottawa"
    },
    {
        question: "Which is the largest ocean in the world?",
        options: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
        correctAnswer: "Pacific Ocean"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
        correctAnswer: "William Shakespeare"
    },
    {
        question: "What is the antonym of 'benevolent'?",
        options: ["Kindly", "Malevolent", "Generous", "Charitable"],
        correctAnswer: "Malevolent"
    },
    {
        question: "Which word means 'to make amends or compensate'?",
        options: ["Aggravate", "Exacerbate", "Ameliorate", "Atone"],
        correctAnswer: "Atone"
    },
    {
        question: "What does 'ephemeral' mean?",
        options: ["Lasting", "Temporary", "Eternal", "Permanent"],
        correctAnswer: "Temporary"
    }
];

let currentQuestion = 0;
let score = 0;
let shuffledQuestions = [];

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const scoreDisplay = document.getElementById('score-display');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    shuffledQuestions = shuffleArray([...quizData]);
    showQuestion();
}

function showQuestion() {
    resetState();
    let question = shuffledQuestions[currentQuestion];
    questionText.textContent = `${currentQuestion + 1}. ${question.question}`;

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('btn', 'option');
        button.addEventListener('click', selectAnswer);
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    nextButton.disabled = true;
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.textContent === shuffledQuestions[currentQuestion].correctAnswer;
    if (correct) {
        selectedButton.style.backgroundColor = '#4CAF50';
        score++;
    } else {
        selectedButton.style.backgroundColor = '#f44336';
    }
    Array.from(optionsContainer.children).forEach(button => {
        if (button.textContent === shuffledQuestions[currentQuestion].correctAnswer) {
            button.style.backgroundColor = '#4CAF50';
        }
        button.disabled = true;
    });
    nextButton.disabled = false;
}

function showScore() {
    resetState();
    questionText.textContent = `You scored ${score} out of ${shuffledQuestions.length}!`;
    nextButton.textContent = 'Play Again';
    nextButton.disabled = false;
}

function handleNextButton() {
    currentQuestion++;
    if (currentQuestion < shuffledQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestion < shuffledQuestions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();