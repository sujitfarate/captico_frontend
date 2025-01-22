import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { APICALL } from "../common/commonFunctions";
import { BASE_URL, EndPoint, Methods } from "../constants/Api";

const Login = () => {
  let navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    let { email, password } = loginForm;

    const url = EndPoint.LOGIN;

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await APICALL(url, data);
      console.log("Login=>", response);
      if (response.status == true) {
        Swal.fire({
          title: response.message,
          // text: response.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/course", { state: response.data });
        });
      } else {
        Swal.fire({
          title: response.message,
          // text: response.message,
          icon: "error",
          confirmButtonText: "Retry",
        });
      }
    } catch (error) {
      console.log("error=>", error.message);
      Swal.fire({
        title: error.message,
        // text: error.message,
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>
      </Box>

      {/* Login Form */}
      {tabValue === 0 && (
        <form onSubmit={handleLoginSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5" align="center">
              Login
            </Typography>
            <TextField
              label="Email"
              name="email"
              value={loginForm.email}
              onChange={(e) => handleChange(e)}
              fullWidth
              required
              type="email"
            />
            <TextField
              label="Password"
              name="password"
              value={loginForm.password}
              onChange={(e) => handleChange(e)}
              fullWidth
              required
              type="password"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>
        </form>
      )}

      {/* Signup Form */}
      {tabValue === 1 && <Signup />}
    </Container>
  );
};

export default Login;
