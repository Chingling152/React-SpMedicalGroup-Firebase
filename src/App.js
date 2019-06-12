import React, { Component } from "react";
import firebase from "./servicos/firebaseConfig";
// API Key
// AIzaSyDp5OO2ehjYZedIrBnB2wopDacytFG1p-8 
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const collection = "localizacao-usuario";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      especializacao: "",
      listaDados: [],
      listaEspecializacoes: [],
    }
    
  }

  _listarDados() {
    firebase.firestore().collection(collection).get().then((eventos) => {
      let array = [];
      eventos.forEach((evento) => {
        array.push({
          latitude : evento.data().Localizacao.latitude,
          longitude : evento.data().Localizacao.longitude,
          especializacao : evento.data().Especializacao,
        })
      })
      this.setState({listaDados : array})
    }).catch(i=>console.error(i))
  }

  onInfoWindowClose(){
    console.log("A janela foi fechada.")
    return(
        <p>Para abrir novamente, clique aqui{this.state.abrirMap}</p>
    )
}

  _cadastrarDados(event) {
    event.preventDefault();
    firebase.firestore().collection(collection).add({
      Localizacao: new firebase.firestore.GeoPoint(parseFloat(this.state.latitude), parseFloat(this.state.longitude)),
      Especializacao : this.state.especializacao,
    }
    ).then(() => {
      alert(this.state.latitude, this.state.longitude, this.state.especializacao)
    }).catch(erro => console.log(erro))
  }

  _atualizaEstado(evento) {
    this.setState({[evento.target.name] : evento.target.value})
  }

  componentDidMount() {
    this._listarDados();
  }
  
  render() {
    return(
      <div>
        <form onSubmit={this._cadastrarDados.bind(this)}>
          <input type="number" name="latitude" value={this.state.latitude} onChange={this._atualizaEstado.bind(this)} placeholder="Insira a latitude"/>
          <input type="number" name="longitude" value={this.state.longitude} onChange={this._atualizaEstado.bind(this)} placeholder="Insira a longitude"/>
          <input type="number" name="especializacao" value={this.state.especializacao} onChange={this._atualizaEstado.bind(this)} placeholder="Insira a especialização"/>
          {/* <option>
            <select>
            </select>
          </option> */}
          <button type="submit">Cadastrar</button>
        </form>
          {this.state.listaDados.map(function (dados, key) {
            return(
              <div key={key}>
              <label>Dados</label>
              <p>{"Id " + key}</p>
              <p>{"Endereço do paciente"}</p>
              <p>{"Latitude: " + dados.latitude + " - Longitude: " + dados.longitude}</p>
              <p>{"Especialidade do médico: " + dados.especializacao}</p>
            </div>
          )
        })}
        <Map google={this.props.google}zoom={8}style={estiloMapa}initialCenter={{lat:-23.5411284,lng:-46.641581}}>
          {this.state.listaDados.map(function (dados, key) {
            return(
              <Marker key={key} position={{lat:dados.latitude,lng:dados.longitude}} name={key}/>
          )
        })}
        </Map>
        {/* <Marker position={{lat:-23.5411284,lng:-46.641581}} name="Localização atual"/> */}
      </div>
    )
  }
}

const estiloMapa = {
  display: "flex",
  width: '40%',
  height: '40%',
};


export default GoogleApiWrapper({
  // apiKey: 'AIzaSyDp5OO2ehjYZedIrBnB2wopDacytFG1p-8'
  apiKey: 'AIzaSyCGjPUB8XFpT2scFtxqcDg_mrICDOufMjA'
})(App);
