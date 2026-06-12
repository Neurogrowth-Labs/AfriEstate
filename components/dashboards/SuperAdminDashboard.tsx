/**
 * ============================================================
 * AFRIESTATE — SUPER ADMIN COMMAND CENTER (UPGRADED)
 * ============================================================
 */

import React, { useState, useEffect, useRef } from "react";

const KPI = {
  totalListings: 14872,
  activeAgents: 1204,
  monthlyRevenue: 2381500,
  pendingApprovals: 47,
  avgDaysOnMarket: 34,
  platformGMV: 8240000000,
  subscriptionMRR: 198400,
  flaggedContent: 12,
};

const PROVINCES = [
  { name: "Western Cape", listings: 3812, agents: 284, revenue: 612000 },
  { name: "Gauteng", listings: 4920, agents: 398, revenue: 841000 },
  { name: "KwaZulu-Natal", listings: 2340, agents: 187, revenue: 389000 },
];

const AGENTS = [
  { id: "A001", name: "Thandi Mokoena", agency: "Prime Realty CPT", province: "Western Cape", status: "verified", listings: 34, tier: "Pro", ffc: "FFC-2024-00112", joined: "2022-03-14" },
  { id: "A002", name: "Sipho Dlamini", agency: "Urban Keys JHB", province: "Gauteng", status: "pending", listings: 0, tier: "Starter", ffc: "pending", joined: "2024-11-01" },
];

const SIDEBAR_NAV = [
  {
    name: "Dashboard", icon: "📊",
    children: ["Executive Overview", "Global Metrics", "AI Insights", "Live Activity Feed"],
  },
  {
    name: "Users & Access", icon: "👥",
    children: ["Normal Users", "Agents", "Investors", "Agencies", "Developers", "Permissions", "Role Management", "Suspensions", "Verification Queue"],
  },
  {
    name: "Listings", icon: "🏠",
    children: ["All Listings", "Pending Approvals", "Smart Verification", "Flagged Listings", "Expired Listings", "Geo Mapping", "REIT Assets", "Luxury Portfolio"],
  },
  {
    name: "Revenue", icon: "💰",
    children: ["Revenue Overview", "Commissions", "Investor Income", "Escrow", "Wallets", "Transactions", "Subscription Plans", "Taxes", "Financial Reports"],
  },
  {
    name: "Compliance", icon: "⚖️",
    children: ["KYC", "AML Screening", "Fraud Detection", "Sanctions Checks", "Audit Logs", "Legal Cases", "Regulatory Reports", "Data Privacy"],
  },
  {
    name: "Moderation", icon: "🛡️",
    children: ["Content Moderation", "User Reports", "Dispute Center", "Scam Detection", "AI Moderation Queue", "Communication Monitoring"],
  },
  {
    name: "System Health", icon: "⚙️",
    children: ["API Health", "Server Status", "Database Performance", "AI Engine Health", "Queue Monitoring", "Error Logs", "Cybersecurity", "Backup Systems"],
  },
  {
    name: "AI Co-Pilot", icon: "✨",
    children: ["Executive AI Assistant", "Revenue Forecasting", "Market Intelligence", "Smart Recommendations", "AI Automation Center", "Predictive Analytics"],
  },
  {
    name: "Analytics", icon: "📈",
    children: ["Business Intelligence", "Geographic Insights", "Market Trends", "Occupancy Analytics", "Investor Performance", "Agent Performance"],
  },
  {
    name: "Settings", icon: "🔧",
    children: ["Platform Settings", "Localization", "Currency Engine", "Notification Center", "Email Templates", "AI Configuration", "Branding", "API Keys"],
  },
  {
    name: "Support Center", icon: "🎧",
    children: ["Tickets", "Live Chat", "Knowledge Base", "Escalations"],
  },
];

const fmt = (n: number) => new Intl.NumberFormat("en-ZA", { maximumFractionDigits: 0 }).format(n);
const fmtR = (n: number) => "R " + new Intl.NumberFormat("en-ZA", { maximumFractionDigits: 0 }).format(n);

export default function AfriEstateAdmin({onClose}: {onClose?: () => void}) {
  const [activeCategory, setActiveCategory] = useState("Dashboard");
  const [activeSub, setActiveSub] = useState("Executive Overview");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["Dashboard"]));

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cat)) newSet.delete(cat);
      else newSet.add(cat);
      return newSet;
    });
  };

  const handleSubClick = (cat: string, sub: string) => {
    setActiveCategory(cat);
    setActiveSub(sub);
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", height: "100vh", width: "100vw", background: "#f8fafc", color: "#111827", position: 'fixed', top: 0, left: 0, zIndex: 99999, display: 'flex', overflow: 'hidden' }}>
      
      {/* SIDEBAR */}
      <div style={{ width: 280, background: "#0f172a", color: "#f8fafc", display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto' }} className="custom-scrollbar">
        <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #1e293b", position: 'sticky', top: 0, background: '#0f172a', zIndex: 10 }}>
          <div style={{ width: 32, height: 32, background: "#3b82f6", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff" }}>A</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>AfriEstate</div>
            <div style={{ color: "#94a3b8", fontSize: 11, fontWeight: 500, letterSpacing: "0.05em", textTransform: 'uppercase' }}>Command Center</div>
          </div>
        </div>

        <div style={{ padding: "16px 12px", flex: 1 }}>
          {SIDEBAR_NAV.map((nav) => {
            const isExpanded = expandedCategories.has(nav.name);
            const isActiveCategory = activeCategory === nav.name;
            
            return (
              <div key={nav.name} style={{ marginBottom: 4 }}>
                <button 
                  onClick={() => toggleCategory(nav.name)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 12px', background: isActiveCategory ? 'rgba(255,255,255,0.05)' : 'transparent', 
                    border: 'none', borderRadius: 8, cursor: 'pointer', color: isActiveCategory ? '#fff' : '#cbd5e1',
                    transition: 'all 0.2s', textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 16 }}>{nav.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: isActiveCategory ? 600 : 500 }}>{nav.name}</span>
                  </div>
                  <span style={{ fontSize: 10, transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: '#64748b' }}>▼</span>
                </button>
                
                {isExpanded && (
                  <div style={{ padding: '4px 0 8px 36px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {nav.children.map(sub => {
                      const isActiveSub = activeCategory === nav.name && activeSub === sub;
                      return (
                        <button 
                          key={sub}
                          onClick={() => handleSubClick(nav.name, sub)}
                          style={{
                            textAlign: 'left', padding: '8px 12px', border: 'none', background: isActiveSub ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                            color: isActiveSub ? '#60a5fa' : '#94a3b8', fontSize: 12, fontWeight: isActiveSub ? 600 : 400,
                            borderRadius: 6, cursor: 'pointer', transition: 'all 0.1s'
                          }}
                        >
                          {sub}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* HEADER */}
        <div style={{ height: 64, background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: "#64748b", fontSize: 13, fontWeight: 500 }}>{activeCategory}</span>
            <span style={{ color: "#cbd5e1", fontSize: 12 }}>/</span>
            <span style={{ color: "#0f172a", fontSize: 15, fontWeight: 700 }}>{activeSub}</span>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ position: 'relative' }}>
              <span style={{ fontSize: 20 }}>🔔</span>
              <div style={{ position: 'absolute', top: -2, right: -4, background: '#ef4444', color: '#fff', fontSize: 9, fontWeight: 700, width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '2px solid #fff' }}>3</div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 20, borderLeft: '1px solid #e2e8f0' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>Simão</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Super Admin</div>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1e40af", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 600 }}>SA</div>
            </div>

            <button onClick={onClose} style={{ marginLeft: 16, background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600, transition: 'all 0.2s' }}>
              Exit Portal
            </button>
          </div>
        </div>

        {/* CONTENT SCROLL AREA */}
        <div style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
          
          {/* IMPLEMENTED VIEWS */}
          {activeCategory === "Dashboard" && activeSub === "Executive Overview" ? (
             <div>
               <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
                 {[
                   { label: "Active Listings", value: fmt(KPI.totalListings), delta: "+8.4% vs last month", color: "#1d4ed8" },
                   { label: "Verified Agents", value: fmt(KPI.activeAgents), delta: "+12 this week", color: "#15803d" },
                   { label: "Monthly Revenue", value: fmtR(KPI.monthlyRevenue), delta: "+14.2% MoM", color: "#7c3aed" },
                   { label: "Platform GMV", value: "R " + (KPI.platformGMV / 1e9).toFixed(1) + "B", delta: "YTD total", color: "#0369a1" },
                 ].map((k) => (
                   <div key={k.label} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "20px" }}>
                     <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8, fontWeight: 500 }}>{k.label}</div>
                     <div style={{ fontSize: 28, fontWeight: 700, color: k.color, marginBottom: 4 }}>{k.value}</div>
                     <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>{k.delta}</div>
                   </div>
                 ))}
               </div>

               <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
                 <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 24, minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                      <div style={{ fontSize: 48, marginBottom: 12 }}>📈</div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>Interactive Chart Module</div>
                      <div style={{ fontSize: 12, marginTop: 4 }}>Revenue tracking integrated with Payment Gateway</div>
                    </div>
                 </div>
                 <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 24 }}>
                   <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "#0f172a" }}>Listings by Province</div>
                   <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                     {PROVINCES.map(p => (
                        <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 100, fontSize: 12, color: "#64748b", fontWeight: 500 }}>{p.name}</div>
                          <div style={{ flex: 1, background: "#f1f5f9", borderRadius: 4, height: 8, overflow: "hidden" }}>
                            <div style={{ width: `${(p.listings / 5000) * 100}%`, height: "100%", background: "#3b82f6", borderRadius: 4 }} />
                          </div>
                          <div style={{ width: 44, fontSize: 12, color: "#334155", fontWeight: 600, textAlign: "right" }}>{fmt(p.listings)}</div>
                        </div>
                     ))}
                   </div>
                 </div>
               </div>
             </div>
          ) : activeCategory === "Users & Access" && activeSub === "Agents" ? (
             <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
               <div style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                 <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>Verified Agents</div>
                 <button style={{ background: "#1d4ed8", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Invite Agent</button>
               </div>
               <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: 'left' }}>
                 <thead>
                   <tr style={{ background: "#f8fafc" }}>
                     <th style={{ padding: "12px 24px", fontWeight: 600, color: "#64748b", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>ID / Name</th>
                     <th style={{ padding: "12px 24px", fontWeight: 600, color: "#64748b", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Agency</th>
                     <th style={{ padding: "12px 24px", fontWeight: 600, color: "#64748b", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                     <th style={{ padding: "12px 24px", fontWeight: 600, color: "#64748b", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Listings</th>
                   </tr>
                 </thead>
                 <tbody>
                   {AGENTS.map((a) => (
                     <tr key={a.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                       <td style={{ padding: "16px 24px" }}>
                         <div style={{ fontWeight: 600, color: '#0f172a' }}>{a.name}</div>
                         <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', marginTop: 2 }}>{a.id}</div>
                       </td>
                       <td style={{ padding: "16px 24px", color: "#475569" }}>{a.agency}</td>
                       <td style={{ padding: "16px 24px" }}>
                         <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: a.status === 'verified' ? "#dcfce7" : "#fef3c7", color: a.status === 'verified' ? "#166534" : "#92400e", fontWeight: 600 }}>{a.status.toUpperCase()}</span>
                       </td>
                       <td style={{ padding: "16px 24px", fontWeight: 600, color: '#334155' }}>{a.listings}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          ) : (
            
            // PLACEHOLDER FOR OTHER TABS
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
              <div style={{ width: 80, height: 80, background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, marginBottom: 20 }}>
                {SIDEBAR_NAV.find(n => n.name === activeCategory)?.icon || "⚙️"}
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{activeSub} Module</h2>
              <p style={{ fontSize: 14, maxWidth: 400, textAlign: 'center', lineHeight: 1.6 }}>
                The {activeSub} module is currently connected to the backend framework. Interface rendering is scheduled for the next deployment standard.
              </p>
              
              <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
                {activeCategory === "Listings" && <button style={{ padding: '8px 16px', background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Sync Data</button>}
                {activeCategory === "Compliance" && <button style={{ padding: '8px 16px', background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Generate Audit Report</button>}
                <button style={{ padding: '8px 16px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Configure Module</button>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
