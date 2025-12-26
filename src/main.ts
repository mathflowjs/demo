import "./style.css";
import { createContext, solve } from "@mathflowjs/mathflow";

// select elements
const solveBtn = document.querySelector<HTMLButtonElement>("button")!;
const textarea = document.querySelector<HTMLTextAreaElement>("textarea")!;
const main = document.querySelector<HTMLElement>("main")!;

// context
const context = createContext()

// a function that solves the given expression using mathflow's evaluate function
function solveAndDisplay(expr: string = ""): string {
	let result: string = "";

	try {
		const output = solve(context, expr);

		if (output.solution.length > 2) {
			output.solution.forEach((step) => (result += `<div>= ${step}</div>`));
			result += `<div><br/>Answer: ${output.value}</div>`;
		} else {
			result += `<div>Answer: ${output.value}</div>`;
		}
	} catch (error) {
		result = `${error}`;
	}

	return result;
}

// a function used to respond to user input with a solution
function respond(): void {
	const input = textarea.value;

	main.innerHTML += `<div class="right"><div>${input.replace(/\n/g, "<br/>")}</div></div>`;

	const answer = solveAndDisplay(input);

	main.innerHTML += `<div class="left"><div>${answer}</div></div>`;

	main.scrollTo(0, main.scrollHeight);

	textarea.value = "";
}

// trigger response when user clicks the button
solveBtn.addEventListener("click", () => {
	if (!textarea.value.length) {
		return;
	}

	respond();
});

// capture CTRL+Enter to trigger the click event on the button
textarea.addEventListener("keyup", (ev) => {
	if (ev.ctrlKey && ev.key.toLowerCase() === "enter") {
		ev.preventDefault();

		solveBtn.click();
	}
});
