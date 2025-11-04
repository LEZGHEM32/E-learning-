import React, { useState } from 'react';
import type { User } from '../types';
import Button from './Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: Omit<User, 'progress'>) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate a successful login/registration
    const userName = isLogin ? 'أحمد' : (name || 'مستخدم جديد');
    onLogin({ name: userName, enrolledCourses: [] });
    onClose();
    // Reset fields
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">{isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
        </div>

        <div className="flex border-b mb-6">
          <button
            className={`flex-1 py-2 text-center font-semibold transition-colors ${isLogin ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
            onClick={() => setIsLogin(true)}
          >
            دخول
          </button>
          <button
            className={`flex-1 py-2 text-center font-semibold transition-colors ${!isLogin ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
            onClick={() => setIsLogin(false)}
          >
            حساب جديد
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-slate-700">الاسم الكامل</label>
                <input 
                  type="text" 
                  placeholder="اسمك الكامل" 
                  className="w-full p-2 border rounded mt-1 focus:ring-indigo-500 focus:border-indigo-500" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-slate-700">البريد الإلكتروني</label>
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full p-2 border rounded mt-1 focus:ring-indigo-500 focus:border-indigo-500" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-slate-700">كلمة المرور</label>
              <input 
                type="password" 
                placeholder="********" 
                className="w-full p-2 border rounded mt-1 focus:ring-indigo-500 focus:border-indigo-500" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-8">
            <Button type="submit" variant="primary" className="w-full">
              {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;