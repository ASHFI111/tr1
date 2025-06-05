import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Routing from "./Components/Routes/Routing";
import Footer from "./Components/Footer/Footer";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        {/* Unique Loader: Pulsing Ring + Rotating Dots */}
        <div className="relative">
          {/* Pulsing Outer Ring (Red Glow) */}
          <div className="absolute inset-0 rounded-full animate-ping bg-red-500 opacity-75"></div>

          {/* Spinning Inner Ring */}
          <div className="relative flex items-center justify-center">
            <div className="h-20 w-20 rounded-full border-4 border-transparent border-t-red-500 border-r-red-500 animate-spin"></div>

            {/* Three Dots (Rotating) */}
            <div className="absolute flex space-x-1">
              {[1, 2, 3].map((dot) => (
                <div
                  key={dot}
                  className="h-2 w-2 bg-red-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${dot * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <main><Routing /></main>
      <Footer />
    </>
  );
};

export default App;
