import { Button, message,Modal } from "antd";
import { useSelector,useDispatch } from "react-redux";
import { ClearOutlined,PlusCircleOutlined,MinusCircleOutlined } from '@ant-design/icons';
import { increase, deleteCart, decrease, deleteAllCart } from "../../redux/CartSlice";
import { useState } from "react";
const CartTotal = () => {
  const dispatch=useDispatch();
  const {cartItems,total,tax}=useSelector((state)=>state.cart);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
    dispatch(deleteAllCart());
  };


 
    return (
      <div className="flex flex-col max-h-[calc(100vh-120px)] h-full border">
        <div>
          <h2 className="bg-blue-600 text-center text-white md:px-6 md:py-3 px-5 py-2 md:ml-500 tracking-wide">Sepetteki Ürünler</h2>
          <ul className="cart-items flex flex-col gap-3 px-2 pt-2">
            {
             cartItems.length>0 ? cartItems.map((item,index)=>(
                <li className="cart-item flex items-center justify-between" key={index}>
                <div className="flex items-center">
                    <img src={item.img} alt="" className="w-16 h-16 object-cover" onClick={()=>{
                      dispatch(deleteCart(item)),
                      message.success("Silme İşlemi başarılı")
                    }}/>

                    <div className="flex flex-col ml-2">
                    <b>{item.title}</b>
                    <span>{item.price}₺ X {item.quantity}</span>
                    </div>
                </div>
                
                <div className="flex px-4 items-center gap-3">
                    <Button type="primary" className="rounded-full" size="small" icon={<MinusCircleOutlined />} onClick={()=>dispatch(decrease(item))}/>
                    <span className="font-bold w-6 inline-block text-center">{item.quantity}</span>
                    <Button type="primary" className="rounded-full" size="small" icon={<PlusCircleOutlined />} onClick={()=>dispatch(increase(item))}/>
                </div>
               
                </li>
            
              )) : "Sepette Hiç Ürün Yok"
            }
          
           
          </ul>
        </div>
        <div className="cart-totals mt-auto">

          <div className="border-t border-b">
            <div className="flex justify-between p-2">
              <b>Ara Toplam</b>
              <span>{(total).toFixed(2)}₺</span>
            </div>

            <div className="flex justify-between p-2">
              <b>Kdv %{tax}</b>
              <span className="text-red-700">+{((total*tax)/100).toFixed(2)}₺</span>
            </div>
          </div>

          <div className="border-b mt-4">
            <div className="flex justify-between p-2">
              <b className="text-lg text-green-500">Genel Toplam</b>
              <span className="text-xl">{(total+((total*tax)/100)).toFixed(2)}₺</span>
            </div>
          </div>

          <div className="py-4 px-2">
            <Button type="primary" size="large" className="w-full" disabled={cartItems.length ===0 ? true : false}>Sipariş Oluştur</Button>
            <Button type="primary" size="large" className="w-full mt-2" danger icon={<ClearOutlined />} onClick={showModal} disabled={cartItems.length ===0 ? true : false}>Temizle</Button>
          </div>

        </div>

        <Modal
        title="Ürünler Silinsinmi"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={()=>setOpen(false)}
      >
        <p>Emin misiniz ?</p>
      </Modal>
      </div>
    );
  }
  
  export default CartTotal;
  