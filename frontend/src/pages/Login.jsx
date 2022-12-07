import React, { useState } from "react";
import { Box, Input, Button, Text, Spinner, color } from "@chakra-ui/react";
import styles from "../styles/login.module.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [msg, setMsg] = useState("");

  const handleLogin = () => {
    setLoader(true);
    const payload = {
      email: email,
      password: password,
    };
    axios
      .post(
        "https://backend-production-e074.up.railway.app/auth/login",
        payload
      )
      .then((res) => {
          setLoader(false);
          localStorage.setItem("cointab_token", res.data.token);
          localStorage.setItem("useremail", res.data.useremail);
          navigate("/");
      })
      .catch((err) => {
        setMsg(err.response.data);
        setLoader(false);
        if(!msg.blockedTill){
          toast.error("Invalid Credentials",{
            theme : "colored",
            autoClose : 1000
          })
        }
      });
  };

  return (
    <Box className={styles.container}>
      <Box>
        <Text fontSize="30px">Login</Text>
        <form>
          <Box>
            <label>Email</label>
            <Input
              placeholder="enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box>
            <label>Password</label>
            <Input
              placeholder="enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          {msg.blockedTill ? (
            <Text
              fontSize="14px"
              color="red"
              p="5px"
            >{`user blocked till ${msg.blockedTill}`}</Text>
          ) : null}

          <Box textAlign={"center"}>
            <Button colorScheme="green" onClick={handleLogin}>
              {loader ? <Spinner /> : "Login"}
            </Button>
          </Box>
        </form>
        <ToastContainer />
      </Box>
    </Box>
  );
};

export default Login;
