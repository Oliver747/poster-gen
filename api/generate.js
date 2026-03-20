import OpenAI from "openai";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) return res.status(400).send("Missing URL");

  try {
    // 截图（1024×768）
    const screenshot = `https://api.site-shot.com/?url=${encodeURIComponent(
      url
    )}&width=1024&height=768`;

    // 千问
    const client = new OpenAI({
      apiKey: process.env.QWEN_API_KEY,
      baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
    });

    const completion = await client.chat.completions.create({
      model: "qwen-plus",
      messages: [
        {
          role: "user",
          content: `
你是小红书博主，请写内容：

网站：${url}

要求：
1. 3个爆款标题（短）
2. 一段100字推荐文案
3. 5个标签
`
        }
      ],
      temperature: 0.8
    });

    res.json({
      screenshot,
      content: completion.choices[0].message.content
    });

  } catch (err) {
    res.status(500).send("error");
  }
}
