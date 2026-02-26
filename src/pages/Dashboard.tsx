export default function Dashboard() {
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-10">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-10">
        {/* Greeting & Header */}
        <section className="flex flex-col gap-1">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-text-main">Good morning, Alex</h1>
          <p className="text-text-muted text-lg font-body flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            Today is Tuesday, Oct 24
          </p>
        </section>

        {/* Project Shortcuts (Horizontal Scroll) */}
        <section className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted font-display">Favorite Projects</h3>
            <button className="text-primary text-sm font-medium hover:underline">View all</button>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
            {/* Shortcut 1 */}
            <div className="bg-white border border-border rounded-2xl shadow-sm hover:shadow-float transition-all p-4 flex flex-col justify-between h-[120px] min-w-[240px] cursor-pointer group">
              <div className="flex justify-between items-start">
                <div className="size-8 rounded-lg bg-[#594EE6]/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">rocket_launch</span>
                </div>
                <span className="material-symbols-outlined text-text-muted group-hover:text-primary text-[20px]">arrow_outward</span>
              </div>
              <div>
                <h4 className="font-bold text-text-main mb-2">Q4 Marketing</h4>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-success w-[75%] rounded-full"></div>
                  </div>
                  <span className="text-xs font-mono text-text-muted">75%</span>
                </div>
              </div>
            </div>
            {/* Shortcut 2 */}
            <div className="bg-white border border-border rounded-2xl shadow-sm hover:shadow-float transition-all p-4 flex flex-col justify-between h-[120px] min-w-[240px] cursor-pointer group">
              <div className="flex justify-between items-start">
                <div className="size-8 rounded-lg bg-[#FDAB3D]/10 flex items-center justify-center text-warning">
                  <span className="material-symbols-outlined">smartphone</span>
                </div>
                <span className="material-symbols-outlined text-text-muted group-hover:text-primary text-[20px]">arrow_outward</span>
              </div>
              <div>
                <h4 className="font-bold text-text-main mb-2">Mobile App Refactor</h4>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-warning w-[30%] rounded-full"></div>
                  </div>
                  <span className="text-xs font-mono text-text-muted">30%</span>
                </div>
              </div>
            </div>
            {/* Shortcut 3 */}
            <div className="bg-white border border-border rounded-2xl shadow-sm hover:shadow-float transition-all p-4 flex flex-col justify-between h-[120px] min-w-[240px] cursor-pointer group">
              <div className="flex justify-between items-start">
                <div className="size-8 rounded-lg bg-[#E2445C]/10 flex items-center justify-center text-error">
                  <span className="material-symbols-outlined">bug_report</span>
                </div>
                <span className="material-symbols-outlined text-text-muted group-hover:text-primary text-[20px]">arrow_outward</span>
              </div>
              <div>
                <h4 className="font-bold text-text-main mb-2">Bug Squash Sprint</h4>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-error w-[15%] rounded-full"></div>
                  </div>
                  <span className="text-xs font-mono text-text-muted">15%</span>
                </div>
              </div>
            </div>
            {/* Shortcut 4 */}
            <div className="bg-white border border-border rounded-2xl shadow-sm hover:shadow-float transition-all p-4 flex flex-col justify-between h-[120px] min-w-[240px] cursor-pointer group">
              <div className="flex justify-between items-start">
                <div className="size-8 rounded-lg bg-[#579BFC]/10 flex items-center justify-center text-info">
                  <span className="material-symbols-outlined">palette</span>
                </div>
                <span className="material-symbols-outlined text-text-muted group-hover:text-primary text-[20px]">arrow_outward</span>
              </div>
              <div>
                <h4 className="font-bold text-text-main mb-2">Design System</h4>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-info w-[92%] rounded-full"></div>
                  </div>
                  <span className="text-xs font-mono text-text-muted">92%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: My Work (66%) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white border border-border rounded-2xl shadow-sm p-0 flex flex-col overflow-hidden h-full">
              {/* Card Header & Tabs */}
              <div className="px-6 pt-6 pb-0 border-b border-border bg-white sticky top-0 z-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-display font-bold text-text-main">My Work</h3>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-surface rounded-full text-text-muted hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">filter_list</span>
                    </button>
                    <button className="p-2 hover:bg-surface rounded-full text-text-muted hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                  </div>
                </div>
                <div className="flex gap-8">
                  <button className="pb-3 text-sm font-medium text-text-muted hover:text-text-main transition-colors relative">
                    Overdue
                    <span className="ml-1.5 bg-error/10 text-error px-1.5 py-0.5 rounded text-xs font-bold">2</span>
                  </button>
                  <button className="pb-3 text-sm font-medium text-primary border-b-2 border-primary transition-colors relative">
                    Today
                    <span className="ml-1.5 bg-primary/10 text-primary px-1.5 py-0.5 rounded text-xs font-bold">5</span>
                  </button>
                  <button className="pb-3 text-sm font-medium text-text-muted hover:text-text-main transition-colors">
                    Upcoming
                  </button>
                  <button className="pb-3 text-sm font-medium text-text-muted hover:text-text-main transition-colors">
                    Done
                  </button>
                </div>
              </div>
              {/* Task List */}
              <div className="flex-1 flex flex-col">
                {/* Group: Today */}
                <div className="px-6 py-4 bg-surface/30">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">wb_sunny</span> Today
                  </h4>
                </div>
                {/* Task Item 1 */}
                <div className="group flex items-center gap-4 px-6 py-3 border-b border-border/50 hover:bg-surface/50 transition-colors cursor-pointer">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="custom-checkbox rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                  </label>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-text-main font-medium truncate group-hover:text-primary transition-colors">Finalize Q3 Financial Report</span>
                      <span className="material-symbols-outlined text-text-muted text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="bg-[#594EE6]/10 text-primary px-2 py-0.5 rounded-full font-medium">Finance</span>
                      <span className="text-text-muted">#FIN-204</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <div className="size-6 rounded-full ring-2 ring-white bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAgKg-_uOV0HwvJmED192NQ_jDsOETXJVHP4PTYxOVD2qUCZxjUzrUUYGUuB6cYCwzjd31sHeoXRL3pl28uw3aV6T8UvruraX8M3wP8Znwb9DnxLJv49hGtg14y2vN4Ytohzdwm0Szg291xE4OaD-ndBatzkpTT7BruI9eDciqIy3Z6_hZ5RrRx1lLL7HXe8Pn5ZGkimPf5keEa2hZAd1FTjtGXIB241oCPhu_c3cHEXMhw84OL4_W4X3scsGS5rNziTd5K3golXw2F')"}}></div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-error/10 text-error px-2 py-1 rounded-md">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                      <span className="text-xs font-mono font-bold">Today</span>
                    </div>
                  </div>
                </div>
                {/* Task Item 2 */}
                <div className="group flex items-center gap-4 px-6 py-3 border-b border-border/50 hover:bg-surface/50 transition-colors cursor-pointer">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="custom-checkbox rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                  </label>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-text-main font-medium truncate group-hover:text-primary transition-colors">Review PR #402: Auth Flow</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="bg-[#579BFC]/10 text-info px-2 py-0.5 rounded-full font-medium">Dev Ops</span>
                      <span className="text-text-muted">#DEV-892</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <div className="size-6 rounded-full ring-2 ring-white bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBeXEVClaFsGnK3EdrgUzNDiqaXM4bYsJOPouTDkL9PuLVvMYh9bC-P89_wHcmvdLSNFhF1MbHb2zS9X3Iuh6AUeV1ZOJnzHE1hGj0NOcuQW5z9_VDQQgokP3inkXJ4U69QQ1mIuD1i35G8TlEBWieG4yuacMS25Agz6sziXeyCSDGI_jrRVrQZzte-MqBs5Q44srB_6-ZUuTqDGkybx1uJ6J0Xbq-UAzsvtEqtnkslbNhEaiky_gBIG1LW9Dvs-f3BNTxKdkxkqYUg')"}}></div>
                      <div className="size-6 rounded-full ring-2 ring-white bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCx4_twENLEX83vdaQjkmDQi50Avk4W4vaLQIRmeUTi6lC-gJ9kWhppM859d-ChzqfElfSO31O3Bboi5ClplRuwnoH7EgiyCiP6BWgj8A6j2JK7LNbWX0VT94IYdkC_Msw-9cSj447SP7hQPEjp9GjlQV0A2UoYAkpnov_gMDuR0E15j9u1NVFXMk6mcNbKu7lu7ij2spPDsB-FCIeJRaPqBRgPt9yt8oLKbuUIjmfKSN_wD1czggsgHVSY61uRhFyQeWW-hYshVR_3')"}}></div>
                    </div>
                    <div className="flex items-center gap-1.5 text-text-muted px-2 py-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      <span className="text-xs font-mono">2:00 PM</span>
                    </div>
                  </div>
                </div>
                {/* Task Item 3 */}
                <div className="group flex items-center gap-4 px-6 py-3 border-b border-border/50 hover:bg-surface/50 transition-colors cursor-pointer">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="custom-checkbox rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                  </label>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-text-main font-medium truncate group-hover:text-primary transition-colors">Client kickoff call preparation</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="bg-[#00C875]/10 text-success px-2 py-0.5 rounded-full font-medium">Sales</span>
                      <span className="text-text-muted">#SLS-101</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <div className="size-6 rounded-full ring-2 ring-white bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCKKKlEziqYq-XSQSnKe8vm8AIzCguIgjDKrknZSLo07YYhCL_T-YTFeceq-LJxs4BpkjU3qVNeRzAepDSM9QABKJz9q1Nog2ggkAE6WjnqZZ8h-UkYo1hZrg3QI9Wi07FBKUbSoMh4fndpfugw2ZMjBsRcOzVMc8biiRs9OU7G86BYGhbetyaM5TVAxzu0CHYF2nJT_ORqdqh2RNKv-JmUSRm_ckvYR5wKeXHH7ygAoZezPn4hyAFSV2B5XBWUYQntXX1mROoX0orG')"}}></div>
                    </div>
                    <div className="flex items-center gap-1.5 text-text-muted px-2 py-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      <span className="text-xs font-mono">4:30 PM</span>
                    </div>
                  </div>
                </div>
                {/* Group: Overdue */}
                <div className="px-6 py-4 bg-surface/30 mt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-error flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">warning</span> Overdue
                  </h4>
                </div>
                {/* Task Item 4 */}
                <div className="group flex items-center gap-4 px-6 py-3 border-b border-border/50 hover:bg-surface/50 transition-colors cursor-pointer bg-error/5">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="custom-checkbox rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                  </label>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-text-main font-medium truncate group-hover:text-primary transition-colors">Update Homepage Hero Assets</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="bg-[#FDAB3D]/10 text-warning px-2 py-0.5 rounded-full font-medium">Design</span>
                      <span className="text-text-muted">#DES-442</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <div className="size-6 rounded-full ring-2 ring-white bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBwA6OsBdidW0f2WnC40A5EmhluvIsASaJhEwTFLRoAZq77il3EZBWwsUQwCA5lfWk0DGWG-a-ajj6LiQw4O9Amoz7aeEKokAvwhSSrpUtFWCmdK1SbgPYBZ6GNXsedL3FyLh150EoRrRC9uOc72DRLL0-o-W_2KH-TU4X_eEmApFYS-9UhvHSdVXoaV9q4so2n3xB24vgPTNdYp2LY11C90AvZFTb5xbhhQGHp2SSBhlrgetcs6VgLtz1zDrMVKLvItM_4CBCbykoy')"}}></div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-error text-white px-2 py-1 rounded-md shadow-sm">
                      <span className="material-symbols-outlined text-[14px]">event_busy</span>
                      <span className="text-xs font-mono font-bold">Yesterday</span>
                    </div>
                  </div>
                </div>
                {/* Task Item 5 */}
                <div className="group flex items-center gap-4 px-6 py-3 border-b border-border/50 hover:bg-surface/50 transition-colors cursor-pointer bg-error/5">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="custom-checkbox rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                  </label>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-text-main font-medium truncate group-hover:text-primary transition-colors">Approve Copy for Landing Page</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="bg-[#594EE6]/10 text-primary px-2 py-0.5 rounded-full font-medium">Marketing</span>
                      <span className="text-text-muted">#MKT-102</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <div className="size-6 rounded-full ring-2 ring-white bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrn5oPEAuvUGJmq6r2WFdJ_Q-aU2o0NyS-gVWF9PIyCOlqZqBZzQ5TBt8pbCHkvFUoFDLRiXLS6CLk6UbjhOQTZ_HBVcW-wtx_T8gPv4_pCfIrN1Zyf_K9hR95Ud9Yo95R9thSuAPMd58oa3QRGKz4pcEQDwJXk5MoJxCNKAE3gwkj7ppKQ0BVjZd6LtW0ZMGwmU7OsA5IQNYhEGuXPPQ4qRch3LL6st5v5ahOehBFyKWh19ail3g5t-5hwqV9KA3oxNFk2rEK6HZB')"}}></div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-error text-white px-2 py-1 rounded-md shadow-sm">
                      <span className="material-symbols-outlined text-[14px]">event_busy</span>
                      <span className="text-xs font-mono font-bold">Oct 21</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Footer */}
              <div className="p-4 border-t border-border bg-surface/30">
                <button className="w-full py-2 flex items-center justify-center gap-2 text-primary font-bold text-sm hover:bg-primary/5 rounded-lg transition-colors">
                  <span className="material-symbols-outlined">add</span>
                  Add new task
                </button>
              </div>
            </div>
          </div>
          {/* Right Column: Inbox (33%) */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-border rounded-2xl shadow-sm flex flex-col h-full overflow-hidden">
              <div className="px-6 py-5 border-b border-border flex justify-between items-center bg-white">
                <h3 className="text-xl font-display font-bold text-text-main">Inbox</h3>
                <div className="flex gap-2">
                  <button className="text-xs font-bold uppercase text-primary hover:underline">Mark all read</button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {/* Notification Item 1 */}
                <div className="p-3 rounded-xl bg-surface/50 hover:bg-surface border border-transparent hover:border-border/50 transition-all cursor-pointer relative group">
                  <div className="absolute top-3 right-3 size-2 bg-primary rounded-full"></div>
                  <div className="flex gap-3">
                    <div className="relative shrink-0">
                      <div className="size-10 rounded-full bg-cover bg-center shadow-sm" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_Wu62DEAYxxiVwwdsAkrOxzQ8AeKES0YzG6xZeOdExFkSfWwAmyLIetiuRsf_c5-robJ4O1xthps1B17fjCgQCgFyzce1KUNqLbP5vHSUuel9xrOTmdH7xTrTQ7C1om7UdmHU06V1REAvEO6x9mBzMbjMX8Qct_LAfkJVNU6S_kcfsfmgMkVzO36_BFKTVc26iJ7mtbjfng_kw-eNc5cEC_9A0bSSoyIJUOy9Y8OiSz8gHs4HWwYJm4VDttNN1JnwHZFnhg7tN7_E')"}}></div>
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                        <div className="bg-primary rounded-full p-0.5 text-white">
                          <span className="material-symbols-outlined text-[10px] block">alternate_email</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-text-main leading-snug">
                        <span className="font-bold">Sarah K.</span> mentioned you in <span className="font-medium text-primary hover:underline">API Migration</span>
                      </p>
                      <p className="text-xs text-text-muted font-mono">2m ago</p>
                      <div className="mt-1 p-2 bg-white rounded border border-border/50 text-xs text-text-muted italic">
                        "Hey Alex, can you review the endpoints for the auth service?"
                      </div>
                    </div>
                  </div>
                </div>
                {/* Notification Item 2 */}
                <div className="p-3 rounded-xl hover:bg-surface border border-transparent hover:border-border/50 transition-all cursor-pointer group">
                  <div className="flex gap-3">
                    <div className="relative shrink-0">
                      <div className="size-10 rounded-full bg-cover bg-center shadow-sm" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFVlkz7KNgT8_dQ-1novyqroy67rBTrBSueMSuX37-vyZCsHVIyZP8G9xiMXw39v1ZL8oju_RnUON4alKPzI6jA4Jgz0OwR2GM3TQOKrOvnCrgW8T4dEEDP-Fwe5e8xNKvn8Fu82nvxnN4Nh3E-KK0KKxiou9QaTWjvkTSgzeNhGk3xHmJVhhURd4V6UiQq_6kXD8GNGnOx6pWVnNzfCjGRI7vo8zE-noJH6kvf0yGcQzYPHTJyp1tFNQHTzdr9LqKVODpsX0ZFndB')"}}></div>
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                        <div className="bg-error rounded-full p-0.5 text-white">
                          <span className="material-symbols-outlined text-[10px] block">priority_high</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-text-main leading-snug">
                        <span className="font-bold">Mike R.</span> changed status to <span className="bg-error text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold uppercase">Stuck</span> on <span className="font-medium text-primary hover:underline">Homepage Hero</span>
                      </p>
                      <p className="text-xs text-text-muted font-mono">45m ago</p>
                    </div>
                  </div>
                </div>
                {/* Notification Item 3 */}
                <div className="p-3 rounded-xl hover:bg-surface border border-transparent hover:border-border/50 transition-all cursor-pointer group">
                  <div className="flex gap-3">
                    <div className="relative shrink-0">
                      <div className="size-10 rounded-full bg-cover bg-center shadow-sm" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAnrVpyuZjzpoQRbLsQQLGZF--J1JmyzRiTytE4YxHzScLMmjDiMQ_Mwyil3Oh-Xm4HisawX0RbA4uZ0QsAU-UiildHmRLzmGJQ8ZtKzLK1QSd5cyihiKKX7qHF2xDDFdS2vpAGSdrLTBKQYSGR4yPeKzpSWb9esTYwCIE1dgTJw6HYHlo5yIQv-kabms96WtaNjo8Y72Do4lo_jxEXCITqMFSUNL_8E--1YSpjZlcBR_IwvOmY7qSQ9t5jJuqVgW_GCLabRQANajGV')"}}></div>
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                        <div className="bg-success rounded-full p-0.5 text-white">
                          <span className="material-symbols-outlined text-[10px] block">check</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-text-main leading-snug">
                        <span className="font-bold">David L.</span> completed <span className="font-medium text-primary hover:underline">Q3 Analytics Setup</span>
                      </p>
                      <p className="text-xs text-text-muted font-mono">2h ago</p>
                    </div>
                  </div>
                </div>
                {/* Notification Item 4 */}
                <div className="p-3 rounded-xl hover:bg-surface border border-transparent hover:border-border/50 transition-all cursor-pointer group">
                  <div className="flex gap-3">
                    <div className="relative shrink-0">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">JS</div>
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                        <div className="bg-info rounded-full p-0.5 text-white">
                          <span className="material-symbols-outlined text-[10px] block">group_add</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-text-main leading-snug">
                        <span className="font-bold">Jane S.</span> invited you to <span className="font-medium text-primary hover:underline">Team Offsite Planning</span>
                      </p>
                      <p className="text-xs text-text-muted font-mono">Yesterday</p>
                    </div>
                  </div>
                </div>
                {/* Empty State Filler */}
                <div className="p-8 flex flex-col items-center justify-center text-center opacity-60">
                  <div className="size-12 rounded-full bg-surface mb-3 flex items-center justify-center text-text-muted">
                    <span className="material-symbols-outlined">inbox</span>
                  </div>
                  <p className="text-sm text-text-muted">You're all caught up!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
