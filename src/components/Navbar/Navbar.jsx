import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import styles from "./Navbar.module.scss";
import MonitorIcon from "@mui/icons-material/Monitor";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Typography } from "@mui/material";
// import ProfileToggleSwitch from "../MuiSwitch/MuiSwitch";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [passwordDetails, setPasswordDetails] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const togglePasswordVisibility3 = () => {
    setShowPassword3(!showPassword3);
  };

  //   useEffect(() => {
  //     if (!userInfo) {
  //       navigate("/login");
  //     }
  //   }, [userInfo, navigate]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPasswordDetails({ ...passwordDetails, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // if (passwordDetails.newPassword !== passwordDetails.confirmNewPassword) {
    //   toast.error("New Password and Confirm New Password do not match");
    //   return;
    // }

    // const payload = {
    //   email: userInfo.email,
    //   old_password: passwordDetails.currentPassword,
    //   new_password: passwordDetails.newPassword,
    //   confirm_password: passwordDetails.confirmNewPassword,
    // };

    // try {
    //   const response = await changePassword(payload).unwrap();

    //   toast.success("Password changed successfully");
    //   handleCloseModal(); // Close the modal if you want
    // } catch (error) {
    //   if (error.data) {
    //     toast.error(`Error: ${error.data.message}`);
    //   } else {
    //     toast.error(`Error: ${error.message}`);
    //   }
    // }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successful");
    navigate("/");
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.wrapper}>
        <div className={styles.oppp}>
          <div className={styles.items}>
            <div className={styles.logo}>
              {/* <Link to={`/dashboard`}> */}
                {/* <img src="/ntt_register_image.png" alt="NTT" /> */}
                E-Library
              {/* </Link> */}
            </div>
            {/* <div className={styles.item} style={{ marginLeft: "50px" }}>
              <span className={styles.active}>E-Library</span>
            </div> */}
          </div>
        </div>

        <div className={styles.items} style={{ paddingRight: "20px" }}>
          <div className={styles.item}>
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    disableRipple
                  >
                    <Avatar sx={{ width: 40, height: 40, marginRight: "5px" }}>
                      {/* {userInfo.username[0].toUpperCase()} */}A
                    </Avatar>
                    &nbsp;
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography variant="p" style={{ fontWeight: "bold" }}>
                        Akshay Wankhade
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Admin
                      </Typography>
                    </Box>
                    <KeyboardArrowDownIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {/* <MenuItem onClick={handleClose}>
                  <ProfileToggleSwitch />
                </MenuItem> */}
                <Link to={`/profile`}>
                  <MenuItem onClick={handleClose}>
                    <Avatar />
                    Profile
                  </MenuItem>
                </Link>
                <Divider />

                <Divider />

                <MenuItem onClick={handleOpenModal} style={{ gap: "5px 12px" }}>
                  <ManageAccountsIcon>
                    <Settings fontSize="small" />
                  </ManageAccountsIcon>
                  Change Password
                </MenuItem>
                {/* <MenuItem onClick={handleClose}>
                  <ManageAccountsIcon>
                    <Settings fontSize="small" />
                  </ManageAccountsIcon>
                  Change Users Passwords
                </MenuItem> */}
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
              {openModal && (
                <div className={styles.popup}>
                  <div className={styles.popupContent}>
                    <div className={styles.header}>
                      <span className={styles.popup_header}> Password </span>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                      <div className={styles.label_input}>
                        <label
                          className={styles.label}
                          htmlFor="currentPassword"
                        >
                          Current Password{" "}
                        </label>
                        <div className={styles.inputContainer}>
                          <input
                            type={showPassword1 ? "text" : "password"}
                            placeholder="Current Password"
                            name="currentPassword"
                            onChange={handleInput}
                            className={styles.input}
                          />
                          <i
                            className={`fa ${
                              showPassword1 ? "fa-eye-slash" : "fa-eye"
                            }`}
                            onClick={togglePasswordVisibility1}
                            style={{ cursor: "pointer" }}
                          ></i>
                        </div>
                      </div>
                      <div className={styles.label_input}>
                        <label className={styles.label} htmlFor="newPassword">
                          New Password
                        </label>
                        <div className={styles.inputContainer}>
                          <input
                            type={showPassword2 ? "text" : "password"}
                            placeholder="New Password"
                            name="newPassword"
                            onChange={handleInput}
                            className={styles.input}
                          />
                          <i
                            className={`fa ${
                              showPassword2 ? "fa-eye-slash" : "fa-eye"
                            }`}
                            onClick={togglePasswordVisibility2}
                            style={{ cursor: "pointer" }}
                          ></i>
                        </div>
                      </div>
                      <div className={styles.label_input}>
                        <label
                          className={styles.label}
                          htmlFor="confirmNewPassword"
                        >
                          Confirm New Password{" "}
                        </label>
                        <div className={styles.inputContainer}>
                          <input
                            type={showPassword3 ? "text" : "password"}
                            placeholder="Confirm New Password"
                            name="confirmNewPassword"
                            onChange={handleInput}
                            className={styles.input}
                          />
                          <i
                            className={`fa ${
                              showPassword3 ? "fa-eye-slash" : "fa-eye"
                            }`}
                            onClick={togglePasswordVisibility3}
                            style={{ cursor: "pointer" }}
                          ></i>
                        </div>
                      </div>
                      <div className={styles.modalBtnContainer}>
                        <button
                          type="button"
                          className="secondaryBtn"
                          onClick={handleCloseModal}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="primaryBtn">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
