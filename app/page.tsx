import React from 'react';

export default function Home() {
  return (
    <main style={styles.container}>
      {/* Arka Plan Katmanı */}
      <div style={styles.backgroundImage} />
      
      {/* Karartma Overlay - Yazının daha iyi okunması için hafif karanlık katman */}
      <div style={styles.overlay} />

      {/* İçerik Alanı */}
      <div style={styles.content}>
        <h1 style={styles.animatedText}>
          sen bizi bulamazsın, biz seni buluruz
        </h1>
      </div>

      {/* CSS Animasyonları ve Global Stil Tanımları */}
      <style jsx global>{`
        @keyframes gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            filter: drop-shadow(0 0 15px rgba(255, 0, 0, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.6));
          }
        }
      `}</style>
    </main>
  );
}

// Inline CSS Styles - Ekstra dosya uğraşı olmadan Vercel'de doğrudan çalışması için
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#000', // Resim yüklenene kadar siyah arka plan
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url("https://cdn.discordapp.com/attachments/1512567298526019806/1526651197891678350/latest.png?ex=6a57cc39&is=6a567ab9&hm=683f8cdb39c5789ddcfcd9449c6b178b8aa7a98512d4af9303dc41f6e8680320&")',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Resmin üzerine %60 siyah katman atar
    zIndex: 2,
  },
  content: {
    position: 'relative',
    zIndex: 3,
    textAlign: 'center',
    padding: '0 20px',
  },
  animatedText: {
    fontSize: '3.5rem',
    fontWeight: 900,
    letterSpacing: '-0.05em',
    textTransform: 'lowercase', // İstediğin havaya uygun minimalist küçük harf tasarımı
    margin: 0,
    
    // Kırmızı, Siyah, Beyaz Geçişli Gradient
    backgroundImage: 'linear-gradient(270deg, #ff0000, #ffffff, #000000, #ff0000, #ffffff)',
    backgroundSize: '400% 400%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    
    // Animasyonların Tanımlanması
    animation: 'gradient-flow 8s ease infinite, pulse-glow 4s ease-in-out infinite',
  },
};
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

        {/* Kırmızı Parlayan Çizgi */}
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
