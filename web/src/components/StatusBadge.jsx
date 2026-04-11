/**
 * StatusBadge
 *
 * Inline pill badge for row-level status labels used in patient tables,
 * user management tables, and lab result cards.
 *
 * Predefined semantic statuses map directly to MediTrack colour tokens.
 * An `auto` mode derives the variant from the status string so callers
 * don't have to pass a variant explicitly for the common cases.
 *
 * Predefined statuses (case-insensitive):
 *   active, online        → primary (teal)
 *   stable, normal, recovering → primary (teal)
 *   in-review, borderline, scheduled → secondary (blue)
 *   follow-up, elevated, review needed, critical, pending → tertiary (amber)
 *   offline, suspended    → neutral (slate)
 *   urgent, error         → error (red)
 *   practitioner          → primary-fixed (light teal)
 *   administrator         → tertiary-fixed (peach)
 *   support               → secondary-fixed (lavender)
 *
 * @param {object}  props
 * @param {string}  props.status                  - Display text, e.g. "Active", "In-Review"
 * @param {'primary'|'secondary'|'tertiary'|'error'|'neutral'|'practitioner'|'administrator'|'support'} [props.variant]
 *                                                - Override auto-detection
 * @param {boolean} [props.dot=false]             - Render a leading coloured dot (for live status)
 * @param {string}  [props.className]             - Extra Tailwind classes
 */

// ── Colour token map ──────────────────────────────────────────────────────────

const STYLES = {
  primary: {
    pill: 'bg-[#95f2f1] text-[#004f4f]',
    dot:  'bg-green-500',
  },
  secondary: {
    pill: 'bg-blue-50 text-blue-700',
    dot:  'bg-blue-500',
  },
  tertiary: {
    pill: 'bg-[#ffdcc3] text-[#6e3900]',
    dot:  'bg-amber-500',
  },
  error: {
    pill: 'bg-[#ffdad6] text-[#93000a]',
    dot:  'bg-[#ba1a1a]',
  },
  neutral: {
    pill: 'bg-slate-100 text-slate-500',
    dot:  'bg-slate-300',
  },
  // Role-specific variants used in user management tables
  practitioner: {
    pill: 'bg-[#95f2f1] text-[#004f4f]',
    dot:  'bg-[#006161]',
  },
  administrator: {
    pill: 'bg-[#ffdcc3] text-[#6e3900]',
    dot:  'bg-[#854600]',
  },
  support: {
    pill: 'bg-[#d9e2ff] text-[#0c4394]',
    dot:  'bg-[#305cae]',
  },
};

// ── Auto-detection map (lowercase status string → variant key) ────────────────

const STATUS_MAP = {
  // Primary / green
  active:          'primary',
  online:          'primary',
  stable:          'primary',
  normal:          'primary',
  recovering:      'primary',
  'on duty':       'primary',
  // Secondary / blue
  'in-review':     'secondary',
  'in review':     'secondary',
  borderline:      'secondary',
  scheduled:       'secondary',
  'just added':    'secondary',
  // Tertiary / amber
  'follow-up':     'tertiary',
  'follow up':     'tertiary',
  elevated:        'tertiary',
  'review needed': 'tertiary',
  critical:        'tertiary',
  pending:         'tertiary',
  'high load':     'tertiary',
  // Error / red
  urgent:          'error',
  error:           'error',
  suspended:       'error',
  // Neutral / grey
  offline:         'neutral',
  never:           'neutral',
  // Role labels
  practitioner:    'practitioner',
  administrator:   'administrator',
  support:         'support',
};

function deriveVariant(status) {
  if (!status) return 'neutral';
  return STATUS_MAP[status.toLowerCase()] ?? 'neutral';
}

// ── Main component ────────────────────────────────────────────────────────────

export default function StatusBadge({
  status,
  variant,
  dot = false,
  className = '',
}) {
  if (!status) return null;

  const resolvedVariant = variant ?? deriveVariant(status);
  const styles = STYLES[resolvedVariant] ?? STYLES.neutral;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-3 py-1 rounded-full
        text-[10px] font-bold uppercase tracking-wider
        ${styles.pill}
        ${className}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${styles.dot}`} />
      )}
      {status}
    </span>
  );
}
