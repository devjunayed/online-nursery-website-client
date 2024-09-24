import { Button, Flex, Form, Input, Layout, Rate, Select, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useGetCategoryQuery } from "../../../redux/api/category/categoryApi";
import { useState } from "react";
import { CategoryDataType } from "../../Dashboard/Category/ManageCategory";

const Products = () => {
  const { Search } = Input;
  const [rating, setRating] = useState(5);

  const {data: categories} = useGetCategoryQuery("");
  const onSearch = (value: string) => {
    console.log(value);
  };

  const onFinish = () => {

  }

  const handleRating = () => {

  }

  const onReset = () => {

  }

  return (
    <div>
      <div className="w-1/2 mx-auto">
        <Search
          placeholder="input search text"
          allowClear={true}
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </div>
      <Layout>
        <Sider theme="light">
          <div>
            <Form
              className="w-full"
              name="control-hooks"
              onFinish={onFinish}
              style={{ maxWidth: 600 }}
            >
                <div className="text-xl mb-10 text-bold">Filter by:</div>
             

             
              

              <Form.Item
                label="Category"
                name="category"
              >
                <Select>
                  {categories?.map((category: CategoryDataType) => (
                    <Select.Option value={category.name} key={category.name}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
          
              <Form.Item name="rating" label="Rating">
                <Flex gap="middle" vertical>
                  <Flex gap="middle">
                    <Rate
                      defaultValue={rating}
                      allowHalf
                      onChange={handleRating}
                    />
                  </Flex>
                </Flex>
              </Form.Item>
              <Form.Item >
                <Space className="justify-end flex">
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                 
                </Space>
              </Form.Item>
            </Form>
          </div>
        </Sider>
        <Content>main</Content>
      </Layout>
    </div>
  );
};

export default Products;
