/**
 * Sale
 */
import { useEffect, useState } from "react";
import { GetProductList } from "../controller/GetData";
import BodyComponent from "./BodyComponent";

export default function Sale() {
  const [arrayChildren, setArrayChildren] = useState([]);

  useEffect(() => {
    const GetDataProducts = async () => {
      const products = await GetProductList();
      const listproducts = products.products;
      const arrFilter = listproducts.filter((filter) => filter.price <= 30);

      setArrayChildren([...arrFilter]);
    };
    GetDataProducts();
  }, []);

  return (
    <>
      <BodyComponent arrayChildren={arrayChildren} pageRender={"Sale"} />
    </>
  );
}