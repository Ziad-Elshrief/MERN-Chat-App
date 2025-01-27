import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown, Settings } from "lucide-react";
import { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";

export default function DropdownMenu({ children }: { children: ReactNode }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-indigo-700  px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-indigo-400 ring-inset hover:bg-indigo-500 data-focus:bg-indigo-500">
          <Settings className="inline size-4 mt-0.5" /> Settings
          <ChevronDown
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="overflow-hidden absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black/5 transition data-focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-slate-700 dark:ring-white/70"
      >
        {children}
      </MenuItems>
    </Menu>
  );
}

type DropdownMenuLinkItemProps = {
  linkLabel: string;
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
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:outline-hidden focus:bg-gray-100 focus:text-gray-900 focus:outline-hidden dark:text-gray-200"
      >
        {linkLabel}
      </Link>
    </MenuItem>
  );
}

type DropdownMenuButtonItemProps = {
  buttonLabel: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

export function DropdownMenuButtonItem({
  buttonLabel,
  onClick,
}: DropdownMenuButtonItemProps) {
  return (
    <MenuItem>
      <button
        onClick={onClick}
        className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:outline-hidden focus:bg-gray-100 focus:text-gray-900 focus:outline-hidden dark:text-gray-200"
      >
        {buttonLabel}
      </button>
    </MenuItem>
  );
}
