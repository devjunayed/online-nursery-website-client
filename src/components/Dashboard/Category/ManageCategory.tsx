/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Image, Space, Table } from "antd";
import { useGetCategoryQuery } from "../../../redux/api/category/categoryApi";
import DeleteCategory from "./DeleteCategory";
import EditCategory from "./EditCategory";

const { Column } = Table;

export interface CategoryDataType {
  _id: string;
  image: string;
  name: string;
  description: string;
}

const ManageCategory: React.FC = () => {
  const { data = [], isLoading, isError, refetch } = useGetCategoryQuery("");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading categories</div>;
  }

  return (
    <Table dataSource={data?.data}>
      <Column
        title="No."
        key="serial"
        render={(_, __, index) => <>{index + 1}</>}
      />
      <Column
        title="Image"
        dataIndex="image"
        key="image"
        render={(image) => <Image src={image} alt="Category" width={50} />}
      />
      <Column title="Category Name" dataIndex="name" key="name" />

      <Column
        title="Category Description"
        dataIndex="description"
        key="description"
      />

      <Column
        title="Action"
        key="action"
        render={(_: any, record: CategoryDataType) => {
          return (
            <Space size="middle">
              <EditCategory data={record} refetch={refetch} />
              <DeleteCategory refetch={refetch} data={record} />
            </Space>
          );
        }}
      />
    </Table>
  );
};
export default ManageCategory;
