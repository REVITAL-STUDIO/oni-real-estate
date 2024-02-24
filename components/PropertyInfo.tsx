'use client'
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClose, faCheck, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
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






const PropertyInfo: React.FC<{ selectedListing: Listing, handleClose: () => void }> = ({ selectedListing, handleClose }) => {
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
      startScrollLeftRef.current = thumbnailContainerRef.current?.scrollLeft!;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current) return;
      event.preventDefault();
      const x = event.pageX;
      const walk = (x - startXRef.current) * 2;
      thumbnailContainerRef.current!.scrollLeft = startScrollLeftRef.current - walk;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    scrollToThumbnail(index);

  };

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % selectedListing?.pictures.length;
    setCurrentSlide(nextIndex);
    scrollToThumbnail(nextIndex);

  };

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + selectedListing?.pictures.length) % selectedListing?.pictures.length;
    setCurrentSlide(prevIndex);
    scrollToThumbnail(prevIndex);

  };

  const scrollToThumbnail = (index: number) => {
    if (!thumbnailContainerRef.current) return;
    const thumbnailWidth = thumbnailContainerRef.current.scrollWidth / selectedListing?.pictures.length;
    thumbnailContainerRef.current.scrollLeft = index * thumbnailWidth;
  };



  return (
    <div className="fixed inset-0 z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 1 }}
        className="bg-forest w-full h-full flex flex-col justify-center items-center relative overflow-y-auto another-scrollbar"
      >
        <button
          onClick={handleClose}
          className="w-auto h-auto absolute top-2 right-2"
        >
          <FontAwesomeIcon
            className="hover:text-black/50 text-white duration-100 w-6 h-6"
            icon={faClose}
            size="lg"
          />
        </button>
        <motion.section
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          className=" w-[95%] h-[100%]  rounded-2xl flex flex-col justify-evenly items-center"
        >
          {/* Home and Description */}
          <div className="w-full h-full flex flex-col xl:flex-row justify-around items-center">
            <div className="xl:w-1/2 w-[95%]  xl:h-5/6 h-1/2 rounded-lg p-4 ">
              {/* this is the main photo of the listing this is where i want the current slide to go or the current photo in the slide */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={selectedListing?.pictures[currentSlide] || "/default-image-url.jpg"}
                  width={1}
                  height={1}
                  className="rounded-lg w-full h-full brightness-90 object-cover"
                  alt="homes"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>

            </div>
            <div className="xl:w-2/5 w-full h-full xl:h-5/6 text-white">
              <h2 className="text-3xl xl:text-5xl  text-white font-agrandir font-regular">
                {selectedListing?.address}
              </h2>
              <h2 className="  py-2 font-montserrat text-pine font-bold tracking-wide text-2xl xl:text-4xl ">
                {selectedListing?.price?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 },)}
              </h2>
              <p className="text-xs tracking-wider md:flex font-montserrat font-regular text-justify xl:w-3/4 py-2">
                {selectedListing?.description}
              </p>
              <p className="text-base font-montserrat font-regular py-4">
                {selectedListing
                  ? `${selectedListing?.beds} Beds | ${selectedListing?.baths} Baths | ${selectedListing?.area} sqft`
                  : "No information available"}
              </p>{" "}
              {/* this is the container inside of it where the thumbails will for the rest of the slides will g */}
              <div className="w-full h-[30%] items-center bg-transparent flex gap-[1rem] overflow-hidden" ref={thumbnailContainerRef}>
                <div className="flex gap-[1.1rem] h-[70%] ">
                  {selectedListing?.pictures.map((picture, index) => (
                    <motion.img
                      key={index}
                      src={picture}
                      className={`w-[12rem] hover:cursor-pointer ${index === currentSlide ? "border scale-110 brightness-110 shadow-lg transition duration-500" : ""
                        }`}
                      alt={`Thumbnail ${index}`}
                      onClick={() => handleSlideChange(index)}
                      transition={{ duration: 1 }} // Adjust the duration as needed
                    />
                  ))}
                </div>
              </div>
              <div className="w-full h-1/6  flex  items-center">
              {isInquiryModalOpen && <InquiryModal onClose={handleCloseModal} />}
                <button onClick={handleOpenModal} className="w-1/2 h-12 border border-border rounded-xl shadow-md flex justify-center items-center">
                  Inquire.
                </button>
              </div>
            </div>
          </div>

          {/* Card Info */}
        </motion.section>
      </motion.div>
    </div>
  )
}

export default PropertyInfo