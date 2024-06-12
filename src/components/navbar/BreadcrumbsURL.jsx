/** Company: INCA DEVELOPMENT AB
 * Developer Full Stack: Darwin Rengifo
 *
 * Create Date: 2024-04-12
 *     Program : BreadcrumbsURL.jsx
 *   Path Name : incasale-dev/frontend/src/components/navbar
 *       Tools : NodeJS, React, Mteria UI
 *
 * Description:
 * -  create A breadcrumbs is a list of links that help visualize
 *    a page's location within a site's hierarchical structure, it
 *    allows navigation up to any of the ancestors.
 * - Variabler
 *        pathURL: The `useLocation` hook in React Router is used to return the current
 *                 location of a React component. The `useLocation` returns the current
 *                 location as an object and comes with props such as: pathname, state
 *                 search, key, hash
 *      pathnames: Receive the name of the selected option in an array
 *    navigateURL: The useNavigate hook provides a simple and intuitive API for
 *                 navigating between pages in your React application
 *        routeTo: Receives the path of the active component
 *         isLast: True and return to home plate. False replays in the navigation
 *                 after clicking on the desired link
 *
 */
//import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function BreadcrumbsURL() {
  const pathURL = useLocation();

  /** con split separa la cadena y filtra para recuperar el nombre del componente 
   * a traves de la URL */
  var pathnames = pathURL.pathname.split("/").filter((x) => x);
  const navigateURL = useNavigate();
  const urlExtens = pathnames[0]

  /**  Payment is a URL with parameters and I only need the name of the component to show it in the navigation help **/
if (urlExtens === "Payment" ) {
  pathnames = [] //pathnames.filter(item => item === "Payment");
  pathnames = ["Payment"]
}

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {pathnames.length > 0 ? (
        <Link onClick={() => navigateURL("/")}>Home</Link>
      ) : (
        <Typography> Home </Typography>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography key={name} sx={{ textTransform: "capitalize" }}>
            { name === "AllCategories" &&
            "All Categories"
            || name === "NewNow" &&
            "New Now"
            || name === "DetailProduct" &&
            /** Todo link que tenga % 0 20 lo reemplaza por espacios en blanco */
            "Products"
            || name.replace(/_|%|-|20|<>/g, " ")
          }
          </Typography>
        ) : (
          <Link key={name} onClick={() => navigateURL(routeTo)}>
            {name === "DetailProduct" &&
            /** Todo link que tenga % 0 20 lo reemplaza por espacios en blanco */
            "Product Detail"
            || name === "Products" && 
            "Products"
            || name === "Payment" && 
            "Payment"
            }
            {/*name*/}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}