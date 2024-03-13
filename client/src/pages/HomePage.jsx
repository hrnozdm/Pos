import CartTotal from "../components/cart/CartTotal"
import Categories from "../components/categories/Categories"
import Products from "../components/products/Products"
import Header from "../components/header/Header";

const HomePage = () => {
  return (
    <>
       <Header/>
      <div className="home flex flex-col md:flex-row px-6 justify-between gap-10 md:mr-0 -mr-[24px]">
        <div className="categories flex-[1]">
           <Categories/>
        </div>
        <div className="product flex-[5] min-w-[200px]">
            <Products/>
        </div>
        <div className="cart_totals flex-[3] md:ml-auto min-h-[500px]">
          <CartTotal/>
        </div>
      </div>
    </>
  )
}

export default HomePage
