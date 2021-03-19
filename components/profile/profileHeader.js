import {Component} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlaystation,
  faXbox,
  faTwitch,
  faYoutube,
  faTwitter        
} from "@fortawesome/free-brands-svg-icons";
import { 
  faEye      
} from "@fortawesome/free-regular-svg-icons";
import { 
  faGlobe,
  faDesktop        
} from "@fortawesome/free-solid-svg-icons";

export default class ProfileHeader extends Component {
    getProfilePicture = (data) => {
        if(data.platformInfo.avatarUrl === "" || `${data.platformInfo.avatarUrl}`.startsWith(" ")) {
          return (
            <div className="container-avatar-img">
              <Image 
              className="rank" 
              src="/img/profile.png"
              alt="Profile avatar"
              width={70}
              height={70}/>
            </div>
          );
        } else {
          try {
            return (
              <div className="container-avatar-img">
                <Image
                src={data.platformInfo.avatarUrl}
                alt="Profile avatar"
                width={70}
                height={70} 
                className="rank" />
              </div>
            );
          } catch(e) {
            return (
              <div className="container-avatar-img">
                <Image 
                className="rank" 
                src="/img/profile.png"
                alt="Profile avatar"
                width={70}
                height={70}/>
              </div>
            );
          }
        }
    }

    getPlatform = (platform) => {
        switch(platform) {
          case "psn":
            return <FontAwesomeIcon icon={faPlaystation} style={{width: '25px', height: '25px'}}/>;
          case "xbl":
            return <FontAwesomeIcon icon={faXbox} style={{width: '25px', height: '25px'}}/>;
          case "origin":
            return <FontAwesomeIcon icon={faDesktop} style={{width: '25px', height: '25px'}}/>;
          default:
            return <FontAwesomeIcon icon={faDesktop} style={{width: '25px', height: '25px'}}/>;
        }
    }

    showRegion = (data) => {
        try{
            if(data.userInfo.countryCode)
                return <h2><FontAwesomeIcon icon={faGlobe} style={{width: '25px', height: '25px'}}/>{data.userInfo.countryCode}</h2>
            else 
                return <h2 style={{opacity: "0"}}><FontAwesomeIcon icon={faGlobe} style={{width: '25px', height: '25px'}}/></h2>
        } catch(e) {
            return <h2 style={{opacity: "0"}}><FontAwesomeIcon icon={faGlobe} style={{width: '25px', height: '25px'}}/></h2>
        } 
    }

    showViewCount = (data) => {
        try{
            return <p><FontAwesomeIcon icon={faEye} style={{width: '15px', height: '15px'}}/>{data.userInfo.pageviews}</p>
        } catch(e) {
            return <p style={{opacity: "0"}}><FontAwesomeIcon icon={faEye} style={{width: '15px', height: '15px'}}/></p>
        } 
    }

    showSocialAccount = (account) => {
        try{
            switch(account.platformSlug) {
                case "twitter":
                    return <p><FontAwesomeIcon icon={faTwitter} style={{width: '15px', height: '15px'}}/>{account.platformUserIdentifier}</p>;
                case "twitch":
                    return <p><FontAwesomeIcon icon={faTwitch} style={{width: '15px', height: '15px'}}/>{account.platformUserIdentifier}</p>;
                case "youtube":
                    return <p><FontAwesomeIcon icon={faYoutube} style={{width: '15px', height: '15px'}}/>{account.platformUserIdentifier}</p>;
                default:
                    return <p>Hello</p>;
            }
        } catch(e) {
            return <p>Hello</p>;
        } 
    }

    render() {
        return (
        <>
            <div className="col-12 container-profile-background p-0"></div>

            <div className="container-fluid container-profile-bg">
                <div className="container container-profile-main">
                    {this.getProfilePicture(this.props.data)}
                    
                    <div className="container-profile-menu menu-left">
                        <h2>{this.getPlatform(this.props.data.platformInfo.platformSlug)}{this.props.data.platformInfo.platformUserId}</h2>
                        <div className="menu-items menu-items-left">
                        <Link href={"/apex/"+this.props.profileId}><a>Overview</a></Link>
                        <Link href={"/apex/matches/"+this.props.profileId}><a>Matches</a></Link>
                        <Link href={"/apex/seasons/"+this.props.profileId}><a>Seasons</a></Link>
                        </div>
                    </div>

                    <div className="container-profile-menu menu-right">
                        {this.showRegion(this.props.data)}
                        <div className="menu-items menu-items-right">
                            {this.showViewCount(this.props.data)}
                            {this.props.data.userInfo.socialAccounts.map((account, index) => this.showSocialAccount(account))}
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }
}