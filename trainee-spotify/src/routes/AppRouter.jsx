import React from "react";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import MainPage from "../pages/MainPage";


function AppRouter(){

    return(
        <Router>
            <Routes>
                <Route path="/" element={<MainPage></MainPage>}></Route>
            </Routes>
        </Router>
    )
}

export default AppRouter;