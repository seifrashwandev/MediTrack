import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import StatusBadge from '../components/StatusBadge';

/**
 * PatientDashboard
 *
 * Personal health overview for the Patient role.
 * Sections: greeting, next appointment card, AI symptom checker CTA,
 * health metric tiles (steps + sleep), active prescriptions, recent lab results.
 */

// ── Static data ───────────────────────────────────────────────────────────────

const PATIENT_USER = {
  name: 'Alex Rivera',
  title: 'Patient ID: #8291',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAKhiiYpxWqIxM6R_qmX-LXW_UBRcSEQJitdw62Ft35yaU6e7DsOYEWezoO7tC4LzYgfhGyNraegHsdHnxpTpUgy7VpdiXSNXb4iqFjDto1R04LyisTtTRE5KQtX590A7tjhi0Kp7qILoG8eOvPB35j9xdk4Pb5j-w21ZS5DRC76pQMc6bQGDVxGdc3LPDdPXC5uflKT_XOAOvMU96BENX1yNFo6wVOLjdSR4DkmDa9Phe6xW8TczNN74LdiGJ9Di7m7Eqzc77BZRBO',
};

const PRESCRIPTIONS = [
  {
    name: 'Lisinopril 10mg',
    instructions: 'Take 1 tablet daily',
    refills: '8 refills left',
    pharmacy: 'CVS-82',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    refillColor: 'text-teal-600',
    urgent: false,
  },
  {
    name: 'Atorvastatin 20mg',
    instructions: 'Take 1 tablet before bed',
    refills: 'Low: 1 left',
    pharmacy: 'CVS-82',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    refillColor: 'text-[#ba1a1a]',
    urgent: true,
  },
];

const LAB_RESULTS = [
  {
    name: 'Hemoglobin A1c',
    value: '5.4%',
    range: 'Range: 4.0 – 5.6',
    status: 'Normal',
    barWidth: '65%',
    barColor: 'bg-green-500',
    date: 'Sept 14, 2023',
  },
  {
    name: 'Total Cholesterol',
    value: '204',
    range: 'Range: <200',
    status: 'Borderline',
    barWidth: '82%',
    barColor: 'bg-amber-500',
    date: 'Sept 14, 2023',
  },
  {
    name: 'Vitamin D',
    value: '42.1',
    range: 'Range: 30 – 100',
    status: 'Normal',
    barWidth: '45%',
    barColor: 'bg-green-500',
    date: 'Sept 14, 2023',
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function HealthTile({ icon, iconBg, iconColor, label, value, badgeText, badgeColor, children }) {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm border border-[#bdc9c8]/15">
      <div className="flex justify-between items-start">
        <div className={`p-3 ${iconBg} rounded-2xl ${iconColor}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span className={`font-bold text-xs px-2 py-1 rounded-full ${badgeColor}`}>{badgeText}</span>
      </div>
      <div>
        <p className="text-[#3e4949] text-sm font-medium">{label}</p>
        <h3 className="text-3xl font-extrabold text-[#181c20]">{value}</h3>
      </div>
      {children}
    </div>
  );
}

function PrescriptionCard({ rx }) {
  return (
    <div className="bg-white p-4 rounded-2xl flex items-center gap-4 hover:scale-[1.01] cursor-pointer transition-transform shadow-sm">
      <div className={`w-12 h-12 ${rx.iconBg} rounded-xl flex items-center justify-center ${rx.iconColor}`}>
        <span className="material-symbols-outlined">pill</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[#181c20] truncate">{rx.name}</p>
        <p className="text-xs text-[#3e4949]">{rx.instructions}</p>
      </div>
      <div className="text-right shrink-0">
        <p className={`text-xs font-bold ${rx.refillColor}`}>{rx.refills}</p>
        <p className="text-[10px] text-[#3e4949] uppercase tracking-wider">
          Pharmacy: {rx.pharmacy}
        </p>
      </div>
    </div>
  );
}

function LabResultCard({ result }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-4">
        <p className="font-bold text-[#181c20]">{result.name}</p>
        <StatusBadge status={result.status} />
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-extrabold text-[#181c20]">{result.value}</span>
        <span className="text-xs text-[#3e4949]">{result.range}</span>
      </div>
      <div className="h-1 bg-slate-100 rounded-full w-full overflow-hidden">
        <div
          className={`h-full ${result.barColor} rounded-full`}
          style={{ width: result.barWidth }}
        />
      </div>
      <p className="text-[10px] text-[#3e4949] mt-2">Tested on {result.date}</p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function PatientDashboard() {
  return (
    <DashboardLayout
      role="patient"
      user={PATIENT_USER}
      basePath="/patient"
    >
      <div className="p-8 max-w-7xl mx-auto">
        {/* ── Greeting ─────────────────────────────────────────────────────── */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-[#181c20] mb-2">
              Good morning, Alex.
            </h1>
            <p className="text-lg text-[#3e4949] max-w-xl">
              You have an upcoming check-up in 2 days. Stay hydrated and track your symptoms.
            </p>
          </div>
          <button className="bg-gradient-to-br from-[#006161] to-[#007c7c] text-white px-6 py-4 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-95 font-semibold">
            <span className="material-symbols-outlined">add_circle</span>
            Add Medical Data
          </button>
        </section>

        {/* ── Bento grid ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Next appointment */}
          <div className="md:col-span-8 bg-white rounded-2xl p-8 shadow-[0_8px_32px_rgba(24,28,32,0.06)] relative overflow-hidden flex flex-col md:flex-row items-center gap-8 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#95f2f1]/20 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
            <div className="z-10 flex-1">
              <span className="inline-block bg-[#95f2f1] text-[#004f4f] px-3 py-1 rounded-full text-xs font-bold mb-4">
                NEXT VISIT
              </span>
              <h2 className="text-2xl font-bold text-[#181c20] mb-2">
                Annual Physical Examination
              </h2>
              <div className="flex items-center gap-4 text-[#3e4949] mb-6">
                {[
                  { icon: 'calendar_month', text: 'Oct 24, 2023' },
                  { icon: 'schedule',       text: '09:30 AM' },
                ].map(({ icon, text }) => (
                  <div key={icon} className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">{icon}</span>
                    <span className="text-sm">{text}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI-AokVX9_TLhQ14xOnetawOx9AZS64pRwq4LJZC1S7OaFIxTGMICKBdvz9qUXqMrbjgajkFUpa1E3VSDyVW8KKW1RkjJ8_oRv9-yWQyvtVFj4vh6YvJIn74evJr2Rt5b_pEpVmpxHB4R_2Bx3EKM3nZlrwRw9QuEbvkJI-9CWqDhBIRf54qciLIAWltDIV7fQNL7PkXFBGdJ1X2hP3eknCcdZoKVWmytfoE1aBTGzKlO2USakxXgoNwz7MpfgsiOZZCadPm1nz2TM"
                  alt="Dr. Sarah Chen"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <div>
                  <p className="font-semibold text-sm text-[#181c20]">Dr. Sarah Chen</p>
                  <p className="text-xs text-[#3e4949]">General Physician</p>
                </div>
              </div>
            </div>
            <div className="z-10 w-full md:w-auto">
              <button className="w-full bg-[#80a7fe] text-[#003a86] px-6 py-3 rounded-xl font-bold hover:brightness-105 transition-all">
                Prepare for Visit
              </button>
            </div>
          </div>

          {/* AI Symptom Checker CTA */}
          <div className="md:col-span-4 bg-gradient-to-br from-teal-800 to-teal-900 rounded-2xl p-8 text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-[12rem]">clinical_notes</span>
            </div>
            <div>
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                <span
                  className="material-symbols-outlined text-[#95f2f1]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  psychology
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2 leading-tight">AI Symptom Checker</h2>
              <p className="text-[#95f2f1]/80 text-sm mb-8 leading-relaxed">
                Not feeling well? Describe your symptoms to get instant care advice and triage levels.
              </p>
            </div>
            <button className="bg-white text-teal-900 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-teal-50 transition-colors">
              Check Symptoms
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          {/* Steps tile */}
          <HealthTile
            icon="directions_walk"
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
            label="Daily Steps"
            value="8,432"
            badgeText="+12%"
            badgeColor="text-green-600 bg-green-50"
            className="md:col-span-3"
          >
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full w-[84%] rounded-full" />
            </div>
          </HealthTile>

          {/* Sleep tile */}
          <HealthTile
            icon="bedtime"
            iconBg="bg-purple-50"
            iconColor="text-purple-600"
            label="Sleep Quality"
            value="6h 45m"
            badgeText="Fair"
            badgeColor="text-[#3e4949] bg-slate-50"
            className="md:col-span-3"
          >
            <div className="flex gap-1 items-end h-8">
              {[60, 40, 80, 100, 30].map((h, i) => (
                <div
                  key={i}
                  className={`w-full rounded-t-sm ${i === 3 ? 'bg-purple-500' : 'bg-slate-200'}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </HealthTile>

          {/* Active prescriptions */}
          <div className="md:col-span-6 bg-[#f1f4fa] rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#181c20]">Active Prescriptions</h2>
              <button
                type="button"
                onClick={() => console.log('Navigate to full prescriptions list')}
                className="text-teal-700 text-sm font-bold hover:underline bg-transparent cursor-pointer"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {PRESCRIPTIONS.map((rx) => (
                <PrescriptionCard key={rx.name} rx={rx} />
              ))}
            </div>
          </div>

          {/* Lab results */}
          <div className="md:col-span-12 bg-white rounded-2xl p-8 shadow-sm border border-[#bdc9c8]/15">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-bold text-[#181c20]">Recent Lab Results</h2>
                <p className="text-sm text-[#3e4949]">Your latest findings from Quest Diagnostics</p>
              </div>
              <button className="text-[#3e4949] p-2 hover:bg-slate-50 rounded-full">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {LAB_RESULTS.map((r) => (
                <LabResultCard key={r.name} result={r} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
