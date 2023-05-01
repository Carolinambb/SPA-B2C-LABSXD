/*$(document).ready(function() {
  // Definir la URL de la API mock
  var apiUrl = 'https://644dcf304e86e9a4d8ebf173.mockapi.io/';

  // función para obtener la lista de perros desde la API
  function getDogList() {
    $.get(apiUrl + 'dogs', function(response) { // Endpoint modificado
      // actualizar la lista de perros en la página
      var $dogList = $('#dog-list');
      $dogList.empty();
      response.forEach(function(dog) {
        var $dogItem = $('<li>').text(dog.name);
        $dogList.append($dogItem);
      });
    });
  }

  // función para enviar datos a la API para crear un nuevo perro
  function createDog(data) {
    $.ajax({
      type: 'POST', //hizo un put
      url: apiUrl + 'dogs', // Endpoint modificado
      contentType: 'application/json',
      data: JSON.stringify(data)
    })
    .done(function(response) {
      console.log('Respuesta del servidor SUCCESS › ', response);
      // actualizar la lista de perros en la página
      getDogList();
    })
    .fail(function(error) {
      console.log('Respuesta del servidor FAIL › ', error);
    });
  }

  // función para manejar la acción del botón de guardar
  function handleSaveButton() {
    var dogName = $('#dog-name').val();
    var dogDescription = $('#dog-description').val();
    var data = {
      name: dogName,
      description: dogDescription
    };
    
    // enviar los datos a la API
    createDog(data);
  }

  // manejar el evento del cambio de estado del checkbox
  $('#edit-mode').change(function() {
    var isEditMode = $(this).prop('checked');
    if (isEditMode) {
      $('#save-button').text('Actualizar');
    } else {
      $('#save-button').text('Guardar');
    }
  });

  // manejar el evento del botón de guardar
  $('#save-button').click(handleSaveButton);

  // obtener la lista de perros al cargar la página
  getDogList();
});*/











/* $(document).ready(function() {
    // Definir la URL de la API mock
    var apiUrl = 'https://644dcf304e86e9a4d8ebf173.mockapi.io/';

    // función para obtener la lista de perros desde la API
    function getDogList() {
        $.get(apiUrl + 'dogs', function(response) {
            var $dogList = $('#dog-list');
            $dogList.empty();
            response.forEach(function(dog) {
                var $dogItem = $('<li>');
                $dogItem.append($('<img>').attr('src', dog.avatar).addClass('avatar'));
                $dogItem.append($('<div>').text('Nombre: ' + dog.name));
                $dogItem.append($('<div>').text('Edad: ' + dog.age));
                $dogItem.append($('<div>').text('Género: ' + dog.gender));
                $dogItem.append($('<div>').text('Raza: ' + dog.breed));
                $dogItem.append($('<div>').text('Descripción: ' + dog.description));
                $dogItem.append($('<button>').text('Editar').attr('id', 'edit-dog-' + dog.id).on('click', function() {
                    $.get(apiUrl + 'dogs/' + dog.id, function(dogDetails) {
                        $('#dog-id').val(dogDetails.id);
                        $('#dog-name').val(dogDetails.name);
                        $('#dog-description').val(dogDetails.description);
                        $('#dog-age').val(dogDetails.age);
                        $('#dog-gender').val(dogDetails.gender);
                        $('#dog-breed').val(dogDetails.breed);
                        $('#dog-image').val(dogDetails.avatar);
                        $('#edit-mode').prop('checked', true);
                        $('#save-button').text('Actualizar');
                    });
                }));
                $dogItem.append($('<button>').text('Eliminar').attr('id', 'delete-dog-' + dog.id).on('click', function() {
                    $.ajax({
                        url: apiUrl + 'dogs/' + dog.id,
                        type: 'DELETE',
                        success: function() {
                            $dogItem.remove();
                        }
                    });
                }));
                $dogList.append($dogItem);
            });
        });
    }
    function updateDog(id, data) {
        var dogId = id || $('#dog-id').val();
        if (!dogId) {
          console.error('No se ha proporcionado un ID válido para actualizar el perro.');
          return;
        }
        
        $.ajax({
            type: 'PUT',
            url: apiUrl + 'dogs/' + dogId,
            contentType: 'application/json',
            data: JSON.stringify(data)
        })
        .done(function(response) {
            console.log('Respuesta del servidor SUCCESS › ', response);
            // actualizar la lista de perros en la página
            var $dogItem = $('#edit-dog-' + response.id).parent();
            $dogItem.empty();
            $dogItem.append($('<img>').attr('src', response.avatar).addClass('avatar'));
            $dogItem.append($('<div>').text('Nombre: ' + response.name));
            $dogItem.append($('<div>').text('Edad: ' + response.age));
            $dogItem.append($('<div>').text('Género: ' + response.gender));
            $dogItem.append($('<div>').text('Raza: ' + response.breed));
            $dogItem.append($('<div>').text('Descripción: ' + response.description));
            $dogItem.append($('<button>').text('Editar').attr('id', 'edit-dog-' + response.id).on('click', function() {
                $.get(apiUrl + 'dogs/' + response.id, function(dogDetails) {
                    $('#dog-id').val(dogDetails.id);
                    $('#dog-name').val(dogDetails.name);
                    $('#dog-description').val(dogDetails.description);
                    $('#dog-age').val(dogDetails.age);
                    $('#dog-gender').val(dogDetails.gender);
                    $('#dog-breed').val(dogDetails.breed);
                    $('#dog-image').val(dogDetails.avatar);
                    $('#edit-mode').prop('checked', true);
                    $('#save-button').text('Actualizar');
                });
            }));
            $dogItem.append($('<button>').text('Eliminar').attr('id', 'delete-dog-' + response.id).on('click', function() {
                $.ajax({
                    url: apiUrl + 'dogs/' + response.id,
                    type: 'DELETE',
                    success: function() {
                        $dogItem.remove();
                    }
                });
            }));
        })
        .fail(function(error) {
            console.log('Respuesta del servidor FAIL › ', error);
        });
      }
      
    
    function createDog(data) {
        var isEditMode = $('#edit-mode').prop('checked');
        if (isEditMode) {
            var dogId = $('#dog-id').val();
            updateDog(dogId, data);
            return;
        }
        $.ajax({
            type: 'POST',
            url: apiUrl + 'dogs',
            contentType: 'application/json',
            data: JSON.stringify(data)
        })
        .done(function(response) {
            console.log('Respuesta del servidor SUCCESS › ', response);
            // actualizar la lista de perros en la página
            var $dogList = $('#dog-list');
            var $newRow = createDogRow(response);
            $dogList.append($newRow);
            $('#dog-form').trigger('reset');
        })
    }
    
      

    // función para manejar la acción del botón de guardar
    function handleSaveButton() {
        var dogName = $('#dog-name').val();
        var dogDescription = $('#dog-description').val();
        var dogAge = $('#dog-age').val();
        var dogGender = $('#dog-gender').val();
        var dogBreed = $('#dog-breed').val();
        var dogImage = $('#dog-image').val(); // Agregado
    
        var data = {
            name: dogName,
            description: dogDescription,
            age: dogAge,
            gender: dogGender,
            breed: dogBreed,
            avatar: dogImage // Agregado
        };
    
        // enviar los datos a la API
        createDog(data);
    }
    
    

    // manejar el evento del cambio de estado del checkbox
    $('#edit-mode').change(function() {
        var isEditMode = $(this).prop('checked');
        if (isEditMode) {
            $('#save-button').text('Actualizar');
        } else {
            $('#save-button').text('Guardar');
        }
    });

    // manejar el evento del botón de guardar
    $('#save-button').click(handleSaveButton);

    // obtener la lista de perros al cargar la página
    getDogList();
});*/




/*$(document).ready(function(){
    console.log('El archivo script.js se ha cargado correctamente');
    $("#botonput").on('click', function(){
        console.log('hiciste click');
    });
});*/