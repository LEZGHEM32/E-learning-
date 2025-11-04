import React from 'react';
import type { User } from '../types';
import Button from './Button';

interface HeaderProps {
  user: User | null;
  onLoginClick: () => void;
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLoginClick, onHomeClick }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200/80">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div 
            className="text-3xl font-bold text-indigo-600 cursor-pointer hover:text-indigo-700 transition-colors"
            onClick={onHomeClick}
        >
          الخلاصة
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          {user ? (
            <div className="text-slate-700 font-semibold">
              مرحباً، {user.name}
            </div>
          ) : (
            <Button onClick={onLoginClick} variant="primary">
              تسجيل الدخول / حساب جديد
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;