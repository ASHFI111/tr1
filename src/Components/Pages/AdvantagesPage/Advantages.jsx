// Advantages.js
import React from 'react';
import {FaShippingFast, FaShieldAlt, FaTags, FaCreditCard} from 'react-icons/fa';

const servicesData = [
    {
        id: 1,
        icon: <FaShippingFast />,
        title: "Express Delivery",
        info: "Ships in 24 Hours",
    },
    {
        id: 2,
        icon: <FaShieldAlt />,
        title: "Brand Warranty",
        info: "100% Original products",
    },
    {
        id: 3,
        icon: <FaTags />,
        title: "Exciting Deals",
        info: "On all prepaid orders",
    },
    {
        id: 4,
        icon: <FaCreditCard />,
        title: "Secure Payments",
        info: "SSL / Secure сertificate",
    },
];

const Advantages = () => {
  return (
    <div className='bg-black py-12 px-4 sm:px-6 lg:py-16 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header with responsive text sizing */}
        <h1 className='text-center text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12'>
          Our Advantages
        </h1>
        
        {/* Grid layout with responsive columns */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
          {servicesData.map((service) => (
            <div 
              key={service.id} 
              className='bg-gray-900 p-6 rounded-xl hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center hover:transform hover:-translate-y-2'
            >
              {/* Icon with responsive sizing */}
              <div className='text-4xl text-red-600 mb-4 p-3 bg-gray-800 rounded-full'>
                {service.icon}
              </div>
              
              {/* Content with responsive text sizing */}
              <div className='flex-1'>
                <h3 className='text-lg sm:text-xl font-semibold mb-2 text-white'>
                  {service.title}
                </h3>
                <p className='text-gray-400 text-sm sm:text-base'>
                  {service.info}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advantages;