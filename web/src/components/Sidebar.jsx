/**
 * Sidebar
 *
 * Fixed left-hand navigation panel shared across all dashboard roles.
 * Navigation items, the "New Appointment" CTA label, and role badge are
 * all derived from the `role` prop so the component stays DRY.
 *
 * Uses react-router-dom's <NavLink> so that:
 *   • Clicking an item updates the browser URL bar
 *   • Back / forward buttons work correctly
 *   • The active item is auto-highlighted via `isActive` from NavLink
 *
 * @param {object}   props
 * @param {'admin'|'doctor'|'patient'} props.role
 * @param {object}   props.user             - { name, title, avatarUrl }
 * @param {string}   props.basePath         - URL prefix for this role, e.g. '/admin', '/doctor', '/patient'.
 * @param {function} [props.onNavigate]     - Optional callback fired after navigation (for analytics, etc.).
 */

import { NavLink } from 'react-router-dom';

// ── Navigation configuration per role ────────────────────────────────────────
const NAV_CONFIG = {
  patient: {
    label: null, // no sub-label under brand for patient
    primaryItems: [
      { icon: 'grid_view',      label: 'Dashboard',     route: 'dashboard', fill: true },
      { icon: 'calendar_today', label: 'Appointments',  route: 'appointments' },
      { icon: 'medication',     label: 'Prescriptions', route: 'prescriptions' },
      { icon: 'folder_shared',  label: 'Medical Lab',   route: 'records' },
    ],
    bottomItems: [
      { icon: 'settings',    label: 'Settings', route: 'settings' },
      { icon: 'help_outline', label: 'Support',  route: 'support' },
    ],
    ctaLabel: 'Book Appointment',
    ctaIcon: 'calendar_add_on',
  },
  doctor: {
    label: null,
    primaryItems: [
      { icon: 'grid_view',      label: 'Dashboard', route: 'dashboard', fill: true },
      { icon: 'group',          label: 'Patients',  route: 'patients' },
      { icon: 'calendar_today', label: 'Schedule',  route: 'schedule' },
      { icon: 'folder_shared',  label: 'Records',   route: 'records' },
      { icon: 'analytics',      label: 'Insights',  route: 'insights' },
    ],
    bottomItems: [
      { icon: 'settings',    label: 'Settings', route: 'settings' },
      { icon: 'help_outline', label: 'Support',  route: 'support' },
    ],
    ctaLabel: 'New Appointment',
    ctaIcon: 'add',
  },
  admin: {
    label: 'Admin Console',
    primaryItems: [
      { icon: 'analytics',      label: 'Insights',   route: 'insights', fill: true },
      { icon: 'grid_view',      label: 'Dashboard',  route: 'dashboard' },
      { icon: 'group',          label: 'Patients',   route: 'patients' },
      { icon: 'calendar_today', label: 'Schedule',   route: 'schedule' },
      { icon: 'folder_shared',  label: 'Records',    route: 'records' },
    ],
    bottomItems: [
      { icon: 'settings',    label: 'Settings', route: 'settings' },
      { icon: 'help_outline', label: 'Support',  route: 'support' },
    ],
    ctaLabel: 'New Appointment',
    ctaIcon: 'add',
  },
};

// ── Sub-components ────────────────────────────────────────────────────────────

/** Single navigation link with active / hover state. */
function NavItem({ icon, label, to, fill = false, isActive }) {
  const iconStyle = fill
    ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }
    : { fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" };

  return (
    <NavLink
      to={to}
      end
      className={({ isActive: navActive }) =>
        `w-full flex items-center gap-3 px-4 py-3 mx-0 rounded-2xl
         transition-all duration-200 hover:translate-x-1 text-left
         ${navActive
           ? 'bg-teal-50 text-teal-700 font-semibold'
           : 'text-slate-600 hover:bg-slate-200 font-medium'
         }`
      }
    >
      <span className="material-symbols-outlined" style={iconStyle}>
        {icon}
      </span>
      <span className="text-sm">{label}</span>
    </NavLink>
  );
}

/** User profile chip at the bottom of the sidebar. */
function UserProfile({ user }) {
  const { name = 'User', title = '', avatarUrl = '' } = user;

  return (
    <div className="flex items-center gap-3 px-2">
      <div className="w-10 h-10 rounded-full bg-[#ffdcc3] flex items-center justify-center overflow-hidden shrink-0">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span
            className="material-symbols-outlined text-[#6e3900]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            account_circle
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-on-surface truncate">{name}</p>
        {title && (
          <p className="text-[10px] text-on-surface-variant truncate">{title}</p>
        )}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Sidebar({
  role = 'patient',
  user = {},
  basePath,
  onNavigate,
}) {
  const config = NAV_CONFIG[role] ?? NAV_CONFIG.patient;

  /** Build the full URL from base path + route key. */
  function toUrl(route) {
    return `${basePath}/${route}`;
  }

  return (
    <aside
      className="
        h-screen w-64 fixed left-0 top-0 z-50
        bg-slate-50 border-r border-slate-100
        flex flex-col py-6 gap-y-1 overflow-y-auto
      "
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* ── Brand header ───────────────────────────────────────────────── */}
      <div className="px-6 mb-8">
        <h1 className="text-xl font-bold tracking-tighter text-teal-800">
          Sanctuary Health
        </h1>
        {config.label && (
          <p className="text-[10px] uppercase tracking-widest text-[#854600] font-bold mt-1">
            {config.label}
          </p>
        )}
      </div>

      {/* ── Primary nav items ───────────────────────────────────────────── */}
      <nav className="flex-1 flex flex-col gap-y-1 px-4">
        {config.primaryItems.map((item) => (
          <NavItem
            key={item.route}
            icon={item.icon}
            label={item.label}
            to={toUrl(item.route)}
            fill={item.fill}
          />
        ))}
      </nav>

      {/* ── CTA button ──────────────────────────────────────────────────── */}
      <div className="px-6 mt-4 mb-2">
        <button
          onClick={() => onNavigate?.('new-appointment')}
          className="
            w-full flex items-center justify-center gap-2
            py-3 rounded-lg font-semibold text-sm text-white
            bg-gradient-to-br from-[#006161] to-[#007c7c]
            shadow-lg shadow-[#006161]/20
            hover:shadow-xl hover:shadow-[#006161]/30
            active:scale-[0.98] transition-all
          "
        >
          <span
            className="material-symbols-outlined text-sm"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            {config.ctaIcon}
          </span>
          {config.ctaLabel}
        </button>
      </div>

      {/* ── Bottom utility nav items ────────────────────────────────────── */}
      <div className="px-4 flex flex-col gap-y-1">
        {config.bottomItems.map((item) => (
          <NavItem
            key={item.route}
            icon={item.icon}
            label={item.label}
            to={toUrl(item.route)}
          />
        ))}
      </div>

      {/* ── User profile ────────────────────────────────────────────────── */}
      <div className="mt-6 px-4 pt-4 border-t border-slate-100">
        <UserProfile user={user} />
      </div>
    </aside>
  );
}
