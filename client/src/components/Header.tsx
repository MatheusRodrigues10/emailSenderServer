import React, { Component } from "react";

type HeaderProps = {};
type HeaderState = {};

class Header extends Component<HeaderProps, HeaderState> {
  render() {
    return (
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
        <nav className="max-w-[85rem] w-full mx-auto px-4 flex items-center justify-between">
          {/* Nome da marca */}
          <a
            className="text-xl font-semibold focus:outline-none focus:opacity-80"
            href="/"
          >
            Reativa+
          </a>

          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
          >
            Logar com Google
          </button>
        </nav>
      </header>
    );
  }
}

export default Header;
