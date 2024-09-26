import {
  Form,
  Input,
  Button,
  Typography,
  Layout,
  Row,
  Col,
  message,
} from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useCreateOrderMutation } from "../../redux/api/order/orderApi";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Content } = Layout;

const Checkout: React.FC = () => {
  const cartSummary = useSelector((state: RootState) => state.cart);
  const [createOrder] = useCreateOrderMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  console.log(cartSummary);

  const onFinish = async (values: {
    name: string;
    phone: string;
    address: string;
  }) => {
    if (cartSummary.cartData.length <= 0) {
      messageApi.open({
        type: "error",
        content: "Failed to place order",
      });
      navigate("/cart");
    }

    const orderData = {
      grandTotal: cartSummary.grandTotal,
      data: cartSummary.cartData,
      name: values.name,
      phone: values.phone,
      address: values.address,
    };

    const orderResult = await createOrder(orderData);
    if (orderResult?.data?.success) {
      messageApi
        .open({
          type: "success",
          content: "Order placed successfully",
        })
        .then(() => {
          navigate("/");
        });
    }
  };

  return (
    <Layout>
      {contextHolder}
      <Content style={{ padding: "50px", backgroundColor: "#f0f2f5" }}>
        <Row justify="center">
          <Col xs={24} sm={18} md={12} lg={10} xl={8}>
            <Title level={2} style={{ textAlign: "center" }}>
              Cash on Delivery
            </Title>
            <Form
              layout="vertical"
              onFinish={onFinish}
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "5px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
              >
                <Input.TextArea placeholder="Enter your address" rows={3} />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Confirm Order
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Checkout;
