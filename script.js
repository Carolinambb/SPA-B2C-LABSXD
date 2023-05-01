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
});
