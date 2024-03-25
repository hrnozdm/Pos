import { Button, Card, Form, Input, Modal, Select, message } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import api from "../../../api/api";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const {total,tax,cartItems} =useSelector((state)=>state.cart);
  const [form] = Form.useForm();
  const createBill=async (values)=>{
    try {
      const response=await api.post('createBill',{
        ...values,
        cartItems:cartItems,
        subTotal:total,
        tax:Number(tax*total/100),
        totalAmount:Number(total+(tax*total/100))
      });
      console.log(response.data);
      message.success("Fatura Kaydı Başarılı");
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.log(error);
      message.error("Başarısız İşlem");
    }
  }
  return (
    <>
      <Modal
        title="Fatura Oluştur"
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form layout={"vertical"} onFinish={createBill} form={form}>
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
            name={"customerPhoneNumber"}
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
              <span>{total}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV Toplam %{tax}</span>
              <span className="text-red-600">+{(total * tax / 100)}₺</span>
            </div>
            <div className="flex justify-between">
              <b>Toplam</b>
              <b>{total + (total*tax/100)}₺</b>
            </div>
            <div className="flex  justify-end">
              <Button
                type="primary"
                className="mt-4"
                size="middle"
                htmlType="submit"
                disabled={cartItems.length == 0 ? true : false}
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
