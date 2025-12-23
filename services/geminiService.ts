
import { GoogleGenAI, Type } from "@google/genai";
import { DetectionResult, Department } from "../types";

export const detectPeople = async (base64Image: string): Promise<DetectionResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `請辨識圖像中所有的人臉，並根據以下規則判斷每個人所屬的「部別」：
1. 未來部：看起來約 12 歲以下的男孩或女孩。
2. 男子部：看起來約 12~40 歲的男性。
3. 女子部：看起來約 12~40 歲的女性。
4. 壯年部：看起來約 40 歲以上的男性。
5. 婦人部：看起來約 40 歲以上的女性。

輸出要求：
- 為每個人臉提供非常精確且緊湊的 [ymin, xmin, ymax, xmax] 臉部坐標（範圍 0-1000），僅包含頭部。
- 判斷其所屬部別（必須是：未來部, 男子部, 女子部, 壯年部, 婦人部）。
- 回傳總人數。`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image
          }
        },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          totalCount: { type: Type.INTEGER },
          people: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                box_2d: {
                  type: Type.ARRAY,
                  items: { type: Type.NUMBER }
                },
                department: {
                  type: Type.STRING,
                  enum: ['未來部', '男子部', '女子部', '壯年部', '婦人部']
                }
              },
              required: ["box_2d", "department"]
            }
          }
        },
        required: ["totalCount", "people"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("AI 未回傳結果");
  
  const rawResult = JSON.parse(text);
  
  return {
    totalCount: rawResult.totalCount,
    people: rawResult.people.map((p: any, index: number) => ({
      ...p,
      id: `face-${Date.now()}-${index}`,
      label: 'face'
    }))
  };
};
