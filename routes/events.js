/* 
    Events Routes
    /api/events
*/

// Todas tienen que pasar por la validación del JWT
// Obtener eventos:


const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events')
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validad-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use(validarJWT);

router.get('/', getEventos);

// Crear nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],

    crearEvento);

// actualizar evento
router.put('/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ], actualizarEvento);

// Delete  evento
router.delete('/:id', eliminarEvento);


module.exports = router;