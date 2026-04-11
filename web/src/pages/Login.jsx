import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Login
 *
 * Unified authentication screen with role-based tabs (Patient / Doctor / Admin).
 * Selecting a tab updates the hidden role field and the submit button label.
 * On submit the user is routed to the correct dashboard.
 *
 * No real auth is wired — replace `handleSubmit` with your auth provider call.
 */

const ROLES = ['patient', 'doctor', 'admin'];

const ROLE_ROUTES = {
  patient: '/patient',
  doctor:  '/doctor',
  admin:   '/admin',
};

// ── Sub-components ────────────────────────────────────────────────────────────

function RoleTab({ role, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(role)}
      className={`
        flex-1 py-3 px-4 rounded-lg text-sm transition-all
        ${isActive
          ? 'bg-white text-[#006161] font-bold shadow-sm'
          : 'text-[#3e4949] hover:text-[#181c20] font-semibold'}
      `}
    >
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </button>
  );
}

function InputField({ id, label, type = 'text', placeholder, rightSlot, icon }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-1">
        <label htmlFor={id} className="block text-sm font-semibold text-[#181c20]">
          {label}
        </label>
        {rightSlot}
      </div>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span
            className="material-symbols-outlined text-[#6e7979] group-focus-within:text-[#006161] transition-colors"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            {icon}
          </span>
        </div>
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          required
          className="
            block w-full pl-11 pr-4 py-3.5
            bg-[#f1f4fa] border-transparent
            focus:border-[#006161]/40 focus:ring-0
            rounded-xl text-[#181c20]
            placeholder:text-[#6e7979]/60
            transition-all text-sm
          "
        />
      </div>
    </div>
  );
}

function SocialButton({ provider, children, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(provider)}
      className="
        flex items-center justify-center gap-3 py-3 px-4
        bg-[#f1f4fa] hover:bg-[#ebeef4]
        transition-all rounded-xl font-semibold text-[#181c20] text-sm
        active:scale-95
      "
    >
      {children}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Login() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState('patient');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // Simulate network latency — replace with real auth call.
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    navigate(ROLE_ROUTES[activeRole]);
  }

  function handleSocialLogin(provider) {
    // Wire up OAuth redirect here.
    console.log(`OAuth: ${provider}`);
  }

  return (
    <div
      className="min-h-screen bg-[#f7f9ff] text-[#181c20] flex flex-col"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* ── Top nav bar ────────────────────────────────────────────────────── */}
      <header className="w-full h-16 px-8 flex items-center justify-between sticky top-0 z-40 bg-white/80 backdrop-blur-xl">
        <div className="text-xl font-bold tracking-tighter text-teal-800">
          Sanctuary Health
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-500 font-medium text-sm hidden sm:inline">
            Need help?
          </span>
          <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
            <span
              className="material-symbols-outlined text-slate-500"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              help_outline
            </span>
          </button>
        </div>
      </header>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-[#006161]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[30rem] h-[30rem] bg-[#80a7fe]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[480px] z-10">
          {/* Hero text */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#181c20] mb-3">
              Welcome Back
            </h1>
            <p className="text-[#3e4949] text-lg leading-relaxed">
              Secure access to your medical ecosystem.
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(24,28,32,0.06)] overflow-hidden border border-[#bdc9c8]/15">
            {/* Role tabs */}
            <div className="flex bg-[#f1f4fa] p-1.5 m-6 rounded-xl">
              {ROLES.map((role) => (
                <RoleTab
                  key={role}
                  role={role}
                  isActive={activeRole === role}
                  onClick={setActiveRole}
                />
              ))}
            </div>

            {/* Form */}
            <div className="px-8 pb-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <InputField
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="julian.vance@medical.org"
                  icon="mail"
                />
                <InputField
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="••••••••••••"
                  icon="lock"
                  rightSlot={
                    <button
                      type="button"
                      onClick={() => console.log('Forgot password — wire to reset flow')}
                      className="text-xs font-bold text-[#006161] hover:text-[#007c7c] transition-colors cursor-pointer"
                    >
                      Forgot?
                    </button>
                  }
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full py-4 font-bold rounded-xl text-white
                    bg-gradient-to-br from-[#006161] to-[#007c7c]
                    shadow-lg shadow-[#006161]/20
                    hover:shadow-xl hover:shadow-[#006161]/30
                    active:scale-[0.98] transition-all
                    flex justify-center items-center gap-2
                    disabled:opacity-70 disabled:cursor-not-allowed
                  "
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Authorizing...
                    </>
                  ) : (
                    <>
                      Sign in as {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#bdc9c8]/30" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-4 bg-white text-[#3e4949] font-medium">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social login */}
              <div className="grid grid-cols-2 gap-4">
                <SocialButton provider="Google" onClick={handleSocialLogin}>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8UnsKiBF9WBc1-kgCb8TIoij6AwlcIgdFez6WwRe75ANE9mMfFULewY3ruXAcTVC9x-cD-t29CY2TXLCDYrbAi9Y0dOPDkChFmJmoGWp4HRIJ1lyd3HrFIXk6iE2zAM7wXKlG2JmTCn2QBF7yRBmaTMEwdfnYMO1hy9cHykI6gdGKSE7JGe94_XiyxhTlNGRBC9A1UgrLwsDpQL34ZTsxBUNPxtyI9Zsn5thLW8D9x0I56HcDM_qtncoenueviaZ2kywbduYkd6PU"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Google
                </SocialButton>
                <SocialButton provider="GitHub" onClick={handleSocialLogin}>
                  <svg className="w-5 h-5 fill-[#181c20]" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  GitHub
                </SocialButton>
              </div>
            </div>

            {/* Card footer */}
            <div className="bg-[#ebeef4] py-4 text-center">
              <p className="text-sm text-[#3e4949]">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => console.log('Request Access — wire to registration flow')}
                  className="font-bold text-[#006161] hover:underline bg-transparent cursor-pointer p-0"
                >
                  Request Access
                </button>
              </p>
            </div>
          </div>

          {/* HIPAA badge + provider avatars */}
          <div className="mt-8 flex flex-col items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/50 backdrop-blur rounded-full border border-teal-100/50">
              <span
                className="material-symbols-outlined text-teal-600 text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified_user
              </span>
              <span className="text-xs font-bold tracking-widest text-teal-800 uppercase">
                HIPAA Compliant Secure System
              </span>
            </div>
            <div className="flex -space-x-3 items-center">
              {[
                'https://lh3.googleusercontent.com/aida-public/AB6AXuB8nk8v9t_4Pet9kvcZ1YdMEXdJiqsLHPzGNXxQ2KPpO82T72n6sLBT_7VeDZ7S2--D7N_QYNoiUtcNhGyE8BJj-0XP8SGketzNKes3D7ctm30yXWnpQfPa0b_Bxk6NSEcj3uA5HbfB6Np7sz-Xj9leyuBMSpWjicw8osuUabfXIgJbbYwq09f2ofwsWTquDdj0XSl66Or4F46COBB0oYsXk8nyb-CFeWpArzBgC3rLHYo2VnFw0vIRpOP4icL-egOERInnCp39nPdr',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAQJeQf7jph8EPLHzCkf2vqy1I-6Ggbn1UxQ17zaZfjNAGYvHV8NhfLKkyXG8yOC_p3XditOQWA50NFESkjTKITEr5r9EnO7esg31GvktN-gb__paIEPST8rGN_wuZIfGqVPOodye0jMYyhDCGgRZ3qMmgxcI04DNBzk6YqMno8UdXCx4G-wwPW8r11hWho-9XakHHWe1BHMuY4e6R_AGG_Zk2Ju_wfdiMku807RQJGVdrxsCVnPgnnngD3esk6UVsJVOFYhAEHKkMO',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuBrIkkrQuBGKd9iKs_w82PmEAy-AWBMzaWwUpGbSxh17oMQE0W5Oas-zUpVsTG8_x235R_AZqrztDlcB5aZgyiSfWAa1TC3MN5RZyfOZB8um2CuJbWBQ4sGT9z4HLRyJ0G-lM1la_ga2YvXm8bc34vVn1QrkREImd9ySDIfColrTd3-wM1QsPGELOxxWiLgtMman6UyiWK1gNA_OT1rbv-mdOCICZ3T2D5ZnxQb8pQ2-_yw3NtyOla-x2nKF0INr1niQoLCJ8xYgDD2',
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Provider"
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                />
              ))}
              <p className="pl-5 text-xs font-medium text-slate-500">
                Trusted by 12,000+ Providers
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="w-full py-8 px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
        <div className="flex items-center gap-6">
          {['Privacy Policy', 'Terms of Service', 'Data Processing Agreement'].map((link) => (
            <button
              key={link}
              type="button"
              onClick={() => console.log(`Navigate to ${link}`)}
              className="hover:text-teal-600 transition-colors bg-transparent cursor-pointer p-0 text-inherit"
            >
              {link}
            </button>
          ))}
        </div>
        <div>© 2024 Sanctuary Health Ecosystem. Globally Distributed Cloud.</div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">language</span>
          <select className="bg-transparent border-none p-0 text-xs font-medium focus:ring-0 cursor-pointer">
            <option>English (US)</option>
            <option>Español</option>
            <option>Français</option>
            <option>Deutsch</option>
          </select>
        </div>
      </footer>
    </div>
  );
}
