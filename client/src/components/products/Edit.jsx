import { Button, Form, Input, message, Modal, Table, Select } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../api/api";

const Edit = ({
}) => {
 
  const [editingItem, setEditingItem] = useState({});
  const [products, setProducts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categories,setCategories]=useState([]);
  const [form] = Form.useForm();
  console.log(editingItem);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/getAllCategory");
      console.log(response.data);
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishUpdate=async (values)=>{
    try {
        const response=await api.put('/updateProduct',{
            ...values,
            productId:editingItem._id
        })
        setProducts([...products,response.data.updatedProduct])
        message.success("Ürün güncelleme başarılı");
        getAllProducts();
        setIsEditModalOpen(false);
    } catch (error) {
        console.log(error);
        message.error("Başarısız İşlem")
    }
  }

  const getAllProducts = async () => {
    try {
      const response = await api.get('/getAllProduct');
      setProducts(response.data.products);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct=async (productId)=>{
    try {
        const response=await api.delete('/deleteProduct',{data:{productId}});
        console.log(response.data);
        message.success("Ürün Silindi");
        getAllProducts();
    } catch (error) {
        message.error("Başarısız İşlem");
    }
  }

  useEffect(() => {
    getAllProducts();
    fetchCategories();
  }, []);

  const columns = [
    {
      title: "Ürün Adı",
      dataIndex: "title",
      width: "8%",
      render: (_, record) => {
        return <p>{record.title}</p>;
      },
    },
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      width: "4%",
      render: (_, record) => {
        return (
          <img src={record.img} alt="" className="w-full h-20 object-cover" />
        );
      },
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      width: "8%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (_, record) => {
        return (
          <div>
            <Button type="link" className="pl-0" onClick={() => {
                setIsEditModalOpen(true),
                setEditingItem(record)
            }}>
              Düzenle
            </Button>
            <Button
              type="link"
              danger
              onClick={()=>deleteProduct(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={"_id"}
        scroll={{
          x: 1000,
          y: 600,
        }}
      />

      <Modal
        title="Yeni Ürün Ekle"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={onFinishUpdate}
          initialValues={editingItem}
        >
          <Form.Item
            name="title"
            label="Ürün Adı"
            rules={[
              { required: true, message: "Ürün Adı Alanı Boş Geçilemez!" },
            ]}
          >
            <Input placeholder="Ürün adı giriniz." />
          </Form.Item>
          <Form.Item
            name="img"
            label="Ürün Görseli"
            rules={[
              { required: true, message: "Ürün Görseli Alanı Boş Geçilemez!" },
            ]}
          >
            <Input placeholder="Ürün görseli giriniz." />
          </Form.Item>
          <Form.Item
            name="price"
            label="Ürün Fiyatı"
            rules={[
              { required: true, message: "Ürün Fiyatı Alanı Boş Geçilemez!" },
            ]}
          >
            <Input placeholder="Ürün fiyatı giriniz." />
          </Form.Item>
          <Form.Item
            name="category"
            label="Kategori Seç"
            rules={[
              { required: true, message: "Kategori Alanı Boş Geçilemez!" },
            ]}
          >
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.title ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? "").toLowerCase())
              }
              options={categories.map((category) => ({
                label: category.title,
                value: category.title,
              }))}
            />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Edit;
