class Programa {
    constructor(codigo, nombre, duracion, modalidad, fechaInicio) {
        this.codigo = codigo
        this.nombre = nombre
        this.duracion = duracion
        this.modalidad = modalidad
        this.fechaInicio = fechaInicio
    }
}

var nombreLocalStore = "programas"

function recuperarDatosFormulario() {
    var codigo = document.getElementById("codigo").value
    var nombre = document.getElementById("nombre").value
    var duracion = document.getElementById("duracion").value
    var modalidad = document.getElementById("modalidad").value
    var fechaInicio = document.getElementById("fechaInicio").value

    return { codigo, nombre, duracion, modalidad, fechaInicio }
}

function limpiarFormulario() {
    document.getElementById("codigo").value = ''
    document.getElementById("nombre").value = ''
    document.getElementById("duracion").value = ''
    document.getElementById("modalidad").value = ''
    document.getElementById("fechaInicio").value = ''
    document.getElementById("codigo").focus()
}

function guardar() {
    var datos = recuperarDatosFormulario()

    var programa = new Programa(datos.codigo, datos.nombre, datos.duracion, datos.modalidad, datos.fechaInicio)

    var programas = getJSONDeLocalStore(nombreLocalStore)
    programas.push(programa)
    setJSONDeLocalStore(nombreLocalStore, programas)

    limpiarFormulario()
    alert("Programa académico ha sido guardado correctamente")
}

function consultar() {
    var datos = recuperarDatosFormulario()
    var programas = getJSONDeLocalStore(nombreLocalStore)

    var indicePrograma = buscarIndicePrograma(programas, datos.codigo)

    if (indicePrograma > -1) {
        document.getElementById("nombre").value = programas[indicePrograma].nombre
        document.getElementById("duracion").value = programas[indicePrograma].duracion
        document.getElementById("modalidad").value = programas[indicePrograma].modalidad
        document.getElementById("fechaInicio").value = programas[indicePrograma].fechaInicio
    } else {
        alert("Programa no encontrado")
    }
}

function actualizar() {
    var datos = recuperarDatosFormulario()
    var programas = getJSONDeLocalStore(nombreLocalStore)

    var indicePrograma = buscarIndicePrograma(programas, datos.codigo)

    if (indicePrograma > -1) {
        programas[indicePrograma].nombre = datos.nombre
        programas[indicePrograma].duracion = datos.duracion
        programas[indicePrograma].modalidad = datos.modalidad
        programas[indicePrograma].fechaInicio = datos.fechaInicio

        setJSONDeLocalStore(nombreLocalStore, programas)

        limpiarFormulario()
        alert("Programa académico ha sido actualizado correctamente")
    } else {
        alert("Programa no encontrado")
    }
}

function eliminar() {
    var datos = recuperarDatosFormulario()
    var programas = getJSONDeLocalStore(nombreLocalStore)

    var indicePrograma = buscarIndicePrograma(programas, datos.codigo)

    if (indicePrograma > -1) {
        alert("Programa " + programas[indicePrograma].codigo + " eliminado")

        programas.splice(indicePrograma, 1)
        setJSONDeLocalStore(nombreLocalStore, programas)
    } else {
        alert("Programa no encontrado")
    }

    limpiarFormulario()
}

function buscarIndicePrograma(programas, codigo) {
    for (let i = 0; i < programas.length; i++) {
        if (programas[i].codigo === codigo) {
            return i
        }
    }
    return -1
}

function nuevo() {
    limpiarFormulario()
}
