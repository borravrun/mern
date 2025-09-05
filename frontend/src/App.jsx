import {Box} from "@chakra-ui/react";
import {Route, Routes} from "react-router";
import HomePage from "./page/HomePage.jsx";
import CreatePage from "./page/CreatePage.jsx";
import NavBar from "./components/NavBar.jsx";
import {Toaster} from "./components/ui/toaster.jsx";

export default function App(){
    return(
        <Box minH={"100vh"}>
            <NavBar/>
            <Toaster/>
            <Routes>
                <Route index path={'/'} element={<HomePage/>}/>
                <Route path={'/create'} element={<CreatePage/>}/>
            </Routes>
        </Box>
    )
}