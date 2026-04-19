import React from "react";
import * as Icons from "lucide-react";

export interface ProjectsScreenProps {
  state: string;
}

/**
 * States:
 * - default: Project List — The main view showing a list of stacked project cards with their status indicators.
 * - empty: Empty State — View displayed when no projects exist, showing a guided empty state.
 * - createStep1: Create Project: Name & Repo — First step of the create flow modal.
 * - createStep2: Create Project: Select Host — Second step of the create flow modal.
 * - createStep3: Create Project: Confirm Services — Third step of the create flow modal.
 * - createStep4: Create Project: Attach Workflow — Final step of the create flow modal.
 * - contextMenu: Project Context Menu — A bottom sheet menu triggered by swipe or long-press.
 * - deleteConfirm: Delete Confirmation Dialog — A confirmation dialog warning about project deletion.
 */
const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ state }) => {

  const renderHeader = () => (
    <header className="flex items-center justify-between px-5 pt-4 pb-2">
      <div>
        <h1 className="font-['Manrope'] text-[32px] font-bold text-[#F1F5F9] leading-tight tracking-tight">Projects</h1>
        <p className="font-['Work_Sans'] text-[13px] text-[#64748B] mt-0.5">Manage your coding projects</p>
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

  const renderProjectCard = (name: string, repo: string, hostStatus: string, workflowStatus: string, deployStatus: string, lastRun: string) => (
    <div className="rounded-2xl p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1A2235 0%, #141B2D 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/12 flex items-center justify-center">
            <Icons.FolderKanban className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div>
            <p className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">{name}</p>
            <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">{repo}</p>
          </div>
        </div>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(100,116,139,0.1)' }}
        >
          <Icons.MoreVertical className="w-4 h-4 text-[#64748B]" />
        </button>
      </div>

      {/* Status row */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full"
          style={{ background: hostStatus === 'healthy' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)' }}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${hostStatus === 'healthy' ? 'bg-[#22C55E]' : 'bg-[#F59E0B]'}`}></div>
          <span className={`font-['Work_Sans'] text-[10px] font-medium ${hostStatus === 'healthy' ? 'text-[#22C55E]' : 'text-[#F59E0B]'}`}>
            Host
          </span>
        </div>
        {workflowStatus && (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full"
            style={{ background: workflowStatus === 'active' ? 'rgba(139,92,246,0.1)' : 'rgba(100,116,139,0.1)' }}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${workflowStatus === 'active' ? 'bg-[#8B5CF6]' : 'bg-[#64748B]'}`}></div>
            <span className={`font-['Work_Sans'] text-[10px] font-medium ${workflowStatus === 'active' ? 'text-[#8B5CF6]' : 'text-[#64748B]'}`}>
              Workflow
            </span>
          </div>
        )}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full"
          style={{ background: deployStatus === 'running' ? 'rgba(34,197,94,0.1)' : deployStatus === 'stopped' ? 'rgba(100,116,139,0.1)' : 'rgba(239,68,68,0.1)' }}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${deployStatus === 'running' ? 'bg-[#22C55E]' : deployStatus === 'stopped' ? 'bg-[#64748B]' : 'bg-[#EF4444]'}`}></div>
          <span className={`font-['Work_Sans'] text-[10px] font-medium ${deployStatus === 'running' ? 'text-[#22C55E]' : deployStatus === 'stopped' ? 'text-[#64748B]' : 'text-[#EF4444]'}`}>
            Deploy
          </span>
        </div>
        <span className="font-['Work_Sans'] text-[10px] text-[#475569] ml-auto">{lastRun}</span>
      </div>
    </div>
  );

  const renderProjectList = () => (
    <div className="px-5 mt-4 space-y-3 pb-4">
      {renderProjectCard("api-gateway", "my-org/api-gateway", "healthy", "active", "running", "2m ago")}
      {renderProjectCard("web-app", "my-org/web-app", "healthy", "active", "running", "8m ago")}
      {renderProjectCard("worker-service", "my-org/worker-service", "degraded", "", "stopped", "1h ago")}
      {renderProjectCard("infra-config", "my-org/infra-config", "healthy", "active", "running", "3h ago")}
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-8 pb-20">
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
        style={{
          background: 'linear-gradient(180deg, #1A2235, #141B2D)',
          boxShadow: '0 0 40px rgba(139,92,246,0.15), 0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <Icons.FolderPlus className="w-10 h-10 text-[#8B5CF6]" />
      </div>
      <h2 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9] mb-2">No Projects Yet</h2>
      <p className="font-['Work_Sans'] text-[13px] text-[#64748B] text-center leading-relaxed max-w-[260px] mb-8">
        Create your first project to link a GitHub repository, connect a host, and start deploying.
      </p>
      <button className="px-8 py-3.5 rounded-2xl font-['Manrope'] text-[13px] font-semibold text-white"
        style={{
          background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
          boxShadow: '0 8px 32px rgba(59,130,246,0.35)',
        }}
      >
        Create Your First Project
      </button>
    </div>
  );

  const renderStepIndicator = (currentStep: number, totalSteps: number) => (
    <div className="flex items-center gap-2 mb-5">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} className="flex-1 h-1 rounded-full overflow-hidden"
          style={{ background: 'rgba(30,41,59,0.5)' }}
        >
          <div className="h-full rounded-full"
            style={{
              width: i < currentStep ? '100%' : i === currentStep ? '50%' : '0%',
              background: i <= currentStep ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : 'transparent',
            }}
          ></div>
        </div>
      ))}
    </div>
  );

  const renderCreateModal = (step: number) => (
    <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
      <div className="absolute bottom-0 left-0 right-0 rounded-t-[24px] max-h-[90vh] overflow-y-auto"
        style={{
          background: 'linear-gradient(180deg, #0D1424 0%, #0B1020 100%)',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.5)',
        }}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-[#334155]"></div>
        </div>

        <div className="px-5 pb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9]">New Project</h3>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(100,116,139,0.15)' }}
            >
              <Icons.X className="w-4 h-4 text-[#64748B]" />
            </button>
          </div>

          {renderStepIndicator(step, 4)}

          {/* Step 1: Name & Repo */}
          {step === 0 && (
            <div>
              <p className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9] mb-1">Name & Repository</p>
              <p className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-5">Choose a name and pick a repo</p>
              <div className="mb-4">
                <label className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-1.5 block">Project Name</label>
                <div className="rounded-xl px-4 py-3"
                  style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
                >
                  <span className="font-['Work_Sans'] text-[15px] text-[#F1F5F9]">my-new-project</span>
                </div>
              </div>
              <div className="mb-6">
                <label className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-1.5 block">GitHub Repository</label>
                <div className="rounded-xl px-4 py-3 flex items-center justify-between"
                  style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
                >
                  <span className="font-['Work_Sans'] text-[13px] text-[#475569]">Select a repository</span>
                  <Icons.ChevronDown className="w-4 h-4 text-[#64748B]" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Select Host */}
          {step === 1 && (
            <div>
              <p className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9] mb-1">Select Host</p>
              <p className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-5">Choose which host to deploy on</p>
              <div className="space-y-2.5 mb-6">
                {[
                  { name: "Home Server", status: "healthy", selected: true },
                  { name: "Office PC", status: "healthy", selected: false },
                ].map((host, i) => (
                  <button key={i} className="w-full rounded-xl px-4 py-3.5 flex items-center gap-3 text-left"
                    style={{
                      background: host.selected ? 'rgba(59,130,246,0.08)' : 'linear-gradient(180deg, #1A2235, #141B2D)',
                      boxShadow: host.selected ? '0 0 0 1px rgba(59,130,246,0.3)' : '0 4px 16px rgba(0,0,0,0.2)',
                    }}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-['Manrope'] text-[12px] font-bold text-[#F1F5F9]"
                      style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', border: `2px solid ${host.status === 'healthy' ? '#22C55E' : '#F59E0B'}` }}
                    >
                      {host.name.split(' ').map(w => w[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <p className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">{host.name}</p>
                      <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">Docker 24.0 · Compose 2.23</p>
                    </div>
                    {host.selected && <Icons.Check className="w-4 h-4 text-[#3B82F6]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Confirm Services */}
          {step === 2 && (
            <div>
              <p className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9] mb-1">Confirm Services</p>
              <p className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-5">Auto-detected Docker services</p>
              <div className="rounded-xl px-3 py-2 flex items-center gap-2 mb-4"
                style={{ background: 'rgba(34,211,238,0.08)' }}
              >
                <Icons.Search className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span className="font-['Work_Sans'] text-[11px] text-[#22D3EE]">Found 3 services</span>
              </div>
              <div className="space-y-2 mb-6">
                {[
                  { name: "api", image: "node:20-alpine", on: true },
                  { name: "postgres", image: "postgres:16", on: true },
                  { name: "redis", image: "redis:7-alpine", on: false },
                ].map((svc, i) => (
                  <div key={i} className="rounded-xl px-4 py-3 flex items-center gap-3"
                    style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
                  >
                    <Icons.Container className={`w-4 h-4 ${svc.on ? 'text-[#3B82F6]' : 'text-[#475569]'}`} />
                    <div className="flex-1">
                      <p className={`font-['Work_Sans'] text-[13px] ${svc.on ? 'text-[#F1F5F9]' : 'text-[#64748B]'}`}>{svc.name}</p>
                      <p className="font-['Work_Sans'] text-[10px] text-[#475569]">{svc.image}</p>
                    </div>
                    <div className={`w-10 h-5.5 rounded-full flex items-center px-0.5 ${svc.on ? 'justify-end' : 'justify-start'}`}
                      style={{ background: svc.on ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : '#1E293B' }}
                    >
                      <div className="w-4.5 h-4.5 rounded-full bg-white shadow-sm"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Attach Workflow */}
          {step === 3 && (
            <div>
              <p className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9] mb-1">Attach Workflow</p>
              <p className="font-['Work_Sans'] text-[12px] text-[#475569] mb-5">Optional — add automation later</p>
              <div className="space-y-2 mb-6">
                {[
                  { name: "Run Tests", desc: "Execute test suite on push", selected: true },
                  { name: "Build & Deploy", desc: "Build and deploy to host", selected: false },
                ].map((wf, i) => (
                  <button key={i} className="w-full rounded-xl px-4 py-3.5 flex items-center gap-3 text-left"
                    style={{
                      background: wf.selected ? 'rgba(59,130,246,0.08)' : 'linear-gradient(180deg, #1A2235, #141B2D)',
                      boxShadow: wf.selected ? '0 0 0 1px rgba(59,130,246,0.3)' : '0 4px 16px rgba(0,0,0,0.2)',
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: wf.selected ? 'rgba(59,130,246,0.15)' : 'rgba(100,116,139,0.1)' }}
                    >
                      <Icons.Zap className={`w-5 h-5 ${wf.selected ? 'text-[#3B82F6]' : 'text-[#64748B]'}`} />
                    </div>
                    <div className="flex-1">
                      <p className={`font-['Manrope'] text-[13px] font-semibold ${wf.selected ? 'text-[#F1F5F9]' : 'text-[#64748B]'}`}>{wf.name}</p>
                      <p className="font-['Work_Sans'] text-[11px] text-[#475569]">{wf.desc}</p>
                    </div>
                    {wf.selected && <Icons.Check className="w-4 h-4 text-[#3B82F6]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-3">
            {step > 0 && (
              <button className="flex-1 py-3.5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-[#64748B]"
                style={{ background: 'rgba(100,116,139,0.1)' }}
              >
                Back
              </button>
            )}
            <button className="flex-1 py-3.5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-white"
              style={{
                background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
                boxShadow: '0 8px 24px rgba(59,130,246,0.3)',
              }}
            >
              {step === 3 ? 'Create Project' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContextMenu = () => (
    <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="absolute bottom-0 left-0 right-0 rounded-t-[24px]"
        style={{
          background: 'linear-gradient(180deg, #0D1424 0%, #0B1020 100%)',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.5)',
        }}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-[#334155]"></div>
        </div>
        <div className="px-5 pb-8">
          <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: '1px solid rgba(100,116,139,0.1)' }}>
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/12 flex items-center justify-center">
              <Icons.FolderKanban className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div>
              <p className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">api-gateway</p>
              <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">my-org/api-gateway</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { icon: Icons.Pencil, label: "Edit Project", color: "#3B82F6" },
              { icon: Icons.Copy, label: "Duplicate", color: "#8B5CF6" },
              { icon: Icons.Archive, label: "Archive", color: "#F59E0B" },
              { icon: Icons.Trash2, label: "Delete", color: "#EF4444" },
            ].map((action, i) => (
              <button key={i} className="w-full rounded-xl px-4 py-3.5 flex items-center gap-3 text-left"
                style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
              >
                <action.icon className="w-5 h-5" style={{ color: action.color }} />
                <span className="font-['Manrope'] text-[14px] font-medium text-[#F1F5F9]">{action.label}</span>
              </button>
            ))}
          </div>
          <button className="w-full mt-4 py-3.5 rounded-xl font-['Manrope'] text-[13px] font-semibold text-[#64748B]"
            style={{ background: 'rgba(100,116,139,0.1)' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderDeleteConfirm = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-sm rounded-2xl p-5"
        style={{
          background: 'linear-gradient(180deg, #0D1424 0%, #0B1020 100%)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(239,68,68,0.15)' }}
        >
          <Icons.AlertTriangle className="w-7 h-7 text-[#EF4444]" />
        </div>
        <h3 className="font-['Manrope'] text-[18px] font-bold text-[#F1F5F9] text-center mb-2">Delete Project?</h3>
        <p className="font-['Work_Sans'] text-[13px] text-[#64748B] text-center leading-relaxed mb-6">
          This will permanently delete <span className="text-[#F1F5F9] font-medium">api-gateway</span> and all its deployment data. This action cannot be undone.
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
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  const renderBottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-2"
      style={{ background: 'linear-gradient(180deg, rgba(11,16,32,0) 0%, #0B1020 20%, #0B1020 100%)' }}
    >
      <div className="flex items-center justify-around bg-[#0D1424]/90 backdrop-blur-xl rounded-2xl py-3 px-4"
        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)', border: '1px solid rgba(100,116,139,0.1)' }}
      >
        {[
          { icon: Icons.LayoutDashboard, label: "Hub", active: false },
          { icon: Icons.FolderKanban, label: "Projects", active: true },
          { icon: Icons.Bot, label: "Agents", active: false },
          { icon: Icons.Server, label: "Deploy", active: false },
        ].map((tab, i) => (
          <button key={i} className="flex flex-col items-center gap-1.5 px-4 py-1 rounded-xl">
            <tab.icon className={`w-5 h-5 ${tab.active ? 'text-[#3B82F6]' : 'text-[#64748B]'}`} />
            <span className={`font-['Work_Sans'] text-[10px] font-medium ${tab.active ? 'text-[#3B82F6]' : 'text-[#64748B]'}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );

  const renderFloatingButton = () => (
    <button className="fixed bottom-24 right-5 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
        boxShadow: '0 8px 32px rgba(59,130,246,0.4)',
      }}
    >
      <Icons.Plus className="w-6 h-6 text-white" />
    </button>
  );

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0D1424 0%, #0B1020 100%)' }}>
      {renderHeader()}

      {/* Filter bar */}
      {(state === 'default' || state === 'empty') && (
        <div className="px-5 mt-3 flex gap-2 overflow-x-auto pb-2">
          {['All Projects', 'Running', 'Stopped', 'With Workflows'].map((filter, i) => (
            <button key={i} className={`px-4 py-2 rounded-full font-['Work_Sans'] text-[12px] font-medium whitespace-nowrap ${i === 0 ? 'text-white' : 'text-[#64748B]'}`}
              style={{ background: i === 0 ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : 'rgba(100,116,139,0.1)' }}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      {/* Main content */}
      {state === 'default' && renderProjectList()}
      {state === 'empty' && renderEmptyState()}

      {/* Floating action button */}
      {(state === 'default' || state === 'empty') && renderFloatingButton()}

      {/* Modals */}
      {state === 'createStep1' && renderCreateModal(0)}
      {state === 'createStep2' && renderCreateModal(1)}
      {state === 'createStep3' && renderCreateModal(2)}
      {state === 'createStep4' && renderCreateModal(3)}
      {state === 'contextMenu' && renderContextMenu()}
      {state === 'deleteConfirm' && renderDeleteConfirm()}

      {/* Bottom navigation */}
      {renderBottomNav()}
    </div>
  );
};

export default ProjectsScreen;
