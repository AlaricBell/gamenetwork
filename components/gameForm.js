import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faChevronUp,
    faSearch        
} from "@fortawesome/free-solid-svg-icons";

export default class GameForm extends Component {
    state = {
        username: "",
        platform: "",
        uri: "/",
    }

    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handlePlatform = (e) => {
        this.setState({
                platform: e.target.value
            })
    }

    generateUri = (platform, username) => {
        this.setState(prevState => {
            return {
                uri: `/api/apexprofile/${platform}/${username}`
            }
        })
    }

    renderToggleButton = (formShown) => {
        if(!this.props.isBtnHidden) {
            return (
                <button className="button-danger" onClick={() => this.props.hideForm()}><FontAwesomeIcon icon={faChevronUp} style={{width: '20px', height: '20px'}}/></button>
            );
        }
        return null;
        
    }

    render() {
        if(this.props.formShown) {
            return (   
                <div className="form-header" data-aos="zoom-in">
                    {this.renderToggleButton(this.props.formShown)}
                    <h1>{this.props.game.displayName}</h1>
                    <form action={this.state.uri} method="GET" className="form-profile" onSubmit={() => this.generateUri(this.state.platform, this.state.username)}>
                        <select name="platform" id="platform" onChange={this.handlePlatform}>
                        <option value="" hidden selected>Platform</option>
                        {this.props.game.platforms.map((platform, index) => (
                            <option value={platform.platformValue} key={index}>{platform.platformDisplay}</option> 
                        ))}
                        </select>
                        <input type="text" name="username" id="username" onChange={this.handleUsername}/>
                        <button type="submit" name="submit-game" value="Search" className="button-success"><FontAwesomeIcon icon={faSearch} style={{width: '20px', height: '20px'}}/></button>
                    </form>
                </div>
            )
        }
        return null;
    }
}