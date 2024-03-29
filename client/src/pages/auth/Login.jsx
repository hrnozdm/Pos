import { Button, Form, Input, Carousel,Checkbox, message } from "antd";
import { Link} from "react-router-dom";
import AuthCarousel from "./AuthCarousel";
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate=useNavigate();
  const onFinishLogin = async (values) => {
    try {
      const response = await api.post("/login", values);
      const user = response?.data?.user;
  
      if (response?.status === 200) {
        localStorage.setItem(
          "posUser",
          JSON.stringify({
            username: user.username,
            email: user.email,
          })
        );
        message.success('Giriş Başarılı');
        navigate("/");
        
      } 
    } catch (error) {
      if (error.response.status == 404){
        message.error('Kullanıcı Bulunamadı');
      }

      if (error.response.status == 403) {
        message.error('Hatalı Parola');
      }
    }
  };
  
  return (
    <div className="h-screen">
    <div className="flex justify-between h-full">
      <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
        <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
        <Form layout="vertical" onFinish={onFinishLogin} initialValues={{remember:false}}>
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
          <Form.Item name={"remember"} valuePropName="checked">
            <div className="flex justify-between items-center">
              <Checkbox>Remember me</Checkbox>
              <Link>Forgot Password?</Link>
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              size="large"
            >
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
        <div className="flex justify-center absolute left-0 bottom-10 w-full">
          Henüz bir hesabınız yok mu?&nbsp;
          <Link to="/register" className="text-blue-600">
            Şimdi kaydol
          </Link>
        </div>
      </div>
      <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
        <div className="w-full h-full flex items-center">
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
    </div>
  )
}

export default Login
