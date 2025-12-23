
export type Department = '未來部' | '男子部' | '女子部' | '壯年部' | '婦人部' | '不確定';

export interface FaceDetection {
  id: string;
  box_2d: [number, number, number, number]; // [ymin, xmin, ymax, xmax]
  label: string;
  department: Department;
}

export interface DetectionResult {
  totalCount: number;
  people: FaceDetection[];
}

export interface ImageState {
  file: File | null;
  previewUrl: string | null;
  base64: string | null;
}
