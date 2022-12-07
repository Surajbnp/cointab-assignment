import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Text
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';



export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box display='flex' alignItems='center'>
            <img src="https://play-lh.googleusercontent.com/AVz92eh9p0Qi_aPveM2H43IujoAjDkdRzPbUQeTMOfug9yK8NhkoQnJ14kwzTpQsZnY" width={'8%'} alt="logo" />
            <Text   fontFamily ="'Space Grotesk', sans-serif" ml='10px' fontWeight={600} fontSize='xl'>Cointab Assignment</Text>
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}