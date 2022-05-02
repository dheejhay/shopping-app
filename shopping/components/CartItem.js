import React from 'react'

class CartItem extends React.Component {
    constructor(props) {
      super(props)
    }
 
    render(){
      return (
        <div className="col-4">
         <div className="card">
           <div className="card-body">
           <img className="bd-placeholder-img card-img-top" 
             src={this.props.item.image} 
             style={{height: "15vh"}} 
             alt="..." 
             />
 
             <p className="card-title text-truncate">{this.props.item.title}</p>
             <p className="card-text">${this.props.item.price}</p>
             <p className="card-text">{this.props.item.category}</p>
 
             <p className="card-text">
               <small className="text-muted">
                 Quantity: {this.props.item.cqty}
               </small>
             </p>
             <div className="d-flex justify-content-between ">
               <button className="btn" onClick={() => this.props.onIncrease(this.props.item)}>+</button>
               <button className="btn" onClick={() => this.props.onDecrease(this.props.item)}>-</button>
               <button className="btn" onClick={() => this.props.onDelete(this.props.item)}>Delete</button>
             </div>
           </div>
         </div>
        </div>
      )
    }
  }

  export default CartItem;