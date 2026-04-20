import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-primary text-white p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary">商务数据分析训练平台</h1>
            <p className="text-xs text-gray-500">提升数据分析技能，助力职场发展</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-primary font-medium">首页</Link>
          <Link to="/courses/1" className="text-gray-700 hover:text-primary font-medium">课程</Link>
          <Link to="/about" className="text-gray-700 hover:text-primary font-medium">关于我们</Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-primary focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium py-2" onClick={() => setIsMenuOpen(false)}>首页</Link>
            <Link to="/courses/1" className="text-gray-700 hover:text-primary font-medium py-2" onClick={() => setIsMenuOpen(false)}>课程</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary font-medium py-2" onClick={() => setIsMenuOpen(false)}>关于我们</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;