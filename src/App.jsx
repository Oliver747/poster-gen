import { useState } from "react";

export default function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);

  const handle = async () => {
    const res = await fetch(`/api/generate?url=${url}`);
    const json = await res.json();
    setData(json);
  };

  return (
    <div style={{ padding: 40, color: "#fff", background: "#000", minHeight: "100vh" }}>
      <h1>海报生成器</h1>

      <input value={url} onChange={e => setUrl(e.target.value)} />
      <button onClick={handle}>生成</button>

      {data && (
        <>
          <img src={data.poster} style={{ width: 300 }} />
          <pre>{data.content}</pre>
          <button onClick={() => navigator.clipboard.writeText(data.content)}>
            复制文案
          </button>
        </>
      )}
    </div>
  );
}