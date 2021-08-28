
const Usuario = require("../models/Users");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { generarJWT } = require("./helpers/jwt");


const crearUsuario = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe",
      });
    }

    usuario = new Usuario(req.body);
    // encriptado de password
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    //grabado en SB
    await usuario.save();
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      msg: "usuario creado con exito",
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor comunicarse con el administrador",
    });
  }
};

const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe",
      });
    }

    //confirmar contraseña

    const validarPass = bcrypt.compareSync(password, usuario.password);

    if (!validarPass) {
      res.status(400).json({
        ok: false,
        msg: "El password es incorrecto",
      });
    }

    //jwt

    const token = await generarJWT(usuario.id, usuario.name);

    //usuario autenticado
    res.status(200).json({
      ok: true,
      uid: usuario.id,
      msg: `bienvenido ${usuario.name}`,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor comunicarse con el administrador",
    });
  }
};

const revalidarToken = async (req, res) => {
 
  uid= req.uid;
  names= req.name;

  const token = await generarJWT(uid, names);


  res.json({
    ok: true,    
    token

  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
