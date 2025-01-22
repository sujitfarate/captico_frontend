import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { EndPoint } from "../constants/Api";
import { APICALL, CommonApiResponse } from "../common/commonFunctions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    username: "",
    role: "",
  });

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    console.log("Signup Form Data=>", signupForm);
    let { email, password, username, role } = signupForm;

    const url = EndPoint.SIGNUP;

    const data = {
      email: email,
      password: password,
      username: username,
      role: role,
    };
    CommonApiResponse(url, data);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignupForm({ ...signupForm, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSignupSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h5" align="center">
            Signup
          </Typography>
          <TextField
            label="Username"
            name="username"
            value={signupForm.username}
            onChange={(e) => handleChange(e)}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            value={signupForm.email}
            onChange={(e) => handleChange(e)}
            fullWidth
            required
            type="email"
          />
          <TextField
            label="Password"
            name="password"
            value={signupForm.password}
            onChange={(e) => handleChange(e)}
            fullWidth
            required
            type="password"
          />
          <FormControl fullWidth required>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              value={signupForm.role}
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Signup
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
