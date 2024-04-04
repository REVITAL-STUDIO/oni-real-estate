"use client";
import { useState, useEffect, useRef } from "react";

import { AnimatePresence, motion } from "framer-motion";
import InquiryModal from "./InquiryModal";

interface Listing {
  id: number;
  address: string;
  description: string;
  pictures: string[];
  beds: number;
  baths: number;
  area: number;
  price: number;
}

const PropertyInfo: React.FC<{
  selectedListing: Listing;
  handleClose: () => void;
}> = ({ selectedListing, handleClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsInquiryModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsInquiryModalOpen(false);
  };

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      isDraggingRef.current = true;
      startXRef.current = event.pageX;
      if (thumbnailContainerRef.current) {
        startScrollLeftRef.current = thumbnailContainerRef.current.scrollLeft;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current) return;
      event.preventDefault();
      const x = event.pageX;
      const walk = (x - startXRef.current) * 2;
      thumbnailContainerRef.current!.scrollLeft =
        startScrollLeftRef.current - walk;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    // scrollToThumbnail(index);
  };

  // const scrollToThumbnail = (index: number) => {
  //   if (!thumbnailContainerRef.current) return;
  //   const thumbnailWidth =
  //     thumbnailContainerRef.current.scrollWidth /
  //     selectedListing?.pictures.length;
  //   thumbnailContainerRef.current.scrollLeft = index * thumbnailWidth;
  // };

  return (
    <div className="fixed inset-0 z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="bg-white w-full h-full flex flex-col justify-center items-center overflow-y-auto another-scrollbar"
      >
        <div className="float-right w-full h-[25%] xl:h-0 z-50 relative">
          <button
            onClick={handleClose}
            className="w-10 h-10 absolute top-2 right-2"
          >
            <span
              className={`block w-3/4 my-0.5 border absolute border-black rotate-45 transition-transform `}
            ></span>
            <span
              className={`block w-3/4 my-0.5 border absolute border-black -rotate-45 transition-transform `}
            ></span>
          </button>
        </div>
        <motion.section
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          className=" w-[95%] h-[75%] xl:h-full  flex flex-col justify-center items-center  z-20"
        >
          {/* Home and Description */}
          <div className="w-full h-full flex flex-col xl:flex-row justify-around  items-center">
            <div className="xl:w-1/2 w-[100%]  xl:h-5/6 h-1/2 rounded-lg p-4 md:p-16 xl:p-4 ">
              {/* this is the main photo of the listing this is where i want the current slide to go or the current photo in the slide */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={
                    selectedListing?.pictures[currentSlide] ||
                    "/default-image-url.jpg"
                  }
                  width={1}
                  height={1}
                  className="rounded-lg w-full h-full brightness-90 object-cover shadow-xl"
                  alt="homes"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
            </div>
            <div className="xl:w-2/5 w-[90%] h-full xl:h-5/6 text-black">
              <div className="w-full h-1/4 xl:h-1/5 flex items-center">
                <h2 className="text-2xl xl:text-5xl w-2/3 md:w-[82%] text-black font-agrandir tracking-wide font-bold">
                  {selectedListing?.address}
                </h2>
              </div>
              <div className="w-full h-[10%] flex items-center">
                <h2 className="py-2 font-montserrat text-forest font-bold tracking-wide text-3xl  md:text-5xl ">
                  {selectedListing?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  })}
                </h2>
              </div>
              <div className="w-full h-1/6 xl:h-[10%] flex items-center">
                <p className="text-sm tracking-wider md:flex font-montserrat font-regular text-justify xl:w-3/4 py-2">
                  {selectedListing?.description}
                </p>
              </div>
              <p className="text-base font-montserrat font-regular py-4">
                {selectedListing
                  ? `${selectedListing?.beds} Beds | ${selectedListing?.baths} Baths | ${selectedListing?.area} sqft`
                  : "No information available"}
              </p>{" "}
              {/* this is the container inside of it where the thumbails will for the rest of the slides will g */}
              <div
                className="w-full h-[35%] items-center bg-transparent flex gap-[1rem] overflow-hidden"
                ref={thumbnailContainerRef}
              >
                <motion.div
                  drag="x" // Make the container draggable in the x-direction
                  dragConstraints={{ left: 100, right: 100 }} // Constraint to keep it within the parent container
                  className="flex gap-[1.1rem] h-[100%] w-[75%] z-30"
                >
                  {selectedListing?.pictures.map((picture, index) => (
                    <motion.img
                      key={index}
                      src={picture}
                      className={`w-[100%] shadow-xl rounded-2xl object-cover hover:cursor-pointer ${
                        index === currentSlide
                          ? " brightness-110 shadow-lg rounded-2xl transition duration-500"
                          : ""
                      }`}
                      alt={`Thumbnail ${index}`}
                      onClick={() => handleSlideChange(index)}
                      transition={{ duration: 1 }} // Adjust the duration as needed
                    />
                  ))}
                </motion.div>
              </div>
              <div className="w-full h-1/6  flex  items-center">
                {isInquiryModalOpen && (
                  <InquiryModal
                    onClose={handleCloseModal}
                    listingInquired={selectedListing}
                  />
                )}
                <button
                  onClick={handleOpenModal}
                  className="w-1/3 h-8 my-4 text-black border border-black tracking-wider hover:scale-110 transition duration-200 ease-in-out rounded-xl shadow-xl flex justify-center items-center p-4"
                >
                  Inquire
                </button>
              </div>
            </div>
          </div>

          {/* Card Info */}
        </motion.section>
      </motion.div>
    </div>
  );
};

export default PropertyInfo;
