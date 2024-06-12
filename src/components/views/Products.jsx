/**
 * Products
 */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProductList } from "../controller/GetData";
import BodyComponent from "./BodyComponent";

export default function Products() {
  const { title } = useParams(); //I capture the title of the product

  const [arrayChildren, setArrayChildren] = useState([]);

  useEffect(() => {
    const GetDataProducts = async () => {

      const products = await GetProductList();
      const listproducts = products.products;
      const arrFilter = listproducts.filter(
        (filter) => filter.category === title.toLowerCase()
      );
      setArrayChildren([...arrFilter]);
    };
    GetDataProducts();
  }, [title]);

  return (
    <>
      <BodyComponent arrayChildren={arrayChildren} pageRender={title} />
    </>
  );
}