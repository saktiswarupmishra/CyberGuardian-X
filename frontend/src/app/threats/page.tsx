"use client";

import AppShell from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getMockThreats } from "@/lib/api";
import { Search, Globe, Shield, AlertTriangle, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";

export default function ThreatsPage() {
  const threats = useMemo(() => getMockThreats(), []);
  const [search, setSearch] = useState("");

  const filtered = threats.filter(t =>
    !search || t.iocValue.toLowerCase().includes(search.toLowerCase()) || t.threatType.toLowerCase().includes(search.toLowerCase())
  );

  const mitreMatrix = [
    { tactic: 'Reconnaissance', techniques: ['T1595', 'T1592'], coverage: 85 },
    { tactic: 'Resource Development', techniques: ['T1583', 'T1584'], coverage: 72 },
    { tactic: 'Initial Access', techniques: ['T1190', 'T1566', 'T1133'], coverage: 91 },
    { tactic: 'Execution', techniques: ['T1059', 'T1204'], coverage: 88 },
    { tactic: 'Persistence', techniques: ['T1547', 'T1053'], coverage: 79 },
    { tactic: 'Privilege Escalation', techniques: ['T1548', 'T1134'], coverage: 82 },
    { tactic: 'Defense Evasion', techniques: ['T1562', 'T1070'], coverage: 76 },
    { tactic: 'Credential Access', techniques: ['T1110', 'T1003'], coverage: 94 },
    { tactic: 'Discovery', techniques: ['T1082', 'T1083'], coverage: 68 },
    { tactic: 'Lateral Movement', techniques: ['T1021', 'T1570'], coverage: 85 },
    { tactic: 'Collection', techniques: ['T1005', 'T1039'], coverage: 71 },
    { tactic: 'Command and Control', techniques: ['T1071', 'T1105'], coverage: 92 },
    { tactic: 'Exfiltration', techniques: ['T1041', 'T1048'], coverage: 80 },
    { tactic: 'Impact', techniques: ['T1486', 'T1489'], coverage: 87 },
  ];

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6 bg-grid min-h-full">
        <div>
          <h1 className="text-2xl font-bold text-gradient-cyan">Threat Intelligence</h1>
          <p className="text-sm text-muted-foreground mt-1">IOC correlation and threat feed analysis</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search IOCs, IPs, domains, hashes..." className="pl-9 bg-card" value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* MITRE ATT&CK Coverage */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              MITRE ATT&CK Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2">
              {mitreMatrix.map(item => (
                <div key={item.tactic} className="p-2 rounded-lg bg-background/40 border border-border/50 text-center hover:border-primary/30 transition-colors cursor-pointer">
                  <p className="text-[9px] font-semibold text-muted-foreground mb-1 truncate">{item.tactic}</p>
                  <p className="text-lg font-bold" style={{ color: item.coverage >= 90 ? '#00ff88' : item.coverage >= 75 ? '#ffaa00' : '#ff3366' }}>{item.coverage}%</p>
                  <p className="text-[9px] text-muted-foreground/60">{item.techniques.length} techniques</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Threat IOCs */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-primary" />
              Active Indicators of Compromise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filtered.map(threat => (
                <div key={threat.id} className="flex items-center gap-4 p-3 rounded-lg bg-background/40 border border-border/50 hover:border-primary/20 transition-colors group cursor-pointer">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{
                    background: threat.riskScore >= 90 ? 'rgba(255,51,102,0.15)' : threat.riskScore >= 70 ? 'rgba(255,170,0,0.15)' : 'rgba(0,163,255,0.15)'
                  }}>
                    <Globe className="w-5 h-5" style={{
                      color: threat.riskScore >= 90 ? '#ff3366' : threat.riskScore >= 70 ? '#ffaa00' : '#00a3ff'
                    }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono font-semibold">{threat.iocValue}</code>
                      <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-[10px]">{threat.iocType}</Badge>
                      <Badge variant="outline" className="text-[10px]">{threat.source}</Badge>
                      <Badge variant="outline" className="text-[10px]">{threat.threatType}</Badge>
                      {threat.malwareFamily && <Badge variant="outline" className="text-[10px] text-red-400 border-red-500/30">{threat.malwareFamily}</Badge>}
                      {threat.tags.map(tag => <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>)}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold" style={{ color: threat.riskScore >= 90 ? '#ff3366' : threat.riskScore >= 70 ? '#ffaa00' : '#00a3ff' }}>{threat.riskScore}</p>
                    <p className="text-[10px] text-muted-foreground">Risk Score</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
