import { Table, Card, Button} from "antd";
import Header from "../components/header/Header";
import React,{useEffect, useState} from "react"
import api from "../../api/api";


const CustomerPage = () => {
  const [bills,setBills] = useState([]);
  const fetchBills =async () => {
    try {
      const response = await api.get('getAllBill');
      console.log(response.data);
      setBills(response.data.bills);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
      fetchBills();  
  }, [])
    


  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Telefon Numarası",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "İşlem Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render:(text)=><span>{text.substring(0,10)}</span>
    },
  ];

  return (
    <div>
      <Header />
        <div className="px-6">
          <h1 className="text-4xl font-bold text-center mb-4">Müşterilerim</h1>
          <Table dataSource={bills} columns={columns} bordered pagination={false} scroll={{x:1000,y:300}}/>
        </div>
    </div>
  );
};

export default CustomerPage;
