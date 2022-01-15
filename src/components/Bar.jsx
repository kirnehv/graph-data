import React, {useEffect, useState} from 'react'
import {Navbar, Nav, Container } from 'react-bootstrap'
import { Link, useLocation, useNavigate  } from "react-router-dom";

import logo from '../media/s-white.png';

export default function Bar(props) {
  // const [status, setStatus] = useState("top");
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [currentPath, setCurrentPath] = useState();
  // console.log(window.location)

  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
      setCurrentPath(location.pathname);
  },[location.pathname]);

  const handleLogout = async (e) =>{
    e.preventDefault();
    history.push('/');
  }
  // changes opacity of bar when at the top vs anywhere else
  // useEffect(() => {
  //   const listener = document.addEventListener("scroll", e => {
  //     let scrolled = document.scrollingElement.scrollTop;
  //     if (scrolled >= 50) {
  //         setStatus("bottom");
  //     } else {
  //         setStatus("top");
  //     }
  //   }, {passive: true});
  //
  //   return () => document.removeEventListener("scroll", listener);
  // }, []);
  // funtion to disapear navbar on scroll down, bring back on scroll up
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    // setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10);
    setVisible((prevScrollPos > currentScrollPos) || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };
  // listens on scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  //<button className="link" onClick={changeState}> CLICK TO CONTACT ></button>
  return (
    <Navbar expand="lg" fixed="top" variant="dark" style={{
        transition: '0.4s ease',
        position: "fixed",
        variant: "dark",
        height: '60px',
        top: visible ? '0' : '-60px',
        expand: 'sm'
      }}>
      <Navbar.Brand>
        <Link to="/">
          <img className="logo" src={ logo } alt="img"/>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav" >
        <Nav className="justify-content-end ml-auto" style={{ width: "100%"}}>
          <Nav.Link className="nav-link" style={{color: "white"}}>Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
