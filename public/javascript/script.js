const addIngredient = document.querySelector('#addIngredient');
const addStep = document.querySelector('#addStep');
const ingredientDiv = document.querySelector('#ingredient');
const stepDiv = document.querySelector('#step')


addIngredient.addEventListener('click', addIngredientLine);
addStep.addEventListener('click', addStepLine); 


function addIngredientLine() {
    const name = document.createElement("input");
    name.setAttribute("type", "text");
    name.setAttribute("name", "name");
    const amount = document.createElement("input");
    amount.setAttribute("type", "number");
    amount.setAttribute("name", "quantity");
    const unit = document.createElement("input");
    unit.setAttribute("type", "text");
    unit.setAttribute("name", "units");
    ingredientDiv.appendChild(name);
    ingredientDiv.appendChild(amount);
    ingredientDiv.appendChild(unit);
};

function addStepLine() {
    const stepNum = document.getElementsByClassName('stepNum');
    console.log(stepNum);
    number = parseInt(stepNum[stepNum.length-1].value);
    const numberInc = number+1;
    const stepNumber = document.createElement("input");
    stepNumber.setAttribute("class", "stepNum");
    stepNumber.name = "step_number";
    stepNumber.setAttribute("type", "number");
    stepNumber.setAttribute("value", `${numberInc}`);
    const step = document.createElement('input');
    step.setAttribute("type", "text");
    step.setAttribute("name", "step");
    stepDiv.appendChild(stepNumber);
    stepDiv.appendChild(step);
};
