import React, {Component} from 'react';

export default class GameForm extends Component {
    state = {
        username: "",
        platform: "",
        uri: "/api/profile/",
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

    render() {
        if(this.props.formShown) {
            return (   
                <div className="container-form container-form-center">
                    <div className="form-header">
                        <h2>{this.props.game.displayName}</h2>
                        <button className="button-danger" onClick={() => this.props.hideForm()}>X</button>
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
                                {this.props.game.platforms.map(platform => (
                                    <option value={platform.platformValue}>{platform.platformDisplay}</option> 
                                ))}
                            </select>
                        </div>
                      <input type="submit" name="username" value="Search" className="button-success"/>
                    </form>
                </div>
            )
        }
        return null;
    }
}