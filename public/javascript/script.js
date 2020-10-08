const addIngredient = document.querySelector('#addIngredient');
const addStep = document.querySelector('#addStep');
const ingredientDiv = document.querySelector('#ingredient');
const stepDiv = document.querySelector('#step')


addIngredient.addEventListener('click', addIngredientLine);
addStep.addEventListener('click', addStepLine); 


function addIngredientLine() {
    const tag = document.createElement("p");
    const newInnerHtml ="<p>Name: <input type='text' name='name' /> Amount: <input type='number' name='quantity' /> Unit: <input type='text' name='units' /> </p>"
    tag.innerHTML=newInnerHtml;
    ingredientDiv.appendChild(tag);

};

function addStepLine() {
    const tagStep = document.createElement("p");
    const stepNum = document.querySelectorAll('.stepNum');
    number = parseInt(stepNum[stepNum.length-1].value);
    console.log(stepNum);
    const numberInc = number+1;
    const newStep =  `<input class="stepNum hidden" type='number' name='step_number' value='${numberInc}'/> Step ${numberInc}: <textarea class='long' wrap='soft' maxlength='255' type='text' name='step' ></textarea> `
    tagStep.innerHTML = newStep;
    stepDiv.appendChild(tagStep);

};
