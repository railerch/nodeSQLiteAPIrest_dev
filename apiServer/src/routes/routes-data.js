const express = require("express");
const router = express.Router();
const ctrlData = require("../controllers/ctrl-data");

router.get("/", ctrlData.pagina_inicio);
router.get("/usuarios", ctrlData.usuarios);
router.get("/empresas", ctrlData.empresas);
router.post("/crear-registro", ctrlData.crear_registro);

module.exports = router;
