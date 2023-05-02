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
                $dogItem.append($('<button>').text('Editar').attr('id', 'edit-dog-' + dog.id).on('click', function() {
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
            
            
            // Agregar manejador de eventos para el clic en el botón de edición
            $('button[id^="edit-dog-"]').click(function() {
                var dogId = $(this).attr('id').split('-')[2];
                console.log('Editando perro con ID:', dogId);
                // Aquí puedes hacer lo que necesites para editar el perro con el ID correspondiente
                // Por ejemplo, podrías cargar los datos del perro en un formulario de edición
            });
        });
    }
    
  
      
    function loadDogs() {
        $.get(apiUrl + 'dogs', function(response) {
            var $dogList = $('#dog-list');
            $dogList.empty();
            $.each(response, function(index, dog) {
                var $dogItem = $('<div>').attr('id', 'dog-' + dog.id);
                $dogItem.html('<strong>Nombre:</strong> ' + dog.name + '<br><strong>Edad:</strong> ' + dog.age + '<br><strong>Género:</strong> ' + dog.gender + '<br><strong>Raza:</strong> ' + dog.breed + '<br><strong>Descripción:</strong> ' + dog.description + '<br><img src="' + dog.avatar + '" class="avatar">');
                var $editButton = $('<button>').text('Editar').click(function() {
                    editDog(dog.id);
                });
                var $deleteButton = $('<button>').text('Borrar').click(function() {
                    deleteDog(dog.id);
                });
                $dogItem.append($editButton).append($deleteButton);
                $dogList.append($dogItem);
            });
        })
        .fail(function(error) {
            console.log('Respuesta del servidor FAIL › ', error);
        });
    }
    
    
    /*function updateDog(data, dogId) {
        console.log(dogId);
        $.ajax({
            type: 'PUT',
            url: apiUrl + 'dogs/' + dogId,
            contentType: 'application/json',
            data: JSON.stringify(data)
        })
        .done(function(response) {
            console.log('Respuesta del servidor SUCCESS › ', response);
            loadDogs(); // Cargar la lista actualizada de perros
          })/*(function(response) {
            console.log('Respuesta del servidor SUCCESS › ', response);
            // actualizar la lista de perros en la página
            var $dogList = $('#dog-list');
            var $updatedDogItem = $dogList.find('#dog-' + response.id);
            $updatedDogItem.html('<strong>Nombre:</strong> ' + response.name + '<br><strong>Edad:</strong> ' + response.age + '<br><strong>Género:</strong> ' + response.gender + '<br><strong>Raza:</strong> ' + response.breed + '<br><strong>Descripción:</strong> ' + response.description + '<br><img src="' + response.avatar + '" class="avatar">');
        
            // actualizar la carta del perro en la página
            var $dogCard = $('#dog-card');
            if ($dogCard.data('dog-id') === response.id) {
                $dogCard.find('.card-title').text(response.name);
                $dogCard.find('.card-subtitle').text(response.breed);
                $dogCard.find('.card-text').text(response.description);
                $dogCard.find('.card-img-top').attr('src', response.avatar);
            }
        })
        
        .fail(function(error) {
            console.log('Respuesta del servidor FAIL › ', error);
        });
    }*/

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
            loadDogs();
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
            loadDogs();
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
            var $dogList = $('#dog-list');
            var $newDogItem = $('<li>').html('<strong>Nombre:</strong> ' + response.name + '<br><strong>Edad:</strong> ' + response.age + '<br><strong>Género:</strong> ' + response.gender + '<br><strong>Raza:</strong> ' + response.breed + '<br><strong>Descripción:</strong> ' + response.description + '<br><img src="' + response.avatar + '" class="avatar">');

            $newDogItem.append($('<img>').attr('src', response.avatar).addClass('avatar')); // Agregado
            $dogList.append($newDogItem);
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
    
    

    // función para manejar la acción del botón de guardar
    /*function handleSaveButton() {
        var dogName = $('#dog-name').val();
        var dogDescription = $('#dog-description').val();
        var dogAge = $('#dog-age').val();
        var dogGender = $('#dog-gender').val();
        var dogBreed = $('#dog-breed').val();
        var dogImage = $('#dog-image').val();
        var isEditMode = $('#edit-mode').prop('checked');
        var dogId = $('#dog-id').val();
    
        var data = {
            name: dogName,
            description: dogDescription,
            age: dogAge,
            gender: dogGender,
            breed: dogBreed,
            avatar: dogImage
        };
    
        if (isEditMode) {
            updateDog(data, dogId);
        } else {
            createDog(data);
        }
    }*/

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
