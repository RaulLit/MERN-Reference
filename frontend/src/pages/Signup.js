import { Login } from "@mui/icons-material";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignup } from "../hooks/useSignup";

const sxField = {
  marginTop: "20px",
  marginBottom: "20px",
  display: "block",
  background: (theme) => theme.palette.common.white,
};

export const Signup = () => {
  const { signup, error, isLoading } = useSignup();

  // Schema
  const schema = yup.object().shape({
    email: yup.string().email("Invalid Email!").required("Email is required!"),
    newPassword: yup.string().min(4).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Password don't match!")
      .required(),
  });

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignup = async (data) => {
    const { email, newPassword: password } = data;
    await signup(email, password);
  };

  return (
    <Container>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5">Sign In</Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(handleSignup)}>
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
            label="New Password"
            variant="outlined"
            color="secondary"
            type="password"
            fullWidth
            required
            error={errors.newPassword ? true : false}
            helperText={errors.newPassword?.message}
            {...register("newPassword")}
          />
          <TextField
            sx={sxField}
            label="Confirm Password"
            variant="outlined"
            color="secondary"
            type="password"
            fullWidth
            required
            error={errors.confirmPassword ? true : false}
            helperText={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            endIcon={<Login />}
            disabled={isLoading}
          >
            Submit
          </Button>
        </form>
        {error && <Typography color="error">{error}</Typography>}
        {error && error === "Password not strong enough" && (
          <Typography color="error">
            Password should have mininum: <br /> One uppercase letter <br /> One lowercase
            letter <br /> One special character (!@#$%^&*) <br /> One Number
          </Typography>
        )}
      </Box>
    </Container>
  );
};
