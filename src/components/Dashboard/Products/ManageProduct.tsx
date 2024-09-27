/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Flex, Image, Pagination, Select, Space, Table } from "antd";
import { useGetProductsQuery } from "../../../redux/api/products/productsApi";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";
import { ProductDataType } from "../../../types/dataType";

const { Column } = Table;

const ManageProduct: React.FC = () => {
  const [queryUrl, setQueryUrl] = useState<string>("");
  const {
    data: productsData,
    refetch: refetchProducts,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery(queryUrl);
  const products = productsData?.data || [];
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const totalCount = productsData?.length || 0;

  console.log(products);

  const updateQueryUrl = () => {
    const queryParams = new URLSearchParams();
    queryParams.append("page", (currentPage - 1).toString());
    queryParams.append("limit", limit.toString());

    const newQuery = queryParams.toString();
    setQueryUrl(newQuery);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (value: number) => {
    setLimit(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    updateQueryUrl();
  }, [currentPage, limit]);

  useEffect(() => {
    if (queryUrl) {
      refetchProducts();
    }
  }, [queryUrl, refetchProducts]);
  const perPageOptions = [5, 10, 20, 50];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log(error);
    return <div>Error loading products</div>;
  }
  return (
    <>
      <Table dataSource={products} pagination={false}className="overflow-x-auto">
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

        <Column title="Product Title" dataIndex="title" key="title" />
        <Column title="Product Price" dataIndex="price" key="price" />
        <Column title="Product Category" dataIndex="category" key="category" />

        <Column
          title="Action"
          key="action"
          render={(_: any, record: ProductDataType) => {
            return (
              <Space size="middle">
                <EditProduct data={record} refetch={refetchProducts} />
                <DeleteProduct refetch={refetchProducts} data={record} />
              </Space>
            );
          }}
        />
      </Table>
      <Flex justify="center" align="middle" className="flex-wrap gap-4 mb-4">
        <Pagination
          current={currentPage}
          pageSize={limit}
          total={totalCount}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
        <Select
          defaultValue={limit}
          onChange={handleLimitChange}
          style={{ width: "120px" }}
        >
          {perPageOptions.map((option) => (
            <Select.Option key={option} value={option}>
              {option} per page
            </Select.Option>
          ))}
        </Select>
      </Flex>
    </>
  );
};
export default ManageProduct;
