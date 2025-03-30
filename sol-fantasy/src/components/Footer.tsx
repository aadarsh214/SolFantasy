
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-4 sm:mb-0">
            © 2023 SolFantasy. All rights reserved.
          </div>
          <div className="text-md text-gray-700 mb-4 sm:mb-0">
            <a href={"https://x.com/aadarshhx8"} className='cursor-pointer'>Made by Aadarsh Gupta</a>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 mb-2 sm:mb-0">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 mb-2 sm:mb-0">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
