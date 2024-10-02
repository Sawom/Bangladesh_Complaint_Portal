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
import AddReview from "./Pages/AddReview/AddReview";
import Reviews from "./Pages/Reviews/Reviews";
import ManageReview from "./Pages/ManageReview/ManageReview";
import MyReviews from "./Pages/UserHomePage/MyReviews/MyReviews";
import MyComplain from "./Pages/UserHomePage/MyComplain/MyComplain";
import UpdateReview from "./Pages/UpdateReview/UpdateReview";

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

                {/* user home. nested route */}
                <Route path="/userhome"  element={ <UserHome></UserHome> } >
                  <Route path="" element={ <MyReviews></MyReviews> } ></Route>
                  <Route path="mycomplain" element={ <MyComplain></MyComplain> } ></Route>
                </Route>

                {/* update user */}
                <Route path='/userhome/update/:id' element={ <UpdateUser></UpdateUser> }  ></Route>
                {/* update review */}
                <Route path='/userhome/review/:id'  element={ <UpdateReview></UpdateReview> } ></Route>

                {/* manage user */}
                <Route path="/manageuser" element={ <ManageUsers></ManageUsers> } > </Route>
                {/* add review */}
                <Route path="/addreview"  element={ <AddReview></AddReview> } ></Route>
                {/* reviews */}
                <Route path="/reviews"  element={ <Reviews></Reviews> } ></Route>
                {/* manage reviews */}
                <Route path="/managereview" element={ <ManageReview></ManageReview> } ></Route>

                <Route path='*' element={ <NotFound></NotFound> } ></Route>
              </Routes>
              <Footer></Footer>
            </BrowserRouter>
        </AuthProvider>
    </div>
  )
}

export default App;