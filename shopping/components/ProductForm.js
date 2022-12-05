// import React from 'react'

const {
  withRouter
} =ReactRouterDOM;

class ProductForm extends React.Component {
    constructor(props){
      super(props)
      this.state={
        title:"",
        price: 0,
        description:"",
        category:"",
        image:"",
        qty:0
      }
    }
  
    handleChange = (event) => {
      this.setState({...this.state,
        [event.target.name] : event.target.value
      });
    };
  
    handleSubmit = async (event) => {
      event.preventDefault();
      var action = this.props.action
      switch(action){
        case'add':
        let response = await fetch("http://localhost:5500/api/products" , {
          method: "POST",
          body: JSON.stringify(this.state),
          headers:{
            "content-Type":"application/json",
          }
        })
        break;
        case'edit':
        response = await fetch("http://localhost:5500/api/products/${id}", {
          method: "PUT",
          body: JSON.stringify(this.state),
          headers:{
            "content-Type":"application/json",
          }
        })
        break;
        case'delete':
        response = await fetch("http://localhost:5500/api/products/" + id, {
          method: "DELETE",
          body: JSON.stringify(this.state),
          headers:{
            "content-Type":"application/json",
          }
        })
          break;
      }
    };
  
    async componentDidMount(){
      const product = JSON.parse(localStorage.getItem("products"));
      console.log(product)
      // console.log(typeof (product))
    }
  
    // clearForm = () => {
    //   this.setState({
    //     id: 0,
    //     title:"",
    //     price: 0,
    //     description:"",
    //     category:"",
    //     image:"",
    //     qty:0
    //   })
    // }
  
    render (){
      // let pageTitle;
      // if(this.state.id){
      //   pageTitle = <h1>Edit Product</h1>
      // } else {
      //   pageTitle = <h1>Add Product</h1>
      // }
      return (
        <div className="card" style={{ width:"70vw"}}>
      {/*pageTitle*/}
          
          <form className="container" onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Name</label>
                <input type="text" name="title" className="form-control" id="title" aria-describedby="nameHelp" onChange={this.handleChange}/>
              </div>
              <div className="mb-3">
              <label htmlFor="qty" className="form-label">Quantity</label>
              <input type="number" name="qty" className="form-control" id="qty" aria-describedby="quantityHelp" onChange={this.handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input type="number" name="price" className="form-control" id="price" aria-describedby="priceHelp" onChange={this.handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
                <select name="category" className="form-select" aria-label="Default select example" onChange={this.handleChange}>
                  <option defaultValue>--Choose One--</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" name="description" id="description" aria-describedby="descriptionHelp" onChange={this.handleChange}/>
            </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
      )
    }
  }
  ProductForm = withRouter(ProductForm)

  export default ProductForm;