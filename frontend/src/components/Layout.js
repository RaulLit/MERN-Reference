import { styled } from "@mui/material";
import { Navbar } from "./Navbar";

// CUSTOM STYLED COMPONENTS
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const Layout = ({ children }) => {
  return (
    <div>
      {/* NAVBAR */}
      <Navbar />

      <DrawerHeader />
      <div className="main">{children}</div>
    </div>
  );
};
