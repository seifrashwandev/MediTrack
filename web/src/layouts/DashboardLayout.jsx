import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';

/**
 * DashboardLayout
 *
 * The root shell for all authenticated views (Admin, Doctor, Patient).
 * Composes the fixed Sidebar and sticky TopHeader around a scrollable
 * main content area. Role-specific styling flows down through props.
 *
 * @param {object}   props
 * @param {'admin'|'doctor'|'patient'} props.role        - Drives Sidebar nav items & accent colour.
 * @param {object}   props.user                          - { name, title, avatarUrl } for the profile UI.
 * @param {string}   props.basePath                      - URL prefix for the current role, e.g. '/admin'.
 * @param {function} [props.onNavigate]                  - Called with the target route string when a CTA is clicked.
 * @param {React.ReactNode} props.children               - Page-level content rendered in the main area.
 *
 * ── TopHeader passthrough props ────────────────────────────────────
 * @param {number}   [props.notifCount=0]                - Unread notification count for the bell badge.
 * @param {function} [props.onSearch]                    - Called with the query string as the user types in TopHeader.
 * @param {function} [props.onNotifClick]                - Called when the notification bell is pressed.
 * @param {function} [props.onProfileClick]              - Called when the avatar / account icon is pressed.
 * @param {string}   [props.searchPlaceholder]           - Overrides the default TopHeader placeholder text.
 */
export default function DashboardLayout({
  role = 'patient',
  user = {},
  basePath,
  children,
  onNavigate,
  notifCount = 0,
  onSearch,
  onNotifClick,
  onProfileClick,
  searchPlaceholder,
}) {
  return (
    /*
     * Full-viewport flex container.
     * The sidebar is fixed-width; the main area fills the remaining space.
     * We use a CSS variable approach rather than hardcoding Tailwind's `ml-64`
     * everywhere so that a future collapsible sidebar only needs one change.
     */
    <div
      className="min-h-screen bg-surface text-on-surface"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* ── Fixed left sidebar ─────────────────────────────────────────── */}
      <Sidebar
        role={role}
        user={user}
        basePath={basePath}
        onNavigate={onNavigate}
      />

      {/*
       * Right-hand column.
       * `ml-64` matches the sidebar width (w-64 = 16rem).
       * Using `min-h-screen` ensures the background fills tall viewports even
       * when the page content is short.
       */}
      <div className="ml-64 flex flex-col min-h-screen">
        {/* ── Sticky top header ──────────────────────────────────────────── */}
        <TopHeader
          role={role}
          user={user}
          notifCount={notifCount}
          onSearch={onSearch}
          onNotifClick={onNotifClick}
          onProfileClick={onProfileClick}
          searchPlaceholder={searchPlaceholder}
        />

        {/*
         * ── Scrollable content area ─────────────────────────────────────
         * `flex-1` so it expands to fill remaining height.
         * Individual pages own their own padding / max-width constraints
         * (usually `p-8 max-w-7xl mx-auto`) so the layout stays unopinionated.
         */}
        <main className="flex-1 overflow-y-auto bg-surface">
          {children}
        </main>
      </div>
    </div>
  );
}
