import Link from "next/link";
import { Shield, Users, FileText, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">KYC Verification</h1>
            </div>
            <nav className="flex space-x-8">
              <Link
                href="/verify"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                target="_blank"
              >
                Start Verification
              </Link>
              <Link
                href="/admin"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                target="_blank"
              >
                Admin Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Secure KYC Verification Platform
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your Know Your Customer (KYC) and Know Your Business (KYB) verification process 
            with our secure, user-friendly platform. Submit documents and track your verification status easily.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/verify"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Verification
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Easy Submission
            </h3>
            <p className="text-gray-600">
              Simple multi-step form for submitting personal and company information along with required documents.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Document Management
            </h3>
            <p className="text-gray-600">
              Upload and preview documents securely. Support for various document types including IDs, passports, and business licenses.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Secure & Compliant
            </h3>
            <p className="text-gray-600">
              Built with security in mind. All data is handled securely and the platform follows KYC/KYB compliance standards.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Start Verification</h4>
              <p className="text-gray-600">Click the "Start Verification" button to begin the process</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Fill Information</h4>
              <p className="text-gray-600">Complete the multi-step form with personal and company details</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Upload Documents</h4>
              <p className="text-gray-600">Upload required identification and business documents</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                4
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Track Status</h4>
              <p className="text-gray-600">Monitor your verification status and receive updates</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 KYC Verification Platform. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
