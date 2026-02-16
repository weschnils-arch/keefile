import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useCheckout } from '@/contexts/CheckoutContext';
import {
  X,
  ArrowLeft,
  Minus,
  Plus,
  CreditCard,
  Check,
  Package,
  Share2,
  ChevronDown,
  ChevronUp,
  Lock,
} from 'lucide-react';

type Color = 'bronze' | 'black';
type PaymentMethod = 'credit-card' | 'paypal' | 'apple-pay';

interface ColorSet {
  keefile1: Color;
  keefile2: Color;
}

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

interface ShippingErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

interface PaymentErrors {
  number?: string;
  expiry?: string;
  cvc?: string;
  name?: string;
}

const PRICE_PER_SET = 55.59;

const COUNTRIES = [
  'Germany',
  'Austria',
  'Switzerland',
  'France',
  'Netherlands',
  'Belgium',
  'Italy',
  'Spain',
  'Portugal',
  'United Kingdom',
  'Ireland',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Poland',
  'Czech Republic',
  'United States',
  'Canada',
  'Australia',
  'Other',
];

export function CheckoutPanel() {
  const { theme } = useTheme();
  const { isOpen, closeCheckout } = useCheckout();
  const isLight = theme === 'light';

  const accent = isLight ? '#B76E79' : '#C9A96E';
  const accentBgSubtle = isLight ? 'rgba(183,110,121,0.08)' : 'rgba(201,169,110,0.08)';
  const accentBgHover = isLight ? 'rgba(183,110,121,0.12)' : 'rgba(201,169,110,0.12)';

  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [colorSets, setColorSets] = useState<ColorSet[]>([
    { keefile1: 'bronze', keefile2: 'black' },
  ]);

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
  const [shippingErrors, setShippingErrors] = useState<ShippingErrors>({});

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  });
  const [paymentErrors, setPaymentErrors] = useState<PaymentErrors>({});

  const [orderSummaryExpanded, setOrderSummaryExpanded] = useState(false);
  const [orderNumber] = useState(
    () => `KF-${String(Math.floor(10000 + Math.random() * 90000))}`
  );

  const total = quantity * PRICE_PER_SET;

  useEffect(() => {
    setColorSets((prev) => {
      const next: ColorSet[] = [];
      for (let i = 0; i < quantity; i++) {
        next.push(prev[i] ?? { keefile1: 'bronze', keefile2: 'black' });
      }
      return next;
    });
  }, [quantity]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const updateColorSet = useCallback(
    (index: number, field: 'keefile1' | 'keefile2', color: Color) => {
      setColorSets((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], [field]: color };
        return next;
      });
    },
    []
  );

  const updateShipping = (field: keyof ShippingData, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
    if (shippingErrors[field as keyof ShippingErrors]) {
      setShippingErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateShipping = (): boolean => {
    const errors: ShippingErrors = {};
    if (!shipping.firstName.trim()) errors.firstName = 'First name is required';
    if (!shipping.lastName.trim()) errors.lastName = 'Last name is required';
    if (!shipping.email.trim()) {
      errors.email = 'Email is required';
    } else if (!shipping.email.includes('@')) {
      errors.email = 'Please enter a valid email';
    }
    if (!shipping.street.trim()) errors.street = 'Street address is required';
    if (!shipping.city.trim()) errors.city = 'City is required';
    if (!shipping.postalCode.trim()) errors.postalCode = 'Postal code is required';
    if (!shipping.country.trim()) errors.country = 'Country is required';

    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePayment = (): boolean => {
    if (paymentMethod !== 'credit-card') return true;
    const errors: PaymentErrors = {};
    if (!cardData.number.trim()) errors.number = 'Card number is required';
    if (!cardData.expiry.trim()) errors.expiry = 'Expiry is required';
    if (!cardData.cvc.trim()) errors.cvc = 'CVC is required';
    if (!cardData.name.trim()) errors.name = 'Cardholder name is required';

    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const colorLabel = (c: Color) => (c === 'bronze' ? 'Bronze' : 'Black');

  const handleClose = () => {
    closeCheckout();
  };

  const handleBackdropClick = () => {
    closeCheckout();
  };

  /* ─────────────── Shared Sub-Components ─────────────── */

  const ColorSwatch = ({
    selected,
    onSelect,
    label,
  }: {
    selected: Color;
    onSelect: (c: Color) => void;
    label: string;
  }) => (
    <div className="space-y-2.5">
      <p
        className={`text-[11px] font-semibold uppercase tracking-[1.5px] ${
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
            className="relative rounded-lg overflow-hidden transition-all duration-200"
            style={{
              width: 48,
              height: 32,
              backgroundColor: c === 'bronze' ? '#C9A96E' : '#1D1D1F',
              border:
                selected === c
                  ? `2px solid ${accent}`
                  : isLight
                  ? '2px solid rgba(0,0,0,0.08)'
                  : '2px solid rgba(255,255,255,0.08)',
              transform: selected === c ? 'scale(1.05)' : 'scale(1)',
            }}
            aria-label={`Select ${c}`}
          >
            {selected === c && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-white drop-shadow-sm" />
              </div>
            )}
          </button>
        ))}
        <span
          className={`text-sm font-medium ml-1 ${
            isLight ? 'text-black/60' : 'text-white/60'
          }`}
        >
          {colorLabel(selected)}
        </span>
      </div>
    </div>
  );

  const GlassInput = ({
    label,
    value,
    onChange,
    type = 'text',
    placeholder = '',
    required = true,
    error,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
  }) => (
    <div className="space-y-1.5">
      <label
        className={`text-[11px] font-semibold uppercase tracking-[1.5px] flex items-center gap-1 ${
          isLight ? 'text-black/40' : 'text-white/40'
        }`}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg text-sm transition-all duration-200 outline-none ${
          error
            ? 'border-red-500 border'
            : isLight
            ? 'bg-black/[0.03] border border-black/[0.08] text-black placeholder:text-black/30 focus:border-[var(--kf-accent,#B76E79)] focus:bg-white'
            : 'bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 focus:border-[var(--kf-accent,#C9A96E)] focus:bg-white/[0.06]'
        }`}
        style={error ? { borderColor: '#ef4444' } : undefined}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  const AccentButton = ({
    children,
    onClick,
    className = '',
  }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={`w-full py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-200 hover:opacity-90 active:scale-[0.98] ${className}`}
      style={{
        backgroundColor: accent,
        color: isLight ? '#fff' : '#0A0A0A',
      }}
    >
      {children}
    </button>
  );

  const BackButton = ({
    onClick,
    label,
  }: {
    onClick: () => void;
    label: string;
  }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-2 text-sm py-2.5 transition-colors ${
        isLight
          ? 'text-black/40 hover:text-black/70'
          : 'text-white/40 hover:text-white/70'
      }`}
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      {label}
    </button>
  );

  /* ═══════════════════════════════════════════════════
     STEP 1 — CHOOSE YOUR KEEFILE
     ═══════════════════════════════════════════════════ */
  const StepOrder = () => (
    <div className="space-y-6">
      {/* Early Bird Badge */}
      <div className="flex justify-center">
        <span
          className="inline-block text-[10px] font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-full"
          style={{
            backgroundColor: accentBgSubtle,
            color: accent,
          }}
        >
          Early Bird Special
        </span>
      </div>

      {/* Title */}
      <div className="text-center space-y-1.5">
        <h2
          className={`text-xl font-bold tracking-tight ${
            isLight ? 'text-black' : 'text-white'
          }`}
        >
          Choose Your Keefile
        </h2>
        <p
          className={`text-sm ${
            isLight ? 'text-black/50' : 'text-white/50'
          }`}
        >
          Buy One, Get One Free
        </p>
      </div>

      {/* Quantity Selector */}
      <div
        className={`rounded-xl p-5 ${
          isLight
            ? 'bg-black/[0.02] border border-black/[0.06]'
            : 'bg-white/[0.03] border border-white/[0.06]'
        }`}
      >
        <p
          className={`text-[11px] font-semibold uppercase tracking-[1.5px] mb-3 ${
            isLight ? 'text-black/40' : 'text-white/40'
          }`}
        >
          Number of Sets
        </p>
        <div className="flex items-center justify-between">
          <p
            className={`text-xs ${
              isLight ? 'text-black/50' : 'text-white/50'
            }`}
          >
            Each set = 2 Keefiles (1 + 1 free)
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                quantity <= 1
                  ? isLight
                    ? 'bg-black/[0.04] text-black/20 cursor-not-allowed'
                    : 'bg-white/[0.04] text-white/20 cursor-not-allowed'
                  : isLight
                  ? 'bg-black/[0.06] text-black/60 hover:bg-black/[0.1]'
                  : 'bg-white/[0.06] text-white/60 hover:bg-white/[0.1]'
              }`}
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span
              className={`text-lg font-bold w-8 text-center ${
                isLight ? 'text-black' : 'text-white'
              }`}
            >
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              disabled={quantity >= 10}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                quantity >= 10
                  ? isLight
                    ? 'bg-black/[0.04] text-black/20 cursor-not-allowed'
                    : 'bg-white/[0.04] text-white/20 cursor-not-allowed'
                  : isLight
                  ? 'bg-black/[0.06] text-black/60 hover:bg-black/[0.1]'
                  : 'bg-white/[0.06] text-white/60 hover:bg-white/[0.1]'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Color Selection for each set */}
      {colorSets.map((set, i) => (
        <div
          key={i}
          className={`rounded-xl p-5 space-y-5 ${
            isLight
              ? 'bg-black/[0.02] border border-black/[0.06]'
              : 'bg-white/[0.03] border border-white/[0.06]'
          }`}
        >
          {quantity > 1 && (
            <p
              className={`text-xs font-semibold uppercase tracking-wider ${
                isLight ? 'text-black/30' : 'text-white/30'
              }`}
            >
              Set {i + 1}
            </p>
          )}
          <ColorSwatch
            selected={set.keefile1}
            onSelect={(c) => updateColorSet(i, 'keefile1', c)}
            label={`Keefile #${i * 2 + 1} — Your Color`}
          />
          <div
            className={`border-t ${
              isLight ? 'border-black/[0.06]' : 'border-white/[0.06]'
            }`}
          />
          <ColorSwatch
            selected={set.keefile2}
            onSelect={(c) => updateColorSet(i, 'keefile2', c)}
            label={`Keefile #${i * 2 + 2} — Your Gift`}
          />
        </div>
      ))}

      {/* Order Summary */}
      <div
        className={`rounded-xl p-5 ${
          isLight
            ? 'bg-black/[0.02] border border-black/[0.06]'
            : 'bg-white/[0.03] border border-white/[0.06]'
        }`}
      >
        <h4
          className={`text-[11px] font-semibold uppercase tracking-[1.5px] mb-4 ${
            isLight ? 'text-black/40' : 'text-white/40'
          }`}
        >
          Order Summary
        </h4>
        <div className="space-y-2.5">
          {colorSets.map((set, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className={isLight ? 'text-black/70' : 'text-white/70'}>
                  {quantity > 1 ? `Set ${i + 1}: ` : ''}Keefile &times; 2
                </span>
                <span className={isLight ? 'text-black' : 'text-white'}>
                  &euro;{PRICE_PER_SET.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className={isLight ? 'text-black/40' : 'text-white/40'}>
                  #{i * 2 + 1} {colorLabel(set.keefile1)}, #{i * 2 + 2}{' '}
                  {colorLabel(set.keefile2)} (Gift)
                </span>
              </div>
            </div>
          ))}

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
                &euro;{total.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className={isLight ? 'text-black/50' : 'text-white/50'}>
                Shipping
              </span>
              <span className="font-medium" style={{ color: accent }}>
                Free
              </span>
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
              <span style={{ color: accent }}>
                &euro;{total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <AccentButton onClick={() => setStep(2)}>
        Continue to Shipping →
      </AccentButton>
    </div>
  );

  /* ═══════════════════════════════════════════════════
     STEP 2 — SHIPPING
     ═══════════════════════════════════════════════════ */
  const StepShipping = () => {
    const handleContinue = () => {
      if (validateShipping()) {
        setStep(3);
      }
    };

    return (
      <div className="space-y-5">
        <div className="space-y-1.5">
          <h2
            className={`text-xl font-bold tracking-tight ${
              isLight ? 'text-black' : 'text-white'
            }`}
          >
            Shipping Details
          </h2>
          <p
            className={`text-sm ${
              isLight ? 'text-black/40' : 'text-white/40'
            }`}
          >
            Where should we send your Keefiles?
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <GlassInput
            label="First Name"
            value={shipping.firstName}
            onChange={(v) => updateShipping('firstName', v)}
            placeholder="John"
            error={shippingErrors.firstName}
          />
          <GlassInput
            label="Last Name"
            value={shipping.lastName}
            onChange={(v) => updateShipping('lastName', v)}
            placeholder="Doe"
            error={shippingErrors.lastName}
          />
        </div>

        <GlassInput
          label="Email"
          value={shipping.email}
          onChange={(v) => updateShipping('email', v)}
          type="email"
          placeholder="john@example.com"
          error={shippingErrors.email}
        />

        <GlassInput
          label="Street Address"
          value={shipping.street}
          onChange={(v) => updateShipping('street', v)}
          placeholder="123 Main Street"
          error={shippingErrors.street}
        />

        <GlassInput
          label="Apt / Suite"
          value={shipping.apt}
          onChange={(v) => updateShipping('apt', v)}
          placeholder="Apt 4B"
          required={false}
        />

        <div className="grid grid-cols-2 gap-3">
          <GlassInput
            label="City"
            value={shipping.city}
            onChange={(v) => updateShipping('city', v)}
            placeholder="Berlin"
            error={shippingErrors.city}
          />
          <GlassInput
            label="Postal Code"
            value={shipping.postalCode}
            onChange={(v) => updateShipping('postalCode', v)}
            placeholder="10115"
            error={shippingErrors.postalCode}
          />
        </div>

        {/* Country Dropdown */}
        <div className="space-y-1.5">
          <label
            className={`text-[11px] font-semibold uppercase tracking-[1.5px] flex items-center gap-1 ${
              isLight ? 'text-black/40' : 'text-white/40'
            }`}
          >
            Country <span className="text-red-500">*</span>
          </label>
          <select
            value={shipping.country}
            onChange={(e) => updateShipping('country', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg text-sm transition-all duration-200 outline-none appearance-none ${
              shippingErrors.country
                ? 'border-red-500 border'
                : isLight
                ? 'bg-black/[0.03] border border-black/[0.08] text-black focus:border-[var(--kf-accent,#B76E79)] focus:bg-white'
                : 'bg-white/[0.04] border border-white/[0.08] text-white focus:border-[var(--kf-accent,#C9A96E)] focus:bg-white/[0.06]'
            }`}
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {shippingErrors.country && (
            <p className="text-red-500 text-xs mt-1">{shippingErrors.country}</p>
          )}
        </div>

        <div className="pt-2 space-y-2">
          <AccentButton onClick={handleContinue}>
            Continue to Payment →
          </AccentButton>
          <BackButton onClick={() => setStep(1)} label="Back to Order" />
        </div>
      </div>
    );
  };

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
        icon: <CreditCard className="w-4.5 h-4.5" />,
      },
      {
        id: 'paypal',
        label: 'PayPal',
        icon: <span className="text-xs font-bold tracking-tight">Pay</span>,
      },
      {
        id: 'apple-pay',
        label: 'Apple Pay',
        icon: (
          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.98-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
        ),
      },
    ];

    const handleComplete = () => {
      if (validatePayment()) {
        setStep(4);
      }
    };

    return (
      <div className="space-y-5">
        <div className="space-y-1.5">
          <h2
            className={`text-xl font-bold tracking-tight ${
              isLight ? 'text-black' : 'text-white'
            }`}
          >
            Payment
          </h2>
          <p
            className={`text-sm ${
              isLight ? 'text-black/40' : 'text-white/40'
            }`}
          >
            Choose your payment method
          </p>
        </div>

        {/* Payment Method Cards */}
        <div className="grid grid-cols-3 gap-2.5">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setPaymentMethod(m.id);
                setPaymentErrors({});
              }}
              className={`flex flex-col items-center justify-center gap-1.5 py-3.5 px-2 rounded-xl border transition-all duration-200 ${
                paymentMethod === m.id
                  ? 'border-transparent'
                  : isLight
                  ? 'border-black/[0.06] bg-black/[0.02] hover:border-black/20'
                  : 'border-white/[0.06] bg-white/[0.03] hover:border-white/20'
              }`}
              style={
                paymentMethod === m.id
                  ? {
                      backgroundColor: accentBgSubtle,
                      borderColor: accent,
                      borderWidth: 1,
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
                style={paymentMethod === m.id ? { color: accent } : undefined}
              >
                {m.icon}
              </span>
              <span
                className={`text-[11px] font-medium ${
                  paymentMethod === m.id
                    ? ''
                    : isLight
                    ? 'text-black/50'
                    : 'text-white/50'
                }`}
                style={paymentMethod === m.id ? { color: accent } : undefined}
              >
                {m.label}
              </span>
            </button>
          ))}
        </div>

        {/* Credit Card Form */}
        {paymentMethod === 'credit-card' && (
          <div className="space-y-3">
            <GlassInput
              label="Card Number"
              value={cardData.number}
              onChange={(v) => {
                setCardData((p) => ({ ...p, number: v }));
                if (paymentErrors.number)
                  setPaymentErrors((p) => ({ ...p, number: undefined }));
              }}
              placeholder="4242 4242 4242 4242"
              error={paymentErrors.number}
            />
            <div className="grid grid-cols-2 gap-3">
              <GlassInput
                label="Expiry"
                value={cardData.expiry}
                onChange={(v) => {
                  setCardData((p) => ({ ...p, expiry: v }));
                  if (paymentErrors.expiry)
                    setPaymentErrors((p) => ({ ...p, expiry: undefined }));
                }}
                placeholder="MM/YY"
                error={paymentErrors.expiry}
              />
              <GlassInput
                label="CVC"
                value={cardData.cvc}
                onChange={(v) => {
                  setCardData((p) => ({ ...p, cvc: v }));
                  if (paymentErrors.cvc)
                    setPaymentErrors((p) => ({ ...p, cvc: undefined }));
                }}
                placeholder="123"
                error={paymentErrors.cvc}
              />
            </div>
            <GlassInput
              label="Cardholder Name"
              value={cardData.name}
              onChange={(v) => {
                setCardData((p) => ({ ...p, name: v }));
                if (paymentErrors.name)
                  setPaymentErrors((p) => ({ ...p, name: undefined }));
              }}
              placeholder="John Doe"
              error={paymentErrors.name}
            />
          </div>
        )}

        {/* PayPal */}
        {paymentMethod === 'paypal' && (
          <div
            className={`text-center py-6 rounded-xl border ${
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

        {/* Apple Pay */}
        {paymentMethod === 'apple-pay' && (
          <div
            className={`text-center py-6 rounded-xl border ${
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

        {/* Mini Order Summary (collapsible) */}
        <div
          className={`rounded-xl border overflow-hidden ${
            isLight
              ? 'bg-black/[0.02] border-black/[0.06]'
              : 'bg-white/[0.03] border-white/[0.06]'
          }`}
        >
          <button
            onClick={() => setOrderSummaryExpanded((p) => !p)}
            className={`w-full flex items-center justify-between px-5 py-3.5 text-sm transition-colors ${
              isLight ? 'text-black/70 hover:text-black' : 'text-white/70 hover:text-white'
            }`}
          >
            <span className="font-medium">Order Summary</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold" style={{ color: accent }}>
                &euro;{total.toFixed(2)}
              </span>
              {orderSummaryExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </button>
          {orderSummaryExpanded && (
            <div
              className={`px-5 pb-4 space-y-2 border-t text-sm ${
                isLight ? 'border-black/[0.06]' : 'border-white/[0.06]'
              }`}
            >
              <div className="pt-3 space-y-2">
                {colorSets.map((set, i) => (
                  <div key={i} className="flex justify-between">
                    <span className={isLight ? 'text-black/60' : 'text-white/60'}>
                      {quantity > 1 ? `Set ${i + 1}: ` : ''}Keefile &times; 2
                    </span>
                    <span className={isLight ? 'text-black' : 'text-white'}>
                      &euro;{PRICE_PER_SET.toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span className={isLight ? 'text-black/50' : 'text-white/50'}>
                    Shipping
                  </span>
                  <span className="font-medium" style={{ color: accent }}>
                    Free
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Trust Line */}
        <div
          className={`flex items-center justify-center gap-1.5 text-[11px] text-center ${
            isLight ? 'text-black/30' : 'text-white/30'
          }`}
        >
          <Lock className="w-3 h-3" />
          <span>256-bit SSL Encrypted · GDPR Compliant · 30-Day Returns</span>
        </div>

        <div className="space-y-2">
          <AccentButton onClick={handleComplete}>
            Complete Order — &euro;{total.toFixed(2)}
          </AccentButton>
          <BackButton onClick={() => setStep(2)} label="Back to Shipping" />
        </div>
      </div>
    );
  };

  /* ═══════════════════════════════════════════════════
     STEP 4 — CONFIRMATION
     ═══════════════════════════════════════════════════ */
  const StepConfirmation = () => (
    <div className="space-y-6 text-center">
      {/* Green Check */}
      <div className="flex justify-center pt-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center">
          <Check className="w-8 h-8 text-white" />
        </div>
      </div>

      <div className="space-y-2">
        <h2
          className={`text-xl font-bold tracking-tight ${
            isLight ? 'text-black' : 'text-white'
          }`}
        >
          Thank You!
        </h2>
        <p
          className={`text-sm ${
            isLight ? 'text-black/50' : 'text-white/50'
          }`}
        >
          Your Keefiles Are on Their Way.
        </p>
      </div>

      {/* Order Details Box */}
      <div
        className={`rounded-xl p-5 text-left space-y-4 ${
          isLight
            ? 'bg-black/[0.02] border border-black/[0.06]'
            : 'bg-white/[0.03] border border-white/[0.06]'
        }`}
      >
        <div className="flex items-center gap-3">
          <Package className="w-5 h-5" style={{ color: accent }} />
          <span
            className={`text-sm font-semibold ${
              isLight ? 'text-black' : 'text-white'
            }`}
          >
            Order {orderNumber}
          </span>
        </div>

        <div className="space-y-2.5 text-sm">
          <div className="flex justify-between">
            <span className={isLight ? 'text-black/50' : 'text-white/50'}>
              Product
            </span>
            <span className={isLight ? 'text-black' : 'text-white'}>
              Keefile &times; {quantity * 2}
            </span>
          </div>

          {colorSets.map((set, i) => (
            <div key={i} className="flex justify-between">
              <span className={isLight ? 'text-black/50' : 'text-white/50'}>
                {quantity > 1 ? `Set ${i + 1} Colors` : 'Colors'}
              </span>
              <span className={isLight ? 'text-black' : 'text-white'}>
                {colorLabel(set.keefile1)}, {colorLabel(set.keefile2)}
              </span>
            </div>
          ))}

          <div className="flex justify-between">
            <span className={isLight ? 'text-black/50' : 'text-white/50'}>
              Total
            </span>
            <span className="font-semibold" style={{ color: accent }}>
              &euro;{total.toFixed(2)}
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

      {/* Continue Shopping */}
      <AccentButton
        onClick={() => {
          setStep(1);
          handleClose();
        }}
      >
        Continue Shopping
      </AccentButton>

      {/* Share Section */}
      <div className="space-y-3 pt-2">
        <p
          className={`text-[11px] font-semibold uppercase tracking-[1.5px] ${
            isLight ? 'text-black/30' : 'text-white/30'
          }`}
        >
          Share with a friend
        </p>
        <div className="flex items-center justify-center gap-2.5">
          {['WhatsApp', 'Twitter', 'Copy Link'].map((platform) => (
            <button
              key={platform}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
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
     PANEL HEADER
     ═══════════════════════════════════════════════════ */
  const PanelHeader = () => (
    <div
      className={`sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b backdrop-blur-xl ${
        isLight
          ? 'bg-[#FAFAFA]/90 border-black/[0.06]'
          : 'bg-[#0F0F0F]/90 border-white/[0.06]'
      }`}
    >
      <div className="flex items-center gap-3">
        {step > 1 && step < 4 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isLight
                ? 'hover:bg-black/[0.06] text-black/60'
                : 'hover:bg-white/[0.06] text-white/60'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        <h3
          className={`text-sm font-semibold tracking-wide ${
            isLight ? 'text-black' : 'text-white'
          }`}
        >
          {step === 4 ? 'Order Confirmed' : 'Your Order'}
        </h3>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-3">
        {step < 4 && (
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className="w-6 h-1 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    s <= step ? accent : isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
                }}
              />
            ))}
          </div>
        )}
        <button
          onClick={handleClose}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isLight
              ? 'hover:bg-black/[0.06] text-black/40 hover:text-black/70'
              : 'hover:bg-white/[0.06] text-white/40 hover:text-white/70'
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════════════
     MAIN RENDER
     ═══════════════════════════════════════════════════ */
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        } ${isLight ? 'bg-black/30' : 'bg-black/50'}`}
        onClick={handleBackdropClick}
        aria-hidden={!isOpen}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-[480px] flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: isLight ? '#FAFAFA' : '#0F0F0F',
          borderLeft: `1px solid ${
            isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'
          }`,
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Checkout"
      >
        <PanelHeader />

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === 1 && <StepOrder />}
          {step === 2 && <StepShipping />}
          {step === 3 && <StepPayment />}
          {step === 4 && <StepConfirmation />}
        </div>
      </div>
    </>
  );
}
