class Estudiante {
    constructor(identificacion, nombre, fechaNacimiento, correo, telefono) {
        this.identificacion = identificacion
        this.nombre = nombre
        this.fechaNacimiento = fechaNacimiento;
        this.correo = correo
        this.telefono = telefono
    }
}

var nombreLocalStore = "estudiantes"

function recuperarDatosFormulario() {
    var identificacion = document.getElementById("identificacion").value
    var nombre = document.getElementById("nombre").value;
    var fechaNacimiento = document.getElementById("fechaNacimiento").value
    var correo = document.getElementById("correo").value
    var telefono = document.getElementById("telefono").value

    return { identificacion, nombre, fechaNacimiento, correo, telefono }
}

function limpiarFormulario() {
    document.getElementById("identificacion").value = ''
    document.getElementById("nombre").value = ''
    document.getElementById("fechaNacimiento").value = ''
    document.getElementById("correo").value = ''
    document.getElementById("telefono").value = ''
    document.getElementById("identificacion").focus()
}

function guardar() {
    var datos = recuperarDatosFormulario()

    var estudiante = new Estudiante(datos.identificacion, datos.nombre, datos.fechaNacimiento, datos.correo, datos.telefono)

    var estudiantes = getJSONDeLocalStore(nombreLocalStore)
    estudiantes.push(estudiante);
    setJSONDeLocalStore(nombreLocalStore, estudiantes)

    limpiarFormulario()
    alert("Estudiante ha sido guardado correctamente")
}

function consultar() {
    var datos = recuperarDatosFormulario()
    var estudiantes = getJSONDeLocalStore(nombreLocalStore)

    var indiceEstudiante = buscarIndiceEstudiante(estudiantes, datos.identificacion)

    if (indiceEstudiante > -1) {
        document.getElementById("nombre").value = estudiantes[indiceEstudiante].nombre
        document.getElementById("fechaNacimiento").value = estudiantes[indiceEstudiante].fechaNacimiento
        document.getElementById("correo").value = estudiantes[indiceEstudiante].correo
        document.getElementById("telefono").value = estudiantes[indiceEstudiante].telefono
    } else {
        alert("Estudiante no encontrado")
    }
}

function actualizar() {
    var datos = recuperarDatosFormulario()
    var estudiantes = getJSONDeLocalStore(nombreLocalStore)

    var indiceEstudiante = buscarIndiceEstudiante(estudiantes, datos.identificacion)

    if (indiceEstudiante > -1) {
        estudiantes[indiceEstudiante].nombre = datos.nombre
        estudiantes[indiceEstudiante].fechaNacimiento = datos.fechaNacimiento
        estudiantes[indiceEstudiante].correo = datos.correo
        estudiantes[indiceEstudiante].telefono = datos.telefono

        setJSONDeLocalStore(nombreLocalStore, estudiantes)

        limpiarFormulario()
        alert("Estudiante ha sido actualizado correctamente")
    } else {
        alert("Estudiante no encontrado")
    }
}

function eliminar() {
    var datos = recuperarDatosFormulario()
    var estudiantes = getJSONDeLocalStore(nombreLocalStore)

    var indiceEstudiante = buscarIndiceEstudiante(estudiantes, datos.identificacion)

    if (indiceEstudiante > -1) {
        alert("Estudiante " + estudiantes[indiceEstudiante].identificacion + " eliminado")

        estudiantes.splice(indiceEstudiante, 1)
        setJSONDeLocalStore(nombreLocalStore, estudiantes)
    } else {
        alert("Estudiante no encontrado")
    }

    limpiarFormulario()
}

function buscarIndiceEstudiante(estudiantes, identificacion) {
    for (let i = 0; i < estudiantes.length; i++) {
        if (estudiantes[i].identificacion === identificacion) {
            return i
        }
    }
    return -1
}

function nuevo() {
    limpiarFormulario()
}
