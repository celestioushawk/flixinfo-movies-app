const api_key = 'API_KEY_HERE'

let movie_ref_id = sessionStorage.getItem("movieId")

console.log(sessionStorage.getItem("movieId"))

const movie_info_url = 'https://api.themoviedb.org/3/movie/' + movie_ref_id + '?' + api_key + '&language=en-US'


const movie_title = document.querySelector('.movie-title')
const movie_rating = document.querySelector('.rating')
const header_image = document.querySelector('.header-image')
const movie_desc = document.querySelector('.movie-description')
const movie_release = document.querySelector('.release')
const movie_runtime = document.querySelector('.runtime')

 



async function getMovieData(url) {
    const res = await fetch(url)
    const resData = await res.json() 
    showDetails(resData)
}

async function getMovieTrailer() {
    let videoUrl = `https://api.themoviedb.org/3/movie/${movie_ref_id}/videos?${api_key}&language=en-US` 
    const res = await fetch(videoUrl)
    const resData = await res.json()
    const key = resData.results[0].key
    const movie_video = document.querySelector(".video")
    movie_video.src = 'https://www.youtube.com/embed/' + key
    console.log(movie_video.src)
    
}

function showDetails(infob) 
{
    movie_title.innerHTML = infob.title
    document.title = infob.title + ' | FlixInfo'
    movie_rating.innerHTML = '<b>Rating</b>: ' + infob.vote_average + ' <i class="fas fa-star"</i>'
    let image_url = 'https://image.tmdb.org/t/p/w1280' + infob.backdrop_path
    header_image.style.background = "linear-gradient(rgba(14, 13, 13, 0), rgb(15, 32, 39, 1)),url(" +  image_url + ") no-repeat"
    header_image.style.backgroundSize = 'cover'
    header_image.style.backgroundPosition = '50% 30%'
    movie_desc.innerHTML = infob.overview
    movie_release.innerHTML = '<b>Release:</b> ' + infob.release_date
    movie_runtime.innerHTML = '<b>Runtime</b>: ' + infob.runtime + 'm'
    console.log(infob.release_date)
    getMovieTrailer()
}

getMovieData(movie_info_url)


