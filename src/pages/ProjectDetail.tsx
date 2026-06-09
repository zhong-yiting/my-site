import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  Database, ShoppingCart, Users, BarChart3, GitBranch, Target, 
  TrendingUp, Clock, ChevronLeft, ChevronRight, BookOpen, Code, 
  CheckCircle, AlertCircle, Play
} from 'lucide-react';

// 项目详细数据
const projectsData = {
  1: {
    id: 1,
    name: '数据清洗',
    icon: Database,
    color: 'blue',
    level: '入门',
    duration: '4周',
    prerequisites: ['Python基础', '基本数据结构'],
    description: '数据清洗是数据分析的第一步，也是最重要的一步。本教程将从零开始，教你如何处理现实世界中的"脏数据"。',
    outline: [
      {
        title: '第一阶段：认识数据质量问题',
        items: [
          '理解什么是数据清洗',
          '识别常见数据质量问题类型',
          '缺失值的识别与处理',
          '重复值的检测与删除',
          '异常值的识别方法'
        ]
      },
      {
        title: '第二阶段：数据类型转换与格式化',
        items: [
          '数据类型转换基础',
          '字符串处理技巧',
          '日期时间数据处理',
          '数值型数据标准化',
          '分类数据编码'
        ]
      },
      {
        title: '第三阶段：去重与异常值处理',
        items: [
          '完全去重操作',
          '基于条件去重',
          '统计方法检测异常值',
          'IQR方法实战',
          '异常值处理策略'
        ]
      },
      {
        title: '第四阶段：正则表达式与数据验证',
        items: [
          '正则表达式基础语法',
          '数据格式验证',
          '批量数据清洗流程',
          '清洗报告生成',
          '实战项目：电商数据清洗'
        ]
      }
    ],
    keyPoints: [
      '使用Pandas进行数据处理',
      '缺失值处理的多种方法',
      '异常值检测的统计方法',
      '正则表达式数据提取',
      '数据质量评估标准'
    ],
    codeExample: `import pandas as pd
import numpy as np

# 创建示例数据
df = pd.DataFrame({
    '姓名': ['张三', '李四', None, '王五'],
    '年龄': [25, np.nan, 30, 28],
    '工资': [5000, 6000, 4500, None]
})

# 查看缺失值
print(df.isnull().sum())

# 删除缺失值
df_cleaned = df.dropna()

# 填充缺失值
df['年龄'].fillna(df['年龄'].mean(), inplace=True)`
  },
  2: {
    id: 2,
    name: '购物篮分析',
    icon: ShoppingCart,
    color: 'green',
    level: '入门',
    duration: '3周',
    prerequisites: ['Python基础', '数据分析基础'],
    description: '购物篮分析是发现商品关联规则的利器，本教程教你从零实现关联规则挖掘，发现隐藏在数据中的商业价值。',
    outline: [
      {
        title: '第一阶段：关联规则基础',
        items: [
          '支持度、置信度、提升度概念',
          '关联规则的商业应用场景',
          '市场篮子数据的特征',
          'Apriori算法原理',
          '频繁项集挖掘基础'
        ]
      },
      {
        title: '第二阶段：Apriori算法实现',
        items: [
          'One-Hot编码转换',
          '频繁项集挖掘实战',
          '关联规则生成',
          '规则筛选与排序',
          '结果可视化'
        ]
      },
      {
        title: '第三阶段：实战应用',
        items: [
          '零售行业案例分析',
          '商品推荐系统构建',
          '货架优化策略',
          '促销方案设计',
          '综合项目实战'
        ]
      }
    ],
    keyPoints: [
      '关联规则三度计算',
      'Apriori算法实现',
      '高价值规则筛选',
      '可视化分析',
      '零售场景应用'
    ],
    codeExample: `from mlxtend.frequent_patterns import apriori, association_rules
from mlxtend.preprocessing import TransactionEncoder

# 交易数据
transactions = [
    ['牛奶', '面包', '鸡蛋'],
    ['面包', '尿布', '啤酒', '鸡蛋'],
    ['牛奶', '尿布', '啤酒', '可乐'],
]

# One-Hot编码
te = TransactionEncoder()
te_ary = te.fit(transactions).transform(transactions)
df = pd.DataFrame(te_ary, columns=te.columns_)

# 频繁项集挖掘
frequent = apriori(df, min_support=0.3, use_colnames=True)
rules = association_rules(frequent, metric="lift", min_threshold=1.0)`
  },
  3: {
    id: 3,
    name: '客户聚类分析',
    icon: Users,
    color: 'purple',
    level: '进阶',
    duration: '5周',
    prerequisites: ['Python基础', '统计学基础', '数据清洗'],
    description: '客户聚类分析是客户细分的基础，本教程教你使用K-Means等算法对客户进行精准分群。',
    outline: [
      {
        title: '第一阶段：客户分群概述',
        items: [
          '客户分群的意义与价值',
          '基于规则的分群方法',
          '基于模型的分群方法',
          '分群应用场景',
          '数据准备与特征选择'
        ]
      },
      {
        title: '第二阶段：K-Means聚类',
        items: [
          'K-Means算法原理',
          '肘部法则确定K值',
          '轮廓系数评估聚类',
          '聚类结果可视化',
          '客户画像生成'
        ]
      },
      {
        title: '第三阶段：聚类优化与应用',
        items: [
          '特征标准化处理',
          '高维数据降维',
          '聚类稳定性分析',
          '客户价值评估',
          '精准营销策略制定'
        ]
      }
    ],
    keyPoints: [
      'K-Means算法原理与实现',
      '最佳K值选择方法',
      '聚类质量评估指标',
      '客户画像构建',
      '精准营销应用'
    ],
    codeExample: `from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import pandas as pd

# 客户数据
customers = pd.DataFrame({
    'age': [25, 35, 45, 55],
    'income': [30000, 50000, 80000, 120000],
    'spending': [20, 40, 60, 80]
})

# 标准化
scaler = StandardScaler()
X_scaled = scaler.fit_transform(customers)

# K-Means聚类
kmeans = KMeans(n_clusters=3, random_state=42)
customers['cluster'] = kmeans.fit_predict(X_scaled)

# 各簇特征分析
print(customers.groupby('cluster').mean())`
  },
  4: {
    id: 4,
    name: '数据可视化',
    icon: BarChart3,
    color: 'orange',
    level: '入门',
    duration: '4周',
    prerequisites: ['Python基础', 'Pandas基础'],
    description: '数据可视化是数据分析师讲故事的工具，本教程教你创建专业、美观的数据图表，让数据说话。',
    outline: [
      {
        title: '第一阶段：可视化基础',
        items: [
          '为什么数据可视化重要',
          '图表选择指南',
          'Matplotlib基础语法',
          '常见图表类型',
          '样式与配色'
        ]
      },
      {
        title: '第二阶段：Seaborn高级可视化',
        items: [
          'Seaborn统计图',
          '关系图与分布图',
          '热力图与pairplot',
          '主题与样式控制',
          '复杂仪表盘设计'
        ]
      },
      {
        title: '第三阶段：交互式可视化',
        items: [
          'Plotly交互图表',
          '动态图表创建',
          '仪表盘构建',
          '地图可视化',
          'BI报表设计'
        ]
      }
    ],
    keyPoints: [
      'Matplotlib核心语法',
      'Seaborn统计图表',
      '交互式图表Plotly',
      '配色与设计原则',
      '数据仪表盘构建'
    ],
    codeExample: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

# 设置样式
sns.set_style("whitegrid")
plt.rcParams['font.sans-serif'] = ['SimHei']

# 柱状图
categories = ['Python', 'Java', 'JavaScript']
values = [30, 20, 25]

fig, ax = plt.subplots(figsize=(10, 6))
ax.bar(categories, values, color=['#FF6B6B', '#4ECDC4', '#45B7D1'])
ax.set_title('编程语言流行度', fontsize=14)
ax.set_ylabel('流行度')

plt.tight_layout()
plt.show()`
  },
  5: {
    id: 5,
    name: '分组聚类分析',
    icon: GitBranch,
    color: 'red',
    level: '进阶',
    duration: '4周',
    prerequisites: ['Python基础', '统计学基础', 'K-Means基础'],
    description: '深入学习各种聚类方法，包括层次聚类、DBSCAN等，解决K-Means无法处理的复杂数据结构。',
    outline: [
      {
        title: '第一阶段：层次聚类',
        items: [
          '层次聚类原理',
          '凝聚vs分裂策略',
          '距离计算方法',
          '树状图(Dendrogram)解读',
          '切割树状图确定聚类'
        ]
      },
      {
        title: '第二阶段：DBSCAN密度聚类',
        items: [
          'DBSCAN核心概念',
          '核心点、边界点、噪声点',
          '参数eps和min_samples',
          'K-距离图确定参数',
          '任意形状簇发现'
        ]
      },
      {
        title: '第三阶段：算法对比与选择',
        items: [
          '各算法优缺点对比',
          '不同场景的算法选择',
          '聚类质量评估',
          '算法实现与优化',
          '实战项目：客户细分'
        ]
      }
    ],
    keyPoints: [
      '层次聚类算法原理',
      'DBSCAN密度聚类',
      '参数调优技巧',
      '聚类评估指标',
      '算法选择指南'
    ],
    codeExample: `from scipy.cluster.hierarchy import dendrogram, linkage, fcluster
from sklearn.cluster import DBSCAN
import matplotlib.pyplot as plt

# 层次聚类
Z = linkage(X, method='ward')
clusters = fcluster(Z, t=4, criterion='maxclust')

# DBSCAN聚类
dbscan = DBSCAN(eps=0.5, min_samples=5)
clusters = dbscan.fit_predict(X)

# 树状图
plt.figure(figsize=(10, 6))
dendrogram(Z)
plt.title('层次聚类树状图')
plt.show()`
  },
  6: {
    id: 6,
    name: 'AB测试',
    icon: Target,
    color: 'pink',
    level: '进阶',
    duration: '5周',
    prerequisites: ['Python基础', '统计学基础'],
    description: 'AB测试是数据驱动决策的核心方法，本教程教你从实验设计到统计分析的完整流程。',
    outline: [
      {
        title: '第一阶段：AB测试基础',
        items: [
          '什么是AB测试',
          '实验设计原理',
          '零假设与备择假设',
          '统计显著性概念',
          '核心指标选择'
        ]
      },
      {
        title: '第二阶段：统计假设检验',
        items: [
          'Z检验原理',
          'T检验应用',
          '功效分析',
          '样本量计算',
          '置信区间理解'
        ]
      },
      {
        title: '第三阶段：实战项目',
        items: [
          '电商按钮优化案例',
          '定价策略测试',
          '页面改版评估',
          '结果可视化报告',
          'A/B测试最佳实践'
        ]
      }
    ],
    keyPoints: [
      '假设检验原理',
      'Z检验与T检验',
      '功效与样本量计算',
      '结果解读与建议',
      'AB测试最佳实践'
    ],
    codeExample: `from scipy.stats import norm
import numpy as np

# 计算转化率
control_rate = 0.05
treatment_rate = 0.055

# Z检验
se_diff = np.sqrt(control_rate * (1 - control_rate) / n_control + 
                   treatment_rate * (1 - treatment_rate) / n_treatment)
z_stat = (treatment_rate - control_rate) / se_diff
p_value = 2 * (1 - norm.cdf(abs(z_stat)))

print(f"Z统计量: {z_stat:.4f}")
print(f"P值: {p_value:.6f}")`
  },
  7: {
    id: 7,
    name: '店铺经营分析',
    icon: TrendingUp,
    color: 'cyan',
    level: '入门',
    duration: '4周',
    prerequisites: ['Python基础', 'Pandas基础'],
    description: '店铺经营分析帮助商家了解运营状况，发现问题并制定优化策略，本教程从数据到洞察完整覆盖。',
    outline: [
      {
        title: '第一阶段：核心指标体系',
        items: [
          '销售指标体系',
          '客户指标计算',
          '转化率分析',
          '客单价与复购率',
          '盈利能力分析'
        ]
      },
      {
        title: '第二阶段：数据分析与可视化',
        items: [
          '日/周/月趋势分析',
          '同环比分析',
          '热力图应用',
          '经营仪表盘设计',
          '问题诊断框架'
        ]
      },
      {
        title: '第三阶段：预测与决策',
        items: [
          '销售预测模型',
          '季节性分析',
          '库存优化',
          '策略建议生成',
          '综合分析报告'
        ]
      }
    ],
    keyPoints: [
      'KPI指标体系构建',
      '趋势与对比分析',
      '可视化仪表盘',
      '问题诊断方法',
      '预测模型应用'
    ],
    codeExample: `import pandas as pd
import matplotlib.pyplot as plt

# 店铺数据
store_data = pd.DataFrame({
    'date': pd.date_range('2024-01-01', periods=30),
    'sales': [5000 + i * 100 for i in range(30)],
    'orders': [100 + i * 2 for i in range(30)]
})

# 计算KPI
avg_order_value = store_data['sales'].sum() / store_data['orders'].sum()
conversion_rate = store_data['orders'].sum() / store_data['daily_visitors'].sum()

print(f"客单价: ¥{avg_order_value:.2f}")
print(f"转化率: {conversion_rate * 100:.2f}%")`
  },
  8: {
    id: 8,
    name: '消费者行为分析',
    icon: Clock,
    color: 'indigo',
    level: '进阶',
    duration: '5周',
    prerequisites: ['Python基础', 'Pandas基础', '数据可视化'],
    description: '消费者行为分析帮助企业理解客户决策过程，本教程教你分析购买路径、用户画像和偏好。',
    outline: [
      {
        title: '第一阶段：消费者行为基础',
        items: [
          '消费者行为分析框架',
          '用户画像构建',
          'RFM模型详解',
          '购买路径分析',
          '决策漏斗模型'
        ]
      },
      {
        title: '第二阶段：用户画像与分群',
        items: [
          '基于RFM的分群',
          '用户生命周期分析',
          '偏好与行为关联',
          'AARRR漏斗',
          '价值评估模型'
        ]
      },
      {
        title: '第三阶段：实战应用',
        items: [
          '电商用户分析案例',
          '个性化推荐策略',
          '精准营销方案',
          '留存提升方法',
          '综合项目实战'
        ]
      }
    ],
    keyPoints: [
      'RFM模型应用',
      '用户画像构建',
      'AARRR漏斗分析',
      '消费者决策分析',
      '精准营销策略'
    ],
    codeExample: `# RFM分析
rfm = df.groupby('customer_id').agg({
    'transaction_date': lambda x: (ref_date - x.max()).days,
    'transaction_id': 'count',
    'amount': 'sum'
}).reset_index()

rfm.columns = ['customer_id', 'recency', 'frequency', 'monetary']

# RFM评分
rfm['R_score'] = pd.qcut(rfm['recency'], q=5, labels=[5,4,3,2,1])
rfm['F_score'] = pd.qcut(rfm['frequency'].rank(method='first'), q=5, labels=[1,2,3,4,5])
rfm['M_score'] = pd.qcut(rfm['monetary'].rank(method='first'), q=5, labels=[1,2,3,4,5])`
  },
  9: {
    id: 9,
    name: '市场分析',
    icon: TrendingUp,
    color: 'teal',
    level: '进阶',
    duration: '5周',
    prerequisites: ['Python基础', '统计学基础'],
    description: '市场分析帮助企业了解宏观环境和竞争格局，本教程涵盖市场规模、趋势、竞争分析和SWOT。',
    outline: [
      {
        title: '第一阶段：市场分析基础',
        items: [
          'PEST分析框架',
          '市场规模测算',
          '市场趋势分析',
          '波特五力模型',
          'SWOT分析方法'
        ]
      },
      {
        title: '第二阶段：竞争格局分析',
        items: [
          '竞争对手识别',
          '市场份额计算',
          '竞争能力雷达图',
          '波特五力评估',
          '竞争策略制定'
        ]
      },
      {
        title: '第三阶段：策略制定',
        items: [
          'STP营销战略',
          '4P营销组合',
          '市场预测模型',
          '机会与风险评估',
          '综合分析报告'
        ]
      }
    ],
    keyPoints: [
      'PEST宏观分析',
      '波特五力模型',
      'SWOT战略分析',
      '竞争格局可视化',
      '市场策略制定'
    ],
    codeExample: `# 市场数据
market_data = pd.DataFrame({
    'year': [2018, 2019, 2020, 2021, 2022, 2023],
    'market_size': [3.2, 4.1, 5.3, 6.7, 8.2, 9.8],
    'growth_rate': [28.1, 25.6, 23.4, 20.5, 18.3, 15.7]
})

# 趋势分析
import numpy as np
z = np.polyfit(market_data['year'], market_data['market_size'], 2)
p = np.poly1d(z)

# 预测
future_market = p(2025)
print(f"2025年预测市场规模: {future_market:.2f}万亿元")`
  },
  10: {
    id: 10,
    name: '时间序列分析',
    icon: Clock,
    color: 'gray',
    level: '进阶',
    duration: '6周',
    prerequisites: ['Python基础', '统计学基础', 'Pandas基础'],
    description: '时间序列分析是预测未来的关键技能，本教程涵盖时间序列数据的处理、分析和预测方法。',
    outline: [
      {
        title: '第一阶段：时间序列基础',
        items: [
          '时间序列概念与类型',
          '时间戳与时间索引',
          '趋势分析',
          '季节性识别',
          '周期性分析'
        ]
      },
      {
        title: '第二阶段：数据处理与特征',
        items: [
          '缺失值处理',
          '平滑处理方法',
          '差分运算',
          '滞后特征创建',
          '移动平均计算'
        ]
      },
      {
        title: '第三阶段：预测模型',
        items: [
          'ARIMA模型原理',
          'SARIMA季节模型',
          'Prophet快速入门',
          '模型评估与选择',
          '实战项目：销售预测'
        ]
      }
    ],
    keyPoints: [
      '时间序列数据处理',
      '趋势季节分解',
      'ARIMA建模',
      'Prophet预测',
      '模型评估方法'
    ],
    codeExample: `import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import matplotlib.pyplot as plt

# 时间序列数据
ts = pd.Series([100 + i * 2 + (i % 12) * 5 for i in range(100)],
               index=pd.date_range('2023-01-01', periods=100, freq='D'))

# ARIMA模型
model = ARIMA(ts, order=(5, 1, 2))
fitted = model.fit()

# 预测未来10天
forecast = fitted.forecast(steps=10)
print(forecast)

# 可视化
plt.figure(figsize=(12, 6))
plt.plot(ts, label='历史数据')
plt.plot(forecast, label='预测', color='red')
plt.legend()
plt.show()`
  }
};

function getDetailPhotoUrl(projectId: number): string {
  const seeds: Record<number, string> = {
    1: 'data-cleaning-analytics-header',
    2: 'shopping-basket-retail-header',
    3: 'customer-segmentation-header',
    4: 'data-visualization-charts-header',
    5: 'clustering-algorithms-header',
    6: 'ab-testing-experiment-header',
    7: 'store-business-analytics-header',
    8: 'consumer-behavior-research-header',
    9: 'market-analysis-competition-header',
    10: 'time-series-forecasting-header'
  };
  const seed = seeds[projectId] || 'business-data-header';
  return `https://picsum.photos/seed/${seed}/1200/400`;
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || '1');
  const project = projectsData[projectId as keyof typeof projectsData];
  const [currentSection, setCurrentSection] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [headerImageLoaded, setHeaderImageLoaded] = useState(false);
  const [headerImageError, setHeaderImageError] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">项目不存在</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = project.icon;
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
    pink: 'bg-pink-100 text-pink-600',
    cyan: 'bg-cyan-100 text-cyan-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    teal: 'bg-teal-100 text-teal-600',
    gray: 'bg-gray-100 text-gray-600'
  };

  const outlineColorClasses: Record<string, string> = {
    blue: 'border-l-blue-500 bg-blue-50',
    green: 'border-l-green-500 bg-green-50',
    purple: 'border-l-purple-500 bg-purple-50',
    orange: 'border-l-orange-500 bg-orange-50',
    red: 'border-l-red-500 bg-red-50',
    pink: 'border-l-pink-500 bg-pink-50',
    cyan: 'border-l-cyan-500 bg-cyan-50',
    indigo: 'border-l-indigo-500 bg-indigo-50',
    teal: 'border-l-teal-500 bg-teal-50',
    gray: 'border-l-gray-500 bg-gray-50'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 导航栏 */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-blue-600">
            <ChevronLeft className="w-6 h-6" />
            <span>返回首页</span>
          </Link>
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses[project.color]}`}>
              {project.level}
            </span>
            <span className="text-gray-500 text-sm">约{project.duration}</span>
          </div>
        </div>
      </nav>

      {/* 头部信息 - 带响应式图片 */}
      <section className="pt-20 pb-12 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
        {/* 背景图片 */}
        <img
          src={getDetailPhotoUrl(projectId)}
          alt=""
          onLoad={() => setHeaderImageLoaded(true)}
          onError={() => setHeaderImageError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            headerImageLoaded && !headerImageError ? 'opacity-25' : 'opacity-0'
          }`}
        />
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90"></div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="flex flex-col md:flex-row items-center mb-6 gap-6">
            {/* 项目图标卡片 */}
            <div className={`p-6 rounded-2xl ${colorClasses[project.color]} bg-white shadow-lg flex-shrink-0`}>
              <IconComponent className="w-12 h-12" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{project.name}</h1>
              <p className="text-blue-100 text-lg leading-relaxed">{project.description}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm px-5 py-3 rounded-lg">
              <div className="text-sm text-blue-200 mb-1">学习难度</div>
              <div className="font-bold text-lg">{project.level}</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm px-5 py-3 rounded-lg">
              <div className="text-sm text-blue-200 mb-1">预计时长</div>
              <div className="font-bold text-lg">{project.duration}</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm px-5 py-3 rounded-lg">
              <div className="text-sm text-blue-200 mb-1">前置知识</div>
              <div className="font-bold text-lg">{project.prerequisites.length}项</div>
            </div>
          </div>
        </div>
      </section>

      {/* 先修知识 */}
      <section className="py-6 px-4 bg-white border-b">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">前置知识要求</h3>
          <div className="flex flex-wrap gap-2">
            {project.prerequisites.map((prereq, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {prereq}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 课程大纲 */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
            课程大纲
          </h2>
          
          <div className="space-y-6">
            {project.outline.map((section, index) => (
              <div 
                key={index}
                className={`border-l-4 ${outlineColorClasses[project.color]} rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setCurrentSection(currentSection === index ? -1 : index)}
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {section.title}
                  </h3>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${currentSection === index ? 'rotate-90' : ''}`} />
                </div>
                
                {currentSection === index && (
                  <ul className="mt-4 space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 核心要点 */}
      <section className="py-12 px-4 bg-blue-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
            <Target className="w-6 h-6 mr-2 text-blue-600" />
            核心要点
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.keyPoints.map((point, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm flex items-start">
                <div className={`w-8 h-8 rounded-full ${colorClasses[project.color]} flex items-center justify-center mr-3 flex-shrink-0`}>
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <span className="text-gray-700">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 代码示例 */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
            <Code className="w-6 h-6 mr-2 text-blue-600" />
            代码示例
          </h2>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
              <span className="text-gray-400 text-sm">Python</span>
              <button 
                onClick={() => setShowCode(!showCode)}
                className="text-gray-400 hover:text-white text-sm"
              >
                {showCode ? '收起代码' : '展开代码'}
              </button>
            </div>
            {showCode && (
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm text-gray-300 font-mono whitespace-pre">
                  {project.codeExample}
                </code>
              </pre>
            )}
          </div>
          
          {!showCode && (
            <button
              onClick={() => setShowCode(true)}
              className={`w-full mt-4 py-3 rounded-lg ${colorClasses[project.color]} text-white font-medium flex items-center justify-center`}
            >
              <Play className="w-5 h-5 mr-2" />
              查看代码示例
            </button>
          )}
        </div>
      </section>

      {/* 学习建议 */}
      <section className="py-12 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">学习建议</h2>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-yellow-100 rounded-full p-2 mr-4">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">理论结合实践</h4>
                  <p className="text-gray-600 text-sm">每个知识点都要配合实际代码练习，熟能生巧。</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-2 mr-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">完成课后作业</h4>
                  <p className="text-gray-600 text-sm">点击"实训练习"完成对应的练习题目。</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-4">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">参与讨论</h4>
                  <p className="text-gray-600 text-sm">在留言板分享学习心得，遇到问题及时提问。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-blue-800 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-blue-200 mb-2">商务数据分析训练平台</p>
          <p className="text-sm">© 2026 钟依廷的学习平台</p>
        </div>
      </footer>
    </div>
  );
}
