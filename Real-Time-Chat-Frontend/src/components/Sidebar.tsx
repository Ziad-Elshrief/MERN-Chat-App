import { MouseEventHandler, useEffect, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  inPlaceheightClass?: string;
}

const MEDIUM_SCREEN_WIDTH = 768;

export function Sidebar({
  children,
  isOpen,
  setIsOpen,
  inPlaceheightClass,
}: SidebarProps) {
  useEffect(() => {
    const sidebarHandler = () => {
      if (window.innerWidth > MEDIUM_SCREEN_WIDTH) setIsOpen(false);
    };
    window.addEventListener("resize", sidebarHandler);
    return () => {
      window.removeEventListener("resize", sidebarHandler);
    };
  });
  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div
          className={`w-64 ${
            isOpen
              ? " h-screen "
              : inPlaceheightClass
              ? ` ${inPlaceheightClass} `
              : " h-full "
          } bg-indigo-600 text-white flex flex-col overflow-y-auto`}
        >
          {children}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

interface SidebarHeaderProps {
  children: ReactNode;
}

export function SidebarHeader({ children }: SidebarHeaderProps) {
  return <div className="p-4 bg-indigo-700">{children}</div>;
}

interface SidebarContentProps {
  children: ReactNode;
}

export function SidebarContent({ children }: SidebarContentProps) {
  return <div className="flex-1 overflow-y-auto p-4">{children}</div>;
}

type SidebarLinkItemProps = {
  href: string;
  icon: ReactNode;
  children: ReactNode;
};

export function SidebarLinkItem({
  href,
  icon,
  children,
}: SidebarLinkItemProps) {
  const { pathname } = useLocation();
  const isActive = pathname === href;

  return (
    <Link
      to={href}
      className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors 
        ${
          isActive
            ? "bg-indigo-700 text-white"
            : "text-indigo-100 hover:bg-indigo-500"
        }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

type SidebarButtonItemProps = {
  icon: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  children: ReactNode;
};

export function SidebarButtonItem({
  onClick,
  icon,
  children,
}: SidebarButtonItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-indigo-100 hover:bg-indigo-500"
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

interface SidebarSectionProps {
  title: string;
  children: ReactNode;
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="mb-6">
      <h3 className="mb-2 px-3 text-sm font-semibold uppercase tracking-wider text-indigo-200">
        {title}
      </h3>
      <nav className="space-y-1">{children}</nav>
    </div>
  );
}
