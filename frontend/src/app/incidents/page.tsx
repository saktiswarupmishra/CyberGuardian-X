"use client";

import AppShell from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getMockIncidents } from "@/lib/api";
import { AlertTriangle, Search, Filter, Clock, ChevronRight, Bot } from "lucide-react";
import { useMemo, useState } from "react";

export default function IncidentsPage() {
  const allIncidents = useMemo(() => getMockIncidents(), []);
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleSeverityChange = (value: string | null) => { if (value) setSeverityFilter(value); };
  const handleStatusChange = (value: string | null) => { if (value) setStatusFilter(value); };
  const [search, setSearch] = useState("");

  const incidents = allIncidents.filter(inc => {
    if (severityFilter !== "all" && inc.severity !== severityFilter) return false;
    if (statusFilter !== "all" && inc.status !== statusFilter) return false;
    if (search && !inc.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const statusColors: Record<string, string> = {
    OPEN: 'bg-red-500/15 text-red-400 border-red-500/30',
    INVESTIGATING: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    CONTAINED: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    RESOLVED: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    CLOSED: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
  };

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6 bg-grid min-h-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gradient-cyan">Incident Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Track and manage security incidents</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="destructive" className="text-xs">{allIncidents.filter(i => i.status === 'OPEN').length} Open</Badge>
            <Badge variant="outline" className="text-xs text-amber-400 border-amber-500/30">{allIncidents.filter(i => i.status === 'INVESTIGATING').length} Investigating</Badge>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search incidents..." className="pl-9 bg-card border-border" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Select value={severityFilter} onValueChange={handleSeverityChange}>
            <SelectTrigger className="w-[140px] bg-card"><Filter className="w-3 h-3 mr-2" /><SelectValue placeholder="Severity" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="CRITICAL">Critical</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="LOW">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[150px] bg-card"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="OPEN">Open</SelectItem>
              <SelectItem value="INVESTIGATING">Investigating</SelectItem>
              <SelectItem value="CONTAINED">Contained</SelectItem>
              <SelectItem value="RESOLVED">Resolved</SelectItem>
              <SelectItem value="CLOSED">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Incidents list */}
        <div className="space-y-2">
          {incidents.map(incident => (
            <Card key={incident.id} className="glass-card cursor-pointer group hover:border-primary/30 transition-all">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`w-1.5 h-full min-h-[60px] rounded-full shrink-0 ${
                    incident.severity === 'CRITICAL' ? 'bg-red-500' :
                    incident.severity === 'HIGH' ? 'bg-amber-500' :
                    incident.severity === 'MEDIUM' ? 'bg-blue-500' : 'bg-emerald-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{incident.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{incident.description}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                        incident.severity === 'CRITICAL' ? 'severity-critical' :
                        incident.severity === 'HIGH' ? 'severity-high' :
                        incident.severity === 'MEDIUM' ? 'severity-medium' : 'severity-low'
                      }`}>{incident.severity}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${statusColors[incident.status] || ''}`}>{incident.status}</span>
                      <Badge variant="outline" className="text-[10px] text-muted-foreground">{incident.type.replace(/_/g, ' ')}</Badge>
                      <div className="flex items-center gap-1 ml-auto text-[10px] text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {new Date(incident.createdAt).toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Bot className="w-3 h-3" />
                        {incident.assignedAgent}
                      </div>
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
