let autos = [];

let opcion = prompt("¿Desea hardcodear los autos? (si/no):");
if (opcion.toLowerCase() === "si") {
    autos = [
        { marca: "Ford", modelo: "Fiesta", patente: "JJJ123", tipoVehiculo: "Auto", tipoLavado: "Completo" },
        { marca: "Toyota", modelo: "Corolla", patente: "ABC456", tipoVehiculo: "Camioneta/SUV", tipoLavado: "Lavado y encerado" },
        { marca: "Chevrolet", modelo: "Cruze", patente: "XYZ789", tipoVehiculo: "Auto", tipoLavado: "Solo lavado" },
        { marca: "Volvo", modelo: "FH16", patente: "DEF789", tipoVehiculo: "Pesado", tipoLavado: "Limpieza de interior" },
        { marca: "Honda", modelo: "CBR600RR", patente: "GHI987", tipoVehiculo: "Moto", tipoLavado: "Solo lavado" },
        { marca: "Mercedes-Benz", modelo: "Actros", patente: "LMN654", tipoVehiculo: "Pesado", tipoLavado: "Lavado completo" }
    ];
} 

function mostrarMenu() {
    console.log("---------------------------------");
    console.log("|          Menú de opciones");
    console.log("---------------------------------");
    console.log("|           1- Ingresar vehiculo");
    console.log("|           2- Retirar vehiculo ");
    console.log("|           3- Listar vehiculo ");
    console.log("|           4- Salir ");
    console.log("---------------------------------");
}

function lavaderoAutos() {
    let continuar = true;
    do {
        mostrarMenu();
        let seleccion = parseInt(prompt("Ingrese una opción del menú:"));
        switch (seleccion) {
            case 1: 
                ingresarAuto();
                break;
            case 2: 
                retirarAuto(); 
                break;
            case 3: 
                listarAutos(); 
                break;
            case 4: 
                console.log("¡Adiós!"); 
                continuar = false;
                break;
            default: 
                console.log("¡Opción inválida!"); 
                break;
        }
    } while (continuar);
}
function ingresarAuto() {

    let auto = {};

    console.log("----------------1-----------------");
    console.log("|       Ingresando auto        |");
    console.log("---------------------------------");

    
    auto.marca = prompt("Marca:");
    auto.modelo = prompt("Modelo:");
    auto.patente = prompt("Patente:");
    auto.tipoVehiculo = obtenerTipoVehiculo();
    auto.tipoLavado = obtenerTipoLavado();
    autos.push(auto);

    console.log("---------------------------------");
    console.log("|       Auto ingresado:       |");
    console.log("---------------------------------");
    console.log(auto);

}


function obtenerTipoVehiculo() {
    let opcion;

    console.log("---------------------------------");
    console.log("|    Seleccione tipo de vehiculo     |");
    console.log("---------------------------------");

    console.log("| 1- Auto");
    console.log("| 2- Camioneta/SUV");
    console.log("| 3- Moto");
    console.log("| 4- Vehículo pesado");
    console.log("---------------------------------");

    opcion = parseInt(prompt("Número de opción:"));

    switch (opcion) {
        case 1: return "Auto";
        case 2: return "Camioneta/SUV";
        case 3: return "Moto";
        case 4: return "Vehículo pesado";
        default:
            console.log("DAAALEEE!");
            return obtenerTipoVehiculo();
    }
}

function obtenerTipoLavado() {

    console.log("---------------------------------");
    console.log("|     Seleccione tipo de lavado     |");
    console.log("---------------------------------");
    
    console.log("| 1- Lavado completo");
    console.log("| 2- Solo lavado");
    console.log("| 3- Lavado y encerado");
    console.log("| 4- Limpieza de interior");
    console.log("---------------------------------");

    let opcion = parseInt(prompt("Número de opción:"));
    switch (opcion) {
        case 1: return "Lavado completo";
        case 2: return "Solo lavado";
        case 3: return "Lavado y encerado";
        case 4: return "Limpieza de interior";
        default:
            console.log("Es cómico tocar la opcion que no va, no?? >:(");
            return obtenerTipoLavado(); 
    }
}

function retirarAuto() {
    if (autos.length === 0) {
        console.log("---------------------------------");
        console.log("|No hay más vehiculos para retirar|");
        console.log("---------------------------------");
        return;
    }

    console.log("---------------2------------------");
    console.log("|        Retirar vehículo        |");
    console.log("---------------------------------");

    console.log("Autos disponibles para retirar:");

    autos.forEach((auto, index) => {
        console.log(`Vehículo ${index + 1}:`);
        console.log(auto);
        console.log("-----------------------------");
    });

    let seleccion = parseInt(prompt("Ingrese el número del vehiculoque desea retirar:"));

    if (seleccion >= 1 && seleccion <= autos.length) {  // Nos aseguramos que no se pase, y vuele por los aires

        let autoSeleccionado = autos[seleccion - 1]; // diferencia de array entre el orden cero y el auto uno
        console.log("---------------------------------");
        console.log("|       Confirmar retiro        |");
        console.log("---------------------------------");
        console.log("¿Desea retirar el siguiente vehiculo?");
        console.log(`         Marca: ${autoSeleccionado.marca}`);
        console.log(`         Modelo: ${autoSeleccionado.modelo}`);
        console.log(`         Patente: ${autoSeleccionado.patente}`);
        console.log(`         Tipo de auto: ${autoSeleccionado.tipoVehiculo}`);

        let confirmacion = confirm("¿Está seguro de que desea retirar este vehículo?");

        if (confirmacion) { // para asegurarme que no diferencia entre min y may, mando todo a minuscula
            autos.splice(seleccion - 1, 1);
            alert(`El auto entregado es: Marca: ${autoSeleccionado.marca}, Modelo: ${autoSeleccionado.modelo}, Patente: ${autoSeleccionado.patente}, Tipo de auto: ${autoSeleccionado.tipoVehiculo}`);
            console.log("¡Excelente! Muchas gracias por su visita!");
        } 

    } else {
        console.log("Número de auto inválido.");
    }
}


function listarAutos() {
    if (autos.length === 0) {
        console.log("----------------3-----------------");
        console.log("|   Lavadero vacío, cerra el agua.   |");
        console.log("---------------------------------");
    } else {
        console.log("---------------------------------");
        console.log("|      Listado de autos      |");
        console.log("---------------------------------");
        autos.forEach((auto, index) => {
            console.log(`Auto ${index + 1}:`);
            console.log(auto);
           // console.log(`Marca: ${auto.marca} , Modelo: ${auto.modelo} , Patente: ${auto.patente} , Tipo de auto: ${auto.tipoVehiculo} , Tipo de lavado: ${auto.tipoLavado}`);
            console.log("-----------------------------");
        });
    }
}



lavaderoAutos();