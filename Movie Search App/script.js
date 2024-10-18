const apiKey = 'YOUR_API_KEY'; // Replace with your TMDb API key
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results');

searchButton.addEventListener('click', async () => {
    const query = searchInput.value;
    if (!query) return;

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
    const data = await response.json();

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Display movie details
    if (data.results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    data.results.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.innerHTML = `
            <h3>${movie.title}</h3>
            <p>Rating: ${movie.vote_average}</p>
            <p>Release Date: ${movie.release_date}</p>
            <p>${movie.overview}</p>
        `;
        resultsContainer.appendChild(movieElement);
    });
});
