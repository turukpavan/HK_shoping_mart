import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase.utils";
import { logoutUser, setUser } from "../../actions/userActions";

const ProtectedRoute = () => {
  const user = useSelector((state)=>state.Users.userData) 
  
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {

        if (user) {

          dispatch(
            setUser({
              name: user.displayName,
              email: user.email,
              uid: user.uid,
            })
          );

        } else {

          dispatch(logoutUser());

        }
      }
    );

    return unsubscribe;

  }, [dispatch])
  


  // If user is not logged in → redirect to home
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If logged in → render child routes
  return <Outlet />;
};

export default ProtectedRoute;