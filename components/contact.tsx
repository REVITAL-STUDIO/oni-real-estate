"use client";

import React, { useEffect, useRef } from "react";
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
        className="xl:h-700 h-screen w-full flex flex-col xl:flex-row"
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
          className="xl:w-1/4 xl:h-full w-full h-1/4 bg-[url('/houston-contact.jpeg')] brightness-90 bg-cover bg-center rounded-tr-2xl "
        ></motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={control}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="xl:w-3/4 xl:h-full w-full h-3/4 bg-white flex flex-col justify-center items-center relative font-montserrat"
        >
          <div className="w-3/4 h-[10%] flex justify-center font-agrandir text-4xl text-black my-4 ">
            <h2 className="w-full relative left-0 text-black block tracking-wider">
              Get in touch with us
            </h2>
          </div>
          <form className="w-5/6 h-full flex items-center justify-center flex-col rounded-lg  gap-x-4  z-10">
            <div className="w-full flex flex-wrap justify-center gap-4  ">
              <div className="flex flex-col w-2/5">
                <label htmlFor="firstName" className="my-2 text-black">
                  First Name
                </label>
                <input
                  typeof="firstName"
                  className="h-12 xl:h-16 border bg-transparent p-2 xl:p-4 rounded-sm text-black"
                  placeholder="First Name"
                ></input>
              </div>
              <div className="flex flex-col w-2/5">
                <label htmlFor="lastName" className="my-2 text-black">
                  Last Name
                </label>
                <input
                  typeof="lastName"
                  className="h-12 xl:h-16  border bg-transparent p-2 xl:p-4rounded-sm text-black"
                  placeholder="Last Name"
                ></input>
              </div>
              <div className="flex flex-col w-2/5">
                <label htmlFor="email" className="my-2 text-black">
                  Email
                </label>
                <input
                  typeof="email"
                  className="h-12 xl:h-16 border bg-transparent p-2 xl:p-4rounded-sm text-black"
                  placeholder="Email"
                ></input>
              </div>
              <div className="flex flex-col w-2/5">
                <label htmlFor="phone" className="my-2 text-black">
                  Phone
                </label>
                <input
                  typeof="phone"
                  className="h-12 xl:h-16 border bg-transparent p-2 xl:p-4 rounded-sm text-black"
                  placeholder="Phone"
                ></input>
              </div>
              <div className="flex flex-col w-[82%]">
                <label htmlFor="message" className="my-2 text-black">
                  Message
                </label>
                <textarea
                  typeof="message"
                  className="h-24 xl:h-32 border bg-transparent p-2 xl:p-4 rounded-sm text-black"
                  placeholder="Message"
                ></textarea>
              </div>
            </div>
            <div className="w-5/6 xl:h-1/4 h-1/2 flex flex-col gap-y-4 justify-center my-8">
              <button
                type="submit"
                className="xl:w-1/2 w-3/4 h-auto my-2 ml-1 p-2 xl:p-4 border  text-black rounded-md "
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
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
