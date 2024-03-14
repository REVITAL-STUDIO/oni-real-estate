"use client";

import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { motion, useAnimation, useScroll } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Contact = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const control = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [leadData, setLeadData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const createlead: React.FormEventHandler<HTMLFormElement> = async (e) => {
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
            source: "Homepage form Submission",
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

  useEffect(() => {
    if (!parentRef.current) {
      return;
    }
    if (inView) {
      control.start("visible");
    } else {
      const { bottom } = parentRef.current.getBoundingClientRect();
      const isBelowScreenBottom = bottom > window.innerHeight;
      if (isBelowScreenBottom) {
        control.start("hidden");
      }
    }
  }, [inView, control]);
  return (
    <div ref={parentRef}>
      <div
        className="xl:h-700 h-900 w-full flex flex-col xl:flex-row"
        ref={ref}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={control}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="xl:w-1/4 xl:h-full w-full h-1/4 bg-[url('/houston-contact.jpeg')] brightness-90 bg-cover bg-center rounded-tr-2xl rounded-tl-2xl xl:rounded-tl-none"
        ></motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={control}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="xl:w-3/4 xl:h-full w-full h-3/4 bg-white flex flex-col justify-center items-center relative font-montserrat"
        >
          <div className="w-5/6 xl:3/4 h-[10%] flex items-center  justify-center font-agrandir text-sm  md:text-xl  lg:text-4xl text-black my-4 ">
            <h2 className="w-fit relative left-0 text-black block tracking-wider p-4 rounded-full border ">
              Get in touch with us
            </h2>
          </div>
          {isSuccess ? (
            <div className="h-3/4 flex justify-center items-center text-5xl text-black">
              Message Sent!
            </div>
          ) : (
            <form
              onSubmit={createlead}
              className="w-5/6 h-full flex items-center justify-center flex-col rounded-lg  gap-x-4  z-10"
            >
              <div className="w-full flex flex-wrap justify-center gap-4  ">
                <div className="flex flex-col w-2/5">
                  <label htmlFor="firstName" className="my-2 text-black">
                    First Name
                  </label>
                  <input
                    typeof="firstName"
                    className="h-12 xl:h-16 lg:h-24 rounded-2xl border bg-transparent p-2 xl:p-4  text-black"
                    placeholder="First Name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></input>
                </div>
                <div className="flex flex-col w-2/5">
                  <label htmlFor="lastName" className="my-2 text-black">
                    Last Name
                  </label>
                  <input
                    typeof="lastName"
                    className="h-12 xl:h-16 lg:h-24 border rounded-2xl bg-transparent p-2 xl:p-4rounded-sm text-black"
                    placeholder="Last Name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  ></input>
                </div>
                <div className="flex flex-col w-2/5">
                  <label htmlFor="email" className="my-2 text-black">
                    Email
                  </label>
                  <input
                    typeof="email"
                    className="h-12 xl:h-16 lg:h-24 border rounded-2xl bg-transparent p-2 xl:p-4rounded-sm text-black"
                    placeholder="Email"
                    required
                    value={leadData.email}
                    onChange={(e) =>
                      setLeadData({ ...leadData, email: e.target.value })
                    }
                  ></input>
                </div>
                <div className="flex flex-col w-2/5">
                  <label htmlFor="phone" className="my-2 text-black">
                    Phone
                  </label>
                  <input
                    typeof="phone"
                    className="h-12 xl:h-16 lg:h-24 border rounded-2xl bg-transparent p-2 xl:p-4  text-black"
                    placeholder="Phone"
                    value={leadData.number}
                    onChange={(e) =>
                      setLeadData({ ...leadData, number: e.target.value })
                    }
                  ></input>
                </div>
                <div className="flex flex-col w-[82%]">
                  <label htmlFor="message" className="my-2 text-black">
                    Message
                  </label>
                  <textarea
                    typeof="message"
                    className="h-44 xl:h-32 lg:h-72 border rounded-2xl bg-transparent p-2 xl:p-4  text-black"
                    placeholder="Message"
                    value={leadData.message}
                    onChange={(e) =>
                      setLeadData({ ...leadData, message: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="w-5/6 xl:h-1/4 h-1/2 flex flex-col gap-y-4 justify-center my-8">
                <button
                  type="submit"
                  className="xl:w-1/2 w-3/4 h-auto my-2 ml-1 p-2 lg:p-4 xl:p-4 border rounded-2xl text-black "
                >
                  Send message{" "}
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    size="sm"
                    className="text-pine ml-2 w-4 h-4"
                  />
                </button>
                <p className="xl:w-3/4 w-full  hidden xl:block text-sm xl:text-md text-black font-montserrat tracking-wide">
                  Please do not hesitate to contact us directly. Alternatively,
                  you can send us a message by filling out the form.
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
