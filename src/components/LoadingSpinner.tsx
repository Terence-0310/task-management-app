import { Loader2 } from 'lucide-react';
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Đang tải dữ liệu...</h2>
        <p className="text-gray-600">Vui lòng chờ trong giây lát</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
