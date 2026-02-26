export default function ProjectGantt() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-white">
      {/* Project Controls Header (Adapted from Screen 7) */}
      <div className="flex flex-col border-b border-border bg-white shrink-0 z-10">
        <div className="px-6 py-2 flex items-center justify-between">
          {/* View Switcher */}
          <nav className="flex items-center gap-1">
            <a href="#" className="px-4 py-2 text-sm font-medium text-text-muted hover:text-primary hover:bg-surface rounded-lg transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">table_chart</span>
              Main Table
            </a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-text-muted hover:text-primary hover:bg-surface rounded-lg transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">view_kanban</span>
              Kanban
            </a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg transition-colors flex items-center gap-2 relative">
              <span className="material-symbols-outlined text-[18px]">waterfall_chart</span>
              Gantt
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></span>
            </a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-text-muted hover:text-primary hover:bg-surface rounded-lg transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              Calendar
            </a>
          </nav>
          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="flex items-center -space-x-2">
              <div className="size-8 rounded-full border-2 border-white bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDPwR7Duu9KvkqPU17g_jxtULrSvO4YP2780RRwamRxgGW557u1UDwFy5usikiR5ecA3np-SIkoN-JgtpubpShNJl0w9aY5aSrxflZgga6xIDTU6y6WHU6E-a-6YpJkRU4U0Z8z73Ew5uW6pDR8jFK1ELo9RPncE92PM34gOeSHIE8WhEsTHBub6nTLpdBkTman9bKP-dNhGYEpzxsi5EVO19wRaN2W0wtjZKSNK6_wE6P0h9Oo0_bVbmHL-RCx2DTIXbNCHZO535Wl')"}}></div>
              <div className="size-8 rounded-full border-2 border-white bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBi5I5_DPiUi-Dih_T_IOeP-fqGMgbafBcWLwOaUOeirNGvfT7a9PIrsftGRNTZqldhXdhBGjaI9fLljqlmBbUKkwoTYiIEQFbz5vIKpDeHDWH_3qSJMLE1wrudOlYApbFuPZNh5fXkRpsZigZqwuOWAbDqVpFa_5qQtdNaHebZfjSmuy5Tj49a08WztOHVy3ypWNkltAFKVc__Qid3MIFtT4sE3npez5v3GqdQVx1tViqW4ysliEBW_XKH178M5PRWk-44if0-XbCu')"}}></div>
              <div className="size-8 rounded-full border-2 border-white bg-surface flex items-center justify-center text-xs font-bold text-text-muted">+3</div>
            </div>
            <div className="h-6 w-px bg-border"></div>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-text-main bg-white border border-border rounded-lg hover:bg-surface transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-text-main bg-white border border-border rounded-lg hover:bg-surface transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[18px]">sort</span>
              Sort
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-bold text-white bg-primary rounded-full hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Item
            </button>
          </div>
        </div>
        {/* Gantt Specific Toolbar */}
        <div className="px-6 py-2 bg-surface border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
              Today
            </button>
            <div className="h-4 w-px bg-border"></div>
            <div className="flex bg-white rounded-lg p-0.5 border border-border shadow-sm">
              <button className="px-3 py-1 text-xs font-medium rounded-md hover:bg-surface text-text-muted">Days</button>
              <button className="px-3 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary shadow-sm">Weeks</button>
              <button className="px-3 py-1 text-xs font-medium rounded-md hover:bg-surface text-text-muted">Months</button>
              <button className="px-3 py-1 text-xs font-medium rounded-md hover:bg-surface text-text-muted">Qtr</button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <span className="flex items-center gap-1"><span className="block size-2 rounded-full bg-success"></span>Done</span>
            <span className="flex items-center gap-1"><span className="block size-2 rounded-full bg-warning"></span>Working</span>
            <span className="flex items-center gap-1"><span className="block size-2 rounded-full bg-error"></span>Stuck</span>
          </div>
        </div>
      </div>

      {/* Main Content Area: Split Pane */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Left Pane: Task List */}
        <aside className="w-[280px] bg-white border-r border-border flex flex-col shrink-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          {/* Header for Task List */}
          <div className="h-[57px] border-b border-border flex items-center px-4 bg-surface/50">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Task Name</span>
          </div>
          {/* Task List Container */}
          <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
            {/* Group 1 */}
            <div className="group">
              <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-border px-4 py-2 flex items-center justify-between hover:bg-surface/50 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-text-muted cursor-pointer text-[20px]">keyboard_arrow_down</span>
                  <div className="w-1 h-4 rounded-full bg-primary"></div>
                  <h3 className="text-sm font-display font-bold text-text-main">Sprint 24: Planning</h3>
                </div>
                <span className="text-xs font-mono text-text-muted bg-surface px-1.5 py-0.5 rounded">4 items</span>
              </div>
              <div className="flex flex-col">
                {/* Task Item */}
                <div className="flex items-center h-10 px-4 border-b border-surface hover:bg-surface group/item cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-success mr-3"></div>
                  <span className="text-sm text-text-main font-medium truncate flex-1">Project Kickoff</span>
                  <span className="material-symbols-outlined text-text-muted opacity-0 group-hover/item:opacity-100 transition-opacity text-[16px]">drag_indicator</span>
                </div>
                {/* Task Item */}
                <div className="flex items-center h-10 px-4 border-b border-surface hover:bg-surface group/item cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-success mr-3"></div>
                  <span className="text-sm text-text-main font-medium truncate flex-1">Requirements Gathering</span>
                  <span className="material-symbols-outlined text-text-muted opacity-0 group-hover/item:opacity-100 transition-opacity text-[16px]">drag_indicator</span>
                </div>
                {/* Task Item */}
                <div className="flex items-center h-10 px-4 border-b border-surface hover:bg-surface group/item cursor-pointer bg-primary/5">
                  <div className="w-2 h-2 rounded-full bg-warning mr-3"></div>
                  <span className="text-sm text-text-main font-bold truncate flex-1">Design System Audit</span>
                  <span className="material-symbols-outlined text-text-muted opacity-0 group-hover/item:opacity-100 transition-opacity text-[16px]">drag_indicator</span>
                </div>
                {/* Task Item */}
                <div className="flex items-center h-10 px-4 border-b border-surface hover:bg-surface group/item cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-neutral-status mr-3"></div>
                  <span className="text-sm text-text-main font-medium truncate flex-1">Competitor Analysis</span>
                  <span className="material-symbols-outlined text-text-muted opacity-0 group-hover/item:opacity-100 transition-opacity text-[16px]">drag_indicator</span>
                </div>
              </div>
            </div>
            {/* Group 2 */}
            <div className="group mt-4">
              <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-border px-4 py-2 flex items-center justify-between hover:bg-surface/50 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-text-muted cursor-pointer text-[20px]">keyboard_arrow_down</span>
                  <div className="w-1 h-4 rounded-full bg-info"></div>
                  <h3 className="text-sm font-display font-bold text-text-main">Sprint 25: Design</h3>
                </div>
                <span className="text-xs font-mono text-text-muted bg-surface px-1.5 py-0.5 rounded">3 items</span>
              </div>
              <div className="flex flex-col">
                {/* Task Item */}
                <div className="flex items-center h-10 px-4 border-b border-surface hover:bg-surface group/item cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-warning mr-3"></div>
                  <span className="text-sm text-text-main font-medium truncate flex-1">Wireframing Core Flows</span>
                  <span className="material-symbols-outlined text-text-muted opacity-0 group-hover/item:opacity-100 transition-opacity text-[16px]">drag_indicator</span>
                </div>
                {/* Task Item */}
                <div className="flex items-center h-10 px-4 border-b border-surface hover:bg-surface group/item cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-error mr-3"></div>
                  <span className="text-sm text-text-main font-medium truncate flex-1">UI Visual Direction</span>
                  <span className="material-symbols-outlined text-text-muted opacity-0 group-hover/item:opacity-100 transition-opacity text-[16px]">drag_indicator</span>
                </div>
                {/* Task Item */}
                <div className="flex items-center h-10 px-4 border-b border-surface hover:bg-surface group/item cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-neutral-status mr-3"></div>
                  <span className="text-sm text-text-main font-medium truncate flex-1">User Testing</span>
                  <span className="material-symbols-outlined text-text-muted opacity-0 group-hover/item:opacity-100 transition-opacity text-[16px]">drag_indicator</span>
                </div>
              </div>
            </div>
            {/* Add Item Button */}
            <button className="flex items-center gap-2 px-4 py-3 text-sm text-text-muted hover:text-primary transition-colors w-full text-left mt-2 group">
              <span className="material-symbols-outlined bg-surface rounded p-0.5 group-hover:bg-primary/10 text-[16px]">add</span>
              <span>Add Task</span>
            </button>
          </div>
        </aside>

        {/* Right Pane: Timeline Canvas */}
        <div className="flex-1 overflow-hidden flex flex-col relative bg-white">
          {/* Timeline Header (Time Scale) */}
          <div className="h-[57px] bg-surface/50 border-b border-border flex shrink-0 overflow-hidden relative">
            {/* Month Label */}
            <div className="absolute top-1 left-4 text-xs font-display font-bold text-text-main z-10 bg-surface/80 backdrop-blur px-2 rounded">October 2023</div>
            {/* Days Grid Header */}
            {/* Assuming 40px per day column for visualization */}
            <div className="flex pt-6 w-full h-full">
              {/* Week 1 */}
              {['01 Sun', '02 Mon', '03 Tue', '04 Wed', '05 Thu', '06 Fri', '07 Sat'].map((day, i) => (
                <div key={i} className={`flex-shrink-0 w-10 border-r border-border/50 flex justify-center text-[10px] text-text-muted font-mono ${i >= 5 ? 'bg-surface' : ''}`}>
                  {day.split(' ')[0]}<br/>{day.split(' ')[1]}
                </div>
              ))}
              {/* Week 2 */}
              {['08 Sun', '09 Mon', '10 Tue', '11 Wed', '12 Thu', '13 Fri', '14 Sat'].map((day, i) => (
                <div key={i} className={`flex-shrink-0 w-10 border-r border-border/50 flex justify-center text-[10px] text-text-muted font-mono ${i >= 5 ? 'bg-surface' : ''} ${day.startsWith('11') ? 'text-primary font-bold bg-primary/5' : ''}`}>
                  {day.split(' ')[0]}<br/>{day.split(' ')[1]}
                </div>
              ))}
              {/* Week 3 */}
              {['15 Sun', '16 Mon', '17 Tue', '18 Wed', '19 Thu', '20 Fri', '21 Sat'].map((day, i) => (
                <div key={i} className={`flex-shrink-0 w-10 border-r border-border/50 flex justify-center text-[10px] text-text-muted font-mono ${i >= 5 ? 'bg-surface' : ''}`}>
                  {day.split(' ')[0]}<br/>{day.split(' ')[1]}
                </div>
              ))}
              {/* Week 4 */}
              {['22 Sun', '23 Mon', '24 Tue', '25 Wed', '26 Thu'].map((day, i) => (
                <div key={i} className={`flex-shrink-0 w-10 border-r border-border/50 flex justify-center text-[10px] text-text-muted font-mono`}>
                  {day.split(' ')[0]}<br/>{day.split(' ')[1]}
                </div>
              ))}
            </div>
          </div>
          {/* Timeline Body (Canvas) */}
          <div className="flex-1 overflow-auto gantt-scroll relative bg-[linear-gradient(to_right,#F5F6F8_1px,transparent_1px)] bg-[size:40px_100%]">
            {/* Current Day Line */}
            <div className="absolute top-0 bottom-0 left-[419px] w-px border-l-2 border-dashed border-error z-20 pointer-events-none">
              <div className="absolute -top-1 -left-[5px] size-2.5 bg-error rounded-full shadow-sm"></div>
            </div>
            {/* SVG Layer for Dependencies */}
            <svg className="absolute inset-0 pointer-events-none z-10 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Curve from Kickoff to Requirements */}
              <path d="M 140 60 C 160 60, 160 100, 180 100" fill="none" stroke="#D0D4E4" strokeWidth="2"></path>
              {/* Curve from Requirements to Design Audit */}
              <path d="M 280 100 C 300 100, 300 140, 320 140" fill="none" stroke="#D0D4E4" strokeWidth="2"></path>
              {/* Curve from Design Audit to Competitor Analysis */}
              <path d="M 440 140 C 460 140, 460 180, 480 180" fill="none" stroke="#D0D4E4" strokeWidth="2"></path>
              {/* Long Dependency */}
              <path d="M 600 180 C 620 180, 620 250, 640 250" fill="none" stroke="#D0D4E4" strokeWidth="2"></path>
            </svg>
            {/* Content Wrapper matches Left Pane Height Structure */}
            <div className="min-w-[1000px] pb-10">
              {/* Group 1 Spacer */}
              <div className="h-[41px] border-b border-transparent"></div> {/* Matches Group Header Height */}
              {/* Task 1: Project Kickoff */}
              <div className="h-10 relative flex items-center border-b border-transparent">
                <div className="absolute left-10 w-[120px] h-6 bg-success rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer group/bar flex items-center justify-between px-2">
                  <span className="text-[10px] text-white font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap overflow-hidden">3 Days</span>
                  {/* Resize Handle R */}
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full opacity-0 group-hover/bar:opacity-100 cursor-col-resize"></div>
                </div>
              </div>
              {/* Task 2: Requirements Gathering */}
              <div className="h-10 relative flex items-center border-b border-transparent">
                <div className="absolute left-[180px] w-[100px] h-6 bg-success rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer group/bar flex items-center justify-between px-2">
                  {/* Resize Handle L */}
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full opacity-0 group-hover/bar:opacity-100 cursor-col-resize"></div>
                  <span className="text-[10px] text-white font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap overflow-hidden">2.5 Days</span>
                  {/* Resize Handle R */}
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full opacity-0 group-hover/bar:opacity-100 cursor-col-resize"></div>
                </div>
              </div>
              {/* Task 3: Design System Audit (Selected/Hovered) */}
              <div className="h-10 relative flex items-center border-b border-transparent bg-primary/5">
                <div className="absolute left-[320px] w-[120px] h-6 bg-warning rounded-full shadow-md ring-2 ring-primary/20 cursor-pointer group/bar flex items-center justify-between px-2 z-20">
                  {/* Resize Handle L */}
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full cursor-col-resize"></div>
                  <span className="text-[10px] text-white font-bold whitespace-nowrap overflow-hidden">3 Days</span>
                  {/* Resize Handle R */}
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full cursor-col-resize"></div>
                </div>
                {/* Tooltip for Task 3 */}
                <div className="absolute left-[360px] top-[32px] bg-white rounded-lg shadow-float border border-surface p-3 z-30 w-48 animate-in fade-in slide-in-from-top-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="size-2 rounded-full bg-warning"></div>
                    <span className="text-xs font-bold text-text-main">Design System Audit</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-text-muted font-mono">
                    <div>Start</div>
                    <div className="text-text-main font-bold text-right">Oct 09</div>
                    <div>End</div>
                    <div className="text-text-main font-bold text-right">Oct 11</div>
                    <div>Duration</div>
                    <div className="text-text-main font-bold text-right">3d</div>
                  </div>
                </div>
              </div>
              {/* Task 4: Competitor Analysis */}
              <div className="h-10 relative flex items-center border-b border-transparent">
                <div className="absolute left-[480px] w-[120px] h-6 bg-neutral-status rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer group/bar flex items-center justify-between px-2">
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full opacity-0 group-hover/bar:opacity-100 cursor-col-resize"></div>
                  <span className="text-[10px] text-white font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap overflow-hidden">3 Days</span>
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full opacity-0 group-hover/bar:opacity-100 cursor-col-resize"></div>
                </div>
              </div>
              {/* Group 2 Spacer */}
              <div className="h-[57px] border-b border-transparent mt-4"></div> {/* Matches Group Header Height + Margin */}
              {/* Task 5: Wireframing */}
              <div className="h-10 relative flex items-center border-b border-transparent">
                <div className="absolute left-[640px] w-[160px] h-6 bg-warning rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer group/bar flex items-center justify-between px-2">
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full opacity-0 group-hover/bar:opacity-100 cursor-col-resize"></div>
                  <span className="text-[10px] text-white font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap overflow-hidden">4 Days</span>
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full opacity-0 group-hover/bar:opacity-100 cursor-col-resize"></div>
                </div>
                {/* Avatar Stack on Bar */}
                <div className="absolute left-[780px] top-2 flex -space-x-1 pointer-events-none">
                  <div className="size-4 rounded-full border border-white bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmEL57KMoIJwN5ryIR97LWvXgJ9p0DlIixpfMoFeNRJbntRsxS42lpJCWCtpZYAwiX66xabO19_2DXTFyJF4nNkquwq8XkcteGCjkELa_IpLaFZe09bYHb4BA_LQHPmIRi9fNcwd2l0_6KB6BHZ6iTtDsy9ulNuGPV3jlDf54ASQBZypQIzGifH3CAsd6r8GOCoKGIxrj5FCIlCxQDrQfMqouMes4KlqqD5x1628sr7Mqu5ayAvlb3FfgSTdQnoPy7OD3htlYK2aur')"}}></div>
                </div>
              </div>
              {/* Task 6: UI Visual Direction */}
              <div className="h-10 relative flex items-center border-b border-transparent">
                <div className="absolute left-[820px] w-[140px] h-6 bg-error rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer group/bar flex items-center justify-between px-2">
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full opacity-0 group-hover/bar:opacity-100 cursor-col-resize"></div>
                  <span className="text-[10px] text-white font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap overflow-hidden">3.5 Days</span>
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full opacity-0 group-hover/bar:opacity-100 cursor-col-resize"></div>
                </div>
                {/* Alert Icon for Error State */}
                <div className="absolute left-[970px] text-error">
                  <span className="material-symbols-outlined text-[16px]">warning</span>
                </div>
              </div>
              {/* Task 7: User Testing */}
              <div className="h-10 relative flex items-center border-b border-transparent">
                <div className="absolute left-[980px] w-[120px] h-6 bg-neutral-status rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-text-muted/20 border-dashed group/bar flex items-center justify-between px-2">
                  <div className="w-1.5 h-1.5 bg-text-muted/30 rounded-full opacity-0 group-hover/bar:opacity-100 cursor-col-resize"></div>
                  <span className="text-[10px] text-text-muted font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap overflow-hidden">Planned</span>
                  <div className="w-1.5 h-1.5 bg-text-muted/30 rounded-full opacity-0 group-hover/bar:opacity-100 cursor-col-resize"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
