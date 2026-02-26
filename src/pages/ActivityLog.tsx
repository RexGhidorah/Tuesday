export default function ActivityLog() {
  return (
    <div className="flex-1 overflow-y-auto w-full px-4 py-8 sm:px-6">
      <div className="max-w-[680px] mx-auto">
      {/* Page Header */}
      <div className="mb-10 text-center">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-main mb-6 tracking-tight">Activity Log</h2>
        {/* Filters */}
        <div className="inline-flex items-center p-1 bg-surface rounded-xl border border-border">
          <button className="px-5 py-2 rounded-lg text-sm font-semibold bg-white text-text-main shadow-sm transition-all hover:text-primary">
            All Activities
          </button>
          <button className="px-5 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-text-main hover:bg-white/50 transition-all">
            Mentions Only
          </button>
          <button className="px-5 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-text-main hover:bg-white/50 transition-all">
            Files
          </button>
        </div>
      </div>

      {/* Activity Stream */}
      <div className="space-y-8 relative">
        {/* Timeline Connector (Visual Spine) */}
        <div className="absolute left-6 top-10 bottom-10 w-px bg-border/50 -z-10 hidden sm:block"></div>

        {/* DAY BLOCK: TODAY */}
        <section>
          <div className="sticky top-[65px] z-10 bg-white/95 backdrop-blur py-3 mb-4 border-b border-surface">
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-lg text-text-main">Today</span>
              <span className="text-xs font-medium text-text-muted bg-surface px-2 py-0.5 rounded-full border border-border">Oct 24</span>
            </div>
          </div>

          {/* Entry 1: Status Change */}
          <div className="group relative flex gap-4 p-3 rounded-2xl hover:bg-surface/50 transition-colors">
            <div className="flex-shrink-0 relative">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7KSYzJWKETBLM-_6BHOzusyoNO5mSFIyr-sEpIC6HBxoXS00yEiU7Udxn9gIwsxSp85kHNVkwSEOVcnOhBTiz9b6cW5tkH_8cnDBKvPcM6soORXvNM21atIbnig8BdK6T4Mgnt0wNrnKosl77SfneRwhhggF7eFgkSqOVorIXTryA2rvzKrO9K4-2ChD-48T6GBt_2aSwNy-ufDkaj7UcFyTVpTZZedJJBbdyJdstaccvJD6YkUmX0aic6zAvoO9HJnmnNh8uRVPI" alt="Sarah Chen" className="size-10 rounded-full object-cover border-2 border-white shadow-sm" />
              <div className="absolute -bottom-1 -right-1 bg-success size-4 rounded-full border-2 border-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[10px] text-white font-bold">check</span>
              </div>
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm text-text-main leading-relaxed">
                  <span className="font-bold">Sarah Chen</span>
                  <span className="text-text-muted"> updated status on </span>
                  <a href="#" className="font-medium text-primary hover:underline decoration-primary/30 underline-offset-2">Q3 Marketing Plan</a>
                  <span className="text-text-muted"> to </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-success text-white shadow-sm ml-1">
                    Done
                  </span>
                </p>
                <span className="text-xs font-mono text-text-muted whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity">10:42 AM</span>
              </div>
              {/* Hover Actions */}
              <div className="mt-2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button className="text-xs font-medium text-text-muted hover:text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">reply</span> Reply
                </button>
                <button className="text-xs font-medium text-text-muted hover:text-error flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">favorite</span> Like
                </button>
              </div>
            </div>
          </div>

          {/* Entry 2: Comment */}
          <div className="group relative flex gap-4 p-3 rounded-2xl hover:bg-surface/50 transition-colors mt-2">
            <div className="flex-shrink-0 relative">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA424q6VgzDxL7UxKmYnaaUGZfRRQJhlU8ndVmU5wfRab5DgjIGjvyE6ATuKRTSKXPm0H4aqLy2PlSghmmZIfl7RKTf3Q8md_okVINDRlGrST4AXZLcFNuWjDrv3yEJT2fsfbQP9VQQBrTaICAHssprgs70S2IX6oOLTKU2LxKh3me1i7NhHRK4aDnhxukrkyHefaK88TulAx7DVrrZKTV6E8iZEwPKwVrVbZLueE4nTL5a7ECd2wSbnxN7_4JC7neQzmw2f8wfe7Tm" alt="Alex Rivera" className="size-10 rounded-full object-cover border-2 border-white shadow-sm" />
              <div className="absolute -bottom-1 -right-1 bg-info size-4 rounded-full border-2 border-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[10px] text-white font-bold">chat_bubble</span>
              </div>
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm text-text-main leading-relaxed">
                  <span className="font-bold">Alex Rivera</span>
                  <span className="text-text-muted"> commented on </span>
                  <a href="#" className="font-medium text-primary hover:underline decoration-primary/30 underline-offset-2">API Migration</a>
                </p>
                <span className="text-xs font-mono text-text-muted whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity">09:15 AM</span>
              </div>
              {/* Comment Bubble */}
              <div className="mt-3 relative bg-surface p-3.5 rounded-2xl rounded-tl-none border border-border/50 text-sm text-text-main shadow-subtle max-w-[90%]">
                <p>We need to check the rate limits before merging the new endpoints. I'm seeing some 429 errors in staging.</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-border text-[10px] font-mono text-text-muted">
                    <span className="material-symbols-outlined text-[10px]">attachment</span> logs_dump.txt
                  </span>
                </div>
              </div>
              {/* Hover Actions */}
              <div className="mt-2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button className="text-xs font-medium text-text-muted hover:text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">reply</span> Reply
                </button>
                <button className="text-xs font-medium text-text-muted hover:text-error flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">favorite</span> Like
                </button>
              </div>
            </div>
          </div>

          {/* Entry 3: System Log */}
          <div className="group relative flex gap-4 p-3 rounded-2xl hover:bg-surface/50 transition-colors mt-2">
            <div className="flex-shrink-0 relative flex items-center justify-center size-10 rounded-full bg-surface border border-border text-text-muted">
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            </div>
            <div className="flex-1 min-w-0 pt-2">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm text-text-main leading-relaxed">
                  <span className="font-bold">Tuesday Bot</span>
                  <span className="text-text-muted"> automatically created task </span>
                  <a href="#" className="font-medium text-primary hover:underline decoration-primary/30 underline-offset-2">Q4 Budgeting</a>
                  <span className="text-text-muted"> in </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                    #Finance
                  </span>
                </p>
                <span className="text-xs font-mono text-text-muted whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity">08:00 AM</span>
              </div>
            </div>
          </div>
        </section>

        {/* DAY BLOCK: YESTERDAY */}
        <section>
          <div className="sticky top-[65px] z-10 bg-white/95 backdrop-blur py-3 mb-4 border-b border-surface">
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-lg text-text-main">Yesterday</span>
              <span className="text-xs font-medium text-text-muted bg-surface px-2 py-0.5 rounded-full border border-border">Oct 23</span>
            </div>
          </div>

          {/* Entry 4: File Upload */}
          <div className="group relative flex gap-4 p-3 rounded-2xl hover:bg-surface/50 transition-colors">
            <div className="flex-shrink-0 relative">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2P05KeogtoDnY8wCEqxmE8GnHX_ySvmw5ucvcvOAq5ghCSzWcNsBWHbc_0ADwU31mv9CT3J-UufVD_L2shN8vfjiXplEOFbFVUB0wMcmStOrh9fXsluDlM6VYU_dvOvf4MYwJa8eRFp250Rhxy5NclirgLmf9O4s7epcGzqvFXEARu2RSU16nCN-MVRwnwdlYB3CdNoMQzB_wXuCsoAXgeWLjejx_xvrhDhthpD3gWKsE82ktvQfEFgFpeAiMiWdUPQTZH7KppTFy" alt="Mike Ross" className="size-10 rounded-full object-cover border-2 border-white shadow-sm" />
              <div className="absolute -bottom-1 -right-1 bg-warning size-4 rounded-full border-2 border-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[10px] text-white font-bold">upload_file</span>
              </div>
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm text-text-main leading-relaxed">
                  <span className="font-bold">Mike Ross</span>
                  <span className="text-text-muted"> uploaded new assets to </span>
                  <a href="#" className="font-medium text-primary hover:underline decoration-primary/30 underline-offset-2">Homepage Redesign</a>
                </p>
                <span className="text-xs font-mono text-text-muted whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity">4:30 PM</span>
              </div>
              {/* File Card */}
              <div className="mt-3 flex items-center gap-3 p-3 bg-surface rounded-xl border border-border w-fit hover:bg-white hover:shadow-subtle hover:border-primary/30 transition-all cursor-pointer group/file">
                <div className="size-10 bg-[#ea4c1d]/10 rounded-lg flex items-center justify-center text-[#ea4c1d]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5.5 2H14.5L19.5 7V21C19.5 21.5523 19.0523 22 18.5 22H5.5C4.94772 22 4.5 21.5523 4.5 21V3C4.5 2.44772 4.94772 2 5.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"></path>
                    <path d="M14 2V7H19" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-text-main group-hover/file:text-primary transition-colors">wireframes_v2.fig</span>
                  <span className="text-xs text-text-muted">24 MB • Figma File</span>
                </div>
              </div>
              <div className="mt-2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button className="text-xs font-medium text-text-muted hover:text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">reply</span> Reply
                </button>
                <button className="text-xs font-medium text-text-muted hover:text-error flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">favorite</span> Like
                </button>
              </div>
            </div>
          </div>

          {/* Entry 5: Team Addition */}
          <div className="group relative flex gap-4 p-3 rounded-2xl hover:bg-surface/50 transition-colors mt-2">
            <div className="flex-shrink-0 relative">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD48kKf5hh2iEo46IXyQ0VAaH0meNbo7MERzbwBX9t3s6YI1QwHBQfbfuP9FiHeDSw6zdVXrTbOj3z-0HpUr46MGCNPtVE85_OR-FJpKe0yS9YtXb9wg3vAv8kRCmEXsY2umRPfM-5yCLp2CfxdVcUxof7uEgbRRXrXxk1ZT2mTAegUIn5Q_Y2LI8byLMQlf2pxI4OqYchr81ZJxPe9N8p5IXmzxvzPssbOgqc9EdqXDuLZrhAWZDbcWCKht21-CaNjYyXEwzmwz7NU" alt="Jessica Pearson" className="size-10 rounded-full object-cover border-2 border-white shadow-sm" />
              <div className="absolute -bottom-1 -right-1 bg-primary size-4 rounded-full border-2 border-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[10px] text-white font-bold">person_add</span>
              </div>
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm text-text-main leading-relaxed">
                  <span className="font-bold">Jessica Pearson</span>
                  <span className="text-text-muted"> added </span>
                  <span className="font-bold text-text-main">Sarah Chen</span>
                  <span className="text-text-muted"> to the team</span>
                </p>
                <span className="text-xs font-mono text-text-muted whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity">2:15 PM</span>
              </div>
            </div>
          </div>

          {/* Entry 6: Status Stuck */}
          <div className="group relative flex gap-4 p-3 rounded-2xl hover:bg-surface/50 transition-colors mt-2">
            <div className="flex-shrink-0 relative">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB00oOFrkkDvwcM5gjQfDV0vXGOZ0jRslz_1WbKEGLzAvYfInQjGBiogsee_cNJB-nwHGIcPrRlhyq5uGYF55o3P9_mEbIHLItGl0znqyupWRNx7Tsu4ZM1z5Y21nEUZuBFrZcWFSfTajHyNNWMELxrBVy2s46GabAB6ugdpTOdpeQf7u6NaqKmyg4u-zt8WcczIjbM-4g6Aabo2p9OE_Wb6PZQxgS4ApoLKgH1WF7aJlskckIk0oFdvsDLl0TYLFgS73nECmWfpsND" alt="Harvey Specter" className="size-10 rounded-full object-cover border-2 border-white shadow-sm" />
              <div className="absolute -bottom-1 -right-1 bg-error size-4 rounded-full border-2 border-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[10px] text-white font-bold">priority_high</span>
              </div>
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm text-text-main leading-relaxed">
                  <span className="font-bold">Harvey Specter</span>
                  <span className="text-text-muted"> marked </span>
                  <a href="#" className="font-medium text-primary hover:underline decoration-primary/30 underline-offset-2">Legal Review</a>
                  <span className="text-text-muted"> as </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-error text-white shadow-sm ml-1">
                    Stuck
                  </span>
                </p>
                <span className="text-xs font-mono text-text-muted whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity">11:00 AM</span>
              </div>
              {/* Hover Actions */}
              <div className="mt-2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button className="text-xs font-medium text-text-muted hover:text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">reply</span> Reply
                </button>
                <button className="text-xs font-medium text-text-muted hover:text-error flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">favorite</span> Like
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* End of Stream Indicator */}
        <div className="pt-8 pb-16 flex justify-center">
          <span className="text-xs font-mono text-text-muted uppercase tracking-widest opacity-50">End of Activity</span>
        </div>
      </div>
    </div>
  );
}
