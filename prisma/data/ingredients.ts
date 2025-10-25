import { Category } from '@prisma/client';

export const ingredients = [
  {
    name: '로메인 상추',
    category: Category.BASE,
    description: '아삭한 식감과 청량감이 특징인 샐러드의 기본 채소',
    calories: 17,
    protein: 1.2,
    carbohydrate: 3.3,
    fat: 0.3,
    healthBenefits: [
      {
        title: '수분 보충 및 저칼로리',
        description:
          '약 95%가 수분으로 이루어져 있어 신체에 수분을 공급하고, 칼로리가 매우 낮아 체중 관리에 효과적입니다.',
      },
      {
        title: '눈 건강 지원',
        description:
          '비타민 A가 풍부하여 시력 보호와 눈의 피로를 줄이는 데 도움을 줍니다.',
      },
    ],
  },
  {
    name: '케일',
    category: Category.BASE,
    description: '녹황색 채소의 왕이라 불리는 대표적인 슈퍼푸드',
    calories: 49,
    protein: 4.3,
    carbohydrate: 8.8,
    fat: 0.9,
    healthBenefits: [
      {
        title: '심혈관 건강',
        description:
          '케일에 함유된 칼륨은 혈압을 낮추는 데 도움을 주며, 식이섬유는 콜레스테롤 수치를 개선합니다. 또한 오메가-3 지방산이 풍부하여 심장 건강을 지원합니다.',
      },
      {
        title: '강력한 항산화 효과',
        description:
          '베타카로틴, 비타민 C 등 다양한 항산화 물질이 세포 손상을 방지하고 면역력을 강화합니다. 특히 루테인과 제아잔틴은 눈 건강에 탁월합니다.',
      },
      {
        title: '뼈 건강',
        description:
          '비타민 K가 매우 풍부하여 칼슘 흡수를 돕고 뼈 밀도를 유지하는 데 중요한 역할을 합니다.',
      },
    ],
  },
  {
    name: '시금치',
    category: Category.BASE,
    description:
      '철분과 비타민이 풍부하여 빈혈 예방과 근육 기능에 도움을 주는 채소',
    calories: 23,
    protein: 2.9,
    carbohydrate: 3.6,
    fat: 0.4,
    healthBenefits: [
      {
        title: '에너지 증진 및 빈혈 예방',
        description:
          '철분과 엽산이 풍부하여 혈액 생성을 돕고 신체에 산소를 공급하여 피로 회복과 에너지 증진에 기여합니다.',
      },
      {
        title: '근육 기능 강화',
        description:
          '질산염이 풍부하여 운동 효율을 높이고 근육 기능을 지원하는 데 도움을 줄 수 있습니다.',
      },
    ],
  },
  {
    name: '양상추',
    category: Category.BASE,
    description:
      '가볍고 아삭한 식감으로 샌드위치나 샐러드에 널리 사용되는 채소',
    calories: 14,
    protein: 0.9,
    carbohydrate: 2.9,
    fat: 0.2,
    healthBenefits: [
      {
        title: '가벼운 식단에 최적화',
        description:
          '칼로리가 매우 낮고 수분 함량이 높아 부담 없는 식사를 원할 때 가장 좋은 선택입니다.',
      },
      {
        title: '신경 안정 효과',
        description:
          '락투카리움 성분이 함유되어 있어 가벼운 진정 효과와 숙면을 돕는 것으로 알려져 있습니다.',
      },
    ],
  },
  {
    name: '믹스 채소',
    category: Category.BASE,
    description:
      '다양한 잎채소를 한 번에 즐길 수 있는 간편하고 영양가 높은 모둠 채소',
    calories: 15,
    protein: 1.5,
    carbohydrate: 2.5,
    fat: 0.2,
    healthBenefits: [
      {
        title: '다양한 영양소 섭취',
        description:
          '여러 종류의 채소가 혼합되어 있어 다양한 비타민, 미네랄, 항산화 성분을 한 번에 섭취할 수 있습니다.',
      },
      {
        title: '장 건강 개선',
        description:
          '풍부한 식이섬유가 장 운동을 촉진하고 건강한 장내 환경을 만드는 데 도움을 줍니다.',
      },
    ],
  },
  {
    name: '닭가슴살',
    category: Category.PROTEIN,
    description: '대표적인 고단백 저지방 식품으로 근육 생성과 체중 관리에 필수',
    calories: 165,
    protein: 31,
    carbohydrate: 0,
    fat: 3.6,
    healthBenefits: [
      {
        title: '근육 성장 및 유지',
        description:
          '필수 아미노산이 풍부한 양질의 단백질은 근육량을 늘리고 유지하는 데 가장 효과적인 식품입니다.',
      },
      {
        title: '높은 포만감',
        description:
          '단백질은 소화되는 데 시간이 오래 걸려 포만감을 오래 유지시켜 주므로 과식을 방지하고 체중 감량에 도움을 줍니다.',
      },
    ],
  },
  {
    name: '삶은 계란',
    category: Category.PROTEIN,
    description: '완전식품이라 불리는, 간편하게 단백질을 보충할 수 있는 재료',
    calories: 155,
    protein: 13,
    carbohydrate: 1.1,
    fat: 11,
    healthBenefits: [
      {
        title: '완벽한 단백질 공급원',
        description:
          '인체가 필요로 하는 모든 종류의 필수 아미노산을 포함하고 있어 근육 회복과 성장에 기여합니다.',
      },
      {
        title: '두뇌 건강',
        description:
          '노른자에 풍부한 콜린 성분은 뇌 기능과 기억력 향상에 중요한 역할을 합니다.',
      },
    ],
  },
  {
    name: '두부',
    category: Category.PROTEIN,
    description: '밭에서 나는 소고기, 콩으로 만든 대표적인 식물성 단백질 식품',
    calories: 76,
    protein: 8,
    carbohydrate: 1.9,
    fat: 4.8,
    healthBenefits: [
      {
        title: '콜레스테롤 수치 개선',
        description:
          '식물성 단백질과 이소플라본 성분이 혈중 나쁜 콜레스테롤(LDL) 수치를 낮추는 데 도움을 줍니다.',
      },
      {
        title: '식물성 단백질',
        description:
          '포화지방이 적고 단백질이 풍부하여 근육량을 유지하면서 건강한 체중 관리를 원하는 분들에게 적합합니다.',
      },
    ],
  },
  {
    name: '연어',
    category: Category.PROTEIN,
    description: '오메가-3 지방산이 풍부한 슈퍼푸드로, 부드러운 식감이 일품',
    calories: 208,
    protein: 20,
    carbohydrate: 0,
    fat: 13,
    healthBenefits: [
      {
        title: '심혈관 건강 개선',
        description:
          '불포화지방산인 오메가-3가 혈중 중성지방과 콜레스테롤 수치를 낮추고 혈압을 조절하여 심장 질환 예방에 도움을 줍니다.',
      },
      {
        title: '뇌 기능 향상',
        description:
          'DHA 성분이 풍부하여 뇌세포 활성화를 돕고 기억력과 인지 능력 개선에 기여합니다.',
      },
    ],
  },
  {
    name: '새우',
    category: Category.PROTEIN,
    description: '탱글한 식감과 감칠맛이 매력적인 고단백 저지방 해산물',
    calories: 99,
    protein: 24,
    carbohydrate: 0.2,
    fat: 0.3,
    healthBenefits: [
      {
        title: '풍부한 단백질',
        description:
          '지방 함량은 거의 없으면서 단백질 함량이 매우 높아 근육량을 늘리려는 분들과 다이어터에게 모두 좋습니다.',
      },
      {
        title: '항산화 작용',
        description:
          '아스타잔틴이라는 강력한 항산화 성분이 풍부하여 세포 노화를 방지하고 면역력을 높이는 데 도움을 줍니다.',
      },
    ],
  },
  {
    name: '병아리콩',
    category: Category.PROTEIN,
    description: '고소한 맛과 부드러운 식감의 콩으로, 단백질과 식이섬유가 풍부',
    calories: 164,
    protein: 8.9,
    carbohydrate: 27,
    fat: 2.6,
    healthBenefits: [
      {
        title: '안정적인 혈당 관리',
        description:
          '혈당 지수(GI)가 낮고 식이섬유가 풍부하여 식후 혈당이 급격히 오르는 것을 막아줍니다.',
      },
      {
        title: '소화기 건강 증진',
        description:
          '풍부한 식이섬유가 장 운동을 활발하게 하고 콜레스테롤 배출을 도와 혈관 건강에도 긍정적인 영향을 줍니다.',
      },
    ],
  },
  {
    name: '소고기',
    category: Category.PROTEIN,
    description:
      '필수 아미노산과 철분이 풍부한, 근력 향상을 위한 최고의 단백질원',
    calories: 250,
    protein: 26,
    carbohydrate: 0,
    fat: 15,
    healthBenefits: [
      {
        title: '근력 및 운동 능력 향상',
        description:
          '근육 합성에 필수적인 크레아틴과 양질의 단백질이 풍부하여 고강도 운동 후 회복과 근력 증진에 매우 효과적입니다.',
      },
      {
        title: '철분 보충',
        description:
          '체내 흡수율이 높은 헴철이 풍부하여 빈혈을 예방하고 신체에 활력을 공급합니다.',
      },
    ],
  },
  {
    name: '리코타 치즈',
    category: Category.PROTEIN,
    description: '부드럽고 신선한 풍미를 가진 저염, 고단백 치즈',
    calories: 174,
    protein: 11,
    carbohydrate: 3,
    fat: 13,
    healthBenefits: [
      {
        title: '단백질 보충',
        description:
          '우유 단백질인 유청으로 만들어져 흡수가 빠른 단백질을 공급해주며, 근육 회복에 도움을 줍니다.',
      },
      {
        title: '가벼운 식단',
        description:
          '다른 치즈에 비해 칼로리와 나트륨 함량이 낮아 부담 없이 샐러드에 곁들여 풍미를 더할 수 있습니다.',
      },
    ],
  },
  {
    name: '아보카도',
    category: Category.FAT,
    description: '숲속의 버터, 건강한 불포화지방산이 가득한 슈퍼푸드',
    calories: 160,
    protein: 2,
    carbohydrate: 9,
    fat: 15,
    healthBenefits: [
      {
        title: '나쁜 콜레스테롤 감소',
        description:
          '단일 불포화지방산이 풍부하여 혈중 나쁜 콜레스테롤(LDL) 수치를 낮추고 좋은 콜레스테롤(HDL) 수치를 높여줍니다.',
      },
      {
        title: '풍부한 칼륨',
        description:
          '바나나보다 많은 칼륨을 함유하여 체내 나트륨 배출을 돕고 혈압을 안정적으로 유지하는 데 기여합니다.',
      },
    ],
  },
  {
    name: '아몬드',
    category: Category.FAT,
    description:
      '오독오독 씹는 맛이 일품인, 비타민 E와 식이섬유가 풍부한 견과류',
    calories: 579,
    protein: 21,
    carbohydrate: 22,
    fat: 49,
    healthBenefits: [
      {
        title: '혈관 건강 지킴이',
        description:
          '불포화지방산과 비타민 E가 풍부하여 콜레스테롤 수치를 개선하고 혈관의 노화를 막아줍니다.',
      },
      {
        title: '식후 혈당 조절',
        description:
          '식이섬유, 단백질, 건강한 지방이 탄수화물의 흡수 속도를 늦춰 혈당이 급격하게 오르는 것을 방지합니다.',
      },
    ],
  },
  {
    name: '호두',
    category: Category.FAT,
    description: '뇌 건강에 좋다고 알려진, 오메가-3가 풍부한 대표적인 견과류',
    calories: 654,
    protein: 15,
    carbohydrate: 14,
    fat: 65,
    healthBenefits: [
      {
        title: '두뇌 기능 활성화',
        description:
          '식물성 오메가-3인 알파리놀렌산(ALA)이 풍부하여 뇌세포를 보호하고 인지 기능 향상에 도움을 줍니다.',
      },
      {
        title: '혈압 및 콜레스테롤 개선',
        description:
          '풍부한 오메가-3와 항산화 성분이 혈관을 건강하게 만들고 혈압과 콜레스테롤 수치를 낮추는 데 효과적입니다.',
      },
    ],
  },
  {
    name: '해바라기씨',
    category: Category.FAT,
    description: '고소한 맛과 오독오독한 식감을 더해주는 영양 만점 씨앗',
    calories: 584,
    protein: 21,
    carbohydrate: 20,
    fat: 51,
    healthBenefits: [
      {
        title: '혈관 건강 개선',
        description:
          '식물성 스테롤 성분이 콜레스테롤 수치를 낮추는 데 도움을 주며, 불포화지방산이 풍부하여 심혈관 건강에 이롭습니다.',
      },
      {
        title: '강력한 항산화 효과',
        description:
          '비타민 E가 풍부하여 세포 손상을 막고 노화를 방지하는 데 도움을 줍니다.',
      },
    ],
  },
  {
    name: '방울토마토',
    category: Category.TOPPING,
    description: '샐러드에 색감과 상큼함을 더해주는 비타민 C와 라이코펜의 보고',
    calories: 18,
    protein: 0.9,
    carbohydrate: 3.9,
    fat: 0.2,
    healthBenefits: [
      {
        title: '강력한 항산화 효과',
        description:
          '붉은색을 내는 라이코펜 성분은 노화의 원인이 되는 활성산소를 제거하고 세포를 건강하게 유지합니다.',
      },
      {
        title: '혈압 조절',
        description:
          '칼륨이 풍부하여 체내 나트륨 배출을 도와 혈압 관리에 긍정적인 영향을 줍니다.',
      },
    ],
  },
  {
    name: '오이',
    category: Category.TOPPING,
    description:
      '시원하고 아삭한 식감으로 샐러드에 청량감을 더하는 수분 가득 채소',
    calories: 15,
    protein: 0.7,
    carbohydrate: 3.6,
    fat: 0.1,
    healthBenefits: [
      {
        title: '풍부한 수분 공급',
        description:
          '95% 이상이 수분으로 이루어져 있어 갈증 해소와 체내 노폐물 배출에 효과적입니다.',
      },
      {
        title: '저칼로리 다이어트 식품',
        description:
          '칼로리가 매우 낮고 포만감을 주어 체중 감량 식단에 부담 없이 추가할 수 있습니다.',
      },
    ],
  },
  {
    name: '파프리카',
    category: Category.TOPPING,
    description: '색깔마다 다른 효능을 지닌, 비타민 C가 풍부한 아삭한 채소',
    calories: 31,
    protein: 1,
    carbohydrate: 6,
    fat: 0.3,
    healthBenefits: [
      {
        title: '비타민 C의 왕',
        description:
          '레몬의 2배, 오렌지의 3배에 달하는 비타민 C를 함유하여 피로 회복과 피부 건강에 탁월한 효과가 있습니다.',
      },
      {
        title: '다이어트와 피부 미용',
        description:
          '칼로리가 낮고 수분과 식이섬유가 풍부하여 체중 감량에 도움을 주며, 풍부한 비타민이 피부를 밝고 건강하게 만듭니다.',
      },
    ],
  },
  {
    name: '양파',
    category: Category.TOPPING,
    description: '알싸한 맛과 단맛을 동시에 지닌, 혈액 순환에 도움을 주는 채소',
    calories: 40,
    protein: 1.1,
    carbohydrate: 9.3,
    fat: 0.1,
    healthBenefits: [
      {
        title: '혈관 청소부',
        description:
          '퀘르세틴 성분이 혈관 벽의 지방 축적을 막고 나쁜 콜레스테롤(LDL) 수치를 낮춰 혈액을 맑게 합니다.',
      },
      {
        title: '면역력 강화',
        description:
          '강력한 항산화 작용과 항염 효과로 면역 체계를 강화하고 각종 질병으로부터 신체를 보호합니다.',
      },
    ],
  },
  {
    name: '블랙 올리브',
    category: Category.TOPPING,
    description:
      '고소하고 짭짤한 풍미로 샐러드에 깊은 맛을 더하는 지중해의 보석',
    calories: 115,
    protein: 0.8,
    carbohydrate: 6,
    fat: 11,
    healthBenefits: [
      {
        title: '심혈관 건강 증진',
        description:
          '건강한 단일 불포화지방산이 풍부하여 나쁜 콜레스테롤 수치를 낮추고 혈압을 조절하는 데 도움을 줍니다.',
      },
      {
        title: '항산화 및 항염 효과',
        description:
          '비타민 E와 폴리페놀 등 항산화 물질이 풍부하여 세포 손상을 막고 만성 염증을 줄여줍니다.',
      },
    ],
  },
  {
    name: '브로콜리',
    category: Category.TOPPING,
    description:
      '세계 10대 슈퍼푸드 중 하나로, 항암 효과와 해독 작용이 뛰어난 채소',
    calories: 55,
    protein: 3.7,
    carbohydrate: 11.2,
    fat: 0.6,
    healthBenefits: [
      {
        title: '독소 배출 및 간 건강',
        description:
          '설포라판 성분이 간의 해독 효소를 활성화시켜 체내 유해물질 배출을 돕습니다.',
      },
      {
        title: '혈당 관리',
        description:
          '풍부한 식이섬유가 당의 흡수를 늦춰 식후 혈당이 천천히 오르도록 돕습니다.',
      },
    ],
  },
  {
    name: '옥수수',
    category: Category.TOPPING,
    description:
      '톡톡 터지는 식감과 달콤한 맛으로 샐러드에 즐거움을 더하는 곡물',
    calories: 86,
    protein: 3.2,
    carbohydrate: 19,
    fat: 1.2,
    healthBenefits: [
      {
        title: '풍부한 식이섬유',
        description:
          '식이섬유가 풍부하여 포만감을 주고 장 운동을 활발하게 하여 변비 예방에 도움을 줍니다.',
      },
      {
        title: '눈 건강',
        description:
          '루테인과 제아잔틴 성분이 풍부하여 자외선으로부터 눈을 보호하고 황반변성 예방에 기여합니다.',
      },
    ],
  },
  {
    name: '블루베리',
    category: Category.TOPPING,
    description:
      '새콤달콤한 맛의 대표적인 항산화 과일, 눈 건강과 뇌 기능에 탁월',
    calories: 57,
    protein: 0.7,
    carbohydrate: 14,
    fat: 0.3,
    healthBenefits: [
      {
        title: '강력한 항산화 능력',
        description:
          '안토시아닌 성분이 풍부하여 노화를 방지하고 세포를 보호하며, 특히 눈의 피로를 풀어주고 시력을 보호하는 데 효과적입니다.',
      },
      {
        title: '혈압 감소 효과',
        description:
          '정기적으로 섭취 시 혈관을 이완시키고 혈액 순환을 개선하여 혈압을 낮추는 데 도움이 된다는 연구 결과가 있습니다.',
      },
    ],
  },
  {
    name: '버섯',
    category: Category.TOPPING,
    description:
      '풍부한 향과 쫄깃한 식감으로 고기를 대체할 수 있는 저칼로리 고영양 식품',
    calories: 22,
    protein: 3.1,
    carbohydrate: 3.3,
    fat: 0.3,
    healthBenefits: [
      {
        title: '면역력 증진',
        description:
          '베타글루칸 성분이 풍부하여 면역세포를 활성화시켜 바이러스나 세균에 대한 저항력을 높여줍니다.',
      },
      {
        title: '체중 관리',
        description:
          '칼로리가 매우 낮고 식이섬유와 수분이 풍부하여 적은 양으로도 높은 포만감을 줍니다.',
      },
    ],
  },
  {
    name: '당근',
    category: Category.TOPPING,
    description: '눈 건강에 좋은 베타카로틴이 풍부한, 달콤하고 아삭한 뿌리채소',
    calories: 41,
    protein: 0.9,
    carbohydrate: 10,
    fat: 0.2,
    healthBenefits: [
      {
        title: '시력 보호',
        description:
          '풍부한 베타카로틴은 체내에서 비타민 A로 전환되어 눈의 피로를 줄이고 야간 시력을 향상시키는 데 도움을 줍니다.',
      },
      {
        title: '건강한 피부 유지',
        description:
          '비타민 A와 항산화 성분이 피부 세포의 손상을 막고 건강한 피부를 유지하는 데 기여합니다.',
      },
    ],
  },
  {
    name: '참깨 드레싱',
    category: Category.DRESSING,
    description:
      '참깨의 진하고 고소한 풍미가 입맛을 돋우는 가장 인기있는 드레싱',
    calories: 150,
    protein: 2,
    carbohydrate: 8,
    fat: 12,
    healthBenefits: [
      {
        title: '고소한 풍미',
        description:
          '참깨 특유의 고소한 맛과 향이 닭가슴살, 두부 등 담백한 재료와 잘 어울립니다.',
      },
      {
        title: '건강한 지방',
        description:
          '참깨에 함유된 불포화지방산이 건강에 긍정적인 영향을 줄 수 있습니다.',
      },
    ],
  },
  {
    name: '오리엔탈 드레싱',
    category: Category.DRESSING,
    description:
      '간장을 베이스로 한 짭짤하고 산뜻한 맛으로 어떤 샐러드와도 잘 어울리는 드레싱',
    calories: 45,
    protein: 0.5,
    carbohydrate: 5,
    fat: 2.5,
    healthBenefits: [
      {
        title: '가볍고 산뜻한 맛',
        description:
          '마요네즈 기반의 드레싱보다 칼로리가 낮고 산뜻하여 가벼운 식사를 원하는 분들에게 적합합니다.',
      },
      {
        title: '뛰어난 범용성',
        description:
          '어떤 재료와도 무난하게 어울려 가장 실패 없는 선택지 중 하나입니다.',
      },
    ],
  },
  {
    name: '발사믹 비네그레트',
    category: Category.DRESSING,
    description: '올리브 오일과 발사믹 식초로 만든 클래식하고 새콤한 드레싱',
    calories: 60,
    protein: 0.1,
    carbohydrate: 3,
    fat: 5,
    healthBenefits: [
      {
        title: '소화 촉진',
        description:
          '발사믹 식초는 소화 효소 분비를 촉진하여 식후 더부룩함을 줄이고 소화를 돕습니다.',
      },
      {
        title: '혈관 건강',
        description:
          '베이스가 되는 올리브 오일의 불포화지방산이 콜레스테롤 수치 개선에 도움을 줍니다.',
      },
    ],
  },
  {
    name: '시저 드레싱',
    category: Category.DRESSING,
    description:
      '치즈와 마늘의 진한 풍미가 특징인, 닭가슴살 샐러드의 단짝 드레싱',
    calories: 170,
    protein: 2,
    carbohydrate: 1,
    fat: 18,
    healthBenefits: [
      {
        title: '진하고 풍부한 맛',
        description:
          '크리미하고 짭짤한 맛이 로메인 상추나 닭가슴살과 만나 클래식한 시저 샐러드를 완성합니다.',
      },
      {
        title: '에너지 보충',
        description:
          '칼로리가 높아 운동 후 근육 증가를 위한 샐러드에 곁들이면 만족스러운 식사를 할 수 있습니다.',
      },
    ],
  },
  {
    name: '요거트 드레싱',
    category: Category.DRESSING,
    description:
      '부드럽고 상큼한 맛으로 과일이나 리코타 치즈와 잘 어울리는 드레싱',
    calories: 30,
    protein: 2,
    carbohydrate: 4,
    fat: 0.5,
    healthBenefits: [
      {
        title: '장 건강',
        description:
          '프로바이오틱스가 풍부하여 장내 유익균을 늘리고 건강한 소화 시스템을 만드는 데 도움을 줍니다.',
      },
      {
        title: '낮은 칼로리',
        description:
          '크리미한 드레싱 중 칼로리가 가장 낮아 부담 없이 즐길 수 있습니다.',
      },
    ],
  },
  {
    name: '올리브 오일 (엑스트라 버진)',
    category: Category.FAT,
    description: '지중해 식단의 핵심, 단일 불포화지방산이 풍부한 건강한 오일',
    calories: 884,
    protein: 0,
    carbohydrate: 0,
    fat: 100,
    healthBenefits: [
      {
        title: '심혈관 건강 증진',
        description:
          '풍부한 단일 불포화지방산(올레산)이 나쁜 콜레스테롤(LDL) 수치를 낮추고 혈관 건강을 지켜줍니다.',
      },
      {
        title: '강력한 항산화 및 항염 효과',
        description:
          '올레오칸탈, 폴리페놀 등 항산화 성분이 체내 염증을 줄이고 세포 노화를 방지하는 데 도움을 줍니다.',
      },
    ],
  },
  {
    name: '치아씨드',
    category: Category.FAT,
    description: '수분을 만나면 10배 불어나는, 오메가-3와 식이섬유의 왕',
    calories: 486,
    protein: 17,
    carbohydrate: 42,
    fat: 31,
    healthBenefits: [
      {
        title: '높은 포만감과 체중 조절',
        description:
          '물을 흡수해 젤 형태로 팽창하여 적은 양으로도 포만감을 주어 체중 감량에 도움을 줍니다.',
      },
      {
        title: '식후 혈당 안정화',
        description:
          '풍부한 수용성 식이섬유가 탄수화물의 소화 흡수 속도를 늦춰 혈당이 급격히 오르는 것을 방지합니다.',
      },
    ],
  },
  {
    name: '호박씨',
    category: Category.FAT,
    description: '고소한 맛과 풍부한 마그네슘, 아연을 함유한 영양 간식',
    calories: 574,
    protein: 30,
    carbohydrate: 15,
    fat: 49,
    healthBenefits: [
      {
        title: '마그네슘과 아연 풍부',
        description:
          '풍부한 마그네슘은 혈압 조절과 뼈 건강에, 아연은 면역 체계 강화에 중요한 역할을 합니다.',
      },
      {
        title: '심혈관 건강 지원',
        description:
          '불포화지방산과 항산화 성분이 풍부하여 콜레스테롤 수치를 개선하고 심장 건강을 돕습니다.',
      },
    ],
  },
  {
    name: '캐슈넛',
    category: Category.FAT,
    description: '부드러운 식감과 고소한 단맛, 철분과 마그네슘이 풍부한 견과류',
    calories: 553,
    protein: 18,
    carbohydrate: 30,
    fat: 44,
    healthBenefits: [
      {
        title: '빈혈 예방 및 뼈 건강',
        description:
          '철분 함량이 높아 빈혈 예방에 도움을 주며, 마그네슘과 비타민 K가 뼈를 튼튼하게 합니다.',
      },
      {
        title: '낮은 혈당 지수(GI)',
        description:
          '혈당지수(GI)가 낮아 당뇨가 있거나 혈당 관리가 필요한 사람들에게 좋은 간식입니다.',
      },
    ],
  },
  {
    name: '페타 치즈',
    category: Category.FAT,
    description: '지중해 샐러드의 꽃, 짭조름한 풍미와 단백질을 더해주는 치즈',
    calories: 265,
    protein: 14,
    carbohydrate: 4,
    fat: 21,
    healthBenefits: [
      {
        title: '단백질 및 칼슘 공급원',
        description:
          '양유나 염소유로 만들어져 풍부한 단백질과 칼슘을 제공하며 뼈 건강에 도움을 줍니다.',
      },
      {
        title: '풍미 향상 및 나트륨 조절 용이',
        description:
          '맛이 짭짤하여 소량만 사용해도 샐러드 전체의 풍미를 살려주므로, 총 나트륨 섭취 조절에 유리할 수 있습니다.',
      },
    ],
  },
];
