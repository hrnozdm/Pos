import { Button } from "antd";
import { ClearOutlined,PlusCircleOutlined,MinusCircleOutlined } from '@ant-design/icons';
const CartTotal = () => {
    return (
      <div className="flex flex-col max-h-[calc(100vh-120px)] h-full border">
        <div>
          <h2 className="bg-blue-600 text-center text-white md:px-6 md:py-3 px-5 py-2 md:ml-500 tracking-wide">Sepetteki Ürünler</h2>
          <ul className="cart-items flex flex-col gap-3 px-2 pt-2">
            <li className="cart-item flex items-center justify-between">
                <div className="flex items-center">
                    <img src="https://i.lezzet.com.tr/images-xxlarge-secondary/elmalardan-balmumu-bocek-ilaclari-ve-bakterileri-temizlemenin-6-yolu-6fee1ea2-3311-4a0e-87c6-bd4d46f5766a.jpg" alt="" className="w-16 h-16 object-cover"/>

                    <div className="flex flex-col ml-2">
                    <b>Elma</b>
                    <span>12₺ X 2</span>
                    </div>
                </div>
                
                <div className="flex px-4 items-center gap-3">
                    <Button type="primary" className="rounded-full" size="small" icon={<PlusCircleOutlined />}/>
                    <span className="font-bold">1</span>
                    <Button type="primary" className="rounded-full" size="small" icon={<MinusCircleOutlined />}/>
                </div>
               
            </li>
            <li className="cart-item">Cart İtem</li>
            <li className="cart-item">Cart İtem</li>
           
          </ul>
        </div>
        <div className="cart-totals mt-auto">

          <div className="border-t border-b">
            <div className="flex justify-between p-2">
              <b>Ara Toplam</b>
              <span>99₺</span>
            </div>

            <div className="flex justify-between p-2">
              <b>Kdv %8</b>
              <span className="text-red-700">+7.92₺</span>
            </div>
          </div>

          <div className="border-b mt-4">
            <div className="flex justify-between p-2">
              <b className="text-lg text-green-500">Genel Toplam</b>
              <span className="text-xl">99₺</span>
            </div>
          </div>

          <div className="py-4 px-2">
            <Button type="primary" size="large" className="w-full">Sipariş Oluştur</Button>
            <Button type="primary" size="large" className="w-full mt-2" danger icon={<ClearOutlined />}>Temizle</Button>
          </div>

        </div>
      </div>
    );
  }
  
  export default CartTotal;
  