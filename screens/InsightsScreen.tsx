import React from "react";
import * as Icons from "lucide-react";

export interface InsightsScreenProps {
  state: string;
}

/**
 * States:
 * - default: Insights Dashboard — The main view populated with charts for success rates, runtimes, and failure trends.
 * - empty: Empty State — View shown when no data is available yet, displaying a guided empty state message.
 * - chartDetail: Chart Detail View — An expanded view of one of the charts, showing specific data points.
 * - projectDrilldown: Project Activity Drill-down — A detailed view showing specific stats for a project selected from the "Most Active" list.
 */
const InsightsScreen: React.FC<InsightsScreenProps> = ({ state }) => {

  const renderHeader = () => (
    <header className="flex items-center justify-between px-5 pt-4 pb-2">
      <div>
        <h1 className="font-['Manrope'] text-[32px] font-bold text-[#F1F5F9] leading-tight tracking-tight">Insights</h1>
        <p className="font-['Work_Sans'] text-[13px] text-[#64748B] mt-0.5">Performance analytics</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #1A2235, #141B2D)' }}
        >
          <Icons.Calendar className="w-5 h-5 text-[#64748B]" />
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

  const renderTimeRange = () => (
    <div className="px-5 mt-3 mb-4 flex gap-2">
      {["7d", "30d", "90d"].map((range, i) => (
        <button key={i} className="px-4 py-2 rounded-full font-['Work_Sans'] text-[12px] font-medium"
          style={{ background: i === 0 ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : 'rgba(100,116,139,0.1)', color: i === 0 ? 'white' : '#64748B' }}
        >
          {range}
        </button>
      ))}
    </div>
  );

  const renderDashboard = () => (
    <div className="px-5 pb-28 space-y-4">
      {/* Workflow success rate */}
      <div className="rounded-2xl p-4"
        style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icons.Bot className="w-4 h-4 text-[#8B5CF6]" />
            <span className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">Workflow Success</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-['Manrope'] text-[20px] font-bold text-[#22C55E]">94%</span>
            <Icons.ChevronRight className="w-4 h-4 text-[#475569]" />
          </div>
        </div>
        <div className="flex gap-1 h-10 items-end">
          {[65, 80, 90, 70, 95, 88, 92, 100, 85, 94, 90, 96, 88, 92, 94, 90, 85, 92, 94, 96, 90, 88, 92, 94, 90, 92, 94, 96].map((v, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{
              height: `${v}%`,
              background: v >= 90 ? 'linear-gradient(180deg, #22C55E, rgba(34,197,94,0.2))' : v >= 70 ? 'linear-gradient(180deg, #3B82F6, rgba(59,130,246,0.2))' : 'linear-gradient(180deg, #F59E0B, rgba(245,158,11,0.2))',
            }}></div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-['Work_Sans'] text-[10px] text-[#475569]">28 days ago</span>
          <span className="font-['Work_Sans'] text-[10px] text-[#475569]">Today</span>
        </div>
      </div>

      {/* Deployment success rate */}
      <div className="rounded-2xl p-4"
        style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icons.Rocket className="w-4 h-4 text-[#3B82F6]" />
            <span className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">Deploy Success</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-['Manrope'] text-[20px] font-bold text-[#3B82F6]">97%</span>
            <Icons.ChevronRight className="w-4 h-4 text-[#475569]" />
          </div>
        </div>
        <div className="flex gap-1 h-10 items-end">
          {[95, 100, 100, 95, 100, 90, 100, 95, 100, 97, 100, 95, 100, 95, 90, 100, 95, 100, 97, 100, 95, 100, 95, 100, 97, 100, 95, 100].map((v, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{
              height: `${v}%`,
              background: v >= 95 ? 'linear-gradient(180deg, #3B82F6, rgba(59,130,246,0.2))' : 'linear-gradient(180deg, #F59E0B, rgba(245,158,11,0.2))',
            }}></div>
          ))}
        </div>
      </div>

      {/* Average run time */}
      <div className="rounded-2xl p-4"
        style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icons.Clock className="w-4 h-4 text-[#22D3EE]" />
            <span className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">Avg Run Time</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-['Manrope'] text-[20px] font-bold text-[#22D3EE]">1m 48s</span>
            <Icons.ChevronRight className="w-4 h-4 text-[#475569]" />
          </div>
        </div>
        <div className="flex gap-1 h-10 items-end">
          {[45, 52, 48, 65, 42, 55, 38, 60, 50, 47, 43, 41, 55, 48, 52, 45, 50, 42, 48, 55, 43, 50, 48, 45, 52, 48, 45, 42].map((v, i) => (
            <div key={i} className="flex-1 rounded-t-sm" style={{
              height: `${(v / 70) * 100}%`,
              background: 'linear-gradient(180deg, #22D3EE, rgba(34,211,238,0.2))',
            }}></div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-['Work_Sans'] text-[10px] text-[#475569]">28 days ago</span>
          <span className="font-['Work_Sans'] text-[10px] text-[#22C55E]">↓ 12% faster</span>
        </div>
      </div>

      {/* Most active projects */}
      <div className="rounded-2xl p-4"
        style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">Most Active Projects</span>
        </div>
        <div className="space-y-2.5">
          {[
            { name: "api-gateway", runs: 48, success: 94, color: "#3B82F6" },
            { name: "web-app", runs: 32, success: 97, color: "#8B5CF6" },
            { name: "worker-service", runs: 18, success: 89, color: "#22D3EE" },
          ].map((proj, i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${proj.color}15` }}>
                <Icons.FolderKanban className="w-4 h-4" style={{ color: proj.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">{proj.name}</p>
                <p className="font-['Work_Sans'] text-[11px] text-[#64748B]">{proj.runs} runs · {proj.success}% success</p>
              </div>
              <Icons.ChevronRight className="w-4 h-4 text-[#475569]" />
            </div>
          ))}
        </div>
      </div>

      {/* Host uptime */}
      <div className="rounded-2xl p-4"
        style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icons.Server className="w-4 h-4 text-[#22C55E]" />
            <span className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">Host Uptime</span>
          </div>
          <span className="font-['Manrope'] text-[20px] font-bold text-[#22C55E]">99.97%</span>
        </div>
        <div className="space-y-2">
          {[
            { name: "Home Server", uptime: "99.99%", status: "healthy" },
            { name: "Office PC", uptime: "99.95%", status: "healthy" },
            { name: "Cloud", uptime: "99.97%", status: "healthy" },
          ].map((host, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl" style={{ background: 'rgba(11,16,32,0.6)' }}>
              <div className="w-2 h-2 rounded-full bg-[#22C55E]"></div>
              <span className="font-['Work_Sans'] text-[12px] text-[#F1F5F9] flex-1">{host.name}</span>
              <span className="font-['Work_Sans'] text-[12px] font-medium text-[#22C55E]">{host.uptime}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Failure trends */}
      <div className="rounded-2xl p-4"
        style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icons.TrendingDown className="w-4 h-4 text-[#EF4444]" />
            <span className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">Failure Trends</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-['Work_Sans'] text-[11px] text-[#22C55E]">↓ 40%</span>
          </div>
        </div>
        <div className="flex gap-1 h-10 items-end">
          {[5, 3, 8, 2, 6, 1, 4, 7, 3, 2, 5, 1, 3, 2, 4, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2, 1, 1, 2].map((v, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{
              height: `${(v / 8) * 100}%`,
              background: v >= 5 ? 'linear-gradient(180deg, #EF4444, rgba(239,68,68,0.2))' : v >= 3 ? 'linear-gradient(180deg, #F59E0B, rgba(245,158,11,0.2))' : 'linear-gradient(180deg, #22C55E, rgba(34,197,94,0.2))',
            }}></div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-['Work_Sans'] text-[10px] text-[#475569]">28 days ago</span>
          <span className="font-['Work_Sans'] text-[10px] text-[#22C55E]">Improving</span>
        </div>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-8 pb-20">
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
        style={{
          background: 'linear-gradient(180deg, #1A2235, #141B2D)',
          boxShadow: '0 0 40px rgba(59,130,246,0.15), 0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <Icons.BarChart3 className="w-10 h-10 text-[#3B82F6]" />
      </div>
      <h2 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9] mb-2">Insights Will Appear Here</h2>
      <p className="font-['Work_Sans'] text-[13px] text-[#64748B] text-center leading-relaxed max-w-[260px] mb-8">
        Once you start running workflows and deployments, performance analytics and trends will be displayed here.
      </p>
      <button className="px-8 py-3.5 rounded-2xl font-['Manrope'] text-[13px] font-semibold text-white"
        style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)', boxShadow: '0 8px 32px rgba(59,130,246,0.35)' }}
      >
        Create Your First Workflow
      </button>
    </div>
  );

  const renderChartDetail = () => (
    <div className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)' }}
    >
      <header className="flex items-center justify-between px-5 pt-5 pb-3">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.ArrowLeft className="w-5 h-5 text-[#64748B]" />
        </button>
        <h3 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">Workflow Success Rate</h3>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {/* Summary */}
        <div className="flex items-center gap-4 mb-5">
          <span className="font-['Manrope'] text-[32px] font-bold text-[#22C55E]">94%</span>
          <div>
            <p className="font-['Work_Sans'] text-[13px] text-[#64748B]">Overall success rate</p>
            <p className="font-['Work_Sans'] text-[11px] text-[#22C55E]">↑ 3% from last period</p>
          </div>
        </div>

        {/* Time range */}
        <div className="flex gap-2 mb-5">
          {["7d", "30d", "90d"].map((range, i) => (
            <button key={i} className="px-3.5 py-1.5 rounded-full font-['Work_Sans'] text-[11px] font-medium"
              style={{ background: i === 1 ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : 'rgba(100,116,139,0.1)', color: i === 1 ? 'white' : '#64748B' }}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Large chart */}
        <div className="rounded-2xl p-4 mb-5"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
        >
          <div className="flex gap-0.5 h-32 items-end mb-3">
            {[65, 80, 90, 70, 95, 88, 92, 100, 85, 94, 90, 96, 88, 92, 94, 90, 85, 92, 94, 96, 90, 88, 92, 94, 90, 92, 94, 96, 88, 94].map((v, i) => (
              <div key={i} className="flex-1 rounded-sm" style={{
                height: `${v}%`,
                background: v >= 90 ? 'linear-gradient(180deg, #22C55E, rgba(34,197,94,0.2))' : v >= 70 ? 'linear-gradient(180deg, #3B82F6, rgba(59,130,246,0.2))' : 'linear-gradient(180deg, #F59E0B, rgba(245,158,11,0.2))',
              }}></div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="font-['Work_Sans'] text-[10px] text-[#475569]">30 days ago</span>
            <span className="font-['Work_Sans'] text-[10px] text-[#475569]">Today</span>
          </div>
        </div>

        {/* Data points */}
        <h3 className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9] mb-3">Daily Breakdown</h3>
        <div className="space-y-1.5">
          {[
            { day: "Today", runs: 4, success: 4, rate: "100%" },
            { day: "Yesterday", runs: 6, success: 5, rate: "83%" },
            { day: "2 days ago", runs: 5, success: 5, rate: "100%" },
            { day: "3 days ago", runs: 3, success: 3, rate: "100%" },
            { day: "4 days ago", runs: 7, success: 6, rate: "86%" },
            { day: "5 days ago", runs: 4, success: 4, rate: "100%" },
            { day: "6 days ago", runs: 5, success: 4, rate: "80%" },
          ].map((day, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
              style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 2px 8px rgba(0,0,0.2)' }}
            >
              <span className="font-['Work_Sans'] text-[12px] text-[#94A3B8] w-20">{day.day}</span>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-[#0B1020] overflow-hidden">
                  <div className="h-full rounded-full" style={{
                    width: day.rate,
                    background: day.rate === "100%" ? '#22C55E' : parseInt(day.rate) >= 85 ? '#3B82F6' : '#F59E0B',
                  }}></div>
                </div>
              </div>
              <span className={`font-['Work_Sans'] text-[11px] font-medium w-10 text-right ${
                day.rate === "100%" ? 'text-[#22C55E]' : parseInt(day.rate) >= 85 ? 'text-[#3B82F6]' : 'text-[#F59E0B]'
              }`}>
                {day.rate}
              </span>
              <span className="font-['Work_Sans'] text-[10px] text-[#475569] w-14 text-right">{day.success}/{day.runs}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjectDrilldown = () => (
    <div className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'linear-gradient(180deg, #0D1424, #0B1020)' }}
    >
      <header className="flex items-center justify-between px-5 pt-5 pb-3">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)' }}
        >
          <Icons.ArrowLeft className="w-5 h-5 text-[#64748B]" />
        </button>
        <h3 className="font-['Manrope'] text-[15px] font-semibold text-[#F1F5F9]">Project Stats</h3>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {/* Project header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/12 flex items-center justify-center">
            <Icons.FolderKanban className="w-6 h-6 text-[#3B82F6]" />
          </div>
          <div>
            <h2 className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9]">api-gateway</h2>
            <p className="font-['Work_Sans'] text-[12px] text-[#64748B]">my-org/api-gateway · Last 30 days</p>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {[
            { label: "Total Runs", value: "48", icon: Icons.Play, color: "#3B82F6" },
            { label: "Success Rate", value: "94%", icon: Icons.CheckCircle2, color: "#22C55E" },
            { label: "Avg Duration", value: "1m 52s", icon: Icons.Clock, color: "#22D3EE" },
            { label: "Deployments", value: "23", icon: Icons.Rocket, color: "#8B5CF6" },
          ].map((metric, i) => {
            const MetricIcon = metric.icon;
            return (
              <div key={i} className="rounded-2xl p-3.5"
                style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${metric.color}15` }}>
                    <MetricIcon className="w-3 h-3" style={{ color: metric.color }} />
                  </div>
                  <span className="font-['Work_Sans'] text-[10px] text-[#64748B]">{metric.label}</span>
                </div>
                <p className="font-['Manrope'] text-[20px] font-bold text-[#F1F5F9]">{metric.value}</p>
              </div>
            );
          })}
        </div>

        {/* Run history chart */}
        <div className="rounded-2xl p-4 mb-4"
          style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9]">Daily Runs</span>
            <span className="font-['Work_Sans'] text-[11px] text-[#64748B]">Avg: 1.7/day</span>
          </div>
          <div className="flex gap-1 h-20 items-end">
            {[2, 1, 3, 0, 2, 3, 1, 2, 1, 3, 2, 0, 1, 2, 3, 1, 2, 0, 1, 3, 2, 1, 2, 3, 1, 0, 2, 1, 3, 2].map((v, i) => (
              <div key={i} className="flex-1 rounded-t-sm" style={{
                height: v > 0 ? `${(v / 3) * 100}%` : '4px',
                background: 'linear-gradient(180deg, #3B82F6, rgba(59,130,246,0.2))',
              }}></div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="font-['Work_Sans'] text-[10px] text-[#475569]">30d ago</span>
            <span className="font-['Work_Sans'] text-[10px] text-[#475569]">Today</span>
          </div>
        </div>

        {/* Recent runs */}
        <h3 className="font-['Manrope'] text-[13px] font-semibold text-[#F1F5F9] mb-2.5">Recent Runs</h3>
        <div className="space-y-1.5">
          {[
            { workflow: "Run Tests", status: "completed", duration: "2m 14s", time: "2m ago" },
            { workflow: "Deploy Staging", status: "completed", duration: "1m 38s", time: "8m ago" },
            { workflow: "Run Tests", status: "failed", duration: "0m 45s", time: "1h ago" },
            { workflow: "Run Tests", status: "completed", duration: "1m 52s", time: "3h ago" },
            { workflow: "Build Project", status: "completed", duration: "3m 12s", time: "5h ago" },
          ].map((run, i) => (
            <div key={i} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl"
              style={{ background: 'linear-gradient(180deg, #1A2235, #141B2D)', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${run.status === 'completed' ? 'bg-[#22C55E]/15' : 'bg-[#EF4444]/15'}`}>
                {run.status === 'completed' ? <Icons.Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Icons.X className="w-3.5 h-3.5 text-[#EF4444]" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-['Work_Sans'] text-[12px] text-[#F1F5F9]">{run.workflow}</p>
                <p className="font-['Work_Sans'] text-[10px] text-[#475569]">{run.duration}</p>
              </div>
              <span className="font-['Work_Sans'] text-[10px] text-[#64748B]">{run.time}</span>
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
          { id: "hub", label: "Hub", icon: Icons.LayoutDashboard, active: false },
          { id: "projects", label: "Projects", icon: Icons.FolderKanban, active: false },
          { id: "agents", label: "Agents", icon: Icons.Bot, active: false },
          { id: "deploy", label: "Deploy", icon: Icons.Rocket, active: false },
        ].map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button key={tab.id} className="flex flex-col items-center gap-1 py-1 px-4 relative">
              <TabIcon className="w-5 h-5 text-[#475569]" />
              <span className="font-['Work_Sans'] text-[10px] font-medium text-[#475569]">{tab.label}</span>
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
          {renderTimeRange()}
          <div className="flex-1 overflow-y-auto">
            {renderDashboard()}
          </div>
          {renderBottomNav()}
        </>
      )}

      {state === "empty" && (
        <>
          {renderHeader()}
          <div className="flex-1 overflow-y-auto">
            {renderEmptyState()}
          </div>
          {renderBottomNav()}
        </>
      )}

      {state === "chartDetail" && renderChartDetail()}
      {state === "projectDrilldown" && renderProjectDrilldown()}
    </div>
  );
};

export default InsightsScreen;