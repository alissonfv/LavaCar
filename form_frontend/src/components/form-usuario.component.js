import React, { Component } from 'react';
import axios from 'axios';
import './style.css';
import MaskedInput from 'react-text-mask';


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
            dia: '',
            mes: '',
            ano: '',
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
        this.onChangeDia = this.onChangeDia.bind(this);
        this.onChangeMes = this.onChangeMes.bind(this);
        this.onChangeAno = this.onChangeAno.bind(this);
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
    onChangeDia(e) {
        this.setState({ dia: e.target.value })
    }   
    onChangeData(e) {
        this.setState({ data: e.target.value })
    }  
    onChangeHora(e) {
        this.setState({ hora: e.target.value })
    }  
    onChangeMes(e) {
        this.setState({ mes: e.target.value })
    }
    onChangeAno(e) {
        this.setState({ ano: e.target.value })
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
            dia: this.state.dia,
            mes: this.state.mes,
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
                (<li key='6'>
                    <b>WhatsApp:</b> {contexto.usuario.whats}
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
               /* 
                (<li key='7'>
                    <b>Dia do data:</b> {contexto.usuario.dia}
                </li>),
                (<li key='8'>
                    <b>Mes do data:</b> {contexto.usuario.mes}
                </li>),
                (<li key='9'>
                    <b>Ano do data:</b> {contexto.usuario.ano}
                </li>),
                
                */
                (<li key='9'>
                    <b>Comentários:</b> {contexto.usuario.comentarios}
                </li>),
            ]
        } // fim do if (contexto.usuario)

        return (
            <>
                <form className ="form" onSubmit={this.onSubmit}>
                <h1>LavaCar</h1> 
                    <fieldset>
                        <legend>Registro para LavaCar</legend><br/>
                        Nome Completo: *<br />
                        <input  type="text" value={this.state.nome}
                            onChange={this.onChangeNome} /><br />
                        Telefone: <br />
                        <MaskedInput mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} type="text" value={this.state.telefone}
                            onChange={this.onChangeTelefone} /> <br />
                        WhatsApp: 
                        <input type="checkbox" value={this.state.whats}
                            onChange={this.onChangeWhats} /><br /><br />
                        Modelo: *<br />
                        <input type="text" value={this.state.modelo}
                            onChange={this.onChangeModelo} /><br />
                        Marca:<br />
                        <input type="text" value={this.state.marca}
                            onChange={this.onChangeMarca} /><br />
                        Ano do Carro:<br />
                        <input type="int" value={this.state.anoCarro}
                            onChange={this.onChangeAnoCarro} /><br />
                        Placa: <br/>
                        <input className="placa" type="int" value={this.state.placa}
                            onChange={this.onChangePlaca} /><br />
                            Agendamento: <br/>
                       <MaskedInput mask={[ /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/ ,/\d/, /\d/]} placeholder="MM-DD-AAAA" type="text" value={this.state.data}
                            onChange={this.onChangeData} /> <br />
                         {/*<input placeholder="MM-DD/AAAA" type="text" value={this.state.data}
                            onChange={this.onChangeData} /> <br />*/}
                        Hora Marcada: <br/>
                        <MaskedInput mask={[ /\d/, /\d/, ':', /\d/, /\d/]} type="text" value={this.state.hora}
                            onChange={this.onChangeHora} /> <br />
                        Comentários:<br />
                        <textarea value={this.state.comentarios}
                            onChange={this.onChangeComentarios}
                            rows="4" cols="30">
                        </textarea><br />
                        <br/><br/>
                        <input className="btnSubmit" type="submit" value="Enviar" />
                        <input className="btnReset" type="button" value="Apagar" onClick={this.onReset} />
                        </fieldset>
                </form>
                   
                <div className="form">
                   {contexto.erros && <ul>{erros}</ul>}
                </div>
            
                <div className="form">
                    <h1>Dados recebidos:</h1>
                    {contexto.usuario && <ul>{usuario}</ul>}
                </div>
            </>
        ); // fim do return
    } // fim do render()
} // fim da classe FormUsuario