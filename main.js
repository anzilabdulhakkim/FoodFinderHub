let timeout;
let searchbar = document.getElementById('searchbar').addEventListener('input',function() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
        searchData(document.getElementById('searchbar').value)
    },1000)
})

async function searchData(query){
    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        let data = await res.json();
        displayData(data.meals);
    } catch (error) {
        alert(`${error}`);
    }
}

function displayData(foods) {
    const resultsContainer = document.getElementById('container');
    resultsContainer.innerHTML='';
    if (!foods) {
        const notFoundContainer = document.createElement('div');
        notFoundContainer.id = 'notfound';
        notFoundContainer.innerHTML = '<h2>No results found.</h2>';
        resultsContainer.appendChild(notFoundContainer);
        return;
    }
    foods.forEach(food => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `<h2>${food.strMeal}</h2>
        <h3>${food.strCategory}</h3>
        <h4> Area:${food.strArea}</h4>
        <img src="${food.strMealThumb}" alt="${food.strMeal}">`;
        resultsContainer.append(resultItem);
    });
}