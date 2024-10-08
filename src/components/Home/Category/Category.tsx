import { useGetCategoryQuery } from "../../../redux/api/category/categoryApi";
import { Image } from "antd";
import { CategoryDataType } from "../../Dashboard/Category/ManageCategory";

const Category = () => {
  const { data: categories, isLoading, isFetching, isError, error } = useGetCategoryQuery("");

  if (isLoading || isFetching) {
    return <div className="text-center  text-green my-10">Loading...</div>;
  }

  if(isError){
    console.log(error)
  }
 
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8 ">
      {categories?.map((category: CategoryDataType, index) => (
        <div key={index} className="  flex flex-col items-center justify-center">
          <Image
            preview={false}
            className="drop-shadow-2xl w-full h-full rounded-lg"
            width={270}
            height={250}
            src={category.image}
          />
          <h4 className="text-xl font-bold text-center">{category.name}</h4>
        </div>
      ))}
    </div>
  );
};

export default Category;
