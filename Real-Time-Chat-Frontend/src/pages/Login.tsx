import {
    DoorOpen,
    KeySquare,
    Mail,
    UserCheck2,
  } from "lucide-react";
  import Spinner from "../components/Spinner";

  import { Link } from "react-router-dom";

  export default function Login() {
    const isLoading = false;
  
    return (
      <>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="w-full my-6 max-w-xl text-white shadow-md rounded-xl overflow-hidden">
            <header className="text-center p-5 bg-indigo-700 ">
              <h1 className="text-lg">
                <UserCheck2 className="inline mr-0.5 mb-1" /> Sign In
              </h1>
            </header>
            <main className="py-6 px-8 bg-indigo-500">
              <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="email" className="mb-1 block">
                  <Mail className="inline mr-0.5 mb-1" size={16} /> Email
                </label>
                <input
                  className="bg-white dark:bg-slate-800 p-2 mb-5 h-10 w-full caret-indigo-700 text-indigo-900 dark:text-indigo-300 rounded-lg focus:outline-none focus:border focus:border-indigo-300 focus:ring-0 focus:ring-offset-0 autofill:shadow-[inset_0_0_0px_1000px_rgb(129,140,248)]"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email..."
                  required
                />
                <label htmlFor="password" className="mb-1 block">
                  <KeySquare className="inline mr-0.5 mb-1" size={16} /> Password
                </label>
                <input
                  className="bg-white dark:bg-slate-800 p-2 mb-5 h-10 w-full caret-indigo-700 text-indigo-900 dark:text-indigo-300 rounded-lg focus:outline-none focus:border focus:border-indigo-300 focus:ring-0 focus:ring-offset-0 autofill:shadow-[inset_0_0_0px_1000px_rgb(129,140,248)]"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="submit"
                  className="mt-5 w-full bg-indigo-900 p-2 rounded-lg hover:bg-indigo-700"
                >
                  <DoorOpen className="inline mr-0.5 mb-1" size={14} /> Sign In
                </button>
              </form>
              <p className="mt-3">
                Do ont have an account? <Link to="/register" className="ml-2 font-bold">Sign Up</Link>
              </p>
            </main>
          </div>
        )}
      </>
    );
  }
  