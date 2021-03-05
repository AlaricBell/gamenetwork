import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faKeycdn     
} from "@fortawesome/free-brands-svg-icons";
import { 
    faUserCircle,
    faAd,
    faTrophy,
    faNetworkWired
    } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';

export default function Feature() {
    return (
        <div className="container container-feature">
            <hr />
            <div className="row">
                <div className="col-6 col-md-4 container-feature-content" data-aos="zoom-in">
                    <FontAwesomeIcon icon={faUserCircle} style={{width: '30px', height: '30px'}}/>
                    <h4>Check out any users' profile</h4>
                    <p>You can find all the users' profile and compare yourself to them</p>
                </div>
                <div className="col-6 col-md-4 container-feature-content" data-aos="zoom-in">
                    <FontAwesomeIcon icon={faCalendarAlt} style={{width: '30px', height: '30px'}}/>
                    <h4>Get the latest updates</h4>
                    <p>Our frequently updated database ensures that you always get the latest update</p>
                </div>
                <div className="col-6 col-md-4 container-feature-content" data-aos="zoom-in">
                    <FontAwesomeIcon icon={faAd} style={{width: '30px', height: '30px'}}/>
                    <h4>Ad free experience</h4>
                    <p>There's no paid plan, and definitely no ads to ruin your experience</p>
                </div>
            </div>
            <div className="row">
                <div className="col-6 col-md-4 container-feature-content" data-aos="zoom-in">
                    <FontAwesomeIcon icon={faTrophy} style={{width: '30px', height: '30px'}}/>
                    <h4>Seasonal rankings for profiles</h4>
                    <p>Check out how far others got during the seasons</p>
                </div>
                <div className="col-6 col-md-4 container-feature-content" data-aos="zoom-in">
                    <FontAwesomeIcon icon={faNetworkWired} style={{width: '30px', height: '30px'}}/>
                    <h4>Available on all platforms</h4>
                    <p>You can fing players on any platform, we are not limited to PC</p>
                </div>
                <div className="col-6 col-md-4 container-feature-content" data-aos="zoom-in">
                    <FontAwesomeIcon icon={faKeycdn} style={{width: '30px', height: '30px'}}/>
                    <h4>Guaranteed full access</h4>
                    <p>No paid plan, no log in, you get full access the moment you visit us</p>
                </div>
            </div>
        </div>
    )
}