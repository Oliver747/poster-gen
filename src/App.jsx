npm install html-to-image
import { useState } from "react";
import { toPng } from "html-to-image";
import { useRef } from "react";

const ref = useRef();

const download = async () => {
  const dataUrl = await toPng(ref.current);
  const link = document.createElement("a");
  link.download = "poster.png";
  link.href = dataUrl;
  link.click();
};
export default function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);

  const handle = async () => {
    const res = await fetch(`/api/generate?url=${url}`);
    const json = await res.json();
    setData(json);
  };

  return (
   <div ref={ref} style={{
  width: 300,
  background: "#000",
  padding: 20,
  borderRadius: 20
}}>
  <img src={data.screenshot} style={{
    width: "100%",
    borderRadius: 20
  }} />
</div>
  );
}
