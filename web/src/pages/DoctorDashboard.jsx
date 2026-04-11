import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';

/**
 * DoctorDashboard
 *
 * Clinical overview page for the Doctor role.
 * Sections: welcome hero, today's stats, urgent alert, schedule timeline,
 * recent patients table, and a research highlight strip.
 */

// ── Static data ───────────────────────────────────────────────────────────────

const DOCTOR_USER = {
  name: 'Dr. Julian Vance',
  title: 'Chief of Medicine',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB3r7ZtUVXTmruvNZOSulYhjcXi9kqXbrXQ0rglttlETJLjBWU_xxqveJZZlYWDqPwzh5pqzu3loRUbdwtTV-s03PNQtwC6-7r0OQaAhWJSLNwNWrtLFuLLqSG028s-NKQGhDlhb4IuhUvLlTh6ZIgKS6H9Wm7e6amZ0LtMZdoxy6o1UCzM-jNv0JhKDPzkUoPs56uvS8dGx7ywHF4dslCggGYmOR_Zq_465hIsixxYkwLJ3Jj0Gf80VqPL3bp73FL571hjcwHfQ9Bo',
};

const TIMELINE = [
  { time: '09:30 AM', name: 'Robert Fox',    type: 'Post-Op Consultation', active: true },
  { time: '10:45 AM', name: 'Esther Howard', type: 'Annual Wellness Visit', active: false },
  { time: '01:00 PM', name: 'Staff Meeting', type: 'Conference Room B',    active: false, muted: true },
];

const PATIENTS = [
  { initials: 'JW', name: 'Jane Williams',  age: 28, gender: 'Female', status: 'In-Review',  lastVisit: 'Oct 24, 2023', color: 'bg-blue-100 text-blue-700' },
  { initials: 'BK', name: 'Bessie Koufax',  age: 64, gender: 'Female', status: 'Stable',     lastVisit: 'Oct 22, 2023', color: 'bg-emerald-100 text-emerald-700' },
  { initials: 'TC', name: 'Thomas Clark',   age: 45, gender: 'Male',   status: 'Follow-up',  lastVisit: 'Oct 20, 2023', color: 'bg-amber-100 text-amber-700' },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function TimelineItem({ item }) {
  return (
    <div
      className={`relative pl-12 group cursor-pointer ${item.muted ? 'opacity-60' : ''}`}
    >
      <div className="absolute left-0 top-1 w-10 h-10 bg-white border-4 border-[#f7f9ff] rounded-full flex items-center justify-center shadow-sm z-10 group-hover:scale-110 transition-transform">
        <div className={`w-2 h-2 rounded-full ${item.active ? 'bg-[#006161]' : 'bg-slate-300'}`} />
      </div>
      <div
        className={`p-4 rounded-xl group-hover:bg-white transition-colors ${
          item.active
            ? 'bg-[#f1f4fa] border-l-4 border-[#006161]'
            : item.muted
            ? 'bg-slate-100'
            : 'bg-[#f1f4fa]'
        }`}
      >
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {item.time}
        </span>
        <h4 className="font-bold text-[#181c20]">{item.name}</h4>
        <p className="text-xs text-slate-500">{item.type}</p>
      </div>
    </div>
  );
}

function PatientRow({ patient }) {
  return (
    <tr className="hover:bg-slate-50/80 transition-colors cursor-pointer group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${patient.color}`}>
            {patient.initials}
          </div>
          <div>
            <p className="font-bold text-[#181c20] group-hover:text-[#006161] transition-colors">
              {patient.name}
            </p>
            <p className="text-xs text-slate-500">
              {patient.gender}, {patient.age}y
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={patient.status} />
      </td>
      <td className="px-6 py-4 text-sm text-slate-600">{patient.lastVisit}</td>
      <td className="px-6 py-4 text-right">
        <button className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <span className="material-symbols-outlined text-slate-400">more_vert</span>
        </button>
      </td>
    </tr>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function DoctorDashboard() {
  return (
    <DashboardLayout
      role="doctor"
      user={DOCTOR_USER}
      basePath="/doctor"
    >
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* ── Welcome hero ─────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#80a7fe]/20 to-[#007c7c]/10 p-8 flex flex-col md:flex-row justify-between items-center border border-white/50">
          <div className="z-10 space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#181c20]">
              Welcome back, Dr. Vance
            </h2>
            <p className="text-slate-600 max-w-md">
              You have 12 patients scheduled for today. 3 reviews are pending your final clinical signature.
            </p>
          </div>
          <div className="hidden md:flex z-10 mt-4 md:mt-0">
            <div className="bg-white/90 backdrop-blur p-4 rounded-xl shadow-sm text-center">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Status</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold">
                ON DUTY
              </span>
            </div>
          </div>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl" />
        </section>

        {/* ── Stats grid ───────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            label="Today's Patients"
            value={12}
            icon="person"
            variant="secondary"
            trend="+2 from yesterday"
            className="md:col-span-1 hover:-translate-y-1"
          />
          <StatCard
            label="Lab Reviews"
            value="08"
            icon="rate_review"
            variant="tertiary"
            trendLabel="3 pending"
            className="md:col-span-1 hover:-translate-y-1"
          />

          {/* Urgent alert — spans 2 columns, uses error variant colours inline */}
          <div className="md:col-span-2 p-6 bg-[#ffdad6]/20 rounded-2xl shadow-[0_8px_32px_rgba(24,28,32,0.06)] border border-[#ba1a1a]/5 flex items-center gap-6">
            <div className="p-4 bg-[#ba1a1a] rounded-full text-white animate-pulse shrink-0">
              <span className="material-symbols-outlined">emergency</span>
            </div>
            <div>
              <h4 className="font-bold text-[#181c20]">Urgent Notification</h4>
              <p className="text-sm text-slate-600">
                Stat MRI results for Patient Sarah Chen (Room 402) are ready for review.
              </p>
              <button className="mt-2 text-[#ba1a1a] font-bold text-xs uppercase tracking-widest hover:underline">
                View Results Now
              </button>
            </div>
          </div>
        </section>

        {/* ── Timeline + Patient table ──────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold tracking-tight text-[#181c20]">
                Today's Timeline
              </h3>
              <button className="text-sm font-bold text-[#006161] hover:underline">
                View Calendar
              </button>
            </div>
            <div className="space-y-4 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200/50">
              {TIMELINE.map((item) => (
                <TimelineItem key={item.name} item={item} />
              ))}
            </div>
          </div>

          {/* Patients table */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold tracking-tight text-[#181c20]">
                Recent Patients
              </h3>
              <div className="flex gap-2">
                {['filter_list', 'sort'].map((icon) => (
                  <button key={icon} className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
                    <span className="material-symbols-outlined text-slate-600">{icon}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(24,28,32,0.06)] overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100/10">
                    {['Patient', 'Status', 'Last Visit', ''].map((h) => (
                      <th key={h} className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {PATIENTS.map((p) => (
                    <PatientRow key={p.name} patient={p} />
                  ))}
                </tbody>
              </table>
              <div className="p-4 bg-slate-50/30 flex justify-center">
                <button className="text-sm font-bold text-slate-500 hover:text-[#006161] transition-colors">
                  View All Patients
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Research + hospitality strip ─────────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-[#006161] p-1 rounded-2xl">
            <div className="h-full bg-white rounded-xl p-8 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#006161]/10 text-[#006161] text-[10px] font-bold uppercase tracking-widest mb-4">
                  Latest Research
                </span>
                <h3 className="text-2xl font-extrabold text-[#181c20] leading-tight mb-4">
                  Neuroplasticity and Chronic Pain Management
                </h3>
                <p className="text-slate-600 mb-6">
                  A new meta-analysis explores the efficacy of cognitive behavioral therapy integrated with pharmacological intervention in patients aged 50–70.
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhpwmD2QiPounIBjpcmpwM-qudzpMDwN4x3J8IQXelyYvdNO8xdRnYoVyaHC7g04rRSlHo_FBNAvXbEVZY3ru6uSvk4jiZu8CkgjwyPfpD6bhecLN3Zr6LYr70wkyc0Azt-MnFKRMEgAP50d2hclILZZf0mp220Leu_0cSixWiC49QNCNfDZvcXSxxO-CuUWcwyILE7DILfHI8WpwYxrwUXpOJd8sR_q2FoTvO_4_yXmLxCPbuR8hgLlWL91S_IHz0AmfCkvT5qHeK"
                      alt="Dr. Elena Rodriguez"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-bold text-[#181c20]">Dr. Elena Rodriguez</span>
                </div>
                <button className="flex items-center gap-2 text-[#006161] font-bold hover:gap-3 transition-all text-sm">
                  Read Full Study
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden group min-h-[240px]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDE6R3rR1GmJ1iKWCzqUp20VDbl8c_ONcC2IGMEuqwwSfkd4YTdCIWA1c740CCMgSNv2ATrSRzu9eowv5costaZ_ru-x1mPeX9wG9CNKSCjlhLwW8t-0-LE5qnvd2_2_PJfAsdwQMjZhouNxbQX_kyJ21kua8F7eQ1EMIU97S0P_K1lxR-Xxu5rWoQ1seNjuQz0j-cMSWrHeNp38WxtUAHWLHGqPhMMbU1VgAe5VJsyprsa0sST2Q4TZhAQvmXtTK8VtOzk5PmrEGs4"
              alt="Staff lounge"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181c20]/60 to-transparent p-8 flex flex-col justify-end">
              <p className="text-white/80 font-bold uppercase tracking-widest text-[10px] mb-2">Hospitality Note</p>
              <h4 className="text-2xl font-bold text-white mb-2">Staff Lounge Renovated</h4>
              <p className="text-white/70 text-sm">The South Wing lounge now features quiet zones for clinicians between rotations.</p>
            </div>
          </div>
        </section>
      </div>

      {/* ── FAB ────────────────────────────────────────────────────────────── */}
      <button className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full flex items-center justify-center bg-white/70 backdrop-blur text-[#007c7c] shadow-xl border border-white/40 hover:scale-110 active:scale-95 transition-all group">
        <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform">
          add
        </span>
      </button>
    </DashboardLayout>
  );
}
