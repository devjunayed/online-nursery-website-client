/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select } from "antd";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { ProductDataType } from "../../../types/dataType";
import { getBase } from "../../../utils/getBase";
import UploadButton from "../Shared/UploadButton";
import { useUpdateProductsMutation } from "../../../redux/api/products/productsApi";
import TextArea from "antd/es/input/TextArea";
import { useGetCategoryQuery } from "../../../redux/api/category/categoryApi";

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
  const handleOk = async () => {
    // getting name and description from the form
    const values = await form.validateFields();

    // creating form data
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("category", values.category);

    // checking if image available or in url
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("image", fileList[0].originFileObj as Blob);
    } else if (fileList.length === 0) {
      messageApi.open({
        type: "error",
        content: "Image file not found!",
      });
    } else if (!fileList[0].originFileObj) {
      formData.append("image", data.image);
    }

    try {
      const id = data._id;
      const category = await updateProducts({ id, formData });
      if (category.data.success) {
        messageApi.open({
          type: "success",
          content: "Products updated successfully",
        });
        setFileList([]);
        onReset();
        refetch();
        setIsModalVisible(false);
      }
      console.log(category);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error updating category",
      });
      console.error("Error updating category:", error);
    }
  };

  return (
    <>
      <a onClick={showModal}>
        <EditOutlined /> Edit
      </a>

      <Modal
        title="Edit Products"
        open={isModalVisible}
        onOk={handleOk}
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
            onClick={handleOk}
          >
            Save
          </Button>,
        ]}
      >
        <div className="w-full mx-auto ">
          {contextHolder}
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            style={{ maxWidth: 600 }}
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
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <TextArea />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
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
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default EditProducts;
