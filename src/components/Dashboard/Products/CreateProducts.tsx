/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Flex, Form, Input, Rate, Select, Space, message } from "antd";
import { Image, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { useCreateProductsMutation } from "../../../redux/api/products/productsApi";
import TextArea from "antd/es/input/TextArea";
import { useGetCategoryQuery } from "../../../redux/api/category/categoryApi";
import { getBase } from "../../../utils/getBase";
import { FileType } from "../../../types/globalTypes";
import UploadButton from "../Shared/UploadButton";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// Component start from here

const CreateProducts: React.FC = () => {
  // getting redux mutations
  const [createProducts] = useCreateProductsMutation();

  // getting categories
  const { data: categories } = useGetCategoryQuery("");

  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [rating, setRating] = useState(5);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const updatedFileList = newFileList.map((file) => {
      if (file.status === "uploading" || file.status === "error") {
        return { ...file, status: "done" };
      }
      return file;
    });

    setFileList(updatedFileList as UploadFile[]);
  };

  // submitting data

  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("quantity", values.quantity);
    formData.append("rating", rating.toString());

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("image", fileList[0].originFileObj as Blob);
    } else {
      messageApi.open({
        type: "error",
        content: "Image file not found!",
      });
    }

    try {
      const product = await createProducts(formData);
      if (product.data.success) {
        messageApi.open({
          type: "success",
          content: "Product successfully created",
        });
        setFileList([]);
        onReset();
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error creating product",
      });
      console.error("Error creating product:", error);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleRating = (value: number) => {
    setRating(value);
  }

  return (
    <div className="w-full flex items-center justify-center mx-auto overflow-x-hidden ">
      {contextHolder}
      <Form
        className="w-full"
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <div className="mx-auto w-full mb-6 md:ml-20  flex justify-center">
          <Upload
            action={""}
            listType="picture-circle"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : <UploadButton />}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </div>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Select>
            {categories?.data?.map((category: any) => (
              <Select.Option value={category.name} key={category.name}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item name="rating" label="Rating" >
          <Flex gap="middle" vertical>
            <Flex gap="middle">
              <Rate defaultValue={rating} allowHalf onChange={handleRating} />
            </Flex>
          </Flex>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProducts;
