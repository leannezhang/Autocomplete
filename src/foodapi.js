export const getFood = (searchTerm) => {
  const limit = 10;
  return fetch(`https://api.frontendeval.com/fake/food/${searchTerm}`)
    .then((response) => response.json())
    .then((data) => {
      return data.slice(0, limit); // limit to 10
    });
};
