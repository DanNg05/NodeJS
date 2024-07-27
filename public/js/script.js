
// INGREDIENTS LIST
const cookingIngredients = [
  // Meats
  "Ground beef",
  "Steak",
  "Roast",
  "Ribs",
  "Brisket",
  "Pork chops",
  "Bacon",
  "Sausage",
  "Ham",
  "Pork shoulder",
  "Whole chicken",
  "Chicken breasts",
  "Chicken thighs",
  "Chicken drumsticks",
  "Chicken wings",
  "Turkey",
  "Lamb",
  "Fish",
  "Shrimp",
  "Crab",
  "Lobster",
  "Duck",
  "Goat",
  "Veal",

  // Vegetables
  "Carrots",
  "Potatoes",
  "Tomatoes",
  "Onions",
  "Garlic",
  "Broccoli",
  "Cauliflower",
  "Spinach",
  "Kale",
  "Lettuce",
  "Bell peppers",
  "Cucumbers",
  "Zucchini",
  "Squash",
  "Mushrooms",
  "Eggplant",
  "Green beans",
  "Peas",
  "Corn",
  "Cabbage",
  "Celery",
  "Asparagus",
  "Brussels sprouts",
  "Artichokes",
  "Leeks",
  "Radishes",
  "Turnips",
  "Sweet potatoes",
  "Beets",
  "Pumpkin",

  // Fruits
  "Apples",
  "Bananas",
  "Oranges",
  "Grapes",
  "Strawberries",
  "Blueberries",
  "Raspberries",
  "Pineapple",
  "Mango",
  "Peaches",
  "Plums",
  "Cherries",
  "Watermelon",
  "Cantaloupe",
  "Honeydew",
  "Kiwis",
  "Pears",
  "Lemons",
  "Limes",
  "Avocado",

  // Dairy
  "Milk",
  "Butter",
  "Cheese",
  "Yogurt",
  "Cream",
  "Sour cream",
  "Cottage cheese",
  "Cream cheese",

  // Grains and Starches
  "Rice",
  "Pasta",
  "Bread",
  "Oats",
  "Quinoa",
  "Barley",
  "Cornmeal",
  "Flour",
  "Tortillas",
  "Noodles",

  // Legumes
  "Beans",
  "Lentils",
  "Chickpeas",
  "Peas",
  "Soybeans",

  // Nuts and Seeds
  "Almonds",
  "Peanuts",
  "Walnuts",
  "Cashews",
  "Pistachios",
  "Sunflower seeds",
  "Pumpkin seeds",
  "Chia seeds",
  "Flax seeds",

  // Oils and Fats
  "Olive oil",
  "Vegetable oil",
  "Canola oil",
  "Butter",
  "Margarine",
  "Lard",
  "Coconut oil",
  "Sesame oil"
];

const selectedIngredients = document.querySelector('.selected-ingredients');
const ingredientsInput = document.getElementById("ingredients");
const suggestedIngredients = document.querySelector(".suggested-ingredients");

// CHECK INPUT FROM USERS TO SUGGEST INGREDIENTS AND DISPLAY
if (ingredientsInput) {
  ingredientsInput.addEventListener("input", (event) => {
    const input = event.target.value.toLowerCase();
    if (input) {
      const filterIngredients = cookingIngredients.filter(ingredient => ingredient.toLowerCase().includes(input));
      // console.log(filterIngredients);
      let limit = 0;
      suggestedIngredients.innerHTML = "";
      filterIngredients.forEach(
        filterIngredient => {
          // LIMIT SUGGESTED INGREDIENTS AT 5
          if (limit < 5) {
            limit += 1;
            const ingredient = document.createElement('li');
            ingredient.classList = 'suggested-ingredient';
            ingredient.innerText = filterIngredient;
            suggestedIngredients.appendChild(ingredient);
            ingredient.addEventListener('click', () => addSelectedIngredient(filterIngredient))
          }
        }
        )
    } else {
      suggestedIngredients.innerHTML = ""
    }
  })
}

// SELECT SUGGESTED INGREDIENTS
const addSelectedIngredient = (ingredient) => {
  const selectedDiv = document.createElement('div');
  selectedDiv.classList.add('selected-div');

  const selectedIngredient = document.createElement('li');
  selectedIngredient.classList.add('selected-ingredient-li')
  const deleteSign = document.createElement('span');
  deleteSign.classList.add('delete-btns')
  deleteSign.innerHTML = '<i class="fa-solid fa-x"></i>'

  selectedIngredient.innerHTML = ingredient;

  selectedDiv.appendChild(selectedIngredient);
  selectedDiv.appendChild(deleteSign);

  selectedIngredients.appendChild(selectedDiv);
  ingredientsInput.value = '';
  suggestedIngredients.innerHTML = '';

  deleteSign.addEventListener('click', () => {
    if (selectedDiv) {
      selectedDiv.parentElement.removeChild(selectedDiv);
    }
  })
}

const recipeBtn = document.querySelector('.recipe-btn');
const warningDiv = document.querySelector('.warning');


// SUBMIT FORM AND FETCH
if (recipeBtn) {
  recipeBtn.addEventListener('click', () => {
    const ingredientsLi = document.querySelectorAll('.selected-ingredient-li')
    const data = Array.from(ingredientsLi).map(li => li.innerHTML);

    if (data.length > 0) {
      fetch('/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      })
        .then(response => {
        // Redirect to the rendered page if the response is HTML
        if (response.ok) {
            return response.text().then(html => {
                document.open();
                document.write(html);
                document.close();
            });
        } else {
            return response.json().then(error => {
                console.error('Error:', error);
            });
        }
      })
      .catch(error => {
          console.error('Error:', error);
      });
      } else {
        // WARNING WITH EMPTY INPUT
        warningDiv.innerHTML = ''
        const warningElement = document.createElement('span');
        warningElement.classList.add('warning-span');
        warningElement.innerHTML = 'Please input your ingredients';
        warningDiv.appendChild(warningElement)
    }
      })
}


  // SIGN UP AND LOG IN ACTIONS
  const form = document.querySelector('.new-signup');
  const emailError = document.querySelector('.email.error');
  const passwordError = document.querySelector('.password.error');
  // console.log(form);
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // reset errors
      emailError.textContent = '';
          passwordError.textContent = '';
      // get values
      const email = form.email.value;
      const password = form.password.value;

      try {
        const res = await fetch('/signup', {
          method: 'POST',
          body: JSON.stringify({email, password}),
          headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        if (data.errors) {
          emailError.textContent = data.errors.email;
          passwordError.textContent = data.errors.password;
        }
        if (data.user) {
          location.assign('/');
        }
      }
      catch (err) {
        console.log(err)
      }
    });
  }

  // LOGIN
  const loginForm = document.querySelector('.new-login');
  const loginEmailError = document.querySelector('.login-email.error');
  const loginPasswordError = document.querySelector('.login-password.error')
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // reset errors
      loginEmailError.textContent = '';
      loginPasswordErrortextContent = '';
      // get values
      const email = loginForm.email.value;
      const password = loginForm.password.value;

      try {
        const res = await fetch('/login', {
          method: 'POST',
          body: JSON.stringify({email, password}),
          headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        if (data.errors) {
          loginEmailError.textContent = data.errors.email;
          loginPasswordError.textContent = data.errors.password;
        }
        if (data.user) {
          location.assign('/');
        }
      }
      catch (err) {
        console.log(err)
      }
    });
  }


  document.querySelectorAll('.favorite-form').forEach(form => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent the default form submission

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries()); // Convert FormData to a plain object

      try {
        const response = await fetch('/add-favorite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          alert('Item added to favorites!');
          window.location.reload();
        } else {
          alert('Failed to add item to favorites.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding to favorites.');
      }
    });
  });
