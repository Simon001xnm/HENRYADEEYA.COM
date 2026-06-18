'use client';

import React, { useState } from 'react';

const COLORS = {
  navy: '#1F3864',
  blue: '#2E75B6',
  lightBlue: '#D6E4F0',
  yellow: '#FFF2CC',
  gray: '#F2F2F2',
  green: '#E2EFDA',
  white: '#FFFFFF',
  border: '#CBD5E1',
  text: '#1E293B',
  muted: '#64748B',
};

const initialForm = {
  day: '',
  month: '',
  year: '2026',
  buyerName: '',
  buyerOrg: '',
  buyerAddress: '',
  buyerPhone: '',
  buyerEmail: '',
  totalPurchase: '',
  initialPayment: '',
  paymentDeadline: '',
  deliveryDate: '',
  products: [{ ref: '', brand: '', description: '', specs: '', colour: '', serial: '' }],
};

function num(v: string) {
  if (!v) return 0;
  return parseFloat(v.replace(/,/g, '')) || 0;
}

function ksh(v: string | number) {
  const n = typeof v === 'string' ? num(v) : v;
  if (!n && n !== 0) return '';
  return 'KES ' + n.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function BNPLPage() {
  const [tab, setTab] = useState<'form' | 'preview'>('form');
  const [form, setForm] = useState(initialForm);

  const outstanding = Math.max(0, num(form.totalPurchase) - num(form.initialPayment));

  function setField(k: string, v: any) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function setProduct(i: number, k: string, v: string) {
    setForm((f) => {
      const p = [...f.products];
      (p[i] as any)[k] = v;
      return { ...f, products: p };
    });
  }

  function addProduct() {
    setForm((f) => ({
      ...f,
      products: [...f.products, { ref: '', brand: '', description: '', specs: '', colour: '', serial: '' }],
    }));
  }

  function removeProduct(i: number) {
    setForm((f) => ({ ...f, products: f.products.filter((_, idx) => idx !== i) }));
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const Label = ({ children }: { children: React.ReactNode }) => (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: COLORS.navy,
        marginBottom: 3,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}
    >
      {children}
    </div>
  );

  const Input = ({
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
    wide,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    type?: string;
    wide?: boolean;
  }) => (
    <div style={{ marginBottom: 12, flex: wide ? '1 1 100%' : '1 1 calc(50% - 8px)', minWidth: 160 }}>
      <Label>{label}</Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || ''}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '8px 10px',
          border: `1.5px solid ${COLORS.border}`,
          borderRadius: 6,
          fontSize: 13,
          color: COLORS.text,
          background: COLORS.white,
          outline: 'none',
          fontFamily: 'inherit',
        }}
      />
    </div>
  );

  const SectionHead = ({ children }: { children: React.ReactNode }) => (
    <div
      style={{
        background: COLORS.navy,
        color: '#fff',
        fontWeight: 700,
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        padding: '7px 14px',
        borderRadius: 6,
        marginBottom: 12,
        marginTop: 20,
      }}
    >
      {children}
    </div>
  );

  const Preview = () => {
    const dateStr =
      form.day && form.month ? `${form.day} ${form.month} ${form.year}` : '___ day of ________ 2026';
    const deadlineStr = form.paymentDeadline || '__________';
    const deliveryStr = form.deliveryDate || '__________';

    const TH = ({ children, w }: { children: React.ReactNode; w: string }) => (
      <th
        style={{
          background: COLORS.blue,
          color: '#fff',
          padding: '6px 8px',
          fontSize: 10,
          fontWeight: 700,
          border: '1px solid #fff',
          width: w,
          textAlign: 'left',
          WebkitPrintColorAdjust: 'exact',
        }}
      >
        {children}
      </th>
    );
    const TD = ({ children, shade, isBlack }: { children: React.ReactNode; shade?: boolean; isBlack?: boolean }) => (
      <td
        style={{
          padding: '5px 8px',
          fontSize: 10,
          border: `1px solid ${COLORS.border}`,
          background: shade ? COLORS.gray : '#fff',
          verticalAlign: 'top',
          color: isBlack ? '#000000' : 'inherit',
          fontWeight: isBlack ? 700 : 'normal',
          WebkitPrintColorAdjust: 'exact',
        }}
      >
        {children}
      </td>
    );
    const Row = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
      <tr>
        <td
          style={{
            padding: '5px 10px',
            fontWeight: 700,
            fontSize: 10,
            background: COLORS.lightBlue,
            border: `1px solid ${COLORS.border}`,
            width: '38%',
            WebkitPrintColorAdjust: 'exact',
          }}
        >
          {label}
        </td>
        <td
          style={{
            padding: '5px 10px',
            fontSize: 10,
            background: highlight ? COLORS.yellow : '#fff',
            border: `1px solid ${COLORS.border}`,
            WebkitPrintColorAdjust: 'exact',
          }}
        >
          {value || <span style={{ color: '#aaa' }}>—</span>}
        </td>
      </tr>
    );

    return (
      <div style={{ fontFamily: "'Times New Roman', Times, serif", background: '#e8edf2', padding: 16 }} className="print:bg-white print:p-0">
        {/* PAGE 1 */}
        <div
          className="document-page"
          style={{
            background: '#fff',
            maxWidth: 720,
            margin: '0 auto 24px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.13)',
            borderRadius: 4,
            padding: '28px 36px',
            pageBreakAfter: 'always',
          }}
        >
          <div
            style={{
              background: COLORS.navy,
              borderRadius: 6,
              padding: '14px 20px',
              marginBottom: 4,
              textAlign: 'center',
              WebkitPrintColorAdjust: 'exact',
            }}
          >
            <div style={{ color: '#fff', fontWeight: 900, fontSize: 20, letterSpacing: 2 }}>YEDNA LIMITED</div>
          </div>
          <div
            style={{
              background: COLORS.blue,
              borderRadius: 4,
              padding: '5px 12px',
              textAlign: 'center',
              marginBottom: 16,
              fontSize: 9,
              color: '#fff',
              WebkitPrintColorAdjust: 'exact',
            }}
          >
            Revlon Professional Plaza, Biashara Street | P.O Box 49939-00100, Nairobi | Tel: 0707 795 553 |
            yednalimited@gmail.com | www.yednalimited.com
          </div>
          <div
            style={{
              background: COLORS.navy,
              borderRadius: 4,
              padding: '8px 12px',
              textAlign: 'center',
              marginBottom: 18,
              color: '#fff',
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: 1,
              WebkitPrintColorAdjust: 'exact',
            }}
          >
            BUY NOW, PAY LATER (BNPL) SALES AGREEMENT
          </div>

          <p style={{ fontSize: 10, color: COLORS.muted, marginBottom: 14, lineHeight: 1.6, textAlign: 'justify' }}>
            This BNPL Sales Agreement is made and entered into on this <strong>{dateStr}</strong>, by and between{' '}
            <strong>Yedna Limited</strong>, a duly registered company under the laws of Kenya, with its principal office
            in Nairobi (hereinafter referred to as the <strong>"Seller"</strong>), AND the Buyer below (hereinafter
            referred to as the <strong>"Buyer"</strong>).
          </p>

          <div
            style={{
              fontWeight: 700,
              fontSize: 10,
              color: '#fff',
              background: COLORS.blue,
              padding: '5px 10px',
              borderRadius: 4,
              marginBottom: 6,
              WebkitPrintColorAdjust: 'exact',
            }}
          >
            PARTIES
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
            <tbody>
              <Row label="Seller" value="Yedna Limited – Nairobi, Kenya" />
              <Row label="Buyer Name" value={form.buyerName} highlight />
              <Row label="Buyer Organization" value={form.buyerOrg} highlight />
              <Row label="Buyer Address" value={form.buyerAddress} highlight />
              <Row label="Buyer Phone" value={form.buyerPhone} highlight />
              <Row label="Buyer Email" value={form.buyerEmail} highlight />
            </tbody>
          </table>

          <div
            style={{
              fontWeight: 700,
              fontSize: 10,
              color: '#fff',
              background: COLORS.blue,
              padding: '5px 10px',
              borderRadius: 4,
              marginBottom: 6,
              WebkitPrintColorAdjust: 'exact',
            }}
          >
            1. SALE OF GOODS &nbsp;<span style={{ fontWeight: 400, fontSize: 9 }}>(see Asset List on Page 2)</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
            <tbody>
              <Row label="Total Purchase Value" value={ksh(form.totalPurchase)} />
              <Row label="Initial Payment (Due on Delivery)" value={ksh(form.initialPayment)} />
              <Row label="Outstanding Balance" value={outstanding ? ksh(outstanding) : ''} />
              <Row label="Interest Rate" value="12.5% per month on reducing balance" />
              <Row label="Payment Period" value="30 calendar days from date of delivery" />
              <Row label="Payment Deadline" value={deadlineStr} highlight />
              <Row label="Delivery Date" value={deliveryStr} highlight />
              <Row label="Penalty on Overdue" value="15% compounded monthly on outstanding amount" />
            </tbody>
          </table>

          {[
            [
              '2. PAYMENT TERMS',
              `The Buyer agrees to pay the outstanding balance of ${
                ksh(outstanding) || 'KES ________'
              } within THIRTY (30) calendar days from the date of delivery (ending ${deadlineStr}). This amount includes 12.5% interest charges monthly on a reducing balance. Failure to pay within this period will attract a PENALTY charge of 15% on the overdue amount, compounded monthly, until fully settled.`,
            ],
            [
              '3. RETENTION OF OWNERSHIP',
              'Ownership of the equipment shall remain with the Seller until full payment of the total purchase price, including any accrued interest, has been made. The Seller reserves the right to reclaim the goods in the event of payment default.',
            ],
            [
              '4. DELIVERY',
              `The equipment shall be delivered to the Buyer upon receipt of the initial deposit${
                deliveryStr !== '__________' ? ' on ' + deliveryStr : ''
              }. Risk of loss or damage shall pass to the Buyer upon delivery.`,
            ],
            [
              '5. GOVERNING LAW & DISPUTE RESOLUTION',
              'This Agreement shall be governed by and construed in accordance with the laws of the Republic of Kenya. Any disputes arising under or in connection with this Agreement shall be resolved amicably through mutual negotiation, failing which the dispute shall be referred to arbitration in accordance with the Arbitration Act of Kenya.',
            ],
            [
              '6. ENTIRE AGREEMENT',
              'This document represents the entire agreement between the parties relating to the sale of the specified goods and supersedes all prior communications and understandings.',
            ],
          ].map(([title, text]) => (
            <div key={title} style={{ marginBottom: 10 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 10,
                  color: '#fff',
                  background: COLORS.blue,
                  padding: '4px 10px',
                  borderRadius: 4,
                  marginBottom: 4,
                  WebkitPrintColorAdjust: 'exact',
                }}
              >
                {title}
              </div>
              <p
                style={{
                  fontSize: 9.5,
                  color: COLORS.text,
                  margin: 0,
                  padding: '6px 10px',
                  background: COLORS.gray,
                  borderRadius: 4,
                  lineHeight: 1.6,
                  textAlign: 'justify',
                  WebkitPrintColorAdjust: 'exact',
                }}
              >
                {text}
              </p>
            </div>
          ))}

          <div
            style={{
              fontWeight: 700,
              fontSize: 10,
              color: '#fff',
              background: COLORS.navy,
              padding: '5px 10px',
              borderRadius: 4,
              margin: '14px 0 8px',
              WebkitPrintColorAdjust: 'exact',
            }}
          >
            7. SIGNATURES
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { title: 'Signed for YEDNA LIMITED', name: 'Henry Adeeya', pos: 'Director', phone: '0707 795 553' },
              { title: `Signed for ${form.buyerOrg || 'BUYER'}`, name: form.buyerName, pos: '', phone: form.buyerPhone },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  border: `1.5px solid ${COLORS.border}`,
                  borderRadius: 6,
                  padding: '10px 12px',
                  background: COLORS.gray,
                  WebkitPrintColorAdjust: 'exact',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 9, color: COLORS.navy, marginBottom: 6 }}>{s.title}</div>
                {[
                  ['Name', s.name],
                  ['Position', s.pos || '____________________'],
                  ['Phone', s.phone],
                ].map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', gap: 6, marginBottom: 4, fontSize: 9 }}>
                    <span style={{ fontWeight: 700, minWidth: 60, color: COLORS.muted }}>{l}:</span>
                    <span style={{ color: v ? COLORS.text : '#aaa' }}>{v || '____________________'}</span>
                  </div>
                ))}
                <div style={{ fontSize: 9, marginTop: 8 }}>
                  <span style={{ fontWeight: 700, color: COLORS.muted }}>Signature: </span>
                  <span style={{ display: 'inline-block', width: 120, borderBottom: `1px solid #999`, marginLeft: 4 }} />
                </div>
                <div style={{ fontSize: 9, marginTop: 6 }}>
                  <span style={{ fontWeight: 700, color: COLORS.muted }}>Date: </span>
                  <span style={{ display: 'inline-block', width: 100, borderBottom: `1px solid #999`, marginLeft: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PAGE 2 */}
        <div
          className="document-page"
          style={{
            background: '#fff',
            maxWidth: 720,
            margin: '0 auto',
            boxShadow: '0 2px 16px rgba(0,0,0,0.13)',
            borderRadius: 4,
            padding: '28px 36px',
          }}
        >
          <div
            style={{
              background: COLORS.navy,
              borderRadius: 6,
              padding: '14px 20px',
              marginBottom: 4,
              textAlign: 'center',
              WebkitPrintColorAdjust: 'exact',
            }}
          >
            <div style={{ color: '#fff', fontWeight: 900, fontSize: 20, letterSpacing: 2 }}>YEDNA LIMITED</div>
          </div>
          <div
            style={{
              background: COLORS.blue,
              borderRadius: 4,
              padding: '5px 12px',
              textAlign: 'center',
              marginBottom: 14,
              fontSize: 9,
              color: '#fff',
              WebkitPrintColorAdjust: 'exact',
            }}
          >
            Revlon Professional Plaza, Biashara Street | P.O Box 49939-00100, Nairobi | Tel: 0707 795 553 |
            yednalimited@gmail.com
          </div>

          <div style={{ fontWeight: 800, fontSize: 13, color: COLORS.navy, textAlign: 'center', marginBottom: 4 }}>
            ASSET ORDER LIST
          </div>
          <div style={{ fontSize: 9, color: COLORS.muted, textAlign: 'center', marginBottom: 14 }}>
            Buyer: <strong>{form.buyerName || '____________________'}</strong> &nbsp;|&nbsp; Organization:{' '}
            <strong>{form.buyerOrg || '____________________'}</strong> &nbsp;|&nbsp; Agreement Date:{' '}
            <strong>{dateStr}</strong>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10 }}>
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
                  <TD shade={i % 2 === 0} isBlack>
                    {p.ref || i + 1}
                  </TD>
                  <TD shade={i % 2 === 0} isBlack>
                    {p.brand}
                  </TD>
                  <TD shade={i % 2 === 0} isBlack>
                    {p.description}
                  </TD>
                  <TD shade={i % 2 === 0} isBlack>
                    {p.specs}
                  </TD>
                  <TD shade={i % 2 === 0} isBlack>
                    {p.colour}
                  </TD>
                  <TD shade={i % 2 === 0} isBlack>
                    {p.serial}
                  </TD>
                </tr>
              ))}
              {Array.from({ length: Math.max(0, 12 - form.products.length) }).map((_, i) => (
                <tr key={'empty' + i}>
                  {[0, 1, 2, 3, 4, 5].map((c) => (
                    <TD key={c} shade={(form.products.length + i) % 2 === 0} isBlack>
                      &nbsp;
                    </TD>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 18 }}>
            {[
              ['Total Purchase Value', ksh(form.totalPurchase)],
              ['Initial Payment', ksh(form.initialPayment)],
              ['Outstanding Balance', ksh(outstanding)],
            ].map(([l, v]) => (
              <div
                key={l}
                style={{
                  border: `1.5px solid ${COLORS.border}`,
                  borderRadius: 6,
                  padding: '10px 14px',
                  background: COLORS.lightBlue,
                  textAlign: 'center',
                  WebkitPrintColorAdjust: 'exact',
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    color: COLORS.muted,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}
                >
                  {l}
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: COLORS.navy }}>{v || '—'}</div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 18,
              padding: '8px 14px',
              background: COLORS.gray,
              borderRadius: 6,
              fontSize: 9,
              color: COLORS.muted,
              textAlign: 'center',
              WebkitPrintColorAdjust: 'exact',
            }}
          >
            This Asset List forms an integral part of the BNPL Sales Agreement dated <strong>{dateStr}</strong>. &nbsp;|&nbsp;
            www.yednalimited.com
          </div>
        </div>

        <style jsx global>{`
          @media print {
            nav,
            footer,
            button,
            .no-print {
              display: none !important;
            }
            body {
              background: white !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            .document-page {
              box-shadow: none !important;
              margin: 0 !important;
              border: none !important;
              padding: 1.5cm 2cm !important;
            }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', background: '#f0f4f8' }}>
      <div
        style={{
          background: COLORS.navy,
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        className="no-print"
      >
        <div>
          <div style={{ color: '#fff', fontWeight: 900, fontSize: 16, letterSpacing: 1 }}>YEDNA LIMITED</div>
          <div style={{ color: '#93C5FD', fontSize: 10 }}>BNPL Agreement Generator</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['form', 'preview'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              style={{
                padding: '7px 20px',
                borderRadius: 20,
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 700,
                background: tab === t ? '#fff' : 'rgba(255,255,255,0.15)',
                color: tab === t ? COLORS.navy : '#fff',
              }}
            >
              {t === 'form' ? '📝 Fill Form' : '📄 Preview Agreement'}
            </button>
          ))}
        </div>
      </div>

      {tab === 'form' ? (
        <div style={{ maxWidth: 780, margin: '24px auto', padding: '0 16px' }}>
          <div
            style={{
              background: '#fff',
              borderRadius: 10,
              padding: 20,
              marginBottom: 16,
              boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
            }}
          >
            <SectionHead>📅 Agreement Date</SectionHead>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Input label="Day" value={form.day} onChange={(v) => setField('day', v)} placeholder="e.g. 18" />
              <div style={{ flex: '1 1 calc(50% - 8px)', minWidth: 160, marginBottom: 12 }}>
                <Label>Month</Label>
                <select
                  value={form.month}
                  onChange={(e) => setField('month', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    border: `1.5px solid ${COLORS.border}`,
                    borderRadius: 6,
                    fontSize: 13,
                    fontFamily: 'inherit',
                  }}
                >
                  <option value="">Select month</option>
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <Input label="Year" value={form.year} onChange={(v) => setField('year', v)} placeholder="2026" />
            </div>
          </div>

          <div
            style={{
              background: '#fff',
              borderRadius: 10,
              padding: 20,
              marginBottom: 16,
              boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
            }}
          >
            <SectionHead>🏢 Buyer Details</SectionHead>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Input
                label="Buyer Name"
                value={form.buyerName}
                onChange={(v) => setField('buyerName', v)}
                placeholder="Full name"
              />
              <Input
                label="Organization"
                value={form.buyerOrg}
                onChange={(v) => setField('buyerOrg', v)}
                placeholder="Company / organization name"
              />
              <Input
                label="Address"
                value={form.buyerAddress}
                onChange={(v) => setField('buyerAddress', v)}
                placeholder="Physical address"
                wide
              />
              <Input
                label="Phone"
                value={form.buyerPhone}
                onChange={(v) => setField('buyerPhone', v)}
                placeholder="e.g. 0712 345 678"
              />
              <Input
                label="Email"
                value={form.buyerEmail}
                onChange={(v) => setField('buyerEmail', v)}
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div
            style={{
              background: '#fff',
              borderRadius: 10,
              padding: 20,
              marginBottom: 16,
              boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
            }}
          >
            <SectionHead>💰 Price & Payment Terms</SectionHead>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Input
                label="Total Purchase Value (KES)"
                value={form.totalPurchase}
                onChange={(v) => setField('totalPurchase', v)}
                placeholder="e.g. 150000"
              />
              <Input
                label="Initial Payment / Deposit (KES)"
                value={form.initialPayment}
                onChange={(v) => setField('initialPayment', v)}
                placeholder="e.g. 50000"
              />
              <div
                style={{
                  flex: '1 1 100%',
                  padding: '8px 12px',
                  background: outstanding ? COLORS.lightBlue : COLORS.gray,
                  borderRadius: 6,
                  fontSize: 13,
                  color: COLORS.navy,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                Outstanding Balance: {outstanding ? ksh(outstanding) : '— (fill Total & Deposit above)'}
              </div>
              <Input
                label="Payment Deadline Date"
                value={form.paymentDeadline}
                onChange={(v) => setField('paymentDeadline', v)}
                placeholder="e.g. 18 July 2026"
              />
              <Input
                label="Delivery Date"
                value={form.deliveryDate}
                onChange={(v) => setField('deliveryDate', v)}
                placeholder="e.g. 18 June 2026"
              />
            </div>
            <div
              style={{
                fontSize: 10,
                color: COLORS.muted,
                padding: '6px 10px',
                background: COLORS.yellow,
                borderRadius: 6,
                marginTop: 4,
              }}
            >
              ℹ️ Fixed terms: 12.5% interest/month · 15% penalty on overdue · 30-day payment period
            </div>
          </div>

          <div
            style={{
              background: '#fff',
              borderRadius: 10,
              padding: 20,
              marginBottom: 16,
              boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
            }}
          >
            <SectionHead>📦 Product / Asset Details</SectionHead>
            {form.products.map((p, i) => (
              <div
                key={i}
                style={{
                  background: COLORS.gray,
                  borderRadius: 8,
                  padding: 14,
                  marginBottom: 10,
                  position: 'relative',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 11, color: COLORS.navy, marginBottom: 8 }}>Item {i + 1}</div>
                {form.products.length > 1 && (
                  <button
                    onClick={() => removeProduct(i)}
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      background: '#FEE2E2',
                      border: 'none',
                      borderRadius: 4,
                      padding: '2px 8px',
                      cursor: 'pointer',
                      fontSize: 11,
                      color: '#DC2626',
                      fontWeight: 700,
                    }}
                  >
                    ✕ Remove
                  </button>
                )}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {[
                    ['ref', '#Ref', 'e.g. 001'],
                    ['brand', 'Brand Name', 'e.g. HP'],
                    ['description', 'Description', 'e.g. Laptop'],
                    ['specs', 'Specifications', 'e.g. Core i7, 16GB RAM'],
                    ['colour', 'Colour', 'e.g. Black'],
                    ['serial', 'Serial Number', 'e.g. SN12345'],
                  ].map(([k, l, ph]) => (
                    <div key={k} style={{ flex: '1 1 calc(33% - 8px)', minWidth: 140, marginBottom: 8 }}>
                      <Label>{l}</Label>
                      <input
                        value={(p as any)[k]}
                        onChange={(e) => setProduct(i, k, e.target.value)}
                        placeholder={ph}
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '7px 9px',
                          border: `1.5px solid ${COLORS.border}`,
                          borderRadius: 6,
                          fontSize: 12,
                          fontFamily: 'inherit',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={addProduct}
              style={{
                background: COLORS.navy,
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '8px 18px',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              + Add Another Item
            </button>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <button
              onClick={() => setTab('preview')}
              style={{
                background: COLORS.blue,
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '12px 36px',
                fontSize: 14,
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(46,117,182,0.4)',
              }}
            >
              Generate Agreement →
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div
            style={{ textAlign: 'center', padding: '14px 0 4px', display: 'flex', gap: 10, justifyContent: 'center' }}
            className="no-print"
          >
            <button
              onClick={() => setTab('form')}
              style={{
                background: COLORS.navy,
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '8px 20px',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              ← Edit Form
            </button>
            <button
              onClick={() => window.print()}
              style={{
                background: COLORS.blue,
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '8px 20px',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              🖨️ Print / Save PDF
            </button>
          </div>
          <Preview />
        </div>
      )}
    </div>
  );
}
