import React from 'react'

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

  export default Wallet;