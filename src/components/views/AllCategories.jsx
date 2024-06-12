/**
 * AllCategories
 */
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    ListItemText,
    Grid,
  } from "@mui/material";
  
  import { useEffect, useState } from "react";
  import { NavLink } from "react-router-dom";
  import { GetProductList } from "../controller/GetData";
  
  export default function AllCategories() {
    const [arrayChildren, setArrayChildren] = useState([]);
    const [result, setResult] = useState([]);
    const [isRender, setIsRender] = useState(null);
  
    useEffect(() => {
      const GetDataProducts = async () => {
        const products = await GetProductList();
        const listproducts = products.products;
        const categories = [
          ...new Set(listproducts.map((res) => res.category)),
        ];
  
        setIsRender(false);
        categories.map((item) =>
          setResult((previousState) => [
            ...previousState,
            listproducts.find((element) => element.category === item),
          ])
        );
        setArrayChildren([...result]);
        setIsRender((prevState) => !prevState);
      };
      GetDataProducts();
  
      /**UseEffect renderar endast när isRender ändrar tillståndet till "true","*/
    }, [isRender]);
  
  
  
    return (
      <>
        <ListItemText>
          {/** Titulo del componente */}
          <Typography
            sx={{
              marginLeft: 10,
              fontSize: 20,
              fontWeight: 700,
              lineHeight: "3rem",
            }}
          >
            All Categories
          </Typography>
        </ListItemText>
        <Grid
          container
          spacing={20}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{
            marginLeft: 20,
            justifyContent: "center",
            justifyItems: "center",
            width: "200vh",
            height: "160vh",
          }}
        >
          {arrayChildren.map((itemprducts) => (
            <Card
              key={itemprducts.id}
              component={NavLink}
              /**Take the name of the object and recover the category to generate the path */
              to={`/Products/${itemprducts.category}`}
              sx={{
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                width: "60vh",
                height: "60vh",
                marginLeft: 2,
                marginTop: 2,
                textDecoration:"none",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={itemprducts.thumbnail}
                  alt="Card Image"
                  sx={{ height: "35vh" }}
                />
  
                <CardContent
                  sx={{      
                    justifyContent: "left",
                    justifyItems: "left",
                  }}
                >
                  <Typography component="h2" sx={{ textTransform: "capitalize" }}>
                    {itemprducts.category}
                  </Typography>
                  <Typography
                    component="p"
                    sx={{ fontSize: 12, fontWeight: 300 }}
                  >
                    {itemprducts.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      </>
    );
  }
  