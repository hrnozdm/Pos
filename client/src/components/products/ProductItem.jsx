import {useDispatch,useSelector } from "react-redux";
import { addProduct } from "../../redux/CartSlice";
import { message } from "antd";


const ProductItem = ({product,index}) => {
  const dispatch=useDispatch();
  const {cartItems}=useSelector((item)=>item.cart);
  const handleClick=()=>{
     dispatch(addProduct({...product,quantity:1}))
     message.success("Ürün başarıyla eklendi");
  }
  return (
    <div>
    <div className="product-item border rounded-md hover:shadow-lg cursor-pointer select-none transition-all" key={product._id} onClick={handleClick}>
    <div className="product-img">
      <img
        src={product.img}
        alt=""
        className="h-28 object-cover w-full"
      />
    </div>

      <div className="product-info flex flex-col p-3">
        <span className="font-bold">{product.title}</span>
        <span>{product.price}₺</span>
      </div>
    </div>
    </div>
  
  )
}

export default ProductItem
