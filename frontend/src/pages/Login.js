import { Login as LoginIcon } from "@mui/icons-material";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLogin } from "../hooks/useLogin";

const sxField = {
  marginTop: "20px",
  marginBottom: "20px",
  display: "block",
  background: (theme) => theme.palette.common.white,
};

export const Login = (req, res) => {
  const { login, error, isLoading } = useLogin();

  // Schema
  const schema = yup.object().shape({
    email: yup.string().email("Invalid Email!").required("Email is required!"),
    password: yup.string().min(4).max(20).required("Password is required!"),
  });

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data) => {
    const { email, password } = data;
    await login(email, password);
  };

  return (
    <Container>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5">Log In</Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(handleLogin)}>
          <TextField
            sx={sxField}
            label="Email"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            error={errors.email ? true : false}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <TextField
            sx={sxField}
            label="Password"
            variant="outlined"
            color="secondary"
            type="password"
            fullWidth
            required
            error={errors.password ? true : false}
            helperText={errors.password?.message}
            {...register("password")}
          />
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            endIcon={<LoginIcon />}
            disabled={isLoading}
          >
            Submit
          </Button>
        </form>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};
