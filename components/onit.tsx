"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useScroll } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Onit = () => {
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
    <div
      className="w-full h-800   flex justify-center items-center"
      ref={parentRef}
    >
      <div
        className="h-800  md:h-full w-full flex justify-center items-center"
        ref={ref}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={control}
          transition={{ duration: 0.6, delay: 0.25 }}
          className=" w-[90%] h-3/4 bg-[url('/neighborhood2.jpg')] relative bg-cover bg-bottom rounded-2xl shadow-xl flex flex-col justify-center items-center"
        >
          <div className="w-full h-full absolute bg-black/75 opacity-0 rounded-2xl transition ease-out duration-200 hover:opacity-100 flex justify-center items-center">
            <button className=" xl:w-1/4 w-5/6 flex h-16 hover:bg-black/50 text-white border border-white font-light tracking-wider text-xs md:text-sm justify-center items-center transition-all duration-300 ease-in-out font-montserrat bottom-[0%] bg-white xl:left-4  bg-opacity-20 backdrop-blur-5  rounded-2xl shadow-sm p-4  group">
              <span>Your Dream Property Awaits </span>
              <span className="relative left-1 bottom-3 transfrom -rotate-45 flex items-center justify-start w-12 h-12 duration-300 transform translate-y-0 group-hover:-translate-y-[10%] group-hover:translate-x-[25%] group-hover:opacity-100 ease">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="w-4 h-4 text-white"
                />
              </span>
            </button>
          </div>
          <h2 className="text-white p-4 xl:text-2xl text-sm font-agrandir text-center">
            Property Management at it's Finest, and a Group you can Trust
          </h2>
          <svg
            width="380"
            height="312"
            viewBox="0 0 380 312"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="xl:w-full w-5/6"
          >
            <g id="Group 34" filter="url(#filter0_d_1679_89)">
              <circle
                id="Ellipse 57"
                cx="191.762"
                cy="20.7308"
                r="20.7308"
                fill="#C1FF72"
              />
              <circle
                id="Ellipse 59"
                cx="250.992"
                cy="69.7308"
                r="20.7308"
                fill="#C8F3B0"
              />
              <circle
                id="Ellipse 58"
                cx="132.531"
                cy="69.7308"
                r="20.7308"
                fill="#5B6D52"
              />
              <circle
                id="Ellipse 60"
                cx="76.8538"
                cy="119.731"
                r="20.7308"
                fill="#D9D9D9"
              />
              <circle
                id="Ellipse 61"
                cx="303.115"
                cy="119.731"
                r="20.7308"
                fill="#D9D9D9"
              />
              <circle
                id="Ellipse 62"
                cx="76.8538"
                cy="169.731"
                r="20.7308"
                fill="#C1FF72"
              />
              <circle
                id="Ellipse 63"
                cx="303.115"
                cy="169.731"
                r="20.7308"
                fill="#5B6D52"
              />
              <ellipse
                id="Ellipse 64"
                cx="76.8538"
                cy="225.323"
                rx="20.7308"
                ry="21.3231"
                fill="#C8F3B0"
              />
              <ellipse
                id="Ellipse 67"
                cx="303.115"
                cy="225.323"
                rx="20.7308"
                ry="21.3231"
                fill="#D9D9D9"
              />
              <circle
                id="Ellipse 70"
                cx="132.531"
                cy="119.731"
                r="20.7308"
                fill="#C8F3B0"
              />
              <circle
                id="Ellipse 72"
                cx="191.762"
                cy="69.7308"
                r="20.7308"
                fill="#D9D9D9"
              />
              <circle
                id="Ellipse 71"
                cx="250.992"
                cy="119.731"
                r="20.7308"
                fill="#C1FF72"
              />
              <circle
                id="Ellipse 73"
                cx="24.7308"
                cy="154.731"
                r="20.7308"
                fill="#D9D9D9"
              />
              <circle
                id="Ellipse 74"
                cx="355.239"
                cy="154.731"
                r="20.7308"
                fill="#D9D9D9"
              />
              <circle
                id="Ellipse 75"
                cx="128.977"
                cy="169.731"
                r="20.7308"
                fill="#5B6D52"
              />
              <circle
                id="Ellipse 76"
                cx="250.992"
                cy="169.731"
                r="20.7308"
                fill="#C8F3B0"
              />
              <circle
                id="Ellipse 77"
                cx="128.977"
                cy="224.731"
                r="20.7308"
                fill="#D9D9D9"
              />
              <circle
                id="Ellipse 78"
                cx="250.992"
                cy="224.731"
                r="20.7308"
                fill="#D9D9D9"
              />
              <circle
                id="Ellipse 84"
                cx="190.577"
                cy="169.731"
                r="20.7308"
                fill="#D9D9D9"
              />
              <circle
                id="Ellipse 83"
                cx="191.762"
                cy="119.731"
                r="20.7308"
                fill="#728B64"
              />
              <ellipse
                id="Ellipse 79"
                cx="75.6693"
                cy="282.673"
                rx="20.7308"
                ry="21.3231"
                fill="#5B6D52"
              />
              <ellipse
                id="Ellipse 80"
                cx="302.931"
                cy="282.673"
                rx="20.7308"
                ry="21.3231"
                fill="#C8F3B0"
              />
              <circle
                id="Ellipse 81"
                cx="128.977"
                cy="282.08"
                r="20.7308"
                fill="#D9D9D9"
              />
              <circle
                id="Ellipse 82"
                cx="250.992"
                cy="282.084"
                r="20.7308"
                fill="#5B6D52"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_1679_89"
                x="0"
                y="0"
                width="379.969"
                height="311.996"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_1679_89"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_1679_89"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default Onit;
