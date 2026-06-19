"use client";

import AppShell from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMockVulnerabilities } from "@/lib/api";
import { Bug, Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useMemo } from "react";

export default function VulnerabilitiesPage() {
  const vulns = useMemo(() => getMockVulnerabilities(), []);

  const statusIcon: Record<string, React.ReactNode> = {
    OPEN: <AlertTriangle className="w-3.5 h-3.5 text-red-400" />,
    IN_PROGRESS: <Clock className="w-3.5 h-3.5 text-amber-400" />,
    PATCHED: <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />,
    MITIGATED: <Shield className="w-3.5 h-3.5 text-blue-400" />,
  };

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6 bg-grid min-h-full">
        <div>
          <h1 className="text-2xl font-bold text-gradient-cyan">Vulnerability Management</h1>
          <p className="text-sm text-muted-foreground mt-1">CVE tracking, risk prioritization, and patch management</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Total Vulnerabilities', value: vulns.length, color: '#00a3ff' },
            { label: 'Critical', value: vulns.filter(v => v.severity === 'CRITICAL').length, color: '#ff3366' },
            { label: 'Open', value: vulns.filter(v => v.status === 'OPEN').length, color: '#ffaa00' },
            { label: 'Avg CVSS', value: (vulns.reduce((a, v) => a + v.cvssScore, 0) / vulns.length).toFixed(1), color: '#a855f7' },
          ].map(s => (
            <Card key={s.label} className="glass-card">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-3">
          {vulns.map(vuln => (
            <Card key={vuln.id} className="glass-card hover:border-primary/30 transition-all cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0" style={{
                    background: vuln.cvssScore >= 9 ? 'rgba(255,51,102,0.15)' : vuln.cvssScore >= 7 ? 'rgba(255,170,0,0.15)' : 'rgba(0,163,255,0.15)',
                    border: `1px solid ${vuln.cvssScore >= 9 ? 'rgba(255,51,102,0.3)' : vuln.cvssScore >= 7 ? 'rgba(255,170,0,0.3)' : 'rgba(0,163,255,0.3)'}`,
                  }}>
                    <span className="text-lg font-bold" style={{ color: vuln.cvssScore >= 9 ? '#ff3366' : vuln.cvssScore >= 7 ? '#ffaa00' : '#00a3ff' }}>{vuln.cvssScore}</span>
                    <span className="text-[8px] text-muted-foreground uppercase">CVSS</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="text-xs font-mono font-semibold text-primary">{vuln.cveId}</code>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        vuln.severity === 'CRITICAL' ? 'severity-critical' : vuln.severity === 'HIGH' ? 'severity-high' : 'severity-medium'
                      }`}>{vuln.severity}</span>
                      <div className="flex items-center gap-1">
                        {statusIcon[vuln.status]}
                        <span className="text-[10px] font-medium">{vuln.status.replace(/_/g, ' ')}</span>
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold mt-1">{vuln.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{vuln.description}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      {vuln.affectedAssets.map(a => <Badge key={a} variant="outline" className="text-[10px]">{a}</Badge>)}
                      {vuln.patchAvailable === 'Yes' && <Badge className="text-[10px] bg-emerald-500/15 text-emerald-400 border-emerald-500/30">Patch Available</Badge>}
                    </div>
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
