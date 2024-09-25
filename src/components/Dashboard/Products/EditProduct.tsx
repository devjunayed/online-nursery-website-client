/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select } from "antd";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { ProductDataType } from "../../../types/dataType";
import UploadButton from "../Shared/UploadButton";
import { useUpdateProductsMutation } from "../../../redux/api/products/productsApi";
import TextArea from "antd/es/input/TextArea";
import { useGetCategoryQuery } from "../../../redux/api/category/categoryApi";
import { getBase } from "../../../utils/getBase";

interface EditProductsProps {
  data: ProductDataType;
  refetch: () => Promise<any>;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const EditProducts = ({ data, refetch }: EditProductsProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [updateProducts, { isLoading }] = useUpdateProductsMutation();
  const { data: categories } = useGetCategoryQuery("");

  const [messageApi, contextHolder] = message.useMessage();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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

  const onReset = () => {
    form.resetFields();
    setFileList([]);
  };

  // Open modal
  const showModal = () => {
    // setting old value to the form
    form.setFieldsValue({
      title: data.title,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      category: data.category,
    });

    // setting old image to the upload
    setFileList([
      {
        uid: "-1",
        name: "category_image",
        status: "done",
        url: data.image,
      },
    ]);
    // opening modal
    setIsModalVisible(true);
  };

  // Close modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle form submission
  const handleOk = async (values: any) => {
    try {
      const productData = {
        image: data.image, // Using the uploaded image URL
        title: values.title,
        price: values.price,
        quantity: values.quantity,
        category: values.category,
        description: values.description,
      };

      const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;

      // Checking if a new image is uploaded
      if (fileList.length > 0 && fileList[0].originFileObj) {
        const formData = new FormData();
        formData.append("image", fileList[0].originFileObj as Blob);
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const uploadedImageData = await response.json();

        if (uploadedImageData.success) {
          productData.image = uploadedImageData.data.url;
        } else {
          messageApi.open({
            type: "error",
            content: "Error uploading image!",
          });
          return;
        }
      }

      // Debugging output: check what data is being sent
      console.log("Category Data to be sent:", productData);

      // Sending updated data to the server
      const id = data._id;
      const response = await updateProducts({ id, productData });

      console.log("Backend response:", response); // Debugging network response

      if (response?.data?.success) {
        messageApi.open({
          type: "success",
          content: "Category successfully updated",
        });
        refetch();
        setIsModalVisible(false);
      } else {
        messageApi.open({
          type: "error",
          content: response?.data?.message || "Error updating category",
        });
      }
    } catch (error) {
      console.error("Error updating category:", error);
      messageApi.open({
        type: "error",
        content: "Error updating category!",
      });
    }
  };
  return (
    <>
      <a onClick={showModal}>
        <EditOutlined /> Edit
      </a>
      <div className="w-full mx-auto ">
        {contextHolder}
        <Form
          {...layout}
          form={form}
          onFinish={handleOk}
          name="control-hooks"
          style={{ maxWidth: 600 }}
        >
          <Modal
            title="Edit Products"
            open={isModalVisible}
            onOk={() => form.submit()}
            confirmLoading={isLoading}
            onCancel={handleCancel}
            okText="Save"
            cancelText="Cancel"
            footer={[
              <Button key="reset" onClick={onReset}>
                Reset
              </Button>,
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={isLoading}
                onClick={() => form.submit()}
              >
                Save
              </Button>,
            ]}
          >
            <div className="mx-auto w-full mb-6   flex justify-center">
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
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </div>
            <Form.Item name="title" label="Title">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <TextArea />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="quantity" label="Quantity">
              <Input type="number" />
            </Form.Item>

            <Form.Item label="Category" name="category">
              <Select>
                {categories?.map((category: any) => (
                  <Select.Option value={category.name} key={category.name}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Modal>
        </Form>
      </div>
    </>
  );
};

export default EditProducts;
