/* eslint-disable react-hooks/exhaustive-deps */
import { Gallery } from "react-grid-gallery";
import { useGetProductsQuery } from "../../../redux/api/products/productsApi";
import { useState, useEffect } from "react";

type ImageType = {
  src: string;
  width: number;
  height: number;
};

export default function GalleryComp() {
  const { data, isFetching, isLoading } = useGetProductsQuery("");
  const [images, setImages] = useState<ImageType[]>([]);
  const productData = data?.data || [];

 

  useEffect(() => {
    if (productData.length > 0) {
      const newImages: ImageType[] = [];

      for (let i = 0; i < productData.length; i++) {
        if (i >= 25) break; 

        newImages.push({
          src: productData[i]?.image || "",
          width: Math.floor(Math.random() * (800 - 300 + 1)) + 300,
          height: Math.floor(Math.random() * (800 - 300 + 1)) + 300,
        });
      }

      setImages(newImages); 
    }
  }, [productData]);

  if (isLoading || isFetching) {
    return <div className="text-center  text-green my-10">Loading...</div>;
  }

  

  return (
    <div>
      <Gallery images={images} />
    </div>
  );
}
