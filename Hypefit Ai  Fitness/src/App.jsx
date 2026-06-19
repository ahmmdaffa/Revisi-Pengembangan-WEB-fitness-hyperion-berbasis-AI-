import { createContext, useContext, useEffect, useRef, useState } from "react";
import fallbackContent from "./data/hypefit-content.json";

const ContentContext = createContext(fallbackContent);

function useContent() {
  return useContext(ContentContext);
}

function getDefaultPlan(content = fallbackContent) {
  return content.pricing?.plans?.find((plan) => plan.featured) || content.pricing?.plans?.[0] || null;
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function Icon({ name, className = "", fill = false }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`
      }}
    >
      {name}
    </span>
  );
}

function SendPlaneIcon() {
  return (
    <svg className="send-plane-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 4.75L20 12L4 19.25V14L13 12L4 10V4.75Z" />
    </svg>
  );
}

function CornerMarks() {
  return (
    <>
      <span className="corner-mark corner-tl" />
      <span className="corner-mark corner-tr" />
      <span className="corner-mark corner-bl" />
      <span className="corner-mark corner-br" />
    </>
  );
}

function MessageBubble({ message }) {
  const isUser = message.role === "user";
  const isError = message.tone === "error";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "fitbot-bubble relative max-w-[88%] p-4 text-sm leading-6 font-body",
          isUser ? "fitbot-bubble-user text-white" : "fitbot-bubble-ai text-on-surface",
          isError ? "fitbot-bubble-error text-error" : ""
        ].join(" ")}
      >
        <div className="mb-2 flex items-center gap-2 font-mono text-[10px] font-bold uppercase text-primary">
          <span>{isUser ? "YOU" : "FITBOT"}</span>
          <span className="h-1 w-1 bg-primary" />
          <span>{message.time || "LIVE"}</span>
        </div>
        <p className="message-text whitespace-pre-line">{message.text}</p>
      </div>
    </div>
  );
}

function LoadingBubble() {
  return (
    <div className="flex justify-start">
      <div className="fitbot-bubble fitbot-bubble-ai p-4 text-sm">
        <div className="mb-2 flex items-center gap-2 font-mono text-[10px] font-bold uppercase text-primary">
          <span>FITBOT</span>
          <span className="h-1 w-1 bg-primary" />
          <span>ANALYZING</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-on-surface">
          <span>Menyusun rekomendasi</span>
          <span className="terminal-cursor" />
        </div>
      </div>
    </div>
  );
}

function FitBotChat({ messages, isLoading, error, onSend, compact = false }) {
  const [draft, setDraft] = useState("");
  const bottomRef = useRef(null);
  const { chat } = useContent();
  const quickPrompts = chat?.quickPrompts || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  function handleSubmit(event) {
    event.preventDefault();
    const cleanDraft = draft.trim();
    if (!cleanDraft || isLoading) return;
    onSend(cleanDraft);
    setDraft("");
  }

  return (
    <div
      className={[
        "fitbot-shell glass-panel relative flex flex-col overflow-hidden",
        compact ? "h-[min(72vh,620px)] w-full" : "min-h-[620px]"
      ].join(" ")}
    >
      <div className="scan-line" />
      <div className="fitbot-chat-header flex items-center justify-between border-b border-white/10 p-5">
        <div className="flex items-center gap-3">
          <div className="fitbot-icon-box flex h-11 w-11 items-center justify-center bg-primary-container text-white shadow-red-glow">
            <Icon name="psychology" fill />
          </div>
          <div>
            <div className="font-mono text-xs font-bold uppercase text-primary">HYPERION CORE</div>
            <div className="font-mono text-[10px] uppercase text-green-400">Gemini linked assistant</div>
          </div>
        </div>
        <div className="hidden items-center gap-2 font-mono text-[10px] uppercase text-on-surface-variant sm:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          Online
        </div>
      </div>

      <div className="chat-scroll flex-1 space-y-4 overflow-y-auto p-5">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading ? <LoadingBubble /> : null}
        <div ref={bottomRef} />
      </div>

      {error ? (
        <div className="fitbot-alert mx-5 mb-4 flex items-start gap-2 border border-error/40 bg-error-container/20 p-3 text-sm text-error">
          <Icon name="warning" className="mt-0.5 text-base" />
          <span>{error}</span>
        </div>
      ) : null}

      {!compact ? (
        <div className="grid grid-cols-1 gap-2 border-t border-white/5 px-5 py-3 sm:grid-cols-3">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => onSend(prompt)}
              disabled={isLoading}
              className="fitbot-quick border border-white/10 px-3 py-2 text-left font-mono text-[10px] uppercase text-on-surface-variant transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="relative border-t border-white/10 p-5">
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              handleSubmit(event);
            }
          }}
          rows={compact ? 2 : 1}
          placeholder="Tanya FitBot tentang workout, nutrisi, recovery..."
          className="fitbot-input min-h-14 w-full resize-none border border-white/10 bg-surface p-4 pr-14 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/70 focus:border-primary focus:shadow-red-glow"
          disabled={isLoading}
        />
        <button
          type="submit"
          title="Kirim pesan"
          disabled={isLoading || !draft.trim()}
          className="fitbot-send bg-primary-container text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendPlaneIcon />
        </button>
      </form>
    </div>
  );
}

function Navigation({ activeNav, onLoginClick, onNavigateHome }) {
  const [hoveredNav, setHoveredNav] = useState(null);
  const { navigation } = useContent();
  const navItems = navigation?.items || [];
  const visualActiveNav = hoveredNav || activeNav;

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-margin-mobile lg:px-margin-desktop">
        <button
          type="button"
          onClick={() => onNavigateHome("home")}
          className="nav-logo-button"
          aria-label="HYPEFIT home"
        >
          <img src="/hypefit-logo.svg" alt="HYPEFIT" className="h-11 w-11 object-contain" />
        </button>
        <div className="hidden items-center gap-gutter md:flex" onMouseLeave={() => setHoveredNav(null)}>
          {navItems.map((item) => {
            const isActive = visualActiveNav === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigateHome(item.id)}
                onMouseEnter={() => setHoveredNav(item.id)}
                onFocus={() => setHoveredNav(item.id)}
                onBlur={() => setHoveredNav(null)}
                className={`relative pb-2 font-body text-lg transition-colors ${
                  isActive ? "font-bold text-primary" : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-200 ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={onLoginClick}
          className="nav-login-button bg-primary-container px-7 py-3 font-headline text-lg uppercase text-ui-silver transition-transform hover:scale-105 active:scale-95"
        >
          Log In
        </button>
      </div>
    </nav>
  );
}

function Hero({ onOpenChat }) {
  const { hero } = useContent();

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <img
          className="h-full w-full object-cover opacity-60"
          src={hero?.image}
          alt={hero?.imageAlt}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-surface/20" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-margin-mobile lg:px-margin-desktop">
        <div className="max-w-4xl space-y-6">
          <div className="inline-block bg-primary-container px-3 py-1 font-mono text-xs font-bold uppercase text-ui-silver">
            {hero?.badge}
          </div>
          <h1 className="font-display text-5xl uppercase leading-none text-ui-silver md:text-7xl lg:text-[80px]">
            {hero?.title}
          </h1>
          <p className="max-w-2xl font-body text-lg leading-7 text-on-surface-variant">
            {hero?.description}
          </p>
          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <button
              type="button"
              onClick={onOpenChat}
              className="border-b-4 border-black bg-primary-container px-10 py-4 font-headline text-xl uppercase text-white transition-all hover:bg-accent-crimson active:translate-y-1 active:border-b-0"
            >
              {hero?.primaryCta}
            </button>
            <a
              href="#ai-coach"
              className="border-2 border-ui-silver px-10 py-4 text-center font-headline text-xl uppercase text-ui-silver transition-all hover:bg-ui-silver hover:text-surface"
            >
              {hero?.secondaryCta}
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 right-margin-desktop hidden lg:block">
        <div className="glass-panel space-y-2 border-l-4 border-primary p-6">
          <div className="font-mono text-xs font-bold uppercase text-primary">{hero?.systemStatus?.title}</div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse bg-green-500" />
            <span className="font-mono text-sm font-bold">{hero?.systemStatus?.line}</span>
          </div>
          <div className="font-body text-xs text-on-surface-variant">{hero?.systemStatus?.meta}</div>
        </div>
      </div>
    </section>
  );
}

function AiCoachSection({ chatProps }) {
  const { aiCoach } = useContent();
  const features = aiCoach?.features || [];

  return (
    <section id="ai-coach" className="relative overflow-hidden bg-surface-charcoal py-stack-lg">
      <div className="mx-auto max-w-[1440px] px-margin-mobile lg:px-margin-desktop">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <h2 className="border-l-8 border-primary pl-6 font-headline text-4xl uppercase text-primary">
              {aiCoach?.title}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {features.map((feature) => (
                <article key={feature.title} className="relative border border-white/5 bg-surface-container p-6">
                  <CornerMarks />
                  <Icon name={feature.icon} className="mb-4 text-4xl text-primary" />
                  <h3 className="mb-2 font-headline text-lg uppercase">{feature.title}</h3>
                  <p className="font-body text-sm leading-6 text-on-surface-variant">{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
          <FitBotChat {...chatProps} />
        </div>
      </div>
    </section>
  );
}

function ScheduleSection() {
  const { schedule } = useContent();
  const classCards = schedule?.classCards || [];

  return (
    <section id="schedule" className="bg-surface py-stack-lg">
      <div className="mx-auto max-w-[1440px] px-margin-mobile lg:px-margin-desktop">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mb-2 font-headline text-4xl uppercase">{schedule?.title}</h2>
            <p className="font-body text-on-surface-variant">{schedule?.description}</p>
          </div>
          <div className="flex gap-2">
            <button className="flex h-11 w-11 items-center justify-center border border-white/10 transition-colors hover:border-primary">
              <Icon name="chevron_left" />
            </button>
            <button className="flex h-11 w-11 items-center justify-center border border-white/10 transition-colors hover:border-primary">
              <Icon name="chevron_right" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {classCards.map((card) => (
            <article key={card.title} className="group relative aspect-[4/5] overflow-hidden bg-surface-container">
              <img
                className="absolute inset-0 h-full w-full scale-105 object-cover grayscale transition-all duration-500 group-hover:scale-100 group-hover:grayscale-0"
                src={card.image}
                alt={`${card.title} training session`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-85" />
              <div className="absolute bottom-0 left-0 w-full p-8">
                <div
                  className={`mb-4 inline-block px-2 py-1 font-mono text-xs font-bold uppercase ${
                    card.featured ? "bg-primary-container text-white" : "bg-ui-silver text-black"
                  }`}
                >
                  {card.tag}
                </div>
                <h3 className="mb-2 font-headline text-2xl uppercase text-ui-silver">{card.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xs uppercase text-on-surface-variant">{card.time}</div>
                  <Icon name="arrow_forward" className="text-primary transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HumanMachineSection() {
  const { humanMachine } = useContent();
  const points = humanMachine?.points || [];

  return (
    <section id="training" className="border-y border-white/5 bg-surface-container-low py-stack-lg">
      <div className="mx-auto max-w-[1440px] px-margin-mobile lg:px-margin-desktop">
        <div className="flex flex-col items-center gap-12 md:flex-row lg:gap-16">
          <div className="relative w-full md:w-1/2">
            <div className="absolute -left-8 -top-8 -z-0 h-40 w-40 border-2 border-primary/20" />
            <img
              className="relative z-10 w-full border-2 border-white/10 grayscale"
              src={humanMachine?.image}
              alt={humanMachine?.imageAlt}
            />
            <div className="glass-panel absolute bottom-6 right-6 z-20 border-l-4 border-primary p-4">
              <div className="font-headline text-xl uppercase">{humanMachine?.coachName}</div>
              <div className="font-mono text-[10px] font-bold uppercase text-primary">{humanMachine?.coachRole}</div>
            </div>
          </div>
          <div className="w-full space-y-8 md:w-1/2">
            <h2 className="font-headline text-4xl uppercase">{humanMachine?.title}</h2>
            <p className="font-body text-lg leading-7 text-on-surface-variant">
              {humanMachine?.description}
            </p>
            <ul className="space-y-4">
              {points.map((point) => (
                <li key={point.title} className="group flex items-center gap-4">
                  <span className="h-10 w-2 bg-primary transition-all group-hover:w-4" />
                  <div>
                    <div className="font-headline text-lg uppercase">{point.title}</div>
                    <div className="font-body text-sm text-on-surface-variant">{point.body}</div>
                  </div>
                </li>
              ))}
            </ul>
            <a
              href="#ai-coach"
              className="inline-block bg-ui-silver px-8 py-3 font-headline text-lg uppercase text-surface transition-all hover:bg-primary-container hover:text-white"
            >
              {humanMachine?.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection({ onSelectPlan }) {
  const { pricing } = useContent();
  const plans = pricing?.plans || [];

  return (
    <section id="pricing" className="relative overflow-hidden bg-surface py-stack-lg">
      <div className="absolute right-0 top-0 h-full w-1/3 origin-top translate-x-20 -skew-x-12 bg-primary/5" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-margin-mobile lg:px-margin-desktop">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-headline text-4xl uppercase">{pricing?.title}</h2>
          <div className="flex justify-center gap-4 font-mono text-xs font-bold uppercase">
            <span className="border border-primary px-2 text-primary">{pricing?.billing?.monthly}</span>
            <span className="text-on-surface-variant">{pricing?.billing?.yearly}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.title}
              className={[
                "relative flex flex-col p-10 transition-colors",
                plan.featured
                  ? "scale-100 overflow-hidden bg-primary-container text-white md:scale-105"
                  : "border border-white/10 bg-surface-container hover:border-primary/50"
              ].join(" ")}
            >
              {plan.featured ? (
                <div className="absolute -right-10 -top-10 h-24 w-24 rotate-45 bg-white/10" />
              ) : (
                <span className="corner-mark corner-tr opacity-70" />
              )}
              {plan.featured ? (
                <div className="mb-4 self-start bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase text-primary-container">
                  {pricing?.popularLabel}
                </div>
              ) : null}
              <div className="mb-2 font-headline text-2xl uppercase">{plan.title}</div>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="font-headline text-4xl">{plan.price}</span>
                <span className="font-mono text-xs uppercase opacity-70">/{plan.period}</span>
              </div>
              <ul className="mb-10 flex-grow space-y-4 border-t border-white/10 pt-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 font-body text-sm">
                    <Icon name="check" className="text-sm text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onSelectPlan(plan)}
                className={
                  plan.featured
                    ? "w-full bg-white py-3 font-headline text-lg uppercase text-primary-container transition-colors hover:bg-ui-silver"
                    : "w-full border-2 border-ui-silver py-3 font-headline text-lg uppercase transition-colors hover:bg-ui-silver hover:text-surface"
                }
              >
                Pilih {plan.title}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { footer } = useContent();

  return (
    <footer className="border-t border-white/10 bg-surface-container-lowest py-stack-lg">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-gutter px-margin-mobile md:grid-cols-4 lg:px-margin-desktop">
        <div className="space-y-4">
          <div className="font-display text-3xl uppercase text-primary">{footer?.brand}</div>
          <p className="font-body text-sm leading-6 text-on-surface-variant">
            {footer?.description}
          </p>
          <div className="flex gap-4">
            {(footer?.socialIcons || []).map((icon) => (
              <a
                key={icon}
                className="flex h-10 w-10 items-center justify-center border border-white/10 transition-colors hover:bg-primary/10"
                href="#home"
              >
                <Icon name={icon} className="text-sm" />
              </a>
            ))}
          </div>
        </div>
        {(footer?.columns || []).map((column) => (
          <div key={column.title} className="space-y-4">
            <div className="font-headline text-lg uppercase">{column.title}</div>
            <ul className="space-y-2 font-body text-sm">
              {column.links.map((link) => (
                <li key={link}>
                  <a className="text-on-surface-variant transition-colors hover:text-primary" href="#home">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="space-y-4">
          <div className="font-headline text-lg uppercase">{footer?.newsletter?.title}</div>
          <p className="font-body text-sm text-on-surface-variant">{footer?.newsletter?.body}</p>
          <div className="relative">
            <input
              className="w-full border-b border-white/20 bg-surface p-2 pr-14 text-sm outline-none transition-colors focus:border-primary"
              placeholder={footer?.newsletter?.placeholder}
              type="email"
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 font-body font-bold text-primary">
              {footer?.newsletter?.button}
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1440px] flex-col items-center justify-between gap-4 border-t border-white/5 px-margin-mobile pt-8 lg:flex-row lg:px-margin-desktop">
        <div className="font-mono text-[10px] uppercase text-on-surface-variant">
          {footer?.copyright}
        </div>
        <div className="flex gap-6 font-mono text-[10px] uppercase">
          {(footer?.locations || []).map((location) => (
            <span key={location}>{location}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

function LoginPage({ onBackHome, onLoginSuccess }) {
  const { auth, login } = useContent();
  const demoCredentials = auth?.demoCredentials || fallbackContent.auth.demoCredentials;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [hasError, setHasError] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const isValid =
      email.trim().toLowerCase() === demoCredentials.email.toLowerCase() &&
      password === demoCredentials.password;

    if (!isValid) {
      setHasError(true);
      setStatus("Email atau password demo tidak sesuai.");
      return;
    }

    setHasError(false);
    setStatus("Login berhasil. Mengalihkan ke dashboard...");
    window.setTimeout(onLoginSuccess, 450);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-surface-charcoal pt-20">
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover opacity-35 grayscale"
          src={login?.backgroundImage}
          alt={login?.backgroundAlt}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-surface/40" />
      </div>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] max-w-[1440px] grid-cols-1 items-center gap-12 px-margin-mobile py-stack-lg lg:grid-cols-[1fr_520px] lg:px-margin-desktop">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-3 border border-primary/50 bg-primary-container/15 px-3 py-2 font-mono text-xs font-bold uppercase text-primary">
            <span className="h-2 w-2 animate-pulse bg-green-500" />
            {login?.badge}
          </div>
          <div className="space-y-4">
            <h1 className="font-display text-5xl uppercase leading-none text-ui-silver md:text-7xl">
              {login?.title}
            </h1>
            <p className="max-w-2xl font-body text-lg leading-7 text-on-surface-variant">
              {login?.description}
            </p>
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            {(login?.metrics || []).map((item) => (
              <div key={item.label} className="border border-white/10 bg-surface-container/70 p-4">
                <div className="font-mono text-2xl font-bold text-primary">{item.metric}</div>
                <div className="mt-1 font-mono text-[10px] font-bold uppercase text-on-surface-variant">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel relative overflow-hidden p-6 shadow-panel-glow md:p-8">
          <CornerMarks />
          <div className="scan-line" />
          <div className="mb-8 border-b border-white/10 pb-6">
            <div className="mb-2 font-mono text-xs font-bold uppercase text-primary">{login?.formEyebrow}</div>
            <h2 className="font-headline text-3xl uppercase text-ui-silver">{login?.formTitle}</h2>
          </div>

          <div className="space-y-5">
            <label className="block">
              <span className="mb-2 block font-mono text-[11px] font-bold uppercase text-on-surface-variant">
                Email
              </span>
              <input
                className="w-full border border-white/10 bg-surface p-4 font-body text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary focus:shadow-red-glow"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="nama@email.com"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-mono text-[11px] font-bold uppercase text-on-surface-variant">
                Password
              </span>
              <input
                className="w-full border border-white/10 bg-surface p-4 font-body text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary focus:shadow-red-glow"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Masukkan password"
                required
              />
            </label>

            <div className="flex flex-col gap-3 font-body text-sm text-on-surface-variant sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-3">
                <input className="border-white/20 bg-surface text-primary-container focus:ring-primary" type="checkbox" />
                Ingat saya
              </label>
              <button type="button" className="text-left font-bold text-primary transition-colors hover:text-ui-silver">
                Lupa password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full border-b-4 border-black bg-primary-container px-8 py-4 font-headline text-xl uppercase text-white transition-all hover:bg-accent-crimson active:translate-y-1 active:border-b-0"
            >
              Log In
            </button>

            {status ? (
              <div
                className={`border p-3 font-body text-sm ${
                  hasError
                    ? "border-error/40 bg-error-container/20 text-error"
                    : "border-primary/40 bg-primary-container/10 text-on-surface"
                }`}
              >
                {status}
              </div>
            ) : null}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 font-body text-sm text-on-surface-variant sm:flex-row sm:items-center sm:justify-between">
            <span>Belum punya akun?</span>
            <button
              type="button"
              onClick={onBackHome}
              className="font-mono text-xs font-bold uppercase text-primary transition-colors hover:text-ui-silver"
            >
              {login?.backLabel}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

function AthleteEnrollmentPage({ selectedPlan, onSubmit, onBack }) {
  const { enrollment } = useContent();
  const plan = selectedPlan || getDefaultPlan();

  return (
    <div className="min-h-screen bg-surface-charcoal text-on-surface">
      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-background/80 px-margin-mobile backdrop-blur-md lg:px-margin-desktop">
        <button
          type="button"
          onClick={onBack}
          className="font-mono text-xs font-bold uppercase text-on-surface-variant transition-colors hover:text-primary"
        >
          {enrollment?.backLabel}
        </button>
        <div className="flex items-center gap-6">
          <span className="font-mono text-xs uppercase text-primary">
            {enrollment?.selectedPlanPrefix} {plan?.title}
          </span>
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
        </div>
      </header>

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] bg-accent-crimson/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] bg-accent-crimson/5 blur-[100px]" />
          <div className="grid h-full w-full grid-cols-12">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-full border-r border-white/5" />
            ))}
          </div>
        </div>

        <section className="relative z-10 w-full max-w-2xl px-margin-mobile py-stack-lg md:px-0">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit();
            }}
            className="relative border border-white/10 bg-surface-charcoal p-8 shadow-panel-glow md:p-12"
          >
            <CornerMarks />
            <div className="scan-line" />
            <div className="mb-10">
              <div className="mb-4 inline-flex items-center gap-3 bg-primary-container px-3 py-1 font-mono text-xs font-bold uppercase text-white">
                {plan.title} / {plan.price}
              </div>
              <h2 className="flex items-center gap-3 font-headline text-4xl uppercase text-on-surface">
                <span className="h-8 w-2 bg-accent-crimson" />
                {enrollment?.title}
              </h2>
              <p className="mt-2 font-mono text-xs font-bold uppercase text-on-surface-variant">
                {enrollment?.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-stack-md md:grid-cols-2">
              {(enrollment?.fields || []).map((field) => (
                <label key={field.label} className="col-span-full">
                  <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    {field.label}
                  </span>
                  <input
                    className="w-full border-0 border-b-2 border-white/10 bg-surface-container px-0 py-3 font-mono text-lg text-ui-silver outline-none transition-colors placeholder:text-white/20 focus:border-accent-crimson"
                    placeholder={field.placeholder}
                    type={field.type}
                    required
                  />
                </label>
              ))}
              <label>
                <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  {enrollment?.ageField?.label}
                </span>
                <input
                  className="w-full border-0 border-b-2 border-white/10 bg-surface-container px-0 py-3 font-mono text-lg text-ui-silver outline-none transition-colors placeholder:text-white/20 focus:border-accent-crimson"
                  placeholder={enrollment?.ageField?.placeholder}
                  type="number"
                  min={enrollment?.ageField?.min}
                  required
                />
              </label>
              <div className="grid grid-cols-2 gap-4">
                {(enrollment?.bodyFields || []).map((field) => (
                  <label key={field.label}>
                    <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      {field.label}
                    </span>
                    <input
                      className="w-full border-0 border-b-2 border-white/10 bg-surface-container px-0 py-3 font-mono text-lg text-ui-silver outline-none transition-colors placeholder:text-white/20 focus:border-accent-crimson"
                      placeholder={field.placeholder}
                      type="number"
                      min={field.min}
                      required
                    />
                  </label>
                ))}
              </div>
            </div>

            <label className="mt-8 flex items-start gap-3">
              <input
                className="mt-1 border-white/20 bg-surface-container text-accent-crimson focus:ring-accent-crimson"
                type="checkbox"
                required
              />
              <span className="font-mono text-xs uppercase leading-relaxed text-on-surface-variant">
                {enrollment?.consent}
              </span>
            </label>

            <button className="mt-10 w-full bg-accent-crimson py-5 font-headline text-xl uppercase tracking-[0.2em] text-white shadow-red-glow transition-all hover:-translate-y-0.5 hover:brightness-110">
              {enrollment?.submitLabel}
            </button>

            <div className="mt-8 flex flex-col justify-between gap-3 border-t border-white/5 pt-4 font-mono text-[10px] uppercase text-white/30 sm:flex-row">
              {(enrollment?.footerMeta || []).map((meta) => (
                <span key={meta}>{meta}</span>
              ))}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

function EnrollmentSuccessPage({ selectedPlan, onBackHome }) {
  const { enrollmentSuccess } = useContent();
  const plan = selectedPlan || getDefaultPlan();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface py-stack-lg text-on-surface">
      <div className="absolute inset-x-0 top-0 h-1 bg-primary-container" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/95 to-surface-charcoal" />
        <img
          className="absolute bottom-0 right-0 h-[55vh] max-h-[620px] object-contain opacity-30 grayscale"
          src={enrollmentSuccess?.image}
          alt={enrollmentSuccess?.imageAlt}
        />
      </div>

      <section className="relative z-10 mx-auto max-w-4xl px-margin-mobile text-center">
        <div className="mx-auto mb-12 flex h-36 w-36 items-center justify-center border-4 border-green-500 text-green-500 shadow-[0_0_60px_rgba(34,197,94,0.28)]">
          <Icon name="check" className="text-7xl" />
        </div>
        <div className="mb-4 font-mono text-sm font-bold uppercase tracking-[0.35em] text-primary-container">
          {enrollmentSuccess?.eyebrow}
        </div>
        <h1 className="font-display text-5xl uppercase leading-none text-ui-silver md:text-6xl">
          {enrollmentSuccess?.title}
        </h1>

        <div className="relative mx-auto mt-10 max-w-3xl border border-white/10 bg-surface-container/70 p-8 md:p-12">
          <CornerMarks />
          <p className="font-body text-lg leading-8 text-on-surface">
            {enrollmentSuccess?.messagePrefix} <strong>{enrollmentSuccess?.messageBrand}</strong>. Data Anda untuk
            paket <strong className="text-primary">{plan?.title}</strong> {enrollmentSuccess?.messageSuffix}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8 font-mono text-[10px] uppercase text-primary-container">
            {(enrollmentSuccess?.meta || []).map((meta) => (
              <span key={meta}>{meta}</span>
            ))}
            <span>Plan: {plan?.title}</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <button
            type="button"
            onClick={onBackHome}
            className="bg-primary-container px-12 py-5 font-headline text-xl uppercase text-white transition-colors hover:bg-accent-crimson"
          >
            {enrollmentSuccess?.primaryButton}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-8 py-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant transition-colors hover:text-primary"
          >
            {enrollmentSuccess?.secondaryButton}
          </button>
        </div>
      </section>
    </main>
  );
}

function DashboardCard({ title, value, meta, icon, tone = "primary" }) {
  return (
    <article className="relative border border-white/10 bg-surface-container p-5">
      <CornerMarks />
      <div className="mb-5 flex items-center justify-between">
        <div className="font-mono text-[10px] font-bold uppercase text-on-surface-variant">{title}</div>
        <Icon name={icon} className={tone === "red" ? "text-primary" : "text-on-surface-variant"} />
      </div>
      <div className="font-mono text-3xl font-bold text-ui-silver">{value}</div>
      <div className="mt-2 font-body text-sm text-on-surface-variant">{meta}</div>
    </article>
  );
}

function BmiCalculationModule() {
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("70");

  const heightNumber = Number.parseFloat(height);
  const weightNumber = Number.parseFloat(weight);
  const hasValidInput = heightNumber > 0 && weightNumber > 0;
  const bmi = hasValidInput ? weightNumber / (heightNumber / 100) ** 2 : 0;
  const roundedBmi = hasValidInput ? bmi.toFixed(1) : "--";

  let category = "Masukkan data";
  let categoryTone = "text-on-surface-variant";
  let recommendation = "Isi tinggi dan berat badan untuk melihat estimasi BMI Anda.";

  if (hasValidInput) {
    if (bmi < 18.5) {
      category = "Underweight";
      categoryTone = "text-yellow-300";
      recommendation = "Fokus pada surplus kalori ringan, protein cukup, dan strength training progresif.";
    } else if (bmi < 25) {
      category = "Normal";
      categoryTone = "text-green-400";
      recommendation = "Pertahankan pola latihan, tidur cukup, hidrasi, dan nutrisi seimbang.";
    } else {
      category = "Overweight";
      categoryTone = "text-primary";
      recommendation = "Prioritaskan defisit kalori kecil, latihan beban, dan cardio low impact secara konsisten.";
    }
  }

  const indicatorPosition = hasValidInput ? Math.min(Math.max(((bmi - 15) / 20) * 100, 0), 100) : 0;

  return (
    <article className="glass-panel relative overflow-hidden p-6 shadow-panel-glow">
      <div className="scan-line" />
      <CornerMarks />
      <div className="relative z-10 grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary-container/10 px-3 py-1 font-mono text-[10px] font-bold uppercase text-primary">
            <Icon name="straighten" className="text-sm" />
            BMI Calculation Module
          </div>
          <h3 className="font-headline text-3xl uppercase text-ui-silver">Body Index Scan</h3>
          <p className="mt-3 max-w-xl font-body text-sm leading-6 text-on-surface-variant">
            Hitung BMI berdasarkan tinggi dan berat badan untuk membaca kategori tubuh secara cepat. BMI adalah indikator
            umum, bukan diagnosis medis.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <label className="block">
              <span className="mb-2 block font-mono text-[10px] font-bold uppercase text-on-surface-variant">
                Height / CM
              </span>
              <div className="flex items-center border border-white/10 bg-surface/70 focus-within:border-primary focus-within:shadow-red-glow">
                <input
                  type="number"
                  min="1"
                  value={height}
                  onChange={(event) => setHeight(event.target.value)}
                  className="min-h-14 w-full bg-transparent px-4 font-mono text-2xl font-bold text-ui-silver outline-none"
                  aria-label="Height in centimeters"
                />
                <span className="pr-4 font-mono text-xs font-bold uppercase text-primary">CM</span>
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block font-mono text-[10px] font-bold uppercase text-on-surface-variant">
                Weight / KG
              </span>
              <div className="flex items-center border border-white/10 bg-surface/70 focus-within:border-primary focus-within:shadow-red-glow">
                <input
                  type="number"
                  min="1"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                  className="min-h-14 w-full bg-transparent px-4 font-mono text-2xl font-bold text-ui-silver outline-none"
                  aria-label="Weight in kilograms"
                />
                <span className="pr-4 font-mono text-xs font-bold uppercase text-primary">KG</span>
              </div>
            </label>
          </div>

          <div className="border border-white/10 bg-surface/70 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] font-bold uppercase text-on-surface-variant">BMI Score</div>
                <div className="mt-2 font-mono text-5xl font-bold leading-none text-ui-silver">{roundedBmi}</div>
              </div>
              <div className={`border border-white/10 bg-surface-container px-3 py-2 text-right font-mono text-[10px] font-bold uppercase ${categoryTone}`}>
                {category}
              </div>
            </div>

            <div className="mt-6">
              <div className="relative h-3 overflow-hidden bg-white/10">
                <div className="absolute inset-y-0 left-0 w-[28%] bg-yellow-300/70" />
                <div className="absolute inset-y-0 left-[28%] w-[32%] bg-green-500/70" />
                <div className="absolute inset-y-0 left-[60%] right-0 bg-primary/80" />
                {hasValidInput ? (
                  <div
                    className="absolute -top-1 h-5 w-1 bg-white shadow-[0_0_14px_rgba(255,255,255,0.72)]"
                    style={{ left: `${indicatorPosition}%` }}
                  />
                ) : null}
              </div>
              <div className="mt-2 flex justify-between font-mono text-[9px] uppercase text-on-surface-variant">
                <span>Under</span>
                <span>Normal</span>
                <span>Over</span>
              </div>
            </div>

            <p className="mt-5 border-l-2 border-primary bg-surface-container/70 p-4 font-body text-sm leading-6 text-on-surface-variant">
              {recommendation}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function DashboardOverview({ onAskFitBot }) {
  const { dashboard } = useContent();
  const overview = dashboard?.overview || {};
  const performance = overview.performance || {};
  const insight = overview.insight || {};

  return (
    <section className="relative z-10 mx-auto max-w-[1440px] space-y-8 px-margin-mobile py-8 lg:px-margin-desktop">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 border border-primary/40 bg-primary-container/10 px-3 py-1 font-mono text-[10px] font-bold uppercase text-primary">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            {overview.badge}
          </div>
          <h2 className="font-display text-5xl uppercase leading-none text-ui-silver md:text-6xl">
            {overview.title}
          </h2>
          <p className="mt-3 max-w-2xl font-body text-on-surface-variant">
            {overview.description}
          </p>
        </div>
        <button
          type="button"
          onClick={onAskFitBot}
          className="self-start border-b-4 border-black bg-primary-container px-8 py-4 font-headline text-lg uppercase text-white transition-all hover:bg-accent-crimson active:translate-y-1 active:border-b-0 xl:self-auto"
        >
          {overview.cta}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 xl:grid-cols-4">
        {(overview.cards || []).map((card) => (
          <DashboardCard key={card.title} {...card} />
        ))}
      </div>

      <BmiCalculationModule />

      <div className="grid grid-cols-1 gap-gutter xl:grid-cols-[1.35fr_0.65fr]">
        <article className="relative border border-white/10 bg-surface-container p-6">
          <CornerMarks />
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase text-primary">{performance.eyebrow}</div>
              <h3 className="mt-1 font-headline text-3xl uppercase">{performance.title}</h3>
            </div>
            <div className="font-mono text-xs uppercase text-on-surface-variant">{performance.dateRange}</div>
          </div>
          <div className="flex h-72 items-end gap-3 border-b border-white/10 pb-6">
            {(performance.bars || []).map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-3">
                <div className="relative flex h-56 w-full items-end bg-surface/70">
                  <div className="w-full bg-gradient-to-t from-primary-container to-primary" style={{ height: `${height}%` }} />
                </div>
                <span className="font-mono text-[10px] uppercase text-on-surface-variant">
                  {performance.days?.[index]}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {(performance.summary || []).map((item) => (
              <div key={item.label} className="border border-white/5 bg-surface/60 p-4">
                <div className="font-mono text-[10px] font-bold uppercase text-on-surface-variant">{item.label}</div>
                <div className="mt-2 font-mono text-lg font-bold text-ui-silver">{item.value}</div>
              </div>
            ))}
          </div>
        </article>

        <article className="glass-panel relative overflow-hidden p-6 shadow-panel-glow">
          <div className="scan-line" />
          <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="flex h-11 w-11 items-center justify-center bg-primary-container text-white">
              <Icon name="psychology" fill />
            </div>
            <div>
              <div className="font-mono text-xs font-bold uppercase text-primary">{insight.eyebrow}</div>
              <div className="font-mono text-[10px] uppercase text-green-400">{insight.status}</div>
            </div>
          </div>
          <div className="space-y-4 font-body text-sm leading-6 text-on-surface-variant">
            <p>
              {insight.body}
            </p>
            <div className="border-l-2 border-primary bg-surface/70 p-4 text-on-surface">
              {insight.focus}
            </div>
          </div>
          <button
            type="button"
            onClick={onAskFitBot}
            className="mt-6 w-full border border-primary px-4 py-3 font-mono text-xs font-bold uppercase text-primary transition-colors hover:bg-primary-container hover:text-white"
          >
            {insight.button}
          </button>
        </article>
      </div>
    </section>
  );
}

function TrainingPage({ onAskFitBot }) {
  const { schedule, training } = useContent();
  const classCards = schedule?.classCards || [];
  const header = training?.header || {};
  const currentSet = training?.currentSet || {};
  const performance = training?.performance || {};
  const history = training?.history || {};
  const library = training?.library || {};
  const exercises = (library.exercises || []).map((exercise) => ({
    ...exercise,
    image: exercise.image || classCards[exercise.imageIndex]?.image || classCards[0]?.image
  }));

  return (
    <section className="relative z-10 mx-auto max-w-[1440px] space-y-8 px-margin-mobile py-8 lg:px-margin-desktop">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="mb-4 inline-block bg-primary-container px-4 py-2 font-mono text-xs font-bold uppercase text-white">
            {header.badge}
          </div>
          <h2 className="font-headline text-4xl uppercase text-ui-silver">{header.title}</h2>
          <p className="mt-2 font-body text-lg text-on-surface-variant">
            {header.description}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {(header.metrics || []).map((metric) => (
            <div key={metric.label} className="border border-white/10 bg-surface-container p-5">
              <div className="font-mono text-[10px] font-bold uppercase text-on-surface-variant">{metric.label}</div>
              <div className="mt-2 font-mono text-2xl font-bold text-primary">{metric.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-gutter xl:grid-cols-[360px_1fr]">
        <div className="space-y-gutter">
          <article className="border border-white/10 bg-surface-container p-8">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="font-headline text-2xl uppercase italic">{currentSet.title}</h3>
              <span className="font-mono text-xs font-bold uppercase text-primary">{currentSet.repsRemaining}</span>
            </div>
            <div className="mb-8 grid grid-cols-2 gap-8">
              {(currentSet.stats || []).map((stat, index) => (
                <div key={stat.label} className={index > 0 ? "border-l border-white/10 pl-8" : ""}>
                  <div className="font-mono text-[10px] font-bold uppercase text-on-surface-variant">{stat.label}</div>
                  <div className="font-headline text-5xl">
                    {stat.value}
                    {stat.unit ? <span className="text-xl">{stat.unit}</span> : null}
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-8 bg-surface p-5">
              <div className="mb-3 flex justify-between font-mono text-xs uppercase">
                <span>{currentSet.restLabel}</span>
                <span className="text-primary">{currentSet.restTime}</span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                {(currentSet.restSegments || []).map((width, index) => (
                  <div key={index} className="h-3 bg-white/10">
                    <div className="h-full bg-primary" style={{ width: `${width}%` }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-white py-4 font-headline text-sm uppercase text-surface">{currentSet.primaryButton}</button>
              <button className="border-2 border-white py-4 font-headline text-sm uppercase text-white">{currentSet.secondaryButton}</button>
            </div>
          </article>

          <article className="border border-white/10 bg-surface-container p-8">
            <h3 className="mb-6 font-headline text-2xl uppercase">{performance.title}</h3>
            <div className="mb-6 flex items-end justify-between">
              <span className="font-mono text-xs uppercase text-on-surface-variant">{performance.label}</span>
              <span className="font-mono text-2xl font-bold">{performance.value} <span className="text-xs">{performance.unit}</span></span>
            </div>
            <div className="flex h-24 items-end gap-3">
              {(performance.bars || []).map((height, index) => (
                <div key={index} className={`flex-1 ${index === 2 || index === 5 ? "bg-primary" : "bg-white/10"}`} style={{ height: `${height}%` }} />
              ))}
            </div>
          </article>

          <article className="border border-white/10 bg-surface-container p-8">
            <h3 className="mb-5 font-headline text-2xl uppercase">{history.title}</h3>
            <div className="mb-5 grid grid-cols-7 gap-2 font-mono text-xs text-center text-on-surface-variant">
              {(history.days || []).map((day) => (
                <span key={day} className={day === history.activeDay ? "bg-primary-container py-2 text-white" : "bg-surface py-2"}>{day}</span>
              ))}
            </div>
            <div className="border-l-2 border-primary bg-surface p-4 font-body text-sm">{history.lastSession}</div>
          </article>
        </div>

        <div>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-headline text-4xl uppercase">{library.title}</h3>
            <div className="flex flex-wrap gap-2">
              {(library.filters || []).map((filter, index) => (
                <button key={filter} className={`px-5 py-3 font-mono text-xs font-bold uppercase ${index === 0 ? "bg-primary text-surface" : "bg-surface-container-high text-on-surface-variant"}`}>
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 xl:grid-cols-3">
            {exercises.map((exercise) => (
              <article key={exercise.title} className="border border-white/10 bg-surface-container">
                <div className="relative aspect-[4/3] overflow-hidden border-t-4 border-primary">
                  <img className="h-full w-full object-cover grayscale" src={exercise.image} alt={exercise.title} />
                </div>
                <div className="space-y-4 p-6">
                  <div className="inline-block border border-primary px-3 py-1 font-mono text-[10px] uppercase text-primary">{exercise.tag}</div>
                  <h4 className="font-headline text-2xl uppercase">{exercise.title}</h4>
                  <p className="font-body text-sm leading-6 text-on-surface-variant">{exercise.body}</p>
                  <button className="w-full border-b-4 border-primary-container bg-white py-4 font-headline text-sm uppercase text-surface">
                    {library.startButton}
                  </button>
                </div>
              </article>
            ))}
            <article className="flex min-h-[420px] flex-col items-center justify-center border border-dashed border-primary/50 bg-surface-container p-8 text-center">
              <Icon name="psychology" fill className="mb-6 text-4xl text-primary" />
              <h4 className="font-headline text-2xl uppercase">{library.suggested?.title}</h4>
              <p className="mt-4 font-body text-sm leading-6 text-on-surface-variant">
                {library.suggested?.body}
              </p>
              <button onClick={onAskFitBot} className="mt-8 border-b border-primary px-4 py-3 font-mono text-xs uppercase text-primary">
                {library.suggested?.button}
              </button>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function DietPlanGenerator() {
  const { nutrition } = useContent();
  const generator = nutrition?.dietPlanGenerator || {};
  const defaults = generator.defaults || {};
  const [goal, setGoal] = useState(defaults.goal || "");
  const [preferences, setPreferences] = useState(defaults.preferences || "");
  const [restrictions, setRestrictions] = useState(defaults.restrictions || "");
  const [calorieTarget, setCalorieTarget] = useState(defaults.calorieTarget || "2200");
  const [mealCount, setMealCount] = useState(defaults.mealCount || "4");
  const [plan, setPlan] = useState("");
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleGenerate(event) {
    event.preventDefault();
    setError("");
    setPlan("");
    setIsGenerating(true);

    try {
      const response = await fetch("/api/diet-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          goal,
          preferences,
          restrictions,
          calorieTarget: Number(calorieTarget),
          mealCount: Number(mealCount)
        })
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error || "Diet plan belum bisa dibuat sekarang.");
      }

      setPlan(payload.plan || "Diet plan belum tersedia. Coba ubah input dan generate ulang.");
    } catch (requestError) {
      setError(requestError?.message || "Koneksi ke Diet Planner gagal. Periksa backend dan API key.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <article className="relative overflow-hidden border border-white/10 bg-surface-container p-8 shadow-panel-glow">
      <div className="scan-line" />
      <CornerMarks />
      <div className="relative z-10 grid grid-cols-1 gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 border border-primary/40 bg-primary-container/10 px-3 py-1 font-mono text-[10px] font-bold uppercase text-primary">
            <Icon name="task_alt" className="text-sm" />
            Diet Plan Generation Logic
          </div>
          <h3 className="font-headline text-3xl uppercase text-ui-silver">AI Meal Plan Generator</h3>
          <p className="mt-3 font-body text-sm leading-6 text-on-surface-variant">
            Buat rencana makan harian berdasarkan goal, preferensi makanan, batasan diet, dan target kalori. Output
            dibuat oleh Gemini lewat backend proxy supaya API key tetap aman.
          </p>

          <form onSubmit={handleGenerate} className="mt-7 space-y-4">
            <label className="block">
              <span className="mb-2 block font-mono text-[10px] font-bold uppercase text-on-surface-variant">
                User Goal
              </span>
              <textarea
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                rows={2}
                className="w-full resize-none border border-white/10 bg-surface p-4 font-body text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary focus:shadow-red-glow"
                placeholder="Contoh: fat loss, muscle gain, maintain weight..."
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-mono text-[10px] font-bold uppercase text-on-surface-variant">
                Dietary Preferences
              </span>
              <textarea
                value={preferences}
                onChange={(event) => setPreferences(event.target.value)}
                rows={2}
                className="w-full resize-none border border-white/10 bg-surface p-4 font-body text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary focus:shadow-red-glow"
                placeholder="Contoh: tinggi protein, vegetarian, makanan lokal..."
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-mono text-[10px] font-bold uppercase text-on-surface-variant">
                Restriction / Allergy
              </span>
              <input
                value={restrictions}
                onChange={(event) => setRestrictions(event.target.value)}
                className="w-full border border-white/10 bg-surface p-4 font-body text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary focus:shadow-red-glow"
                placeholder="Contoh: tanpa seafood, lactose intolerant, tidak ada alergi..."
              />
            </label>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label>
                <span className="mb-2 block font-mono text-[10px] font-bold uppercase text-on-surface-variant">
                  Calorie Target
                </span>
                <div className="flex items-center border border-white/10 bg-surface focus-within:border-primary focus-within:shadow-red-glow">
                  <input
                    type="number"
                    min="1000"
                    max="6000"
                    value={calorieTarget}
                    onChange={(event) => setCalorieTarget(event.target.value)}
                    className="min-h-12 w-full bg-transparent px-4 font-mono text-lg font-bold text-ui-silver outline-none"
                    required
                  />
                  <span className="pr-4 font-mono text-[10px] font-bold uppercase text-primary">KCAL</span>
                </div>
              </label>

              <label>
                <span className="mb-2 block font-mono text-[10px] font-bold uppercase text-on-surface-variant">
                  Meals / Day
                </span>
                <select
                  value={mealCount}
                  onChange={(event) => setMealCount(event.target.value)}
                  className="min-h-12 w-full border border-white/10 bg-surface px-4 font-mono text-sm font-bold text-ui-silver outline-none transition-colors focus:border-primary focus:shadow-red-glow"
                >
                  {[3, 4, 5, 6].map((count) => (
                    <option key={count} value={count}>
                      {count} meals
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-primary-container px-6 py-4 font-headline text-lg uppercase text-white transition-all hover:bg-accent-crimson disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGenerating ? "Generating Meal Plan..." : "Generate Daily Meal Plan"}
            </button>
          </form>
        </div>

        <div className="flex min-h-[560px] flex-col border border-white/10 bg-surface/70">
          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase text-primary">Gemini Nutrition Output</div>
              <div className="mt-1 font-body text-sm text-on-surface-variant">Daily meal plan + calorie guidance</div>
            </div>
            <Icon name="restaurant_menu" className="text-primary" />
          </div>

          <div className="chat-scroll min-h-0 flex-1 overflow-y-auto p-5">
            {isGenerating ? (
              <div className="border-l-2 border-primary bg-surface-container p-5 font-mono text-sm text-on-surface">
                Menyusun diet plan dengan Gemini
                <span className="terminal-cursor ml-2 align-middle" />
              </div>
            ) : error ? (
              <div className="border-l-2 border-error bg-error-container/20 p-5 font-body text-sm leading-6 text-error">
                {error}
              </div>
            ) : plan ? (
              <pre className="whitespace-pre-wrap bg-transparent font-body text-sm leading-7 text-on-surface">
                {plan}
              </pre>
            ) : (
              <div className="space-y-4 font-body text-sm leading-6 text-on-surface-variant">
                <p>
                  Isi goal dan preferensi makanan, lalu klik generate. Hasil akan muncul di panel ini dalam format
                  ringkasan target, meal plan harian, calorie guidance, dan catatan aman.
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {(generator.badges || []).map((item) => (
                    <div key={item} className="border border-white/5 bg-surface-container p-4 font-mono text-[10px] font-bold uppercase text-primary">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function NutritionPage({ onAskFitBot }) {
  const { nutrition } = useContent();
  const header = nutrition?.header || {};
  const macros = nutrition?.macros || {};
  const hydration = nutrition?.hydration || {};
  const scan = nutrition?.scan || {};
  const coachSuggestion = nutrition?.coachSuggestion || {};

  return (
    <section className="relative z-10 mx-auto max-w-[1440px] space-y-8 px-margin-mobile py-8 lg:px-margin-desktop">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="font-mono text-sm font-bold uppercase text-primary">{header.eyebrow}</div>
          <h2 className="mt-2 font-display text-5xl uppercase leading-none text-ui-silver md:text-6xl">
            {header.title}
          </h2>
        </div>
        <div className="flex gap-10 font-mono">
          {(header.budgets || []).map((budget) => (
            <div key={budget.label}>
              <div className="text-xs uppercase text-on-surface-variant">{budget.label}</div>
              <div className={`text-3xl font-bold ${budget.tone === "primary" ? "text-primary" : ""}`}>
                {budget.value} <span className="text-sm">{budget.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-gutter xl:grid-cols-[1fr_380px]">
        <div className="space-y-gutter">
          <article className="relative border border-white/10 bg-surface-container p-8">
            <CornerMarks />
            <div className="mb-8 flex justify-between">
              <h3 className="font-mono text-lg font-bold">{macros.title}</h3>
              <Icon name="monitoring" className="text-primary" />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {(macros.items || []).map((macro) => (
                <div key={macro.label}>
                  <div className="mb-3 flex items-end gap-2 font-mono">
                    <span className="text-3xl">{macro.value}</span>
                    <span className="text-sm text-on-surface-variant">/ {macro.target}</span>
                  </div>
                  <div className="mb-2 h-3 bg-white/10">
                    <div className="h-full bg-primary-container" style={{ width: `${macro.percent}%` }} />
                  </div>
                  <div className="font-mono text-xs uppercase text-primary">{macro.percent}% target reached</div>
                </div>
              ))}
            </div>
          </article>

          <DietPlanGenerator />

          {(nutrition?.meals || []).map((mealItem) => (
            <article key={mealItem.meal} className="border border-white/10 bg-surface-container">
              <div className="flex items-center justify-between border-b border-white/10 p-8">
                <div className="flex items-center gap-4">
                  <Icon name={mealItem.icon} className="text-primary" />
                  <h3 className="font-headline text-3xl uppercase">{mealItem.meal}</h3>
                </div>
                <div className="font-mono text-lg text-primary">{mealItem.kcal}</div>
              </div>
              <div className="space-y-3 p-8">
                {mealItem.entries.map((entry) => (
                  <div key={entry.name} className="flex justify-between font-body text-sm">
                    <span>{entry.name}</span>
                    <span className="font-mono text-primary">{entry.kcal}</span>
                  </div>
                ))}
                <button className="mt-4 w-full border border-white/10 py-3 font-mono text-xs uppercase text-on-surface-variant hover:border-primary hover:text-primary">
                  + Add Entry
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="space-y-gutter">
          <article className="border border-white/10 bg-primary-container/30 p-8 text-center">
            <div className="mb-8 text-left font-mono text-sm font-bold uppercase">{hydration.title}</div>
            <div className="font-headline text-6xl">{hydration.value}</div>
            <div className="font-mono text-sm uppercase">{hydration.unit}</div>
            <button className="mt-8 w-full border border-primary px-4 py-3 font-mono text-xs uppercase text-primary">
              {hydration.button}
            </button>
          </article>
          <button className="flex w-full items-center gap-5 bg-primary-container p-8 text-left text-white">
            <Icon name="barcode_scanner" className="text-4xl" />
            <span>
              <span className="block font-mono text-sm font-bold uppercase">{scan.title}</span>
              <span className="font-body text-sm opacity-80">{scan.body}</span>
            </span>
          </button>
          <article className="border border-white/10 bg-surface-container p-8">
            <div className="mb-6 font-mono text-sm font-bold uppercase text-primary">{coachSuggestion.title}</div>
            <div className="border-l-2 border-primary bg-surface p-5 font-body text-sm leading-6">
              {coachSuggestion.body}
              <strong className="text-primary"> {coachSuggestion.highlight}</strong>.
            </div>
            <button onClick={onAskFitBot} className="mt-6 w-full border border-primary px-4 py-3 font-mono text-xs uppercase text-primary">
              {coachSuggestion.button}
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}

function SettingsPage() {
  const { settings } = useContent();
  const header = settings?.header || {};
  const profile = settings?.profile || {};
  const membership = settings?.membership || {};
  const security = settings?.security || {};
  const alerts = settings?.alerts || {};
  const danger = settings?.danger || {};

  return (
    <section className="relative z-10 mx-auto max-w-[1440px] space-y-8 px-margin-mobile py-8 lg:px-margin-desktop">
      <div className="flex flex-col gap-6 border-b border-white/10 pb-8 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h2 className="font-display text-5xl uppercase leading-none text-ui-silver md:text-6xl">
            {header.title}
          </h2>
          <p className="mt-3 max-w-3xl font-body text-lg text-on-surface-variant">
            {header.description}
          </p>
        </div>
        <div className="flex gap-4">
          <button className="border-2 border-white px-8 py-4 font-mono text-xs font-bold uppercase text-white">{header.buttons?.[0]}</button>
          <button className="bg-primary-container px-8 py-4 font-mono text-xs font-bold uppercase text-white">{header.buttons?.[1]}</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-gutter xl:grid-cols-[1fr_380px]">
        <article className="relative border border-white/10 bg-surface-container p-8">
          <CornerMarks />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[180px_1fr]">
            <img
              className="aspect-square w-full object-cover grayscale"
              src={profile.image}
              alt={profile.imageAlt}
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <label>
                <span className="mb-3 block font-mono text-xs uppercase text-on-surface-variant">{profile.identityLabel}</span>
                <input className="w-full border border-white/10 bg-surface p-4 font-body text-lg outline-none focus:border-primary" defaultValue={profile.identityValue} />
              </label>
              <div>
                <div className="mb-3 font-mono text-xs uppercase text-on-surface-variant">{profile.systemIdLabel}</div>
                <div className="font-mono text-2xl text-primary">{profile.systemId}</div>
              </div>
              <label>
                <span className="mb-3 block font-mono text-xs uppercase text-on-surface-variant">{profile.sportLabel}</span>
                <select className="w-full border border-white/10 bg-surface p-4 font-body outline-none focus:border-primary" defaultValue="hyrox">
                  {(profile.sports || []).map((sport) => (
                    <option key={sport.value} value={sport.value}>{sport.label}</option>
                  ))}
                </select>
              </label>
              <div>
                <div className="mb-3 font-mono text-xs uppercase text-on-surface-variant">{profile.syncLabel}</div>
                <div className="border border-white/10 bg-surface p-4 font-mono text-sm text-green-400">{profile.syncStatus}</div>
              </div>
            </div>
          </div>
        </article>

        <article className="border border-white/10 bg-surface-container p-8">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-headline text-3xl uppercase text-primary">{membership.title}</h3>
            <span className="bg-primary px-3 py-1 font-mono text-[10px] uppercase text-surface">{membership.status}</span>
          </div>
          <p className="font-body leading-7 text-on-surface-variant">
            {membership.body}
          </p>
          <div className="mt-8 h-2 bg-surface">
            <div className="h-full bg-primary" style={{ width: `${membership.progress}%` }} />
          </div>
          <button className="mt-8 w-full border border-primary px-4 py-4 font-mono text-xs uppercase text-primary">
            {membership.button}
          </button>
        </article>
      </div>

      <div className="grid grid-cols-1 gap-gutter xl:grid-cols-2">
        <article className="border border-white/10 bg-surface-container p-8">
          <div className="mb-8 flex items-center gap-4">
            <Icon name="shield" className="text-primary" />
            <h3 className="font-headline text-3xl uppercase">{security.title}</h3>
          </div>
          {(security.items || []).map((item) => (
            <div key={item.title} className="mb-4 flex items-center justify-between border border-white/5 bg-surface p-5">
              <div>
                <div className="font-mono text-sm">{item.title}</div>
                <div className="font-body text-xs text-on-surface-variant">{item.body}</div>
              </div>
              <button className="font-mono text-xs uppercase text-primary">{item.action}</button>
            </div>
          ))}
        </article>

        <article className="border border-white/10 bg-surface-container p-8">
          <div className="mb-8 flex items-center gap-4">
            <Icon name="notifications_active" className="text-primary" />
            <h3 className="font-headline text-3xl uppercase">{alerts.title}</h3>
          </div>
          {(alerts.items || []).map((item) => (
            <div key={item.label} className="mb-6 flex items-center justify-between gap-4">
              <div className="font-mono text-sm">{item.label}</div>
              <div className={`flex h-8 w-16 items-center p-1 ${item.enabled ? "justify-end bg-primary-container" : "justify-start bg-surface"}`}>
                <span className="h-6 w-6 bg-ui-silver" />
              </div>
            </div>
          ))}
        </article>
      </div>

      <article className="flex flex-col gap-6 border border-primary/40 bg-primary-container/5 p-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="font-mono text-lg font-bold uppercase text-primary">{danger.title}</div>
          <p className="mt-2 font-body text-on-surface-variant">
            {danger.body}
          </p>
        </div>
        <button className="border-2 border-primary px-10 py-4 font-mono text-xs uppercase text-primary">{danger.button}</button>
      </article>
    </section>
  );
}

function DashboardPage({ onLogout, onAskFitBot }) {
  const [activePage, setActivePage] = useState("dashboard");
  const { dashboard } = useContent();
  const navItems = dashboard?.navItems || [];
  const sidebar = dashboard?.sidebar || {};
  const topbar = dashboard?.topbar || {};

  function renderActivePage() {
    if (activePage === "training") return <TrainingPage onAskFitBot={onAskFitBot} />;
    if (activePage === "nutrition") return <NutritionPage onAskFitBot={onAskFitBot} />;
    if (activePage === "settings") return <SettingsPage />;
    return <DashboardOverview onAskFitBot={onAskFitBot} />;
  }

  return (
    <div className="min-h-screen bg-surface-charcoal text-on-surface">
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-white/10 bg-surface-charcoal py-8 lg:flex">
        <div className="mb-12 px-6">
          <h1 className="font-display text-5xl uppercase tracking-normal text-accent-crimson">{sidebar.brand}</h1>
          <p className="mt-1 font-mono text-xs font-bold uppercase text-on-surface-variant">{sidebar.subtitle}</p>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const active = item.id === activePage;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActivePage(item.id)}
                className={`flex w-full items-center gap-4 px-6 py-4 text-left transition-colors ${
                  active
                    ? "translate-x-1 border-l-4 border-accent-crimson bg-primary-container/10 font-bold text-accent-crimson"
                    : "text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
                }`}
              >
                <Icon name={item.icon} />
                <span className="font-mono text-xs font-bold uppercase">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="mt-auto space-y-4 px-6">
          <div className="border border-white/10 bg-surface-container p-4">
            <div className="font-mono text-[10px] font-bold uppercase text-primary">{sidebar.memberEyebrow}</div>
            <div className="mt-1 font-body text-sm font-bold">{sidebar.memberName}</div>
          </div>
          <button className="w-full bg-accent-crimson py-3 font-headline text-sm uppercase tracking-normal text-white transition-all hover:brightness-110">
            {sidebar.upgradeLabel}
          </button>
          <div className="space-y-1 border-t border-white/5 pt-4">
            <button
              type="button"
              onClick={onLogout}
              className="flex w-full items-center gap-4 py-3 text-on-surface-variant transition-colors hover:text-primary"
            >
              <Icon name="logout" />
              <span className="font-mono text-xs font-bold uppercase">{sidebar.logoutLabel}</span>
            </button>
          </div>
        </div>
      </aside>

      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-background/80 px-margin-mobile backdrop-blur-md lg:left-64 lg:justify-end lg:px-margin-desktop">
        <div className="font-display text-2xl uppercase text-primary lg:hidden">{topbar.mobileBrand}</div>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onAskFitBot}
            title="Buka FitBot"
            className="text-on-surface-variant transition-colors hover:text-primary"
          >
            <Icon name="smart_toy" />
          </button>
          <button type="button" className="relative text-on-surface-variant transition-colors hover:text-primary">
            <Icon name="notifications" />
            <span className="absolute -right-1 -top-1 h-2 w-2 bg-accent-crimson" />
          </button>
          <div className="h-9 w-9 overflow-hidden border border-white/10 bg-surface-container-highest">
            <img
              className="h-full w-full object-cover"
              src={topbar.avatarImage}
              alt={topbar.avatarAlt}
            />
          </div>
        </div>
      </header>

      <main className="relative min-h-screen overflow-hidden pt-16 lg:ml-64">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute left-1/4 top-1/4 h-[420px] w-[420px] bg-accent-crimson/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[360px] w-[360px] bg-accent-crimson/5 blur-[100px]" />
          <div className="grid h-full w-full grid-cols-12">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-full border-r border-white/5" />
            ))}
          </div>
        </div>
        {renderActivePage()}
      </main>
    </div>
  );
}

function FloatingChat({ chatProps, isOpen, setIsOpen }) {
  const [suppressPreview, setSuppressPreview] = useState(false);
  const [launcherHovered, setLauncherHovered] = useState(false);
  const previewVisible = !isOpen && launcherHovered && !suppressPreview;

  function handleToggle() {
    setIsOpen((currentValue) => {
      const nextValue = !currentValue;
      setSuppressPreview(currentValue);
      setLauncherHovered(false);
      return nextValue;
    });
  }

  return (
    <div className="fixed bottom-6 right-4 z-[100] sm:bottom-8 sm:right-8">
      {isOpen ? (
        <div className="fitbot-floating-panel absolute bottom-full right-0 mb-4 w-[min(calc(100vw-2rem),430px)] origin-bottom-right">
          <FitBotChat {...chatProps} compact />
        </div>
      ) : (
        <div
          className={[
            "pointer-events-none absolute bottom-full right-0 mb-4 w-[min(calc(100vw-2rem),320px)] origin-bottom-right transition-all duration-200",
            previewVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0"
          ].join(" ")}
        >
          <div className="fitbot-preview">
            <div className="mb-3 flex items-center gap-3">
              <div className="fitbot-preview-icon">
                <Icon name="psychology" fill />
              </div>
              <div>
                <div className="font-mono text-[11px] font-bold uppercase text-primary">HYPERION AI COACH</div>
                <div className="font-mono text-[10px] uppercase text-green-400">Online</div>
              </div>
            </div>
            <div className="font-body text-sm leading-6 text-on-surface">
              FitBot siap bantu optimalkan latihan hari ini.
            </div>
          </div>
        </div>
      )}
      <button
        type="button"
        title={isOpen ? "Tutup FitBot" : "Buka FitBot"}
        onClick={handleToggle}
        onMouseEnter={() => {
          if (!suppressPreview) {
            setLauncherHovered(true);
          }
        }}
        onMouseLeave={() => {
          setLauncherHovered(false);
          setSuppressPreview(false);
        }}
        onFocus={() => {
          if (!suppressPreview) {
            setLauncherHovered(true);
          }
        }}
        onBlur={() => {
          setLauncherHovered(false);
          setSuppressPreview(false);
        }}
        className="fitbot-orb relative ml-auto flex h-16 w-16 items-center justify-center bg-primary-container text-white shadow-red-glow transition-all hover:scale-110 active:scale-95"
      >
        <Icon name={isOpen ? "close" : "psychology"} fill className="text-[32px]" />
        <span className="fitbot-status-dot absolute -right-1 -top-1 h-4 w-4 animate-pulse border-2 border-surface bg-green-500" />
      </button>
    </div>
  );
}

export default function App() {
  const [content, setContent] = useState(fallbackContent);
  const [messages, setMessages] = useState(fallbackContent.chat.initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [floatingOpen, setFloatingOpen] = useState(false);
  const [page, setPage] = useState("home");
  const [selectedPlan, setSelectedPlan] = useState(getDefaultPlan(fallbackContent));
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => {
    let isMounted = true;

    async function loadDynamicContent() {
      try {
        const response = await fetch("/api/content");
        if (!response.ok) return;
        const payload = await response.json();

        if (!isMounted) return;

        setContent(payload);
        setMessages((currentMessages) =>
          currentMessages.length === 1 && currentMessages[0]?.id === "welcome"
            ? payload.chat?.initialMessages || fallbackContent.chat.initialMessages
            : currentMessages
        );
      } catch {
        // Keep the bundled JSON available if the local content endpoint is not running.
      }
    }

    loadDynamicContent();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, []);

  function navigateHome(sectionId = "home") {
    if (sectionId === "home") {
      setActiveNav("home");
    }

    if (["training", "schedule", "pricing", "ai-coach"].includes(sectionId)) {
      setActiveNav(sectionId);
    }

    setPage("home");
    window.setTimeout(() => {
      if (sectionId === "home") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        return;
      }

      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  function openLogin() {
    setFloatingOpen(false);
    setPage("login");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openDashboard() {
    setFloatingOpen(false);
    setPage("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openEnrollment(plan) {
    setSelectedPlan(plan);
    setFloatingOpen(false);
    setPage("enrollment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function completeEnrollment() {
    setFloatingOpen(false);
    setPage("enrollmentSuccess");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function logout() {
    setFloatingOpen(false);
    navigateHome("home");
  }

  async function sendMessage(message) {
    const cleanMessage = message.trim();
    if (!cleanMessage || isLoading) return;

    const time = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit"
    });

    setError("");
    setMessages((current) => [
      ...current,
      {
        id: createId(),
        role: "user",
        text: cleanMessage,
        time
      }
    ]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: cleanMessage })
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error || "FitBot belum bisa menjawab sekarang.");
      }

      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          text: payload.reply || "Saya belum menemukan jawaban yang tepat. Coba perjelas target latihan Anda.",
          time: "NOW"
        }
      ]);
    } catch (requestError) {
      const messageText =
        requestError?.message || "Koneksi ke FitBot gagal. Periksa server dan konfigurasi API key.";
      setError(messageText);
      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          tone: "error",
          text: messageText,
          time: "ERROR"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  const chatProps = {
    messages,
    isLoading,
    error,
    onSend: sendMessage
  };

  return (
    <ContentContext.Provider value={content}>
      <div className="min-h-screen bg-surface text-on-surface">
        {!["dashboard", "enrollment", "enrollmentSuccess"].includes(page) ? (
          <Navigation activeNav={activeNav} onLoginClick={openLogin} onNavigateHome={navigateHome} />
        ) : null}
        {page === "dashboard" ? (
          <DashboardPage onLogout={logout} onAskFitBot={() => setFloatingOpen(true)} />
        ) : page === "enrollment" ? (
          <AthleteEnrollmentPage
            selectedPlan={selectedPlan}
            onSubmit={completeEnrollment}
            onBack={() => navigateHome("pricing")}
          />
        ) : page === "enrollmentSuccess" ? (
          <EnrollmentSuccessPage selectedPlan={selectedPlan} onBackHome={() => navigateHome("home")} />
        ) : page === "login" ? (
          <LoginPage onBackHome={() => navigateHome("pricing")} onLoginSuccess={openDashboard} />
        ) : (
          <>
            <Hero onOpenChat={() => setFloatingOpen(true)} />
            <AiCoachSection chatProps={chatProps} />
            <ScheduleSection />
            <HumanMachineSection />
            <PricingSection onSelectPlan={openEnrollment} />
            <Footer />
          </>
        )}
        <FloatingChat chatProps={chatProps} isOpen={floatingOpen} setIsOpen={setFloatingOpen} />
      </div>
    </ContentContext.Provider>
  );
}
