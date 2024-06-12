/**
 * Payment
 */
import {
    Button,
    Card,
    CardContent,
    Typography,
    Box,
    Paper,
  } from "@mui/material";
  import { useContext, useEffect, useState } from "react";
  
  import { NavLink, useParams } from "react-router-dom";
  import { shoppingCartContext } from "../../App";
  import PaymentProgress from "./PaymentProgress";
  export default function Payment() {
    const params = useParams();
  
    const { setShoppingCart } = useContext(shoppingCartContext);
    const [render, setRender] = useState(true);
    const [payment, setPayment] = useState(true);
  
    useEffect(() => {
      setShoppingCart([]);
      setRender(false);
    }, [
      render,
    ]); /** render prevents it from being rendered all the time only once when it enters the component */
  
    return (
      <>
        {payment ? (
          <Box>
            <Paper
              sx={{ paddin: "32px", background: "with", height: "15rem" }}
              elevation={4}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: "25%", sm: "45%"},
                  left: { xs: "28%", sm: "40%"},
                  margin: "-25px 0 0 -25px",
                }}
              >
                <Typography
                  component="p"
                  sx={{ marginBottom: "2rem", fontSize: {xs: 18, sm: 30} }}
                >
                  Payment is being processed
                </Typography>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: "33%", sm: "60%"},
                  left: { xs: "50%", sm: "50%"},
                  margin: "-25px 0 0 -25px"
                }}
              >
                <PaymentProgress setPayment={setPayment} />
              </Box>
            </Paper>
          </Box>
        ) : (
          <Paper
            sx={{ paddin: "32px", background: "with", height: "400px" }}
            elevation={4}
          >
            <Card
              sx={{
                marginLeft:{ xs: "none", sm: 12 },
                marginTop: 2,
                boxShadow: "none",
                textDecoration: "none",
                display: "flex"
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
                    marginTop: "1rem",
                    "& .css-46bh2p-MuiCardContent-root:last-child": { paddingBottom: "2px"}
                  }}
                >
                  {/** Encierra todo la accion a ejecutarse */}
                  <Typography
                    component="span"
                    sx={{
                      fontSize: {xs:25, sm:40},
                      fontWeight: 500,
                      //lineHeight: "2rem",
                      textAlign: "center"
                    }}
                  >
                    Thanks for your purchase
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      marginTop: "1rem",
                      fontSize: 20,
                      fontWeight: 400,
                      //lineHeight: "0rem",
                      display: "flex",
                    }}
                  >
                    Your purchase will be sent to:
                  </Typography>
                  <CardContent>
                    <Box>
                      <Typography sx={{ display: "flex", fontWeight: 300 }}>
                        Name
                        <Typography>{" : " + params.names}</Typography>
                      </Typography>
                      <Typography sx={{ display: "flex", fontWeight: 300 }}>
                        Adress
                        <Typography>{" : " + params.address}</Typography>
                      </Typography>
                      <Typography sx={{ display: "flex", fontWeight: 300 }}>
                        Email
                        <Typography>{" : " + params.email}</Typography>
                      </Typography>
                      <Typography sx={{ display: "flex", fontWeight: 300 }}>
                        Telefon
                        <Typography>{" : " + params.telefon}</Typography>
                      </Typography>
                      <Typography sx={{ display: "flex", fontWeight: 300 }}>
                        Delivery
                        <Typography>{" : " + params.delivery}</Typography>
                      </Typography>
                      <Typography sx={{ display: "flex", fontWeight: 300 }}>
                        Payment
                        <Typography>{" : " + params.payment}</Typography>
                      </Typography>
                    </Box>
                  </CardContent>
                </CardContent>
                <Box sx={{ display: "flex"}}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      display: "flex",
                      width: "10rem",
                      marginLeft: "1rem",
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