import { useState, useRef } from "react";
import { toPng } from "html-to-image";

export default function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const ref = useRef();

  const handle = async () => {
    const res = await fetch(`/api/generate?url=${url}`);
    const json = await res.json();
    setData(json);
  };

  const download = async () => {
    const dataUrl = await toPng(ref.current);
    const link = document.createElement("a");
    link.download = "poster.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div style={{
      background: "#000",
      minHeight: "100vh",
      color: "#fff",
      padding: 30,
      textAlign: "center"
    }}>
      <h1>海报生成器</h1>

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="输入网址"
        style={{
          width: 300,
          height: 40,
          borderRadius: 8,
          padding: 10
        }}
      />

      <br /><br />

      <button onClick={handle}>生成</button>

      {data && (
        <>
          {/* 海报 */}
          <div
            ref={ref}
            style={{
              width: 360,
              margin: "40px auto",
              padding: 20,
              background: "linear-gradient(180deg,#111,#000)",
              borderRadius: 20
            }}
          >
            <img
              src={data.screenshot}
              style={{
                width: "100%",
                borderRadius: 20,
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
              }}
            />

            <div style={{ marginTop: 20, fontSize: 14, color: "#aaa" }}>
              {url}
            </div>
          </div>

          <button onClick={download}>下载海报</button>

          {/* 文案 */}
          <pre style={{
            marginTop: 30,
            whiteSpace: "pre-wrap",
            textAlign: "left",
            maxWidth: 500,
            marginInline: "auto"
          }}>
            {data.content}
          </pre>

          <button
            onClick={() => navigator.clipboard.writeText(data.content)}
          >
            复制文案
          </button>
        </>
      )}
    </div>
  );
}
