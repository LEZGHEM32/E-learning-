import React, { useState, useCallback } from 'react';
import type { CourseId } from '../types';
import { VALID_ACTIVATION_CODES } from '../constants';
import Button from './Button';
import { KeyIcon, DownloadIcon } from './icons';

interface ActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: CourseId;
  onSuccess: (courseId: CourseId) => void;
}

const ActivationModal: React.FC<ActivationModalProps> = ({ isOpen, onClose, courseId, onSuccess }) => {
  const [activeTab, setActiveTab] = useState<'code' | 'upload'>('code');
  const [activationCode, setActivationCode] = useState('');
  const [error, setError] = useState('');
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'uploaded'>('idle');
  const [generatedCode, setGeneratedCode] = useState('');

  if (!isOpen) return null;
  
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (VALID_ACTIVATION_CODES[courseId] && VALID_ACTIVATION_CODES[courseId].includes(activationCode)) {
      onSuccess(courseId);
    } else {
      setError('كود التفعيل غير صالح. يرجى التأكد منه والمحاولة مرة أخرى.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadState('uploading');
      // Simulate backend processing
      setTimeout(() => {
        const mockCode = `ALKholasa-${courseId.toUpperCase()}`;
        setGeneratedCode(mockCode);
        setUploadState('uploaded');
      }, 2000);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    alert('تم نسخ الكود!');
  }

  const handleUseGeneratedCode = () => {
    setActivationCode(generatedCode);
    setActiveTab('code');
  };

  const courseTitle = courseId === 'philosophy' ? 'الفلسفة' : 'الأدب العربي';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">تفعيل الاشتراك: {courseTitle}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
        </div>

        <div className="flex border-b mb-6">
          <button
            className={`flex-1 py-2 text-center font-semibold transition-colors ${activeTab === 'code' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('code')}
          >
            لدي كود تفعيل
          </button>
          <button
            className={`flex-1 py-2 text-center font-semibold transition-colors ${activeTab === 'upload' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('upload')}
          >
            رفع وصل الدفع
          </button>
        </div>

        {activeTab === 'code' && (
          <form onSubmit={handleVerifyCode}>
            <p className="text-slate-600 mb-4">أدخل كود التفعيل الذي أرسله لك الأستاذ للوصول الفوري للمادة.</p>
            <div>
              <label className="block text-slate-700 font-semibold">كود التفعيل</label>
              <input 
                type="text" 
                placeholder="مثال: PHIL-1234" 
                className="w-full p-2 border rounded mt-1 focus:ring-indigo-500 focus:border-indigo-500" 
                value={activationCode}
                onChange={(e) => setActivationCode(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-8">
              <Button type="submit" variant="primary" className="w-full">
                <KeyIcon className="w-5 h-5"/>
                تفعيل الاشتراك
              </Button>
            </div>
          </form>
        )}

        {activeTab === 'upload' && (
          <div>
            <p className="text-slate-600 mb-4">إذا لم تستلم كوداً، يمكنك رفع صورة لوصل الدفع وسنقوم بمراجعتها وتزويدك بالكود.</p>
            {uploadState === 'idle' && (
              <label htmlFor="file-upload" className="w-full">
                <div className="flex items-center justify-center gap-2 px-8 py-3 text-base font-semibold rounded-full transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-opacity-75 bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-indigo-400 cursor-pointer">
                  <DownloadIcon className="w-5 h-5"/>
                  اختر صورة وصل الدفع
                </div>
                <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} accept="image/*"/>
              </label>
            )}
            {uploadState === 'uploading' && (
              <div className="text-center p-4 border-2 border-dashed rounded-lg">
                <p className="font-semibold text-indigo-600">جاري رفع الملف والمراجعة...</p>
              </div>
            )}
             {uploadState === 'uploaded' && (
              <div className="text-center p-4 bg-green-50 border-green-400 border rounded-lg">
                <p className="font-semibold text-green-800 mb-2">تم استلام طلبك بنجاح! هذا هو كود التفعيل الخاص بك:</p>
                <div className="my-3 p-3 bg-slate-800 text-white font-mono text-lg rounded font-bold tracking-widest cursor-pointer" onClick={copyToClipboard} title="انقر للنسخ">
                  {generatedCode}
                </div>
                <p className="text-sm text-slate-600 mb-6">يمكنك الآن استخدام هذا الكود لتفعيل المادة مباشرة.</p>
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={handleUseGeneratedCode}
                >
                  <KeyIcon className="w-5 h-5"/>
                  استخدم الكود وقم بالتفعيل الآن
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivationModal;