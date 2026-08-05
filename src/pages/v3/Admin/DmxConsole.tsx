import React, { useState, useEffect, useRef } from 'react';
import { Sliders, Sun, Zap, Cloud, Play, Pause, Save, RotateCcw, Activity } from 'lucide-react';
import { GlassCard } from '../../../components/v3/ui/GlassCard';
import { Button } from '../../../components/v3/ui/Button';
import { useV3Store } from '../../../store/v3Store';

// Preset Types
interface DmxPreset {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  laserColor: string;
  dimmer: number;
  strobeSpeed: number;
  fogVolume: number;
  sweepSpeed: number;
  laserPattern: 'sine' | 'cones' | 'mesh';
}

const PRESETS: DmxPreset[] = [
  {
    name: 'Royal Heritage Gold',
    primaryColor: '#F59E0B', // amber-500
    secondaryColor: '#D97706', // amber-600
    laserColor: '#F59E0B',
    dimmer: 80,
    strobeSpeed: 0,
    fogVolume: 35,
    sweepSpeed: 3,
    laserPattern: 'sine'
  },
  {
    name: 'Cyberpunk Neon Concert',
    primaryColor: '#D946EF', // magenta
    secondaryColor: '#06B6D4', // cyan
    laserColor: '#10B981', // green
    dimmer: 95,
    strobeSpeed: 8,
    fogVolume: 50,
    sweepSpeed: 6,
    laserPattern: 'mesh'
  },
  {
    name: 'Midnight Jazz Lounge',
    primaryColor: '#3B82F6', // blue
    secondaryColor: '#6366F1', // indigo
    laserColor: '#EC4899', // pink
    dimmer: 50,
    strobeSpeed: 0,
    fogVolume: 20,
    sweepSpeed: 2,
    laserPattern: 'cones'
  },
  {
    name: 'Emerald Garden Palace',
    primaryColor: '#10B981', // emerald
    secondaryColor: '#059669',
    laserColor: '#F59E0B',
    dimmer: 70,
    strobeSpeed: 0,
    fogVolume: 40,
    sweepSpeed: 4,
    laserPattern: 'sine'
  }
];

export const DmxConsole: React.FC = () => {
  const { employees, addNotification } = useV3Store();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // DMX Sliders State
  const [dimmer, setDimmer] = useState<number>(80);
  const [strobeSpeed, setStrobeSpeed] = useState<number>(0);
  const [fogVolume, setFogVolume] = useState<number>(30);
  const [sweepSpeed, setSweepSpeed] = useState<number>(3);
  
  // Color controls
  const [primaryColor, setPrimaryColor] = useState<string>('#F59E0B');
  const [secondaryColor, setSecondaryColor] = useState<string>('#D97706');
  
  // Laser details
  const [laserPattern, setLaserPattern] = useState<'sine' | 'cones' | 'mesh'>('sine');
  const [laserColor, setLaserColor] = useState<string>('#F59E0B');
  const [lasersActive, setLasersActive] = useState<boolean>(true);

  // Play/Pause simulation
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  
  // Local active preset name
  const [activePresetName, setActivePresetName] = useState<string>('Royal Heritage Gold');

  // Load custom preset on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('apex_dmx_preset');
      if (saved) {
        const parsed = JSON.parse(saved);
        setDimmer(parsed.dimmer);
        setStrobeSpeed(parsed.strobeSpeed);
        setFogVolume(parsed.fogVolume);
        setSweepSpeed(parsed.sweepSpeed);
        setPrimaryColor(parsed.primaryColor);
        setSecondaryColor(parsed.secondaryColor);
        setLaserPattern(parsed.laserPattern);
        setLaserColor(parsed.laserColor);
        setLasersActive(parsed.lasersActive);
        setActivePresetName('Loaded Custom Setup');
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleApplyPreset = (preset: DmxPreset) => {
    setDimmer(preset.dimmer);
    setStrobeSpeed(preset.strobeSpeed);
    setFogVolume(preset.fogVolume);
    setSweepSpeed(preset.sweepSpeed);
    setPrimaryColor(preset.primaryColor);
    setSecondaryColor(preset.secondaryColor);
    setLaserPattern(preset.laserPattern);
    setLaserColor(preset.laserColor);
    setActivePresetName(preset.name);
    addNotification(
      'DMX Preset Triggered',
      `Staging lights synced to "${preset.name}".`,
      'employee'
    );
  };

  const handleSavePreset = () => {
    const config = {
      dimmer,
      strobeSpeed,
      fogVolume,
      sweepSpeed,
      primaryColor,
      secondaryColor,
      laserPattern,
      laserColor,
      lasersActive
    };
    localStorage.setItem('apex_dmx_preset', JSON.stringify(config));
    setActivePresetName('Custom Saved Config');
    addNotification(
      'DMX Config Saved',
      'Stored custom DMX parameters in browser local storage.',
      'employee'
    );
    alert('DMX Custom Configuration successfully saved!');
  };

  const handleReset = () => {
    setDimmer(80);
    setStrobeSpeed(0);
    setFogVolume(30);
    setSweepSpeed(3);
    setPrimaryColor('#F59E0B');
    setSecondaryColor('#D97706');
    setLaserPattern('sine');
    setLaserColor('#F59E0B');
    setLasersActive(true);
    setActivePresetName('Default Setup');
  };

  // Render & Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      if (isPlaying) {
        time += 0.02;
      }

      const width = canvas.width;
      const height = canvas.height;

      // 1. Draw Backdrop Stage grid
      ctx.fillStyle = '#060B18'; // navy-950 backdrop
      ctx.fillRect(0, 0, width, height);

      // Draw faint geometric stage trusses
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      // Draw grid
      for (let x = 0; x < width; x += 40) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 40) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Stage ground ellipse
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.ellipse(width / 2, height - 20, width * 0.4, 25, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 2. Draw Haze / Fog particles
      if (fogVolume > 0) {
        ctx.save();
        ctx.globalAlpha = (fogVolume / 100) * 0.15;
        ctx.fillStyle = '#ffffff';
        // Simulating drifting dust/smoke blobs
        for (let i = 0; i < 5; i++) {
          const fx = (width / 4) * i + Math.sin(time + i) * 20;
          const fy = (height / 2) + Math.cos(time * 0.5 + i) * 30;
          ctx.beginPath();
          ctx.arc(fx, fy, 120 + Math.sin(time * 0.1) * 30, 0, 2 * Math.PI);
          ctx.fill();
        }
        ctx.restore();
      }

      // 3. Strobe calculations
      let shouldRenderBeams = true;
      if (strobeSpeed > 0) {
        // Fast flashing toggle based on strobe rate frequency
        const ticks = Math.floor(time * strobeSpeed * 3);
        shouldRenderBeams = ticks % 2 === 0;
      }

      // 4. Render Spotlight Beams
      if (shouldRenderBeams) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        
        // Multi spotlights
        const spotlightCount = 4;
        const beamIntensity = dimmer / 100;
        
        for (let i = 0; i < spotlightCount; i++) {
          // X location of light source on the truss ceiling
          const sourceX = (width / (spotlightCount + 1)) * (i + 1);
          const sourceY = 20;

          // Compute swinging angle
          // Each beam has a slightly offset phase sweep
          const phaseOffset = i * (Math.PI / 2);
          const maxSwing = 0.6; // radians
          const angle = Math.sin(time * (sweepSpeed * 0.3) + phaseOffset) * maxSwing;

          // Target endpoint coordinates
          const beamLength = height * 0.9;
          const targetX = sourceX + Math.sin(angle) * beamLength;
          const targetY = sourceY + Math.cos(angle) * beamLength;

          // Create beam color gradient
          const grad = ctx.createLinearGradient(sourceX, sourceY, targetX, targetY);
          const activeColor = i % 2 === 0 ? primaryColor : secondaryColor;
          
          grad.addColorStop(0, activeColor);
          grad.addColorStop(0.1, activeColor);
          grad.addColorStop(1, 'transparent');

          // Draw beam polygon cone
          ctx.beginPath();
          ctx.moveTo(sourceX, sourceY);
          
          // Width of the light beam widening at bottom
          const beamWidth = 45 + (fogVolume * 0.3); // Haze spreads the beam!
          const perpX = Math.cos(angle) * beamWidth;
          const perpY = -Math.sin(angle) * beamWidth;

          ctx.lineTo(targetX - perpX, targetY - perpY);
          ctx.lineTo(targetX + perpX, targetY + perpY);
          ctx.closePath();

          ctx.fillStyle = grad;
          ctx.globalAlpha = 0.25 * beamIntensity;
          ctx.fill();

          // Draw the physical lens source dot
          ctx.beginPath();
          ctx.arc(sourceX, sourceY, 6, 0, 2 * Math.PI);
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = 0.9 * beamIntensity;
          ctx.fill();
        }
        ctx.restore();
      }

      // 5. Draw Lasers (Vibrant sharp neon beams)
      if (lasersActive && shouldRenderBeams) {
        ctx.save();
        ctx.strokeStyle = laserColor;
        ctx.shadowColor = laserColor;
        ctx.shadowBlur = 12;
        ctx.lineWidth = 3.5;
        ctx.globalAlpha = (dimmer / 100) * 0.9;

        const centerY = height * 0.65;
        
        ctx.beginPath();
        if (laserPattern === 'sine') {
          // Drawing sine waves across the screen
          for (let x = 0; x < width; x += 2) {
            const y = centerY + Math.sin(x * 0.02 + time * 5) * 40 * Math.sin(time * 0.5);
            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
        } else if (laserPattern === 'cones') {
          // Laser fans emanating from bottom left and bottom right corners
          const leftSourceX = 40;
          const leftSourceY = height - 30;
          const rightSourceX = width - 40;
          const rightSourceY = height - 30;

          const fanCount = 7;
          const spreadAngle = 0.8; // radians

          for (let i = 0; i < fanCount; i++) {
            const step = i / (fanCount - 1);
            // Left fan sweeps
            const leftAngle = -Math.PI / 4 + Math.sin(time) * 0.2 + (step * spreadAngle);
            ctx.moveTo(leftSourceX, leftSourceY);
            ctx.lineTo(leftSourceX + Math.cos(leftAngle) * width * 0.7, leftSourceY - Math.sin(leftAngle) * height * 0.7);

            // Right fan sweeps
            const rightAngle = Math.PI * 0.75 + Math.sin(time + 1) * 0.2 - (step * spreadAngle);
            ctx.moveTo(rightSourceX, rightSourceY);
            ctx.lineTo(rightSourceX + Math.cos(rightAngle) * width * 0.7, rightSourceY - Math.sin(rightAngle) * height * 0.7);
          }
        } else if (laserPattern === 'mesh') {
          // Futuristic coordinate geometric cross wires
          const lineY1 = centerY - 50 + Math.sin(time * 2) * 30;
          const lineY2 = centerY + 50 + Math.cos(time * 2) * 30;
          for (let x = 50; x < width - 50; x += 60) {
            ctx.moveTo(x, lineY1);
            ctx.lineTo(width - x, lineY2);
          }
        }
        ctx.stroke();
        ctx.restore();
      }

      // 6. Draw Truss Structure overlay outline (on top)
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, width, 12);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Draw truss girder lattice
      for (let x = 0; x < width; x += 30) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x + 15, 12);
        ctx.lineTo(x + 30, 0);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, dimmer, strobeSpeed, fogVolume, sweepSpeed, primaryColor, secondaryColor, laserPattern, laserColor, lasersActive]);

  // Find David Chen to see if lighting technician is active
  const lightingTechnician = employees.find(e => e.role.toLowerCase().includes('lighting') || e.name.includes('David'));

  return (
    <div className="space-y-8 animate-fade-in font-poppins text-slate-300">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-2xl font-heading font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-6 h-6 text-amber-400" /> DMX Intelligent Staging &amp; Light Control
          </h2>
          <p className="text-xs text-slate-400">
            Control color palettes, strobe cycles, stage fog volume, and custom laser mesh shapes in real-time.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-500 font-bold uppercase font-mono">Presets:</span>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, i) => (
              <button
                key={i}
                onClick={() => handleApplyPreset(p)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                  activePresetName === p.name
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-glow-gold'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {p.name.replace('Royal Heritage ', '').replace('Cyberpunk ', '').replace('Emerald ', '').replace('Midnight ', '')}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Real-time Live stage visualizer */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-200 flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`} />
              Live Stage Preview Visualizer ({activePresetName})
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-300 border border-slate-800 flex items-center gap-1 text-[10px]"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isPlaying ? 'Pause Simulation' : 'Resume Simulation'}
              </button>
            </div>
          </div>

          <div className="relative border border-slate-800 rounded-2xl overflow-hidden shadow-2xl bg-slate-950">
            {/* Visualizer Canvas */}
            <canvas
              ref={canvasRef}
              width={760}
              height={440}
              className="w-full h-auto block aspect-[19/11]"
            />
            
            {/* Live Telemetry Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-3 rounded-xl text-[10px] font-mono text-slate-400">
              <div className="flex gap-4">
                <div>Primary Color: <span className="font-bold text-slate-100">{primaryColor}</span></div>
                <div>Secondary Color: <span className="font-bold text-slate-100">{secondaryColor}</span></div>
                <div>Lasers: <span className={lasersActive ? 'text-emerald-400 font-bold' : 'text-slate-600'}>{lasersActive ? 'ON' : 'OFF'}</span></div>
              </div>
              <div>Estimated Staging TDP: <span className="text-amber-400 font-bold">{(dimmer * 4.2 + (lasersActive ? 85 : 0) + (fogVolume * 1.5)).toFixed(0)} W</span></div>
            </div>
          </div>
        </div>

        {/* Right Side: DMX controls */}
        <div className="space-y-6">
          <GlassCard goldBorder={false} className="p-6 space-y-6">
            <h3 className="text-base font-heading font-semibold text-slate-100 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" /> DMX Console Master Controls
            </h3>

            {/* Sliders Grid */}
            <div className="space-y-5 text-xs">
              
              {/* Dimmer */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold uppercase flex items-center gap-1"><Sun className="w-3.5 h-3.5 text-amber-400" /> Master Dimmer</span>
                  <span className="font-bold text-slate-100 font-mono">{dimmer}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dimmer}
                  onChange={(e) => setDimmer(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer bg-slate-950 h-1.5 rounded-lg appearance-none"
                />
              </div>

              {/* Strobe */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold uppercase flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-400" /> Strobe Frequency</span>
                  <span className="font-bold text-slate-100 font-mono">{strobeSpeed === 0 ? 'OFF' : `${strobeSpeed} Hz`}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={strobeSpeed}
                  onChange={(e) => setStrobeSpeed(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer bg-slate-950 h-1.5 rounded-lg appearance-none"
                />
              </div>

              {/* Fog Haze Volume */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold uppercase flex items-center gap-1"><Cloud className="w-3.5 h-3.5 text-amber-400" /> Haze / Fog Capacity</span>
                  <span className="font-bold text-slate-100 font-mono">{fogVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={fogVolume}
                  onChange={(e) => setFogVolume(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer bg-slate-950 h-1.5 rounded-lg appearance-none"
                />
              </div>

              {/* Sweep Speed */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold uppercase flex items-center gap-1">Beam Sweep Velocity</span>
                  <span className="font-bold text-slate-100 font-mono">{sweepSpeed} (slow-fast)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={sweepSpeed}
                  onChange={(e) => setSweepSpeed(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer bg-slate-950 h-1.5 rounded-lg appearance-none"
                />
              </div>

            </div>

            {/* Colors picker */}
            <div className="space-y-3 border-t border-slate-800 pt-5 text-xs">
              <span className="text-slate-400 font-bold uppercase block">Color Palette Selection</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-500 mb-1">Beam 1 &amp; 3 Color</label>
                  <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-6 h-6 rounded border border-slate-700 bg-transparent cursor-pointer"
                    />
                    <span className="text-[10px] font-mono font-bold text-slate-300">{primaryColor.toUpperCase()}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-1">Beam 2 &amp; 4 Color</label>
                  <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-6 h-6 rounded border border-slate-700 bg-transparent cursor-pointer"
                    />
                    <span className="text-[10px] font-mono font-bold text-slate-300">{secondaryColor.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Laser configurations */}
            <div className="space-y-3 border-t border-slate-800 pt-5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-bold uppercase">Dynamic Stage Lasers</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lasersActive}
                    onChange={(e) => setLasersActive(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500 peer-checked:after:bg-slate-950" />
                </label>
              </div>

              {lasersActive && (
                <div className="space-y-3 animate-fade-in">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Laser Wave Color</label>
                      <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                        <input
                          type="color"
                          value={laserColor}
                          onChange={(e) => setLaserColor(e.target.value)}
                          className="w-6 h-6 rounded border border-slate-700 bg-transparent cursor-pointer"
                        />
                        <span className="text-[10px] font-mono font-bold text-slate-300">{laserColor.toUpperCase()}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Truss Wave Pattern</label>
                      <select
                        value={laserPattern}
                        onChange={(e) => setLaserPattern(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-800 p-2 rounded-lg text-[10px] text-slate-300 focus:outline-none focus:border-amber-500"
                      >
                        <option value="sine">Sine Scan</option>
                        <option value="cones">Cone Fan</option>
                        <option value="mesh">Mesh Cross</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Presets & Admin actions */}
            <div className="flex gap-3 border-t border-slate-800 pt-5">
              <Button
                variant="primary"
                size="sm"
                className="flex-1 shadow-glow-gold"
                onClick={handleSavePreset}
                icon={<Save className="w-4 h-4" />}
              >
                Save Layout
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={handleReset}
                icon={<RotateCcw className="w-4 h-4" />}
              >
                Reset Default
              </Button>
            </div>

          </GlassCard>

          {/* Connected Tech Status */}
          {lightingTechnician && (
            <GlassCard className="p-4 text-xs space-y-2 border border-slate-800">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Assigned Staging Tech:</span>
                <span className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/30 rounded text-[9px] font-bold text-purple-300 uppercase">
                  {lightingTechnician.status}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <img src={lightingTechnician.avatar} alt={lightingTechnician.name} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                <div>
                  <div className="font-bold text-slate-100">{lightingTechnician.name}</div>
                  <div className="text-[10px] text-slate-400">{lightingTechnician.role}</div>
                </div>
              </div>
            </GlassCard>
          )}

        </div>

      </div>

    </div>
  );
};
