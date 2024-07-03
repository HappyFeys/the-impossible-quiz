var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = '../question.json';
const questionText = document.querySelector('#question-text');
const answerInput = document.querySelector('#answer');
const submitButton = document.querySelector('#submit');
const vieSpan = document.querySelector('#vie');
const startBtn = document.querySelector('#start');
const startDiv = document.querySelector('#username');
const questionDiv = document.querySelector('#question');
const usernameInput = document.querySelector('#username-input');
let vie = ["favorite", "favorite", "favorite", "favorite", "favorite"];
let compteur = 0;
questionDiv.style.display = 'none';
function fetchQuestion(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            const dataQuestion = data.questions;
            generateQuestion(dataQuestion);
            checkAnswer(dataQuestion, username);
            displayLife(vie);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function generateQuestion(data) {
    questionText.innerText = data[compteur].question;
}
function checkAnswer(questions, username) {
    submitButton.addEventListener('click', () => {
        const userAnswer = answerInput.value.toLowerCase();
        const correctAnswer = questions[compteur].reponse.toLowerCase();
        if (userAnswer === correctAnswer) {
            vie.push("favorite");
            displayLife(vie);
            alert(`Bravo ${username} !`);
            compteur++;
        }
        else {
            vie.pop();
            displayLife(vie);
            alert(`Dommage ${username} ...`);
        }
        answerInput.value = '';
        if (compteur < questions.length) {
            questionText.innerText = questions[compteur].question;
        }
    });
}
function displayLife(life) {
    vieSpan.innerText = life.join(" ");
}
function startGame() {
    questionDiv.style.display = 'flex';
    startDiv.style.display = 'none';
}
startBtn.addEventListener('click', () => {
    const username = usernameInput.value;
    if (!username) {
        alert("Veuillez entrer un nom d'utilisateur");
    }
    else {
        startGame();
        fetchQuestion(username);
    }
});
export {};
