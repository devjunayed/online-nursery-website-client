/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined } from "@ant-design/icons";
import { message, Popconfirm } from "antd";
import { useDeleteCategoryMutation } from "../../../redux/api/category/categoryApi";
import { useState } from "react";
import { CategoryDataType } from "./ManageCategory";

interface DeleteCategoryProps {
  data: CategoryDataType;
  refetch: () => Promise<any>;
}

const DeleteCategory = ({ data, refetch }: DeleteCategoryProps) => {
  const [deleteCategory] = useDeleteCategoryMutation();
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

    const result = await deleteCategory(data._id);
    console.log(result)

    if(result.data.data.deletedCount > 0){
      messageApi.open({
        type: "success",
        content: "Deleted successfully!"
      })
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
      title={`Delete ${data.name}`}
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

export default DeleteCategory;
