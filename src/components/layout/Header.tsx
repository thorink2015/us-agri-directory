'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Plane, ChevronDown } from 'lucide-react';

type NavLink = { href: string; label: string; description?: string };
type NavTopItem =
  | { type: 'link'; href: string; label: string }
  | { type: 'dropdown'; label: string; items: NavLink[] };

const NAV: NavTopItem[] = [
  { type: 'link', href: '/operators', label: 'Operators' },
  { type: 'link', href: '/map', label: 'Map' },
  {
    type: 'dropdown',
    label: 'Browse',
    items: [
      { href: '/services', label: 'Services', description: 'Spraying, seeding, mapping and more' },
      { href: '/crops', label: 'Crops', description: 'Corn, soybeans, rice, vineyards, orchards' },
      { href: '/states', label: 'States', description: 'All 50 states + licensing quirks' },
      { href: '/drones', label: 'Drones', description: 'DJI, Hylio, XAG, Talos and more' },
      { href: '/regions', label: 'Regions', description: 'Corn Belt, Delta, California, Great Plains' },
    ],
  },
  {
    type: 'dropdown',
    label: 'Tools',
    items: [
      { href: '/tools/spray-cost-calculator', label: 'Spray Cost Calculator', description: 'Instant per-acre cost estimate by state and crop' },
      { href: '/tools/roi-calculator', label: 'ROI Calculator', description: 'Compare owning a drone vs hiring a custom operator' },
      { href: '/tools/coverage-calculator', label: 'Coverage Calculator', description: 'How long will it take to spray your fields?' },
      { href: '/tools/acreage-converter', label: 'Acreage Converter', description: 'Acres, hectares, square feet and meters' },
      { href: '/tools/drone-comparison', label: 'Drone Comparison', description: 'Side-by-side spec and price comparison' },
      { href: '/tools/treatment-calendar', label: 'Treatment Calendar', description: 'Monthly spray windows by crop and region' },
    ],
  },
  {
    type: 'dropdown',
    label: 'About',
    items: [
      { href: '/about', label: 'About Us', description: 'Who runs the directory and how it works' },
      { href: '/contact', label: 'Contact', description: 'Reach the editor with tips or corrections' },
      { href: '/advertise', label: 'Advertise', description: 'Featured placement and sponsorship options' },
      { href: '/guides', label: 'Guides', description: 'Long-form explainers for farmers and operators' },
      { href: '/pricing', label: 'Pricing Guide', description: 'Per-acre rates by crop, region and service' },
      { href: '/blog', label: 'Blog', description: 'Latest news, data and case studies' },
    ],
  },
];

function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

function isDropdownActive(pathname: string, items: NavLink[]): boolean {
  return items.some((it) => isActivePath(pathname, it.href));
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside or pressing Escape.
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setActiveDropdown(null);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  // Close mobile drawer and desktop dropdowns on route change.
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const openDropdown = useCallback((label: string) => setActiveDropdown(label), []);
  const closeDropdown = useCallback(() => setActiveDropdown(null), []);
  const toggleDropdown = useCallback(
    (label: string) => setActiveDropdown((cur) => (cur === label ? null : label)),
    [],
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
              <Plane className="w-5 h-5 text-white rotate-45" />
            </div>
            <span className="font-bold text-xl text-green-900 group-hover:opacity-80 transition-opacity">
              US Ag Drone
              <span className="text-yellow-700"> Directory</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            ref={navRef}
            aria-label="Primary"
            className="hidden lg:flex items-center gap-1"
          >
            {NAV.map((item) =>
              item.type === 'link' ? (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActivePath(pathname, item.href) ? 'page' : undefined}
                  className={
                    'px-3 py-2 text-sm font-medium rounded-md transition-colors ' +
                    (isActivePath(pathname, item.href)
                      ? 'text-green-800 bg-green-50'
                      : 'text-gray-600 hover:text-green-700')
                  }
                >
                  {item.label}
                </Link>
              ) : (
                <DesktopDropdown
                  key={item.label}
                  item={item}
                  isOpen={activeDropdown === item.label}
                  isSectionActive={isDropdownActive(pathname, item.items)}
                  pathname={pathname}
                  onOpen={() => openDropdown(item.label)}
                  onClose={closeDropdown}
                  onToggle={() => toggleDropdown(item.label)}
                />
              ),
            )}

            <Link
              href="/list-your-business"
              className="ml-2 px-4 py-2 text-white text-sm font-semibold rounded-lg bg-green-700 hover:bg-green-800 transition-colors"
            >
              List Your Business
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-green-700"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            id="mobile-nav"
            className="lg:hidden pb-4 border-t border-gray-100 mt-1 max-h-[calc(100vh-5rem)] overflow-y-auto"
          >
            <nav aria-label="Primary mobile" className="flex flex-col gap-1 pt-2">
              {NAV.map((item) =>
                item.type === 'link' ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActivePath(pathname, item.href) ? 'page' : undefined}
                    className={
                      'px-3 py-2 text-sm font-medium rounded-lg transition-colors ' +
                      (isActivePath(pathname, item.href)
                        ? 'text-green-800 bg-green-50'
                        : 'text-gray-700 hover:bg-green-50 hover:text-green-700')
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <MobileDropdown
                    key={item.label}
                    item={item}
                    pathname={pathname}
                    onNavigate={() => setMobileOpen(false)}
                  />
                ),
              )}

              <Link
                href="/list-your-business"
                className="mt-3 mx-3 px-4 py-2 text-white text-sm font-semibold rounded-lg text-center bg-green-700 hover:bg-green-800 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                List Your Business
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

/* ───────────────────────────── Desktop dropdown ───────────────────────────── */

interface DesktopDropdownProps {
  item: { label: string; items: NavLink[] };
  isOpen: boolean;
  isSectionActive: boolean;
  pathname: string;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

function DesktopDropdown({
  item,
  isOpen,
  isSectionActive,
  pathname,
  onOpen,
  onClose,
  onToggle,
}: DesktopDropdownProps) {
  const menuId = `nav-menu-${item.label.toLowerCase()}`;

  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        className={
          'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ' +
          (isSectionActive
            ? 'text-green-800 bg-green-50'
            : 'text-gray-600 hover:text-green-700')
        }
      >
        {item.label}
        <ChevronDown
          className={'w-3.5 h-3.5 transition-transform ' + (isOpen ? 'rotate-180' : '')}
        />
      </button>

      {/*
        Render the panel only when open to keep DOM light, but rely on the
        wrapper's onMouseLeave to close — which also fires when leaving the
        absolutely positioned panel (it's a descendant in the React tree).
        Absolute positioning reserves no layout space, so no CLS.
      */}
      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-label={item.label}
          className="absolute left-0 top-full w-72 bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-50"
        >
          {item.items.map((sub) => {
            const active = isActivePath(pathname, sub.href);
            return (
              <Link
                key={sub.href}
                href={sub.href}
                role="menuitem"
                aria-current={active ? 'page' : undefined}
                onClick={onClose}
                className={
                  'block p-3 rounded-lg transition-colors ' +
                  (active ? 'bg-green-50' : 'hover:bg-green-50')
                }
              >
                <div
                  className={
                    'font-semibold text-sm ' +
                    (active ? 'text-green-800' : 'text-gray-900')
                  }
                >
                  {sub.label}
                </div>
                {sub.description && (
                  <div className="text-xs text-gray-500 mt-0.5">{sub.description}</div>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ───────────────────────────── Mobile dropdown ────────────────────────────── */

interface MobileDropdownProps {
  item: { label: string; items: NavLink[] };
  pathname: string;
  onNavigate: () => void;
}

function MobileDropdown({ item, pathname, onNavigate }: MobileDropdownProps) {
  const sectionActive = isDropdownActive(pathname, item.items);
  return (
    <details className="group" open={sectionActive}>
      <summary
        className={
          'cursor-pointer list-none px-3 py-2 text-sm font-semibold rounded-lg flex items-center justify-between hover:bg-green-50 ' +
          (sectionActive ? 'text-green-800 bg-green-50' : 'text-gray-900')
        }
      >
        {item.label}
        <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
      </summary>
      <div className="ml-3 mt-1 space-y-0.5">
        {item.items.map((sub) => {
          const active = isActivePath(pathname, sub.href);
          return (
            <Link
              key={sub.href}
              href={sub.href}
              aria-current={active ? 'page' : undefined}
              onClick={onNavigate}
              className={
                'block px-3 py-1.5 text-sm rounded-lg transition-colors ' +
                (active
                  ? 'text-green-800 bg-green-50'
                  : 'text-gray-600 hover:bg-green-50 hover:text-green-700')
              }
            >
              {sub.label}
            </Link>
          );
        })}
      </div>
    </details>
  );
}
