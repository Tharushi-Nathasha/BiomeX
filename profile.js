let score = 0;

let currentQuestion = 1;
const totalQuestions = 15;
const answers = {}; //store user answers

function startPrompt() {
    updateProgress();
    askNextQuestion();
}

function askNextQuestion() {
    let questionText;
    switch (currentQuestion) {
        case 1:
            questionText = "<strong>STEP 1: Personal details | Question 1/5</strong><br>Please enter your full name: ";
            break;
        case 2:
            questionText = "<strong>STEP 1: Personal details | Question 2/5</strong><br>What is your date of birth? ";
            break;
        case 3:
            questionText = "<strong>STEP 1: Personal details | Question 3/5</strong><br>What is your gender? ";
            break;
        case 4:
            questionText = "<strong>STEP 1: Personal details | Question 4/5</strong><br>Enter your country/city:";
            break;
        case 5:
            questionText = "<strong>STEP 1: Personal details | Question 5/5</strong><br>Please enter your email: ";
            break;
        case 6:
            questionText = "<strong>STEP 2: Interests & activities | Question 1/4</strong><br>Are you interested in environmental conservation and sustainability efforts?(Yes/No)";
            break;
        case 7:
            questionText = "<strong>STEP 2: Interests & activities | Question 2/4</strong><br>Do you participate in any activities related to protecting biodiversity and ecosystems? (Yes/No)";
            break;
        case 8:
            questionText = "<strong>STEP 2: Interests & activities | Question 3/4</strong><br>Have you volunteered for any wildlife conservation projects or habitat restoration initiatives?";
            break;
        case 9:
            questionText = "<strong>STEP 2: Interests & activities | Question 4/4</strong><br>Are you involved in any community gardening or urban greening initiatives? ";
            break;
        case 10:
            questionText = "<strong>STEP 3: Preferences | Question 1/3</strong><br>What types of environmental issues are you most passionate about? ";
            break;
        case 11:
            questionText = "<strong>STEP 3: Preferences | Question 2/3</strong><br>Do you have specific preferences or ideas for how to address challenges related to 'Life on Land'?";
            break;
        case 12:
            questionText = "<strong>STEP 3: Preferences | Question 3/3</strong><br>Are there specific actions you plan to take to contribute to land conservation and ecosystem protection?";
            break;
        case 13:
            questionText = "<strong>STEP 4: Skills & Goals | Question 1/3</strong><br>Do you have any relevant skills or expertise in areas such as forestry, wildlife conservation, sustainable agriculture, or land use planning?";
            break;
        case 14:
            questionText = "<strong>STEP 4: Skills & Goals | Question 2/3</strong><br>What are your personal goals or commitments towards supporting 'Life on Land' and achieving SDG 15?";
            break;
        case 15:
            questionText = "<strong>STEP 4: Skills & Goals | Question 3/3</strong><br>Do you have experience with GIS mapping or remote sensing technologies ?";
            break;

        default:
            displayAnswers();
            return;
    }
    showModal(questionText);
}

// Function to display the modal with the question
function showModal(text) {
    const modal = document.getElementById("myModal");
    const questionTextElement = document.getElementById("questionText");
    questionTextElement.innerHTML = text;
    modal.style.display = "block";
}

// Function to handle closing the modal
function closeModal() {
    const modal = document.querySelector(".container");
    const progressBar = document.getElementById("progressBar");
    const outputBox = document.querySelector(".container1"); // Ensure the class matches the HTML
    const feedbackSection = document.getElementById("feedback-section");

    modal.style.display = "none";
    progressBar.style.display = "none";
    outputBox.style.display = "block";
    displayAnswers();
    feedbackSection.style.display = "block";

}

// Function to handle user response
function handleResponse(action) {
    const inputField = document.getElementById("inputField");
    const inputValue = inputField.value.trim(); // Trim whitespace from input

    // Handling the response
    if (action === 'Next') {
        // Check if the input is empty
        if (inputValue === "") {
            alert("Please enter a response.");
            return;
        }
        // Check if the current question allows only numeric characters and symbols
        if (currentQuestion === 2) {
            // Ensure only numeric characters and symbols are entered
            if (!/^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(inputValue)) {
                alert("Please enter numeric characters and symbols only.");
                return;
            }
        } else {
            // Ensure only alphabetic characters are entered for other questions
            if (!/^[A-Za-z\s]+$/.test(inputValue)) {
                alert("Please enter alphabetic characters only.");
                return;
            }
        }
        currentQuestion++;
        // Store the value in the answers object
        answers[currentQuestion - 1] = inputValue;
    } else if (action === 'Skip') {
        currentQuestion++;
        // Update progress and return to prevent further execution
        askNextQuestion();
        return;
    } else if (action === 'Back' && currentQuestion > 1) {
        currentQuestion--;
        // Populate input field with the last entered data
        inputField.value = answers[currentQuestion] || ""; // If no previous data, set to empty string
        // Update progress and return to prevent further execution
        updateProgress();
        askNextQuestion();
        return;
    }

    // Resetting the input field
    inputField.value = "";

    // Updating progress and handling the next question
    updateProgress();
    if (currentQuestion > totalQuestions) {
        closeModal();
    } else {
        askNextQuestion();
    }
}

function displayAnswers() {
    document.getElementById("answer1").textContent = answers[1];
    document.getElementById("answer2").textContent = answers[2];
    document.getElementById("answer3").textContent = answers[3];
    document.getElementById("answer4").textContent = answers[4];
    document.getElementById("answer5").textContent = answers[5];
    document.getElementById("answer6").textContent = answers[6];
    document.getElementById("answer7").textContent = answers[7];
    document.getElementById("answer8").textContent = answers[8];
    document.getElementById("answer9").textContent = answers[9];
    document.getElementById("answer10").textContent = answers[10];
    document.getElementById("answer11").textContent = answers[11];
    document.getElementById("answer12").textContent = answers[12];
    document.getElementById("answer13").textContent = answers[13];
    document.getElementById("answer14").textContent = answers[14];
    document.getElementById("answer15").textContent = answers[15];
}

// Function to update progress bar
function updateProgress() {
    const progress = Math.ceil(((currentQuestion / totalQuestions) * 100) - 9);
    document.getElementById("progressBar").value = progress;
}

startPrompt(); // Start the prompt process
