import { Avatar, Box, Button, LinkOverlay, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import styles from "../styles/homepage.module.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  let token = localStorage.getItem("cointab_token");
  let useremail = localStorage.getItem("useremail");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("cointab_token", '');
    window.location.reload();
  };

  useEffect(() => {
    if(!token){
      console.log('first')
      navigate("/login")
    }
  },[navigate])

  return (
    <Box>
      <Box className={styles.container}>
        <Box className={styles.profile}>
          <Box>
            <Avatar boxSize="5rem" src="https://bit.ly/broken-link" />
          </Box>
          <Box>
            <Text fontSize="25px">Email</Text>
            <Text>{useremail}</Text>
          </Box>
          <Box>
            <Button colorScheme="green" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
