import { Button } from "flowbite-react";
import AuthProvider from "./Authentication/AuthProvider/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Header from "./Pages/Shared/Header/Header";
import Footer from "./Pages/Shared/Footer/Footer";
import Login from "./Pages/Login/Login";
import Registration from "./Pages/Registration/Registration";
import Hotlines from "./Pages/Hotlines/Hotlines";
import UserHome from "./Pages/UserHomePage/UserHome";
import ManageUsers from "./Pages/ManageUsers/ManageUsers";
import UpdateUser from "./Pages/UpdateUser/UpdateUser";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  return (
    <div>
        <AuthProvider>
            <BrowserRouter>
              <Header></Header>
              <Routes>
                <Route path="/" element={ <Homepage></Homepage> } ></Route>
                <Route path="/login" element={ <Login></Login> } ></Route>
                <Route path="/register" element={ <Registration></Registration> } ></Route>
                <Route path="/hotlines" element={ <Hotlines></Hotlines> } ></Route>

                {/* user home */}
                <Route path="/userhome"  element={ <UserHome></UserHome> } ></Route>
                {/* update user */}
                <Route path='/userhome/update/:id' element={ <UpdateUser></UpdateUser> }  ></Route>
                {/* manage user */}
                <Route path="/manageuser" element={ <ManageUsers></ManageUsers> } > </Route>
                


                <Route path='*' element={ <NotFound></NotFound> } ></Route>
              </Routes>
              <Footer></Footer>
            </BrowserRouter>
        </AuthProvider>
    </div>
  )
}

export default App;