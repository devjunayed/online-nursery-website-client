import { useLoaderData } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/products/productsApi";

const ProductDetailPage = () => {
  const { id } = useLoaderData() as {id: string};
  const { data } = useGetProductsQuery(`id=${id}`);

  const productDetail = data?.data[0];

  if (data?.length === 0 || data === undefined) {
    return (
      <div className="text-center text-green text-xl font-bold py-32">
        No Data found
      </div>
    );
  }

  

  return (
    <div>
      <h1>{productDetail?.title}</h1>
      <h1>{productDetail?.quantity}</h1>
      <h1>{productDetail?.description}</h1>
      <h1>{productDetail?.price}</h1>
      <h1>{productDetail?.category}</h1>
    </div>
  );
};

export default ProductDetailPage;
