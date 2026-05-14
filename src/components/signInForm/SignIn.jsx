import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../button/Button";
import FormInput from "../formInput/FormInput";
import { loginWithEmail, loginWithGoogle } from "../../services/authService";
import { getFirebaseErrorMessage } from "../../utils/firebase/firebaseErrors.utils";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await loginWithEmail(email, password);

      toast.success("Login successful ✅");
      navigate("/categories");
    } catch (error) {
      getFirebaseErrorMessage(error.code);

      setEmail("");
      setPassword("");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();

      toast.success("Login successful ✅");
      navigate("/categories");
    } catch (error) {
      getFirebaseErrorMessage(error.code)
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Already have an account?</h1>

      <p className="text-gray-500 mb-8">Sign in with your email and password</p>

      <form onSubmit={handleSignIn} className="flex flex-col gap-6">
        <FormInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex gap-4 mt-4">
          <Button type="submit">SIGN IN</Button>

          <Button type="button" bg="bg-blue-500" onClick={handleGoogleLogin}>
            SIGN IN WITH GOOGLE
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
