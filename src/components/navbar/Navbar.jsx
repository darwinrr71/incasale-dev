/** Company: INCA DEVELOPMENT AB
 * Developer Full Stack: Darwin Rengifo
 *
 * Create Date: 2024-03-11
 *     Program : Navbar.jsx
 *   Path Name : incasale-dev/frontend/src/components/navbar
 *       Tools : NodeJS, React, Mteria UI
 *
 * Description:
 * - create component Navbar and displays the menu and submenu.
 * - Variabler
 *             h6 : header h6
 *  navArrayLinks : - This variable is imported as PROPS from the App.jsx component.
 *                  - Displays menu and submenu options.
 *                  - It is then exported to navListDrawer as PROPS.
 *        Navlink : - This component prevents the entire page from reloading again when
 *                    accessing a menu option.
 *                  - It is then exported to navListDrawe as PROPS
 *        onClose : component that works with setOpen
 *        setOpen : - true/false
 *                  - display or close the navListDrawer
 *                  - It is then exported to navListDrawe as PROPS.
 *             To : The "To" replaces the "href" when working with the Navlink component
 *       flexGrow : The flex-grow CSS property sets the flex grow factor of a flex
 *                  item's main size.
 *
 */
import { useContext, useEffect, useState } from "react";
import NavListDrawer from "./NavListDrawer";
import BreadcrumbsURL from "./BreadcrumbsURL";

import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  SvgIcon,
  Tooltip,
} from "@mui/material";

import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import DiamondIcon from "@mui/icons-material/Diamond";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GetProductList } from "../controller/GetData";
import { shoppingCartContext } from "../../App";
import { StyledBadge } from "../functions/Functions";

export default function Navbar({ navArrayLinks }) {
  const [open, setOpen] = useState(false);
  const [anchorEL, setAnchorEL] = useState(null);
  const [subMenuFound, setsubMenuFound] = useState(false);
  const [arrayChildren, setArrayChildren] = useState([]);
  const [categories, setCategories] = useState([]);
  const openSubMenu = Boolean(anchorEL);

  /** {shoppingCart, setShoppingCart} is enclosed with braces because
   * "shoppingCartContext" is imported as an array[]
   */
  const { shoppingCart } = useContext(shoppingCartContext);

  //var newCategories = [];
  /** Recupera los datos de categorias */
  useEffect(() => {
    const GetDataProducts = async () => {
      const products = await GetProductList();
      const newCategories = [
        ...new Set(products.products.map((res) => res.category)),
      ];
      setCategories([...newCategories]);
    };
    GetDataProducts();
    /**el useEffect solo se renderiza cuando cambia el estado de isRender="true"*/
  }, [categories]);

  const handleClickSubMenu = (event, itemSubMenuChild) => {
    //setAnchorEL(event.currentTarget);
    setArrayChildren([]); // limpia el array
    setsubMenuFound(false);
    if (itemSubMenuChild !== undefined) {
      /** forma correcta de copiar un array con otro con useState */
      setArrayChildren([...categories]);
      setAnchorEL(event.currentTarget);
      setsubMenuFound((prevState) => !prevState);
    }
  };

  const handleClose = () => {
    setAnchorEL(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            /** aqui solo aparece el boton "MenuIcon" solo cuando es responsiv */
            sx={{ display: { xs: "flex", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {/** aqui igual */}
          <SvgIcon color="inherit" sx={{ display: { xs: "none", sm: "flex" } }}>
            <DiamondIcon />
          </SvgIcon>
          <Typography variant="h6" sx={{ flexGrow: 1, paddingLeft: 1 }}>
            IncaDev
          </Typography>
          {/** Shows the horizontal menu options.
           * here the vertical menu options disappear
           * when in responsive mode */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navArrayLinks.map((item, index) => (
              <Button
                color="inherit"
                key={item.title}
                component={NavLink} //component del react router
                to={item.path} //component del react routers
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={openSubMenu ? "true" : undefined}
                onClick={(event) => handleClickSubMenu(event, item.submenu)}
              >
                <Typography sx={{ textTransform: "capitalize" }}>
                  {item.title}
                </Typography>
                {item.submenu !== undefined && !openSubMenu ? (
                  <ExpandMoreIcon />
                ) : item.submenu !== undefined && subMenuFound ? (
                  <ExpandLessIcon />
                ) : undefined}
              </Button>
            ))}
          </Box>
          <Tooltip title="Login" arrow>
            <IconButton
              color="inherit"
              sx={{ display: { xs: "flex", sm: "flex" }, paddingRight: 1 }}
            >
              <PersonIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={shoppingCart.length === 0 && "You cart is empty"}
            arrow
          >
            <IconButton
              color="inherit"
              sx={{ display: { xs: "flex", sm: "flex" } }}
              component={NavLink}
              to={shoppingCart.length > 0 && "/ShoppingCart"}
            >
              <StyledBadge
                badgeContent={shoppingCart.reduce(
                  (item, total) => item + total.quantity,
                  0
                )}
                color="secondary"
              >
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Tooltip>
          {subMenuFound && ( //If it finds records for the submenu it shows it
            <Menu
              id="basic-menu"
              anchorEl={anchorEL}
              open={openSubMenu}
              onClose={handleClose}
              /** Access the MUI class to modify its CSS properties */
              /*sx={{
                "& .MuiPaper-root": {
                  // Target the <ul>
                  boxShadow: "none",
                  marginLeft: 17,
                  marginRight: 10,
                  marginTop: 3,
                },
              }}*/
            >
              {arrayChildren.map((itemSubMenu) => (
                <MenuItem
                  key={itemSubMenu}
                  onClick={handleClose}
                  component={NavLink}
                  to={`/Products/${itemSubMenu}`}
                  /* itemSubMenu returns the name of the list and directs it to the corresponding page **/
                  sx={{
                    textTransform: "capitalize",
                    //width: 350,
                    //paddingBottom: 0,
                    //marginLeft: 2,
                    "& .css-ahj2mt-MuiTypography-root": {
                      fontWeight: 300,
                      fontSize: "0.9rem",
                    },
                  }}
                >
                  <Typography>{itemSubMenu}</Typography>
                </MenuItem>
              ))}
            </Menu>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
        sx={{ display: { xs: "flex", sm: "none" } }}
      >
        <NavListDrawer
          navArrayLinks={navArrayLinks}
          categories={categories}
          NavLink={NavLink}
          setOpen={setOpen}
        />
      </Drawer>
      <Typography component="div" sx={{ paddingLeft: 4, paddingTop: 1 }}>
        <BreadcrumbsURL />
      </Typography>
    </>
  );
}