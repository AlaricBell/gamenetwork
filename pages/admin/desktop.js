import {Component} from 'react';
import axios from 'axios';
import cookie from 'cookie';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import ErrorMessage from '../../components/errorMessage';

import {getAllApexData, getAllUserData} from '../../lib/profiles';
import {getAllAdminHistoryData} from '../../lib/admin';
import {getAllGameData} from '../../lib/games';

export async function getServerSideProps(context) {
  let error = null;
  if(context.query.error) {
    error = context.query.error;
  }
  const cookies = context.req ? 
    context.req.headers.cookie : undefined;

  if(!cookies) {
    
  }

  let apexData = await getAllApexData();
  apexData = JSON.parse(apexData);

  let userData = await getAllUserData();
  userData = JSON.parse(userData);

  let gameData = await getAllGameData();
  gameData = JSON.parse(gameData);

  let userHistory = await getAllAdminHistoryData();
  userHistory = JSON.parse(userHistory);

  const res = await axios({
    url: "http://localhost:3000/api/auth/user",
    method: "get",
    headers: context.req ? 
    {Cookie: context.req.headers.cookie} : undefined,
    data: {
      email: "test@email.com",
    }
  })

  return {
    props: {
      email: cookie.parse(context.req.headers.cookie).email,
      apexData,
      userData,
      userHistory,
      gameData,
      error
    }
  }
}

export default class Desktop extends Component {
  state = {
    history: true,
    admin: false,
    game: false,
    adminReg: false,
    gameReg: false,
    games: this.props.gameData,
    users: this.props.userData
  }

  handleRendering(option) {
    switch(option) {
      case "history":
        this.setState({
          history: true,
          admin: false,
          game: false,
          adminReg: false,
          gameReg: false
        })
        break;

      case "admin":
        this.setState({
          history: false,
          admin: true,
          game: false,
          adminReg: false,
          gameReg: false
        })
        break;

      case "game":
        this.setState({
          history: false,
          admin: false,
          game: true,
          adminReg: false,
          gameReg: false
        })
        break;

      case "adminReg":
        this.setState({
          history: false,
          admin: false,
          game: false,
          adminReg: true,
          gameReg: false
        })
        break;

      case "gameReg":
        this.setState({
          history: false,
          admin: false,
          game: false,
          adminReg: false,
          gameReg: true
        })
        break;
    }
  }

  renderHistory = (show) => {
    if(show) {
      return (
        <div className="container-admin-panel">
          <h1>Activity History</h1>
          {this.props.userHistory.map(item => {
            return (
              <div className="card-admin">
                <p>{item.message}</p>
                <p>{item.createdAt.substring(0, item.createdAt.indexOf('T'))}</p>
              </div>
            )
          })}
        </div>
      )
    }
    return null;
  }

  renderApex = (show) => {
    if(show) {
      return (
        <div className="container-admin-panel">
          <h1>Registered games</h1>
          {this.state.games.map(game => {
            return (
              <div className="card-admin">
                <div>
                  <p>{game.displayName}</p>
                  <p>{game.createdAt.substring(0, game.createdAt.indexOf('T'))}</p>
                </div>
              
                <button className="btn btn-danger" onClick={() => this.handleDeleteGame(game.name, game.displayName)}>Delete</button>
              </div>
              
            )
          })}
        </div>
      )
    }
    return null;
  }

  renderUsers = (show) => {
    if(show) {
      return (
        <div className="container-admin-panel">
          <h1>Registered admins</h1>
          {this.state.users.map(user => {
            if(user.email === this.props.email) {
              return (
                <div className="card-admin">
                  <div>
                    <p>{user.email}</p>
                    <p>{user.createdAt.substring(0, user.createdAt.indexOf('T'))}</p>
                  </div>
                </div>
              )
            } else {
              return (
                <div className="card-admin">
                  <div>
                    <p>{user.email}</p>
                    <p>{user.createdAt.substring(0, user.createdAt.indexOf('T'))}</p>
                  </div>

                  <button className="btn btn-danger" onClick={() => this.handleDeleteUser(user.email)}>Delete</button>
                </div>
              )
            }
          })}
        </div>
      )
    }
    return null;
  }

  renderRegisterAdmin = (show) => {
    if(show) {
      return (
        <div className="container-admin-panel">
          <h1>Register admin</h1>
          <form className="form-admin" action="/api/auth/signup" method="POST">
            <input type="email" name="email" placeholder="Enter email"/>
            <input type="password" name="password" placeholder="Enter password"/>
            <input type="password" name="passwordconfirm" placeholder="Enter password again"/>
            <button type="submit" className="btn btn-success">Register</button>
          </form>
        </div>
      )
    }
    return null;
  }

  renderRegisterGame = (show) => {
    if(show) {
      return (
        <div className="container-admin-panel">
          <h1>Register game</h1>
          <form className="form-admin" action="/api/auth/game" method="POST">
            <input type="text" name="name" placeholder="Enter name"/>
            <input type="text" name="displayName" placeholder="Enter display name"/>
            <fieldset>
              <legend>Platforms</legend>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-6 form-group">
                    <input type="checkbox" name="platform" value="psn"/><label>Playstation</label>
                  </div>
                  <div className="col-6 form-group">
                    <input type="checkbox" name="platform" value="xbl"/><label>Xbox</label>
                  </div>
                  <div className="col-6 form-group">
                    <input type="checkbox" name="platform" value="steam"/><label>Steam</label>
                  </div>
                  <div className="col-6 form-group">
                    <input type="checkbox" name="platform" value="battlenet"/><label>Battlenet</label>
                  </div>
                  <div className="col-6 form-group">
                    <input type="checkbox" name="platform" value="origin"/><label>Origin</label>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend>Tags</legend>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-6 form-group">
                    <input type="checkbox" name="tag" value="multiplayer"/><label>Multiplayer</label>
                  </div>
                  <div className="col-6 form-group">
                    <input type="checkbox" name="tag" value="singleplayer"/><label>Singleplayer</label>
                  </div>
                  <div className="col-6 form-group">
                    <input type="checkbox" name="tag" value="coop"/><label>Co-op</label>
                  </div>
                  <div className="col-6 form-group">
                    <input type="checkbox" name="tag" value="looter"/><label>Looter</label>
                  </div>
                  <div className="col-6 form-group">
                    <input type="checkbox" name="tag" value="shooter"/><label>Shooter</label>
                  </div>
                  <div className="col-6 form-group">
                    <input type="checkbox" name="tag" value="rpg"/><label>RPG</label>
                  </div>
                  <div className="col-6 form-group">
                    <input type="checkbox" name="tag" value="moba"/><label>Moba</label>
                  </div>
                  <div className="col-6 form-group">
                    <input type="checkbox" name="tag" value="rouge"/><label>Rogue-like</label>
                  </div>
                </div>
              </div>
            </fieldset>
            <button type="submit" className="btn btn-success">Register</button>
          </form>
        </div>
      )
    }
    return null;
  }

  handleDeleteGame = async (name, displayName) => {
    this.setState(prevState => {
      return {
        games: prevState.games.filter(game => game.name != name)
      }
    });
    await axios.delete('/api/auth/game', {
      data: {
        name,
        displayName
      }
    });
  }

  handleDeleteUser = async (email) => {
    this.setState(prevState => {
      return {
        users: prevState.users.filter(user => user.email != email)
      }
    });
    await axios.delete('/api/auth/signup', {
      data: {
        email
      }
    });
  }

  renderErrorMessage() {
    if(this.props.error) {
      const error = this.props.error.replace(/-/g , " ");
      return (
        <ErrorMessage error={error}/>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="layout">
        <Head>
  
        </Head>
        <header className="navbar-wrapper">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-admin" id="navbar">
                <div className="container-fluid">
                  <Link href="/"><a className="navbar-brand"><FontAwesomeIcon icon={faGamepad} style={{width: '45px', height: '22px'}}/>Gamernetwork</a></Link>
  
                  <form action="/api/auth/logout" method="POST" className="form-admin-nav">
                    <label>{this.props.email}</label>
                    <button type="submit" className="button-auth">Log out</button>
                    <input type="hidden" name="email" value={this.props.email}/>
                  </form>
                </div>
            </nav>
        </header>
        <main className="container container-admin">
        {this.renderErrorMessage()}
          {/* <div className="row">
            <div className="col-3 card-admin-overview">
              <h2>
                2
              </h2>
            </div>
          </div> */}
          <div className="container-graph-buttons">
            <button className="button-graph" onClick={() => this.handleRendering("history")}>History</button>
            <button className="button-graph" onClick={() => this.handleRendering("adminReg")}>Register Admin</button>
            <button className="button-graph" onClick={() => this.handleRendering("gameReg")}>Register Game</button>
            <button className="button-graph" onClick={() => this.handleRendering("admin")}>Admins</button>
            <button className="button-graph" onClick={() => this.handleRendering("game")}>Games</button>
          </div>
  
          {this.renderHistory(this.state.history)}
          {this.renderApex(this.state.game)}
          {this.renderUsers(this.state.admin)}
          {this.renderRegisterAdmin(this.state.adminReg)}
          {this.renderRegisterGame(this.state.gameReg)}
        </main>
      </div>
    )
  }
}