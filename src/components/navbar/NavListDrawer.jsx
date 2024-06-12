/** Company: INCA DEVELOPMENT AB
 * Developer Full Stack: Darwin Rengifo
 *
 * Create Date: 2024-03-11
 *     Program : App.jsx
 *   Path Name : incasale-dev/frontend/src/components/navbar
 *       Tools : NodeJS, React, Mteria UI
 *
 * Description:
 * - Create the list for menu options and submenus.
 * - Variabler
 *    navArrayLinks : This PROPOS is received from App.jsx
 *          NavLink : This PROPOS is received from Navbar.jsx
 *          setOpen : This PROPOS is received from Navbar.jsx
 *    Routes, Route : true/false
 */

import { useEffect, useState } from "react";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function NavListDrawer({
  navArrayLinks,
  categories,
  NavLink,
  setOpen,
}) {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [arrayChildren, setArrayChildren] = useState([]);

  const handleClickCollapse = (itemSubmenu) => {
    if (itemSubmenu !== undefined) {
      setOpenCollapse((prevState) => !prevState);
      /** forma correcta de copiar un arroar con otro con useState */
      setArrayChildren([...categories]);
    } else {
      setOpen(false);
    }
  };
  useEffect(() => {
  }, [openCollapse]);

  return (
    <Box sx={{ width: 250 }}>
      <nav>
        <List>
          <ListItem sx={{ marginBottom: 3, paddingLeft: 3 }}>
            <ListItemText primary="IncaDev"></ListItemText>
          </ListItem>
        </List>
        <List>
          {navArrayLinks.map((item) => (
            <ListItem sx={{ marginTop: -3 }} key={item.title}>
              <ListItemButton
                sx={{ paddingLeft: 0 }}
                component={NavLink}
                to={item.path}
                onClick={() => handleClickCollapse(item.submenu)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>
                  <Typography sx={{ textTransform: "capitalize" }}>
                    {item.title}
                  </Typography>
                </ListItemText>
                {!openCollapse && "submenu" in item ? (
                  <ExpandMoreIcon />
                ) : openCollapse && "submenu" in item ? (
                  <ExpandLessIcon />
                ) : undefined}
              </ListItemButton>
            </ListItem>
          ))}
          <Collapse
            in={openCollapse && arrayChildren.length > 0}
            timeout="auto"
            unmountOnExit
          >
            {/**si encuentra registros para el submenu lo muestra */}
            <List component="div" disablePadding>
              {arrayChildren.map((itemSubMenu) => (
                <ListItemButton
                  key={itemSubMenu}
                  component={NavLink}
                  to={`/Products/${itemSubMenu}`}
                  onClick={() => setOpen(false)}
                  sx={{ pl: 10, paddingBottom: 0 }}
                >
                  <Typography sx={{ textTransform: "capitalize" }}>
                    {itemSubMenu}
                  </Typography>
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      </nav>
    </Box>
  );
}