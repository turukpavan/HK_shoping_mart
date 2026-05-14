import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignIn from "../../components/signInForm/SignIn";
import SignUp from "../../components/signUpForm/SignUp";

const Home = () => {
  const user = useSelector((state) => state.Users.userData);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/categories");
    }
  }, []);

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-[90%] lg:w-[80%] grid grid-cols-1 md:grid-cols-2 gap-20">
        <SignIn />

        <SignUp />
      </div>
    </div>
  );
};

export default Home;
