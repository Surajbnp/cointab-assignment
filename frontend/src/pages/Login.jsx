import React from "react";
import { Box, Input, Button, Text } from "@chakra-ui/react";
import styles from "../styles/login.module.css";

const Login = () => {
  return (
    <Box className={styles.container}>
      <Box>
        <Text fontSize="30px">Login</Text>
        <form>
          <Box>
            <label>Email</label>
            <Input placeholder="enter email" />
          </Box>
          <Box>
            <label>Password</label>
            <Input placeholder="enter password" />
          </Box>
          <Box textAlign={'center'}>
            <Button colorScheme='green'>Login</Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
