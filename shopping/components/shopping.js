const {
  hashHistory,
  Link,
  Switch,
  Route,
  HashRouter: Router,
  withRouter,
} = ReactRouterDOM;

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

class Sidebar extends React.Component {
  render(){
   //  console.log(this.props)
    return (
      <div className="col-4">
         <Wallet wallet={this.props.wallet} />
         <Basket />
      </div>
    );
  }
}

class Wallet extends React.Component {
  render(){
    const {balance=0, owner={}}=this.props.wallet;
    const {name="", email="", phoneNumber="", address=""}=owner;
 
    return (
      <div className="container border text-center">
        <h1>Wallet Details</h1>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Contact: {phoneNumber}</p>
          <p>Balance: {balance}</p>
          <p>Address: {address}</p>
      </div>
     )
    }
}

class Basket extends React.Component {
  render() {
    return (
      <p>Basket</p>
    )
  }
}

class Shopping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      wallet: {},
      cart: [],
      basket: [],
    };
  }

  /**
   * fetches products stored in data/products.json file and returns an array of product objects
   *
   * @returns {promise<object[]>} products array
   */
  async getProducts() {
    let products = [];
    try {
      // const response = await fetch("data/products.json");
      const response = await fetch("http://localhost:5500/api/products");
      products = await response.json();
    } catch (error) {
      console.log(error);
    } finally {                               
      return products.data;
    }
  }
  /**
   * fetches wallet stored in data/wallet.json file and returns wallet object
   * @returns {Promise<object>} wallet object
   */
  async getWallet() {
    let wallet = [];
    try {
      const response = await fetch("data/wallet.json");
      wallet = await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      return wallet;
    }
  }

  async componentDidMount() {
    try {
      const products = await this.getProducts();
      const wallet = await this.getWallet();
      this.setState({
        products,
        wallet,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
     * fetches wallet stored in data/wallet.json file and returns wallet object
     * @param {object} product
     * handledAddToCart to accept object
     * checked if quantity is 1
     * check if product exist
     * created a
     */

  handleAddToCart(product) {
    {/*A function to add product to cart*/}
    console.log(product)
  }

/** Component Tree
 * Shop-Product-AddToCart-Button 
 * props = onAddToCart
 * value = handleAddToCart
 **/
  render() {
    // console.log(this.state.product)
    return (
      <div className="row border">
        <h1 className="text-center" style={{ marginTop: "70px"}}>
            Enjoy yourself while shopping. Its affordable
        </h1>
          <Shop products={this.state.products} onAddToCart={this.props.onAddToCart}/>
          <Sidebar wallet={this.state.wallet} 
            cart={this.props.cart} 
            onIncrease={this.props.onIncrease}
            onDecrease={this.props.onDecrease}
            onDelete={this.props.onDelete}
            onClearCart={this.props.onClearCart}
          />
      </div>
    );
  }
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      cart: JSON.parse(localStorage.getItem("cartItem")) || []
    }
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  /** 
   *1. Verify if quantity for a selected product is greater than 0
   *2. Check if product selected exists in cart 
   *3. Create cart item
   *4. Make a copy of your cart
   *5. Add cart item to cart if it is greater than 0 
  */
   handleAddToCart(product){
    if (product.qty >= 1) {
      {/*This will add prooduct to cart */}
      const available = this.state.cart.find((item) => item.id === product.id);
      if (available) {
        alert("Product already in Cart");
      } else {
        let cartItem = {...product, cqty:1};
        let cart = [...this.state.cart, cartItem];
        this.setState({ 
          cart: cart,
        });
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  }

  async componentDidMount(){
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart !== null){
      this.setState({
        cart: cart,
      })
    } else {
      this.setState({
        cart: []
      })
    }
  }

  // async componentDidUpdate(){
  //   JSON.parse(localStorage.setItem("cart", JSON.stringify(this.state.cart)));
  // }


  /** 
 * 1. check if item is in cart
 * 2. check if quantity for product is greater than 1
 * 3. Increase item in cart by one  
*/
handleIncreaseItem = (product) => {
  {/*A function to increase items in a cart*/}
  if (product.qty >= 1) {
    const available = this.state.cart.find((item) => item.id === product.id);
    if (available) {
      let cart = this.state.cart.map((item) => item.id === product.id ? {...available, cqty:available.cqty + 1} : item)
      this.setState({
        cart: cart
      })
    }
  }
}

handleDecreaseItem = (product) => {
  {/*A function to decrease items in a cart*/}
  if (product.qty >= 1) {
    const available = this.state.cart.find((item) => item.id === product.id);
    if (available) {
      let cart = this.state.cart.map((item) => item.id === product.id ? {...available, cqty:available.cqty - 1} : item)
      this.setState({cart: cart})
    }
  }
}
/**
 * verify id of product you want deleted
 * 
 */
handleDelete = (product) => {
  {/*A function to remove items from cart */}
  if(product.qty >=1) {
    let cart = this.state.cart.filter((item) => item.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("product deleted")
    this.setState({cart : cart})
  } 
}

handleClearCart =(CartItems) => {
  let cart= [];
  localStorage.removeItem("cart");
  this.setState({cart : cart})
  alert('cart cleared')
}

  render() {
    
    return (
      <div>
      <Router>
       {<Navbar cartLength={this.state.cart.length}/>}
        <Switch>
          <Route path="/" exact>
            <Shopping onAddToCart={this.handleAddToCart} 
            cart={this.state.cart} 
            onIncrease={this.handleIncreaseItem}
            onDecrease={this.handleDecreaseItem}
            onDelete={this.handleDelete}
            onClearCart={this.handleClearCart}
          />
          </Route>
          <Route path="/products/add"><ProductForm /></Route>
          <Route path="/products"><Shop/></Route>
          <Route path="/products/edit/:id"><ProductForm /></Route>
          <Route path="/products/:id">
            <ProductDetail />
          </Route>
        <Route path="/Cart">
          <Cart cart={this.state.cart} 
          onIncrease={this.handleIncreaseItem}
          onDecrease={this.handleDecreaseItem}
          onDelete={this.handleDelete}
          onClearCart={this.handleClearCart}
        />
        </Route>
          <Route path="/CartItem">Cart</Route>
        </Switch>
      </Router>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("shopping"));
