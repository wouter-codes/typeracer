### Retrospective report

**User Story Status**

| User Story                                          | Priority    | Status             |
| --------------------------------------------------- | ----------- | ------------------ |
| Responsive and accessible design                    | Must-have   | ✅ Complete        |
| Start and stop actions                              | Must-have   | ✅ Complete        |
| Display typing test sample text                     | Must-have   | ✅ Complete        |
| User typing input section                           | Must-have   | ✅ Complete        |
| Calculate and display WPM                           | Must-have   | ✅ Complete        |
| Retry button                                        | Should-have | ✅ Complete        |
| Real-time feedback on typing accuracy               | Should-have | ✅ Complete        |
| Test instructions modal                             | Should-have | ✅ Complete        |
| Display best test results for each difficulty level | Could-have  | ❌ Not implemented |

**What has been achieved**

_Core Functionality:_

-   A fully functional typing speed test with three difficulty levels (Easy, Medium, Hard)
-   Random text selection from a pool of sample texts per difficulty
-   Timer that starts automatically on the first keystroke (improved UX over a manual start button)
-   Accurate WPM calculation based on correctly typed words
-   Test stops when the user presses Enter (streamlined from a separate Stop button)

_User Interface:_

-   Clean, responsive Bootstrap 5 layout that works on desktop and mobile
-   Custom styling with CSS variables for consistent branding (orange primary color)
-   Attractive "glow" effect on the Results card using box-shadow
-   Google Fonts integration (Nunito and Alegreya) for better typography
-   Instructions modal explaining how to use the application

_Real-time Feedback:_

-   Live word highlighting as the user types:
    -   Blue for correctly typed words
    -   Red for incorrectly typed words
    -   Default color for pending words
-   Immediate visual feedback helps users identify mistakes

_Retry Functionality:_

-   Retry button loads a new random text at the same difficulty level
-   Logic ensures the same text is never shown twice in a row (per difficulty)

**Areas for improvement**

_Features not implemented:_

-   Best results tracking/storage (could-have user story) — would require localStorage or a backend
-   More sample texts per difficulty level (currently only 3 each)
-   Accuracy percentage display alongside WPM
-   Countdown timer mode as an alternative to open-ended timing

_Technical improvements:_

-   The `autoResizeTextarea()` function exists but is not actively used — could be removed or properly integrated
-   Could add keyboard shortcuts for retry (e.g., Ctrl+R or Escape)
-   Could add sound effects for correct/incorrect feedback
-   Mobile testing and touch-specific optimizations

_Code quality:_

-   Some functions could be refactored for better separation of concerns
-   Could benefit from unit tests for the calculation functions
-   Consider using ES6 modules for better code organization in larger projects

**Lessons learned**

_Working effectively with GitHub Copilot:_

-   **Be specific with requests** — Clear, detailed prompts yield better results. Instead of "fix the button", describe what's wrong and what you want to achieve.

-   **Iterate in small steps** — Breaking features into smaller tasks (e.g., "add timer", then "display time", then "calculate WPM") makes it easier to verify each piece works before moving on.

-   **Ask for explanations** — When Copilot generates code you don't understand, ask it to explain. This turned into learning opportunities about:

    -   JSDoc comment syntax
    -   `Math.floor()` and random number generation
    -   The difference between objects and arrays
    -   DOM manipulation with `querySelector`
    -   Event listeners and keyboard events

-   **Debug collaboratively** — When something doesn't work, describe the symptom (e.g., "the same text sometimes shows") and Copilot can help identify the root cause and fix it.

-   **Understand the generated code** — Don't just accept code blindly. Understanding what each function does helps you:

    -   Catch potential bugs
    -   Make informed decisions about changes
    -   Learn new programming concepts

-   **UX improvements often come from iteration** — The test evolved from having Start/Stop buttons to a cleaner flow (type to start, Enter to stop) through iterative refinement.

_Technical takeaways:_

-   Bootstrap provides excellent components (modals, forms, grid) that speed up development
-   CSS variables make theming consistent and easy to maintain
-   Separating concerns (timer functions, display functions, calculation functions) makes code more maintainable
-   Real-time feedback significantly improves user experience
-   Edge cases matter (like showing the same text twice) — always consider what could go wrong

_For future projects:_

-   Start with user stories to define clear acceptance criteria
-   Use Copilot to scaffold initial structure, then refine iteratively
-   Don't hesitate to ask "why" — understanding the code is more valuable than just having working code
-   Test frequently in the browser as you build
-   Consider accessibility from the start (semantic HTML, ARIA labels, keyboard navigation)
