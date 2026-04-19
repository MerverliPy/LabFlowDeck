import React from "react";
import * as Icons from "lucide-react";

export interface OnboardingScreenProps {
  state: string;
}

/**
 * States:
 * - welcome: Welcome Screen — The initial screen displayed to new users with the value proposition and a "Get Started" button.
 * - githubAuthPrompt: GitHub Auth Prompt — Screen prompting the user to authenticate via GitHub OAuth, explaining it is the only auth method.
 * - hostPrompt: Host Onboarding Prompt — Screen asking the user to pair their first host, highlighting agent-based pairing as the primary method.
 * - hostPairing: Host Pairing Command — Screen displaying the generated secure pairing command/script with a "Copy" button.
 * - hostValidation: Host Validation — Loading state showing the system validating SSH connectivity, Docker availability, and host health.
 * - createProjectIntro: First Project Creation Intro — Introductory step for creating the first project.
 * - createProjectRepo: Select GitHub Repo — Step where the user selects a GitHub repository from their connected account.
 * - createProjectHost: Select Host — Step where the user selects the paired host to use for the project.
 * - createProjectServices: Confirm Services — Step showing auto-detected Docker/Compose services with toggles.
 * - createProjectWorkflow: Attach Workflow — Optional step allowing the user to attach an existing workflow or create a new one.
 */
const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ state }) => {

  const renderWelcome = () => (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 relative"
      style={{ background: 'linear-gradient(180deg, #0D1424 0%, #080E1A 50%, #0B1020 100%)' }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)' }}
      ></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }}
      ></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Logo mark */}
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 relative"
          style={{
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            boxShadow: '0 0 40px rgba(59,130,246,0.3), 0 0 80px rgba(139,92,246,0.15)',
          }}
        >
          <Icons.Terminal className="w-10 h-10 text-white" />
        </div>

        <h1 className="font-['Manrope'] text-[32px] font-bold text-[#F1F5F9] leading-tight tracking-tight mb-2">
          LabFlow Deck
        </h1>
        <p className="font-['Work_Sans'] text-[15px] text-[#64748B] leading-relaxed max-w-[280px] mb-1">
          Your mobile command center for AI-assisted development
        </p>
        <p className="font-['Work_Sans'] text-[13px] text-[#475569] leading-relaxed max-w-[260px] mb-12">
          Manage projects, agent workflows, and deployments — all from your phone
        </p>

        <button className="w-full max-w-[280px] py-4 rounded-2xl font-['Manrope'] text-[15px] font-semibold text-white mb-4"
          style={{
            background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
            boxShadow: '0 8px 32px rgba(59,130,246,0.35)',
          }}
        >
          Get Started
        </button>

        <p className="font-['Work_Sans'] text-[12px] text-[#475569]">
          Requires a GitHub account
        </p>
      </div>
    </div>
  );

  const renderGithubAuthPrompt = () => (
    <div className="flex flex-col min-h-screen px-6 relative"
      style={{ background: 'linear-gradient(180deg, #0D1424 0%, #0B1020 100%)' }}
    >
      {/* Back button */}
      <div className="pt-5 pb-4">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.ArrowLeft className="w-5 h-5 text-[#64748B]" />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center pb-12">
        {/* GitHub icon */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
          style={{
            background: 'linear-gradient(180deg, #1A2235, #141B2D)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <Icons.Github className="w-8 h-8 text-[#F1F5F9]" />
        </div>

        <h1 className="font-['Manrope'] text-[32px] font-bold text-[#F1F5F9] text-center leading-tight tracking-tight mb-2">
          Connect GitHub
        </h1>
        <p className="font-['Work_Sans'] text-[15px] text-[#64748B] text-center leading-relaxed max-w-[300px] mx-auto mb-8">
          GitHub is your primary identity in LabFlow Deck. We'll request access to your repositories and Copilot integration.
        </p>

        {/* Permission cards */}
        <div className="space-y-2.5 mb-8">
          {[
            { icon: Icons.GitBranch, title: "Repository Access", desc: "Read access to your repos and metadata" },
            { icon: Icons.Bot, title: "Copilot Integration", desc: "Connect GitHub Copilot for AI workflows" },
            { icon: Icons.Key, title: "Secure OAuth", desc: "We never store your password" },
          ].map((perm, i) => {
            const PermIcon = perm.icon;
            return (
              <div key={i} className="rounded-2xl px-4 py-3.5 flex items-center gap-3"
                style={{
                  background: 'linear-gradient(180deg, #1A2235 0%, #141B2D 100%)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                }}
              >
                <div className="w-9 h-9 rounded-xl bg-[#3B82F6]/12 flex items-center justify-center flex-shrink-0">
                  <PermIcon className="w-4.5 h-4.5 text-[#3B82F6]" />
                </div>
                <div>
                  <p className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">{perm.title}</p>
                  <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">{perm.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button className="w-full py-4 rounded-2xl font-['Manrope'] text-[15px] font-semibold text-white flex items-center justify-center gap-2.5"
          style={{
            background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
            boxShadow: '0 8px 32px rgba(59,130,246,0.35)',
          }}
        >
          <Icons.Github className="w-5 h-5" />
          Authorize with GitHub
        </button>
      </div>
    </div>
  );

  const renderHostPrompt = () => (
    <div className="flex flex-col min-h-screen px-6 relative"
      style={{ background: 'linear-gradient(180deg, #0D1424 0%, #0B1020 100%)' }}
    >
      <div className="pt-5 pb-4">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.ArrowLeft className="w-5 h-5 text-[#64748B]" />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center pb-12">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
          style={{
            background: 'linear-gradient(180deg, #1A2235, #141B2D)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <Icons.Server className="w-8 h-8 text-[#22D3EE]" />
        </div>

        <h1 className="font-['Manrope'] text-[32px] font-bold text-[#F1F5F9] text-center leading-tight tracking-tight mb-2">
          Pair Your First Host
        </h1>
        <p className="font-['Work_Sans'] text-[15px] text-[#64748B] text-center leading-relaxed max-w-[300px] mx-auto mb-8">
          Connect your server or PC to manage Docker deployments and run agent workflows remotely.
        </p>

        {/* Primary method: Agent pairing */}
        <div className="rounded-2xl p-5 mb-3 relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #1A2235 0%, #141B2D 100%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <div className="absolute inset-0 rounded-2xl p-[1px]"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          ></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-['Work_Sans'] text-[10px] font-medium text-[#8B5CF6] px-2 py-0.5 rounded-full bg-[#8B5CF6]/15">Recommended</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <Icons.Cpu className="w-5 h-5 text-[#3B82F6]" />
              <p className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">Agent-Based Pairing</p>
            </div>
            <p className="font-['Work_Sans'] text-[12px] text-[#64748B] leading-relaxed mb-4">
              Run a single command on your host. The agent handles connectivity, health checks, and Docker detection automatically.
            </p>
            <button className="w-full py-3 rounded-xl font-['Manrope'] text-[13px] font-semibold text-white"
              style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)' }}
            >
              Generate Pairing Command
            </button>
          </div>
        </div>

        {/* Advanced fallback: Manual SSH */}
        <div className="rounded-2xl p-5 relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #1A2235 0%, #141B2D 100%)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Icons.Terminal className="w-5 h-5 text-[#64748B]" />
            <p className="font-['Manrope'] text-[15px] font-semibold text-[#94A3B8]">Manual SSH Configuration</p>
          </div>
          <p className="font-['Work_Sans'] text-[12px] text-[#475569] leading-relaxed mb-4">
            Advanced option — enter IP, port, user, and SSH key details manually.
          </p>
          <button className="w-full py-3 rounded-xl font-['Manrope'] text-[13px] font-semibold text-[#64748B]"
            style={{ background: 'rgba(100,116,139,0.1)' }}
          >
            Configure Manually
          </button>
        </div>
      </div>
    </div>
  );

  const renderHostPairing = () => (
    <div className="flex flex-col min-h-screen px-6 relative"
      style={{ background: 'linear-gradient(180deg, #0D1424 0%, #0B1020 100%)' }}
    >
      <div className="pt-5 pb-4">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.ArrowLeft className="w-5 h-5 text-[#64748B]" />
        </button>
      </div>

      <div className="flex-1 flex flex-col pb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/12 flex items-center justify-center">
            <Icons.Cpu className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div>
            <h1 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9] leading-tight">Pairing Command</h1>
            <p className="font-['Work_Sans'] text-[12px] text-[#64748B]">Run this command on your host</p>
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-2 mt-4 mb-6">
          {["1. Copy", "2. Run on Host", "3. Validate"].map((step, i) => (
            <div key={i} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
              i === 0 ? 'text-[#3B82F6]' : 'text-[#475569]'
            }`}
              style={i === 0 ? { background: 'rgba(59,130,246,0.12)' } : { background: 'rgba(71,85,105,0.1)' }}
            >
              <span className="font-['Work_Sans'] text-[11px] font-medium">{step}</span>
            </div>
          ))}
        </div>

        {/* Code block */}
        <div className="rounded-2xl overflow-hidden mb-5"
          style={{
            background: 'rgba(11,16,32,0.8)',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1E293B]/50">
            <span className="font-['Work_Sans'] text-[11px] text-[#64748B]">Terminal</span>
            <button className="flex items-center gap-1.5 px-3 py-1 rounded-lg"
              style={{ background: 'rgba(59,130,246,0.12)' }}
            >
              <Icons.Copy className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span className="font-['Work_Sans'] text-[11px] font-medium text-[#3B82F6]">Copy</span>
            </button>
          </div>
          <div className="p-4 font-['IBM_Plex_Mono'] text-[12px] leading-relaxed overflow-x-auto">
            <p className="text-[#64748B] mb-1"># Install and register the LabFlow agent</p>
            <p className="text-[#94A3B8]">curl -fsSL https://get.labflow.dev/agent | bash -s -- \</p>
            <p className="text-[#94A3B8]">  --token=<span className="text-[#22D3EE]">lf_pair_a8f2...c4e1</span> \</p>
            <p className="text-[#94A3B8]">  --name=<span className="text-[#22D3EE]">"my-server"</span></p>
          </div>
        </div>

        {/* Info cards */}
        <div className="space-y-2.5 mb-8">
          {[
            { icon: Icons.Shield, text: "The token is one-time use and expires in 24 hours" },
            { icon: Icons.Clock, text: "Pairing typically completes in under 30 seconds" },
            { icon: Icons.Lock, text: "All communication is encrypted end-to-end" },
          ].map((info, i) => {
            const InfoIcon = info.icon;
            return (
              <div key={i} className="flex items-start gap-3 px-3.5 py-2.5 rounded-xl"
                style={{ background: 'rgba(30,41,59,0.3)' }}
              >
                <InfoIcon className="w-4 h-4 text-[#475569] flex-shrink-0 mt-0.5" />
                <p className="font-['Work_Sans'] text-[12px] text-[#94A3B8] leading-relaxed">{info.text}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-auto">
          <button className="w-full py-4 rounded-2xl font-['Manrope'] text-[15px] font-semibold text-white"
            style={{
              background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
              boxShadow: '0 8px 32px rgba(59,130,246,0.35)',
            }}
          >
            I've Run the Command
          </button>
        </div>
      </div>
    </div>
  );

  const renderHostValidation = () => (
    <div className="flex flex-col min-h-screen px-6 relative"
      style={{ background: 'linear-gradient(180deg, #0D1424 0%, #0B1020 100%)' }}
    >
      <div className="pt-5 pb-4">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.ArrowLeft className="w-5 h-5 text-[#64748B]" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center pb-12">
        {/* Animated validation indicator */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(180deg, #1A2235, #141B2D)',
              boxShadow: '0 0 40px rgba(59,130,246,0.15), 0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            <Icons.Loader className="w-10 h-10 text-[#3B82F6] animate-spin" />
          </div>
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }}
          ></div>
        </div>

        <h1 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9] mb-2">Validating Host</h1>
        <p className="font-['Work_Sans'] text-[13px] text-[#64748B] mb-8">Checking connectivity and capabilities...</p>

        {/* Validation steps */}
        <div className="w-full max-w-[340px] space-y-3">
          {[
            { label: "SSH Connectivity", status: "completed" },
            { label: "Docker Availability", status: "running" },
            { label: "Docker Compose", status: "pending" },
            { label: "Host Health Check", status: "pending" },
          ].map((step, i) => (
            <div key={i} className="rounded-2xl px-4 py-3.5 flex items-center gap-3"
              style={{
                background: 'linear-gradient(180deg, #1A2235 0%, #141B2D 100%)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              {step.status === "completed" && (
                <div className="w-8 h-8 rounded-lg bg-[#22C55E]/15 flex items-center justify-center flex-shrink-0">
                  <Icons.Check className="w-4 h-4 text-[#22C55E]" />
                </div>
              )}
              {step.status === "running" && (
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/15 flex items-center justify-center flex-shrink-0">
                  <Icons.Loader className="w-4 h-4 text-[#3B82F6] animate-spin" />
                </div>
              )}
              {step.status === "pending" && (
                <div className="w-8 h-8 rounded-lg bg-[#1E293B]/50 flex items-center justify-center flex-shrink-0">
                  <Icons.Circle className="w-4 h-4 text-[#334155]" />
                </div>
              )}
              <span className={`font-['Work_Sans'] text-[13px] ${
                step.status === "completed" ? 'text-[#22C55E]' : step.status === "running" ? 'text-[#F1F5F9]' : 'text-[#475569]'
              }`}>
                {step.label}
              </span>
              {step.status === "completed" && (
                <span className="ml-auto font-['Work_Sans'] text-[11px] text-[#22C55E]">Done</span>
              )}
              {step.status === "running" && (
                <span className="ml-auto font-['Work_Sans'] text-[11px] text-[#3B82F6]">Checking...</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStepIndicator = (currentStep: number, totalSteps: number) => (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} className="flex-1 h-1 rounded-full overflow-hidden"
          style={{ background: 'rgba(30,41,59,0.5)' }}
        >
          <div className="h-full rounded-full transition-all duration-500"
            style={{
              width: i < currentStep ? '100%' : i === currentStep ? '50%' : '0%',
              background: i <= currentStep ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : 'transparent',
            }}
          ></div>
        </div>
      ))}
    </div>
  );

  const renderCreateProjectIntro = () => (
    <div className="flex flex-col min-h-screen px-6 relative"
      style={{ background: 'linear-gradient(180deg, #0D1424 0%, #0B1020 100%)' }}
    >
      <div className="pt-5 pb-4">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.ArrowLeft className="w-5 h-5 text-[#64748B]" />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center pb-12">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
          style={{
            background: 'linear-gradient(180deg, #1A2235, #141B2D)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <Icons.FolderKanban className="w-8 h-8 text-[#8B5CF6]" />
        </div>

        <h1 className="font-['Manrope'] text-[32px] font-bold text-[#F1F5F9] text-center leading-tight tracking-tight mb-2">
          Create Your First Project
        </h1>
        <p className="font-['Work_Sans'] text-[15px] text-[#64748B] text-center leading-relaxed max-w-[300px] mx-auto mb-10">
          Link a GitHub repository to a host and start managing deployments and workflows.
        </p>

        {/* Overview of steps */}
        <div className="space-y-2.5 mb-10">
          {[
            { num: "1", label: "Name & Repository", desc: "Choose a name and pick a repo" },
            { num: "2", label: "Select Host", desc: "Pick which host to deploy on" },
            { num: "3", label: "Confirm Services", desc: "Auto-detected Docker services" },
            { num: "4", label: "Attach Workflow", desc: "Optional — add automation" },
          ].map((step, i) => (
            <div key={i} className="rounded-2xl px-4 py-3.5 flex items-center gap-3.5"
              style={{
                background: 'linear-gradient(180deg, #1A2235 0%, #141B2D 100%)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-['Manrope'] text-[13px] font-bold text-[#3B82F6]"
                style={{ background: 'rgba(59,130,246,0.12)' }}
              >
                {step.num}
              </div>
              <div>
                <p className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">{step.label}</p>
                <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full py-4 rounded-2xl font-['Manrope'] text-[15px] font-semibold text-white"
          style={{
            background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
            boxShadow: '0 8px 32px rgba(59,130,246,0.35)',
          }}
        >
          Let's Begin
        </button>
      </div>
    </div>
  );

  const renderCreateProjectRepo = () => (
    <div className="flex flex-col min-h-screen px-6 relative"
      style={{ background: 'linear-gradient(180deg, #0D1424 0%, #0B1020 100%)' }}
    >
      <div className="pt-5 pb-4 flex items-center justify-between">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.ArrowLeft className="w-5 h-5 text-[#64748B]" />
        </button>
        <span className="font-['Work_Sans'] text-[12px] text-[#64748B]">Step 1 of 4</span>
      </div>

      {renderStepIndicator(0, 4)}

      <h2 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9] mb-1">Name & Repository</h2>
      <p className="font-['Work_Sans'] text-[13px] text-[#64748B] mb-6">Give your project a name and select a repo</p>

      {/* Project name input */}
      <div className="mb-5">
        <label className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-2 block">Project Name</label>
        <div className="rounded-xl px-4 py-3"
          style={{
            background: 'linear-gradient(180deg, #1A2235, #141B2D)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}
        >
          <span className="font-['Work_Sans'] text-[15px] text-[#F1F5F9]">api-gateway</span>
        </div>
      </div>

      {/* Repository selection */}
      <div className="mb-6">
        <label className="font-['Work_Sans'] text-[12px] text-[#64748B] mb-2 block">GitHub Repository</label>
        <div className="space-y-2">
          {[
            { name: "my-org/api-gateway", branch: "main", lang: "TypeScript" },
            { name: "my-org/web-app", branch: "main", lang: "TypeScript" },
            { name: "my-org/worker-service", branch: "develop", lang: "Go" },
            { name: "my-org/infra-config", branch: "main", lang: "HCL" },
          ].map((repo, i) => (
            <button key={i} className={`w-full rounded-xl px-4 py-3 flex items-center gap-3 text-left ${
              i === 0 ? '' : ''
            }`}
              style={{
                background: i === 0 ? 'rgba(59,130,246,0.08)' : 'linear-gradient(180deg, #1A2235, #141B2D)',
                boxShadow: i === 0 ? '0 0 0 1px rgba(59,130,246,0.3)' : '0 4px 16px rgba(0,0,0,0.2)',
              }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: i === 0 ? 'rgba(59,130,246,0.15)' : 'rgba(30,41,59,0.5)' }}
              >
                <Icons.GitBranch className={`w-4 h-4 ${i === 0 ? 'text-[#3B82F6]' : 'text-[#64748B]'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-['Work_Sans'] text-[13px] font-medium ${i === 0 ? 'text-[#F1F5F9]' : 'text-[#94A3B8]'}`}>{repo.name}</p>
                <p className="font-['Work_Sans'] text-[11px] text-[#475569]">{repo.branch} · {repo.lang}</p>
              </div>
              {i === 0 && <Icons.Check className="w-4 h-4 text-[#3B82F6] flex-shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto pb-8">
        <button className="w-full py-4 rounded-2xl font-['Manrope'] text-[15px] font-semibold text-white"
          style={{
            background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
            boxShadow: '0 8px 32px rgba(59,130,246,0.35)',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderCreateProjectHost = () => (
    <div className="flex flex-col min-h-screen px-6 relative"
      style={{ background: 'linear-gradient(180deg, #0D1424 0%, #0B1020 100%)' }}
    >
      <div className="pt-5 pb-4 flex items-center justify-between">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.ArrowLeft className="w-5 h-5 text-[#64748B]" />
        </button>
        <span className="font-['Work_Sans'] text-[12px] text-[#64748B]">Step 2 of 4</span>
      </div>

      {renderStepIndicator(1, 4)}

      <h2 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9] mb-1">Select Host</h2>
      <p className="font-['Work_Sans'] text-[13px] text-[#64748B] mb-6">Choose which host to deploy this project on</p>

      <div className="space-y-2.5 mb-6">
        {[
          { name: "Home Server", status: "healthy", specs: "Docker 24.0 · Compose 2.23", ip: "100.64.0.2", selected: true },
          { name: "Office PC", status: "healthy", specs: "Docker 24.0 · Compose 2.22", ip: "100.64.0.5", selected: false },
        ].map((host, i) => (
          <button key={i} className="w-full rounded-2xl px-4 py-4 flex items-center gap-3.5 text-left"
            style={{
              background: host.selected ? 'rgba(59,130,246,0.08)' : 'linear-gradient(180deg, #1A2235, #141B2D)',
              boxShadow: host.selected ? '0 0 0 1px rgba(59,130,246,0.3)' : '0 4px 16px rgba(0,0,0,0.3)',
            }}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-['Manrope'] text-[15px] font-bold text-[#F1F5F9] flex-shrink-0"
              style={{
                background: 'linear-gradient(180deg, #1A2235, #141B2D)',
                border: `2px solid ${host.status === 'healthy' ? '#22C55E' : '#F59E0B'}`,
                boxShadow: `0 0 12px ${host.status === 'healthy' ? 'rgba(34,197,94,0.2)' : 'rgba(245,158,11,0.2)'}`,
              }}
            >
              {host.name.split(' ').map(w => w[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">{host.name}</p>
              <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">{host.specs}</p>
              <p className="font-['Work_Sans'] text-[11px] text-[#475569]">{host.ip}</p>
            </div>
            {host.selected && <Icons.Check className="w-5 h-5 text-[#3B82F6] flex-shrink-0" />}
          </button>
        ))}
      </div>

      <div className="mt-auto pb-8 flex gap-3">
        <button className="py-4 px-6 rounded-2xl font-['Manrope'] text-[13px] font-semibold text-[#64748B]"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          Back
        </button>
        <button className="flex-1 py-4 rounded-2xl font-['Manrope'] text-[15px] font-semibold text-white"
          style={{
            background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
            boxShadow: '0 8px 32px rgba(59,130,246,0.35)',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderCreateProjectServices = () => (
    <div className="flex flex-col min-h-screen px-6 relative"
      style={{ background: 'linear-gradient(180deg, #0D1424 0%, #0B1020 100%)' }}
    >
      <div className="pt-5 pb-4 flex items-center justify-between">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.ArrowLeft className="w-5 h-5 text-[#64748B]" />
        </button>
        <span className="font-['Work_Sans'] text-[12px] text-[#64748B]">Step 3 of 4</span>
      </div>

      {renderStepIndicator(2, 4)}

      <h2 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9] mb-1">Confirm Services</h2>
      <p className="font-['Work_Sans'] text-[13px] text-[#64748B] mb-6">Auto-detected Docker Compose services</p>

      <div className="rounded-2xl px-4 py-3 flex items-center gap-2.5 mb-5"
        style={{ background: 'rgba(34,211,238,0.08)' }}
      >
        <Icons.Search className="w-4 h-4 text-[#22D3EE]" />
        <span className="font-['Work_Sans'] text-[12px] text-[#22D3EE]">Found 3 services in docker-compose.yml</span>
      </div>

      <div className="space-y-2.5 mb-6">
        {[
          { name: "api", image: "node:20-alpine", ports: "3000:3000", enabled: true },
          { name: "postgres", image: "postgres:16", ports: "5432:5432", enabled: true },
          { name: "redis", image: "redis:7-alpine", ports: "6379:6379", enabled: false },
        ].map((svc, i) => (
          <div key={i} className="rounded-2xl px-4 py-4 flex items-center gap-3.5"
            style={{
              background: 'linear-gradient(180deg, #1A2235 0%, #141B2D 100%)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              svc.enabled ? 'bg-[#3B82F6]/15' : 'bg-[#1E293B]/50'
            }`}>
              <Icons.Container className={`w-5 h-5 ${svc.enabled ? 'text-[#3B82F6]' : 'text-[#475569]'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-['Manrope'] text-[13px] font-semibold ${svc.enabled ? 'text-[#F1F5F9]' : 'text-[#64748B]'}`}>{svc.name}</p>
              <p className="font-['Work_Sans'] text-[11px] text-[#475569]">{svc.image} · {svc.ports}</p>
            </div>
            {/* Toggle */}
            <div className={`w-11 h-6 rounded-full flex items-center px-0.5 ${svc.enabled ? 'justify-end' : 'justify-start'}`}
              style={{ background: svc.enabled ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : '#1E293B' }}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pb-8 flex gap-3">
        <button className="py-4 px-6 rounded-2xl font-['Manrope'] text-[13px] font-semibold text-[#64748B]"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          Back
        </button>
        <button className="flex-1 py-4 rounded-2xl font-['Manrope'] text-[15px] font-semibold text-white"
          style={{
            background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
            boxShadow: '0 8px 32px rgba(59,130,246,0.35)',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderCreateProjectWorkflow = () => (
    <div className="flex flex-col min-h-screen px-6 relative"
      style={{ background: 'linear-gradient(180deg, #0D1424 0%, #0B1020 100%)' }}
    >
      <div className="pt-5 pb-4 flex items-center justify-between">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.ArrowLeft className="w-5 h-5 text-[#64748B]" />
        </button>
        <span className="font-['Work_Sans'] text-[12px] text-[#64748B]">Step 4 of 4</span>
      </div>

      {renderStepIndicator(3, 4)}

      <h2 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9] mb-1">Attach Workflow</h2>
      <p className="font-['Work_Sans'] text-[13px] text-[#64748B] mb-1">Automate your project with AI-powered workflows</p>
      <p className="font-['Work_Sans'] text-[12px] text-[#475569] mb-6">This step is optional — you can add workflows later</p>

      {/* Template cards */}
      <div className="space-y-2.5 mb-6">
        {[
          { name: "Run Tests", desc: "Execute test suite on every push", icon: Icons.FlaskConical, selected: true },
          { name: "Build & Deploy", desc: "Build image and deploy to host", icon: Icons.Hammer, selected: false },
          { name: "Inspect Repository", desc: "AI analysis of codebase health", icon: Icons.FileSearch, selected: false },
          { name: "Summarize Logs", desc: "Daily log digest and anomaly detection", icon: Icons.FileText, selected: false },
        ].map((wf, i) => {
          const WfIcon = wf.icon;
          return (
            <button key={i} className="w-full rounded-2xl px-4 py-3.5 flex items-center gap-3.5 text-left"
              style={{
                background: wf.selected ? 'rgba(59,130,246,0.08)' : 'linear-gradient(180deg, #1A2235, #141B2D)',
                boxShadow: wf.selected ? '0 0 0 1px rgba(59,130,246,0.3)' : '0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                wf.selected ? 'bg-[#3B82F6]/15' : 'bg-[#1E293B]/50'
              }`}>
                <WfIcon className={`w-4.5 h-4.5 ${wf.selected ? 'text-[#3B82F6]' : 'text-[#64748B]'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-['Manrope'] text-[13px] font-semibold ${wf.selected ? 'text-[#F1F5F9]' : 'text-[#94A3B8]'}`}>{wf.name}</p>
                <p className="font-['Work_Sans'] text-[11px] text-[#475569]">{wf.desc}</p>
              </div>
              {wf.selected && <Icons.Check className="w-4 h-4 text-[#3B82F6] flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pb-8 space-y-3">
        <button className="w-full py-4 rounded-2xl font-['Manrope'] text-[15px] font-semibold text-white"
          style={{
            background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
            boxShadow: '0 8px 32px rgba(59,130,246,0.35)',
          }}
        >
          Create Project
        </button>
        <button className="w-full py-3 rounded-2xl font-['Work_Sans'] text-[13px] text-[#64748B]"
          style={{ background: 'rgba(100,116,139,0.08)' }}
        >
          Skip for Now
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-['Work_Sans'] text-[#F1F5F9] flex flex-col relative"
      style={{ background: 'linear-gradient(180deg, #0D1424 0%, #0B1020 100%)' }}
    >
      {state === "welcome" && renderWelcome()}
      {state === "githubAuthPrompt" && renderGithubAuthPrompt()}
      {state === "hostPrompt" && renderHostPrompt()}
      {state === "hostPairing" && renderHostPairing()}
      {state === "hostValidation" && renderHostValidation()}
      {state === "createProjectIntro" && renderCreateProjectIntro()}
      {state === "createProjectRepo" && renderCreateProjectRepo()}
      {state === "createProjectHost" && renderCreateProjectHost()}
      {state === "createProjectServices" && renderCreateProjectServices()}
      {state === "createProjectWorkflow" && renderCreateProjectWorkflow()}
    </div>
  );
};

export default OnboardingScreen;