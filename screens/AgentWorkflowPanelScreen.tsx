import React from "react";
import * as Icons from "lucide-react";

export interface AgentWorkflowPanelScreenProps {
  state: string;
}

/**
 * States:
 * - default: Workflow List — The list view of all saved workflows with their status and project counts.
 * - templateGallery: Template Gallery — A grid view of available workflow templates when creating a new workflow.
 * - editor: Workflow Editor — The editor view displaying ordered steps, configuration, and schedule settings.
 * - stepEditor: Step Editor Sheet — A bottom sheet for configuring an individual workflow step.
 * - testRunMonitor: Test Run Monitor — Real-time view monitoring execution with step progress and live logs.
 * - runDetail: Run Detail View — Detailed view of a past workflow run with results, logs, and errors.
 */
const AgentWorkflowPanelScreen: React.FC<AgentWorkflowPanelScreenProps> = ({ state }) => {

  const renderHeader = () => (
    <header className="flex items-center justify-between px-5 pt-4 pb-2">
      <div>
        <h1 className="font-['Manrope'] text-[32px] font-bold text-[#F1F5F9] leading-tight tracking-tight">Agents</h1>
        <p className="font-['Work_Sans'] text-[13px] text-[#64748B] mt-0.5">AI-powered workflows</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #1A2235, #141B2D)' }}
        >
          <Icons.Search className="w-5 h-5 text-[#64748B]" />
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

  const renderWorkflowList = () => (
    <div className="px-5 mt-4 pb-28 space-y-3">
      {[
        { name: "Run Tests", template: "run_tests", schedule: "On push", lastRun: "completed", projects: 2, active: true },
        { name: "Build & Deploy", template: "build_project", schedule: "Manual", lastRun: "completed", projects: 1, active: true },
        { name: "Inspect Repository", template: "inspect_repo", schedule: "Daily 08:00", lastRun: "failed", projects: 1, active: true },
        { name: "Summarize Logs", template: "summarize_logs", schedule: "Disabled", lastRun: "completed", projects: 0, active: false },
      ].map((wf, i) => (
        <div key={i} className="rounded-2xl p-4 relative overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
        >
          {/* Left edge glow for active */}
          {wf.active && (
            <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
              style={{ background: wf.lastRun === 'failed' ? 'linear-gradient(180deg, #EF4444, #F59E0B)' : 'linear-gradient(180deg, #8B5CF6, #3B82F6)' }}
            ></div>
          )}
          <div className="relative z-10 pl-2">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  wf.lastRun === 'failed' ? 'bg-[#EF4444]/12' : 'bg-[#8B5CF6]/12'
                }`}>
                  <Icons.Bot className={`w-4.5 h-4.5 ${wf.lastRun === 'failed' ? 'text-[#EF4444]' : 'text-[#8B5CF6]'}`} />
                </div>
                <div>
                  <p className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">{wf.name}</p>
                  <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">{wf.template.replace(/_/g, ' ')}</p>
                </div>
              </div>
              <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(100,116,139,0.1)' }}>
                <Icons.MoreVertical className="w-3.5 h-3.5 text-[#64748B]" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Icons.Clock className="w-3 h-3 text-[#475569]" />
                <span className="font-['Work_Sans'] text-[11px] text-[#475569]">{wf.schedule}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icons.FolderKanban className="w-3 h-3 text-[#475569]" />
                <span className="font-['Work_Sans'] text-[11px] text-[#475569]">{wf.projects} projects</span>
              </div>
              <div className="flex items-center gap-1.5 ml-auto">
                <div className={`w-1.5 h-1.5 rounded-full ${wf.lastRun === 'failed' ? 'bg-[#EF4444]' : 'bg-[#22C55E]'}`}></div>
                <span className={`font-['Work_Sans'] text-[10px] font-medium ${wf.lastRun === 'failed' ? 'text-[#EF4444]' : 'text-[#22C55E]'}`}>
                  {wf.lastRun === 'completed' ? 'Passed' : 'Failed'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Create new button */}
      <button className="w-full rounded-2xl py-4 flex items-center justify-center gap-2.5"
        style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)', border: '1px dashed rgba(139,92,246,0.3)' }}
      >
        <Icons.Plus className="w-5 h-5 text-[#8B5CF6]" />
        <span className="font-['Manrope'] text-[13px] font-semibold text-[#8B5CF6]">Create Workflow</span>
      </button>
    </div>
  );

  const renderTemplateGallery = () => (
    <div className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)' }}
    >
      <header className="flex items-center justify-between px-5 pt-5 pb-3">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.ArrowLeft className="w-5 h-5 text-[#64748B]" />
        </button>
        <h3 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">Choose Template</h3>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <p className="font-['Work_Sans'] text-[13px] text-[#64748B] mb-5">Start with a pre-built template or create from scratch</p>

        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {[
            { name: "Run Tests", desc: "Execute test suite", icon: Icons.FlaskConical, color: "#3B82F6" },
            { name: "Build Project", desc: "Compile & package", icon: Icons.Hammer, color: "#8B5CF6" },
            { name: "Deploy Staging", desc: "Deploy to staging", icon: Icons.Rocket, color: "#22D3EE" },
            { name: "Inspect Repo", desc: "AI code analysis", icon: Icons.FileSearch, color: "#60A5FA" },
            { name: "Validate Deploy", desc: "Health checks", icon: Icons.ShieldCheck, color: "#22C55E" },
            { name: "Restart Service", desc: "Graceful restart", icon: Icons.RefreshCw, color: "#F59E0B" },
            { name: "Summarize Logs", desc: "AI log digest", icon: Icons.FileText, color: "#8B5CF6" },
          ].map((tmpl, i) => {
            const TmplIcon = tmpl.icon;
            return (
              <button key={i} className="rounded-2xl p-4 flex flex-col items-center text-center"
                style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-2.5" style={{ background: `${tmpl.color}15` }}>
                  <TmplIcon className="w-5 h-5" style={{ color: tmpl.color }} />
                </div>
                <p className="font-['Manrope'] text-[12px] font-semibold text-[#F1F5F9] mb-0.5">{tmpl.name}</p>
                <p className="font-['Work_Sans'] text-[10px] text-[#475569]">{tmpl.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Start from scratch */}
        <button className="w-full rounded-2xl px-4 py-4 flex items-center gap-3 text-left"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)', border: '1px dashed rgba(100,116,139,0.3)' }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(100,116,139,0.1)' }}>
            <Icons.Code className="w-5 h-5 text-[#64748B]" />
          </div>
          <div>
            <p className="font-['Manrope'] text-[13px] font-semibold text-[#94A3B8]">Start from Scratch</p>
            <p className="font-['Work_Sans'] text-[11px] text-[#475569]">Advanced — build your own workflow</p>
          </div>
        </button>
      </div>
    </div>
  );

  const renderEditor = () => (
    <div className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)' }}
    >
      <header className="flex items-center justify-between px-5 pt-5 pb-3">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.ArrowLeft className="w-5 h-5 text-[#64748B]" />
        </button>
        <h3 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">Edit Workflow</h3>
        <button className="px-3.5 py-1.5 rounded-lg font-['Work_Sans'] text-[11px] font-medium text-white"
          style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)' }}
        >
          Save
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {/* Workflow name */}
        <div className="mb-5">
          <h2 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9] mb-1">Run Tests</h2>
          <p className="font-['Work_Sans'] text-[12px] text-[#64748B]">Template: run_tests · 3 steps</p>
        </div>

        {/* Steps timeline */}
        <div className="relative mb-6">
          {/* Dotted connecting line */}
          <div className="absolute left-[23px] top-10 bottom-6 w-[2px]"
            style={{ backgroundImage: 'repeating-linear-gradient(to bottom, #334155 0, #334155 4px, transparent 4px, transparent 10px)' }}
          ></div>

          <div className="space-y-3">
            {[
              { name: "Install Dependencies", type: "command", tools: ["npm ci"], status: "configured", icon: Icons.Package },
              { name: "Run Test Suite", type: "command", tools: ["npm test"], status: "configured", icon: Icons.FlaskConical },
              { name: "Report Results", type: "ai_analysis", tools: ["copilot"], status: "configured", icon: Icons.Bot },
            ].map((step, i) => {
              const StepIcon = step.icon;
              return (
                <div key={i} className="relative flex gap-3.5">
                  {/* Step number circle */}
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
                    style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)', border: '2px solid #8B5CF6' }}
                  >
                    <StepIcon className="w-5 h-5 text-[#8B5CF6]" />
                  </div>
                  {/* Step card */}
                  <div className="flex-1 rounded-2xl p-3.5"
                    style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">{step.name}</p>
                      <button className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'rgba(100,116,139,0.1)' }}>
                        <Icons.MoreHorizontal className="w-3 h-3 text-[#64748B]" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-['Work_Sans'] text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6]">
                        {step.type.replace(/_/g, ' ')}
                      </span>
                      {step.tools.map((tool, j) => (
                        <span key={j} className="font-['IBM_Plex_Mono'] text-[10px] px-2 py-0.5 rounded-full bg-[#1E293B]/50 text-[#64748B]">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add step button */}
        <button className="w-full rounded-2xl py-3.5 flex items-center justify-center gap-2 mb-6"
          style={{ background: 'rgba(139,92,246,0.06)', border: '1px dashed rgba(139,92,246,0.3)' }}
        >
          <Icons.Plus className="w-4 h-4 text-[#8B5CF6]" />
          <span className="font-['Manrope'] text-[12px] font-semibold text-[#8B5CF6]">Add Step</span>
        </button>

        {/* Schedule section */}
        <div className="rounded-2xl p-4 mb-5"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Icons.Clock className="w-4 h-4 text-[#3B82F6]" />
            <h3 className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">Schedule</h3>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-['Work_Sans'] text-[12px] text-[#64748B]">On push to main</span>
            <div className="w-11 h-6 rounded-full flex items-center justify-end px-0.5"
              style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)' }}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md"></div>
            </div>
          </div>
          <div className="rounded-xl px-3 py-2.5" style={{ background: 'rgba(11,16,32,0.6)' }}>
            <span className="font-['IBM_Plex_Mono'] text-[11px] text-[#475569]">Cron: — (trigger-based)</span>
          </div>
        </div>

        {/* Test run button */}
        <button className="w-full py-3.5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-white flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)', boxShadow: '0 8px 24px rgba(59,130,246,0.3)' }}
        >
          <Icons.Play className="w-4 h-4" />
          Test Run
        </button>
      </div>
    </div>
  );

  const renderStepEditor = () => (
    <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="absolute bottom-0 left-0 right-0 rounded-t-[24px] max-h-[80vh] overflow-y-auto"
        style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)', boxShadow: '0 -8px 40px rgba(0,0,0,0.5)' }}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-[#334155]"></div>
        </div>
        <div className="px-5 pb-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9]">Edit Step</h3>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(100,116,139,0.15)' }}>
              <Icons.X className="w-4 h-4 text-[#64748B]" />
            </button>
          </div>

          {/* Step name */}
          <div className="mb-4">
            <label className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-1.5 block">Step Name</label>
            <div className="rounded-xl px-4 py-3"
              style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
            >
              <span className="font-['Work_Sans'] text-[15px] text-[#F1F5F9]">Run Test Suite</span>
            </div>
          </div>

          {/* Step type */}
          <div className="mb-4">
            <label className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-1.5 block">Step Type</label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Command", active: true },
                { label: "File Op", active: false },
                { label: "AI Analysis", active: false },
                { label: "Validation", active: false },
                { label: "Notification", active: false },
              ].map((type, i) => (
                <button key={i} className="px-3 py-1.5 rounded-lg font-['Work_Sans'] text-[11px] font-medium"
                  style={{ background: type.active ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : 'rgba(100,116,139,0.1)', color: type.active ? 'white' : '#64748B' }}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Command */}
          <div className="mb-4">
            <label className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-1.5 block">Command</label>
            <div className="rounded-xl px-4 py-3 font-['IBM_Plex_Mono']"
              style={{ background: 'rgba(11,16,32,0.8)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)' }}
            >
              <span className="text-[#94A3B8] text-[13px]">npm test -- --coverage --ci</span>
            </div>
          </div>

          {/* Tools/Skills */}
          <div className="mb-4">
            <label className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-1.5 block">Assigned Tools</label>
            <div className="flex flex-wrap gap-2">
              {["npm", "node", "jest"].map((tool, i) => (
                <span key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-['IBM_Plex_Mono'] text-[11px] text-[#94A3B8]"
                  style={{ background: 'rgba(30,41,59,0.4)' }}
                >
                  {tool}
                  <Icons.X className="w-3 h-3 text-[#475569]" />
                </span>
              ))}
              <button className="px-2.5 py-1 rounded-lg font-['Work_Sans'] text-[11px] text-[#3B82F6]"
                style={{ background: 'rgba(59,130,246,0.1)' }}
              >
                + Add
              </button>
            </div>
          </div>

          {/* Failure handling */}
          <div className="mb-6">
            <label className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-1.5 block">On Failure</label>
            <div className="rounded-xl px-4 py-3 flex items-center justify-between"
              style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
            >
              <span className="font-['Work_Sans'] text-[13px] text-[#F1F5F9]">Stop workflow</span>
              <Icons.ChevronDown className="w-4 h-4 text-[#64748B]" />
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
              Save Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTestRunMonitor = () => (
    <div className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)' }}
    >
      <header className="flex items-center justify-between px-5 pt-5 pb-3">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.X className="w-5 h-5 text-[#64748B]" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#22D3EE] animate-pulse"></div>
          <h3 className="font-['Manrope'] text-[13px] font-semibold text-[#22D3EE]">Running</h3>
        </div>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <h2 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9] mb-1">Run Tests</h2>
        <p className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-6">api-gateway · Home Server</p>

        {/* Step progress */}
        <div className="space-y-2.5 mb-6">
          {[
            { name: "Install Dependencies", status: "completed", duration: "8s" },
            { name: "Run Test Suite", status: "running", duration: "1m 42s" },
            { name: "Report Results", status: "pending", duration: "" },
          ].map((step, i) => (
            <div key={i} className="rounded-2xl px-4 py-3.5 flex items-center gap-3"
              style={{
                background: step.status === 'running' ? 'rgba(34,211,238,0.06)' : 'linear-gradient(180deg, #1A2235, #141B2D)',
                boxShadow: step.status === 'running' ? '0 0 0 1px rgba(34,211,238,0.2)' : '0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              {step.status === 'completed' && (
                <div className="w-8 h-8 rounded-lg bg-[#22C55E]/15 flex items-center justify-center flex-shrink-0">
                  <Icons.Check className="w-4 h-4 text-[#22C55E]" />
                </div>
              )}
              {step.status === 'running' && (
                <div className="w-8 h-8 rounded-lg bg-[#22D3EE]/15 flex items-center justify-center flex-shrink-0">
                  <Icons.Loader className="w-4 h-4 text-[#22D3EE] animate-spin" />
                </div>
              )}
              {step.status === 'pending' && (
                <div className="w-8 h-8 rounded-lg bg-[#1E293B]/50 flex items-center justify-center flex-shrink-0">
                  <Icons.Circle className="w-4 h-4 text-[#334155]" />
                </div>
              )}
              <div className="flex-1">
                <p className={`font-['Manrope'] text-[13px] font-semibold ${
                  step.status === 'completed' ? 'text-[#22C55E]' : step.status === 'running' ? 'text-[#F1F5F9]' : 'text-[#475569]'
                }`}>
                  {step.name}
                </p>
                {step.duration && (
                  <p className="font-['Work_Sans'] text-[11px] text-[#475569]">{step.duration}</p>
                )}
              </div>
              {step.status === 'completed' && <span className="font-['Work_Sans'] text-[10px] text-[#22C55E]">Done</span>}
              {step.status === 'running' && <span className="font-['Work_Sans'] text-[10px] text-[#22D3EE]">Running...</span>}
            </div>
          ))}
        </div>

        {/* Live log output */}
        <h3 className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9] mb-2.5">Live Output</h3>
        <div className="rounded-2xl overflow-hidden"
          style={{ background: 'rgba(11,16,32,0.8)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)' }}
        >
          <div className="p-4 font-['IBM_Plex_Mono'] text-[11px] leading-relaxed max-h-[200px] overflow-y-auto">
            <p className="text-[#64748B] mb-1">$ npm test -- --coverage --ci</p>
            <p className="text-[#94A3B8] mb-1">Running 142 test suites...</p>
            <p className="text-[#94A3B8] mb-1">✓ auth.spec.ts (8 tests) <span className="text-[#22C55E]">8 passed</span></p>
            <p className="text-[#94A3B8] mb-1">✓ api.spec.ts (24 tests) <span className="text-[#22C55E]">24 passed</span></p>
            <p className="text-[#94A3B8] mb-1">✓ integration.spec.ts (12 tests) <span className="text-[#22C55E]">12 passed</span></p>
            <p className="text-[#22D3EE]">▶ middleware.spec.ts (6 tests) running...</p>
          </div>
        </div>

        {/* Cancel button */}
        <button className="w-full mt-5 py-3.5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-[#EF4444]"
          style={{ background: 'rgba(239,68,68,0.1)' }}
        >
          Cancel Run
        </button>
      </div>
    </div>
  );

  const renderRunDetail = () => (
    <div className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)' }}
    >
      <header className="flex items-center justify-between px-5 pt-5 pb-3">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.ArrowLeft className="w-5 h-5 text-[#64748B]" />
        </button>
        <h3 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">Run Detail</h3>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {/* Status header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#22C55E]/15 flex items-center justify-center">
            <Icons.CheckCircle2 className="w-6 h-6 text-[#22C55E]" />
          </div>
          <div>
            <h2 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9">Completed</h2>
            <p className="font-['Work_Sans'] text-[12px] text-[#64748B]">Run Tests · api-gateway</p>
          </div>
        </div>

        {/* Metadata grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {[
            { label: "Triggered By", value: "Manual", color: "#F1F5F9" },
            { label: "Duration", value: "2m 14s", color: "#F1F5F9" },
            { label: "Started", value: "14:26 UTC", color: "#F1F5F9" },
            { label: "Completed", value: "14:28 UTC", color: "#22C55E" },
          ].map((meta, i) => (
            <div key={i} className="rounded-xl px-3 py-2.5" style={{ background: 'rgba(11,16,32,0.6)' }}>
              <p className="font-['Work_Sans'] text-[10px] text-[#64748B] mb-0.5">{meta.label}</p>
              <p className="font-['Work_Sans'] text-[13px] font-medium" style={{ color: meta.color }}>{meta.value}</p>
            </div>
          ))}
        </div>

        {/* Steps breakdown */}
        <h3 className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9] mb-2.5">Steps</h3>
        <div className="space-y-2 mb-5">
          {[
            { name: "Install Dependencies", status: "completed", duration: "8s" },
            { name: "Run Test Suite", status: "completed", duration: "1m 58s" },
            { name: "Report Results", status: "completed", duration: "8s" },
          ].map((step, i) => (
            <div key={i} className="rounded-xl px-3.5 py-3 flex items-center gap-3"
              style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
            >
              <div className="w-7 h-7 rounded-lg bg-[#22C55E]/15 flex items-center justify-center flex-shrink-0">
                <Icons.Check className="w-3.5 h-3.5 text-[#22C55E]" />
              </div>
              <div className="flex-1">
                <p className="font-['Work_Sans'] text-[13px] text-[#F1F5F9]">{step.name}</p>
              </div>
              <span className="font-['Work_Sans'] text-[11px] text-[#64748B]">{step.duration}</span>
            </div>
          ))}
        </div>

        {/* Output logs */}
        <h3 className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9] mb-2.5">Output</h3>
        <div className="rounded-2xl overflow-hidden"
          style={{ background: 'rgba(11,16,32,0.8)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)' }}
        >
          <div className="p-4 font-['IBM_Plex_Mono'] text-[11px] leading-relaxed max-h-[200px] overflow-y-auto">
            <p className="text-[#64748B] mb-1">$ npm test -- --coverage --ci</p>
            <p className="text-[#94A3B8] mb-1">Running 142 test suites...</p>
            <p className="text-[#94A3B8] mb-1">✓ auth.spec.ts (8 tests) <span className="text-[#22C55E]">8 passed</span></p>
            <p className="text-[#94A3B8] mb-1">✓ api.spec.ts (24 tests) <span className="text-[#22C55E]">24 passed</span></p>
            <p className="text-[#94A3B8] mb-1">✓ integration.spec.ts (12 tests) <span className="text-[#22C55E]">12 passed</span></p>
            <p className="text-[#94A3B8] mb-1">✓ middleware.spec.ts (6 tests) <span className="text-[#22C55E]">6 passed</span></p>
            <p className="text-[#64748B] mb-1">...</p>
            <p className="text-[#22C55E]">All 142 tests passed ✓</p>
            <p className="text-[#94A3B8]">Coverage: 87.3% statements</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-5">
          <button className="flex-1 py-3.5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-white flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)' }}
          >
            <Icons.RefreshCw className="w-4 h-4" />
            Re-run
          </button>
          <button className="py-3.5 px-5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-[#64748B]"
            style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
          >
            <Icons.Share2 className="w-4 h-4" />
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
          const isActive = tab.id === "agents";
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
            {renderWorkflowList()}
          </div>
          {renderBottomNav()}
        </>
      )}

      {state === "templateGallery" && renderTemplateGallery()}
      {state === "editor" && renderEditor()}
      {state === "stepEditor" && renderStepEditor()}
      {state === "testRunMonitor" && renderTestRunMonitor()}
      {state === "runDetail" && renderRunDetail()}
    </div>
  );
};

export default AgentWorkflowPanelScreen;