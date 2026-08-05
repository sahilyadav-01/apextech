import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Activity, Database, Scale, Wrench, CheckCircle, ChevronRight } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { mockSolutions, mockProducts } from '../../data/mockData';

export const HomePage: React.FC = () => {
  const { addQuoteRequest } = useAppStore();

  // Consultation quick form state
  const [consName, setConsName] = useState('');
  const [consEmail, setConsEmail] = useState('');
  const [consMsg, setConsMsg] = useState('');
  const [consSuccess, setConsSuccess] = useState(false);

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consName || !consEmail || !consMsg) return;

    addQuoteRequest({
      name: consName,
      company: 'Quick Web Consultation',
      email: consEmail,
      phone: 'Not provided',
      country: 'India',
      application: 'general',
      projectDetails: consMsg,
      timeline: 'medium',
      items: [],
    });
    setConsName('');
    setConsEmail('');
    setConsMsg('');
    setConsSuccess(true);
    setTimeout(() => setConsSuccess(false), 5000);
  };

  return (
    <div className="bg-navy-950 text-slate-100 font-sans">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-24 border-b border-navy-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-lightBlue text-xs font-semibold uppercase tracking-wider">
              <span className="flex h-2 w-2 rounded-full bg-brand-lightBlue animate-ping" />
              Advanced Engineering Platform
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-white">
              Advanced Engineering,<br/>
              <span className="text-gradient">Instrumentation &amp; Computing</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              Precision technologies for testing, high-fidelity measurement, structural integrity monitoring, and high-performance workstation computing hardware.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                to="/solutions" 
                className="bg-brand-blue hover:bg-brand-darkBlue text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/30 transition-all hover:-translate-y-0.5 active:scale-95"
              >
                Explore Solutions
              </Link>
              <Link 
                to="/products" 
                className="bg-navy-900 hover:bg-navy-800 text-white font-bold px-7 py-3.5 rounded-xl border border-navy-700 hover:border-brand-blue/50 transition-all hover:-translate-y-0.5 active:scale-95"
              >
                Explore Products
              </Link>
            </div>
          </div>

          {/* Hero Visual Card Panel */}
          <div className="relative aspect-[4/3] w-full max-w-lg mx-auto lg:max-w-none bg-gradient-to-tr from-navy-900 to-navy-800 border border-navy-700/60 rounded-2xl p-6 shadow-2xl animate-fade-in">
            <div className="absolute top-4 right-4 text-[10px] font-mono text-slate-500 tracking-wider">LIVE NODE SYSTEM STATUS</div>
            <div className="space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-brand-lightBlue font-bold tracking-wide">
                  <span>DAQ NODE SENSOR CONNECTIVITY</span>
                  <span className="text-emerald-400">ACTIVE SYNCHRONIZATION</span>
                </div>
                <div className="grid grid-cols-4 gap-2.5">
                  {['Triaxial MEMS', 'VW Strain', 'Load Cell', 'Analog I/O'].map((name, i) => (
                    <div key={i} className="bg-navy-950 p-2.5 rounded-lg border border-navy-800 text-center">
                      <div className="text-[10px] text-slate-500 block mb-1">CH-0{i+1}</div>
                      <div className="text-xs text-white font-bold truncate">{name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Graphical Waveform Simulation */}
              <div className="bg-navy-950 rounded-xl border border-navy-800 p-4 flex-1 flex flex-col justify-between min-h-[120px]">
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                  <span>DYNAMIC LOAD FREQUENCY WAVEFORM</span>
                  <span>TIME TSN: 14:02:11.239</span>
                </div>
                <div className="flex items-end justify-between h-20 px-2 gap-1 pt-2">
                  {[40, 20, 60, 80, 50, 30, 90, 70, 45, 60, 75, 40, 85, 30, 60, 40].map((h, i) => (
                    <div 
                      key={i} 
                      style={{ height: `${h}%` }} 
                      className={`w-full rounded-t-sm transition-all duration-500 ${
                        i % 2 === 0 ? 'bg-brand-blue shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-brand-lightBlue shadow-[0_0_8px_rgba(0,180,216,0.5)]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-xs border-t border-navy-800/80 pt-3">
                <div className="flex gap-4">
                  <div className="text-slate-400">Memory: <span className="text-white font-mono font-bold">48GB ECC</span></div>
                  <div className="text-slate-400">Engine: <span className="text-white font-mono font-bold">56-Core Xeon</span></div>
                </div>
                <Link to="/configurator" className="text-brand-lightBlue font-bold hover:underline flex items-center gap-0.5">Workstation Builder <ChevronRight className="w-3.5 h-3.5" /></Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== TRUSTED BY ===== */}
      <section className="bg-navy-950 py-10 border-b border-navy-800/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 font-mono tracking-widest uppercase mb-6">
          TRUSTED BY LEADING ORGANISATIONS NATIONWIDE
        </div>
        <div className="flex whitespace-nowrap animate-marquee gap-16 text-slate-400 font-display font-extrabold text-lg select-none">
          {['City Metro Rail Corp', 'National Highways Authority', 'Defense R&D Board', 'Aeronautical Space Labs', 'State Hydropower Ltd', 'Heavy Engineering Corp'].map((c, i) => (
            <span key={i} className="opacity-40 hover:opacity-150 hover:text-white transition-opacity">{c}</span>
          ))}
          {['City Metro Rail Corp', 'National Highways Authority', 'Defense R&D Board', 'Aeronautical Space Labs', 'State Hydropower Ltd', 'Heavy Engineering Corp'].map((c, i) => (
            <span key={i + 10} className="opacity-40 hover:opacity-150 hover:text-white transition-opacity">{c}</span>
          ))}
        </div>
      </section>

      {/* ===== ENGINEERING SOLUTIONS ===== */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="text-brand-lightBlue font-display font-bold text-xs tracking-widest uppercase">ENGINEERING APPLICATIONS</div>
          <h2 className="text-3xl font-display font-bold text-white">Integrated Turnkey Solutions</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Discover how we apply precision sensors and data acquisition stacks to verify structural, geotechnical, and highway asset conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockSolutions.map((sol) => (
            <div key={sol.id} className="bg-navy-900 border border-navy-800 hover:border-brand-blue/30 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-xl">
              <div>
                <div className="relative aspect-[21/9] overflow-hidden">
                  <img src={sol.image} alt={sol.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-brand-lightBlue transition-colors">{sol.name}</h3>
                  <p className="text-xs text-brand-lightBlue font-medium">{sol.subtitle}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{sol.description}</p>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-navy-800/50 mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">Workflow steps: 0{sol.workflow.length}</span>
                <Link to={`/solutions/${sol.id}`} className="text-xs font-bold text-brand-lightBlue hover:underline flex items-center gap-0.5">Explore Case Studies <ChevronRight className="w-3.5 h-3.5" /></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PRODUCTS CATEGORIES SHOWCASE ===== */}
      <section className="bg-navy-900/40 border-y border-navy-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-4">
              <div className="text-brand-lightBlue font-display font-bold text-xs tracking-widest uppercase">TECHNICAL PORTFOLIO</div>
              <h2 className="text-3xl font-display font-bold text-white">Browse Product Classes</h2>
            </div>
            <Link to="/products" className="text-sm font-bold text-brand-lightBlue hover:underline flex items-center gap-0.5">View Full Product Catalogue <ChevronRight className="w-4 h-4" /></Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Computing Hardware', desc: 'Processors, motherboards, high-capacity GPUs, edge modules, workstations.', link: '/products?category=computing', icon: <Cpu className="w-6 h-6" /> },
              { title: 'Sensors & Transducers', desc: 'Accelerometers, dynamic load cells, strain gauges, and pressure nodes.', link: '/products?category=sensors', icon: <Activity className="w-6 h-6" /> },
              { title: 'Data Acquisition (DAQ)', desc: 'Chassis, data loggers, analog I/O, and signal conditioners.', link: '/products?category=daq', icon: <Database className="w-6 h-6" /> },
              { title: 'Interface & PCie Cards', desc: 'Galvanic isolated PCIe CAN cards, serial adapters, and controllers.', link: '/products?category=interface-cards', icon: <Wrench className="w-6 h-6" /> },
              { title: 'Test & Measurement', desc: 'Oscilloscopes, digital multimeters, dynamic signal generators.', link: '/products?category=test-measurement', icon: <Scale className="w-6 h-6" /> },
              { title: 'Custom Configurator', desc: 'Dynamic B2B workstation configuration builder with compatibility check.', link: '/configurator', icon: <Cpu className="w-6 h-6" /> }
            ].map((cat, i) => (
              <Link 
                key={i} 
                to={cat.link}
                className="bg-navy-900 border border-navy-800 hover:border-brand-blue/35 p-6 rounded-xl flex gap-4 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-lg bg-navy-850 border border-navy-800 text-brand-lightBlue group-hover:bg-brand-blue/15 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  {cat.icon}
                </div>
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-white text-base group-hover:text-brand-lightBlue transition-colors">{cat.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ===== DYNAMIC FEATURED PRODUCTS ===== */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="text-brand-lightBlue font-display font-bold text-xs tracking-widest uppercase">RECOMMENDED COMPONENTS</div>
          <h2 className="text-3xl font-display font-bold text-white">Featured Technical Hardware</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts.slice(0, 4).map((prod) => (
            <div key={prod.id} className="bg-navy-900 border border-navy-800 hover:border-brand-blue/30 rounded-xl overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-md">
              <div>
                <div className="relative aspect-video overflow-hidden bg-navy-950">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 bg-navy-950/80 border border-navy-800 text-[10px] text-slate-400 font-mono px-2 py-0.5 rounded-full capitalize">
                    {prod.category}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-display font-bold text-sm text-white line-clamp-1 group-hover:text-brand-lightBlue transition-colors">{prod.name}</h3>
                  <p className="text-[10px] font-mono text-slate-500">{prod.sku} • {prod.brand}</p>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{prod.shortDescription}</p>
                </div>
              </div>
              <div className="p-5 pt-0 border-t border-navy-800/50 mt-4 flex items-center justify-between">
                <span className="text-sm font-bold text-white font-mono">{prod.price}</span>
                <Link to={`/products/${prod.id}`} className="text-xs font-bold text-brand-lightBlue hover:underline flex items-center gap-0.5">Details <ChevronRight className="w-3.5 h-3.5" /></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="bg-navy-900/40 border-y border-navy-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="text-brand-lightBlue font-display font-bold text-xs tracking-widest uppercase">PLATFORM ADVANTAGES</div>
            <h2 className="text-3xl font-display font-bold text-white">Engineered for Technical B2B Workflows</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              ApexTech offers complete component-level documentation and hardware verification. Compare specs, review system config constraints, and request technical RFQs with full attachment specs.
            </p>
            <div className="space-y-4">
              {[
                { title: 'ISO 9001:2015 Standards Compliance', desc: 'All dynamic sensors and test hardware trace directly to national metrology protocols.' },
                { title: 'Workstation Compatibility Guarantee', desc: 'Our configurator checker uses real component architecture rules to prevent slot mismatches.' },
                { title: 'Sub-24 Hr RFQ turnaround', desc: 'Direct support from dedicated instrumentation and compute hardware designers.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-white text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Consultation Request Form */}
          <div className="bg-navy-900 border border-navy-800 p-8 rounded-2xl shadow-2xl relative">
            {consSuccess && (
              <div className="absolute inset-0 bg-navy-900/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 rounded-2xl z-10 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400" />
                <h3 className="font-display font-bold text-white text-lg">Consultation Request Staged</h3>
                <p className="text-xs text-slate-400 max-w-xs">We have queued your consultation. An engineer will follow up shortly.</p>
              </div>
            )}
            <h3 className="font-display font-bold text-xl text-white mb-2">Request Technical Consultation</h3>
            <p className="text-xs text-slate-400 mb-6">Need assistance specifying sensors or compute components? Complete the fields below.</p>
            
            <form onSubmit={handleConsultSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. John Doe"
                  value={consName}
                  onChange={(e) => setConsName(e.target.value)}
                  className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-brand-blue"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Work Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="john@company.com"
                  value={consEmail}
                  onChange={(e) => setConsEmail(e.target.value)}
                  className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-brand-blue"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Message / Requirements</label>
                <textarea 
                  rows={3} 
                  required
                  placeholder="Detail your engineering challenges, dynamic loads, or memory configuration needs..."
                  value={consMsg}
                  onChange={(e) => setConsMsg(e.target.value)}
                  className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-brand-blue resize-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-brand-blue hover:bg-brand-darkBlue text-white font-bold py-2.5 rounded-lg text-sm transition-colors mt-2"
              >
                Send Request
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
};
