import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white mt-12">
      <div className="container mx-auto px-6 py-4 text-center">
        <p>&copy; {new Date().getFullYear()} منصة الخلاصة. كل الحقوق محفوظة للأستاذ لزغم عبد الحق.</p>
      </div>
    </footer>
  );
};

export default Footer;