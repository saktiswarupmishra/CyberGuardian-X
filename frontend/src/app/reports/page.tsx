"use client";

import AppShell from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Clock, Bot, BarChart3, Shield, FileCheck } from "lucide-react";

const reports = [
  { id: 'RPT-001', title: 'Weekly Executive Security Summary', type: 'Executive', generatedBy: 'Security Reporter Agent', status: 'Ready', date: '2h ago', pages: 12 },
  { id: 'RPT-002', title: 'Incident Response Report — Ransomware Attack', type: 'Technical', generatedBy: 'Investigation Agent', status: 'Ready', date: '4h ago', pages: 28 },
  { id: 'RPT-003', title: 'SOC2 Compliance Audit Report', type: 'Compliance', generatedBy: 'Compliance Agent', status: 'Ready', date: '1d ago', pages: 45 },
  { id: 'RPT-004', title: 'Threat Intelligence Briefing — Q2 2026', type: 'Intelligence', generatedBy: 'Threat Intel Agent', status: 'Ready', date: '2d ago', pages: 18 },
  { id: 'RPT-005', title: 'Vulnerability Risk Assessment', type: 'Technical', generatedBy: 'Vulnerability Agent', status: 'Generating', date: 'In progress', pages: 0 },
  { id: 'RPT-006', title: 'Monthly Security Metrics Dashboard', type: 'Executive', generatedBy: 'Security Reporter Agent', status: 'Ready', date: '5d ago', pages: 8 },
];

const typeIcons: Record<string, React.ReactNode> = {
  Executive: <BarChart3 className="w-4 h-4 text-primary" />,
  Technical: <FileText className="w-4 h-4 text-amber-400" />,
  Compliance: <FileCheck className="w-4 h-4 text-emerald-400" />,
  Intelligence: <Shield className="w-4 h-4 text-purple-400" />,
};

export default function ReportsPage() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6 bg-grid min-h-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gradient-cyan">Security Reports</h1>
            <p className="text-sm text-muted-foreground mt-1">AI-generated executive and technical reports</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-xs"><FileText className="w-3 h-3 mr-1.5" />Generate Report</Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Total Reports', value: reports.length, color: '#00a3ff' },
            { label: 'This Week', value: 3, color: '#00ff88' },
            { label: 'Executive', value: reports.filter(r => r.type === 'Executive').length, color: '#ffaa00' },
            { label: 'AI Generated', value: reports.length, color: '#a855f7' },
          ].map(s => (
            <Card key={s.label} className="glass-card">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-2">
          {reports.map(report => (
            <Card key={report.id} className="glass-card hover:border-primary/30 transition-all cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center shrink-0">
                    {typeIcons[report.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold truncate">{report.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-[10px]">{report.type}</Badge>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Bot className="w-3 h-3" />{report.generatedBy}</span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{report.date}</span>
                      {report.pages > 0 && <span className="text-[10px] text-muted-foreground">{report.pages} pages</span>}
                    </div>
                  </div>
                  {report.status === 'Ready' ? (
                    <Button variant="outline" size="sm" className="text-xs shrink-0"><Download className="w-3 h-3 mr-1" />Download</Button>
                  ) : (
                    <Badge variant="outline" className="text-xs text-amber-400 border-amber-500/30 shrink-0">Generating...</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
