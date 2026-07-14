'use client';

import { motion } from 'framer-motion';

export default function Home() {
  const text = "sen bizi bulamazsın, biz seni buluruz";
  
  // Harf harf animasyon için kelimeleri ayırıyoruz
  const letters = Array.from(text);

  // Container animasyon ayarları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.3 * i },
    }),
  };

  // Her bir harfin animasyon ayarı
  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Arka plan resmin
  const bgImage = "https://cdn.discordapp.com/attachments/1512567298526019806/1526651197891678350/latest.png?ex=6a57cc39&is=6a567ab9&hm=683f8cdb39c5789ddcfcd9449c6b178b8aa7a98512d4af9303dc41f6e8680320&";

  return (
    <main 
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-4"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%), url('${bgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Animasyon için standart tarayıcı uyumlu style etiketi (Vercel'i patlatmaz) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes textShine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-shine {
          animation: textShine 6s ease-in-out infinite;
        }
      `}} />

      {/* Ekstra Karanlık ve Atmosferik Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90 pointer-events-none" />

      {/* Yazı Alanı */}
      <motion.div
        className="relative z-10 text-center max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-widest select-none leading-relaxed uppercase">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={childVariants}
              className="inline-block cursor-default transition-all duration-300 hover:scale-125 animate-shine"
              style={{
                // Kırmızı, siyah ve beyaz geçişli mükemmel bir text-gradient animasyonu
                background: 'linear-gradient(45deg, #ff0000, #ffffff, #0a0a0a, #ff0000, #ffffff)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 15px rgba(255, 0, 0, 0.4)',
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </h1>

        {/* Alt Kısma İnce Kırmızı Çizgi Efekti */}
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '60%', opacity: 1 }}
          transition={{ delay: 2.2, duration: 1.5, ease: "easeInOut" }}
          className="h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mt-8 shadow-[0_0_10px_rgba(255,0,0,0.8)]"
        />
      </motion.div>
    </main>
  );
}
