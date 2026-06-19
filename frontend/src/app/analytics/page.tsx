"use client";

import AppShell from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMockDashboardStats } from "@/lib/api";
import { BarChart3, TrendingUp, Shield, Activity } from "lucide-react";
import { useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar
} from "recharts";

export default function AnalyticsPage() {
  const stats = useMemo(() => getMockDashboardStats(), []);

  const radarData = [
    { subject: 'Threat Detection', A: 92 },
    { subject: 'Incident Response', A: 85 },
    { subject: 'Vulnerability Mgmt', A: 78 },
    { subject: 'Compliance', A: 88 },
    { subject: 'Log Analysis', A: 95 },
    { subject: 'Threat Intel', A: 82 },
    { subject: 'Forensics', A: 74 },
    { subject: 'User Behavior', A: 79 },
  ];

  const attackDistribution = [
    { name: 'Malware', value: 34, color: '#ff3366' },
    { name: 'DDoS', value: 12, color: '#ffaa00' },
    { name: 'Brute Force', value: 28, color: '#00a3ff' },
    { name: 'Phishing', value: 19, color: '#a855f7' },
    { name: 'Ransomware', value: 8, color: '#f97316' },
    { name: 'SQL Injection', value: 15, color: '#06b6d4' },
    { name: 'Insider', value: 6, color: '#ec4899' },
  ];

  const riskTrend = Array.from({ length: 14 }, (_, i) => ({
    day: `Day ${i + 1}`,
    risk: 60 + Math.sin(i * 0.5) * 15 + Math.random() * 10,
    predicted: 58 + Math.sin((i + 3) * 0.5) * 15 + Math.random() * 8,
  }));

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6 bg-grid min-h-full">
        <div>
          <h1 className="text-2xl font-bold text-gradient-cyan">Security Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">AI-powered security intelligence and predictive analytics</p>
        </div>

        {/* Security Score Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Shield className="w-4 h-4 text-primary" />Security Posture</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#888' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8, fill: '#555' }} />
                  <Radar name="Score" dataKey="A" stroke="#00a3ff" fill="#00a3ff" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><BarChart3 className="w-4 h-4 text-primary" />Attack Distribution</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={attackDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value" stroke="none">
                    {attackDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <RechartsTooltip contentStyle={{ background: 'rgba(17,17,40,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-full mt-2">
                {attackDistribution.map(item => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="ml-auto font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Activity className="w-4 h-4 text-primary" />KPI Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Mean Time to Detect', value: '2.4h', target: '< 3h', status: 'good' },
                { label: 'Mean Time to Respond', value: '4.8h', target: '< 6h', status: 'good' },
                { label: 'Incidents Resolved', value: '94%', target: '> 90%', status: 'good' },
                { label: 'False Positive Rate', value: '3.2%', target: '< 5%', status: 'good' },
                { label: 'Agent Uptime', value: '99.9%', target: '> 99.5%', status: 'good' },
                { label: 'Compliance Score', value: '87%', target: '> 85%', status: 'good' },
              ].map(kpi => (
                <div key={kpi.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{kpi.label}</span>
                    <span className="font-semibold text-emerald-400">{kpi.value}</span>
                  </div>
                  <div className="h-1.5 bg-background/60 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500/80" style={{ width: kpi.value }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Predictive Risk */}
        <Card className="glass-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" />Predictive Risk Analysis</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={riskTrend}>
                <defs>
                  <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff3366" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ff3366" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00a3ff" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#00a3ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#666' }} />
                <YAxis tick={{ fontSize: 10, fill: '#666' }} domain={[40, 100]} />
                <RechartsTooltip contentStyle={{ background: 'rgba(17,17,40,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="risk" stroke="#ff3366" fill="url(#riskGrad)" strokeWidth={2} name="Actual Risk" />
                <Area type="monotone" dataKey="predicted" stroke="#00a3ff" fill="url(#predGrad)" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
