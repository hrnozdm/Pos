import React,{useState} from "react";
import { Badge, Input } from "antd";
import { useSelector } from "react-redux";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link,useNavigate,useLocation } from "react-router-dom";
const Header = ({search,setSearch}) => {
  
  const navigate=useNavigate();
  const {pathname} =useLocation();
  const Logout =()=>{
    if (window.confirm('Çıkış Yapmak İstediğinizden Eminmisiniz?')){
      localStorage.removeItem('posUser');
      navigate('/login')      
    }
  }
  const {cartItems}=useSelector((state)=>state.cart);
  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center  gap-10">
        <div className="logo">
          <Link to={"/"}>
            <h2 className="text-2xl font-bold md:text-3xl">LOGO</h2>
          </Link>
        </div>
        <div className="header-search flex-1 flex justify-center" onClick={()=>{
          pathname !== '/' && navigate("/")
        }}>
          <Input
            size="large"
            placeholder="Ürün ara"
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
            onChange={(e)=>setSearch(e.target.value)}
            value={search}
          />
        </div>
        <div className="menu-links flex justify-between items-center gap-7 md:static fixed z-50 bottom-0 md:w-auto w-screen md:bg-transparent bg-white left-0 md:border-t-0 border-t md:px-0 px-4 py-1">
         
            <Link to={"/"} className="menu-link flex flex-col hover:text-[#40a9ff] transition-all">
              <HomeOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Ana Sayfa</span>
            </Link>
            <Badge count={cartItems.length} offset={[0,1]} className="md:flex hidden">
                <Link to={"/cart"} className="menu-link flex flex-col hover:text-[#40a9ff] transition-all">
                <ShoppingCartOutlined className="md:text-2xl text-xl" />
                <span className="md:text-xs text-[10px]">Sepet</span>
                </Link>
            </Badge>
            <Link to={"/bills"} className="menu-link flex flex-col hover:text-[#40a9ff] transition-all">
              <CopyOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Faturalar</span>
            </Link>
            <Link to={"/customers"} className="menu-link flex flex-col hover:text-[#40a9ff] transition-all">
              <UserOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Müşteriler</span>
            </Link>
            <Link to={"/statistic"} className="menu-link flex flex-col hover:text-[#40a9ff] transition-all">
              <BarChartOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">İstatistikler</span>
            </Link>
            <div onClick={Logout}>
            <Link to={"/"} className="menu-link flex flex-col hover:text-[#40a9ff] transition-all">
              <LogoutOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Çıkış</span>
            </Link>
            </div>
           
          
        </div>

        <Badge count={cartItems.length} offset={[0,1]} className="md:hidden flex">
                <Link to={"/"} className="menu-link flex flex-col hover:text-[#40a9ff] transition-all">
                <ShoppingCartOutlined className="md:text-2xl text-2xl" />
                <span className="md:text-xs text-[10px]">Sepet</span>
                </Link>
            </Badge>
      </header>
    </div>
  );
};

export default Header;
