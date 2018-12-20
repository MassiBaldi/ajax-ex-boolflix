var paesiSupportati = ['it', 'en', 'es', 'fr', 'ge'];

$(document).ready(function(){

  var orario = moment().format("D, dddd MMMM YYYY, h:mm:ss a");
  console.log(orario);
  $('.ora').append(orario);

  $('#myButton').click(function(){
    // alert('ciao');
    gestisciFilm();
  });

  $('input').keypress(function(event){
    // alert('ciao')
    if (event.which == 13){
      gestisciFilm();
    }
  });
});

function gestisciFilm(){
  var searchValue = $('#search').val();
  // console.log(searchValue);

  //pulisco html a ogni ricerca
  $('.container').html('');

  //se l'utente non digita nulla: alert, sennò parte la chiamata
  if (searchValue != ''){

    $.ajax({
      url:'https://api.themoviedb.org/3/search/movie',
      method:'GET',
      data: {
        api_key:'591f55f90c0e21f16b04fc51951b4a5c',
        language:'it',
        query: searchValue
      },
      success: function(data) {
        // console.log(data);
        var movies = data.results;
        console.log(movies);

        for (var i = 0; i < movies.length; i++) {
          var movie = movies[i];
          movie.genere = 'Film';
          gestisciListaFilm(movie);
        }

        $.ajax({
          url:'https://api.themoviedb.org/3/search/tv',
          method:'GET',
          data: {
            api_key:'591f55f90c0e21f16b04fc51951b4a5c',
            language:'it',
            query: searchValue
          },
          success: function(data) {
            // console.log(data);
            var serie = data.results;

            for (var i = 0; i < serie.length; i++) {
              // console.log(serie[i]);
              var serieTv = serie[i];
              serieTv.genere = 'SerieTV';
              serieTv.title = serieTv.name;
              serieTv.original_title = serieTv.original_name;
              gestisciListaFilm(serieTv);
            }
          },
          error: function() {
            alert('errore')
          }
        });

      },
      error: function() {
        alert('errore')
      }
    });
  }
  else{
    alert('Inserisci un titolo di un film')
  }
};

function gestisciListaFilm(movie){
  var source   = $('#movie-template').html();
  var template = Handlebars.compile(source);

  //divido il numero del voto e lo porto a numero intero, arrotondato per eccesso
  var numero = movie.vote_average /2;
  // console.log(numero);

  var numeroArrotondato = Math.ceil(numero);
  // console.log(numeroArrotondato);

  var context = {
    immagine: gestisciLocandina(movie),
    genere: movie.genere,
    title: movie.title,
    original_title: movie.original_title,
    original_language: gestisciLingua(movie.original_language),
    vote_average: gestisciStelle(numeroArrotondato),
    overview: gestisciTrama(movie)
  };

  var html = template(context);
  $('.container').append(html);

};
//funzione che a senconda del voto mette le stelle
function gestisciStelle(numeroArrotondato) {

  var stringaPiene = '';
  var stringaVuote = '';

  for (var k = 1; k <= numeroArrotondato; k++) {
    var stellePiene = '<i class="fas fa-star"></i>';
    stringaPiene += stellePiene
  }
  // console.log(stringaPiene);

  for (var x = 0; x < (5 - numeroArrotondato); x++) {
    var stelleVuote = '<i class="far fa-star"></i>';
    stringaVuote += stelleVuote;
  }
  // console.log(stringaVuote);

  stringaStelle = (stringaPiene + stringaVuote);
  // console.log(stringaStelle);

  return stringaStelle;
};
//funzione che a seconda della lingua mette la bandiera corrispondente
function gestisciLingua(original_language) {
  var bandiera = '';

  if (paesiSupportati.includes(original_language)) {

    bandiera = "<img class='bandiera' src='" + original_language + ".png' />";

  }
  else {
    bandiera = original_language + ' "non supportata"'
  }

  return bandiera;
};
//funzione per la locandina di film e serietv
function gestisciLocandina(movie) {
  var locandinaFilm = ''

  if (movie.poster_path != ''){

    locandina = 'https://image.tmdb.org/t/p/w342' + movie.poster_path;
    locandinaFilm = "<img class='locandina' src='" + locandina + "' />";
  }
  else {
    locandina = 'https://image.tmdb.org/t/p/w342null'
    locandinaFilm = "<img class='locandina' src='" + locandina + "' />";
  }
  return locandinaFilm;
};
function gestisciTrama(movie) {
  var tramaFilm = ''

  if (movie.overview != '') {
    tramaFilm = movie.overview
  }
  else {
    tramaFilm = ' "non disponibile"'
  }
  return tramaFilm;
};
