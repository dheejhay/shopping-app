// import React from 'react'

class AddToCart extends React.Component {

    /** Component Tree
 * Button 
 * props = onClick
 * value = props.onAddToCart
 **/

  render(){
    return (
      <div className="btn-group">
        <button onClick={
          this.props.onAddToCart}>
            Add to Cart
        </button>
      </div>
    )
  }
}

export default AddToCart;