import { DeleteOutlined } from "@mui/icons-material";
import { Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import { WorkoutContext } from "../contexts/WorkoutContext";
import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";

export const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useContext(WorkoutContext);
  const { user } = useAuthContext();

  const handleDelete = () => {
    if (!user) {
      return;
    }

    fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => dispatch({ type: "DELETE_WORKOUT", payload: res }))
      .catch((err) => console.log(err));
  };

  return (
    <Card sx={{ m: 2, p: 2, width: "30vw" }}>
      <CardHeader
        action={
          <IconButton onClick={handleDelete}>
            <DeleteOutlined />
          </IconButton>
        }
        title={
          <Typography
            sx={{
              color: (theme) => theme.palette.primary.dark,
              fontWeight: (theme) => theme.typography.fontWeightBold,
              fontSize: (theme) => theme.typography.h6.fontSize,
            }}
          >
            {workout.title}
          </Typography>
        }
      />

      <CardContent sx={{ pt: 0 }}>
        <Typography>Reps: {workout.reps}</Typography>
        <Typography>Load (kg): {workout.load}</Typography>
        <Typography>
          {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
        </Typography>
      </CardContent>
    </Card>
  );
};
