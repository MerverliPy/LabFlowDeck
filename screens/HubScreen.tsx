import React from "react";
import * as Icons from "lucide-react";

export interface HubScreenProps {
  state: string;
}

/**
 * States:
 * - default: Default Healthy State — The dashboard view with all systems healthy, showing recent activity and running workflows.
 * - degradedState: Degraded Status State — Dashboard view where one or more elements (host, deployment) are in a degraded or warning state (Amber badge).
 * - criticalAlert: Critical Alert Visible — Dashboard view with a red Alert Banner visible at the top, indicating a critical failure (e.g., host offline).
 * - notificationCenter: Notification Center Open — A full-screen overlay or modal showing the history of critical alerts with dismiss actions.
 * - activityDetail: Activity Detail Sheet Open — A bottom sheet expanded from the activity feed, showing detailed metadata and a logs preview for a specific event.
 * - quickActionMenu: Quick Action Menu Open — A bottom sheet menu presenting quick action buttons for triggering common workflows or deployments.
 */
const HubScreen: React.FC<HubScreenProps> = ({ state }) => {

  const renderHeader = () => (
    <header className="flex items-center justify-between px-5 pt-4 pb-2">
      <div>
        <h1 className="font-['Manrope'] text-[32px] font-bold text-[#F1F5F9] leading-tight tracking-tight">Hub</h1>
        <p className="font-['Work_Sans'] text-[13px] text-[#64748B] mt-0.5">Command center overview</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="relative w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #1A2235, #141B2D)' }}
        >
          <Icons.Bell className="w-5 h-5 text-[#64748B]" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#EF4444] border-2 border-[#0D1424]"></span>
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

  const renderHealthCard = () => {
    const isDegraded = state === "degradedState";
    const isCritical = state === "criticalAlert";
    const healthyCount = isCritical ? 2 : isDegraded ? 3 : 5;
    const warningCount = isDegraded ? 1 : 0;
    const failedCount = isCritical ? 2 : 0;
    const total = healthyCount + warningCount + failedCount;
    const healthyPct = (healthyCount / total) * 100;
    const warningPct = (warningCount / total) * 100;
    const failedPct = (failedCount / total) * 100;

    return (
      <div className="mx-5 mt-4 rounded-[20px] p-5 relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #1A2235 0%, #141B2D 100%)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-[20px] p-[1px]"
          style={{
            background: isCritical
              ? 'linear-gradient(135deg, #EF4444, #8B5CF6)'
              : isDegraded
                ? 'linear-gradient(135deg, #F59E0B, #8B5CF6)'
                : 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        ></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className={`w-2.5 h-2.5 rounded-full ${isCritical ? 'bg-[#EF4444]' : isDegraded ? 'bg-[#F59E0B]' : 'bg-[#22C55E]'} animate-pulse`}></div>
              <span className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">System Health</span>
            </div>
            <span className={`font-['Work_Sans'] text-[12px] font-medium px-2.5 py-1 rounded-full ${
              isCritical ? 'bg-[#EF4444]/15 text-[#EF4444]' : isDegraded ? 'bg-[#F59E0B]/15 text-[#F59E0B]' : 'bg-[#22C55E]/15 text-[#22C55E]'
            }`}>
              {isCritical ? 'Critical' : isDegraded ? 'Degraded' : 'Healthy'}
            </span>
          </div>

          {/* Segmented health bar */}
          <div className="flex h-2.5 rounded-full overflow-hidden bg-[#0B1020] mb-3">
            <div className="bg-[#22C55E] transition-all duration-500" style={{ width: `${healthyPct}%` }}></div>
            {warningPct > 0 && <div className="bg-[#F59E0B] transition-all duration-500" style={{ width: `${warningPct}%` }}></div>}
            {failedPct > 0 && <div className="bg-[#EF4444] transition-all duration-500" style={{ width: `${failedPct}%` }}></div>}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div>
                <span className="font-['Work_Sans'] text-[12px] text-[#64748B]">{healthyCount} Healthy</span>
              </div>
              {(warningCount > 0 || isDegraded) && (
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></div>
                  <span className="font-['Work_Sans'] text-[12px] text-[#64748B]">{warningCount || 1} Warning</span>
                </div>
              )}
              {(failedCount > 0 || isCritical) && (
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></div>
                  <span className="font-['Work_Sans'] text-[12px] text-[#64748B]">{failedCount || 2} Failed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCriticalBanner = () => (
    <div className="mx-5 mt-3 rounded-2xl overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(139,92,246,0.08))',
        boxShadow: '0 4px 20px rgba(239,68,68,0.15)',
      }}
    >
      <div className="absolute inset-0 rounded-2xl p-[1px]"
        style={{
          background: 'linear-gradient(135deg, #EF4444, #8B5CF6)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      ></div>
      <div className="relative z-10 flex items-center gap-3 px-4 py-3.5">
        <div className="w-9 h-9 rounded-xl bg-[#EF4444]/20 flex items-center justify-center flex-shrink-0">
          <Icons.AlertTriangle className="w-5 h-5 text-[#EF4444]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">Host Offline: Home Server</p>
          <p className="font-['Work_Sans'] text-[12px] text-[#64748B] mt-0.5">Connection lost 12 min ago — last heartbeat at 14:32</p>
        </div>
        <Icons.ChevronRight className="w-4 h-4 text-[#64748B] flex-shrink-0" />
      </div>
    </div>
  );

  const renderActiveWorkflows = () => {
    const workflows = [
      { name: "Run Tests", project: "api-gateway", progress: 72, status: "running" },
      { name: "Build Project", project: "web-app", progress: 100, status: "completed" },
      { name: "Deploy Staging", project: "api-gateway", progress: 35, status: "running" },
    ];

    return (
      <div className="mt-6 px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">Active Workflows</h2>
          <span className="font-['Work_Sans'] text-[12px] text-[#3B82F6]">View all</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5" style={{ scrollbarWidth: 'none' }}>
          {workflows.map((wf, i) => (
            <div key={i} className="flex-shrink-0 w-[200px] rounded-2xl p-4 relative overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #1A2235 0%, #141B2D 100%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              {/* Left glow edge for running */}
              {wf.status === "running" && (
                <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
                  style={{ background: 'linear-gradient(180deg, #8B5CF6, #3B82F6)' }}
                ></div>
              )}
              <div className="relative z-10 pl-2">
                <div className="flex items-center gap-1.5 mb-1.5">
                  {wf.status === "running" ? (
                    <Icons.Loader className="w-3.5 h-3.5 text-[#22D3EE] animate-spin" />
                  ) : (
                    <Icons.CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                  )}
                  <span className={`font-['Work_Sans'] text-[11px] font-medium ${wf.status === "running" ? 'text-[#22D3EE]' : 'text-[#22C55E]'}`}>
                    {wf.status === "running" ? "Running" : "Completed"}
                  </span>
                </div>
                <p className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9] leading-tight">{wf.name}</p>
                <p className="font-['Work_Sans'] text-[11px] text-[#64748B] mt-0.5">{wf.project}</p>
              </div>
              {/* Progress bar at bottom */}
              <div className="mt-3 h-1 rounded-full bg-[#0B1020] overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${wf.progress}%`,
                    background: wf.status === "completed"
                      ? 'linear-gradient(90deg, #22C55E, #3B82F6)'
                      : 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderHostStatus = () => {
    const hosts = [
      { name: "Home", status: state === "criticalAlert" ? "offline" : "healthy", initials: "HS" },
      { name: "Office", status: state === "degradedState" ? "degraded" : "healthy", initials: "OF" },
      { name: "Cloud", status: "healthy", initials: "CL" },
      { name: "Staging", status: "healthy", initials: "ST" },
    ];

    const getBorderColor = (status: string) => {
      if (status === "offline") return '#EF4444';
      if (status === "degraded") return '#F59E0B';
      return '#22C55E';
    };

    const getGlowColor = (status: string) => {
      if (status === "offline") return 'rgba(239,68,68,0.2)';
      if (status === "degraded") return 'rgba(245,158,11,0.2)';
      return 'rgba(34,197,94,0.2)';
    };

    return (
      <div className="mt-6 px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">Host Fleet</h2>
          <span className="font-['Work_Sans'] text-[12px] text-[#3B82F6]">Manage</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-5 px-5" style={{ scrollbarWidth: 'none' }}>
          {hosts.map((host, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="relative">
                <div className="w-14 h-14 rounded-full flex items-center justify-center font-['Manrope'] text-[15px] font-bold text-[#F1F5F9]"
                  style={{
                    background: 'linear-gradient(180deg, #1A2235, #141B2D)',
                    boxShadow: `0 0 16px ${getGlowColor(host.status)}, 0 4px 16px rgba(0,0,0,0.3)`,
                    border: `2px solid ${getBorderColor(host.status)}`,
                  }}
                >
                  {host.initials}
                </div>
                {/* Live pulse for healthy */}
                {host.status === "healthy" && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#22C55E] border-2 border-[#0D1424]"></div>
                )}
                {host.status === "degraded" && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#F59E0B] border-2 border-[#0D1424]"></div>
                )}
                {host.status === "offline" && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#EF4444] border-2 border-[#0D1424]"></div>
                )}
              </div>
              <span className="font-['Work_Sans'] text-[11px] text-[#64748B]">{host.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDeploymentsSummary = () => {
    const services = [
      { name: "api-gateway", services: 3, status: "running", health: "healthy" },
      { name: "web-app", services: 2, status: state === "degradedState" ? "degraded" : "running", health: state === "degradedState" ? "unhealthy" : "healthy" },
      { name: "worker-service", services: 1, status: "running", health: "healthy" },
    ];

    return (
      <div className="mt-6 px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">Deployments</h2>
          <span className="font-['Work_Sans'] text-[12px] text-[#3B82F6]">View all</span>
        </div>
        <div className="space-y-2.5">
          {services.map((svc, i) => (
            <div key={i} className="rounded-2xl px-4 py-3.5 flex items-center gap-3"
              style={{
                background: 'linear-gradient(180deg, #1A2235 0%, #141B2D 100%)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                svc.health === "unhealthy" ? 'bg-[#F59E0B]/15' : 'bg-[#22C55E]/15'
              }`}>
                {svc.health === "unhealthy" ? (
                  <Icons.AlertCircle className="w-4.5 h-4.5 text-[#F59E0B]" />
                ) : (
                  <Icons.Container className="w-4.5 h-4.5 text-[#22C55E]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">{svc.name}</p>
                <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">{svc.services} services</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`font-['Work_Sans'] text-[11px] font-medium px-2 py-0.5 rounded-full ${
                  svc.status === "degraded" ? 'bg-[#F59E0B]/15 text-[#F59E0B]' : 'bg-[#22C55E]/15 text-[#22C55E]'
                }`}>
                  {svc.status === "degraded" ? "Degraded" : "Running"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRecentActivity = () => {
    const activities = [
      { type: "workflow_completed", message: "Run Tests completed successfully", project: "api-gateway", time: "2m ago", severity: "info", icon: "CheckCircle2" },
      { type: "deploy_completed", message: "web-app deployed to staging", project: "web-app", time: "8m ago", severity: "info", icon: "Rocket" },
      { type: state === "degradedState" ? "deploy_failed" : "workflow_started", message: state === "degradedState" ? "worker-service health check failed" : "Build Project started", project: state === "degradedState" ? "worker-service" : "web-app", time: "15m ago", severity: state === "degradedState" ? "warning" : "info", icon: state === "degradedState" ? "AlertCircle" : "Play" },
      { type: "host_recovered", message: "Cloud host recovered", project: "", time: "1h ago", severity: "info", icon: "Server" },
    ];

    const getIconColor = (severity: string) => {
      if (severity === "warning") return '#F59E0B';
      if (severity === "critical") return '#EF4444';
      return '#3B82F6';
    };

    const getIconBg = (severity: string) => {
      if (severity === "warning") return 'rgba(245,158,11,0.12)';
      if (severity === "critical") return 'rgba(239,68,68,0.12)';
      return 'rgba(59,130,246,0.12)';
    };

    return (
      <div className="mt-6 px-5 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">Recent Activity</h2>
          <span className="font-['Work_Sans'] text-[12px] text-[#3B82F6]">View all</span>
        </div>
        <div className="space-y-1">
          {activities.map((act, i) => {
            const IconComponent = (Icons as any)[act.icon] || Icons.Activity;
            return (
              <div key={i} className="flex items-center gap-3 py-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: getIconBg(act.severity) }}
                >
                  <IconComponent className="w-4 h-4" style={{ color: getIconColor(act.severity) }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-['Work_Sans'] text-[13px] text-[#F1F5F9] leading-snug">{act.message}</p>
                  <p className="font-['Work_Sans'] text-[11px] text-[#64748B] mt-0.5">{act.project && <span className="text-[#64748B]">{act.project} · </span>}{act.time}</p>
                </div>
                <Icons.ChevronRight className="w-4 h-4 text-[#334155] flex-shrink-0" />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCopilotStatus = () => (
    <div className="mx-5 mt-4 rounded-2xl px-4 py-3 flex items-center gap-3"
      style={{
        background: 'linear-gradient(180deg, #1A2235 0%, #141B2D 100%)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
      }}
    >
      <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/15 flex items-center justify-center">
        <Icons.Bot className="w-5 h-5 text-[#8B5CF6]" />
      </div>
      <div className="flex-1">
        <p className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">GitHub Copilot</p>
        <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">Connected · Agent mode active</p>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div>
        <span className="font-['Work_Sans'] text-[11px] text-[#22C55E]">Active</span>
      </div>
    </div>
  );

  const renderBottomNav = () => {
    const tabs = [
      { id: "hub", label: "Hub", icon: Icons.LayoutDashboard },
      { id: "projects", label: "Projects", icon: Icons.FolderKanban },
      { id: "agents", label: "Agents", icon: Icons.Bot },
      { id: "deploy", label: "Deploy", icon: Icons.Rocket },
    ];

    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40"
        style={{
          background: 'linear-gradient(180deg, rgba(13,20,36,0.95) 0%, #0D1424 100%)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(30,41,59,0.5)',
        }}
      >
        <div className="flex items-center justify-around px-2 pt-2 pb-7">
          {tabs.map((tab) => {
            const isActive = tab.id === "hub";
            const IconComp = tab.icon;
            return (
              <button key={tab.id} className="flex flex-col items-center gap-1 py-1 px-4 relative">
                {isActive && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)' }}
                  ></div>
                )}
                <IconComp className={`w-5 h-5 ${isActive ? 'text-[#3B82F6]' : 'text-[#475569]'}`} />
                <span className={`font-['Work_Sans'] text-[10px] font-medium ${isActive ? 'text-[#3B82F6]' : 'text-[#475569]'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  };

  const renderNotificationCenter = () => (
    <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
      <div className="absolute inset-0 flex flex-col"
        style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h2 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9]">Notifications</h2>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
          >
            <Icons.X className="w-5 h-5 text-[#64748B]" />
          </button>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 px-5 mb-4">
          {["All", "Critical", "Warnings", "Info"].map((filter, i) => (
            <span key={i} className={`font-['Work_Sans'] text-[12px] font-medium px-3.5 py-1.5 rounded-full ${
              i === 0 ? 'text-[#F1F5F9]' : 'text-[#64748B]'
            }`}
              style={i === 0 ? { background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)' } : { background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
            >
              {filter}
            </span>
          ))}
        </div>

        {/* Notification list */}
        <div className="flex-1 overflow-y-auto px-5 space-y-2.5 pb-8">
          {[
            { title: "Host Offline: Home Server", body: "Connection lost 12 min ago. Last heartbeat at 14:32.", type: "critical", time: "12m ago", icon: Icons.AlertTriangle, color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
            { title: "Deploy Failed: web-app", body: "Staging deployment failed — health check timeout.", type: "critical", time: "28m ago", icon: Icons.XCircle, color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
            { title: "Health Check Warning", body: "worker-service response time degraded (>2s).", type: "warning", time: "45m ago", icon: Icons.AlertCircle, color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
            { title: "Workflow Completed", body: "Run Tests for api-gateway passed all 142 tests.", type: "info", time: "1h ago", icon: Icons.CheckCircle2, color: "#22C55E", bg: "rgba(34,197,94,0.12)" },
            { title: "Host Recovered: Cloud", body: "Cloud host reconnected after brief outage.", type: "info", time: "2h ago", icon: Icons.Server, color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
            { title: "Schedule Triggered", body: "Deploy Staging workflow started on schedule.", type: "info", time: "3h ago", icon: Icons.Clock, color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
          ].map((notif, i) => {
            const NotifIcon = notif.icon;
            return (
              <div key={i} className="rounded-2xl px-4 py-3.5 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, #1A2235 0%, #141B2D 100%)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: notif.bg }}
                  >
                    <NotifIcon className="w-4.5 h-4.5" style={{ color: notif.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9] leading-snug">{notif.title}</p>
                      <span className="font-['Work_Sans'] text-[10px] text-[#64748B] flex-shrink-0 mt-0.5">{notif.time}</span>
                    </div>
                    <p className="font-['Work_Sans'] text-[12px] text-[#64748B] mt-1 leading-relaxed">{notif.body}</p>
                    <div className="flex items-center gap-2 mt-2.5">
                      <button className="font-['Work_Sans'] text-[11px] font-medium text-[#3B82F6] px-2.5 py-1 rounded-lg"
                        style={{ background: 'rgba(59,130,246,0.1)' }}
                      >
                        View Details
                      </button>
                      <button className="font-['Work_Sans'] text-[11px] font-medium text-[#64748B] px-2.5 py-1 rounded-lg"
                        style={{ background: 'rgba(100,116,139,0.1)' }}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderActivityDetailSheet = () => (
    <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="absolute bottom-0 left-0 right-0 rounded-t-[24px] max-h-[85vh] overflow-y-auto"
        style={{
          background: 'linear-gradient(180deg, #1A2235 0%, #0D1424 100%)',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.5)',
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-[#334155]"></div>
        </div>

        <div className="px-5 pb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9]">Activity Detail</h3>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(100,116,139,0.15)' }}
            >
              <Icons.X className="w-4 h-4 text-[#64748B]" />
            </button>
          </div>

          {/* Event card */}
          <div className="rounded-2xl p-4 mb-4"
            style={{
              background: 'linear-gradient(180deg, #1A2235, #141B2D)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#22C55E]/15 flex items-center justify-center">
                <Icons.CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
              </div>
              <div>
                <p className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">Workflow Completed</p>
                <p className="font-['Work_Sans'] text-[12px] text-[#64748B]">Run Tests · api-gateway</p>
              </div>
            </div>

            {/* Metadata grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {[
                { label: "Status", value: "Success", color: "#22C55E" },
                { label: "Duration", value: "2m 14s", color: "#F1F5F9" },
                { label: "Triggered By", value: "Manual", color: "#F1F5F9" },
                { label: "Completed", value: "14:28 UTC", color: "#F1F5F9" },
              ].map((meta, i) => (
                <div key={i} className="rounded-xl px-3 py-2.5"
                  style={{ background: 'rgba(11,16,32,0.6)' }}
                >
                  <p className="font-['Work_Sans'] text-[10px] text-[#64748B] mb-0.5">{meta.label}</p>
                  <p className="font-['Work_Sans'] text-[13px] font-medium" style={{ color: meta.color }}>{meta.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Logs preview */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">Execution Logs</h4>
              <span className="font-['Work_Sans'] text-[11px] text-[#3B82F6]">View Full Log</span>
            </div>
            <div className="rounded-2xl p-4 font-['IBM_Plex_Mono'] text-[12px] leading-relaxed overflow-hidden"
              style={{
                background: 'rgba(11,16,32,0.8)',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              <p className="text-[#64748B] mb-1">$ npm test -- --coverage</p>
              <p className="text-[#94A3B8] mb-1">Running 142 test suites...</p>
              <p className="text-[#94A3B8] mb-1">✓ auth.spec.ts (8 tests) <span className="text-[#22C55E]">8 passed</span></p>
              <p className="text-[#94A3B8] mb-1">✓ api.spec.ts (24 tests) <span className="text-[#22C55E]">24 passed</span></p>
              <p className="text-[#94A3B8] mb-1">✓ integration.spec.ts (12 tests) <span className="text-[#22C55E]">12 passed</span></p>
              <p className="text-[#64748B] mb-1">...</p>
              <p className="text-[#22C55E]">All 142 tests passed ✓</p>
              <p className="text-[#94A3B8]">Coverage: 87.3% statements</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2.5">
            <button className="flex-1 py-3 rounded-xl font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]"
              style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)' }}
            >
              Re-run Workflow
            </button>
            <button className="py-3 px-4 rounded-xl font-['Manrope'] text-[13px] font-semibold text-[#64748B]"
              style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
            >
              <Icons.Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuickActionMenu = () => (
    <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="absolute bottom-0 left-0 right-0 rounded-t-[24px]"
        style={{
          background: 'linear-gradient(180deg, #1A2235 0%, #0D1424 100%)',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.5)',
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-[#334155]"></div>
        </div>

        <div className="px-5 pb-10">
          <h3 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9] mb-1">Quick Actions</h3>
          <p className="font-['Work_Sans'] text-[13px] text-[#64748B] mb-5">Trigger workflows and deployments instantly</p>

          {/* Action grid */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { icon: Icons.Play, label: "Run Tests", color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
              { icon: Icons.Hammer, label: "Build", color: "#8B5CF6", bg: "rgba(139,92,246,0.12)" },
              { icon: Icons.Rocket, label: "Deploy", color: "#22D3EE", bg: "rgba(34,211,238,0.12)" },
              { icon: Icons.RefreshCw, label: "Restart", color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
              { icon: Icons.FileSearch, label: "Inspect", color: "#60A5FA", bg: "rgba(96,165,250,0.12)" },
              { icon: Icons.ShieldCheck, label: "Validate", color: "#22C55E", bg: "rgba(34,197,94,0.12)" },
            ].map((action, i) => {
              const ActionIcon = action.icon;
              return (
                <button key={i} className="flex flex-col items-center gap-2 py-4 rounded-2xl"
                  style={{
                    background: 'linear-gradient(180deg, #1A2235, #141B2D)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: action.bg }}
                  >
                    <ActionIcon className="w-5 h-5" style={{ color: action.color }} />
                  </div>
                  <span className="font-['Work_Sans'] text-[12px] font-medium text-[#F1F5F9]">{action.label}</span>
                </button>
              );
            })}
          </div>

          {/* Recent quick actions */}
          <div className="mb-4">
            <p className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9] mb-2.5">Recent Actions</p>
            <div className="space-y-2">
              {[
                { label: "Run Tests on api-gateway", time: "2m ago", icon: Icons.Play },
                { label: "Deploy web-app to staging", time: "8m ago", icon: Icons.Rocket },
              ].map((recent, i) => {
                const RecentIcon = recent.icon;
                return (
                  <div key={i} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl"
                    style={{ background: 'rgba(11,16,32,0.6)' }}
                  >
                    <RecentIcon className="w-4 h-4 text-[#64748B]" />
                    <span className="font-['Work_Sans'] text-[12px] text-[#F1F5F9] flex-1">{recent.label}</span>
                    <span className="font-['Work_Sans'] text-[10px] text-[#64748B]">{recent.time}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cancel */}
          <button className="w-full py-3 rounded-xl font-['Manrope'] text-[13px] font-semibold text-[#64748B]"
            style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderFloatingQuickAction = () => (
    <div className="fixed bottom-24 right-5 z-30">
      <button className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl"
        style={{
          background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
          boxShadow: '0 8px 32px rgba(59,130,246,0.35)',
        }}
      >
        <Icons.Zap className="w-6 h-6 text-white" />
      </button>
    </div>
  );

  const renderPullToRefreshHint = () => (
    <div className="flex items-center justify-center py-2">
      <Icons.ChevronsDown className="w-4 h-4 text-[#334155]" />
    </div>
  );

  return (
    <div className="min-h-screen font-['Work_Sans'] text-[#F1F5F9] flex flex-col relative"
      style={{ background: 'linear-gradient(180deg, #0D1424 0%, #0B1020 100%)' }}
    >
      {/* Default / Degraded / Critical states show the main dashboard */}
      {(state === "default" || state === "degradedState" || state === "criticalAlert") && (
        <>
          {renderHeader()}
          <div className="flex-1 overflow-y-auto pb-24">
            {renderPullToRefreshHint()}
            {state === "criticalAlert" && renderCriticalBanner()}
            {renderHealthCard()}
            {renderCopilotStatus()}
            {renderActiveWorkflows()}
            {renderHostStatus()}
            {renderDeploymentsSummary()}
            {renderRecentActivity()}
          </div>
          {renderBottomNav()}
          {renderFloatingQuickAction()}
        </>
      )}

      {/* Notification Center overlay */}
      {state === "notificationCenter" && (
        <>
          <div className="flex-1 overflow-y-auto pb-24 opacity-30 pointer-events-none">
            {renderHeader()}
            {renderHealthCard()}
          </div>
          {renderNotificationCenter()}
        </>
      )}

      {/* Activity Detail Sheet overlay */}
      {state === "activityDetail" && (
        <>
          <div className="flex-1 overflow-y-auto pb-24 opacity-30 pointer-events-none">
            {renderHeader()}
            {renderHealthCard()}
            {renderRecentActivity()}
          </div>
          {renderBottomNav()}
          {renderActivityDetailSheet()}
        </>
      )}

      {/* Quick Action Menu overlay */}
      {state === "quickActionMenu" && (
        <>
          <div className="flex-1 overflow-y-auto pb-24 opacity-30 pointer-events-none">
            {renderHeader()}
            {renderHealthCard()}
          </div>
          {renderBottomNav()}
          {renderQuickActionMenu()}
        </>
      )}
    </div>
  );
};

export default HubScreen;