/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Flex, Form, Input, Rate, Select, Space, message } from "antd";
import { Image, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { useCreateProductsMutation } from "../../../redux/api/products/productsApi";
import TextArea from "antd/es/input/TextArea";
import { getBase } from "../../../utils/getBase";
import { FileType } from "../../../types/globalTypes";
import UploadButton from "../Shared/UploadButton";
import { useGetCategoryQuery } from "../../../redux/api/category/categoryApi";

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
    const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;

    // Check if image is uploaded or not
    if (fileList.length > 0 && fileList[0].originFileObj) {
      const imageFile = fileList[0].originFileObj;

      // Create separate formData for image upload
      const imageData = new FormData();
      imageData.append("image", imageFile);

      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
          {
            method: "POST",
            body: imageData,
          }
        );

        const data = await response.json();
        if (data.success) {
          // Now that the image is uploaded, create a payload to send to the server
          const productData = {
            image: data.data.url, // Using the uploaded image URL
            title: values.title,
            price: values.price,
            quantity: values.quantity,
            category: values.category,
            description: values.description,
            rating
          };

          console.log("Sending productData to the server:", productData);

          // Send data to your server
          const category = await createProducts(productData);
          if (category.data.success) {
            messageApi.open({
              type: "success",
              content: "Product successfully created",
            });
            setFileList([]);
            onReset();
          } else {
            messageApi.open({
              type: "error",
              content: category.data.message,
            });
          }
        } else {
          console.error("Upload failed:", data);
          messageApi.open({
            type: "error",
            content: "Error uploading image!",
          });
          return;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        messageApi.open({
          type: "error",
          content: "Error uploading image!",
        });
        return;
      }
    } else {
      messageApi.open({
        type: "error",
        content: "Image file not found!",
      });
      return;
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleRating = (value: number) => {
    setRating(value);
  };

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
          label="Product"
          name="category"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Select>
            {categories?.map((category: any) => (
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
        <Form.Item name="rating" label="Rating">
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
