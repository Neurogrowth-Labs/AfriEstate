/**
 * =========================================================================
 * AFRIESTATE — ENTERPRISE SUPER ADMIN SOVEREIGN COMMAND CENTER
 * =========================================================================
 */

import React, { useState, useEffect } from "react";
import { 
  Activity, Users, Globe, DollarSign, Shield, ShieldAlert, Server, 
  Sparkles, TrendingUp, Lock, HelpCircle, Terminal, Cpu, Clock, RefreshCw, 
  Send, AlertTriangle, FileText, Download, Check, X, ShieldCheck, 
  Network, Settings, Trash2, Key, Info, CheckCircle2, MessageSquare
} from "lucide-react";

import { 
  SovereignUser, PropertyListing, EscrowTransaction, ComplianceCase, 
  ModerationReport, HealthService, CyberThreat, SupportTicket,
  SEED_USERS, SEED_LISTINGS, SEED_TRANSACTIONS, SEED_COMPLIANCE_CASES,
  SEED_MODERATION_REPORTS, SEED_SERVICES, SEED_THREATS, SEED_TICKETS,
  MACRO_SCENARIOS, PRESET_AI_ASSISTANCE
} from "./superadmin/SuperAdminData";

import UsersTab from "./superadmin/components/UsersTab";
import ListingsTab from "./superadmin/components/ListingsTab";
import RevenueTab from "./superadmin/components/RevenueTab";

export default function AfriEstateAdmin({ onClose }: { onClose?: () => void }) {
  // --- CORE SELECTION AND TABS ---
  const [activeCategory, setActiveCategory] = useState("Dashboard");
  const [activeSub, setActiveSub] = useState("Executive Overview");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["Dashboard", "Users & Access Operations", "Listings Operations", "Revenue Operations"])
  );

  // --- LIVE TELEMETRY COEFFICIENTS ---
  const [platformValuation, setPlatformValuation] = useState(84204912800);
  const [activeListingsCount, setActiveListingsCount] = useState(14872);
  const [grossGTV, setGrossGTV] = useState(1847381900);
  const [escrowPool, setEscrowPool] = useState(492041800);
  const [activeInvestors, setActiveInvestors] = useState(5492);
  const [fraudRisk, setFraudRisk] = useState(1.4);
  const [investorConfidence, setInvestorConfidence] = useState(98.4);
  const [currentTime, setCurrentTime] = useState("");

  // --- STATE LIST REGISTRIES ---
  const [users, setUsers] = useState<SovereignUser[]>(SEED_USERS);
  const [listings, setListings] = useState<PropertyListing[]>(SEED_LISTINGS);
  const [transactions, setTransactions] = useState<EscrowTransaction[]>(SEED_TRANSACTIONS);
  const [complianceCases, setComplianceCases] = useState<ComplianceCase[]>(SEED_COMPLIANCE_CASES);
  const [moderationReports, setModerationReports] = useState<ModerationReport[]>(SEED_MODERATION_REPORTS);
  const [services, setServices] = useState<HealthService[]>(SEED_SERVICES);
  const [threats, setThreats] = useState<CyberThreat[]>(SEED_THREATS);
  const [tickets, setTickets] = useState<SupportTicket[]>(SEED_TICKETS);
  const [auditLogs, setAuditLogs] = useState<string[]>([
    "[12:44:12] AUDIT_GEN: Sovereign reserve liquidity ratio certified at 100%.",
    "[12:45:00] CONTRACT: Notary proxy contract block #14092 registered successfully.",
    "[12:48:32] AML_SECURE: Verified zero sanctions matches on Nairobi co-investment deposits."
  ]);

  // --- INTERACTION FLOWS SECRETS AND STATES ---
  const [selectedUserId, setSelectedUserId] = useState<string | null>(SEED_USERS[0].id);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(SEED_LISTINGS[0].id);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(SEED_TRANSACTIONS[0].id);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(SEED_COMPLIANCE_CASES[0].id);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(SEED_MODERATION_REPORTS[0].id);
  
  // --- CHRONOLOGICAL TIMELINE CHANNELS ---
  const [liveEvents, setLiveEvents] = useState([
    { id: 1, time: "12:51:02 UTC", category: "AML SECURE", desc: "Identity hash biometric lock successfully matched for user Faraji.", type: "success" },
    { id: 2, time: "12:50:41 UTC", category: "BLOCKCHAIN", desc: "Smart contract proxy validated for Cape Town fractional deed.", type: "success" },
    { id: 3, time: "12:49:15 UTC", category: "ESCROW", desc: "Escrow release verified: R 12,400,000 pending regulatory sign-off.", type: "info" }
  ]);

  const [currencyCode, setCurrencyCode] = useState<"ZAR" | "USD" | "NGN" | "KES">("ZAR");
  const [selectedMapRegion, setSelectedMapRegion] = useState("Southern Africa");
  const [mapLayer, setMapLayer] = useState<"Appreciation" | "Investor Density" | "Fraud Hotspots">("Appreciation");
  const [chartRegionFilter, setChartRegionFilter] = useState("All Africa");

  // --- MODAL POPUPS TRIGGERS ---
  const [activeModal, setActiveModal] = useState<{ type: string; data: any; reason?: string; pin?: string } | null>(null);
  
  // --- GLOBAL TOAST / NOTIFICATION STATUS ---
  const [notification, setNotification] = useState<{ msg: string; type: "success" | "warn" | "info" } | null>(null);

  // --- AI CO-PILOT ASSISTANT ---
  const [aiInput, setAiInput] = useState("");
  const [aiHistory, setAiHistory] = useState<{ query: string; answer: string }[]>([
    { query: "How is Durbanville cultural district performing?", answer: "AI ADVISOR: Value index projects strong residential expansion (+14.2% YoY). Newly uploaded cultural guides represent low short-stay churn risk." }
  ]);
  const [isAiComputing, setIsAiComputing] = useState(false);

  // --- SCENARIO STRATEGIC PLANNER ---
  const [simulatingScenarioId, setSimulatingScenarioId] = useState<string | null>(null);
  const [simStep, setSimStep] = useState("");
  const [simResult, setSimResult] = useState<any>(null);

  // --- SUPPORT LIVE CHAT STATE ---
  const [supportChat, setSupportChat] = useState<{ sender: string; msg: string; time: string }[]>([
    { sender: "User", msg: "Hello, my broker commission payout Hash TX-22194 is showing frozen. Please assist.", time: "12:42" },
    { sender: "AI Assistant", msg: "I noticed your FFC license credential has flags. I will transfer this to the SuperAdmin workspace immediately.", time: "12:43" }
  ]);
  const [chatInput, setChatInput] = useState("");

  // --- RECURRING SYSTEM CLOCKS & TELEMETRIES ---
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.getUTCHours().toString().padStart(2, "0") + ":" + 
                     now.getUTCMinutes().toString().padStart(2, "0") + ":" + 
                     now.getUTCSeconds().toString().padStart(2, "0") + " UTC");
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    // Dynamic metrics fluctuation (living telemetry)
    const telemetryInterval = setInterval(() => {
      setPlatformValuation(prev => prev + (Math.random() > 0.51 ? 250000 : -180000));
      setGrossGTV(prev => prev + (Math.random() > 0.49 ? 50000 : -10000));
      setEscrowPool(prev => prev + (Math.random() > 0.52 ? 12000 : -9000));
      setInvestorConfidence(prev => parseFloat(Math.min(100, Math.max(90, prev + (Math.random() * 0.1 - 0.05))).toFixed(2)));
      setFraudRisk(prev => parseFloat(Math.min(5, Math.max(0.1, prev + (Math.random() * 0.04 - 0.02))).toFixed(2)));

      if (Math.random() > 0.88) {
        setActiveListingsCount(prev => prev + 1);
        setActiveInvestors(prev => prev + 1);
      }
    }, 4000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(telemetryInterval);
    };
  }, []);

  const toast = (msg: string, type: "success" | "warn" | "info" = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const pushLog = (msg: string) => {
    const ts = new Date().toISOString().substring(11, 19);
    setAuditLogs(prev => [`[${ts}] ${msg}`, ...prev.slice(0, 40)]);
  };

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => {
      const copy = new Set(prev);
      if (copy.has(cat)) copy.delete(cat);
      else copy.add(cat);
      return copy;
    });
  };

  const handleSubSelect = (cat: string, sub: string) => {
    setActiveCategory(cat);
    setActiveSub(sub);
  };

  // --- CURRENCY RENDER ENGINE ---
  const renderCurrency = (randValue: number) => {
    switch (currencyCode) {
      case "USD":
        return "$" + new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(randValue / 18.2);
      case "NGN":
        return "₦" + new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 }).format(randValue * 82);
      case "KES":
        return "KSh " + new Intl.NumberFormat("en-KE", { maximumFractionDigits: 0 }).format(randValue * 7.1);
      case "ZAR":
      default:
        return "R " + new Intl.NumberFormat("en-ZA", { maximumFractionDigits: 0 }).format(randValue);
    }
  };

  // --- SCENARIO SIMULATOR DIRECTIVES ---
  const runMacroScenarioStress = (scenId: string) => {
    const matched = MACRO_SCENARIOS.find(s => s.id === scenId);
    if (!matched) return;

    setSimulatingScenarioId(scenId);
    setSimResult(null);
    setSimStep("Locking cross-border escrow tunnels...");
    
    setTimeout(() => {
      setSimStep("Sensing macro coefficients across JHB & Lagos nodes...");
      setTimeout(() => {
        setSimStep("GopherML predictive tensor evaluations completed. Generating reports.");
        setSimResult(matched);
        setSimulatingScenarioId(null);
        pushLog(`SCENARIO: Simulated stressors for '${matched.title}' finished.`);
        toast(`Simulation result compiled. Confidence: ${matched.confidence}`, "info");
      }, 1200);
    }, 1000);
  };

  // --- CO-PILOT CHAT DIRECTIVES ---
  const handleCoPilotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const query = aiInput;
    setAiInput("");
    setIsAiComputing(true);

    setTimeout(() => {
      const match = PRESET_AI_ASSISTANCE.find(q => query.toLowerCase().includes(q.text.toLowerCase().split(".")[0]) || q.text.toLowerCase().includes(query.toLowerCase()));
      const reply = match ? match.response : `AI ADVISOR: Deep analysis computed. Confirmed zero compliance risk warnings on query terms '${query}'. Recommend standard dual-actor notary checking in high-vol corridors.`;
      
      setAiHistory(prev => [...prev, { query, answer: reply }]);
      setIsAiComputing(false);
      pushLog(`CO_PILOT: Processed natural language query: "${query}"`);
    }, 1200);
  };

  // --- SUPPORT CHAT DIRECTIVE ---
  const handleSendSupportMessage = () => {
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatInput("");
    setSupportChat(prev => [...prev, { sender: "SuperAdmin Operator", msg, time: currentTime.substring(0, 5) }]);
    
    setTimeout(() => {
      setSupportChat(prev => [...prev, { sender: "User", msg: "Understood. Thank you for validating my FFC license file. I will notify my local branch office.", time: currentTime.substring(0, 5) }]);
      pushLog("SUPPORT: Dynamic chat response sent.");
    }, 1500);
  };

  // --- COMPLIANCE QUEUE ACTIONS ---
  const handleModerateComplianceCase = (caseId: string, action: "approve" | "edd" | "escalate") => {
    setComplianceCases(prev => prev.map(c => {
      if (c.id === caseId) {
        let newStatus: any = "Approved Secure";
        if (action === "edd") newStatus = "Under EDD Review";
        if (action === "escalate") newStatus = "Escalated to Counsel";
        const updatedLog = [...c.caselog, `[SuperAdmin] Updated case status to: ${newStatus}`];
        return { ...c, status: newStatus, caselog: updatedLog };
      }
      return c;
    }));
    pushLog(`COMPLIANCE: Evaluated case ID ${caseId} → ${action.toUpperCase()}`);
    toast(`Case status shifted to ${action.toUpperCase()}`, "success");
  };

  // --- MODERATION ACTIONS ---
  const handleApplyModerationAction = (repId: string, action: "remove" | "warn" | "dismiss") => {
    setModerationReports(prev => prev.map(m => {
      if (m.id === repId) {
        let newStatus: any = "Dismissed";
        if (action === "remove") newStatus = "Content Removed";
        if (action === "warn") newStatus = "Warning Issued";
        return { ...m, status: newStatus };
      }
      return m;
    }));
    pushLog(`MODERATION: Content moderation action applied to ID ${repId} → ${action.toUpperCase()}`);
    toast(`Content dispatch: ${action.toUpperCase()}`, "success");
  };

  // --- GLOBAL STATE MUTATION (CONFIRMED VIA MODAL) ---
  const handleExecuteModalAction = () => {
    if (!activeModal) return;
    const { type, data, reason, pin } = activeModal;

    pushLog(`MODAL_CLEAR: Signing override hash key ${pin || "AES-91"} // Reason: "${reason || "No reason given"}"`);

    switch (type) {
      case "suspend": {
        const uId = data.id;
        setUsers(prev => prev.map(u => {
          if (u.id === uId) {
            const isSusp = u.status === "Suspended";
            return { 
              ...u, 
              status: isSusp ? "Active" : "Suspended",
              riskScore: isSusp ? 14 : 95
            };
          }
          return u;
        }));
        toast(`User status overridden for ${data.name}.`, "success");
        break;
      }
      case "freeze_wallet": {
        const uId = data.id;
        setUsers(prev => prev.map(u => {
          if (u.id === uId) {
            return { ...u, isWalletFrozen: !u.isWalletFrozen };
          }
          return u;
        }));
        toast(`Wallet locks modified for ${data.name}.`, "success");
        break;
      }
      case "kyc_audit": {
        setUsers(prev => prev.map(u => {
          if (u.id === data.id) {
            return { ...u, kycStatus: "Flagged", status: "Restricted" };
          }
          return u;
        }));
        toast(`KYC audits scheduled. Biometrics restricted.`, "warn");
        break;
      }
      case "approve_verification": {
        setUsers(prev => prev.map(u => {
          if (u.id === data.id) {
            return { ...u, status: "Active", kycStatus: "Approved" };
          }
          return u;
        }));
        toast(`KYC biometrics cleared for ${data.name}.`, "success");
        break;
      }
      case "approve_listing_asset": {
        setListings(prev => prev.map(l => {
          if (l.id === data.id) {
            return { ...l, status: "Verified Active", authenticityScore: 98 };
          }
          return l;
        }));
        toast(`Property listing published. Token allocation verified.`, "success");
        break;
      }
      case "ai_reanalyze_property": {
        setListings(prev => prev.map(l => {
          if (l.id === data.id) {
            return { ...l, authenticityScore: 99 };
          }
          return l;
        }));
        toast(`Neural scans completed. Property index matched.`, "success");
        break;
      }
      case "verify_geo_property": {
        setListings(prev => prev.map(l => {
          if (l.id === data.id) {
            return { ...l, authenticityScore: 100, status: "Verified Active" };
          }
          return l;
        }));
        toast(`Geospatial overlays matched with satellite coordinates.`, "success");
        break;
      }
      case "send_listing_warning": {
        setListings(prev => prev.map(l => {
          if (l.id === data.id) {
            return { ...l, status: "Flagged Listings", authenticityScore: 24 };
          }
          return l;
        }));
        toast(`Flagged warning dispatched to property agent FFC ledger.`, "warn");
        break;
      }
      case "push_to_investors": {
        toast(`Pushed luxury asset portfolio directly to matched high-net-worth buyers.`, "success");
        break;
      }
      case "approve_payout_escrow": {
        setTransactions(prev => prev.map(t => {
          if (t.id === data.id) {
            return { ...t, status: "Completed" };
          }
          return t;
        }));
        setEscrowPool(p => p - data.amount);
        toast(`Escrow payout authorized. Funds transferred.`, "success");
        break;
      }
      case "freeze_escrow_pool": {
        setTransactions(prev => prev.map(t => {
          if (t.id === data.id) {
            return { ...t, status: "Frozen Locked" };
          }
          return t;
        }));
        toast(`Funds frozen inside the sovereign custody notary safe.`, "warn");
        break;
      }
      case "reverse_escrow_tx": {
        setTransactions(prev => prev.map(t => {
          if (t.id === data.id) {
            return { ...t, status: "Reversed" };
          }
          return t;
        }));
        toast(`Transaction reversed. Funds credited back to host.`, "info");
        break;
      }
      case "trigger_aml_invest": {
        toast(`Dispatched compliance forensic officers to address suspicious transfer velocity.`, "warn");
        break;
      }
      case "initiate_refund_tx": {
        setTransactions(prev => prev.map(t => {
          if (t.id === data.id) {
            return { ...t, status: "Reversed" };
          }
          return t;
        }));
        toast(`Refund issued. Clearing files updated.`, "success");
        break;
      }
      case "schedule_dividend": {
        setUsers(uCopy => uCopy.map(u => {
          if (u.role === "Investor") {
            return { 
              ...u, 
              walletBalance: u.walletBalance + 82000, 
              notesHistory: [...u.notesHistory, "Received REIT fractional dividend payout of R 82,000."]
            };
          }
          return u;
        }));
        toast(`Distributed dividends seamlessly to all accredited investors.`, "success");
        break;
      }
      case "adjust_pricing_config": {
        toast(`Applied rates coefficients successfully across all active nodes.`, "success");
        break;
      }
      case "trigger_general_report": {
        toast(`Cryptographic financial diagnostics compiled. Downloading PDF.`, "success");
        break;
      }
      case "restart_service_node": {
        setServices(prev => prev.map(s => {
          if (s.id === data.id) {
            return { ...s, status: "ONLINE", latency: "11ms" };
          }
          return s;
        }));
        toast(`Core node restart initiated. System buffers normalized.`, "success");
        break;
      }
      case "isolate_threat": {
        setThreats(prev => prev.map(th => {
          if (th.id === data.id) {
            return { ...th, status: "Mitigated Isolate" };
          }
          return th;
        }));
        toast(`Brute-force host router completely blocked and isolated.`, "success");
        break;
      }
      default:
        break;
    }

    setActiveModal(null);
  };

  // --- CORE CONFLICT RESOLUTIONS COVERS ---
  const handleOpenActionModal = (actionType: string, payload: any) => {
    setActiveModal({
      type: actionType,
      data: payload,
      reason: "Urgent executive overrides required under compliance law.",
      pin: "AES-3942-CPT"
    });
  };

  const SIDEBAR_NAV = [
    {
      name: "Dashboard",
      icon: <Activity className="h-4 w-4" />,
      children: ["Executive Overview", "Global Metrics", "AI Insights", "Live Activity Feed"]
    },
    {
      name: "Users & Access Operations",
      icon: <Users className="h-4 w-4" />,
      children: ["Normal Users", "Agents", "Investors", "Agencies", "Developers", "Permissions & Roles", "Suspensions", "Verification Queue"]
    },
    {
      name: "Listings Operations",
      icon: <Globe className="h-4 w-4" />,
      children: ["All Listings", "Pending Approvals", "Smart Verification", "Flagged Listings", "Expired Listings", "Geo Mapping", "REIT Assets", "Luxury Portfolio"]
    },
    {
      name: "Revenue Operations",
      icon: <DollarSign className="h-4 w-4" />,
      children: ["Revenue Overview", "Commissions", "Investor Income", "Escrow & Wallets", "Transactions", "Subscription Plans", "Taxes & Financial Reports"]
    },
    {
      name: "Compliance Command",
      icon: <Shield className="h-4 w-4" />,
      children: ["KYC", "AML Screening", "Fraud & Sanctions", "Audit Logs", "Legal Cases & Regulatory Reports"]
    },
    {
      name: "Moderation & Trust",
      icon: <ShieldAlert className="h-4 w-4" />,
      children: ["Content Moderation", "User Reports", "Dispute Center", "AI Moderation Queue", "Communication Monitoring"]
    },
    {
      name: "System Health",
      icon: <Server className="h-4 w-4" />,
      children: ["Service Status", "AI Engine Health", "Cybersecurity & Threats", "APIs & Error Logs"]
    },
    {
      name: "AI Co-Pilot",
      icon: <Sparkles className="h-4 w-4" />,
      children: ["Executive AI Assistant", "Revenue Forecasting", "Market Intelligence", "AI Automation Workflows"]
    },
    {
      name: "Analytics Intelligence",
      icon: <TrendingUp className="h-4 w-4" />,
      children: ["Business Intelligence", "Geographic Insights", "Occupancy & Performance"]
    },
    {
      name: "Settings & Governance",
      icon: <Lock className="h-4 w-4" />,
      children: ["Platform Settings", "Localization & Currency", "AI Configuration & API Keys"]
    },
    {
      name: "Support & Incident Response",
      icon: <HelpCircle className="h-4 w-4" />,
      children: ["Tickets", "Live Chat Console", "Escalations"]
    }
  ];

  return (
    <div className="fixed inset-0 z-[99999] flex h-screen w-screen overflow-hidden bg-[#030612] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* GLOBAL BANNER FLOATING SUCCESS TOASTS */}
      {notification && (
        <div className="fixed top-5 right-5 z-[100000] flex items-center gap-3 rounded-xl border border-cyan-500/30 bg-[#0c1224] px-5 py-3.5 text-xs font-mono text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)] animate-bounce">
          <CheckCircle2 className="h-5 w-5 text-cyan-400" />
          <div>
            <span className="font-bold uppercase tracking-wider block">SOVEREIGN_OS RESOLUTION</span>
            <span className="text-slate-300 font-sans">{notification.msg}</span>
          </div>
        </div>
      )}

      {/* 1. LEFT NAVIGATION SIDEBAR */}
      <aside className="flex w-72 flex-col flex-shrink-0 border-r border-slate-800/80 bg-slate-950/90 overflow-y-auto [scrollbar-width:thin] custom-scrollbar select-none">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3 border-b border-slate-800/80 px-5 py-4">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-600 via-cyan-400 to-emerald-400 p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-pulse">
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-slate-950">
              <Sparkles className="h-4 w-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="text-xs font-black tracking-widest text-white flex items-center gap-1">
              AFRIESTATE <span className="rounded bg-cyan-500/10 px-1 py-0.5 text-[8.5px] font-black text-cyan-400 uppercase tracking-widest border border-cyan-500/20">OS V3</span>
            </div>
            <div className="text-[9.5px] uppercase tracking-widest text-slate-400 font-semibold font-mono">Real Estate Intel</div>
          </div>
        </div>

        {/* Real-time Telemetry Monitor Box */}
        <div className="p-4 bg-slate-900/40 border-b border-slate-800/60 text-[10px] space-y-1.5 select-none font-mono text-slate-400">
          <div className="flex justify-between">
            <span>PLATFORM SECURITY:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span> NOMINAL SECURE
            </span>
          </div>
          <div className="flex justify-between">
            <span>MONITORED BUFFERS:</span>
            <span className="text-cyan-400">14,872 ACTIVE</span>
          </div>
          <div className="flex justify-between">
            <span>NOTARY OVERRIDES:</span>
            <span className="text-white font-bold text-right">0 PENDING BLOCK</span>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <div className="flex-1 px-3 py-4 space-y-1">
          {SIDEBAR_NAV.map(nav => {
            const isExpanded = expandedCategories.has(nav.name);
            const isActiveCategory = activeCategory === nav.name;

            return (
              <div key={nav.name} className="space-y-0.5">
                <button 
                  onClick={() => toggleCategory(nav.name)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-all hover:bg-slate-800/40 ${
                    isActiveCategory ? "bg-[#0d1430] text-white font-bold" : "text-slate-400"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-cyan-400">{nav.icon}</span>
                    <span className="text-xs font-mono tracking-wide">{nav.name}</span>
                  </div>
                  <span className={`text-[9px] text-slate-500 transition-transform ${isExpanded ? "rotate-180" : ""}`}>▼</span>
                </button>

                {isExpanded && (
                  <div className="ml-5 flex flex-col border-l border-slate-800 pl-3 py-0.5 space-y-0.5">
                    {nav.children.map(sub => {
                      const isActiveSub = activeCategory === nav.name && activeSub === sub;
                      return (
                        <button
                          key={sub}
                          onClick={() => handleSubSelect(nav.name, sub)}
                          className={`w-full rounded px-2 py-1.5 text-left text-[11px] font-mono transition-all ${
                            isActiveSub 
                              ? "bg-cyan-500/10 text-cyan-400 font-extrabold border-l-2 border-cyan-400 pl-2.5" 
                              : "text-slate-400 hover:text-slate-200"
                          }`}
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

        {/* Aladdin API Latency indicator */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 font-mono text-[10px] text-slate-500">
          <div className="flex justify-between items-center bg-[#070b19] border border-slate-800 rounded p-2 text-cyan-400">
            <span>CORE NODE LATENCY:</span>
            <span>11ms</span>
          </div>
        </div>
      </aside>

      {/* 2. MAIN HUB FIELD */}
      <main className="flex flex-1 flex-col overflow-hidden bg-[#070b19] text-xs">
        
        {/* UPPER CONTROLS HEADER */}
        <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-800 bg-slate-950/90 px-8 select-none">
          
          {/* Breadcrumb timeline */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-wide">
            <span className="text-slate-500 uppercase font-black">AFRIESTATE COMMAND</span>
            <span className="text-slate-700">/</span>
            <span className="text-cyan-400 uppercase">{activeCategory}</span>
            <span className="text-slate-700">/</span>
            <span className="text-white font-bold uppercase">{activeSub}</span>
          </div>

          <div className="flex items-center gap-5">
            {/* Currency conversion select */}
            <div className="flex items-center gap-1 rounded bg-[#0c1224] p-1 border border-slate-800 font-mono text-[10px]">
              <span className="px-1 text-slate-500 font-bold uppercase">VAL_CUR:</span>
              {(["ZAR", "USD", "NGN", "KES"] as const).map(curr => (
                <button
                  key={curr}
                  onClick={() => setCurrencyCode(curr)}
                  className={`rounded px-1.5 py-0.5 font-bold transition-all ${
                    currencyCode === curr 
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" 
                      : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            {/* Central System Zulu Ticker */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded px-3 py-1 font-mono text-[11px] text-slate-300">
              <Clock className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
              <span>{currentTime || "00:00:00 UTC"}</span>
            </div>

            <button 
              onClick={onClose} 
              className="rounded bg-rose-500/10 px-4 py-1.5 text-xs font-extrabold text-rose-450 border border-rose-500/20 hover:bg-rose-500/20 transition-all font-mono"
            >
              DISCONNECT
            </button>
          </div>
        </header>

        {/* MODULAR COMPONENT SCREEN VIEWSCAPES */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 custom-scrollbar [scrollbar-width:thin]">
          
          {/* CATEGORY: DASHBOARD VIEWS */}
          {activeCategory === "Dashboard" && activeSub === "Executive Overview" && (
            <div className="space-y-6">
              
              {/* Telemetry KPI Overview Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 font-mono">
                {[
                  { label: "Platform Portfolio Valuation", val: renderCurrency(platformValuation), delta: "+R 48K / Live", color: "text-emerald-400" },
                  { label: "Active Listings Registry", val: activeListingsCount.toLocaleString(), delta: "Sync Active", color: "text-cyan-400" },
                  { label: "Gross Transaction Volume (YTD)", val: renderCurrency(grossGTV), delta: "+18% CAGR", color: "text-amber-500" },
                  { label: "Live System Trust Exposure", val: `${investorConfidence}%`, delta: "Stabilized Yield", color: "text-purple-400" },
                  { label: "Fraud Risk Coefficient", val: `${fraudRisk}%`, delta: "Limits Safe (<2%)", color: fraudRisk < 2 ? "text-emerald-400" : "text-rose-400" }
                ].map((kpi, idx) => (
                  <div key={idx} className="relative overflow-hidden rounded-xl border border-slate-850 bg-[#0c1224] p-4">
                    <div className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-cyan-400"></div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-450 block mb-1">{kpi.label}</span>
                    <span className={`text-lg font-bold block ${kpi.color} mb-0.5`}>{kpi.val}</span>
                    <span className="text-[9.5px] text-slate-500">{kpi.delta}</span>
                  </div>
                ))}
              </div>

              {/* Stress simulation planning panel */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Macro Scenario options */}
                <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-[#0d142b] p-5 space-y-3 flex flex-col justify-between font-mono">
                  <div>
                    <h3 className="text-xs font-black text-white tracking-widest uppercase flex items-center gap-1.5 pb-2 border-b border-slate-800">
                      <Cpu className="h-4 w-4 text-emerald-400" /> Executive Scenario Stress Simulator
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-normal mb-3">Evaluate macroeconomic stressors and smart zoning overlays prior to deployment.</p>
                    
                    <div className="space-y-2 max-h-56 overflow-y-auto [scrollbar-width:thin] pr-1">
                      {MACRO_SCENARIOS.map(scen => (
                        <div 
                          key={scen.id}
                          onClick={() => runMacroScenarioStress(scen.id)}
                          className="p-2 bg-slate-950/60 rounded border border-slate-850 hover:border-slate-700 cursor-pointer text-[10.5px] flex items-center justify-between"
                        >
                          <div>
                            <span className="text-slate-200 font-bold block">{scen.title}</span>
                            <span className="text-slate-550 block text-[9.5px] font-sans">{scen.description}</span>
                          </div>
                          <span className="bg-cyan-500/10 text-cyan-400 text-[9px] px-1.5 py-0.5 rounded uppercase font-bold">{scen.impact}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 border-t border-slate-850 pt-2 flex items-center justify-between">
                    <span>GopherML predictive analytics online.</span>
                    <span className="text-cyan-400">Calibrated: 99.1%</span>
                  </div>
                </div>

                {/* Simulation diagnostics output panel */}
                <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-950 p-5 flex flex-col justify-between font-mono">
                  <div>
                    <h3 className="text-xs font-black text-white tracking-widest uppercase flex items-center gap-1.5 pb-2 border-b border-slate-850 mb-3">
                      <Network className="h-4 w-4 text-cyan-400" /> Live Simulation Core Diagnostics
                    </h3>

                    {simulatingScenarioId ? (
                      <div className="text-center py-12 space-y-3">
                        <RefreshCw className="h-7 w-7 text-cyan-400 animate-spin mx-auto" />
                        <p className="text-[11px] text-slate-350 animate-pulse">{simStep}</p>
                      </div>
                    ) : simResult ? (
                      <div className="space-y-3.5 text-[11px]">
                        <div className="p-2.5 bg-cyan-950/20 border border-cyan-850 rounded text-cyan-400">
                          <strong>Stress Core Matched:</strong> {simResult.title}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                          <div className="bg-slate-900 border border-slate-850 p-2 rounded">
                            <span className="text-slate-500 block">EST_REVENUE_EFFECT</span>
                            <strong className="text-rose-400 font-bold block">{simResult.revenueOutcome}</strong>
                          </div>
                          <div className="bg-slate-900 border border-slate-850 p-2 rounded">
                            <span className="text-slate-500 block">PREDICTIVE_STABILITY</span>
                            <strong className="text-cyan-400 font-bold block">{simResult.confidence} Confidence</strong>
                          </div>
                        </div>
                        <div className="p-3 bg-slate-900 rounded border border-slate-850">
                          <span className="text-[10px] text-slate-500 block font-bold mb-1 uppercase">Remediation Script Policy</span>
                          <p className="text-slate-350 leading-normal pl-2 border-l border-emerald-400">{simResult.remediation}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-900/40 border border-slate-850 rounded-lg p-6 text-center select-none text-slate-500 text-[10.5px]">
                        Click any stressful macro scenario list card on the left to initialize real-time diagnostic testing.
                      </div>
                    )}
                  </div>

                  <span className="text-[9px] text-slate-600 block mt-3 select-none">DISPATCH_REGULAR_BYPASS_HASH: Nominal</span>
                </div>

              </div>

              {/* Sovereign Action Alerts banner */}
              <div className="rounded-xl border border-slate-850 bg-[#0c1224] p-5">
                <div className="flex items-center justify-between border-b border-slate-850 pb-2.5 mb-3.5">
                  <h3 className="text-xs font-black text-rose-400 tracking-widest uppercase flex items-center gap-2 font-mono">
                    <ShieldAlert className="h-4 w-4 text-rose-500 animate-pulse" /> Urgent Regulatory Exceptions Requiring Attention
                  </h3>
                  <span className="bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded text-[10px] font-bold">CRITICAL DEVIATIONS</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[11px] leading-relaxed">
                  <div className="bg-rose-950/10 border border-rose-900/50 p-3.5 rounded-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-rose-500 text-black font-extrabold px-1.5 rounded text-[8.5px] uppercase">KYC FAIL</span>
                      <h4 className="font-bold text-white mt-1.5 mb-1 text-xs">Biometrics fingerprint mismatch registered on Pretoria investor wallet request.</h4>
                      <p className="text-slate-400 text-[10px] mb-3">User 'Amara_Diallo_SNG' triggered withdrawal request through TOR nodes.</p>
                    </div>
                    <button 
                      onClick={() => handleOpenActionModal("suspend", users.find(u => u.id === "USR-7705"))}
                      className="w-full bg-[#1e131d] text-rose-400 border border-rose-900/50 hover:bg-rose-900/20 py-1.5 rounded text-[10px] font-bold uppercase"
                    >
                      Audit & Suspend User
                    </button>
                  </div>
                  <div className="bg-amber-950/10 border border-amber-900/50 p-3.5 rounded-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-amber-500 text-black font-extrabold px-1.5 rounded text-[8.5px] uppercase">LICENSE FLAGGED</span>
                      <h4 className="font-bold text-white mt-1.5 mb-1 text-xs">FFC certification license mismatch on property listings in Gauteng node.</h4>
                      <p className="text-slate-400 text-[10px] mb-3">Agent Zenebech Selassie listings are active on historical expired credential hash.</p>
                    </div>
                    <button 
                      onClick={() => handleOpenActionModal("kyc_audit", users.find(u => u.id === "USR-4402"))}
                      className="w-full bg-[#1e1a13] text-amber-400 border border-amber-900/50 hover:bg-amber-900/20 py-1.5 rounded text-[10px] font-bold uppercase"
                    >
                      Mark Restricted & Re-Vette FFC
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeCategory === "Dashboard" && activeSub === "Global Metrics" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-slate-500">ZOOM REGIONAL NODE:</span>
                  {["All Africa", "Southern Africa", "West Africa", "East Africa"].map(reg => (
                    <button
                      key={reg}
                      onClick={() => setChartRegionFilter(reg)}
                      className={`rounded px-3 py-1 font-bold ${
                        chartRegionFilter === reg ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {reg}
                    </button>
                  ))}
                </div>
              </div>
              <RevenueTab 
                transactions={transactions} 
                selectedTransactionId={selectedTransactionId} 
                setSelectedTransactionId={setSelectedTransactionId}
                onAction={handleOpenActionModal}
                activeSub="Revenue Overview"
                currencyCodeUsed={currencyCode}
                renderCurrency={renderCurrency}
              />
            </div>
          )}

          {activeCategory === "Dashboard" && activeSub === "AI Insights" && (
            <UsersTab 
              users={users} 
              selectedUserId={selectedUserId} 
              setSelectedUserId={setSelectedUserId} 
              onAction={handleOpenActionModal} 
              activeSub="Verification Queue"
            />
          )}

          {activeCategory === "Dashboard" && activeSub === "Live Activity Feed" && (
            <div className="rounded-xl border border-slate-850 bg-slate-950 p-6 space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-800">
                <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <Activity className="h-4 w-4 text-cyan-400 animate-pulse" /> Live Telemetry Console Logging Feed
                </h3>
                <span className="text-slate-500">WEBSOCKET POOLS OPEN: 24 buffers</span>
              </div>
              <div className="space-y-2.5 max-h-96 overflow-y-auto [scrollbar-width:thin]">
                {liveEvents.map(e => (
                  <div key={e.id} className="p-3 bg-slate-900/55 rounded border border-slate-850 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">{e.time}</span>
                      <span className="text-cyan-400 font-extrabold px-1 bg-cyan-950/40 rounded text-[9.5px] uppercase">{e.category}</span>
                      <span className="text-slate-300 ml-1.5">{e.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CATEGORY: USERS OPERATIONS VIEWS */}
          {activeCategory === "Users & Access Operations" && (
            <UsersTab 
              users={users} 
              selectedUserId={selectedUserId} 
              setSelectedUserId={setSelectedUserId} 
              onAction={handleOpenActionModal} 
              activeSub={activeSub}
            />
          )}

          {/* CATEGORY: LISTINGS OPERATIONS VIEWS */}
          {activeCategory === "Listings Operations" && (
            <ListingsTab 
              listings={listings} 
              selectedPropertyId={selectedPropertyId} 
              setSelectedPropertyId={setSelectedPropertyId} 
              onAction={handleOpenActionModal} 
              activeSub={activeSub}
              selectedMapRegion={selectedMapRegion}
              setSelectedMapRegion={setSelectedMapRegion}
              mapLayer={mapLayer}
              setMapLayer={setMapLayer}
              currencyCodeUsed={currencyCode}
              renderCurrency={renderCurrency}
            />
          )}

          {/* CATEGORY: REVENUE OPERATIONS VIEWS */}
          {activeCategory === "Revenue Operations" && (
            <RevenueTab 
              transactions={transactions} 
              selectedTransactionId={selectedTransactionId} 
              setSelectedTransactionId={setSelectedTransactionId}
              onAction={handleOpenActionModal}
              activeSub={activeSub}
              currencyCodeUsed={currencyCode}
              renderCurrency={renderCurrency}
            />
          )}

          {/* CATEGORY: COMPLIANCE COMMAND */}
          {activeCategory === "Compliance Command" && (
            <div className="space-y-6 font-mono text-xs">
              
              {activeSub === "Audit Logs" ? (
                /* Audit trail feed */
                <div className="rounded-xl border border-slate-800 bg-[#0c1224] p-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3.5">
                    <h3 className="text-xs font-black text-white tracking-widest uppercase flex items-center gap-1.5">
                      <Shield className="h-4 w-4 text-cyan-400" /> Cryptographic Immutable Audit Ledger Blocks
                    </h3>
                    <span className="text-slate-500">SHA-256 CO-CHAIN CONNECTED</span>
                  </div>
                  <div className="space-y-2 bg-slate-950 p-4 rounded-lg border border-slate-900 font-mono text-[10.5px]">
                    {auditLogs.map((log, id) => (
                      <div key={id} className="text-slate-350">{log}</div>
                    ))}
                  </div>
                </div>
              ) : (
                /* KYC, AML Screening, Custom legal cases listing */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Cases list */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-850 bg-slate-950 p-4">
                      <span className="text-slate-450 uppercase font-black">Active Compliance Incidents ({complianceCases.length})</span>
                      <span className="bg-rose-500/10 text-rose-450 px-2 py-0.5 rounded text-[10px] font-bold">VETTING CORE ACTIVE</span>
                    </div>

                    <div className="rounded-xl border border-slate-850 bg-[#0c1224] overflow-hidden">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-slate-850 text-slate-500 text-[10px] uppercase bg-slate-950">
                            <th className="p-4">INCIDENT ID</th>
                            <th className="p-4">SUBJECT ROLE</th>
                            <th className="p-4">INCIDENT FOCUS DETAILS</th>
                            <th className="p-4 text-center">AML RISK INDEX</th>
                            <th className="p-4">STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {complianceCases.map(c => (
                            <tr 
                              key={c.id} 
                              onClick={() => setSelectedCaseId(c.id)}
                              className={`border-b border-slate-800/40 hover:bg-slate-900/30 cursor-pointer text-[11px] transition-all ${
                                selectedCaseId === c.id ? "bg-cyan-950/10" : ""
                              }`}
                            >
                              <td className="p-4 font-bold text-white select-all">{c.id}</td>
                              <td className="p-4">
                                <span className="text-slate-250 block font-semibold">{c.subjectName}</span>
                                <span className="text-slate-500 block text-[9.5px]">{c.subjectRole}</span>
                              </td>
                              <td className="p-4 text-slate-400 font-sans">{c.details}</td>
                              <td className="p-4 text-center">
                                <span className={`font-bold ${c.riskScore > 75 ? "text-rose-400" : "text-amber-400"}`}>{c.riskScore}%</span>
                              </td>
                              <td className="p-4">
                                <span className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold ${
                                  c.status === 'Approved Secure' ? "bg-emerald-500/10 text-emerald-400" :
                                  c.status === 'Under EDD Review' ? "bg-amber-500/10 text-amber-405 animate-pulse" : "bg-rose-500/10 text-rose-450"
                                }`}>{c.status}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Incident timeline cases & mitigation workspace */}
                  <div className="lg:col-span-4 rounded-xl border border-slate-850 bg-[#0d142b] p-5 flex flex-col justify-between overflow-hidden">
                    {selectedCaseId ? (
                      (() => {
                        const matchedCase = complianceCases.find(c => c.id === selectedCaseId)!;
                        return (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 rounded-lg bg-rose-950/40 border border-rose-800/30 p-2 text-rose-400 text-[10px] text-center justify-center font-bold">
                              <ShieldAlert className="h-3.5 w-3.5" /> CRITICAL LEGAL INCIDENT TIMELINE
                            </div>

                            <div>
                              <span className="text-[10px] text-slate-500">INCIDENT ENVELOPE:</span>
                              <h3 className="text-sm font-black text-white select-all">{matchedCase.id}</h3>
                              <p className="text-[10px] text-cyan-405 lowercase mb-2">{matchedCase.subjectName} ({matchedCase.subjectRole})</p>
                            </div>

                            <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 space-y-1.5 font-sans overflow-y-auto max-h-36 [scrollbar-width:thin] pr-1">
                              <span className="text-[10px] text-slate-550 font-bold block pb-1 border-b border-slate-900 uppercase font-mono">INCIDENT EVENT LOG</span>
                              {matchedCase.caselog?.map((log, idx) => (
                                <div key={idx} className="text-[10.5px] text-slate-350 leading-relaxed border-l border-cyan-400 pl-2">{log}</div>
                              ))}
                            </div>

                            <div>
                              <span className="text-[10px] text-slate-500 block mb-1">ATTACHED DOCUMENTATION FILE:</span>
                              <span onClick={() => handleOpenActionModal("trigger_general_report", matchedCase)} className="text-cyan-400 font-bold hover:underline cursor-pointer flex items-center gap-1">
                                <FileText className="h-3.5 w-3.5" /> {matchedCase.documentName}
                              </span>
                            </div>

                            <div className="space-y-2 border-t border-slate-800 pt-3">
                              <span className="text-[10px] text-slate-500 block font-bold uppercase">Incident Overrides</span>
                              <div className="grid grid-cols-2 gap-2">
                                <button onClick={() => handleModerateComplianceCase(matchedCase.id, "edd")} className="rounded bg-amber-500/15 py-1.5 text-amber-400 border border-amber-500/20 hover:bg-amber-500/25">Trigger EDD</button>
                                <button onClick={() => handleModerateComplianceCase(matchedCase.id, "escalate")} className="rounded bg-rose-500/15 py-1.5 text-rose-400 border border-rose-500/20 hover:bg-rose-500/25">Escalate Counsel</button>
                              </div>
                              <button onClick={() => handleModerateComplianceCase(matchedCase.id, "approve")} className="w-full rounded bg-emerald-500 text-black font-bold py-2 hover:bg-emerald-400 mt-1 uppercase">Approve & Clear Incident</button>
                            </div>
                          </div>
                        );
                      })()
                    ) : (
                      <div className="text-center py-20 text-slate-500">
                        Select a compliance case card from the incident register to run legal forensic tools.
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>
          )}

          {/* CATEGORY: MODERATION & TRUST */}
          {activeCategory === "Moderation & Trust" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
              
              {/* Reports queue table */}
              <div className="lg:col-span-8 flex flex-col space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-850 bg-slate-950 p-4">
                  <span className="text-slate-400 font-bold uppercase">Platform Content Flagger Incident Stream</span>
                  <span className="text-slate-500 text-[10px]">VERDICT PIPELINE: ONLINE</span>
                </div>

                <div className="rounded-xl border border-slate-850 bg-[#0c1224] overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-850 text-slate-500 text-[10px] uppercase bg-slate-950">
                        <th className="p-4">REPORT ID</th>
                        <th className="p-4">CONTENT TYPE</th>
                        <th className="p-4">REPORTED ISSUE</th>
                        <th className="p-4">SEVERITY</th>
                        <th className="p-4 text-right">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {moderationReports.map(m => (
                        <tr 
                          key={m.id} 
                          onClick={() => setSelectedReportId(m.id)}
                          className={`border-b border-slate-800/40 hover:bg-slate-900/30 cursor-pointer text-[11px] transition-all ${
                            selectedReportId === m.id ? "bg-cyan-950/10" : ""
                          }`}
                        >
                          <td className="p-4 font-bold text-white uppercase">{m.id}</td>
                          <td className="p-4">
                            <span className="text-cyan-400 font-semibold">{m.contentType}</span>
                            <span className="text-slate-500 block text-[9.5px]">by {m.reportingUser}</span>
                          </td>
                          <td className="p-4 text-slate-450 font-sans leading-normal">{m.issue}</td>
                          <td className="p-4">
                            <span className={`px-1.5 py-0.2 rounded text-[8px] font-black ${
                              m.severity === 'Critical' ? "bg-rose-500 text-black" : "bg-amber-500 text-black"
                            }`}>{m.severity.toUpperCase()}</span>
                          </td>
                          <td className="p-4 text-right font-black">
                            <span className={`px-1.5 py-0.5 rounded text-[9.5px] ${
                              m.status.includes("Removed") ? "bg-rose-500/10 text-rose-450" :
                              m.status.includes("Dismiss") ? "bg-emerald-500/10 text-emerald-440" : "bg-cyan-500/10 text-cyan-400"
                            }`}>{m.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Moderation arbitration detail card */}
              <div className="lg:col-span-4 rounded-xl border border-slate-850 bg-[#0d142b] p-5 flex flex-col justify-between overflow-hidden">
                {selectedReportId ? (
                  (() => {
                    const matchedReport = moderationReports.find(m => m.id === selectedReportId)!;
                    return (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 rounded-lg bg-cyan-950/40 border border-cyan-800/30 p-2 text-cyan-400 text-[10.5px] text-center justify-center font-bold">
                          <ShieldAlert className="h-4 w-4" /> REVALUATION DISPUTE ARBITRATOR
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-500 uppercase">INCIDENT ENVELOPE:</span>
                          <h3 className="text-sm font-black text-white">{matchedReport.id}</h3>
                          <p className="text-[10px] text-slate-400">Reporter: {matchedReport.reportingUser}</p>
                        </div>

                        <div className="p-3 bg-slate-950 rounded border border-slate-900 font-mono text-[10.5px] space-y-1 text-slate-350">
                          <span className="text-slate-500 font-bold uppercase block text-[9.5px]">FLAGGED VALUE ELEMENT:</span>
                          <p className="leading-relaxed border-l-2 border-rose-500 pl-2">{matchedReport.reportedValue}</p>
                        </div>

                        <div className="space-y-2 border-t border-slate-800 pt-3">
                          <span className="text-[10px] text-slate-500 block font-bold uppercase">Arbitration Decision</span>
                          <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => handleApplyModerationAction(matchedReport.id, "warn")} className="rounded bg-amber-500/10 py-1.5 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 font-bold uppercase">Issue Warn</button>
                            <button onClick={() => handleApplyModerationAction(matchedReport.id, "dismiss")} className="rounded bg-slate-900 py-1.5 text-slate-400 border border-slate-800 hover:border-slate-600 font-bold uppercase">Dismiss Flag</button>
                          </div>
                          <button onClick={() => handleApplyModerationAction(matchedReport.id, "remove")} className="w-full rounded bg-rose-500 text-black font-bold py-2 hover:bg-rose-450 uppercase mt-1">Authorize & Remove Content</button>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="text-center py-20 text-slate-500">
                    Select a flagged content review or listing report row to dispatch arbitration enforcement verdicts.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* CATEGORY: SYSTEM HEALTH VIEWS */}
          {activeCategory === "System Health" && (
            <div className="space-y-6 font-mono text-xs">
              
              {/* Service status health cards registry */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {services.map(srv => (
                  <div key={srv.id} className="p-4 rounded-xl border border-slate-850 bg-[#0c1224] flex items-center justify-between">
                    <div>
                      <span className="text-[10.5px] font-bold text-white block">{srv.name}</span>
                      <span className="text-[9px] text-slate-500 uppercase">{srv.id} • latency {srv.latency}</span>
                    </div>

                    <div className="text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        srv.status === 'ONLINE' ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                      }`}>{srv.status}</span>
                      <button 
                        onClick={() => handleOpenActionModal("restart_service_node", srv)}
                        className="text-[9px] text-cyan-400 hover:underline block mt-1.5 uppercase font-bold"
                      >
                        REBOOT
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Active cyber threat logs */}
              {activeSub === "Cybersecurity & Threats" && (
                <div className="rounded-xl border border-slate-850 bg-[#0c1224] p-5 space-y-4">
                  <h3 className="text-xs font-bold text-slate-100 flex items-center gap-1.5 border-b border-slate-850 pb-2.5">
                    <ShieldAlert className="h-4 w-4 text-rose-500 animate-pulse" /> INTRUSION DETECTION & ACTIVE BRUTE-FORCE ATTEMPT CHANNELS
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-850 text-slate-500 text-[9.5px]">
                          <th>INCIDENT SOURCE IP</th>
                          <th>SOURCE GEOLOCATION</th>
                          <th>PROBING ATTACK TYPE</th>
                          <th>SEVERITY</th>
                          <th>STATUS</th>
                          <th className="text-right">MITIGATION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {threats.map(th => (
                          <tr key={th.id} className="border-b border-slate-800/40 hover:bg-[#070b19] text-[11px]">
                            <td className="py-3 font-bold text-slate-200 select-all">{th.sourceIp}</td>
                            <td className="py-3 text-slate-400">{th.location}</td>
                            <td className="py-3 text-cyan-400 font-bold">{th.attackType}</td>
                            <td className="py-3">
                              <span className={`px-1 rounded text-[9px] font-bold ${
                                th.severity === 'CRITICAL' ? "bg-rose-500 text-black" : "bg-amber-500 text-black"
                              }`}>{th.severity}</span>
                            </td>
                            <td className="py-3 text-slate-400">{th.status}</td>
                            <td className="py-3 text-right">
                              {th.status.includes("Mitigated") ? (
                                <span className="text-emerald-400 font-bold">Mitigated ✓</span>
                              ) : (
                                <button 
                                  onClick={() => handleOpenActionModal("isolate_threat", th)}
                                  className="bg-rose-500 hover:bg-rose-450 text-black font-bold px-3 py-1 rounded text-[10px] uppercase"
                                >
                                  Isolate IP
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Console log outputs terminal */}
              {activeSub === "APIs & Error Logs" && (
                <div className="rounded-xl border border-slate-850 bg-slate-950 p-5 space-y-3.5">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-cyan-450 font-bold flex items-center gap-1.5"><Terminal className="h-4 w-4 text-cyan-400 animate-pulse" /> SOVEREIGN NODE REAL-TIME TERMINAL PRINTS</span>
                    <span className="text-slate-500">Nominal diagnostics</span>
                  </div>
                  <div className="font-mono text-[10.5px] space-y-1 text-slate-400 bg-slate-900 border border-slate-950 rounded p-4 h-56 overflow-y-auto [scrollbar-width:thin]">
                    {auditLogs.map((log, id) => (
                      <div key={id} className="text-slate-350">{log}</div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* CATEGORY: AI CO-PILOT COMMAND */}
          {activeCategory === "AI Co-Pilot" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
              
              {/* Left query side */}
              <div className="lg:col-span-8 rounded-xl border border-slate-800 bg-[#0d1430] p-6 flex flex-col justify-between min-h-[420px]">
                <div>
                  <h3 className="text-xs font-black text-white tracking-widest uppercase flex items-center gap-1.5 pb-2.5 border-b border-slate-800 mb-4">
                    <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" /> Sovereign Executive AI Assistant (GopherML v3)
                  </h3>

                  <div className="space-y-4 max-h-80 overflow-y-auto [scrollbar-width:thin] pr-2">
                    {aiHistory.map((item, idx) => (
                      <div key={idx} className="p-3 bg-[#0a0f24] rounded-lg border border-slate-800 space-y-1.5">
                        <span className="text-cyan-400 font-bold block">▶ OPERATOR_Q: "{item.query}"</span>
                        <p className="text-slate-300 border-l border-cyan-500 pl-3 leading-relaxed">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleCoPilotSubmit} className="pt-4 border-t border-slate-850 flex gap-2">
                  <div className="relative flex-1">
                    <Terminal className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                    <input
                      type="text"
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      placeholder="Instruct AI, e.g. Forecast next quarter revenue or Detect agents with suspicious transaction patterns"
                      className="w-full bg-slate-950 rounded-lg pl-9 pr-4 py-2 border border-slate-850 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isAiComputing}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold px-4 rounded text-xs"
                  >
                    {isAiComputing ? "COMPUTING..." : "EXECUTE"}
                  </button>
                </form>
              </div>

              {/* Right presets options & interactive network graph visualization */}
              <div className="lg:col-span-4 rounded-xl border border-slate-800 bg-slate-950 p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-black text-white tracking-widest uppercase pb-2 border-b border-slate-850 mb-3 block">
                    Recommended AI Query Templates
                  </h3>
                  <div className="space-y-2.5">
                    {PRESET_AI_ASSISTANCE.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setAiInput(item.text); }}
                        className="w-full p-2.5 bg-[#0a0f24] hover:bg-[#141b3a] rounded border border-slate-850 text-left text-[11px] text-slate-300 leading-normal"
                      >
                        {item.text}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated fraud network connected graph diagram representation */}
                <div className="bg-slate-900 border border-slate-850 rounded p-3 text-[10.5px] mt-4 space-y-1">
                  <span className="text-rose-400 font-bold uppercase block text-[9px] tracking-widest">Interactive Fraud Network Plot</span>
                  <div className="flex h-16 items-center justify-center border border-slate-850 border-dashed rounded relative">
                    <span className="absolute text-[8.5px] text-slate-500 font-bold uppercase">GopherML Graph Analysis Output</span>
                    <div className="h-2 w-2 rounded-full bg-rose-500 absolute left-8"></div>
                    <div className="h-0.5 w-12 bg-slate-850 absolute left-10"></div>
                    <div className="h-2 w-2 rounded-full bg-amber-400 absolute left-22"></div>
                    <div className="h-0.5 w-12 bg-slate-850 absolute left-24"></div>
                    <div className="h-2 w-2 rounded-full bg-cyan-400 absolute left-36"></div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* CATEGORY: ANALYTICS INTELLIGENCE */}
          {activeCategory === "Analytics Intelligence" && (
            <div className="space-y-6 font-mono text-xs">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Visual Capital Allocation Flows */}
                <div className="rounded-xl border border-slate-800 bg-[#0d1430] p-5 space-y-4">
                  <h3 className="text-xs font-bold text-slate-100 flex items-center gap-1.5 border-b border-slate-800 pb-2.5">
                    <TrendingUp className="h-4 w-4 text-emerald-400 animate-pulse" /> CONTINENTAL CAPITAL FLOWS SEGMENTATION
                  </h3>
                  <div className="space-y-3 pt-1.5">
                    {[
                      { l: "Retail Fractional Holders", p: 48, c: "bg-cyan-400" },
                      { l: "Sovereign REIT Funds Pool", p: 32, c: "bg-purple-500" },
                      { l: "Continental Escrow Buffers", p: 14, c: "bg-amber-400" },
                      { l: "Tax Reserve Outflow", p: 6, c: "bg-rose-500" }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1 text-[11px]">
                        <div className="flex justify-between text-slate-350">
                          <span>{item.l}</span>
                          <span className="font-bold">{item.p}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${item.c}`} style={{ width: `${item.p}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual business analytics stats */}
                <div className="rounded-xl border border-slate-800 bg-[#0d1430] p-5 space-y-4">
                  <h3 className="text-xs font-bold text-slate-100 flex items-center gap-1.5 border-b border-slate-800 pb-2.5">
                    <Activity className="h-4 w-4 text-cyan-400" /> SYSTEM TRANSACTION FLOW COEFFICIENTS
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-slate-950 border border-slate-850 p-3 rounded text-center">
                      <span className="text-slate-500 block">TOTAL TRANS OUTFLOW</span>
                      <strong className="text-emerald-400 block text-lg font-bold">R 1.84B</strong>
                      <span className="text-[9.5px] text-slate-500 mt-1 block font-sans">99% checked safe</span>
                    </div>
                    <div className="bg-slate-950 border border-slate-850 p-3 rounded text-center">
                      <span className="text-slate-500 block">TAX RESERVE LOCK</span>
                      <strong className="text-cyan-400 block text-lg font-bold">R 4.20M</strong>
                      <span className="text-[9.5px] text-slate-500 mt-1 block font-sans">Corporate SARS provisions</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* CATEGORY: SETTINGS & GOVERNANCE */}
          {activeCategory === "Settings & Governance" && (
            <div className="rounded-xl border border-slate-850 bg-[#0d1430] p-6 space-y-6 font-mono text-xs">
              <div className="pb-3 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-cyan-400 animate-pulse" /> Sovereign Platform Configuration & RBAC Variables
                </h3>
                <span className="text-[10px] text-slate-500">MUTATIONS REQUIRE PIN CLEARANCE</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* API keys setting */}
                <div className="bg-slate-950 border border-slate-850 rounded-xl p-4 space-y-4">
                  <span className="text-xs font-bold text-white block border-b border-slate-850 pb-1.5 uppercase">API KEY CREDENTIALS</span>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] text-slate-500 block mb-1">GopherML AI Engine Secret API Key</label>
                      <input type="password" value="****************************************" className="w-full bg-[#0c1224] border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white" disabled />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 block mb-1">SARS Tax Escrow Notary API Identifier</label>
                      <input type="text" defaultValue="sars_token_hash_49210e9" className="w-full bg-[#0c1224] border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500" />
                    </div>
                  </div>
                  <button onClick={() => onAction("adjust_pricing_config", {} as any)} className="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold px-4 py-2 rounded text-[10.5px] uppercase">Save API Config</button>
                </div>

                {/* Platform default variables configuring */}
                <div className="bg-slate-950 border border-slate-850 rounded-xl p-4 space-y-4">
                  <span className="text-xs font-bold text-white block border-b border-slate-850 pb-1.5 uppercase">ROUTER VARIABLES DEFAULT</span>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] text-slate-500 block mb-1">Max cross-border payout lock duration</label>
                      <input type="text" defaultValue="48h (Lock Required)" className="w-full bg-[#0c1224] border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500" />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 block mb-1">Sovereign override bypass passcode</label>
                      <input type="password" value="************" className="w-full bg-[#0c1224] border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white" disabled />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* CATEGORY: SUPPORT & INCIDENT RESPONSE */}
          {activeCategory === "Support & Incident Response" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
              
              {/* Tickets directory table */}
              <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center bg-slate-950 border border-slate-850 p-4 rounded-xl mb-4">
                    <span className="text-slate-400 font-bold uppercase">Customer Support SLA Incidents</span>
                    <span className="text-slate-500">2 OPEN COHORTS</span>
                  </div>

                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {tickets.map(t => (
                      <div key={t.id} className="bg-[#0c1224] border border-slate-850 rounded-xl p-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-cyan-400 font-bold">{t.id} • {t.assignedTeam}</span>
                          <span className={`px-1 rounded text-[9px] font-bold ${
                            t.priority === 'CRITICAL' ? "bg-rose-500 text-black animate-pulse" : "bg-amber-500 text-black"
                          }`}>{t.priority}</span>
                        </div>
                        <h4 className="font-bold text-slate-200 text-xs">{t.subject}</h4>
                        <p className="text-[11px] text-slate-400 leading-normal">{t.message}</p>
                        
                        <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-900 pt-2">
                          <span>User: {t.userEmail}</span>
                          <button onClick={() => toast("Incident assigned escalating.", "info")} className="text-cyan-400 font-bold hover:underline">ESCALATE SLA</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <span className="text-slate-600 font-[10px] select-none block">SLA Response Limit: <strong className="text-emerald-400">10 mins</strong></span>
              </div>

              {/* Dynamic live chat console with real estate actors */}
              <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-[#0d1430] p-5 flex flex-col justify-between min-h-[420px]">
                
                <div>
                  <h3 className="text-xs font-black text-white tracking-widest uppercase flex items-center gap-1.5 pb-2.5 border-b border-slate-800 mb-4">
                    <MessageSquare className="h-4 w-4 text-cyan-400" /> Sovereign Customer Live Chat Console
                  </h3>

                  <div className="space-y-3 max-h-60 overflow-y-auto [scrollbar-width:thin] pr-2">
                    {supportChat.map((chat, idx) => (
                      <div key={idx} className={`p-2.5 rounded-lg border max-w-[85%] ${
                        chat.sender.includes("Operator") 
                          ? "bg-cyan-950/10 border-cyan-800/40 text-cyan-300 ml-auto" 
                          : "bg-slate-950 border-slate-850 text-slate-350"
                      }`}>
                        <div className="flex justify-between text-[9.5px] font-bold mb-1 opacity-70">
                          <span>{chat.sender}</span>
                          <span>{chat.time}</span>
                        </div>
                        <p className="leading-relaxed text-[11px]">{chat.msg}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type response back to broker..."
                    className="w-full bg-slate-950 rounded-lg px-3 py-2 border border-slate-850 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                  <button 
                    onClick={handleSendSupportMessage}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold px-4 rounded text-xs uppercase"
                  >
                    Send
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* 3. CORE ADOPTION OVERRIDE ACTION MODE EXECUTOR (THE CONFIRMATORY MODAL) */}
      {activeModal && (
        <div className="fixed inset-0 z-[110000] flex items-center justify-center bg-black/85 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-[#0d142b] border border-cyan-500/30 rounded-2xl p-6 font-mono text-xs space-y-4 shadow-[0_0_30px_rgba(6,182,212,0.15)] animate-fadeIn">
            
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-xs font-black text-rose-500 tracking-widest uppercase flex items-center gap-1.5 animate-pulse">
                <AlertTriangle className="h-4 w-4" /> AUTHORIZATION SECURITY SIG_LOCK
              </span>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-slate-500 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-slate-300 leading-relaxed text-[11px] font-sans">
              "You are executing a server-level override that directly mutates live database buffers, blocks transaction releases, and alters verification indexes across Africa hubs. Verify clearances."
            </p>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 space-y-2 text-[10.5px]">
              <div>OVERRIDE TARGET ID: <strong className="text-white font-bold select-all">{activeModal.data?.id || "GENERIC_CONFIG"}</strong></div>
              <div>DESCRIPTION: <strong className="text-cyan-400 font-bold uppercase">{activeModal.type}</strong></div>
              {activeModal.data?.name && <div>AFFECTED USER: <strong className="text-slate-300 font-bold">{activeModal.data.name}</strong></div>}
              {activeModal.data?.amount && <div>VALUATION CAP: <strong className="text-amber-405 font-bold">R {activeModal.data.amount.toLocaleString()} ZAR</strong></div>}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-500 block mb-1 uppercase font-bold">Override Reason (Legal Log Auditing)</label>
                <input
                  type="text"
                  placeholder="Describe compliance clearance terms..."
                  className="w-full bg-[#0c1224] border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-1 uppercase font-bold">Secured Override PIN Clearance</label>
                <input
                  type="password"
                  placeholder="Enter pin (e.g., AES-3942-CPT)"
                  className="w-full bg-[#0c1224] border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 text-center font-bold tracking-widest"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                onClick={() => setActiveModal(null)}
                className="bg-slate-900 text-slate-400 font-bold py-2 rounded-lg border border-slate-800 hover:text-white text-[10.5px]"
              >
                Abort Override
              </button>
              <button 
                onClick={handleExecuteModalAction}
                className="bg-cyan-500 text-black font-extrabold py-2 rounded-lg hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] text-[10.5px] uppercase"
              >
                Confirm Sig Override
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
