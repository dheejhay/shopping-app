import React from 'react'

  /**
   * Component Tree
   * App-Navbar-CartIcon
   * @prop {number} cartLength - number of items in a cart
   */
   class CartIcon extends React.Component {

    render(){
      return(
        <div>
        <button type="button" className="btn btn-primary position-relative">
          <i className="bi bi-cart4"></i>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {this.props.cartLength}
          <span className="visually-hidden">unread messages</span>
        </span>
      </button>
        </div>
      )
    }
  }

  export default CartIcon;