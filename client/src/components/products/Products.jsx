import { useEffect, useState } from "react";
import api from "../../../api/api";
import ProductItem from "./ProductItem";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
const Products = () => {
  const [products, setproducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getAllProducts = async () => {
    try {
      const response = await api.get("/getAllProduct");
      console.log(response.data);
      setproducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className="product-wrapper grid md:grid-cols-6 gap-4 ">
      {products.map((product, index) => (
        <ProductItem product={product} index={index} />
      ))}

      <div
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-purple-800 flex justify-center items-center hover:opacity-90"
        onClick={()=>setIsModalOpen(true)}
      >
        <PlusOutlined className="text-white md:text-2xl"/>
      </div>
      <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-orange-800 flex justify-center items-center hover:opacity-90">
        <EditOutlined className="text-white md:text-2xl" />
      </div>

      <Add isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </div>
  );
};

export default Products;
