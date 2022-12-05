// import React from "react"
// import Shop from "../pages/Shop";
import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import ProductForm from "./ProductForm";
// import ProductDetail from "../pages/ProductDetail";
// import Cart from "./Cart"


const {
  hashHistory,
  Link,
  Switch,
  Route,
  HashRouter: Router,
  withRouter,
} = ReactRouterDOM;


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
