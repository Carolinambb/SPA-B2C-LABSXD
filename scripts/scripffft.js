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
