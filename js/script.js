import themeSwitcher from "./themesSwitcher.js";
import { get, getAll } from "./getElements.js";

themeSwitcher();

class CalculatorApp {
  constructor(prevOperation, currOperation) {
    this.prevOperation = prevOperation;
    this.currOperation = currOperation;
    this.overRide = false;
    this.resetCalc();
  }

  resetCalc() {
    this.currentInput = "";
    this.previousInput = "";
    this.activeOperator = undefined;
  }

  deleteEntry() {
    this.currentInput = this.currentInput.slice(0, -1);
  }

  appendEntries(entry) {
    if (this.overRide) {
      this.currentInput = "";
      this.overRide = false;
    }

    if (entry === "." && this.currentInput.includes(".")) return;
    // this.currentInput = this.currentInput.toString() + entry.toString();
    this.currentInput += entry;
  }

  mathOperators(operator) {
    if (this.currentInput === "") return;

    // if (this.previousInput !== "" && this.operator !== "") {
    //   this.activeOperator = operator;
    // }

    if (this.previousInput !== "") {
      this.calculateValues();
    }

    this.activeOperator = operator;
    this.previousInput = this.currentInput;
    this.currentInput = "";
  }

  calculateValues() {
    let calculatedValues;
    const prev = parseFloat(this.previousInput);
    const curr = parseFloat(this.currentInput);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.activeOperator) {
      case "+":
        calculatedValues = prev + curr;
        break;
      case "-":
        calculatedValues = prev - curr;
        break;
      case "x":
        calculatedValues = prev * curr;
        break;
      case "÷":
        calculatedValues = prev / curr;
        break;
      default:
        return;
    }

    // max 15 digits
    calculatedValues = calculatedValues.toString().slice(0, 18);

    this.currentInput = calculatedValues;
    this.activeOperator = undefined;
    this.previousInput = "";
    this.overRide = true;
  }

  formatEntries(entry) {
    const integer = parseFloat(entry.toString().split(".")[0]);
    const decimalNumber = entry.toString().split(".")[1];

    let numbersDisplayed;

    isNaN(integer)
      ? (numbersDisplayed = "")
      : (numbersDisplayed = integer.toLocaleString("en", {
          maximumFractionDigits: 0,
        }));

    if (decimalNumber) return `${numbersDisplayed}.${decimalNumber}`;
    return numbersDisplayed;
  }

  displayResults() {
    this.currOperation.textContent = this.formatEntries(this.currentInput);
    if (this.activeOperator != null) {
      this.prevOperation.textContent = `${this.formatEntries(
        this.previousInput
      )} ${this.activeOperator}`;
    } else {
      prevOperation.textContent = "";
    }
  }
}

const currOperation = get(".curr-operation");
const prevOperation = get(".prev-operation");

const calcKeys = getAll(".value");
const mathOperators = getAll(".operators");
const equalBtn = get(".equals-btn");
const resetBtn = get(".reset-btn");
const deletBtn = get(".delete-btn");

const calculator = new CalculatorApp(prevOperation, currOperation);

calcKeys.forEach((key) => {
  key.addEventListener("click", () => {
    calcKeys.forEach((key) => {
      key.style.transform = "scale(1)";
    });
    key.style.transform = "scale(0.9)";
    calculator.appendEntries(key.textContent);
    calculator.displayResults();
  });
});

mathOperators.forEach((operator) => {
  operator.addEventListener("click", () => {
    calculator.mathOperators(operator.textContent);
    calculator.displayResults();
  });
});

equalBtn.addEventListener("click", () => {
  calculator.calculateValues();
  calculator.displayResults();
});

resetBtn.addEventListener("click", () => {
  calculator.resetCalc();
  calculator.displayResults();
});

deletBtn.addEventListener("click", () => {
  calculator.deleteEntry();
  calculator.displayResults();
});
