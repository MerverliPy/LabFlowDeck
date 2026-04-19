import React from "react";
import * as Icons from "lucide-react";

export interface ProjectDetailScreenProps {
  state: string;
}

/**
 * States:
 * - overview: Overview Tab — The default view showing quick stats, recent activity, and general project information.
 * - repository: Repository Tab — View showing the branch selector and file tree browser.
 * - fileViewer: File Viewer Modal — Full-screen modal displaying the content of a selected file.
 * - terminal: Terminal Tab — View showing the live log viewer and the predefined action grid.
 * - terminalConfirm: Terminal Action Confirmation — A confirmation dialog for a risky action like "Restart".
 * - workflow: Workflow Tab — View showing the attached workflow card, schedule status, upcoming runs, and history.
 * - workflowSelector: Workflow Selector — A bottom sheet allowing the user to attach or change the workflow.
 * - deploy: Deploy Tab — View listing tracked services with runtime status, health status, and resource usage.
 * - deployActionConfirm: Deploy Action Confirmation — A confirmation dialog for a destructive deployment action.
 * - logs: Logs Tab — View showing aggregated logs with filter tabs (Activity vs Execution).
 * - logsFilter: Logs Filter Menu — A menu open to filter logs by source, time range, or severity.
 * - stats: Stats Tab — View displaying charts for build times, success rates, and resource usage.
 */
const ProjectDetailScreen: React.FC<ProjectDetailScreenProps> = ({ state }) => {

  const tabs = [
    { id: "overview", label: "Overview", icon: Icons.LayoutDashboard },
    { id: "repository", label: "Repo", icon: Icons.GitBranch },
    { id: "terminal", label: "Terminal", icon: Icons.Terminal },
    { id: "workflow", label: "Workflow", icon: Icons.Bot },
    { id: "deploy", label: "Deploy", icon: Icons.Container },
    { id: "logs", label: "Logs", icon: Icons.ScrollText },
  ];

  const activeTab = state === "fileViewer" ? "repository"
    : state === "terminalConfirm" ? "terminal"
    : state === "workflowSelector" ? "workflow"
    : state === "deployActionConfirm" ? "deploy"
    : state === "logsFilter" ? "logs"
    : state === "stats" ? "overview"
    : state;

  const renderHeader = () => (
    <header className="px-5 pt-4 pb-2">
      <div className="flex items-center justify-between mb-3">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.ArrowLeft className="w-5 h-5 text-[#64748B]" />
        </button>
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.MoreVertical className="w-5 h-5 text-[#64748B]" />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-[#3B82F6]/12 flex items-center justify-center">
          <Icons.FolderKanban className="w-5.5 h-5.5 text-[#3B82F6]" />
        </div>
        <div>
          <h1 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9] leading-tight">api-gateway</h1>
          <p className="font-['Work_Sans'] text-[12px] text-[#64748B]">my-org/api-gateway · main</p>
        </div>
      </div>
    </header>
  );

  const renderTabs = () => (
    <div className="px-5 mt-3 mb-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
      <div className="flex gap-1.5 p-1 rounded-2xl"
        style={{ background: 'rgba(30,41,59,0.3)' }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id || (tab.id === "logs" && state === "stats");
          const TabIcon = tab.icon;
          return (
            <button key={tab.id} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap relative"
              style={{
                background: isActive ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : 'transparent',
                boxShadow: isActive ? '0 4px 16px rgba(59,130,246,0.25)' : 'none',
              }}
            >
              <TabIcon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#64748B]'}`} />
              <span className={`font-['Work_Sans'] text-[12px] font-medium ${isActive ? 'text-white' : 'text-[#64748B]'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="px-5 mt-4 pb-28 space-y-4">
      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-2.5">
        {[
          { label: "Services", value: "3", icon: Icons.Container, color: "#22C55E", bg: "rgba(34,197,94,0.1)" },
          { label: "Last Deploy", value: "2m ago", icon: Icons.Rocket, color: "#3B82F6", bg: "rgba(59,130,246,0.1)" },
          { label: "Workflow", value: "Active", icon: Icons.Bot, color: "#8B5CF6", bg: "rgba(139,92,246,0.1)" },
          { label: "Uptime", value: "99.8%", icon: Icons.Activity, color: "#22D3EE", bg: "rgba(34,211,238,0.1)" },
        ].map((stat, i) => {
          const StatIcon = stat.icon;
          return (
            <div key={i} className="rounded-2xl p-4"
              style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: stat.bg }}>
                  <StatIcon className="w-3.5 h-3.5" style={{ color: stat.color }} />
                </div>
                <span className="font-['Work_Sans'] text-[11px] text-[#64748B]">{stat.label}</span>
              </div>
              <p className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9]">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Host card */}
      <div className="rounded-2xl p-4 flex items-center gap-3"
        style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-['Manrope'] text-[12px] font-bold text-[#F1F5F9]"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', border: '2px solid #22C55E', boxShadow: '0 0 12px rgba(34,197,94,0.2)' }}
        >
          HS
        </div>
        <div className="flex-1">
          <p className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">Home Server</p>
          <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">Docker 24.0 · Compose 2.23</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#22C55E]/10">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div>
          <span className="font-['Work_Sans'] text-[10px] font-medium text-[#22C55E]">Healthy</span>
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <h3 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9] mb-3">Recent Activity</h3>
        <div className="space-y-1.5">
          {[
            { msg: "Deploy completed successfully", time: "2m ago", icon: Icons.Rocket, color: "#22C55E" },
            { msg: "Run Tests workflow passed", time: "8m ago", icon: Icons.CheckCircle2, color: "#3B82F6" },
            { msg: "Container api restarted", time: "1h ago", icon: Icons.RefreshCw, color: "#8B5CF6" },
          ].map((act, i) => {
            const ActIcon = act.icon;
            return (
              <div key={i} className="flex items-center gap-3 py-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${act.color}15` }}>
                  <ActIcon className="w-3.5 h-3.5" style={{ color: act.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-['Work_Sans'] text-[13px] text-[#F1F5F9]">{act.msg}</p>
                </div>
                <span className="font-['Work_Sans'] text-[11px] text-[#64748B]">{act.time}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats preview */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">Stats</h3>
          <span className="font-['Work_Sans'] text-[12px] text-[#3B82F6]">View all</span>
        </div>
        <div className="rounded-2xl p-4"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-['Work_Sans'] text-[12px] text-[#64748B]">Build Success Rate</span>
            <span className="font-['Manrope'] text-[15px] font-bold text-[#22C55E]">94%</span>
          </div>
          <div className="flex gap-1 h-8 items-end">
            {[65, 80, 90, 70, 95, 88, 92, 100, 85, 94, 90, 96].map((v, i) => (
              <div key={i} className="flex-1 rounded-sm" style={{
                height: `${v}%`,
                background: v >= 90 ? 'linear-gradient(180deg, #22C55E, rgba(34,197,94,0.3))' : v >= 70 ? 'linear-gradient(180deg, #3B82F6, rgba(59,130,246,0.3))' : 'linear-gradient(180deg, #F59E0B, rgba(245,158,11,0.3))',
              }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRepository = () => (
    <div className="px-5 mt-4 pb-28">
      {/* Branch selector */}
      <div className="rounded-2xl px-4 py-3 flex items-center justify-between mb-4"
        style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
      >
        <div className="flex items-center gap-2.5">
          <Icons.GitBranch className="w-4 h-4 text-[#3B82F6]" />
          <span className="font-['Work_Sans'] text-[13px] font-medium text-[#F1F5F9]">main</span>
        </div>
        <Icons.ChevronDown className="w-4 h-4 text-[#64748B]" />
      </div>

      {/* Last commit */}
      <div className="rounded-2xl px-4 py-3 mb-4"
        style={{ background: 'rgba(59,130,246,0.06)', boxShadow: '0 0 0 1px rgba(59,130,246,0.1)' }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Icons.GitCommit className="w-3.5 h-3.5 text-[#3B82F6]" />
          <span className="font-['IBM_Plex_Mono'] text-[11px] text-[#3B82F6]">a3f8c2d</span>
          <span className="font-['Work_Sans'] text-[11px] text-[#64748B] ml-auto">2h ago</span>
        </div>
        <p className="font-['Work_Sans'] text-[12px] text-[#94A3B8]">fix: update auth middleware for token refresh</p>
      </div>

      {/* File tree */}
      <div className="space-y-0.5">
        {[
          { name: "src/", type: "folder", depth: 0 },
          { name: "auth/", type: "folder", depth: 1 },
          { name: "middleware.ts", type: "file", depth: 2 },
          { name: "routes.ts", type: "file", depth: 2 },
          { name: "index.ts", type: "file", depth: 1 },
          { name: "docker-compose.yml", type: "file", depth: 0 },
          { name: "Dockerfile", type: "file", depth: 0 },
          { name: "package.json", type: "file", depth: 0 },
          { name: "README.md", type: "file", depth: 0 },
        ].map((file, i) => (
          <button key={i} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left"
            style={{ background: file.name === "middleware.ts" ? 'rgba(59,130,246,0.06)' : 'transparent' }}
          >
            <div style={{ width: `${file.depth * 16}px` }}></div>
            {file.type === "folder" ? (
              <Icons.Folder className="w-4 h-4 text-[#F59E0B]" />
            ) : (
              <Icons.File className="w-4 h-4 text-[#64748B]" />
            )}
            <span className={`font-['Work_Sans'] text-[13px] ${file.type === "folder" ? 'text-[#F1F5F9] font-medium' : 'text-[#94A3B8]'}`}>
              {file.name}
            </span>
            {file.name === "middleware.ts" && (
              <Icons.ChevronRight className="w-3.5 h-3.5 text-[#3B82F6] ml-auto" />
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const renderFileViewer = () => (
    <div className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)' }}
    >
      <header className="flex items-center justify-between px-5 pt-5 pb-3">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.ArrowLeft className="w-5 h-5 text-[#64748B]" />
        </button>
        <div className="text-center">
          <p className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">middleware.ts</p>
          <p className="font-['Work_Sans'] text-[10px] text-[#64748B]">src/auth/middleware.ts</p>
        </div>
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.Copy className="w-5 h-5 text-[#64748B]" />
        </button>
      </header>
      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <div className="rounded-2xl p-4 font-['IBM_Plex_Mono'] text-[12px] leading-[1.8]"
          style={{ background: 'rgba(11,16,32,0.8)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)' }}
        >
          <p><span className="text-[#64748B]"> 1</span> <span className="text-[#8B5CF6]">import</span> <span className="text-[#F1F5F9]">&#123;</span> verify &#125;<span className="text-[#F1F5F9]">&#125;</span> <span className="text-[#8B5CF6]">from</span> <span className="text-[#22C55E]">'./jwt'</span><span className="text-[#64748B]">;</span></p>
          <p><span className="text-[#64748B]"> 2</span> <span className="text-[#8B5CF6]">import</span> <span className="text-[#F1F5F9]">&#123;</span> RedisStore &#125;<span className="text-[#F1F5F9]">&#125;</span> <span className="text-[#8B5CF6]">from</span> <span className="text-[#22C55E]">'@upstash/redis'</span><span className="text-[#64748B]">;</span></p>
          <p><span className="text-[#64748B]"> 3</span></p>
          <p><span className="text-[#64748B]"> 4</span> <span className="text-[#8B5CF6]">export async function</span> <span className="text-[#60A5FA]">authMiddleware</span><span className="text-[#F1F5F9]">(req, res, next)</span> <span className="text-[#64748B]">&#123;</span></p>
          <p><span className="text-[#64748B]"> 5</span>   <span className="text-[#8B5CF6]">const</span> <span className="text-[#F1F5F9]">token </span><span className="text-[#3B82F6]">=</span> <span className="text-[#F1F5F9]">req.headers.authorization</span><span className="text-[#64748B]">;</span></p>
          <p><span className="text-[#64748B]"> 6</span>   <span className="text-[#8B5CF6]">if</span> <span className="text-[#F1F5F9]">(!token)</span> <span className="text-[#8B5CF6]">return</span> <span className="text-[#F1F5F9]">res.status(</span><span className="text-[#F59E0B]">401</span><span className="text-[#F1F5F9]">)</span><span className="text-[#64748B]">;</span></p>
          <p><span className="text-[#64748B]"> 7</span></p>
          <p><span className="text-[#64748B]"> 8</span>   <span className="text-[#8B5CF6]">const</span> <span className="text-[#F1F5F9]">decoded </span><span className="text-[#3B82F6]">=</span> <span className="text-[#8B5CF6]">await</span> <span className="text-[#60A5FA]">verify</span><span className="text-[#F1F5F9]">(token)</span><span className="text-[#64748B]">;</span></p>
          <p><span className="text-[#64748B]"> 9</span>   <span className="text-[#8B5CF6]">const</span> <span className="text-[#F1F5F9]">cached </span><span className="text-[#3B82F6]">=</span> <span className="text-[#8B5CF6]">await</span> <span className="text-[#F1F5F9]">RedisStore.get(decoded.sub)</span><span className="text-[#64748B]">;</span></p>
          <p><span className="text-[#64748B]">10</span>   <span className="text-[#F1F5F9]">req.user </span><span className="text-[#3B82F6]">=</span> <span className="text-[#F1F5F9]">cached ?? decoded</span><span className="text-[#64748B]">;</span></p>
          <p><span className="text-[#64748B]">11</span>   <span className="text-[#60A5FA]">next</span><span className="text-[#F1F5F9]">()</span><span className="text-[#64748B]">;</span></p>
          <p><span className="text-[#64748B]">12</span> <span className="text-[#64748B]">&#125;</span></p>
        </div>
      </div>
    </div>
  );

  const renderTerminal = () => (
    <div className="px-5 mt-4 pb-28">
      {/* Live log viewer */}
      <div className="rounded-2xl overflow-hidden mb-5"
        style={{ background: 'rgba(11,16,32,0.8)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.4)' }}
      >
        <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: '1px solid rgba(30,41,59,0.4)' }}>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse"></div>
            <span className="font-['Work_Sans'] text-[11px] text-[#64748B]">Live Output</span>
          </div>
          <span className="font-['Work_Sans'] text-[10px] text-[#475569]">Home Server</span>
        </div>
        <div className="p-4 font-['IBM_Plex_Mono'] text-[12px] leading-relaxed max-h-[200px] overflow-y-auto">
          <p className="text-[#64748B] mb-1">[14:28:01] <span className="text-[#94A3B8]">Starting api-gateway...</span></p>
          <p className="text-[#64748B] mb-1">[14:28:02] <span className="text-[#94A3B8]">Connecting to postgres:5432...</span></p>
          <p className="text-[#64748B] mb-1">[14:28:03] <span className="text-[#22C55E]">Database connected ✓</span></p>
          <p className="text-[#64748B] mb-1">[14:28:04] <span className="text-[#94A3B8]">Connecting to redis:6379...</span></p>
          <p className="text-[#64748B] mb-1">[14:28:04] <span className="text-[#22C55E]">Redis connected ✓</span></p>
          <p className="text-[#64748B] mb-1">[14:28:05] <span className="text-[#94A3B8]">Server listening on port 3000</span></p>
          <p className="text-[#64748B]">[14:28:05] <span className="text-[#22D3EE]">Ready to accept connections</span></p>
        </div>
      </div>

      {/* Action grid */}
      <h3 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9] mb-3">Quick Actions</h3>
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        {[
          { icon: Icons.Play, label: "Start", color: "#22C55E", bg: "rgba(34,197,94,0.12)" },
          { icon: Icons.Square, label: "Stop", color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
          { icon: Icons.RefreshCw, label: "Restart", color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
          { icon: Icons.Hammer, label: "Rebuild", color: "#8B5CF6", bg: "rgba(139,92,246,0.12)" },
          { icon: Icons.Eye, label: "Inspect", color: "#60A5FA", bg: "rgba(96,165,250,0.12)" },
          { icon: Icons.ShieldCheck, label: "Validate", color: "#22D3EE", bg: "rgba(34,211,238,0.12)" },
        ].map((action, i) => {
          const ActionIcon = action.icon;
          return (
            <button key={i} className="rounded-2xl py-4 flex flex-col items-center gap-2"
              style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: action.bg }}>
                <ActionIcon className="w-5 h-5" style={{ color: action.color }} />
              </div>
              <span className="font-['Work_Sans'] text-[12px] font-medium text-[#F1F5F9]">{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Custom command */}
      <h3 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9] mb-3">Custom Command</h3>
      <div className="rounded-2xl px-4 py-3 flex items-center gap-3"
        style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
      >
        <Icons.Terminal className="w-4 h-4 text-[#64748B]" />
        <span className="font-['IBM_Plex_Mono'] text-[13px] text-[#475569] flex-1">Enter command...</span>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)' }}
        >
          <Icons.Send className="w-3.5 h-3.5 text-white" />
        </button>
      </div>

      {/* Recent commands */}
      <div className="mt-4 space-y-1.5">
        {[
          { cmd: "docker compose logs api --tail 50", time: "5m ago" },
          { cmd: "docker compose restart api", time: "1h ago" },
        ].map((cmd, i) => (
          <div key={i} className="flex items-center gap-3 py-2">
            <Icons.CornerDownLeft className="w-3.5 h-3.5 text-[#475569]" />
            <span className="font-['IBM_Plex_Mono'] text-[11px] text-[#94A3B8] flex-1 truncate">{cmd.cmd}</span>
            <span className="font-['Work_Sans'] text-[10px] text-[#475569]">{cmd.time}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTerminalConfirm = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-sm rounded-2xl p-5"
        style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(245,158,11,0.15)' }}>
          <Icons.AlertTriangle className="w-7 h-7 text-[#F59E0B]" />
        </div>
        <h3 className="font-['Manrope'] text-[18px] font-bold text-[#F1F5F9] text-center mb-2">Restart Service?</h3>
        <p className="font-['Work_Sans'] text-[13px] text-[#64748B] text-center leading-relaxed mb-6">
          This will restart the <span className="text-[#F1F5F9] font-medium">api</span> service on Home Server. Active connections will be interrupted briefly.
        </p>
        <div className="flex gap-3">
          <button className="flex-1 py-3.5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-[#64748B]"
            style={{ background: 'rgba(100,116,139,0.1)' }}
          >
            Cancel
          </button>
          <button className="flex-1 py-3.5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-white"
            style={{ background: '#F59E0B', boxShadow: '0 8px 24px rgba(245,158,11,0.3)' }}
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );

  const renderWorkflow = () => (
    <div className="px-5 mt-4 pb-28 space-y-4">
      {/* Attached workflow card */}
      <div className="rounded-2xl p-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
      >
        <div className="absolute inset-0 rounded-2xl p-[1px]"
          style={{
            background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        ></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 flex items-center justify-center">
                <Icons.Bot className="w-5 h-5 text-[#8B5CF6]" />
              </div>
              <div>
                <p className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">Run Tests</p>
                <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">Template · 3 steps</p>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-lg" style={{ background: 'rgba(139,92,246,0.1)' }}>
              <span className="font-['Work_Sans'] text-[11px] font-medium text-[#8B5CF6]">Change</span>
            </button>
          </div>
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1.5">
              <Icons.Clock className="w-3.5 h-3.5 text-[#64748B]" />
              <span className="font-['Work_Sans'] text-[12px] text-[#64748B]">Every push to main</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div>
              <span className="font-['Work_Sans'] text-[11px] text-[#22C55E]">Active</span>
            </div>
          </div>
          <button className="w-full py-2.5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-white"
            style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)' }}
          >
            Run Now
          </button>
        </div>
      </div>

      {/* Upcoming runs */}
      <div>
        <h3 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9] mb-3">Upcoming Runs</h3>
        <div className="space-y-2">
          {[
            { trigger: "Push to main", time: "When triggered", type: "auto" },
            { trigger: "Scheduled check", time: "Tomorrow 08:00 UTC", type: "scheduled" },
          ].map((run, i) => (
            <div key={i} className="rounded-2xl px-4 py-3 flex items-center gap-3"
              style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: run.type === 'auto' ? 'rgba(59,130,246,0.12)' : 'rgba(139,92,246,0.12)' }}
              >
                {run.type === 'auto' ? <Icons.GitBranch className="w-4 h-4 text-[#3B82F6]" /> : <Icons.Clock className="w-4 h-4 text-[#8B5CF6]" />}
              </div>
              <div className="flex-1">
                <p className="font-['Work_Sans'] text-[13px] text-[#F1F5F9]">{run.trigger}</p>
                <p className="font-['Work_Sans'] text-[11px] text-[#475569]">{run.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Run history */}
      <div>
        <h3 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9] mb-3">Run History</h3>
        <div className="space-y-1.5">
          {[
            { status: "completed", time: "2m ago", duration: "2m 14s", trigger: "Manual" },
            { status: "completed", time: "1h ago", duration: "2m 08s", trigger: "Push" },
            { status: "failed", time: "3h ago", duration: "0m 45s", trigger: "Push" },
            { status: "completed", time: "6h ago", duration: "1m 52s", trigger: "Scheduled" },
          ].map((run, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${run.status === 'completed' ? 'bg-[#22C55E]/15' : 'bg-[#EF4444]/15'}`}>
                {run.status === 'completed' ? <Icons.Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Icons.X className="w-3.5 h-3.5 text-[#EF4444]" />}
              </div>
              <div className="flex-1">
                <p className="font-['Work_Sans'] text-[13px] text-[#F1F5F9]">{run.status === 'completed' ? 'Passed' : 'Failed'}</p>
                <p className="font-['Work_Sans'] text-[11px] text-[#475569]">{run.duration} · {run.trigger}</p>
              </div>
              <span className="font-['Work_Sans'] text-[11px] text-[#64748B]">{run.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWorkflowSelector = () => (
    <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="absolute bottom-0 left-0 right-0 rounded-t-[24px] max-h-[70vh] overflow-y-auto"
        style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)', boxShadow: '0 -8px 40px rgba(0,0,0,0.5)' }}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-[#334155]"></div>
        </div>
        <div className="px-5 pb-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9]">Select Workflow</h3>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(100,116,139,0.15)' }}>
              <Icons.X className="w-4 h-4 text-[#64748B]" />
            </button>
          </div>
          <div className="space-y-2.5">
            {[
              { name: "Run Tests", desc: "Execute test suite", projects: 2, selected: true },
              { name: "Build & Deploy", desc: "Build and deploy to host", projects: 1, selected: false },
              { name: "Inspect Repository", desc: "AI codebase analysis", projects: 0, selected: false },
              { name: "Summarize Logs", desc: "Daily log digest", projects: 1, selected: false },
            ].map((wf, i) => (
              <button key={i} className="w-full rounded-2xl px-4 py-3.5 flex items-center gap-3.5 text-left"
                style={{
                  background: wf.selected ? 'rgba(139,92,246,0.08)' : 'linear-gradient(180deg, #1A2235, #141B2D)',
                  boxShadow: wf.selected ? '0 0 0 1px rgba(139,92,246,0.3)' : '0 4px 16px rgba(0,0,0,0.3)',
                }}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${wf.selected ? 'bg-[#8B5CF6]/15' : 'bg-[#1E293B]/50'}`}>
                  <Icons.Bot className={`w-4.5 h-4.5 ${wf.selected ? 'text-[#8B5CF6]' : 'text-[#64748B]'}`} />
                </div>
                <div className="flex-1">
                  <p className={`font-['Manrope'] text-[13px] font-semibold ${wf.selected ? 'text-[#F1F5F9]' : 'text-[#94A3B8]'}`}>{wf.name}</p>
                  <p className="font-['Work_Sans'] text-[11px] text-[#475569]">{wf.desc} · {wf.projects} projects</p>
                </div>
                {wf.selected && <Icons.Check className="w-4 h-4 text-[#8B5CF6]" />}
              </button>
            ))}
          </div>
          <button className="w-full mt-4 py-3.5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-white"
            style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)' }}
          >
            Create New Workflow
          </button>
        </div>
      </div>
    </div>
  );

  const renderDeploy = () => (
    <div className="px-5 mt-4 pb-28 space-y-3">
      {[
        { name: "api", image: "node:20-alpine", runtime: "running", health: "healthy", cpu: 23, mem: 45, ports: "3000:3000" },
        { name: "postgres", image: "postgres:16", runtime: "running", health: "healthy", cpu: 12, mem: 68, ports: "5432:5432" },
        { name: "redis", image: "redis:7-alpine", runtime: "running", health: "unknown", cpu: 3, mem: 15, ports: "6379:6379" },
      ].map((svc, i) => (
        <div key={i} className="rounded-2xl p-4"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#3B82F6]/12 flex items-center justify-center">
                <Icons.Container className="w-4.5 h-4.5 text-[#3B82F6]" />
              </div>
              <div>
                <p className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">{svc.name}</p>
                <p className="font-['Work_Sans'] text-[11px] text-[#475569]">{svc.image}</p>
              </div>
            </div>
            <Icons.ChevronRight className="w-4 h-4 text-[#475569]" />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className={`font-['Work_Sans'] text-[10px] font-medium px-2 py-0.5 rounded-full ${
              svc.runtime === 'running' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#64748B]/10 text-[#64748B]'
            }`}>
              {svc.runtime}
            </span>
            <span className={`font-['Work_Sans'] text-[10px] font-medium px-2 py-0.5 rounded-full ${
              svc.health === 'healthy' ? 'bg-[#22C55E]/10 text-[#22C55E]' : svc.health === 'unknown' ? 'bg-[#64748B]/10 text-[#64748B]' : 'bg-[#EF4444]/10 text-[#EF4444]'
            }`}>
              {svc.health}
            </span>
            <span className="font-['IBM_Plex_Mono'] text-[10px] text-[#475569] ml-auto">{svc.ports}</span>
          </div>
          {/* Resource mini-bars */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-['Work_Sans'] text-[10px] text-[#475569]">CPU</span>
                <span className="font-['Work_Sans'] text-[10px] text-[#64748B]">{svc.cpu}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#0B1020] overflow-hidden">
                <div className="h-full rounded-full" style={{
                  width: `${svc.cpu}%`,
                  background: svc.cpu > 70 ? '#EF4444' : svc.cpu > 40 ? '#F59E0B' : '#22C55E',
                }}></div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-['Work_Sans'] text-[10px] text-[#475569]">MEM</span>
                <span className="font-['Work_Sans'] text-[10px] text-[#64748B]">{svc.mem}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#0B1020] overflow-hidden">
                <div className="h-full rounded-full" style={{
                  width: `${svc.mem}%`,
                  background: svc.mem > 70 ? '#EF4444' : svc.mem > 40 ? '#F59E0B' : '#22C55E',
                }}></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDeployActionConfirm = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-sm rounded-2xl p-5"
        style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(239,68,68,0.15)' }}>
          <Icons.Square className="w-7 h-7 text-[#EF4444]" />
        </div>
        <h3 className="font-['Manrope'] text-[18px] font-bold text-[#F1F5F9] text-center mb-2">Stop Service?</h3>
        <p className="font-['Work_Sans'] text-[13px] text-[#64748B] text-center leading-relaxed mb-6">
          This will stop the <span className="text-[#F1F5F9] font-medium">api</span> container. All active connections will be terminated and data in memory will be lost.
        </p>
        <div className="flex gap-3">
          <button className="flex-1 py-3.5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-[#64748B]"
            style={{ background: 'rgba(100,116,139,0.1)' }}
          >
            Cancel
          </button>
          <button className="flex-1 py-3.5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-white"
            style={{ background: '#EF4444', boxShadow: '0 8px 24px rgba(239,68,68,0.3)' }}
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );

  const renderLogs = () => (
    <div className="px-5 mt-4 pb-28">
      {/* Log type tabs */}
      <div className="flex gap-2 mb-4">
        {["Activity", "Execution"].map((tab, i) => (
          <button key={i} className="px-4 py-2 rounded-xl font-['Work_Sans'] text-[12px] font-medium"
            style={{
              background: i === 0 ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : 'rgba(100,116,139,0.1)',
              color: i === 0 ? 'white' : '#64748B',
            }}
          >
            {tab}
          </button>
        ))}
        <button className="ml-auto px-3 py-2 rounded-xl flex items-center gap-1.5"
          style={{ background: 'rgba(100,116,139,0.1)' }}
        >
          <Icons.Filter className="w-3.5 h-3.5 text-[#64748B]" />
          <span className="font-['Work_Sans'] text-[11px] text-[#64748B]">Filter</span>
        </button>
      </div>

      {/* Log entries */}
      <div className="space-y-2">
        {[
          { type: "workflow_completed", msg: "Run Tests passed all 142 tests", severity: "info", time: "2m ago", source: "workflow" },
          { type: "deploy_completed", msg: "api service deployed successfully", severity: "info", time: "8m ago", source: "deployment" },
          { type: "terminal_command", msg: "docker compose restart api", severity: "info", time: "1h ago", source: "terminal" },
          { type: "host_agent", msg: "Health check completed — all services healthy", severity: "info", time: "2h ago", source: "host_agent" },
          { type: "workflow_failed", msg: "Build failed — exit code 1", severity: "error", time: "3h ago", source: "workflow" },
          { type: "deploy_started", msg: "Deploying web-app to staging", severity: "info", time: "4h ago", source: "deployment" },
        ].map((log, i) => (
          <div key={i} className="rounded-xl px-4 py-3"
            style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`font-['Work_Sans'] text-[10px] font-medium px-2 py-0.5 rounded-full ${
                log.source === 'workflow' ? 'bg-[#8B5CF6]/10 text-[#8B5CF6]' :
                log.source === 'deployment' ? 'bg-[#3B82F6]/10 text-[#3B82F6]' :
                log.source === 'terminal' ? 'bg-[#22D3EE]/10 text-[#22D3EE]' :
                'bg-[#64748B]/10 text-[#64748B]'
              }`}>
                {log.source}
              </span>
              <span className={`font-['Work_Sans'] text-[10px] font-medium px-2 py-0.5 rounded-full ${
                log.severity === 'error' ? 'bg-[#EF4444]/10 text-[#EF4444]' : 'bg-[#22C55E]/10 text-[#22C55E]'
              }`}>
                {log.severity}
              </span>
              <span className="font-['Work_Sans'] text-[10px] text-[#475569] ml-auto">{log.time}</span>
            </div>
            <p className="font-['Work_Sans'] text-[12px] text-[#94A3B8] leading-relaxed">{log.msg}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLogsFilter = () => (
    <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="absolute bottom-0 left-0 right-0 rounded-t-[24px]"
        style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)', boxShadow: '0 -8px 40px rgba(0,0,0,0.5)' }}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-[#334155]"></div>
        </div>
        <div className="px-5 pb-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9]">Filter Logs</h3>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(100,116,139,0.15)' }}>
              <Icons.X className="w-4 h-4 text-[#64748B]" />
            </button>
          </div>

          {/* Source filter */}
          <p className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9] mb-2.5">Source</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {["All", "Workflow", "Deployment", "Terminal", "Host Agent"].map((src, i) => (
              <button key={i} className="px-3.5 py-1.5 rounded-full font-['Work_Sans'] text-[12px] font-medium"
                style={{ background: i === 0 ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : 'rgba(100,116,139,0.1)', color: i === 0 ? 'white' : '#64748B' }}
              >
                {src}
              </button>
            ))}
          </div>

          {/* Severity filter */}
          <p className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9] mb-2.5">Severity</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { label: "All", active: true },
              { label: "Info", color: "#22C55E", active: false },
              { label: "Warning", color: "#F59E0B", active: false },
              { label: "Error", color: "#EF4444", active: false },
            ].map((sev, i) => (
              <button key={i} className="px-3.5 py-1.5 rounded-full font-['Work_Sans'] text-[12px] font-medium"
                style={{ background: sev.active ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : 'rgba(100,116,139,0.1)', color: sev.active ? 'white' : (sev.color || '#64748B') }}
              >
                {sev.label}
              </button>
            ))}
          </div>

          {/* Time range */}
          <p className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9] mb-2.5">Time Range</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {["1h", "6h", "24h", "7d", "30d"].map((range, i) => (
              <button key={i} className="px-3.5 py-1.5 rounded-full font-['Work_Sans'] text-[12px] font-medium"
                style={{ background: i === 2 ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : 'rgba(100,116,139,0.1)', color: i === 2 ? 'white' : '#64748B' }}
              >
                {range}
              </button>
            ))}
          </div>

          <button className="w-full py-3.5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-white"
            style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)' }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="fixed inset-0 z-50" style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)' }}>
      <header className="flex items-center justify-between px-5 pt-5 pb-3">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.ArrowLeft className="w-5 h-5 text-[#64748B]" />
        </button>
        <h3 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">Project Stats</h3>
        <div className="w-10"></div>
      </header>
      <div className="px-5 pb-8 space-y-4 overflow-y-auto">
        {/* Build times */}
        <div className="rounded-2xl p-4"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">Build Times</span>
            <span className="font-['Work_Sans'] text-[11px] text-[#64748B]">Last 12 runs</span>
          </div>
          <div className="flex items-end gap-1.5 h-24">
            {[45, 52, 48, 65, 42, 55, 38, 60, 50, 47, 43, 41].map((v, i) => (
              <div key={i} className="flex-1 rounded-t-sm" style={{
                height: `${(v / 65) * 100}%`,
                background: 'linear-gradient(180deg, #3B82F6, rgba(59,130,246,0.2))',
              }}></div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="font-['Work_Sans'] text-[11px] text-[#64748B]">Avg: 48s</span>
            <span className="font-['Work_Sans'] text-[11px] text-[#22C55E]">↓ 12% faster</span>
          </div>
        </div>

        {/* Success rate */}
        <div className="rounded-2xl p-4"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">Success Rate</span>
            <span className="font-['Manrope'] text-[20px] font-bold text-[#22C55E]">94%</span>
          </div>
          <div className="flex gap-1 h-8 items-end">
            {[65, 80, 90, 70, 95, 88, 92, 100, 85, 94, 90, 96].map((v, i) => (
              <div key={i} className="flex-1 rounded-sm" style={{
                height: `${v}%`,
                background: v >= 90 ? 'linear-gradient(180deg, #22C55E, rgba(34,197,94,0.3))' : v >= 70 ? 'linear-gradient(180deg, #3B82F6, rgba(59,130,246,0.3))' : 'linear-gradient(180deg, #F59E0B, rgba(245,158,11,0.3))',
              }}></div>
            ))}
          </div>
        </div>

        {/* Resource usage */}
        <div className="rounded-2xl p-4"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
        >
          <span className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9] block mb-4">Resource Usage</span>
          {[
            { label: "CPU", value: 23, max: 100, color: "#3B82F6" },
            { label: "Memory", value: 45, max: 100, color: "#8B5CF6" },
            { label: "Disk", value: 62, max: 100, color: "#22D3EE" },
          ].map((res, i) => (
            <div key={i} className="mb-3 last:mb-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-['Work_Sans'] text-[12px] text-[#94A3B8]">{res.label}</span>
                <span className="font-['Work_Sans'] text-[12px] font-medium text-[#F1F5F9]">{res.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#0B1020] overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${res.value}%`, background: res.color }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 z-40"
      style={{ background: 'linear-gradient(180deg, rgba(13,20,36,0.95), #0D1424)', borderTop: '1px solid rgba(30,41,59,0.5)' }}
    >
      <div className="flex items-center justify-around px-2 pt-2 pb-7">
        {[
          { id: "hub", label: "Hub", icon: Icons.LayoutDashboard },
          { id: "projects", label: "Projects", icon: Icons.FolderKanban },
          { id: "agents", label: "Agents", icon: Icons.Bot },
          { id: "deploy", label: "Deploy", icon: Icons.Rocket },
        ].map((tab) => {
          const isActive = tab.id === "projects";
          const TabIcon = tab.icon;
          return (
            <button key={tab.id} className="flex flex-col items-center gap-1 py-1 px-4 relative">
              {isActive && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)' }}
                ></div>
              )}
              <TabIcon className={`w-5 h-5 ${isActive ? 'text-[#3B82F6]' : 'text-[#475569]'}`} />
              <span className={`font-['Work_Sans'] text-[10px] font-medium ${isActive ? 'text-[#3B82F6]' : 'text-[#475569]'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen font-['Work_Sans'] text-[#F1F5F9] flex flex-col"
      style={{ background: 'linear-gradient(180deg, #0D1424 0%, #0B1020 100%)' }}
    >
      {renderHeader()}
      {renderTabs()}

      <div className="flex-1 overflow-y-auto">
        {state === "overview" && renderOverview()}
        {state === "repository" && renderRepository()}
        {state === "terminal" && renderTerminal()}
        {state === "workflow" && renderWorkflow()}
        {state === "deploy" && renderDeploy()}
        {state === "logs" && renderLogs()}
      </div>

      {/* Overlay states */}
      {state === "fileViewer" && renderFileViewer()}
      {state === "terminalConfirm" && (
        <>
          <div className="flex-1 overflow-y-auto opacity-30 pointer-events-none">{renderTerminal()}</div>
          {renderTerminalConfirm()}
        </>
      )}
      {state === "workflowSelector" && (
        <>
          <div className="flex-1 overflow-y-auto opacity-30 pointer-events-none">{renderWorkflow()}</div>
          {renderWorkflowSelector()}
        </>
      )}
      {state === "deployActionConfirm" && (
        <>
          <div className="flex-1 overflow-y-auto opacity-30 pointer-events-none">{renderDeploy()}</div>
          {renderDeployActionConfirm()}
        </>
      )}
      {state === "logsFilter" && (
        <>
          <div className="flex-1 overflow-y-auto opacity-30 pointer-events-none">{renderLogs()}</div>
          {renderLogsFilter()}
        </>
      )}
      {state === "stats" && renderStats()}

      {renderBottomNav()}
    </div>
  );
};

export default ProjectDetailScreen;