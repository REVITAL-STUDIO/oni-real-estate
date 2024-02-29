"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import GoogleIcon from "public/google.png";
import AppleIcon from "public/apple-32.png";
import Logo from "public/logo-real.png";
import mobileLogo from "public/oni-moon.png";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { IoIosClose } from "react-icons/io";

const Nav = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [color, setColor] = useState<boolean>(false);
  const [disappear, setDisappear] = useState<boolean>(false);

  const changeColor = () => {
    if (typeof window !== "undefined") {
      const scrollY = window.scrollY;
      setColor(scrollY >= 80);
      setDisappear(scrollY >= 80);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", changeColor);

      return () => {
        window.removeEventListener("scroll", changeColor);
      };
    }
  }, []);

  //menu animation
  const variants = {
    hidden: { opacity: 0, y: 0, transition: { delay: 3 } },
    visible: {
      opacity: 1,
      transition: { delay: 2.5 },
    },
  };

  // Mobile Menu
  const [openMenu, setOpenMenu] = useState(false);

  const toggleButton = () => {
    setOpenMenu((prev) => !prev);
  };

  // Log in page
  const [openLogin, setOpenLogin] = useState(false);

  const toggleLogin = () => {
    setIsRegisterError(false);
    setOpenLogin(!openLogin);
  };

  // Set overflow property when component mounts and unmounts
  useEffect(() => {
    document.body.style.overflow = openLogin || openMenu ? "hidden" : "auto";

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openLogin, openMenu]);

  //show sign up form
  const [showSignUpForm, setSignUpForm] = useState(false);

  const toggleSignUp = () => {
    setErrorMsg("");
    setIsRegisterError(false);
    setIsLoginError(false);
    setSignUpForm((prev) => !prev);
  };

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState(
    "A network issue occured. Please check your internet connection and try again."
  );
  const [isLoginError, setIsLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegisterError, setIsRegisterError] = useState(false);

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = async () => {
    await signOut();
  };

  //Handling Login
  // Indicating that this function will handle mouse events on HTML button elements in a React application.
  const signInUser: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault(); //prevents the form submission from a pager reload
    setIsLoading(true); //signals loading in progress
    setIsLoginError(false); // indicates there's currently no login error
    signIn("credentials", { ...signInData, redirect: false }).then(
      //autheticates the user with provided creds
      (callback) => {
        if (callback?.error) {
          setErrorMsg(callback.error);
          setIsLoginError(true);
        }

        if (callback?.ok && !callback.error) {
          // go to listings page
          router.push("/listings");
          toggleLogin();
        }
        setIsLoading(false);
      }
    );
  };

  //Handling Sign-up
  const registerUser: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    setIsRegisterError(false); // indicates there's no registration error
    setIsLoading(true);
    try {
      if (
        registerData.email == "" ||
        registerData.password == "" ||
        confirmPassword == ""
      ) {
        setErrorMsg("Must fill in all fields");
        throw new Error("Some fields are not filled out");
      }
      if (registerData.password != confirmPassword) {
        setErrorMsg("Passwords do not Match");
        throw new Error("Passwords do not match");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        }
      );
      if (!response.ok) {
        if (response.status == 400) {
          setErrorMsg("Email already in use!");
        } else {
          setErrorMsg("An unexpected error ocurred please try again.");
        }
        throw new Error(
          `HTTP Error: Error creating user status ${response.status}`
        );
      }
      toggleSignUp();
      setRegisterData({ email: "", password: "" });
      setConfirmPassword("");
      router.push("/listings");
    } catch (error) {
      setIsRegisterError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`h-80 w-full flex fixed bg-gradient-to-b from-black/50 via-black/30 to-transparent z-50 flex-col items-center justify-center transition-all duration-300 ease-in-out ${
        color ? "" : ""
      } ${disappear ? "opacity-0 pointer-events-none " : " "}`}
    >
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="w-full m-auto flex justify-between items-center p-4 text-white"
      >
        <Link href="/" className="font-agrandir text-4xl md:text-5xl">
          <Image
            src={Logo}
            alt="oni real estate logo"
            className="invert w-32 p-4 relative top-4"
          />
        </Link>
        <ul
          className={` text-white font-medium  text-sm hidden uppercase  font-montserrat h-full xl:flex justify-between  tracking-widest items-center gap-x-8  w-auto transition-colors duration-300 ease-in
          `}
        >
          <li className="relative p-4">
            <Link href="/">
              <span className="inline-block transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-10 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-gradient-to-r  before:from-white before:via-white/30 before:to-white hover:before:w-full hover:before:opacity-100">
                Home
              </span>
            </Link>
          </li>
          <li className="relative p-4">
            <Link href="/listings">
              <span className="inline-block transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-10 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-gradient-to-r  before:from-white before:via-white/30 before:to-white hover:before:w-full hover:before:opacity-100">
                Properties
              </span>
            </Link>
          </li>
          <li className="relative p-4">
            <Link href="/owners">
              <span className="inline-block transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-10 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-gradient-to-r  before:from-white before:via-white/30 before:to-white hover:before:w-full hover:before:opacity-100">
                Ownership
              </span>
            </Link>
          </li>
          {!session && (
            <li className="relative p-4">
              <button onClick={toggleLogin}>
                <span className="inline-block uppercase transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-10 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-gradient-to-r  before:from-white before:via-white/30 before:to-white hover:before:w-full hover:before:opacity-100">
                  Login
                </span>
              </button>
            </li>
          )}
          {session && session?.user.role === "admin" && (
            <Link
              className={`
                    relative
                    font-regular
                  `}
              href="/admin"
            >
              <span className="inline-block transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-6 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-gradient-to-r  before:from-mint before:via-mint/30 before:to-mint hover:before:w-full hover:before:opacity-100">
                Admin Portal
              </span>
            </Link>
          )}
          {session && session?.user.role != "admin" && (
            <Link
              className={`
                    relative
                    font-regular
                  `}
              href="/user"
            >
              <span className="inline-block transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-6 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-gradient-to-r  before:from-mint before:via-mint/30 before:to-mint hover:before:w-full hover:before:opacity-100">
                My Property Hub
              </span>
            </Link>
          )}
          {session && (
            <li className="relative p-4">
              <button onClick={handleLogout}>
                <span className="inline-block uppercase transition-all duration-500 before:content-[''] before:absolute before:left-0 before:top-10 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-gradient-to-r  before:from-white before:via-white/30 before:to-white hover:before:w-full hover:before:opacity-100">
                  Logout
                </span>
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Button */}
        <button
          onClick={toggleButton}
          className="w-12 h-12 flex flex-col relative justify-center items-center rounded-full  space-x-reverse xl:hidden z-50"
        >
          <span
            className={`block w-3/4 my-0.5 border border-white ${
              openMenu
                ? "rotate-45 transition-transform duration-300 ease-in-out"
                : "transition-transform duration-300 ease-in-out relative top-0.5"
            }`}
          ></span>
          <span
            className={`block w-3/4 my-0.5 border border-white ${
              openMenu
                ? "-rotate-45 w-3/4 absolute top-2/5 transition-transform duration-300 ease-in-out"
                : "transition-transform duration-300 ease-in-out relative top-0.5"
            }`}
          ></span>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {openMenu && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              className="xl:hidden absolute top-0  right-0 bottom-0  flex justify-center items-center w-full  h-screen bg-mist  "
            >
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ ease: "easeInOut", duration: 0.2 }}
                className="xl:hidden absolute top-0   right-0 bottom-0 w-full h-screen bg-black shadow-xl "
              >
                <Image
                  src={mobileLogo}
                  alt="oni real estate logo"
                  className="invert w-24 p-4"
                />
                <ul
                  className={` gap-y-4 font-medium  flex flex-col justify-center font-agrandir w-full h-1/2
          `}
                >
                  <li className="relative   w-full p-4 text-lg md:text-4xl tracking-wider font-extralight  ">
                    <Link href="/" className="w-full flex justify-between">
                      Home <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                  </li>
                  <li className="relative  flex justify-between  w-full p-4 text-lg md:text-4xl tracking-wider font-extralight  ">
                    <Link href="/users" className="w-full flex justify-between">
                      Login <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                  </li>
                  <li className="relative  flex justify-between  w-full p-4 text-lg md:text-4xl tracking-wider font-extralight  ">
                    <Link
                      href="/owners"
                      className="w-full flex justify-between"
                    >
                      Ownership <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                  </li>
                  <li className="relative  flex justify-between  w-full p-4 text-lg md:text-4xl tracking-wider font-extralight  ">
                    <Link
                      href="/listings"
                      className="w-full flex justify-between"
                    >
                      Properties <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                  </li>
                </ul>
                <div className="w-full flex justify-center items-center">
                  <button className="font-agrandir w-3/4 h-1/3 bg-white text-black border border-white p-4 text-lg rounded-xl">
                    Contact Us.
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Login Action */}
      <AnimatePresence>
        {openLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className=" fixed top-0 left-0 bg-black/75 w-full h-full "
          >
            {/* Sign In/ Log In form */}
            <div className="w-full h-full flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white w-1/2 h-5/6 relative rounded-xl shadow-lg flex flex-col items-center"
              >
                {/* Close Button */}
                <div className="absolute w-fit right-2">
                  <button
                    onClick={() => setOpenLogin(false)}
                    className="w-8 h-8 flex flex-col relative justify-center items-center rounded-full  space-x-reverse  z-10"
                  >
                    <span
                      className={`block w-3/4 my-0.5 border absolute border-black rotate-45 transition-transform `}
                    ></span>
                    <span
                      className={`block w-3/4 my-0.5 border absolute border-black -rotate-45 transition-transform `}
                    ></span>
                  </button>
                </div>
                {/* Sign Up/Sign In */}
                <div className="w-3/4 h-1/5  flex justify-center items-center">
                  <h2 className="text-4xl font-bold p-4 tracking-wide font-agrandir">
                    {showSignUpForm ? "Sign Up" : "Sign In"}
                  </h2>
                </div>
                {/* Form */}

                {showSignUpForm ? (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-3/4 h-[85%] text-sm flex flex-col font-agrandir items-center "
                  >
                    {isRegisterError && (
                      <div className="p-[1rem] bg-red-100 flex gap-[1rem] items-center justify-center rounded-lg mb-[2rem]">
                        <p className="text-red-400">{errorMsg}</p>
                        <IoIosClose
                          className=" text-red-300 h-[1rem] w-[1rem] hover:cursor-pointer"
                          onClick={() => setIsRegisterError(false)}
                        />
                      </div>
                    )}

                    {/* Email */}
                    <div className="flex flex-col w-4/5">
                      <label className="py-2">Email</label>
                      <input
                        className="p-2 rounded-lg text-black bg-slate-400/10"
                        type="text"
                        id="Email"
                        name="Email"
                        placeholder="Email"
                        required
                        value={registerData.email}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    {/* Password */}
                    <div className="flex flex-col w-4/5">
                      <label className="py-2">Password</label>
                      <input
                        className="p-2 rounded-lg text-black bg-slate-400/10"
                        type="password"
                        id="Password"
                        name="Password"
                        placeholder="Password"
                        required
                        value={registerData.password}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                    {/* Confirm Password */}
                    <div className="flex flex-col w-4/5">
                      <label className="py-2">Confirm Password</label>
                      <input
                        className="p-2 rounded-lg text-black bg-slate-400/10"
                        type="password"
                        id="confirm-password"
                        name="confirm-assword"
                        placeholder="Password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    {/* Log In Button */}
                    <div className="flex flex-col justify-evenly w-4/5 h-1/2 my-4">
                      <button
                        onClick={registerUser}
                        className={`p-2 bg-gradient-to-r shadow-md from-pine via-mint/50 to-mint text-base text-black rounded-full tracking-wide hover:opacity-75 ${
                          isLoading ? "opacity-75" : "opacity-100"
                        }`}
                      >
                        {isLoading ? (
                          <div className="h-20 w-20 border-4 border-black rounded-full border-solid border-t-0 border-r-0 border-b-4 border-l-4 animate-spin"></div>
                        ) : (
                          "Sign Up"
                        )}
                      </button>
                      <p className="text-xs p-2">
                        By Clicking Sign Up, you agree to the Private Policy and
                        consent to marketing communications.
                      </p>
                    </div>
                  </motion.form>
                ) : (
                  <motion.form
                    key="login"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-3/4 h-[85%] text-sm flex flex-col font-agrandir items-center "
                  >
                    {isLoginError && (
                      <div className="p-[1rem] bg-red-100 flex gap-[3rem] items-center rounded-lg mb-[2rem]">
                        <p className="text-red-400">{errorMsg}</p>
                        <IoIosClose
                          className=" text-red-300 h-[2rem] w-[2rem] hover:cursor-pointer"
                          onClick={() => setIsLoginError(false)}
                        />
                      </div>
                    )}

                    {/* Email */}
                    <div className="flex flex-col w-4/5">
                      <label className="py-2">Email</label>
                      <input
                        className="p-2 rounded-lg text-black bg-slate-400/10"
                        type="text"
                        id="Email"
                        name="Email"
                        placeholder="Email"
                        autoComplete="email"
                        required
                        value={signInData.email}
                        onChange={(e) =>
                          setSignInData({
                            ...signInData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    {/* Password */}
                    <div className="flex flex-col w-4/5">
                      <label className="py-2">Password</label>
                      <input
                        className="p-2 rounded-lg text-black bg-slate-400/10"
                        type="password"
                        id="Password"
                        name="Password"
                        placeholder="Password"
                        required
                        value={signInData.password}
                        onChange={(e) =>
                          setSignInData({
                            ...signInData,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                    {/* Log In Button */}
                    <div className="flex flex-col justify-evenly w-4/5 h-1/2 my-4">
                      <button
                        disabled={isLoading}
                        onClick={signInUser}
                        className={`p-2 bg-gradient-to-r shadow-md from-pine via-mint/50 to-mint flex justify-center items-center text-base text-black rounded-full tracking-wide hover:opacity-75 ${
                          isLoading ? "opacity-75" : "opacity-100"
                        }`}
                      >
                        {isLoading ? (
                          <div className="h-8 w-8 border-4 border-black rounded-full border-solid border-t-0 border-r-0 border-b-4 border-l-4 animate-spin"></div>
                        ) : (
                          "Login"
                        )}
                      </button>
                      <button
                        onClick={toggleSignUp}
                        className="p-2 border border-black to-mint text-base text-black rounded-full tracking-wide"
                      >
                        Register
                      </button>
                      <a
                        href="/forgot-password"
                        className="tracking-wide p-2 w-fit flex justify-center items-center"
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </motion.form>
                )}
                {/* Other sign in options */}

                <div className="w-3/4 h-3/5 flex flex-col items-center ">
                  {/* or */}
                  <div className="flex items-center w-3/4 h-fit ">
                    <hr className="flex-grow border-t-2 border-gray-300"></hr>
                    <span className="mx-4 uppercase text-sm text-gray-300">
                      or
                    </span>
                    <hr className="flex-grow border-t-2 border-gray-300"></hr>
                  </div>
                  {/* Sign In Options Google and Facebook */}

                  <div className="h-3/5 w-3/4 ">
                    <button
                      onClick={() => signIn("google")}
                      className="w-full my-2 p-4 flex items-center justify-center bg-black text-white text-sm rounded-2xl"
                    >
                      <Image
                        src={GoogleIcon}
                        alt="google icon"
                        className="w-5 mr-4"
                      />
                      Sign in with Google
                    </button>
                    <button
                      onClick={() => signIn("facebook")}
                      className="w-full my-2 p-4 flex items-center justify-center bg-black text-white text-sm rounded-2xl"
                    >
                      <Image
                        src={AppleIcon}
                        alt="Apple icon"
                        className="w-5 mr-4"
                      />
                      Sign in with Apple
                    </button>
                    {showSignUpForm ? (
                      <div className="w-full flex justify-center items-center">
                        <h2>Already a member?</h2>
                        <button
                          onClick={() => toggleSignUp()}
                          className="text-blue-500 font-bold ml-2"
                        >
                          Sign in
                        </button>
                      </div>
                    ) : (
                      " "
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Nav;
