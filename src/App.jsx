import { Button } from "flowbite-react";
import AuthProvider from "./Authentication/AuthProvider/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Header from "./Pages/Shared/Header/Header";
import Footer from "./Pages/Shared/Footer/Footer";

function App() {

  return (
    <div>
        <AuthProvider>
            <BrowserRouter>
              <Header></Header>
              <Routes>
                <Route path="/" element={ <Homepage></Homepage> } ></Route>

              </Routes>
              <Footer></Footer>
            </BrowserRouter>
        </AuthProvider>
    </div>
  )
}

export default App;