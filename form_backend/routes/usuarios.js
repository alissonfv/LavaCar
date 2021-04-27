const router = require('express').Router();
const { check, body, validationResult } = require('express-validator');

router.post('/', [
    check('nome', 'Nome Completo é um campo obrigatório.').trim().escape().notEmpty().isLength({ min: 5 }).withMessage('Deve ser o nome Completo'),
    check('telefone').trim().escape().optional(),
    check('whats',).trim().escape().optional().toBoolean().custom(value => value),
    check('marca').trim().escape().optional(),
    check('modelo').trim().escape().optional(),
    check('anoCarro').trim().escape(),
    check('placa', 'A placa do veiculo é um campo obrigatório').trim().escape().notEmpty().isLength({min: 7, max: 7}).withMessage('A placa deve possuir 7 caracteres'),
    check('data', 'Data é campo obrigatório.').trim().escape().notEmpty().custom(value => {
        const data = new Date(value);
        const dataAtual = new Date(Date.now());

        if (data.getFullYear() == dataAtual.getFullYear()) {
            if (data.getMonth() == dataAtual.getMonth()) {
                if (data.getDate() >= dataAtual.getDate()) {
                    if (!data.getDay() == 0 || !data.getDay() == 6) {
                        return true
                    }
                }
            }
            else if (data.getMonth() > dataAtual.getMonth()) {

                if (!data.getDay() == 0 || !data.getDay() == 6) {
                    return true
                }
            }
        } else if (data.getFullYear() > dataAtual.getFullYear()) {
            if (!data.getDay() == 0 || !data.getDay() == 6) {
                return true
            }
        }
        return false
    }).withMessage("Data Não é valida."),
    check('hora', 'Hora é um campo obrigatório.').trim().escape().notEmpty().custom(value => {
        const valor = value;

        const horaMinuto = valor.split(':');

        const hora = horaMinuto[0];
        const minuto = horaMinuto[1];
        
        if (hora < 19 && hora > 7 ) {
            if(minuto == 30 || minuto ==00 ){
                return true
            }
        }
        return false
    }).withMessage("A hora digitada é inválida, só temos horarios a cada 30 minutos"),
    check('comentarios').trim().escape().optional()],
    (req, res) => {
        const erros = validationResult(req);
        const usuario = req.body;
        const form = {
            msg:"Concluido",
            usuario: usuario,
        };
        const ERRO={
            msg:"Encontramos os seguintes erros: ",
            erros: erros.array()

        }

        if (!erros.isEmpty()) {
            console.log(erros)
            return res.status(422).json(ERRO);

        } else {
            console.log(form)
            return res.json(form);
        }
    });

module.exports = router;