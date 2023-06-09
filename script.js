$(document).ready(function() {
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
                $dogItem.append($('<button>').text('Editar').addClass('edit-button').attr('id', 'edit-dog-' + dog.id).on('click', function() {
                    console.log(dog.id)
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
                
                $dogItem.append($('<button>').text('Eliminar').addClass('delete-button').attr('id', 'delete-dog-' + dog.id).on('click', function() {
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
            
            
            // Agregar manejador de eventos para el clic en el botón de edición
            $('#dog-list').on('click', '.edit-button', function() {
                var dogId = $(this).attr('id').split('-')[2];
                console.log('Editando perro con ID:', dogId);        
            });
        });
    };
    
    function updateDog(data, dogId) {
        console.log(dogId)
        $.ajax({
            type: 'PUT',
            url: apiUrl + 'dogs/' + dogId,
            contentType: 'application/json',
            data: JSON.stringify(data)
        })
        .done(function(response) {
            console.log('Respuesta del servidor SUCCESS › ', response);
            getDogList();
           
        })
        .fail(function(error) {
            console.log('Respuesta del servidor FAIL › ', error);
        });
    }
    
    function deleteDog(dogId) {
        $.ajax({
            type: 'DELETE',
            url: apiUrl + 'dogs/' + dogId
        })
        .done(function(response) {
            console.log('Respuesta del servidor SUCCESS › ', response);
            getDogList();
            
        })
        .fail(function(error) {
            console.log('Respuesta del servidor FAIL › ', error);
        });
    }
    
    

    // función para enviar datos a la API para crear un nuevo perro
    function createDog(data) {
        $.ajax({
            type: 'POST',
            url: apiUrl + 'dogs',
            contentType: 'application/json',
            data: JSON.stringify(data)
        })
        .done(function(response) {
            console.log('Respuesta del servidor SUCCESS › ', response);
            // actualizar la lista de perros en la página
            getDogList(); //cuando lo llamo aparecen los botones
        })
        .fail(function(error) {
            console.log('Respuesta del servidor FAIL › ', error);
        });
    }
    
    
    
    function handleEditButton(event) {
        event.preventDefault();
        var $dogItem = $(this).closest('.dog-item');
        var dogId = $dogItem.attr('id').replace('dog-', '');
        showDogForm(dogId); // <-- Aquí se debe estar pasando el dogId correctamente
    }
    //para la info en el form
    
    function showDogForm(dogId) {
        var $form = $('#dog-form');
        $form.attr('data-dog-id', dogId);
        $form.find('#name').val('');
        $form.find('#age').val('');
        $form.find('#gender').val('');
        $form.find('#breed').val('');
        $form.find('#description').val('');
        $form.find('#avatar').val('');
        $form.find('#id').val(dogId); // <-- Aquí se debe asignar el dogId al campo id
        showModal('form-modal');
    }

    //para que se limpie el form 
    function resetForm() {
        $('#dog-name').val('');
        $('#dog-age').val('');
        $('#dog-gender').val('');
        $('#dog-breed').val('');
        $('#dog-description').val('');
        $('#dog-image').val('');
    }

    function handleSaveButton(event) {
        event.preventDefault();
        var data = {
            name: $('#dog-name').val(),
            age: $('#dog-age').val(),
            gender: $('#dog-gender').val(),
            breed: $('#dog-breed').val(),
            description: $('#dog-description').val(),
            avatar: $('#dog-image').val()
        };
        var dogId = $('#dog-id').val(); // <-- Obtener el ID del perro desde el campo oculto
        if ($('#edit-mode').is(':checked')) {
            updateDog(data, dogId); // <-- Pasar el ID del perro a la función updateDog
        } else {
            createDog(data);
        }
        resetForm();
        $('#save-button').text('Crear');
        $('#edit-mode').prop('checked', false);
    }
    var $nameInput = $('#dog-name');
  var $descriptionInput = $('#dog-description');
  var $ageInput = $('#dog-age');
  var $genderInput = $('#dog-gender');
  var $breedInput = $('#dog-breed');

  // Obtener los botones del formulario
  var $saveButton = $('#save-button');
  var $resetButton = $('#reset-button');

  // Deshabilitar los botones si los campos del formulario están vacíos
  function toggleButtons() {
    var disabled = ($nameInput.val() === '' || $descriptionInput.val() === '' || $ageInput.val() === '' || $genderInput.val() === '' || $breedInput.val() === '');
    $saveButton.prop('disabled', disabled);
    $resetButton.prop('disabled', disabled);
  }

  // Vincular el evento keyup a los campos del formulario
  $nameInput.on('keyup', toggleButtons);
  $descriptionInput.on('keyup', toggleButtons);
  $ageInput.on('keyup', toggleButtons);
  $genderInput.on('keyup', toggleButtons);
  $breedInput.on('keyup', toggleButtons);

  // Deshabilitar los botones al cargar la página
  toggleButtons();

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
});
