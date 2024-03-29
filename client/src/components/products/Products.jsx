import { useEffect, useState } from "react";
import api from "../../../api/api";
import ProductItem from "./ProductItem";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import { useNavigate } from "react-router-dom";
const Products = ({ products, setProducts }) => {
  const navigate=useNavigate();
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getAllProducts = async () => {
    try {
      const response = await api.get("/getAllProduct");
      console.log(response.data);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);



  return (
    <div className="product-wrapper grid md:grid-cols-6 gap-4">

      {products.map((product, index) => (
        <ProductItem product={product} index={index} />
      ))}

      <div
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-purple-800 flex justify-center items-center hover:opacity-90 min-h-[180px]"
        onClick={()=>setIsModalOpen(true)}
      >
        <PlusOutlined className="text-white md:text-2xl"/>
      </div>
      <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-orange-800 flex justify-center items-center hover:opacity-90 min-h-[180px]"
       onClick={()=>navigate("/products")}
      >
        <EditOutlined className="text-white md:text-2xl" />
      </div>

      <Add isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setproducts={setProducts} products={products}/>
    </div>
  );
};

export default Products;
