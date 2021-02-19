const submitBtn = document.querySelector('#submitBtn');
let yelpCategory = document.querySelector('#food-category');
let yelpPrice = document.querySelector('#yelp-price');
let yelpDelivery = document.querySelector('#delivery');
let movieGenre = document.querySelector('.movie-genre-dropdown');
console.log(movieGenre.value);

let historyRotation = 1;
let historyCounter = 0;

// modal
modalPopup = document.querySelector('#error-modal')
modalBackground = document.querySelector('#modal-background')

// restaurant results section 
const restaurantResults = document.querySelector('#restaurant-results'); // ~Replaced restaurant with overall~

const movieResults = document.querySelector('#movie-results');

// saves the food category for yelp fetch request
function getFoodCategory() {
    localStorage.setItem('food-category', yelpCategory.value);
}

// saves the price point category for yelp fetch
function getYelpPrice() {
    localStorage.setItem('yelp-price', yelpPrice.value)
}

// fetch for YELP
function getYelpFetch() {
    let foodSearch = localStorage.getItem('food-category');

    let yelpPrice = localStorage.getItem('yelp-price');

    fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=losangeles&term=" + foodSearch + "&price=" + yelpPrice, {
        "method": "GET",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer tp-_IN_VqcobWBBzZvhnTyIYpZGEqkrSqFgFtBWa3FXwPeEpob_Li3qRhwCnZkpZnX7VtDSzaF_Z2Yx_se7tGqXjG0DfxDMagHHK-XuFx-lDXfbEytQnPtJZQ1YaYHYx"
            //"Authorization": "Bearer IRtkp9Z-vSrWfSJK_sb1z4enasEAraGZfotbuAK5Nc-JFs3NEhvjAmRzW2jfe6i6TrQfezNgJJzFZ0ZyN2X99ftzI-9MBhj8EV4ctw4rBfMmgwajcTuV-CW2J0ESYHYx"
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // show list of businesses from array of chosen options
            let restaurantName = document.querySelector('#restaurant-name')
            let restaurantWebsite = document.querySelector('#yelp-link')
            let restaurantImage = document.querySelector('#restaurant-image')
            let restaurantRating = document.querySelector('#yelp-rating')
            let randomNumber = Math.floor(Math.random() * (data.businesses.length));
            console.log(randomNumber);

            // Search history localstorage
            if (data.total = 0) {
                modalPopup.classList.add('is-active')
            } else {

                restaurantName.innerHTML = data.businesses[randomNumber].name;
                restaurantWebsite.href = data.businesses[randomNumber].url;
                restaurantImage.src = data.businesses[randomNumber].image_url;

                let tagName = "name" + historyRotation;
                let tagImage = "img" + historyRotation;
                let tagURL = "url" + historyRotation;

                let imageURL = data.businesses[randomNumber].image_url;
                let restURL = data.businesses[randomNumber].url;
                let restName = data.businesses[randomNumber].name;

                historyCounter++;

                let counter = historyCounter;
                localStorage.setItem("counter", counter);
                localStorage.setItem(tagImage, imageURL);
                localStorage.setItem(tagURL, restURL);
                localStorage.setItem(tagName, restName);

                loadHistory();

                if (historyRotation === 1) {
                    historyRotation++;
                } else if (historyRotation === 2) {
                    historyRotation++;
                } else {
                    historyRotation = 1;
                };

                restaurantRating.innerHTML = "Average Rating: " + data.businesses[randomNumber].rating + "/5 ⭐'s "
                restaurantResults.classList.remove('is-hidden-touch'); // ~Changed function to match overall~
                restaurantResults.classList.remove('is-hidden-desktop');
            }
        });
    let movieValue = movieGenre.value;
    if (movieValue !== "Select Genre") {
        movieResults.classList.remove("is-hidden-touch");
        movieResults.classList.remove("is-hidden-desktop");
    }
};

// Loads localstorage history 
let loadHistory = function () {
    let counter = localStorage.getItem("counter")
    if (counter > 3) {
        counter = 3;
        let robert = document.querySelector("#robert")

        robert.classList.remove("is-hidden-touch")
        robert.classList.remove("is-hidden-desktop")
    }
    if (counter <= 3 && counter > 0) {
        let robert = document.querySelector("#robert")

        robert.classList.remove("is-hidden-touch")
        robert.classList.remove("is-hidden-desktop")
    }

    for (let i = 0; i < counter; i++) {
        let tagName = "#history" + (i + 1);
        let tagImage = "#img" + (i + 1);
        let tagURL = "#url" + (i + 1);

        let boxNum = "#box" + (i + 1);

        let name = "name" + (i + 1);
        let img = "img" + (i + 1);
        let url = "url" + (i + 1);

        let historyName = localStorage.getItem(name);
        let historyImg = localStorage.getItem(img);
        let historyURL = localStorage.getItem(url);

        let historyTitle = document.querySelector(tagName);
        let historyImage = document.querySelector(tagImage);
        let historyClick = document.querySelector(tagURL);
        let boxEl = document.querySelector(boxNum);

        historyTitle.innerHTML = historyName;
        historyImage.setAttribute("src", historyImg);
        historyClick.setAttribute("href", historyURL);
        historyClick.setAttribute("target", "_blank");

        boxEl.classList.remove("is-hidden-touch")
        boxEl.classList.remove("is-hidden-desktop")
    }
};

// fetch for The Movie Database 
let getMovie = function () {
    let movieKey = "068bcb78c00e7bd39492e93efa6cd1c2"
    let genre = document.querySelector(".movie-genre-dropdown").value;
    console.log(genre);

    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response)
            //let randomPage = Math.floor(Math.random()*(response.total_pages-1)+1); // ~Unleashes all 500 pages of movies~
            let randomPage = Math.floor(Math.random() * (2) + 1); // ~Top 60 Movies~
            console.log(randomPage)
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${randomPage}&with_genres=${genre}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    console.log(response)
                    let randomMovie = Math.floor(Math.random() * (response.results.length - 1) + 1);
                    let movieTitle = response.results[randomMovie].title;
                    console.log(randomMovie);
                    console.log(movieTitle);

                    let movieName = document.querySelector('#movie-name')
                    let movieWebsite = document.querySelector('#movie-link')
                    let moviePoster = document.querySelector('#poster-image')
                    let moviePosterURL = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" + response.results[randomMovie].poster_path
                    let movieWebURL = "https://www.themoviedb.org/movie/" + response.results[randomMovie].id + "-" + movieTitle
                    console.log(moviePosterURL);

                    movieName.innerHTML = movieTitle;
                    movieWebsite.href = movieWebURL;
                    moviePoster.src = moviePosterURL;
                });
        });
};

// event listeners for submitBtn
submitBtn.addEventListener('click', getFoodCategory);
submitBtn.addEventListener('click', getYelpFetch);
submitBtn.addEventListener('click', getYelpPrice);
submitBtn.addEventListener('click', getMovie)

// event listener for modal
modalBackground.addEventListener('click', () => {
    modalPopup.classList.remove('is-active');
})

loadHistory();