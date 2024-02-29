"use client";

import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "public/logo-real.png";
import {
  faClose,
  faMobile,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const ScheduleModal: React.FC<{ handleClose: () => void }> = ({
  handleClose,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [leadData, setLeadData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  const createLead: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const fullName = `${firstName} ${lastName}`;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/leads`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...leadData,
            name: fullName,
            source: "Ownership page form submission",
          }),
        }
      );
      if (!response.ok) {
        throw new Error(
          `HTTP ERROR - Error creating lead. Status: ${response.status}`
        );
      } else {
        setIsSuccess(true);
      }
    } catch (error) {
      setIsError(true);
      setErrorMsg(
        "A network issue occured. Please check your internet connection and try again."
      );
      console.error(
        "NETWORK ERROR - Unable to reach the server or network issue. Error Message: ",
        error
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="fixed inset-0 z-100"
    >
      <div
        className="w-full h-full bg-white/80
      flex justify-center items-center z-50"
      >
        <motion.section
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          className="xl:w-1/3 w-[90%] h-[90%] backdrop-blur bg-black/70  rounded-2xl shadow-xl"
        >
          <button
            onClick={handleClose}
            className="w-12   h-12 flex justify-center items-center"
          >
            <FontAwesomeIcon icon={faClose} className="w-6 h-6 text-white " />
          </button>
          <div className="w-full h-[95%] flex flex-col justify-center items-center z-100">
            <Image src={Logo} alt="company logo" className="w-1/3 invert " />
            <h2 className="text-2xl font-agrandir tracking-wide mt-4 font-bold text-white">
              Let's Talk.
            </h2>
            {/* Schedule */}
            <div className="w-full h-4/5 flex justify-evenly items-center flex-col">
              {isSuccess ? (
                <div className="text-3xl">Message Sent!</div>
              ) : (
                <form
                  onSubmit={createLead}
                  className="bg-transparent rounded  w-3/4 h-5/6 text-gray-300"
                >
                  {/* First Name */}
                  <div className="mb-4">
                    <label className="block text-white font-montserrat  text-sm font-medium mb-2">
                      First Name
                    </label>
                    <input
                      className="shadow appearance-none font-montserrat  bg-transparent border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  {/* Last Name */}
                  <div className="mb-4">
                    <label className="block text-white font-montserrat  text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      className="shadow appearance-none font-montserrat  bg-transparent border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  {/* Last Name */}
                  <div className="mb-4">
                    <label className="block text-white font-montserrat  text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      className="shadow appearance-none font-montserrat  bg-transparent border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="text"
                      placeholder="Email"
                      required
                      value={leadData.email}
                      onChange={(e) =>
                        setLeadData({ ...leadData, email: e.target.value })
                      }
                    />
                  </div>
                  {/* Submission Field */}
                  <div className="mb-4">
                    <label className="block text-white font-montserrat  text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      className="resize-none shadow font-montserrat  appearance-none bg-transparent border rounded w-full py-6 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                      id="message"
                      placeholder="Type your message here..."
                      required
                      value={leadData.message}
                      onChange={(e) =>
                        setLeadData({ ...leadData, message: e.target.value })
                      }
                    ></textarea>
                    <div className="my-2 h-1/5 w-full flex justify-center items-center ">
                      <button
                        className="w-3/4 border font-montserrat text-sm rounded-full text-white font-bold p-2"
                        type="submit"
                      >
                        Submit.
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default ScheduleModal;