"use client"

import React from "react";
import { useState } from "react";
import { HiOutlinePhone } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";

interface Lead {
    id: number;
    name: string,
    number: string,
    email: string,
    message: string,
    status: string,
    source: string,
    color: string
  }


const LeadInfo: React.FC<{ onClose: () => void, selectedLead: Lead }> = ({ onClose, selectedLead }) => {
    const [isSuccess, setIsSuccess] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [isError, setIsError] = useState(false)
    const [leadData, setLeadData] = useState({
        name: '',
        number: '',
        email: '',
        message: '',

    })

    const colorizeStatus = (status: String) => {
        console.log("In colorize func: ", status)
        switch (status) {
          case 'new':
            return (<span className="text-green-500">New</span>)
          case 'contacted':
            return (<span className="bg-yellow-500">Contacted</span>)
          case 'closed':
            return (<span className="text-red-500">Closed</span>)
          default:
            return (<span className="text-gray-500">No Status</span>)
    
        }
      }


    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-30">
            <div className="relative bg-white  rounded-lg px-[2rem] py-[2rem]">
                <div className="flex justify-between mb-[8%]">
                    <p className="text-xl ">Lead</p>
                    <p className="text-4xl font-semibold">{selectedLead.name}</p>
                    <button
                        className=" text-gray-800 hover:text-gray-800 text-4xl"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <div>
                    <div className="flex justify-around gap-[3rem] mb-[15%]">
                        <div >
                            <div className="flex flex-col bg-[#F4F4F4] rounded-lg p-[1rem] shadow-md">
                                <p className="text-2xl mb-[5%]">Message:</p>
                                <p>{selectedLead.message}</p>
                            </div>
                        </div>
                        <div >
                            <div className="flex flex-col bg-[#F4F4F4] rounded-lg py-[1rem] px-[3rem] shadow-md">
                                <p className="text-2xl mb-[15%]">Contact:</p>
                                <div className="mb-[20%]">
                                    <HiOutlinePhone />
                                    <p>{selectedLead.number}</p>
                                </div>
                                <div>
                                    <HiOutlineMail />
                                    <p>{selectedLead.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="absolute bottom-[2rem] left-[2rem] text-xl">Source: {selectedLead.source} </p>

                    <div className="absolute bottom-[2rem] right-[2rem]">
                        <p className="text-xl">Status: {colorizeStatus(selectedLead.status)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadInfo;