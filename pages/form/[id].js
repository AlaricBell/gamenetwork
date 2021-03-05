import React, {Component} from 'react';
import Layout from '../../components/layout/layout-main';
import GameForm from '../../components/gameForm';
import Slider from '../../components/slider';
import { getAllGameId, getAllGameData, getGameDataById } from '../../lib/games';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlaystation,
  faXbox        
} from "@fortawesome/free-brands-svg-icons";
import { 
    faDesktop,
    faSearch        
} from "@fortawesome/free-solid-svg-icons";

export async function getStaticPaths() {
    const paths = await getAllGameId();

    return {
      paths,
      fallback: false
    }
}

export async function getStaticProps({ params }) {
    const gameData = await getGameDataById(params.id)
    return {
      props: {
        gameData
      }
    }
}

export default class FormProfileSelection extends Component {
state = {
  username: "",
  platform: this.props.gameData.platforms[0].platformValue,
  uri: "/api/profile/"
}

handleUsername = (e) => {
  this.setState(prevState => {
      return {
          username: e.target.value
      }
  })
}

handlePlatform = (e) => {
  this.setState(prevState => {
      return {
          platform: e.target.value
      }
  })
}

generateUri = (platform, username) => {
  this.setState(prevState => {
      return {
          uri: `/api/profile/${platform}/${username}`
      }
  })
}

getPlatformIcon = (platform) => {
  switch(platform) {
    case "psn": 
      return faPlaystation;
    case "xbl": 
      return faXbox;
    case "origin": 
      return faDesktop;
  }
}

render() {
  return (
    <Layout>
      <div className="container-fluid container-game-picker">
        <GameForm 
        formShown={true}
        game={this.props.gameData}
        isBtnHidden={true}/>
        <div class="custom-shape-divider-bottom-1614267563">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
          </svg>
        </div>
      </div>

      <div className="container container-slider">
        <h3><span>Check out</span> our detailed match history!</h3>
        <Slider />
      </div>
      
    </Layout>
  )
}
  
}