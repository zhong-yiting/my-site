export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  rating: number;
  duration: string;
  level: string;
  chapters: Chapter[];
  resources: Resource[];
  learningOutcomes: string[];
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  duration: string;
  practicalTasks: string[];
}

export interface Resource {
  id: string;
  name: string;
  type: string;
  link: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: '商务数据分析技术',
    icon: '📊'
  }
];

export const courses: Course[] = [
  {
    id: '1',
    title: '商务数据分析技术',
    description: '系统学习商务数据分析的核心技术和方法，掌握从数据采集、清洗、分析到可视化的完整流程，能够解决实际商务问题。',
    category: '商务数据分析技术',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Business%20data%20analysis%20technology%20course%20with%20charts%20and%20business%20intelligence&image_size=landscape_16_9',
    rating: 4.9,
    duration: '40小时',
    level: '中级',
    learningOutcomes: [
      '掌握商务数据分析的完整流程',
      '能够使用Python进行数据处理和分析',
      '掌握数据可视化技术',
      '能够进行统计分析和预测',
      '能够解决实际商务问题',
      '掌握数据驱动决策的方法',
      '能够编写专业的数据分析报告',
      '掌握数据质量管理技术',
      '能够进行客户行为分析',
      '掌握销售预测和库存优化技术'
    ],
    chapters: [
      {
        id: '1-1',
        title: '训练项目一：销售数据清洗与预处理',
        content: '学习如何处理销售数据中的缺失值、异常值和重复数据，进行数据标准化和规范化，为后续分析做准备。',
        duration: '4小时',
        practicalTasks: [
          '处理销售数据中的缺失值',
          '识别和处理异常值',
          '数据标准化和规范化',
          '数据质量评估'
        ]
      },
      {
        id: '1-2',
        title: '训练项目二：销售趋势分析与预测',
        content: '学习如何分析销售数据的时间趋势，使用移动平均、指数平滑等方法进行销售预测。',
        duration: '4小时',
        practicalTasks: [
          '销售数据时间序列分析',
          '移动平均预测',
          '指数平滑预测',
          '预测精度评估'
        ]
      },
      {
        id: '1-3',
        title: '训练项目三：客户分群与精准营销',
        content: '学习使用聚类分析等方法对客户进行分群，识别不同客户群体的特征，制定精准营销策略。',
        duration: '4小时',
        practicalTasks: [
          '客户数据特征提取',
          'K-means聚类分析',
          '客户群体特征分析',
          '精准营销方案设计'
        ]
      },
      {
        id: '1-4',
        title: '训练项目四：产品销售分析与优化',
        content: '学习如何分析产品销售数据，识别畅销和滞销产品，优化产品组合和定价策略。',
        duration: '4小时',
        practicalTasks: [
          '产品销售表现分析',
          '产品关联分析',
          '定价策略优化',
          '产品组合调整'
        ]
      },
      {
        id: '1-5',
        title: '训练项目五：库存优化分析',
        content: '学习如何分析库存数据，优化库存水平，减少库存成本，提高库存周转率。',
        duration: '4小时',
        practicalTasks: [
          '库存水平分析',
          '库存周转率计算',
          '安全库存设定',
          '库存优化策略制定'
        ]
      },
      {
        id: '1-6',
        title: '训练项目六：供应链数据分析',
        content: '学习如何分析供应链数据，优化供应链流程，提高供应链效率。',
        duration: '4小时',
        practicalTasks: [
          '供应商绩效评估',
          '物流成本分析',
          '供应链风险评估',
          '供应链优化方案'
        ]
      },
      {
        id: '1-7',
        title: '训练项目七：市场竞品分析',
        content: '学习如何收集和分析市场竞品数据，了解市场格局，制定竞争策略。',
        duration: '4小时',
        practicalTasks: [
          '竞品数据采集',
          '竞品特征分析',
          '市场份额分析',
          '竞争策略制定'
        ]
      },
      {
        id: '1-8',
        title: '训练项目八：客户流失预测',
        content: '学习使用机器学习方法预测客户流失，制定客户 retention 策略。',
        duration: '4小时',
        practicalTasks: [
          '客户流失数据准备',
          '特征工程',
          '机器学习模型训练',
          '流失预测与干预策略'
        ]
      },
      {
        id: '1-9',
        title: '训练项目九：销售漏斗分析',
        content: '学习如何分析销售漏斗数据，识别漏斗中的瓶颈，优化销售流程。',
        duration: '4小时',
        practicalTasks: [
          '销售漏斗数据构建',
          '漏斗转化率分析',
          '瓶颈识别',
          '销售流程优化'
        ]
      },
      {
        id: '1-10',
        title: '训练项目十：商业智能仪表盘开发',
        content: '学习如何设计和开发商业智能仪表盘，整合多种数据来源，提供直观的数据可视化。',
        duration: '4小时',
        practicalTasks: [
          '仪表盘需求分析',
          '数据整合与处理',
          '可视化设计',
          '交互式仪表盘开发'
        ]
      }
    ],
    resources: [
      {
        id: '1-1',
        name: 'Python数据分析库参考手册',
        type: 'PDF',
        link: '#'
      },
      {
        id: '1-2',
        name: '数据分析实战代码',
        type: 'GitHub',
        link: '#'
      },
      {
        id: '1-3',
        name: '数据可视化最佳实践',
        type: 'PDF',
        link: '#'
      },
      {
        id: '1-4',
        name: '商业数据分析案例集',
        type: 'PDF',
        link: '#'
      },
      {
        id: '1-5',
        name: '统计分析方法速查',
        type: 'PDF',
        link: '#'
      }
    ]
  }
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

export const getCoursesByCategory = (category: string): Course[] => {
  return courses.filter(course => course.category === category);
};

export const getPopularCourses = (limit: number = 1): Course[] => {
  return courses
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const getLearningPath = (): Course[] => {
  return [...courses];
};
