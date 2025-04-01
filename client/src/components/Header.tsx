import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
        <nav className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between">
          {/* Nome da marca */}
          <a className="sm:order-1 flex-none text-xl font-semibold focus:outline-none focus:opacity-80" href="#">
            Reativa+
          </a>

          {/* Botão de toggle para o menu móvel */}
          <div className="sm:order-3 flex items-center gap-x-2">
            <button
              type="button"
              className="sm:hidden relative size-9 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="hs-navbar-alignment"
              aria-label="Toggle navigation"
            >
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} shrink-0 size-4`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} shrink-0 size-4`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Toggle</span>
            </button>
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              Button
            </button>
          </div>

          {/* Menu de navegação */}
          <div
            id="hs-navbar-alignment"
            className={`${isMenuOpen ? 'block' : 'hidden'} sm:block overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:order-2`}
            aria-labelledby="hs-navbar-alignment-collapse"
          >
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
              <a className="font-medium text-blue-500 focus:outline-none" href="#" aria-current="page">
                Home
              </a>
              <a className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400" href="#">
                Dashboard
              </a>
              <a className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400" href="#">
                Pesquisa
              </a>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;