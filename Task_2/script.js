const startBtn = document.getElementById('start-btn')
const nextBtn = document.getElementById('next-btn')
const quiz = document.getElementById('quiz')

const questionText = document.getElementById('question')
const answerElement = document.getElementById('answer-buttons')
const progressBar = document.getElementById('progress-bar')
const progressContainer = document.querySelector('.progress-container') 

let currentQuestionIndex
let score

startBtn.addEventListener('click', startQuiz)
nextBtn.addEventListener('click', () =>{
    currentQuestionIndex++
    setNextQuestion()
})

function startQuiz(){
    score = 0
    startBtn.classList.add('hide')
    currentQuestionIndex = 0
    progressContainer.classList.remove('hide')
    quiz.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion(){
    resetState()
    if(currentQuestionIndex<questions.length){
        updateProgress()
        showQuestion(questions[currentQuestionIndex])
    } else {
        showScore()
    }
}

function updateProgress(){
     const progressPercentage = (currentQuestionIndex / questions.length) * 100
     progressBar.style.width = `${progressPercentage}%`
}

function showQuestion(question){
    questionText.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerElement.appendChild(button)
    });
}

function resetState(){
    nextBtn.classList.add('hide')
    while(answerElement.firstChild){
        answerElement.removeChild(answerElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton = e.target
    const isCorrect = selectedButton.dataset.correct === "true"

    if(isCorrect){
        score++
    }
    Array.from(answerElement.children).forEach(button => {
        button.disabled = true 
    })
    selectedButton.classList.add('selected')

    nextBtn.classList.remove('hide')
}

function showScore() {
    resetState()
    questionText.innerText = `You scored ${score} out of ${questions.length}!`
    progressContainer.classList.add('hide')
    startBtn.classList.remove('hide')
    startBtn.innerText = 'Restart'
}

const questions = [
    {
        question: " What is the name of Joey's beloved bedtime penguin?",
        answers: [
            { text:"Hugsy", correct: true}, 
            { text:"Waddles", correct: false},
            { text:"Mr.Waddle", correct: false},
            { text:"Fluffy", correct: false},
        ]
    },
    {
        question: "How many seasons of Friends are there?",
        answers: [
            { text:"8", correct: false}, 
            { text:"9", correct: false},
            { text:"10", correct: true},
            { text:"12", correct: false},
        ]

    },
    {
        question: "What is the name of the coffee shop where the group hangs out?",
        answers: [
            { text:"Coffee Perk", correct: false}, 
            { text:"Central Perk", correct: true},
            { text:"Greenwich Cafe", correct: false},
            { text:" The Daily Grind", correct: false},
        ]
    },
    {
        question: "What livestock animals did Chandler and Joey keep in their apartment?",
        answers: [
            { text:"A chick and a duck", correct: true}, 
            { text:"A pig and a rooster", correct: false},
            { text:"A goose and a ferret", correct: false},
            { text:" A goat and a lamb", correct: false},
        ]
    },
    {
        question: "Which character famously screams 'Oh my God!' whenever they unexpectedly reappear?",
        answers: [
            { text:"Ursula", correct: false}, 
            { text:"Jill", correct: false},
            { text:"Amy", correct: false},
            { text:"Janice", correct: true},
        ]
    },
    {
        question: "What is the name of the character played by Jennifer Aniston in the show?",
        answers: [
            { text:"Janice Litman-Goralnik", correct: false}, 
            { text:"Phoebe Buffay", correct: false},
            { text:"Monica Geller", correct: false},
            { text:"Rachel Green", correct: true},
        ]
    }

]