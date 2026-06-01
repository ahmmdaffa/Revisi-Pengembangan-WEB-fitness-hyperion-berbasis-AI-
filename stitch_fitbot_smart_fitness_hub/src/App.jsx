import { useEffect, useRef, useState } from "react";

const initialMessages = [
  {
    id: "welcome",
    role: "assistant",
    text:
      "Halo, saya FitBot. Saya bisa bantu susun workout, jadwal latihan, nutrisi, recovery, dan tracking progres Anda dengan pendekatan aman."
  }
];

const quickPrompts = [
  "Buatkan jadwal latihan 4 hari untuk fat loss",
  "Saya ingin tambah massa otot, mulai dari mana?",
  "Berikan ide menu tinggi protein untuk hari ini"
];

const demoCredentials = {
  email: "ahmmdaffa280904@gmail.com",
  password: "12345678"
};

const features = [
  {
    icon: "straighten",
    title: "FORM CORRECTION",
    body: "Analisis pola gerak untuk membantu menjaga teknik latihan tetap rapi dan mengurangi risiko cedera."
  },
  {
    icon: "restaurant",
    title: "BIO-NUTRITION",
    body: "Rencana makan dinamis berdasarkan target kalori, protein, jadwal latihan, dan preferensi harian."
  },
  {
    icon: "support_agent",
    title: "24/7 COGNITIVE SUPPORT",
    body: "Motivasi, strategi recovery, dan penyesuaian program saat energi atau jadwal Anda berubah."
  },
  {
    icon: "query_stats",
    title: "PREDICTIVE RESULTS",
    body: "Bantu membaca progres latihan dan memberi rekomendasi langkah berikutnya berdasarkan goal user."
  }
];

const classCards = [
  {
    tag: "AI-OPTIMIZED",
    title: "POWER YOGA",
    time: "MON - 08:00 AM",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAvI0MDl46SM4hEwrkquBXJ-tZwZDUYYkVk4c7Biu7lHaW6kkwGzn0VrYsQX2It4BEGapdxJLWfGDaXDeZLEYKJsW6sIK51yx5JjjmRvaT91AzlcyIiKG6wTOjuWBC6rmYZbtDyHDwbbeME_PIlZeLfuIHfjB4NEeqKnbCTd6nTFLz7egm83-0YHASuaJsE2Yb8LNDf9EPnQIi1_ZZIUAGzseDgm9JK_E1ymqci4hMqJmKVKpUwRDTbVp61AG3vjrrssGKBdP-LxdI"
  },
  {
    tag: "LIVE SESSION",
    title: "HIIT BLAST",
    time: "TUE - 06:30 PM",
    featured: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCKhgCVVjx5fR-z2z3c_Qp3UyQKLjC18ND7Qgg-w3ldsw_6D1qJNqfZOh1BFO5A1qqO8YlnZYmdSZWvkItXrdZrvehvffJmW6m08dpBkpIVhpjq2gZwrzYsuIOtK3MXkUX65cho6p8Z2XhyjLE1tEVbPf2vcq1tQMvGIm7XSajJ25aQgcELEtQrkuE4ZSNc-WXqN4DSwWClXeAZIUtMCAllxA8bLv7L4teXzjLYErm9T0MUnSOystnFoA_e28TrKyLCEtxTBC9IBZI"
  },
  {
    tag: "STRENGTH CORE",
    title: "AI STRENGTH",
    time: "THU - 05:00 PM",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTBntL8Nq11apMchtZVvgmj6K8Wagj59sTABv56W-sl5ftaLZleHeRwVMTDzJFq7JJpwhJAev9u7i1na5sgiBpC7-Z4mYzLAPi0ijjPJPYxx9IyDH3_4lpL3QNl9UKJE2pN8NUUGyZ8rUNrA6mbRe9h2DVY9Q0c9kQi27zJ3n0b6CgGgmWgFoI2CQmsSUvFEh7AOkik4do3msl_TJx3KnaU7le8CUByHWRIt1OjCcy6pj37HfFO4UV6Zmq0X7WZb7WqTDD1HvlTT8"
  }
];

const plans = [
  {
    title: "LITE",
    price: "Rp 499k",
    features: ["AI workout starter", "Weekly progress recap", "Basic nutrition prompts"]
  },
  {
    title: "PRO",
    price: "Rp 899k",
    featured: true,
    features: ["Unlimited FitBot chat", "Adaptive workout schedule", "Nutrition and recovery planner", "Progress analysis"]
  },
  {
    title: "ELITE",
    price: "Rp 1.5M",
    features: ["Coach review layer", "Advanced biometric notes", "Priority plan adjustment"]
  }
];

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
  const navItems = [
    { id: "training", label: "Training" },
    { id: "schedule", label: "Schedule" },
    { id: "pricing", label: "Pricing" },
    { id: "ai-coach", label: "AI Coach" }
  ];
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
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <img
          className="h-full w-full object-cover opacity-60"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPOi6HnjV8qX7kkkeI8kS9Kby1_Ol72XhFitTrusFofTx7-41ija4zVZ4iVedxPDdW8S5wSIEx-BiNEh4lKy70M1R46dFNLQGN0TwGilgcj3Jw0dg4KUWWwLBF81GgPj7yNgdy02IB3UbswdpoWzK1K1sFqqFvLSlSn87DYBMxyRyHDQcaTnQNVhJKmPSZov7CbRxVk74kpKl25jgQ1PCuxzSy1QtRJbXIgnZ2syQtOx73aX--768cvsad9CcGKCwJ4CRd2QW7oFU"
          alt="Athlete training in a dark futuristic gym with red lighting"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-surface/20" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-margin-mobile lg:px-margin-desktop">
        <div className="max-w-4xl space-y-6">
          <div className="inline-block bg-primary-container px-3 py-1 font-mono text-xs font-bold uppercase text-ui-silver">
            AI-POWERED PERFORMANCE
          </div>
          <h1 className="font-display text-5xl uppercase leading-none text-ui-silver md:text-7xl lg:text-[80px]">
            EVOLUSI KEBUGARAN ANDA MULAI DI SINI
          </h1>
          <p className="max-w-2xl font-body text-lg leading-7 text-on-surface-variant">
            Optimalkan setiap repetisi dengan analisis biometrik real-time. Pelatih AI kami menyesuaikan program
            latihan, nutrisi, dan recovery untuk target yang lebih terukur.
          </p>
          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <button
              type="button"
              onClick={onOpenChat}
              className="border-b-4 border-black bg-primary-container px-10 py-4 font-headline text-xl uppercase text-white transition-all hover:bg-accent-crimson active:translate-y-1 active:border-b-0"
            >
              Mulai Dengan FitBot
            </button>
            <a
              href="#ai-coach"
              className="border-2 border-ui-silver px-10 py-4 text-center font-headline text-xl uppercase text-ui-silver transition-all hover:bg-ui-silver hover:text-surface"
            >
              Lihat AI Coach
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 right-margin-desktop hidden lg:block">
        <div className="glass-panel space-y-2 border-l-4 border-primary p-6">
          <div className="font-mono text-xs font-bold uppercase text-primary">SYSTEM STATUS</div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse bg-green-500" />
            <span className="font-mono text-sm font-bold">AI CORE: ONLINE</span>
          </div>
          <div className="font-body text-xs text-on-surface-variant">Active Members: 1,248</div>
        </div>
      </div>
    </section>
  );
}

function AiCoachSection({ chatProps }) {
  return (
    <section id="ai-coach" className="relative overflow-hidden bg-surface-charcoal py-stack-lg">
      <div className="mx-auto max-w-[1440px] px-margin-mobile lg:px-margin-desktop">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <h2 className="border-l-8 border-primary pl-6 font-headline text-4xl uppercase text-primary">
              COACH AI: LEBIH DARI SEKADAR APLIKASI
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
  return (
    <section id="schedule" className="bg-surface py-stack-lg">
      <div className="mx-auto max-w-[1440px] px-margin-mobile lg:px-margin-desktop">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mb-2 font-headline text-4xl uppercase">JADWAL KELAS</h2>
            <p className="font-body text-on-surface-variant">Pilih sesi yang dioptimalkan oleh kecerdasan buatan.</p>
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
  return (
    <section id="training" className="border-y border-white/5 bg-surface-container-low py-stack-lg">
      <div className="mx-auto max-w-[1440px] px-margin-mobile lg:px-margin-desktop">
        <div className="flex flex-col items-center gap-12 md:flex-row lg:gap-16">
          <div className="relative w-full md:w-1/2">
            <div className="absolute -left-8 -top-8 -z-0 h-40 w-40 border-2 border-primary/20" />
            <img
              className="relative z-10 w-full border-2 border-white/10 grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVkGck9mh33369WrTUEvTALaxvinKqv7a3ClOE9g1O5InmBJfq9_KtHIYbn4KDPk-ZmHo6szOhxCVvQJ6nj3UIOTa0wyybAjnhemCAtZFl4PcSmCX2fcATzTFP1PhgFT4sy0qGahdAwI1Li_zMbGBHPy-JgK0wbgdTXJ5CoxXNqK5qHN2cm3c6I57s2Vlys7AiHfd-f-aWEMHPeNfiPjNF-lhsi-xqxW9vOUHa9U673X7QF9j4_6dfKP0tedTNhhgwvlGLH_Ebo5I"
              alt="Fitness trainer reviewing digital performance metrics"
            />
            <div className="glass-panel absolute bottom-6 right-6 z-20 border-l-4 border-primary p-4">
              <div className="font-headline text-xl uppercase">MARCUS VANE</div>
              <div className="font-mono text-[10px] font-bold uppercase text-primary">ELITE PERFORMANCE COACH</div>
            </div>
          </div>
          <div className="w-full space-y-8 md:w-1/2">
            <h2 className="font-headline text-4xl uppercase">DUET MANUSIA & MESIN</h2>
            <p className="font-body text-lg leading-7 text-on-surface-variant">
              Trainer menginterpretasikan data AI untuk memberi sentuhan manusiawi pada perjalanan kebugaran. Motivasi,
              empati, dan keahlian teknis berpadu dengan presisi algoritma.
            </p>
            <ul className="space-y-4">
              {[
                ["STRATEGI PEMULIHAN PERSONAL", "Optimalkan waktu istirahat berdasarkan pola latihan dan energi harian."],
                ["KOREKSI POSTUR DINAMIS", "Bimbingan teknik yang mendukung latihan lebih efisien dan konsisten."]
              ].map(([title, body]) => (
                <li key={title} className="group flex items-center gap-4">
                  <span className="h-10 w-2 bg-primary transition-all group-hover:w-4" />
                  <div>
                    <div className="font-headline text-lg uppercase">{title}</div>
                    <div className="font-body text-sm text-on-surface-variant">{body}</div>
                  </div>
                </li>
              ))}
            </ul>
            <a
              href="#ai-coach"
              className="inline-block bg-ui-silver px-8 py-3 font-headline text-lg uppercase text-surface transition-all hover:bg-primary-container hover:text-white"
            >
              Jadwalkan Konsultasi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection({ onSelectPlan }) {
  return (
    <section id="pricing" className="relative overflow-hidden bg-surface py-stack-lg">
      <div className="absolute right-0 top-0 h-full w-1/3 origin-top translate-x-20 -skew-x-12 bg-primary/5" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-margin-mobile lg:px-margin-desktop">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-headline text-4xl uppercase">PILIH PAKET PERFORMA ANDA</h2>
          <div className="flex justify-center gap-4 font-mono text-xs font-bold uppercase">
            <span className="border border-primary px-2 text-primary">Monthly</span>
            <span className="text-on-surface-variant">Yearly save 20%</span>
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
                  Most Popular
                </div>
              ) : null}
              <div className="mb-2 font-headline text-2xl uppercase">{plan.title}</div>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="font-headline text-4xl">{plan.price}</span>
                <span className="font-mono text-xs uppercase opacity-70">/bulan</span>
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
  return (
    <footer className="border-t border-white/10 bg-surface-container-lowest py-stack-lg">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-gutter px-margin-mobile md:grid-cols-4 lg:px-margin-desktop">
        <div className="space-y-4">
          <div className="font-display text-3xl uppercase text-primary">HYPERION AI</div>
          <p className="font-body text-sm leading-6 text-on-surface-variant">
            Masa depan kebugaran adalah personal, data-driven, dan didukung AI.
          </p>
          <div className="flex gap-4">
            {["share", "public"].map((icon) => (
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
        {[
          ["TAUTAN CEPAT", ["Training", "AI Coach", "Schedule", "Location Finder"]],
          ["SUPPORT", ["Privacy Policy", "Terms of Service", "Support Center", "FAQ"]]
        ].map(([title, links]) => (
          <div key={title} className="space-y-4">
            <div className="font-headline text-lg uppercase">{title}</div>
            <ul className="space-y-2 font-body text-sm">
              {links.map((link) => (
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
          <div className="font-headline text-lg uppercase">NEWSLETTER</div>
          <p className="font-body text-sm text-on-surface-variant">Dapatkan update teknologi kebugaran terbaru.</p>
          <div className="relative">
            <input
              className="w-full border-b border-white/20 bg-surface p-2 pr-14 text-sm outline-none transition-colors focus:border-primary"
              placeholder="Email Anda"
              type="email"
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 font-body font-bold text-primary">
              JOIN
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1440px] flex-col items-center justify-between gap-4 border-t border-white/5 px-margin-mobile pt-8 lg:flex-row lg:px-margin-desktop">
        <div className="font-mono text-[10px] uppercase text-on-surface-variant">
          2026 HYPERION AI FITNESS. ENGINEERED FOR PERFORMANCE.
        </div>
        <div className="flex gap-6 font-mono text-[10px] uppercase">
          <span>Jakarta</span>
          <span>Singapore</span>
          <span>Tokyo</span>
        </div>
      </div>
    </footer>
  );
}

function LoginPage({ onBackHome, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [hasError, setHasError] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const isValid =
      email.trim().toLowerCase() === demoCredentials.email &&
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
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVkGck9mh33369WrTUEvTALaxvinKqv7a3ClOE9g1O5InmBJfq9_KtHIYbn4KDPk-ZmHo6szOhxCVvQJ6nj3UIOTa0wyybAjnhemCAtZFl4PcSmCX2fcATzTFP1PhgFT4sy0qGahdAwI1Li_zMbGBHPy-JgK0wbgdTXJ5CoxXNqK5qHN2cm3c6I57s2Vlys7AiHfd-f-aWEMHPeNfiPjNF-lhsi-xqxW9vOUHa9U673X7QF9j4_6dfKP0tedTNhhgwvlGLH_Ebo5I"
          alt="Hyperion athlete access background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-surface/40" />
      </div>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] max-w-[1440px] grid-cols-1 items-center gap-12 px-margin-mobile py-stack-lg lg:grid-cols-[1fr_520px] lg:px-margin-desktop">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-3 border border-primary/50 bg-primary-container/15 px-3 py-2 font-mono text-xs font-bold uppercase text-primary">
            <span className="h-2 w-2 animate-pulse bg-green-500" />
            Secure Athlete Access
          </div>
          <div className="space-y-4">
            <h1 className="font-display text-5xl uppercase leading-none text-ui-silver md:text-7xl">
              MASUK KE HYPERION FIT
            </h1>
            <p className="max-w-2xl font-body text-lg leading-7 text-on-surface-variant">
              Akses dashboard latihan, rencana nutrisi, progres performa, dan sesi AI coaching personal dalam satu
              ruang premium.
            </p>
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              ["AI", "Coach Online"],
              ["24/7", "Progress Sync"],
              ["PRO", "Training Hub"]
            ].map(([metric, label]) => (
              <div key={label} className="border border-white/10 bg-surface-container/70 p-4">
                <div className="font-mono text-2xl font-bold text-primary">{metric}</div>
                <div className="mt-1 font-mono text-[10px] font-bold uppercase text-on-surface-variant">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel relative overflow-hidden p-6 shadow-panel-glow md:p-8">
          <CornerMarks />
          <div className="scan-line" />
          <div className="mb-8 border-b border-white/10 pb-6">
            <div className="mb-2 font-mono text-xs font-bold uppercase text-primary">Member Login</div>
            <h2 className="font-headline text-3xl uppercase text-ui-silver">ATHLETE PORTAL</h2>
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
              Kembali ke Join Now
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

function AthleteEnrollmentPage({ selectedPlan, onSubmit, onBack }) {
  const plan = selectedPlan || plans[1];

  return (
    <div className="min-h-screen bg-surface-charcoal text-on-surface">
      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-background/80 px-margin-mobile backdrop-blur-md lg:px-margin-desktop">
        <button
          type="button"
          onClick={onBack}
          className="font-mono text-xs font-bold uppercase text-on-surface-variant transition-colors hover:text-primary"
        >
          Kembali
        </button>
        <div className="flex items-center gap-6">
          <span className="font-mono text-xs uppercase text-primary">Selected Plan: {plan.title}</span>
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
                Athlete Enrollment
              </h2>
              <p className="mt-2 font-mono text-xs font-bold uppercase text-on-surface-variant">
                Secure system initialization // bio-data entry
              </p>
            </div>

            <div className="grid grid-cols-1 gap-stack-md md:grid-cols-2">
              {[
                ["Athlete Name", "ENTER FULL LEGAL NAME", "text"],
                ["System Email", "ENCRYPTED ADDRESS", "email"],
                ["Comm Link / WA", "+62 MOBILE ACCESS CODE", "tel"]
              ].map(([label, placeholder, type]) => (
                <label key={label} className="col-span-full">
                  <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    {label}
                  </span>
                  <input
                    className="w-full border-0 border-b-2 border-white/10 bg-surface-container px-0 py-3 font-mono text-lg text-ui-silver outline-none transition-colors placeholder:text-white/20 focus:border-accent-crimson"
                    placeholder={placeholder}
                    type={type}
                    required
                  />
                </label>
              ))}
              <label>
                <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  Biological Age
                </span>
                <input
                  className="w-full border-0 border-b-2 border-white/10 bg-surface-container px-0 py-3 font-mono text-lg text-ui-silver outline-none transition-colors placeholder:text-white/20 focus:border-accent-crimson"
                  placeholder="Year"
                  type="number"
                  min="13"
                  required
                />
              </label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["Mass / KG", "Weight", "25"],
                  ["Stature / CM", "Height", "100"]
                ].map(([label, placeholder, min]) => (
                  <label key={label}>
                    <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      {label}
                    </span>
                    <input
                      className="w-full border-0 border-b-2 border-white/10 bg-surface-container px-0 py-3 font-mono text-lg text-ui-silver outline-none transition-colors placeholder:text-white/20 focus:border-accent-crimson"
                      placeholder={placeholder}
                      type="number"
                      min={min}
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
                I consent to AI-driven biometric analysis and performance tracking protocols. Data is stored on secure
                Hyperion cluster.
              </span>
            </label>

            <button className="mt-10 w-full bg-accent-crimson py-5 font-headline text-xl uppercase tracking-[0.2em] text-white shadow-red-glow transition-all hover:-translate-y-0.5 hover:brightness-110">
              Submit Data
            </button>

            <div className="mt-8 flex flex-col justify-between gap-3 border-t border-white/5 pt-4 font-mono text-[10px] uppercase text-white/30 sm:flex-row">
              <span>System_v.4.2.1</span>
              <span>Encryption: AES-256-GCM</span>
              <span>Hyperion_core_link: Active</span>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

function EnrollmentSuccessPage({ selectedPlan, onBackHome }) {
  const plan = selectedPlan || plans[1];

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface py-stack-lg text-on-surface">
      <div className="absolute inset-x-0 top-0 h-1 bg-primary-container" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/95 to-surface-charcoal" />
        <img
          className="absolute bottom-0 right-0 h-[55vh] max-h-[620px] object-contain opacity-30 grayscale"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVkGck9mh33369WrTUEvTALaxvinKqv7a3ClOE9g1O5InmBJfq9_KtHIYbn4KDPk-ZmHo6szOhxCVvQJ6nj3UIOTa0wyybAjnhemCAtZFl4PcSmCX2fcATzTFP1PhgFT4sy0qGahdAwI1Li_zMbGBHPy-JgK0wbgdTXJ5CoxXNqK5qHN2cm3c6I57s2Vlys7AiHfd-f-aWEMHPeNfiPjNF-lhsi-xqxW9vOUHa9U673X7QF9j4_6dfKP0tedTNhhgwvlGLH_Ebo5I"
          alt="Hyperion athlete"
        />
      </div>

      <section className="relative z-10 mx-auto max-w-4xl px-margin-mobile text-center">
        <div className="mx-auto mb-12 flex h-36 w-36 items-center justify-center border-4 border-green-500 text-green-500 shadow-[0_0_60px_rgba(34,197,94,0.28)]">
          <Icon name="check" className="text-7xl" />
        </div>
        <div className="mb-4 font-mono text-sm font-bold uppercase tracking-[0.35em] text-primary-container">
          Hyperion Fit // AI Performance
        </div>
        <h1 className="font-display text-5xl uppercase leading-none text-ui-silver md:text-6xl">
          Pendaftaran Atlet Berhasil
        </h1>

        <div className="relative mx-auto mt-10 max-w-3xl border border-white/10 bg-surface-container/70 p-8 md:p-12">
          <CornerMarks />
          <p className="font-body text-lg leading-8 text-on-surface">
            Terima kasih atas kepercayaan Anda bergabung dengan <strong>HYPERION FIT</strong>. Data Anda untuk paket{" "}
            <strong className="text-primary">{plan.title}</strong> telah kami terima dengan aman melalui sistem
            enkripsi kami. Tim administrasi akan segera menghubungi Anda melalui detail kontak yang diberikan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8 font-mono text-[10px] uppercase text-primary-container">
            <span>Encrypted_secure</span>
            <span>Response_eta: 24h</span>
            <span>Plan: {plan.title}</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <button
            type="button"
            onClick={onBackHome}
            className="bg-primary-container px-12 py-5 font-headline text-xl uppercase text-white transition-colors hover:bg-accent-crimson"
          >
            Kembali Ke Beranda
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-8 py-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant transition-colors hover:text-primary"
          >
            Cetak Bukti Pendaftaran
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

function DashboardOverview({ onAskFitBot }) {
  return (
    <section className="relative z-10 mx-auto max-w-[1440px] space-y-8 px-margin-mobile py-8 lg:px-margin-desktop">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 border border-primary/40 bg-primary-container/10 px-3 py-1 font-mono text-[10px] font-bold uppercase text-primary">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            Member Dashboard
          </div>
          <h2 className="font-display text-5xl uppercase leading-none text-ui-silver md:text-6xl">
            WELCOME BACK, ATHLETE
          </h2>
          <p className="mt-3 max-w-2xl font-body text-on-surface-variant">
            Ringkasan latihan, nutrisi, recovery, dan rekomendasi AI untuk performa hari ini.
          </p>
        </div>
        <button
          type="button"
          onClick={onAskFitBot}
          className="self-start border-b-4 border-black bg-primary-container px-8 py-4 font-headline text-lg uppercase text-white transition-all hover:bg-accent-crimson active:translate-y-1 active:border-b-0 xl:self-auto"
        >
          Ask FitBot
        </button>
      </div>

      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Training Load" value="84%" meta="+12% dibanding minggu lalu" icon="monitoring" />
        <DashboardCard title="Calories Burned" value="2,480" meta="Target harian 3,000 kcal" icon="local_fire_department" tone="red" />
        <DashboardCard title="Recovery Score" value="72" meta="Tidur 7j 10m, HRV stabil" icon="bolt" />
        <DashboardCard title="Protein Intake" value="118g" meta="Sisa 32g dari target" icon="restaurant" tone="red" />
      </div>

      <div className="grid grid-cols-1 gap-gutter xl:grid-cols-[1.35fr_0.65fr]">
        <article className="relative border border-white/10 bg-surface-container p-6">
          <CornerMarks />
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase text-primary">AI Weekly Performance</div>
              <h3 className="mt-1 font-headline text-3xl uppercase">Progress Output</h3>
            </div>
            <div className="font-mono text-xs uppercase text-on-surface-variant">May 31 - Jun 6</div>
          </div>
          <div className="flex h-72 items-end gap-3 border-b border-white/10 pb-6">
            {[46, 72, 58, 86, 68, 94, 78].map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-3">
                <div className="relative flex h-56 w-full items-end bg-surface/70">
                  <div className="w-full bg-gradient-to-t from-primary-container to-primary" style={{ height: `${height}%` }} />
                </div>
                <span className="font-mono text-[10px] uppercase text-on-surface-variant">
                  {["M", "T", "W", "T", "F", "S", "S"][index]}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              ["Consistency", "6/7 sessions"],
              ["Strength PR", "+8.4 kg"],
              ["AI Focus", "Lower body power"]
            ].map(([label, value]) => (
              <div key={label} className="border border-white/5 bg-surface/60 p-4">
                <div className="font-mono text-[10px] font-bold uppercase text-on-surface-variant">{label}</div>
                <div className="mt-2 font-mono text-lg font-bold text-ui-silver">{value}</div>
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
              <div className="font-mono text-xs font-bold uppercase text-primary">FitBot Insight</div>
              <div className="font-mono text-[10px] uppercase text-green-400">Adaptive recommendation</div>
            </div>
          </div>
          <div className="space-y-4 font-body text-sm leading-6 text-on-surface-variant">
            <p>
              Beban latihan tinggi tetapi recovery masih aman. Hari ini prioritaskan compound lift intensitas sedang,
              lalu akhiri dengan mobility 12 menit.
            </p>
            <div className="border-l-2 border-primary bg-surface/70 p-4 text-on-surface">
              Fokus: squat pattern, posterior chain, dan protein 30g dalam 2 jam setelah latihan.
            </div>
          </div>
          <button
            type="button"
            onClick={onAskFitBot}
            className="mt-6 w-full border border-primary px-4 py-3 font-mono text-xs font-bold uppercase text-primary transition-colors hover:bg-primary-container hover:text-white"
          >
            Tanya Rencana Detail
          </button>
        </article>
      </div>
    </section>
  );
}

function TrainingPage({ onAskFitBot }) {
  const exercises = [
    ["Barbell Bench Press", "Chest", "Compound movement untuk pectoral, anterior deltoid, dan triceps.", classCards[2].image],
    ["Conventional Deadlift", "Back", "Posterior chain exercise untuk spinal erectors, glutes, dan grip.", classCards[1].image],
    ["Barbell Back Squat", "Legs", "Primary lower body movement untuk quads, hamstrings, dan core stability.", classCards[2].image],
    ["Weighted Pull Ups", "Back", "Vertical pulling movement untuk lat dan biceps development.", classCards[0].image],
    ["Dumbbell Shoulder Press", "Arms", "Overhead pressing untuk deltoid isolation dan shoulder stability.", classCards[1].image]
  ];

  return (
    <section className="relative z-10 mx-auto max-w-[1440px] space-y-8 px-margin-mobile py-8 lg:px-margin-desktop">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="mb-4 inline-block bg-primary-container px-4 py-2 font-mono text-xs font-bold uppercase text-white">
            Live Session Active
          </div>
          <h2 className="font-headline text-4xl uppercase text-ui-silver">Workout Hub</h2>
          <p className="mt-2 font-body text-lg text-on-surface-variant">
            Optimizing performance with real-time biometric feedback.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-white/10 bg-surface-container p-5">
            <div className="font-mono text-[10px] font-bold uppercase text-on-surface-variant">Daily Goal</div>
            <div className="mt-2 font-mono text-2xl font-bold text-primary">84%</div>
          </div>
          <div className="border border-white/10 bg-surface-container p-5">
            <div className="font-mono text-[10px] font-bold uppercase text-on-surface-variant">Heart Rate</div>
            <div className="mt-2 font-mono text-2xl font-bold text-primary">132 BPM</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-gutter xl:grid-cols-[360px_1fr]">
        <div className="space-y-gutter">
          <article className="border border-white/10 bg-surface-container p-8">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="font-headline text-2xl uppercase italic">Current Set</h3>
              <span className="font-mono text-xs font-bold uppercase text-primary">Reps Remaining: 4</span>
            </div>
            <div className="mb-8 grid grid-cols-2 gap-8">
              <div>
                <div className="font-mono text-[10px] font-bold uppercase text-on-surface-variant">Reps</div>
                <div className="font-headline text-5xl">08</div>
              </div>
              <div className="border-l border-white/10 pl-8">
                <div className="font-mono text-[10px] font-bold uppercase text-on-surface-variant">Weight</div>
                <div className="font-headline text-5xl">225<span className="text-xl">LB</span></div>
              </div>
            </div>
            <div className="mb-8 bg-surface p-5">
              <div className="mb-3 flex justify-between font-mono text-xs uppercase">
                <span>Rest Timer</span>
                <span className="text-primary">00:30</span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                {[100, 100, 55, 35].map((width, index) => (
                  <div key={index} className="h-3 bg-white/10">
                    <div className="h-full bg-primary" style={{ width: `${width}%` }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-white py-4 font-headline text-sm uppercase text-surface">Log Set</button>
              <button className="border-2 border-white py-4 font-headline text-sm uppercase text-white">Skip Rest</button>
            </div>
          </article>

          <article className="border border-white/10 bg-surface-container p-8">
            <h3 className="mb-6 font-headline text-2xl uppercase">Performance Metrics</h3>
            <div className="mb-6 flex items-end justify-between">
              <span className="font-mono text-xs uppercase text-on-surface-variant">Volume Lifted Weekly</span>
              <span className="font-mono text-2xl font-bold">42.5k <span className="text-xs">LBS</span></span>
            </div>
            <div className="flex h-24 items-end gap-3">
              {[42, 62, 88, 58, 72, 98, 28].map((height, index) => (
                <div key={index} className={`flex-1 ${index === 2 || index === 5 ? "bg-primary" : "bg-white/10"}`} style={{ height: `${height}%` }} />
              ))}
            </div>
          </article>

          <article className="border border-white/10 bg-surface-container p-8">
            <h3 className="mb-5 font-headline text-2xl uppercase">History</h3>
            <div className="mb-5 grid grid-cols-7 gap-2 font-mono text-xs text-center text-on-surface-variant">
              {["28", "29", "30", "1", "2", "3", "4"].map((day) => (
                <span key={day} className={day === "3" ? "bg-primary-container py-2 text-white" : "bg-surface py-2"}>{day}</span>
              ))}
            </div>
            <div className="border-l-2 border-primary bg-surface p-4 font-body text-sm">Last Session: Upper Body Hypertrophy - 72m</div>
          </article>
        </div>

        <div>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-headline text-4xl uppercase">Exercise Library</h3>
            <div className="flex flex-wrap gap-2">
              {["All", "Chest", "Back", "Legs", "Arms"].map((filter, index) => (
                <button key={filter} className={`px-5 py-3 font-mono text-xs font-bold uppercase ${index === 0 ? "bg-primary text-surface" : "bg-surface-container-high text-on-surface-variant"}`}>
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 xl:grid-cols-3">
            {exercises.map(([title, tag, body, image]) => (
              <article key={title} className="border border-white/10 bg-surface-container">
                <div className="relative aspect-[4/3] overflow-hidden border-t-4 border-primary">
                  <img className="h-full w-full object-cover grayscale" src={image} alt={title} />
                </div>
                <div className="space-y-4 p-6">
                  <div className="inline-block border border-primary px-3 py-1 font-mono text-[10px] uppercase text-primary">{tag}</div>
                  <h4 className="font-headline text-2xl uppercase">{title}</h4>
                  <p className="font-body text-sm leading-6 text-on-surface-variant">{body}</p>
                  <button className="w-full border-b-4 border-primary-container bg-white py-4 font-headline text-sm uppercase text-surface">
                    Start Exercise
                  </button>
                </div>
              </article>
            ))}
            <article className="flex min-h-[420px] flex-col items-center justify-center border border-dashed border-primary/50 bg-surface-container p-8 text-center">
              <Icon name="psychology" fill className="mb-6 text-4xl text-primary" />
              <h4 className="font-headline text-2xl uppercase">AI Suggested</h4>
              <p className="mt-4 font-body text-sm leading-6 text-on-surface-variant">
                FitBot menyarankan Face Pulls berdasarkan fatigue shoulder terakhir.
              </p>
              <button onClick={onAskFitBot} className="mt-8 border-b border-primary px-4 py-3 font-mono text-xs uppercase text-primary">
                Accept Recommendation
              </button>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function NutritionPage({ onAskFitBot }) {
  return (
    <section className="relative z-10 mx-auto max-w-[1440px] space-y-8 px-margin-mobile py-8 lg:px-margin-desktop">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="font-mono text-sm font-bold uppercase text-primary">Nutrition Interface v4.2</div>
          <h2 className="mt-2 font-display text-5xl uppercase leading-none text-ui-silver md:text-6xl">
            System Fueling
          </h2>
        </div>
        <div className="flex gap-10 font-mono">
          <div>
            <div className="text-xs uppercase text-on-surface-variant">Daily Budget</div>
            <div className="text-3xl font-bold">2,850 <span className="text-sm">KCAL</span></div>
          </div>
          <div>
            <div className="text-xs uppercase text-on-surface-variant">Remaining</div>
            <div className="text-3xl font-bold text-primary">1,120 <span className="text-sm">KCAL</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-gutter xl:grid-cols-[1fr_380px]">
        <div className="space-y-gutter">
          <article className="relative border border-white/10 bg-surface-container p-8">
            <CornerMarks />
            <div className="mb-8 flex justify-between">
              <h3 className="font-mono text-lg font-bold">Macro Distribution</h3>
              <Icon name="monitoring" className="text-primary" />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                ["Protein", "142g", "180g", 78],
                ["Carbs", "210g", "320g", 65],
                ["Fats", "45g", "85g", 53]
              ].map(([label, value, target, percent]) => (
                <div key={label}>
                  <div className="mb-3 flex items-end gap-2 font-mono">
                    <span className="text-3xl">{value}</span>
                    <span className="text-sm text-on-surface-variant">/ {target}</span>
                  </div>
                  <div className="mb-2 h-3 bg-white/10">
                    <div className="h-full bg-primary-container" style={{ width: `${percent}%` }} />
                  </div>
                  <div className="font-mono text-xs uppercase text-primary">{percent}% target reached</div>
                </div>
              ))}
            </div>
          </article>

          {[
            ["Breakfast", "640 KCAL", ["Greek Yogurt w/ Chia & Blueberries", "Whey Isolate Shake (Vanilla)", "Black Coffee"]],
            ["Lunch", "820 KCAL", ["Wild Caught Salmon & Quinoa", "Asparagus", "Olive oil dressing"]]
          ].map(([meal, kcal, entries]) => (
            <article key={meal} className="border border-white/10 bg-surface-container">
              <div className="flex items-center justify-between border-b border-white/10 p-8">
                <div className="flex items-center gap-4">
                  <Icon name="wb_sunny" className="text-primary" />
                  <h3 className="font-headline text-3xl uppercase">{meal}</h3>
                </div>
                <div className="font-mono text-lg text-primary">{kcal}</div>
              </div>
              <div className="space-y-3 p-8">
                {entries.map((entry, index) => (
                  <div key={entry} className="flex justify-between font-body text-sm">
                    <span>{entry}</span>
                    <span className="font-mono text-primary">{[320, 210, 10][index] || 290} KCAL</span>
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
            <div className="mb-8 text-left font-mono text-sm font-bold uppercase">Hydration Level</div>
            <div className="font-headline text-6xl">2.4</div>
            <div className="font-mono text-sm uppercase">Liters / 3.5 Target</div>
            <button className="mt-8 w-full border border-primary px-4 py-3 font-mono text-xs uppercase text-primary">
              + 250ml Intake
            </button>
          </article>
          <button className="flex w-full items-center gap-5 bg-primary-container p-8 text-left text-white">
            <Icon name="barcode_scanner" className="text-4xl" />
            <span>
              <span className="block font-mono text-sm font-bold uppercase">Scan Product</span>
              <span className="font-body text-sm opacity-80">Instant nutrient analysis</span>
            </span>
          </button>
          <article className="border border-white/10 bg-surface-container p-8">
            <div className="mb-6 font-mono text-sm font-bold uppercase text-primary">Hyperion Coach Suggestion</div>
            <div className="border-l-2 border-primary bg-surface p-5 font-body text-sm leading-6">
              High training volume detected. Recommended post-workout intake:
              <strong className="text-primary"> 45g carbs + 30g protein</strong>.
            </div>
            <button onClick={onAskFitBot} className="mt-6 w-full border border-primary px-4 py-3 font-mono text-xs uppercase text-primary">
              Tanya menu personal
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}

function SettingsPage() {
  return (
    <section className="relative z-10 mx-auto max-w-[1440px] space-y-8 px-margin-mobile py-8 lg:px-margin-desktop">
      <div className="flex flex-col gap-6 border-b border-white/10 pb-8 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h2 className="font-display text-5xl uppercase leading-none text-ui-silver md:text-6xl">
            System Configuration
          </h2>
          <p className="mt-3 max-w-3xl font-body text-lg text-on-surface-variant">
            Optimize your athletic profile and neural coaching parameters for maximum performance output.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="border-2 border-white px-8 py-4 font-mono text-xs font-bold uppercase text-white">Export Logs</button>
          <button className="bg-primary-container px-8 py-4 font-mono text-xs font-bold uppercase text-white">Save Changes</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-gutter xl:grid-cols-[1fr_380px]">
        <article className="relative border border-white/10 bg-surface-container p-8">
          <CornerMarks />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[180px_1fr]">
            <img
              className="aspect-square w-full object-cover grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdKvq4kxKeQaViJkOuYJvvyxQyvvu2gB1AkHs9mqdZCnwIFyBFNkUGhRVcR1Dne6Jgh1eCKhc_8wPNYLtnVLmVSG-97Znql9CPsPKuOMu6dVVW0nYnh6HAAfv98hOPstG2ZccL0b2CkFJDKnvWBQuy1MKhjMei-zMkLpW_l_uPdH9TbYtEDOGuRVUE3y4ajL5yS1iCjj_PuTl4Z0Kfx8BQtt_1ulI3KXyqhLA_PV3sKvZHqMydFqRCBr3UtSYwfhu-_rdXqnq1ZgY"
              alt="Athlete profile"
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <label>
                <span className="mb-3 block font-mono text-xs uppercase text-on-surface-variant">Athlete Identity</span>
                <input className="w-full border border-white/10 bg-surface p-4 font-body text-lg outline-none focus:border-primary" defaultValue="Marcus Sterling" />
              </label>
              <div>
                <div className="mb-3 font-mono text-xs uppercase text-on-surface-variant">System ID Immutable</div>
                <div className="font-mono text-2xl text-primary">HYP-8849-B2</div>
              </div>
              <label>
                <span className="mb-3 block font-mono text-xs uppercase text-on-surface-variant">Primary Sport</span>
                <select className="w-full border border-white/10 bg-surface p-4 font-body outline-none focus:border-primary" defaultValue="hyrox">
                  <option value="hyrox">Hyrox Pro</option>
                  <option value="strength">Strength</option>
                  <option value="hiit">HIIT</option>
                </select>
              </label>
              <div>
                <div className="mb-3 font-mono text-xs uppercase text-on-surface-variant">Biometric Sync Status</div>
                <div className="border border-white/10 bg-surface p-4 font-mono text-sm text-green-400">Whoop V4 Connected Active</div>
              </div>
            </div>
          </div>
        </article>

        <article className="border border-white/10 bg-surface-container p-8">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-headline text-3xl uppercase text-primary">Membership</h3>
            <span className="bg-primary px-3 py-1 font-mono text-[10px] uppercase text-surface">Pro Status</span>
          </div>
          <p className="font-body leading-7 text-on-surface-variant">
            Elite tier access enabled. AI Coach provides 24/7 neural adaptations.
          </p>
          <div className="mt-8 h-2 bg-surface">
            <div className="h-full w-[65%] bg-primary" />
          </div>
          <button className="mt-8 w-full border border-primary px-4 py-4 font-mono text-xs uppercase text-primary">
            Manage Subscription
          </button>
        </article>
      </div>

      <div className="grid grid-cols-1 gap-gutter xl:grid-cols-2">
        <article className="border border-white/10 bg-surface-container p-8">
          <div className="mb-8 flex items-center gap-4">
            <Icon name="shield" className="text-primary" />
            <h3 className="font-headline text-3xl uppercase">Security</h3>
          </div>
          {[
            ["OAuth Integrations", "Connected: Google, Apple Health", "Manage"],
            ["Two-Factor Authentication", "Enhanced security via biometrics", "Secured"],
            ["Reset System Password", "Credential refresh required every 90 days", "Reset"]
          ].map(([title, body, action]) => (
            <div key={title} className="mb-4 flex items-center justify-between border border-white/5 bg-surface p-5">
              <div>
                <div className="font-mono text-sm">{title}</div>
                <div className="font-body text-xs text-on-surface-variant">{body}</div>
              </div>
              <button className="font-mono text-xs uppercase text-primary">{action}</button>
            </div>
          ))}
        </article>

        <article className="border border-white/10 bg-surface-container p-8">
          <div className="mb-8 flex items-center gap-4">
            <Icon name="notifications_active" className="text-primary" />
            <h3 className="font-headline text-3xl uppercase">Neural Alerts</h3>
          </div>
          {[
            ["AI Coaching Real-time Adjustments", true],
            ["Weekly Performance Diagnostics", true],
            ["Community & Leaderboard Updates", false]
          ].map(([label, enabled]) => (
            <div key={label} className="mb-6 flex items-center justify-between gap-4">
              <div className="font-mono text-sm">{label}</div>
              <div className={`flex h-8 w-16 items-center p-1 ${enabled ? "justify-end bg-primary-container" : "justify-start bg-surface"}`}>
                <span className="h-6 w-6 bg-ui-silver" />
              </div>
            </div>
          ))}
        </article>
      </div>

      <article className="flex flex-col gap-6 border border-primary/40 bg-primary-container/5 p-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="font-mono text-lg font-bold uppercase text-primary">Critical: Decommission Athlete Profile</div>
          <p className="mt-2 font-body text-on-surface-variant">
            This will permanently purge all AI training logs and biometric history from the Hyperion database.
          </p>
        </div>
        <button className="border-2 border-primary px-10 py-4 font-mono text-xs uppercase text-primary">Deactivate Account</button>
      </article>
    </section>
  );
}

function DashboardPage({ onLogout, onAskFitBot }) {
  const [activePage, setActivePage] = useState("dashboard");
  const navItems = [
    { id: "dashboard", icon: "dashboard", label: "Dashboard" },
    { id: "training", icon: "fitness_center", label: "Training" },
    { id: "nutrition", icon: "restaurant", label: "Nutrition" },
    { id: "settings", icon: "settings", label: "Settings" }
  ];

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
          <h1 className="font-display text-5xl uppercase tracking-normal text-accent-crimson">HYPERION FIT</h1>
          <p className="mt-1 font-mono text-xs font-bold uppercase text-on-surface-variant">AI PERFORMANCE</p>
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
            <div className="font-mono text-[10px] font-bold uppercase text-primary">Elite Member</div>
            <div className="mt-1 font-body text-sm font-bold">Alex Thorne</div>
          </div>
          <button className="w-full bg-accent-crimson py-3 font-headline text-sm uppercase tracking-normal text-white transition-all hover:brightness-110">
            Upgrade To Pro
          </button>
          <div className="space-y-1 border-t border-white/5 pt-4">
            <button
              type="button"
              onClick={onLogout}
              className="flex w-full items-center gap-4 py-3 text-on-surface-variant transition-colors hover:text-primary"
            >
              <Icon name="logout" />
              <span className="font-mono text-xs font-bold uppercase">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-background/80 px-margin-mobile backdrop-blur-md lg:left-64 lg:justify-end lg:px-margin-desktop">
        <div className="font-display text-2xl uppercase text-primary lg:hidden">HYPERION FIT</div>
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdKvq4kxKeQaViJkOuYJvvyxQyvvu2gB1AkHs9mqdZCnwIFyBFNkUGhRVcR1Dne6Jgh1eCKhc_8wPNYLtnVLmVSG-97Znql9CPsPKuOMu6dVVW0nYnh6HAAfv98hOPstG2ZccL0b2CkFJDKnvWBQuy1MKhjMei-zMkLpW_l_uPdH9TbYtEDOGuRVUE3y4ajL5yS1iCjj_PuTl4Z0Kfx8BQtt_1ulI3KXyqhLA_PV3sKvZHqMydFqRCBr3UtSYwfhu-_rdXqnq1ZgY"
              alt="Member avatar"
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
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [floatingOpen, setFloatingOpen] = useState(false);
  const [page, setPage] = useState("home");
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);
  const [activeNav, setActiveNav] = useState("training");

  function navigateHome(sectionId = "home") {
    if (["training", "schedule", "pricing", "ai-coach"].includes(sectionId)) {
      setActiveNav(sectionId);
    }
    setPage("home");
    window.setTimeout(() => {
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
  );
}
