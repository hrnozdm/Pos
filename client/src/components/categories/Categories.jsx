import React, { useState, useEffect } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Table, message } from "antd";
import api from "../../../api/api";

const Categories = ({ setFilteredCategory,products,setProducts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editingRow, setEditingRow] = useState({});
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      render: (_, record) => {
        if (record._id === editingRow._id) {
          return (
            <Form.Item name="title">
              <Input defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return <p>{record.title}</p>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div>
            <Button
              type="link"
              onClick={() => setEditingRow({ ...record })} 
            >
              Düzenle
            </Button>
            <Button type="text" htmlType="submit">
              Kaydet
            </Button>
            <Button
              type="text"
              danger
              onClick={() => onFinishCategoryDelete(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  const filterCat = (title) => {
    const filteredProducts = products.filter((product) => product.category === title);
    setFilteredCategory(filteredProducts);
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/getAllCategory");
      console.log(response.data);
      setCategories(response.data.categories);
      setFilteredCategory([]);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishCategoryCreate = async (values) => {
    try {
      const response = await api.post("/createCategory", values);
      message.success("Kategori başarıyla eklendi");
      form.resetFields();
      fetchCategories();
      setIsModalOpen(false);
    } catch (error) {
      message.error("Başarısız İşlem");
      console.log(error);
    }
  };

  const onFinishCategoryUpdate = async (values) => {
    try {
      const response = await api.put("/updateCategory", {
        ...values,
        categoryId: editingRow._id,
      });
      console.log(response.data);
      message.success("Kategori Düzenlendi");
      fetchCategories();
      form.resetFields();
      setIsModalOpen2(false);
      setEditingRow({});
    } catch (error) {
      message.error("İşlem Başarısız");
    }
  };

  const onFinishCategoryDelete = async (categoryId) => {
    try {
      const response = await api.delete("/deleteCategory", {
        data: { categoryId },
      });
      console.log(response.data);
      message.success("Kategori Silindi");
      fetchCategories();
    } catch (error) {
      message.error("İşlem Başarısız");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ul className="categories flex md:flex-col gap-4 mb-5">
        <li
        className="bg-purple-700 px-6 py-8 text-white cursor-pointer transition-all text-center hover:opacity-90"
        onClick={fetchCategories}
      >
        <span>Tümü</span>
      </li>
      {categories.map((category, index) => (
        <li
          className="bg-green-700 px-6 py-8 text-white cursor-pointer transition-all hover:bg-pink-700 text-center"
          key={index}
          onClick={()=>filterCat(category.title)}
        >
          <span>{category.title}</span>
        </li>
      ))}
      <li
        className="bg-purple-700 px-6 py-8 text-white cursor-pointer transition-all text-center hover:opacity-90"
        onClick={() => setIsModalOpen(true)}
      >
        <PlusOutlined />
      </li>

      <li
        className="bg-orange-800 px-6 py-8 text-white cursor-pointer transition-all text-center hover:opacity-90"
        onClick={() => setIsModalOpen2(true)}
      >
        <EditOutlined />
      </li>

      <Modal
        title="Kategori Ekle"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
      >
        <Form form={form} layout="vertical" onFinish={onFinishCategoryCreate}>
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

      <Modal
        title="Kategori İşlemleri"
        open={isModalOpen2}
        onCancel={() => setIsModalOpen2(false)}
        footer={false}
        
      >
        <Form form={form} onFinish={onFinishCategoryUpdate}>
          <Table
            bordered
            dataSource={categories}
            columns={columns}
            rowKey={"_id"}
          />
        </Form>
      </Modal>
    </ul>
  );
};

export default Categories;
