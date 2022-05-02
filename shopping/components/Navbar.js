import React from 'react'
import CartIcon from './CartIcon'

const {
  Link
} =ReactRouterDOM;

class Navbar extends React.Component {
    constructor(props) {
      super(props)
    }
    render(){
      return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Daavi and Daughter Shop</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#portfolio">Portfolio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
              <Link to='/Cart'>
                <CartIcon cartLength={this.props.cartLength}/>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
      )
    }
  }

  export default Navbar;