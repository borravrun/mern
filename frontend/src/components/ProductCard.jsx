import React from 'react';
import {Box, Heading, HStack, IconButton, Image, Text} from "@chakra-ui/react";
import {FiEdit} from "react-icons/fi";
import {RiDeleteBin6Fill} from "react-icons/ri";
import {useColorModeValue} from "./ui/color-mode.jsx";
import {useProductStore} from "../store/product.js";
import {toaster} from "./ui/toaster.jsx";
import dialog from "./Model.jsx";

function ProductCard({product}) {
    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue('white','gray.800')
    const {deleteProduct} = useProductStore()

    async function handleDeleteProduct(e, id) {
        const {success, message} = await deleteProduct(id);
        e.preventDefault()
        const toastId = toaster.create({
                description: "deleting product",
                type: 'loading',
                closable: true
        })

        if(success){
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
        <Box
            shadow={'lg'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{ transform: "translateY(-5px)", shadow: "xl"}}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'}/>
            <Box p={4}>
                <Heading as={'h3'} size={'md'} mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight={'bold'} fontSize={'xl'} mb={4} color={textColor}>
                    $ {product.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton colorPalette={'blue'} onClick={async () => {
                        dialog.open('a',{
                            product: product,
                            onClose: () => {
                                dialog.close('a')
                            }
                        })
                    }}>
                        <FiEdit/>
                    </IconButton>
                    <IconButton colorPalette={'red'} onClick={(e) => handleDeleteProduct(e, product._id)}>
                        <RiDeleteBin6Fill />
                    </IconButton>
                </HStack>
            </Box>
        </Box>
    );
}

export default ProductCard;