import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <AppBar
      sx={{
        color: (theme) => theme.palette.primary.main,
        background: (theme) => theme.palette.common.white,
        pl: (theme) => theme.spacing(18),
      }}
      elevation={1}
      position="fixed"
    >
      <Toolbar sx={{ marginLeft: 2, marginRight: 2 }}>
        <Typography
          variant="h4"
          onClick={() => navigate("/")}
          sx={{ mr: 5, cursor: "pointer", flexGrow: 1 }}
        >
          Workouts
        </Typography>
        {!user && (
          <Box>
            <Button
              variant="text"
              color="primary"
              sx={{ m: 1 }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="text"
              color="primary"
              sx={{ m: 1 }}
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
          </Box>
        )}
        {user && (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography>{user.email}</Typography>
            <Button variant="text" color="primary" sx={{ m: 1 }} onClick={() => logout()}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
