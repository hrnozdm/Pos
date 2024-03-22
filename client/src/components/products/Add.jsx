import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import api from "../../../api/api";

const Add = ({ isModalOpen, setIsModalOpen,setproducts,products }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/getAllCategory");
      console.log(response.data);
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishCreateProduct = async (values) => {
    try {
      const response = await api.post('/createProduct', values);
      console.log(response.data);
      setproducts([...products,response.data.newProduct])
      setIsModalOpen(false);
      message.success("Ürün Kaydı Başarılı");
    } catch (error) {
      message.error("Başarısız İşlem");
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <Modal
        title="Yeni Ürün Ekle"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinishCreateProduct}>
          <Form.Item
            label="Ürün Adı"
            rules={[{ required: true, message: "Ürün Adı Boş Geçilemez" }]}
            name="title"
          >
            <Input placeholder="Ürün adı giriniz" />
          </Form.Item>
          <Form.Item
            label="Ürün Görseli"
            rules={[
              { required: true, message: "Ürün Görseli Alanı Boş Geçilemez" },
            ]}
            name="img"
          >
            <Input placeholder="Ürün görseli giriniz" />
          </Form.Item>
          <Form.Item
            label="Ürün Fiyatı"
            rules={[
              { required: true, message: "Ürün Fiyatı Alanı Boş Geçilemez" },
            ]}
            name="price"
          >
            <Input placeholder="Ürün fiyatı giriniz" />
          </Form.Item>

          <Form.Item
            label="Kategori"
            rules={[
              { required: true, message: "Ürün Kategori Alanı Boş Geçilemez" },
            ]}
            name="category"
          >
            <Select
              placeholder="Kategori seçiniz"
              optionFilterProp="children"
              options={categories.map((category) => ({
                label: category.title,
                value: category.title,
              }))}
            />
          </Form.Item>

          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Oluştur
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Add;
