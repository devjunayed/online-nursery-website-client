import { useLoaderData, useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/products/productsApi";
import { Button, Divider, Input, message, Rate } from "antd";
import { ArrowLeftOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useCreateCartMutation } from "../../redux/api/cart/cartApi";

const ProductDetailPage = () => {
  const { id } = useLoaderData() as { id: string };
  const { data, refetch } = useGetProductsQuery(`id=${id}`);
  const [orderAmount, setOrderAmount] = useState(1);
  const [createCart] = useCreateCartMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  if (!data?.data || data?.data.length === 0 || data?.data[0] === undefined) {
    return (
      <div className="text-center text-green text-xl font-bold py-32">
        No Data found
      </div>
    );
  }

  const handleIncrease = () => {
    setOrderAmount(orderAmount + 1);
  };
  const handleDecrease = () => {
    setOrderAmount(orderAmount - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderAmount(parseInt(e.target.value));
  };

  const handleAddToCart = async () => {
    const product = { ...data.data[0] };
    product.quantity = orderAmount.toString();

    const cartResult = await createCart(product);
    console.log(cartResult);

    if (cartResult?.data.success) {
      messageApi.open({
        type: "success",
        content: "Product added to the cart",
      });
      refetch();
    } else {
      messageApi.open({
        type: "error",
        content: cartResult.data.message,
      });
    }
  };

  const { title, description, quantity, price, category, image, rating } =
    data?.data[0] || {};

  return (
    <div>
      {contextHolder}
      <Button
        onClick={() => navigate(-1)}
        type="primary"
        className="mt-4 ml-2 flex gap-2"
      >
        <ArrowLeftOutlined /> Back
      </Button>

      {/*content  */}
      <div className="w-full my-6 min-h-screen">
        <div className="flex justify-between items-center gap-10 flex-col lg:flex-row">
          <div className="lg:w-1/2 w-full mx-auto ">
            <img src={image} className="w-full h-full rounded-lg " />
          </div>
          {/* texts */}
          <div className="lg:w-1/2 flex flex-col  ">
            <h1 className="text-2xl font-bold">{title}</h1>
            <h3 className="text-lg">{category}</h3>
            <Rate count={5} disabled defaultValue={Number(rating)} />
            <p className="py-6">{description}</p>

            <div className="font-semibold text-xl mr-10 flex justify-between">
              <p>&#2547; {price} </p>
              <p className="text-base"> {quantity} In Stock</p>
            </div>
            <Divider />
            <div className="flex-col flex items-center mt-4 justify-between lg:mx-20 gap-10 ">
              <div className="flex gap-4 justify-center items-center">
                <Button onClick={handleDecrease}>-</Button>
                <Input
                  type="number"
                  className="w-24 text-center"
                  defaultValue={orderAmount}
                  value={orderAmount}
                  onChange={handleChange}
                />
                <Button onClick={handleIncrease}>+</Button>
              </div>
              <Button onClick={handleAddToCart} type="primary" className="">
                Add to cart <ShoppingCartOutlined />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
