document.addEventListener("DOMContentLoaded", () => {
  const drinkContainer = document.getElementById("drink-container");
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`)
    .then((result) => result.json())
    .then((result) => {
      renderDrinks(result, drinkContainer);
    })
    .catch((error) => {
      alert(error);
    });
  const button = document.getElementById("submit");
  const form = document.getElementById("drink-search");

  form.appendChild(button);
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const input = document.getElementById("submit");
    const text = document.getElementById("find");
    const foundDrink = document.getElementById("found-drink");

    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text.value}`
    )
      .then((response) => response.json())
      .then((data) => {
        try {
          renderDrinks(data, foundDrink);
        } catch {
          alert("Your drink was not found, please try again!");
        }
      });
    form.reset();
    foundDrink.replaceChildren();
  });
  function renderDrinks(data, appendDrinks) {
    const drinks = data.drinks;
    drinks.forEach((drink) => {
      const eachDrink = document.createElement("div");
      const drinkName = document.createElement("h3");
      const img = document.createElement("img");
      const ingredients = document.createElement("li");
      const likes = document.createElement("h4");
      const likeButton = document.createElement("button");

      let drinkLikes = 0;
      likes.innerHTML = `Likes: ${drinkLikes}`;
      drinkName.innerHTML = `Drink name: ${drink.strDrink}`;
      img.src = drink.strDrinkThumb;
      likeButton.innerHTML = `Click to Like!`;
      likeButton.addEventListener("click", () => {
        likes.innerHTML = `Likes: ${++drinkLikes}`;
      });

      let ingredientsArray = [];
      for (let i = 1; i < 16; i++) {
        const ing = drink[`strIngredient${i}`];
        if (ing !== null) {
          ingredientsArray.push(ing);
        } else {
          continue;
        }
      }
      ingredients.innerHTML = `Ingredients: ${ingredientsArray}`;
      measurements = document.createElement("li");

      const measurementArray = [];
      for (let i = 1; i < 16; i++) {
        const measure = drink[`strMeasure${i}`];
        if (measure !== null) {
          measurementArray.push(measure);
        } else {
          continue;
        }
      }
      measurements.innerHTML = `Measurements: ${measurementArray}`;
      eachDrink.append(drinkName);
      eachDrink.append(img);
      eachDrink.append(ingredients);
      eachDrink.append(measurements);
      eachDrink.append(likeButton);
      eachDrink.append(likes);
      appendDrinks.append(eachDrink);
    });
  }
});
