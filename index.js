import { useState } from "react";

export default function Home() {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [game, setGame] = useState("sweetbonanza");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, username, password, siteUrl, game }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ error: "Analiz sırasında hata oluştu." });
    }
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Slot Analiz Programı</h1>
      <input placeholder="Üyelik ID" value={userId} onChange={(e) => setUserId(e.target.value)} style={{ width: "100%", marginBottom: 8, padding: 8 }} />
      <input placeholder="Kullanıcı Adı" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "100%", marginBottom: 8, padding: 8 }} />
      <input placeholder="Şifre" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", marginBottom: 8, padding: 8 }} />
      <input placeholder="Site URL'si yapıştırın" value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} style={{ width: "100%", marginBottom: 8, padding: 8 }} />
      <select value={game} onChange={(e) => setGame(e.target.value)} style={{ width: "100%", marginBottom: 8, padding: 8 }}>
        <option value="sweetbonanza">Sweet Bonanza</option>
        <option value="gatesolympus">Gates of Olympus</option>
        <option value="sweetbonanza_1000x">Sweet Bonanza 1000x</option>
        <option value="gatesolympus_1000x">Gates of Olympus 1000x</option>
      </select>
      <button onClick={handleAnalyze} disabled={loading} style={{ width: "100%", padding: 12, backgroundColor: "#0066cc", color: "white", fontWeight: "bold", border: "none", cursor: "pointer" }}>
        {loading ? "Analiz Ediliyor..." : "Analiz Başlat"}
      </button>
      {result && (
        <pre style={{ marginTop: 20, background: "#f4f4f4", padding: 10, whiteSpace: "pre-wrap" }}>
          {result.error ? result.error : JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}