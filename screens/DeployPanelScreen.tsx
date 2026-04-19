import React from "react";
import * as Icons from "lucide-react";

export interface DeployPanelScreenProps {
  state: string;
}

/**
 * States:
 * - default: Deployment List — List view of deployment cards grouped by project, showing aggregate status and resource usage.
 * - serviceDetail: Service Detail View — Expanded view of a specific service with status badges, resource metrics, port mappings, and log preview.
 * - serviceLogs: Service Logs Modal — Full-screen modal showing detailed logs for the selected service.
 * - deployConfirm: Deploy Confirmation Dialog — A confirmation dialog showing a summary of changes before deploying.
 * - resourceDetail: Resource Detail Sheet — A bottom sheet showing expanded resource metrics and health check details.
 * - actionConfirm: Service Action Confirmation — A confirmation dialog for a destructive action like Stop or Restart.
 */
const DeployPanelScreen: React.FC<DeployPanelScreenProps> = ({ state }) => {

  const renderHeader = () => (
    <header className="flex items-center justify-between px-5 pt-4 pb-2">
      <div>
        <h1 className="font-['Manrope'] text-[32px] font-bold text-[#F1F5F9] leading-tight tracking-tight">Deploy</h1>
        <p className="font-['Work_Sans'] text-[13px] text-[#64748B] mt-0.5">Docker & Compose management</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #1A2235, #141B2D)' }}
        >
          <Icons.Filter className="w-5 h-5 text-[#64748B]" />
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#3B82F6]/30">
          <img
            src="./images/avatar-user.jpg"
            alt="A 30-year-old male software engineer with short dark hair and a calm expression, wearing a dark hoodie, soft studio lighting, neutral background"
            data-context="User avatar in a small circular container"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );

  const renderDeploymentList = () => (
    <div className="px-5 mt-4 pb-28">
      {/* Filter pills */}
      <div className="flex gap-2 mb-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {["All", "Running", "Stopped", "Unhealthy"].map((filter, i) => (
          <button key={i} className="px-4 py-2 rounded-full font-['Work_Sans'] text-[12px] font-medium whitespace-nowrap"
            style={{ background: i === 0 ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : 'rgba(100,116,139,0.1)', color: i === 0 ? 'white' : '#64748B' }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Deployment cards */}
      <div className="space-y-3">
        {[
          { project: "api-gateway", services: 3, running: 3, status: "healthy", cpu: 23, mem: 45 },
          { project: "web-app", services: 2, running: 2, status: "healthy", cpu: 18, mem: 32 },
          { project: "worker-service", services: 1, running: 0, status: "stopped", cpu: 0, mem: 0 },
        ].map((dep, i) => (
          <div key={i} className="rounded-2xl p-4 relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
          >
            {/* Left edge status indicator */}
            <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
              style={{ background: dep.status === 'healthy' ? '#22C55E' : dep.status === 'stopped' ? '#64748B' : '#EF4444' }}
            ></div>

            <div className="relative z-10 pl-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    dep.status === 'healthy' ? 'bg-[#22C55E]/12' : dep.status === 'stopped' ? 'bg-[#64748B]/12' : 'bg-[#EF4444]/12'
                  }`}>
                    <Icons.Container className={`w-4.5 h-4.5 ${
                      dep.status === 'healthy' ? 'text-[#22C55E]' : dep.status === 'stopped' ? 'text-[#64748B]' : 'text-[#EF4444]'
                    }`} />
                  </div>
                  <div>
                    <p className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">{dep.project}</p>
                    <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">{dep.running}/{dep.services} services running</p>
                  </div>
                </div>
                <span className={`font-['Work_Sans'] text-[10px] font-medium px-2.5 py-1 rounded-full ${
                  dep.status === 'healthy' ? 'bg-[#22C55E]/10 text-[#22C55E]' : dep.status === 'stopped' ? 'bg-[#64748B]/10 text-[#64748B]' : 'bg-[#EF4444]/10 text-[#EF4444]'
                }`}>
                  {dep.status.charAt(0).toUpperCase() + dep.status.slice(1)}
                </span>
              </div>

              {/* Resource usage mini-bars */}
              {dep.status !== 'stopped' && (
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-['Work_Sans'] text-[10px] text-[#475569]">CPU</span>
                      <span className="font-['Work_Sans'] text-[10px] text-[#64748B]">{dep.cpu}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#0B1020] overflow-hidden">
                      <div className="h-full rounded-full" style={{
                        width: `${dep.cpu}%`,
                        background: dep.cpu > 70 ? '#EF4444' : dep.cpu > 40 ? '#F59E0B' : '#22C55E',
                      }}></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-['Work_Sans'] text-[10px] text-[#475569]">MEM</span>
                      <span className="font-['Work_Sans'] text-[10px] text-[#64748B]">{dep.mem}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#0B1020] overflow-hidden">
                      <div className="h-full rounded-full" style={{
                        width: `${dep.mem}%`,
                        background: dep.mem > 70 ? '#EF4444' : dep.mem > 40 ? '#F59E0B' : '#22C55E',
                      }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderServiceDetail = () => (
    <div className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)' }}
    >
      <header className="flex items-center justify-between px-5 pt-5 pb-3">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.ArrowLeft className="w-5 h-5 text-[#64748B]" />
        </button>
        <h3 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">Service Detail</h3>
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.MoreVertical className="w-5 h-5 text-[#64748B]" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {/* Service header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/12 flex items-center justify-center">
            <Icons.Container className="w-6 h-6 text-[#3B82F6]" />
          </div>
          <div>
            <h2 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9]">api</h2>
            <p className="font-['Work_Sans'] text-[12px] text-[#64748B]">node:20-alpine · api-gateway</p>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-2 mb-5">
          <span className="font-['Work_Sans'] text-[11px] font-medium px-3 py-1.5 rounded-full bg-[#22C55E]/10 text-[#22C55E]">
            Running
          </span>
          <span className="font-['Work_Sans'] text-[11px] font-medium px-3 py-1.5 rounded-full bg-[#22C55E]/10 text-[#22C55E]">
            Healthy
          </span>
          <span className="font-['IBM_Plex_Mono'] text-[11px] text-[#475569] ml-auto">3000:3000</span>
        </div>

        {/* Resource metrics */}
        <div className="rounded-2xl p-4 mb-4"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">Resources</span>
            <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg" style={{ background: 'rgba(59,130,246,0.1)' }}>
              <Icons.Maximize2 className="w-3 h-3 text-[#3B82F6]" />
              <span className="font-['Work_Sans'] text-[10px] text-[#3B82F6]">Detail</span>
            </button>
          </div>
          {[
            { label: "CPU", value: 23, color: "#3B82F6" },
            { label: "Memory", value: 45, color: "#8B5CF6" },
            { label: "Network I/O", value: 12, color: "#22D3EE" },
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

        {/* Port mappings */}
        <div className="rounded-2xl p-4 mb-4"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
        >
          <span className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9] block mb-3">Port Mappings</span>
          <div className="space-y-2">
            {[
              { host: "3000", container: "3000", protocol: "TCP" },
              { host: "9229", container: "9229", protocol: "TCP" },
            ].map((port, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl" style={{ background: 'rgba(11,16,32,0.6)' }}>
                <span className="font-['IBM_Plex_Mono'] text-[12px] text-[#3B82F6]">{port.host}</span>
                <Icons.ArrowRight className="w-3 h-3 text-[#475569]" />
                <span className="font-['IBM_Plex_Mono'] text-[12px] text-[#F1F5F9]">{port.container}</span>
                <span className="font-['Work_Sans'] text-[10px] text-[#475569] ml-auto">{port.protocol}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Log preview */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">Recent Logs</span>
            <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg" style={{ background: 'rgba(59,130,246,0.1)' }}>
              <Icons.ScrollText className="w-3 h-3 text-[#3B82F6]" />
              <span className="font-['Work_Sans'] text-[10px] text-[#3B82F6]">View All</span>
            </button>
          </div>
          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(11,16,32,0.8)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)' }}
          >
            <div className="p-3.5 font-['IBM_Plex_Mono'] text-[11px] leading-relaxed max-h-[100px] overflow-y-auto">
              <p className="text-[#64748B]">[14:28:05] <span className="text-[#22D3EE]">Ready to accept connections</span></p>
              <p className="text-[#64748B]">[14:28:04] <span className="text-[#22C55E]">Redis connected ✓</span></p>
              <p className="text-[#64748B]">[14:28:03] <span className="text-[#22C55E]">Database connected ✓</span></p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { icon: Icons.Rocket, label: "Deploy", color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
            { icon: Icons.Hammer, label: "Rebuild", color: "#8B5CF6", bg: "rgba(139,92,246,0.12)" },
            { icon: Icons.RefreshCw, label: "Restart", color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
            { icon: Icons.Square, label: "Stop", color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
          ].map((action, i) => {
            const ActionIcon = action.icon;
            return (
              <button key={i} className="rounded-2xl py-3.5 flex flex-col items-center gap-2"
                style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: action.bg }}>
                  <ActionIcon className="w-4.5 h-4.5" style={{ color: action.color }} />
                </div>
                <span className="font-['Work_Sans'] text-[12px] font-medium text-[#F1F5F9]">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderServiceLogs = () => (
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
          <h3 className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">Service Logs</h3>
          <p className="font-['Work_Sans'] text-[10px] text-[#64748B]">api · api-gateway</p>
        </div>
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.Download className="w-5 h-5 text-[#64748B]" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {/* Severity filter */}
        <div className="flex gap-2 mb-4">
          {["All", "Info", "Warning", "Error"].map((f, i) => (
            <button key={i} className="px-3 py-1.5 rounded-full font-['Work_Sans'] text-[11px] font-medium"
              style={{ background: i === 0 ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : 'rgba(100,116,139,0.1)', color: i === 0 ? 'white' : '#64748B' }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Log content */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: 'rgba(11,16,32,0.8)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)' }}
        >
          <div className="p-4 font-['IBM_Plex_Mono'] text-[11px] leading-[1.8]">
            <p className="text-[#64748B]">[14:28:05] <span className="text-[#22D3EE]">Ready to accept connections</span></p>
            <p className="text-[#64748B]">[14:28:05] <span className="text-[#94A3B8]">Server listening on port 3000</span></p>
            <p className="text-[#64748B]">[14:28:04] <span className="text-[#22C55E]">Redis connected ✓</span></p>
            <p className="text-[#64748B]">[14:28:04] <span className="text-[#94A3B8]">Connecting to redis:6379...</span></p>
            <p className="text-[#64748B]">[14:28:03] <span className="text-[#22C55E]">Database connected ✓</span></p>
            <p className="text-[#64748B]">[14:28:02] <span className="text-[#94A3B8]">Connecting to postgres:5432...</span></p>
            <p className="text-[#64748B]">[14:28:01] <span className="text-[#94A3B8]">Starting api-gateway...</span></p>
            <p className="text-[#64748B]">[14:27:55] <span className="text-[#94A3B8]">Initializing middleware stack</span></p>
            <p className="text-[#64748B]">[14:27:50] <span className="text-[#94A3B8]">Loading environment configuration</span></p>
            <p className="text-[#64748B]">[14:27:45] <span className="text-[#F59E0B]">Warning: NODE_ENV not set, defaulting to development</span></p>
            <p className="text-[#64748B]">[14:27:40] <span className="text-[#94A3B8]">Container started from image node:20-alpine</span></p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeployConfirm = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-sm rounded-2xl p-5"
        style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(59,130,246,0.15)' }}>
          <Icons.Rocket className="w-7 h-7 text-[#3B82F6]" />
        </div>
        <h3 className="font-['Manrope'] text-[18px] font-bold text-[#F1F5F9] text-center mb-2">Deploy Changes?</h3>
        <p className="font-['Work_Sans'] text-[13px] text-[#64748B] text-center leading-relaxed mb-4">
          The following changes will be deployed to <span className="text-[#F1F5F9] font-medium">api-gateway</span> on Home Server.
        </p>

        {/* Changes summary */}
        <div className="rounded-xl p-3.5 mb-5 space-y-2" style={{ background: 'rgba(11,16,32,0.6)' }}>
          {[
            { label: "Image", value: "node:20-alpine → node:20-alpine", changed: false },
            { label: "Env vars", value: "2 added, 1 modified", changed: true },
            { label: "Ports", value: "No changes", changed: false },
            { label: "Volumes", value: "1 new mount", changed: true },
          ].map((change, i) => (
            <div key={i} className="flex items-center gap-2.5 py-1">
              {change.changed ? (
                <Icons.CircleDot className="w-3 h-3 text-[#F59E0B]" />
              ) : (
                <Icons.Circle className="w-3 h-3 text-[#475569]" />
              )}
              <span className="font-['Work_Sans'] text-[12px] text-[#64748B] flex-1">{change.label}</span>
              <span className={`font-['Work_Sans'] text-[11px] ${change.changed ? 'text-[#F59E0B]' : 'text-[#475569]'}`}>{change.value}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button className="flex-1 py-3.5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-[#64748B]"
            style={{ background: 'rgba(100,116,139,0.1)' }}
          >
            Cancel
          </button>
          <button className="flex-1 py-3.5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-white"
            style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)', boxShadow: '0 8px 24px rgba(59,130,246,0.3)' }}
          >
            Deploy
          </button>
        </div>
      </div>
    </div>
  );

  const renderResourceDetail = () => (
    <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="absolute bottom-0 left-0 right-0 rounded-t-[24px] max-h-[80vh] overflow-y-auto"
        style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)', boxShadow: '0 -8px 40px rgba(0,0,0,0.5)' }}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-[#334155]"></div>
        </div>
        <div className="px-5 pb-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9]">Resource Detail</h3>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(100,116,139,0.15)' }}>
              <Icons.X className="w-4 h-4 text-[#64748B]" />
            </button>
          </div>

          <p className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-4">api · api-gateway</p>

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

          {/* Health checks */}
          <div className="rounded-2xl p-4"
            style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Icons.Heart className="w-4 h-4 text-[#22C55E]" />
              <span className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">Health Checks</span>
            </div>
            <div className="space-y-2">
              {[
                { endpoint: "/health", status: "healthy", latency: "12ms", last: "14s ago" },
                { endpoint: "/ready", status: "healthy", latency: "8ms", last: "14s ago" },
              ].map((check, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(11,16,32,0.6)' }}>
                  <div className="w-2 h-2 rounded-full bg-[#22C55E]"></div>
                  <span className="font-['IBM_Plex_Mono'] text-[11px] text-[#94A3B8] flex-1">{check.endpoint}</span>
                  <span className="font-['Work_Sans'] text-[10px] text-[#64748B]">{check.latency}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActionConfirm = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-sm rounded-2xl p-5"
        style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(239,68,68,0.15)' }}>
          <Icons.Square className="w-7 h-7 text-[#EF4444]" />
        </div>
        <h3 className="font-['Manrope'] text-[18px] font-bold text-[#F1F5F9] text-center mb-2">Stop Service?</h3>
        <p className="font-['Work_Sans'] text-[13px] text-[#64748B] text-center leading-relaxed mb-6">
          This will stop the <span className="text-[#F1F5F9] font-medium">api</span> container. All active connections will be terminated and in-memory data will be lost.
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
          const isActive = tab.id === "deploy";
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
      {state === "default" && (
        <>
          {renderHeader()}
          <div className="flex-1 overflow-y-auto">
            {renderDeploymentList()}
          </div>
          {renderBottomNav()}
        </>
      )}

      {state === "serviceDetail" && renderServiceDetail()}
      {state === "serviceLogs" && renderServiceLogs()}
      {state === "deployConfirm" && renderDeployConfirm()}
      {state === "resourceDetail" && renderResourceDetail()}
      {state === "actionConfirm" && renderActionConfirm()}
    </div>
  );
};

export default DeployPanelScreen;