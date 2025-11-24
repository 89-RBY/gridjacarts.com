'use client';

import { useState } from 'react';
import { X, ExternalLink, Download, Calendar, FileText } from 'lucide-react';
import { Contract } from '@/types';

interface ContractModalProps {
  contract: Contract;
  partnerName?: string;
  onClose: () => void;
}

export default function ContractModal({ contract, partnerName, onClose }: ContractModalProps) {
  const [fullscreen, setFullscreen] = useState(false);

  const openFullscreen = () => {
    window.open(contract.fileUrl, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SIGNED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'EXPIRED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'ARCHIVED':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={() => setFullscreen(false)}
            className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <iframe
          src={contract.fileUrl}
          className="w-full h-full"
          title={contract.fileName}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-6 h-6 text-primary-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {contract.contractNumber}
              </h2>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(contract.status)}`}>
                {contract.status}
              </span>
            </div>
            {partnerName && (
              <p className="text-sm text-gray-600 dark:text-gray-400">Partner: {partnerName}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Left: Details */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Contract Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Contract Type
                    </label>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                      {contract.contractType}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      File Name
                    </label>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mt-1 break-all">
                      {contract.fileName}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      File Size
                    </label>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                      {(contract.fileSize / 1024).toFixed(2)} KB
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                      <Calendar className="w-4 h-4" />
                      <label className="text-xs uppercase tracking-wide">Dates</label>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Uploaded:</span>{' '}
                        <span className="text-gray-900 dark:text-white">
                          {new Date(contract.uploadedAt).toLocaleDateString()}
                        </span>
                      </div>
                      {contract.signedAt && (
                        <div>
                          <span className="text-gray-500">Signed:</span>{' '}
                          <span className="text-gray-900 dark:text-white">
                            {new Date(contract.signedAt).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      {contract.expiresAt && (
                        <div>
                          <span className="text-gray-500">Expires:</span>{' '}
                          <span className="text-gray-900 dark:text-white">
                            {new Date(contract.expiresAt).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {contract.notes && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <label className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Notes
                      </label>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 whitespace-pre-wrap">
                        {contract.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={openFullscreen}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Fullscreen
                </button>
                <a
                  href={contract.fileUrl}
                  download
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            </div>

            {/* Right: PDF Preview */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Document Preview
                  </span>
                  <button
                    onClick={openFullscreen}
                    className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Fullscreen
                  </button>
                </div>
                <div className="relative" style={{ height: '600px' }}>
                  {contract.mimeType.includes('pdf') ? (
                    <iframe
                      src={contract.fileUrl}
                      className="w-full h-full"
                      title={contract.fileName}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <p className="mb-2">Preview not available for this file type</p>
                        <a
                          href={contract.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:underline"
                        >
                          Open in new tab →
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
