import { Questions } from "./types/question";


const url = '../question.json';
const questionText = document.querySelector('#question-text') as HTMLParagraphElement;
const answerInput = document.querySelector('#answer') as HTMLInputElement;
const submitButton = document.querySelector('#submit') as HTMLButtonElement;
const vieSpan = document.querySelector('#vie') as HTMLSpanElement;
const startBtn = document.querySelector('#start') as HTMLButtonElement;
const startDiv = document.querySelector('#username') as HTMLDivElement;
const questionDiv = document.querySelector('#question') as HTMLDivElement;
const usernameInput = document.querySelector('#username-input') as HTMLInputElement; 
let vie = ["favorite", "favorite", "favorite", "favorite", "favorite"];
let compteur = 0

questionDiv.style.display = 'none';
async function fetchQuestion(username:string) {
    try{
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const dataQuestion : Questions = data.questions;
        
        generateQuestion(dataQuestion);
        checkAnswer(dataQuestion, username);
        displayLife(vie)
        
    }
    catch(error:any) {
        console.log(error);
    }
}


function generateQuestion(data : Questions) {
    questionText.innerText =data[compteur].question
}

function checkAnswer(questions: Questions, username:string) {
    submitButton.addEventListener('click', () => {
        const userAnswer = answerInput.value.toLowerCase();
        const correctAnswer = questions[compteur].reponse.toLowerCase();

        if (userAnswer === correctAnswer) {
            vie.push("favorite");
            displayLife(vie)
            alert(`Bravo ${username} !`);
            compteur++;
        } else {
            vie.pop();
            displayLife(vie)
            alert(`Dommage ${username} ...`);
        }

        answerInput.value = '';
        

        if (compteur < questions.length) {
            questionText.innerText = questions[compteur].question;
        }
    });
}


function displayLife(life:string[]) {
    vieSpan.innerText = life.join(" ");
}



function startGame() {
    questionDiv.style.display = 'flex';
    startDiv.style.display = 'none';
}

startBtn.addEventListener('click', () => {
    const username = usernameInput.value;
    if(!username) {
        alert("Veuillez entrer un nom d'utilisateur");
    }else{
    startGame();
    fetchQuestion(username)
    }
})