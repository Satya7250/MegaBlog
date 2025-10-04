import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo'; // Make sure this scales well

function Footer() {
  return (
    <footer className="bg-[#1A202C] text-[#E2E8F0] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and Copyright */}
          <div>
            <div className="mb-4">
              <Logo width="120px" />
            </div>
            <p className="text-sm text-[#A0AEC0]">
              &copy; {new Date().getFullYear()} DevUI. All Rights Reserved.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map(item => (
                <li key={item}>
                  <Link
                    to="/"
                    className="hover:text-[#63B3ED] transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2">
              {['Account', 'Help', 'Contact Us', 'Customer Support'].map(item => (
                <li key={item}>
                  <Link
                    to="/"
                    className="hover:text-[#63B3ED] transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legals</h3>
            <ul className="space-y-2">
              {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map(item => (
                <li key={item}>
                  <Link
                    to="/"
                    className="hover:text-[#63B3ED] transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-10 border-t border-[#2D3748] pt-6 flex items-center justify-between flex-col sm:flex-row">
          <p className="text-sm text-[#A0AEC0]">Made with ❤️ by SBLOG Team</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-[#63B3ED] transition-colors duration-200" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-[#63B3ED] transition-colors duration-200" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="hover:text-[#63B3ED] transition-colors duration-200" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
