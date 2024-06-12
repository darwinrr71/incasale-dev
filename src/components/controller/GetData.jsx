export async function GetProductList() {
    const res = await fetch("https://dummyjson.com/products?limit=0");
    const products = await res.json();
    return products;
}