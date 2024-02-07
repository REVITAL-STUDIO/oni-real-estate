'use client'
import { IoIosClose } from "react-icons/io";

import { useState } from "react"
import toast from "react-hot-toast"

export default function ForgotPassword() {
  const [userEmail, setUserEmail] = useState("")
  const [errorMsg, setErrorMsg] = useState("A network issue occured. Please check your internet connection and try again.")
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)



  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setIsError(false)
    console.log("in handle submit")
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/forgot-password`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userEmail)

      })

      if (!response.ok) {
        switch (response.status) {
          case 401:
            setErrorMsg("No user with the given email found.")
            throw new Error("A valid email address was not given status: 401");
          case 400:
            setErrorMsg("Failed to send verification email. Please try again.")
            throw new Error("Failed to send forgot password request status: 400");
          // Add more cases as needed
          default:
            setErrorMsg("Unexpected error occurred. Please try again.")
            throw new Error(`Failed to send forgot password request status: ${response.status}`);
        }
      }
      setIsSuccess(true)
      console.log("email sent sucessfully")

    } catch (error) {
      setIsError(true)
      console.error(error);
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {isSuccess && <div className="p-[1rem] bg-green-100 flex gap-[3rem] items-center rounded-lg mb-[2rem]"><p className="text-green-700">A reset link has been sent to your inbox.</p><IoIosClose className=" text-green-500 h-[2rem] w-[2rem] hover:cursor-pointer" onClick={()=>setIsSuccess(false)}/></div> }
          {isError && <div className="p-[1rem] bg-red-100 flex gap-[3rem] items-center rounded-lg mb-[2rem]"><p className="text-red-400">{errorMsg}</p><IoIosClose className=" text-red-300 h-[2rem] w-[2rem] hover:cursor-pointer" onClick={()=>setIsError(false)}/></div> }
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={userEmail}
                  onChange={e => setUserEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600'}`}
              >
                Submit
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}
