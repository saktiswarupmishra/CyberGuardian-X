"use client";

import AppShell from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMockAlerts } from "@/lib/api";
import { Bell, Clock, CheckCircle } from "lucide-react";
import { useMemo } from "react";

export default function AlertsPage() {
  const alerts = useMemo(() => getMockAlerts(), []);

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6 bg-grid min-h-full">
        <div>
          <h1 className="text-2xl font-bold text-gradient-cyan">Security Alerts</h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time security alert monitoring</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Total Alerts', value: alerts.length, color: '#00a3ff' },
            { label: 'Unacknowledged', value: alerts.filter(a => !a.acknowledged).length, color: '#ff3366' },
            { label: 'Critical', value: alerts.filter(a => a.severity === 'CRITICAL').length, color: '#ff3366' },
            { label: 'Last Hour', value: alerts.filter(a => Date.now() - new Date(a.timestamp).getTime() < 3600000).length, color: '#ffaa00' },
          ].map(stat => (
            <Card key={stat.label} className="glass-card">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: stat.color }}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-2">
          {alerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map(alert => (
            <Card key={alert.id} className={`glass-card transition-all ${alert.acknowledged ? 'opacity-60' : 'hover:border-primary/30'}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-12 rounded-full shrink-0 ${
                    alert.severity === 'CRITICAL' ? 'bg-red-500' :
                    alert.severity === 'HIGH' ? 'bg-amber-500' :
                    alert.severity === 'MEDIUM' ? 'bg-blue-500' : 'bg-emerald-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium truncate">{alert.title}</h3>
                      {alert.acknowledged && <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        alert.severity === 'CRITICAL' ? 'severity-critical' :
                        alert.severity === 'HIGH' ? 'severity-high' :
                        alert.severity === 'MEDIUM' ? 'severity-medium' : 'severity-low'
                      }`}>{alert.severity}</span>
                      <Badge variant="outline" className="text-[10px]">{alert.source}</Badge>
                      <Badge variant="outline" className="text-[10px]">{alert.protocol}</Badge>
                      <code className="text-[10px] text-muted-foreground bg-background/50 px-1.5 py-0.5 rounded">{alert.sourceIp} → {alert.destinationIp}:{alert.destinationPort}</code>
                      <span className="text-[10px] text-muted-foreground ml-auto flex items-center gap-1">
                        <Clock className="w-3 h-3" />{new Date(alert.timestamp).toLocaleString()}
                      </span>
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
