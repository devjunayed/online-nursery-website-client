import { Flex, Input, Rate, Select, Pagination, Divider } from "antd";
import { useGetCategoryQuery } from "../../../redux/api/category/categoryApi";
import { CategoryDataType } from "../../Dashboard/Category/ManageCategory";
import { useState, useEffect } from "react";
import { useGetProductsQuery } from "../../../redux/api/products/productsApi";
import ProductCard from "./ProductCard";
import "./ProductCard.css";
import { ProductDataType } from "../../../types/dataType";

const Products = () => {
  const [queryUrl, setQueryUrl] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string | null>(null); // Add sortBy state
  const [sortOrder, setSortOrder] = useState<string>("asc"); // Add sortOrder state
  const { Search } = Input;

  const { data: categories } = useGetCategoryQuery("");
  const { data: productsData, refetch: refetchProducts } =
    useGetProductsQuery(queryUrl);

  const products = productsData?.data || [];
  const totalCount = productsData?.length || 0;

  const updateQueryUrl = () => {
    const queryParams = new URLSearchParams();

    if (selectedCategory) {
      queryParams.append("category", selectedCategory);
    }
    if (selectedRating) {
      queryParams.append("rating", selectedRating.toString());
    }
    if (sortBy) {
      queryParams.append("sortBy", sortBy); // Add sortBy to query
    }
    queryParams.append("sortOrder", sortOrder); // Add sortOrder to query
    queryParams.append("page", (currentPage - 1).toString());
    queryParams.append("limit", limit.toString());

    const newQuery = queryParams.toString();
    setQueryUrl(newQuery);
  };

  const onSearch = (value: string) => {
    const queryParams = new URLSearchParams();
    queryParams.append("search", value);
    queryParams.append("page", (currentPage - 1).toString());
    queryParams.append("limit", limit.toString());
    setQueryUrl(queryParams.toString());
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleRating = (value: number) => {
    setSelectedRating(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (value: number) => {
    setLimit(value);
    setCurrentPage(1);
  };

  // Handle sorting logic
  const handleSortByChange = (value: string) => {
    setSortBy(value);
  };

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value);
  };

  useEffect(() => {
    updateQueryUrl();
  }, [selectedCategory, selectedRating, currentPage, limit, sortBy, sortOrder]);

  useEffect(() => {
    if (queryUrl) {
      refetchProducts();
    }
  }, [queryUrl, refetchProducts]);

  const perPageOptions = [5, 10, 20, 50];

  return (
    <div>
      <div className="w-2/3 md:w-1/2 mx-auto">
        <Search
          placeholder="input search text"
          allowClear={true}
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </div>
      <div className="mb-4 lg:flex gap-4">
        <div>
          <div className="flex flex-col justify-center items-center">
            <div className="text-xl mb-4 mt-4 lg:mb-10 text-bold">
              Filter by:
            </div>
            <div>
              <Select
                placeholder="Select a category"
                onChange={handleCategoryChange}
                style={{ width: "100%" }}
              >
                <Select.Option value="">All</Select.Option>
                {categories?.map((category: CategoryDataType) => (
                  <Select.Option value={category.name} key={category.name}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="mt-5">
              <Flex gap="middle" vertical>
                <Rate allowHalf onChange={handleRating} />
              </Flex>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col justify-center items-center">
            <div className="text-xl mb-4 mt-4 lg:mb-10 text-bold">Sort by:</div>
            <div>
              {/* Sort by field */}
              <Select
                placeholder="Sort by"
                onChange={handleSortByChange}
                style={{ width: "100%" }}
              >
                <Select.Option value="title">Title</Select.Option>
                <Select.Option value="price">Price</Select.Option>
              </Select>
            </div>
            <div className="mt-4">
              {/* Sort order */}
              <Select
                defaultValue="asc"
                onChange={handleSortOrderChange}
                style={{ width: "100%" }}
              >
                <Select.Option value="asc">Ascending</Select.Option>
                <Select.Option value="desc">Descending</Select.Option>
              </Select>
            </div>
          </div>
        </div>
        <div className="mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 bg-white pl-4 pt-4">
            {products?.map((product: ProductDataType) => (
              <div className="mx-auto" key={product._id}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
          {products.length === 0 && (
            <div className="text-center text-green text-3xl font-bold bg-white py-24">
              No Data found
            </div>
          )}
          <Flex justify="center" align="middle" className="flex-wrap gap-4 mb-4">
            <Pagination
              current={currentPage}
              pageSize={limit}
              total={totalCount}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
            <Select
              defaultValue={limit}
              onChange={handleLimitChange}
              style={{ width: "120px" }}
            >
              {perPageOptions.map((option) => (
                <Select.Option key={option} value={option}>
                  {option} per page
                </Select.Option>
              ))}
            </Select>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default Products;
