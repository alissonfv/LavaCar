import React, { Component } from 'react';
import axios from 'axios';
import './style.css';
import MaskedInput from 'react-text-mask';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert'

export default class FormUsuario extends Component {


    constructor(props) {
        super(props);

        this.backendUrl = 'http://localhost:9000/usuarios';
        this.baseState = {
            nome: '',
            telefone: '',
            whats: false,
            marca: '',
            modelo: '',
            anoCarro: '',
            placa: '',
            data: '',
            hora: '',
            comentarios: '',
            contexto: {}
        } // fim de this.baseState

        this.state = this.baseState;

        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeTelefone = this.onChangeTelefone.bind(this);
        this.onChangeWhats = this.onChangeWhats.bind(this);
        this.onChangeModelo = this.onChangeModelo.bind(this);
        this.onChangeMarca = this.onChangeMarca.bind(this);
        this.onChangeAnoCarro = this.onChangeAnoCarro.bind(this);
        this.onChangePlaca = this.onChangePlaca.bind(this);
        this.onChangeData = this.onChangeData.bind(this);
        this.onChangeHora = this.onChangeHora.bind(this);
        this.onChangeComentarios = this.onChangeComentarios.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
    } // fim do constructor()

    onChangeNome(e) {
        this.setState({ nome: e.target.value })
    }

    onChangeTelefone(e) {
        this.setState({ telefone: e.target.value })
    }

    onChangeWhats(e) {
        this.setState({ whats: e.target.value })
    }
    onChangeModelo(e) {
        this.setState({ modelo: e.target.value })
    }
    onChangeMarca(e) {
        this.setState({ marca: e.target.value })
    }
    onChangeAnoCarro(e) {
        this.setState({ anoCarro: e.target.value })
    }
    onChangeData(e) {
        this.setState({ data: e.target.value })
    }
    onChangeHora(e) {
        this.setState({ hora: e.target.value })
    }
    onChangePlaca(e) {
        this.setState({ placa: e.target.value })
    }
    onChangeComentarios(e) {
        this.setState({ comentarios: e.target.value })
    }

    onReset(e) {
        this.setState(this.baseState);
    }

    onSubmit(e) {
        e.preventDefault();

        const usuario = {
            nome: this.state.nome,
            telefone: this.state.telefone,
            whats: this.state.senha,
            modelo: this.state.modelo,
            marca: this.state.marca,
            anoCarro: this.state.anoCarro,
            ano: this.state.ano,
            placa: this.state.placa,
            data: this.state.data,
            hora: this.state.hora,
            comentarios: this.state.comentarios,
        }; // fim do const usuario

        axios.post(this.backendUrl, usuario)
            .then(res => this.setState({ contexto: res.data }))
            .catch(erro => this.setState({ contexto: erro.response.data }));

        this.setState(this.baseState);
    } // fim do onSubmit()

    render() {
        document.title = 'LavaCar Esponjão'

        const contexto = this.state.contexto;
        let erros = [];
        if (contexto.erros) {
            erros = contexto.erros.map(
                (erro, idx) => (
                    <li key={idx}>{erro.msg}</li>));
        }
        let usuario = [];
        if (contexto.usuario) {
            usuario = [
                (<li key='1'>
                    <b>Nome:</b> {contexto.usuario.nome}
                </li>),
                (<li key='2'>
                    <b>Telefone:</b> {contexto.usuario.telefone}
                </li>),
                (<li key='3'>
                    <b>Modelo:</b> {contexto.usuario.modelo}
                </li>),
                (<li key='4'>
                    <b>Marca:</b> {contexto.usuario.marca}
                </li>),
                (<li key='5'>
                    <b>Ano do Carro:</b> {contexto.usuario.anoCarro}
                </li>),
                (<li key='6'>
                    <b>Placa:</b> {contexto.usuario.placa}
                </li>),
                (<li key='7'>
                    <b>Agendamento:</b> {contexto.usuario.data}
                </li>),
                (<li key='8'>
                    <b>Hora Marcada:</b> {contexto.usuario.hora}
                </li>),
                (<li key='9'>
                    <b>Comentários:</b> {contexto.usuario.comentarios}
                </li>),
            ]
        }

        return (
            <>
                <form className="form" onSubmit={this.onSubmit}>
                    <h1 className="titulo">LavaCar Esponjão</h1><hr />
                    <fieldset>
                        <legend>Preencha seu Ticket:</legend><br />
                        Nome Completo: *<br />
                        <input type="text" placeholder="Ex: Joao Carlos Vieira" value={this.state.nome}
                            onChange={this.onChangeNome} /><br />
                        Telefone: <br />
                        <MaskedInput mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} type="text" placeholder="(00) 00000-0000" value={this.state.telefone}
                            onChange={this.onChangeTelefone} /> <br />
                        WhatsApp:
                        <input type="checkbox" value={this.state.whats}
                            onChange={this.onChangeWhats} /><br /><br />
                        Modelo do Carro: <br />
                        <input type="text" placeholder="Ex: Cobalt" value={this.state.modelo}
                            onChange={this.onChangeModelo} /><br />
                        Marca do Carro:<br />
                        <input type="text" placeholder="Ex: Chevrolet" value={this.state.marca}
                            onChange={this.onChangeMarca} /><br />
                        Ano do Carro:<br />
                        <MaskedInput mask={[/\d/, /\d/, /\d/, /\d/]} type="int" placeholder="Ex: 2016" value={this.state.anoCarro}
                            onChange={this.onChangeAnoCarro} /><br />
                        Placa: *<br />
                        <input className="placa" placeholder="Ex: BRA1234" type="int" value={this.state.placa}
                            onChange={this.onChangePlaca} /><br />
                            Agendamento: *<br />
                        <MaskedInput mask={[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} placeholder="MM-DD-AAAA" type="text" value={this.state.data}
                            onChange={this.onChangeData} /> <br />
                        Hora Marcada: *<br />
                        <MaskedInput mask={[/\d/, /\d/, ':', /\d/, /\d/]} placeholder="00:00" type="text" value={this.state.hora}
                            onChange={this.onChangeHora} /> <br />
                        Comentários:<br />
                        <textarea placeholder="Alguma informação adicional:" value={this.state.comentarios}
                            onChange={this.onChangeComentarios}
                            rows="4" cols="30">
                        </textarea><br />
                        <br /><br />
                        <input className="btnSubmit" type="submit" value="Enviar" />
                        <input className="btnReset" type="button" value="Apagar" onClick={this.onReset} />
                    </fieldset>
                </form>
                {!contexto.usuario < 1 && (
                    <Alert variant="success">
                        <p className="mb-0">
                            Ticket criado com Sucesso:<hr />
                            <ul>
                            {contexto.usuario && <ul>{usuario}</ul>}
                            </ul>
                        </p>
                    </Alert>
                )}
                {!contexto.erros <1 && (
                    <Alert variant="danger">
                        <p className="mb-0">
                            Encontramos alguns problema. Por favor refaça e mande outra vez. <hr />
                            <ul>
                            {contexto.erros && <ul>{erros}</ul>}
                            </ul>
                        </p>
                    </Alert>
                )}
            </>
        );

    }

}