// add scripts
// start 9:23

$(document).on('ready', function() {
  ('#message').hide();
});

//POST - add new hike to db from form submit
$('form').on('submit', function(e){
  e.preventDefault();
  var $hikeName = $('#hike-name').val();
  var $hikeLocation = $('#hike-location').val();
  var $hikeDifficulty = $('#hike-difficulty').val();
  var $hikeDuration = $('#hike-duration').val();

  var payload = {
    Name: $hikeName,
    Location: $hikeLocation,
    Difficulty: $hikeDifficulty,
    Duration: $hikeDuration
  };

  $.post('/hikes', payload, function(data){
    $('#message').html(data.Message);
    $(':input', 'form').val('');
    $('#all-hikes').html("");
    $('#message').show();
    renderHikes();
  });
});

//PUT - update hike in db


//DELETE - delete hike from dom and db



//helper function to render hikes
function renderHikes(){
  $.get('/hikes', function(data){
    for (var i = 0; i < data.length; i++) {
      $('#all-hikes').append(
        '<ul>'+
          '<li>'+data[i].Name+'</li>'+//later, male a href to click to edit single superhero, use id from db?
          '<li>'+data[i].Location+'</li>'+
          '<li>'+data[i].Difficulty+'</li>'+
          '<li>'+data[i].Duration+'</li>'+
        '</ul>'
      );
    }
  });
}
