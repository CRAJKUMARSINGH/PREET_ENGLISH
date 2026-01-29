
import fetch from "node-fetch";
import { setTimeout } from "timers/promises";

const TOXIPROXY_API = "http://localhost:8474";

async function setupProxy() {
  console.log("🔌 Setting up Toxiproxy for PostgreSQL...");

  // 1. Create the proxy (Listen on 8475, Upstream to test-db:5432)
  // Docker network: toxiproxy container sees 'test-db' hostname
  const body = {
    name: "postgres_proxy",
    listen: "0.0.0.0:8475",
    upstream: "test-db:5432",
    enabled: true
  };

  try {
    // Delete existing if any
    await fetch(`${TOXIPROXY_API}/proxies/postgres_proxy`, { method: "DELETE" }).catch(() => { });

    const res = await fetch(`${TOXIPROXY_API}/proxies`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      throw new Error(`Failed to create proxy: ${res.statusText}`);
    }
    console.log("✅ Proxy created: app -> toxiproxy:8475 -> test-db:5432");
  } catch (err) {
    console.error("Setup failed:", err);
  }
}

async function injectLatency() {
  console.log("🧪 Injecting 5000ms Latency Toxic...");

  const toxic = {
    type: "latency",
    attributes: {
      latency: 5000, // 5 seconds
      jitter: 100
    }
  };

  const res = await fetch(`${TOXIPROXY_API}/proxies/postgres_proxy/toxics`, {
    method: "POST",
    body: JSON.stringify(toxic),
    headers: { "Content-Type": "application/json" }
  });

  if (res.ok) {
    console.log("⚠️  Latency Active! Circuit Breaker should trip soon.");
  } else {
    console.error("Failed to inject toxic");
  }
}

async function removeToxic() {
  console.log("🧹 Removing Toxic...");
  // Reset all toxics for this proxy
  await fetch(`${TOXIPROXY_API}/proxies/postgres_proxy/toxics/latency_downstream`, { method: "DELETE" });
  console.log("✅ Network normal.");
}

async function main() {
  const cmd = process.argv[2];
  if (cmd === "setup") await setupProxy();
  else if (cmd === "inject") await injectLatency();
  else if (cmd === "clean") await removeToxic();
  else console.log("Usage: uxt setup | inject | clean");
}

main();