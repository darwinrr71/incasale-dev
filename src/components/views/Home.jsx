/** 
 * Home
 */
import { useEffect, useState } from "react";
import BodyComponent from "./BodyComponent";
import { GetProductList } from "../controller/GetData";


export default function Home() {
  const [arrayChildren, setArrayChildren] = useState([]);

  useEffect(() => {
    const GetDataProducts = async () => {
      const products = await GetProductList();
      setArrayChildren([...products.products])
    };
    GetDataProducts();
  }, []);

  return (
    <>
      <BodyComponent arrayChildren={arrayChildren} pageRender={"Home"} />
    </>
  );
}