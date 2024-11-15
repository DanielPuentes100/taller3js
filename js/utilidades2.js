function getJSONDeLocalStore(clave) {
    return JSON.parse(localStorage.getItem(clave)) || []
}

function setJSONDeLocalStore(clave, datos) {
    localStorage.setItem(clave, JSON.stringify(datos))
}
