"use client";

import AppShell from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Fingerprint, FileSearch, HardDrive, Shield, Clock } from "lucide-react";

const evidenceItems = [
  { id: 'EVD-001', type: 'Memory Dump', source: 'srv-web-01', size: '4.2 GB', status: 'Analyzed', severity: 'CRITICAL', findings: 'Cobalt Strike beacon detected in process memory', timestamp: '2h ago' },
  { id: 'EVD-002', type: 'Disk Image', source: 'ws-fin-03', size: '128 GB', status: 'Processing', severity: 'HIGH', findings: 'Encrypted RAR archives found in temp directory', timestamp: '4h ago' },
  { id: 'EVD-003', type: 'Network Capture', source: 'fw-edge-01', size: '890 MB', status: 'Analyzed', severity: 'HIGH', findings: 'DNS tunneling to known C2 domain detected', timestamp: '1h ago' },
  { id: 'EVD-004', type: 'Log Bundle', source: 'siem-01', size: '2.1 GB', status: 'Analyzed', severity: 'MEDIUM', findings: 'Privilege escalation via sudo misconfiguration', timestamp: '6h ago' },
  { id: 'EVD-005', type: 'Malware Sample', source: 'sandbox-01', size: '1.4 MB', status: 'Analyzed', severity: 'CRITICAL', findings: 'LockBit 3.0 ransomware — fully detonated in sandbox', timestamp: '30m ago' },
  { id: 'EVD-006', type: 'Registry Hive', source: 'ws-hr-07', size: '45 MB', status: 'Queued', severity: 'MEDIUM', findings: 'Pending analysis...', timestamp: '8h ago' },
];

const attackTimeline = [
  { time: '14:23:01', event: 'Phishing email delivered to user@corp.com', phase: 'Initial Access' },
  { time: '14:24:15', event: 'User clicked malicious link — payload downloaded', phase: 'Execution' },
  { time: '14:24:30', event: 'PowerShell executed encoded command', phase: 'Execution' },
  { time: '14:25:00', event: 'Registry persistence key created', phase: 'Persistence' },
  { time: '14:26:12', event: 'Windows Defender service disabled', phase: 'Defense Evasion' },
  { time: '14:28:00', event: 'Credential dumping via LSASS', phase: 'Credential Access' },
  { time: '14:30:45', event: 'Lateral movement to srv-db-02 via PsExec', phase: 'Lateral Movement' },
  { time: '14:35:00', event: 'Data staging in C:\\Temp\\exfil', phase: 'Collection' },
  { time: '14:40:00', event: 'C2 beacon established to 185.220.101.34', phase: 'C2' },
  { time: '14:45:00', event: 'SentinelAI detected and contained threat', phase: 'Detection' },
];

export default function ForensicsPage() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6 bg-grid min-h-full">
        <div>
          <h1 className="text-2xl font-bold text-gradient-cyan">Digital Forensics</h1>
          <p className="text-sm text-muted-foreground mt-1">Evidence collection, malware analysis, and attack reconstruction</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Evidence Items', value: '6', icon: FileSearch, color: '#00a3ff' },
            { label: 'Analyzed', value: '4', icon: Shield, color: '#00ff88' },
            { label: 'Active Cases', value: '3', icon: Fingerprint, color: '#ffaa00' },
            { label: 'Storage Used', value: '136 GB', icon: HardDrive, color: '#a855f7' },
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

        {/* Attack Reconstruction Timeline */}
        <Card className="glass-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Clock className="w-4 h-4 text-primary" />Attack Reconstruction Timeline</CardTitle></CardHeader>
          <CardContent>
            <div className="relative pl-6 space-y-3">
              <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-border" />
              {attackTimeline.map((entry, i) => (
                <div key={i} className="relative flex items-start gap-3">
                  <div className={`absolute left-[-17px] w-3 h-3 rounded-full border-2 ${
                    entry.phase === 'Detection' ? 'bg-emerald-500 border-emerald-400' :
                    i < 3 ? 'bg-red-500 border-red-400' : 'bg-amber-500 border-amber-400'
                  }`} />
                  <div className="flex-1 p-2.5 rounded-lg bg-background/40 border border-border/30">
                    <div className="flex items-center gap-2 mb-0.5">
                      <code className="text-[10px] font-mono text-primary">{entry.time}</code>
                      <Badge variant="outline" className="text-[9px]">{entry.phase}</Badge>
                    </div>
                    <p className="text-sm">{entry.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Evidence Items */}
        <Card className="glass-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><FileSearch className="w-4 h-4 text-primary" />Evidence Collection</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {evidenceItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg bg-background/40 border border-border/30 hover:border-primary/20 transition-colors cursor-pointer">
                  <code className="text-xs font-mono font-semibold text-primary w-20 shrink-0">{item.id}</code>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.type} — <span className="text-muted-foreground">{item.source}</span></p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.findings}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] shrink-0">{item.size}</Badge>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    item.severity === 'CRITICAL' ? 'severity-critical' : item.severity === 'HIGH' ? 'severity-high' : 'severity-medium'
                  }`}>{item.severity}</span>
                  <Badge variant={item.status === 'Analyzed' ? 'secondary' : 'outline'} className="text-[10px] shrink-0">{item.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
