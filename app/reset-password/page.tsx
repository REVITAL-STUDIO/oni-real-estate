'use client'
import { useState } from 'react';
import { IoIosClose } from "react-icons/io";
import { useSearchParams } from 'next/navigation'
import Image from 'next/image';
import Logo from 'public/logo.png'


const ResetPassword = () => {
  const searchParams = useSearchParams()
  const resetToken = searchParams.get('resetToken')
  const resetExpiry = searchParams.get('resetExpiry')
  const resetExpiryDate = resetExpiry ? new Date(decodeURIComponent(resetExpiry)) : null;
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("A network issue occured. Please check your internet connection and try again.")
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setIsError(false)
    setIsSuccess(false)
    setIsLoading(true)
    try {
      if (newPassword != confirmPassword) {
        setErrorMsg("Passwords do not Match")
        throw new Error("Passwords do not match")
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reset-password`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, resetToken })

      })

      if (!response.ok) {
        if (response.status == 400) {
          setErrorMsg("Invalid or expired reset token. Please request a new password reset link.")
          throw new Error("Invalid or expired reset token")
        }
        setErrorMsg("An Unexpected Error occurred with resetting your Password. Please try again or request a new password reset link.")
        throw new Error("Unextected HTTP Error occured with resetting password")
      }
      setIsSuccess(true)
    } catch (error) {
      setIsError(true)
      console.error(error)
    }
    setIsLoading(false)

  }
  console.log("reset token from query params: ", resetToken)
  console.log("token expiration from query params: ", resetExpiryDate)
  console.log("Date now : ", new Date(Date.now()))


  if (resetExpiryDate && new Date(Date.now()) > resetExpiryDate) {
    return (
      <div>
        Rest Link has expired
      </div>
    )
  }


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-agrandir">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            src={Logo}
            alt="oni real estate logo"
            className="invert w-40 p-4 relative top-4 m-auto"
          />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset Password
          </h2>
          {!isSuccess && <p className="text-gray-400 text-sm mt-[3%]">Enter your new password below</p>}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {isSuccess && <div className="p-[1rem] bg-green-100 flex items-center justify-center rounded-lg mb-[2rem]"><p className="text-green-700">Password has been successfully reset!</p></div>}
          {isError && <div className="p-[1rem] bg-red-100 flex gap-3 items-center rounded-lg mb-[2rem]"><p className="text-red-400">{errorMsg}</p><IoIosClose className=" text-red-300 h-[2rem] w-[2rem] hover:cursor-pointer" onClick={() => setIsError(false)} /></div>}
          {!isSuccess && <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                New Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 "
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm New Password
              </label>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 "
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 active:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-800'}`}
              >
                Submit
              </button>
            </div>
          </form>
          }
        </div>
      </div>
    </>
  )
}

export default ResetPassword