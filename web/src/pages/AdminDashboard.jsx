import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';

/**
 * AdminDashboard
 *
 * System overview page for the Admin role.
 * Sections: performance metric cards, user management table, system activity log,
 * network architecture card, and an "Add User" modal.
 */

// ── Static data (replace with API calls) ─────────────────────────────────────

const ADMIN_USER = {
  name: 'Dr. Julian Vance',
  title: 'Chief of Medicine',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCTdXzfLHW1tbgsyXyVjPR5SPhJycXhOTojVPkYp_OG1g3EVb8Xysc1ZukDHpvMidEq_f7RFcW7iYtIipZ9FBQVtUqGiKxhnXpKuglBmQPDm4XDkq9JzytQ7SlsEhHpi4a3pwIoiMKWbY0M11icHQTOystuQgw8LxoDFO5KgvN5KeFBPenyiJOGT6c1A3YI-5lFnchpkfRjzOFe2Bq_e2y-MNxhUBHjHXrgyI93PB81HCNKh5woLx_1MGJHbmzv_Nb87vWh-S-tfmCA',
};

const INITIAL_USERS = [
  {
    id: 1,
    name: 'Elena Rodriguez',
    email: 'elena.r@meditrack.com',
    role: 'Practitioner',
    status: 'Active',
    lastAccess: '2 mins ago',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAEfg8tMEEZirFXuCc9wvPkQq44hKfL1aIfd4Znz2itxQNWx2kNKCw7tX7AlcidwC86e0eo5WU7tGYjVTqOdwVuqVRCECM9SiMqobH8IKhgcOUIJHp1goI9rScwRGOErSt_X1pyxlAICCaMtJjsp5zXDx41ed-f-Y3WD0a8635ZO2keGQE5Eg0XfbpRO_oWFr9woohL-O0vgOF--Na3SygLqojpC0FLeZ0Cq4Imt8_e7qHTf-n8xCqlaQb7DjuEaXtU1HuDlVJttjk3',
  },
  {
    id: 2,
    name: 'Marcus Chen',
    email: 'm.chen@meditrack.com',
    role: 'Administrator',
    status: 'Active',
    lastAccess: '14 mins ago',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-EggO-KBGfCGzzY05CPbP7bTs90UHEhaMjZLxhfCC7Qb5FTzRFqBtn3ia6ir7063HKkjmyUhBX33pK1kvK0wRF45OreIy2H9rZV1A62SkZKVGw3W8rLSnH-nNd3hGWnoQ3MxyhfOw_KiO7V8xMJj1bYqVUUzSRcjWC9dUxMjvWjpQCxF_HQXiqB6viwevxqlfBg0KGzCbiNvtk6ayCkSIhbL1_Qw-E81Po2twTjlTU2Kp_aeZUGAihEbU_UCCfvVBGT1Smv-Y1et1',
  },
  {
    id: 3,
    name: 'Sarah Jenkins',
    email: 's.jenkins@meditrack.com',
    role: 'Support',
    status: 'Offline',
    lastAccess: '4 hours ago',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBxrEf5drSBpjlToU70hJpPg1lfKLawZrtKZaBynOHuO10LBHrUBu5IcFP22GMvkXIlo6kvB819LrMjIPOES7e58inFVadFpFuk1TkdXw6i2fuO4xjBqA_BGEOkWUceEIPPFmc1MSDc5P7i30EAqplvp6nAQ1Gl_iJhyqxfvRNX3GHPOpffS89_sXfT2YQs_DrWbNzO0Nt4u6haCJyG3Q40-Vvl9VqNxRVSjfn_swxbsdI8pMyHtLXjxYi_DCI2CPHUUSnRkVEBhtt9',
  },
];

const ACTIVITY_LOG = [
  {
    id: 1,
    icon: 'security',
    iconBg: 'bg-[#95f2f1]',
    iconColor: 'text-[#006161]',
    title: 'Firewall Policy Updated',
    desc: 'Global node cluster ingress reset.',
    time: '12:44 PM',
  },
  {
    id: 2,
    icon: 'database',
    iconBg: 'bg-[#ffdcc3]',
    iconColor: 'text-[#854600]',
    title: 'Automatic Backup Success',
    desc: 'Encrypted snapshot verified on Node-04.',
    time: '11:30 AM',
  },
  {
    id: 3,
    icon: 'sync',
    iconBg: 'bg-[#d9e2ff]',
    iconColor: 'text-[#305cae]',
    title: 'API Integration Sync',
    desc: 'External lab results synced with patient DB.',
    time: '09:15 AM',
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function UserRow({ user }) {
  return (
    <tr className="hover:bg-[#f1f4fa]/20 transition-colors group">
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden shrink-0">
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-bold text-sm text-[#181c20]">{user.name}</p>
            <p className="text-xs text-[#3e4949]">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-5">
        <StatusBadge status={user.role} />
      </td>
      <td className="px-6 py-5">
        <StatusBadge status={user.status} dot />
      </td>
      <td className="px-6 py-5">
        <p className="text-xs text-[#3e4949]">{user.lastAccess}</p>
      </td>
      <td className="px-6 py-5 text-right">
        <button className="material-symbols-outlined text-[#6e7979] group-hover:text-[#006161] transition-colors">
          more_vert
        </button>
      </td>
    </tr>
  );
}

function AddUserModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: '', email: '', role: 'Practitioner' });

  function handleSave() {
    if (!form.name || !form.email) return;
    onSave(form);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in fade-in slide-in-from-bottom-4 duration-200">
        <h3 className="text-2xl font-bold mb-6 text-[#181c20]">Add New User</h3>
        <div className="space-y-4">
          {[
            { label: 'Full Name', field: 'name', type: 'text', placeholder: 'e.g. David Wilson' },
            { label: 'Email Address', field: 'email', type: 'email', placeholder: 'd.wilson@meditrack.com' },
          ].map(({ label, field, type, placeholder }) => (
            <div key={field}>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">{label}</label>
              <input
                type={type}
                placeholder={placeholder}
                value={form[field]}
                onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                className="w-full p-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-[#006161]/50 text-sm"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">System Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              className="w-full p-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-[#006161]/50 text-sm"
            >
              <option>Practitioner</option>
              <option>Administrator</option>
              <option>Support</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 bg-[#006161] text-white font-bold rounded-xl hover:shadow-lg transition-all active:scale-95"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [showModal, setShowModal] = useState(false);

  function handleAddUser(form) {
    setUsers((prev) => [
      { id: Date.now(), ...form, status: 'Active', lastAccess: 'Just added', avatarUrl: '' },
      ...prev,
    ]);
  }

  return (
    <DashboardLayout
      role="admin"
      user={ADMIN_USER}
      basePath="/admin"
    >
      <div className="px-8 pt-8 pb-12 max-w-7xl mx-auto">
        {/* ── Page header ──────────────────────────────────────────────────── */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#181c20] mb-2">
              System Overview
            </h2>
            <p className="text-[#3e4949]">
              Real-time health and performance metrics for the MediTrack network.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#ffdcc3] text-[#2f1500] rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#a95b00] animate-pulse" />
            Admin Mode
          </div>
        </div>

        {/* ── Metric cards ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            label="System Uptime"
            value="99.98%"
            icon="dns"
            variant="primary"
            trend="+0.02%"
          />
          <StatCard
            label="Total Network Users"
            value="14,802"
            icon="group"
            variant="secondary"
            trendLabel="Active"
            subtitle="+42 new today"
          />
          <StatCard
            label="Active Appointments"
            value="382"
            icon="calendar_today"
            variant="tertiary"
            trendLabel="In Session"
            barValue={75}
            barLabel="75% High Load"
          />
        </div>

        {/* ── Main grid: user table + activity ─────────────────────────────── */}
        <div className="grid grid-cols-12 gap-6">
          {/* User management table */}
          <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl shadow-[0_8px_32px_rgba(24,28,32,0.06)] overflow-hidden">
            <div className="p-6 flex justify-between items-center border-b border-[#ebeef4]">
              <div>
                <h4 className="text-xl font-bold text-[#181c20]">User Management</h4>
                <p className="text-sm text-[#3e4949]">Review and manage system access levels.</p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="
                  bg-[#80a7fe] text-[#003a86] px-5 py-2.5 rounded-xl
                  font-bold text-sm flex items-center gap-2
                  hover:shadow-lg active:scale-95 transition-all
                "
              >
                <span className="material-symbols-outlined text-lg">person_add</span>
                Add User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#f1f4fa]/30 text-[#3e4949] text-[11px] uppercase tracking-widest font-bold">
                  <tr>
                    {['Identity', 'Role', 'Status', 'Last Access', ''].map((h) => (
                      <th key={h} className="px-6 py-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f4fa]">
                  {users.map((u) => (
                    <UserRow key={u.id} user={u} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System activity + infrastructure card */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            {/* Activity log */}
            <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(24,28,32,0.06)] p-6 flex-1">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-bold text-[#181c20]">System Activity</h4>
                <span className="flex items-center gap-1 text-[10px] font-bold text-[#006161] uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-[#006161] rounded-full animate-ping" />
                  Live
                </span>
              </div>
              <div className="space-y-6">
                {ACTIVITY_LOG.map((item, idx) => (
                  <div key={item.id} className="flex gap-4 relative">
                    {idx < ACTIVITY_LOG.length - 1 && (
                      <div className="absolute left-4 top-10 bottom-0 w-px bg-[#ebeef4]" />
                    )}
                    <div className={`w-8 h-8 rounded-full ${item.iconBg} flex items-center justify-center shrink-0 z-10`}>
                      <span className={`material-symbols-outlined text-sm ${item.iconColor}`}>
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#181c20]">{item.title}</p>
                      <p className="text-xs text-[#3e4949] mb-1">{item.desc}</p>
                      <p className="text-[10px] font-medium text-[#6e7979]">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 text-sm font-bold text-[#006161] hover:bg-[#006161]/5 transition-colors rounded-xl border border-dashed border-[#bdc9c8]">
                View Audit Log
              </button>
            </div>

            {/* Infrastructure card */}
            <div className="bg-[#2d3135] rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-[#ffb77d]">architecture</span>
                  <h4 className="text-sm font-bold uppercase tracking-widest">Network Architecture</h4>
                </div>
                <h3 className="text-xl font-bold mb-2">Centralized Hybrid Node</h3>
                <p className="text-sm text-[#d7dae0] leading-relaxed mb-6">
                  Your infrastructure is operating on 12 regional clusters with low latency protocols active.
                </p>
                <div className="flex items-center justify-between bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#a95b00] flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm text-white">hub</span>
                    </div>
                    <span className="text-xs font-bold">Load Balancer: Optimizing</span>
                  </div>
                  <span className="material-symbols-outlined text-green-400">check_circle</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Add user modal ──────────────────────────────────────────────────── */}
      {showModal && (
        <AddUserModal onClose={() => setShowModal(false)} onSave={handleAddUser} />
      )}

      {/* ── FAB ────────────────────────────────────────────────────────────── */}
      <button className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-br from-[#854600] to-[#a95b00] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all group">
        <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform">
          add_moderator
        </span>
      </button>
    </DashboardLayout>
  );
}
