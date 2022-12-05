// import React from 'react'
import CartItem from './CartItem'

const {
  Link
}=ReactRouterDOM;
/** 
 * @prop {array} cart - an array of products in cart 
 * @prop {function} onIncrease - handles increase of items in a cart
 * @prop {function} onDecrease - handles decrease of items in a cart
 * @prop {function} onAddToCart - handles adding items to cart
 * @prop {function} onDelete - handles removing of items in a cart
 * @prop {function} onClearCart - handles clearing list of products in cart
*/
class Cart extends React.Component {
    constructor(props) {
      super(props)
    }
 
    /**
     * Component Tree
     * Cart
     */
 
    render(){
     console.log(this.props.cart.length)
     return (
       <div className="row border">
         <div className="col-3">
           <Link to='/products'>Products</Link>
           <Link to='/cart'>Cart</Link>
           <h1>My Cart</h1>
           {this.props.cart.map((item) => (
             <CartItem key={item.id} item={item} 
               onIncrease={this.props.onIncrease}
               onDecrease={this.props.onDecrease}
               onDelete={this.props.onDelete}
               // onClearCart={this.props.onClearCart}
            />
         ))}
         <Link to='/viewcart'>View Cart</Link>
         <button className="btn" onClick={() => this.props.onClearCart(this.props.item)}>Clear Cart</button>
         </div>
       </div>
     );
    }
  }

  export default Cart;