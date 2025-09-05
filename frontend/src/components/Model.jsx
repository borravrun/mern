import {Button, createOverlay, Dialog, Input, Portal, VStack} from "@chakra-ui/react";
import React, {useState} from "react";
import {toaster} from "./ui/toaster.jsx";
import {useProductStore} from "../store/product.js";

const dialog =  createOverlay((props) => {
    const {product, onClose, ...rest} = props;
     const [updateProduct, setupdateProduct] = useState({
        name: product.name || "",
        price: product.price || "",
        image: product.image || "",
    })

    const {updateProductById } = useProductStore()

    async function handleUpdateProduct(e) {
         e.preventDefault()
         const toastId = toaster.create({
                description: "adding new product",
                type: 'loading',
                closable: true
        })

       const {success, message} = await updateProductById(product._id, updateProduct)
        if(success){
            toaster.update(toastId, {
                description: message,
                type: 'success',
                closable: true
            })
            onClose()
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
        <Dialog.Root {...rest}>
            <Portal>
                <Dialog.Backdrop/>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Update Product</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <VStack spaceing={4}>
                                <Input
                                    placeholder={"Product Name"}
                                    name={"name"}

                                    defaultValue={updateProduct.name}
                                    onChange={(e) => setupdateProduct({...updateProduct, name: e.target.value})}
                                />
                                <Input
                                    placeholder={"Product price"}
                                    name={"price"}
                                    defaultValue={updateProduct.price}
                                    onChange={(e) => setupdateProduct({...updateProduct, price: e.target.value})}
                                />

                               <Input
                                    placeholder={"Product image"}
                                    name={"image"}
                                    defaultValue={updateProduct.image}
                                    onChange={(e) => setupdateProduct({...updateProduct, image: e.target.value})}
                                />
                           </VStack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button colorPalette={'blue'} mr={3} onClick={(handleUpdateProduct)}>Save</Button>
                            <Button colorPalette={'ghost'} onClick={onClose}>Close</Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
})

export default dialog;