"use client";

import AppShell from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMockDashboardStats } from "@/lib/api";
import { Bot, Activity, CheckCircle, Clock, Zap, BarChart3 } from "lucide-react";
import { useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Cell } from "recharts";

export default function AgentsPage() {
  const stats = useMemo(() => getMockDashboardStats(), []);
  const agents = stats.agentStatuses;

  const chartData = agents.map(a => ({ name: a.name.split(' ').pop(), tasks: a.tasksCompleted, pending: a.tasksPending, rate: a.successRate }));
  const colors = ['#00a3ff', '#00ff88', '#ffaa00', '#ff3366', '#a855f7', '#06b6d4', '#f97316', '#ec4899', '#84cc16', '#6366f1'];

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6 bg-grid min-h-full">
        <div>
          <h1 className="text-2xl font-bold text-gradient-cyan">AI Agent Monitoring</h1>
          <p className="text-sm text-muted-foreground mt-1">Multi-agent orchestration and performance tracking</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Total Agents', value: agents.length, icon: Bot, color: '#00a3ff' },
            { label: 'Online', value: agents.filter(a => a.status === 'ONLINE').length, icon: CheckCircle, color: '#00ff88' },
            { label: 'Total Tasks', value: agents.reduce((a, b) => a + b.tasksCompleted, 0).toLocaleString(), icon: Zap, color: '#ffaa00' },
            { label: 'Avg Success', value: `${(agents.reduce((a, b) => a + b.successRate, 0) / agents.length).toFixed(1)}%`, icon: BarChart3, color: '#a855f7' },
          ].map(s => (
            <Card key={s.label} className="glass-card">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Task completion chart */}
        <Card className="glass-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Activity className="w-4 h-4 text-primary" />Tasks Completed by Agent</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#888' }} />
                <YAxis tick={{ fontSize: 10, fill: '#666' }} />
                <RechartsTooltip contentStyle={{ background: 'rgba(17,17,40,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="tasks" radius={[4, 4, 0, 0]}>
                  {chartData.map((_, i) => <Cell key={i} fill={colors[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Agent detail cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {agents.map((agent, i) => (
            <Card key={agent.name} className="glass-card hover:border-primary/30 transition-all">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${colors[i]}15` }}>
                    <Bot className="w-5 h-5" style={{ color: colors[i] }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">{agent.name}</h3>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{agent.type.replace(/_/g, ' ')}</p>
                  </div>
                  <Badge variant="outline" className={`text-[10px] ${
                    agent.status === 'ONLINE' ? 'text-emerald-400 border-emerald-500/30' :
                    agent.status === 'BUSY' ? 'text-amber-400 border-amber-500/30' : 'text-red-400 border-red-500/30'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      agent.status === 'ONLINE' ? 'bg-emerald-500' : agent.status === 'BUSY' ? 'bg-amber-500' : 'bg-red-500'
                    }`} />
                    {agent.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-2 rounded-lg bg-background/40">
                    <p className="text-lg font-bold" style={{ color: colors[i] }}>{agent.tasksCompleted.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">Completed</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-background/40">
                    <p className="text-lg font-bold text-amber-400">{agent.tasksPending}</p>
                    <p className="text-[10px] text-muted-foreground">Pending</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-background/40">
                    <p className="text-lg font-bold text-emerald-400">{agent.successRate}%</p>
                    <p className="text-[10px] text-muted-foreground">Success</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
