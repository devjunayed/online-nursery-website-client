import { Button, message } from "antd";
import {
  useDeleteCartMutation,
  useGetCartQuery,
} from "../../redux/api/cart/cartApi";
import { ProductDataType } from "../../types/dataType";
import { useDispatch } from "react-redux";
import { setCartSummary } from "../../redux/features/cartSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { data: cartData, refetch } = useGetCartQuery("");
  const [deleteCart] = useDeleteCartMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const [grandTotal, setGrandTotal] = useState();



  const handleDelete = async (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    const deleteResult = await deleteCart(id);

    if (deleteResult?.data.success) {
      messageApi.open({
        type: "success",
        content: "Item removed from the cart",
      });
      refetch();
    } else {
      messageApi.open({
        type: "error",
        content: deleteResult.data.message,
      });
    }
  };

  

  useEffect(() => {
    if (cartData?.data) {
      const grandTotal = cartData.data.reduce(
        (acc: number, { quantity, price }: ProductDataType) =>
          acc + Number(quantity) * Number(price),
        0
      );
  
      setGrandTotal(grandTotal);
      dispatch(setCartSummary({ cartData: cartData.data, grandTotal }));
    }
  }, [cartData, dispatch]);
  

  if (cartData?.data?.length <= 0 || cartData === undefined) {
    return (
      <div className="mx-auto text-center my-20 text-green text-xl">
        No Data Found
      </div>
    );
  }

  return (
    <div>
      {contextHolder}
      <div className="mb-4">
        <div className="flex justify-between gap-4 my-4">
          <div className="flex justify-end   bg-zinc-100  px-4 py-2 rounded">
            Grand Total: {grandTotal} &#2547;
          </div>
          <span className="bg-zinc-100  px-4 py-2 rounded">
            Total Product: {cartData.data.length}
          </span>
        </div>
        <div className="">
          <div className="md:flex hidden text-center justify-center bg-gray-100 py-1">
            <span>Image</span>
            <span className="w-5/12">Title</span>
            <span className="w-1/12">Quantity</span>
            <span className="w-2/12">Price</span>
            <span className="w-2/12">Total Price</span>
            <span className="w-1/12">Actions</span>
          </div>
          <div className="md:block justify-center flex flex-wrap">
            {cartData?.data.map((cart: ProductDataType, index: number) => {
              const { _id, title, image, quantity, price, productId } = cart;
              return (
                <>
                  <Link
                    to={`/products/${productId}`}
                    className="md:flex w-full shadow-md p-4 hidden justify-center text-center items-center gap-4"
                    key={_id}
                  >
                    <img className="size-10 " src={image} alt={title} />
                    <h2 className="w-5/12">{title}</h2>
                    <h4 className="w-1/12">{quantity}</h4>
                    <h4 className="w-2/12">{price} &#2547;</h4>
                    <h4 className="w-2/12">
                      {Number(price) * Number(quantity)} &#2547;
                    </h4>
                    <Button
                      onClick={(e) => handleDelete(e, _id)}
                      className="w-1/12 text-red-600 font-Logo"
                    >
                      x
                    </Button>
                  </Link>

                  <div
                    className="mx-auto m-6 relative md:hidden shadow-xl p-6 w-[200px]"
                    key={`${_id}${index}`}
                  >
                    <Link to={`/products/${productId}`}>
                      <div className=" absolute top-0 right-0 font-Logo">
                        <Button onClick={(e) => handleDelete(e, _id)}>X</Button>
                      </div>
                      <img className="w-9/12 mx-auto" src={image} alt={title} />
                      <h3 className="font-bold text-xl">{title}</h3>

                      <h3>
                        {quantity} x {price} &#2547; ={" "}
                        {Number(quantity) * Number(price)} &#2547;
                      </h3>
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center items-center mt-10">
          <Link to="/checkout">
            <Button type="primary">Proceed To Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
