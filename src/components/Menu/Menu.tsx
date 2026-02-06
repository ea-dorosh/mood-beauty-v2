"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { useState } from "react";

interface MenuLink {
  readonly text: string;
  readonly href: string;
  readonly subLink?: boolean;
}

interface MenuProps {
  readonly links: readonly MenuLink[];
}

export default function Menu({ links }: MenuProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const mainLinks = links.filter(({ subLink }) => !subLink);
  const subLinks = links.filter(({ subLink }) => subLink);

  return (
    <div className="-mr-1">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        {/* Burger button */}
        <Dialog.Trigger asChild>
          <button
            className="p-0 w-[30px] h-[30px] flex items-center justify-center bg-transparent border-none cursor-pointer"
            aria-label="Menü öffnen"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </Dialog.Trigger>

        {/* Fullscreen overlay menu */}
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-[1200] animate-[fadeIn_200ms_ease-out]" />
          <Dialog.Content
            className="fixed inset-0 z-[1200] bg-background flex flex-col overflow-y-auto animate-[slideInRight_300ms_ease-out]"
          >
            <VisuallyHidden.Root>
              <Dialog.Title>Navigation Menu</Dialog.Title>
            </VisuallyHidden.Root>

            {/* Close button */}
            <div className="absolute top-2 right-1 z-[1201]">
              <Dialog.Close asChild>
                <button
                  className="p-2 bg-transparent border-none cursor-pointer"
                  aria-label="Menü schließen"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </Dialog.Close>
            </div>

            {/* Main navigation links */}
            <nav className="pt-[170px] px-6">
              <ul>
                {mainLinks.map(({ text, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={handleClose}
                      className="block py-3 text-center text-[1.8rem] text-foreground hover:opacity-70 transition-opacity"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Sub links (Datenschutz, Impressum) */}
            <nav className="pt-[100px] px-6 pb-8">
              <ul>
                {subLinks.map(({ text, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={handleClose}
                      className="block py-3 text-center text-[1.4rem] text-foreground hover:opacity-70 transition-opacity"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
