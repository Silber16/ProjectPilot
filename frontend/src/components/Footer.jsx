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
            <a target="_blank" href="https://ar.linkedin.com/"><FaLinkedin /></a>
        </div>
    </footer>
  )
}
