import './App.css';
import {useState} from 'react'

function Navbar(props)
{
let cartNo=props.cartNo
  return(
    <>
    <div className="navcontainer">
      <h2>Shopify</h2>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Shop</li>
        </ul>
        <div className="cart">
        <button >Cart <span className="cartNo">{cartNo}</span></button>
      </div>
      </div>
     
    </>
  )
}

function Product(props)
{ 
  const imgsrc="https://via.placeholder.com/300x300"
  const name=props.value.name;
  const price=props.value.price;
  let cartName = (!props.value.addedToCart)? "Add to cart":"Remove"
  
  
  const handleChart=()=>{
  console.log(cartName)
  //passing data from child to parent  using callback 
    if(cartName === "Add to cart") props.parentCallBack(1, name)
    else props.parentCallBack(-1,name)
  }

  return(
    <div className="card">
    <img src={imgsrc} alt="placeholderImage"/>
      <h2>{name}</h2>
      <p>{price}</p>
      <button onClick={handleChart}>{cartName}</button>
    </div>
  )
}

function App() {
  const [items]=useState([
    {name:"Fancy Product",
    price:"40$",
  addedToCart:false},
    {name:"Special Item",
    price:"60$",
    addedToCart:false},
    {name:"Sale Item",
    price:"80$",
    addedToCart:false},
    {name:"Popular Product",
    price:"100$",
    addedToCart:false}
  ])
    const [cartNo,setCartNo]=useState(0)
  
//callback function triggered in child component
    const callBackSet=(data,name)=>{
      setCartNo(cartNo + data)
      console.log(name)
      items.map(a=>{
        if(name === a.name) 
        return a.addedToCart = !a.addedToCart
      })
      console.log(items)
    }

  return (
    <div className="App">
      <Navbar  cartNo={cartNo}/>
   <div className="cardContainer">
       {items.map(item=>{
         //adding the callback to props
          return <Product value={item} parentCallBack={callBackSet} />
       })}
       </div>
    </div>
  );
}

export default App;
