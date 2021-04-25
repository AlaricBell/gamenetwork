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
      try {
        if(data.platformInfo.avatarUrl === null || data.platformInfo.avatarUrl === "" || `${data.platformInfo.avatarUrl}`.startsWith(" ")) {
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
        }
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
          if(data.userInfo.pageviews !== null) {
            return <p><FontAwesomeIcon icon={faEye} style={{width: '15px', height: '15px'}}/>{data.userInfo.pageviews}</p>
          } else {
            return <p style={{opacity: "0"}}><FontAwesomeIcon icon={faEye} style={{width: '15px', height: '15px'}}/></p>
          }
        } catch(e) {
            return <p style={{opacity: "0"}}><FontAwesomeIcon icon={faEye} style={{width: '15px', height: '15px'}}/></p>
        } 
    }

    showSocialAccount = (account, index) => {
        try{
            switch(account.platformSlug) {
                case "twitter":
                    return <p key={index}><FontAwesomeIcon icon={faTwitter} style={{width: '15px', height: '15px'}}/>{account.platformUserIdentifier}</p>;
                case "twitch":
                    return <p key={index}><FontAwesomeIcon icon={faTwitch} style={{width: '15px', height: '15px'}}/>{account.platformUserIdentifier}</p>;
                case "youtube":
                    return <p key={index}><FontAwesomeIcon icon={faYoutube} style={{width: '15px', height: '15px'}}/>{account.platformUserIdentifier}</p>;
                default:
                    return null;
            }
        } catch(e) {
            return null;
        } 
    }

    generateHeaderNavigation(links) {
      return links.map((link, index) => {
        return (
          <Link key={index} href={`/${link.path}/${this.props.profileId}`}><a>{link.display}</a></Link>
        );
      })
    }

    getSocialAccounts = (data) => {
      try {
        if(Array.isArray(data.userInfo.socialAccounts))
          return data.userInfo.socialAccounts;
        else
          return [];
      } catch {
        return [];
      }
    }

    render() {
        return (
        <>
            <div className="col-12 container-profile-background p-0">
              <h1>{this.props.title}</h1>
            </div>
              
            <div className="container-fluid container-profile-bg">
                <div className="container container-profile-main">
                    {this.getProfilePicture(this.props.data)}
                    
                    <div className="container-profile-menu menu-left">
                        <h2>{this.getPlatform(this.props.data.platformInfo.platformSlug)}{this.props.data.platformInfo.platformUserId}</h2>
                        <div className="menu-items menu-items-left">
                        {this.generateHeaderNavigation(this.props.links)}
                        </div>
                    </div>

                    <div className="container-profile-menu menu-right">
                        {this.showRegion(this.props.data)}
                        <div className="menu-items menu-items-right">
                            {this.showViewCount(this.props.data)}
                            {this.getSocialAccounts(this.props.data).map((account, index) => this.showSocialAccount(account, index))}
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }
}