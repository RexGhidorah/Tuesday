export default function AdminSettings() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
      {/* Top Bar */}
      <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-white shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="font-display font-bold text-xl text-text-main">Instance Settings</h2>
          <span className="bg-success/10 text-success text-xs font-mono px-2 py-0.5 rounded-full border border-success/20">System Online</span>
        </div>
        <div className="flex gap-3">
          <button className="text-text-muted hover:text-text-main font-medium text-sm px-4 py-2 rounded-full hover:bg-surface transition-colors">Discard</button>
          <button className="bg-primary hover:bg-primary-hover text-white font-medium text-sm px-6 py-2 rounded-full shadow-lg shadow-primary/25 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">save</span>
            Save Changes
          </button>
        </div>
      </header>

      {/* Scrollable Settings Form */}
      <div className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto w-full">
        <div className="flex flex-col gap-12 pb-20">
          {/* Section 1: General Configuration */}
          <section className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <h3 className="font-display font-bold text-lg text-text-main mb-2">General Configuration</h3>
              <p className="text-text-muted text-sm leading-relaxed">Basic settings for your Tuesday instance. These are visible to all users on your server.</p>
            </div>
            <div className="col-span-8 bg-surface rounded-xl p-6 border border-border space-y-6">
              {/* Input Group */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-text-main">Instance Name</label>
                  <input type="text" className="w-full bg-white border border-border rounded-lg px-4 py-2.5 text-sm text-text-main focus:ring-0 placeholder:text-text-muted/50 focus:border-primary focus:shadow-[0_0_0_2px_rgba(89,78,230,0.1)] transition-all" defaultValue="Tuesday Corp HQ" />
                  <span className="text-xs text-text-muted">Displayed in the browser tab and emails.</span>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-text-main">Language</label>
                  <div className="relative">
                    <select className="w-full bg-white border border-border rounded-lg px-4 py-2.5 text-sm text-text-main appearance-none focus:ring-0 cursor-pointer focus:border-primary focus:shadow-[0_0_0_2px_rgba(89,78,230,0.1)] transition-all">
                      <option>English (US)</option>
                      <option>Spanish (ES)</option>
                      <option>French (FR)</option>
                      <option>German (DE)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-text-muted pointer-events-none text-xl">expand_more</span>
                  </div>
                </div>
              </div>
              {/* Input Group */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-main">Base URL</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-text-muted text-[20px]">link</span>
                  <input type="text" className="w-full bg-white border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm font-mono text-text-main focus:ring-0 focus:border-primary focus:shadow-[0_0_0_2px_rgba(89,78,230,0.1)] transition-all" defaultValue="https://tuesday.internal.corp" />
                </div>
                <span className="text-xs text-text-muted">The public-facing URL of your installation. Used for generating links.</span>
              </div>
              {/* Branding Upload */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-main">Organization Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white border border-border rounded-lg flex items-center justify-center">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMUItW1MlvVLU03YJKIe_6NLIAFmb7yU5diLJdwPVn0crO2mybxK3qyf9AnVA30-lRDXMpWgyLKq8M2pF8uVPoiSo3GpjQQo7sqbCvL91GMKAGpMXl2Rk-0s98pos12YENfkAc-tdgIEYcaS6ZlVB2qMhNQd0O_ff626leo3SRZo-Ho_FMO81RXg_uC9W8eWg713sXzOjwZipxq4kVVqg4-YMhNMp65j-aRukM3GHo7iPE1kS2rKP-c0um-M59k1b8MEgHnjrbyOIn" alt="Logo" className="w-10 h-10 object-contain" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <button className="px-4 py-1.5 bg-white border border-border text-text-main text-sm font-medium rounded-full hover:bg-surface transition-colors">Upload New</button>
                      <button className="px-4 py-1.5 text-error text-sm font-medium hover:bg-error/5 rounded-full transition-colors">Remove</button>
                    </div>
                    <p className="text-xs text-text-muted">Recommended size: 512x512px (PNG, SVG)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-border/60" />

          {/* Section 2: Security & Access */}
          <section className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <h3 className="font-display font-bold text-lg text-text-main mb-2">Security & Access</h3>
              <p className="text-text-muted text-sm leading-relaxed">Control how users access your Tuesday instance and manage session security policies.</p>
            </div>
            <div className="col-span-8 bg-surface rounded-xl p-6 border border-border space-y-6">
              {/* Toggle Item */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-text-main">Allow Public Signups</span>
                  <span className="text-xs text-text-muted">If enabled, anyone with the Base URL can create an account.</span>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle-signup" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 transition-all duration-200 ease-in-out peer checked:right-0 checked:border-primary" />
                  <label htmlFor="toggle-signup" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer transition-colors duration-200 ease-in-out peer-checked:bg-primary"></label>
                </div>
              </div>
              <hr className="border-border" />
              {/* Toggle Item */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-text-main">Enforce 2FA</span>
                  <span className="text-xs text-text-muted">Require Two-Factor Authentication for all Admin and Member roles.</span>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle-2fa" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-border transition-all duration-200 ease-in-out peer checked:right-0 checked:border-primary" />
                  <label htmlFor="toggle-2fa" className="toggle-label block overflow-hidden h-6 rounded-full bg-border cursor-pointer transition-colors duration-200 ease-in-out peer-checked:bg-primary"></label>
                </div>
              </div>
              <hr className="border-border" />
              {/* Input Group */}
              <div className="flex flex-col gap-2 max-w-xs">
                <label className="text-sm font-bold text-text-main">Session Timeout</label>
                <div className="relative flex items-center">
                  <input type="number" className="w-full bg-white border border-border rounded-lg px-4 py-2.5 text-sm font-mono text-text-main focus:ring-0 focus:border-primary focus:shadow-[0_0_0_2px_rgba(89,78,230,0.1)] transition-all" defaultValue="1440" />
                  <span className="absolute right-4 text-xs font-bold text-text-muted bg-surface px-2 py-0.5 rounded">Minutes</span>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-border/60" />

          {/* Section 3: Storage (S3) */}
          <section className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <h3 className="font-display font-bold text-lg text-text-main mb-2">Storage Configuration</h3>
              <p className="text-text-muted text-sm leading-relaxed">Configure external object storage for file uploads and attachments. Defaults to local disk if disabled.</p>
              <div className="mt-6 p-4 bg-info/5 rounded-lg border border-info/20">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-info text-sm mt-0.5">info</span>
                  <p className="text-xs text-text-muted">Using S3-compatible storage is recommended for instances with &gt;100 users.</p>
                </div>
              </div>
            </div>
            <div className="col-span-8 bg-surface rounded-xl p-6 border border-border space-y-6">
              {/* Toggle Item */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-text-main">Enable External Storage (S3)</span>
                  <span className="text-xs text-text-muted">Connect to AWS S3, MinIO, or DigitalOcean Spaces.</span>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle-s3" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-border transition-all duration-200 ease-in-out peer checked:right-0 checked:border-primary" />
                  <label htmlFor="toggle-s3" className="toggle-label block overflow-hidden h-6 rounded-full bg-border cursor-pointer transition-colors duration-200 ease-in-out peer-checked:bg-primary"></label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-text-main">Bucket Name</label>
                  <input type="text" className="w-full bg-white border border-border rounded-lg px-4 py-2.5 text-sm font-mono text-text-main focus:ring-0 focus:border-primary focus:shadow-[0_0_0_2px_rgba(89,78,230,0.1)] transition-all" defaultValue="tuesday-prod-uploads" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-text-main">Region</label>
                  <input type="text" className="w-full bg-white border border-border rounded-lg px-4 py-2.5 text-sm font-mono text-text-main focus:ring-0 focus:border-primary focus:shadow-[0_0_0_2px_rgba(89,78,230,0.1)] transition-all" defaultValue="us-east-1" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-main">Access Key ID</label>
                <input type="password" className="w-full bg-white border border-border rounded-lg px-4 py-2.5 text-sm font-mono text-text-main focus:ring-0 focus:border-primary focus:shadow-[0_0_0_2px_rgba(89,78,230,0.1)] transition-all" defaultValue="AKIAIOSFODNN7EXAMPLE" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-main">Secret Access Key</label>
                <input type="password" className="w-full bg-white border border-border rounded-lg px-4 py-2.5 text-sm font-mono text-text-main focus:ring-0 focus:border-primary focus:shadow-[0_0_0_2px_rgba(89,78,230,0.1)] transition-all" defaultValue="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY" />
              </div>
              {/* Connection Test */}
              <div className="flex justify-end pt-2">
                <button className="text-primary text-sm font-bold hover:bg-primary/5 px-4 py-2 rounded-full transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">wifi</span>
                  Test Connection
                </button>
              </div>
            </div>
          </section>

          {/* Advanced Danger Zone */}
          <section className="grid grid-cols-12 gap-8 mt-8">
            <div className="col-span-12">
              <div className="border border-error/30 bg-error/5 rounded-xl p-6 flex items-center justify-between">
                <div>
                  <h4 className="text-error font-bold text-lg font-display">Danger Zone</h4>
                  <p className="text-text-muted text-sm mt-1">Irreversible actions that affect the entire instance.</p>
                </div>
                <div className="flex gap-4">
                  <button className="px-5 py-2.5 bg-white border border-error/30 text-error font-medium rounded-full hover:bg-error hover:text-white transition-colors text-sm">Reset Database</button>
                  <button className="px-5 py-2.5 bg-error text-white font-medium rounded-full hover:bg-red-700 transition-colors shadow-lg shadow-error/20 text-sm">Shutdown Server</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
