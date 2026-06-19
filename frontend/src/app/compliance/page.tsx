"use client";

import AppShell from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCheck, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";

const frameworks = {
  SOC2: { score: 87, controls: [
    { id: 'CC1.1', name: 'Control Environment', status: 'PASS', lastCheck: '2h ago' },
    { id: 'CC2.1', name: 'Communication & Information', status: 'PASS', lastCheck: '2h ago' },
    { id: 'CC3.1', name: 'Risk Assessment', status: 'WARN', lastCheck: '4h ago' },
    { id: 'CC4.1', name: 'Monitoring Activities', status: 'PASS', lastCheck: '1h ago' },
    { id: 'CC5.1', name: 'Control Activities', status: 'PASS', lastCheck: '3h ago' },
    { id: 'CC6.1', name: 'Logical & Physical Access', status: 'FAIL', lastCheck: '30m ago' },
    { id: 'CC7.1', name: 'System Operations', status: 'PASS', lastCheck: '1h ago' },
    { id: 'CC8.1', name: 'Change Management', status: 'PASS', lastCheck: '5h ago' },
    { id: 'CC9.1', name: 'Risk Mitigation', status: 'WARN', lastCheck: '2h ago' },
  ]},
  ISO27001: { score: 91, controls: [
    { id: 'A.5', name: 'Information Security Policies', status: 'PASS', lastCheck: '1h ago' },
    { id: 'A.6', name: 'Organization of Information Security', status: 'PASS', lastCheck: '2h ago' },
    { id: 'A.7', name: 'Human Resource Security', status: 'PASS', lastCheck: '3h ago' },
    { id: 'A.8', name: 'Asset Management', status: 'WARN', lastCheck: '1h ago' },
    { id: 'A.9', name: 'Access Control', status: 'PASS', lastCheck: '30m ago' },
    { id: 'A.10', name: 'Cryptography', status: 'PASS', lastCheck: '4h ago' },
    { id: 'A.12', name: 'Operations Security', status: 'PASS', lastCheck: '2h ago' },
    { id: 'A.13', name: 'Communications Security', status: 'PASS', lastCheck: '1h ago' },
  ]},
  'PCI-DSS': { score: 82, controls: [
    { id: 'Req.1', name: 'Network Security Controls', status: 'PASS', lastCheck: '2h ago' },
    { id: 'Req.2', name: 'Secure Configuration', status: 'WARN', lastCheck: '3h ago' },
    { id: 'Req.3', name: 'Protect Stored Account Data', status: 'PASS', lastCheck: '1h ago' },
    { id: 'Req.4', name: 'Encrypt Transmission', status: 'PASS', lastCheck: '1h ago' },
    { id: 'Req.5', name: 'Malware Protection', status: 'PASS', lastCheck: '30m ago' },
    { id: 'Req.6', name: 'Secure Development', status: 'FAIL', lastCheck: '4h ago' },
    { id: 'Req.8', name: 'User Identification', status: 'PASS', lastCheck: '2h ago' },
    { id: 'Req.10', name: 'Log & Monitor Access', status: 'PASS', lastCheck: '1h ago' },
  ]},
  GDPR: { score: 89, controls: [
    { id: 'Art.5', name: 'Principles of Processing', status: 'PASS', lastCheck: '2h ago' },
    { id: 'Art.6', name: 'Lawfulness of Processing', status: 'PASS', lastCheck: '3h ago' },
    { id: 'Art.17', name: 'Right to Erasure', status: 'WARN', lastCheck: '4h ago' },
    { id: 'Art.25', name: 'Data Protection by Design', status: 'PASS', lastCheck: '1h ago' },
    { id: 'Art.30', name: 'Records of Processing', status: 'PASS', lastCheck: '2h ago' },
    { id: 'Art.32', name: 'Security of Processing', status: 'PASS', lastCheck: '1h ago' },
    { id: 'Art.33', name: 'Breach Notification', status: 'PASS', lastCheck: '30m ago' },
    { id: 'Art.35', name: 'Data Protection Impact', status: 'PASS', lastCheck: '5h ago' },
  ]},
};

export default function CompliancePage() {
  const statusIcon = { PASS: <CheckCircle className="w-4 h-4 text-emerald-400" />, FAIL: <XCircle className="w-4 h-4 text-red-400" />, WARN: <AlertTriangle className="w-4 h-4 text-amber-400" /> };
  const statusBg = { PASS: 'bg-emerald-500/10', FAIL: 'bg-red-500/10', WARN: 'bg-amber-500/10' };

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6 bg-grid min-h-full">
        <div>
          <h1 className="text-2xl font-bold text-gradient-cyan">Compliance Monitoring</h1>
          <p className="text-sm text-muted-foreground mt-1">Continuous compliance monitoring across security frameworks</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(frameworks).map(([name, fw]) => (
            <Card key={name} className="glass-card cursor-pointer hover:border-primary/30 transition-all">
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground font-medium">{name}</p>
                <p className="text-3xl font-bold mt-1" style={{ color: fw.score >= 90 ? '#00ff88' : fw.score >= 80 ? '#ffaa00' : '#ff3366' }}>{fw.score}%</p>
                <div className="h-1.5 bg-background/60 rounded-full overflow-hidden mt-2">
                  <div className="h-full rounded-full" style={{ width: `${fw.score}%`, background: fw.score >= 90 ? '#00ff88' : fw.score >= 80 ? '#ffaa00' : '#ff3366' }} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="SOC2">
          <TabsList className="bg-card border border-border">
            {Object.keys(frameworks).map(name => <TabsTrigger key={name} value={name} className="text-xs">{name}</TabsTrigger>)}
          </TabsList>
          {Object.entries(frameworks).map(([name, fw]) => (
            <TabsContent key={name} value={name}>
              <Card className="glass-card">
                <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><FileCheck className="w-4 h-4 text-primary" />{name} Controls</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {fw.controls.map(ctrl => (
                      <div key={ctrl.id} className={`flex items-center gap-3 p-3 rounded-lg ${statusBg[ctrl.status as keyof typeof statusBg]} border border-border/30`}>
                        {statusIcon[ctrl.status as keyof typeof statusIcon]}
                        <code className="text-xs font-mono font-semibold w-16 shrink-0">{ctrl.id}</code>
                        <span className="text-sm flex-1">{ctrl.name}</span>
                        <Badge variant={ctrl.status === 'PASS' ? 'secondary' : ctrl.status === 'FAIL' ? 'destructive' : 'outline'} className="text-[10px]">{ctrl.status}</Badge>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{ctrl.lastCheck}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AppShell>
  );
}
