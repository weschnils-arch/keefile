import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Header } from '@/sections/Header';
import {
  Check,
  ChevronRight,
  CreditCard,
  ArrowLeft,
  Package,
  Share2,
} from 'lucide-react';

type Color = 'bronze' | 'black';
type PaymentMethod = 'credit-card' | 'paypal' | 'apple-pay';

interface ShippingData {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  apt: string;
  city: string;
  postalCode: string;
  country: string;
}

const STEPS = ['Order', 'Shipping', 'Payment', 'Confirmation'] as const;

export default function Checkout() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [step, setStep] = useState(1);
  const [color1, setColor1] = useState<Color>('bronze');
  const [color2, setColor2] = useState<Color>('black');
  const [shipping, setShipping] = useState<ShippingData>({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    apt: '',
    city: '',
    postalCode: '',
    country: 'Germany',
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  });

  const accent = 'var(--kf-accent)';

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const updateShipping = (field: keyof ShippingData, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
  };

  const colorLabel = (c: Color) => (c === 'bronze' ? 'Bronze' : 'Black');

  /* ─────────────── Progress Stepper ─────────────── */
  const ProgressStepper = () => (
    <div className="flex items-center justify-center w-full mb-10">
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === step;
        const isCompleted = stepNum < step;

        return (
          <div key={label} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isCompleted
                    ? 'text-white'
                    : isActive
                    ? 'text-white'
                    : isLight
                    ? 'bg-black/[0.06] text-black/30'
                    : 'bg-white/[0.06] text-white/30'
                }`}
                style={
                  isCompleted || isActive
                    ? { backgroundColor: accent, color: isLight ? '#fff' : '#0A0A0A' }
                    : undefined
                }
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={`text-[11px] mt-1.5 font-medium tracking-wide hidden sm:block ${
                  isActive
                    ? 'opacity-100'
                    : isCompleted
                    ? 'opacity-60'
                    : 'opacity-30'
                } ${isLight ? 'text-black' : 'text-white'}`}
              >
                {label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div
                className={`w-10 sm:w-16 h-[2px] mx-2 sm:mx-3 rounded-full transition-all duration-300 ${
                  stepNum < step
                    ? ''
                    : isLight
                    ? 'bg-black/[0.08]'
                    : 'bg-white/[0.08]'
                }`}
                style={
                  stepNum < step ? { backgroundColor: accent } : undefined
                }
              />
            )}
          </div>
        );
      })}
    </div>
  );

  /* ─────────────── Color Swatch ─────────────── */
  const ColorSwatch = ({
    selected,
    onSelect,
    label,
  }: {
    selected: Color;
    onSelect: (c: Color) => void;
    label: string;
  }) => (
    <div className="space-y-2">
      <p
        className={`text-xs font-medium uppercase tracking-wider ${
          isLight ? 'text-black/40' : 'text-white/40'
        }`}
      >
        {label}
      </p>
      <div className="flex items-center gap-3">
        {(['bronze', 'black'] as Color[]).map((c) => (
          <button
            key={c}
            onClick={() => onSelect(c)}
            className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
              selected === c
                ? 'scale-110 border-[var(--kf-accent)]'
                : isLight
                ? 'border-black/10 hover:border-black/30'
                : 'border-white/10 hover:border-white/30'
            }`}
            style={{
              backgroundColor: c === 'bronze' ? '#C9A96E' : '#1D1D1F',
            }}
            aria-label={`Select ${c}`}
          />
        ))}
        <span
          className={`text-sm ml-1 ${
            isLight ? 'text-black/60' : 'text-white/60'
          }`}
        >
          {colorLabel(selected)}
        </span>
      </div>
    </div>
  );

  /* ─────────────── Glass Input ─────────────── */
  const GlassInput = ({
    label,
    value,
    onChange,
    type = 'text',
    placeholder = '',
    required = true,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
    placeholder?: string;
    required?: boolean;
  }) => (
    <div className="space-y-1.5">
      <label
        className={`text-xs font-medium uppercase tracking-wider ${
          isLight ? 'text-black/40' : 'text-white/40'
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 outline-none ${
          isLight
            ? 'bg-black/[0.03] border border-black/[0.08] text-black placeholder:text-black/30 focus:border-[var(--kf-accent)] focus:bg-white'
            : 'bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 focus:border-[var(--kf-accent)] focus:bg-white/[0.06]'
        }`}
      />
    </div>
  );

  /* ─────────────── Order Summary Mini ─────────────── */
  const OrderSummary = ({ compact = false }: { compact?: boolean }) => (
    <div
      className={`rounded-2xl p-5 ${
        isLight
          ? 'bg-black/[0.02] border border-black/[0.06]'
          : 'bg-white/[0.03] border border-white/[0.06]'
      } ${compact ? 'text-sm' : ''}`}
    >
      <h4
        className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
          isLight ? 'text-black/40' : 'text-white/40'
        }`}
      >
        Order Summary
      </h4>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className={isLight ? 'text-black/70' : 'text-white/70'}>
            Keefile &times; 2
          </span>
          <span className={isLight ? 'text-black' : 'text-white'}>
            &euro;55.59
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className={isLight ? 'text-black/40' : 'text-white/40'}>
            Keefile #1
          </span>
          <span className={isLight ? 'text-black/60' : 'text-white/60'}>
            {colorLabel(color1)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className={isLight ? 'text-black/40' : 'text-white/40'}>
            Keefile #2 (Gift)
          </span>
          <span className={isLight ? 'text-black/60' : 'text-white/60'}>
            {colorLabel(color2)}
          </span>
        </div>

        <div
          className={`border-t pt-3 mt-3 ${
            isLight ? 'border-black/[0.06]' : 'border-white/[0.06]'
          }`}
        >
          <div className="flex justify-between text-sm">
            <span className={isLight ? 'text-black/50' : 'text-white/50'}>
              Subtotal
            </span>
            <span className={isLight ? 'text-black/70' : 'text-white/70'}>
              &euro;55.59
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className={isLight ? 'text-black/50' : 'text-white/50'}>
              Shipping
            </span>
            <span className="text-[var(--kf-accent)] font-medium">Free</span>
          </div>
        </div>

        <div
          className={`border-t pt-3 ${
            isLight ? 'border-black/[0.06]' : 'border-white/[0.06]'
          }`}
        >
          <div className="flex justify-between font-semibold">
            <span className={isLight ? 'text-black' : 'text-white'}>
              Total
            </span>
            <span style={{ color: accent }}>&euro;55.59</span>
          </div>
        </div>
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════════════
     STEP 1 — YOUR ORDER
     ═══════════════════════════════════════════════════ */
  const StepOrder = () => (
    <div className="space-y-8">
      {/* Badge */}
      <div className="text-center">
        <span
          className="inline-block text-xs font-semibold uppercase tracking-[2px] px-4 py-1.5 rounded-full"
          style={{
            backgroundColor: isLight
              ? 'rgba(183,110,121,0.1)'
              : 'rgba(201,169,110,0.1)',
            color: accent,
          }}
        >
          Early Bird Offer
        </span>
      </div>

      <div className="text-center space-y-2">
        <h2
          className={`text-2xl sm:text-3xl font-bold tracking-tight ${
            isLight ? 'text-black' : 'text-white'
          }`}
        >
          Your Early Bird Offer
        </h2>
        <p className={isLight ? 'text-black/50' : 'text-white/50'}>
          Keefile — Buy One, Get One Free
        </p>
      </div>

      {/* Color Selection */}
      <div
        className={`rounded-2xl p-6 space-y-6 ${
          isLight
            ? 'bg-black/[0.02] border border-black/[0.06]'
            : 'bg-white/[0.03] border border-white/[0.06]'
        }`}
      >
        <ColorSwatch
          selected={color1}
          onSelect={setColor1}
          label="Keefile #1 — Your Color"
        />
        <div
          className={`border-t ${
            isLight ? 'border-black/[0.06]' : 'border-white/[0.06]'
          }`}
        />
        <ColorSwatch
          selected={color2}
          onSelect={setColor2}
          label="Keefile #2 — Your Gift"
        />
      </div>

      {/* Order Summary */}
      <OrderSummary />

      {/* CTA */}
      <button
        onClick={nextStep}
        className="btn-accent w-full flex items-center justify-center gap-2"
      >
        Continue to Shipping
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );

  /* ═══════════════════════════════════════════════════
     STEP 2 — SHIPPING
     ═══════════════════════════════════════════════════ */
  const StepShipping = () => (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2
          className={`text-2xl sm:text-3xl font-bold tracking-tight ${
            isLight ? 'text-black' : 'text-white'
          }`}
        >
          Where Should We Send Your Keefiles?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GlassInput
          label="First Name"
          value={shipping.firstName}
          onChange={(v) => updateShipping('firstName', v)}
          placeholder="John"
        />
        <GlassInput
          label="Last Name"
          value={shipping.lastName}
          onChange={(v) => updateShipping('lastName', v)}
          placeholder="Doe"
        />
      </div>

      <GlassInput
        label="Email"
        value={shipping.email}
        onChange={(v) => updateShipping('email', v)}
        type="email"
        placeholder="john@example.com"
      />

      <GlassInput
        label="Street Address"
        value={shipping.street}
        onChange={(v) => updateShipping('street', v)}
        placeholder="123 Main Street"
      />

      <GlassInput
        label="Apt / Suite (optional)"
        value={shipping.apt}
        onChange={(v) => updateShipping('apt', v)}
        placeholder="Apt 4B"
        required={false}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GlassInput
          label="City"
          value={shipping.city}
          onChange={(v) => updateShipping('city', v)}
          placeholder="Berlin"
        />
        <GlassInput
          label="Postal Code"
          value={shipping.postalCode}
          onChange={(v) => updateShipping('postalCode', v)}
          placeholder="10115"
        />
      </div>

      {/* Country dropdown */}
      <div className="space-y-1.5">
        <label
          className={`text-xs font-medium uppercase tracking-wider ${
            isLight ? 'text-black/40' : 'text-white/40'
          }`}
        >
          Country
        </label>
        <select
          value={shipping.country}
          onChange={(e) => updateShipping('country', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 outline-none appearance-none ${
            isLight
              ? 'bg-black/[0.03] border border-black/[0.08] text-black focus:border-[var(--kf-accent)] focus:bg-white'
              : 'bg-white/[0.04] border border-white/[0.08] text-white focus:border-[var(--kf-accent)] focus:bg-white/[0.06]'
          }`}
        >
          <option value="Germany">Germany</option>
          <option value="Austria">Austria</option>
          <option value="Switzerland">Switzerland</option>
          <option value="France">France</option>
          <option value="Netherlands">Netherlands</option>
          <option value="Belgium">Belgium</option>
          <option value="Italy">Italy</option>
          <option value="Spain">Spain</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* CTA */}
      <button
        onClick={nextStep}
        className="btn-accent w-full flex items-center justify-center gap-2"
      >
        Continue to Payment
        <ChevronRight className="w-4 h-4" />
      </button>

      <button
        onClick={prevStep}
        className={`w-full flex items-center justify-center gap-2 text-sm py-2 transition-colors ${
          isLight
            ? 'text-black/40 hover:text-black/70'
            : 'text-white/40 hover:text-white/70'
        }`}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Order
      </button>
    </div>
  );

  /* ═══════════════════════════════════════════════════
     STEP 3 — PAYMENT
     ═══════════════════════════════════════════════════ */
  const StepPayment = () => {
    const methods: {
      id: PaymentMethod;
      label: string;
      icon: React.ReactNode;
    }[] = [
      {
        id: 'credit-card',
        label: 'Credit Card',
        icon: <CreditCard className="w-5 h-5" />,
      },
      {
        id: 'paypal',
        label: 'PayPal',
        icon: (
          <span className="text-sm font-bold tracking-tight">Pay</span>
        ),
      },
      {
        id: 'apple-pay',
        label: 'Apple Pay',
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.98-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
        ),
      },
    ];

    return (
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2
            className={`text-2xl sm:text-3xl font-bold tracking-tight ${
              isLight ? 'text-black' : 'text-white'
            }`}
          >
            Almost There.
          </h2>
        </div>

        {/* Payment method cards */}
        <div className="grid grid-cols-3 gap-3">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => setPaymentMethod(m.id)}
              className={`flex flex-col items-center justify-center gap-2 py-4 px-3 rounded-2xl border transition-all duration-200 ${
                paymentMethod === m.id
                  ? 'border-[var(--kf-accent)] shadow-sm'
                  : isLight
                  ? 'border-black/[0.06] bg-black/[0.02] hover:border-black/20'
                  : 'border-white/[0.06] bg-white/[0.03] hover:border-white/20'
              }`}
              style={
                paymentMethod === m.id
                  ? {
                      backgroundColor: isLight
                        ? 'rgba(183,110,121,0.06)'
                        : 'rgba(201,169,110,0.06)',
                    }
                  : undefined
              }
            >
              <span
                className={
                  paymentMethod === m.id
                    ? ''
                    : isLight
                    ? 'text-black/40'
                    : 'text-white/40'
                }
                style={
                  paymentMethod === m.id ? { color: accent } : undefined
                }
              >
                {m.icon}
              </span>
              <span
                className={`text-xs font-medium ${
                  paymentMethod === m.id
                    ? ''
                    : isLight
                    ? 'text-black/50'
                    : 'text-white/50'
                }`}
                style={
                  paymentMethod === m.id ? { color: accent } : undefined
                }
              >
                {m.label}
              </span>
            </button>
          ))}
        </div>

        {/* Credit card form */}
        {paymentMethod === 'credit-card' && (
          <div className="space-y-4">
            <GlassInput
              label="Card Number"
              value={cardData.number}
              onChange={(v) =>
                setCardData((p) => ({ ...p, number: v }))
              }
              placeholder="4242 4242 4242 4242"
            />
            <div className="grid grid-cols-2 gap-4">
              <GlassInput
                label="Expiry"
                value={cardData.expiry}
                onChange={(v) =>
                  setCardData((p) => ({ ...p, expiry: v }))
                }
                placeholder="MM/YY"
              />
              <GlassInput
                label="CVC"
                value={cardData.cvc}
                onChange={(v) =>
                  setCardData((p) => ({ ...p, cvc: v }))
                }
                placeholder="123"
              />
            </div>
            <GlassInput
              label="Cardholder Name"
              value={cardData.name}
              onChange={(v) =>
                setCardData((p) => ({ ...p, name: v }))
              }
              placeholder="John Doe"
            />
          </div>
        )}

        {/* PayPal / Apple Pay placeholder */}
        {paymentMethod === 'paypal' && (
          <div
            className={`text-center py-8 rounded-2xl border ${
              isLight
                ? 'border-black/[0.06] bg-black/[0.02] text-black/50'
                : 'border-white/[0.06] bg-white/[0.03] text-white/50'
            }`}
          >
            <p className="text-sm">
              You will be redirected to PayPal to complete payment.
            </p>
          </div>
        )}

        {paymentMethod === 'apple-pay' && (
          <div
            className={`text-center py-8 rounded-2xl border ${
              isLight
                ? 'border-black/[0.06] bg-black/[0.02] text-black/50'
                : 'border-white/[0.06] bg-white/[0.03] text-white/50'
            }`}
          >
            <p className="text-sm">
              You will be prompted by Apple Pay to confirm.
            </p>
          </div>
        )}

        {/* Order summary */}
        <OrderSummary compact />

        {/* Trust line */}
        <p
          className={`text-center text-xs ${
            isLight ? 'text-black/30' : 'text-white/30'
          }`}
        >
          🔒 256-bit SSL Encrypted &middot; GDPR Compliant &middot;
          30-Day Returns
        </p>

        {/* CTA */}
        <button
          onClick={nextStep}
          className="btn-accent w-full flex items-center justify-center gap-2"
        >
          Complete Order — &euro;55.59
        </button>

        <button
          onClick={prevStep}
          className={`w-full flex items-center justify-center gap-2 text-sm py-2 transition-colors ${
            isLight
              ? 'text-black/40 hover:text-black/70'
              : 'text-white/40 hover:text-white/70'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Shipping
        </button>
      </div>
    );
  };

  /* ═══════════════════════════════════════════════════
     STEP 4 — CONFIRMATION
     ═══════════════════════════════════════════════════ */
  const StepConfirmation = () => (
    <div className="space-y-8 text-center">
      {/* Success icon */}
      <div className="flex justify-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: accent }}
        >
          <Check
            className="w-8 h-8"
            style={{ color: isLight ? '#fff' : '#0A0A0A' }}
          />
        </div>
      </div>

      <div className="space-y-3">
        <h2
          className={`text-2xl sm:text-3xl font-bold tracking-tight ${
            isLight ? 'text-black' : 'text-white'
          }`}
        >
          Thank You. Your Keefiles Are on Their Way.
        </h2>
        <p className={`max-w-md mx-auto ${isLight ? 'text-black/50' : 'text-white/50'}`}>
          Your order has been confirmed. We will send you an email with
          your order details and tracking updates.
        </p>
      </div>

      {/* Order confirmation box */}
      <div
        className={`rounded-2xl p-6 text-left space-y-4 mx-auto max-w-md ${
          isLight
            ? 'bg-black/[0.02] border border-black/[0.06]'
            : 'bg-white/[0.03] border border-white/[0.06]'
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <Package className="w-5 h-5" style={{ color: accent }} />
          <span
            className={`text-sm font-semibold ${
              isLight ? 'text-black' : 'text-white'
            }`}
          >
            Order #KF-24851
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className={isLight ? 'text-black/50' : 'text-white/50'}>
              Product
            </span>
            <span className={isLight ? 'text-black' : 'text-white'}>
              Keefile &times; 2
            </span>
          </div>
          <div className="flex justify-between">
            <span className={isLight ? 'text-black/50' : 'text-white/50'}>
              Colors
            </span>
            <span className={isLight ? 'text-black' : 'text-white'}>
              {colorLabel(color1)}, {colorLabel(color2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className={isLight ? 'text-black/50' : 'text-white/50'}>
              Total
            </span>
            <span className="font-semibold" style={{ color: accent }}>
              &euro;55.59
            </span>
          </div>
          <div className="flex justify-between">
            <span className={isLight ? 'text-black/50' : 'text-white/50'}>
              Est. Delivery
            </span>
            <span className={isLight ? 'text-black' : 'text-white'}>
              ~3 months
            </span>
          </div>
        </div>
      </div>

      {/* Back to Home */}
      <Link
        to="/"
        className="btn-accent inline-flex items-center justify-center gap-2 px-10"
      >
        Back to Home
      </Link>

      {/* Share */}
      <div className="space-y-3 pt-4">
        <p
          className={`text-xs font-medium uppercase tracking-wider ${
            isLight ? 'text-black/30' : 'text-white/30'
          }`}
        >
          Share with a friend
        </p>
        <div className="flex items-center justify-center gap-3">
          {['WhatsApp', 'Twitter', 'Copy Link'].map((platform) => (
            <button
              key={platform}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                isLight
                  ? 'bg-black/[0.04] text-black/50 hover:bg-black/[0.08] hover:text-black/70'
                  : 'bg-white/[0.04] text-white/50 hover:bg-white/[0.08] hover:text-white/70'
              }`}
            >
              <Share2 className="w-3 h-3" />
              {platform}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════════════
     MAIN RENDER
     ═══════════════════════════════════════════════════ */
  return (
    <div
      className="min-h-screen"
      style={{
        background: isLight
          ? 'radial-gradient(ellipse at center, #ffffff 0%, #F5F0EB 100%)'
          : 'radial-gradient(ellipse at center, #1a1a1a 0%, #0A0A0A 100%)',
      }}
    >
      <Header />

      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-[720px] mx-auto">
          {/* Glass container */}
          <div className="glass p-6 sm:p-10">
            <ProgressStepper />

            {step === 1 && <StepOrder />}
            {step === 2 && <StepShipping />}
            {step === 3 && <StepPayment />}
            {step === 4 && <StepConfirmation />}
          </div>
        </div>
      </main>
    </div>
  );
}
