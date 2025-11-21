import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import http from "http";
import https from "https";
import cron from "node-cron";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

// Keep-alive statistics
const keepAliveStats = {
  startTime: new Date(),
  lastPing: new Date(),
  totalPings: 0,
  recentPings: [] as Date[],
};

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  
  // Keep-alive endpoints
  app.get("/health", (req, res) => {
    res.json({
      status: "ok",
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    });
  });

  app.get("/keep-alive", (req, res) => {
    keepAliveStats.lastPing = new Date();
    keepAliveStats.totalPings++;
    keepAliveStats.recentPings.push(new Date());
    
    // Keep only last 100 pings
    if (keepAliveStats.recentPings.length > 100) {
      keepAliveStats.recentPings = keepAliveStats.recentPings.slice(-100);
    }
    
    res.json({
      status: "alive",
      message: "Server is awake",
      uptime: Math.floor(process.uptime()),
      stats: {
        startTime: keepAliveStats.startTime.toISOString(),
        lastPing: keepAliveStats.lastPing.toISOString(),
        totalPings: keepAliveStats.totalPings,
        recentPings: keepAliveStats.recentPings.length,
      },
    });
  });

  app.get("/api/stats", (req, res) => {
    res.json({
      startTime: keepAliveStats.startTime.toISOString(),
      lastPing: keepAliveStats.lastPing.toISOString(),
      totalPings: keepAliveStats.totalPings,
      recentPings: keepAliveStats.recentPings.map(d => d.toISOString()),
      uptime: Math.floor(process.uptime()),
    });
  });

  app.get("/monitor", (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TemporadaTop - Monitor Keep-Alive</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #FF7A00 0%, #FF2E63 50%, #D400FF 100%); min-height: 100vh; padding: 20px; }
    .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 16px; padding: 32px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
    h1 { color: #FF2E63; margin-bottom: 8px; font-size: 32px; }
    .subtitle { color: #666; margin-bottom: 32px; }
    .status { display: flex; align-items: center; gap: 12px; padding: 16px; background: #f0fdf4; border-radius: 8px; margin-bottom: 24px; }
    .status-dot { width: 12px; height: 12px; background: #22c55e; border-radius: 50%; animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
    .stat-card { padding: 20px; background: linear-gradient(135deg, #FF7A00 0%, #FF2E63 100%); border-radius: 12px; color: white; }
    .stat-label { font-size: 14px; opacity: 0.9; margin-bottom: 8px; }
    .stat-value { font-size: 28px; font-weight: bold; }
    .btn { background: linear-gradient(135deg, #FF7A00 0%, #FF2E63 100%); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600; margin-bottom: 24px; }
    .btn:hover { opacity: 0.9; }
    .history { background: #f9fafb; border-radius: 8px; padding: 16px; max-height: 300px; overflow-y: auto; }
    .history h3 { margin-bottom: 12px; color: #333; }
    .ping-item { padding: 8px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #666; }
    .ping-item:last-child { border-bottom: none; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🏡 TemporadaTop</h1>
    <p class="subtitle">Monitor de Keep-Alive - Render</p>
    
    <div class="status">
      <div class="status-dot"></div>
      <div>
        <strong>Status:</strong> <span id="status">Carregando...</span><br>
        <small id="lastPing">Último ping: --</small>
      </div>
    </div>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-label">⏱️ Uptime</div>
        <div class="stat-value" id="uptime">--</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">📊 Total Pings</div>
        <div class="stat-value" id="totalPings">--</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">📈 Pings Recentes</div>
        <div class="stat-value" id="recentPings">--</div>
      </div>
    </div>

    <button class="btn" onclick="manualPing()">📡 Ping Manual</button>

    <div class="history">
      <h3>📋 Histórico (últimos 10 pings)</h3>
      <div id="history"></div>
    </div>
  </div>

  <script>
    function formatUptime(seconds) {
      const days = Math.floor(seconds / 86400);
      const hours = Math.floor((seconds % 86400) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return days > 0 ? \`\${days}d \${hours}h \${minutes}m\` : \`\${hours}h \${minutes}m\`;
    }

    function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString('pt-BR');
    }

    function timeSince(dateString) {
      const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
      if (seconds < 60) return \`\${seconds}s atrás\`;
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return \`\${minutes}min atrás\`;
      const hours = Math.floor(minutes / 60);
      return \`\${hours}h atrás\`;
    }

    async function updateStats() {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        
        document.getElementById('status').textContent = 'Online ✅';
        document.getElementById('uptime').textContent = formatUptime(data.uptime);
        document.getElementById('totalPings').textContent = data.totalPings;
        document.getElementById('recentPings').textContent = data.recentPings.length;
        document.getElementById('lastPing').textContent = 'Último ping: ' + timeSince(data.lastPing);
        
        const history = data.recentPings.slice(-10).reverse();
        document.getElementById('history').innerHTML = history.map(ping => 
          \`<div class="ping-item">\${formatDate(ping)}</div>\`
        ).join('');
      } catch (error) {
        document.getElementById('status').textContent = 'Offline ❌';
      }
    }

    async function manualPing() {
      await fetch('/keep-alive');
      updateStats();
    }

    updateStats();
    setInterval(updateStats, 10000); // Atualiza a cada 10 segundos
  </script>
</body>
</html>
    `);
  });
  
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    
    // Setup self-ping cron job (every 14 minutes)
    const renderUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${port}`;
    console.log(`[CRON] Self-ping agendado para executar a cada 14 minutos`);
    console.log(`[CRON] URL alvo: ${renderUrl}/keep-alive`);
    
    cron.schedule('*/14 * * * *', () => {
      const now = new Date().toISOString();
      console.log(`[CRON] Self-ping iniciado em ${now}`);
      
      const isHttps = renderUrl.startsWith('https');
      const httpModule = isHttps ? https : http;
      
      httpModule.get(`${renderUrl}/keep-alive`, (res) => {
        console.log(`[CRON] Self-ping bem-sucedido! Status: ${res.statusCode}`);
      }).on('error', (err) => {
        console.error(`[CRON] Erro no self-ping:`, err.message);
      });
    });
  });
}

startServer().catch(console.error);
