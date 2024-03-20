import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import api from "../../../api/api";

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const onFinish = async (values) => {
    try {
      const response = await api.post("/createCategory", values);
      message.success("Kategori başarıyla eklendi");
      fetchCategories(); 
      console.log(response.data);
    } catch (error) {
      message.error("Başarısız İşlem");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories(); 
  }, []);

  return (
    <ul className="categories flex md:flex-col gap-4">
      {categories.map((category, index) => (
        <li
          className="bg-green-700 px-6 py-8 text-white cursor-pointer transition-all hover:bg-pink-700 text-center"
          key={index}
        >
          <span>{category.title}</span>
        </li>
      ))}
      <li
        className="bg-green-700 px-6 py-8 text-white cursor-pointer transition-all hover:bg-pink-700 text-center"
        onClick={() => setIsModalOpen(true)}
      >
        <PlusOutlined />
      </li>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinish}>
         <Form.Item
            name="title"
            label="Kategori Ekle"
            rules={[
              { required: true, message: "Kategori Alanı Boş Geçilemez" },
            ]} 
          >
            <Input />
          </Form.Item>

          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Oluştur
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ul>
  );
};

export default Categories;
