$(document).ready(() => {
    let searchOpt;
    $('.form-check-input').click(function() {
        if(this.id == 'inlineRadio1'){
            $('.codeBlock1').removeClass('dnone');
            $('.codeBlock2').addClass('dnone');
            $("#title").attr("required", true);
            $("#movie_ID").removeAttr("required", true);
        }
        else if(this.id == 'inlineRadio2'){
            $('.codeBlock2').removeClass('dnone');
            $('.codeBlock1').addClass('dnone');
            $("#movie_ID").attr("required", true);
            $("#title").removeAttr("required", true);
        }
        searchOpt = this.id;
    });

    $('#movieDetail').submit(function(event) {
        // Stop the browser from submitting the form.
        event.preventDefault();
        getMovieDetails(searchOpt);
    });
});

let myAPIToken = '94fcf6d9';
let getMovieDetails = (option) => {
    //alert(option);
    let apiURL;
    if(option == 'inlineRadio1'){
        apiURL = 'http://www.omdbapi.com/?apikey='+myAPIToken+'&t='+$('#title').val()+'&y='+$('#year').val();
    }
    else if(option == 'inlineRadio2'){
        apiURL = 'http://www.omdbapi.com/?apikey='+myAPIToken+'&i='+$('#movie_ID').val();
    }
    $.ajax({
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        async: true,
        url: apiURL,
        success: (response) => {
            console.log(response);
            $('#mimdbID').append('<h2> IMDB ID :'+response.imdbID+'</h2>');
            if(response.Poster != ''){
                $('#mPoster').append('<img src="'+response.Poster+'" class="img-fluid">');
            }else{
                $('#mPoster').append('<img src="https://via.placeholder.com/350x150" class="img-fluid">');
            }
            $('#mTitle').append('<h2>Movie Title : '+response.Title+'</h2>');
            $('#mYear').append('<h2>Year :'+response.Year+'</h2>');
            $('#mRated').append('<h2>Rated :'+response.Rated+'</h2>');
            $('#mReleased').append('<h2>Released :'+response.Released+'</h2>');
            $('#mGenre').append('<h2>Genre :'+response.Genre+'</h2>');
            $('#mRuntime').append('<h2>Runtime :'+response.Runtime+'</h2>');
            $('#mActors').append('<h2>Actors :'+response.Actors+'</h2>');
            $('#mPlot').append('<h2>Plot :'+response.Plot+'</h2>');
            $('#mProduction').append('<h2>Production :'+response.Production+'</h2>');
            $('#mWebsite').append('<h2>Website : </h2><a href="'+response.Website+'">'+response.Website+'</a>');
        },
        error: (err)=>{
            console.log(err.responseJSON.error.message);
        }
    })
};
