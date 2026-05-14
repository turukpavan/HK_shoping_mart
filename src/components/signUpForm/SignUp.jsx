import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import toast from "react-hot-toast";
import FormInput from "../formInput/FormInput";
import { registerUser } from "../../services/authService";
import { getFirebaseErrorMessage } from "../../utils/firebase/firebaseErrors.utils";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");

      return;
    }
    if (password.length < 6) {
  toast.error("Password must be at least 6 characters");
  return;
}

    try {
      setLoading(true);
      await registerUser({name :name.trim(), email : email.trim(), password});

      resetForm();
      navigate("/categories");
      toast.success("Account Created successfully");
    } catch (error) {
      getFirebaseErrorMessage(error.code);
    }finally{
      setLoading(false);
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
           {loading ? "Creating Account..." : "SIGN UP"}
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
