import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import StatisticCard from "../components/statistics/StatisticCard";
import { Area, Pie } from "@ant-design/plots";
import api from "../../api/api";

const StatisticPage = () => {
  const [data, setData] = useState([]);
  const [products, setproducts] = useState([]);

  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0);
    return `${amount.toFixed(2)}₺`;
  };

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


  const asyncFetch = async () => {
     try {
       const response= await api.get('/getAllBill');
       setData(response.data.bills);
     } catch (error) {
      console.log(error);
     }
  };

  console.log("Data",data);

  useEffect(() => {
    asyncFetch();
  }, []);

  const config = {
    data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
    smooth:true,
  };

  const config2 = {
    appendPadding: 10,
    data,
    angleField: "subTotal",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: true,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Toplam\nDeğer",
      },
    },
  };

  return (
    <div>
      <Header />
      <div className="px-6 pb-20 md:pb-0">
        <h1 className="text-4xl font-bold text-center mb-4">İstatistiklerim</h1>
        <div className="statistic-section">
          <h2 className="text-lg">
            Hoş Geldin
            <span className="text-green-700 font-bold text-lg">admin</span>.
          </h2>
          <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 md:gap-10 gap-4">
            <StatisticCard
              title={"Toplam Müşteri"}
              amount={data?.length}
              img={"/images/user.png"}
            />
            <StatisticCard
              title={"Toplam Kazanç"}
              amount={totalAmount()}
              img={"/images/money.png"}
            />
            <StatisticCard
              title={"Toplam Satış"}
              amount={data?.length}
              img={"/images/sale.png"}
            />
            <StatisticCard
              title={"Toplam Ürün"}
              amount={products?.length}
              img={"/images/product.png"}
            />
          </div>

          <div className="flex justify-between lg:flex-row flex-col gap-10 items-center">
            <div  className="lg:w-1/2 lg:h-full">
              <Area {...config} />
            </div> 

            <div className="lg:w-1/2 lg:h-full">
              <Pie {...config2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticPage;
