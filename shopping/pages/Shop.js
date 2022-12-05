// import React from 'react'
import Product from '../components/Product';

const {
  Link
} =ReactRouterDOM;

class Shop extends React.Component {

    /** Component Tree
   * Product-AddToCart-Button 
   * props = onAddToCart
   * value = props.onAddToCart
   **/
  
    render() {
      return (
        <div className="col-8 border ">
          <h3>Shop</h3>
          <Link to="/products/add">Add Product</Link>
          <div className="row">
            {this.props.products.map((product) => (
              <Product 
              key={product._id} 
              product={product} 
              onAddToCart={() => this.props.onAddToCart(product)}/>
            ))}
          </div>
        </div>
      );
    }
  }

  export default Shop;