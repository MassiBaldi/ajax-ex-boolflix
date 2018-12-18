$(document).ready(function(){

  $('#myButton').click(function(){
    // alert('ciao');
    film();
  });
  $('input').keypress(function(event){
    // alert('ciao')
    if (event.which == 13){
      film();
    }
  });

  function film(){
    var searchValue = $('#search').val();
    // console.log(searchValue);

    //pulisco html a ogni ricerca
    $('.container').html('');

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
        var movies = data. results;

        for (var i = 0; i < movies.length; i++) {
          var movie = movies[i];

          var source   = $('#movie-template').html();
          var template = Handlebars.compile(source);

          //divido il numero del voto e lo porto a numero intero, arrotondato per eccesso
          var numero = movie.vote_average /2;
          // console.log(numero);

          var numeroArrotondato = Math.ceil(numero);
          // console.log(numeroArrotondato);

          var stringaPiene = '';
          var stringaVuote = '';
          var stringaStelle = '';

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

          var context = {
            title: movie.title,
            original_title: movie.original_title,
            original_language: movie.original_language,
            vote_average: stringaStelle
          };

          var html = template(context);
          $('.container').append(html);

        }

      },
      error: function() {

      }
    });
  };

});
