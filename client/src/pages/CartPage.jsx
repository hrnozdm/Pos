import { Table, Card, Button, Popconfirm, message } from "antd";
import Header from "../components/header/Header";
import CreateBill from "../components/cart/CreateBill";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { decrease, increase, deleteCart } from "../redux/CartSlice";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartItems, total, tax } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      width: "125px",
      render: (text, record) => {
        return <img src={text} alt="" width={100} height={100} />;
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return <span>{text.toFixed(2)}₺</span>;
      },
    },
    {
      title: "Ürün Adeti",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return (
          <div className="flex items-center">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<MinusCircleOutlined />}
              onClick={() => dispatch(decrease(record))}
            />

            <span className="font-bold w-6 inline-block text-center">
              {record.quantity}
            </span>

            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<PlusCircleOutlined />}
              onClick={() => dispatch(increase(record))}
            />
          </div>
        );
      },
    },
    {
      title: "Toplam Fiyat",
      render: (text, record) => {
        return <span>{(record.quantity * record.price).toFixed(2)}₺</span>;
      },
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Silmek için emin misiniz?"
            onConfirm={() => {
              dispatch(deleteCart(record));
              message.success("Ürün Sepetten Silindi.");
            }}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button type="link" danger>
              Sil
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <div>
      <Header />
      <div className="px-6">
        <Table
          dataSource={cartItems}
          columns={columns}
          bordered
          pagination={false}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{total}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV Toplam %{tax}</span>
              <span className="text-red-600">
                +{((total * tax) / 100).toFixed(2)}₺
              </span>
            </div>
            <div className="flex justify-between">
              <b>Toplam</b>
              <b>{total + (total * tax) / 100}₺</b>
            </div>
            <Button
              type="primary"
              className="mt-4 w-full"
              size="large"
              onClick={() => setIsModalOpen(true)}
            >
              Sipariş Oluştur
            </Button>
          </Card>
        </div>

        <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
};

export default CartPage;
