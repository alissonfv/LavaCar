const router = require('express').Router();
const { check, body, validationResult } = require('express-validator');
const diaUtil = require('@lfreneda/eh-dia-util');

router.post('/', [
    check('nome', 'Nome Completo é um campo obrigatório.').trim().escape().isLength({min:5}),
    check('telefone').trim().escape().isLength({min: 11, max:16}).optional(),
    check('whats',).trim().escape().optional().toBoolean(),
    check('marca').trim().escape(),
    check('modelo').trim().escape(),
    check('anoCarro').trim().escape().toInt(),
    check('placa', 'A placa do veiculo é um campo obrigatório').trim().escape().notEmpty(),
    check('data', 'Data é campo obrigatório.').trim().escape().notEmpty().custom((reqData) => {
        const data = new Date(reqData);
        if(diaUtil(data)) {
            return true;       
        }
        return false;
    }).withMessage("Data Não é valida."),
    check('hora', 'Esta hora não é valido').trim().escape().notEmpty(),
    //check('dia', 'Este dia não é valido').trim().escape().toInt().isInt({max:31}),
   // check('mes', 'Este mes não é valido').trim().escape().toInt().isInt({max:12}),
    //check('ano').trim().escape().toInt().isInt({min:2021}),
    check('comentarios').trim().escape().optional()],
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