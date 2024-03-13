import { Button, Card, Form, Input, Modal, Select } from "antd";
import React from "react";

const onFinish=(value)=>{
    console.log("Form verileri",value);
}

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <>
      <Modal
        title="Fatura Oluştur"
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form layout={"vertical"} onFinish={onFinish}>
          <Form.Item
            label="Müşteri Adı"
            rules={[
              { required: true, message: "Müşteri Adını Girmek Zorundasınız" },
            ]}
            name={"customerName"}
          >
            <Input placeholder="Müşteri Adı Giriniz" />
          </Form.Item>

          <Form.Item
            label="Tel No"
            rules={[{ required: true, message: "Telefon Numarası Giriniz" }]}
            name={"phoneNumber"}
          >
            <Input placeholder="Telefon Numarası Giriniz" maxLength={11}/>
          </Form.Item>

          <Form.Item
            label="Ödeme Yöntemi"
            rules={[
              {
                required: true,
                message: "Ödeme Yöntemini Girmek Zorundasınız",
              },
            ]}
            name={"paymentMode"}
          >
            <Select placeholder="Ödeme Yöntemi Seçiniz">
              <Select.Option value="Nakit">Nakit</Select.Option>
              <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
            </Select>
          </Form.Item>

          <Card className="w-100">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>549₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV Toplam %8</span>
              <span className="text-red-600">+43.92₺</span>
            </div>
            <div className="flex justify-between">
              <b>Toplam</b>
              <b>592.92₺</b>
            </div>
            <div className="flex  justify-end">
              <Button
                type="primary"
                className="mt-4"
                size="middle"
                htmlType="submit"
              >
                Sipariş Oluştur
              </Button>
            </div>
          </Card>
        </Form>
      </Modal>
    </>
  );
};

export default CreateBill;
