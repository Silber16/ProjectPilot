import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer-sec">
        <div className="footer-sec__sub-sec">
            <label >Contact</label>
            <p>Do you have any problems or suggestions?
              <br />
              <a target="_blank" href="mailto:fransilber16@gmail.com">Get in touch</a>
            </p>
        </div>
        <div className="footer-sec__sub-sec developBy"> 
            <label>Developed by:</label>
            <a target="_blank" href="http://www.linkedin.com/in/francisco-silberberg-590129293"><FaLinkedin /></a>
        </div>
    </footer>
  )
}
