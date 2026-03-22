import React from "react";
import footerImg from "../../assets/rm191-nu-08.jpg";
import { NavLink } from "react-router";
import { FaFacebook, FaPinterest } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <div>
      <footer
        className="footer footer-horizontal footer-center bg-cover bg-center text-base-content rounded p-10"
        style={{ backgroundImage: `url(${footerImg})` }}
      >
        <nav className="grid grid-flow-col gap-4">
          <NavLink
            to={"/about"}
            className={" font-poppins text-lg text-primary font-bold pb-1"}
          >
            About us
          </NavLink>
          <NavLink
            to={"/contact"}
            className={"font-poppins text-primary text-lg font-bold pb-1"}
          >
            Contact
          </NavLink>
          <NavLink
            to={"/plants"}
            className={"font-poppins  text-primary text-lg font-bold pb-1"}
          >
            Plants
          </NavLink>

          <NavLink
            to={"/profile"}
            className={"font-poppins  text-primary text-lg font-bold pb-1"}
          >
            Profile
          </NavLink>
          {/* <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Plants</a>
          <a className="link link-hover">Profile</a> */}
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <FaFacebook className="text-[#1877F2] text-2xl" />
            </a>
            <a>
              <FaPinterest className="text-[#c41f26] text-2xl" />
            </a>
            <a>
              <BsTwitterX className="text-black text-2xl" />
            </a>
          </div>
        </nav>
        <aside>
          <p className="font-poppins  text-primary text-sm font-bold">
            Copyright © {new Date().getFullYear()} - All right reserved by
            Leaforia
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
