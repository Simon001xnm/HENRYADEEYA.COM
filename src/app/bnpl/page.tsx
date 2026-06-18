'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Printer, Edit3, Eye, Plus, Trash2, FileText, Building2, User, Wallet, Calendar as CalendarIcon, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, parse, differenceInDays } from 'date-fns';

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
  black: "#000000", 
};

const INTEREST_RATE_MONTHLY = 0.125; // 12.5%

const initialForm = {
  day: format(new Date(), 'dd'),
  month: format(new Date(), 'MMMM'),
  year: format(new Date(), 'yyyy'),
  buyerName: "",
  buyerOrg: "",
  buyerAddress: "",
  buyerPhone: "",
  buyerEmail: "",
  totalPurchase: "",
  initialPayment: "",
  paymentDeadline: "", // This will be the selected end date
  deliveryDate: format(new Date(), 'dd MMMM yyyy'),
  products: [{ ref: "001", brand: "", description: "", specs: "", colour: "", serial: "" }],
};

function num(v: string) {
  if (!v) return 0;
  return parseFloat(v.replace(/,/g, "")) || 0;
}

function ksh(v: string | number) {
  const n = typeof v === 'string' ? num(v) : v;
  if (!n && n !== 0) return "";
  return "KES " + n.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function BNPLPage() {
  const [tab, setTab] = useState<"form" | "preview">("form");
  const [form, setForm] = useState(initialForm);

  // Financial Calculations
  const finance = useMemo(() => {
    const principal = Math.max(0, num(form.totalPurchase) - num(form.initialPayment));
    
    let interestAmount = 0;
    let daysDiff = 0;
    let months = 0;

    try {
      const startDateStr = `${form.day} ${form.month} ${form.year}`;
      const startDate = parse(startDateStr, 'dd MMMM yyyy', new Date());
      const endDate = parse(form.paymentDeadline, 'dd MMMM yyyy', new Date());

      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        daysDiff = differenceInDays(endDate, startDate);
        if (daysDiff > 0) {
          months = daysDiff / 30; // 30 days as a standard month
          interestAmount = principal * INTEREST_RATE_MONTHLY * months;
        }
      }
    } catch (e) {
      // Dates not yet valid
    }

    const totalDue = principal + interestAmount;

    return {
      principal,
      interestAmount,
      totalDue,
      months: months.toFixed(2),
      days: daysDiff
    };
  }, [form.totalPurchase, form.initialPayment, form.day, form.month, form.year, form.paymentDeadline]);

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
      products: [...f.products, { ref: String(f.products.length + 1).padStart(3, '0'), brand: "", description: "", specs: "", colour: "", serial: "" }] 
    }));
  };

  const removeProduct = (i: number) => {
    setForm(f => ({ 
      ...f, 
      products: f.products.filter((_, idx) => idx !== i) 
    }));
  };

  const monthsList = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const Preview = () => {
    const dateStr = form.day && form.month ? `${form.day} ${form.month} ${form.year}` : "___ day of ________ 2026";
    const deadlineStr = form.paymentDeadline || "__________";
    const deliveryStr = form.deliveryDate || "__________";

    const TH = ({ children, w }: { children: React.ReactNode, w: string }) => (
      <th style={{ 
        background: COLORS.blue, 
        color: "#ffffff", 
        padding: "10px", 
        fontSize: "11px", 
        fontWeight: "bold", 
        border: "1px solid #ffffff", 
        width: w, 
        textAlign: "left", 
        WebkitPrintColorAdjust: "exact" 
      }}>
        {children}
      </th>
    );
    
    const TD = ({ children, shade, isBlack }: { children: React.ReactNode, shade?: boolean, isBlack?: boolean }) => (
      <td style={{ 
        padding: "8px 10px", 
        fontSize: "11px", 
        border: `1px solid ${COLORS.border}`, 
        background: shade ? COLORS.gray : "#ffffff", 
        verticalAlign: "top",
        color: isBlack ? COLORS.black : COLORS.text,
        fontWeight: isBlack ? "bold" : "normal",
        WebkitPrintColorAdjust: "exact"
      }}>
        {children}
      </td>
    );

    const Row = ({ label, value, highlight }: { label: string, value: string, highlight?: boolean }) => (
      <tr>
        <td style={{ 
          padding: "8px 12px", 
          fontWeight: "bold", 
          fontSize: "11px", 
          background: COLORS.lightBlue, 
          border: `1px solid ${COLORS.border}`, 
          width: "40%", 
          color: COLORS.navy, 
          WebkitPrintColorAdjust: "exact" 
        }}>
          {label}
        </td>
        <td style={{ 
          padding: "8px 12px", 
          fontSize: "11px", 
          background: highlight ? COLORS.yellow : "#ffffff", 
          border: `1px solid ${COLORS.border}`, 
          color: COLORS.black, 
          WebkitPrintColorAdjust: "exact" 
        }}>
          {value || <span style={{ color: "#aaaaaa" }}>—</span>}
        </td>
      </tr>
    );

    return (
      <div id="print-area" className="bg-muted/30 p-4 md:p-12 transition-all print:p-0">
        {/* PAGE 1 - AGREEMENT */}
        <div className="document-page" style={{
          background: "#ffffff", maxWidth: "800px", margin: "0 auto 40px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.1)", borderRadius: "4px",
          padding: "60px 80px", pageBreakAfter: "always",
          fontFamily: "'Times New Roman', Times, serif",
          color: COLORS.black
        }}>
          <div style={{ background: COLORS.navy, borderRadius: "8px", padding: "24px", marginBottom: "8px", textAlign: "center", WebkitPrintColorAdjust: "exact" }}>
            <div style={{ color: "#ffffff", fontWeight: "900", fontSize: "28px", letterSpacing: "4px" }}>YEDNA LIMITED</div>
          </div>
          <div style={{ background: COLORS.blue, borderRadius: "4px", padding: "10px 15px", textAlign: "center", marginBottom: "30px", fontSize: "11px", color: "#ffffff", WebkitPrintColorAdjust: "exact" }}>
            Revlon Professional Plaza, Biashara Street | P.O Box 49939-00100, Nairobi | Tel: 0707 795 553 | yednalimited@gmail.com | www.yednalimited.com
          </div>
          <div style={{ background: COLORS.navy, borderRadius: "4px", padding: "14px", textAlign: "center", marginBottom: "30px", color: "#ffffff", fontWeight: "bold", fontSize: "16px", letterSpacing: "2px", WebkitPrintColorAdjust: "exact" }}>
            BUY NOW, PAY LATER (BNPL) SALES AGREEMENT
          </div>

          <p style={{ fontSize: "13px", marginBottom: "24px", lineHeight: "1.8", textAlign: "justify" }}>
            This BNPL Sales Agreement is made and entered into on this <strong>{dateStr}</strong>, by and between <strong>Yedna Limited</strong>, a duly registered company under the laws of Kenya, with its principal office in Nairobi (hereinafter referred to as the <strong>"Seller"</strong>), AND the Buyer below (hereinafter referred to as the <strong>"Buyer"</strong>).
          </p>

          <div style={{ fontWeight: "bold", fontSize: "13px", color: "#ffffff", background: COLORS.blue, padding: "8px 15px", borderRadius: "4px", marginBottom: "10px", WebkitPrintColorAdjust: "exact" }}>PARTIES</div>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "30px" }}>
            <tbody>
              <Row label="Seller" value="Yedna Limited – Nairobi, Kenya" />
              <Row label="Buyer Name" value={form.buyerName} highlight />
              <Row label="Buyer Organization" value={form.buyerOrg} highlight />
              <Row label="Buyer Address" value={form.buyerAddress} highlight />
              <Row label="Buyer Phone" value={form.buyerPhone} highlight />
              <Row label="Buyer Email" value={form.buyerEmail} highlight />
            </tbody>
          </table>

          <div style={{ fontWeight: "bold", fontSize: "13px", color: "#ffffff", background: COLORS.blue, padding: "8px 15px", borderRadius: "4px", marginBottom: "10px", WebkitPrintColorAdjust: "exact" }}>1. SALE OF GOODS &nbsp;<span style={{ fontWeight: "normal", fontSize: "11px" }}>(see Asset List on Page 2)</span></div>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "30px" }}>
            <tbody>
              <Row label="Total Purchase Value" value={ksh(form.totalPurchase)} />
              <Row label="Initial Payment (Due on Delivery)" value={ksh(form.initialPayment)} />
              <Row label="Principal Balance" value={ksh(finance.principal)} />
              <Row label="Accrued Interest (12.5%/mo)" value={ksh(finance.interestAmount)} />
              <Row label="Total Outstanding Due" value={ksh(finance.totalDue)} highlight />
              <Row label="Interest Calculation Period" value={`${finance.months} months (${finance.days} days)`} />
              <Row label="Payment Deadline" value={deadlineStr} highlight />
              <Row label="Delivery Date" value={deliveryStr} />
            </tbody>
          </table>

          {[
            ["2. PAYMENT TERMS", `The Buyer agrees to pay the total outstanding balance of ${ksh(finance.totalDue) || "KES ________"} by the deadline of ${deadlineStr}. This balance includes a monthly interest charge of 12.5% calculated on the reducing balance over a period of ${finance.months} months. Failure to pay within this period will attract a PENALTY charge of 15% on the overdue amount, compounded monthly, until fully settled.`],
            ["3. RETENTION OF OWNERSHIP", "Ownership of the equipment shall remain with the Seller until full payment of the total purchase price, including any accrued interest, has been made. The Seller reserves the right to reclaim the goods in the event of payment default."],
            ["4. DELIVERY", `The equipment shall be delivered to the Buyer upon receipt of the initial deposit${deliveryStr !== "__________" ? " on " + deliveryStr : ""}. Risk of loss or damage shall pass to the Buyer upon delivery.`],
            ["5. GOVERNING LAW", "This Agreement shall be governed by and construed in accordance with the laws of the Republic of Kenya. Any disputes shall be referred to arbitration in accordance with the Arbitration Act of Kenya."],
          ].map(([title, text]) => (
            <div key={title} style={{ marginBottom: "20px" }}>
              <div style={{ fontWeight: "bold", fontSize: "12px", color: "#ffffff", background: COLORS.blue, padding: "8px 15px", borderRadius: "4px", marginBottom: "8px", WebkitPrintColorAdjust: "exact" }}>{title}</div>
              <p style={{ fontSize: "12px", margin: 0, padding: "12px 15px", background: COLORS.gray, borderRadius: "4px", lineHeight: "1.7", textAlign: "justify", WebkitPrintColorAdjust: "exact" }}>{text}</p>
            </div>
          ))}

          <div style={{ fontWeight: "bold", fontSize: "13px", color: "#ffffff", background: COLORS.navy, padding: "8px 15px", borderRadius: "4px", margin: "30px 0 15px", WebkitPrintColorAdjust: "exact" }}>6. SIGNATURES</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
            {[
              { title: "Signed for YEDNA LIMITED", name: "Henry Adeeya", pos: "Director", phone: "0707 795 553" },
              { title: `Signed for ${form.buyerOrg || "BUYER"}`, name: form.buyerName, pos: "", phone: form.buyerPhone },
            ].map((s, i) => (
              <div key={i} style={{ border: `1.5px solid ${COLORS.border}`, borderRadius: "8px", padding: "18px", background: COLORS.gray, WebkitPrintColorAdjust: "exact" }}>
                <div style={{ fontWeight: "bold", fontSize: "12px", color: COLORS.navy, marginBottom: "12px" }}>{s.title}</div>
                {[["Name", s.name], ["Position", s.pos || "____________________"], ["Phone", s.phone]].map(([l, v]) => (
                  <div key={l} style={{ display: "flex", gap: "10px", marginBottom: "8px", fontSize: "11px" }}>
                    <span style={{ fontWeight: "bold", minWidth: "80px", color: COLORS.muted }}>{l}:</span>
                    <span style={{ color: v ? COLORS.black : "#aaaaaa" }}>{v || "____________________"}</span>
                  </div>
                ))}
                <div style={{ fontSize: "11px", marginTop: "18px" }}>
                  <span style={{ fontWeight: "bold", color: COLORS.muted }}>Signature: </span>
                  <span style={{ display: "inline-block", width: "120px", borderBottom: `1.5px solid ${COLORS.black}`, marginLeft: "5px" }} />
                </div>
                <div style={{ fontSize: "11px", marginTop: "12px" }}>
                  <span style={{ fontWeight: "bold", color: COLORS.muted }}>Date: </span>
                  <span style={{ display: "inline-block", width: "120px", borderBottom: `1.5px solid ${COLORS.black}`, marginLeft: "5px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PAGE 2 - ASSET LIST */}
        <div className="document-page" style={{
          background: "#ffffff", maxWidth: "800px", margin: "0 auto",
          boxShadow: "0 4px 24px rgba(0,0,0,0.1)", borderRadius: "4px",
          padding: "60px 80px",
          fontFamily: "'Times New Roman', Times, serif",
          color: COLORS.black
        }}>
          <div style={{ background: COLORS.navy, borderRadius: "8px", padding: "24px", marginBottom: "8px", textAlign: "center", WebkitPrintColorAdjust: "exact" }}>
            <div style={{ color: "#ffffff", fontWeight: "900", fontSize: "28px", letterSpacing: "4px" }}>YEDNA LIMITED</div>
          </div>
          <div style={{ background: COLORS.blue, borderRadius: "4px", padding: "10px 15px", textAlign: "center", marginBottom: "25px", fontSize: "11px", color: "#ffffff", WebkitPrintColorAdjust: "exact" }}>
            Revlon Professional Plaza, Biashara Street | P.O Box 49939-00100, Nairobi | Tel: 0707 795 553 | yednalimited@gmail.com
          </div>

          <div style={{ fontWeight: "bold", fontSize: "18px", color: COLORS.navy, textAlign: "center", marginBottom: "10px" }}>ASSET ORDER LIST</div>
          <div style={{ fontSize: "12px", color: COLORS.muted, textAlign: "center", marginBottom: "25px" }}>
            Buyer: <strong style={{color: COLORS.black}}>{form.buyerName || "____________________"}</strong> &nbsp;|&nbsp; Organization: <strong style={{color: COLORS.black}}>{form.buyerOrg || "____________________"}</strong> &nbsp;|&nbsp; Agreement Date: <strong style={{color: COLORS.black}}>{dateStr}</strong>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px" }}>
            <thead>
              <tr>
                <TH w="8%">#Ref</TH>
                <TH w="16%">Brand</TH>
                <TH w="26%">Description</TH>
                <TH w="26%">Specifications</TH>
                <TH w="10%">Colour</TH>
                <TH w="14%">Serial No.</TH>
              </tr>
            </thead>
            <tbody>
              {form.products.map((p, i) => (
                <tr key={i}>
                  <TD shade={i % 2 === 0} isBlack>{p.ref}</TD>
                  <TD shade={i % 2 === 0} isBlack>{p.brand}</TD>
                  <TD shade={i % 2 === 0} isBlack>{p.description}</TD>
                  <TD shade={i % 2 === 0} isBlack>{p.specs}</TD>
                  <TD shade={i % 2 === 0} isBlack>{p.colour}</TD>
                  <TD shade={i % 2 === 0} isBlack>{p.serial}</TD>
                </tr>
              ))}
              {Array.from({ length: Math.max(0, 18 - form.products.length) }).map((_, i) => (
                <tr key={"empty" + i}>
                  {[0,1,2,3,4,5].map(c => <TD key={c} shade={(form.products.length + i) % 2 === 0}>&nbsp;</TD>)}
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "40px" }}>
             <div style={{ border: `2px solid ${COLORS.border}`, borderRadius: "8px", padding: "15px", background: COLORS.lightBlue, textAlign: "center", WebkitPrintColorAdjust: "exact" }}>
                <div style={{ fontSize: "10px", color: COLORS.muted, fontWeight: "bold", textTransform: "uppercase", marginBottom: "8px" }}>Principal Balance</div>
                <div style={{ fontSize: "16px", fontWeight: "900", color: COLORS.navy }}>{ksh(finance.principal)}</div>
              </div>
              <div style={{ border: `2px solid ${COLORS.border}`, borderRadius: "8px", padding: "15px", background: COLORS.yellow, textAlign: "center", WebkitPrintColorAdjust: "exact" }}>
                <div style={{ fontSize: "10px", color: COLORS.muted, fontWeight: "bold", textTransform: "uppercase", marginBottom: "8px" }}>Total Outstanding Due</div>
                <div style={{ fontSize: "16px", fontWeight: "900", color: COLORS.navy }}>{ksh(finance.totalDue)}</div>
              </div>
          </div>

          <div style={{ marginTop: "40px", padding: "15px", background: COLORS.gray, borderRadius: "8px", fontSize: "11px", color: COLORS.muted, textAlign: "center", WebkitPrintColorAdjust: "exact" }}>
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
            .document-page {
              box-shadow: none !important;
              margin: 0 auto !important;
              border: none !important;
              width: 100% !important;
              max-width: none !important;
              padding: 1.5cm 2cm !important;
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
              <Edit3 size={16} /> Edit Data
            </button>
            <button 
              onClick={() => setTab("preview")}
              className={cn(
                "px-8 py-3 text-[0.7rem] uppercase tracking-widest font-bold transition-all flex items-center gap-2",
                tab === "preview" ? "bg-primary text-background" : "text-foreground/40 hover:text-primary"
              )}
            >
              <Eye size={16} /> Agreement Preview
            </button>
          </div>
        </div>

        {tab === "form" ? (
          <div className="max-w-4xl mx-auto px-6 md:px-20 space-y-8 no-print animate-in fade-in duration-500">
            {/* Agreement Date Section */}
            <Card className="rounded-none border-primary/10 bg-card shadow-2xl">
              <CardContent className="p-8 space-y-8">
                <div className="flex items-center gap-3 border-b border-primary/10 pb-4">
                  <CalendarIcon className="text-primary" size={20} />
                  <h3 className="font-headline text-xl">Agreement Date (Start)</h3>
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
                      {monthsList.map(m => <option key={m} value={m}>{m}</option>)}
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

            {/* Finance Breakdown Section */}
            <Card className="rounded-none border-primary/10 bg-card shadow-2xl">
              <CardContent className="p-8 space-y-8">
                <div className="flex items-center gap-3 border-b border-primary/10 pb-4">
                  <Calculator className="text-primary" size={20} />
                  <h3 className="font-headline text-xl">Interest & Balance Calculation</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Total Purchase Value (KES)</Label>
                    <Input placeholder="e.g. 150000" value={form.totalPurchase} onChange={e => setField("totalPurchase", e.target.value)} className="rounded-none border-primary/5 h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Initial Deposit (KES)</Label>
                    <Input placeholder="e.g. 50000" value={form.initialPayment} onChange={e => setField("initialPayment", e.target.value)} className="rounded-none border-primary/5 h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Payment Deadline (End Date)</Label>
                    <Input placeholder="e.g. 20 July 2026" value={form.paymentDeadline} onChange={e => setField("paymentDeadline", e.target.value)} className="rounded-none border-primary/5 h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Delivery Date</Label>
                    <Input placeholder="e.g. 18 June 2026" value={form.deliveryDate} onChange={e => setField("deliveryDate", e.target.value)} className="rounded-none border-primary/5 h-12" />
                  </div>

                  <div className="md:col-span-2 p-6 bg-primary/5 border border-primary/10 grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                    <div>
                      <p className="text-[0.5rem] uppercase tracking-widest text-primary font-bold mb-1">Principal</p>
                      <p className="font-bold text-lg">{ksh(finance.principal)}</p>
                    </div>
                    <div>
                      <p className="text-[0.5rem] uppercase tracking-widest text-primary font-bold mb-1">Calculated Interest</p>
                      <p className="font-bold text-lg">{ksh(finance.interestAmount)}</p>
                    </div>
                    <div className="col-span-2 md:col-span-1 border-t md:border-t-0 md:border-l border-primary/10 pt-4 md:pt-0">
                      <p className="text-[0.6rem] uppercase tracking-[0.2em] text-primary font-black mb-1">Total Outstanding</p>
                      <p className="font-headline text-2xl font-black text-foreground">{ksh(finance.totalDue)}</p>
                    </div>
                  </div>
                  <div className="md:col-span-2 text-center">
                    <p className="text-[0.6rem] text-foreground/40 italic">
                      Based on a period of {finance.months} months ({finance.days} days) at 12.5% per month.
                    </p>
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
                    <Plus className="mr-2" size={14} /> Add Asset
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {form.products.map((p, i) => (
                    <div key={i} className="p-6 border border-primary/5 bg-background relative animate-in slide-in-from-left duration-300">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-[0.6rem] uppercase tracking-widest text-primary/40 font-bold">Asset Item #{i + 1}</span>
                        {form.products.length > 1 && (
                          <button onClick={() => removeProduct(i)} className="text-destructive/50 hover:text-destructive transition-colors">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          ["ref", "#Ref", "e.g. 001"],
                          ["brand", "Brand", "e.g. HP"],
                          ["description", "Description", "e.g. EliteBook"],
                          ["specs", "Specs", "e.g. Core i7, 16GB"],
                          ["colour", "Colour", "e.g. Silver"],
                          ["serial", "Serial No.", "e.g. SN1234"],
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
                Generate Final Documents <FileText className="ml-3" size={18} />
              </Button>
            </div>
          </div>
        ) : (
          <div className="animate-in zoom-in-95 duration-500">
            <div className="max-w-7xl mx-auto px-6 md:px-20 mb-12 flex justify-center gap-4 no-print">
              <Button onClick={() => setTab("form")} variant="outline" className="rounded-none border-primary text-primary uppercase tracking-widest font-bold h-12">
                <Edit3 className="mr-2" size={16} /> Return to Data
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
