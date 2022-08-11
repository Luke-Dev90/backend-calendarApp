
const { response ,request } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {
    const eventos = await Evento.find()
        .populate('user','name');

    return res.status(200).json({
        ok: true,
        msg: 'obtener eventos',
        eventos
    });
}

const crearEvento = async (req, res = response) => {
    
    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.status(201).json({
            ok: true,
            evento: eventoGuardado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const actualizarEvento =  async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;
 
    try {
        
        const evento = await Evento.findById(eventoId);

        if(!evento){
            return res.status(404).json({
                ok:false,
                msg: 'Evento no encontrado'
            })
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const nuevoEvento = {
            ... req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento , { new: true} );

        res.status(201).json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        })
    }
    

}

const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        

        const evento = await Evento.findById(eventoId);

        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
            })
        };

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene los permisos para eliminar este evento'
            })
        }

        await Evento.findByIdAndDelete(eventoId);

        return res.json({
            ok: true,
            msg: 'El evento fue eliminado exitosamente'
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}