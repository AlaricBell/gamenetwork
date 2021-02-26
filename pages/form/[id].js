import React, {Component} from 'react';
import Layout from '../../components/layout/layout-main';
import { getAllGameId, getAllGameData, getGameDataById } from '../../lib/games';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlaystation,
  faXbox        
} from "@fortawesome/free-brands-svg-icons";
import { 
    faDesktop        
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

componentDidUpdate() {
  console.log(this.state.platform);
}

render() {
  return (
    <Layout>
      <div className="container-fluid container-game-picker">
        <div className="row">
          <div className="container-detail col-12 col-md-4">
            <h1>{this.props.gameData.displayName}</h1>
            <p>{this.props.gameData.description}</p>
            <p><span>Tags: </span><small>{this.props.gameData.tags.map(tag => (`#${tag} `))}</small></p>
          </div>
          <div className="container-form container-form-side col-12 col-md-8">
            <div className="form-header">
              <h2>{this.props.gameData.displayName}</h2>
              <div className="icon-set">
                {this.props.gameData.platforms.map(platform => (
                  <FontAwesomeIcon icon={this.getPlatformIcon(platform.platformValue)} style={{width: '20px', height: '20px'}}/>
                ))}
              </div>
            </div>
            <form action={this.state.uri} method="GET" className="form-profile" onSubmit={() => this.generateUri(this.state.platform, this.state.username)}>
                <div className="input-group">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" onChange={this.handleUsername}/>
                </div>
                <div className="input-group">
                    <label for="platform">Platform</label>
                    <select name="platform" id="platform" onChange={this.handlePlatform}>
                        <option value="" hidden selected>Select a platform</option>
                        {this.props.gameData.platforms.map(platform => (
                          <option value={platform.platformValue}>{platform.platformDisplay}</option> 
                        ))}
                    </select>
                </div>
              <input type="submit" name="username" value="Search" className="button-success"/>
            </form>
          </div>
        </div>
        <div class="custom-shape-divider-bottom-1614267563">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
          </svg>
        </div>
      </div>
    </Layout>
  )
}
  
}