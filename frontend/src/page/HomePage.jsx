import React, {useLayoutEffect} from "react"
import {Container, SimpleGrid, Text, VStack} from "@chakra-ui/react";
import {useProductStore} from "../store/product.js";
import {Link} from "react-router";
import ProductCard from "../components/ProductCard.jsx";
import dialog from "../components/Model.jsx";

export default function HomePage() {
    const {products, fetchProducts} = useProductStore()
    useLayoutEffect(() => {
        fetchProducts()
    }, [fetchProducts]);
    return (
        <Container>
            <VStack spacing={8}>
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
                Current Products 🚀
            </Text>
                {products.length === 0 && (
                    <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
                        No Products found 😢 {" "}
                     <Link to={"/create"}>
                         <Text as={"span"} color={"blue.500"} _hover={{ textDecoration: "underline"}}>
                           Create New Product
                         </Text>
                     </Link>
                    </Text>
                )}

                <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={10} w={'full'}>
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product}/>
                    ))}
                </SimpleGrid>
            </VStack>
            <dialog.Viewport/>
        </Container>
    )
}
