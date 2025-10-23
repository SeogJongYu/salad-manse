import fs from 'fs/promises';
import path from 'path';

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// 이 파일은 Supabase Bucket에 로컬이미지를 업로드하는 스크립트 파일입니다.

// --- 1. 사용자 설정 ---

// 업로드할 이미지가 있는 로컬 폴더 경로
// 예: [프로젝트 루트]/public/images/ingredients/
const LOCAL_SOURCE_DIR = path.join(
  process.cwd(),
  'public',
  'images',
  'ingredients',
);

const BUCKET_NAME = 'assets';
// Supabase 버킷 내에 저장될 경로 (접두사)
const DESTINATION_PREFIX = 'images/ingredients';
// --- 2. Supabase 클라이언트 설정 ---
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  throw new Error(
    '.env 파일에서 Supabase URL 또는 Service Key를 찾을 수 없습니다.',
  );
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// --- 3. 업로드 메인 함수 ---
async function uploadLocalImages() {
  console.log(`[시작] '${LOCAL_SOURCE_DIR}' 폴더의 파일들을 업로드합니다...`);
  console.log(
    `[대상] Supabase 버킷: '${BUCKET_NAME}', 경로: '${DESTINATION_PREFIX}'`,
  );

  try {
    // 1. 로컬 폴더의 파일 목록 읽기
    const files = await fs.readdir(LOCAL_SOURCE_DIR);

    // 이미지 파일만 필터링 (필요시)
    const imageFiles = files.filter(file =>
      /\.(jpe?g|png|gif|webp)$/i.test(file),
    );

    if (imageFiles.length === 0) {
      console.warn('업로드할 이미지 파일을 찾을 수 없습니다.');
      return;
    }

    console.log(`총 ${imageFiles.length}개의 이미지 파일을 업로드합니다.`);

    // 2. 각 파일을 순회하며 업로드
    for (const fileName of imageFiles) {
      const localFilePath = path.join(LOCAL_SOURCE_DIR, fileName);

      // Supabase 스토리지에 저장될 전체 경로
      // path.join 대신 URL 경로 스타일(/)로 직접 조합
      const storagePath = `${DESTINATION_PREFIX}/${fileName}`;

      // 3. 파일을 버퍼로 읽기
      const fileBuffer = await fs.readFile(localFilePath);

      console.log(`  -> ${fileName} 업로드 중...`);

      // 4. Supabase API로 업로드
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, fileBuffer, {
          cacheControl: 'public, max-age=31536000', // 1년 캐시
          upsert: true, // 덮어쓰기 허용
        });

      if (error) {
        console.error(`  ❌ [실패] ${fileName}: ${error.message}`);
      } else {
        console.log(`  ✅ [성공] ${fileName}`);
      }
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`[에러] 소스 폴더를 찾을 수 없습니다: ${LOCAL_SOURCE_DIR}`);
      console.error('LOCAL_SOURCE_DIR 변수의 경로를 확인해주세요.');
    } else {
      console.error('[에러] 스크립트 실행 중 오류 발생:', err);
    }
  }

  console.log('[완료] 업로드 스크립트 종료.');
}

uploadLocalImages();
