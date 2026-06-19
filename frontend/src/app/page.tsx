"use client";

import AppShell from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMockDashboardStats } from "@/lib/api";
import {
  Shield, AlertTriangle, Bug, Activity, Clock, Zap,
  TrendingUp, TrendingDown, Eye, BarChart3, Bot, Globe
} from "lucide-react";
import { useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar
} from "recharts";

function SeverityBadge({ severity }: { severity: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide
      ${severity === 'CRITICAL' ? 'severity-critical' : ''}
      ${severity === 'HIGH' ? 'severity-high' : ''}
      ${severity === 'MEDIUM' ? 'severity-medium' : ''}
      ${severity === 'LOW' ? 'severity-low' : ''}
    `}>
      {severity}
    </span>
  );
}

function StatCard({ title, value, icon: Icon, change, changeType, color, pulse }: {
  title: string; value: string | number; icon: React.ElementType;
  change?: string; changeType?: 'up' | 'down'; color: string; pulse?: string;
}) {
  return (
    <Card className="glass-card relative overflow-hidden group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium mb-1">{title}</p>
            <p className="text-2xl font-bold animate-count" style={{ color }}>{value}</p>
            {change && (
              <div className={`flex items-center gap-1 mt-1 text-xs ${changeType === 'up' ? 'text-red-400' : 'text-emerald-400'}`}>
                {changeType === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span>{change} vs last 24h</span>
              </div>
            )}
          </div>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${pulse || ''}`}
               style={{ background: `${color}15` }}>
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
        </div>
      </CardContent>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-40" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
    </Card>
  );
}

export default function DashboardPage() {
  const stats = useMemo(() => getMockDashboardStats(), []);

  const pieData = [
    { name: 'Critical', value: stats.criticalAlerts, color: '#ff3366' },
    { name: 'High', value: stats.highAlerts, color: '#ffaa00' },
    { name: 'Medium', value: stats.mediumAlerts, color: '#00a3ff' },
    { name: 'Low', value: stats.lowAlerts, color: '#00ff88' },
  ];

  const incidentTypeData = Object.entries(stats.incidentsByType).map(([name, value]) => ({
    name: name.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
    value,
  }));

  const scoreColor = stats.securityScore >= 80 ? '#00ff88' : stats.securityScore >= 60 ? '#ffaa00' : '#ff3366';

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6 bg-grid min-h-full">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gradient-cyan">Security Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Real-time threat monitoring and security analytics</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 pulse-online" />
              All Systems Operational
            </Badge>
            <Badge variant="outline" className="text-muted-foreground text-xs">
              <Clock className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>
        </div>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard title="Security Score" value={stats.securityScore} icon={Shield} color={scoreColor} change="+5" changeType="down" />
          <StatCard title="Active Incidents" value={stats.activeIncidents} icon={AlertTriangle} color="#ff3366" change="+3" changeType="up" pulse="pulse-critical" />
          <StatCard title="Critical Alerts" value={stats.criticalAlerts} icon={Zap} color="#ff3366" change="+2" changeType="up" pulse="pulse-critical" />
          <StatCard title="Active Threats" value={stats.activeThreats} icon={Eye} color="#ffaa00" change="-5" changeType="down" />
          <StatCard title="Vulnerabilities" value={stats.totalVulnerabilities} icon={Bug} color="#00a3ff" />
          <StatCard title="MTTD" value={`${stats.mttd}h`} icon={Clock} color="#00ff88" change="-0.3h" changeType="down" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Threat Trends */}
          <Card className="glass-card lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                Threat Trends — 30 Days
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={stats.threatTrends}>
                  <defs>
                    <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff3366" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ff3366" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00a3ff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00a3ff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffaa00" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ffaa00" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#666' }} tickFormatter={(v: string) => v.slice(5)} />
                  <YAxis tick={{ fontSize: 10, fill: '#666' }} />
                  <RechartsTooltip
                    contentStyle={{ background: 'rgba(17,17,40,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                    labelStyle={{ color: '#888' }}
                  />
                  <Area type="monotone" dataKey="alerts" stroke="#00a3ff" fill="url(#colorAlerts)" strokeWidth={2} />
                  <Area type="monotone" dataKey="threats" stroke="#ff3366" fill="url(#colorThreats)" strokeWidth={2} />
                  <Area type="monotone" dataKey="incidents" stroke="#ffaa00" fill="url(#colorIncidents)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Alert Severity Distribution */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                Alert Severity
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value" stroke="none">
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{ background: 'rgba(17,17,40,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-2 w-full">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="ml-auto font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Incident Types */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-primary" />
                Incidents by Attack Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={incidentTypeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#666' }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#888' }} width={120} />
                  <RechartsTooltip
                    contentStyle={{ background: 'rgba(17,17,40,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} fill="url(#barGradient)">
                    {incidentTypeData.map((_, i) => (
                      <Cell key={i} fill={['#ff3366', '#ffaa00', '#00a3ff', '#00ff88', '#a855f7', '#06b6d4', '#f97316', '#ec4899'][i % 8]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* AI Agent Status */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Bot className="w-4 h-4 text-primary" />
                AI Agent Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {stats.agentStatuses.map((agent) => (
                  <div key={agent.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-background/40 border border-border/50 hover:border-primary/20 transition-colors">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${
                      agent.status === 'ONLINE' ? 'bg-emerald-500 pulse-online' :
                      agent.status === 'BUSY' ? 'bg-amber-500 pulse-high' : 'bg-red-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{agent.name}</p>
                      <p className="text-[10px] text-muted-foreground">{agent.tasksCompleted.toLocaleString()} tasks • {agent.successRate}%</p>
                    </div>
                    <SeverityBadge severity={agent.status} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent alerts table */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                Live Alert Feed
              </CardTitle>
              <Badge variant="outline" className="text-xs text-muted-foreground">
                Last 24h
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1.5">
              {[
                { time: '2 min ago', title: 'Brute force attempt from 185.220.101.34', severity: 'CRITICAL', source: 'SURICATA' },
                { time: '8 min ago', title: 'Suspicious DNS query to known C2 domain', severity: 'HIGH', source: 'ZEEK' },
                { time: '15 min ago', title: 'Failed SSH login — root account', severity: 'MEDIUM', source: 'WAZUH' },
                { time: '23 min ago', title: 'New vulnerability detected: CVE-2024-21762', severity: 'CRITICAL', source: 'ML_ENGINE' },
                { time: '31 min ago', title: 'Anomalous data transfer — 2.3GB outbound', severity: 'HIGH', source: 'AI_AGENT' },
                { time: '45 min ago', title: 'Policy violation — unauthorized USB device', severity: 'MEDIUM', source: 'WAZUH' },
                { time: '1h ago', title: 'Port scan detected from external IP range', severity: 'LOW', source: 'SURICATA' },
                { time: '1.5h ago', title: 'Malware signature match — Emotet variant', severity: 'CRITICAL', source: 'YARA' },
              ].map((alert, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent/40 transition-colors cursor-pointer group">
                  <div className={`w-1.5 h-8 rounded-full shrink-0 ${
                    alert.severity === 'CRITICAL' ? 'bg-red-500' :
                    alert.severity === 'HIGH' ? 'bg-amber-500' :
                    alert.severity === 'MEDIUM' ? 'bg-blue-500' : 'bg-emerald-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-foreground">{alert.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                      <span className="text-[10px] text-muted-foreground/50">•</span>
                      <span className="text-[10px] text-muted-foreground">{alert.source}</span>
                    </div>
                  </div>
                  <SeverityBadge severity={alert.severity} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
