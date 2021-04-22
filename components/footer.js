import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faFacebook,
    faInstagram,
    faTwitter            
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <footer>
            <div className="container-fluid bg-dark text-center">
                    <ul className="d-flex justify-content-center">
                        <li><a href="#"><FontAwesomeIcon icon={faFacebook} style={{width: '30px', height: '30px', 'margin-right': '15px'}}/></a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faInstagram} style={{width: '30px', height: '30px'}}/></a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faTwitter} style={{width: '30px', height: '30px', 'margin-left': '15px'}}/></a></li>
                    </ul>
                    <p className="copy"><small>&copy; This site was created for educational purpose by Molnar David</small></p>
            </div>
        </footer>
    )
}