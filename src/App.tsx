import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Activity, 
  Terminal, 
  Play, 
  Cpu, 
  Layers, 
  Network, 
  ArrowRight, 
  Lock, 
  Unlock, 
  Settings, 
  CheckCircle, 
  Server, 
  Workflow, 
  TrendingUp, 
  Globe, 
  Plus, 
  RefreshCw, 
  Menu, 
  X,
  Sparkles,
  Zap,
  Check,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

// ==========================================
// TYPES, INTERFACES & PRICING MATRIX
// ==========================================
interface Feature {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: React.ReactNode;
}

const PRICING_MATRIX = {
  tiers: {
    starter: {
      id: "starter",
      name: "Starter Sandbox",
      desc: "For engineers prototyping autonomous automation pipelines.",
      baseRate: 79,
      features: [
        "Up to 3 autonomous agents",
        "10,000 processed state steps/mo",
        "Standard latency queue",
        "Visual flowchart dashboard",
        "Community Slack support",
        "Weekly performance audit logs"
      ],
      popular: false,
      cta: "Spin Up Sandbox"
    },
    enterprise: {
      id: "enterprise",
      name: "Enterprise Autopilot",
      desc: "Comprehensive agent fleet with security policies & compliance.",
      baseRate: 249,
      features: [
        "Unlimited autonomous agents",
        "250,000 processed state steps/mo",
        "Ultra-low latency edge queue",
        "Visual flowchart + API trigger endpoints",
        "Priority 24/7 technical support",
        "Real-time compliance validation matrix",
        "Custom agent tooling & integrations"
      ],
      popular: true,
      cta: "Launch Autopilot Fleet"
    },
    sovereign: {
      id: "sovereign",
      name: "Global Sovereign",
      desc: "Custom self-hosted agent clusters with full zero-trust policy control.",
      baseRate: 899,
      features: [
        "Bespoke local LLM adapter layers",
        "Unlimited state steps & edge runs",
        "Sovereign cloud or physical node hosting",
        "SOC2 / HIPAA compliance engine adapters",
        "Dedicated engineering partner support",
        "Zero data-retention model safety policy",
        "Automated backup failover nodes"
      ],
      popular: false,
      cta: "Contact Architecture Team"
    }
  } as const,
  regions: {
    USD: { symbol: '$', rate: 1.0, tariff: 1.0 },
    EUR: { symbol: '€', rate: 0.92, tariff: 1.05 },
    INR: { symbol: '₹', rate: 83.5, tariff: 1.10 }
  } as const
};

// ==========================================
// COMPONENT DEFINITION
// ==========================================
export default function App() {
  // --- STATE ---
  const [activeHeroTab, setActiveHeroTab] = useState<string>('ai-strategy');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Feature 2: Bento-to-Accordion active state (shared context)
  const [activeBentoIndex, setActiveBentoIndex] = useState<number>(0);

  // Feature 1: Performance-Isolated Currency & Billing (0 parent re-renders)
  const billingPeriodRef = useRef<'monthly' | 'annual'>('annual');
  const currencyRef = useRef<'USD' | 'EUR' | 'INR'>('USD');

  // Custom Cursor state
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isCursorHovered, setIsCursorHovered] = useState(false);

  // Agent Console card state
  const [selectedAgentPrompt, setSelectedAgentPrompt] = useState<string>('leads');
  const [agentOutput, setAgentOutput] = useState<string[]>([]);
  const [isAgentRunning, setIsAgentRunning] = useState<boolean>(false);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Compliance Security mode
  const [isEncryptedMode, setIsEncryptedMode] = useState<boolean>(false);

  // Flowchart Architect state
  const [flowchartNodes, setFlowchartNodes] = useState([
    { id: '1', type: 'trigger', label: 'Incoming CRM Hook', desc: 'New Lead Added' },
    { id: '2', type: 'ai', label: 'NexaLLM Engine', desc: 'Semantic Lead Scoring' },
    { id: '3', type: 'action', label: 'Slack Alert & Sync', desc: 'Trigger high-value alert' }
  ]);

  const features: Feature[] = [
    {
      id: 'ai-strategy',
      title: 'AI Strategy Blueprinting',
      shortDesc: 'Automated workflow mapping & orchestration planning.',
      longDesc: 'Our orchestrator scans your operational directories, documents, and application connections to auto-generate structured, self-healing automation blueprints tailored to your business rules.',
      icon: <Network className="w-4 h-4 text-mystic-mint" />
    },
    {
      id: 'custom-agents',
      title: 'Autonomous Agent Fleet',
      shortDesc: 'Deploy specialized agents trained on custom tools.',
      longDesc: 'Spin up autonomous agents with specialized memory registers and API access keys. Each agent is capable of running continuous evaluation loops, diagnosing bugs, and resolving multi-step pipelines.',
      icon: <Cpu className="w-4 h-4 text-mystic-mint" />
    },
    {
      id: 'process-automation',
      title: 'Process Pipelines',
      shortDesc: 'Visual node orchestration with millisecond execution.',
      longDesc: 'Replace outdated CRON jobs and legacy ETL scripts with lightning-fast streaming pipelines. Trigger automations via standard REST webhooks, scheduled cron periods, or semantic data events.',
      icon: <Layers className="w-4 h-4 text-mystic-mint" />
    },
    {
      id: 'data-intelligence',
      title: 'Semantic Intelligence',
      shortDesc: 'Deep analytical insight summaries generated in real-time.',
      longDesc: 'Synthesize raw server logs, unstructured CRM conversations, and finance reports into precise analytical matrices. Automatically report summaries directly to Slack, Teams, or custom web portals.',
      icon: <Activity className="w-4 h-4 text-mystic-mint" />
    }
  ];

  // --- REFS & EFFECTS ---
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Background Three.js effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;

    // Create scene
    const scene = new THREE.Scene();
    // Add subtle ambient fog to look deep and atmospheric
    scene.fog = new THREE.FogExp2(0x09090b, 0.025);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 25;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.12);
    scene.add(ambientLight);

    // Point Light (follows mouse slightly, mint colored)
    const pointLight = new THREE.PointLight(0x34d399, 2.5, 40);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Directional Light (rim lighting for the metallic cubes)
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 15, 10);
    scene.add(dirLight);

    // Create floating wireframe and solid cubes
    const cubes: THREE.Mesh[] = [];
    const cubeCount = 18;
    const geometry = new THREE.BoxGeometry(2, 2, 2);

    for (let i = 0; i < cubeCount; i++) {
      // transluent, metallic material
      const material = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x0a0f1d : 0x18181b,
        roughness: 0.15,
        metalness: 0.9,
        transparent: true,
        opacity: 0.7,
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Create glowing mint wireframe edges for the cube
      const edges = new THREE.EdgesGeometry(geometry);
      const lineMat = new THREE.LineBasicMaterial({
        color: i % 3 === 0 ? 0x34d399 : 0x4b5563,
        transparent: true,
        opacity: 0.45
      });
      const line = new THREE.LineSegments(edges, lineMat);
      mesh.add(line);

      // Spread random coordinates in space
      mesh.position.set(
        (Math.random() - 0.5) * 36,
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 20
      );

      // Random rotation
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      );

      // Scale variation
      const scale = 0.4 + Math.random() * 1.6;
      mesh.scale.set(scale, scale, scale);

      // Velocity properties attached directly to mesh
      (mesh as any).speedX = (Math.random() - 0.5) * 0.012;
      (mesh as any).speedY = (Math.random() - 0.5) * 0.012 + 0.008; // Slight drift upwards
      (mesh as any).rotSpeedX = (Math.random() - 0.5) * 0.008;
      (mesh as any).rotSpeedY = (Math.random() - 0.5) * 0.008;

      scene.add(mesh);
      cubes.push(mesh);
    }

    // Mouse movement track variables
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMoveGlobal = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 12;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 12;
    };

    window.addEventListener('mousemove', onMouseMoveGlobal);

    // Dynamic resize handler using ResizeObserver
    const handleResize = () => {
      if (!canvasRef.current) return;
      const w = canvasRef.current.parentElement?.clientWidth || window.innerWidth;
      const h = canvasRef.current.parentElement?.clientHeight || window.innerHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (canvasRef.current.parentElement) {
      resizeObserver.observe(canvasRef.current.parentElement);
    }

    // Main render loop
    let animationId: number;
    const tick = () => {
      animationId = requestAnimationFrame(tick);

      // Linear interpolation (lerp) for ultra-smooth movement
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      // Position the glowing light following mouse
      pointLight.position.x = mouseX * 2;
      pointLight.position.y = mouseY * 2;

      cubes.forEach((cube) => {
        cube.rotation.x += (cube as any).rotSpeedX;
        cube.rotation.y += (cube as any).rotSpeedY;

        // Apply background physics and gentle mouse attraction
        cube.position.x += (cube as any).speedX + mouseX * 0.004;
        cube.position.y += (cube as any).speedY + mouseY * 0.004;

        // Boundary safety wrapping
        if (cube.position.y > 15) cube.position.y = -15;
        if (cube.position.y < -15) cube.position.y = 15;
        if (cube.position.x > 22) cube.position.x = -22;
        if (cube.position.x < -22) cube.position.x = 22;
      });

      renderer.render(scene, camera);
    };

    tick();

    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMoveGlobal);
      resizeObserver.disconnect();
      geometry.dispose();
      cubes.forEach((cube) => {
        if (Array.isArray(cube.material)) {
          cube.material.forEach((m) => m.dispose());
        } else {
          cube.material.dispose();
        }
        cube.children.forEach((child) => {
          if (child instanceof THREE.LineSegments) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      });
      renderer.dispose();
    };
  }, []);

  // Custom Cursor tracking effect
  useEffect(() => {
    const handleMousePosition = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
    };

    const handleMouseLeaveWindow = () => {
      setCursorVisible(false);
    };

    window.addEventListener('mousemove', handleMousePosition);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    return () => {
      window.removeEventListener('mousemove', handleMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, []);

  // Update prices on initial load
  useEffect(() => {
    updatePricesInDOM();
  }, []);

  // Scroll to bottom of agent console terminal
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [agentOutput]);

  // --- ACTIONS ---

  // Agent console preset execution simulation
  const executeAgentPrompt = (promptType: string) => {
    if (isAgentRunning) return;
    setIsAgentRunning(true);
    setSelectedAgentPrompt(promptType);
    setAgentOutput(["Initializing local sandbox virtual environment...", "Mounting secure credentials directory..."]);

    const script: Record<string, string[]> = {
      leads: [
        "Connecting CRM webhook on node #CRM-509...",
        "New leads fetched: 4 profiles extracted successfully.",
        "Executing NexaLLM scoring criteria: high budget, target decision makers...",
        "Lead scored [94/100]: rashidsohaib10232@gmail.com (CTO, Nexa Solutions)",
        "Lead scored [88/100]: support@aetna.com (Procurement Partner, Aetna)",
        "Automating email drafts containing tailored pitch files...",
        "Deploying SMTP pipeline... Done.",
        "Pushing scored profiles to HubSpot cluster #DB-West... Done.",
        "Pipeline executed successfully. Process summary saved: 9.2s elapsed."
      ],
      legal: [
        "Analyzing unstructured PDF: 'Vendor_Agreement_V4.pdf'...",
        "Scanning clauses for liability caps, indemnity, and SLA breaches...",
        "Issue identified on Clause 14.2: Missing liability ceiling statement.",
        "Issue identified on Clause 9.1: Termination notice period set to 120 days (standard is 30 days).",
        "Generating recommended correction edits using SEC-19 model guidelines...",
        "Drafting redline text: 'Liability ceiling set at 2x annual contract value'...",
        "Saving redline markup document into Secure Cloud Drive...",
        "Sending summary scorecard directly to Legal Slack Channel...",
        "Audit finished. Zero high-risk compliance failures reported. Done."
      ],
      cloud: [
        "Scanning Kubernetes clusters in AWS us-east-1...",
        "Identified 4 zombie development nodes idling at 1.4% CPU utilization.",
        "Calculating potential cost savings: $420/month per idle node.",
        "Applying scaling policy: Safely scaling replicas 4 -> 1...",
        "Drain node sequence starting... pods evacuated successfully.",
        "Node groups scaled down. Metrics verified successfully.",
        "Generating cloud cost savings report PDF... Done.",
        "Cloud audit logged. Total optimized savings: $1,680/month. Done."
      ]
    };

    let index = 0;
    const interval = setInterval(() => {
      if (index < script[promptType].length) {
        setAgentOutput(prev => [...prev, script[promptType][index]]);
        index++;
      } else {
        clearInterval(interval);
        setIsAgentRunning(false);
      }
    }, 800);
  };

  // Add node in the Flowchart Builder bento card
  const handleAddFlowchartNode = () => {
    const nodeTypes = [
      { type: 'ai', label: 'Decision Node', desc: 'Sift & route payloads' },
      { type: 'action', label: 'Stripe API Webhook', desc: 'Process payment trigger' },
      { type: 'trigger', label: 'Time CRON Period', desc: 'Trigger every 2 hours' },
      { type: 'action', label: 'PostgreSQL Sync', desc: 'Upsert record values' }
    ];
    const nextNode = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
    const newId = (flowchartNodes.length + 1).toString();
    setFlowchartNodes([...flowchartNodes, { id: newId, ...nextNode }]);
  };

  // Reset node grid
  const handleResetFlowchart = () => {
    setFlowchartNodes([
      { id: '1', type: 'trigger', label: 'Incoming CRM Hook', desc: 'New Lead Added' },
      { id: '2', type: 'ai', label: 'NexaLLM Engine', desc: 'Semantic Lead Scoring' },
      { id: '3', type: 'action', label: 'Slack Alert & Sync', desc: 'Trigger high-value alert' }
    ]);
  };

  // CARD 0 content: Terminal CLI
  const renderCard0 = () => {
    return (
      <>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.02] text-mystic-mint">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-white">Autonomous Agent Core CLI</h3>
              <p className="text-[11px] text-zinc-500">Live typing & execution testbed</p>
            </div>
          </div>

          {/* Preset Prompt Switchers */}
          <div className="flex items-center gap-2 flex-wrap font-mono text-[10px]">
            {(['leads', 'legal', 'cloud'] as const).map((promptKey) => {
              const label = promptKey === 'leads' ? 'Analyze Leads' : promptKey === 'legal' ? 'Audit Legal PDF' : 'Kubernetes Scale';
              return (
                <button 
                  key={promptKey}
                  disabled={isAgentRunning}
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering accordion header on mobile
                    executeAgentPrompt(promptKey);
                  }}
                  className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${selectedAgentPrompt === promptKey ? 'border-mystic-mint bg-mystic-mint/10 text-mystic-mint' : 'border-white/[0.06] bg-white/[0.01] text-zinc-400 hover:text-white'}`}
                  onMouseEnter={() => setIsCursorHovered(true)}
                  onMouseLeave={() => setIsCursorHovered(false)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Terminal Display Block */}
        <div className="flex-1 bg-black/60 border border-white/[0.06] rounded-xl p-4 min-h-[220px] max-h-[300px] overflow-y-auto flex flex-col font-mono text-xs text-zinc-300">
          {agentOutput.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 text-zinc-500">
              <Zap className="w-5 h-5 text-zinc-600 animate-pulse" />
              <p>Select a preset prompt above to watch the Nexa Agent execute autonomous tasks in real-time.</p>
            </div>
          ) : (
            <div className="space-y-2 flex-1">
              {agentOutput.map((log, idx) => (
                <p key={idx} className={log.startsWith('✔') ? 'text-emerald-400' : log.startsWith('Lead scored') ? 'text-mystic-mint font-semibold' : 'text-zinc-300'}>
                  {log}
                </p>
              ))}
              {isAgentRunning && (
                <p className="text-mystic-mint flex items-center gap-2 animate-pulse mt-1">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Thinking & writing state actions...
                </p>
              )}
              <div ref={terminalBottomRef} />
            </div>
          )}
        </div>

        {/* Run prompt triggers */}
        <div className="flex items-center justify-between text-xs text-zinc-500 font-mono mt-1">
          <span>Memory Cache: Local Cluster West Node</span>
          <button
            disabled={isAgentRunning}
            onClick={(e) => {
              e.stopPropagation();
              executeAgentPrompt(selectedAgentPrompt);
            }}
            className={`px-4 py-2 rounded-lg border font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${isAgentRunning ? 'border-zinc-800 bg-transparent text-zinc-600 cursor-not-allowed' : 'border-mystic-mint bg-mystic-mint/5 text-mystic-mint hover:bg-mystic-mint hover:text-dark-bg'}`}
            onMouseEnter={() => setIsCursorHovered(true)}
            onMouseLeave={() => setIsCursorHovered(false)}
          >
            {isAgentRunning ? 'Agent Running...' : 'Execute CLI Trigger'} <Play className="w-3 h-3 fill-current" />
          </button>
        </div>
      </>
    );
  };

  // CARD 1 content: Uptime Metrics
  const renderCard1 = () => {
    return (
      <>
        <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4 mb-4">
          <div className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.02] text-mystic-mint">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-mono font-bold text-white">Execution Metrics</h3>
            <p className="text-[11px] text-zinc-500">Autonomous performance logs</p>
          </div>
        </div>

        {/* Progress Dials representation */}
        <div className="flex-1 flex flex-col items-center justify-center py-4 gap-4">
          
          {/* SVG Radial Dial */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle 
                cx="64" 
                cy="64" 
                r="54" 
                className="text-zinc-800 stroke-current" 
                strokeWidth="8" 
                fill="transparent" 
              />
              <circle 
                cx="64" 
                cy="64" 
                r="54" 
                className="text-mystic-mint stroke-current" 
                strokeWidth="8" 
                strokeDasharray={2 * Math.PI * 54}
                strokeDashoffset={2 * Math.PI * 54 * (1 - 0.999)}
                strokeLinecap="round"
                fill="transparent" 
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold font-mono text-white">99.9%</span>
              <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider">Uptime SLA</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full text-center mt-2">
            <div className="border border-white/[0.04] bg-white/[0.01] rounded-lg p-2.5">
              <span className="text-[9px] text-zinc-500 font-mono block">State Steps today</span>
              <span className="text-base font-bold font-mono text-white mt-1 block">428,102</span>
            </div>
            <div className="border border-white/[0.04] bg-white/[0.01] rounded-lg p-2.5">
              <span className="text-[9px] text-zinc-500 font-mono block">Accuracy score</span>
              <span className="text-base font-bold font-mono text-mystic-mint mt-1 block">99.98%</span>
            </div>
          </div>

        </div>

        <div className="border-t border-white/[0.06] pt-3 mt-2 text-center">
          <span className="text-[10px] font-mono text-zinc-400">All agent states synced at us-west edge</span>
        </div>
      </>
    );
  };

  // CARD 2 content: Compliance Guard
  const renderCard2 = () => {
    return (
      <>
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.02] text-mystic-mint">
              {isEncryptedMode ? <Lock className="w-4 h-4 text-mystic-mint" /> : <Unlock className="w-4 h-4 text-zinc-500" />}
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-white">Compliance Guard</h3>
              <p className="text-[11px] text-zinc-500">Zero-trust network state</p>
            </div>
          </div>

          {/* Encryption Switch */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEncryptedMode(!isEncryptedMode);
            }}
            className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300 cursor-pointer ${isEncryptedMode ? 'bg-mystic-mint' : 'bg-zinc-800'}`}
            onMouseEnter={() => setIsCursorHovered(true)}
            onMouseLeave={() => setIsCursorHovered(false)}
          >
            <div className={`w-4 h-4 rounded-full bg-dark-bg transition-transform duration-300 ${isEncryptedMode ? 'translate-x-4' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Live interactive visual representation */}
        <div className="flex-1 flex flex-col items-center justify-center py-4 relative">
          {isEncryptedMode ? (
            <div className="text-center flex flex-col items-center gap-3 animate-fadeIn">
              <div className="w-14 h-14 rounded-full border border-mystic-mint/30 bg-mystic-mint/5 flex items-center justify-center text-mystic-mint animate-pulse">
                <Lock className="w-6 h-6" />
              </div>
              <div className="font-mono text-xs">
                <p className="text-white font-bold tracking-wider">AES-256 ENCRYPTED</p>
                <p className="text-[10px] text-zinc-500 mt-1">Sovereign model isolation active</p>
              </div>
            </div>
          ) : (
            <div className="text-center flex flex-col items-center gap-3 animate-fadeIn">
              <div className="w-14 h-14 rounded-full border border-amber-500/30 bg-amber-500/5 flex items-center justify-center text-amber-500">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="font-mono text-xs">
                <p className="text-amber-500 font-bold tracking-wider">UNSECURED PREVIEW</p>
                <p className="text-[10px] text-zinc-500 mt-1">Enable Guard before launching agents</p>
              </div>
            </div>
          )}
        </div>

        <p className="text-[11px] text-zinc-400 mt-4 leading-normal text-center border-t border-white/[0.06] pt-3">
          {isEncryptedMode 
            ? "Sovereign policy ensures absolutely zero log retention to external models. PII filtered."
            : "Preview sandbox environment allows testing with synthetic telemetry and public URLs."}
        </p>
      </>
    );
  };

  // CARD 3 content: Visual Pipeline Flowchart
  const renderCard3 = () => {
    return (
      <>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.02] text-mystic-mint">
              <Workflow className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-white">Visual Pipeline Flowchart</h3>
              <p className="text-[11px] text-zinc-500">Dynamic node connections simulation</p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleResetFlowchart();
              }}
              className="px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.01] text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              onMouseEnter={() => setIsCursorHovered(true)}
              onMouseLeave={() => setIsCursorHovered(false)}
            >
              <RefreshCw className="w-3 h-3" /> Reset Flow
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddFlowchartNode();
              }}
              className="px-3 py-1.5 rounded-lg bg-mystic-mint text-dark-bg font-bold hover:bg-mystic-mint-dark transition-colors flex items-center gap-1.5 cursor-pointer"
              onMouseEnter={() => setIsCursorHovered(true)}
              onMouseLeave={() => setIsCursorHovered(false)}
            >
              <Plus className="w-3.5 h-3.5" /> Append Node
            </button>
          </div>
        </div>

        {/* Dynamic connected nodes layout area */}
        <div className="flex-1 bg-black/40 border border-white/[0.06] rounded-xl p-6 min-h-[180px] flex flex-wrap items-center justify-center gap-y-6 gap-x-3 relative overflow-hidden">
          {flowchartNodes.map((node, idx) => {
            const nodeColor = node.type === 'trigger' 
              ? 'border-amber-500/20 bg-amber-500/5 text-amber-500' 
              : node.type === 'ai' 
              ? 'border-mystic-mint/30 bg-mystic-mint/5 text-mystic-mint' 
              : 'border-blue-500/20 bg-blue-500/5 text-blue-500';

            return (
              <React.Fragment key={node.id}>
                {/* Connection arrow helper */}
                {idx > 0 && (
                  <div className="flex items-center px-1">
                    <ChevronRight className="w-4 h-4 text-zinc-600 animate-pulse" />
                  </div>
                )}

                {/* Node Box */}
                <div className={`border p-3.5 rounded-xl flex flex-col gap-1 min-w-[130px] shadow-lg relative ${nodeColor}`}>
                  <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-white/20 animate-ping" />
                  <span className="text-[9px] uppercase font-mono tracking-wider font-bold">Node #{node.id} - {node.type}</span>
                  <span className="text-xs font-bold text-white mt-1">{node.label}</span>
                  <span className="text-[10px] text-zinc-400 leading-normal">{node.desc}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono mt-1">
          <span>Click Append Node to insert synthetic evaluation steps & test layout elasticity.</span>
          <span>Active Nodes: {flowchartNodes.length}</span>
        </div>
      </>
    );
  };

  // Helper pricing math via direct DOM manipulation (Zero Parent Re-renders)
  const updatePricesInDOM = () => {
    const currentCurrency = currencyRef.current;
    const currentBilling = billingPeriodRef.current;
    
    const tiers = ['starter', 'enterprise', 'sovereign'] as const;
    
    tiers.forEach((tier) => {
      const tierData = PRICING_MATRIX.tiers[tier];
      const baseRate = tierData.baseRate;
      const region = PRICING_MATRIX.regions[currentCurrency];
      
      // Multi-dimensional calculation
      const monthlyRate = baseRate * region.rate * region.tariff;
      
      let priceVal = 0;
      let periodVal = '';
      let savingsVal = '';
      
      if (currentBilling === 'monthly') {
        priceVal = Math.round(monthlyRate);
        periodVal = '/mo';
      } else {
        // Annual: 20% flat discount multiplier, displayed as annual total
        priceVal = Math.round(monthlyRate * 0.8 * 12);
        periodVal = '/year';
        
        const regularTotal = Math.round(monthlyRate * 12);
        const saved = regularTotal - priceVal;
        savingsVal = `Saved ${region.symbol}${saved} / year`;
      }
      
      // Update targeted price DOM element
      const priceEl = document.getElementById(`price-${tier}`);
      if (priceEl) {
        priceEl.textContent = `${region.symbol}${priceVal}`;
      }
      
      // Update period label DOM element
      const periodEl = document.getElementById(`period-${tier}`);
      if (periodEl) {
        periodEl.textContent = periodVal;
      }
      
      // Update savings label DOM element
      const savingsEl = document.getElementById(`savings-${tier}`);
      if (savingsEl) {
        savingsEl.textContent = savingsVal;
      }
    });
  };

  const selectBillingPeriod = (period: 'monthly' | 'annual') => {
    billingPeriodRef.current = period;
    
    // Update button styling directly in DOM (Zero parent state changes/re-renders)
    const btnMonthly = document.getElementById('btn-billing-monthly');
    const btnAnnual = document.getElementById('btn-billing-annual');
    
    if (btnMonthly && btnAnnual) {
      if (period === 'monthly') {
        btnMonthly.className = "px-3 py-1.5 rounded-md transition-colors bg-mystic-mint text-dark-bg font-bold cursor-pointer";
        btnAnnual.className = "px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors text-zinc-400 hover:text-white cursor-pointer";
      } else {
        btnMonthly.className = "px-3 py-1.5 rounded-md transition-colors text-zinc-400 hover:text-white cursor-pointer";
        btnAnnual.className = "px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors bg-mystic-mint text-dark-bg font-bold cursor-pointer";
      }
    }
    
    updatePricesInDOM();
  };

  const selectCurrency = (curr: 'USD' | 'EUR' | 'INR') => {
    currencyRef.current = curr;
    
    // Update button styling directly in DOM
    (['USD', 'EUR', 'INR'] as const).forEach((c) => {
      const btn = document.getElementById(`btn-curr-${c}`);
      if (btn) {
        if (c === curr) {
          btn.className = "px-2.5 py-1.5 rounded-md transition-colors bg-zinc-800 text-white font-bold cursor-pointer";
        } else {
          btn.className = "px-2.5 py-1.5 rounded-md transition-colors text-zinc-400 hover:text-white cursor-pointer";
        }
      }
    });
    
    updatePricesInDOM();
  };

  return (
    <div id="app-root" className="relative min-h-screen selection:bg-mystic-mint/30 selection:text-mystic-mint">
      
      {/* ==========================================
          THREE.JS FLOATING BACKGROUND CANVAS
          ========================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />
        {/* Subtle grid mesh overlay to enhance futuristic visual aesthetic */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40 mix-blend-overlay" />
        {/* Top & Bottom dark radial vignettes */}
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-dark-bg via-dark-bg/60 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent pointer-events-none" />
      </div>

      {/* ==========================================
          DOUBLE CUSTOM CURSOR
          ========================================== */}
      {cursorVisible && (
        <>
          {/* Central sharp tracker dot */}
          <div 
            className="fixed pointer-events-none z-50 rounded-full bg-mystic-mint mix-blend-difference w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-200"
            style={{ 
              left: `${cursorPos.x}px`, 
              top: `${cursorPos.y}px` 
            }}
          />
          {/* Spring halo ring that reacts to interactive hover */}
          <div 
            className={`fixed pointer-events-none z-50 rounded-full border border-mystic-mint/45 -translate-x-1/2 -translate-y-1/2 transition-[transform,opacity,width,height] duration-300 ease-out`}
            style={{ 
              left: `${cursorPos.x}px`, 
              top: `${cursorPos.y}px`,
              width: isCursorHovered ? '48px' : '32px',
              height: isCursorHovered ? '48px' : '32px',
              backgroundColor: isCursorHovered ? 'rgba(52, 211, 153, 0.08)' : 'transparent',
              transform: 'translate(-50%, -50%)',
              opacity: 0.8
            }}
          />
        </>
      )}

      {/* ==========================================
          HEADER / GLASS NAVBAR
          ========================================== */}
      <header id="main-header" className="sticky top-0 z-40 w-full border-b border-white/[0.05] bg-dark-bg/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            id="header-logo" 
            className="flex items-center gap-2.5 cursor-pointer"
            onMouseEnter={() => setIsCursorHovered(true)}
            onMouseLeave={() => setIsCursorHovered(false)}
          >
            <div className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] shadow-[0_0_20px_rgba(52,211,153,0.1)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-mystic-mint/20 to-transparent opacity-55" />
              <div className="w-2.5 h-2.5 bg-mystic-mint rounded-sm animate-pulse" />
            </div>
            <span className="font-mono text-xl font-bold tracking-tight text-white">
              Nexa<span className="text-mystic-mint">AI</span>
            </span>
          </div>

          {/* Desktop Navigation Link Tiers */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
            <a 
              href="#features-section" 
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              onMouseEnter={() => setIsCursorHovered(true)}
              onMouseLeave={() => setIsCursorHovered(false)}
            >
              Features
            </a>
            <a 
              href="#agent-sandbox-section" 
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              onMouseEnter={() => setIsCursorHovered(true)}
              onMouseLeave={() => setIsCursorHovered(false)}
            >
              Agent Core
            </a>
            <a 
              href="#visual-builder-section" 
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              onMouseEnter={() => setIsCursorHovered(true)}
              onMouseLeave={() => setIsCursorHovered(false)}
            >
              Flowchart Architect
            </a>
            <a 
              href="#pricing-section" 
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              onMouseEnter={() => setIsCursorHovered(true)}
              onMouseLeave={() => setIsCursorHovered(false)}
            >
              Pricing Matrix
            </a>
          </nav>

          {/* Header Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
              onMouseEnter={() => setIsCursorHovered(true)}
              onMouseLeave={() => setIsCursorHovered(false)}
              onClick={() => alert("Enterprise sandbox console will be initialized when environment config keys are bound in secrets.")}
            >
              Console Login
            </button>
            <a 
              href="#pricing-section"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-mono font-bold bg-mystic-mint text-dark-bg hover:bg-mystic-mint-dark hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all duration-300"
              onMouseEnter={() => setIsCursorHovered(true)}
              onMouseLeave={() => setIsCursorHovered(false)}
            >
              Launch Console <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              onMouseEnter={() => setIsCursorHovered(true)}
              onMouseLeave={() => setIsCursorHovered(false)}
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-18 left-0 w-full border-b border-white/[0.08] bg-dark-bg/95 backdrop-blur-xl px-4 py-6 flex flex-col gap-5 z-50">
            <a 
              href="#features-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-zinc-300 hover:text-white transition-colors py-1"
            >
              Features
            </a>
            <a 
              href="#agent-sandbox-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-zinc-300 hover:text-white transition-colors py-1"
            >
              Agent Core
            </a>
            <a 
              href="#visual-builder-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-zinc-300 hover:text-white transition-colors py-1"
            >
              Flowchart Architect
            </a>
            <a 
              href="#pricing-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-zinc-300 hover:text-white transition-colors py-1"
            >
              Pricing Matrix
            </a>
            <div className="h-px bg-white/[0.08] my-1" />
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  alert("Enterprise sandbox console will be initialized when environment config keys are bound in secrets.");
                }}
                className="w-full text-center py-2.5 rounded-lg border border-white/[0.08] text-zinc-300 font-medium text-sm"
              >
                Console Login
              </button>
              <a 
                href="#pricing-section"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-lg bg-mystic-mint text-dark-bg font-mono font-bold text-sm"
              >
                Launch Console
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ==========================================
          HERO LAYOUT GRID (BENTO INTEGRATED)
          ========================================== */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col gap-24">
        
        <section id="hero-grid-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Hero Left Info Block - 5 spans */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6">
            
            {/* Animated Micro Badge */}
            <div className="inline-flex self-start items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-mystic-mint/20 bg-mystic-mint/5 shadow-[0_0_15px_rgba(52,211,153,0.06)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mystic-mint opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-mystic-mint"></span>
              </span>
              <span className="font-mono text-xs font-bold text-mystic-mint uppercase tracking-wider">
                Nexa Autopilot Fleet v2.4
              </span>
            </div>

            {/* Typography paired Hero Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Autopilot for your <span className="font-mono text-mystic-mint block lg:inline">Enterprise</span> Workflows
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-lg">
              Deploy self-learning AI agents that map, analyze, and execute complex business operations in complete synergy. Engineered for hyper-speed. Fully integrated with secure compliance frameworks.
            </p>

            {/* Micro Interaction buttons */}
            <div className="flex flex-wrap gap-4 mt-2">
              <a 
                href="#pricing-section"
                className="inline-flex items-center gap-2 bg-mystic-mint text-dark-bg font-mono font-bold px-6 py-3.5 rounded-lg text-sm hover:bg-mystic-mint-dark hover:shadow-[0_0_25px_rgba(52,211,153,0.3)] transition-all duration-300"
                onMouseEnter={() => setIsCursorHovered(true)}
                onMouseLeave={() => setIsCursorHovered(false)}
              >
                Deploy Free Agent <Play className="w-3.5 h-3.5 fill-current" />
              </a>
              <button 
                onClick={() => alert("A customized capability blueprint audit deck has been queued for rashidsohaib10232@gmail.com.")}
                className="inline-flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white font-medium px-6 py-3.5 rounded-lg text-sm transition-all duration-300"
                onMouseEnter={() => setIsCursorHovered(true)}
                onMouseLeave={() => setIsCursorHovered(false)}
              >
                Request Audit Deck
              </button>
            </div>

            {/* Target Email Credit Line */}
            <p className="text-xs text-zinc-500 font-mono mt-2">
              Configured for workspace: <span className="text-zinc-400">rashidsohaib10232@gmail.com</span>
            </p>
          </div>

          {/* Hero Right Visual Column - 7 spans */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Simulation Stage / Visual Dashboard Sandbox */}
            <div className="bento-glow-card flex-1 p-6 flex flex-col justify-between min-h-[360px] bg-dark-bg/80 backdrop-blur-xl">
              
              {/* Header inside simulation stage */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-mystic-mint" />
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                    Live Operations: {features.find(f => f.id === activeHeroTab)?.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500 bg-white/[0.02] border border-white/[0.06] px-2.5 py-1 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  latency: 14ms
                </div>
              </div>

              {/* Dynamic Screen based on the Active Hero Tab */}
              <div className="flex-1 flex items-center justify-center py-4 relative overflow-hidden">
                
                {/* 1. AI STRATEGY SCREEN */}
                {activeHeroTab === 'ai-strategy' && (
                  <div className="w-full max-w-md flex flex-col gap-4 animate-fadeIn">
                    <div className="grid grid-cols-3 gap-3 items-center">
                      <div className="border border-white/[0.06] bg-white/[0.02] rounded-lg p-3 text-center flex flex-col items-center gap-1.5">
                        <span className="text-[10px] text-zinc-500 font-mono uppercase">Goal Source</span>
                        <span className="text-xs font-bold text-white font-mono">Unstructured Email</span>
                      </div>
                      <div className="flex justify-center">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-mystic-mint to-transparent relative">
                          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-mystic-mint/20 text-[9px] text-mystic-mint px-1 rounded border border-mystic-mint/30 font-mono">82% Match</span>
                        </div>
                      </div>
                      <div className="border border-mystic-mint/20 bg-mystic-mint/5 rounded-lg p-3 text-center flex flex-col items-center gap-1.5">
                        <span className="text-[10px] text-mystic-mint font-mono uppercase">Synthesized Task</span>
                        <span className="text-xs font-bold text-white font-mono">Auto CRM Import</span>
                      </div>
                    </div>
                    {/* Knowledge Network Wireframe Map */}
                    <div className="border border-white/[0.06] bg-black/40 rounded-xl p-4 flex flex-col gap-3">
                      <span className="text-[11px] font-mono text-zinc-500">Suggested Autonomous Steps:</span>
                      <div className="flex flex-col gap-2 font-mono text-xs">
                        <div className="flex items-center justify-between border border-white/[0.04] bg-white/[0.01] px-3 py-2 rounded-lg">
                          <span className="text-zinc-300">1. Parse incoming body data with NexaLLM</span>
                          <span className="text-mystic-mint font-bold uppercase text-[9px]">Optimal</span>
                        </div>
                        <div className="flex items-center justify-between border border-white/[0.04] bg-white/[0.01] px-3 py-2 rounded-lg">
                          <span className="text-zinc-300">2. Authenticate secure HubSpot API tokens</span>
                          <span className="text-mystic-mint font-bold uppercase text-[9px]">Verified</span>
                        </div>
                        <div className="flex items-center justify-between border border-white/[0.04] bg-white/[0.01] px-3 py-2 rounded-lg opacity-65">
                          <span className="text-zinc-300">3. Map custom field registers on cluster</span>
                          <span className="text-zinc-500 uppercase text-[9px]">Queued</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. CUSTOM AGENTS SCREEN */}
                {activeHeroTab === 'custom-agents' && (
                  <div className="w-full max-w-lg border border-white/[0.08] bg-black/60 rounded-xl p-4 font-mono text-[11px] leading-relaxed text-zinc-300 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 mb-3">
                      <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Fleet CLI / Cluster_West_Node_4</span>
                      <span className="text-mystic-mint uppercase text-[9px] font-bold">Executing</span>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-zinc-500">&gt; nexa-agent-fleet spawn --agent="SalesEvaluator_V4" --memory="HubSpot_CRM_Logs"</p>
                      <p className="text-zinc-300">✔ Agent 'SalesEvaluator_V4' initialized successfully on physical core thread #2.</p>
                      <p className="text-zinc-300">✔ Memory vectors successfully populated. (4,290 semantic logs indexed)</p>
                      <p className="text-mystic-mint animate-pulse">&gt; Analyzing pipeline blockage... Detected invalid authorization header on legacy API.</p>
                      <p className="text-zinc-300">✔ Self-healing action: Re-requesting auth-key rotation protocol... Rotated.</p>
                      <p className="text-emerald-400">✔ Success. Pipeline unlocked. Flow rate optimized back to 99.8% capacity.</p>
                    </div>
                  </div>
                )}

                {/* 3. PROCESS AUTOMATION SCREEN */}
                {activeHeroTab === 'process-automation' && (
                  <div className="w-full max-w-md flex flex-col gap-3 animate-fadeIn">
                    <div className="flex items-center gap-2 bg-white/[0.02] border border-white/[0.06] rounded-xl p-3">
                      <div className="w-8 h-8 rounded-lg bg-mystic-mint/15 flex items-center justify-center text-mystic-mint">
                        <Workflow className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-white font-mono">Invoice Parsing Pipeline</h4>
                        <p className="text-[10px] text-zinc-500">Source: Gmail Inbox &gt; Sink: Stripe Sandbox</p>
                      </div>
                      <span className="text-[10px] font-mono bg-mystic-mint/15 text-mystic-mint border border-mystic-mint/30 px-2 py-0.5 rounded">
                        Active
                      </span>
                    </div>
                    {/* Visual connected grid blocks */}
                    <div className="grid grid-cols-4 gap-2 items-center relative py-2">
                      <div className="border border-white/[0.06] bg-black/40 p-2.5 rounded-lg text-center flex flex-col gap-1 items-center">
                        <span className="text-[9px] text-zinc-500 uppercase font-mono">Trigger</span>
                        <span className="text-[10px] font-bold text-white">Gmail Alert</span>
                        <div className="w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center text-[7px] text-black">✓</div>
                      </div>
                      <div className="h-[2px] bg-gradient-to-r from-emerald-500 to-mystic-mint animate-pulse" />
                      <div className="border border-white/[0.06] bg-black/40 p-2.5 rounded-lg text-center flex flex-col gap-1 items-center relative z-10">
                        <span className="text-[9px] text-mystic-mint uppercase font-mono">LLM Tool</span>
                        <span className="text-[10px] font-bold text-white">Parser Engine</span>
                        <div className="w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center text-[7px] text-black animate-pulse">⚙</div>
                      </div>
                      <div className="h-[2px] bg-gradient-to-r from-mystic-mint to-transparent" />
                      <div className="border border-white/[0.06] bg-white/[0.01] p-2.5 rounded-lg text-center flex flex-col gap-1 items-center opacity-50">
                        <span className="text-[9px] text-zinc-500 uppercase font-mono">API Sync</span>
                        <span className="text-[10px] font-bold text-white">Stripe Sync</span>
                        <div className="w-3 h-3 rounded-full bg-zinc-700 flex items-center justify-center text-[7px] text-white">..</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. DATA INTELLIGENCE SCREEN */}
                {activeHeroTab === 'data-intelligence' && (
                  <div className="w-full max-w-md flex flex-col gap-4 animate-fadeIn">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="border border-white/[0.06] bg-white/[0.01] rounded-xl p-3 flex flex-col justify-between">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">Process Velocity</span>
                        <div className="flex items-baseline gap-1.5 mt-2">
                          <span className="text-xl font-bold font-mono text-white">12,492</span>
                          <span className="text-xs text-mystic-mint font-mono font-bold">+18.4%</span>
                        </div>
                        <p className="text-[9px] text-zinc-500 mt-1">Sate steps completed/min</p>
                      </div>
                      <div className="border border-white/[0.06] bg-white/[0.01] rounded-xl p-3 flex flex-col justify-between">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">Automated Cost Saved</span>
                        <div className="flex items-baseline gap-1.5 mt-2">
                          <span className="text-xl font-bold font-mono text-mystic-mint">$1,894.20</span>
                          <span className="text-xs text-mystic-mint font-mono font-bold">Daily rate</span>
                        </div>
                        <p className="text-[9px] text-zinc-500 mt-1">Computed compared to manual SLA</p>
                      </div>
                    </div>
                    {/* Simulated SVG Graph */}
                    <div className="border border-white/[0.06] bg-black/40 rounded-xl p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase">Efficiency Graph (Past 24h)</span>
                        <TrendingUp className="w-3.5 h-3.5 text-mystic-mint" />
                      </div>
                      <svg className="w-full h-16 text-mystic-mint mt-1 overflow-visible" viewBox="0 0 400 60" preserveAspectRatio="none">
                        {/* Static visual spline line with gradient */}
                        <defs>
                          <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path 
                          d="M0,50 Q40,10 80,42 T160,20 T240,48 T320,15 T400,28 L400,60 L0,60 Z" 
                          fill="url(#chart-grad)" 
                        />
                        <path 
                          d="M0,50 Q40,10 80,42 T160,20 T240,48 T320,15 T400,28" 
                          fill="none" 
                          stroke="#34d399" 
                          strokeWidth="2" 
                          className="path-animated-dash"
                        />
                        <circle cx="320" cy="15" r="4.5" fill="#34d399" className="animate-ping origin-center" />
                        <circle cx="320" cy="15" r="3" fill="#ffffff" />
                      </svg>
                    </div>
                  </div>
                )}

              </div>

              {/* Descriptions & details matching selected tab */}
              <div className="border-t border-white/[0.06] pt-4 mt-2">
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  {features.find(f => f.id === activeHeroTab)?.longDesc}
                </p>
              </div>

            </div>

            {/* Vertical Switcher Navigation List - Bento Cards Stack */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feat) => {
                const isActive = feat.id === activeHeroTab;
                return (
                  <button
                    key={feat.id}
                    onClick={() => setActiveHeroTab(feat.id)}
                    className={`bento-glow-card flex items-start gap-3.5 p-4 text-left transition-all duration-300 bg-dark-bg/40 ${isActive ? 'border-mystic-mint bg-mystic-mint/[0.04] shadow-[0_0_20px_rgba(52,211,153,0.1)]' : 'border-white/[0.06]'}`}
                    onMouseEnter={() => setIsCursorHovered(true)}
                    onMouseLeave={() => setIsCursorHovered(false)}
                  >
                    <div className={`p-2 rounded-lg border transition-colors ${isActive ? 'border-mystic-mint/30 bg-mystic-mint/10' : 'border-white/[0.08] bg-white/[0.02]'}`}>
                      {feat.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                        {feat.title}
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-mystic-mint animate-pulse" />}
                      </span>
                      <span className="text-[11px] text-zinc-400 mt-1 leading-normal">
                        {feat.shortDesc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

        </section>

        {/* ==========================================
            ENTERPRISE LOGOS SECTION
            ========================================== */}
        <section id="logos-section" className="border-t border-b border-white/[0.06] py-8 relative">
          <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-mystic-mint/20 to-transparent" />
          <div className="max-w-5xl mx-auto flex flex-col gap-4 text-center">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
              Trusted by operators at scale-critical infrastructures
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 mt-2">
              <span className="font-mono text-sm sm:text-lg font-bold text-zinc-500 tracking-wider hover:text-white transition-colors duration-300">
                AETNA
              </span>
              <span className="font-mono text-sm sm:text-lg font-bold text-zinc-500 tracking-wider hover:text-white transition-colors duration-300">
                CIGNA
              </span>
              <span className="font-mono text-sm sm:text-lg font-bold text-zinc-500 tracking-wider hover:text-white transition-colors duration-300 text-mystic-mint/60">
                MICROSOFT
              </span>
              <span className="font-mono text-sm sm:text-lg font-bold text-zinc-500 tracking-wider hover:text-white transition-colors duration-300">
                GOOGLE
              </span>
              <span className="font-mono text-sm sm:text-lg font-bold text-zinc-500 tracking-wider hover:text-white transition-colors duration-300">
                STRIPE
              </span>
            </div>
          </div>
        </section>

        {/* ==========================================
            CORE ASYMMETRIC BENTO GRID FEATURE GRID
            ========================================== */}
        <section id="features-section" className="flex flex-col gap-10">
          
          {/* Header Block */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-white/[0.02] text-xs text-zinc-400 font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5 text-mystic-mint" /> Bento Ecosystem Console
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
              Asymmetric Intelligence Grid
            </h2>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              Explore interactive modules mimicking genuine enterprise state runs, zero-trust cryptographic validation pipelines, and fluid graphical workflow nodes.
            </p>
          </div>

          {/* Actual Bento Grid / Mobile Accordion Section with Context Lock */}
          
          {/* Desktop Bento Grid layout */}
          <div className="hidden md:grid grid-cols-12 gap-6">

            {/* CARD 1: Large (8 cols on md) */}
            <div 
              id="agent-sandbox-section" 
              onMouseEnter={() => setActiveBentoIndex(0)}
              className={`bento-glow-card md:col-span-8 p-6 flex flex-col gap-4 bg-dark-bg/85 backdrop-blur-xl transition-all duration-300 ${activeBentoIndex === 0 ? 'border-mystic-mint/45 shadow-[0_0_25px_rgba(52,211,153,0.06)]' : 'border-white/[0.06]'}`}
            >
              {renderCard0()}
            </div>

            {/* CARD 2: Medium (4 cols on md) */}
            <div 
              onMouseEnter={() => setActiveBentoIndex(1)}
              className={`bento-glow-card md:col-span-4 p-6 flex flex-col justify-between bg-dark-bg/85 backdrop-blur-xl transition-all duration-300 ${activeBentoIndex === 1 ? 'border-mystic-mint/45 shadow-[0_0_25px_rgba(52,211,153,0.06)]' : 'border-white/[0.06]'}`}
            >
              {renderCard1()}
            </div>

            {/* CARD 3: Medium (4 cols on md) */}
            <div 
              onMouseEnter={() => setActiveBentoIndex(2)}
              className={`bento-glow-card md:col-span-4 p-6 flex flex-col justify-between bg-dark-bg/85 backdrop-blur-xl transition-all duration-300 ${activeBentoIndex === 2 ? 'border-mystic-mint/45 shadow-[0_0_25px_rgba(52,211,153,0.06)]' : 'border-white/[0.06]'}`}
            >
              {renderCard2()}
            </div>

            {/* CARD 4: Large (8 cols on md) */}
            <div 
              id="visual-builder-section" 
              onMouseEnter={() => setActiveBentoIndex(3)}
              className={`bento-glow-card md:col-span-8 p-6 flex flex-col gap-5 bg-dark-bg/85 backdrop-blur-xl transition-all duration-300 ${activeBentoIndex === 3 ? 'border-mystic-mint/45 shadow-[0_0_25px_rgba(52,211,153,0.06)]' : 'border-white/[0.06]'}`}
            >
              {renderCard3()}
            </div>

          </div>

          {/* Mobile Accordion layout with Context Lock */}
          <div className="md:hidden flex flex-col gap-4">
            
            {/* CARD 1 Accordion Item */}
            <div className={`bento-glow-card flex flex-col overflow-hidden bg-dark-bg/85 backdrop-blur-xl transition-all duration-300 ${activeBentoIndex === 0 ? 'border-mystic-mint/45' : 'border-white/[0.06]'}`}>
              <button 
                onClick={() => setActiveBentoIndex(0)}
                className="w-full px-5 py-4 flex items-center justify-between text-left font-mono font-bold text-sm text-white focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Terminal className={`w-4 h-4 ${activeBentoIndex === 0 ? 'text-mystic-mint' : 'text-zinc-500'}`} />
                  <span>Autonomous Agent Core CLI</span>
                </div>
                <ChevronRight className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ease-in-out ${activeBentoIndex === 0 ? 'rotate-90 text-mystic-mint' : ''}`} />
              </button>
              <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${activeBentoIndex === 0 ? 'grid-rows-[1fr] border-t border-white/[0.04]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <div className="p-5 flex flex-col gap-4">
                    {renderCard0()}
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2 Accordion Item */}
            <div className={`bento-glow-card flex flex-col overflow-hidden bg-dark-bg/85 backdrop-blur-xl transition-all duration-300 ${activeBentoIndex === 1 ? 'border-mystic-mint/45' : 'border-white/[0.06]'}`}>
              <button 
                onClick={() => setActiveBentoIndex(1)}
                className="w-full px-5 py-4 flex items-center justify-between text-left font-mono font-bold text-sm text-white focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Activity className={`w-4 h-4 ${activeBentoIndex === 1 ? 'text-mystic-mint' : 'text-zinc-500'}`} />
                  <span>Execution Metrics</span>
                </div>
                <ChevronRight className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ease-in-out ${activeBentoIndex === 1 ? 'rotate-90 text-mystic-mint' : ''}`} />
              </button>
              <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${activeBentoIndex === 1 ? 'grid-rows-[1fr] border-t border-white/[0.04]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <div className="p-5 flex flex-col gap-4">
                    {renderCard1()}
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3 Accordion Item */}
            <div className={`bento-glow-card flex flex-col overflow-hidden bg-dark-bg/85 backdrop-blur-xl transition-all duration-300 ${activeBentoIndex === 2 ? 'border-mystic-mint/45' : 'border-white/[0.06]'}`}>
              <button 
                onClick={() => setActiveBentoIndex(2)}
                className="w-full px-5 py-4 flex items-center justify-between text-left font-mono font-bold text-sm text-white focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {isEncryptedMode 
                    ? <Lock className={`w-4 h-4 ${activeBentoIndex === 2 ? 'text-mystic-mint' : 'text-zinc-500'}`} /> 
                    : <Unlock className="w-4 h-4 text-zinc-500" />
                  }
                  <span>Compliance Guard</span>
                </div>
                <ChevronRight className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ease-in-out ${activeBentoIndex === 2 ? 'rotate-90 text-mystic-mint' : ''}`} />
              </button>
              <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${activeBentoIndex === 2 ? 'grid-rows-[1fr] border-t border-white/[0.04]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <div className="p-5 flex flex-col gap-4">
                    {renderCard2()}
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 4 Accordion Item */}
            <div className={`bento-glow-card flex flex-col overflow-hidden bg-dark-bg/85 backdrop-blur-xl transition-all duration-300 ${activeBentoIndex === 3 ? 'border-mystic-mint/45' : 'border-white/[0.06]'}`}>
              <button 
                onClick={() => setActiveBentoIndex(3)}
                className="w-full px-5 py-4 flex items-center justify-between text-left font-mono font-bold text-sm text-white focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Workflow className={`w-4 h-4 ${activeBentoIndex === 3 ? 'text-mystic-mint' : 'text-zinc-500'}`} />
                  <span>Visual Pipeline Flowchart</span>
                </div>
                <ChevronRight className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ease-in-out ${activeBentoIndex === 3 ? 'rotate-90 text-mystic-mint' : ''}`} />
              </button>
              <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${activeBentoIndex === 3 ? 'grid-rows-[1fr] border-t border-white/[0.04]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <div className="p-5 flex flex-col gap-4">
                    {renderCard3()}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* ==========================================
            PRICING SECTOR (DYNAMIC VALUES)
            ========================================== */}
        <section id="pricing-section" className="flex flex-col gap-10">
          
          {/* Header Block with Toggles */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-white/[0.02] text-xs text-zinc-400 font-mono mb-4">
                <Globe className="w-3.5 h-3.5 text-mystic-mint" /> Globally Scale-Critical
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
                Predictable Fleet Pricing
              </h2>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                Choose the size of your autonomous agent workload fleet. Switch billing periods and currencies instantly using the switcher below.
              </p>
            </div>

            {/* CONTROLS SWITCH PANEL */}
            <div className="flex flex-wrap items-center gap-4 border border-white/[0.06] bg-black/40 p-2.5 rounded-xl self-start font-mono">
              
              {/* Billing Cycle switcher */}
              <div className="flex items-center bg-white/[0.02] border border-white/[0.06] rounded-lg p-1 text-[11px]">
                <button
                  id="btn-billing-monthly"
                  onClick={() => selectBillingPeriod('monthly')}
                  className="px-3 py-1.5 rounded-md transition-colors text-zinc-400 hover:text-white cursor-pointer"
                  onMouseEnter={() => setIsCursorHovered(true)}
                  onMouseLeave={() => setIsCursorHovered(false)}
                >
                  Monthly
                </button>
                <button
                  id="btn-billing-annual"
                  onClick={() => selectBillingPeriod('annual')}
                  className="px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors bg-mystic-mint text-dark-bg font-bold cursor-pointer"
                  onMouseEnter={() => setIsCursorHovered(true)}
                  onMouseLeave={() => setIsCursorHovered(false)}
                >
                  Annual <span className="bg-white/10 text-[9px] px-1 py-0.5 rounded text-zinc-300 font-normal">-20%</span>
                </button>
              </div>

              {/* Currency selector */}
              <div className="flex items-center bg-white/[0.02] border border-white/[0.06] rounded-lg p-1 text-[11px]">
                {(['USD', 'EUR', 'INR'] as const).map((curr) => (
                  <button
                    id={`btn-curr-${curr}`}
                    key={curr}
                    onClick={() => selectCurrency(curr)}
                    className={`px-2.5 py-1.5 rounded-md transition-colors ${curr === 'USD' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'} cursor-pointer`}
                    onMouseEnter={() => setIsCursorHovered(true)}
                    onMouseLeave={() => setIsCursorHovered(false)}
                  >
                    {curr}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {(['starter', 'enterprise', 'sovereign'] as const).map((tierKey) => {
              const plan = PRICING_MATRIX.tiers[tierKey];
              return (
                <div 
                  key={tierKey}
                  className={`bento-glow-card flex flex-col justify-between p-8 bg-dark-bg/85 backdrop-blur-xl relative ${plan.popular ? 'border-mystic-mint/45 shadow-[0_0_40px_rgba(52,211,153,0.15)]' : 'border-white/[0.06]'}`}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute top-0 right-8 -translate-y-1/2 bg-mystic-mint text-dark-bg font-mono font-bold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full">
                      Most Active Tier
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-white font-sans">{plan.name}</h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed min-h-[36px]">{plan.desc}</p>
                    
                    {/* Price representation */}
                    <div className="mt-6 flex flex-col">
                      <div className="flex items-baseline gap-1">
                        <span id={`price-${tierKey}`} className="text-4xl font-bold font-mono text-white">
                          {/* Loaded on mount */}
                        </span>
                        <span id={`period-${tierKey}`} className="text-xs text-zinc-500 font-mono">
                          {/* Loaded on mount */}
                        </span>
                      </div>
                      <span id={`savings-${tierKey}`} className="text-[10px] text-mystic-mint font-mono font-semibold mt-1">
                        {/* Loaded on mount */}
                      </span>
                    </div>

                    <div className="h-px bg-white/[0.06] my-6" />

                    {/* Features list */}
                    <ul className="space-y-3.5">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                          <Check className="w-4 h-4 text-mystic-mint shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <button
                      onClick={() => alert(`Proceeding with checkouts for ${plan.name} at rashidsohaib10232@gmail.com.`)}
                      className={`w-full py-3.5 rounded-lg text-sm font-mono font-bold transition-all duration-300 cursor-pointer ${plan.popular ? 'bg-mystic-mint text-dark-bg hover:bg-mystic-mint-dark hover:shadow-[0_0_20px_rgba(52,211,153,0.25)]' : 'bg-white/[0.04] text-white border border-white/[0.08] hover:bg-white/[0.08]'}`}
                      onMouseEnter={() => setIsCursorHovered(true)}
                      onMouseLeave={() => setIsCursorHovered(false)}
                    >
                      {plan.cta}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </section>

        {/* ==========================================
            SECURE SANDBOX ACCELERATOR BAR
            ========================================== */}
        <section id="faq-accelerator" className="bento-glow-card p-8 bg-gradient-to-r from-dark-bg/90 via-mystic-mint/[0.03] to-dark-bg/90 backdrop-blur-xl border border-white/[0.08] relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-mystic-mint/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="max-w-2xl text-center lg:text-left">
              <h3 className="text-2xl font-bold text-white">Deploy on Sovereign Cloud Nodes</h3>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                Have specific compliance mandates? Run local agent models locked entirely to your server parameters, supporting custom secure databases with zero external memory leak risks.
              </p>
            </div>
            <button
              onClick={() => alert("Enterprise sales queue has logged request for: rashidsohaib10232@gmail.com. We will reach out shortly.")}
              className="px-6 py-4 rounded-lg bg-white text-dark-bg font-mono font-bold text-sm hover:bg-zinc-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all shrink-0"
              onMouseEnter={() => setIsCursorHovered(true)}
              onMouseLeave={() => setIsCursorHovered(false)}
            >
              Consult Compliance Architect
            </button>
          </div>
        </section>

      </main>

      {/* ==========================================
          FOOTER SECTOR
          ========================================== */}
      <footer id="main-footer" className="relative z-10 border-t border-white/[0.05] bg-dark-bg/80 backdrop-blur-md pt-16 pb-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Column 1 - Brand info */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.08] flex items-center justify-center">
                  <div className="w-2 h-2 bg-mystic-mint rounded-sm" />
                </div>
                <span className="font-mono text-lg font-bold text-white">NexaAI</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Self-learning autonomous agent fleet mapping and execution engine. Built for heavy corporate pipelines under absolute local isolation covenants.
              </p>
            </div>

            {/* Column 2 - Core Specs */}
            <div className="flex flex-col gap-3 font-mono text-xs">
              <span className="font-bold text-zinc-400 uppercase tracking-widest text-[10px]">Specifications</span>
              <a href="#features-section" className="text-zinc-500 hover:text-white transition-colors">Agent CLI Terminal</a>
              <a href="#visual-builder-section" className="text-zinc-500 hover:text-white transition-colors">Connected Pipelines</a>
              <a href="#pricing-section" className="text-zinc-500 hover:text-white transition-colors">Pricing Matrix</a>
              <a href="#faq-accelerator" className="text-zinc-500 hover:text-white transition-colors">Sovereign Compliance</a>
            </div>

            {/* Column 3 - Enterprise Partners */}
            <div className="flex flex-col gap-3 font-mono text-xs">
              <span className="font-bold text-zinc-400 uppercase tracking-widest text-[10px]">Ecosystem Connections</span>
              <span className="text-zinc-500">Aetna Integrator Node</span>
              <span className="text-zinc-500">Cigna HIPAA Database</span>
              <span className="text-zinc-500">Google Cloud VPC Adapter</span>
              <span className="text-zinc-500">Stripe Live Webhook Hook</span>
            </div>

            {/* Column 4 - Workspace Status */}
            <div className="flex flex-col gap-3 font-mono text-xs">
              <span className="font-bold text-zinc-400 uppercase tracking-widest text-[10px]">Workspace Metadata</span>
              <span className="text-zinc-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Authorized: rashidsohaib10232@gmail.com
              </span>
              <span className="text-zinc-500">Node Cluster: US-WEST-2</span>
              <span className="text-zinc-500">Engine Build: v2.4-stable</span>
            </div>

          </div>

          <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-zinc-500 font-mono">
              &copy; {new Date().getFullYear()} NexaAI Inc. All sovereign rights reserved.
            </span>
            <span className="text-xs text-zinc-500 font-mono flex items-center gap-1.5">
              Built on React & Three.js with <span className="text-mystic-mint font-semibold">Bento Grid Theme</span>
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
