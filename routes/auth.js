//host + /api/auth

const { Router } = require("express");
const router = Router();
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { check } = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

//rutas

//crear nuevo usuario
router.post("/new",
[ //middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El Email es incorrecto').isEmail(),
    check('password', 'El password debe de ser de 6 caracters').isLength({ min: 6 }),
    validarCampos,
], 
crearUsuario);


//logguear
router.post("/",
[
check('email', 'El Email es incorrecto').isEmail(),
check('password', 'El password debe de ser de 6 caracters').isLength({ min: 6 }),
validarCampos,
],

loginUsuario);

router.get("/renew", validarJWT ,revalidarToken);

module.exports = router;
