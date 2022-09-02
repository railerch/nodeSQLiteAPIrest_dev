/**
 * Funcion integral que genera una tabla de forma automatica con los registros recibidos desde el servidor y que a su vez genera
 * un formulario con los campos necesarios para ingresar nuevos datos. 
 * 
 * @param {array} res - Los datos con los registros 
 * @param {string} contenedorID - El div que mostrara la tabla con los registros
 * @param {string} servidor - El servidor con la API 
 * @param {string} tablaDB - La tabla en la DB a la cual se realizo la consulta de datoss
 */

export function respuesta_a_tabla(res, contenedorID, servidor, tablaDB) {
    // ==================================================== CREAR TABLA DE REGISTROS
    // Encabezado de la consulta
    let encabezadoConsulta = document.createElement("h3");
    encabezadoConsulta.innerText = tablaDB.toUpperCase();
    encabezadoConsulta.style.marginBottom = 0;

    // Parsear Datos
    let datos = res;

    // Elementos de tabla
    let respuesta = document.getElementById(contenedorID);
    let tabla = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let keys = Object.keys(datos[0]);

    // Crear cabecera
    let trHead = document.createElement("tr");
    keys.forEach(nombre => {
        let th = document.createElement("th");
        th.innerText = nombre;
        trHead.appendChild(th);
    })
    thead.appendChild(trHead);

    // Crear renglones
    datos.forEach(registro => {
        // Cargar renglones
        let trReng = document.createElement("tr");
        for (let reg in registro) {
            let td = document.createElement("td");
            td.innerText = registro[reg];
            trReng.appendChild(td);
        }
        tbody.appendChild(trReng);
    })

    // Construir tabla
    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    respuesta.appendChild(encabezadoConsulta);
    respuesta.appendChild(tabla);

    // Scroll hasta la ultima consulta
    respuesta.scrollTop = respuesta.scrollHeight;

    // ==================================================== CREAR FORMNULARIO PARA NUEVOS REGISTROS
    // Encabezado para el formulario
    let encabezado = document.createElement("h2");
    encabezado.innerText = "Nuevo registro:";

    // Contenedor del formulario
    let formularioDiv = document.getElementById("formulario");
    formularioDiv.innerHTML = "";
    formularioDiv.appendChild(encabezado);

    // Formulario
    let formulario = document.createElement("form");
    formulario.setAttribute("id", "registro");

    // Boton de registro
    let registrarBtn = document.createElement("input");
    registrarBtn.setAttribute("id", "registrar-btn");
    registrarBtn.setAttribute("type", "submit");
    registrarBtn.setAttribute("class", "btn");
    registrarBtn.setAttribute("value", "Crear registro");

    // Campo oculto con nombre de tabla
    let nombreTabla = document.createElement("input");
    nombreTabla.setAttribute("type", "hidden");
    nombreTabla.setAttribute("name", "tabla");
    nombreTabla.setAttribute("value", tablaDB);

    // Campos de entrada de datos
    keys.forEach(col => {
        if (col != "id") {
            let input = document.createElement("input");
            input.setAttribute("class", "entrada");
            input.setAttribute("type", "text");
            input.setAttribute("name", col);
            input.setAttribute("placeholder", col.toUpperCase());
            formulario.appendChild(input);
        }
    })

    // Cargar formulario
    formulario.appendChild(nombreTabla);
    formulario.appendChild(registrarBtn);
    formularioDiv.appendChild(formulario);

    // ==================================================== HABILITAR REGISTRO
    let regBtn = document.getElementById("registrar-btn");
    let frm = document.getElementById("registro");

    regBtn.addEventListener("click", function (e) {
        e.preventDefault();
        let registro = new URLSearchParams(new FormData(frm)).toString();
        fetch(`http://${servidor}/crear-registro`, {
            method: "post", headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: registro
        })
            .then(res => res.json())
            .then(res => {
                if (res.status) {
                    // Nombre de la tabla consultada
                    let nombreTbl = document.querySelector("input[name=tabla]").value;

                    // Cargar nuevo renglon
                    let tablaActual = document.querySelector("#respuesta table tbody");
                    let trReng = document.createElement("tr");

                    // Id temporal para el renglon
                    let tmpId = document.createElement("td");
                    tmpId.innerText = "tmp";
                    trReng.appendChild(tmpId);

                    for (let val in res.registro) {
                        // Validar que no se agregue la tabla el nombre de la misma
                        if (res.registro[val] != nombreTbl) {
                            let td = document.createElement("td");
                            td.innerText = res.registro[val];
                            trReng.appendChild(td);
                        }
                    }
                    tablaActual.appendChild(trReng);

                    // reiniciar formulario de registro
                    formulario.reset();
                }
            });
    });
}

