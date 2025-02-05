import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";

type DropdownMenuProps = {
  children: ReactNode;
  heading: ReactNode;
  direction?: "right-0" | "-right-5" | "left-0" | "-translate-x-1/2";
  variant?: "indigo-btn" | "muted";
};

export default function DropdownMenu({
  children,
  heading,
  direction = "right-0",
  variant = "muted",
}: DropdownMenuProps) {
  const variants = {
    "indigo-btn":
      "bg-indigo-700  px-3 py-2 ring-1 shadow-xs ring-indigo-400 ring-inset hover:bg-indigo-500 data-focus:bg-indigo-500",
    muted: "hover:text-indigo-400 data-focus:text-indigo-400",
  };
  return (
    <Menu as="div" className=" relative inline-block text-left">
      <MenuButton
        className={`inline-flex w-full justify-center gap-x-1.5 rounded-md  text-sm font-semibold text-white ${variants[variant]}`}
      >
        {heading}
      </MenuButton>

      <MenuItems
        transition
        className={`overflow-hidden absolute ${direction} z-10 mt-2 w-56 origin-top-right divide-y divide-gray-400 dark:divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-gray-400/50 transition data-focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-slate-700 dark:ring-white/70`}
      >
        {children}
      </MenuItems>
    </Menu>
  );
}

type DropdownMenuLinkItemProps = {
  linkLabel: ReactNode;
  linkHref: string;
};

export function DropdownMenuLinkItem({
  linkLabel,
  linkHref,
}: DropdownMenuLinkItemProps) {
  return (
    <MenuItem>
      <Link
        to={linkHref}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:outline-hidden focus:bg-gray-100 focus:text-gray-900 focus:outline-hidden dark:text-gray-200 hover:dark:text-gray-900 focus:dark:text-gray-900"
      >
        {linkLabel}
      </Link>
    </MenuItem>
  );
}

type DropdownMenuButtonItemProps = {
  buttonLabel: ReactNode;
  buttonRightIcon?: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

export function DropdownMenuButtonItem({
  buttonLabel,
  buttonRightIcon,
  onClick,
}: DropdownMenuButtonItemProps) {
  return (
    <MenuItem>
      <button
        onClick={onClick}
        className="flex items-center gap-x-1 w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:outline-hidden focus:bg-gray-100 focus:text-gray-900 focus:outline-hidden dark:text-gray-200 hover:dark:text-gray-900 focus:dark:text-gray-900"
      >
        {buttonLabel}
        {buttonRightIcon}
      </button>
    </MenuItem>
  );
}
