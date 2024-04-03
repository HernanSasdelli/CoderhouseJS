
       // Deshabilitar los botones de selección
       tarjeta.disabled = true;

// Función para cargar los vehículos desde el almacenamiento local al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const vehiculosLocalStorage = JSON.parse(localStorage.getItem('vehiculos'));
    if (vehiculosLocalStorage) {        //distinto de null
        vehiculos = vehiculosLocalStorage;
    }

    cargarTiposLavado();
});

// Función para manejar el envío del formulario de ingreso de vehículo
document.addEventListener('DOMContentLoaded', function() {
    const formularioAuto = document.getElementById('formularioAuto');
    const botonSiguiente = document.querySelector('.siguiente');
    const inputMarca = document.getElementById('marca');
    const inputModelo = document.getElementById('modelo');
    const inputPatente = document.getElementById('patente');
    const selectTipoVehiculo = document.getElementById('tipo_vehiculo');

    function verificarCamposCompletos() {
        return inputMarca.value.length >= 2 && inputMarca.value.length <= 20 &&
               inputModelo.value.length >= 2 && inputModelo.value.length <= 20 &&
               inputPatente.value.length >= 6 &&
               selectTipoVehiculo.value !== '';
    }

    function actualizarEstadoBoton() {
        botonSiguiente.disabled = !verificarCamposCompletos();
    }

    formularioAuto.addEventListener('submit', function(event) {
        event.preventDefault();

        // Verificar si todos los campos están completos
        if (!verificarCamposCompletos()) {
            alert("Por favor complete todos los campos antes de continuar.");
            return;
        }

        // Obtener los datos del formulario
        const vehiculo = {
            marca: inputMarca.value,
            modelo: inputModelo.value,
            patente: inputPatente.value,
            tipoVehiculo: selectTipoVehiculo.value
        };

        // Redirigir a la página de tipos de lavado
        window.location.href = 'tiposLavado.html';

        // Guardar el vehículo temporalmente en el almacenamiento local
        localStorage.setItem('vehiculoTemporal', JSON.stringify(vehiculo));   //lo pasa a texto
    });

    formularioAuto.addEventListener('input', actualizarEstadoBoton);    
});

// Función para manejar la selección de tipo de lavado
document.addEventListener('DOMContentLoaded', function() {
    const tarjetas = document.querySelectorAll('.tarjeta');
    for (const tarjeta of tarjetas) {
        tarjeta.addEventListener('click', function() {
            // Obtener el vehículo temporal almacenado
            const vehiculoTemporal = JSON.parse(localStorage.getItem('vehiculoTemporal'));

            if (!vehiculoTemporal) {
                alert("Hubo un problema al obtener los datos del vehículo.");
                return;
            }

            const tipoLavado = {
                nombre: tarjeta.querySelector('h3').textContent.trim(),
                detalle: tarjeta.querySelector('.descripcion p:nth-child(2)').textContent.trim(),
                costo: tarjeta.querySelector('.descripcion p:nth-child(3)').textContent.trim(),
                duracion: tarjeta.querySelector('.descripcion p:nth-child(4)').textContent.trim()
            };

            // Agregar la información del tipo de lavado al vehículo temporal
            vehiculoTemporal.tipoLavado = tipoLavado;

            // Agregar el vehículo al array vehiculos
            vehiculos.push(vehiculoTemporal);

            // Guardar los vehículos en el almacenamiento local
            localStorage.setItem('vehiculos', JSON.stringify(vehiculos));

            // Mostrar el vehículo cargado en el alert
            alert(`El vehículo patente: ${vehiculoTemporal.patente} ingresa para un: ${tipoLavado.nombre}, y el costo será: ${tipoLavado.costo}`);

            // Redirigir a la página principal
            window.location.href = 'index.html';
            console.log('Vehículo cargado:', vehiculoTemporal);
        });
    }
});
