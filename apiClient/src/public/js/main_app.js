console.log("APP.JS ok");
import * as fn from "./main_fn.js";

// HTML ELEMENTS
let formularioDiv = document.getElementById("formulario");
let consultarBtn = document.getElementById("consultar-btn");
let limpiarBtn = document.getElementById("limpiar-btn");
let filtro = document.getElementById("filtro");
let srv = document.getElementById("srv");
let cmd = document.getElementById("cmd");
let resDiv = document.getElementById("respuesta");

// CONSULTAR URL
consultarBtn.addEventListener("click", function () {
    let url = `http://${srv.value}/${cmd.value}`;
    if (srv.value != "" && cmd.value != "") {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                fn.respuesta_a_tabla(res, "respuesta", `${srv.value}`, `${cmd.value}`);
            });
    } else {
        resDiv.innerHTML = "<h3 style='color:red'><i class='icon-cancel' style='font-size:1.5em'></i> Debe especificar una URL valida.</h3>"
        setTimeout(function () {
            resDiv.innerText = "";
        }, 2000)
    }

})

// LIMPIAR CONSULTA
limpiarBtn.addEventListener("click", function () {
    console.log("OK");
    resDiv.innerHTML = "";
    filtro.value = "";
    formularioDiv.innerHTML = "";
})

// FILTRO DE TABLA
filtro.addEventListener("keyup", function () {
    let consulta = this.value.toLowerCase();
    let renglones = document.querySelectorAll("table tbody tr");
    renglones.forEach(reng => {
        let row = reng.innerText.toLowerCase();
        if (!row.match(consulta)) {
            reng.style.display = "none";
        } else {
            reng.style.display = "table-row";
        }
    })
})
