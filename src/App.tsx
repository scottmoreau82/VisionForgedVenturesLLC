import { useState, useEffect, useRef, useMemo, FormEvent } from "react";
import {
  Code,
  Brain,
  Cpu,
  Factory,
  Box,
  Smartphone,
  Play,
  Cog,
  ArrowRight,
  Globe,
  Check,
  Menu,
  X,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  ChevronRight,
  Send,
  Calendar,
  Layers,
  Sparkles,
  Zap,
  Shield,
  Award,
  Terminal,
  ArrowUpRight,
  Lock,
  Search,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Types & Interfaces ---
interface VentureSector {
  id: string;
  icon: any;
  title: string;
  subtitle: string;
  desc: string;
  stats: { label: string; value: string }[];
  rndTech: string[];
  milestones: string[];
  simulationMetric: string;
}

export default function App() {
  // Navigation & Scroll State
  const [activeTab, setActiveTab] = useState<string>("HOME");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Modal State
  const [selectedVenture, setSelectedVenture] = useState<VentureSector | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [contactSubject, setContactSubject] = useState<string>("Venture Funding");

  // Contact Form Processing state
  const [formName, setFormName] = useState<string>("");
  const [formEmail, setFormEmail] = useState<string>("");
  const [formMessage, setFormMessage] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formStatusStep, setFormStatusStep] = useState<number>(0);

  // Joint Careers Form State
  const [careersEmail, setCareersEmail] = useState<string>("");
  const [careersRole, setCareersRole] = useState<string>("AI Engineering");
  const [careersSuccess, setCareersSuccess] = useState<boolean>(false);

  // Footer Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);

  // Mini Tech-Simulator States
  const [simInProgress, setSimInProgress] = useState<boolean>(false);
  const [simOutput, setSimOutput] = useState<string[]>([]);
  const [simResult, setSimResult] = useState<string>("");

  // Toasty Alerts
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Standard Scroll listener to change background opacity of Nav
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set timeout to clear toast notifications
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // List of Ecosystem sectors, customized for high-fidelity detailing
  const ecosystemSectors: VentureSector[] = useMemo(() => [
    {
      id: "software",
      icon: Code,
      title: "SOFTWARE",
      subtitle: "Enterprise Platforms & Global Scale Orchestration",
      desc: "Scalable software solutions that power businesses and transform industries.",
      stats: [
        { label: "Deployment Velocity", value: "99.98%" },
        { label: "Current Nodes", value: "1.2 Million+" },
        { label: "Active Transactions/sec", value: "240,000" }
      ],
      rndTech: ["Zero-trust Distributed Protocols", "Edge Computing Synchronization", "Synthesized Code Compilers"],
      milestones: ["Q3 2026: Multi-cloud seamless state database engine launch", "Q1 2027: Neural network-level API gateway initialization"],
      simulationMetric: "Simulating high-load distributed event streams..."
    },
    {
      id: "ai",
      icon: Brain,
      title: "AI",
      subtitle: "Autonomous Cognitive Models & Enterprise Synthesis",
      desc: "Intelligent systems and AI solutions that learn, adapt, and create value.",
      stats: [
        { label: "Neural Parameters", value: "4.8 Trillion" },
        { label: "Cognitive Latency", value: "1.2ms" },
        { label: "Model Architecture", value: "Vector-MoE" }
      ],
      rndTech: ["Contextual Logic Synthesis", "Low-power On-device Reasoning", "Self-evolving Knowledge Graphs"],
      milestones: ["Q4 2026: Agentic swarm execution orchestrator v2.0", "Q2 2027: Real-time contextual memory alignment pipeline"],
      simulationMetric: "Synthesizing transformer attention calculations across distributed shards..."
    },
    {
      id: "automation",
      icon: Cpu,
      title: "AUTOMATION",
      subtitle: "Somatic Control Matrices & Robotic Handshakes",
      desc: "Automating the future to increase efficiency, precision, and output.",
      stats: [
        { label: "Co-bot Synchrony", value: "99.9997%" },
        { label: "Sensor Pathfinding", value: "Sub-millisecond" },
        { label: "Hardware Life-cycle", value: "48,000 Hrs MTBF" }
      ],
      rndTech: ["Dynamic Kinematic Trajectory Tuning", "Spatial Sensory Neural Integration", "Wireless Mesh Haptic Control"],
      milestones: ["Q2 2026: Autonomous material handling drone- swarm patch", "Q4 2027: Molecular material assembly precision matrix"],
      simulationMetric: "Recalibrating high-precision kinematic feedback loops in neural actuators..."
    },
    {
      id: "manufacturing",
      icon: Factory,
      title: "MANUFACTURING",
      subtitle: "Futuristic Production Frameworks & Additive Infrastructure",
      desc: "Advanced manufacturing and production for the modern world.",
      stats: [
        { label: "Additive Material Yield", value: "98.7%" },
        { label: "Carbon Offset Factor", value: "12x Improvement" },
        { label: "Global Microfactories", value: "18 Operational" }
      ],
      rndTech: ["Direct Ceramic Sintering", "Autonomous Factory Self-Replication", "Digital-Twin In-Line Diagnostics"],
      milestones: ["Q4 2026: Dark-factory protocol v3 automation standard", "Q3 2027: Eco-additive alloy printing certification"],
      simulationMetric: "Modeling thermal dissipation of complex laser sintering heads..."
    },
    {
      id: "product",
      icon: Box,
      title: "PRODUCT DEVELOPMENT",
      subtitle: "Accelerated Prototyping & Generative Physical Sizing",
      desc: "End-to-end product development from concept to market and beyond.",
      stats: [
        { label: "Concept-to-Market Time", value: "42 Days Avg" },
        { label: "Generative Iterations", value: "2,000+ per unit" },
        { label: "Patents Managed", value: "164 Filled" }
      ],
      rndTech: ["Generative Lattice Structural Sizing", "Photopolymer High-elasticity Synthesis", "Simulated Environmental Stress Validation"],
      milestones: ["Q1 2026: Real-time mechanical load stresses simulation suite", "Q2 2027: Biodegradable structural elements library release"],
      simulationMetric: "Executing high-stress structural load calculations on virtual models..."
    },
    {
      id: "consumer",
      icon: Smartphone,
      title: "CONSUMER TECHNOLOGY",
      subtitle: "Haptic Personal Orbits & Ambient Computing Nodes",
      desc: "Building next-gen consumer technology that enhances lives and experiences.",
      stats: [
        { label: "Daily Active Engagements", value: "8.4M Users" },
        { label: "Device Power Retention", value: "30-day Passive" },
        { label: "User Satisfaction Metric", value: "4.92 / 5.00" }
      ],
      rndTech: ["Sub-dermal Haptic Interaction", "Direct Sunlight Micro-LED displays", "Zero-RF Local Ambient Handshakes"],
      milestones: ["Q3 2026: Ambient home sensory matrix product debut", "Q1 2027: Organic-powered lightweight wearable rollout"],
      simulationMetric: "Optimizing ultra-low-power standby cycles for remote sensor panels..."
    },
    {
      id: "media",
      icon: Play,
      title: "CREATIVE MEDIA",
      subtitle: "Dynamic Dynamic Narratives & Spatial Immersion Channels",
      desc: "Storytelling, branding, and digital experiences that inspire and connect.",
      stats: [
        { label: "Render Cluster Speed", value: "140 TFlops" },
        { label: "Audience Retention Rate", value: "84.5%" },
        { label: "Audio Fidelity Axis", value: "128-channel Spatial" }
      ],
      rndTech: ["Generative Narrative Direction Engine", "Dynamic Color-Science Color Palette", "Interactive VR/AR Cinematic Synthesis"],
      milestones: ["Q4 2026: Fully procedural reactive cinematic script engine", "Q3 2027: Holographic multi-user lightfield theater system"],
      simulationMetric: "Synthesizing real-time interactive multi-path spatial audio stems..."
    },
    {
      id: "engineering",
      icon: Cog,
      title: "ENGINEERING",
      subtitle: "Deep Materials Research & Cybernetic Structures",
      desc: "Engineering excellence that transforms ideas into real-world solutions.",
      stats: [
        { label: "Structural Safety Index", value: "8.0 (Aerospace grade)" },
        { label: "Material Tensile Limit", value: "12.4 GPa" },
        { label: "Thermal Operations Band", value: "-180°C to 1100°C" }
      ],
      rndTech: ["Carbon Nanotube Lattice Integration", "Self-repairing Polymer Sealants", "Electro-magnetic Frictionless Bearings"],
      milestones: ["Q1 2026: Deep-vacuum structural joint stress test certification", "Q4 2027: Room-temperature magnetic levitation components standard"],
      simulationMetric: "Measuring atomic grid alignments of hyper-alloy structures at extreme heat..."
    }
  ], []);

  // Navigation click handler with smooth scroll.
  const handleNavClick = (tabName: string, elementId: string) => {
    setActiveTab(tabName);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(elementId);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Run tactical simulation for the selected Venture Sector
  const runSectorSimulation = (sector: VentureSector) => {
    if (simInProgress) return;
    setSimInProgress(true);
    setSimResult("");
    setSimOutput(["System handshake verified.", "Accessing operational core matrix...", sector.simulationMetric]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step === 1) {
        setSimOutput(prev => [...prev, "Gathering multi-threaded diagnostic feedback...", "Core temperatures balanced inside limits."]);
      } else if (step === 2) {
        setSimOutput(prev => [...prev, "Aligning localized network parameters...", "Operational efficiency: 98.42% (Optimal)"]);
      } else if (step === 3) {
        setSimOutput(prev => [...prev, "Compiling quantum simulation log trace..."]);
      } else if (step === 4) {
        clearInterval(interval);
        setSimInProgress(false);
        const randScore = (94.5 + Math.random() * 5).toFixed(2);
        setSimResult(`SIMULATION COMPLETE: System throughput validated at ${randScore}% efficiency. No neural or thermal drift detected. Operational metrics certified.`);
        triggerToast("Simulation validated successfully.");
      }
    }, 900);
  };

  // Submit quantum structural contact form
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) {
      triggerToast("Please populate all parameters.");
      return;
    }

    setFormSubmitted(true);
    setFormStatusStep(1);

    // Advanced visual multi-stage pipeline loader
    setTimeout(() => {
      setFormStatusStep(2);
      setTimeout(() => {
        setFormStatusStep(3);
        setTimeout(() => {
          setFormStatusStep(4);
          triggerToast("Secure Transmission Dispatched.");
        }, 1200);
      }, 1200);
    }, 1250);
  };

  // Submit careers field matching form
  const handleCareersSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!careersEmail) {
      triggerToast("Please provide a valid diagnostic email contact.");
      return;
    }
    setCareersSuccess(true);
    triggerToast("Inquiry recorded inside VisionForged records.");
  };

  // Submit newsletter signup
  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      triggerToast("Please specify a valid email target.");
      return;
    }
    setNewsletterSuccess(true);
    triggerToast("Subscription aligned. Future updates connected.");
  };

  // Clear a submission to allow multiple tests
  const resetContactForm = () => {
    setFormName("");
    setFormEmail("");
    setFormMessage("");
    setFormSubmitted(false);
    setFormStatusStep(0);
  };

  return (
    <div className="min-h-screen font-sans bg-[#050A14] text-white selection:bg-[#D4A24C] selection:text-black overflow-x-hidden relative">
      
      {/* Background Ambience Globs */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#1e3a8a] glow-orb" />
      <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] rounded-full bg-[#3b82f6] glow-orb" style={{ opacity: 0.1 }} />
      <div className="absolute bottom-[20%] left-[20%] w-[600px] h-[600px] rounded-full bg-[#C99547] glow-orb" style={{ opacity: 0.05 }} />

      {/* Floating toast notification panel */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-[#0F1A2E]/95 border-2 border-[#D4A24C] rounded-lg shadow-[0_0_25px_rgba(212,162,76,0.25)] flex items-center gap-3 backdrop-blur-xl"
            id="toast-popup"
          >
            <div className="w-2 h-2 rounded-full bg-[#D4A24C] animate-ping" />
            <span className="text-xs uppercase font-bold tracking-[0.15em] text-[#E8B86A]">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================
          1. TOP NAVIGATION
          ===================================== */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled ? "bg-[#050A14]/90 backdrop-blur-md border-b border-white/5 py-4 shadow-2xl" : "bg-transparent py-6"
        }`}
        id="top-nav-bar"
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          
          {/* Left brand wordmark */}
          <div
            className="cursor-pointer"
            onClick={() => handleNavClick("HOME", "home")}
            id="nav-logo"
          >
            <div className="flex items-center gap-3">
              {/* Small silver/gold VF monogram */}
              <div className="relative group flex items-center justify-center w-10 h-10 rounded bg-[#0F1A2E] border border-white/10 shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D4A24C]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-sm font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-[#C0C5CC] to-[#D4A24C]">VF</span>
              </div>
              
              {/* Stacked Wordmark */}
              <div className="flex flex-col">
                <div className="text-[12px] font-black uppercase tracking-[0.2em] font-display flex items-center">
                  <span className="text-[#C0C5CC]">VISION</span>
                  <span className="text-[#D4A24C] ml-1">FORGED</span>
                </div>
                {/* Rule separator line */}
                <div className="h-[1px] bg-gradient-to-r from-[#C2C7D0]/35 to-[#D4A24C]/35 w-full my-[1px]" />
                <div className="text-[7.5px] font-bold text-[#7A8699] uppercase tracking-[0.3em] font-display text-center">
                  VENTURES LLC
                </div>
              </div>
            </div>
          </div>

          {/* Center Links (Desktop only) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] font-bold tracking-[0.2em] uppercase font-display text-[#7A8699]">
            {[
              { label: "HOME", anchor: "home" },
              { label: "ABOUT", anchor: "about" },
              { label: "VENTURES", anchor: "ecosystem" },
              { label: "TECHNOLOGY", anchor: "ecosystem" },
              { label: "FUTURE PROJECTS", anchor: "vision-banner-sec" },
              { label: "CAREERS", anchor: "careers-center" },
              { label: "CONTACT", anchor: "contact-strip" }
            ].map((link) => {
              const isActive = activeTab === link.label;
              return (
                <button
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleNavClick(link.label, link.anchor)}
                  className={`hover:text-white transition-colors relative pb-1 ${isActive ? "text-[#D4A24C]" : ""}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4A24C]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right CTA */}
          <div className="hidden lg:block">
            <button
              id="nav-btn-header-cta"
              onClick={() => {
                setContactSubject("Future Collaboration");
                setIsContactModalOpen(true);
              }}
              className="border border-[#D4A24C] hover:bg-[#D4A24C] hover:text-[#050A14] text-[#D4A24C] px-5 py-2 rounded-[4px] text-[10px] tracking-[0.2em] font-black uppercase transition-all duration-300 font-display shadow-[0_0_15px_rgba(212,162,76,0.1)] block"
            >
              LET'S BUILD THE FUTURE
            </button>
          </div>

          {/* Mobile hamburger menu trigger */}
          <div className="lg:hidden flex items-center">
            <button
              id="nav-btn-mobile-trigger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#B8C2D1] hover:text-white p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden w-full bg-[#050A14] border-b border-white/10 px-6 pb-8 pt-4 flex flex-col gap-5 overflow-hidden"
            >
              {[
                { label: "HOME", anchor: "home" },
                { label: "ABOUT", anchor: "about" },
                { label: "VENTURES", anchor: "ecosystem" },
                { label: "TECHNOLOGY", anchor: "ecosystem" },
                { label: "FUTURE PROJECTS", anchor: "vision-banner-sec" },
                { label: "CAREERS", anchor: "careers-center" },
                { label: "CONTACT", anchor: "contact-strip" }
              ].map((link) => (
                <button
                  key={link.label}
                  id={`nav-link-mob-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleNavClick(link.label, link.anchor)}
                  className={`text-left text-[11px] font-bold tracking-[0.2em] uppercase font-display py-2 ${
                    activeTab === link.label ? "text-[#D4A24C] border-l-2 border-[#D4A24C] pl-3" : "text-[#7A8699]"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="h-[1px] bg-white/10 my-1" />
              <button
                id="nav-btn-mobile-cta"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsContactModalOpen(true);
                }}
                className="w-full text-center border-2 border-[#D4A24C] text-[#D4A24C] hover:bg-[#D4A24C] hover:text-[#050A14] py-3 rounded text-[11px] font-black uppercase tracking-[0.2em]"
              >
                LET'S BUILD THE FUTURE
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =====================================
          2. METALLIC HERO HERO SECTION
          ===================================== */}
      <section
        id="home"
        className="relative pt-[100px] flex items-center justify-center overflow-hidden min-h-[750px] max-w-[1200px] mx-auto"
      >
        {/* Layer 1: Simulated Vector-Art Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-40 select-none">
          <svg
            className="w-full h-full min-h-[720px]"
            viewBox="0 0 1440 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Radial gradient of sunrise glow */}
              <radialGradient id="sunrise-glow" cx="45%" cy="65%" r="65%">
                <stop offset="0%" stopColor="#8A6E3B" stopOpacity="0.8" />
                <stop offset="20%" stopColor="#4A3414" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#0B152A" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#050A14" stopOpacity="0" />
              </radialGradient>
              
              {/* Gradient for skyscrapers */}
              <linearGradient id="cyber-skyline-grad" x1="0" y1="500" x2="0" y2="720" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0A1428" stopOpacity="0" />
                <stop offset="60%" stopColor="#080F20" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#040810" stopOpacity="1" />
              </linearGradient>

              {/* Faint blue line gradient */}
              <linearGradient id="mesh-line-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5FA8D3" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#D4A24C" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Stars background */}
            <circle cx="120" cy="80" r="1.2" fill="#fff" opacity="0.4" />
            <circle cx="280" cy="190" r="1.5" fill="#fff" opacity="0.6" />
            <circle cx="450" cy="110" r="1.0" fill="#fff" opacity="0.7" />
            <circle cx="680" cy="240" r="1.2" fill="#fff" opacity="0.5" />
            <circle cx="890" cy="140" r="1.8" fill="#fff" opacity="0.8" />
            <circle cx="1100" cy="210" r="1" fill="#fff" opacity="0.3" />
            <circle cx="1320" cy="100" r="1.6" fill="#fff" opacity="0.5" />

            {/* Sunrise radiant ball on lower axis */}
            <circle cx="600" cy="520" r="450" fill="url(#sunrise-glow)" />

            {/* Abstract Cyber City silhouettes (Skyscraper shapes) */}
            {/* Background tall thin spires */}
            <polygon points="150,560 170,440 210,440 230,560" fill="#081024" opacity="0.5" />
            <polygon points="280,560 300,380 340,380 360,560" fill="#0A1630" opacity="0.6" />
            <polygon points="500,560 520,400 550,330 580,400 600,560" fill="#0D1E3A" opacity="0.5" />
            {/* Massive central skyscrapers */}
            <polygon points="580,560 620,290 680,290 720,560" fill="#0F2244" opacity="0.4" />
            <polygon points="760,560 790,320 830,320 850,560" fill="#0D1B36" opacity="0.6" />
            <polygon points="980,560 1000,410 1050,410 1070,560" fill="#0B132A" opacity="0.7" />
            <polygon points="1200,560 1220,380 1260,380 1280,560" fill="#0C152C" opacity="0.5" />

            {/* Faint blue/cyan connection lines and circles (Cybernetic network mesh) */}
            <g opacity="0.6">
              {/* Core network link lines */}
              <line x1="300" y1="450" x2="480" y2="400" stroke="url(#mesh-line-grad)" strokeWidth="1" />
              <line x1="480" y1="400" x2="650" y2="350" stroke="url(#mesh-line-grad)" strokeWidth="1.5" />
              <line x1="650" y1="350" x2="800" y2="420" stroke="url(#mesh-line-grad)" strokeWidth="1.2" strokeDasharray="4 4" />
              <line x1="800" y1="420" x2="1020" y2="430" stroke="url(#mesh-line-grad)" strokeWidth="1" />
              <line x1="480" y1="400" x2="520" y2="520" stroke="url(#mesh-line-grad)" strokeWidth="1" />
              <line x1="650" y1="350" x2="680" y2="500" stroke="url(#mesh-line-grad)" strokeWidth="1" />
              <line x1="800" y1="420" x2="840" y2="510" stroke="url(#mesh-line-grad)" strokeWidth="1" />

              {/* Pulsing mesh intersection nodes */}
              <circle cx="300" cy="450" r="3" fill="#5FA8D3" className="animate-pulse" />
              <circle cx="480" cy="400" r="5" fill="#D4A24C" />
              <circle cx="650" cy="350" r="4" fill="#5FA8D3" />
              <circle cx="800" cy="420" r="4.5" fill="#E8B86A" />
              <circle cx="1020" cy="430" r="3" fill="#5FA8D3" className="animate-pulse" />
            </g>

            {/* Foreground jagged craggy rocky outcrop from Left to Center */}
            <path
              d="M-50 780 C 140 780, 220 730, 280 660 C 310 620, 290 590, 340 550 C 370 520, 420 540, 460 480 C 440 540, 400 580, 340 620 C 300 650, 150 790, -50 820"
              fill="#060C1A"
            />
            {/* Shading/texture on rocky cliff */}
            <path
              d="M-50 795 C 100 795, 180 755, 230 695 C 240 680, 260 670, 275 645 C 265 670, 180 780, -50 810"
              fill="#0F1F3D"
              opacity="0.3"
            />

            {/* Glowing explorer figure standing silhouetted on upper outcrop */}
            {/* Figure coordinates anchored around x=444, y=478 */}
            <g opacity="0.95">
              {/* Figure body silhouette */}
              {/* Head */}
              <circle cx="444" cy="452" r="3" fill="#040810" />
              {/* Torso & dynamic cape path */}
              <path d="M441 455 L447 455 L449 472 L437 475 L441 455" fill="#040810" />
              {/* Right arm pointing forward slightly to city */}
              <path d="M446 458 L454 456 L453 458 L446 461 Z" fill="#040810" />
              {/* Legs */}
              <line x1="442" y1="472" x2="440" y2="480" stroke="#040810" strokeWidth="2" strokeLinecap="round" />
              <line x1="446" y1="472" x2="448" y2="480" stroke="#040810" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Faint blue horizon mist */}
            <rect x="0" y="540" width="1440" height="260" fill="url(#cyber-skyline-grad)" />
          </svg>
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 w-full px-6 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6">
          
          {/* Left Block: Decorative placeholder matching spacing layout */}
          <div className="w-full lg:w-[40%] flex justify-end xl:pr-12 pointer-events-none select-none">
            {/* Invisible column that lets the gorgeous silhouetted figure on the left outcrop remain completely unrestricted & visible! */}
            <div className="h-20 lg:h-96 w-1" />
          </div>

          {/* Right Block: Content Column, centered right of the figure */}
          <div className="w-full lg:w-[58%] text-left flex flex-col items-start pt-6 lg:pt-0">
            
            {/* Custom VF Monogram Symbol on Upper Axis */}
            <div className="relative group mb-8 flex items-center gap-1">
              
              {/* Monogram base containing subtle background radial glow */}
              <div className="absolute inset-0 -m-8 bg-dashed bg-[#D4A24C]/5 rounded-full filter blur-xl animate-pulse" />
              
              <div className="relative flex items-center justify-center w-20 h-20 rounded-xl bg-gradient-to-br from-[#0E1729] to-[#050A14] border-2 border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
                {/* Glowing surface shader */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D4A24C]/10 via-transparent to-white/10" />
                <span className="text-4xl font-extrabold font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-[#C0C5CC] to-[#D4A24C]">VF</span>
                
                {/* Upper Right Lens Flare element */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full filter blur-sm animate-ping opacity-75" />
                <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#E8B86A] rounded-full shadow-[0_0_12px_#D4A24C] flex items-center justify-center">
                  <div className="w-1 h-3 bg-white rounded-full transform rotate-45 animate-pulse" />
                </div>
              </div>

              {/* Stacked Wordmark Label next to the large monogram */}
              <div className="flex flex-col ml-5 justify-center">
                <div className="text-[20px] sm:text-[23px] font-black uppercase tracking-[0.25em] font-display flex items-center leading-none">
                  <span className="text-[#C0C5CC]">VISION</span>
                  <span className="text-[#D4A24C] ml-1.5">FORGED</span>
                </div>
                {/* Minimalist Separator Line and stacked text */}
                <div className="h-[1px] bg-gradient-to-r from-[#C0C5CC]/40 via-[#D4A24C]/45 to-transparent w-full my-1.5" />
                <div className="text-[10px] font-bold text-[#7A8699] uppercase tracking-[0.34em] font-display">
                  VENTURES LLC
                </div>
              </div>
            </div>

            {/* EYEBROW EXPLAINER */}
            <div className="mb-4">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#D4A24C] uppercase tracking-[0.3em] font-display px-3 py-1 bg-[#D4A24C]/10 border border-[#D4A24C]/25 rounded-full">
                FORGING THE FUTURES OF INDUSTRY
              </span>
            </div>

            {/* IMMERSIVE HEADER TAGLINE */}
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold font-display tracking-tight text-white mb-6 leading-[1.15]">
              BRINGING CREATIVE IDEAS <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B8C2D1] to-[#D4A24C]">TO LIGHT</span> THROUGH MODERN <br className="hidden sm:inline" />
              DAY TECHNOLOGY.
            </h1>

            {/* SUPPORTIVE BODY */}
            <p className="text-[#B8C2D1] text-xs sm:text-sm max-w-xl mb-10 leading-relaxed font-sans">
              We operate at the convergence of software scale, automation intelligence, and high-precision physical manufacturing. We turn architectural engineering dreams into resilient corporate realities.
            </p>

            {/* CALL TO ACTIONS */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                id="hero-cta-explore"
                onClick={() => handleNavClick("ABOUT", "about")}
                className="bg-gradient-gold text-[#050A14] font-black uppercase tracking-[0.2em] text-[11px] px-8 py-4 rounded-[4px] font-display hover:shadow-[0_0_25px_rgba(212,162,76,0.35)] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                EXPLORE OUR VISION 
                <ArrowRight size={13} className="transform group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                id="hero-cta-view-ventures"
                onClick={() => handleNavClick("VENTURES", "ecosystem")}
                className="border border-white/25 hover:border-[#D4A24C] hover:text-[#D4A24C] text-[11px] font-black uppercase tracking-[0.2em] px-8 py-4 rounded-[4px] font-display transition-all duration-300 bg-[#0E1729]/50 backdrop-blur-sm flex items-center justify-center gap-2 group cursor-pointer"
              >
                VIEW VENTURES
                <ChevronRight size={13} className="transform group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================
          3. VALUE PILLARS STRIP
          ===================================== */}
      <section className="bg-[#02050A] border-y border-white/5 py-10" id="pillars-strip">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-4 items-center">
            
            {[
              { icon: Sparkles, text: "INNOVATION DRIVEN", sub: "Disruptive Design" },
              { icon: Code, text: "TECHNOLOGY FOCUSED", sub: "Proprietary Architecture" },
              { icon: Layers, text: "FUTURE BUILDERS", sub: "Next-Gen Legacy" },
              { icon: TargetFirst, text: "IMPACT FIRST", sub: "Permanent Footprint" }
            ].map((pillar, i) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 group justify-center lg:justify-start"
                  id={`pillar-item-${i}`}
                >
                  <div className="w-10 h-10 rounded-sm bg-[#0E1729] border border-[#D4A24C]/35 flex items-center justify-center text-[#D4A24C] group-hover:shadow-[0_0_15px_rgba(212,162,76,0.2)] transition-shadow duration-300">
                    <IconComp size={16} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white group-hover:text-[#D4A24C] transition-colors duration-300 select-none leading-none mb-1">
                      {pillar.text}
                    </span>
                    <span className="text-[8.5px] font-bold text-[#7A8699] uppercase tracking-[0.15em] leading-none">
                      {pillar.sub}
                    </span>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* =====================================
          4. ABOUT / MISSION SECTION
          ===================================== */}
      <section id="about" className="py-24 max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block -> Paragraphs & Mission pitch */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* EYEBROW */}
            <span className="text-[10px] sm:text-[11px] font-bold text-[#D4A24C] uppercase tracking-[0.25em] mb-4 outline-none">
              ABOUT US
            </span>
            
            {/* HEADING */}
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-8">
              Ideas Are Born. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A24C] to-[#E8B86A]">We Make Them Real.</span>
            </h2>

            {/* BODY PARAGRAPHS */}
            <p className="text-[#B8C2D1] text-xs sm:text-sm leading-relaxed mb-6 font-sans">
              At VisionForged Ventures LLC, we do not simply invest; we forge. We are an ecosystem of engineers, architects, and technologists focused on translating highly complex, future-driven concepts into permanent industrial platforms. We design and launch structures that shape the technological standard of tomorrow.
            </p>
            
            <p className="text-[#7A8699] text-xs sm:text-sm leading-relaxed mb-10 font-sans">
              By consolidating proprietary software framework scale with mechanical manufacturing automation and material synthesis expertise, we bypass standard limitations, transforming bold ideas from basic sketches into functional, physical operations. Our projects are engineered on principles of long-term utility, security, and global impact.
            </p>

            {/* BUTTON */}
            <button
              id="about-cta-learn-more"
              onClick={() => {
                setContactSubject("Strategic Partnership");
                setIsContactModalOpen(true);
              }}
              className="border border-white/25 hover:border-[#D4A24C] hover:text-[#D4A24C] text-[11px] font-black uppercase tracking-[0.2em] px-8 py-4 rounded-[4px] font-display transition-all duration-300 bg-[#0E1729]/40 inline-flex items-center gap-2 group cursor-pointer"
            >
              LEARN MORE ABOUT US
              <ArrowRight size={13} className="transform group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          {/* Right Block -> Glowing futuristic SVG Globe / Interactive radar layout with overlying card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient Background Glow Orb */}
            <div className="absolute inset-0 bg-[#D4A24C]/5 rounded-full filter blur-2xl pointer-events-none" />

            {/* 3D Wireframe Spinning Globe Representation via pure SVG */}
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
              
              {/* Spinning Ring orbits CSS Animation */}
              <svg className="w-full h-full animate-[spin_50s_linear_infinite]" viewBox="0 0 400 400" fill="none">
                <circle cx="200" cy="200" r="180" stroke="rgba(95, 168, 211, 0.15)" strokeWidth="1" strokeDasharray="5 15" />
                <circle cx="200" cy="200" r="150" stroke="rgba(212, 162, 76, 0.12)" strokeWidth="1.5" />
                <circle cx="200" cy="200" r="120" stroke="rgba(95, 168, 211, 0.2)" strokeWidth="1" />
                <circle cx="200" cy="200" r="90" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" strokeDasharray="10 5" />
                
                {/* Horizontal & Vertical grid crossbars */}
                <ellipse cx="200" cy="200" rx="150" ry="40" stroke="rgba(95, 168, 211, 0.2)" strokeWidth="1" />
                <ellipse cx="200" cy="200" rx="40" ry="150" stroke="rgba(95, 168, 211, 0.15)" strokeWidth="1" />
                
                {/* Simulated geographic nodes representing "Orange light city continents" */}
                {/* Asia / Europe cluster */}
                <circle cx="280" cy="150" r="3" fill="#D4A24C" className="animate-ping" style={{ animationDuration: "3s" }} />
                <circle cx="280" cy="150" r="2.5" fill="#E8B86A" />
                <circle cx="260" cy="130" r="2" fill="#E8B86A" />
                <circle cx="295" cy="165" r="3.5" fill="#D4A24C" />
                
                {/* Americas Cluster */}
                <circle cx="120" cy="180" r="3" fill="#D4A24C" className="animate-ping" style={{ animationDuration: "4s" }} />
                <circle cx="120" cy="180" r="2.5" fill="#E8B86A" />
                <circle cx="100" cy="210" r="2" fill="#E8B86A" />
                <circle cx="140" cy="160" r="3.5" fill="#D4A24C" />

                {/* Australia Group */}
                <circle cx="310" cy="260" r="3" fill="#E8B86A" />
                <circle cx="290" cy="280" r="2" fill="#E8B86A" />

                {/* Connection energy arcs */}
                <path d="M 120,180 Q 200,100 280,150" stroke="rgba(95, 168, 211, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 140,160 Q 220,240 310,260" stroke="#D4A24C" strokeWidth="1.2" opacity="0.5" />
              </svg>

              {/* Central high-tech target interface marker */}
              <div className="absolute w-28 h-28 border border-dashed border-[#5FA8D3]/35 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]" />
              <div className="absolute w-12 h-12 bg-[#0F1A2E] border-2 border-[#D4A24C] rounded-full flex items-center justify-center shadow-lg shadow-[#D4A24C]/20">
                <Globe size={20} className="text-[#5FA8D3]" />
              </div>

              {/* FLOATING OVERLAY CARD - Bottom Right of the globe representation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                id="about-floating-mission"
                className="absolute bottom-[-10px] right-[-10px] sm:bottom-[10px] sm:right-[-20px] bg-[#0F1A2E]/95 border border-[#D4A24C]/35 rounded-lg p-5 max-w-[210px] text-left backdrop-blur-md shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
              >
                {/* Eyebrow */}
                <span className="text-[9px] font-black tracking-[0.2em] text-[#D4A24C] uppercase font-display block mb-2">
                  OUR MISSION
                </span>
                {/* Three precise structural lines */}
                <div className="text-[12px] font-bold text-white font-display leading-[1.6]">
                  Empower ideas. <br />
                  Build the future. <br />
                  Create lasting impact.
                </div>
                <div className="h-1 w-8 bg-[#D4A24C] mt-3 rounded" />
              </motion.div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================
          5. ECOSYSTEM GRID
          ===================================== */}
      <section id="ecosystem" className="py-24 bg-[#0E1729] border-y border-white/5 scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
            {/* Center eyebrow */}
            <span className="text-[10px] sm:text-[11px] font-bold text-[#D4A24C] uppercase tracking-[0.25em] mb-4">
              OUR FUTURE ECOSYSTEM
            </span>
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-4">
              Building Across Every Frontier
            </h2>
            <div className="h-[2px] w-16 bg-[#D4A24C] mb-6" />
            <p className="text-[#B8C2D1] text-xs sm:text-sm font-sans leading-relaxed">
              We focus on building long-standing enterprises inside key industrial quadrants. Click "EXPLORE" on any division to trigger detailed statistics and run programmatic structural simulations.
            </p>
          </div>

          {/* 4x2 Grid of cards (collapses on tablet and mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecosystemSectors.map((sector, idx) => {
              const IconComp = sector.icon;
              return (
                <motion.div
                  key={sector.id}
                  id={`ecosystem-card-${sector.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedVenture(sector)}
                  className="bg-[#0F1A2E] border border-white/5 rounded-lg p-6 flex flex-col justify-between items-start text-left cursor-pointer transition-all duration-300 hover:border-[#D4A24C]/45 hover:-translate-y-2 hover:shadow-[0_12px_25px_rgba(212,162,76,0.1)] group relative overflow-hidden"
                >
                  {/* Subtle inner card border accent */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A24C]/10 to-transparent" />
                  
                  <div className="w-full">
                    {/* Cyan icon badge */}
                    <div className="w-12 h-12 rounded-lg bg-[#050A14] flex items-center justify-center text-[#5FA8D3] border border-white/5 mb-6 group-hover:border-[#5FA8D3]/40 group-hover:bg-[#5FA8D3]/5 transition-all duration-300">
                      <IconComp size={22} strokeWidth={1.5} />
                    </div>

                    {/* UPPERCASE TITLE */}
                    <h3 className="text-sm font-black font-display tracking-[0.1em] text-white uppercase mb-3 select-none">
                      {sector.title}
                    </h3>

                    {/* 3LINE MUTED DESCRIPTION */}
                    <p className="text-[#7A8699] text-xs leading-relaxed font-sans mb-8">
                      {sector.desc}
                    </p>
                  </div>

                  {/* EXPLORE GOLD LINK */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#D4A24C] hover:text-[#E8B86A] transition-colors uppercase tracking-[0.15em] font-display">
                    EXPLORE 
                    <ArrowRight size={12} className="transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =====================================
          6. VISION BANNER
          ===================================== */}
      <section className="py-24 max-w-[1200px] mx-auto px-6 scroll-mt-20" id="vision-banner-sec">
        
        {/* Full-width dark card with thin gold border */}
        <div className="bg-[#0F1A2E] border-2 border-[#D4A24C]/35 rounded-[4px] p-8 md:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Subtle inside gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E1729]/80 via-transparent to-[#0E1729]/80 pointer-events-none z-0" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Column 1 (Left): Concentric orbits + Faded VF logo */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start relative">
              <div className="relative w-44 h-44 flex items-center justify-center">
                
                {/* Faded background orbits */}
                <div className="absolute w-44 h-44 rounded-full border border-white/5 flex items-center justify-center animate-[spin_40s_linear_infinite]" />
                <div className="absolute w-32 h-32 rounded-full border border-dashed border-[#D4A24C]/15 flex items-center justify-center animate-[spin_20s_linear_infinite]" />
                <div className="absolute w-24 h-24 rounded-full border border-white/5 flex items-center justify-center" />

                {/* Large faded VF monogram */}
                <div className="text-7xl font-sans font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-tr from-[#7A8699]/10 via-[#7A8699]/15 to-[#D4A24C]/10 select-none">
                  VF
                </div>

                {/* Floating Orbit Core */}
                <div className="absolute top-6 left-6 w-1.5 h-1.5 rounded-full bg-[#5FA8D3] shadow-[0_0_8px_#5FA8D3]" />
                <div className="absolute bottom-6 right-6 w-1.5 h-1.5 rounded-full bg-[#D4A24C] shadow-[0_0_8px_#D4A24C]" />
              </div>
            </div>

            {/* Column 2 (Middle): Headings & explanatory paragraphs */}
            <div className="lg:col-span-5 text-left flex flex-col items-start border-y lg:border-y-0 lg:border-x border-white/10 py-8 lg:py-0 lg:px-8">
              {/* Eyebrow */}
              <span className="text-[10px] sm:text-[11px] font-bold text-[#D4A24C] uppercase tracking-[0.25em] mb-4">
                OUR VISION
              </span>
              
              {/* Stacked Headings */}
              <div className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white gap-1 flex flex-col mb-6">
                <div>Many products.</div>
                <div>Endless possibilities.</div>
                <div className="text-[#D4A24C]">Lasting impact.</div>
              </div>

              {/* Body explanation */}
              <p className="text-[#B8C2D1] text-xs leading-relaxed font-sans">
                We are building more than products. We are building a legacy of innovation that shapes the future for generations to come. Every technology we forge acts as a structural building block for other future systems.
              </p>
            </div>

            {/* Column 3 (Right): Three feature items mapped */}
            <div className="lg:col-span-4 text-left flex flex-col gap-6">
              
              {[
                {
                  icon: Sparkles,
                  title: "IDEAS THAT INSPIRE",
                  desc: "Sparking creativity across all disciplines, backed by execution."
                },
                {
                  icon: Cpu,
                  title: "TECHNOLOGY THAT EMPOWERS",
                  desc: "Developing open, unified, and ethical engineering systems."
                },
                {
                  icon: Shield,
                  title: "IMPACT THAT LASTS",
                  desc: "Forging a forward-looking legacy that stands generational change."
                }
              ].map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div key={idx} className="flex gap-4 items-start group" id={`vision-feature-${idx}`}>
                    {/* Small cyan icon circle */}
                    <div className="w-8 h-8 rounded-full bg-[#050A14] border border-[#5FA8D3]/35 flex items-center justify-center text-[#5FA8D3] shrink-0 group-hover:bg-[#5FA8D3]/10 transition-colors duration-300">
                      <ItemIcon size={14} />
                    </div>
                    <div className="flex flex-col text-left">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.15em] text-white group-hover:text-[#D4A24C] transition-colors duration-300 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[#7A8699] text-[11px] leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================
          7. CTA STRIP
          ===================================== */}
      <section className="py-16 bg-[#02050A] border-y border-white/5 scroll-mt-20" id="contact-strip">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            
            {/* Left Block: Eyebrow + Sub */}
            <div className="text-left">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#D4A24C] uppercase tracking-[0.25em] block mb-3">
                READY TO BUILD THE FUTURE TOGETHER?
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white gap-2">
                Let's forge what's next.
              </h3>
            </div>

            {/* Middle Block: Gold button handler */}
            <div>
              <button
                id="cta-strip-btn-get-touch"
                onClick={() => {
                  setContactSubject("Venture Funding");
                  setIsContactModalOpen(true);
                }}
                className="bg-gradient-gold text-[#050A14] hover:shadow-[0_0_20px_rgba(212,162,76,0.3)] transition-all duration-300 font-extrabold uppercase tracking-[0.2em] text-[11px] px-8 py-4 rounded-[4px] font-display flex items-center gap-2 group cursor-pointer"
              >
                GET IN TOUCH
                <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Block: Email link + faint circle socials */}
            <div className="flex flex-col items-start lg:items-end text-left lg:text-right font-sans">
              <a
                href="mailto:info@visionforgedventures.com"
                className="text-xs sm:text-sm font-semibold text-[#D4A24C] hover:text-[#E8B86A] transition-colors tracking-wider flex items-center gap-1.5 mb-3"
              >
                <Mail size={14} className="text-[#5FA8D3]" />
                info@visionforgedventures.com
              </a>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-[#7A8699] uppercase tracking-wider mr-2">
                  FOLLOW OUR JOURNEY
                </span>
                
                {[
                  { icon: Linkedin, url: "https://linkedin.com", id: "linkedin" },
                  { icon: Twitter, url: "https://twitter.com", id: "twitter" },
                  { icon: Youtube, url: "https://youtube.com", id: "youtube" }
                ].map((social) => {
                  const SocialIcon = social.icon;
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-white/10 hover:border-[#D4A24C] hover:text-[#D4A24C] text-[#7A8699] flex items-center justify-center transition-all bg-[#0F1A2E]/40"
                      aria-label={`Follow us on ${social.id}`}
                    >
                      <SocialIcon size={13} />
                    </a>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================
          7.5 SPECIAL CAREERS SECTION ("GET MATCHED / JOIN US")
          ===================================== */}
      <section id="careers-center" className="py-24 max-w-[1200px] mx-auto px-6 scroll-mt-20">
        <div className="bg-[#0F1A2E]/40 border border-white/5 rounded-lg p-8 md:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Tech job listing descriptions */}
            <div className="text-left flex flex-col items-start">
              
              {/* Eyebrow */}
              <span className="text-[10px] sm:text-[11px] font-bold text-[#D4A24C] uppercase tracking-[0.25em] mb-4">
                CAREERS
              </span>

              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight mb-4">
                Enter the Forge of Tomorrow
              </h2>
              <div className="h-[2px] w-12 bg-[#D4A24C] mb-6" />

              <p className="text-[#B8C2D1] text-xs leading-relaxed mb-6 font-sans">
                We are actively looking for visionaries who want to transcend theoretical limitations. There are currently active roles available within our key core branches:
              </p>

              {/* Roles listed precisely */}
              <div className="flex flex-col gap-3 w-full self-stretch">
                {[
                  { role: "Senior Distributed Architect", label: "SOFTWARE DIVISION" },
                  { role: "Vector Transformer Engineer", label: "AI DIVISION" },
                  { role: "Kinematics Control Specialist", label: "AUTOMATION DIVISION" },
                  { role: "Aerospace Structural Designer", label: "ENGINEERING DIVISION" }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 bg-[#050A14] rounded-sm border border-white/5 hover:border-[#D4A24C]/30 transition-all duration-300"
                  >
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-white uppercase tracking-wider">{item.role}</span>
                      <span className="text-[8.5px] font-medium text-[#7A8699] uppercase tracking-widest mt-0.5">{item.label}</span>
                    </div>
                    <span className="text-[#5FA8D3] text-[9.5px] font-black uppercase tracking-[0.15em] flex items-center gap-1">
                      ACTIVE ROLE <ArrowUpRight size={12} />
                    </span>
                  </div>
                ))}
              </div>

            </div>

            {/* Careers query system form */}
            <div className="bg-[#0F1A2E] border-2 border-white/5 p-6 rounded-lg text-left relative overflow-hidden flex flex-col justify-center">
              
              <div className="absolute inset-x-0 top-0 h-[2px] bg-[#D4A24C]" />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-sm bg-[#D4A24C]/10 border border-[#D4A24C] flex items-center justify-center text-[#D4A24C]">
                  <Users size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-white leading-none mb-1">
                    TALENT PATHFINDER
                  </h4>
                  <p className="text-[9.5px] font-medium text-[#7A8699] uppercase tracking-wider leading-none">
                    INSTANT VENTURE ROLE ALIGNER
                  </p>
                </div>
              </div>

              {!careersSuccess ? (
                <form onSubmit={handleCareersSubmit} className="flex flex-col gap-4">
                  
                  {/* Select Sector */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-bold text-[#7A8699] uppercase tracking-widest">
                      CHOOSE YOUR DISCIPLINE
                    </label>
                    <select
                      id="careers-select-role"
                      value={careersRole}
                      onChange={(e) => setCareersRole(e.target.value)}
                      className="w-full bg-[#050A14] border border-white/10 rounded px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#D4A24C] hover:border-[#7A8699]/30 transition-colors"
                    >
                      <option value="AI Engineering">AI Engineering & Cognitive Models</option>
                      <option value="Product Development">Advanced Software Architecture</option>
                      <option value="Industrial Automation">Industrial Kinematics & Robotics</option>
                      <option value="Quantum Systems">Physics & Metals Engineering</option>
                    </select>
                  </div>

                  {/* Input email address */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-bold text-[#7A8699] uppercase tracking-widest">
                      EMAIL CONTACT ADDRESS
                    </label>
                    <input
                      id="careers-input-email"
                      type="email"
                      placeholder="e.g., candidate@innovations.com"
                      value={careersEmail}
                      onChange={(e) => setCareersEmail(e.target.value)}
                      className="w-full bg-[#050A14] border border-white/10 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4A24C] hover:border-[#7A8699]/30 transition-colors"
                    />
                  </div>

                  {/* Button match */}
                  <button
                    id="careers-submit-btn"
                    type="submit"
                    className="w-full bg-gradient-gold text-[#050A14] hover:shadow-[0_0_15px_rgba(212,162,76,0.25)] font-black uppercase tracking-[0.2em] text-[10px] py-3.5 rounded-[4px] mt-2 transition-all font-display cursor-pointer text-center"
                  >
                    SUBMIT INQUIRY →
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-12 h-12 bg-[#D4A24C]/10 border-2 border-[#D4A24C] rounded-full flex items-center justify-center text-[#D4A24C] mx-auto mb-4">
                    <Check size={22} />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-[#E8B86A] mb-1">
                    CONNECTION DESIGNATED
                  </h4>
                  <p className="text-[11px] text-[#7A8699] uppercase font-bold tracking-widest mb-6">
                    MATCH SECTOR: {careersRole}
                  </p>
                  <p className="text-[#B8C2D1] text-xs max-w-xs mx-auto leading-relaxed mb-6">
                    Our staffing system has parsed your coordinates. We will dispatch recruitment packets to <strong>{careersEmail}</strong> within 12 standard operating cycles.
                  </p>
                  <button
                    id="careers-reset-btn"
                    onClick={() => {
                      setCareersSuccess(false);
                      setCareersEmail("");
                    }}
                    className="text-[10px] text-[#D4A24C] uppercase tracking-[0.15em] font-extrabold hover:underline"
                  >
                    SUBMIT ANOTHER ALIGNMENT
                  </button>
                </motion.div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* =====================================
          8. FOOTER
          ===================================== */}
      <footer className="bg-[#02050A] border-t border-white/5 py-16 text-left relative" id="main-footer">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1 -> Brand logo detailed */}
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-3">
                {/* Silver/gold logos */}
                <div className="w-12 h-12 rounded bg-[#0F1A2E] border border-white/10 flex items-center justify-center font-display shadow-lg">
                  <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-[#C0C5CC] to-[#D4A24C]">VF</span>
                </div>
                <div className="flex flex-col">
                  <div className="text-[14px] font-black uppercase tracking-[0.2em] font-display">
                    <span className="text-[#C0C5CC]">VISION</span>
                    <span className="text-[#D4A24C] ml-1.5">FORGED</span>
                  </div>
                  {/* Line divide */}
                  <div className="h-[1px] bg-gradient-to-r from-[#C2C7D0]/40 to-[#D4A24C]/45 w-full my-0.5" />
                  <div className="text-[8px] font-bold text-[#7A8699] uppercase tracking-[0.3em] font-display">
                    VENTURES LLC
                  </div>
                </div>
              </div>
              <p className="text-[#7A8699] text-xs leading-relaxed font-sans max-w-xs mt-3">
                Architectural design, elite software development orchestration, sensory robotics integration, and lasting physical manufacturing assets.
              </p>
            </div>

            {/* Column 2 -> Company Links */}
            <div className="flex flex-col items-start gap-3">
              <span className="text-[10px] font-bold text-[#D4A24C] uppercase tracking-[0.25em] mb-2 font-display">
                COMPANY
              </span>
              {[
                { label: "ABOUT US", anchor: "about" },
                { label: "VENTURES", anchor: "ecosystem" },
                { label: "CAREERS", anchor: "careers-center" },
                { label: "CONTACT US", anchor: "contact-strip" }
              ].map((link, j) => (
                <button
                  key={j}
                  id={`footer-company-link-${j}`}
                  onClick={() => handleNavClick(link.label, link.anchor)}
                  className="text-xs text-[#7A8699] hover:text-white transition-colors duration-300 uppercase tracking-widest font-semibold"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Column 3 -> Resources Links */}
            <div className="flex flex-col items-start gap-3">
              <span className="text-[10px] font-bold text-[#D4A24C] uppercase tracking-[0.25em] mb-2 font-display">
                RESOURCES
              </span>
              {[
                { label: "Proprietary Tech", anchor: "ecosystem" },
                { label: "Future Projects", anchor: "vision-banner-sec" },
                { label: "Venture News", anchor: "ecosystem" },
                { label: "Privacy Core Plan", anchor: "about" }
              ].map((item, key) => (
                <button
                  key={key}
                  id={`footer-resources-item-${key}`}
                  onClick={() => handleNavClick("VENTURES", item.anchor)}
                  className="text-xs text-[#7A8699] hover:text-white transition-colors duration-300 uppercase tracking-widest font-semibold text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Column 4 -> Stay Connected Submit email */}
            <div className="flex flex-col items-start gap-4">
              <span className="text-[10px] font-bold text-[#D4A24C] uppercase tracking-[0.25em] mb-1 font-display">
                STAY CONNECTED
              </span>
              <p className="text-[#7A8699] text-xs leading-relaxed max-w-xs mb-1">
                Establish a direct terminal pathway to receive quarterly updates on active tech alignments.
              </p>

              {!newsletterSuccess ? (
                <form onSubmit={handleNewsletterSubmit} className="flex w-full max-w-xs relative items-stretch border border-white/10 focus-within:border-[#D4A24C] rounded overflow-hidden">
                  <input
                    id="footer-email-input"
                    type="email"
                    placeholder="ENTER YOUR PROTOCOL EMAIL"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-[#050A14] text-[10px] font-semibold text-white px-3.5 py-3 focus:outline-none placeholder-[#7A8699] tracking-wider uppercase"
                  />
                  <button
                    id="footer-email-submit-btn"
                    type="submit"
                    className="bg-[#D4A24C] hover:bg-[#E8B86A] text-[#050A14] px-4 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                    aria-label="Submit newsletter email"
                  >
                    <Send size={14} />
                  </button>
                </form>
              ) : (
                <div className="p-3 bg-[#D4A24C]/10 border border-[#D4A24C] rounded text-left w-full max-w-xs">
                  <span className="text-[10px] font-black uppercase text-[#E8B86A] tracking-wider block mb-1">PATHWAY CONNECTED</span>
                  <span className="text-[9px] text-[#7A8699] tracking-widest uppercase block mb-1">MONITOR: {newsletterEmail}</span>
                  <span className="text-[11px] text-white/90 leading-relaxed font-semibold">Your coordinates have been safely recorded inside our dispatch matrix.</span>
                </div>
              )}
            </div>

          </div>

          {/* Bottom Bar containing standard text */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[11px] text-[#7A8699]">
            <span>© 2026 VisionForged Ventures LLC. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#about" className="hover:text-white transition-colors duration-300 uppercase tracking-widest font-semibold">Security Matrix</a>
              <span>·</span>
              <a href="#about" className="hover:text-white transition-colors duration-300 uppercase tracking-widest font-semibold">Terms of Forge</a>
            </div>
          </div>

        </div>
      </footer>

      {/* =====================================
          MODAL INTERFACE: VENTURE SECTOR DETAILS
          ===================================== */}
      <AnimatePresence>
        {selectedVenture && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#050A14]/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => {
              setSelectedVenture(null);
              setSimOutput([]);
              setSimResult("");
            }}
          >
            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0F1A2E] border-2 border-[#D4A24C] rounded-lg max-w-3xl w-full relative shadow-[0_0_50px_rgba(212,162,76,0.3)] overflow-hidden"
            >
              
              {/* Gold Top Grid Highlight */}
              <div className="h-1.5 bg-gradient-to-r from-[#C99547] via-[#E8B86A] to-[#D4A24C]" />

              <button
                id="venture-modal-close-btn"
                onClick={() => {
                  setSelectedVenture(null);
                  setSimOutput([]);
                  setSimResult("");
                }}
                className="absolute top-4 right-4 text-[#7A8699] hover:text-white cursor-pointer bg-[#050A14] w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="p-6 md:p-8">
                
                {/* Modal Title and Sector Type info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-lg bg-[#050A14] border border-[#5FA8D3] text-[#5FA8D3] flex items-center justify-center">
                    {/* Render matching Lucide Icon */}
                    {(() => {
                      const SectIcon = selectedVenture.icon;
                      return <SectIcon size={30} strokeWidth={1.5} />;
                    })()}
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-[#D4A24C] uppercase tracking-[0.25em] leading-none block mb-1">
                      VISIONFORGED CORPORATE BRANCH
                    </span>
                    <h3 className="text-lg md:text-xl font-black font-display tracking-[0.1em] text-white uppercase leading-none">
                      {selectedVenture.title}
                    </h3>
                  </div>
                </div>

                <div className="h-[1px] bg-white/10 w-full mb-6" />

                {/* Main sector metrics layout split columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-left">
                  
                  {/* Left Column info */}
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#7A8699] mb-3">
                      OVERVIEW & VENTURE FOCUS
                    </h4>
                    <p className="text-sm font-semibold text-white mb-2 leading-relaxed">
                      {selectedVenture.subtitle}
                    </p>
                    <p className="text-xs text-[#B8C2D1] leading-relaxed mb-6">
                      We consolidate physical resources and algorithmic capabilities to expand output bounds inside the "{selectedVenture.title}" quadrant. Core milestones track our multi-layered engineering projections.
                    </p>

                    {/* Stats Boxes */}
                    <div className="flex flex-col gap-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-[#7A8699]">
                        LIVE BRANCH METRICS
                      </h4>
                      {selectedVenture.stats.map((st, sI) => (
                        <div key={sI} className="bg-[#050A14] rounded px-4 py-2 flex justify-between items-center border border-white/5">
                          <span className="text-[10px] font-medium text-[#7A8699] uppercase tracking-wider">{st.label}</span>
                          <span className="text-xs font-black text-[#D4A24C] font-display">{st.value}</span>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Right Column details */}
                  <div className="flex flex-col gap-6">
                    
                    {/* R&D Tech Blocks list */}
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-[#7A8699] mb-3">
                        PROPRIETARY R&D TECHNOLOGY
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {selectedVenture.rndTech.map((tech, tIdx) => (
                          <li key={tIdx} className="flex gap-2 items-start text-xs text-[#B8C2D1]">
                            <span className="text-[#5FA8D3] font-black text-sm leading-none">•</span>
                            <span>{tech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Roadmaps list */}
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-[#7A8699] mb-3">
                        ALIGNED ROADMAP MILESTONES
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {selectedVenture.milestones.map((milestone, mIdx) => (
                          <li key={mIdx} className="bg-[#0E1729] border border-white/5 rounded px-3.5 py-2.5 text-[11px] font-medium text-[#7A8699] leading-relaxed">
                            {milestone}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                </div>

                {/* Programmatic Terminal Simulator segment */}
                <div className="h-[1px] bg-white/10 w-full my-6" />

                <div className="bg-[#050A14] rounded-lg border border-[#5FA8D3]/30 p-5 text-left font-mono relative overflow-hidden">
                  
                  {/* Decorative Terminal Header */}
                  <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-600/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-600/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-600/60" />
                      <span className="text-[10px] font-semibold text-[#7A8699] ml-2 tracking-wide uppercase">VISIONFORGED DIAGNOSTIC SHELL v0.94</span>
                    </div>
                    <Terminal size={14} className="text-[#5FA8D3]" />
                  </div>

                  {/* Simulator Control Action */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-[#D4A24C] uppercase tracking-wider">SECURE STRUCTURAL TELEMETRY</span>
                      <button
                        id="terminal-run-simulate-btn"
                        onClick={() => runSectorSimulation(selectedVenture)}
                        disabled={simInProgress}
                        className={`text-[9.5px] font-black uppercase tracking-[0.14em] px-4 py-2 rounded font-display transition-colors cursor-pointer ${
                          simInProgress ? "bg-[#0E1729] text-[#7A8699] border border-white/10" : "bg-[#5FA8D3]/15 hover:bg-[#5FA8D3]/25 text-[#5FA8D3] border border-[#5FA8D3]/45"
                        }`}
                      >
                        {simInProgress ? "VALIDATING CORE..." : "SIMULATE INTEGRITY →"}
                      </button>
                    </div>

                    {/* Output panel logs */}
                    <div className="bg-black/50 rounded p-3 min-h-[90px] max-h-[140px] overflow-y-auto text-[10.5px] text-[#B8C2D1] flex flex-col gap-1 shadow-inner leading-relaxed">
                      {simOutput.length === 0 && (
                        <span className="text-[#7A8699] italic">Shell system idle. Standard operational parameters fully initialized. Press simulate to run stress testing metrics.</span>
                      )}
                      
                      {simOutput.map((l, lI) => (
                        <div key={lI} className="flex gap-1">
                          <span className="text-[#5FA8D3] shrink-0 font-bold">&gt;</span>
                          <span>{l}</span>
                        </div>
                      ))}

                      {simResult && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-[#D4A24C] border-t border-[#D4A24C]/25 pt-2 uppercase font-bold text-[10px] tracking-wide"
                        >
                          {simResult}
                        </motion.div>
                      )}
                    </div>
                  </div>

                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    id="venture-modal-dismiss-cta"
                    onClick={() => {
                      setSelectedVenture(null);
                      setSimOutput([]);
                      setSimResult("");
                    }}
                    className="border border-white/10 hover:border-[#D4A24C] text-[10px] font-black uppercase tracking-[0.15em] px-5 py-2.5 rounded font-display transition-all cursor-pointer"
                  >
                    DISMISS DETAILS
                  </button>
                  <button
                    id="venture-modal-inquire-cta"
                    onClick={() => {
                      setContactSubject(`Sector Focus: ${selectedVenture.title}`);
                      setSelectedVenture(null);
                      setIsContactModalOpen(true);
                    }}
                    className="bg-gradient-gold text-[#050A14] text-[10px] font-black uppercase tracking-[0.15em] px-6 py-2.5 rounded font-display hover:shadow-[0_0_15px_rgba(212,162,76,0.25)] transition-all cursor-pointer"
                  >
                    INQUIRE ABOUT DIVISION
                  </button>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================
          MODAL INTERFACE: QUANTUM CONTACT CENTER
          ===================================== */}
      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#050A14]/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => {
              setIsContactModalOpen(false);
              resetContactForm();
            }}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.45 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0F1A2E] border-2 border-[#D4A24C] rounded-lg max-w-lg w-full relative shadow-[0_0_45px_rgba(212,162,76,0.25)] overflow-hidden"
            >
              
              <div className="h-1.5 bg-gradient-to-r from-[#D4A24C] to-[#E8B86A]" />

              <button
                id="contact-modal-close-btn"
                onClick={() => {
                  setIsContactModalOpen(false);
                  resetContactForm();
                }}
                className="absolute top-4 right-4 text-[#7A8699] hover:text-white cursor-pointer bg-[#050A14] w-8 h-8 rounded-full border border-white/10 flex items-center justify-center"
                aria-label="Close contact form"
              >
                <X size={18} />
              </button>

              <div className="p-6 md:p-8">
                
                {/* Header title */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-sm bg-[#D4A24C]/10 border border-[#D4A24C] flex items-center justify-center text-[#D4A24C]">
                    <Mail size={18} />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] font-black uppercase text-[#D4A24C] tracking-[0.2em] block mb-1">
                      SECURED TRANSMISSION MATRIX
                    </span>
                    <h3 className="text-sm font-black font-display tracking-widest text-white uppercase leading-none">
                      ESTABLISH THE FORGE CONNECTION
                    </h3>
                  </div>
                </div>

                <div className="h-[1px] bg-white/10 w-full mb-6" />

                {!formSubmitted ? (
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-4 text-left">
                    
                    {/* Interactive select alignment */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] font-bold text-[#7A8699] uppercase tracking-widest font-display">
                        TRANSMISSION ALIGNMENT CAPABILITY
                      </label>
                      <select
                        id="contact-form-subject"
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        className="w-full bg-[#050A14] border border-white/10 rounded px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#D4A24C] hover:border-[#7A8699]/30 transition-colors"
                      >
                        <option value="Venture Funding">Venture Investment Proposal</option>
                        <option value="Strategic Partnership">Strategic Strategic Alliance</option>
                        <option value="Future Collaboration">Joint Core Framework R&D</option>
                        <option value="Technology Integration">Hardware/Software Licensing</option>
                        <option value="General Inquiries">Other Structural Alignment</option>
                      </select>
                    </div>

                    {/* Name input */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] font-bold text-[#7A8699] uppercase tracking-widest font-display">
                        IDENTITY LABEL / FULL NAME
                      </label>
                      <input
                        id="contact-form-name"
                        type="text"
                        placeholder="e.g., ARCHITECT ALAN TURING"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full bg-[#050A14] border border-white/10 rounded px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#D4A24C] hover:border-[#7A8699]/30 transition-colors tracking-wider uppercase font-semibold"
                      />
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] font-bold text-[#7A8699] uppercase tracking-widest font-display">
                        SECURE COMMUNICATION ROUTE (EMAIL)
                      </label>
                      <input
                        id="contact-form-email"
                        type="email"
                        placeholder="e.g., core@visionarysystems.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full bg-[#050A14] border border-white/10 rounded px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#D4A24C] hover:border-[#7A8699]/30 transition-colors"
                      />
                    </div>

                    {/* Concept outline text */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] font-bold text-[#7A8699] uppercase tracking-widest font-display">
                        VENTURE CONCEPT OUTLINE MATRIX
                      </label>
                      <textarea
                        id="contact-form-message"
                        rows={3}
                        placeholder="Describe your technological concept, target performance metrics, or details about your enterprise..."
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        className="w-full bg-[#050A14] border border-white/10 rounded px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#D4A24C] hover:border-[#7A8699]/30 transition-colors resize-none leading-relaxed"
                      />
                    </div>

                    <p className="text-[9.5px] leading-relaxed text-[#7A8699]">
                      By dispatching this form, you authorize VisionForged Ventures LLC's security filters to verify target coordinates. Communication security is certified.
                    </p>

                    <button
                      id="contact-form-submit-btn"
                      type="submit"
                      className="w-full bg-gradient-gold text-[#050A14] hover:shadow-[0_0_20px_rgba(212,162,76,0.3)] font-black uppercase tracking-[0.2em] text-[10.5px] py-4 rounded-[4px] mt-2 transition-all font-display cursor-pointer text-center"
                    >
                      DISPATCH TRANSMISSION →
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center flex flex-col items-center"
                  >
                    
                    {/* Complex multi-stage diagnostic processing output based on state */}
                    <div className="w-16 h-16 rounded-full border-2 border-[#D4A24C]/20 flex items-center justify-center relative mb-6">
                      {formStatusStep < 4 ? (
                        <div className="w-10 h-10 rounded-full border-4 border-[#D4A24C] border-t-transparent animate-spin" />
                      ) : (
                        <div className="w-12 h-12 bg-[#D4A24C]/10 border-2 border-[#D4A24C] rounded-full flex items-center justify-center text-[#D4A24C]">
                          <Check size={26} />
                        </div>
                      )}
                      <div className="absolute inset-0 border border-dashed border-[#5FA8D3]/35 rounded-full animate-[spin_10s_linear_infinite]" />
                    </div>

                    <h4 className="text-xs font-black uppercase text-[#E8B86A] tracking-[0.25em] mb-4">
                      {formStatusStep === 1 && "SECURING QUANTUM CHANNEL..."}
                      {formStatusStep === 2 && "VERIFYING CRYPTO-HANDSHAKE..."}
                      {formStatusStep === 3 && "DISPATCHING ENCRYPTED FLUX..."}
                      {formStatusStep === 4 && "TRANSMISSION SECURED"}
                    </h4>

                    {/* Progress tracking line indicator */}
                    <div className="w-44 bg-[#050A14] h-1.5 rounded-full mb-8 relative overflow-hidden border border-white/5">
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 bg-[#D4A24C] shadow-[0_0_8px_#D4A24C]"
                        animate={{
                          width:
                            formStatusStep === 1
                              ? "25%"
                              : formStatusStep === 2
                              ? "55%"
                              : formStatusStep === 3
                              ? "85%"
                              : "100%"
                        }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>

                    {formStatusStep === 4 ? (
                      <div className="text-center">
                        <span className="text-[10px] font-black uppercase text-white tracking-[0.2em] block mb-2">
                          CLEARANCE DISpatched: VFV-#{Math.floor(100000 + Math.random() * 900000)}
                        </span>
                        <p className="text-[#B8C2D1] text-xs max-w-xs mx-auto leading-relaxed mb-8">
                          Excellent, <strong>{formName}</strong>. Your structural inquiry regarding <strong>{contactSubject}</strong> was encoded and safely bypassed to our sector leads. We will establish localized contact at <strong>{formEmail}</strong>.
                        </p>
                        <button
                          id="contact-form-complete-dismiss-btn"
                          onClick={() => {
                            setIsContactModalOpen(false);
                            resetContactForm();
                          }}
                          className="text-[10px] text-[#D4A24C] uppercase tracking-[0.15em] font-extrabold hover:underline"
                        >
                          CLOSE ENCRYPTED MODULE
                        </button>
                      </div>
                    ) : (
                      <p className="text-[#7A8699] text-[11px] uppercase font-bold tracking-widest max-w-xs leading-relaxed">
                        Establishing directional laser link... do not shutdown node window.
                      </p>
                    )}

                  </motion.div>
                )}

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Custom internal sub-component to bypass TargetFirst lookup in TS
function TargetFirst({ size, strokeWidth }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size || 16}
      height={size || 16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth || 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
