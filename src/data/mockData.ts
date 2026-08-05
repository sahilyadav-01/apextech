import type { Product, Solution, Industry, Resource } from '../types';

export const mockProducts: Product[] = [
  // ==================== COMPUTING HARDWARE ====================
  {
    id: 'cpu-xeon-w9',
    name: 'Intel Xeon W-3400 Processor',
    sku: 'CPU-XEON-W3495X',
    brand: 'Intel',
    category: 'computing',
    subcategory: 'cpu-processors',
    shortDescription: 'Intel Xeon W-3495X workstation processor, 56 cores, 112 threads, 4.8 GHz boost.',
    description: 'The Intel Xeon W-3495X processor represents the pinnacle of workstation performance. Built for extreme engineering workloads, scientific simulations, high-fidelity rendering, and AI training applications, it features 105MB of Intel Smart Cache, 8-channel DDR5 ECC memory support, and 112 PCIe Gen 5.0 lanes.',
    image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&w=400&q=80',
    price: '₹4,85,000',
    availability: 'In Stock',
    specifications: {
      'Manufacturer': 'Intel',
      'Architecture': 'Golden Cove',
      'Cores': 56,
      'Threads': 112,
      'Base Clock': '1.9 GHz',
      'Boost Clock': '4.8 GHz',
      'Cache': '105 MB',
      'Socket': 'FCLGA4677',
      'TDP': '350W',
      'Memory Support': 'DDR5 ECC up to 4TB',
      'PCIe Version': 'PCIe Gen 5.0 (112 lanes)',
      'Operating Temperature': '0°C to 72°C'
    },
    features: [
      'Intel Turbo Boost Max Technology 3.0',
      'Supports up to 4TB 8-channel DDR5-4800 ECC RDIMM',
      'AVX-512 and Intel AMX (Advanced Matrix Extensions) support',
      'Unlocked multiplier for performance tuning'
    ],
    tags: ['Intel', 'Xeon', 'Workstation', 'CPU', '56-Cores'],
    usedInSolutions: ['aerospace-automotive', 'earthquake-research'],
    usedInIndustries: ['research', 'aerospace', 'automotive']
  },
  {
    id: 'gpu-rtx-6000',
    name: 'NVIDIA RTX 6000 Ada Generation',
    sku: 'GPU-NV-RTX6000ADA',
    brand: 'NVIDIA',
    category: 'computing',
    subcategory: 'gpu',
    shortDescription: 'Professional Ada Lovelace GPU with 48GB GDDR6 ECC memory.',
    description: 'The NVIDIA RTX 6000 Ada Generation is the ultimate workstation graphics card designed for professionals who require top-tier rendering, visualization, data science, and computing performance. Leveraging the Ada Lovelace architecture, it delivers exceptional ray tracing, tensor computing, and graphics processing speeds.',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400&q=80',
    price: '₹7,50,000',
    availability: '3-4 Weeks',
    specifications: {
      'Architecture': 'Ada Lovelace',
      'GPU Cores': '18,176 CUDA Cores',
      'Tensor Cores': '568 Gen-4 Tensor Cores',
      'VRAM': '48 GB GDDR6',
      'Memory Type': 'ECC Registered',
      'Memory Bandwidth': '960 GB/s',
      'PCIe Generation': 'PCIe 4.0 x16',
      'Power Consumption': '300W',
      'Cooling': 'Active Blower',
      'Display Outputs': '4x DisplayPort 1.4a',
      'Form Factor': 'Dual-slot Width'
    },
    features: [
      '48GB massive VRAM with ECC for crash-free scientific computations',
      'NVIDIA RTX Virtual Workstation (vWS) support',
      'Third-generation RT Cores and Fourth-generation Tensor Cores',
      'Supports ultra-high resolution display arrays'
    ],
    tags: ['NVIDIA', 'RTX', 'Ada Lovelace', 'GPU', '48GB-VRAM'],
    usedInSolutions: ['structural-health-monitoring', 'earthquake-research', 'aerospace-automotive'],
    usedInIndustries: ['research', 'aerospace', 'automotive', 'infrastructure']
  },
  {
    id: 'mobo-asus-sage',
    name: 'ASUS Pro WS W790-ACE Motherboard',
    sku: 'MOBO-ASUS-W790ACE',
    brand: 'ASUS',
    category: 'computing',
    subcategory: 'motherboards',
    shortDescription: 'Intel W790 workstation motherboard, LGA 4677, PCIe 5.0, Quad LAN.',
    description: 'ASUS Pro WS W790-ACE is engineered for Intel Xeon W-3400 and W-2400 processors, featuring server-grade management, robust power stages, extensive PCIe Gen 5 expandability, dual 10G LAN, and support for high-bandwidth DDR5 ECC memory.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
    price: '₹95,000',
    availability: 'In Stock',
    specifications: {
      'Socket': 'LGA 4677',
      'Chipset': 'Intel W790',
      'Form Factor': 'SSI-CEB (12" x 10.5")',
      'Memory Type': 'DDR5 ECC RDIMM',
      'Maximum Memory': '2.0 TB',
      'Memory Slots': 8,
      'PCIe Slots': '5x PCIe 5.0 x16',
      'Storage Connectors': '3x M.2 (PCIe 5.0 x4), 4x SATA III, 3x SlimSAS',
      'LAN Ports': '1x 10G Marvell, 1x 2.5G Intel, 1x 1G Management',
      'Operating Temperature': '10°C to 50°C'
    },
    features: [
      'Server-grade AST2600 BMC for remote out-of-band management',
      'Robust 12+1+1 Power Stages with solid pins',
      'SafeSlot PCIe structural reinforcement',
      'ProCool II connectors for CPU power stability'
    ],
    tags: ['ASUS', 'Motherboard', 'Xeon', 'W790', 'LGA4677'],
    usedInSolutions: ['aerospace-automotive', 'earthquake-research'],
    usedInIndustries: ['research', 'aerospace', 'automotive']
  },
  {
    id: 'ram-kingston-rdimm',
    name: 'Kingston Server Premier 64GB DDR5 RDIMM',
    sku: 'RAM-KS-D5RD64G',
    brand: 'Kingston',
    category: 'computing',
    subcategory: 'memory',
    shortDescription: '64GB DDR5 4800MHz ECC Registered RDIMM server memory.',
    description: 'Kingston Server Premier ECC Registered DDR5 memory modules are strictly qualified for industrial workstation and enterprise server applications. Features on-die ECC and side-band registers for critical computational reliability.',
    image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=400&q=80',
    price: '₹22,500',
    availability: 'In Stock',
    specifications: {
      'Capacity': '64 GB',
      'Memory Type': 'DDR5 RDIMM',
      'Speed': '4800 MT/s',
      'Voltage': '1.1V',
      'Latency': 'CL40',
      'ECC Support': 'Registered ECC',
      'Pins': '288-pin DIMM',
      'Operating Temperature': '0°C to 85°C'
    },
    features: [
      'On-die ECC handles bit-flips automatically',
      'Strict BOM control for compatibility guarantees',
      'JEDEC standard specifications configuration',
      'Tested to validate standard enterprise system load'
    ],
    tags: ['Kingston', 'RAM', 'DDR5', 'ECC', '64GB'],
    usedInSolutions: ['aerospace-automotive', 'earthquake-research'],
    usedInIndustries: ['research', 'aerospace', 'automotive']
  },

  // ==================== SENSORS ====================
  {
    id: 'sensor-accel-3d',
    name: 'Triaxial Accelerometer AC-300',
    sku: 'SEN-ACC-AC300',
    brand: 'ApexTech',
    category: 'sensors',
    subcategory: 'accelerometers',
    shortDescription: 'High-sensitivity triaxial MEMS accelerometer for structural diagnostics.',
    description: 'The AC-300 Triaxial Accelerometer is designed for structural health monitoring, seismic research, and vibration testing. Features ultra-low noise density, hermetic sealing, and reliable data transmission over long cables in harsh field environments.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&w=400&q=80',
    price: '₹34,000',
    availability: 'In Stock',
    specifications: {
      'Sensor Type': 'Triaxial MEMS',
      'Measurement Range': '±2g / ±8g selectable',
      'Sensitivity': '1000 mV/g',
      'Frequency Range': '0.1 Hz to 1500 Hz',
      'Noise Density': '20 µg/√Hz',
      'Output': 'Analog Differential',
      'Excitation Voltage': '9V to 30V DC',
      'Operating Temperature': '-40°C to 85°C',
      'Ingress Protection': 'IP68 Hermetic',
      'Mounting Type': 'M8 Bolt / Adhesive'
    },
    features: [
      'Three orthogonal measurement channels (X, Y, Z)',
      'Sub-micro-g resolution for micro-seismic activity detection',
      'Hermetically sealed stainless steel housing',
      'High shock survival rating (10,000g)'
    ],
    tags: ['Triaxial', 'Accelerometer', 'MEMS', 'Vibration', 'IP68'],
    usedInSolutions: ['structural-health-monitoring', 'earthquake-research', 'railways'],
    usedInIndustries: ['infrastructure', 'railways', 'construction', 'research']
  },
  {
    id: 'sensor-strain-foil',
    name: 'Vibrating Wire Strain Gauge SG-120',
    sku: 'SEN-STR-VW120',
    brand: 'ApexTech',
    category: 'sensors',
    subcategory: 'strain',
    shortDescription: 'Vibrating wire strain gauge for concrete embedment and steel mounting.',
    description: 'Designed for long-term monitoring of strain in civil infrastructure, the SG-120 Vibrating Wire Strain Gauge provides excellent stability and immunity to cable resistance effects. Ideal for dams, tunnels, retaining walls, and bridge beams.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
    price: '₹14,500',
    availability: 'In Stock',
    specifications: {
      'Measurement Range': '3000 µε',
      'Resolution': '0.1 µε',
      'Accuracy': '±0.5% F.S.',
      'Active Gauge Length': '120 mm',
      'Resistance': '120 Ohms nominal',
      'Thermistor Included': '3k Ohm NTC (temp measurement)',
      'Output': 'Frequency Signal (Vibrating Wire)',
      'Operating Temperature': '-20°C to 80°C',
      'Ingress Protection': 'IP68 Submersible',
      'Mounting': 'Embedment / Arc-Weldable Brackets'
    },
    features: [
      'Vibrating wire technology prevents signal drift over decades',
      'Frequency output ensures immunity to electrical noise and line loss',
      'Integrated temperature sensor for thermal coefficient adjustments',
      'Highly durable steel construction'
    ],
    tags: ['Vibrating-Wire', 'Strain-Gauge', 'Infrastructure', 'IP68'],
    usedInSolutions: ['structural-health-monitoring', 'geotechnical'],
    usedInIndustries: ['infrastructure', 'construction', 'research']
  },
  {
    id: 'sensor-load-shear',
    name: 'Shear Beam Load Cell LC-500',
    sku: 'SEN-LOD-LC500',
    brand: 'ApexTech',
    category: 'sensors',
    subcategory: 'load',
    shortDescription: 'Alloy steel shear beam load cell, 5-ton capacity, IP67 protection.',
    description: 'The LC-500 is a high-accuracy, nickel-plated alloy steel shear beam load cell ideal for platform scales, industrial weighing hoppers, batching plants, and structural testing rigs.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
    price: '₹18,000',
    availability: 'In Stock',
    specifications: {
      'Capacity': '5000 kg (5 Ton)',
      'Rated Output': '2.0 mV/V ±0.002',
      'Non-Linearity': '±0.02% F.S.',
      'Hysteresis': '±0.02% F.S.',
      'Excitation': '5V to 12V DC/AC',
      'Input Resistance': '350 Ohms ±3.5',
      'Output Resistance': '350 Ohms ±3.5',
      'Safe Overload': '150% F.S.',
      'Operating Temperature': '-30°C to 70°C',
      'Ingress Protection': 'IP67 Waterproof'
    },
    features: [
      'Nickel-plated alloy steel structure with moisture-proof sealing',
      'Excellent dynamic response characteristics',
      'Low profiling height for simplified scale installations',
      'Calibrated for temperature-induced offset control'
    ],
    tags: ['Load-Cell', 'Shear-Beam', '5-Ton', 'Weighing', 'Alloy-Steel'],
    usedInSolutions: ['structural-health-monitoring', 'materials-testing'],
    usedInIndustries: ['infrastructure', 'construction', 'research']
  },

  // ==================== DATA ACQUISITION ====================
  {
    id: 'daq-system-main',
    name: 'CompactDAQ Chassis cDAQ-9189',
    sku: 'DAQ-NI-CDAQ9189',
    brand: 'ApexTech',
    category: 'daq',
    subcategory: 'daq',
    shortDescription: '8-slot Gigabit Ethernet CompactDAQ chassis with TSN synchronization.',
    description: 'The cDAQ-9189 is an 8-slot CompactDAQ Ethernet chassis designed for distributed sensor measurement systems. Features TSN (Time Sensitive Networking) synchronization for sub-microsecond alignment over standard ethernet cords.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80',
    price: '₹1,95,000',
    availability: '3-4 Weeks',
    specifications: {
      'Slots Count': 8,
      'Interface': 'Gigabit Ethernet (2x RJ45 switch ports)',
      'Synchronization': 'IEEE 802.1AS (TSN)',
      'A/D Converters': 'Dependent on C-Series Modules',
      'Buffer Memory': '128 MB',
      'Trigger Lines': '4x digital inputs/outputs',
      'Excitation Voltage': 'None (provided by modules)',
      'Input Voltage Range': '9V to 30V DC main input',
      'Power Consumption': '15W typical',
      'Operating Temperature': '-20°C to 55°C',
      'Software Support': 'LabVIEW, C/C++, Python API'
    },
    features: [
      'Daisy-chain multiple chassis using dual gigabit ethernet switch interfaces',
      'Rugged industrial metal chassis with dynamic cooling vents',
      'Support for over 80 C-Series sensor modules (strain, temperature, voltage)',
      'Hardware-timed synchronization guarantees consistent data collection'
    ],
    tags: ['DAQ', 'Chassis', 'Ethernet', 'TSN', '8-Slots'],
    usedInSolutions: ['structural-health-monitoring', 'railways', 'vibration-shock-testing'],
    usedInIndustries: ['infrastructure', 'railways', 'research', 'aerospace', 'automotive']
  },
  {
    id: 'daq-module-strain',
    name: 'Bridge Input Module NI-9237',
    sku: 'DAQ-NI-MOD9237',
    brand: 'ApexTech',
    category: 'daq',
    subcategory: 'signal-conditioning',
    shortDescription: '4-channel, 50 kS/s per channel, bridge input C-series module.',
    description: 'The NI-9237 contains all the signal conditioning required to power and measure up to four bridge-based sensors simultaneously. Compatible with load cells, pressure transducers, and half or full-bridge strain gauges.',
    image: 'https://images.unsplash.com/photo-1601524909162-be87252be298?auto=format&fit=crop&w=400&q=80',
    price: '₹88,000',
    availability: 'In Stock',
    specifications: {
      'Channels Count': '4 analog input channels',
      'ADC Resolution': '24-bit Delta-Sigma',
      'Sampling Rate': '50 kS/s per channel simultaneous',
      'Bridge Support': 'Full / Half bridge (Quarter with accessory)',
      'Input Range': '±25 mV/V',
      'Excitation': 'Internal 2.5V, 3.3V, 5V, 10V DC',
      'Interface': 'cDAQ / cRIO slots',
      'Ingress Protection': 'IP30 standard',
      'Operating Temperature': '-40°C to 70°C'
    },
    features: [
      'Simultaneous sampling removes phase shift across sensor arrays',
      'Built-in sensor power excitation and TEDS channel auto-detection',
      'Robust overload protection up to 30V on input pins',
      'Integrated filters prevent high-frequency noise aliasing'
    ],
    tags: ['DAQ-Module', 'Bridge-Input', '24-Bit', 'Strain-DAQ', 'Simultaneous'],
    usedInSolutions: ['structural-health-monitoring', 'materials-testing', 'geotechnical'],
    usedInIndustries: ['infrastructure', 'research', 'construction']
  },

  // ==================== INTERFACE CARDS ====================
  {
    id: 'card-can-pcie',
    name: 'Dual-Channel PCIe CAN-FD Interface',
    sku: 'CRD-PCIE-CANFD2',
    brand: 'ApexTech',
    category: 'interface-cards',
    subcategory: 'pcie',
    shortDescription: 'High-performance PCI Express CAN-FD card with galvanic isolation.',
    description: 'A dual-channel PCI Express interface card designed for CAN and CAN-FD communications in automotive design, system testing, and industrial control environments. Features reliable on-board controllers for minimal CPU load.',
    image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=400&q=80',
    price: '₹42,000',
    availability: 'In Stock',
    specifications: {
      'Interface type': 'PCI Express x1 Gen 2',
      'CAN Channels': '2x isolated CAN-FD channels',
      'Baud Rate': 'Up to 12 Mbit/s (FD mode), 1Mbit/s (classic CAN)',
      'Controller': 'NXP SJA1000 compatible custom core',
      'Galvanic Isolation': '2.5 kV RMS channel-to-computer',
      'Connector': '9-pin D-Sub (DB9)',
      'Termination': 'Software selectable 120 Ohm resistor',
      'Operating Temperature': '-20°C to 75°C'
    },
    features: [
      'Fully compliant with ISO 11898-1:2015 specifications',
      'Supports high-performance CAN-FD networks alongside legacy CAN protocols',
      'Galvanic isolation protects host CPU from high-voltage system noise',
      'Driver support for Windows 10/11 and Linux SocketCAN'
    ],
    tags: ['PCIe', 'CAN-FD', 'DB9', 'Automotive', 'Isolated'],
    usedInSolutions: ['aerospace-automotive'],
    usedInIndustries: ['aerospace', 'automotive', 'research']
  },

  // ==================== TEST & MEASUREMENT ====================
  {
    id: 'test-scope-4ch',
    name: 'Digital Oscilloscope DS-4024',
    sku: 'TST-SCO-DS4024',
    brand: 'ApexTech',
    category: 'test-measurement',
    subcategory: 'oscilloscopes',
    shortDescription: '4-channel, 200 MHz bandwidth digital phosphor oscilloscope.',
    description: 'The DS-4024 is an advanced 4-channel oscilloscope featuring a high sample rate, deep waveform memory, and a custom digital phosphor display for visualizing fast transient signals and jitter analysis in laboratory settings.',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80',
    price: '₹1,24,000',
    availability: 'In Stock',
    specifications: {
      'Bandwidth': '200 MHz',
      'Channels': '4 analog channels',
      'Sampling Rate': '4 GSa/s single-channel, 2 GSa/s dual',
      'Memory Depth': '140 Mpts',
      'Waveform Capture Rate': '110,000 wfms/s',
      'Vertical Resolution': '8-bit ADC',
      'Display': '9-inch color LCD (800x480)',
      'Connectivity': 'USB Host, USB Device, LAN (LXI), GPIB optional',
      'Operating Temperature': '0°C to 50°C'
    },
    features: [
      'UltraVision technology yields multi-level intensity grading display',
      'Deep memory enables high sampling rates over long signal windows',
      'Built-in real-time hardware waveform recording and playback',
      'A variety of serial bus triggering and decoding protocols standard'
    ],
    tags: ['Oscilloscope', '200MHz', '4-Channel', 'Lab-Equipment', 'UltraVision'],
    usedInSolutions: ['vibration-shock-testing', 'aerospace-automotive'],
    usedInIndustries: ['research', 'aerospace', 'automotive']
  }
];

export const mockSolutions: Solution[] = [
  {
    id: 'structural-health-monitoring',
    name: 'Structural Health Monitoring (SHM)',
    subtitle: 'Real-time integrity assessment for civil infrastructure assets',
    description: 'Our SHM solutions deliver end-to-end structural condition assessment of bridges, dams, skyscrapers, and tunnels. Using distributed sensors and synchronized data acquisition chassis, our systems provide continuous, real-time alert logs and analytical structural trends.',
    problem: 'Traditional visual inspections of civil assets are periodic, subjective, and unable to detect internal strain fatigue, hairline cracks, or settlement defects until catastrophic damage has occurred.',
    solutionText: 'Deploy high-sensitivity Triaxial MEMS Accelerometers and Vibrating Wire Strain Gauges across structural critical zones, connected to a TSN-synchronized cDAQ Network Chassis. The systems sample continuously and store parameters in a central database for live deformation plotting.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    workflow: [
      'Site structural analysis & model node planning',
      'Sensor mounting (Strain, Acceleration, Temperature)',
      'Chassis wiring, signal conditioning & loop verification',
      'Synchronization setup using TSN network protocols',
      'Real-time data visualization and automated email triggers'
    ],
    productsUsed: ['sensor-accel-3d', 'sensor-strain-foil', 'sensor-load-shear', 'daq-system-main', 'daq-module-strain', 'gpu-rtx-6000'],
    industries: ['infrastructure', 'construction', 'research'],
    caseStudies: [
      {
        title: 'Metro Rail Bridge Health Tracking',
        client: 'City Metro Rail Corp',
        challenge: 'A newly opened metro bridge was experiencing complex heavy-freight train loads requiring constant dynamic strain checking.',
        implementation: 'Installed 48 dynamic strain sensors and 12 triaxial accelerometers connected to 3 remote cDAQ-9189 units synchronized via fiber optic loops.',
        results: 'Real-time reports are delivered to the operation control room. Peak load dynamic spikes are checked immediately to guarantee safety.'
      }
    ]
  },
  {
    id: 'pavement-evaluation',
    name: 'Pavement Evaluation & Testing',
    subtitle: 'Non-destructive roadbed evaluation and structural verification',
    description: 'We offer state-of-the-art pavement evaluation packages including Ground Penetrating Radar (GPR) integration, Falling Weight Deflectometer (FWD) interface boards, and high-frequency profile capture tools.',
    problem: 'Road assets deteriorate under dynamic traffic stress and subgrade water infiltration. Coring is destructive, slow, and covers only small spots.',
    solutionText: 'Our pavement evaluation suites utilize high-speed DAQs coupled with dynamic sensor arrays to map subgrade layer interfaces and calculate absolute elastic modulus coefficients continuously.',
    image: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=800&q=80',
    workflow: [
      'System installation on survey utility trucks',
      'Calibration of distance transducer pulses',
      'High-speed analog acquisition initialization',
      'Continuous data logging alongside GPS coordinates',
      'Post-processing thickness layer calculations'
    ],
    productsUsed: ['daq-system-main', 'sensor-accel-3d', 'gpu-rtx-6000'],
    industries: ['roads-highways', 'infrastructure'],
    caseStudies: [
      {
        title: 'National Highway Subgrade Profiling',
        client: 'National Highways Agency',
        challenge: 'High-speed profiling was required for 1,200 km of dual-carriageway asphalt road to locate voids without disrupting traffic.',
        implementation: 'Equipped a survey vehicle with GPR arrays and dynamic accelerometers feeding a synchronized multichassis DAQ processor.',
        results: 'Completed the survey at 80 km/h survey speeds, outputting a complete subgrade mapping with 98% correlation to core confirmations.'
      }
    ]
  }
];

export const mockIndustries: Industry[] = [
  {
    id: 'infrastructure',
    name: 'Infrastructure & Civil Assets',
    description: 'Bridges, dams, tunnels, high-rise construction, and port structures require precise monitoring solutions to ensure safety, extend service lifetimes, and verify structural calculations.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=500&q=80',
    solutions: ['structural-health-monitoring', 'pavement-evaluation']
  },
  {
    id: 'research',
    name: 'Research & Academia',
    description: 'High-end university laboratories, defense organizations, and materials testing facilities rely on high-fidelity sensors, synchronized DAQs, and high-performance computing hardware to drive breakthroughs.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&w=500&q=80',
    solutions: ['structural-health-monitoring']
  },
  {
    id: 'aerospace',
    name: 'Aerospace & Avionics',
    description: 'Aerospace testing mandates extreme durability, precision calibration, and multi-channel synchronization for dynamic shock, vibration, and structural flight test validation.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80',
    solutions: []
  }
];

export const mockResources: Resource[] = [
  {
    id: 'res-vw-sg-ds',
    title: 'Vibrating Wire Strain Gauge SG-120 Datasheet',
    type: 'datasheet',
    category: 'Sensors',
    description: 'Full technical specifications, dimensions, wiring instructions, and material certifications for SG-120 Vibrating Wire Strain Gauges.',
    fileUrl: '#',
    date: '2026-06-15'
  },
  {
    id: 'res-cdaq-manual',
    title: 'CompactDAQ cDAQ-9189 User Manual',
    type: 'brochure',
    category: 'DAQ',
    description: 'Installation guide, network sync configurations, and daisy-chain topology setup rules for cDAQ-9189 chassis.',
    fileUrl: '#',
    date: '2026-07-10'
  },
  {
    id: 'res-shm-whitepaper',
    title: 'Distributed Fiber-Optic vs MEMS Acceleration in Bridge Monitoring',
    type: 'whitepaper',
    category: 'Structural Health',
    description: 'A technical whitepaper comparing sensor technologies in medium-span railway bridge dynamic load testing.',
    fileUrl: '#',
    date: '2026-05-20'
  }
];
