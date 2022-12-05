// import React from "react"
import AddToCart from "./AddToCart";

const {
    Link
  } =ReactRouterDOM;

class Product extends React.Component {
    constructor(props){
      super(props)
    }
  
     /** Component Tree
   * AddToCart-Button 
   * props = onAddToCart
   * value = props.onAddToCart
   **/
  
    render(){
      const{title,image,category,price,qty,id}=this.props.product
      return (
        <div className="col-4">
          <div className="card">
            <img src={image} alt="..." style={{height:"30vh"}} />
            <div className="details">
            <Link to={"/products/" + id}><h5 className="title">{title}</h5></Link>
              
              <h5 className="price">$ {price}</h5>
              <h5 className="category"> {category}</h5>
              <h5 className="quantity">Quantity:{qty}</h5>
              <AddToCart onAddToCart={this.props.onAddToCart}/>
            </div>
          </div>
        </div>
      )
    }
  }

  export default Product;