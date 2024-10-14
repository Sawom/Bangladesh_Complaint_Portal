import { useState, useEffect } from 'react';
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
import PostComplain from "./Pages/PostComplain/PostComplain";
import ManageComplain from "./Pages/ManageComplain/ManageComplain";
import useFirebase from './Authentication/useFirebase/useFirebase';
import axios from 'axios';

function App() {
  const { user, loading, setLoading } = useFirebase();
  const [userInfo, setUserInfo] = useState({});

  // to solve header img, userhome's user data update automatically.
  // it changes in Header, UserHome, UpdateUser 
  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.email) {
        try {
          const response = await axios.get(`http://localhost:5000/users?email=${user?.email}`);
          if (response.data.length > 0) {
            setUserInfo(response.data[0]);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } 
      else {
        setUserInfo({});
      }
    };

    fetchUserData();
  }, [user]);


  return (
    <div>
        <AuthProvider>
            <BrowserRouter>
            <Header userInfo={userInfo} setUserInfo={setUserInfo}  ></Header>
                <Routes>
                  <Route path="/" element={ <Homepage></Homepage> } ></Route>
                  <Route path="/login" element={ <Login></Login> } ></Route>
                  <Route path="/register" element={ <Registration></Registration> } ></Route>
                  <Route path="/hotlines" element={ <Hotlines></Hotlines> } ></Route>

                  {/* user home. nested route */}
                  <Route path="/userhome"  element={ <UserHome userInfo={userInfo} setUserInfo={setUserInfo} ></UserHome> } >
                    <Route path="" element={ <MyReviews  userInfo={userInfo} setUserInfo={setUserInfo} ></MyReviews> } ></Route>
                    <Route path="mycomplain" element={ <MyComplain></MyComplain> } ></Route>
                  </Route>

                  {/* post complain here */}
                  <Route path="/postcomplains" element={ <PostComplain></PostComplain> } ></Route>

                  {/* update user */}
                  <Route path='/userhome/update/:id' element={ <UpdateUser setUserInfo={setUserInfo} ></UpdateUser> }  ></Route>
                  {/* update review */}
                  <Route path='/userhome/review/:id'  element={ <UpdateReview></UpdateReview> } ></Route>

                  {/* manage user */}
                  <Route path="/manageuser" element={ <ManageUsers></ManageUsers> } > </Route>
                  {/* manage reviews */}
                  <Route path="/managereview" element={ <ManageReview></ManageReview> } ></Route>
                  {/* manage complain */}
                  <Route path="/managecomplain" element={ <ManageComplain></ManageComplain> } ></Route>

                  {/* add review */}
                  <Route path="/addreview"  element={ <AddReview></AddReview> } ></Route>
                  {/* reviews */}
                  <Route path="/reviews"  element={ <Reviews></Reviews> } ></Route>
                  

                  <Route path='*' element={ <NotFound></NotFound> } ></Route>
                </Routes>
            <Footer></Footer>
              
            </BrowserRouter>
        </AuthProvider>
    </div>
  )
}

export default App;