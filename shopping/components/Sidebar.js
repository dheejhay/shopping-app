import React from 'react'
import Wallet from './Wallet'
import Basket from './Basket'

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

  export default Sidebar;