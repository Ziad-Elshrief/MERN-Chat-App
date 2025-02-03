import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { useUserInfo } from "./context/UserInfoContext";
import Spinner from "./components/Spinner";

export default function App() {
  const { isLoading } = useUserInfo();
  console.log(isLoading)
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
        <Navbar />
      {isLoading ? (
        <Spinner />
      ) : (
          <Outlet />
      )}
    </>
  );
}
