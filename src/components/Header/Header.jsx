import { memo, useCallback } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase/firebase.utils";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import CartDropdown from "../cartDropdown/CartDropdown";
import { logoutUser } from "../../redux/actions/userActions";

const Header = () => {
  const user = useSelector((state) => state.Users.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserLogin = useCallback(async () => {
    try {
      if (user) {
        await signOut(auth);
        dispatch(logoutUser());
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }, [navigate, user]);

  const handleNavigateCategories = useCallback(() => {
    navigate("/categories");
  }, [navigate]);

  return (
    <div className="w-full h-[60px] shadow flex justify-between items-center px-10">
      <section
        onClick={handleNavigateCategories}
        className="w-[70px] cursor-pointer"
      >
        <img
          className="w-full"
          src="https://static.vecteezy.com/system/resources/previews/016/693/132/non_2x/viking-helmet-icon-or-logo-company-free-png.png"
          alt="logo"
        />
      </section>

      <section className="uppercase space-x-2 text-black flex items-center">
        <Link to="/categories">Shop</Link>

        <span onClick={handleUserLogin} className="cursor-pointer">
          {user ? "SignOut" : "SignIn"}
        </span>

        {/* cart popup */}
        <div className="relative group cursor-pointer">
          <ShoppingCartIcon />
          <CartDropdown />
        </div>
      </section>
    </div>
  );
};

export default memo(Header);
