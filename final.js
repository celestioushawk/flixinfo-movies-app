const api_key = 'API_KEY_HERE'

const api_url = 'https://api.themoviedb.org/3/movie/now_playing?' + api_key + '&language=en-GB&page=1&region=US'

let image_url = 'https://image.tmdb.org/t/p/w1280'

const search_url = 'https://api.themoviedb.org/3/search/movie?' + api_key + '&query='



async function getData(url) {
    const res = await fetch(url)
    const resData = await res.json()
    showMovies(resData.results)
}


function showMovies(movies) {
    //const movie_container = document.querySelector('.movies-container')
    //movie_container.innerHTML = '';
    const glider = document.querySelector('.glider2')
    glider.innerHTML = ''
    movies.forEach(movie => {
        //console.log(movie.original_title)
        const movie_element = document.createElement('div')
        movie_element.classList.add('movie-element')
        movie_element.id = movie.id
        movie_element.innerHTML = `
            <div class='movie-image'>
                <img src="${image_url}${movie.poster_path}" alt="">
            </div>
            <div class='movie-title'>
                <div class='title'>${movie.original_title}</div>
                <div class='rating'><i class="fas fa-star"></i> ${movie.vote_average}</div> 
            </div>
        
        `
        movie_element.style.cursor = 'pointer'
        movie_element.onclick = function() {
            printid(movie_element.id)
        }
        glider.appendChild(movie_element)
    });
}

async function upcomingMovies() 
{
    const upcomingUrl = 'https://api.themoviedb.org/3/movie/popular?' + api_key + '&language=en-US&page=1&region=IN'
    const res = await fetch(upcomingUrl)
    const resData = await res.json()
    const movieData = resData.results

    const glider = document.querySelector('.glider3')
    glider.innerHTML = ''
    movieData.forEach(movie => {
        //console.log(movie.original_title)
        const movie_element = document.createElement('div')
        movie_element.classList.add('movie-element')
        movie_element.id = movie.id
        movie_element.innerHTML = `
            <div class='movie-image'>
                <img src="${image_url}${movie.poster_path}" alt="">
            </div>
            <div class='movie-title'>
                <div class='title'>${movie.original_title}</div>
                <div class='rating'><i class="fas fa-star"></i> ${movie.vote_average}</div> 
            </div>
        
        `
        movie_element.style.cursor = 'pointer'
        movie_element.onclick = function() {
            printid(movie_element.id)
        }
        glider.appendChild(movie_element)
    });
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
        //getData(search_link)
    }
    else{
        console.log('empty!')
    }
})


function printid(id) {
    console.log("id is " + id)
    sessionStorage.setItem("movieId",id)
    window.location.href = "./info.html"
    //showMovieInfo(id)
}

getData(api_url);
upcomingMovies();

const slider = document.querySelector('.glider2')
setTimeout(() => {
    const preloader = document.querySelector('.preloader')
    //preloader.style.opacity = '0'
    preloader.style.display = 'none'
    //preloader.style.pointerEvents= 'none'

    

},3500)