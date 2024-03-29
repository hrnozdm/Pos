import { Button, Form, Input, Carousel, message } from "antd";
import { Link } from "react-router-dom";
import AuthCarousel from "./AuthCarousel";
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const onFinishCreateUser = async (values) => {
    setLoading(true)
    try {
      const response = await api.post("/register", values);
      console.log(response.data);
      if (response.status == 201) {
        message.success("Kullanıcı Kaydı Başarılı");
        setTimeout(() => {
          navigate('/login');
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      message.error('Başarısız İşlem');
      setLoading(false);
    }
  };
  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
          <Form layout="vertical" onFinish={onFinishCreateUser}>
            <Form.Item
              label="Kullanıcı Adı"
              name={"username"}
              rules={[
                {
                  required: true,
                  message: "Kullanıcı Adı Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "E-mail Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Şifre Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Şifre Tekrar"
              name={"passwordAgain"}
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Şifre Tekrar Alanı Boş Bırakılamaz!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Şifreler Aynı Olmak Zorunda!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Kaydol
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Bir hesabınız var mı?&nbsp;
            <Link to="/login" className="text-blue-600">
              Şimdi giriş yap
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 min-w-[800px] bg-[#6c63ff]">
          <div className="w-full">
            <Carousel className="!h-full px-6" autoplay>
              <AuthCarousel
                img="/images/responsive.svg"
                title="Responsive"
                desc="Tüm Cihaz Boyutlarıyla Uyumluluk"
              />
              <AuthCarousel
                img="/images/statistic.svg"
                title="İstatistikler"
                desc="Geniş Tutulan İstatistikler"
              />
              <AuthCarousel
                img="/images/customer.svg"
                title="Müşteri Memnuniyeti"
                desc="Deneyim Sonunda Üründen Memnun Müşteriler"
              />
              <AuthCarousel
                img="/images/admin.svg"
                title="Yönetici Paneli"
                desc="Tek Yerden Yönetim"
              />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
