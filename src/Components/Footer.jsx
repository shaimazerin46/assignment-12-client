import { FaFacebook } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { SiGmail } from "react-icons/si";




const Footer = () => {
    return (
        <div>
            <footer className="footer bg-base-300 text-base-content flex justify-between p-10">
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
    <p className="mt-10">Copyright © {new Date().getFullYear()} - All right reserved</p>
  </nav>
  <nav>
    <h6 className="footer-title">Social</h6>
    <div className="grid grid-flow-col gap-4 text-xl text-orange-400">
     <a href="https://www.facebook.com/shaimazerinrichi" target="_blank">
     <FaFacebook />
     </a>
     <a href="https://www.linkedin.com/in/shaima-zerin-23bb59204/" target="_blank">
     <IoLogoLinkedin />
     </a>
     <a href="https://mail.google.com/" target="_blank">
     <SiGmail /></a>
    </div>
  </nav>
  
</footer>

        </div>
    );
};

export default Footer;