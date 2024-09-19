/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Image, Space, Table } from "antd";
import { useGetCategoryQuery } from "../../../redux/api/category/categoryApi";

const { Column } = Table;

interface DataType {
  key: React.Key;
  image?: string;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
}



const ManageCategory: React.FC = () => {
  const { data = [], isLoading, isError } = useGetCategoryQuery('');
  console.log(data.data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError ) {
    return <div>Error loading categories</div>;
  }
  if(!data?.data){
    return <div>kocu</div>
  }
  
  // return <div>kocu</div>
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

      <Column title="Category Description" dataIndex="description" key="description" />
     
      <Column
        title="Action"
        key="action"
        render={(_: any, record: DataType) => (
          <Space size="middle">
            <a>Invite {record.lastName}</a>
            <a>Delete</a>
          </Space>
        )}
      />
    </Table>
  );
};
export default ManageCategory;
