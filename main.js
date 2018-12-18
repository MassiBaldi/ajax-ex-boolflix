$(document).ready(function(){

  $('#myButton').click(function(){
    // alert('ciao');
    var searchValue = $('#search').val();
    // console.log(searchValue);

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
          console.log(numero);

          var numeroArrotondato = Math.ceil(numero);
          console.log(numeroArrotondato);

          var context = {
            title: movie.title,
            original_title: movie.original_title,
            original_language: movie.original_language,
            vote_average: numeroArrotondato
          };

          var html = template(context);
          $('.container').append(html);


        }

      },
      error: function() {
        alert('Errore');
      }
    });
  });


});
