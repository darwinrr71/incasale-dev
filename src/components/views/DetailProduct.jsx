/**
 * DetailProduct
 */
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  ListItemText,
  Grid,
  Rating,
  Paper,
  Box,
  TextField,
  IconButton,
} from "@mui/material";

import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetProductList } from "../controller/GetData";
import { shoppingCartContext } from "../../App";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";

export default function DetailProduct() {
  const { title } = useParams(); //I capture the title of the product
  const [arrayChildren, setArrayChildren] = useState([]);
  const { shoppingCart, setShoppingCart } = useContext(shoppingCartContext);
  /** State that saves the number of units to load in the cart */
  const [quantity, setQuantity] = useState(0);
      
  useEffect(() => {
    const GetDataProducts = async () => {

      const products = await GetProductList();
      const listproducts = products.products;
      /** This filter retrieves the even numbers of the array */
      const arrFilter = listproducts.filter((filter) => filter.title === title);

      setArrayChildren([...arrFilter]);
    };
    GetDataProducts();
  }, []);

  const handleChangeInput = (inputNumber) => {
    if (!inputNumber.match(/[^0-9]/)) {
      setQuantity(Number(inputNumber));
    }
  };

  const handleIncrementInput = () => {
    setQuantity(Number(quantity) + 1);
  };

  const handleDecrementInput = () => {
    if (Number(quantity) !== 0) {
      setQuantity(Number(quantity) - 1);
    }
  };

  const addShopCart = (itemprducts) => {
    if (quantity === 0) {
      console.log("ingrese una cantidad", quantity);
      return false;
    }

    /** Si encuentra algun elemento repetido ya no lo adiciona
     * pero si puuede incrementar la cantidad del pedido
     */
    const aux = shoppingCart.find((element) => element.id === itemprducts.id);

    if (!aux) {
      const cart = {
        id: itemprducts.id,
        title: itemprducts.title,
        description: itemprducts.description,
        thumbnail: itemprducts.thumbnail,
        quantity: quantity,
        price: itemprducts.price,
        totalprice: itemprducts.price * quantity,
      };
      setShoppingCart((prevItems) => [...prevItems, cart]);
    } else {
      setShoppingCart((prevItems) => {
        return prevItems.map((item) => {
          if (item.id === itemprducts.id) {
            // Update the quantity property of the matched item
            return { ...item, quantity: quantity };
          }
          return item; // Return the item unchanged if it's not the one we're looking for
        });
      });
    }
  };

  return (
    <>
      <ListItemText>
        {/** Titulo del componente */}
        <Typography
          sx={{
            //marginLeft: 10,
            textAlign: "center",
            fontSize: 20,
            fontWeight: 700,
            lineHeight: "3rem",
          }}
        >
          {title}
        </Typography>
      </ListItemText>
      {/** Grid que encierra todo el componente */}
      <Paper
        sx={{ paddin: "32px", background: "white", height:{ xs:"38rem", sm:"21rem"}, with: "800px" }}
        //sx={{ paddin: "32px", background: "white", with: "800px" }}
        elevation={4}
      >
        <Grid
          container
          spacing={20}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{
            marginLeft: 20,
            justifyContent: "left",
            justifyItems: "left",
            width: "200vh",
            height: "160vh",
          }}
        >
          {arrayChildren.map((itemprducts) => (
            /** CARD: es la cartilla que encierra todo el contenido del card */
            <Card
              key={itemprducts.id}
              sx={{
                marginLeft: { xs: 5, sm: 12},
                marginTop: 2,
                boxShadow: "none",
                textDecoration: "none",
                display: { xs: "block", sm: "flex" },
                height:{ xs: "34rem", sm:"20rem"}
              }}
            >
              {/** Encierra la imagen */}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  image={itemprducts.thumbnail}
                  alt="Card Image"
                  sx={{ paddingTop: 1, width:{ xs: "15rem", sm:"18rem"}, marginLeft:{xs:"3rem", sm:"0rem"} }}
                />
              </Box>

              {/** Encierra todo el contenido de texto */}
              <Box
                sx={{
                  display:{xs:"block", sm:"flex"},
                  //display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent
                  sx={{
                    justifyContent: "right",
                    justifyItems: "right",
                  }}
                >
                  {/** Encierra todo la accion a ejecutarse */}
                  <Typography
                    component="span"
                    sx={{
                      fontSize: 40,
                      fontWeight: 400,
                      lineHeight: "2rem",
                    }}
                  >
                    {itemprducts.price + " :-"}
                  </Typography>

                  {/** Rating: Pone 5 estrellas y de acuerdo a itemprducts.rating las colorea */}
                  <Typography component="span" sx={{ paddingLeft: 2 }}>
                    <Rating
                      name="read-only"
                      value={itemprducts.rating}
                      size="small"
                      readOnly
                    />
                  </Typography>

                  {itemprducts.price <= 30 && (
                    <Typography
                      component="span"
                      sx={{ color: "red", paddingLeft: 3 }}
                    >
                      Sale
                    </Typography>
                  )}

                  <Typography
                    component="p"
                    sx={{ width:{ xs: "20rem", sm:"28rem"}, marginTop: 3, fontSize: 14, fontWeight: 300 }}
                  >
                    {itemprducts.description}
                  </Typography>

                  <Typography
                    component="h2"
                    sx={{ marginTop: 3, fontSize: 16, fontWeight: 500 }}
                  >
                    Stock Status:
                  </Typography>
                  <Typography
                    component="span"
                    sx={{ marginTop: 3, fontSize: 14, fontWeight: 300 }}
                  >
                    {"In web store : " + itemprducts.stock + " (Units)"}
                  </Typography>
                </CardContent>
                <Box sx={{ display: "flex"}}>
                <Box
                  sx={{
                    width: 120,
                    marginLeft: 2,
                    height: 35,
                    borderRadius: 2,
                    paddingTop: 0.5,
                    borderStyle: "solid",
                    borderWidth: 0.2,
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <IconButton
                    color="inherit"
                    onClick={() => handleIncrementInput()}
                  >
                    <AddCircleOutline />
                  </IconButton>
                  <TextField
                    variant="outlined"
                    value={quantity}
                    inputProps={{ inputMode: "numeric", maxLength: 3 }} //cantidad de caracteres a ingresar
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: 12,
                        width: 20,
                        height: 10,
                        padding: 1,
                      },
                    }}
                    onChange={(inputNumber) =>
                      handleChangeInput(inputNumber.target.value)
                    }
                  ></TextField>
                  <IconButton
                    color="inherit"
                    onClick={() => handleDecrementInput()}
                  >
                    <RemoveCircleOutline />
                  </IconButton>
                </Box>

                  <Button
                    variant="contained"
                    size="small"
                    sx={{ display: "flex", width: { xs:"8rem", sm:"10rem"}, marginLeft: {xs: 1, sm: "2rem"} }}
                    onClick={() => addShopCart(itemprducts)}
                  >
                    Add to cart
                  </Button>
                </Box>
              </Box>
            </Card>
          ))}
        </Grid>
      </Paper>
    </>
  );
}  