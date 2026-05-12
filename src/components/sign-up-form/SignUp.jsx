import React, { useContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import FormInput from "../form-input/FormInput";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");

      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        uid: user.uid,
      });

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/categories");
      toast.success("Login successful");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("Email already exists. Please sign in.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email address");
          break;
        case "auth/weak-password":
          toast.error("Password should be at least 6 characters");
          break;

        default:
          toast.error(error.message);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Don't have an account?</h1>

      <p className="text-gray-500 mb-8">Sign up with your email and password</p>

      <form onSubmit={handleSignUp} className="flex flex-col gap-6">
        <FormInput
          type="text"
          placeholder="Display Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <FormInput
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button type="submit" className="w-fit mt-4">
          SIGN UP
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
