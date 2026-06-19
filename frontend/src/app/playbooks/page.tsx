"use client";

import AppShell from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Play, CheckCircle, Clock, AlertTriangle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const playbooks = [
  { id: 'PB-001', name: 'Malware Detection & Containment', status: 'Active', executions: 47, successRate: 96, lastRun: '15 min ago',
    steps: ['Detect malware signature', 'Collect forensic evidence', 'Isolate affected endpoint', 'Block C2 communication', 'Notify SOC team', 'Generate incident report'],
    trigger: 'YARA rule match' },
  { id: 'PB-002', name: 'DDoS Attack Mitigation', status: 'Active', executions: 12, successRate: 100, lastRun: '2h ago',
    steps: ['Detect traffic anomaly', 'Activate rate limiting', 'Enable geo-blocking', 'Scale infrastructure', 'Block IP ranges', 'Alert SOC & generate summary'],
    trigger: 'Traffic threshold exceeded' },
  { id: 'PB-003', name: 'Brute Force Response', status: 'Active', executions: 89, successRate: 98, lastRun: '5 min ago',
    steps: ['Detect repeated failures', 'Temporary IP block', 'Lock targeted account', 'MFA enforcement', 'Send user notification', 'Log for analysis'],
    trigger: '5+ failed attempts in 60s' },
  { id: 'PB-004', name: 'Data Exfiltration Prevention', status: 'Active', executions: 8, successRate: 100, lastRun: '4h ago',
    steps: ['Detect anomalous transfer', 'Block outbound connection', 'Capture network traffic', 'Isolate source endpoint', 'Forensic analysis', 'Executive notification'],
    trigger: 'Outbound > 1GB to unknown' },
  { id: 'PB-005', name: 'Phishing Response', status: 'Active', executions: 34, successRate: 94, lastRun: '1h ago',
    steps: ['Email flagged by filter', 'Extract IOCs from email', 'Block sender domain', 'Quarantine similar emails', 'Notify affected users', 'Update threat intel'],
    trigger: 'Phishing detection rule' },
  { id: 'PB-006', name: 'Insider Threat Investigation', status: 'Draft', executions: 0, successRate: 0, lastRun: 'Never',
    steps: ['Behavioral anomaly detected', 'Increase monitoring level', 'Collect access logs', 'Risk assessment', 'HR notification', 'Executive review'],
    trigger: 'UEBA alert score > 80' },
];

export default function PlaybooksPage() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6 bg-grid min-h-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gradient-cyan">Automated Playbooks</h1>
            <p className="text-sm text-muted-foreground mt-1">Orchestrated incident response workflows</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-xs"><Zap className="w-3 h-3 mr-1.5" />New Playbook</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {playbooks.map(pb => (
            <Card key={pb.id} className="glass-card hover:border-primary/30 transition-all">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-primary" />{pb.name}
                  </CardTitle>
                  <Badge variant={pb.status === 'Active' ? 'secondary' : 'outline'} className="text-[10px]">{pb.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Play className="w-3 h-3" />{pb.executions} runs</span>
                  <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-400" />{pb.successRate}% success</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{pb.lastRun}</span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                  <span className="text-[10px] text-muted-foreground">Trigger: {pb.trigger}</span>
                </div>
                <div className="space-y-1.5">
                  {pb.steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</div>
                      <span className="text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
