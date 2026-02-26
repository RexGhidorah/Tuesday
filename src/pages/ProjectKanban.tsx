export default function ProjectKanban() {
  return (
    <div className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
      {/* Sub-Header: Project Controls (Adapted from Screen 5) */}
      <div className="flex-none px-6 py-4 flex flex-col gap-4 border-b border-border bg-white z-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-display font-bold text-text-main tracking-tight">Website Redesign</h1>
            <p className="text-text-muted text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              On Track
              <span className="text-border mx-1">•</span>
              Last updated 2m ago
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 mr-2">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaNJOf-bMmb5L3uK9wqh2jlj5NxQhD0OKDg6voiHiAwdpN5ve3EMVcpcylX0Q0DYlc2oYbva9W5uwd0oCqJT0FZfV2a9Sj42Q2gzkQLyr2tOOcXhMpKofINTs64RWDLBSKzQgzzYYIyBB7kroVMhfplk7uRAsLgBehftsQyR4dB4ggWccM7IziJt4-YS2p-rPEsLqX0UVzM2G6bUqIMjrHfJHkT2GqiHWTumdxz4uZlS5oJzdpUoz6xihbGDyGWUhYsVfw1lJBfU4C" alt="Team member" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlDtPWFdUim_JCnojBwqkDILTfte2f7sK1k7YiugCwSAkDC7S3IkZIV02M0v4QA7jjw-wJ02ubocIVegTyLnFGEamoifbfP5QqIXWkxtzaL5DUVBayhanrDqoHQs4PowQSMDl8lgaefme1NDIWnJpfW-m9ihpvIJLfTuo6DB-LF6MXBE3iu3-DlewOVDfOtr5Ak92qGxov21AC1jm9ppO8wCv5Zb81HvzrjaglQVmc66GIp7aXW8mp41X16nTJo8ddAq3mgO4q9AyK" alt="Team member" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtxIZ8zeWIBcabo1aNTVNzlv_k991YdQzTToN259Wj0vcNxHqeOlkPXXWNjjF3Oo2cFvGZEBBACTcg__QdDIzfCrF9XXfXfL3M4RGTGWLtYqgvmtNxxYvdnTY9sqbbqmCp9Th1AONW56aUd1xWUDFRzuBH2IphxGlXfMb15ua6qfk3cNuDL3kWEg6WQIMWODZeQsbQoSkE2HK29ZT-_CtsZ8trPKKZE9vhx3OKe1ge2Aa3L8cIFQ6I2Bq9bGICXMOXfqPUEDWUj8Iq" alt="Team member" className="w-8 h-8 rounded-full border-2 border-white" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-surface flex items-center justify-center text-xs font-bold text-text-muted">+4</div>
            </div>
            <button className="flex items-center justify-center gap-2 px-4 h-9 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-full transition-colors shadow-md shadow-primary/20">
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>New Item</span>
            </button>
          </div>
        </div>
        {/* View Switcher Tabs */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex border-b border-transparent gap-6">
            <a href="#" className="flex items-center gap-2 pb-3 border-b-2 border-transparent text-text-muted hover:text-text-main transition-colors group">
              <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">table_chart</span>
              <span className="text-sm font-bold">Main Table</span>
            </a>
            <a href="#" className="flex items-center gap-2 pb-3 border-b-2 border-primary text-text-main">
              <span className="material-symbols-outlined text-[20px] text-primary">view_kanban</span>
              <span className="text-sm font-bold">Kanban</span>
            </a>
            <a href="#" className="flex items-center gap-2 pb-3 border-b-2 border-transparent text-text-muted hover:text-text-main transition-colors group">
              <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">waterfall_chart</span>
              <span className="text-sm font-bold">Gantt</span>
            </a>
            <a href="#" className="flex items-center gap-2 pb-3 border-b-2 border-transparent text-text-muted hover:text-text-main transition-colors group">
              <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">calendar_month</span>
              <span className="text-sm font-bold">Timeline</span>
            </a>
          </div>
          <div className="flex items-center gap-2 pb-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-text-muted hover:bg-surface rounded-md text-sm font-medium transition-colors">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-text-muted hover:bg-surface rounded-md text-sm font-medium transition-colors">
              <span className="material-symbols-outlined text-[18px]">sort</span>
              Sort
            </button>
          </div>
        </div>
      </div>

      {/* Main Kanban Board Area */}
      <main className="flex-1 overflow-x-auto overflow-y-hidden bg-white p-6">
        <div className="flex h-full gap-6 min-w-max pb-4">
          {/* Column 1: Working on it (Orange) */}
          <div className="flex flex-col w-[320px] h-full rounded-xl bg-surface/50 border border-border/40">
            {/* Header */}
            <div className="relative px-4 py-3 flex items-center justify-between bg-white rounded-t-xl border-b border-border shadow-sm z-10">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-warning rounded-t-xl"></div>
              <div className="flex items-center gap-2 mt-1">
                <h3 className="font-display font-bold text-text-main text-base">Working on it</h3>
                <span className="flex items-center justify-center bg-surface px-2 py-0.5 rounded-full text-xs font-bold text-text-muted border border-border">4</span>
              </div>
              <button className="text-text-muted hover:bg-surface p-1 rounded-md transition-colors mt-1">
                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
              </button>
            </div>
            {/* Cards Container */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
              {/* Card 1 */}
              <div className="group bg-white p-0 rounded-lg border border-gray-200 shadow-cell hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing">
                <div className="h-[120px] w-full bg-cover bg-center rounded-t-lg" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsXT-1AjGiaE2JqQ9akKlFdrabSyq0h0UIc0qmKRrfgaoZOID4KFatnWjVYkhR5MCm8iJNafsy4WtLgXdBvkeswHjznPrOFYGZmx8VbElFq7LuL3jV6v7Pib9bH1IySDJ42FGSmpmrq_UA517ZpXwObH547QyFSG2C92Q7aieJEQ-NFmSRtlvEnPDEbMVdw4ZNnNjRuF-7e6sjjnXLdoxbDXKTkkb6vdHzHQB-SPSXnVVIdklO4vPLLk_51SrKAQToVtq1Mblwy3rK')"}}></div>
                <div className="p-3">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#E5D4FF] text-[#594EE6] text-[10px] font-bold uppercase tracking-wider">Design</span>
                  </div>
                  <h4 className="text-text-main font-medium text-sm leading-snug mb-3">Homepage Hero Interaction</h4>
                  <div className="flex items-center justify-between border-t border-surface pt-3 mt-1">
                    <div className="flex items-center gap-1.5 text-warning bg-warning/10 px-2 py-1 rounded-md">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                      <span className="text-xs font-bold">Today</span>
                    </div>
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlUmVUvykiJbKXTcXyaJ0zC4NNfEJBHa9Wv_f4r-QIluLDhF08sGHg3WgbSoHDkJsAKGe5nRKid2OHNZQJRGDajoFMBEPGMZ_IBgd8ehPTXXVZZ-qrq6X7tWs_KTGLVJ4RPjQD7zl-KemzzWlEDSh55p5C5hc7C0S53y8rXntffWYHUO0mdIFoc3RGvruOcsgELZYG9u9VrpUXtWlEo2jBpgiOwnoJydH3Nm_Qh_7BKHii-eVtJbpxHxqqWUj2T8nzPfiDX-etxXK9" alt="Assignee" className="w-6 h-6 rounded-full border border-white shadow-sm" />
                  </div>
                </div>
              </div>
              {/* Card 2 */}
              <div className="group bg-white p-3 rounded-lg border border-gray-200 shadow-cell hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#E3F2FD] text-[#1565C0] text-[10px] font-bold uppercase tracking-wider">Dev</span>
                </div>
                <h4 className="text-text-main font-medium text-sm leading-snug mb-3">Implement Auth0 Login Flow</h4>
                <div className="flex items-center justify-between border-t border-surface pt-3 mt-1">
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    <span className="text-xs font-mono">Oct 24</span>
                  </div>
                  <div className="flex -space-x-1.5">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCb2Y_PVJqENb_zCVNdXOP6gBsCPNWD6-gKuj7tmWzrL5Z-Cf7rlAQ_b-F6uZ_HJPBSB1c6pTCn_L8aQH-fb0iUGqVbbBm_sUvKXhF5Df8wdZtIWXa6gBC9AUF-YjrKRBZgYGZjFgVayJ1Az41OYTePUhMsPhn_OAOzqb07slDag8SI3rcUZsQUqtcwIVytBz6NNtNVr6pFt5L6BznzAjLuHNpbaeYdhZmpbm7FMgyUEG6NTHj9nZmXxOsDeKc7FIYyrb78HSzyfHle" alt="Assignee" className="w-6 h-6 rounded-full border border-white shadow-sm" />
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzJ9pH2IJ79s2x45UnOhn9yG-_GsreQ9VJ-uCInYSsMoZXw8567nbFCJEOSCVRbzxdN73SyFNgwMStKC-wh7I1YqQPytvdkRsGEQY-AjJdYfJWUeW4lLOlrvRBki7tEyQSm5J0ppUY6kupg45yesF1UZP4-JQhmULr_XtQy8mskWjh_lOYipA4-9HOG4vstXw0EQSEGOLS4uHPZ_ZIUuaaqnRl09TAWmUf-vjagr4TtPKjTCcn65adElBC5XBAjtC9MpvgLmi_Qs1K" alt="Assignee" className="w-6 h-6 rounded-full border border-white shadow-sm" />
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className="group bg-white p-3 rounded-lg border border-gray-200 shadow-cell hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-surface text-text-muted text-[10px] font-bold uppercase tracking-wider">Copy</span>
                </div>
                <h4 className="text-text-main font-medium text-sm leading-snug mb-3">Draft 'About Us' Story</h4>
                <div className="flex items-center justify-between border-t border-surface pt-3 mt-1">
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    <span className="text-xs font-mono">Oct 25</span>
                  </div>
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR7kvL1shMtwtaluuCDeNKGK6ZXwuuQnphPO_MGdUwDreQ-2kwemk1u0OYuGR_i0KU0fSDD_ABMKwFdSVdvr7bOiq4S4cET0PRvhjiwPEwgHgoKw2crM-cmbgA3gs19kVMM9ks1fyJ3hOjVr89UH5rb5A06J0JPYoJirZqI-qP-pvpEQg-Yrf0i3jO1w1ja7YVZgEps545WnJtjAGKaqp2nG6Nu0bEvkKTsPoO7Xbd0swvVLi3HbNTdKurERsXG0iQt3oxW4tZ1cct" alt="Assignee" className="w-6 h-6 rounded-full border border-white shadow-sm" />
                </div>
              </div>
              {/* Add Button */}
              <div className="p-3 pt-0">
                <button className="w-full flex items-center justify-start gap-2 p-2 rounded-lg text-text-muted hover:bg-white hover:shadow-sm hover:text-primary transition-all text-sm font-medium">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Add Item
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Stuck (Red) */}
          <div className="flex flex-col w-[320px] h-full rounded-xl bg-surface/50 border border-border/40">
            {/* Header */}
            <div className="relative px-4 py-3 flex items-center justify-between bg-white rounded-t-xl border-b border-border shadow-sm z-10">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-error rounded-t-xl"></div>
              <div className="flex items-center gap-2 mt-1">
                <h3 className="font-display font-bold text-text-main text-base">Stuck</h3>
                <span className="flex items-center justify-center bg-surface px-2 py-0.5 rounded-full text-xs font-bold text-text-muted border border-border">2</span>
              </div>
              <button className="text-text-muted hover:bg-surface p-1 rounded-md transition-colors mt-1">
                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar relative">
              {/* Card 4 */}
              <div className="group bg-white p-3 rounded-lg border border-gray-200 shadow-cell hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#E3F2FD] text-[#1565C0] text-[10px] font-bold uppercase tracking-wider">Backend</span>
                </div>
                <h4 className="text-text-main font-medium text-sm leading-snug mb-3">API Response Latency Fix</h4>
                <div className="flex items-center justify-between border-t border-surface pt-3 mt-1">
                  <div className="flex items-center gap-1.5 text-error bg-error/10 px-2 py-1 rounded-md">
                    <span className="material-symbols-outlined text-[14px]">warning</span>
                    <span className="text-xs font-bold">Overdue</span>
                  </div>
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY8PB2Mx7qwVk2fsrYD5AOgVVsnw4tXz2prcmL9dZ3HBZJXvtmM2heE2B0qVyLEs1nJxFOBD799Jmz5EPcsK6AW9HFTDtE-QatIw3XFPlJEOe1znnu3_NXH-3tBoisA9rES_yqtDk1w-XZ11z1mOXY5z0QqnVy5cb9oMNp_O29jcCQDbKdsZujqiZLavAFCV-EdEInamAYF-Ajsbt8jeqkfC3ZeAieKMq9ZN2V1csY7mW-VCwNMd-83o-ses1_6F-E4KwDWHV68AvS" alt="Assignee" className="w-6 h-6 rounded-full border border-white shadow-sm" />
                </div>
              </div>
              {/* Drop Zone Indication */}
              <div className="border-2 border-dashed border-primary/40 bg-primary/5 rounded-lg h-[140px] flex items-center justify-center">
                <span className="text-primary/60 text-sm font-medium">Drop here</span>
              </div>
              {/* Add Button */}
              <div className="p-3 pt-0">
                <button className="w-full flex items-center justify-start gap-2 p-2 rounded-lg text-text-muted hover:bg-white hover:shadow-sm hover:text-primary transition-all text-sm font-medium">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Add Item
                </button>
              </div>
            </div>
          </div>

          {/* Column 3: Done (Green) */}
          <div className="flex flex-col w-[320px] h-full rounded-xl bg-surface/50 border border-border/40">
            {/* Header */}
            <div className="relative px-4 py-3 flex items-center justify-between bg-white rounded-t-xl border-b border-border shadow-sm z-10">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-success rounded-t-xl"></div>
              <div className="flex items-center gap-2 mt-1">
                <h3 className="font-display font-bold text-text-main text-base">Done</h3>
                <span className="flex items-center justify-center bg-surface px-2 py-0.5 rounded-full text-xs font-bold text-text-muted border border-border">12</span>
              </div>
              <button className="text-text-muted hover:bg-surface p-1 rounded-md transition-colors mt-1">
                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
              {/* Card 5 */}
              <div className="group bg-white p-0 rounded-lg border border-gray-200 shadow-cell hover:shadow-md transition-all duration-200 opacity-70 hover:opacity-100 cursor-grab active:cursor-grabbing">
                <div className="h-[120px] w-full bg-cover bg-center rounded-t-lg grayscale group-hover:grayscale-0 transition-all" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEhGyG9Vk9XcdXkbzAGELqkNTz42fjo7Xi4x7q0lNwPLFAGmWesrDRHdtJPR3lGDmcA2ATKuhCgFKhxjGXNARtClr52eXzPN9IImmiRFGkjNDc0VZA6TAtDwYZG2-a1DqACjJEGuIVvlRnqELimqUFJO5PHRauv1CWM1RQshyMehVaXRGcDdXyC-tkKu7g7ll3hUWEJupLxGXdGpjByExV-SyRSJSjUfHBn76fXgmmIuzJwzFCA_0nDNaqnVsKlHZuItrOcbrXl7_X')"}}></div>
                <div className="p-3">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#E3F2FD] text-[#1565C0] text-[10px] font-bold uppercase tracking-wider">Infra</span>
                  </div>
                  <h4 className="text-text-main font-medium text-sm leading-snug mb-3 line-through text-text-muted">Setup Git Repository</h4>
                  <div className="flex items-center justify-between border-t border-surface pt-3 mt-1">
                    <div className="flex items-center gap-1.5 text-success">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      <span className="text-xs font-mono">Oct 15</span>
                    </div>
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOpoic3ei6KKHFukcKaTIj-RaqvQvP8uMC17SMssP21AVACjLyZZMX16g3TDBXRQpHwMmlKdzt8UBjpy1WF92wj0_roPhK_YHhTY8luZAyvkGSyZm_tBstTDZ-RbvzzdAPlsdIEhfqyDGGI_GrNhiXVSI2wabLOwOXpghbn2i-1cIapyzih6OZWEy4M9hCUsqNQpwXiIdvBFSXtcCaPzuzl29fW2Y8OHWcSeb6TR-eObyjhWN9IonogGla3RehtlgJi5W3YYKyIvI-" alt="Assignee" className="w-6 h-6 rounded-full border border-white shadow-sm grayscale" />
                  </div>
                </div>
              </div>
              {/* Card 6 */}
              <div className="group bg-white p-3 rounded-lg border border-gray-200 shadow-cell hover:shadow-md transition-all duration-200 opacity-70 hover:opacity-100 cursor-grab active:cursor-grabbing">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#E5D4FF] text-[#594EE6] text-[10px] font-bold uppercase tracking-wider">Design</span>
                </div>
                <h4 className="text-text-main font-medium text-sm leading-snug mb-3 line-through text-text-muted">Logo Revisions</h4>
                <div className="flex items-center justify-between border-t border-surface pt-3 mt-1">
                  <div className="flex items-center gap-1.5 text-success">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    <span className="text-xs font-mono">Oct 12</span>
                  </div>
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxzikj8xDfYkqunP3fzjU7h3eczI2h4M6F1GTgddxUv0DeycrDyRMsBJRthe7gS9QCB5MaHFMgO8UgnX10NIZ8FjcbZm2d022bYH16m4V4Xrviaip706shxbHwpxeu-P4WdB0qrhEsvRPbtZr65EIxUMVDfex3Mq5gfWkv2jwl9ksuzcVO1n2yernQgUnLWxlcTGTmjORHV90uLffNj4FdYofGA6hJQw7_9E5Yqjfkn3sS-xjm4kDykf1DyEk6B1KzPfWfkTny8_Un" alt="Assignee" className="w-6 h-6 rounded-full border border-white shadow-sm grayscale" />
                </div>
              </div>
              {/* Add Button */}
              <div className="p-3 pt-0">
                <button className="w-full flex items-center justify-start gap-2 p-2 rounded-lg text-text-muted hover:bg-white hover:shadow-sm hover:text-primary transition-all text-sm font-medium">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Add Item
                </button>
              </div>
            </div>
          </div>

          {/* Column 4: Backlog (Blue/Info) */}
          <div className="flex flex-col w-[320px] h-full rounded-xl bg-surface/50 border border-border/40">
            {/* Header */}
            <div className="relative px-4 py-3 flex items-center justify-between bg-white rounded-t-xl border-b border-border shadow-sm z-10">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-info rounded-t-xl"></div>
              <div className="flex items-center gap-2 mt-1">
                <h3 className="font-display font-bold text-text-main text-base">Backlog</h3>
                <span className="flex items-center justify-center bg-surface px-2 py-0.5 rounded-full text-xs font-bold text-text-muted border border-border">8</span>
              </div>
              <button className="text-text-muted hover:bg-surface p-1 rounded-md transition-colors mt-1">
                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar relative">
              {/* Draggable Card Being Dragged Simulation */}
              <div className="absolute top-10 left-4 z-50 w-[290px] rotate-[5deg] group bg-white p-3 rounded-lg border border-primary/30 shadow-float cursor-grabbing opacity-90 ring-2 ring-primary ring-offset-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-surface text-text-muted text-[10px] font-bold uppercase tracking-wider">Strategy</span>
                </div>
                <h4 className="text-text-main font-medium text-sm leading-snug mb-3">Mobile Responsiveness Audit</h4>
                <div className="flex items-center justify-between border-t border-surface pt-3 mt-1">
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    <span className="text-xs font-mono">TBD</span>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-dashed border-gray-300 flex items-center justify-center text-[10px] text-text-muted">?</div>
                </div>
              </div>
              {/* Placeholder for the dragged card position */}
              <div className="h-[110px] w-full rounded-lg bg-gray-100 border border-dashed border-gray-300"></div>
              {/* Card 8 */}
              <div className="group bg-white p-3 rounded-lg border border-gray-200 shadow-cell hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-surface text-text-muted text-[10px] font-bold uppercase tracking-wider">Legal</span>
                </div>
                <h4 className="text-text-main font-medium text-sm leading-snug mb-3">Privacy Policy Update</h4>
                <div className="flex items-center justify-between border-t border-surface pt-3 mt-1">
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    <span className="text-xs font-mono">Nov 01</span>
                  </div>
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNZMUIu_lO6Y9prtwSG9CpicDvVDCUosMRyXl4FYJwD-JCpORtLiehcZ5pvYS15Uq802KHhmB4V6lH7ZD71CcLR6K1bcZypjbc6dWljrPJQNH9xucYeJxwC9mv66W7ZvRWbt5hgRRbfVFlAK6E-kXExe5hjmCAovCQi8pXdrDdBFt01TYD6833rwp9O1DBmgBU2CxaZkAk_LwrsshN9SsTD9cu6wolQORbTesypfqInCvaGFZbOuDtTHWEqJ6DuRs2k_hUPfByVU7E" alt="Assignee" className="w-6 h-6 rounded-full border border-white shadow-sm" />
                </div>
              </div>
              {/* Add Button */}
              <div className="p-3 pt-0">
                <button className="w-full flex items-center justify-start gap-2 p-2 rounded-lg text-text-muted hover:bg-white hover:shadow-sm hover:text-primary transition-all text-sm font-medium">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
