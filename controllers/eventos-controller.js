const Evento = require("../models/Eventos");

//obtener eventos

const getEventos = async (req, res) => {
  const eventos = await Evento.find().populate("user"); // todos los eventos mas la informacion del usuario

  res.json({
    ok: true,
    eventos,
  });
};

//crear eventos

const crearEvento = async (req, res) => {
  //verificar que en la req venga el evento
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;

    const eventoSave = await evento.save();
    res.json({
      ok: true,
      msg: "evento creado",
      evento: eventoSave,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

//actualizar evento
const actualizarEvento = async (req, res) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "evento no existe",
      });
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tienes el permiso para modificar",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };
    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );

    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

//eliminar evento
const eliminarEvento = async (req, res) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "evento no existe",
      });
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tienes el permiso para modificar",
      });
    }

    const borrarEvento = await Evento.findByIdAndRemove(eventoId);

    res.json({
      ok: true,
      msg: "evento eliminado",
      evento: borrarEvento,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
