const questions = [
                {   question:'Of the following foods, which one is the best source of protein?',
                    answares:[
                            {text:'Butter',correct:'false'},
                            {text:'Fish',correct:'true'},
                            {text:'Lettuce',correct:'false'},
                            {text:'Milk',correct:'false'}
                        ]
                },
                {   question:'For galvanizing iron which of the following metals is used?',
                    answares:[
                            {text:'Zinc',correct:'true'},
                            {text:'Aluminium',correct:'false'},
                            {text:'Copper',correct:'false'},
                            {text:'Lead',correct:'false'}
                        ]
                },
                {   question:'What invention caused many deaths while testing it?',
                    answares:[
                            {text:'Dynamite',correct:'false'},
                            {text:'Ladders',correct:'false'},
                            {text:'Race cars',correct:'false'},
                            {text:'Parachute',correct:'true'}
                        ]
                },
                {   question:'How many bits is a byte?',
                    answares:[
                            {text:'4',correct:'false'},
                            {text:'8',correct:'true'},
                            {text:'16',correct:'false'},
                            {text:'32',correct:'false'}
                        ]
                }
];


const questionElem = document.getElementById('question');
const answareButtons = document.getElementById('answare-button');
const nextBtn = document.getElementById('next-btn');


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuiz();
    
}

function showQuiz(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex]
    let questionNumer = currentQuestionIndex+1;
    questionElem.innerHTML = questionNumer +'. '+ currentQuestion.question;
    
    currentQuestion.answares.forEach(showAnswares);

}

function resetState() {
    nextBtn.style.display = "none";
    while(answareButtons.firstChild){
        answareButtons.removeChild(answareButtons.firstChild);
    }
}

function showAnswares(answare){
        const button = document.createElement('button');
        button.innerHTML = answare.text;
        button.classList.add('btn');
        answareButtons.appendChild(button);
        if (answare.correct){
            button.dataset.correct = answare.correct;
        };
        button.addEventListener('click', selectAnsware);

}

function selectAnsware(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect){
        selectBtn.classList.add('correct');
        score++;
    }else{
        selectBtn.classList.add('incorrect');
    }
    Array.from(answareButtons.children).forEach(button => {
        if (button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = 'true';
    });
    nextBtn.style.display = 'block';

}



nextBtn.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
});

function handleNextBtn(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuiz();
    }else{
        showResult();
    }
}
function showResult(){
    resetState()
    questionElem.innerHTML = `Your Score is ${score} out of 
    ${questions.length}!`;
    nextBtn.innerHTML = 'Play Again';
    nextBtn.style.display = "block";

}
startQuiz();