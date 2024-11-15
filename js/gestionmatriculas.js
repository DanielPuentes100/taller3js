class Matricula {
    constructor(idMatricula, idEstudiante, codigoPrograma, fechaMatricula, estadoMatricula) {
        this.idMatricula = idMatricula
        this.idEstudiante = idEstudiante
        this.codigoPrograma = codigoPrograma
        this.fechaMatricula = fechaMatricula
        this.estadoMatricula = estadoMatricula
    }
}

var nombreLocalStore = "matriculas"

function recuperarDatosFormulario() {
    var idMatricula = document.getElementById("idMatricula").value
    var idEstudiante = document.getElementById("idEstudiante").value
    var codigoPrograma = document.getElementById("codigoPrograma").value
    var fechaMatricula = document.getElementById("fechaMatricula").value
    var estadoMatricula = document.getElementById("estadoMatricula").value

    return { idMatricula, idEstudiante, codigoPrograma, fechaMatricula, estadoMatricula }
}

function limpiarFormulario() {
    document.getElementById("idMatricula").value = ''
    document.getElementById("idEstudiante").value = ''
    document.getElementById("codigoPrograma").value = ''
    document.getElementById("fechaMatricula").value = ''
    document.getElementById("estadoMatricula").value = 'activa'
    document.getElementById("idMatricula").focus()
}

function guardar() {
    var datos = recuperarDatosFormulario()

    var matricula = new Matricula(datos.idMatricula, datos.idEstudiante, datos.codigoPrograma, datos.fechaMatricula, datos.estadoMatricula)

    var matriculas = getJSONDeLocalStore(nombreLocalStore)
    matriculas.push(matricula)
    setJSONDeLocalStore(nombreLocalStore, matriculas)

    limpiarFormulario()
    alert("Matrícula ha sido guardada correctamente")
}

function consultar() {
    var datos = recuperarDatosFormulario()
    var matriculas = getJSONDeLocalStore(nombreLocalStore)

    var indiceMatricula = buscarIndiceMatricula(matriculas, datos.idMatricula)

    if (indiceMatricula > -1) {
        document.getElementById("idEstudiante").value = matriculas[indiceMatricula].idEstudiante
        document.getElementById("codigoPrograma").value = matriculas[indiceMatricula].codigoPrograma
        document.getElementById("fechaMatricula").value = matriculas[indiceMatricula].fechaMatricula
        document.getElementById("estadoMatricula").value = matriculas[indiceMatricula].estadoMatricula
    } else {
        alert("Matrícula no encontrada")
    }
}

function actualizar() {
    var datos = recuperarDatosFormulario()
    var matriculas = getJSONDeLocalStore(nombreLocalStore)

    var indiceMatricula = buscarIndiceMatricula(matriculas, datos.idMatricula)

    if (indiceMatricula > -1) {
        matriculas[indiceMatricula].idEstudiante = datos.idEstudiante
        matriculas[indiceMatricula].codigoPrograma = datos.codigoPrograma
        matriculas[indiceMatricula].fechaMatricula = datos.fechaMatricula
        matriculas[indiceMatricula].estadoMatricula = datos.estadoMatricula

        setJSONDeLocalStore(nombreLocalStore, matriculas)

        limpiarFormulario()
        alert("Matrícula ha sido actualizada correctamente")
    } else {
        alert("Matrícula no encontrada")
    }
}

function eliminar() {
    var datos = recuperarDatosFormulario()
    var matriculas = getJSONDeLocalStore(nombreLocalStore)

    var indiceMatricula = buscarIndiceMatricula(matriculas, datos.idMatricula)

    if (indiceMatricula > -1) {
        alert("Matrícula " + matriculas[indiceMatricula].idMatricula + " eliminada")

        matriculas.splice(indiceMatricula, 1)
        setJSONDeLocalStore(nombreLocalStore, matriculas)
    } else {
        alert("Matrícula no encontrada")
    }

    limpiarFormulario()
}

function buscarIndiceMatricula(matriculas, idMatricula) {
    for (let i = 0; i < matriculas.length; i++) {
        if (matriculas[i].idMatricula === idMatricula) {
            return i
        }
    }
    return -1
}

function nuevo() {
    limpiarFormulario()
}
