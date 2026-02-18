const { useState, useEffect, useRef } = React;

const Icon = ({ name, size = 16, className = "" }) => (
    <i data-lucide={name} className={className} style={{ width: size, height: size, display: 'inline-block' }}></i>
);

// --- Background ---
const NeuralBackground = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current; const ctx = canvas.getContext('2d');
        let frame;
        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        window.addEventListener('resize', resize); resize();
        const pts = Array.from({ length: 40 }, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 }));
        const draw = () => {
            ctx.clearRect(0,0,canvas.width, canvas.height);
            ctx.fillStyle = '#020617'; ctx.fillRect(0,0,canvas.width,canvas.height);
            pts.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if(p.x<0 || p.x>canvas.width) p.vx*=-1; if(p.y<0 || p.y>canvas.height) p.vy*=-1;
                ctx.beginPath(); ctx.arc(p.x, p.y, 1, 0, Math.PI*2); ctx.fillStyle = '#1e293b'; ctx.fill();
            });
            frame = requestAnimationFrame(draw);
        };
        draw(); return () => cancelAnimationFrame(frame);
    }, []);
    return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

// --- Page Modules ---

const HomePage = ({ setPage }) => {
    const [booting, setBooting] = useState(true);
    useEffect(() => { setTimeout(() => { setBooting(false); lucide.createIcons(); }, 2000); }, []);

    if (booting) return (
        <div className="flex flex-col items-center justify-center min-h-screen font-mono text-slate-500">
            <div className="w-48 h-1 bg-slate-900 overflow-hidden mb-4"><div className="h-full bg-white animate-loading"></div></div>
            <p className="text-[10px] tracking-widest uppercase">Initializing Tuli_Aron_V20...</p>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto px-6 py-20 text-center space-y-24 animate-in fade-in">
            <header className="space-y-4">
                <h2 className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase">Status: Evolution</h2>
                <h1 className="text-7xl md:text-9xl font-black tracking-tighter">TULI ARON</h1>
                <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">Archive Node: 2006 // 2026</p>
            </header>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {['timeline', 'year19', 'analytics', 'future'].map(id => (
                    <button key={id} onClick={() => setPage(id)} className="p-10 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-left group">
                        <Icon name="ArrowRight" className="mb-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="font-bold uppercase text-lg">{id}</h3>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Access Module</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

const Timeline = () => (
    <div className="max-w-5xl mx-auto px-6 py-20 space-y-16">
        <h2 className="text-4xl font-black uppercase tracking-tighter italic">Two Decades</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[{t:'Foundation', y:'0-5'}, {t:'Curiosity', y:'6-10'}, {t:'Discovery', y:'11-15'}, {t:'Expansion', y:'16-20'}].map((e,i) => (
                <div key={i} className="border-t border-white/10 pt-6 relative">
                    <span className="absolute -top-3 left-0 text-[10px] font-mono text-slate-500 uppercase">Phase {e.y}</span>
                    <h3 className="text-xl font-bold uppercase">{e.t}</h3>
                    <p className="text-sm text-slate-400 mt-2">Data point collected from age {e.y} transition period.</p>
                </div>
            ))}
        </div>
    </div>
);

const Year19 = () => (
    <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-16 text-center relative overflow-hidden">
            <div className="smoke" style={{left: '20%', animationDelay: '0s'}}></div>
            <div className="smoke" style={{left: '50%', animationDelay: '2s'}}></div>
            <div className="smoke" style={{left: '80%', animationDelay: '1s'}}></div>
            <div className="relative z-10 space-y-6">
                <h2 className="text-5xl font-bold uppercase tracking-tight">Year 19: The Breakthrough</h2>
                <p className="text-slate-400 max-w-xl mx-auto">This was the year I quit smoking. The architecture of my life was rewritten from biological impulse to disciplined intent.</p>
                <div className="inline-block px-8 py-3 bg-white text-black font-black text-xs rounded-full uppercase tracking-tighter">Smoke Free Status: Verified</div>
            </div>
        </div>
    </div>
);

const Analytics = () => (
    <div className="max-w-5xl mx-auto px-6 py-20 space-y-10">
        <h2 className="text-4xl font-black uppercase italic">Growth Metrics</h2>
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 flex items-end gap-3 h-80">
            {[40, 60, 35, 90, 75, 95, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-500/20 hover:bg-white transition-all rounded-t-lg" style={{height: `${h}%`}}></div>
            ))}
        </div>
    </div>
);

const Future = () => (
    <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="bg-white/[0.03] border border-white/10 p-12 rounded-3xl font-mono text-sm leading-relaxed text-slate-400">
            <h3 className="text-white border-b border-white/10 pb-4 mb-8">TRANSMISSION_TO_V.30</h3>
            <p className="mb-6">Tuli, At 20, you realized that discipline is the only true freedom.</p>
            <p className="mb-6">Quitting smoking was your first major victory over yourself. Never lose that edge.</p>
            <p className="text-white mt-12">Signed, V.20</p>
        </div>
    </div>
);

// --- App Shell ---

const App = () => {
    const [page, setPage] = useState('home');
    useEffect(() => { lucide.createIcons(); window.scrollTo(0,0); }, [page]);

    return (
        <div className="min-h-screen">
            <NeuralBackground />
            <main className="relative z-10">
                {page === 'home' && <HomePage setPage={setPage} />}
                {page === 'timeline' && <Timeline />}
                {page === 'year19' && <Year19 />}
                {page === 'analytics' && <Analytics />}
                {page === 'future' && <Future />}
            </main>
            <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex bg-slate-900/60 backdrop-blur-xl border border-white/10 p-2 rounded-full shadow-2xl">
                {['home', 'timeline', 'year19', 'analytics', 'future'].map(p => (
                    <button key={p} onClick={() => setPage(p)} className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${page === p ? 'bg-white text-black' : 'text-slate-400 hover:text-white'}`}>
                        {p}
                    </button>
                ))}
            </nav>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
  
