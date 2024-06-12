/* eslint-disable react-refresh/only-export-components */
/**
 * Custom functions
 *  
 */
import HomeIcon from "@mui/icons-material/Home";
import FolderIcon from "@mui/icons-material/Folder";
import { Badge, styled } from "@mui/material";


/** Receives a text and puts the first 
 * letter in capital letters and the rest 
 * in lower case 
**/

//const capitalizedFirstLetter = (str) =>{
export function capitalizedFirstLetter(str) {
    return (str.charAt(0).toUpperCase() + str.slice(1));
}

/** Export navArrayLinks for header menu App.jsx */
export const navArrayLinks = [
  { title: "Home", path: "/", icon: <HomeIcon /> },
  { title: "Categories", submenu: [], icon: <FolderIcon /> },
];

/** Export navArrayHome for header menu HomeHeader.jsx */
export const navArrayHome = [
    { title: "All Categories", path: "/AllCategories" },
    { title: "New Now", path: "/NewNow" },
    { title: "Sale", path: "/Sale" },
  ];

  export const curdelivery = [
    {
      value: 'HOME1',
      label: 'Home delivery - select date and time',
    },
    {
      value: 'HOME2',
      label: 'Home delivery - even if you are not at home',
    },
    {
      value: 'POST',
      label: 'Pick up yourself at PostNord',
    },
    {
      value: 'STORE',
      label: 'Pick it up in store',
    },
  ];
  
  export const curpayment = [
    {
      value: 'BANK',
      label: 'Bank',
    },
    {
      value: 'SWISH',
      label: 'Swish',
    },
    {
      value: 'PAYPAL',
      label: 'Paypal ',
    },
    {
      value: 'STORE',
      label: 'Pick it up in store',
    },
  ];

  /** Styled for ShoppingCart Icon */
  export const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));