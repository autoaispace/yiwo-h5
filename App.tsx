import React, { useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import html2canvas from 'html2canvas';
import { 
  Smartphone, 
  Camera, 
  Shirt, 
  Sparkles, 
  QrCode, 
  ChevronDown, 
  User, 
  ArrowRight,
  Zap,
  Download,
  Loader2
} from 'lucide-react';

// --- Animation Variants ---
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const floatUpVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 50, damping: 20 }
  }
};

const scaleInVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { type: "spring", stiffness: 60, damping: 15 }
  }
};

// --- Shared Components ---

const BackgroundDecor = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden w-full h-full">
    {/* Top Left White Glaze (Simulate light hitting ceramic) */}
    <div className="absolute -top-[20%] -left-[20%] w-[150%] h-[80%] bg-gradient-to-br from-white via-white/40 to-transparent blur-[60px] opacity-70"></div>
    
    {/* Bottom Right Shadow/Depth Blob */}
    <div className="absolute -bottom-[10%] -right-[10%] w-[350px] h-[350px] bg-[#D1D5DB] rounded-full blur-[80px] opacity-20"></div>
    
    {/* 
      Fix: Use an img tag for noise instead of background-image.
      html2canvas often crashes with 'createPattern' on SVG background images.
      Using a direct img tag avoids this pattern generation step.
    */}
    <img 
      src="data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"
      alt=""
      className="absolute inset-0 w-full h-full object-cover opacity-[0.03]"
    />
  </div>
);

const CeramicCard = ({ children, className = "", isStatic = false }: { children?: React.ReactNode; className?: string, isStatic?: boolean }) => (
  <motion.div
    variants={isStatic ? undefined : floatUpVariants}
    className={`bg-ceramic-white shadow-ceramic rounded-3xl p-6 relative overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

// Wrapper that adapts based on isStatic mode
const SectionWrapper = ({ 
  children, 
  className = "", 
  isStatic = false 
}: { 
  children?: React.ReactNode; 
  className?: string;
  isStatic?: boolean;
}) => {
  if (isStatic) {
    // Static render for Image Generation
    return (
      <div 
        className={`w-[375px] h-[812px] flex flex-col items-center justify-center relative overflow-hidden px-6 py-8 bg-[#F5F6F8] ${className}`}
        style={{ flexShrink: 0 }}
      >
        <BackgroundDecor />
        <div className="w-full h-full flex flex-col relative z-10">
          {children}
        </div>
      </div>
    );
  }

  // Live render
  return (
    <section className={`h-screen w-full snap-center flex flex-col items-center justify-center relative overflow-hidden px-6 py-8 ${className}`}>
      <BackgroundDecor />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={sectionVariants}
        className="w-full max-w-[375px] h-full flex flex-col relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
};

// --- Poster 1: Identity ---
const PosterIdentity = ({ isStatic = false }: { isStatic?: boolean }) => (
  <SectionWrapper isStatic={isStatic}>
    {/* Top Brand */}
    <motion.div variants={!isStatic ? floatUpVariants : undefined} className="absolute top-4 w-full flex justify-center">
      <span className="text-[10px] tracking-[0.4em] font-sans font-medium text-text-grey uppercase opacity-50">
        Y I W O &nbsp; A P P
      </span>
    </motion.div>

    <div className="flex-1 flex flex-col items-center justify-center">
      {/* The Ceramic Sphere */}
      <motion.div 
        variants={!isStatic ? scaleInVariants : undefined}
        className="w-48 h-48 rounded-full bg-ceramic-white shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.05),0_30px_60px_-10px_rgba(0,0,0,0.15)] mb-12 flex items-center justify-center relative"
      >
        <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-white via-transparent to-gray-200 opacity-50 pointer-events-none"></div>
        <div className="w-44 h-44 rounded-full overflow-hidden border border-gray-200 shadow-sm">
          <img src="/public/images/logo.png" alt="logo" className="w-full h-full object-contain" />
        </div>
      </motion.div>

      {/* Text Hook */}
      <motion.h1 variants={!isStatic ? floatUpVariants : undefined} className="text-center font-serif text-4xl font-bold text-soft-black leading-snug mb-8">
        如果不进店，
        <br />
        客户还会买
        <br />
        你的衣服吗？
      </motion.h1>

      <motion.p variants={!isStatic ? floatUpVariants : undefined} className="text-center text-sm text-text-grey font-sans tracking-wide leading-relaxed font-medium">
        专为有品位的女装店打造
        <br />
        解决实体店流量焦虑
      </motion.p>
    </div>

    {!isStatic && (
      <motion.div 
        variants={floatUpVariants}
        className="absolute bottom-8 w-full flex justify-center pb-safe"
      >
        <motion.div 
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-gray-300" />
        </motion.div>
      </motion.div>
    )}
  </SectionWrapper>
);

// --- Poster 2: Try-On ---
const PosterTryOn = ({ isStatic = false }: { isStatic?: boolean }) => (
  <SectionWrapper isStatic={isStatic}>
    <motion.div variants={!isStatic ? floatUpVariants : undefined} className="mb-8 mt-4">
      <span className="text-xs font-serif text-gold-accent tracking-widest block mb-2 font-bold">01 / 功能</span>
      <h2 className="text-4xl font-bold font-serif text-soft-black mb-4">手机就是试衣间</h2>
      <p className="text-sm text-text-grey font-sans leading-relaxed">
        无需聘请模特，无需寄送样衣。
        <br />
        顾客上传照片，立马看到上身效果。
      </p>
    </motion.div>

    <div className="flex-1 flex flex-col items-center justify-center relative">
      <motion.div 
        initial={!isStatic ? { height: 0 } : undefined}
        whileInView={!isStatic ? { height: 80 } : undefined}
        style={isStatic ? { height: 80 } : undefined}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute w-[1px] bg-gold-accent/40 z-0 top-[35%] left-1/2 -translate-x-1/2"
      />

      <CeramicCard className="w-full mb-8 z-10 flex items-center gap-4 py-6" isStatic={isStatic}>
        <div className="w-12 h-12 rounded-full bg-ceramic-bg flex items-center justify-center shadow-inner">
          <Camera size={20} className="text-soft-black" strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold text-soft-black">商家拍照上新</h3>
          <p className="text-[10px] text-text-grey uppercase tracking-wider mt-0.5">Merchant Upload</p>
        </div>
      </CeramicCard>

      <CeramicCard className="w-full mt-8 z-10 flex items-center gap-4 py-6" isStatic={isStatic}>
        <div className="w-12 h-12 rounded-full bg-ceramic-bg flex items-center justify-center shadow-inner">
          <Smartphone size={20} className="text-soft-black" strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold text-soft-black">顾客在家试穿</h3>
          <p className="text-[10px] text-text-grey uppercase tracking-wider mt-0.5">User Experience</p>
        </div>
      </CeramicCard>
    </div>
  </SectionWrapper>
);

// --- Poster 3: Data ---
const PosterData = ({ isStatic = false }: { isStatic?: boolean }) => (
  <SectionWrapper isStatic={isStatic}>
    <motion.div variants={!isStatic ? floatUpVariants : undefined} className="mb-10 mt-4">
      <span className="text-xs font-serif text-gold-accent tracking-widest block mb-2 font-bold">02 / 价值</span>
      <h2 className="text-4xl font-bold font-serif text-soft-black mb-4">AI 帮你卖衣服</h2>
    </motion.div>

    <div className="flex-1 flex flex-col justify-center">
      <motion.div
        variants={!isStatic ? scaleInVariants : undefined}
        className="w-full backdrop-blur-xl bg-white/70 border border-white/50 shadow-ceramic-hover rounded-3xl p-6 mb-12 relative"
      >
        <div className="flex items-start justify-between mb-4">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-200 to-white shadow-sm flex items-center justify-center border border-white">
               <User size={20} className="text-gray-400" />
             </div>
             <div>
               <p className="text-xs text-text-grey font-medium mb-0.5">刚刚</p>
               <p className="text-sm font-serif text-soft-black">
                 顾客 <span className="font-semibold">小美</span> 试穿了
               </p>
             </div>
           </div>
           <span className="bg-gold-accent/10 text-gold-accent text-[10px] px-2 py-1 rounded-full border border-gold-accent/20 font-medium flex items-center gap-1">
             <Zap size={10} fill="currentColor" /> 高意向
           </span>
        </div>
        
        <div className="bg-ceramic-bg/50 rounded-xl p-3 flex items-center gap-3 mb-3 border border-white/30">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
             <Shirt size={16} className="text-soft-black" />
          </div>
          <div>
             <p className="text-xs font-serif text-soft-black">法式复古碎花连衣裙</p>
             <p className="text-[10px] text-text-grey">2024 春季新款</p>
          </div>
        </div>

        <p className="text-xs text-text-grey text-center border-t border-dashed border-gray-200 pt-3 mt-2">
          该顾客已浏览 3 次，试穿 2 次
        </p>
        
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-40 -z-10"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gold-accent rounded-full blur-3xl opacity-10 -z-10"></div>
      </motion.div>

      <div className="space-y-6 px-4">
        {[
          { title: "知道谁想买", desc: "不再盲目群发，精准触达意向客户" },
          { title: "数据雷达锁定", desc: "实时捕捉每一次试穿行为" },
          { title: "告别无效刷屏", desc: "让每一次沟通都更有价值" }
        ].map((item, idx) => (
          <motion.div key={idx} variants={!isStatic ? floatUpVariants : undefined} className="flex gap-4">
             <div className="mt-1">
               <Sparkles size={16} className="text-gold-accent" />
             </div>
             <div>
               <h4 className="font-serif text-soft-black font-bold text-lg mb-1">{item.title}</h4>
               <p className="text-xs text-text-grey">{item.desc}</p>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

// --- Poster 4: Invitation ---
const PosterInvitation = ({ isStatic = false }: { isStatic?: boolean }) => (
  <SectionWrapper className="bg-ceramic-bg" isStatic={isStatic}>
    {/* Additional overlay for Poster 4 to make the background cleaner behind the black card */}
    <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] z-0 pointer-events-none"></div>

    <div className="flex-1 flex flex-col items-center justify-center w-full z-10">
       <motion.div variants={!isStatic ? floatUpVariants : undefined} className="mb-6">
         <span className="text-[10px] tracking-[0.5em] font-sans font-medium text-text-grey uppercase block text-center">
           INVITATION
         </span>
       </motion.div>

       <motion.div 
         variants={!isStatic ? scaleInVariants : undefined}
         className="w-full bg-[#0F0F0F] rounded-[32px] p-8 shadow-2xl relative overflow-hidden text-center min-h-[480px] flex flex-col items-center"
       >
         {/* Gold Gradient Line */}
         <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-accent/50 to-transparent"></div>
         <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-accent/20 to-transparent"></div>
         
         {/* Subtle textured glow inside black card */}
         <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-white rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

         <div className="mt-8 mb-8">
            <h2 className="text-4xl font-bold font-serif text-white mb-3 tracking-wide">寻找 100 位店长</h2>
            <p className="text-gold-accent text-xs font-sans tracking-[0.2em] uppercase border border-gold-accent/30 rounded-full px-4 py-1.5 inline-block">
              内测资格 · 品质审核
            </p>
         </div>

         <p className="text-gray-400 text-xs leading-loose font-sans font-light mb-12 max-w-[240px] mx-auto">
           我们不追求数量，
           <br />
           只寻找有独特审美的店铺。
           <br />
           <span className="text-white">宁缺毋滥，期待与你同行。</span>
         </p>

         <div className="mt-auto mb-4 bg-white p-3 rounded-2xl w-36 h-36 flex items-center justify-center relative group">
              {/* 本地图片 */}
            <img src="/public/images/qr.jpg" alt="二维码" className="w-40 h-40 object-contain" />
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-matte-black"></div>
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-matte-black"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-matte-black"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-matte-black"></div>
         </div>

         <div className="flex items-center gap-2 text-white/50 text-[10px] font-sans tracking-wider">
           <span>扫码添加 · 申请名额</span>
           <ArrowRight size={10} />
         </div>

       </motion.div>
    </div>
    
    <motion.div variants={!isStatic ? floatUpVariants : undefined} className="mt-8 opacity-40 z-10">
       <span className="font-serif text-soft-black text-xs">Y I W O</span>
    </motion.div>
  </SectionWrapper>
);

export default function App() {
  const exportContainerRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPosters = async () => {
    if (!exportContainerRef.current) return;
    setIsGenerating(true);

    try {
      // Allow time for DOM to stabilize
      await new Promise(resolve => setTimeout(resolve, 800));

      const posters = Array.from(exportContainerRef.current.children) as HTMLElement[];
      const fileNames = ['yiwo-identity.png', 'yiwo-tryon.png', 'yiwo-data.png', 'yiwo-invitation.png'];
      const canvases: HTMLCanvasElement[] = [];

      // 1. Generate all individual canvases first (Scale 3 for HD)
      for (let i = 0; i < posters.length; i++) {
        const poster = posters[i];
        try {
          const canvas = await html2canvas(poster, {
            scale: 3, 
            useCORS: true,
            backgroundColor: '#F5F6F8',
            logging: false,
            width: 375,  // Explicit width
            height: 812, // Explicit height
            scrollX: 0,
            scrollY: 0,
          });
          canvases.push(canvas);
        } catch (e) {
          console.error(`Failed to render poster ${i}`, e);
        }
      }

      // 2. Trigger downloads for individual files
      for (let i = 0; i < canvases.length; i++) {
        const link = document.createElement('a');
        link.download = fileNames[i];
        link.href = canvases[i].toDataURL('image/png', 1.0);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // Important: Delay between downloads
        await new Promise(r => setTimeout(r, 600)); 
      }

      // 3. Generate Horizontal Stitched Banner
      if (canvases.length > 0) {
        const singleWidth = canvases[0].width;
        const singleHeight = canvases[0].height;
        const totalWidth = singleWidth * canvases.length;
        
        const stitchedCanvas = document.createElement('canvas');
        stitchedCanvas.width = totalWidth;
        stitchedCanvas.height = singleHeight;
        const ctx = stitchedCanvas.getContext('2d');

        if (ctx) {
            ctx.fillStyle = '#F5F6F8';
            ctx.fillRect(0, 0, totalWidth, singleHeight);

            canvases.forEach((canvas, index) => {
                ctx.drawImage(canvas, index * singleWidth, 0);
            });

            const link = document.createElement('a');
            link.download = 'yiwo-full-banner.png';
            link.href = stitchedCanvas.toDataURL('image/png', 1.0);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
      }

    } catch (err) {
      console.error("Export failed:", err);
      alert("生成图片失败，请刷新后重试。");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[#EAEBED] overflow-hidden flex justify-center relative">
      <div className="w-full max-w-[480px] h-full bg-ceramic-bg relative shadow-2xl overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
        <PosterIdentity />
        <PosterTryOn />
        <PosterData />
        <PosterInvitation />
      </div>

      {/* 
        Fixed: Positioned off-screen with explicit dimensions.
        left: -9999px ensures it's not visible but still rendered in the DOM tree,
        allowing html2canvas to capture it correctly.
      */}
      <div 
        ref={exportContainerRef}
        className="fixed top-0 left-[-9999px] flex flex-col items-start w-[375px]"
        aria-hidden="true"
      >
        <PosterIdentity isStatic={true} />
        <PosterTryOn isStatic={true} />
        <PosterData isStatic={true} />
        <PosterInvitation isStatic={true} />
      </div>
      
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 20px);
        }
      `}</style>
    </div>
  );
}