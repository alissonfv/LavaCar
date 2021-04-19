const router = require('express').Router();
const { check, body, validationResult } = require('express-validator');

router.post('/', [
    check('nome', 'Nome Completo é um campo obrigatório.').trim().escape().notEmpty(),
    check('telefone', ' O total de digitos deve ser igual a 11').trim().escape().optional().isInt({min: 10000000000, max:99999999999}).toInt(),
    check('whats', 'Este é o número do seu WhatsApp.').trim().escape().optional().toBoolean().custom(value => value)],
    check('marca').trim().escape(),
    check('modelo').trim().escape(),
    check('ano').trim().escape().toInt,
    check('comentarios').trim().escape(),
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