import toast from "react-hot-toast";

export const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
        case "auth/email-already-in-use":
          toast.error("Email already exists. Please sign in.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email address");
          break;
        case "auth/weak-password":
          toast.error("Password should be at least 6 characters");
          break;
        case "auth/invalid-credential" :
            toast.error("Invalid credential");
            break;
        default:
          toast.error(errorCode.message);
      }
}