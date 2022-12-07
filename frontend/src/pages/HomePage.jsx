import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import styles from "../styles/homepage.module.css";

const HomePage = () => {
  return (
    <Box>
      <Box className={styles.container}>
        <Box className={styles.profile}>
          <Box>
            <Avatar boxSize="5rem" src="https://bit.ly/broken-link" />
          </Box>
          <Box>
            <Text fontSize="25px">Email</Text>
            <Text>surajguptabnp14c@gmail.com</Text>
          </Box>
          <Box>
            <Button colorScheme="green">Logout</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
