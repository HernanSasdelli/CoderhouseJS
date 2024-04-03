// Array para almacenar los vehículos dentro del lavadero
let vehiculos = [];

// Tipos de lavado con sus respectivos datos
const tiposLavado = [
    {
        tipo: "Lavado simple",
        detalle: "Aspirado, Lavado exterior, Secado por aire",
        costo: "$1000",
        duracion: "30 segundos",
        imagenUrl: "/images/lavado_simple.jpg"
    },
    {
        tipo: "Lavado premium",
        detalle: "Aspirado, resaltado de plásticos, Lavado exterior, Secado por aire, enserado",
        costo: "$2000",
        duracion: "45 segundos",
        imagenUrl: "/images/lavado_premium.jpg"
    },
    {
        tipo: "Solo aspirado",
        detalle: "Aspirado, resaltado de plásticos",
        costo: "$1000",
        duracion: "30 segundos",
        imagenUrl: "/images/solo_aspirado.jpg"
    },
    {
        tipo: "Detallado",
        detalle: "Aspirado, lavado de tapizados y alfombras, Lavado exterior detallado, pulido, enserado, tratamiento anti-rayas",
        costo: "$3500",
        duracion: "120 segundos",
        imagenUrl: "/images/detallado.jpg"
    }
];

// Función para crear una tarjeta de tipo de lavado en el HTML
function crearTarjetaTipoLavado(tipo) {
    const tarjeta = document.createElement('article');
    tarjeta.classList.add('tarjeta');

    const imagen = document.createElement('img');
    imagen.src = tipo.imagenUrl;
    imagen.alt = tipo.tipo;
    tarjeta.appendChild(imagen);

    const descripcion = document.createElement('div');
    descripcion.classList.add('descripcion');
    descripcion.innerHTML = `
        <h3>Tipo de trabajo: ${tipo.tipo}</h3>
        <p>Detalle: ${tipo.detalle}</p>
        <p>Costo: ${tipo.costo}</p>
        <p>Duración aproximada: ${tipo.duracion}</p>
    `;
    tarjeta.appendChild(descripcion);

    // Agregar evento de clic a la tarjeta
    tarjeta.addEventListener('click', function() {
        // Obtener el vehículo temporal almacenado
        const vehiculoTemporal = JSON.parse(localStorage.getItem('vehiculoTemporal'));

        if (!vehiculoTemporal) {
            alert("Hubo un problema al obtener los datos del vehículo.");
            return;
        }

        const tipoLavado = {
            nombre: tipo.tipo,
            detalle: tipo.detalle,
            costo: tipo.costo,
            duracion: tipo.duracion
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
    });

    return tarjeta;
}

// Función para cargar los tipos de lavado en el contenedor
function cargarTiposLavado() {
    const tarjetasContainer = document.getElementById('tarjetas-container');
    for (const tipo of tiposLavado) {
        const tarjeta = crearTarjetaTipoLavado(tipo);
        tarjetasContainer.insertAdjacentElement('beforeend', tarjeta);// el appendchail me dio problemas todo el dia, este tambien y ni el chatgpt me supo ayudar con la solucion 
}}

// Función para verificar si todos los campos del formulario están completos
function verificarCamposCompletos(marca, modelo, patente, tipoVehiculo) {
    return marca.value.length >= 3 && marca.value.length <= 20 &&
           modelo.value.length >= 3 && modelo.value.length <= 20 &&
           patente.value.length >= 6 &&
           tipoVehiculo.value !== '';
}

// Función para habilitar o deshabilitar el botón "Siguiente" según el estado de los campos del formulario
function actualizarEstadoBoton() {
    const botonSiguiente = document.querySelector('.siguiente');
    botonSiguiente.disabled = !verificarCamposCompletos(
        document.getElementById('marca'),
        document.getElementById('modelo'),
        document.getElementById('patente'),
        document.getElementById('tipo_vehiculo')
    );
}

document.addEventListener('DOMContentLoaded', function() {
    cargarTiposLavado();

    const formularioAuto = document.getElementById('formularioAuto');

    // Evento que se dispara al cambiar cualquier campo del formulario
    formularioAuto.addEventListener('input', actualizarEstadoBoton);

    // Evento que se dispara al enviar el formulario
    formularioAuto.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que se envíe el formulario por defecto

        // Crear objeto vehículo con los datos del formulario
        const marca = document.getElementById('marca').value;
        const modelo = document.getElementById('modelo').value;
        const patente = document.getElementById('patente').value;
        const tipoVehiculo = document.getElementById('tipo_vehiculo').value;

        const vehiculoPreCargado = {
            marca: marca,
            modelo: modelo,
            patente: patente,
            tipoVehiculo: tipoVehiculo
        };

        // Guardar el vehículo en el almacenamiento local
        localStorage.setItem('vehiculoTemporal', JSON.stringify(vehiculoPreCargado));

        // Redirigir a la página de tipos de lavado
        window.location.href = 'tiposLavado.html';
    });
});
