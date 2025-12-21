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
const promptDisplay = document.getElementById("prompt-display");
const textArea = document.getElementById("game-text-area");
const retryButton = document.getElementById("button-retry");
const timeDisplay = document.getElementById("time-display");
const levelDisplay = document.getElementById("level-display");
const wpmDisplay = document.getElementById("wpm-display");

// Timer variables
let startTime = null;
let testStarted = false;
// Track last shown text per difficulty level
let lastTextByDifficulty = {
    easy: null,
    medium: null,
    hard: null,
};

/**
 * Get a random text based on the selected difficulty level
 * @param {string} difficulty - The difficulty level (easy, medium, hard)
 * @returns {string} A random text from the selected difficulty
 */
function getRandomText(difficulty) {
    const texts = sampleTexts[difficulty];

    // If there's only one text, return it
    if (texts.length === 1) {
        return texts[0];
    }

    // Get a random text that's different from the last one shown for this difficulty
    let randomIndex;
    let newText;
    do {
        randomIndex = Math.floor(Math.random() * texts.length);
        newText = texts[randomIndex];
    } while (newText === lastTextByDifficulty[difficulty]);

    return newText;
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
        lastTextByDifficulty[selectedValue] = randomText; // Track the current text for this difficulty
        promptInput.value = randomText;
        // Display the text with all words as pending (unstyled)
        updatePromptDisplay(randomText, "");
    } else {
        promptInput.value = "";
        promptDisplay.innerHTML =
            "<span class='text-muted'>Please select a difficulty level</span>";
    }
}

/**
 * Record the current time as the start time
 */
function recordStartTime() {
    startTime = Date.now();
}

/**
 * Calculate the elapsed time in seconds since the test started
 * @returns {number} Elapsed time in seconds
 */
function calculateElapsedTime() {
    if (startTime === null) {
        return 0;
    }
    const endTime = Date.now();
    const elapsedMilliseconds = endTime - startTime;
    return elapsedMilliseconds / 1000;
}

/**
 * Reset the timer to its initial state
 */
function resetTimer() {
    startTime = null;
}

/**
 * Update the time display in the results section
 * @param {number} timeInSeconds - The time to display in seconds
 */
function updateTimeDisplay(timeInSeconds) {
    timeDisplay.textContent = `Time: ${timeInSeconds.toFixed(2)}s`;
}

/**
 * Update the level display in the results section
 * @param {string} level - The difficulty level to display
 */
function updateLevelDisplay(level) {
    // Capitalize the first letter of the level
    const formattedLevel = level.charAt(0).toUpperCase() + level.slice(1);
    levelDisplay.textContent = `Level: ${formattedLevel}`;
}

/**
 * Update the WPM display in the results section
 * @param {number} wpm - The words per minute to display
 */
function updateWpmDisplay(wpm) {
    wpmDisplay.textContent = `WPM: ${wpm}`;
}

/**
 * Get the words from a text string
 * @param {string} text - The text to split into words
 * @returns {string[]} An array of words
 */
function getWordsFromText(text) {
    return text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
}

/**
 * Count the number of correctly typed words
 * @param {string} sampleText - The original sample text
 * @param {string} typedText - The text typed by the user
 * @returns {number} The number of correctly typed words
 */
function countCorrectWords(sampleText, typedText) {
    const sampleWords = getWordsFromText(sampleText);
    const typedWords = getWordsFromText(typedText);

    let correctCount = 0;

    for (let i = 0; i < typedWords.length; i++) {
        // Check if there's a corresponding word in the sample text
        if (i < sampleWords.length && typedWords[i] === sampleWords[i]) {
            correctCount++;
        }
    }

    return correctCount;
}

/**
 * Calculate words per minute
 * @param {number} correctWords - The number of correctly typed words
 * @param {number} timeInSeconds - The time taken in seconds
 * @returns {number} The words per minute, rounded to a whole number
 */
function calculateWpm(correctWords, timeInSeconds) {
    if (timeInSeconds <= 0) {
        return 0;
    }
    const timeInMinutes = timeInSeconds / 60;
    const wpm = correctWords / timeInMinutes;
    return Math.round(wpm);
}

/**
 * Initialize the page on load
 */
function initializePage() {
    // Disable text area until difficulty is selected
    textArea.disabled = true;
}

/**
 * Prepare the typing test when difficulty is selected
 */
function prepareTest() {
    const selectedValue = difficultySelect.value;
    if (selectedValue === "Choose..." || selectedValue === "") {
        return;
    }

    // Display a random text for the selected difficulty
    displaySampleText();

    // Clear and enable the text area
    textArea.value = "";
    textArea.disabled = false;
    textArea.placeholder = "Start typing to begin the test...";

    // Reset timer but don't start it yet (will start on first keystroke)
    resetTimer();
    testStarted = false;
    updateTimeDisplay(0);

    // Update level display
    updateLevelDisplay(selectedValue);

    // Reset WPM display
    updateWpmDisplay(0);
}

/**
 * Stop the typing test
 */
function stopTest() {
    // Calculate and display elapsed time
    const elapsedTime = calculateElapsedTime();
    updateTimeDisplay(elapsedTime);

    // Get the sample text and typed text
    const sampleText = promptInput.value;
    const typedText = textArea.value;

    // Calculate and display correct words and WPM
    const correctWords = countCorrectWords(sampleText, typedText);
    const wpm = calculateWpm(correctWords, elapsedTime);
    updateWpmDisplay(wpm);

    // Update level display with current difficulty
    const selectedValue = difficultySelect.value;
    updateLevelDisplay(selectedValue);

    // Reset test state
    testStarted = false;

    textArea.disabled = true;
    textArea.placeholder =
        "Select a difficulty and start typing to begin the test";
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
    textArea.placeholder = "Start typing to begin the test...";
    textArea.focus();

    // Reset timer but don't start it yet (will start on first keystroke)
    resetTimer();
    testStarted = false;
    updateTimeDisplay(0);

    // Reset WPM display
    updateWpmDisplay(0);
}

/**
 * Update the prompt display with highlighted words
 * @param {string} sampleText - The original sample text
 * @param {string} typedText - The text typed by the user so far
 */
function updatePromptDisplay(sampleText, typedText) {
    const sampleWords = getWordsFromText(sampleText);
    const typedWords = getWordsFromText(typedText);

    // Build HTML with highlighted words
    let html = "";

    for (let i = 0; i < sampleWords.length; i++) {
        const sampleWord = sampleWords[i];

        if (i < typedWords.length) {
            // User has typed this word
            const typedWord = typedWords[i];
            if (typedWord === sampleWord) {
                // Correct word - highlight in blue
                html += `<span class="word-correct">${sampleWord}</span>`;
            } else {
                // Incorrect word - highlight in red
                html += `<span class="word-incorrect">${sampleWord}</span>`;
            }
        } else {
            // User hasn't typed this word yet - pending (no highlight)
            html += `<span class="word-pending">${sampleWord}</span>`;
        }

        // Add space between words (except after the last word)
        if (i < sampleWords.length - 1) {
            html += " ";
        }
    }

    promptDisplay.innerHTML = html;
}

/**
 * Handle real-time input from the user
 */
function handleTypingInput() {
    // Start the timer on first keystroke
    if (!testStarted && textArea.value.length > 0) {
        testStarted = true;
        recordStartTime();
    }

    const sampleText = promptInput.value;
    const typedText = textArea.value;
    updatePromptDisplay(sampleText, typedText);
}

/**
 * Handle keydown events to stop test on Enter key
 * @param {KeyboardEvent} event - The keyboard event
 */
function handleKeyDown(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent new line in textarea
        if (testStarted) {
            stopTest();
        }
    }
}

// Event listeners
retryButton.addEventListener("click", retryTest);

// Prepare test when difficulty changes
difficultySelect.addEventListener("change", prepareTest);

// Real-time typing feedback
textArea.addEventListener("input", handleTypingInput);

// Stop test when Enter key is pressed
textArea.addEventListener("keydown", handleKeyDown);

// Initialize the page
initializePage();

/**
 * Auto-resize a textarea to fit its content by adjusting rows
 * @param {HTMLTextAreaElement} textarea - The textarea element to resize
 */
function autoResizeTextarea(textarea) {
    // Reset to 1 row to get accurate scrollHeight
    textarea.rows = 1;
    // Calculate how many rows are needed (line height is approximately 24px for form-control-lg)
    const lineHeight =
        parseInt(window.getComputedStyle(textarea).lineHeight) || 24;
    const paddingTop =
        parseInt(window.getComputedStyle(textarea).paddingTop) || 0;
    const paddingBottom =
        parseInt(window.getComputedStyle(textarea).paddingBottom) || 0;
    const contentHeight = textarea.scrollHeight - paddingTop - paddingBottom;
    const rows = Math.ceil(contentHeight / lineHeight);
    textarea.rows = Math.max(1, rows);
}
