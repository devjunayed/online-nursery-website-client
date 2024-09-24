/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Form, Input, Space, message } from "antd";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useCreateCategoryMutation } from "../../../redux/api/category/categoryApi";
import { getBase } from "../../../utils/getBase";
import UploadButton from "../Shared/UploadButton";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

// Component starts from here
const CreateCategory: React.FC = () => {
  const [createCategory] = useCreateCategoryMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // handle preview uploaded image
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // handle change of uploading image
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const updatedFileList = newFileList.map((file) => {
      if (file.status === "uploading" || file.status === "error") {
        return { ...file, status: "done" };
      }
      return file;
    });

    setFileList(updatedFileList as UploadFile[]);
  };

  const onFinish = async (values: any) => {
    console.log("Form values:", values.name);
    const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;
    const formData = new FormData();
  
    // Appending text data to formData
    formData.append("name", values.name);
    formData.append("description", values.description);
  
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
          const categoryData = {
            name: values.name,
            description: values.description,
            image: data.data.url, // Using the uploaded image URL
          };
  
          console.log("Sending categoryData to the server:", categoryData);
  
          // Send data to your server
          const category = await createCategory(categoryData);
          if (category.data.success) {
            messageApi.open({
              type: "success",
              content: "Category successfully created",
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
  
  // Reset form function
  const onReset = () => {
    form.resetFields();
    setFileList([]);
    setPreviewImage("");
  };
  

  return (
    <div className="w-full flex items-center justify-center mx-auto overflow-x-hidden">
      {contextHolder}
      <Form
        {...layout}
        className="w-full"
        form={form}
        onFinish={onFinish}
        name="control-hooks"
        style={{ maxWidth: 600 }}
      >
        <div className="mx-auto w-full mb-6 md:ml-20  flex justify-center">
          <Upload
            action={""}
            listType="picture-circle"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={() => false} // Prevent default upload
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
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Button  type="primary" htmlType="submit">
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

export default CreateCategory;
