import { Button } from "antd";
import { useGetCartQuery } from "../../redux/api/cart/cartApi";
import { ProductDataType } from "../../types/dataType";

const CartPage = () => {
  const { data: cartData } = useGetCartQuery("");

  if (cartData?.data?.length <= 0 || cartData === undefined) {
    return (
      <div className="mx-auto text-center my-20 text-green text-xl">
        No Data Found
      </div>
    );
  }

  const grandTotal = cartData.data.reduce(
    (acc: number, { quantity, price }: ProductDataType) =>
      acc + Number(quantity) * Number(price),
    0
  );

  return (
    <div>
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
            {cartData?.data.map(
              (
                { _id, title, image, quantity, price }: ProductDataType,
                index: number
              ) => (
                <>
                  <div
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
                    <h4 className="w-1/12 text-red-600 font-Logo">x</h4>
                  </div>

                  <div
                    className="mx-auto relative md:hidden shadow-xl p-6 w-[200px]"
                    key={`${_id}${index}`}
                  >
                    <button className="text-red-600 absolute top-4 right-4 font-Logo">
                      X
                    </button>
                    <img className="w-9/12 mx-auto" src={image} alt={title} />
                    <h3 className="font-bold text-xl">{title}</h3>

                    <h3>
                      {quantity} x {price} &#2547; ={" "}
                      {Number(quantity) * Number(price)} &#2547;
                    </h3>
                  </div>
                </>
              )
            )}
          </div>
        </div>
        <div className="flex justify-center items-center mt-10"><Button type="primary">Proceed To Checkout</Button></div>
      </div>
    </div>
  );
};

export default CartPage;
