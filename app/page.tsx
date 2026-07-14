"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [show, setShow] = useState(false);

  // Sayfa yüklendiğinde animasyonu başlat
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <main className="main-container">
      <div className="bg-image" />
      
      <div className="content">
        <h1 className={`glitch-text ${show ? 'animate' : ''}`}>
          sen bizi bulamazsın, biz seni buluruz
        </h1>
      </div>
    </main>
  );
}
        <h1 
          className={`font-sans font-black text-4xl md:text-7xl text-white uppercase text-center tracking-wider transition-all duration-300 ${
            isGlitching ? "glitch-effect" : ""
          }`}
          style={{
            fontFamily: "'Orbitron', sans-serif"
          }}
        >
          {displayText || "..."}
        </h1>
      </div>
    </main>
  );
}
        }

        #text {
            font-family: 'Orbitron', sans-serif;
            font-size: 4rem;
            color: white;
            text-transform: uppercase;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }

        /* Glitch Efekti */
        .glitch {
            animation: glitch 1s infinite alternate;
        }

        @keyframes glitch {
            0% { text-shadow: 2px 0 #ff0000, -2px 0 #ffffff; transform: skewX(0deg); }
            20% { text-shadow: -2px 0 #ff0000, 2px 0 #ffffff; transform: skewX(2deg); }
            40% { text-shadow: 2px 0 #ff0000, -2px 0 #ffffff; transform: skewX(0deg); }
            60% { text-shadow: 0px 0 0 #ff0000; transform: scale(1.05); }
            100% { text-shadow: -1px 0 #ff0000, 1px 0 #ffffff; }
        }

        @media (max-width: 768px) {
            #text { font-size: 2rem; }
        }
    </style>
</head>
<body>

    <div id="bg"></div>

    <div class="container">
        <h1 id="text">...</h1>
    </div>

    <script>
        const textElement = document.getElementById('text');
        const phrase = "sen bizi bulamazsın, biz seni buluruz";
        let index = 0;

        function typeEffect() {
            if (index < phrase.length) {
                textElement.innerHTML = phrase.substring(0, index + 1);
                index++;
                setTimeout(typeEffect, 100);
            } else {
                // Yazı bittiğinde glitch animasyonunu ekle
                textElement.classList.add('glitch');
            }
        }

        // Tıklayınca başlat
        document.body.addEventListener('click', () => {
            if(index === 0) typeEffect();
        }, { once: true });

        // Veya sayfaya girince otomatik başlasın istersen:
        window.onload = typeEffect;
    </script>
</body>
</html>
