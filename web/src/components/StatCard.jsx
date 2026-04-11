/**
 * StatCard
 *
 * Bento-grid statistic tile used on Admin, Doctor, and Patient dashboards.
 * Supports four visual variants that map to the MediTrack colour system:
 *
 *   'primary'   → teal  (system uptime, today's patients)
 *   'secondary' → blue  (lab reviews, network users)
 *   'tertiary'  → amber (appointments, pending items)
 *   'error'     → red   (urgent alerts — rendered as a wider alert strip)
 *
 * The `trend` prop renders a small inline badge ("+2 from yesterday").
 * The `bar` prop renders a thin progress bar at the bottom of the card.
 * The `icon` prop accepts any Material Symbol name.
 *
 * @param {object}  props
 * @param {string}  props.label               - Metric label, e.g. "System Uptime"
 * @param {string|number} props.value         - Primary display value, e.g. "99.98%" or 12
 * @param {string}  [props.icon]              - Material Symbol name
 * @param {'primary'|'secondary'|'tertiary'|'error'} [props.variant='primary']
 * @param {string}  [props.trend]             - Small badge text, e.g. "+2 from yesterday"
 * @param {string}  [props.trendLabel]        - Replaces trend for semantic overrides, e.g. "3 pending"
 * @param {number}  [props.barValue]          - 0-100, renders a progress bar when provided
 * @param {string}  [props.barLabel]          - Right-side value label, e.g. "75% High Load"
 * @param {string}  [props.barTitle]          - Left-side title label above the bar (default: "Capacity")
 * @param {string}  [props.subtitle]          - Secondary line beneath the value
 * @param {string}  [props.className]         - Extra Tailwind classes on the card root
 * @param {function}[props.onClick]           - Makes the card interactive
 */

// ── Design token maps ─────────────────────────────────────────────────────────

const VARIANT = {
  primary: {
    card:        'bg-surface-container-lowest',
    value:       'text-primary',
    badge:       'bg-primary-container text-on-primary-container',
    bar:         'from-primary to-primary-light',
    barLabel:    'text-primary',
    icon:        'text-primary/10',
  },
  secondary: {
    card:        'bg-surface-container-lowest',
    value:       'text-on-surface',
    badge:       'bg-tertiary-container text-on-tertiary-container',
    bar:         'from-secondary to-secondary-light',
    barLabel:    'text-secondary',
    icon:        'text-secondary/10',
  },
  tertiary: {
    card:        'bg-surface-container-lowest',
    value:       'text-tertiary',
    badge:       'bg-tertiary-container text-on-tertiary-container',
    bar:         'from-tertiary to-tertiary-light',
    barLabel:    'text-tertiary',
    icon:        'text-tertiary/10',
  },
  error: {
    // The error variant is a wider alert strip used for urgent notifications.
    card:        'bg-error-container/20 border border-error/5',
    value:       'text-error',
    badge:       'bg-error-container text-on-error-container',
    bar:         'from-error to-on-error-container',
    barLabel:    'text-error',
    icon:        'text-error/10',
  },
};

// ── Sub-components ────────────────────────────────────────────────────────────

function TrendBadge({ text, colorVariant }) {
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${VARIANT[colorVariant].badge}`}>
      {text}
    </span>
  );
}

function ProgressBar({ value = 0, label, title = 'Capacity', colorVariant }) {
  return (
    <div className="mt-4">
      <div className="w-full bg-[#f1f4fa] h-1.5 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${VARIANT[colorVariant].bar} rounded-full transition-all duration-700`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {label && (
        <div className="flex justify-between mt-1.5">
          <p className="text-[10px] text-[#3e4949] font-bold uppercase tracking-tighter">
            {title}
          </p>
          <p className={`text-[10px] font-bold ${VARIANT[colorVariant].barLabel}`}>
            {label}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function StatCard({
  label,
  value,
  icon,
  variant = 'primary',
  trend,
  trendLabel,
  barValue,
  barLabel,
  barTitle,
  subtitle,
  className = '',
  onClick,
}) {
  const tokens = VARIANT[variant] ?? VARIANT.primary;
  const isClickable = typeof onClick === 'function';

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden p-6 rounded-lg
        shadow-[0_8px_32px_rgba(24,28,32,0.06)]
        group transition-all duration-200
        ${tokens.card}
        ${isClickable ? 'cursor-pointer hover:-translate-y-1 hover:shadow-xl' : ''}
        ${className}
      `}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {/* ── Decorative background icon ───────────────────────────────────── */}
      {icon && (
        <div className="absolute top-0 right-0 p-4 pointer-events-none select-none">
          <span
            className={`material-symbols-outlined text-6xl rotate-12 transition-transform group-hover:rotate-0 ${tokens.icon}`}
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            {icon}
          </span>
        </div>
      )}

      {/* ── Label ────────────────────────────────────────────────────────── */}
      <p className="text-[#3e4949] font-medium text-sm mb-1 relative z-10">
        {label}
      </p>

      {/* ── Value + trend badge ───────────────────────────────────────────── */}
      <div className="flex items-baseline gap-2 relative z-10">
        <h3 className={`text-4xl font-bold ${tokens.value}`}>
          {value}
        </h3>
        {(trend || trendLabel) && (
          <TrendBadge text={trend ?? trendLabel} colorVariant={variant} />
        )}
      </div>

      {/* ── Optional subtitle ─────────────────────────────────────────────── */}
      {subtitle && (
        <p className="mt-1 text-xs text-[#3e4949] relative z-10">{subtitle}</p>
      )}

      {/* ── Optional progress bar ─────────────────────────────────────────── */}
      {barValue !== undefined && (
        <div className="relative z-10">
          <ProgressBar value={barValue} label={barLabel} title={barTitle} colorVariant={variant} />
        </div>
      )}
    </div>
  );
}
