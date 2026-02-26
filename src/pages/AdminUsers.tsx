export default function AdminUsers() {
  return (
    <div className="flex-1 flex flex-col h-full bg-background-light overflow-hidden relative">
      {/* Top Header Area */}
      <div className="px-8 py-8 flex flex-col gap-6 flex-shrink-0 z-10 bg-background-light">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex flex-col gap-2 max-w-2xl">
            <h1 className="font-display text-3xl font-bold tracking-tight text-text-main">Team Members</h1>
            <p className="text-text-muted text-base leading-relaxed">Manage who has access to this instance. Invite new members, assign roles, or audit activity logs.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="group flex items-center justify-center gap-2 h-10 px-5 rounded-full border border-border bg-white text-text-main text-sm font-bold hover:bg-surface hover:border-gray-300 transition-all shadow-sm">
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Export CSV</span>
            </button>
            <button className="group flex items-center justify-center gap-2 h-10 px-6 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20 transition-all shadow-md">
              <span className="material-symbols-outlined text-[20px] group-hover:rotate-90 transition-transform">add</span>
              <span>Invite New Users</span>
            </button>
          </div>
        </div>
        {/* Filters & Search Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-80 group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </span>
              <input type="text" placeholder="Search by name or email..." className="w-full h-10 pl-10 pr-4 rounded-full bg-surface border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm placeholder:text-text-muted/70 font-medium text-text-main" />
            </div>
            <div className="relative hidden sm:block">
              <button className="flex items-center gap-2 h-10 px-4 rounded-full bg-surface border border-transparent hover:bg-gray-200/70 text-sm font-medium text-text-main transition-colors">
                <span className="material-symbols-outlined text-[18px] text-text-muted">filter_list</span>
                <span>All Roles</span>
                <span className="material-symbols-outlined text-[18px] text-text-muted">expand_more</span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-muted font-medium">
            <span>Showing <span className="text-text-main font-bold">24</span> active users</span>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-auto custom-scrollbar px-8 pb-8">
        <div className="min-w-[800px] border border-border rounded-xl overflow-hidden bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-border text-xs uppercase tracking-wider text-text-muted font-bold font-display">
                <th className="px-6 py-4 w-[40%]">User</th>
                <th className="px-6 py-4 w-[15%]">Role</th>
                <th className="px-6 py-4 w-[15%]">Status</th>
                <th className="px-6 py-4 w-[20%]">Last Active</th>
                <th className="px-6 py-4 w-[10%] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {/* Row 1 */}
              <tr className="group hover:bg-surface/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-cover bg-center border border-gray-100 shadow-sm" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuARmlZ6vOwRPddvZlCuqA8fgZDxdw7lpx2cFrVx1WGR8ln8mRbPRpeBW0X7TRgzNiG3buuxarCHZ9A0qcsUiD726dSM88UGeph5HvYB83H0LsEH4hRTOYYS-UmozwVGLutiTL6uo33E2ebr9maEeCkGRhk9HtY9aaCe0rCLOE9sZeFhHwhvAe9-Nx7bpI0MsUciQICXI0Azc92uW0WWVz28widcgMA9jIiAJkkmcnQCGzZAG1EmJ6Z7ys8e3kcbCWmxTI8v31pe_QHS')"}}></div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-text-main">Sarah Jenkins</span>
                      <span className="text-xs text-text-muted font-medium">sarah@tuesday.com</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer">
                    <span>Admin</span>
                    <span className="material-symbols-outlined text-[14px]">expand_more</span>
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-success/20 bg-success/5">
                    <span className="size-2 rounded-full bg-success animate-pulse"></span>
                    <span className="text-xs font-bold text-success/90">Active</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-xs text-text-main bg-surface px-2 py-1 rounded">2023-10-24 14:30</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-text-muted hover:text-text-main p-1.5 rounded-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="group hover:bg-surface/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-cover bg-center border border-gray-100 shadow-sm" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3iYpG0vikyW2IwBG-JhjgSB-mNMnMCUNRh8NZ4rel28zUmk-Cg4Uqkslb6NqmJzT6cWHsdh4UwafCT5BPRiZXMRbhHSk2brI9N37uqaCEUqlBFuc6k2NElKql9X4To5d3Og-XXZq6ky4S2W3SREPODOP51PsHzEWTTdLbgZkUbL0LhZG90Mx1639fIu7fz7QwW-yspMDoDOwRmZoW7HskWmy4ZqAekMemzPIqV9m6_35FWz2h5EXjNpV_sQ75a9Gwriu1qFLaZ-Hg')"}}></div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-text-main">David Miller</span>
                      <span className="text-xs text-text-muted font-medium">david.m@designco.agency</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-text-main bg-surface hover:bg-gray-200 transition-colors cursor-pointer">
                    <span>Member</span>
                    <span className="material-symbols-outlined text-[14px] text-text-muted">expand_more</span>
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-success/20 bg-success/5">
                    <span className="size-2 rounded-full bg-success"></span>
                    <span className="text-xs font-bold text-success/90">Active</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-xs text-text-main bg-surface px-2 py-1 rounded">Just now</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-text-muted hover:text-text-main p-1.5 rounded-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="group hover:bg-surface/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-purple-400 to-pink-400 text-white font-bold text-sm shadow-sm">ES</div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-text-main">Elena Santos</span>
                      <span className="text-xs text-text-muted font-medium">elena@freelance.io</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-text-main bg-surface hover:bg-gray-200 transition-colors cursor-pointer">
                    <span>Viewer</span>
                    <span className="material-symbols-outlined text-[14px] text-text-muted">expand_more</span>
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-status/30 bg-neutral-status/10">
                    <span className="size-2 rounded-full bg-neutral-status"></span>
                    <span className="text-xs font-bold text-neutral-status">Suspended</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-xs text-text-muted">2023-11-01 09:12</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-text-muted hover:text-text-main p-1.5 rounded-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="group hover:bg-surface/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-cover bg-center border border-gray-100 shadow-sm" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAIJYI-EGuNMprpOcOzxIUe8BTU_aAnkBWVJ9PmSypHjOdrP6Dv2ns8-FH9UEf607VGOvqCj5s_GJaGjPFLJhZvoxmwO-Mj1DgiUYgIYHGsBOtnuJZJHFGVmcM58A7uaCkXak72TpiHoZKa7WvWINjs3nW6uyrkZm5olcgPSIjkvKobTUP-mPTug8ISMd9gHCqtYFLSbNqM77niGfu5XOW1iBLfC5Q7ndT20yLM-QnDsrwlh3olm5S-xEK5oMmI5z_S7Mf98vFIvUiV')"}}></div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-text-main">Marcus Johnson</span>
                      <span className="text-xs text-text-muted font-medium">marcus@tuesday.com</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-text-main bg-surface hover:bg-gray-200 transition-colors cursor-pointer">
                    <span>Member</span>
                    <span className="material-symbols-outlined text-[14px] text-text-muted">expand_more</span>
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-success/20 bg-success/5">
                    <span className="size-2 rounded-full bg-success"></span>
                    <span className="text-xs font-bold text-success/90">Active</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-xs text-text-main bg-surface px-2 py-1 rounded">2023-10-23 16:45</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-text-muted hover:text-text-main p-1.5 rounded-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </td>
              </tr>
              {/* Row 5 */}
              <tr className="group hover:bg-surface/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full flex items-center justify-center bg-info text-white font-bold text-sm shadow-sm">AI</div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-text-main">Alice Inez</span>
                      <span className="text-xs text-text-muted font-medium">alice@studio.design</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-text-main bg-surface hover:bg-gray-200 transition-colors cursor-pointer">
                    <span>Viewer</span>
                    <span className="material-symbols-outlined text-[14px] text-text-muted">expand_more</span>
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-warning/30 bg-warning/10">
                    <span className="size-2 rounded-full bg-warning"></span>
                    <span className="text-xs font-bold text-warning-700">Pending</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-xs text-text-muted">-</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-text-muted hover:text-text-main p-1.5 rounded-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          {/* Pagination Footer */}
          <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-border">
            <span className="text-xs text-text-muted font-medium">Showing 1-5 of 24 users</span>
            <div className="flex gap-2">
              <button className="flex items-center justify-center size-8 rounded-full border border-border text-text-muted hover:text-text-main hover:bg-surface transition-colors disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              <button className="flex items-center justify-center size-8 rounded-full border border-border text-text-muted hover:text-text-main hover:bg-surface transition-colors">
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
