/**
 * NewNow
 */
import { useEffect, useState } from "react";
import { GetProductList } from "../controller/GetData";
import BodyComponent from "./BodyComponent";


export default function NewNow() {
  const [arrayChildren, setArrayChildren] = useState([]);

  useEffect(() => {
    const GetDataProducts = async () => {
      const products =  await GetProductList();
      const listproducts = products.products;
      /** Denna filter får det de jämna nummer för array */
      const arrFilter = listproducts.filter((num, index) => index % 2 == 0);

      setArrayChildren([...arrFilter]);
    };
    GetDataProducts();
  }, []);

  return (
    <>
      <BodyComponent arrayChildren={arrayChildren} pageRender={"New Now"} />
    </>
  );
}