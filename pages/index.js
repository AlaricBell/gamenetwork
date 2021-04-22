import React, {Component} from 'react';
import GameForm from '../components/gameForm';
import About from '../components/about';
import Feature from '../components/feature';
import ErrorMessage from '../components/errorMessage';
import Layout from '../components/layout/layout-main';
import { getAllGameData } from '../lib/games';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faDiscord,
  faYoutube        
} from "@fortawesome/free-brands-svg-icons";

export async function getServerSideProps({query}) {
  let games = await getAllGameData();
  games = JSON.parse(games);
  let error = null;
  if(query.error) {
    error = query.error;
  }
  return {
    props: {
      games,
      error
    }
  }
}

export default class Home extends Component {
  state = {
    formShown: false,
    game: {},
  }

  showForm = (title) => {
    const selectedGame = this.props.games.filter(game => game.name == title);
    this.setState(prevState => {
      return {
        formShown: true, 
        game: {
          name: selectedGame[0].name,
          displayName: selectedGame[0].displayName,
          platforms: selectedGame[0].platforms,
        },
      }
    })
  }

  hideForm = () => {
    this.setState(prevState => {
      return {formShown: false}
    })
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
      <Layout games={this.props.games}>
        <div className="container-fluid header-main" style={{width: "85%"}}>
          <div className="row">
            {this.renderErrorMessage()}
            <div className="header-main-item col-12 col-md-6">
              <h2>Gamer <span>Network</span></h2>
              <p>Competitive gaming is hard, let us make it easier for you.<br/> Enjoy your games and do your best, we will follow your improvement and provide all the statistics you need.</p>
            </div>
            <div className="header-main-item col-12 col-md-6">
              <h2>Check us out on social media!</h2>
              <ul>
                <li><FontAwesomeIcon icon={faDiscord} style={{width: '25px', height: '20px'}}/><span>Discord</span></li>
                <li><span>Youtube</span><FontAwesomeIcon icon={faYoutube} style={{width: '25px', height: '20px'}}/></li>
              </ul>
            </div>
          </div>
        </div>
  
        <div className="container-fluid p-0">
          <section className="card-games row">
          {this.props.games.map((game, index) => (
            <div key={index} className="col-12 col-md-4 card-games-item">
              <img src={"/img/apex.png"}
              className="img-brand"
              alt={"Game card"}
              height={75}
              width={75}/>
              <div>
                <h4>{game.displayName}</h4>
                <button className="button-transparent" onClick={() => this.showForm(game.name)}>View Game</button>
              </div>
            </div>
          ))}
          </section>
        </div>

        <GameForm 
        formShown={this.state.formShown}
        game={this.state.game}
        hideForm={this.hideForm}
        isBtnHidden={false}/>

        

        <div className="container container-quote">
            <q>Competitive gaming is hard, let us make it easier for you.<br/> Enjoy your games and do your best, we will follow your improvement and provide all the statistics you need.</q>
        </div>

        <About/>
        <Feature />
      </Layout>
    )
  }
}
