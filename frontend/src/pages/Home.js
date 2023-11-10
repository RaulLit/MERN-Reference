import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import { WorkoutDetails } from "../components/WorkoutDetails";
import { WorkoutForm } from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

export const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = () => {
      fetch("http://localhost:4000/api/workouts/", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((res) => res.json())
        .then((res) => dispatch({ type: "SET_WORKOUTS", payload: res }))
        .catch((err) => console.log(err));
    };
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <Container sx={{ display: "flex", justifyContent: "space-around" }}>
      <Box>
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </Box>
      <WorkoutForm />
    </Container>
  );
};
