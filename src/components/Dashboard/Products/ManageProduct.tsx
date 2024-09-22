/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Image, Space, Table } from "antd";
import { useGetProductsQuery } from "../../../redux/api/products/productsApi"; 
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";
import { ProductDataType } from "../../../types/dataType";

const { Column } = Table;



const ManageProduct: React.FC = () => {
  const { data = [], isLoading, isError, refetch } = useGetProductsQuery("");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading categories</div>;
  }

  return (
    <Table dataSource={data?.data} className="overflow-x-auto">
      <Column
        title="No."
        key="serial"
        render={(_, __, index) => <>{index + 1}</>}
      />
      <Column
        title="Image"
        dataIndex="image"
        key="image"
        render={(image) => <Image src={image} alt="Product" width={50} />}
      />

      <Column
        title="Product Title"
        dataIndex="title" 
        key="title"
      />
      <Column
        title="Product Price"
        dataIndex="price"
        key="price"
      />
      <Column
        title="Product Category"
        dataIndex="category"
        key="category"
      />

      <Column
        title="Action"
        key="action"
        render={(_: any, record: ProductDataType) => {
          return (
            <Space size="middle">
              <EditProduct data={record} refetch={refetch} />
              <DeleteProduct refetch={refetch} data={record} />
            </Space>
          );
        }}
      />
    </Table>
  );
};
export default ManageProduct;
