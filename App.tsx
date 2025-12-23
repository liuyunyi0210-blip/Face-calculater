
import React, { useState, useRef, useMemo } from 'react';
import Header from './components/Header';
import DetectionOverlay from './components/DetectionOverlay';
import { detectPeople } from './services/geminiService';
import { ImageState, DetectionResult, FaceDetection, Department } from './types';

const DEPARTMENTS: Department[] = ['未來部', '男子部', '女子部', '壯年部', '婦人部'];

const deptColors: Record<Department | string, string> = {
  '未來部': '#10b981', // Emerald
  '男子部': '#3b82f6', // Blue
  '女子部': '#ec4899', // Pink
  '壯年部': '#6366f1', // Indigo
  '婦人部': '#f59e0b', // Amber
  '不確定': '#94a3b8'  // Slate
};

type SortKey = 'id' | 'dept';
type SortOrder = 'asc' | 'desc';

const App: React.FC = () => {
  const [imageState, setImageState] = useState<ImageState>({
    file: null,
    previewUrl: null,
    base64: null,
  });
  const [people, setPeople] = useState<FaceDetection[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showBoxes, setShowBoxes] = useState(true);
  
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stats = useMemo(() => {
    const counts = {
      '未來部': 0,
      '男子部': 0,
      '女子部': 0,
      '壯年部': 0,
      '婦人部': 0,
      '不確定': 0
    };
    people.forEach(p => {
      counts[p.department] = (counts[p.department] || 0) + 1;
    });
    return counts;
  }, [people]);

  const sortedPeople = useMemo(() => {
    const list = [...people].map((p, originalIndex) => ({ ...p, originalIndex }));
    return list.sort((a, b) => {
      let comparison = 0;
      if (sortKey === 'id') {
        comparison = a.originalIndex - b.originalIndex;
      } else if (sortKey === 'dept') {
        comparison = a.department.localeCompare(b.department, 'zh-Hant');
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [people, sortKey, sortOrder]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      setImageState({
        file,
        previewUrl: URL.createObjectURL(file),
        base64: base64String,
      });
      setPeople([]);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const startAnalysis = async () => {
    if (!imageState.base64) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await detectPeople(imageState.base64);
      setPeople(result.people);
      if (result.people.length === 0) {
        setError("未偵測到任何人臉，請確認照片中有清楚的人臉影像。");
      }
    } catch (err: any) {
      // 使用服務層提供的詳細錯誤訊息
      const errorMessage = err?.message || "影像分析失敗，請檢查網路連線或嘗試更換照片。";
      setError(errorMessage);
      console.error("辨識錯誤:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const updateDepartment = (id: string, newDept: Department) => {
    setPeople(prev => prev.map(p => p.id === id ? { ...p, department: newDept } : p));
  };

  const reset = () => {
    setImageState({ file: null, previewUrl: null, base64: null });
    setPeople([]);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 左側控制面板 */}
        <div className="lg:col-span-3 space-y-6">
          <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <h2 className="text-md font-bold text-slate-900 mb-4 flex items-center gap-2 border-b pb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              照片上傳
            </h2>
            
            <div className="space-y-4">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${imageState.previewUrl ? 'border-indigo-200 bg-indigo-50/20' : 'border-slate-300 hover:border-indigo-400'}`}
              >
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                {imageState.previewUrl ? (
                  <div className="text-xs text-indigo-600 font-medium truncate">{imageState.file?.name}</div>
                ) : (
                  <div className="text-xs text-slate-500">點擊上傳團體照片</div>
                )}
              </div>

              <button
                disabled={!imageState.base64 || isAnalyzing}
                onClick={startAnalysis}
                className="w-full py-3 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 flex items-center justify-center gap-2 shadow-md shadow-indigo-100 transition-all"
              >
                {isAnalyzing ? "正在 AI 辨識中..." : "開始辨識與統計"}
              </button>
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 flex-shrink-0 mt-0.5">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-red-900 mb-1">錯誤</p>
                      <p className="text-xs text-red-700">{error}</p>
                    </div>
                    <button
                      onClick={() => setError(null)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                      aria-label="關閉錯誤訊息"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {people.length > 0 && (
            <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
              <h2 className="text-md font-bold text-slate-900 mb-4 border-b pb-2 text-center uppercase tracking-tighter">統計摘要</h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center px-2 py-1">
                  <span className="text-slate-500 text-xs font-bold">總計人數</span>
                  <span className="font-black text-2xl text-slate-900">{people.length}</span>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {DEPARTMENTS.map(dept => (
                    <div key={dept} className="flex justify-between items-center p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: deptColors[dept] }}></div>
                        <span className="text-[11px] font-bold text-slate-700">{dept}</span>
                      </div>
                      <span className="text-xs font-black text-slate-900">{stats[dept]} <small className="font-normal opacity-50">位</small></span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* 中間影像區域 */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 h-full flex flex-col min-h-[600px]">
            <div className="flex-1 relative rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center border border-slate-200 shadow-inner">
              {!imageState.previewUrl ? (
                <div className="text-slate-500 flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  </div>
                  <span className="text-sm font-medium tracking-wide">請上傳照片開始辨識</span>
                </div>
              ) : (
                <div className="relative inline-block">
                  <img 
                    src={imageState.previewUrl} 
                    alt="Preview" 
                    className="max-w-full max-h-[78vh] block mx-auto rounded-sm shadow-2xl" 
                  />
                  <DetectionOverlay detections={people} showBoxes={showBoxes} />
                  
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-indigo-950/20 backdrop-blur-sm flex items-center justify-center z-50">
                      <div className="bg-white/95 p-10 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-5 border border-indigo-100 scale-90 md:scale-100 transition-transform">
                        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                        <div className="text-center">
                          <p className="font-black text-indigo-950 text-xl tracking-tight">AI 深度分析中</p>
                          <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.2em] mt-1">Vision Engine Active</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="mt-5 flex justify-between items-center px-2">
              <button 
                onClick={() => setShowBoxes(!showBoxes)}
                className={`text-[11px] font-black px-6 py-2.5 rounded-full transition-all shadow-sm uppercase tracking-wider ${showBoxes ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
              >
                {showBoxes ? '隱藏標記' : '顯示標記'}
              </button>
              <div className="flex items-center gap-3">
                <div className="h-1 w-24 bg-slate-100 rounded-full overflow-hidden">
                   <div className={`h-full bg-indigo-600 transition-all duration-1000 ${people.length > 0 ? 'w-full' : 'w-0'}`}></div>
                </div>
                <div className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">
                  {people.length > 0 ? `Detected ${people.length} Items` : 'Ready'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右側名單區域 - 已修正裁切邏輯 */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col h-[calc(100vh-140px)] sticky top-24 overflow-hidden">
            <div className="p-5 border-b bg-slate-50/50 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">辨識清單</h2>
                <div className="bg-slate-900 text-white text-[10px] font-black px-2 py-0.5 rounded-md">{people.length}</div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => toggleSort('id')}
                  className={`flex-1 text-[10px] font-black py-2.5 rounded-xl border-1.5 transition-all flex items-center justify-center gap-2 ${sortKey === 'id' ? 'bg-slate-900 border-slate-900 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'}`}
                >
                  編號 {sortKey === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                <button 
                  onClick={() => toggleSort('dept')}
                  className={`flex-1 text-[10px] font-black py-2.5 rounded-xl border-1.5 transition-all flex items-center justify-center gap-2 ${sortKey === 'dept' ? 'bg-slate-900 border-slate-900 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'}`}
                >
                  部別 {sortKey === 'dept' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50/20">
              {people.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 text-center p-8 opacity-40">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                  <span className="text-[10px] font-black uppercase tracking-widest">No Results</span>
                </div>
              ) : (
                sortedPeople.map((p) => {
                  // 座標解構：[ymin, xmin, ymax, xmax]
                  const [ymin, xmin, ymax, xmax] = p.box_2d;
                  const boxW = xmax - xmin;
                  const boxH = ymax - ymin;
                  
                  // 裁切設定：將裁切範圍稍微放大 1.4 倍以利美觀，但維持中心對齊
                  const cropPadding = 1.4;
                  const cropSize = Math.max(boxW, boxH) * cropPadding;
                  
                  // 計算左上角起點 (基於 normalized 0-1000)
                  const centerX = xmin + boxW / 2;
                  const centerY = ymin + boxH / 2;
                  const cropX = centerX - (cropSize / 2);
                  const cropY = centerY - (cropSize / 2);

                  const color = deptColors[p.department];

                  return (
                    <div key={p.id} className="p-4 bg-white border border-slate-200 rounded-[2rem] space-y-4 shadow-sm hover:border-indigo-300 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black w-6 h-6 flex items-center justify-center bg-slate-900 text-white rounded-lg">
                            {p.originalIndex + 1}
                          </span>
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Verified Profile</span>
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full ring-4 ring-slate-50 shadow-inner" style={{ backgroundColor: color }}></div>
                      </div>
                      
                      {/* 頭像顯示 - 採用 transform: translate 確保 aspect ratio 不受影響且座標精確 */}
                      <div className="relative aspect-square w-32 h-32 bg-slate-100 rounded-[2.2rem] mx-auto overflow-hidden border border-slate-100 shadow-inner">
                        <img 
                          src={imageState.previewUrl!} 
                          alt="Face Preview"
                          className="absolute max-w-none origin-top-left"
                          style={{
                            // 圖片寬度：將 1000 單位縮放到裁切尺寸寬度 (cropSize) 剛好等於容器寬度 (100%)
                            width: `${(1000 / cropSize) * 100}%`,
                            // 使用 transform translate 進行百分比位移。
                            // 在 transform 中，百分比是相對於「圖片自身」的尺寸。
                            // 因為 cropX 是在 0-1000 範圍內，所以位移百分比即為 cropX / 10 %。
                            transform: `translate(-${cropX / 10}%, -${cropY / 10}%)`,
                            top: 0,
                            left: 0
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">修正部別</p>
                        <div className="grid grid-cols-2 gap-2">
                          {DEPARTMENTS.map(d => (
                            <button
                              key={d}
                              onClick={() => updateDepartment(p.id, d)}
                              className={`
                                text-[10px] py-2 rounded-xl border-1.5 font-black transition-all
                                ${p.department === d 
                                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                                  : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-200 hover:bg-indigo-50/50'}
                              `}
                            >
                              {d}
                            </button>
                          ))}
                          <button
                            onClick={() => updateDepartment(p.id, '不確定')}
                            className={`
                              text-[10px] py-2 rounded-xl border-1.5 font-black transition-all col-span-2
                              ${p.department === '不確定' 
                                ? 'bg-slate-600 border-slate-600 text-white shadow-md' 
                                : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'}
                            `}
                          >
                            不確定 / 其他
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            
            {people.length > 0 && (
              <div className="p-5 border-t bg-white">
                <button 
                  onClick={reset}
                  className="w-full py-3.5 text-xs font-black text-red-500 hover:bg-red-50 rounded-[1.5rem] border-1.5 border-red-50 transition-all uppercase tracking-widest"
                >
                  清除所有辨識
                </button>
              </div>
            )}
          </div>
        </div>

      </main>
      
      <footer className="py-12 text-center bg-white border-t border-slate-200">
        <div className="flex flex-col items-center gap-2">
          <p className="text-slate-900 text-xs font-black uppercase tracking-[0.2em]">
            AI Crowd & Member Analysis
          </p>
          <p className="text-slate-400 text-[10px] font-bold">
            © 2024 精準人數統計系統 · Powered by Gemini Engine
          </p>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 20px; }
        .border-1.5 { border-width: 1.5px; }
      `}</style>
    </div>
  );
};

export default App;
