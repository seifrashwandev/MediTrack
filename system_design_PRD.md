# MediTrack — System Design PRD
**Version:** 1.0  
**Author:** Mostafa Mohammed  
**Date:** April 8, 2026  
**Repo:** https://github.com/seifrashwandev/MediTrack.git

---

## 1. Design Philosophy

MediTrack follows a **clinical-minimal** aesthetic: clean, trustworthy, and highly legible. The design must communicate authority and calm — patients and doctors need clarity under stress. No decorative noise. Every visual decision earns its place.

**Core principles:**
- White surfaces, generous whitespace, fine borders (0.5px)
- Color as meaning — not decoration
- Role-specific color identity (Teal = Patient, Blue = Doctor, Amber = Admin)
- DM Sans for UI text, DM Mono for code/data
- Consistent 4px-based spacing grid

---

## 2. Color System

### 2.1 Primary Brand — Teal (Patient / Platform identity)

| Token | Hex | Use |
|---|---|---|
| `teal-50` | `#E1F5EE` | Patient backgrounds, light fills |
| `teal-100` | `#9FE1CB` | Borders on light backgrounds |
| `teal-200` | `#5DCAA5` | Hover states, secondary accents |
| `teal-400` | `#1D9E75` | **Primary brand color** — CTAs, active states |
| `teal-600` | `#0F6E56` | Hover on primary, dark accents |
| `teal-800` | `#085041` | Text on teal-50 backgrounds |
| `teal-900` | `#04342C` | High-contrast text |

### 2.2 Doctor Role — Blue

| Token | Hex | Use |
|---|---|---|
| `blue-50` | `#E6F1FB` | Doctor role backgrounds |
| `blue-200` | `#85B7EB` | Doctor borders, accents |
| `blue-400` | `#378ADD` | Doctor badge fill |
| `blue-600` | `#185FA5` | Doctor text on blue-50 |
| `blue-800` | `#0C447C` | High-contrast doctor text |

### 2.3 Admin Role — Amber

| Token | Hex | Use |
|---|---|---|
| `amber-50` | `#FAEEDA` | Admin backgrounds |
| `amber-200` | `#EF9F27` | Accent |
| `amber-400` | `#BA7517` | Admin badge/border |
| `amber-600` | `#854F0B` | Admin dark text |
| `amber-800` | `#633806` | High-contrast admin text |

### 2.4 Semantic Colors

| State | Hex | Token | Use |
|---|---|---|---|
| Success | `#639922` | `green-400` | Normal lab results, confirmed |
| Warning | `#EF9F27` | `amber-200` | Pending review, review needed |
| Danger | `#E24B4A` | `red-400` | Urgent, critical, errors |
| Info | `#378ADD` | `blue-400` | General info badges |

### 2.5 Neutral / Structural

| Token | Hex | Use |
|---|---|---|
| `gray-50` | `#F1EFE8` | Tags, muted fills |
| `gray-100` | `#D3D1C7` | Disabled elements |
| `gray-400` | `#888780` | Muted icons |
| `gray-600` | `#5F5E5A` | Muted text |
| `gray-800` | `#444441` | Secondary text |

### 2.6 Surface & Background

| Token | Hex | Use |
|---|---|---|
| `bg` | `#F7F8FA` | Page background |
| `surface` | `#FFFFFF` | Cards, panels, nav |
| `border` | `rgba(0,0,0,0.08)` | Default 0.5px borders |
| `border-md` | `rgba(0,0,0,0.14)` | Emphasized borders |

---

## 3. Typography

**Font Stack:**
```css
--font-primary: 'DM Sans', system-ui, sans-serif;
--font-mono: 'DM Mono', monospace;
```

**Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**Scale:**

| Role | Size | Weight | Use |
|---|---|---|---|
| Page Heading | 28px | 500 | Dashboard titles |
| Section Heading | 20px | 500 | Card groups, page sections |
| Card Title | 15px | 600 | Card headers |
| Body | 14px | 400 | General content |
| Body Small | 13px | 400 | Table rows, list items |
| Caption / Label | 11px | 500 | Muted labels, metadata |
| Overline | 11px | 600, uppercase, +0.08em | Section dividers |
| Code / Data | 12px | 400, DM Mono | API endpoints, IDs |

---

## 4. Spacing & Layout

**Base unit:** 4px

| Token | Value | Use |
|---|---|---|
| `space-1` | 4px | Tight internal gaps |
| `space-2` | 8px | Component-internal padding |
| `space-3` | 12px | Between related elements |
| `space-4` | 16px | Card gaps, section padding |
| `space-6` | 24px | Section separators |
| `space-8` | 32px | Major section breaks |

**Border Radius:**
```css
--r-sm: 6px;   /* Badges, small pills */
--r-md: 10px;  /* Inputs, buttons, small cards */
--r-lg: 14px;  /* Cards, panels */
--r-xl: 20px;  /* Modals, large containers */
--r-full: 9999px; /* Pills, avatars */
```

---

## 5. Component Reference

### 5.1 Navigation
- **Top nav:** 56px height, sticky, `surface` bg, `border-md` bottom
- **Sidebar:** 220px width, same card style, `sidebar-item` with active teal state
- **Active state:** `teal-50` background, `teal-600` text

### 5.2 Cards
```css
background: #FFFFFF;
border: 0.5px solid rgba(0,0,0,0.14);
border-radius: 14px;
padding: 1.25rem;
```

### 5.3 Stat Cards (Metric display)
```css
background: #F7F8FA;
border-radius: 10px;
padding: 1rem;
/* label: 11px, muted */
/* value: 26px, font-weight 500 */
```

### 5.4 Badges / Status Chips
```css
padding: 2px 8px;
border-radius: 20px;
font-size: 11px;
font-weight: 500;
```
Status dot prepend: `::before { width:5px; height:5px; border-radius:50%; background:currentColor }`

### 5.5 Buttons
| Variant | Background | Text | Use |
|---|---|---|---|
| Primary | `teal-400` | white | Main CTA |
| Ghost | transparent + border | `gray-600` | Secondary actions |
| Danger | `red-50` | `red-600` | Destructive actions |
| Small modifier | padding: 4px 10px / 12px font | — | Table/list inline actions |

### 5.6 Form Inputs
```css
border: 0.5px solid rgba(0,0,0,0.14);
border-radius: 10px;
padding: 8px 12px;
font-size: 13px;
background: #F7F8FA;
/* focus: border-color teal-200 */
```

### 5.7 Schedule Slots
- **Busy:** `teal-50` fill + `teal-400` left border (3px)
- **Available:** `gray-50` fill + `gray-100` left border
- **Urgent:** `coral-50` fill + `coral-400` left border

### 5.8 Avatars
```css
width: 36px; height: 36px;
border-radius: 50%;
/* initials: 12px, font-weight 600 */
/* colors: role-matched (teal/blue/amber/coral) */
```

---

## 6. Role Identity System

Each user role has a consistent color identity used across all UI surfaces:

| Role | Primary Color | Badge | Sidebar | Avatar |
|---|---|---|---|---|
| Patient | Teal (`#1D9E75`) | `badge-teal` | Teal active state | `av-teal` |
| Doctor | Blue (`#378ADD`) | `badge-blue` | Blue accents | `av-blue` |
| Admin | Amber (`#BA7517`) | `badge-amber` | Amber accents | `av-amber` |

---

## 7. Feature Inventory & User Access

### 7.1 Complete Feature List

| # | Feature | Patient | Doctor | Admin |
|---|---|---|---|---|
| 1 | Register / Login | ✓ | ✓ | ✓ |
| 2 | OAuth Login (Google, GitHub) | ✓ | ✓ | ✓ |
| 3 | MFA (TOTP / SMS OTP) | ✓ | ✓ | ✓ |
| 4 | Profile management | Own only | Own only | All users |
| 5 | Book appointment | ✓ | — | ✓ |
| 6 | Cancel / reschedule appt | Own only | Own patients | All |
| 7 | View appointment calendar | Own | Own schedule | All |
| 8 | Real-time slot availability | ✓ (read) | ✓ (write) | ✓ |
| 9 | Google Calendar sync | ✓ | ✓ | — |
| 10 | View patient records | Own only | Assigned | All |
| 11 | Update patient records | — | Assigned | All |
| 12 | Upload documents | — | ✓ | ✓ |
| 13 | View lab results | Own only | All assigned | All |
| 14 | Upload lab results | — | ✓ | ✓ |
| 15 | Download lab PDF | Own only | ✓ | ✓ |
| 16 | Instant lab notification | Receives | — | — |
| 17 | Create prescription | — | ✓ | — |
| 18 | View prescription | Own only | All assigned | All |
| 19 | Download prescription PDF | Own only | ✓ | ✓ |
| 20 | AI symptom checker | ✓ (basic) | ✓ (full) | ✓ (analytics) |
| 21 | AI diagnosis suggestion | — | ✓ | — |
| 22 | AI medical data summary | — | ✓ | — |
| 23 | Email notifications | ✓ | ✓ | ✓ |
| 24 | SMS alerts | ✓ | — | — |
| 25 | Push notifications | ✓ | ✓ | ✓ |
| 26 | Manage users | — | — | ✓ |
| 27 | Manage doctors | — | — | ✓ |
| 28 | System analytics | — | Own stats | Full |
| 29 | Audit log | — | — | ✓ |
| 30 | Export data (CSV) | — | — | ✓ |

---

## 8. Feature User Flows

### 8.1 Patient: Book Appointment
```
Login → Dashboard → "Book Appointment" 
→ Select specialty → Select doctor 
→ View real-time available slots (WebSocket) 
→ Pick slot → Confirm 
→ Email + SMS confirmation sent 
→ Calendar event synced (Google)
→ Appointment visible in "My Appointments"
```

**Restrictions:** Patient can only book for themselves. Cannot book if slot no longer available (WS conflict guard).

### 8.2 Doctor: Write Prescription
```
Login → Patient List → Select patient 
→ Patient profile → "New Prescription" 
→ Fill: medication, dosage, instructions, duration 
→ Submit → PDF generated (server-side) 
→ Patient notified (push + email) 
→ Prescription visible to patient in "My Prescriptions"
```

**Restrictions:** Only licensed doctors (role=doctor) can POST /rx. Admin cannot create prescriptions.

### 8.3 Doctor: Upload Lab Results
```
Doctor login → Patient profile → "Upload Lab Result" 
→ Select file (PDF/image, max 10MB) 
→ Add metadata: test name, date, status flag 
→ Upload to S3 (pre-signed URL) 
→ Record saved in PostgreSQL 
→ Patient receives real-time notification (WS) + email
```

**Restrictions:** Only Doctor and Admin can upload. Patient receives read-only access to their own results.

### 8.4 Patient: View Lab Results
```
Login → "Lab Results" → List of results 
→ Filter by date / status 
→ Click result → View details 
→ Download PDF
```

**Restrictions:** Can only view own records. Results flagged "Attention" shown with red badge.

### 8.5 Admin: Manage Users
```
Admin login → "Users" → List all users 
→ Filter by role / status 
→ Click user → Profile view 
→ Actions: Edit role, Disable account, Reset password, View audit trail
```

### 8.6 AI Symptom Checker (Patient)
```
Login → "AI Symptom Check" 
→ Describe symptoms in natural language 
→ AI returns: possible conditions, severity rating, recommended action 
→ Option: "Book appointment based on this"
```

**Restrictions:** Results are suggestions only — clearly labeled "not a diagnosis." Full diagnostic tools only available to doctors.

### 8.7 Auth: Login Flow
```
Visit /login 
→ Enter email + password 
  OR click "Login with Google/GitHub" (OAuth redirect) 
→ If MFA enabled: enter TOTP code or SMS OTP 
→ Server validates → issues JWT (access + refresh tokens) 
→ Redirect by role:
   Patient → /dashboard/patient
   Doctor  → /dashboard/doctor
   Admin   → /dashboard/admin
```

---

## 9. Backend Services Map

### 9.1 Service Boundaries

| Service | Responsibility | DB Tables |
|---|---|---|
| `auth-service` | Registration, login, OAuth, MFA, JWT | Users |
| `patient-service` | CRUD patient records, document storage | Patients |
| `appointment-service` | Booking, slots, calendar, WS events | Appointments |
| `lab-service` | Upload, store, notify lab results | LabResults |
| `prescription-service` | Create, PDF, patient access | Prescriptions |
| `ai-service` | Symptom analysis, diagnosis, summaries | — (stateless) |
| `notification-service` | Email (SendGrid), SMS (Twilio), Push | NotificationLog |
| `admin-service` | User management, analytics, audit | All (read) |

### 9.2 Real-Time Events (WebSocket)

| Event | Direction | Subscribers |
|---|---|---|
| `slot:update` | Server → Client | All authenticated |
| `lab:new` | Server → Client | Patient (own) + Doctor |
| `appt:reminder` | Server → Client | Patient (own) |
| `appt:cancelled` | Server → Client | Patient + Doctor |
| `notif:push` | Server → Client | Role-based |

### 9.3 API Endpoints Summary

**Auth**
```
POST   /auth/register
POST   /auth/login
POST   /auth/oauth/:provider
POST   /auth/mfa/setup
POST   /auth/mfa/verify
POST   /auth/refresh
POST   /auth/logout
```

**Patients**
```
GET    /patients              [admin, doctor]
GET    /patients/:id          [own, doctor, admin]
POST   /patients              [admin]
PATCH  /patients/:id          [doctor, admin]
DELETE /patients/:id          [admin]
POST   /patients/:id/docs     [doctor, admin]
```

**Appointments**
```
GET    /appointments           [admin]
GET    /appointments/mine      [patient]
GET    /appointments/schedule  [doctor]
POST   /appointments           [patient]
PATCH  /appointments/:id       [patient, doctor, admin]
DELETE /appointments/:id       [patient, admin]
GET    /slots/:doctorId        [public*]
```

**Labs**
```
GET    /labs/mine              [patient]
GET    /labs/:patientId        [doctor, admin]
POST   /labs/upload            [doctor, admin]
GET    /labs/:id/download      [own, doctor]
DELETE /labs/:id               [admin]
```

**Prescriptions**
```
GET    /rx/mine                [patient]
GET    /rx/:patientId          [doctor, admin]
POST   /rx                     [doctor]
GET    /rx/:id/pdf             [own, doctor]
PATCH  /rx/:id                 [doctor]
```

**AI**
```
POST   /ai/symptoms            [patient, doctor]
POST   /ai/diagnose            [doctor]
POST   /ai/summarize/:id       [doctor]
```

**Admin**
```
GET    /admin/users            [admin]
PATCH  /admin/users/:id        [admin]
DELETE /admin/users/:id        [admin]
GET    /admin/analytics        [admin]
GET    /admin/audit-log        [admin]
```

---

## 10. Database Schema (Key Entities)

```sql
-- Users
users (id, email, password_hash, role, oauth_provider, mfa_enabled, mfa_secret, is_active, created_at)

-- Patients
patients (id, user_id FK, full_name, dob, gender, blood_type, medical_history, created_at)

-- Appointments
appointments (id, patient_id FK, doctor_id FK, slot_time, status[pending|confirmed|cancelled], notes, created_at)

-- Lab Results
lab_results (id, patient_id FK, uploaded_by FK, test_name, status[normal|review|attention], file_url, file_key, test_date, created_at)

-- Prescriptions
prescriptions (id, patient_id FK, doctor_id FK, medications JSONB, instructions, issue_date, expiry_date, pdf_url, created_at)

-- Notification Log
notification_log (id, user_id FK, type[email|sms|push], content, sent_at, status)
```

---

## 11. Non-Functional Design Requirements

| Requirement | Target |
|---|---|
| API response time | < 200ms (p95) |
| Real-time latency | < 1 second |
| Uptime | 99.9% |
| File upload max size | 10MB |
| JWT access token expiry | 15 minutes |
| JWT refresh token expiry | 7 days |
| Password hashing | bcrypt, cost 12 |
| Encryption at rest | AES-256 |
| Transport | HTTPS only |
| Compliance | OWASP Top 10 |

---

## 12. Page Structure Map

### Patient Pages
```
/login
/register
/dashboard                    → stats, upcoming appts, recent labs
/appointments                 → list + book new
/appointments/:id             → detail, cancel, reschedule
/labs                         → result list
/labs/:id                     → detail + download
/prescriptions                → list
/prescriptions/:id            → detail + PDF download
/ai-checker                   → symptom input + AI response
/profile                      → settings, MFA, notifications
```

### Doctor Pages
```
/dashboard                    → today schedule, pending labs, recent patients
/patients                     → search + list
/patients/:id                 → full record, history, upload, prescribe
/schedule                     → weekly calendar view
/labs                         → upload + review queue
/labs/:id                     → detail
/prescriptions                → write new, list
/ai                           → diagnostic assistant (full)
/analytics                    → own stats
/profile                      → settings, availability
```

### Admin Pages
```
/dashboard                    → system metrics, activity feed
/users                        → all users, filter, manage
/users/:id                    → profile, role, audit
/doctors                      → doctor management
/appointments                 → all appointments
/analytics                    → full clinic analytics
/integrations                 → Twilio, SendGrid config
/audit-log                    → system event log
/settings                     → global config
```

---

## 13. Shared UI State & Real-Time

- All dashboards maintain a **WebSocket connection** on mount
- Slot availability updates must reflect in `<60ms` for active booking screens
- Lab result uploads trigger `lab:new` WS event → toast notification for patient
- Appointment cancellations trigger `appt:cancelled` for both patient and doctor
- JWT refresh handled silently via interceptor (no logout on expiry during active session)

---

## 14. AI Reference Note (for Codegen)

This PRD is the single source of truth for all design decisions in MediTrack.

When generating components:
- Always import `DM Sans` + `DM Mono` from Google Fonts
- Use the CSS custom properties defined in Section 2
- Role color = Teal (patient), Blue (doctor), Amber (admin)
- Semantic color = Green (success), Amber (warning), Red (danger)
- All borders are `0.5px` — not `1px`
- Corner radius: use `--r-lg` (14px) for cards, `--r-md` (10px) for inputs/buttons
- Spacing follows 4px base unit
- Status badges always include a colored dot prefix
- Never use color as the only indicator of role — always pair with label/text

---

*End of system_design_PRD.md*
