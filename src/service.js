const fetchJokesService = numberOfJokes =>
  fetch(`http://api.icndb.com/jokes/random/${numberOfJokes}`)
    .then(response => response.json())
    .then(data => {
      if (data.type === "success") return data;
      throw data.type;
    });

export default fetchJokesService;
