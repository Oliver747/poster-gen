import OpenAI from "openai";

function drawRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export default async function handler(req, res) {
  const { url } = req.query;

  const screenshot = `https://api.site-shot.com/?url=${encodeURIComponent(
    url
  )}&width=1024&height=768`;

  const client = new OpenAI({
    apiKey: process.env.QWEN_API_KEY,
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
  });

  const completion = await client.chat.completions.create({
    model: "qwen-plus",
    messages: [{
      role: "user",
      content: `写3个标题+文案+标签，网站：${url}`
    }]
  });

  res.json({
    screenshot,
    content: completion.choices[0].message.content
  });
}

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 1080, 1440);

    const img = await loadImage(screenshot);

    const imgWidth = 960;
    const imgHeight = 720;
    const x = (1080 - imgWidth) / 2;
    const y = 300;

    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.4)";
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 20;

    drawRoundRect(ctx, x, y, imgWidth, imgHeight, 30);
    ctx.fill();
    ctx.restore();

    ctx.save();
    drawRoundRect(ctx, x, y, imgWidth, imgHeight, 30);
    ctx.clip();
    ctx.drawImage(img, x, y, imgWidth, imgHeight);
    ctx.restore();

    const poster = canvas.toDataURL();

    res.json({ poster, content });

  } catch (err) {
    res.status(500).send("error");
  }
}
