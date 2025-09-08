const apiKey = 'd7f3a8daefca410e95ac66d7502afa35'; 
document.getElementById('search-btn').addEventListener('click', () => {
	const dishName = document.getElementById('dish-input').value;
	if (dishName) {
		fetchDishData(dishName);
	} else {
		alert('Please enter a dish name');
	}
});

document.getElementById('back-btn').addEventListener('click', () => {
	location.reload(); // Simple way to reset the page
});

function fetchDishData(dishName) {
	const url = `https://api.spoonacular.com/recipes/complexSearch?query=${dishName}&number=1&apiKey=${apiKey}`;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			if (data.results.length > 0) {
				fetchDishDetails(data.results[0].id);
			} else {
				alert('Dish not found. Please try again.');
			}
		})
		.catch(error => {
			console.error('Error fetching the dish data:', error);
			alert('An error occurred while fetching the dish data.');
		});
}

function fetchDishDetails(dishId) {
	const url = `https://api.spoonacular.com/recipes/${dishId}/information?apiKey=${apiKey}`;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			displayDishDetails(data);
			document.getElementById('back-btn').style.display = 'block'; // Show the button after fetching data
		})
		.catch(error => {
			console.error('Error fetching the dish details:', error);
			alert('An error occurred while fetching the dish details.');
		});
}

function displayDishDetails(dish) {
	const dishesContainer = document.getElementById('dishes-container');
	dishesContainer.innerHTML = ''; // Clear previous results

	const dishCard = document.createElement('div');
	dishCard.className = 'dish-card';

	const ingredientsList = dish.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('');

	const instructions = dish.instructions ? `<p><strong>Instructions:</strong> ${dish.instructions}</p>` : '';

	dishCard.innerHTML = `
		<h2>${dish.title}</h2>
		<p><strong>Ready in:</strong> ${dish.readyInMinutes} minutes</p>
		<p><strong>Servings:</strong> ${dish.servings}</p>
		<img src="${dish.image}" alt="${dish.title}">
		<h3>Ingredients:</h3>
		<ul>${ingredientsList}</ul>
		${instructions}
	`;

	dishesContainer.appendChild(dishCard);
}
