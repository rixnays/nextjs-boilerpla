'use client'; // Next.js App Router uyumluluğu için client bileşeni yapıyoruz

import React from 'react';

export default function Home() {
  // Turbopack ile %100 uyumlu çalışan CSS animasyonları ve stiller
  const cssStyles = `
    @keyframes gradient-flow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes pulse-glow {
      0%, 100% { filter: drop-shadow(0 0 15px rgba(255, 0, 0, 0.5)); }
      50% { filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.7)); }
    }

    .animated-gradient-text {
      font-size: 3.5rem;
      font-weight: 900;
      letter-spacing: -0.05em;
      text-transform: lowercase;
      margin: 0;
      background: linear-gradient(270deg, #ff0000, #ffffff, #000000, #ff0000, #ffffff);
      background-size: 400% 400%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradient-flow 8s ease infinite, pulse-glow 4s ease-in-out infinite;
      text-align: center;
    }

    @media (max-width: 768px) {
      .animated-gradient-text {
        font-size: 2.2rem;
      }
    }
  `;

  return (
    <main style={styles.container}>
      {/* CSS Animasyonlarını güvenli şekilde sayfaya gömüyoruz */}
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />

      {/* Arka Plan Katmanı */}
      <div style={styles.backgroundImage} />
      
      {/* Karartma Overlay */}
      <div style={styles.overlay} />

      {/* İçerik Alanı */}
      <div style={styles.content}>
        <h1 className="animated-gradient-text">
          sen bizi bulamazsın, biz seni buluruz
        </h1>
      </div>
    </main>
  );
}

// Inline CSS Styles - Sayfa dışına güvenli şekilde alındı
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
    backgroundColor: '#000',
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Resmin üzerine %60 karartma atar
    zIndex: 2,
  },
  content: {
    position: 'relative',
    zIndex: 3,
    textAlign: 'center',
    padding: '0 20px',
  },
};
