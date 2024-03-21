import React from "react";
import { Modal, Form, Input,Button} from "antd";

const Add = ({isModalOpen,setIsModalOpen}) => {
  return (
    <div>
      <Modal
        title="Yeni Ürün Ekle"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical">
          <Form.Item
           label="Ürün Adı"
           rules={[{required:true,message:'Ürün Adı Boş Geçilemez'}]}
           name="title"
          >
            <Input placeholder="Ürün adı giriniz"/>
          </Form.Item>
          <Form.Item
           label="Ürün Görseli"
           rules={[{required:true,message:'Ürün Görseli Alanı Boş Geçilemez'}]}
           name="img"
          >
            <Input placeholder="Ürün görseli giriniz"/>
          </Form.Item>
          <Form.Item
           label="Ürün Fiyatı"
           rules={[{required:true,message:'Ürün Fiyatı Alanı Boş Geçilemez'}]}
           name="price"
          >
            <Input placeholder="Ürün fiyatı giriniz"/>
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
