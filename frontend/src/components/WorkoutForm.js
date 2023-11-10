import { Box, Button, TextField, Typography } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const sxField = {
  marginTop: "20px",
  marginBottom: "20px",
  display: "block",
  background: (theme) => theme.palette.common.white,
};

export const WorkoutForm = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  // Schema
  const schema = yup.object().shape({
    title: yup.string().max(100).required("Title is required!"),
    reps: yup.string().max(5000).required("Reps is required"),
    load: yup.string().max(500).required("Load is required"),
  });

  // useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCreate = (data) => {
    if (!user) {
      setError("You must be logged in");
      return;
    }

    fetch("http://localhost:4000/api/workouts/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setError(null);
        dispatch({ type: "CREATE_WORKOUT", payload: res });
        reset();
      })
      .catch((err) => setError(err.message));
  };

  return (
    <Box sx={{ width: "30vw", p: 2 }}>
      <Typography variant="h5">Create a Workout</Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(handleCreate)}>
        <TextField
          sx={sxField}
          label="Workout Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={errors.title ? true : false}
          helperText={errors.title?.message}
          {...register("title")}
        />
        <TextField
          sx={sxField}
          label="Reps"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={errors.reps ? true : false}
          helperText={errors.reps?.message}
          {...register("reps")}
        />
        <TextField
          sx={sxField}
          label="Load in KG"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={errors.load ? true : false}
          helperText={errors.load?.message}
          {...register("load")}
        />

        <Button type="submit" color="secondary" variant="contained" endIcon={<Send />}>
          Submit
        </Button>
      </form>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};
