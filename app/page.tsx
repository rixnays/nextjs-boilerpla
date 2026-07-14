<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THE TRUTH</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');

        body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: black;
        }

        #bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('https://cdn.discordapp.com/attachments/1512567298526019806/1526651197891678350/latest.png?ex=6a57cc39&is=6a567ab9&hm=683f8cdb39c5789ddcfcd9449c6b178b8aa7a98512d4af9303dc41f6e8680320&');
            background-size: cover;
            background-position: center;
            filter: brightness(0.4);
            z-index: -1;
        }

        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
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
