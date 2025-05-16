import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center">
          <span className="text-2xl font-semibold text-[#2E2E2E]">Reativa</span>
        </div>

        {/* LINKS CENTRAIS */}
        {user && (
          <div className="hidden sm:flex gap-4 items-center absolute left-1/2 -translate-x-1/2">
            <Link
              to="/"
              className="text-[#2E2E2E] hover:bg-[#EFF2F9] px-3 py-2 rounded-md transition"
            >
              Início
            </Link>
            <Link
              to="/surveys"
              className="text-[#2E2E2E] hover:bg-[#EFF2F9] px-3 py-2 rounded-md transition"
            >
              Painel
            </Link>
            <Link
              to="/surveys/new"
              className="text-[#2E2E2E] hover:bg-[#EFF2F9] px-3 py-2 rounded-md transition"
            >
              Nova pesquisa
            </Link>
            <Link
              to="/payments"
              className="bg-[#6C9BCF] hover:bg-[#558ACB] text-white font-medium rounded-md text-sm px-4 py-2 transition"
            >
              Adicionar Créditos
            </Link>
          </div>
        )}

        {/* LOGIN / LOGOUT */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-[#2E2E2E] font-medium text-sm">
                Créditos: <span className="font-bold">{user.credits}</span>
              </span>
              <a
                href="/auth/api/logout"
                className="bg-[#6C9BCF] hover:bg-[#558ACB] text-white font-medium rounded-md text-sm px-4 py-2 transition"
              >
                Sair
              </a>
            </div>
          ) : (
            <a
              href="/auth/google"
              className="bg-[#6C9BCF] hover:bg-[#558ACB] text-white font-medium rounded-md text-sm px-4 py-2 transition"
            >
              Logar com Google
            </a>
          )}

          {/* MENU MOBILE */}
          {user && (
            <button
              type="button"
              className="sm:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-[#EFF2F9] transition"
              onClick={toggleMenu}
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Abrir menu</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
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

      {/* MENU MOBILE */}
      {menuOpen && user && (
        <div className="sm:hidden flex flex-col gap-2 p-4 bg-[#F9FAFB] border-t border-gray-200">
          <Link
            to="/"
            className="py-2 px-3 text-[#2E2E2E] hover:bg-[#EFF2F9] rounded-md transition"
          >
            Início
          </Link>
          <Link
            to="/surveys"
            className="py-2 px-3 text-[#2E2E2E] hover:bg-[#EFF2F9] rounded-md transition"
          >
            Painel
          </Link>
          <Link
            to="/surveys/new"
            className="py-2 px-3 text-[#2E2E2E] hover:bg-[#EFF2F9] rounded-md transition"
          >
            Nova pesquisa
          </Link>
          <Link
            to="/payments"
            className="bg-[#6C9BCF] hover:bg-[#558ACB] text-white font-medium rounded-md text-sm px-4 py-2 text-left transition"
          >
            Adicionar Créditos
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
