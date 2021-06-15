const api_key = 'API_KEY_HERE'

let searchMovie = sessionStorage.getItem("searchName")

console.log(sessionStorage.getItem("searchName"))

let image_url = 'https://image.tmdb.org/t/p/w1280'

const search_url = 'https://api.themoviedb.org/3/search/movie?' + api_key + '&query=' + searchMovie

async function getData(url) {
    const res = await fetch(url)
    const resData = await res.json()
    showMovies(resData.results)
}

document.title = `Search results for "${searchMovie}" | FlixInfo`

function showMovies(movies) {
    const movie_container = document.querySelector('.movies-container')
    movie_container.innerHTML = '';
    movies.forEach(movie => {
        console.log(movie.original_title)
        const movie_element = document.createElement('div')
        movie_element.classList.add('movie-element')
        movie_element.id = movie.id
        movie_element.innerHTML = `
        <div class='image'>
        <img src="${image_url}${movie.poster_path}" alt="" class='poster'>
        </div>
        <div class='movie-foot'>
        <div class='title'>${movie.original_title}</div>
        <div class='rating'>${movie.vote_average}</div> 
        </div>
        `
        movie_element.style.cursor = 'pointer'
        movie_element.onclick = function() {
            printid(movie_element.id)
        }
        movie_container.appendChild(movie_element)
    });
}


function printid(id) {
    console.log("id is " + id)
    sessionStorage.setItem("movieId",id)
    window.location.href = "./info.html"
}

const form = document.querySelector('#form')
const search = document.querySelector('#search')


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchMovie = search.value;
    if(searchMovie != '') {
        search_link = search_url + searchMovie;
        sessionStorage.setItem("searchName",searchMovie)
        window.location.href = "./search.html"
        console.log(search_link)
    }
    else{
        console.log('empty!')
    }
})


getData(search_url);
