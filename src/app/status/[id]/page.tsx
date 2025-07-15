'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle, XCircle, Clock, FileText, User, Building } from 'lucide-react';
import Link from 'next/link';

interface Submission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  companyName: string;
  companyType: string;
  registrationNumber: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  documentType: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewerNotes?: string;
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    label: 'Pending Review',
    description: 'Your verification is being reviewed by our team.',
  },
  approved: {
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    label: 'Approved',
    description: 'Your verification has been approved successfully.',
  },
  rejected: {
    icon: XCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    label: 'Rejected',
    description: 'Your verification has been rejected. Please review the feedback.',
  },
};

export default function StatusPage() {
  const params = useParams();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const submissions = JSON.parse(localStorage.getItem('kycSubmissions') || '[]');
    const found = submissions.find((s: Submission) => s.id === params.id);
    setSubmission(found || null);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading verification status...</p>
        </div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Not Found</h1>
          <p className="text-gray-600 mb-6">The verification you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/verify"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Start New Verification
          </Link>
        </div>
      </div>
    );
  }

  const status = statusConfig[submission.status];
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Verification Status</h1>
                <p className="text-blue-100 mt-2">Track your KYC verification progress</p>
              </div>
              <Link
                href="/verify"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-md hover:bg-gray-50"
              >
                New Verification
              </Link>
            </div>
          </div>

          {/* Status Card */}
          <div className="p-6">
            <div className={`border rounded-lg p-6 ${status.bgColor} ${status.borderColor}`}>
              <div className="flex items-center">
                <StatusIcon className={`w-8 h-8 ${status.color} mr-3`} />
                <div>
                  <h2 className={`text-xl font-semibold ${status.color}`}>
                    {status.label}
                  </h2>
                  <p className="text-gray-600 mt-1">{status.description}</p>
                </div>
              </div>
            </div>

            {/* Submission Details */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 text-gray-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Full Name:</span>
                    <span className="font-medium text-gray-900">
                      {submission.firstName} {submission.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium text-gray-900">{submission.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium text-gray-900">{submission.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date of Birth:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(submission.dateOfBirth).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Building className="w-5 h-5 text-gray-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Company Name:</span>
                    <span className="font-medium text-gray-900">{submission.companyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Company Type:</span>
                    <span className="font-medium capitalize text-gray-900">{submission.companyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Registration:</span>
                    <span className="font-medium text-gray-900">{submission.registrationNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium text-right text-gray-900">
                      {submission.city}, {submission.country}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Information */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <FileText className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Document Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Document Type:</span>
                  <span className="font-medium capitalize text-gray-900">
                    {submission.documentType.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Submitted:</span>
                  <span className="font-medium">
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Reviewer Notes (if rejected) */}
            {submission.status === 'rejected' && submission.reviewerNotes && (
              <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-2">Reviewer Notes</h3>
                <p className="text-red-800">{submission.reviewerNotes}</p>
              </div>
            )}

            {/* Timeline */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                  <div>
                    <p className="font-medium text-gray-900">Verification Submitted</p>
                    <p className="text-sm text-gray-600">
                      {new Date(submission.submittedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                {submission.reviewedAt && (
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {submission.status === 'approved' ? 'Verification Approved' : 'Verification Rejected'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(submission.reviewedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/verify"
                className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Submit New Verification
              </Link>
              {submission.status === 'rejected' && (
                <button className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50">
                  Contact Support
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 