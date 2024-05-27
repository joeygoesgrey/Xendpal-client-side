import React from "react";
import {
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";

const FooterSection : React.FC = () => {
  return (
    <>
      <footer className="bg-black text-white py-10 ">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Xendpal</h2>
            <p className="text-gray-400 mb-4">
              Store computer backups, photo libraries, thousands of
              documents–all your files, in the same place.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="text-gray-400 hover:text-teal-500"
              >
                <FaTwitter />
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="text-gray-400 hover:text-teal-500"
              >
                <FaFacebook />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-teal-500"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://youtube.com"
                aria-label="YouTube"
                className="text-gray-400 hover:text-teal-500"
              >
                <FaYoutube />
              </a>
              <a
                href="mailto:info@xendpal.com"
                aria-label="Email"
                className="text-gray-400 hover:text-teal-500"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
          {/* Products */}
          <div>
            <h3 className="text-xl font-bold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-500">
                  Xendpal CLI
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-400 hover:text-teal-500">
                  Business
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-500">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          {/* Company */}
          <div>
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-500">
                  About
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-400 hover:text-teal-500">
                  Media
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-400 hover:text-teal-500">
                  Help centre
                </a>
              </li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-500">
                  Terms of service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-500">
                  Privacy policy
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-400 hover:text-teal-500">
                  Cookie policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 text-center mt-10">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Xendpal. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default FooterSection
