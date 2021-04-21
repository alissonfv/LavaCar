const router = require('express').Router();
const { check, body, validationResult } = require('express-validator');

router.post('/', [
    check('nome', 'Nome Completo é um campo obrigatório.').trim().escape().notEmpty().isLength({min:5}),
    check('telefone', ' O total de digitos deve ser igual a 11').trim().escape().isString().optional().isLength({min: 10, max:20}),
    check('whats',).trim().escape().optional().toBoolean(),
    check('marca').trim().escape(),
    check('modelo').trim().escape(),
    check('anoCarro').trim().escape().toInt(),
    check('placa').trim().escape(),
    check('dataAgendamento').trim().escape(),
    check('dia', 'Este dia não é valido').trim().escape().toInt().isInt({max:31}),
    check('mes', 'Este mes não é valido').trim().escape().toInt().isInt({max:12}),
    check('ano').trim().escape().toInt().isInt({min:2021}),
    check('comentarios').trim().escape()],
    (req, res) => {
        const erros = validationResult(req);
        const usuario = req.body;
        const contexto = {
            usuario: usuario,
            erros: erros.array()
        };

        if (!erros.isEmpty()) {
            return res.status(422).json(contexto);
        } else {
            return res.json(contexto);
        }
    });

module.exports = router;