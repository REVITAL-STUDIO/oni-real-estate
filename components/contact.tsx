"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import logo from "public/logo-real.png";

const Contact = () => {
  return (
    <div className="h-700 w-full flex flex-col xl:flex-row">
      <div className="xl:w-1/4 xl:h-full w-full h-1/4 bg-[url('/houston-contact.jpeg')] brightness-90 bg-cover bg-center saturate-0"></div>
      <div className="xl:w-3/4 xl:h-full w-full h-3/4 bg-forest flex flex-col justify-center items-center relative font-montserrat">
        <Image
          src={logo}
          alt="oni logo"
          className="w-1/2 h-auto opacity-10  absolute 	"
        ></Image>
        <div className="w-3/4 font-agrandir text-4xl text-white my-2">
          <h2 className="w-1/3 relative left-8 text-white hidden xl:block mb-4">
            Get in touch with us
          </h2>
        </div>
        <form className="w-5/6 h-3/4 flex items-center justify-center flex-col rounded-lg  gap-x-4  z-10">
          <div className="w-full flex flex-wrap justify-center gap-x-4 h-3/4 ">
            <div className="flex flex-col w-2/5">
              <label htmlFor="firstName" className="my-2 text-white">
                First Name
              </label>
              <input
                typeof="firstName"
                className="h-12 xl:h-16 border bg-transparent p-2 xl:p-4 rounded-sm text-white"
                placeholder="First Name"
              ></input>
            </div>
            <div className="flex flex-col w-2/5">
              <label htmlFor="lastName" className="my-2 text-white">
                Last Name
              </label>
              <input
                typeof="lastName"
                className="h-12 xl:h-16  border bg-transparent p-2 xl:p-4rounded-sm text-white"
                placeholder="Last Name"
              ></input>
            </div>
            <div className="flex flex-col w-2/5">
              <label htmlFor="email" className="my-2 text-white">
                Email
              </label>
              <input
                typeof="email"
                className="h-12 xl:h-16 border bg-transparent p-2 xl:p-4rounded-sm text-white"
                placeholder="Email"
              ></input>
            </div>
            <div className="flex flex-col w-2/5">
              <label htmlFor="phone" className="my-2 text-white">
                Phone
              </label>
              <input
                typeof="phone"
                className="h-12 xl:h-16 border bg-transparent p-2 xl:p-4 rounded-sm text-white"
                placeholder="Phone"
              ></input>
            </div>
            <div className="flex flex-col w-[82%]">
              <label htmlFor="message" className="my-2 text-white">
                Message
              </label>
              <textarea
                typeof="message"
                className="h-24 xl:h-32 border bg-transparent p-2 xl:p-4 rounded-sm text-white"
                placeholder="Message"
              ></textarea>
            </div>
          </div>
          <div className="w-5/6 xl:h-1/4 h-1/2 flex flex-col gap-y-4 justify-center my-8">
            <button
              type="submit"
              className="xl:w-1/2 w-3/4 h-auto my-2 ml-1 p-2 xl:p-4 border bg-forest text-white rounded-md "
            >
              Send message{" "}
              <FontAwesomeIcon
                icon={faPaperPlane}
                size="sm"
                className="text-pine ml-2 w-4 h-4"
              />
            </button>
            <p className="xl:w-3/4 w-full text-sm xl:text-md text-white font-montserrat tracking-wide">
              Please do not hesitate to contact us directly. Alternatively, you
              can send us a message by filling out the form.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
