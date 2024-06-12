/**
 * BodyComponent
 */
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    ListItemText,
    Grid,
    Rating,
  } from "@mui/material";
  
  import { NavLink } from "react-router-dom";
  
  export default function BodyComponent({ arrayChildren, pageRender }) {
  
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
              textTransform: "capitalize",
            }}
          >
            {pageRender}
          </Typography>
        </ListItemText>
        {/** Grid que encierra todo el componente */}
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
            display: { xs: "block", sm: "flex" }
          }}
        >
          {arrayChildren.map((itemprducts) => (
            /** CARD: es la cartilla que encierra todo el contenido del card */
            <Card
              key={itemprducts.id}
              component={NavLink} //component del react router
              /** Envia itemprducts.title como parametro a DetailProduct */
              to={`/DetailProduct/${itemprducts.title}`}
              sx={{
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                width: "60vh",
                height: "75vh",
                marginLeft: 2,
                marginTop: 2,
                textDecoration:"none",
              }}
            >
              {/** Enciera el area de todo el contenido */}
              <CardActionArea>
                {/** Encierra la imagen */}
                <CardMedia
                  component="img"
                  image={itemprducts.thumbnail}
                  alt="Card Image"
                  sx={{ height: "35vh" }}
                />
  
                {/** Encierra todo el contenido de texto */}
                <CardContent
                  sx={{
                    height: "7rem",
                    justifyContent: "left",
                    justifyItems: "left",
                  }}
                >
                  <Typography component="h2" sx={{ textTransform: "capitalize" }}>
                    {itemprducts.title}
                  </Typography>
                  <Typography
                    component="p"
                    sx={{ fontSize: 12, fontWeight: 300 }}
                  >
                    {itemprducts.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
  
              {/** Encierra todo la accion a ejecutarse */}
              <CardActions sx={{ marginLeft: 1 }}>
                <Typography
                  component="span"
                  sx={{
                    fontSize: 20,
                    fontWeight: 400,
                    lineHeight: "2rem",
                  }}
                >
                  {itemprducts.price + " :-"}
                </Typography>
  
                {/** Rating: Pone 5 estrellas y de acuerdo a itemprducts.rating las colorea */}
                <Typography component="span">
                  <Rating
                    name="read-only"
                    value={itemprducts.rating}
                    size="small"
                    readOnly
                  />
                </Typography>
  
                {pageRender !== "Sale"
                  ? 
                    itemprducts.price <= 30 && (
                      <Typography
                        component="span"
                        sx={{ color: "red", paddingLeft: 3 }}
                      >
                        Sale
                      </Typography>
                    )
                  : null}
              </CardActions>
            </Card>
          ))}
        </Grid>
      </>
    );
  }  