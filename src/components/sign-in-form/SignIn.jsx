import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/FormInput";
import Button from "../button/Button";
import toast from "react-hot-toast";
const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // EMAIL + PASSWORD LOGIN
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      toast.success("Login successful ✅");
      navigate("/categories");
    } catch (error) {
       if (error.code === "auth/invalid-credential") {
      toast.error("Invalid credential");
  } else {
      toast.error("Login Fails");
  }
      setEmail("");
      setPassword("")
    }
  };

  // GOOGLE LOGIN
  const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
          toast.success("Login successful ✅");

      navigate("/categories");
  } catch (error) {
          toast.error(error.message);

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

          <Button type="button" bg="bg-blue-500" onClick={signInWithGoogle}>
            SIGN IN WITH GOOGLE
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
