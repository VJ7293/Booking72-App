// components/ScrollArrows.js

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const ScrollArrows = () => {
  const [isScrollingUp, setScrollingUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Adjust the threshold as needed
      setScrollingUp(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-52  sm:right-11 xs:right-11 flex flex-col items-center space-y-2">
      {isScrollingUp && (
        <button
          onClick={scrollToTop}
          className="bizluru1 hover:animate-none   px-3 py-2 rounded-full text-white"
        >
          {/* Up arrow */}
          <div className="">
            <FontAwesomeIcon icon={faArrowUp} />
          </div>
        </button>
      )}
      {!isScrollingUp && (
        <button
          onClick={scrollToBottom}
          className="bizluru1 hover:animate-none    px-3 py-2  rounded-full text-white"
        >
          {/* Down arrow */}
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      )}
    </div>
  );
};

export default ScrollArrows;
