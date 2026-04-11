import { useState } from 'react';

/**
 * TopHeader
 *
 * Sticky top application bar shared across all dashboard roles.
 * Contains: search input, notification bell (with unread badge),
 * account icon, and an optional role badge.
 *
 * Kept intentionally role-agnostic for layout concerns — the `role`
 * prop is only used to show a subtle "Admin Mode" indicator when relevant.
 *
 * @param {object}   props
 * @param {'admin'|'doctor'|'patient'} props.role
 * @param {object}   props.user              - { name, avatarUrl }
 * @param {number}   [props.notifCount=0]   - Unread notification count.
 * @param {function} [props.onSearch]       - Called with query string as user types.
 * @param {function} [props.onNotifClick]   - Called when the bell icon is pressed.
 * @param {function} [props.onProfileClick] - Called when the avatar / account icon is pressed.
 * @param {string}   [props.searchPlaceholder] - Override the default placeholder text.
 */

// Role-specific placeholder copy so context feels natural.
const SEARCH_PLACEHOLDERS = {
  admin:   'Search system resources...',
  doctor:  'Search patients, records, or labs...',
  patient: 'Search records...',
};

// ── Sub-components ────────────────────────────────────────────────────────────

/** Circular icon button with optional notification dot. */
function IconButton({ icon, hasNotif = false, onClick, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="
        relative p-2 rounded-full
        hover:bg-slate-100 active:scale-95
        transition-all duration-150
      "
    >
      <span
        className="material-symbols-outlined text-teal-700"
        style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
      >
        {icon}
      </span>
      {hasNotif && (
        <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white" />
      )}
    </button>
  );
}

/** Admin mode pill shown only for role === 'admin'. */
function AdminBadge() {
  return (
    <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 bg-[#ffdcc3] text-[#2f1500] rounded-full text-xs font-bold uppercase tracking-wider">
      <span className="w-2 h-2 rounded-full bg-[#a95b00] animate-pulse" />
      Admin Mode
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function TopHeader({
  role = 'patient',
  user = {},
  notifCount = 0,
  onSearch,
  onNotifClick,
  onProfileClick,
  searchPlaceholder,
}) {
  const [query, setQuery] = useState('');

  const placeholder =
    searchPlaceholder ?? SEARCH_PLACEHOLDERS[role] ?? 'Search...';

  function handleChange(e) {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  }

  return (
    <header
      className="
        w-full sticky top-0 z-40 h-16 px-8
        flex items-center justify-between
        bg-white/80 backdrop-blur-xl
        shadow-[0_8px_32px_rgba(24,28,32,0.06)]
      "
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* ── Left: search ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <div className="relative group">
          {/* Leading icon */}
          <span
            className="
              material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2
              text-[#6e7979] group-focus-within:text-[#006161] transition-colors
            "
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            search
          </span>

          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder={placeholder}
            className="
              pl-10 pr-4 py-2
              bg-[#f1f4fa] border-transparent
              focus:border-[#006161]/40 focus:ring-0
              rounded-full text-sm text-[#181c20]
              placeholder:text-[#6e7979]/60
              w-72 transition-all
            "
          />
        </div>
      </div>

      {/* ── Right: admin badge + action icons ──────────────────────────── */}
      <div className="flex items-center gap-2">
        {role === 'admin' && <AdminBadge />}

        <IconButton
          icon="notifications"
          hasNotif={notifCount > 0}
          onClick={onNotifClick}
          title={notifCount > 0 ? `${notifCount} notifications` : 'Notifications'}
        />

        {/* Avatar or account icon */}
        {user.avatarUrl ? (
          <button
            onClick={onProfileClick}
            className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#95f2f1] active:scale-95 transition-transform"
          >
            <img
              src={user.avatarUrl}
              alt={user.name ?? 'Profile'}
              className="w-full h-full object-cover"
            />
          </button>
        ) : (
          <IconButton
            icon="account_circle"
            onClick={onProfileClick}
            title="Your profile"
          />
        )}
      </div>
    </header>
  );
}
