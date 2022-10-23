window.onload = funcionPrincipal();

//localStorage.setItem('Pedro',500);
//localStorage.setItem(key,data);
//localStorage.removeItem('Transacciones');

//declaracion de variables
var tipo;
var monto;
var descripcion;
//se guarda la transaccion
var transaccion = [];
//obtiene el historial
var transacciones;

var saldo, ingresos, egresos;
var pocentaje;


function funcionPrincipal() {
    //invocacion a funciones
    console.log(localStorage.getItem('Transacciones'));
    mostrarFecha();
    addIngresos();
    addEgresos();
    //localStorage.removeItem('Transacciones');
    //console.log(egresos);
}

function mostrarFecha() {
    var fechaActual = document.getElementById('fecha_actual');
    const fecha = new Date();
    var meses = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
    var mes = fecha.getMonth();
    var anio = fecha.getFullYear();
    //Mostrando Fecha
    fechaActual.innerHTML = meses[mes] + " " + anio;
}

function selecTransac(value) {
    tipo = value;
    return tipo;
}

function ingresarDescripcion() {
    descripcion = document.getElementById('descripcion').value;
    if (descripcion == '' || descripcion == null) {
        alert('Es necesario ingresar una descripcion..');
    } else {
        ingresarMonto();
        //console.log(descripcion);
        return descripcion;
    }
}

function ingresarMonto() {
    monto = document.getElementById('monto').value;
    if (monto == 0 || monto == null) {
        alert('No ha ingresado ningun monto...');
        return false;
    } else if (monto < 0) {
        alert('El monto ingresado no puede ser negativo...');
    } else {
        monto = financial(monto);
        //console.log('Monto ingresado'+ monto);
        return monto;
    }
}

function agregarTransaccion() {
    if (tipo == 0 || tipo == null) {
        alert('El tipo no puede ser nulo...');
    }
    //agregando ingreso 
    else if(tipo == 1){
        ingresarDescripcion();
        if (monto > 0 && descripcion != '') {
            //se crea el registro
            transaccion.push({ tipo: tipo, monto: monto, descripcion: descripcion });
            //se guarda
            guardarTransaccion(transaccion);
            //se calcula y muestra el ingreso
            addIngresos();
            console.log(transaccion);
            console.log('Ingreso agregado: ' + ingresos);
            limpiarInputs();
            return transaccion;
        }
    //agregando egreso
    }else if(tipo == 2){
        ingresarDescripcion();  
        //console.log('intenta agregar un egreso de: '+monto);
        if(monto > 0 && monto<=saldo){
             //se crea el registro
             transaccion.push({ tipo: tipo, monto: monto, descripcion: descripcion });
             //se guarda
             guardarTransaccion(transaccion);
             //se calcula y muestra el ingreso
            addEgresos();
            console.log(transaccion);
            console.log('Egreso agregado: ' +monto);
            limpiarInputs();
            return transaccion;
        }else{
            alert('intenta agregar un egreso negativo o mayor al saldo disponible.');
            return false;
        }
        
    }
}
//Se guarda la transaccion
function guardarTransaccion(transaccion) {
    if (transaccion.length == 0) {
        console.log('Error al guardar registro');
    } else {
        localStorage.setItem('Transacciones', JSON.stringify(transaccion));
    }
}

//funcionalidades
function limpiarInputs() {
    tipo = 0;
    descripcion = '';
    monto = null;
    document.getElementById('options').value = tipo;
    document.getElementById('descripcion').value = descripcion;
    document.getElementById('monto').value = monto;
}

function financial(x) {
    return Number.parseFloat(x).toFixed(2);
}

//Calculo de los ingresos
function addIngresos() {
    transacciones = JSON.parse(localStorage.getItem('Transacciones'));
    //console.log(transacciones);
    let montos = [];
    if (transacciones == null) {
        console.log('No hay ingresos en el historial...');
    } else {
        for (let i = 0; i < transacciones.length; i++) {
            if (transacciones[i].tipo == 1 && transacciones[i].monto != null) {
                let montoIngresos = parseInt(transacciones[i].monto);
                montos.push(montoIngresos);
                //return numeros;
            }
            //console.log(saldo);
        }
        ingresos = 0;
        for (let i = 0; i < montos.length; i++) {
            ingresos += montos[i];
        }
        ingresos = financial(ingresos);
        getSaldo(ingresos);
        //console.log(numeros);
        //console.log(ingresos);
        var total = document.getElementById('ingresos');
        total.innerHTML = "+ " + ingresos;
        return ingresos;
    }
}

//Calculo de los egresos
function addEgresos() {
    transacciones = JSON.parse(localStorage.getItem('Transacciones'));
    //console.log(transacciones);
    let montos = [];
    if (transacciones == null) {
        console.log('No hay egresos en el historial...');
    } else {
        for (let i = 0; i < transacciones.length; i++) {
            if (transacciones[i].tipo == 2 && transacciones[i].monto != null) {
                let montoEgresos = parseInt(transacciones[i].monto);
                montos.push(montoEgresos);
                console.log(montos);     
            }
        }
        egresos = 0;
        for (let i = 0; i < montos.length; i++) {
            egresos += montos[i];
        }
        egresos = financial(egresos);
        getSaldo(egresos);
        //console.log(egresos);
        var total = document.getElementById('egresos');
        total.innerHTML = "- " + egresos;
        return egresos;
    }
    //alert('usted cuenta con: '+saldo);
}

function getSaldo() {
    saldo = ingresos;
    if(egresos!=null){
       saldo = saldo-egresos;
        //console.log(egresos);
    }
    saldo = financial(saldo);
    var total = document.getElementById('saldo');
    total.innerHTML = "+ " + saldo;
    return saldo;
}

function limpiarRegistros(){
    localStorage.removeItem('Transacciones');
    transaccion = localStorage.removeItem('Transacciones');
    return transaccion;
}
