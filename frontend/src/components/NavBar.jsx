import React from 'react'
import {Button, Container, Flex, HStack, Text} from "@chakra-ui/react";
import {Link} from "react-router";
import {CiLight, CiSquarePlus} from "react-icons/ci";
import {useColorMode} from "./ui/color-mode.jsx";
import {FaMoon} from "react-icons/fa";


export default function NavBar() {
    const {colorMode, toggleColorMode} = useColorMode()
    return (
        <Container maxW={'100vw'} p={4} >
            <Flex
                alignItems={"center"}
                justifyContent={'space-between'}>

               <Text
                  bgGradient="to-r"
                  gradientFrom="cyan.400"
                  gradientTo="blue.500"
                  bgClip="text"
                  fontSize={{base: 22, sm: 28}}
                  textTransform={"uppercase"}
                  textAlign={"center"}
                  fontWeight="bold"
               >
                   <Link to={'/'}>
                       Product Store 🛒
                   </Link>
                </Text>
                <HStack spacing={2} alignItems={'center'}>
                    <Link to={'/create'}>
                        <Button>
                            <CiSquarePlus fontSize={20}/>
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <FaMoon fontSize={20}/> :  <CiLight fontSize={20}/> }
                    </Button>
                </HStack>
            </Flex>
        </Container>
    )
}
