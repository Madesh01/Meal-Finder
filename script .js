const search = document.getElementById("search");
const submit= document.getElementById("submit");
const random = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_mealEl= document.getElementById("single-meal");

function searchMeal(e) {
    e.preventDefault();
    mealsEl.innerHTML="";
    single_mealEl.innerHTML="";  

    const term = search.value;
    if(term.trim()){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s= ${term}`)
    .then((res) => res.json())
    .then((data) =>{
        console.log(data);
        resultHeading.innerHTML =`<h2>Search results for '${term}':</h2>`;
        
        if(data.meals === null){
            resultHeading.innerHTML =`<p> There are no serach results/Try again!</p>`;
        }
        else{
            mealsEl.innerHTML = data.meals.map((meal)=>`
                <div class ='meal'onclick="getMealById(${meal.idmeal})" >
                <img src ="${meal.strMealThumb}" alt=" "/>
               <div class="meal-info">
               <h3>${meal.strMeal}</h3>
               </div> 
               </div>
                `
            ) 
            .join("");
        }
    });
    search.value="";
}else{
            alert("Please enter a search term");
        }
        } 
        function getMealById(){
            console.log("hitting",mealId);
        }
    function getRandomMeal(){
        mealsEl.innerHTML="";
        resultHeading.innerHTML="";

        fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then((res)=> res.json())
        .then((data)=> {
            const meal =data.meals[0];
            addMealToDOM(meal);
        });

    }
function addMealToDOM (meal){
const ingredients =[];
for(let i=1;i<=20;i++){
    if(meal[`strIngredient${{i}}`]){
        ingredients.push(`${meal[`strIngredient$[i]`]}-${meal[`strmeasure${i}`]}`);
    }
}
single_mealEl.innerHTML=`
<div class="single-meal">
<h1>${meal.strMeal}<h1>
<img src= "${meal.strMealThumb}" alt="${meal.strMeal}"/>
<div class="single-meal-info">
${meal.strcategory ?`<p>${meal.strcategory}</p>`:""}
${meal.strArea?`<p>${meal.strArea}</p>`:""}
</div>
<div class="main">
<p>${meal.strInstructions}</p>
<h2>ingredients</h2>
<ul>
${ingredients.map(ing=>`<li>${ingredients}</li>`).join("")}
</ul>
</div>
`;
}
submit.addEventListener("submit",searchMeal);
random.addEventListener("click", getRandomMeal);




