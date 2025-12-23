
import { GoogleGenAI, Type } from "@google/genai";
import { DetectionResult, Department } from "../types";

// 驗證 API 金鑰是否存在
const getApiKey = (): string => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY 環境變數未設定。請確認已正確配置 API 金鑰。");
  }
  return apiKey;
};

// 驗證 base64 圖片格式
const validateBase64Image = (base64Image: string): void => {
  if (!base64Image || typeof base64Image !== 'string') {
    throw new Error("無效的圖片資料");
  }
  
  // 檢查 base64 格式（簡單驗證）
  const base64Regex = /^[A-Za-z0-9+/=]+$/;
  if (!base64Regex.test(base64Image)) {
    throw new Error("圖片格式不正確");
  }
  
  // 檢查圖片大小（約 20MB 限制）
  const sizeInBytes = (base64Image.length * 3) / 4;
  const maxSize = 20 * 1024 * 1024; // 20MB
  if (sizeInBytes > maxSize) {
    throw new Error("圖片檔案過大，請使用小於 20MB 的圖片");
  }
};

export const detectPeople = async (base64Image: string): Promise<DetectionResult> => {
  try {
    // 驗證輸入
    validateBase64Image(base64Image);
    const apiKey = getApiKey();
    
    const ai = new GoogleGenAI({ apiKey });
    
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
    if (!text) {
      throw new Error("AI 服務未回傳結果，請稍後再試");
    }
    
    let rawResult;
    try {
      rawResult = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON 解析錯誤:", parseError);
      throw new Error("AI 回傳的資料格式錯誤，請重新嘗試");
    }
    
    // 驗證回應資料結構
    if (!rawResult.people || !Array.isArray(rawResult.people)) {
      throw new Error("AI 回傳的資料格式不正確");
    }
    
    // 驗證並清理資料
    const validPeople = rawResult.people
      .filter((p: any) => {
        return p.box_2d && 
               Array.isArray(p.box_2d) && 
               p.box_2d.length === 4 &&
               p.department &&
               ['未來部', '男子部', '女子部', '壯年部', '婦人部'].includes(p.department);
      })
      .map((p: any, index: number) => ({
        ...p,
        id: `face-${Date.now()}-${index}`,
        label: 'face' as const
      }));
    
    return {
      totalCount: validPeople.length,
      people: validPeople
    };
  } catch (error: any) {
    // 處理特定錯誤類型
    if (error.message?.includes('API key')) {
      throw new Error("API 金鑰設定錯誤，請檢查環境變數配置");
    }
    if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
      throw new Error("API 使用配額已達上限，請稍後再試");
    }
    if (error.message?.includes('network') || error.message?.includes('fetch')) {
      throw new Error("網路連線錯誤，請檢查網路連線後重試");
    }
    // 重新拋出已處理的錯誤
    if (error.message) {
      throw error;
    }
    // 未知錯誤
    throw new Error("辨識過程中發生錯誤，請稍後再試");
  }
};
