export default function ProjectBoard() {
  return (
    <div className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-white shrink-0 z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-display font-bold text-text-main tracking-tight">Sprint 24: Core Features</h2>
          <div className="h-6 w-px bg-border mx-2"></div>
          <div className="flex -space-x-2">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQrkYKZ1cI6dEr6MH-42jUBzX0ZG3bGUdUS5hiJSWpw4awmuJYR9yQGurbZaz-cZmxHOvp5m4lCPvHbksLbhMTXI3_TsKCgBbZXS-afv0GWRzzOcWanHo5ZzcU5U5nL4AEr9Qcp7WZF934c2bzZRciOW_RpM3uQx7KNT58oHBBq_BbsF_VdSoXVYIi7rSK4OJJlzNWiYUodlFYEIYJkxsDYQOspb2VOy4l3ux5JXGVsKBEQ25SijgvD7CbEvbiJsxPH9z-Z46odg-_" alt="Team member avatar 1" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcV3ibc5ORUQ4tMplW_xGN8EZVL899hdB-iOQ_Pw5RC5QX2C05lWYs3TMRLnBjXoU7Ywp2QhvG6F2c2ni8sGBmaANcAfTTrtkvbxwZR9cojzf0iprSJD3oix4r0Cz06E_TkP8RlyTuIx9HLeaD7ptGyjsmZbGDcOlYjQXoQoxKSqoXDIqdJzOrZqDdrnmP92DQIXyYhdJOZYoPxHgTgdUSA6piM_00ZEhGakBeDuNkLVHuUfcw-_SkhI3Ls3Savob0IHl7b2AAzvwU" alt="Team member avatar 2" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC6dfH0KZTb_0tj4V3C4wQWgH-QxcvaqLqu0xykuWtPK5WQuu2kSHHAGe1NYn52pPadQxiRA8RPjA_INPCWgR2tLLMmH-xx_G9WQbb6cdglI_Cb_nPjQG1pXjxiREUGwy43YZx_9Z-oGNfD5jAtNbs2sMKI4RLiXYYKHtA6rCaPLT6g5AGOrQ25w9vaI1Ocewkv5shzZ14AQyyIB7JHj6q82eskZZdWM-TGcCrRNhaCmMntdANCnj5Y9gKvaiizDJD63xs7dy7GpFW" alt="Team member avatar 3" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
            <div className="w-8 h-8 rounded-full border-2 border-white bg-surface text-muted text-xs flex items-center justify-center font-bold">+4</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-muted text-[20px]">search</span>
            <input type="text" placeholder="Search" className="pl-9 pr-4 py-1.5 bg-surface border-transparent focus:border-primary focus:ring-0 rounded-full text-sm w-48 transition-all hover:bg-gray-100 placeholder-muted/70 text-text-main" />
          </div>
          <button className="p-2 text-muted hover:text-text-main hover:bg-surface rounded-full transition-colors">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
          <button className="p-2 text-muted hover:text-text-main hover:bg-surface rounded-full transition-colors">
            <span className="material-symbols-outlined">sort</span>
          </button>
          <div className="h-6 w-px bg-border mx-1"></div>
          <button className="px-4 py-1.5 bg-surface hover:bg-gray-100 text-text-main text-sm font-bold rounded-full transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">share</span>
            Share
          </button>
        </div>
      </header>

      {/* View Switcher Tabs */}
      <div className="px-6 border-b border-border bg-white flex items-center gap-6 overflow-x-auto scrollbar-hide shrink-0">
        <a href="#" className="relative py-3 text-sm font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">table_chart</span>
          Main Table
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full"></div>
        </a>
        <a href="#" className="py-3 text-sm font-medium text-muted hover:text-text-main flex items-center gap-2 transition-colors">
          <span className="material-symbols-outlined text-[20px]">view_kanban</span>
          Kanban
        </a>
        <a href="#" className="py-3 text-sm font-medium text-muted hover:text-text-main flex items-center gap-2 transition-colors">
          <span className="material-symbols-outlined text-[20px]">bar_chart</span>
          Gantt
        </a>
        <a href="#" className="py-3 text-sm font-medium text-muted hover:text-text-main flex items-center gap-2 transition-colors">
          <span className="material-symbols-outlined text-[20px]">timeline</span>
          Timeline
        </a>
        <a href="#" className="py-3 text-sm font-medium text-muted hover:text-text-main flex items-center gap-2 transition-colors">
          <span className="material-symbols-outlined text-[20px]">description</span>
          Files
        </a>
      </div>

      {/* Main Board Area */}
      <div className="flex-1 overflow-auto bg-white p-6 pb-20">
        {/* Group 1: Active Sprint */}
        <div className="mb-10 group/section">
          {/* Group Header */}
          <div className="flex items-center gap-2 mb-2 sticky left-0 z-20 group-header-sticky bg-white py-2">
            <span className="material-symbols-outlined text-muted cursor-pointer hover:text-primary transition-colors">expand_circle_down</span>
            <h3 className="text-lg font-display font-bold text-primary pl-2 border-l-4 border-primary leading-tight">This Week</h3>
            <span className="text-muted text-sm font-mono ml-2">12 items</span>
          </div>

          {/* Table Container */}
          <div className="relative overflow-visible">
            <div className="min-w-[1000px] border border-border rounded-lg shadow-sm bg-white overflow-hidden">
              {/* Table Header */}
              <div className="flex bg-surface border-b border-border text-xs font-display font-bold text-muted uppercase tracking-wide sticky top-0 z-10">
                <div className="w-10 p-3 flex items-center justify-center border-r border-border/50 sticky left-0 bg-surface z-20">
                  <input type="checkbox" className="custom-checkbox rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                </div>
                <div className="flex-1 min-w-[320px] p-3 border-r border-border/50 sticky left-10 bg-surface z-20 shadow-[4px_0_12px_rgba(0,0,0,0.02)]">Item</div>
                <div className="w-[120px] p-3 text-center border-r border-border/50">Owner</div>
                <div className="w-[160px] p-3 text-center border-r border-border/50">Status</div>
                <div className="w-[200px] p-3 text-center border-r border-border/50">Timeline</div>
                <div className="w-[120px] p-3 text-center border-r border-border/50">Priority</div>
                <div className="w-[100px] p-3 text-center">Est. Hours</div>
              </div>

              {/* Row 1 */}
              <div className="group flex items-center border-b border-border/50 hover:bg-surface/50 transition-colors">
                <div className="w-10 p-2 flex items-center justify-center border-r border-border/50 bg-white group-hover:bg-surface/50 sticky left-0 z-10">
                  <span className="material-symbols-outlined text-muted/30 cursor-move opacity-0 group-hover:opacity-100 text-[18px]">drag_indicator</span>
                </div>
                <div className="flex-1 min-w-[320px] p-2 border-r border-border/50 bg-white group-hover:bg-surface/50 sticky left-10 z-10 shadow-[4px_0_12px_rgba(0,0,0,0.02)] flex items-center gap-3">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium text-text-main truncate">Design System Audit</span>
                  <span className="material-symbols-outlined text-muted/50 text-[16px] ml-auto cursor-pointer hover:text-primary">chat_bubble</span>
                </div>
                <div className="w-[120px] p-2 flex justify-center border-r border-border/50">
                  <div className="flex -space-x-2">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5h1pZW5BlsPd-QgOWVhwi2ygGr9W1hNsOAPeVCwwCg2G9LrFCuTFKZJyPcD9xIbNP1O9apn_wyhXC3JIoxC9NYqykJKj2i-zeOWXAHnq6VjtprDjhc8zQ7ckxLX_LW8c-ifb2D1krMxos2QBl29MkmNoQfjVKaBWTiVRfcJsjGGp-TntBNbj7gg4y1O5dsU_2RbgU9Qi8g38w-Pk4DDiPnc2KiQJGzsNFTFl5Lqb9UyJ9MfAdXl8FQIsCRMMsCQg5j8uQsOkE4oxL" alt="Owner avatar" className="w-7 h-7 rounded-full border border-white" />
                  </div>
                </div>
                <div className="w-[160px] p-1.5 flex justify-center border-r border-border/50 relative">
                  <button className="w-full h-8 bg-success hover:bg-green-500 rounded-full text-white text-xs font-bold shadow-cell status-cell flex items-center justify-center">Done</button>
                </div>
                <div className="w-[200px] p-2 flex justify-center items-center border-r border-border/50">
                  <div className="w-full h-7 bg-primary/10 rounded-full relative overflow-hidden group/timeline cursor-pointer">
                    <div className="absolute top-0 left-[10%] w-[60%] h-full bg-primary rounded-full opacity-60"></div>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-medium text-primary opacity-0 group-hover/timeline:opacity-100 transition-opacity">Oct 12 - 15</span>
                  </div>
                </div>
                <div className="w-[120px] p-1.5 flex justify-center border-r border-border/50">
                   <div className="px-3 py-1 bg-error/10 text-error text-xs font-bold rounded-full border border-error/20">High</div>
                </div>
                <div className="w-[100px] p-2 flex justify-center items-center font-mono text-sm text-muted">8</div>
              </div>

               {/* Row 2 */}
              <div className="group flex items-center border-b border-border/50 hover:bg-surface/50 transition-colors">
                <div className="w-10 p-2 flex items-center justify-center border-r border-border/50 bg-white group-hover:bg-surface/50 sticky left-0 z-10">
                  <span className="material-symbols-outlined text-muted/30 cursor-move opacity-0 group-hover:opacity-100 text-[18px]">drag_indicator</span>
                </div>
                <div className="flex-1 min-w-[320px] p-2 border-r border-border/50 bg-white group-hover:bg-surface/50 sticky left-10 z-10 shadow-[4px_0_12px_rgba(0,0,0,0.02)] flex items-center gap-3">
                  <div className="w-1 h-6 bg-warning rounded-full"></div>
                  <span className="text-sm font-medium text-text-main truncate">API Integration - Stripe</span>
                </div>
                <div className="w-[120px] p-2 flex justify-center border-r border-border/50">
                  <div className="flex -space-x-2">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaLKdstCNPSynQNwj84Lx7ZFJc2K5YUjiYjn9A-eD23cxBu3gqOoyoDaojRWrEQCykfLGWlc2J5dnsABqMZ94g5BFOgZh4DmjNxMa8GWYwoBaSwNcZMhbcERtYfjYtlpyMQ3NqNaOgFKTYEEpbm2VPqyliFCCtWf0Z66qgIvHBYz35tr_ui52Wqgf7MlflhyeyBbSV_hodoIBIP36bE_sT-1NcY1aC0QK8uhuVUdrjKmwslTfydUFFQYTxfNAxCQbb7JbwOgA67mth" alt="Owner avatar" className="w-7 h-7 rounded-full border border-white" />
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1A-6CFVBkiIMCiWcjVd--H5jHY8wNqzYTsejNmuK1M9jciFOgk7QOWsqx2yhiEWlYBHe1aaPubn4Q1k0MWTzLnpAdsXbYUr05-hJyglYmY2tlUs1HqPe4as9OvcBIm5IZNfpbkRRF0IrUMvC4_lskXG8d2BHtAwb9UsVUhFQawz_XXAg4f9de4ibEE79Z1obuZudUv7IWO8dqxL2rcNOyjR5YOe9gLgde14prbOuf0pallT98sS6ogfvCQJAGddtTPMvw-xc6vw3P" alt="Owner avatar" className="w-7 h-7 rounded-full border border-white" />
                  </div>
                </div>
                <div className="w-[160px] p-1.5 flex justify-center border-r border-border/50 relative">
                  <button className="w-full h-8 bg-warning hover:bg-orange-400 rounded-full text-white text-xs font-bold shadow-cell status-cell flex items-center justify-center">Working on it</button>
                </div>
                <div className="w-[200px] p-2 flex justify-center items-center border-r border-border/50">
                  <div className="w-full h-7 bg-text-main/5 rounded-full relative overflow-hidden group/timeline cursor-pointer">
                    <div className="absolute top-0 left-[30%] w-[40%] h-full bg-text-main rounded-full opacity-60"></div>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-medium text-text-main opacity-0 group-hover/timeline:opacity-100 transition-opacity">Oct 14 - 18</span>
                  </div>
                </div>
                <div className="w-[120px] p-1.5 flex justify-center border-r border-border/50">
                  <div className="px-3 py-1 bg-warning/10 text-warning text-xs font-bold rounded-full border border-warning/20">Medium</div>
                </div>
                <div className="w-[100px] p-2 flex justify-center items-center font-mono text-sm text-muted">12</div>
              </div>

               {/* Row 3 with Popover Active */}
              <div className="group flex items-center border-b border-border/50 hover:bg-surface/50 transition-colors bg-primary/5">
                <div className="w-10 p-2 flex items-center justify-center border-r border-border/50 bg-white group-hover:bg-surface/50 sticky left-0 z-10">
                  <span className="material-symbols-outlined text-muted/30 cursor-move opacity-0 group-hover:opacity-100 text-[18px]">drag_indicator</span>
                </div>
                <div className="flex-1 min-w-[320px] p-2 border-r border-border/50 bg-white group-hover:bg-surface/50 sticky left-10 z-10 shadow-[4px_0_12px_rgba(0,0,0,0.02)] flex items-center gap-3">
                  <div className="w-1 h-6 bg-error rounded-full"></div>
                  <span className="text-sm font-medium text-text-main truncate">Fix Mobile Viewport Bug</span>
                </div>
                <div className="w-[120px] p-2 flex justify-center border-r border-border/50">
                  <div className="w-7 h-7 rounded-full bg-surface border border-border dashed border-dashed flex items-center justify-center hover:bg-gray-100 cursor-pointer text-muted">
                    <span className="material-symbols-outlined text-[14px]">add</span>
                  </div>
                </div>
                <div className="w-[160px] p-1.5 flex justify-center border-r border-border/50 relative">
                  <button className="w-full h-8 bg-error hover:bg-red-500 rounded-full text-white text-xs font-bold shadow-cell status-cell flex items-center justify-center ring-2 ring-offset-1 ring-error/50">Stuck</button>
                </div>
                <div className="w-[200px] p-2 flex justify-center items-center border-r border-border/50">
                  <div className="w-full h-7 bg-error/10 rounded-full relative overflow-hidden group/timeline cursor-pointer">
                    <div className="absolute top-0 left-[0%] w-[20%] h-full bg-error rounded-full opacity-60"></div>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-medium text-error opacity-100">Overdue (2d)</span>
                  </div>
                </div>
                <div className="w-[120px] p-1.5 flex justify-center border-r border-border/50">
                   <div className="px-3 py-1 bg-error/10 text-error text-xs font-bold rounded-full border border-error/20">Critical</div>
                </div>
                <div className="w-[100px] p-2 flex justify-center items-center font-mono text-sm text-muted">4</div>
              </div>

               {/* Row 4 */}
              <div className="group flex items-center border-b border-border/50 hover:bg-surface/50 transition-colors">
                <div className="w-10 p-2 flex items-center justify-center border-r border-border/50 bg-white group-hover:bg-surface/50 sticky left-0 z-10">
                  <span className="material-symbols-outlined text-muted/30 cursor-move opacity-0 group-hover:opacity-100 text-[18px]">drag_indicator</span>
                </div>
                <div className="flex-1 min-w-[320px] p-2 border-r border-border/50 bg-white group-hover:bg-surface/50 sticky left-10 z-10 shadow-[4px_0_12px_rgba(0,0,0,0.02)] flex items-center gap-3">
                  <div className="w-1 h-6 bg-info rounded-full"></div>
                  <span className="text-sm font-medium text-text-main truncate">Copywriting for Landing Page</span>
                </div>
                <div className="w-[120px] p-2 flex justify-center border-r border-border/50">
                  <div className="flex -space-x-2">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkQkLRC6i5M9UePfNz-prbnu2Ib2M9oyTyL7S_JTD1td9pG0Y05YILMm319GFndA1RVYazJN00qc3hZC8inF6WkA6H0vlBYhS4IoFAD9fKgYPGbSG4JpAwXxXSB-prUIQ4F1qYuBR9D7z18fQ39v1wznxToA0yrFfnIYCIzs65BvcOVIYaGwp7vSGhUlniLD_AjttYzFuLqDRWOkrLxIilRiXjLoxDdwWShazORGeC71QEijKVBCPwQghc6u25dE0j4xbtZ-5GKDOW" alt="Owner avatar" className="w-7 h-7 rounded-full border border-white" />
                  </div>
                </div>
                <div className="w-[160px] p-1.5 flex justify-center border-r border-border/50 relative">
                  <button className="w-full h-8 bg-info hover:bg-blue-400 rounded-full text-white text-xs font-bold shadow-cell status-cell flex items-center justify-center">Review</button>
                </div>
                <div className="w-[200px] p-2 flex justify-center items-center border-r border-border/50">
                  <div className="w-full h-7 bg-info/10 rounded-full relative overflow-hidden group/timeline cursor-pointer">
                    <div className="absolute top-0 left-[50%] w-[30%] h-full bg-info rounded-full opacity-60"></div>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-medium text-info opacity-0 group-hover/timeline:opacity-100 transition-opacity">Oct 19 - 22</span>
                  </div>
                </div>
                <div className="w-[120px] p-1.5 flex justify-center border-r border-border/50">
                   <div className="px-3 py-1 bg-surface text-muted text-xs font-bold rounded-full border border-border">Low</div>
                </div>
                <div className="w-[100px] p-2 flex justify-center items-center font-mono text-sm text-muted">3</div>
              </div>

              {/* Add Item Row */}
              <div className="flex items-center hover:bg-surface/30 transition-colors group/add">
                <div className="w-10 p-2 border-r border-transparent sticky left-0 z-10 bg-white"></div>
                <div className="flex-1 min-w-[320px] p-2 border-r border-transparent sticky left-10 z-10 bg-white shadow-[4px_0_12px_rgba(0,0,0,0.02)] flex items-center">
                  <div className="flex items-center gap-3 w-full pl-1 cursor-text">
                    <span className="material-symbols-outlined text-primary group-hover/add:bg-primary/10 rounded-full p-1 transition-colors text-[20px]">add</span>
                    <input type="text" placeholder="Add Item" className="w-full text-sm bg-transparent border-none focus:ring-0 placeholder-muted/70 text-text-main h-8" />
                  </div>
                </div>
                <div className="w-[120px] border-r border-transparent"></div>
                <div className="w-[160px] border-r border-transparent"></div>
                <div className="w-[200px] border-r border-transparent"></div>
                <div className="w-[120px] border-r border-transparent"></div>
                <div className="w-[100px]"></div>
              </div>

               {/* Summary Row */}
              <div className="flex items-center border-t border-border bg-surface/50 font-bold text-xs text-text-main">
                 <div className="w-10 p-2 sticky left-0 z-10 bg-surface/50"></div>
                 <div className="flex-1 min-w-[320px] p-3 text-right sticky left-10 z-10 bg-surface/50 shadow-[4px_0_12px_rgba(0,0,0,0.02)]">TOTALS</div>
                 <div className="w-[120px] p-3 border-l border-border/20"></div>
                 <div className="w-[160px] p-3 border-l border-border/20 flex justify-center">
                     <div className="w-full h-2 bg-border rounded-full overflow-hidden flex">
                        <div className="bg-success w-[25%] h-full"></div>
                        <div className="bg-warning w-[25%] h-full"></div>
                        <div className="bg-error w-[25%] h-full"></div>
                        <div className="bg-info w-[25%] h-full"></div>
                     </div>
                 </div>
                 <div className="w-[200px] p-3 border-l border-border/20 text-center text-muted font-mono">4w Range</div>
                 <div className="w-[120px] p-3 border-l border-border/20"></div>
                 <div className="w-[100px] p-3 border-l border-border/20 text-center font-mono">27h</div>
              </div>
            </div>
          </div>
        </div>

        {/* Group 2: Backlog (Simplified) */}
        <div className="mb-10 group/section opacity-70 hover:opacity-100 transition-opacity">
           {/* Group Header */}
           <div className="flex items-center gap-2 mb-2 sticky left-0 z-20 group-header-sticky bg-white py-2">
            <span className="material-symbols-outlined text-muted cursor-pointer hover:text-primary transition-colors">expand_circle_right</span>
            <h3 className="text-lg font-display font-bold text-[#8B5CF6] pl-2 border-l-4 border-[#8B5CF6] leading-tight">Backlog</h3>
            <span className="text-muted text-sm font-mono ml-2">8 items</span>
          </div>
        </div>
      </div>
    </div>
  );
}
