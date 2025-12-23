
import React from 'react';
import { FaceDetection, Department } from '../types';

interface DetectionOverlayProps {
  detections: FaceDetection[];
  showBoxes: boolean;
}

const deptColors: Record<Department | string, string> = {
  '未來部': '#10b981', // Emerald
  '男子部': '#3b82f6', // Blue
  '女子部': '#ec4899', // Pink
  '壯年部': '#6366f1', // Indigo
  '婦人部': '#f59e0b', // Amber
  '不確定': '#94a3b8'  // Slate
};

const DetectionOverlay: React.FC<DetectionOverlayProps> = ({ detections, showBoxes }) => {
  if (!showBoxes) return null;

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden w-full h-full">
      {detections.map((face, index) => {
        const [ymin, xmin, ymax, xmax] = face.box_2d;
        const color = deptColors[face.department] || '#ef4444';
        
        // 座標轉換：Gemini 給的是 0-1000 的千分比位置
        const style: React.CSSProperties = {
          position: 'absolute',
          top: `${ymin / 10}%`,
          left: `${xmin / 10}%`,
          width: `${(xmax - xmin) / 10}%`,
          height: `${(ymax - ymin) / 10}%`,
          border: `2px solid ${color}`,
          borderRadius: '4px',
          backgroundColor: 'transparent',
          boxShadow: `0 0 8px ${color}55`,
          zIndex: 10
        };

        return (
          <div key={face.id} style={style}>
            <div 
              style={{ backgroundColor: color }}
              className="absolute -top-5 left-0 text-white text-[9px] font-black px-1 py-0.5 rounded shadow-sm whitespace-nowrap"
            >
              #{index + 1}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DetectionOverlay;
