import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { orange } from "@mui/material/colors";
const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
});

export default function Reset() {
  let [newpass, setPass] = useState();
  let [confirmpassword, setPassword] = useState();

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      newpassword: data.get("newpassword"),
      confirmpassword: data.get("conpassword"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "3.5rem 2rem",
            borderRadius: "0.4rem",
            background: "#efefef",
            boxShadow: "2px 1px 10px 1px grey",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#1D2C4E" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="newpassword"
              label="New password"
              name="Newpassword"
              size="small"
              type="password"
              value={newpass}
              onChange={e => setPass(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmpassword"
              label="confirm password"
              type="confirmpassword"
              id="confirmpassword"
              autoComplete="current-password"
              value={confirmpassword}
              onChange={e => setPassword(e.target.value)}
            />
            <Link to="/login">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Confirm
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
