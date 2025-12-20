// Sample texts for each difficulty level
const sampleTexts = {
    easy: [
        "The cat sat on the mat.",
        "A quick brown dog ran fast.",
        "She sells sea shells by the shore.",
    ],
    medium: [
        "The quick brown fox jumps over the lazy dog near the riverbank.",
        "Programming is the art of telling a computer what to do step by step.",
        "Practice makes perfect, so keep typing every day to improve your speed.",
    ],
    hard: [
        "The extraordinary phenomenon of bioluminescence occurs in various deep-sea creatures, creating spectacular displays of natural light.",
        "Quantum computing leverages the principles of superposition and entanglement to perform calculations exponentially faster than classical computers.",
        "The archaeological excavation revealed unprecedented artifacts from an ancient civilization, fundamentally challenging our understanding of human history.",
    ],
};

// DOM elements
const difficultySelect = document.getElementById("inputGroupSelect01");
const promptInput = document.getElementById("prompt-input");
const textArea = document.getElementById("game-text-area");
const startButton = document.getElementById("button-start");
const stopButton = document.getElementById("button-stop");
const retryButton = document.getElementById("button-retry");

/**
 * Get a random text based on the selected difficulty level
 * @param {string} difficulty - The difficulty level (easy, medium, hard)
 * @returns {string} A random text from the selected difficulty
 */
function getRandomText(difficulty) {
    const texts = sampleTexts[difficulty];
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
}

/**
 * Display the sample text based on selected difficulty
 */
function displaySampleText() {
    const selectedValue = difficultySelect.value;
    if (
        selectedValue === "easy" ||
        selectedValue === "medium" ||
        selectedValue === "hard"
    ) {
        const randomText = getRandomText(selectedValue);
        promptInput.value = randomText;
        promptInput.placeholder = randomText;
    } else {
        promptInput.value = "";
        promptInput.placeholder = "Please select a difficulty level";
    }
}

/**
 * Start the typing test
 */
function startTest() {
    // Check if a difficulty is selected
    const selectedValue = difficultySelect.value;
    if (selectedValue === "Choose..." || selectedValue === "") {
        alert("Please select a difficulty level first!");
        return;
    }

    // Display a random text for the selected difficulty
    displaySampleText();

    // Clear and enable the text area
    textArea.value = "";
    textArea.disabled = false;
    textArea.placeholder = "Start typing here...";
    textArea.focus();
}

/**
 * Stop the typing test
 */
function stopTest() {
    textArea.disabled = true;
    textArea.placeholder = "Click the start button to begin the test";
}

/**
 * Retry the typing test with a new random text
 */
function retryTest() {
    // Get a new random text
    displaySampleText();

    // Clear and enable the text area
    textArea.value = "";
    textArea.disabled = false;
    textArea.placeholder = "Start typing here...";
    textArea.focus();
}

// Event listeners
startButton.addEventListener("click", startTest);
stopButton.addEventListener("click", stopTest);
retryButton.addEventListener("click", retryTest);

// Update displayed text when difficulty changes
difficultySelect.addEventListener("change", displaySampleText);
