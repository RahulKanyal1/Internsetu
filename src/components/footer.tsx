import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t-[3px] border-black bg-gradient-to-r from-purple-50 to-purple-100 py-8 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Main Footer Content */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Government Initiative */}
          <div className="text-center sm:text-left">
            <h3 className="mb-2 text-lg font-bold text-gray-800">🇮🇳 InternSetu</h3>
            <p className="text-sm text-gray-700">A Government of India Initiative</p>
            <p className="text-xs text-gray-600">Empowering Youth Through Digital India</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="mb-2 font-semibold text-gray-800">Quick Links</h4>
            <div className="space-y-1 text-sm">
              <Link href="/privacy" className="block text-gray-700 hover:text-purple-600">Privacy Policy</Link>
              <Link href="/terms" className="block text-gray-700 hover:text-purple-600">Terms & Conditions</Link>
              <Link href="/contact" className="block text-gray-700 hover:text-purple-600">Contact Us</Link>
              <Link href="/support" className="block text-gray-700 hover:text-purple-600">Support</Link>
            </div>
          </div>
          
          {/* Contact Information */}
          <div>
            <h4 className="mb-2 font-semibold text-gray-800">Help Desk</h4>
            <div className="space-y-1 text-sm text-gray-700">
              <p>📞 1800-XXX-XXXX</p>
              <p>✉️ support@intern-setu.gov.in</p>
              <p>🕒 Mon-Fri, 9 AM - 6 PM IST</p>
            </div>
          </div>
          
          {/* Certifications */}
          <div>
            <h4 className="mb-2 font-semibold text-gray-800">Certifications</h4>
            <div className="space-y-1 text-xs text-gray-600">
              <p>🔒 Government Grade Security</p>
              <p>♿ WCAG 2.1 AA Compliant</p>
              <p>🛡️ Data Protection Compliant</p>
              <p>✅ Accessible India Certified</p>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-6 border-t border-gray-300 pt-4 text-center">
          <p className="text-sm text-gray-700">
            © 2025 Government of India. All rights reserved. | 
            <span className="ml-1">Made with ❤️ for Indian Students</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
