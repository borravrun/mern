import React, {useState} from 'react'
import {Box, Button, Container, Heading, Input, VStack} from "@chakra-ui/react";
import {useColorModeValue} from "../components/ui/color-mode.jsx";
import {useProductStore} from "../store/product.js";
import {useNavigate} from "react-router";
import {toaster} from "../components/ui/toaster.jsx";

export default function CreatePage() {
    const {createProduct} = useProductStore()
    const navigate = useNavigate()
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    })

    async function handleSubmit(e) {
        e.preventDefault()
        const toastId = toaster.create({
                description: "adding new product",
                type: 'loading',
                closable: true
        })

       const {success, message} = await createProduct(newProduct)
        if(success){
            setNewProduct({ name: "", price: "", image: "" });
            toaster.update(toastId, {
                description: message,
                type: 'success',
                closable: true
            })
            setTimeout(() => {
                navigate('/');
            }, 1000)
        }else{
            toaster.update(toastId, {
            title: 'Error',
            description: message,
            type: 'error',
            closable: true
            })
        }




    }
    return (
        <Container maxW={"xl"}>
            <VStack spacing={8}>
                <Heading as={'h1'} size={'2xl'} textAlign={"center"} mb={8}>
                    Create New Product
                </Heading>
                <Box w={"full"} bg={useColorModeValue('white', 'gray.700')} p={6} rounded={'lg'} shadow={'md'}>
                    <VStack spacing={4}>
                        <Input
                            placeholder={"Product Name"}
                            name={'name'}
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        />
                        <Input
                            placeholder={"Product Price"}
                            name={'price'}
                            type={'number'}
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        />
                        <Input
                            placeholder={"Product Image"}
                            name={'image'}
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                        />
                        <Button colorPalette={'blue'} w={'full'} onClick={handleSubmit}>
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}
