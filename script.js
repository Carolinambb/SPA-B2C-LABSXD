/*$(document).ready(function(){
    console.log('El archivo script.js se ha cargado correctamente');
    $("#botonput").on('click', function(){
        console.log('hiciste click');
    });
});*/

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
                $dogList.append($dogItem);
            });
            console.log(response)
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
