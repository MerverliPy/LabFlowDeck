import React from "react";
import * as Icons from "lucide-react";

export interface SettingsScreenProps {
  state: string;
}

/**
 * States:
 * - default: Settings List — The main settings view listing all configuration categories.
 * - hostPairingFlow: Host Pairing Flow — A modal flow initiated by "Add Host", displaying the pairing command.
 * - manualHostConfig: Manual Host Config — A form modal for advanced users to manually configure SSH.
 * - notificationPrefs: Notification Preferences — A bottom sheet with granular toggles for different notification types and channels.
 * - disconnectGithub: Disconnect GitHub Confirmation — A confirmation dialog warning about disconnecting GitHub.
 */
const SettingsScreen: React.FC<SettingsScreenProps> = ({ state }) => {

  const renderHeader = () => (
    <header className="px-5 pt-4 pb-2">
      <div className="flex items-center justify-between mb-4">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.ArrowLeft className="w-5 h-5 text-[#64748B]" />
        </button>
        <h1 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9]">Settings</h1>
        <div className="w-10"></div>
      </div>

      {/* User profile summary */}
      <div className="rounded-2xl p-4 flex items-center gap-3.5"
        style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
      >
        <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#3B82F6]/30">
          <img
            src="./images/avatar-user.jpg"
            alt="A 30-year-old male software engineer with short dark hair and a calm expression, wearing a dark hoodie, soft studio lighting, neutral background"
            data-context="User avatar in a medium circular container"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">Alex Chen</p>
          <p className="font-['Work_Sans'] text-[12px] text-[#64748B]">alexchen · GitHub Connected</p>
        </div>
        <Icons.ChevronRight className="w-5 h-5 text-[#475569]" />
      </div>
    </header>
  );

  const renderSettingsList = () => (
    <div className="px-5 mt-4 pb-8 space-y-2.5">
      {/* GitHub Connection */}
      <button className="w-full rounded-2xl px-4 py-3.5 flex items-center gap-3.5 text-left"
        style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
      >
        <div className="w-10 h-10 rounded-xl bg-[#F1F5F9]/10 flex items-center justify-center">
          <Icons.Github className="w-5 h-5 text-[#F1F5F9]" />
        </div>
        <div className="flex-1">
          <p className="font-['Manrope'] text-[14px] font-semibold text-[#F1F5F9]">GitHub Connection</p>
          <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">Connected as alexchen</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div>
          <Icons.ChevronRight className="w-4 h-4 text-[#475569]" />
        </div>
      </button>

      {/* AI Provider */}
      <button className="w-full rounded-2xl px-4 py-3.5 flex items-center gap-3.5 text-left"
        style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
      >
        <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/12 flex items-center justify-center">
          <Icons.Bot className="w-5 h-5 text-[#8B5CF6]" />
        </div>
        <div className="flex-1">
          <p className="font-['Manrope'] text-[14px] font-semibold text-[#F1F5F9]">AI Provider</p>
          <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">GitHub Copilot · Agent mode active</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div>
          <Icons.ChevronRight className="w-4 h-4 text-[#475569]" />
        </div>
      </button>

      {/* Hosts */}
      <button className="w-full rounded-2xl px-4 py-3.5 flex items-center gap-3.5 text-left"
        style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
      >
        <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/12 flex items-center justify-center">
          <Icons.Server className="w-5 h-5 text-[#22D3EE]" />
        </div>
        <div className="flex-1">
          <p className="font-['Manrope'] text-[14px] font-semibold text-[#F1F5F9]">Hosts</p>
          <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">3 hosts · All healthy</p>
        </div>
        <Icons.ChevronRight className="w-4 h-4 text-[#475569]" />
      </button>

      {/* Deployment Defaults */}
      <button className="w-full rounded-2xl px-4 py-3.5 flex items-center gap-3.5 text-left"
        style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
      >
        <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/12 flex items-center justify-center">
          <Icons.Container className="w-5 h-5 text-[#3B82F6]" />
        </div>
        <div className="flex-1">
          <p className="font-['Manrope'] text-[14px] font-semibold text-[#F1F5F9]">Deployment Defaults</p>
          <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">Auto-restart · 30s health check</p>
        </div>
        <Icons.ChevronRight className="w-4 h-4 text-[#475569]" />
      </button>

      {/* Notifications */}
      <button className="w-full rounded-2xl px-4 py-3.5 flex items-center gap-3.5 text-left"
        style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
      >
        <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/12 flex items-center justify-center">
          <Icons.Bell className="w-5 h-5 text-[#F59E0B]" />
        </div>
        <div className="flex-1">
          <p className="font-['Manrope'] text-[14px] font-semibold text-[#F1F5F9]">Notifications</p>
          <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">Push & in-app enabled</p>
        </div>
        <Icons.ChevronRight className="w-4 h-4 text-[#475569]" />
      </button>

      {/* Security */}
      <button className="w-full rounded-2xl px-4 py-3.5 flex items-center gap-3.5 text-left"
        style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
      >
        <div className="w-10 h-10 rounded-xl bg-[#22C55E]/12 flex items-center justify-center">
          <Icons.Shield className="w-5 h-5 text-[#22C55E]" />
        </div>
        <div className="flex-1">
          <p className="font-['Manrope'] text-[14px] font-semibold text-[#F1F5F9]">Security</p>
          <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">Biometric lock · 30min timeout</p>
        </div>
        <Icons.ChevronRight className="w-4 h-4 text-[#475569]" />
      </button>

      {/* Log Retention */}
      <button className="w-full rounded-2xl px-4 py-3.5 flex items-center gap-3.5 text-left"
        style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
      >
        <div className="w-10 h-10 rounded-xl bg-[#64748B]/15 flex items-center justify-center">
          <Icons.Database className="w-5 h-5 text-[#64748B]" />
        </div>
        <div className="flex-1">
          <p className="font-['Manrope'] text-[14px] font-semibold text-[#F1F5F9]">Log Retention</p>
          <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">30 days · Auto-purge enabled</p>
        </div>
        <Icons.ChevronRight className="w-4 h-4 text-[#475569]" />
      </button>

      {/* Add Host button */}
      <div className="pt-3" style={{ borderTop: '1px solid rgba(100,116,139,0.1)' }}>
        <button className="w-full rounded-2xl px-4 py-3.5 flex items-center gap-3.5 text-left"
          style={{ background: 'rgba(34,211,238,0.06)', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: '1px dashed rgba(34,211,238,0.2)' }}
        >
          <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/12 flex items-center justify-center">
            <Icons.Plus className="w-5 h-5 text-[#22D3EE]" />
          </div>
          <div className="flex-1">
            <p className="font-['Manrope'] text-[14px] font-semibold text-[#22D3EE]">Add New Host</p>
            <p className="font-['Work_Sans'] text-[11px] text-[#475569]">Pair a server or PC</p>
          </div>
        </button>
      </div>

      {/* Version info */}
      <div className="pt-4 text-center">
        <p className="font-['Work_Sans'] text-[11px] text-[#334155]">LabFlow Deck v1.0.0</p>
        <p className="font-['Work_Sans'] text-[10px] text-[#1E293B]">Built with ♥ for solo builders</p>
      </div>
    </div>
  );

  const renderHostPairingFlow = () => (
    <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
      <div className="absolute bottom-0 left-0 right-0 rounded-t-[24px] max-h-[85vh] overflow-y-auto"
        style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)', boxShadow: '0 -8px 40px rgba(0,0,0,0.5)' }}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-[#334155]"></div>
        </div>
        <div className="px-5 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9]">Add Host</h3>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(100,116,139,0.15)' }}>
              <Icons.X className="w-4 h-4 text-[#64748B]" />
            </button>
          </div>

          {/* Method selection */}
          <div className="flex items-center gap-2 mb-5">
            {["Agent Pairing", "Manual SSH"].map((method, i) => (
              <button key={i} className="px-4 py-2 rounded-xl font-['Work_Sans'] text-[12px] font-medium"
                style={{ background: i === 0 ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : 'rgba(100,116,139,0.1)', color: i === 0 ? 'white' : '#64748B' }}
              >
                {method}
              </button>
            ))}
          </div>

          {/* Pairing command */}
          <div className="mb-4">
            <label className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-1.5 block">Host Name</label>
            <div className="rounded-xl px-4 py-3"
              style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
            >
              <span className="font-['Work_Sans'] text-[15px] text-[#F1F5F9]">my-new-server</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden mb-5"
            style={{ background: 'rgba(11,16,32,0.8)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.4)' }}
          >
            <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: '1px solid rgba(30,41,59,0.4)' }}>
              <span className="font-['Work_Sans'] text-[11px] text-[#64748B]">Pairing Command</span>
              <button className="flex items-center gap-1.5 px-3 py-1 rounded-lg" style={{ background: 'rgba(59,130,246,0.12)' }}>
                <Icons.Copy className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span className="font-['Work_Sans'] text-[11px] font-medium text-[#3B82F6]">Copy</span>
              </button>
            </div>
            <div className="p-4 font-['IBM_Plex_Mono'] text-[12px] leading-relaxed">
              <p className="text-[#64748B] mb-1"># Install and register the LabFlow agent</p>
              <p className="text-[#94A3B8]">curl -fsSL https://get.labflow.dev/agent | bash -s -- \</p>
              <p className="text-[#94A3B8]">  --token=<span className="text-[#22D3EE]">lf_pair_k9d3...f7a2</span> \</p>
              <p className="text-[#94A3B8]">  --name=<span className="text-[#22D3EE]">"my-new-server"</span></p>
            </div>
          </div>

          {/* Info notes */}
          <div className="space-y-2 mb-6">
            {[
              { icon: Icons.Shield, text: "Token is one-time use and expires in 24 hours" },
              { icon: Icons.Clock, text: "Pairing typically completes in under 30 seconds" },
              { icon: Icons.Lock, text: "All communication is encrypted end-to-end" },
            ].map((info, i) => {
              const InfoIcon = info.icon;
              return (
                <div key={i} className="flex items-start gap-2.5 px-3 py-2 rounded-xl" style={{ background: 'rgba(30,41,59,0.3)' }}>
                  <InfoIcon className="w-3.5 h-3.5 text-[#475569] flex-shrink-0 mt-0.5" />
                  <p className="font-['Work_Sans'] text-[11px] text-[#94A3B8] leading-relaxed">{info.text}</p>
                </div>
              );
            })}
          </div>

          <button className="w-full py-3.5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-white"
            style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)', boxShadow: '0 8px 24px rgba(59,130,246,0.3)' }}
          >
            I've Run the Command
          </button>
        </div>
      </div>
    </div>
  );

  const renderManualHostConfig = () => (
    <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
      <div className="absolute bottom-0 left-0 right-0 rounded-t-[24px] max-h-[85vh] overflow-y-auto"
        style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)', boxShadow: '0 -8px 40px rgba(0,0,0,0.5)' }}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-[#334155]"></div>
        </div>
        <div className="px-5 pb-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9]">Manual SSH Config</h3>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(100,116,139,0.15)' }}>
              <Icons.X className="w-4 h-4 text-[#64748B]" />
            </button>
          </div>
          <p className="font-['Work_Sans'] text-[12px] text-[#475569] mb-5">Advanced option — enter SSH connection details manually</p>

          <div className="space-y-4 mb-8">
            <div>
              <label className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-1.5 block">Host Name</label>
              <div className="rounded-xl px-4 py-3"
                style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
              >
                <span className="font-['Work_Sans'] text-[14px] text-[#475569]">Enter a display name</span>
              </div>
            </div>

            <div>
              <label className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-1.5 block">SSH Host / IP Address</label>
              <div className="rounded-xl px-4 py-3"
                style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
              >
                <span className="font-['IBM_Plex_Mono'] text-[14px] text-[#475569]">e.g. 192.168.1.100</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-1.5 block">Port</label>
                <div className="rounded-xl px-4 py-3"
                  style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
                >
                  <span className="font-['IBM_Plex_Mono'] text-[14px] text-[#475569]">22</span>
                </div>
              </div>
              <div>
                <label className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-1.5 block">Username</label>
                <div className="rounded-xl px-4 py-3"
                  style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
                >
                  <span className="font-['Work_Sans'] text-[14px] text-[#475569]">user</span>
                </div>
              </div>
            </div>

            <div>
              <label className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-1.5 block">SSH Private Key</label>
              <div className="rounded-xl px-4 py-3 flex items-center justify-between"
                style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
              >
                <span className="font-['Work_Sans'] text-[13px] text-[#475569]">Paste or upload key</span>
                <Icons.Upload className="w-4 h-4 text-[#475569]" />
              </div>
            </div>

            <div>
              <label className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-1.5 block">Tailscale IP (Optional)</label>
              <div className="rounded-xl px-4 py-3"
                style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
              >
                <span className="font-['IBM_Plex_Mono'] text-[14px] text-[#475569]">100.x.x.x</span>
              </div>
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
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationPrefs = () => (
    <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="absolute bottom-0 left-0 right-0 rounded-t-[24px] max-h-[80vh] overflow-y-auto"
        style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)', boxShadow: '0 -8px 40px rgba(0,0,0,0.5)' }}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-[#334155]"></div>
        </div>
        <div className="px-5 pb-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9]">Notifications</h3>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(100,116,139,0.15)' }}>
              <Icons.X className="w-4 h-4 text-[#64748B]" />
            </button>
          </div>

          {/* Channel toggles */}
          <h4 className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9] mb-3">Channels</h4>
          <div className="space-y-2 mb-6">
            {[
              { label: "Push Notifications", desc: "Critical alerts sent to your device", on: true },
              { label: "In-App Notifications", desc: "Alerts shown within the app", on: true },
            ].map((channel, i) => (
              <div key={i} className="rounded-2xl px-4 py-3.5 flex items-center gap-3"
                style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
              >
                <div className="flex-1">
                  <p className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">{channel.label}</p>
                  <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">{channel.desc}</p>
                </div>
                <div className={`w-11 h-6 rounded-full flex items-center px-0.5 ${channel.on ? 'justify-end' : 'justify-start'}`}
                  style={{ background: channel.on ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : '#1E293B' }}
                >
                  <div className="w-5 h-5 rounded-full bg-white shadow-md"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Event type toggles */}
          <h4 className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9] mb-3">Alert Types</h4>
          <div className="space-y-2 mb-6">
            {[
              { label: "Workflow Failures", color: "#EF4444", on: true },
              { label: "Workflow Completions", color: "#22C55E", on: false },
              { label: "Deploy Failures", color: "#EF4444", on: true },
              { label: "Deploy Completions", color: "#22C55E", on: false },
              { label: "Host Offline", color: "#F59E0B", on: true },
              { label: "Container Unhealthy", color: "#EF4444", on: true },
              { label: "Provider Auth Errors", color: "#8B5CF6", on: true },
            ].map((event, i) => (
              <div key={i} className="rounded-xl px-4 py-3 flex items-center gap-3"
                style={{ background: 'rgba(30,41,59,0.3)' }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: event.color }}></div>
                <span className="font-['Work_Sans'] text-[13px] text-[#F1F5F9] flex-1">{event.label}</span>
                <div className={`w-10 h-5.5 rounded-full flex items-center px-0.5 ${event.on ? 'justify-end' : 'justify-start'}`}
                  style={{ background: event.on ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : '#1E293B' }}
                >
                  <div className="w-4.5 h-4.5 rounded-full bg-white shadow-sm"></div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-3.5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-white"
            style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)' }}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );

  const renderDisconnectGithub = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-sm rounded-2xl p-5"
        style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(239,68,68,0.15)' }}>
          <Icons.AlertTriangle className="w-7 h-7 text-[#EF4444]" />
        </div>
        <h3 className="font-['Manrope'] text-[18px] font-bold text-[#F1F5F9] text-center mb-2">Disconnect GitHub?</h3>
        <p className="font-['Work_Sans'] text-[13px] text-[#64748B] text-center leading-relaxed mb-4">
          This will revoke LabFlow Deck's access to your GitHub account.
        </p>

        {/* Impact warning */}
        <div className="rounded-xl px-4 py-3 mb-6" style={{ background: 'rgba(239,68,68,0.06)' }}>
          <div className="flex items-center gap-2 mb-1.5">
            <Icons.AlertCircle className="w-4 h-4 text-[#EF4444]" />
            <span className="font-['Manrope'] text-[12px] font-semibold text-[#EF4444]">Impact Warning</span>
          </div>
          <ul className="space-y-1.5">
            {[
              "All project repository links will be disconnected",
              "GitHub Copilot integration will stop working",
              "Workflow triggers based on push events will be disabled",
              "You will need to re-authorize to restore access",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-[#EF4444] mt-1.5 flex-shrink-0"></div>
                <span className="font-['Work_Sans'] text-[11px] text-[#94A3B8] leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
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
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-['Work_Sans'] text-[#F1F5F9] flex flex-col"
      style={{ background: 'linear-gradient(180deg, #0D1424 0%, #0B1020 100%)' }}
    >
      {state === "default" && (
        <div className="flex-1 overflow-y-auto">
          {renderHeader()}
          {renderSettingsList()}
        </div>
      )}

      {state === "hostPairingFlow" && (
        <>
          <div className="flex-1 overflow-y-auto opacity-30 pointer-events-none">
            {renderHeader()}
            {renderSettingsList()}
          </div>
          {renderHostPairingFlow()}
        </>
      )}

      {state === "manualHostConfig" && (
        <>
          <div className="flex-1 overflow-y-auto opacity-30 pointer-events-none">
            {renderHeader()}
            {renderSettingsList()}
          </div>
          {renderManualHostConfig()}
        </>
      )}

      {state === "notificationPrefs" && (
        <>
          <div className="flex-1 overflow-y-auto opacity-30 pointer-events-none">
            {renderHeader()}
            {renderSettingsList()}
          </div>
          {renderNotificationPrefs()}
        </>
      )}

      {state === "disconnectGithub" && (
        <>
          <div className="flex-1 overflow-y-auto opacity-30 pointer-events-none">
            {renderHeader()}
            {renderSettingsList()}
          </div>
          {renderDisconnectGithub()}
        </>
      )}
    </div>
  );
};

export default SettingsScreen;