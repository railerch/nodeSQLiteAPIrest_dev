console.log("APP.JS ok");
// ACTUALIZAR CONFIGURACION DE CONEXION AL SERVIDOR
let configBtn = document.getElementById("config-btn");
let configFrm = document.getElementById("config-frm");

configBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let datos = new URLSearchParams(new FormData(configFrm)).toString()
    fetch(`http://localhost/actualizar-conexion/${datos}`)
        .then(res => res.json())
        .then(res => {
            if (res.status) {
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        })
})