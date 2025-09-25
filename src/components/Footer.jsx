import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaVimeoV,
} from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="relative pt-12 pb-8 px-6 text-sm bg-[#2b473f] text-white overflow-hidden"
      style={{
        backgroundImage: `url('https://ggcckenya.org/wp-content/uploads/2021/01/GGCC_Map.png')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right center',
        backgroundSize: 'contain',
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1: Search + Donate */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-[#8CA9B4] mb-4">Search</h3>
          <form method="get" action="/" className="flex">
            <input
              type="text"
              name="s"
              placeholder="Type here..."
              className="w-full px-4 py-2 text-gray-800 rounded-l focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#8CA9B4] text-white px-4 rounded-r hover:bg-white hover:text-[#8CA9B4] transition"
              aria-label="Search"
            >
              🔍
            </button>
          </form>
          <div className="my-4 w-4/5 border-t border-dotted border-[#8CA9B4]"></div>
          <a
            href="https://ggcckenya.reachapp.co/donations/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#932528] hover:bg-[#8CA9B4] text-white font-semibold py-2 px-6 rounded-full transition"
          >
            Donate
          </a>
        </motion.div>

        {/* Column 2: Intentionally empty (as in GGCC) */}
        <div></div>

        {/* Column 3: The Latest */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-[#8CA9B4] mb-4">The Latest</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="https://ggcckenya.org/trisha-and-lameck-a-mother-and-son/"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[#8CA9B4] transition"
              >
                Trisha and Lameck: A mother and son
              </a>
              <span className="text-[#8CA9B4] text-xs">November 28, 2018</span>
            </li>
            <li className="mt-3">
              <a
                href="https://ggcckenya.org/promise/"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[#8CA9B4] transition"
              >
                Promise
              </a>
              <span className="text-[#8CA9B4] text-xs">February 27, 2021</span>
            </li>
          </ul>
        </motion.div>

        {/* Column 4: Connect */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-[#8CA9B4] mb-4">Connect</h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong className="text-white">Mailing Address:</strong>
              <br />
              <span className="text-[#8CA9B4]">PO Box 713<br />Matthews, NC 28106</span>
            </p>
            <p>
              <strong className="text-white">Office Address:</strong>
              <br />
              <span className="text-[#8CA9B4]">
                10800 Independence Pointe Parkway Suite C<br />Matthews, NC 28105
              </span>
            </p>
            <p>
              <strong className="text-white">Call Us:</strong>
              <br />
              <span className="text-[#8CA9B4]">(704) 844-1020</span>
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.facebook.com/GGCCKenya/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#8CA9B4] transition text-xl"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/ggcckenya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#8CA9B4] transition text-xl"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/ggcckenya/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#8CA9B4] transition text-xl"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://vimeo.com/user61609829"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#8CA9B4] transition text-xl"
              aria-label="Vimeo"
            >
              <FaVimeoV />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-4 border-t border-[#233A33] text-center text-gray-400 text-sm">
        <p>
          Gethsemane Garden Christian Centre. All rights reserved {new Date().getFullYear()}. |{" "}
          <a
            href="https://ggcckenya.org/financials/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#8CA9B4]"
          >
            Financials
          </a>{" "}
          |{" "}
          <a
            href="https://ggcckenya.org/website-credit/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#8CA9B4]"
          >
            Website Credit
          </a>
        </p>
      </div>
    </motion.footer>
  );
}