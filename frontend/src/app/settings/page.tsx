"use client";

import AppShell from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Settings, Shield, Bell, Globe, Database, Key, Users, Monitor } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6 bg-grid min-h-full">
        <div>
          <h1 className="text-2xl font-bold text-gradient-cyan">Platform Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure SentinelAI SOC platform</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* General */}
          <Card className="glass-card">
            <CardHeader><CardTitle className="text-sm font-semibold flex items-center gap-2"><Settings className="w-4 h-4 text-primary" />General</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><label className="text-xs text-muted-foreground block mb-1">Organization Name</label><Input defaultValue="SentinelAI Corp" className="bg-background" /></div>
              <div><label className="text-xs text-muted-foreground block mb-1">SOC Contact Email</label><Input defaultValue="soc@sentinelai.com" className="bg-background" /></div>
              <div><label className="text-xs text-muted-foreground block mb-1">Timezone</label><Input defaultValue="UTC" className="bg-background" /></div>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-xs">Save Changes</Button>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="glass-card">
            <CardHeader><CardTitle className="text-sm font-semibold flex items-center gap-2"><Shield className="w-4 h-4 text-primary" />Security</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Multi-Factor Authentication', desc: 'Require MFA for all users', enabled: true },
                { label: 'Session Timeout', desc: 'Auto-logout after 30 minutes', enabled: true },
                { label: 'IP Whitelisting', desc: 'Restrict access to allowed IPs', enabled: false },
                { label: 'Audit Logging', desc: 'Log all user actions', enabled: true },
              ].map(setting => (
                <div key={setting.label} className="flex items-center justify-between p-3 rounded-lg bg-background/40 border border-border/30">
                  <div><p className="text-sm font-medium">{setting.label}</p><p className="text-xs text-muted-foreground">{setting.desc}</p></div>
                  <Badge variant={setting.enabled ? 'secondary' : 'outline'} className="text-[10px]">{setting.enabled ? 'Enabled' : 'Disabled'}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="glass-card">
            <CardHeader><CardTitle className="text-sm font-semibold flex items-center gap-2"><Bell className="w-4 h-4 text-primary" />Notifications</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Critical Alert Emails', desc: 'Send email for critical alerts', enabled: true },
                { label: 'Slack Integration', desc: 'Post alerts to #security channel', enabled: true },
                { label: 'Teams Notifications', desc: 'Microsoft Teams webhook', enabled: false },
                { label: 'SMS Alerts', desc: 'SMS for critical incidents', enabled: false },
              ].map(setting => (
                <div key={setting.label} className="flex items-center justify-between p-3 rounded-lg bg-background/40 border border-border/30">
                  <div><p className="text-sm font-medium">{setting.label}</p><p className="text-xs text-muted-foreground">{setting.desc}</p></div>
                  <Badge variant={setting.enabled ? 'secondary' : 'outline'} className="text-[10px]">{setting.enabled ? 'Active' : 'Inactive'}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Integrations */}
          <Card className="glass-card">
            <CardHeader><CardTitle className="text-sm font-semibold flex items-center gap-2"><Globe className="w-4 h-4 text-primary" />Integrations</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'VirusTotal', status: 'Connected', color: 'text-emerald-400' },
                { label: 'AbuseIPDB', status: 'Connected', color: 'text-emerald-400' },
                { label: 'Splunk SIEM', status: 'Connected', color: 'text-emerald-400' },
                { label: 'AWS Security Hub', status: 'Not Configured', color: 'text-muted-foreground' },
                { label: 'Jira', status: 'Connected', color: 'text-emerald-400' },
                { label: 'ServiceNow', status: 'Not Configured', color: 'text-muted-foreground' },
              ].map(int => (
                <div key={int.label} className="flex items-center justify-between p-3 rounded-lg bg-background/40 border border-border/30">
                  <span className="text-sm font-medium">{int.label}</span>
                  <span className={`text-xs font-medium ${int.color}`}>{int.status}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
