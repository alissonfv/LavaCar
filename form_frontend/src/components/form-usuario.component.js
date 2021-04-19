import React, { Component } from 'react';
import axios from 'axios';

export default class FormUsuario extends Component {
    constructor(props) {
        super(props);

        this.backendUrl = 'http://localhost:5000/usuarios';
        this.baseState = {
            nome: '',
            telefone: '',
            whats: false,
            marca: '',
            modelo: '',
            ano: '',
            comentarios: '',
            contexto: {}
        } // fim de this.baseState

        this.state = this.baseState;

        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeTelefone = this.onChangeTelefone.bind(this);
        this.onChangeWhats = this.onChangeWhats.bind(this);
        this.onChangeModelo = this.onChangeModelo.bind(this);
        this.onChangeMarca = this.onChangeMarca.bind(this);
        this.onChangeAno = this.onChangeAno.bind(this);
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
    onChangeAno(e) {
        this.setState({ ano: e.target.value })
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
            ano: this.state.ano,
            comentarios: this.state.comentarios,
        }; // fim do const usuario

        axios.post(this.backendUrl, usuario)
            .then(res => this.setState({ contexto: res.data }))
            .catch(erro => this.setState({ contexto: erro.response.data }));

        this.setState(this.baseState);
    } // fim do onSubmit()

    render() {
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
                    <b>WhatsApp:</b> {contexto.usuario.whats}
                </li>),
                (<li key='4'>
                    <b>Modelo:</b> {contexto.usuario.modelo}
                </li>),
                (<li key='5'>
                    <b>Marca:</b> {contexto.usuario.marca}
                </li>),
                (<li key='6'>
                    <b>Ano:</b> {contexto.usuario.ano}
                </li>),
                (<li key='7'>
                    <b>Comentários:</b> {contexto.usuario.comentarios}
                </li>),
            ]
        } // fim do if (contexto.usuario)

        return (
            <>
                <h1>LavaCar</h1>
                <form style={{ marginLeft: 100 }} onSubmit={this.onSubmit}>
                    <fieldset>
                        <legend>Novo Formulario</legend>
                        Nome: *<br />
                        <input type="text" value={this.state.nome}
                            onChange={this.onChangeNome} /><br />
                        Telefone: <br />
                        <input type="int" value={this.state.telefone}
                            onChange={this.onChangeTelefone} /><br />
                        WhatsApp: *<br />
                        <input type="checkbox" value={this.state.whats}
                            onChange={this.onChangeWhats} /><br />
                        Modelo: *<br />
                        <input type="text" value={this.state.modelo}
                            onChange={this.onChangeModelo} /><br />
                        Marca:<br />
                        <input type="text" value={this.state.marca}
                            onChange={this.onChangeMarca} /><br /><br />
                        ano:<br />
                        <input type="text" value={this.state.ano}
                            onChange={this.onChangeAno} /><br />
                        Comentários:<br />
                        <textarea value={this.state.comentarios}
                            onChange={this.onChangeComentarios}
                            rows="4" cols="30">
                        </textarea><br />
                        <br />
                        <input type="submit" value="Enviar" />
                        <input type="button" value="Apagar" onClick={this.onReset} />
                        *Campos obrigatórios
                        </fieldset>
                </form>
                {
                    contexto.erros && <ul>{erros}</ul>
                }

                <h2>Dados recebidos:</h2>
                {contexto.usuario && <ul>{usuario}</ul>}
            </>
        ); // fim do return
    } // fim do render()
} // fim da classe FormUsuario