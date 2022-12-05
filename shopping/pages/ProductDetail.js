// import React from 'react'
import AddToCart from '../components/AddToCart'

const {
  Link,
  withRouter
} =ReactRouterDOM;

class ProductDetail extends React.Component {
    constructor(props) {
      super(props)
      this.state= {
        product :{},
        delete: false
      }
    }
  
    async getProductById (id) {
      let product ={}
      try {
       const response = await fetch("http://localhost:5500/api/products/" + id);
       console.log(product)
       const productData = await response.json();
       product = productData.data;
      } catch (error) {
        console.log(error);
      }
      return product;
    }
  
    async componentDidMount(){
      try {
       const { id } = this.props.match.params;
       const product = await this.getProductById(id);
       this.setState({
         product,
       });
      } catch(error) {
        console.log(error)
      }
    }
   render () {
    const {_id:id, image, title, description, price, category, qty} = this.state.product;
       return (
           <div>
           <div className="container">
             <h3>Product Detail</h3>
               <div className="row">
                 <div className="col-md-2">
                   <img className="card-img" src={image} alt={title} />
                 </div>
                 <div className="col-md-8">
                   <p>{title}</p>
                   <div className="">Category:{category}</div>
                   <p>{description}</p>
                   <h5>${price}</h5>
                   <h5>{qty >=1 ?(
                     <p className="badge bg-success">Available</p>
                   ) : (
                     <p className="badge bg-banger">Out of stock</p>
                   )}</h5>
                   <AddToCart onAddToCart={() =>this.props.onAddToCart} />
                 </div>
               </div>
             </div>
             <Link to='/'>Home</Link>
             <Link to='/cart'>View Cart</Link>
             <Link to={'/product/edit/${id}'}>Edit Product</Link>
            {/* <button onClick={this.handleDelete()}>{this.state.delete ? (
               <p>Are you sure you want to delete this product?</p>) : (<p>Delete product</p>)
             }</button> */}
           </div>
       )
   }
  }
  ProductDetail = withRouter(ProductDetail)

  export default ProductDetail;