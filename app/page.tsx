import { useEffect, useState } from "react";

const RIONAYS_ID = "1065766617738387609";
const FRIEND_ID = "1493277415810793623";

export default function App() {
  const [rionays, setRionays] = useState(null);
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDiscordUser = async (userId, setter) => {
    try {
      const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
      const data = await response.json();
      if (data.success && data.data) {
        const dData = data.data;
        const user = dData.discord_user;

        // Avatar URL belirleme
        const avatarUrl = user.avatar
          ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
          : `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discriminator || 0) % 5}.png`;

        // Durum mesajı belirleme
        let customStatus = "Chillin'";
        if (dData.activities && dData.activities.length > 0) {
          const customAct = dData.activities.find((act) => act.type === 4);
          if (customAct && customAct.state) {
            customStatus = customAct.state;
          } else {
            const activeGame = dData.activities.find((act) => act.type === 0);
            if (activeGame) customStatus = `Playing ${activeGame.name}`;
          }
        } else if (dData.discord_status === "offline") {
          customStatus = "Offline";
        }

        setter({
          username: user.global_name || user.username,
          avatar: avatarUrl,
          status: dData.discord_status,
          customStatus: customStatus,
        });
      }
    } catch (error) {
      console.error("Discord verisi çekilemedi:", error);
    }
  };

  useEffect(() => {
    const updateAll = async () => {
      await Promise.all([
        fetchDiscordUser(RIONAYS_ID, setRionays),
        fetchDiscordUser(FRIEND_ID, setFriend),
      ]);
      setLoading(false);
    };

    updateAll();
    const interval = setInterval(updateAll, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "online": return "bg-[#23a55a] shadow-[0_0_8px_#23a55a]";
      case "idle": return "bg-[#f0b232] shadow-[0_0_8px_#f0b232]";
      case "dnd": return "bg-[#f23f43] shadow-[0_0_8px_#f23f43]";
      default: return "bg-[#80848e]";
    }
  };

  return (
    <div className="bg-overlay min-h-screen flex items-center justify-center p-4 md:p-8 selection:bg-rose-500 selection:text-white relative overflow-hidden">
      {/* Arka Plan Görseli (CSS inline tanımlandı) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed opacity-40"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(5, 5, 8, 0.4) 0%, rgba(15, 5, 10, 0.85) 100%), url('https://cdn.discordapp.com/attachments/1501354952285487224/1526658550297006130/tanjiro-kamado-3840x2160-23027.jpg?ex=6a57d312&is=6a568192&hm=fb4150879de15f7ee08cf3123fbf634dda26c09b4cdc2d7f0de206650d69ab80&')"
        }}
      />

      <div className="w-full max-w-4xl flex flex-col items-center justify-center space-y-12 z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl px-4">
          <h1 className="font-syne text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-white leading-none">
            HER CUTTING BOARD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-500 glow-text font-orbitron">
              X HER BLEEDING SOUL
            </span>
          </h1>
          <p className="font-sans text-xs md:text-sm text-gray-400/80 uppercase tracking-[0.3em] font-semibold">
            Two souls, bound together in the shadows of the board.
          </p>
        </div>

        {/* Profiles Container */}
        <div className="w-full max-w-md flex flex-col space-y-6 px-4">
          
          {/* Profile 1: Rionays */}
          <div className="glass-card neon-border-rionays rounded-2xl p-6 flex items-center justify-between cursor-pointer transform hover:-translate-y-1 duration-300">
            <div className="flex items-center space-x-5">
              <div className="relative">
                <img 
                  src={rionays?.avatar || "https://via.placeholder.com/150"} 
                  alt="Ri0nays" 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover border border-white/10"
                />
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-[#0d0a0d] ${getStatusClass(rionays?.status)}`} />
              </div>
              <div className="space-y-1">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 rounded-full border border-rose-500/30">Founder</span>
                <h2 className="text-white font-orbitron text-xl font-black tracking-wide">
                  {loading ? "Loading..." : rionays?.username || "Ri0nays"}
                </h2>
                <p className="text-gray-400 text-xs md:text-sm font-medium italic truncate max-w-[180px]">
                  {loading ? "Loading status..." : rionays?.customStatus}
                </p>
              </div>
            </div>
            <div className="text-rose-500 opacity-70 hover:opacity-100 transition-opacity pr-2">
              <DiscordIcon />
            </div>
          </div>

          {/* Profile 2: Friend */}
          <div className="glass-card neon-border-friend rounded-2xl p-6 flex items-center justify-between cursor-pointer transform hover:-translate-y-1 duration-300">
            <div className="flex items-center space-x-5">
              <div className="relative">
                <img 
                  src={friend?.avatar || "https://via.placeholder.com/150"} 
                  alt="Partner" 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover border border-white/10"
                />
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-[#0d0a0d] ${getStatusClass(friend?.status)}`} />
              </div>
              <div className="space-y-1">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">Partner</span>
                <h2 className="text-white font-orbitron text-xl font-black tracking-wide">
                  {loading ? "Loading..." : friend?.username || "Kanka"}
                </h2>
                <p className="text-gray-400 text-xs md:text-sm font-medium italic truncate max-w-[180px]">
                  {loading ? "Loading status..." : friend?.customStatus}
                </p>
              </div>
            </div>
            <div className="text-cyan-500 opacity-70 hover:opacity-100 transition-opacity pr-2">
              <DiscordIcon />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="text-gray-500/60 font-medium text-xs tracking-wider font-orbitron">
          EST. 2026 • RIONAYS DEVELOPMENT
        </div>

      </div>
    </div>
  );
}

// Kolaylık olsun diye Discord SVG'sini buraya ayırdım
function DiscordIcon() {
  return (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 127.14 96.36">
      <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.9-.65,1.76-1.34,2.58-2a75.58,75.58,0,0,0,72.9,0c.82.71,1.68,1.4,2.58,2a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.87,50.7,123.82,27.91,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
    </svg>
  );
}
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
        }

        /* Glassmorphism card styling */
        .glass-card {
            background: rgba(15, 10, 15, 0.45);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        /* Neon Glow Transitions */
        .neon-border-rionays {
            position: relative;
        }
        .neon-border-rionays::before {
            content: '';
            position: absolute;
            inset: -1.5px;
            border-radius: 1rem;
            background: linear-gradient(90deg, #ff0055, #9900ff, #ff0055);
            background-size: 200% 200%;
            animation: moveGradient 4s linear infinite;
            z-index: -1;
            opacity: 0.65;
            transition: opacity 0.3s ease;
        }
        .neon-border-rionays:hover::before {
            opacity: 1;
            filter: drop-shadow(0 0 12px rgba(255, 0, 85, 0.6)) drop-shadow(0 0 20px rgba(153, 0, 255, 0.4));
        }

        .neon-border-friend {
            position: relative;
        }
        .neon-border-friend::before {
            content: '';
            position: absolute;
            inset: -1.5px;
            border-radius: 1rem;
            background: linear-gradient(90deg, #00ffcc, #0066ff, #00ffcc);
            background-size: 200% 200%;
            animation: moveGradient 4s linear infinite;
            z-index: -1;
            opacity: 0.5;
            transition: opacity 0.3s ease;
        }
        .neon-border-friend:hover::before {
            opacity: 0.9;
            filter: drop-shadow(0 0 12px rgba(0, 255, 204, 0.5)) drop-shadow(0 0 20px rgba(0, 102, 255, 0.3));
        }

        @keyframes moveGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* Text glow effect */
        .glow-text {
            text-shadow: 0 0 10px rgba(255, 0, 85, 0.4), 0 0 20px rgba(255, 0, 85, 0.2);
        }

        /* Status circle glowing */
        .status-online { background-color: #23a55a; box-shadow: 0 0 8px #23a55a; }
        .status-idle { background-color: #f0b232; box-shadow: 0 0 8px #f0b232; }
        .status-dnd { background-color: #f23f43; box-shadow: 0 0 8px #f23f43; }
        .status-offline { background-color: #80848e; }
    </style>
</head>
<body class="bg-overlay min-h-screen flex items-center justify-center p-4 md:p-8 selection:bg-rose-500 selection:text-white">

    <div class="w-full max-w-4xl flex flex-col items-center justify-center space-y-12">
        
        <!-- Header - Badass Slogan -->
        <div class="text-center space-y-4 max-w-2xl px-4 animate-fade-in">
            <h1 class="font-syne text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-white leading-none">
                HER CUTTING BOARD <br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-500 glow-text font-orbitron">
                    X HER BLEEDING SOUL
                </span>
            </h1>
            <p class="font-sans text-xs md:text-sm text-gray-400/80 uppercase tracking-[0.3em] font-semibold">
                Two souls, bound together in the shadows of the board.
            </p>
        </div>

        <!-- Profiles Container (Stacked alt alta kanka) -->
        <div class="w-full max-w-md flex flex-col space-y-6 px-4">
            
            <!-- Profile 1: Rionays -->
            <div id="user-rionays" class="glass-card neon-border-rionays rounded-2xl p-6 flex items-center justify-between cursor-pointer transform hover:-translate-y-1">
                <div class="flex items-center space-x-5">
                    <!-- Avatar Holder with Status -->
                    <div class="relative">
                        <img id="avatar-rionays" src="https://via.placeholder.com/150" alt="Ri0nays" class="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover border border-white/10">
                        <div id="status-rionays" class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-[#0d0a0d] status-offline"></div>
                    </div>
                    <!-- Details -->
                    <div class="space-y-1">
                        <span class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 rounded-full border border-rose-500/30">Founder</span>
                        <h2 id="username-rionays" class="text-white font-orbitron text-xl font-black tracking-wide">Ri0nays</h2>
                        <p id="custom-status-rionays" class="text-gray-400 text-xs md:text-sm font-medium italic truncate max-w-[180px]">Loading status...</p>
                    </div>
                </div>
                <!-- Action Icon / Discord Indicator -->
                <div class="text-rose-500 opacity-70 hover:opacity-100 transition-opacity pr-2">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 127.14 96.36">
                        <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.9-.65,1.76-1.34,2.58-2a75.58,75.58,0,0,0,72.9,0c.82.71,1.68,1.4,2.58,2a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.87,50.7,123.82,27.91,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
                    </svg>
                </div>
            </div>

            <!-- Profile 2: Friend -->
            <div id="user-friend" class="glass-card neon-border-friend rounded-2xl p-6 flex items-center justify-between cursor-pointer transform hover:-translate-y-1">
                <div class="flex items-center space-x-5">
                    <!-- Avatar Holder with Status -->
                    <div class="relative">
                        <img id="avatar-friend" src="https://via.placeholder.com/150" alt="Kanka" class="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover border border-white/10">
                        <div id="status-friend" class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-[#0d0a0d] status-offline"></div>
                    </div>
                    <!-- Details -->
                    <div class="space-y-1">
                        <span class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">Partner</span>
                        <h2 id="username-friend" class="text-white font-orbitron text-xl font-black tracking-wide">Kanka</h2>
                        <p id="custom-status-friend" class="text-gray-400 text-xs md:text-sm font-medium italic truncate max-w-[180px]">Loading status...</p>
                    </div>
                </div>
                <!-- Action Icon / Discord Indicator -->
                <div class="text-cyan-500 opacity-70 hover:opacity-100 transition-opacity pr-2">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 127.14 96.36">
                        <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.9-.65,1.76-1.34,2.58-2a75.58,75.58,0,0,0,72.9,0c.82.71,1.68,1.4,2.58,2a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.87,50.7,123.82,27.91,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
                    </svg>
                </div>
            </div>

        </div>

        <!-- Footer Note -->
        <div class="text-gray-500/60 font-medium text-xs tracking-wider font-orbitron">
            EST. 2026 • RIONAYS DEVELOPMENT
        </div>

    </div>

    <!-- Script to Fetch Real-time Discord Data -->
    <script>
        const rionaysID = "1065766617738387609";
        const friendID = "1493277415810793623";

        async function fetchDiscordUser(userId, prefix) {
            try {
                const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
                const data = await response.json();

                if (data.success && data.data) {
                    const dData = data.data;
                    const user = dData.discord_user;

                    // Update Avatar
                    const avatarUrl = user.avatar 
                        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256` 
                        : `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discriminator) % 5}.png`;
                    document.getElementById(`avatar-${prefix}`).src = avatarUrl;

                    // Update Username (Display global name if available, fallback to username)
                    const dispName = user.global_name || user.username;
                    document.getElementById(`username-${prefix}`).innerText = dispName;

                    // Update Status Indicator
                    const statusDot = document.getElementById(`status-${prefix}`);
                    statusDot.className = "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-[#0d0a0d]";
                    if (dData.discord_status === "online") statusDot.classList.add("status-online");
                    else if (dData.discord_status === "idle") statusDot.classList.add("status-idle");
                    else if (dData.discord_status === "dnd") statusDot.classList.add("status-dnd");
                    else statusDot.classList.add("status-offline");

                    // Update Custom Status / Custom activity
                    let customStatusText = "Chillin'";
                    if (dData.activities && dData.activities.length > 0) {
                        // Find custom status activity type
                        const customAct = dData.activities.find(act => act.type === 4);
                        if (customAct && customAct.state) {
                            customStatusText = customAct.state;
                        } else {
                            // Or find whatever they are playing/doing
                            const activeGame = dData.activities.find(act => act.type === 0);
                            if (activeGame) customStatusText = `Playing ${activeGame.name}`;
                        }
                    } else if (dData.discord_status === "offline") {
                        customStatusText = "Offline";
                    }
                    document.getElementById(`custom-status-${prefix}`).innerText = customStatusText;
                }
            } catch (error) {
                console.error(`Error fetching Discord data for ${prefix}:`, error);
                document.getElementById(`custom-status-${prefix}`).innerText = "Couldn't load status";
            }
        }

        // Initialize Fetching
        fetchDiscordUser(rionaysID, "rionays");
        fetchDiscordUser(friendID, "friend");

        // Keep it updated every 30 seconds
        setInterval(() => {
            fetchDiscordUser(rionaysID, "rionays");
            fetchDiscordUser(friendID, "friend");
        }, 30000);
    </script>
</body>
</html>
