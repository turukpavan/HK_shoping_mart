import React, { useContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import FormInput from "../form-input/FormInput";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      // store extra user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        uid: user.uid,
      });

      console.log("User created:", user);

      navigate("/categories");

    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div>

      <h1 className="text-2xl font-semibold mb-2">
        Don't have an account?
      </h1>

      <p className="text-gray-500 mb-8">
        Sign up with your email and password
      </p>

      <form
        onSubmit={handleSignUp}
        className="flex flex-col gap-6"
      >

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

        <Button
          type="submit"
          className="w-fit mt-4"
        >
          SIGN UP
        </Button>

      </form>

    </div>
  );
};

export default SignUp;