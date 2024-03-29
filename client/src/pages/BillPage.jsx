import { Table, Card, Button} from "antd";
import Header from "../components/header/Header";
import React,{useState,useEffect} from "react"
import PrintBill from "../components/bills/PrintBill";
import api from "../../api/api";

const BillPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bills,setBills] = useState([]);
    const [customer,setCustomer]=useState([]);

    console.log(customer);
    
    const fetchBills=async () => {
      try {
        const response= await api.get('/getAllBill');
        console.log(response.data.bills);
        setBills(response.data.bills);
      } catch (error) {
        console.log(error);
      }
    }

    const formatDate = (dateString) => {
      const options = { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return new Date(dateString).toLocaleDateString('tr-TR', options);
    }

    

  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Telefon",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "Oluşturulma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render:(text) => formatDate(text)
    },
    {
      title: "Ödeme Yöntemi",
      dataIndex: "paymentMode",
      key: "paymentMode",
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Actions",
      render:(text,record)=>{
        return (
          <div>
            <Button type="link" onClick={()=>{
              setIsModalOpen(true)
              setCustomer(record)
            }}>Yazdır</Button>
          </div>
        )
      }
    },

  ];
  
  useEffect(() => {
     fetchBills();
  }, [])
  

  return (
    <div>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Faturalar</h1>
        <Table dataSource={bills} columns={columns} bordered pagination={false} scroll={{x:1000,y:300}}/>
            <div className="cart-total flex justify-end mt-4">
            
            </div>
            
            <PrintBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} customer={customer}/>
          
      </div>
    </div>
  );
};

export default BillPage;
