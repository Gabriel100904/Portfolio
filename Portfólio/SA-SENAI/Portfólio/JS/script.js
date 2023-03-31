let tarefas = []

const addTarefa = () => {
    let tarefa = document.getElementById('tarefa').value

    document.getElementById('tarefa').value = ""

    if(localStorage.getItem('tarefas') != null){
        tarefas = JSON.parse(localStorage.getItem('tarefas'))
    }
    
    let data = new Date();
    let date = `${data.getUTCDay()}/${data.getUTCMonth()}/${data.getUTCFullYear()}`;

    tarefas.push([date, tarefa])
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

const list = () => {
    let tbody = document.querySelector('#tr-tarefa')

    if(localStorage.getItem('tarefas') != null){
        tarefas = JSON.parse(localStorage.getItem('tarefas'))
    } else {
        tarefas.push(["Sem ","Dados"])
    }

    tarefas.forEach((element,index) => {
        tbody.innerHTML += "<tr> <td>" + element[0]+"</td><td>"+ element[1]+"</td>"+ "<td><button type='button' onclick='deletar("+ index +")'> 🗑 </button></td></tr>"
 });

}

const deletar = (index)=> {
        newArray = tarefas.filter(
        (e,i)=> i != index
    )
    localStorage.setItem('tarefas', JSON.stringify(newArray))
    document.location.reload(true)
}


const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString();

    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  calculate() {
    let result;

    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

    switch (this.operation) {
      case "+":
        result = _previousOperand + _currentOperand;
        break;
      case "-":
        result = _previousOperand - _currentOperand;
        break;
      case "÷":
        result = _previousOperand / _currentOperand;
        break;
      case "*":
        result = _previousOperand * _currentOperand;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;

    if (this.previousOperand !== "") {
      this.calculate();
    }

    this.operation = operation;

    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") return;

    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )} ${this.operation || ""}`;
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(
      this.currentOperand
    );
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}

for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.updateDisplay();
  });
}

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

getLocal = function(e) {
  var store;
  store = localStorage.cards;
  if (store) {
      return lista = [...JSON.parse(store), e];
  } else {
      return localStorage.cards = e;
  }
};
lista = getLocal(Calculator);
  localStorage.cards = JSON.stringify(lista);