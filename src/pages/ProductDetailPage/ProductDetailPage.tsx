import { useLoaderData } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/products/productsApi";
import { Button, Divider, Input, Rate } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";

const ProductDetailPage = () => {
  const { id } = useLoaderData() as { id: string };
  const { data } = useGetProductsQuery(`id=${id}`);
  const [orderAmount, setOrderAmount] = useState(1);


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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setOrderAmount(parseInt(e.target.value));
  };

  const { title, description, quantity, price, category, image, rating } =
    data?.data[0] || {};

  return (
    <div>
      <div className="hero  min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <img src={image} className="w-full rounded-lg " />
          </div>
          <div className="flex flex-col lg:w-1/2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <h3 className="text-lg">{category}</h3>
            <Rate count={5} defaultValue={Number(rating)} />
            <p className="py-6">{description}</p>

            <div className="font-semibold text-xl flex justify-between">
              <p>&#2547; {price} </p>
              <p className="text-base"> {quantity} In Stock</p>
            </div>
            <Divider />
            <div className="flex items-center mt-4 justify-between mx-20 gap-10 ">
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
              <Button type="primary" className="">
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
