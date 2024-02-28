"use client";

import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import logo from "public/logo-real.png";

const Contact = () => {
  const [isSuccess, setIsSuccess] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [leadData, setLeadData] = useState({
    name: '',
    number: '',
    email: '',
    message: '',

  })

  const [errorMsg, setErrorMsg] = useState("")
  const [isError, setIsError] = useState(false)

  const createlead: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    try {
      const fullName = `${firstName} ${lastName}`;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...leadData, name: fullName}),
      })
      if (!response.ok) {

        throw new Error(`HTTP ERROR - Error creating lead. Status: ${response.status}`)
      } else {
        setIsSuccess(true)

      }
    }
    catch (error) {
      setIsError(true)
      setErrorMsg("A network issue occured. Please check your internet connection and try again.")
      console.error('NETWORK ERROR - Unable to reach the server or network issue. Error Message: ', error)

    }

  }


  return (
    <div className="h-700 w-full flex flex-col xl:flex-row">
      <div className="xl:w-1/4 xl:h-full w-full h-1/4 bg-[url('/houston-contact.jpeg')] brightness-90 bg-cover bg-center saturate-0"></div>
      <div className="xl:w-3/4 xl:h-full w-full h-3/4 bg-forest flex flex-col justify-center items-center relative font-montserrat">
        <div className="w-3/4 h-[10%] flex justify-center font-agrandir text-4xl text-white my-4 ">
          <h2 className="w-full relative left-8 text-white hidden xl:block tracking-wider">
            Get in touch with us
          </h2>
        </div>
        {isSuccess ?
          <div className="h-3/4 flex justify-center items-center text-5xl text-white">Message Sent!</div>
          :
          <form onSubmit={createlead} className="w-5/6 h-3/4 flex items-center justify-center flex-col rounded-lg  gap-x-4  z-10">
            <div className="w-full flex flex-wrap justify-center gap-x-4 h-3/4 ">
              <div className="flex flex-col w-2/5">
                <label htmlFor="firstName" className="my-2 text-white">
                  First Name
                </label>
                <input
                  type="text"
                  className="h-12 xl:h-16 border bg-transparent p-2 xl:p-4 rounded-sm text-white"
                  placeholder="First Name"
                  required
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-col w-2/5">
                <label htmlFor="lastName" className="my-2 text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  className="h-12 xl:h-16  border bg-transparent p-2 xl:p-4rounded-sm text-white"
                  placeholder="Last Name"
                  required
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-col w-2/5">
                <label htmlFor="email" className="my-2 text-white">
                  Email
                </label>
                <input
                  type="email"
                  className="h-12 xl:h-16 border bg-transparent p-2 xl:p-4rounded-sm text-white"
                  placeholder="Email"
                  required
                  value={leadData.email}
                  onChange={e => setLeadData({ ...leadData, email: e.target.value })}
                ></input>
              </div>
              <div className="flex flex-col w-2/5">
                <label htmlFor="phone" className="my-2 text-white">
                  Phone
                </label>
                <input
                  type="text"
                  className="h-12 xl:h-16 border bg-transparent p-2 xl:p-4 rounded-sm text-white"
                  placeholder="Phone"
                  value={leadData.number}
                  onChange={e => setLeadData({ ...leadData, number: e.target.value })}
                ></input>
              </div>
              <div className="flex flex-col w-[82%]">
                <label htmlFor="message" className="my-2 text-white">
                  Message
                </label>
                <textarea
                  className="h-24 xl:h-32 border bg-transparent p-2 xl:p-4 rounded-sm text-white"
                  placeholder="Message"
                  required
                  value={leadData.message}
                  onChange={e => setLeadData({ ...leadData, message: e.target.value })}
                ></textarea>
              </div>
            </div>
            <div className="w-5/6 xl:h-1/4 h-1/2 flex flex-col gap-y-4 justify-center my-8">
              <button
                type="submit"
                className="xl:w-1/2 w-3/4 h-auto my-2 ml-1 p-2 xl:p-4 border bg-forest text-white rounded-md "
              >
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
        }
      </div>
    </div>
  );
};

export default Contact;
