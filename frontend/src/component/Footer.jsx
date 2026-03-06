import React from "react";
import { Link } from "react-router-dom";
import { HeartPulse, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <HeartPulse className="text-blue-400" size={28} />
              <h2 className="text-xl font-bold text-white">MediTriage</h2>
            </div>

            <p className="text-sm leading-relaxed text-gray-400">
              MediTriage is an AI-powered healthcare and emergency blood
              assistance platform designed to provide smart symptom analysis,
              severity detection, and real-time donor coordination — all in one
              secure system.
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <Phone size={16} /> +91 8323676932
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} /> support@meditriage.com
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} /> India
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>

            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-400 transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-400 transition">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Emergency Blood Request
                </Link>
              </li>
            </ul>
          </div>

          {/* Social + Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Stay Connected
            </h3>

            <p className="text-sm text-gray-400 mb-4">
              Follow MediTriage for healthcare updates, medical awareness, and
              emergency alerts.
            </p>

            <div className="flex gap-4 text-xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition"
              >
                🌐
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition"
              >
                ✖
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition"
              >
                📸
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition"
              >
                💼
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MediTriage Healthcare System. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;