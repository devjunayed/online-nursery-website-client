import { Button, Image, message, Rate } from "antd";
import { ProductDataType } from "../../../types/dataType";
import { Link } from "react-router-dom";
import { useCreateCartMutation } from "../../../redux/api/cart/cartApi";

const ProductCard = (productData: ProductDataType) => {
  const [createCart] = useCreateCartMutation();
  const [messageApi, contextHolder] = message.useMessage();


  const { _id, title, image, quantity, category, rating, price } = productData;

  const handleAddToCart = async () => {
    const product = {...productData}
    product.quantity = '1';


    const cartResult = await createCart(product);
    console.log(cartResult);

    if(cartResult?.data.success){
        messageApi.open({
            type: 'success',
            content: "Product added to the cart"
        })
    }else{
        messageApi.open({
            type: 'error',
            content: cartResult.data.message
        })
    }
  }

  return (
    <div className="w-full ">
      {contextHolder}
      <div className="card-container">
        <div className="img-badge">
          <Image height={200} width="100%" src={image} alt={title} />
          <div className="card-badge-container">
            <div className="card-badge-wrapper">
              <div className="card-badge  font-semibold">
                {price} <span className="font-bold">&#2547;</span> / {category}
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <h5
            className={`-mt-2 text-xs mb-2 flex justify-end ${
              Number(quantity) == 0 && "text-red-700"
            }`}
          >
            {quantity} in stock
          </h5>
          <h2 className="font-bold text-xl">{title}</h2>
          <Rate
            defaultValue={Number(rating)}
            allowClear={false}
            allowHalf
            disabled
          />
          <div className="flex gap-4 items-center justify-center mt-4">
            <Button type="primary">
              <Link to={`/products/${_id}`}>View Deatils</Link>
            </Button>
            <Button onClick={handleAddToCart} type="dashed">Add to Cart</Button>
          </div>
        </div>
      </div>
      {/* <Image height={200} src={image} alt={title} />
      <h3>{title}</h3>
      <span>{price} &#2547;</span> */}
    </div>
  );
};

export default ProductCard;
