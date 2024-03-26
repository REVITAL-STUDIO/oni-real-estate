"use client";

import React from "react";
import { useState} from "react";
import { HiOutlinePhone } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";
import { FaQuoteLeft } from "react-icons/fa";

interface Lead {
  id: number;
  name: string;
  number: string;
  email: string;
  message: string;
  status: string;
  source: string;
  color: string;
}

const LeadInfo: React.FC<{ onClose: () => void, selectedLead: Lead }> = ({ onClose, selectedLead }) => {
    
    const [isLoading, setIsLoading] = useState(false)
    const [showStatusEdit, setShowStatusEdit] = useState(false)

  const [selectedStatus, setSelectedStatus] = useState(selectedLead.status); // State for selected dropdown value

    const handleSaveStatus = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/leads/${selectedLead.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedStatus),
            })
            if (!response.ok) {
                throw new Error("Error saving lead status, check connection and please try again");
            }
            setSelectedStatus(await response.json())
            setShowStatusEdit(false)
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false)
    }

  const colorizeStatus = (status: string) => {
    console.log("In colorize func: ", status);
    switch (status) {
      case "new":
        return <span className="text-green-500">New</span>;
      case "contacted":
        return <span className="text-yellow-500">Contacted</span>;
      case "converted":
        return <span className="text-red-500">Converted</span>;
      default:
        return <span className="text-gray-500">No Status</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-30">
      <div className="relative bg-white  rounded-lg px-[2rem] py-[2rem] font-montserrat">
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
            <div>
              <div className="flex flex-col bg-[#F4F4F4] rounded-lg p-[1rem] shadow-md w-[20rem]">
                <div>
                  <p className="text-2xl mb-[5%]">Message:</p>
                  <FaQuoteLeft className="text-gray-300" />
                </div>
                <p className="">{selectedLead.message}</p>
              </div>
            </div>
            <div>
              <div className="flex flex-col bg-[#F4F4F4] rounded-lg py-[1rem] px-[3rem] shadow-md min-w-[18rem]">
                <p className="text-2xl mb-[15%]">Contact:</p>
                <div className="mb-[20%]">
                  <HiOutlinePhone className="w-[1.8rem] h-[1.8rem] mb-[5%]" />
                  <p>{selectedLead.number ? selectedLead.number : "None"}</p>
                </div>
                <div>
                  <HiOutlineMail className="w-[1.8rem] h-[1.8rem] mb-[5%]" />
                  <p>{selectedLead.email}</p>
                </div>
              </div>
            </div>
          </div>
          <p className="absolute bottom-[2rem] left-[2rem] text-xl max-w-[40%]">
            Source:{" "}
            <span className="font-semibold text-gray-700">
              {selectedLead.source}
            </span>{" "}
          </p>

          <div className="absolute bottom-[2rem] right-[2rem]">
            <p className="text-xl">
              Status:{" "}
              <span className="font-semibold">
                {showStatusEdit || isLoading
                  ? ""
                  : colorizeStatus(selectedStatus)}
              </span>
            </p>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <div>
                {!showStatusEdit && (
                  <button
                    className="hover:text-blue-400 active:text-black text-sm"
                    onClick={() => setShowStatusEdit(true)}
                  >
                    update
                  </button>
                )}
                {showStatusEdit && (
                  <div className="flex justify-center items-center gap-4">
                    <select
                      className="bg-gray-200 ring-2 ring-gray-700 p-1 hover:cursor-pointer shadow-lg"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                    </select>
                    <div className="flex flex-col text-lg">
                      <button
                        className="hover:text-red-300 active:text-black"
                        onClick={() => setShowStatusEdit(false)}
                      >
                        cancel
                      </button>
                      <button
                        className="hover:text-green-300 active:text-black"
                        onClick={handleSaveStatus}
                      >
                        save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadInfo;
