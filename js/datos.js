window.onload=funcionPrincipal();

function funcionPrincipal() {
    mostrarFecha();
}

function mostrarFecha() {
    var fechaActual = document.getElementById('fecha_actual');
    const fecha = new Date();
    var meses = new Array ('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');
    var mes = fecha.getMonth();
    var anio = fecha.getFullYear();
    //Mostrando Fecha
    fechaActual.innerHTML= meses[mes] + " " + anio;
}