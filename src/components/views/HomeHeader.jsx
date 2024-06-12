/**
 * HomeHeader
 */
import { Button, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { navArrayHome } from "../functions/Functions";

export default function HomeHeader() {
  return (
    <>
      <Stack spacing={2} direction="row" justifyContent="center" marginTop={1}>
        {navArrayHome.map((item) => (
          <Button
            key={item.title}
            component={NavLink} //component del react router
            to={item.path} //component del react routers
            variant="outlined"
            color="inherit"
          >
            <Typography key={item}  variant="outlined"
            color="inherit" sx={{ textTransform: "capitalize", fontWeight: 150, width: 95, textAlign:"center" }}>
            {item.title}
            </Typography>
          </Button>
        ))}
      </Stack>
    </>
  );
}