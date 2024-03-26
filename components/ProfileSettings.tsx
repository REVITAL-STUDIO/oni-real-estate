"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface User {
  id: string;
  name: string;
  email: string;
  number: string;
}

interface profileProps {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;

  userInfo?: User;
  setUserInfo?: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const ProfileSettings: React.FC<profileProps> = ({
  openMenu,
  setOpenMenu,
  userInfo,
  setUserInfo,
}) => {
  const { data: session} = useSession(); 
  let userData: User = userInfo || { id: "", name: "", email: "", number: "" };
  const setUserData =
    setUserInfo ||
    ((info: User) => {
      userData = info;
    });

  const [userDataEdit, setUserDataEdit] = useState<User | null>();
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [noChangeError, setNoChangeError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  //Signout Button - Log out
  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    await signOut({ redirect: false });
    router.push("/");
  };

  const closeSettings = () => {
    setOpenMenu(false);
    // setUserDataEdit(userData);
    setNewPassword("");
    setNewPasswordConfirm("");
    setNoChangeError(false);
    setPasswordError(false);
  };

  //Password and User name Changes || Used for saving user data and making changes
  const saveUserData: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    setNoChangeError(false);
    setPasswordError(false);
    if (newPassword == "" && userDataEdit == userData) {
      // So if the values are empty or the password is the same as the original no change occurs
      setNoChangeError(true);
      throw new Error("No values changed");
    }
    if (newPassword != newPasswordConfirm) {
      //If confirmation password is not the same than it throws the password not matching
      setPasswordError(true);
      throw new Error("Passwords do not match");
    }

    try {
      const response = await fetch(
        `/api/user`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...userDataEdit, password: newPassword }),
        }
      );
      if (!response.ok) {
        throw new Error(
          `HTTP ERROR - Error Saving user information. Status: ${response.status}`
        );
      }
      const newUserData = await response.json();
      console.log("NEW USER DATA: ", newUserData);
      setUserData(newUserData);
      setOpenMenu(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchUserData();
    }
  }, [session, openMenu]);

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `/api/user/${session?.user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error retrieving user infromation");
      }

      const user: User = await response.json();
      console.log("user: ", user);
      setUserData?.(user);
      setUserDataEdit(user);
      setIsLoading(false);
      console.log("############## USER DATA: ", userData);
    } catch (error) {
      console.log("Error Fetching User Data: ", error);
    }
  };

  return (
    <div>
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-white/75 w-full h-full fixed top-0 left-0 z-50"
          >
            <motion.div
              initial={{ opacity: 0, left: -100 }}
              animate={{ opacity: 1, left: 0 }}
              exit={{ opacity: 0, left: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="xl:w-1/3 w-3/4 bg-black h-full flex flex-col items-center relative"
            >
              {/* Close Button */}
              <div className="absolute w-fit right-2 p-4">
                <button
                  onClick={() => closeSettings()}
                  className="w-8 h-8 flex flex-col relative justify-center items-center rounded-full  space-x-reverse  z-10"
                >
                  <span
                    className={`block w-3/4 my-0.5 border absolute border-white rotate-45 transition-transform `}
                  ></span>
                  <span
                    className={`block w-3/4 my-0.5 border absolute border-white -rotate-45 transition-transform `}
                  ></span>
                </button>
              </div>

              {!isLoading && userData && userDataEdit ? (
                <div className="w-full">
                  {/* Profile  */}
                  <div className="w-5/6 h-1/4 flex items-center">
                    <div className="w-32 h-32  inset-0 relative rounded-2xl flex justify-center items-center">
                      <div className="w-24 h-24 bg-eggshell inset-0 rounded-2xl shadow-md flex justify-center items-center">
                        <h2 className="text-5xl text-white font-montserrat">
                          {userDataEdit.name.charAt(0).toUpperCase()}
                        </h2>
                      </div>
                    </div>
                    <h2 className="text-white text-lg font-agrandir p-4 ">
                      Edit Profile
                    </h2>
                  </div>
                  {/* Form */}
                  <form className="w-full h-full  text-sm flex flex-col font-agrandir items-center ">
                    {/* Name */}
                    <div className="flex flex-col w-4/5">
                      <label className="py-4 text-white">Name</label>
                      <input
                        className="p-4 rounded-lg text-white bg-slate-400/10"
                        type="text"
                        id="Name"
                        name="Name"
                        value={userDataEdit.name}
                        onChange={(e) =>
                          setUserDataEdit({
                            ...userDataEdit,
                            name: e.target.value,
                          })
                        }
                        placeholder="Name"
                      />
                    </div>
                    {/* Phone */}
                    {session?.user.role == "user" && (
                      <div className="flex flex-col w-4/5">
                        <label className="py-4 text-white">Phone</label>
                        <input
                          className="p-4 rounded-lg text-white bg-slate-400/10"
                          type="text"
                          id="Phone"
                          name="Phone"
                          value={userDataEdit.number}
                          onChange={(e) =>
                            setUserDataEdit({
                              ...userDataEdit,
                              number: e.target.value,
                            })
                          }
                          placeholder="Phone"
                        />
                      </div>
                    )}
                    {/* Email */}
                    <div className="flex flex-col w-4/5">
                      <label className="py-4 text-white">Email</label>
                      <input
                        className="p-4 rounded-lg text-white bg-slate-400/10"
                        type="text"
                        id="Email"
                        name="Email"
                        value={userDataEdit.email}
                        onChange={(e) =>
                          setUserDataEdit({
                            ...userDataEdit,
                            email: e.target.value,
                          })
                        }
                        placeholder="Email"
                      />
                    </div>
                    {/* Password */}
                    <div className="flex flex-col w-4/5 mb-[3%]">
                      <label className="py-4 text-white">Password Change</label>
                      <input
                        className={`p-4 rounded-lg text-white bg-slate-400/10 ${
                          passwordError ? "border-2 border-red-400" : ""
                        }`}
                        type="password"
                        id="Password"
                        name="Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                      />
                    </div>
                    {/* Confirm Password */}
                    <div className="flex flex-col w-4/5 mb-[3%]">
                      <input
                        className={`p-4 rounded-lg text-white bg-slate-400/10 ${
                          passwordError ? "border-2 border-red-400" : ""
                        }`}
                        type="password"
                        id="Confirm-Password"
                        name="Confirm Password"
                        value={newPasswordConfirm}
                        onChange={(e) => setNewPasswordConfirm(e.target.value)}
                        placeholder="Confirm New Password"
                      />
                    </div>
                    {passwordError && (
                      <div className="text-red-400">Passwords do not match</div>
                    )}
                    {noChangeError && (
                      <div className="text-red-400">No fields changed</div>
                    )}

                    {/* Log In Button */}
                    <div className="justify-evenly w-full h-1/2 my-4 flex  items-start ">
                      <button
                        onClick={saveUserData}
                        className="p-4 bg-gradient-to-r shadow-md w-1/3 from-pine via-mint/50 to-mint text-base text-black rounded-2xl tracking-wide hover:opacity-80 active:opacity-100"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleLogout}
                        className="p-4 bg-red-700 w-1/3 rounded-2xl text-base tracking-wider shadow-md hover:opacity-80 active:opacity-100"
                      >
                        Logout
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-white flex justify-center items-center min-h-full">
                  <div className="h-20 w-20 border-4 border-mint rounded-full border-solid border-t-0 border-r-0 border-b-4 border-l-4 animate-spin"></div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileSettings;
