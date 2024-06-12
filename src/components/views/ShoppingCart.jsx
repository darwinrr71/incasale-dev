/**
 * ShoppingCart
 */
import {
    Button,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    Box,
    TextField,
    IconButton,
    CardActionArea,
    Divider,
    MenuItem,
    ListItemText,
    Tooltip,
    Paper,
  } from "@mui/material";
  
  import { useContext, useState, useEffect } from "react";
  import { shoppingCartContext } from "../../App";
  import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
  import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
  import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
  import { curdelivery, curpayment } from "../functions/Functions";
  import { NavLink } from "react-router-dom";
  
  export default function ShoppingCart() {
    const [arrayChildren, setArrayChildren] = useState([]);
    const { shoppingCart, setShoppingCart } = useContext(shoppingCartContext);
    /** State that saves the number of units to load in the cart */
  
    useEffect(() => {
      /** Pass the shoppingCartContext array to shoppingCart
       * and enter useEffect every time the shoppingCart is modified
       */
      setArrayChildren([...shoppingCart]);
    }, [shoppingCart]);
  
    const updateQuantity = (itemId, newQuantity) => {
      if (newQuantity >= 1 && newQuantity <= 999) {
        setShoppingCart((prevItems) => {
          return prevItems.map((item) => {
            if (item.id === itemId) {
              // Update the quantity property of the matched item
              return {
                ...item,
                quantity: newQuantity,
                totalprice: item.price * newQuantity,
              };
            }
            return item; // Return the item unchanged if it's not the one we're looking for
          });
        });
      }
    };
  
    const removeProduct = (itemID) => {
      const arrFilter = shoppingCart.filter((filter) => filter.id !== itemID);
      setShoppingCart([...arrFilter]);
    };
  
    /**  Form validation */
    const [names, setNames] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [telefon, setTelefon] = useState("");
    const [delivery, setDelivery] = useState("");
    const [payment, setPayment] = useState("");
    const [errorNames, setErrorNames] = useState({
      error: false,
      message: "",
    });
  
    const [errorEmail, setErrorEmail] = useState({
      error: false,
      message: "",
    });
  
    /** Regex to validate Names **/
    const namesValidation = (names) => {
      const regex = /^[A-Za-zåäö]+$/;
      return regex.test(names);
    };
    /** Regex to validate Email **/
  
    const emailValidation = (email) => {
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return regex.test(email);
    };
  
    const onSubmit = (e) => {
      e.preventDefault();
      setErrorNames({
        error: false,
        message: "",
      });
      setErrorEmail({
        error: false,
        message: "",
      });
      if (!namesValidation(names)) {
        setErrorNames({
          error: true,
          message: "The name is not valid",
        });
        return;
      }
      if (!emailValidation(email)) {
        setErrorEmail({
          error: true,
          message: "The email is not valid",
        });
        return;
      }
    };
  
    return (
      <>
        {/** General container for all grids spacing 50 between grid**/}
        {shoppingCart.length > 0 ? (
          <Grid container>
            <Grid
              /** item={true} : Avoid the message in the console: Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop. */
              item={true}
              xs={12}
              sm={6}
              md={6}
              lg={5}
            >
              <ListItemText
                sx={{
                  display: { xs: "block", sm: "flex" },
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                {/** Titulo del componente */}
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  Orders
                </Typography>
              </ListItemText>
              {arrayChildren.map((itemprducts) => (
                /** CARD: es la cartilla que encierra todo el contenido del card */
                <Card
                  key={itemprducts.id}
                  sx={{
                    //marginLeft: 12,
                    marginBottom: 2,
                    boxShadow: "none",
                    textDecoration: "none",
                    width: { xs: "40vh", sm: "90vh" },
                    display: { xs: "block", sm: "flex" },
                  }}
                >
                  {/** Imagen */}
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardMedia
                      component="img"
                      image={itemprducts.thumbnail}
                      alt="Card Image"
                      sx={{
                        transition: "0.2s",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                        paddingTop: 2,
                      }}
                    />
                  </Box>
  
                  {/** Product Information */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      paddingLeft: 2,
                    }}
                  >
                    {/** It has a hover property **/}
                    <CardActionArea>
                      <CardContent>
                        <Typography
                          component="h2"
                          alt="Remove"
                          sx={{
                            fontSize: 16,
                            fontWeight: 500,
                            display: "inline-flex",
                          }}
                        >
                          {itemprducts.title}
                        </Typography>
                        <Tooltip title="Remove" arrow>
                          <IconButton
                            color="inherit"
                            sx={{ float: "right" }}
                            onClick={() => removeProduct(itemprducts.id)}
                            onChange={() => location.reload()}
                          >
                            <RemoveShoppingCartIcon />
                          </IconButton>
                        </Tooltip>
                        <Typography
                          component="span"
                          sx={{
                            fontSize: 20,
                            fontWeight: 400,
                            lineHeight: "2rem",
                            color: "red",
                            display: "flex",
                          }}
                        >
                          {itemprducts.price + " :-"}
                        </Typography>
  
                        <Typography
                          component="p"
                          sx={{
                            marginTop: 1,
                            fontSize: 12,
                            fontWeight: 300,
                            width:{ xs: "16rem", sm:"18rem"},
                            //width: 300,
                          }}
                        >
                          {itemprducts.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <Box
                      sx={{
                        width: 120,
                        marginLeft: 2,
                        height: 35,
                        borderRadius: 2,
                        paddingTop: 0.5,
                        borderStyle: "solid",
                        borderWidth: 0.2,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <IconButton
                        color="inherit"
                        onClick={() =>
                          updateQuantity(itemprducts.id, itemprducts.quantity + 1)
                        }
                      >
                        <AddCircleOutline />
                      </IconButton>
                      <TextField
                        variant="outlined"
                        value={itemprducts.quantity}
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
                          updateQuantity(
                            itemprducts.id,
                            Number(inputNumber.target.value)
                          )
                        }
                      ></TextField>
                      <IconButton
                        color="inherit"
                        onClick={() =>
                          updateQuantity(itemprducts.id, itemprducts.quantity - 1)
                        }
                      >
                        <RemoveCircleOutline />
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Grid>
            {/** Order detail grid **/}
            <Grid item={true} xs={12} sm={6} md={6} lg={3} marginRight={5}>
              <ListItemText
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginLeft: 2,
                }}
              >
                {/** Titulo del componente */}
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  Order Sumary
                </Typography>
              </ListItemText>
              <Box>
                <CardContent>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ flexGrow: 1 }}>
                      Products (
                      {arrayChildren.reduce(
                        (item, total) => item + total.quantity,
                        0
                      )}
                      )
                    </Typography>
                    <Typography>
                      {Math.round(
                        arrayChildren.reduce(
                          (item, total) => item + total.totalprice,
                          0
                        ) * 100
                      ) / 100}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ flexGrow: 1 }}>Delivery</Typography>
                    <Typography>50</Typography>
                  </Box>
  
                  <Divider
                    component="li"
                    sx={{ listStyle: "none", marginTop: 2, marginBottom: 1 }}
                  />
  
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ fontWeight: 700, flexGrow: 1 }}>
                      Total amount (kr.)
                    </Typography>
                    <Typography
                      style={{
                        fontWeight: 700,
                      }}
                    >
                      {Math.round(
                        arrayChildren.reduce(
                          (item, total) => item + total.totalprice,
                          50 /** 50 is delivery */
                        ) * 100
                      ) / 100}
                    </Typography>
                  </Box>
                </CardContent>
              </Box>
            </Grid>
  
            {/** Form validation */}
            <Grid item={true} xs={12} sm={6} md={6} lg={3}>
              <ListItemText
                sx={{
                  display: "inline-flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginLeft: 1,
                  width: "7rem",
                }}
              >
                {/** Titulo del componente */}
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  Register
                </Typography>
              </ListItemText>
  
              <Button
                type="submit"
                variant="contained"
                size="small"
                sx={{ width: "10rem", marginLeft: 1 }}
                disabled={
                  names !== "" &&
                  address !== "" &&
                  email !== "" &&
                  telefon !== "" &&
                  delivery !== "" &&
                  payment !== "" &&
                  shoppingCart.length > 0
                    ? false
                    : true
                }
                component={NavLink}
                to={`/Payment/${names}/${address}/${email}/${telefon}/${delivery}/${payment}`}
              >
                Payment
              </Button>
  
              <Box
                component="form"
                onSubmit={onSubmit}
                autoComplete="off"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
              >
                <TextField
                  label="Name"
                  variant="outlined"
                  id="names"
                  type="text"
                  size="small"
                  error={errorNames.error}
                  helperText={errorNames.message}
                  onChange={(e) => setNames(e.target.value)}
                  value={names}
                  required
                />
                <TextField
                  label="Address"
                  variant="outlined"
                  id="address"
                  type="address"
                  size="small"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  required
                />
  
                <TextField
                  label="Email"
                  variant="outlined"
                  id="email"
                  type="email"
                  size="small"
                  error={errorEmail.error}
                  helperText={errorEmail.message}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
                <TextField
                  label="Telefon"
                  variant="outlined"
                  id="telefon"
                  type="number"
                  size="small"
                  onChange={(e) => setTelefon(e.target.value)}
                  value={telefon}
                  required
                />
                <TextField
                  label="Delivery options"
                  variant="outlined"
                  id="delivery"
                  select
                  size="small"
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {curdelivery.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      onClick={() => setDelivery(option.label)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Payment"
                  variant="outlined"
                  id="payment"
                  select
                  size="small"
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {curpayment.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      onClick={() => setPayment(option.label)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Paper
            sx={{ paddin: "32px", background: "with", height: "300px" }}
            elevation={4}
          >
            <Card
              sx={{
                //marginLeft: 12,
                marginLeft: { xs: "none", sm: 12 },
                marginTop: 2,
                boxShadow: "none",
                textDecoration: "none",
                //display: "flex",
                display: { xs: "block", sm: "flex" },
              }}
            >
              {/** Encierra todo el contenido de texto */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: 5,
                }}
              >
                <CardContent
                  sx={{
                    justifyContent: "right",
                    justifyItems: "right",
                    marginTop: "2rem",
                  }}
                >
                  {/** Encierra todo la accion a ejecutarse */}
                  <Typography
                    component="span"
                    sx={{
                      fontSize: { xs: 30, sm: 40 },
                      fontWeight: 500,
                      lineHeight: "2rem",
                    }}
                  >
                    Your cart is empty
                  </Typography>
  
                  <Typography
                    component="p"
                    sx={{ marginTop: 3, fontSize: 14, fontWeight: 300 }}
                  >
                    When you add something to your cart, it will appear here.
                    Ready to get started?
                  </Typography>
                </CardContent>
                <Box sx={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      display: "flex",
                      width: "10rem",
                      marginLeft: "1rem",
                      marginTop: "1rem",
                    }}
                    component={NavLink}
                    to={`/Home}`}
                  >
                    Go to home
                  </Button>
                </Box>
              </Box>
            </Card>
          </Paper>
        )}
      </>
    );
  }