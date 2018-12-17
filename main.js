$(document).ready(function(){

  $('#myButton').click(function(){
    var searchValue = $('#search').val();
    console.log(searchValue);

    $.ajax({
      url:'https://api.themoviedb.org/3/search/movie',
      method:'GET',
      data: {
        api_key:'591f55f90c0e21f16b04fc51951b4a5c',
        language:'it',
        query: searchValue
      },
      success: function(data) {
        console.log(data);
      },
      error: function() {
        alert('Errore');
      }
    });
  });


});
