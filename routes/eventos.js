const { Router } = require("express");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/eventos-controller");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { idDate } = require("../controllers/helpers/custon-validator");

//obtener eventos
router.get(
  "/",

  validarJWT,
  getEventos
);

//crear nuevo evento

router.post(
  "/",
  [
    check("title", "Titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(idDate),
    check("end", "Fecha de finalizacion es obligatoria").custom(idDate)
    


  ],
  
  
  
  validarCampos,
  validarJWT,
  crearEvento
);

router.put("/:id", validarJWT, actualizarEvento);
router.delete("/:id", validarJWT, eliminarEvento);

module.exports = router;
