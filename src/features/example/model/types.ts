// 도메인 데이터 타입 정의
export interface ExampleItem {
  id: string;
  title: string;
  description: string;
  createdAt: string; // ISO string
}

export interface ExampleApiResponse {
  data: ExampleItem[];
  total: number;
}
