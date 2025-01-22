import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip,
  Box,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { EndPoint } from "../constants/Api";
import { APICALL, CommonApiResponse } from "../common/commonFunctions";
import Swal from "sweetalert2";

const Course = () => {
  let Location = useLocation();
  let navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
  });
  const [state, setState] = useState(false);
  let { role } = Location.state;
  // console.log("Location==>", Location.state);
  // console.log("Location==>", role, "user");

  useEffect(() => {
    async function fetchData() {
      const url = EndPoint.GETCOURSE;

      try {
        const response = await APICALL(url);
        console.log("Get Course=>", response);
        setCourses(response.courses);
      } catch (error) {
        console.log("error=>", error.message);
      }
    }
    fetchData();
  }, [state]);

  // Truncate long text
  const truncateText = (text, length = 50) => {
    if (text.length > length) {
      return text.slice(0, length) + "...";
    }
    return text;
  };

  // Handle dialog open
  const handleOpen = (course = null) => {
    setEditingCourse(course);
    if (course) {
      setFormData(course);
    } else {
      setFormData({ name: "", description: "", duration: "", price: "" });
    }
    setOpen(true);
  };

  // Handle dialog close
  const handleClose = () => {
    setOpen(false);
    setEditingCourse(null);
  };

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle create/update course
  const handleSave = async () => {
    if (editingCourse) {
      // Update course

      let { id, name, description, duration, price } = formData;

      const url = EndPoint.UPDATECOURSE;

      const data = { id, name, description, duration, price };
      CommonApiResponse(url, data, setState);
      
    } else {
      // Create course

      let { name, description, duration, price } = formData;

      const url = EndPoint.CREATECOURSE;

      const data = { name, description, duration, price };
      CommonApiResponse(url, data, setState);
    }
    handleClose();
  };

  // Handle delete course
  const handleDelete = async (id) => {
    // console.log("Deleted courseId=>", id);
    let result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      const url = EndPoint.DELETECOURSE;

      const data = { id };
      CommonApiResponse(url, data, setState);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Tooltip
          title={
            role === "user" ? "You are not authorized to create a course" : ""
          }
        >
          <span>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpen()}
              disabled={role == "user"}
              sx={{ marginRight: "70px" }}
            >
              Create Course
            </Button>
          </span>
        </Tooltip>
        <Tooltip title="Logout">
          <IconButton
            color="primary"
            aria-label="logout"
            onClick={() => {
              navigate("/");
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.id}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>
                  <Tooltip title={course.description}>
                    <span>{truncateText(course.description, 30)}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>{course.price}</TableCell>
                <TableCell>
                  {new Date(course.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Tooltip
                    title={
                      role === "user"
                        ? "You are not authorized to edit a course"
                        : ""
                    }
                  >
                    <span>
                      <Button
                        variant="outlined"
                        color="primary"
                        disabled={role == "user"}
                        onClick={() => handleOpen(course)}
                      >
                        Edit
                      </Button>
                    </span>
                  </Tooltip>
                  <Tooltip
                    title={
                      role === "user"
                        ? "You are not authorized to delete a course"
                        : ""
                    }
                  >
                    <span>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDelete(course.id)}
                        style={{ marginLeft: "10px" }}
                        disabled={role == "user"}
                      >
                        Delete
                      </Button>
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingCourse ? "Edit Course" : "Create Course"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Duration"
            name="duration"
            fullWidth
            value={formData.duration}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            fullWidth
            value={formData.price}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Course;
