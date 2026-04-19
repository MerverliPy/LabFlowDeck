import React from "react";
import * as Icons from "lucide-react";

export interface HostDetailScreenProps {
  state: string;
}

/**
 * States:
 * - default: Host Overview — The main view displaying system info, connection health, resource usage, agent logs, and associated projects.
 * - resourceDetail: Resource Detail Sheet — A bottom sheet showing expanded history of CPU, Memory, and Disk usage.
 * - editModal: Edit Host Configuration — A modal form for updating host name, Tailscale IP, or SSH settings.
 * - removeConfirm: Remove Host Confirmation — A confirmation dialog warning about removal and impact on projects.
 */
const HostDetailScreen: React.FC<HostDetailScreenProps> = ({ state }) => {

  const renderHeader = () => (
    <header className="px-5 pt-4 pb-2">
      <div className="flex items-center justify-between mb-4">
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

      {/* Host hero */}
      <div className="flex flex-col items-center mb-2">
        <div className="w-20 h-20 rounded-full flex items-center justify-center font-['Manrope'] text-[24px] font-bold text-[#F1F5F9] mb-3"
          style={{
            background: 'linear-gradient(180deg, #1A2235, #141B2D)',
            border: '3px solid #22C55E',
            boxShadow: '0 0 24px rgba(34,197,94,0.2), 0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          HS
        </div>
        <h1 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9]">Home Server</h1>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="font-['Work_Sans'] text-[12px] font-medium px-2.5 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6]">Agent</span>
          <span className="font-['Work_Sans'] text-[12px] font-medium px-2.5 py-1 rounded-full bg-[#22C55E]/10 text-[#22C55E]">Active</span>
        </div>
      </div>
    </header>
  );

  const renderSystemInfo = () => (
    <div className="px-5 mt-4">
      <h2 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9] mb-3">System Info</h2>
      <div className="rounded-2xl p-4"
        style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
      >
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "OS", value: "Ubuntu 22.04", icon: Icons.Monitor },
            { label: "Agent", value: "v2.1.4", icon: Icons.Cpu },
            { label: "Docker", value: "24.0.7", icon: Icons.Container },
            { label: "Compose", value: "2.23.3", icon: Icons.Layers },
          ].map((info, i) => {
            const InfoIcon = info.icon;
            return (
              <div key={i} className="rounded-xl px-3 py-2.5"
                style={{ background: 'rgba(11,16,32,0.6)' }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <InfoIcon className="w-3 h-3 text-[#475569]" />
                  <span className="font-['Work_Sans'] text-[10px] text-[#475569]">{info.label}</span>
                </div>
                <p className="font-['Work_Sans'] text-[13px] font-medium text-[#F1F5F9]">{info.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderConnectionHealth = () => (
    <div className="px-5 mt-5">
      <h2 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9] mb-3">Connection Health</h2>
      <div className="rounded-2xl p-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
      >
        <div className="absolute inset-0 rounded-2xl p-[1px]"
          style={{
            background: 'linear-gradient(135deg, #22C55E, #3B82F6)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        ></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse"></div>
              <span className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">Connected</span>
            </div>
            <span className="font-['Work_Sans'] text-[11px] text-[#22C55E]">Healthy</span>
          </div>
          <div className="space-y-3">
            {[
              { label: "Latency", value: "12ms", icon: Icons.Activity },
              { label: "Last Heartbeat", value: "14s ago", icon: Icons.Heart },
              { label: "Uptime", value: "99.97%", icon: Icons.Clock },
              { label: "Public Key", value: "SHA256:a4f2...c8e1", icon: Icons.Key },
            ].map((item, i) => {
              const ItemIcon = item.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.1)' }}>
                    <ItemIcon className="w-3.5 h-3.5 text-[#22C55E]" />
                  </div>
                  <span className="font-['Work_Sans'] text-[12px] text-[#64748B] flex-1">{item.label}</span>
                  <span className="font-['Work_Sans'] text-[12px] font-medium text-[#F1F5F9]">{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderResourceUsage = () => (
    <div className="px-5 mt-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">Resource Usage</h2>
        <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg" style={{ background: 'rgba(59,130,246,0.1)' }}>
          <Icons.Maximize2 className="w-3 h-3 text-[#3B82F6]" />
          <span className="font-['Work_Sans'] text-[11px] text-[#3B82F6]">Detail</span>
        </button>
      </div>
      <div className="space-y-2.5">
        {[
          { label: "CPU", value: 23, color: "#3B82F6", icon: Icons.Cpu },
          { label: "Memory", value: 45, color: "#8B5CF6", icon: Icons.HardDrive },
          { label: "Disk", value: 62, color: "#22D3EE", icon: Icons.Database },
        ].map((res, i) => {
          const ResIcon = res.icon;
          return (
            <div key={i} className="rounded-2xl px-4 py-3.5"
              style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${res.color}15` }}>
                    <ResIcon className="w-4 h-4" style={{ color: res.color }} />
                  </div>
                  <span className="font-['Work_Sans'] text-[13px] text-[#F1F5F9]">{res.label}</span>
                </div>
                <span className="font-['Manrope'] text-[15px] font-bold text-[#F1F5F9]">{res.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#0B1020] overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${res.value}%`, background: res.color }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAgentLogs = () => (
    <div className="px-5 mt-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">Agent Logs</h2>
        <div className="flex gap-1.5">
          {["All", "Warning", "Error"].map((f, i) => (
            <button key={i} className="px-2.5 py-1 rounded-lg font-['Work_Sans'] text-[10px] font-medium"
              style={{ background: i === 0 ? 'rgba(59,130,246,0.12)' : 'rgba(100,116,139,0.1)', color: i === 0 ? '#3B82F6' : '#64748B' }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden"
        style={{ background: 'rgba(11,16,32,0.8)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)' }}
      >
        <div className="p-3.5 font-['IBM_Plex_Mono'] text-[11px] leading-relaxed max-h-[140px] overflow-y-auto space-y-1">
          <p><span className="text-[#475569]">[14:28:01]</span> <span className="text-[#94A3B8]">Agent heartbeat received</span></p>
          <p><span className="text-[#475569]">[14:27:31]</span> <span className="text-[#94A3B8]">Docker health check passed</span></p>
          <p><span className="text-[#475569]">[14:27:01]</span> <span className="text-[#94A3B8]">Compose services: 3 running, 0 stopped</span></p>
          <p><span className="text-[#475569]">[14:26:31]</span> <span className="text-[#F59E0B]">Memory usage above 40% threshold</span></p>
          <p><span className="text-[#475569]">[14:26:01]</span> <span className="text-[#94A3B8]">Agent heartbeat received</span></p>
          <p><span className="text-[#475569]">[14:25:31]</span> <span className="text-[#94A3B8]">Disk cleanup completed</span></p>
        </div>
      </div>
    </div>
  );

  const renderAssociatedProjects = () => (
    <div className="px-5 mt-5 pb-28">
      <h2 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9] mb-3">Associated Projects</h2>
      <div className="space-y-2">
        {[
          { name: "api-gateway", repo: "my-org/api-gateway", status: "running" },
          { name: "web-app", repo: "my-org/web-app", status: "running" },
        ].map((proj, i) => (
          <div key={i} className="rounded-2xl px-4 py-3.5 flex items-center gap-3"
            style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
          >
            <div className="w-9 h-9 rounded-xl bg-[#3B82F6]/12 flex items-center justify-center">
              <Icons.FolderKanban className="w-4.5 h-4.5 text-[#3B82F6]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">{proj.name}</p>
              <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">{proj.repo}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div>
              <span className="font-['Work_Sans'] text-[10px] text-[#22C55E]">{proj.status}</span>
            </div>
            <Icons.ChevronRight className="w-4 h-4 text-[#475569]" />
          </div>
        ))}
      </div>
    </div>
  );

  const renderActions = () => (
    <div className="px-5 mt-5 pb-28 space-y-2.5">
      <h2 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9] mb-1">Actions</h2>
      {[
        { icon: Icons.RefreshCw, label: "Reconnect", color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
        { icon: Icons.Settings, label: "Edit Configuration", color: "#8B5CF6", bg: "rgba(139,92,246,0.12)" },
        { icon: Icons.Trash2, label: "Remove Host", color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
      ].map((action, i) => {
        const ActionIcon = action.icon;
        return (
          <button key={i} className="w-full rounded-2xl px-4 py-3.5 flex items-center gap-3 text-left"
            style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: action.bg }}>
              <ActionIcon className="w-4.5 h-4.5" style={{ color: action.color }} />
            </div>
            <span className="font-['Manrope'] text-[14px] font-medium text-[#F1F5F9]">{action.label}</span>
            <Icons.ChevronRight className="w-4 h-4 text-[#475569] ml-auto" />
          </button>
        );
      })}
    </div>
  );

  const renderResourceDetailSheet = () => (
    <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="absolute bottom-0 left-0 right-0 rounded-t-[24px] max-h-[80vh] overflow-y-auto"
        style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)', boxShadow: '0 -8px 40px rgba(0,0,0,0.5)' }}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-[#334155]"></div>
        </div>
        <div className="px-5 pb-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9]">Resource History</h3>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(100,116,139,0.15)' }}>
              <Icons.X className="w-4 h-4 text-[#64748B]" />
            </button>
          </div>

          {/* Time range */}
          <div className="flex gap-2 mb-5">
            {["1h", "6h", "24h", "7d"].map((range, i) => (
              <button key={i} className="px-3.5 py-1.5 rounded-full font-['Work_Sans'] text-[11px] font-medium"
                style={{ background: i === 2 ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : 'rgba(100,116,139,0.1)', color: i === 2 ? 'white' : '#64748B' }}
              >
                {range}
              </button>
            ))}
          </div>

          {/* CPU chart */}
          <div className="rounded-2xl p-4 mb-3"
            style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icons.Cpu className="w-4 h-4 text-[#3B82F6]" />
                <span className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">CPU</span>
              </div>
              <span className="font-['Manrope'] text-[15px] font-bold text-[#3B82F6]">23%</span>
            </div>
            <div className="flex items-end gap-0.5 h-16">
              {[18, 22, 25, 20, 28, 35, 42, 38, 30, 25, 22, 20, 19, 23, 21, 18, 24, 28, 22, 20, 23, 19, 21, 23].map((v, i) => (
                <div key={i} className="flex-1 rounded-t-sm" style={{
                  height: `${(v / 45) * 100}%`,
                  background: v > 35 ? 'linear-gradient(180deg, #F59E0B, rgba(245,158,11,0.2))' : 'linear-gradient(180deg, #3B82F6, rgba(59,130,246,0.2))',
                }}></div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="font-['Work_Sans'] text-[10px] text-[#475569]">24h ago</span>
              <span className="font-['Work_Sans'] text-[10px] text-[#475569]">Now</span>
            </div>
          </div>

          {/* Memory chart */}
          <div className="rounded-2xl p-4 mb-3"
            style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icons.HardDrive className="w-4 h-4 text-[#8B5CF6]" />
                <span className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">Memory</span>
              </div>
              <span className="font-['Manrope'] text-[15px] font-bold text-[#8B5CF6]">45%</span>
            </div>
            <div className="flex items-end gap-0.5 h-16">
              {[38, 40, 42, 44, 48, 52, 55, 50, 46, 44, 42, 40, 39, 41, 43, 45, 44, 42, 40, 43, 45, 44, 43, 45].map((v, i) => (
                <div key={i} className="flex-1 rounded-t-sm" style={{
                  height: `${(v / 60) * 100}%`,
                  background: v > 50 ? 'linear-gradient(180deg, #F59E0B, rgba(245,158,11,0.2))' : 'linear-gradient(180deg, #8B5CF6, rgba(139,92,246,0.2))',
                }}></div>
              ))}
            </div>
          </div>

          {/* Disk chart */}
          <div className="rounded-2xl p-4"
            style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icons.Database className="w-4 h-4 text-[#22D3EE]" />
                <span className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">Disk</span>
              </div>
              <span className="font-['Manrope'] text-[15px] font-bold text-[#22D3EE]">62%</span>
            </div>
            <div className="flex items-end gap-0.5 h-16">
              {[58, 58, 59, 59, 60, 60, 60, 61, 61, 61, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62].map((v, i) => (
                <div key={i} className="flex-1 rounded-t-sm" style={{
                  height: `${(v / 70) * 100}%`,
                  background: 'linear-gradient(180deg, #22D3EE, rgba(34,211,238,0.2))',
                }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEditModal = () => (
    <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
      <div className="absolute bottom-0 left-0 right-0 rounded-t-[24px] max-h-[85vh] overflow-y-auto"
        style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)', boxShadow: '0 -8px 40px rgba(0,0,0,0.5)' }}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-[#334155]"></div>
        </div>
        <div className="px-5 pb-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9]">Edit Host</h3>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(100,116,139,0.15)' }}>
              <Icons.X className="w-4 h-4 text-[#64748B]" />
            </button>
          </div>

          {/* Form fields */}
          <div className="space-y-4 mb-8">
            <div>
              <label className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-1.5 block">Host Name</label>
              <div className="rounded-xl px-4 py-3"
                style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
              >
                <span className="font-['Work_Sans'] text-[15px] text-[#F1F5F9]">Home Server</span>
              </div>
            </div>
            <div>
              <label className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-1.5 block">Tailscale IP</label>
              <div className="rounded-xl px-4 py-3"
                style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
              >
                <span className="font-['IBM_Plex_Mono'] text-[13px] text-[#F1F5F9]">100.64.0.2</span>
              </div>
            </div>
            <div>
              <label className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-1.5 block">Connection Mode</label>
              <div className="rounded-xl px-4 py-3 flex items-center justify-between"
                style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
              >
                <div className="flex items-center gap-2">
                  <Icons.Cpu className="w-4 h-4 text-[#3B82F6]" />
                  <span className="font-['Work_Sans'] text-[13px] text-[#F1F5F9]">Agent-Based</span>
                </div>
                <Icons.ChevronDown className="w-4 h-4 text-[#64748B]" />
              </div>
            </div>

            {/* SSH override section */}
            <div className="pt-2" style={{ borderTop: '1px solid rgba(100,116,139,0.1)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">SSH Override</span>
                <div className="w-10 h-5.5 rounded-full flex items-center justify-end px-0.5"
                  style={{ background: '#1E293B' }}
                >
                  <div className="w-4.5 h-4.5 rounded-full bg-[#64748B] shadow-sm"></div>
                </div>
              </div>
              <p className="font-['Work_Sans'] text-[11px] text-[#475569]">Override agent connection with manual SSH settings</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 py-3.5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-[#64748B]"
              style={{ background: 'rgba(100,116,139,0.1)' }}
            >
              Cancel
            </button>
            <button className="flex-1 py-3.5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-white"
              style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)' }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRemoveConfirm = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-sm rounded-2xl p-5"
        style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(239,68,68,0.15)' }}>
          <Icons.AlertTriangle className="w-7 h-7 text-[#EF4444]" />
        </div>
        <h3 className="font-['Manrope'] text-[18px] font-bold text-[#F1F5F9] text-center mb-2">Remove Host?</h3>
        <p className="font-['Work_Sans'] text-[13px] text-[#64748B] text-center leading-relaxed mb-2">
          This will permanently remove <span className="text-[#F1F5F9] font-medium">Home Server</span> from your account.
        </p>
        <div className="rounded-xl px-4 py-3 mb-6" style={{ background: 'rgba(239,68,68,0.06)' }}>
          <div className="flex items-center gap-2 mb-1.5">
            <Icons.AlertCircle className="w-4 h-4 text-[#EF4444]" />
            <span className="font-['Manrope'] text-[12px] font-semibold text-[#EF4444]">Impact Warning</span>
          </div>
          <p className="font-['Work_Sans'] text-[12px] text-[#94A3B8] leading-relaxed">
            2 projects are currently using this host. Removing it will disconnect their deployments and workflows.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 py-3.5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-[#64748B]"
            style={{ background: 'rgba(100,116,139,0.1)' }}
          >
            Cancel
          </button>
          <button className="flex-1 py-3.5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-white"
            style={{ background: '#EF4444', boxShadow: '0 8px 24px rgba(239,68,68,0.3)' }}
          >
            Remove
          </button>
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
          const isActive = tab.id === "hub";
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
      <div className="flex-1 overflow-y-auto pb-4">
        {renderHeader()}
        {renderSystemInfo()}
        {renderConnectionHealth()}
        {renderResourceUsage()}
        {renderAgentLogs()}
        {renderAssociatedProjects()}
        {renderActions()}
      </div>

      {renderBottomNav()}

      {/* Overlay states */}
      {state === "resourceDetail" && renderResourceDetailSheet()}
      {state === "editModal" && renderEditModal()}
      {state === "removeConfirm" && renderRemoveConfirm()}
    </div>
  );
};

export default HostDetailScreen;