'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Printer, Edit3, Eye, Plus, Trash2, FileText, Building2, User, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

const COLORS = {
  navy: "#1F3864",
  blue: "#2E75B6",
  lightBlue: "#D6E4F0",
  yellow: "#FFF2CC",
  gray: "#F2F2F2",
  green: "#E2EFDA",
  white: "#FFFFFF",
  border: "#CBD5E1",
  text: "#1E293B",
  muted: "#64748B",
  black: "#000000", // Pure black for asset list
};

const initialForm = {
  day: "",
  month: "",
  year: "2026",
  buyerName: "",
  buyerOrg: "",
  buyerAddress: "",
  buyerPhone: "",
  buyerEmail: "",
  totalPurchase: "",
  initialPayment: "",
  paymentDeadline: "",
  deliveryDate: "",
  products: [{ ref: "", brand: "", description: "", specs: "", colour: "", serial: "" }],
};

function num(v: string) {
  return parseFloat(v.replace(/,/g, "")) || 0;
}

function ksh(v: string | number) {
  const n = typeof v === 'string' ? parseFloat(v.replace(/,/g, "")) : v;
  if (!n && n !== 0) return "";
  return "KES " + n.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function BNPLPage() {
  const [tab, setTab] = useState<"form" | "preview">("form");
  const [form, setForm] = useState(initialForm);

  const outstanding = Math.max(0, num(form.totalPurchase) - num(form.initialPayment));

  const setField = (k: string, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
  };

  const setProduct = (i: number, k: string, v: string) => {
    setForm(f => {
      const p = [...f.products];
      p[i] = { ...p[i], [k]: v };
      return { ...f, products: p };
    });
  };

  const addProduct = () => {
    setForm(f => ({ 
      ...f, 
      products: [...f.products, { ref: "", brand: "", description: "", specs: "", colour: "", serial: "" }] 
    }));
  };

  const removeProduct = (i: number) => {
    setForm(f => ({ 
      ...f, 
      products: f.products.filter((_, idx) => idx !== i) 
    }));
  };

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const Preview = () => {
    const dateStr = form.day && form.month ? `${form.day} ${form.month} ${form.year}` : "___ day of ________ 2026";
    const deadlineStr = form.paymentDeadline || "__________";
    const deliveryStr = form.deliveryDate || "__________";

    const TH = ({ children, w }: { children: React.ReactNode, w: string }) => (
      <th style={{ background: COLORS.blue, color: "#fff", padding: "8px 10px", fontSize: "11px", fontWeight: 700, border: "1px solid #fff", width: w, textAlign: "left", WebkitPrintColorAdjust: "exact" }}>
        {children}
      </th>
    );
    
    // Updated TD for Asset List with Pure Black Text
    const TD = ({ children, shade }: { children: React.ReactNode, shade?: boolean }) => (
      <td style={{ 
        padding: "7px 10px", 
        fontSize: "11px", 
        border: `1px solid ${COLORS.border}`, 
        background: shade ? COLORS.gray : "#fff", 
        verticalAlign: "top",
        color: COLORS.black, // PURE BLACK for details
        WebkitPrintColorAdjust: "exact"
      }}>
        {children}
      </td>
    );

    const Row = ({ label, value, highlight }: { label: string, value: string, highlight?: boolean }) => (
      <tr>
        <td style={{ padding: "7px 12px", fontWeight: 700, fontSize: "11px", background: COLORS.lightBlue, border: `1px solid ${COLORS.border}`, width: "38%", color: COLORS.navy, WebkitPrintColorAdjust: "exact" }}>{label}</td>
        <td style={{ padding: "7px 12px", fontSize: "11px", background: highlight ? COLORS.yellow : "#fff", border: `1px solid ${COLORS.border}`, color: COLORS.black, WebkitPrintColorAdjust: "exact" }}>{value || <span style={{ color: "#aaa" }}>—</span>}</td>
      </tr>
    );

    return (
      <div id="print-area" className="bg-muted/30 p-4 md:p-12 transition-all">
        {/* PAGE 1 - AGREEMENT */}
        <div style={{
          background: "#fff", maxWidth: "800px", margin: "0 auto 40px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.1)", borderRadius: "4px",
          padding: "50px 60px", pageBreakAfter: "always",
          fontFamily: "'Playfair Display', serif"
        }}>
          <div style={{ background: COLORS.navy, borderRadius: "8px", padding: "20px", marginBottom: "6px", textAlign: "center", WebkitPrintColorAdjust: "exact" }}>
            <div style={{ color: "#fff", fontWeight: 900, fontSize: "24px", letterSpacing: "3px" }}>YEDNA LIMITED</div>
          </div>
          <div style={{ background: COLORS.blue, borderRadius: "4px", padding: "8px 15px", textAlign: "center", marginBottom: "24px", fontSize: "10px", color: "#fff", WebkitPrintColorAdjust: "exact" }}>
            Revlon Professional Plaza, Biashara Street | P.O Box 49939-00100, Nairobi | Tel: 0707 795 553 | yednalimited@gmail.com | www.yednalimited.com
          </div>
          <div style={{ background: COLORS.navy, borderRadius: "4px", padding: "12px", textAlign: "center", marginBottom: "24px", color: "#fff", fontWeight: 800, fontSize: "15px", letterSpacing: "2px", WebkitPrintColorAdjust: "exact" }}>
            BUY NOW, PAY LATER (BNPL) SALES AGREEMENT
          </div>

          <p style={{ fontSize: "12px", color: COLORS.black, marginBottom: "20px", lineHeight: "1.7" }}>
            This BNPL Sales Agreement is made and entered into on this <strong>{dateStr}</strong>, by and between <strong>Yedna Limited</strong>, a duly registered company under the laws of Kenya, with its principal office in Nairobi (hereinafter referred to as the <strong>"Seller"</strong>), AND the Buyer below (hereinafter referred to as the <strong>"Buyer"</strong>).
          </p>

          <div style={{ fontWeight: 700, fontSize: "12px", color: "#fff", background: COLORS.blue, padding: "7px 15px", borderRadius: "4px", marginBottom: "8px", WebkitPrintColorAdjust: "exact" }}>PARTIES</div>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
            <tbody>
              <Row label="Seller" value="Yedna Limited – Nairobi, Kenya" />
              <Row label="Buyer Name" value={form.buyerName} highlight />
              <Row label="Buyer Organization" value={form.buyerOrg} highlight />
              <Row label="Buyer Address" value={form.buyerAddress} highlight />
              <Row label="Buyer Phone" value={form.buyerPhone} highlight />
              <Row label="Buyer Email" value={form.buyerEmail} highlight />
            </tbody>
          </table>

          <div style={{ fontWeight: 700, fontSize: "12px", color: "#fff", background: COLORS.blue, padding: "7px 15px", borderRadius: "4px", marginBottom: "8px", WebkitPrintColorAdjust: "exact" }}>1. SALE OF GOODS &nbsp;<span style={{ fontWeight: 400, fontSize: "10px" }}>(see Asset List on Page 2)</span></div>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
            <tbody>
              <Row label="Total Purchase Value" value={ksh(form.totalPurchase)} />
              <Row label="Initial Payment (Due on Delivery)" value={ksh(form.initialPayment)} />
              <Row label="Outstanding Balance" value={outstanding ? ksh(outstanding) : ""} />
              <Row label="Interest Rate" value="12.5% per month on reducing balance" />
              <Row label="Payment Period" value="30 calendar days from date of delivery" />
              <Row label="Payment Deadline" value={deadlineStr} highlight />
              <Row label="Delivery Date" value={deliveryStr} highlight />
              <Row label="Penalty on Overdue" value="15% compounded monthly on outstanding amount" />
            </tbody>
          </table>

          {[
            ["2. PAYMENT TERMS", `The Buyer agrees to pay the outstanding balance of ${ksh(outstanding) || "KES ________"} within THIRTY (30) calendar days from the date of delivery (ending ${deadlineStr}). This amount includes 12.5% interest charges monthly on a reducing balance. Failure to pay within this period will attract a PENALTY charge of 15% on the overdue amount, compounded monthly, until fully settled.`],
            ["3. RETENTION OF OWNERSHIP", "Ownership of the equipment shall remain with the Seller until full payment of the total purchase price, including any accrued interest, has been made. The Seller reserves the right to reclaim the goods in the event of payment default."],
            ["4. DELIVERY", `The equipment shall be delivered to the Buyer upon receipt of the initial deposit${deliveryStr !== "__________" ? " on " + deliveryStr : ""}. Risk of loss or damage shall pass to the Buyer upon delivery.`],
            ["5. GOVERNING LAW & DISPUTE RESOLUTION", "This Agreement shall be governed by and construed in accordance with the laws of the Republic of Kenya. Any disputes arising under or in connection with this Agreement shall be resolved amicably through mutual negotiation, failing which the dispute shall be referred to arbitration in accordance with the Arbitration Act of Kenya."],
          ].map(([title, text]) => (
            <div key={title} style={{ marginBottom: "15px" }}>
              <div style={{ fontWeight: 700, fontSize: "12px", color: "#fff", background: COLORS.blue, padding: "6px 15px", borderRadius: "4px", marginBottom: "6px", WebkitPrintColorAdjust: "exact" }}>{title}</div>
              <p style={{ fontSize: "11px", color: COLORS.black, margin: 0, padding: "10px 15px", background: COLORS.gray, borderRadius: "4px", lineHeight: "1.7", WebkitPrintColorAdjust: "exact" }}>{text}</p>
            </div>
          ))}

          <div style={{ fontWeight: 700, fontSize: "12px", color: "#fff", background: COLORS.navy, padding: "7px 15px", borderRadius: "4px", margin: "20px 0 10px", WebkitPrintColorAdjust: "exact" }}>6. SIGNATURES</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {[
              { title: "Signed for YEDNA LIMITED", name: "Henry Adeeya", pos: "Director", phone: "0707 795 553" },
              { title: `Signed for ${form.buyerOrg || "BUYER"}`, name: form.buyerName, pos: "", phone: form.buyerPhone },
            ].map((s, i) => (
              <div key={i} style={{ border: `1.5px solid ${COLORS.border}`, borderRadius: "8px", padding: "15px", background: COLORS.gray, WebkitPrintColorAdjust: "exact" }}>
                <div style={{ fontWeight: 700, fontSize: "11px", color: COLORS.navy, marginBottom: "8px" }}>{s.title}</div>
                {[["Name", s.name], ["Position", s.pos || "____________________"], ["Phone", s.phone]].map(([l, v]) => (
                  <div key={l} style={{ display: "flex", gap: "8px", marginBottom: "6px", fontSize: "10px" }}>
                    <span style={{ fontWeight: 700, minWidth: "70px", color: COLORS.muted }}>{l}:</span>
                    <span style={{ color: v ? COLORS.black : "#aaa" }}>{v || "____________________"}</span>
                  </div>
                ))}
                <div style={{ fontSize: "10px", marginTop: "12px" }}>
                  <span style={{ fontWeight: 700, color: COLORS.muted }}>Signature: </span>
                  <span style={{ display: "inline-block", width: "140px", borderBottom: `1.5px solid ${COLORS.black}`, marginLeft: "5px" }} />
                </div>
                <div style={{ fontSize: "10px", marginTop: "10px" }}>
                  <span style={{ fontWeight: 700, color: COLORS.muted }}>Date: </span>
                  <span style={{ display: "inline-block", width: "120px", borderBottom: `1.5px solid ${COLORS.black}`, marginLeft: "5px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PAGE 2 - ASSET LIST */}
        <div style={{
          background: "#fff", maxWidth: "800px", margin: "0 auto",
          boxShadow: "0 4px 24px rgba(0,0,0,0.1)", borderRadius: "4px",
          padding: "50px 60px",
          fontFamily: "'Playfair Display', serif"
        }}>
          <div style={{ background: COLORS.navy, borderRadius: "8px", padding: "20px", marginBottom: "6px", textAlign: "center", WebkitPrintColorAdjust: "exact" }}>
            <div style={{ color: "#fff", fontWeight: 900, fontSize: "24px", letterSpacing: "3px" }}>YEDNA LIMITED</div>
          </div>
          <div style={{ background: COLORS.blue, borderRadius: "4px", padding: "8px 15px", textAlign: "center", marginBottom: "20px", fontSize: "10px", color: "#fff", WebkitPrintColorAdjust: "exact" }}>
            Revlon Professional Plaza, Biashara Street | P.O Box 49939-00100, Nairobi | Tel: 0707 795 553 | yednalimited@gmail.com
          </div>

          <div style={{ fontWeight: 800, fontSize: "16px", color: COLORS.navy, textAlign: "center", marginBottom: "8px" }}>ASSET ORDER LIST</div>
          <div style={{ fontSize: "11px", color: COLORS.muted, textAlign: "center", marginBottom: "20px" }}>
            Buyer: <strong style={{color: COLORS.black}}>{form.buyerName || "____________________"}</strong> &nbsp;|&nbsp; Organization: <strong style={{color: COLORS.black}}>{form.buyerOrg || "____________________"}</strong> &nbsp;|&nbsp; Agreement Date: <strong style={{color: COLORS.black}}>{dateStr}</strong>
          </div>

          {/* ASSET TABLE - Using Standard Table for Word compatibility */}
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px" }}>
            <thead>
              <tr>
                <TH w="6%">#Ref</TH>
                <TH w="16%">Brand Name</TH>
                <TH w="28%">Description</TH>
                <TH w="24%">Specifications</TH>
                <TH w="12%">Colour</TH>
                <TH w="14%">Serial No.</TH>
              </tr>
            </thead>
            <tbody>
              {form.products.map((p, i) => (
                <tr key={i}>
                  <TD shade={i % 2 === 0}>{p.ref || i + 1}</TD>
                  <TD shade={i % 2 === 0}>{p.brand}</TD>
                  <TD shade={i % 2 === 0}>{p.description}</TD>
                  <TD shade={i % 2 === 0}>{p.specs}</TD>
                  <TD shade={i % 2 === 0}>{p.colour}</TD>
                  <TD shade={i % 2 === 0}>{p.serial}</TD>
                </tr>
              ))}
              {/* Fill remaining space to keep layout consistent */}
              {Array.from({ length: Math.max(0, 15 - form.products.length) }).map((_, i) => (
                <tr key={"empty" + i}>
                  {[0,1,2,3,4,5].map(c => <TD key={c} shade={(form.products.length + i) % 2 === 0}>&nbsp;</TD>)}
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px", marginTop: "30px" }}>
            {[
              ["Total Purchase Value", ksh(form.totalPurchase)],
              ["Initial Payment", ksh(form.initialPayment)],
              ["Outstanding Balance", ksh(outstanding)],
            ].map(([l, v]) => (
              <div key={l} style={{ border: `2px solid ${COLORS.border}`, borderRadius: "8px", padding: "15px", background: COLORS.lightBlue, textAlign: "center", WebkitPrintColorAdjust: "exact" }}>
                <div style={{ fontSize: "10px", color: COLORS.muted, fontWeight: 700, textTransform: "uppercase", marginBottom: "6px" }}>{l}</div>
                <div style={{ fontSize: "16px", fontWeight: 800, color: COLORS.navy }}>{v || "—"}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "30px", padding: "12px 15px", background: COLORS.gray, borderRadius: "8px", fontSize: "10px", color: COLORS.muted, textAlign: "center", WebkitPrintColorAdjust: "exact" }}>
            This Asset List forms an integral part of the BNPL Sales Agreement dated <strong>{dateStr}</strong>. &nbsp;|&nbsp; www.yednalimited.com
          </div>
        </div>
        
        <style jsx global>{`
          @media print {
            nav, footer, .no-print {
              display: none !important;
            }
            body {
              background: white !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            #print-area {
              background: white !important;
              padding: 0 !important;
              width: 100% !important;
            }
            #print-area > div {
              box-shadow: none !important;
              margin: 0 auto !important;
              border: none !important;
              width: 100% !important;
              max-width: none !important;
              padding: 1cm !important;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        `}</style>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-20 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 no-print">
          <div className="space-y-4">
            <span className="text-primary text-[0.7rem] tracking-[0.25em] uppercase font-medium block">Yedna Fintech Tools</span>
            <h1 className="font-headline text-4xl md:text-6xl font-black text-foreground">
              BNPL <span className="italic text-primary">Generator</span>
            </h1>
          </div>
          
          <div className="flex bg-card p-1 border border-primary/10 rounded-none shadow-xl">
            <button 
              onClick={() => setTab("form")}
              className={cn(
                "px-8 py-3 text-[0.7rem] uppercase tracking-widest font-bold transition-all flex items-center gap-2",
                tab === "form" ? "bg-primary text-background" : "text-foreground/40 hover:text-primary"
              )}
            >
              <Edit3 size={16} /> Fill Form
            </button>
            <button 
              onClick={() => setTab("preview")}
              className={cn(
                "px-8 py-3 text-[0.7rem] uppercase tracking-widest font-bold transition-all flex items-center gap-2",
                tab === "preview" ? "bg-primary text-background" : "text-foreground/40 hover:text-primary"
              )}
            >
              <Eye size={16} /> Document Preview
            </button>
          </div>
        </div>

        {tab === "form" ? (
          <div className="max-w-4xl mx-auto px-6 md:px-20 space-y-8 no-print animate-in fade-in duration-500">
            {/* Agreement Date Section */}
            <Card className="rounded-none border-primary/10 bg-card shadow-2xl">
              <CardContent className="p-8 space-y-8">
                <div className="flex items-center gap-3 border-b border-primary/10 pb-4">
                  <FileText className="text-primary" size={20} />
                  <h3 className="font-headline text-xl">Agreement Date</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Day</Label>
                    <Input placeholder="e.g. 18" value={form.day} onChange={e => setField("day", e.target.value)} className="rounded-none border-primary/5 h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Month</Label>
                    <select 
                      value={form.month} 
                      onChange={e => setField("month", e.target.value)} 
                      className="w-full bg-background border border-primary/5 px-3 h-12 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="">Select month</option>
                      {months.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Year</Label>
                    <Input placeholder="2026" value={form.year} onChange={e => setField("year", e.target.value)} className="rounded-none border-primary/5 h-12" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Buyer Details Section */}
            <Card className="rounded-none border-primary/10 bg-card shadow-2xl">
              <CardContent className="p-8 space-y-8">
                <div className="flex items-center gap-3 border-b border-primary/10 pb-4">
                  <User className="text-primary" size={20} />
                  <h3 className="font-headline text-xl">Buyer Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Buyer Name</Label>
                    <Input placeholder="Full name" value={form.buyerName} onChange={e => setField("buyerName", e.target.value)} className="rounded-none border-primary/5 h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Organization</Label>
                    <Input placeholder="Company name" value={form.buyerOrg} onChange={e => setField("buyerOrg", e.target.value)} className="rounded-none border-primary/5 h-12" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Address</Label>
                    <Input placeholder="Physical address" value={form.buyerAddress} onChange={e => setField("buyerAddress", e.target.value)} className="rounded-none border-primary/5 h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Phone</Label>
                    <Input placeholder="e.g. 0712 345 678" value={form.buyerPhone} onChange={e => setField("buyerPhone", e.target.value)} className="rounded-none border-primary/5 h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Email</Label>
                    <Input placeholder="email@example.com" value={form.buyerEmail} onChange={e => setField("buyerEmail", e.target.value)} className="rounded-none border-primary/5 h-12" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Section */}
            <Card className="rounded-none border-primary/10 bg-card shadow-2xl">
              <CardContent className="p-8 space-y-8">
                <div className="flex items-center gap-3 border-b border-primary/10 pb-4">
                  <Wallet className="text-primary" size={20} />
                  <h3 className="font-headline text-xl">Price & Payment Terms</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Total Purchase Value (KES)</Label>
                    <Input placeholder="e.g. 150000" value={form.totalPurchase} onChange={e => setField("totalPurchase", e.target.value)} className="rounded-none border-primary/5 h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Initial Payment (KES)</Label>
                    <Input placeholder="e.g. 50000" value={form.initialPayment} onChange={e => setField("initialPayment", e.target.value)} className="rounded-none border-primary/5 h-12" />
                  </div>
                  <div className="md:col-span-2 p-6 bg-primary/5 border border-primary/10">
                    <p className="text-xs uppercase tracking-widest text-primary font-bold mb-1">Outstanding Balance</p>
                    <p className="font-headline text-2xl">{outstanding ? ksh(outstanding) : "—"}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Payment Deadline</Label>
                    <Input placeholder="e.g. 18 July 2026" value={form.paymentDeadline} onChange={e => setField("paymentDeadline", e.target.value)} className="rounded-none border-primary/5 h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Delivery Date</Label>
                    <Input placeholder="e.g. 18 June 2026" value={form.deliveryDate} onChange={e => setField("deliveryDate", e.target.value)} className="rounded-none border-primary/5 h-12" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product List Section */}
            <Card className="rounded-none border-primary/10 bg-card shadow-2xl">
              <CardContent className="p-8 space-y-8">
                <div className="flex items-center justify-between border-b border-primary/10 pb-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="text-primary" size={20} />
                    <h3 className="font-headline text-xl">Asset Order List</h3>
                  </div>
                  <Button onClick={addProduct} variant="outline" className="rounded-none border-primary text-primary text-[0.6rem] uppercase tracking-widest font-bold">
                    <Plus className="mr-2" size={14} /> Add Item
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {form.products.map((p, i) => (
                    <div key={i} className="p-6 border border-primary/5 bg-background relative animate-in slide-in-from-left duration-300">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-[0.6rem] uppercase tracking-widest text-primary/40 font-bold">Item #{i + 1}</span>
                        {form.products.length > 1 && (
                          <button onClick={() => removeProduct(i)} className="text-destructive/50 hover:text-destructive transition-colors">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          ["ref", "#Ref", "e.g. 001"],
                          ["brand", "Brand", "HP"],
                          ["description", "Description", "Laptop"],
                          ["specs", "Specs", "Core i7"],
                          ["colour", "Colour", "Black"],
                          ["serial", "Serial No.", "SN1234"],
                        ].map(([k, l, ph]) => (
                          <div key={k} className="space-y-1">
                            <Label className="text-[0.5rem] uppercase tracking-widest text-foreground/40 font-bold">{l}</Label>
                            <Input 
                              value={(p as any)[k]} 
                              onChange={e => setProduct(i, k, e.target.value)} 
                              placeholder={ph}
                              className="rounded-none border-primary/5 h-10 text-xs" 
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center pt-8">
              <Button 
                onClick={() => setTab("preview")}
                className="rounded-none h-16 px-16 bg-primary text-background font-black text-xs uppercase tracking-[0.3em] hover:bg-primary/90 transition-all hover:-translate-y-1 shadow-2xl"
              >
                Finalize Documents <FileText className="ml-3" size={18} />
              </Button>
            </div>
          </div>
        ) : (
          <div className="animate-in zoom-in-95 duration-500">
            <div className="max-w-7xl mx-auto px-6 md:px-20 mb-12 flex justify-center gap-4 no-print">
              <Button onClick={() => setTab("form")} variant="outline" className="rounded-none border-primary text-primary uppercase tracking-widest font-bold h-12">
                <Edit3 className="mr-2" size={16} /> Edit Details
              </Button>
              <Button onClick={() => window.print()} className="rounded-none bg-primary text-background uppercase tracking-widest font-bold h-12 px-8 shadow-xl">
                <Printer className="mr-2" size={16} /> Print / Save as PDF
              </Button>
            </div>
            <Preview />
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
