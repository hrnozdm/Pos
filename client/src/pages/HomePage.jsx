import CartTotal from "../components/cart/CartTotal"
import Categories from "../components/categories/Categories"
import Products from "../components/products/Products"
import Header from "../components/header/Header";
import { useState,useEffect } from "react";




const HomePage = () => {

  const [filteredCategory, setFilteredCategory] = useState([]);
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await api.get("/getAllProduct");
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
 
  return (
    <>
       <Header/>
      <div className="home flex flex-col md:flex-row px-6 justify-between gap-10 md:mr-0 -mr-[24px]">
        <div className="categories flex-[1]">
           <Categories setFilteredCategory={setFilteredCategory} products={products} setProducts={setProducts}/>
        </div>
        <div className="product flex-[5] min-w-[200px]">
            <Products  products={filteredCategory.length > 0 ? filteredCategory : products}
            setProducts={setProducts}/>
        </div>
        <div className="cart_totals flex-[3] md:ml-auto min-h-[500px]">
          <CartTotal/>
        </div>
      </div>
    </>
  )
}

export default HomePage
