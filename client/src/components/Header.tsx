import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white border-gray-200 dark:bg-gray-900">
      <nav className="max-w-screen-xl w-full mx-auto px-4 flex flex-wrap items-center justify-between py-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Reativa
          </span>
        </div>

        {user && (
          <div className="hidden sm:flex gap-4 items-center">
            <Link
              to="/"
              className="text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent px-3 py-2"
            >
              Início
            </Link>
            <Link
              to="/surveys"
              className="text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent px-3 py-2"
            >
              Painel
            </Link>
            <Link
              to="/surveys/new"
              className="text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent px-3 py-2"
            >
              Nova pesquisa
            </Link>
            <Link
              to="/payments"
              className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm px-4 py-2"
            >
              Adicionar Créditos
            </Link>
          </div>
        )}

        <div className="flex items-center gap-3 md:order-2">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-900 dark:text-white font-medium text-sm px-2">
                Créditos: <span className="font-bold">{user.credits}</span>
              </span>
              <a
                href="/auth/api/logout"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sair
              </a>
            </div>
          ) : (
            <a
              href="/auth/google"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Logar com Google
            </a>
          )}

          {user && (
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={toggleMenu}
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Abrir menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          )}
        </div>
      </nav>

      {menuOpen && user && (
        <div className="sm:hidden flex flex-col gap-2 p-4 bg-gray-50 border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <Link
            to="/"
            className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            Início
          </Link>
          <Link
            to="/surveys"
            className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            Painel
          </Link>
          <Link
            to="/surveys/new"
            className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            Nova pesquisa
          </Link>
          <Link
            to="/payments"
            className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm px-4 py-2 text-left"
          >
            Adicionar Créditos
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
