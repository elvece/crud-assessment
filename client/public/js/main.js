// add scripts

$(document).on('ready', function() {
  renderHikes();
  $('#message').hide();
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

//open edit modal and set field values
$(document).on('click', '.edit-button', function(){
  $('#message').hide();
  $.get('/hike/'+$(this).attr('id'), function(data){
    $('#edit-hike-name').val(data.Name);
    $('#edit-hike-location').val(data.Location);
    $('#edit-hike-difficulty').val(data.Difficulty);
    $('#edit-hike-duration').val(data.Duration);
    $('.save-changes').attr('id', data._id);
  });
});

//PUT - update hike in db
//if nothing changed in edit modal form...do not display success message
// $('#edit-modal').one('change', ':input', function() {
//only works on first time...why???
  $(document).on('click', '.save-changes', function(){

    var $updatedName = $('#edit-hike-name').val();
    var $updatedLocation = $('#edit-hike-location').val();
    var $updatedDifficulty = $('#edit-hike-difficulty').val();
    var $updatedDuration = $('#edit-hike-duration').val();

    var payload = {
      Name: $updatedName,
      Location: $updatedLocation,
      Difficulty: $updatedDifficulty,
      Duration: $updatedDuration
    };

    $.ajax({
      method: 'PUT',
      url: 'hike/'+$(this).attr('id'),
      data: payload
    })
    .done(function(data){
      $('#message').html(data.Message);
      $('#all-hikes').html("");
      $('#message').show();
      renderHikes();
    });
  });
// });

//open delete modal and sets yes button attribute to hike id
$(document).on('click', '.delete-button', function(){
  $('#message').hide();
  $.get('/hike/'+$(this).attr('id'), function(data){
    $('.yes-delete').attr('id', data._id);
  });
});

//DELETE - delete hike from dom and db
$(document).on('click', '.yes-delete', function(){
  $.ajax({
    method: 'DELETE',
    url: '/hike/'+$(this).attr('id'),
  })
  .done(function(data){
    $('#message').html(data.Message);
    $('#all-hikes').html("");
    $('#message').show();
    renderHikes();
  });
});


//helper function to render hikes
function renderHikes(){
  $.get('/hikes', function(data){
    for (var i = 0; i < data.length; i++) {
      $('#all-hikes').append(
        '<tr>'+
          '<td>'+data[i].Name+'</td>'+//later, male a href to edit single superhero, use id from db?
          '<td>'+data[i].Location+'</td>'+
          '<td>'+data[i].Difficulty+'</td>'+
          '<td>'+data[i].Duration+' hours roundtrip</td>'+
          '<td><a class="btn btn-primary btn-xs edit-button" data-toggle="modal" data-target="#edit-modal" id="'+data[i]._id+'" role="button">Edit</a>'+
          '&nbsp;<a class="btn btn-danger btn-xs delete-button" data-toggle="modal" data-target="#delete-modal" id="'+data[i]._id+'" role="button">Delete</a></td'+
        '</tr>'
      );
    }
  });
}

// function validateInput(input) {
//   if (input.value == input.defaultValue) {
//     alert("Please update a field or click 'Cancel Edit'.");
//     return false;
//   }
//   return true;
// }
//   validateInput($('#edit-modal:input'));

