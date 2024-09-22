/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined } from "@ant-design/icons";
import { message, Popconfirm } from "antd";
import { useState } from "react";
import { ProductDataType } from "../../../types/dataType";
import { useDeleteProductsMutation } from "../../../redux/api/products/productsApi";

interface DeleteProductsProps {
  data: ProductDataType;
  refetch: () => Promise<any>;
}

const DeleteProducts = ({ data, refetch }: DeleteProductsProps) => {
  const [deleteProducts] = useDeleteProductsMutation();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const showPopconfirm = () => {
    setOpen(true);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleOk = async () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);

    const result = await deleteProducts(data._id);

    if (result.data.data.deletedCount > 0) {
      messageApi.open({
        type: "success",
        content: "Deleted successfully!",
      });
    }

    refetch();
    console.log(result.data);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <Popconfirm
      title={`Delete ${data.title}`}
      description="The action can not be undone"
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      {contextHolder}
      <a onClick={showPopconfirm}>
        <DeleteOutlined /> Delete
      </a>
    </Popconfirm>
  );
};

export default DeleteProducts;
