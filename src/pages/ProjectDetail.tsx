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
        title: '一、什么是数据清洗？',
        items: [
          '数据清洗：对原始数据进行审查、检测和修正，使其符合分析要求的过程',
          '脏数据的定义：缺失值、重复值、异常值、错误格式、逻辑矛盾等质量问题',
          '数据质量的六个维度：完整性、准确性、一致性、唯一性、时效性、有效性',
          '为什么重要：Garbage In, Garbage Out（垃圾进，垃圾出）',
          '数据清洗占数据分析工作的60%-80%时间，是数据分析师的核心技能'
        ]
      },
      {
        title: '二、运用场景',
        items: [
          '电商：清洗订单数据、用户行为数据、商品数据',
          '金融：清洗交易数据、风控数据、客户画像数据',
          '医疗：清洗病例数据、临床试验数据',
          '政府：清洗人口普查数据、统计数据',
          '科研：清洗实验数据、问卷调查数据',
          '企业：清洗CRM数据、ERP数据、财务数据'
        ]
      },
      {
        title: '三、入门做法（新手级别）',
        items: [
          '使用 df.info() 查看数据类型和缺失值概况',
          '使用 df.describe() 查看数值列的统计摘要',
          '使用 df.isnull().sum() 统计每列缺失值数量',
          '使用 df.duplicated().sum() 统计重复行数',
          '简单填充：用均值/中位数填充数值列缺失值',
          '简单去重：df.drop_duplicates() 删除完全重复行',
          '简单转换：pd.to_numeric() / pd.to_datetime() 转换数据类型',
          '实战：清洗一份简单的CSV数据，处理基本的缺失值和重复值'
        ]
      },
      {
        title: '四、进阶做法（中级级别）',
        items: [
          '缺失值策略：根据业务场景选择删除/填充/标记不同策略',
          '高级填充：前向填充ffill、后向填充bfill、众数填充分类变量',
          '条件去重：基于特定字段组合去重，保留最新/最早记录',
          '异常值检测：IQR法识别离群值，Z-score法识别极端值',
          '异常值处理：删除异常值、缩尾处理、单独标记建模',
          '正则表达式：验证手机号/邮箱格式，批量替换非法字符',
          '数据标准化：StandardScaler/MinMaxScaler统一量纲',
          '实战：对电商订单数据完成完整清洗，处理多种质量问题'
        ]
      },
      {
        title: '五、高级做法（专家级别）',
        items: [
          '多重插补：使用IterativeImputer基于多变量关系填充缺失值',
          '智能异常检测：IsolationForest自动识别异常模式',
          '数据质量规则引擎：定义业务规则自动校验数据',
          '数据血缘追踪：记录数据清洗的每一步操作',
          '版本控制：保留原始数据和清洗后数据的对比',
          '自动化流水线：编写脚本实现数据清洗自动化',
          '数据质量报告：生成专业的数据质量评估报告',
          '实战：构建企业级数据清洗管道，支持大规模数据处理'
        ]
      }
    ],
    keyPoints: [
      '定义：数据清洗 = 审查 + 检测 + 修正，使数据符合分析要求',
      '场景：电商/金融/医疗/政府/科研/企业的各类数据分析场景',
      '入门：df.info()/describe()诊断，简单填充和去重',
      '进阶：按场景选择缺失值策略、IQR/Z-score异常检测、正则验证',
      '高级：多重插补、智能检测、规则引擎、自动化流水线',
      '数据质量六维度：完整性(Completeness)、准确性(Accuracy)、一致性(Consistency)、唯一性(Uniqueness)、时效性(Timeliness)、有效性(Validity)',
      '缺失值机制：MCAR(完全随机缺失)、MAR(随机缺失)、MNAR(非随机缺失)',
      '缺失值处理策略：删除(Listwise/Pairwise)、填充(均值/中位数/众数/KNN/MICE)、标记法(创建缺失标记列)',
      '异常值检测：IQR法(四分位距)、Z-score法(|Z|>3)、DBSCAN聚类、IsolationForest孤立森林',
      '异常值处理：删除、缩尾(Winsorization)、对数变换、单独建模、人工审查',
      '重复值检测：duplicated()按字段组合检测，keep参数控制保留策略',
      '数据类型转换：to_numeric、to_datetime、astype，errors参数处理转换失败',
      '字符串清洗：strip去空格、lower/upper统一大小写、str.replace正则替换',
      '正则验证：手机号^1[3-9]\\d{9}$、邮箱^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      '文本规范化：同义词替换(上海/上海市)、单位统一(kg/千克)、格式统一(日期/身份证)',
      '数据一致性校验：日期逻辑(下单时间<发货时间)、数值逻辑(销量>=0)、关联完整性(外键存在性)',
      '数据标准化：Z-score标准化(均值0方差1)、MinMax归一化(0-1范围)、RobustScaler(抗异常值)',
      '最佳实践：永远保留原始数据副本、先验证再覆盖、记录清洗过程(版本控制)、清洗后再次验证',
      '核心指标：缺失率、重复率、异常率、数据类型正确率、格式合规率',
      '工具链：Pandas(基础) + NumPy(数值计算) + sklearn.preprocessing(标准化) + re(正则) + Great Expectations(高级验证)',
      '常见陷阱：过度填充导致偏差、删除过多导致样本减少、未考虑业务含义的盲目清洗、忽略数据泄露风险'
    ],
    codeExample: `import pandas as pd
import numpy as np

# ===== 入门级：基础诊断 =====
df = pd.read_csv('sales_data.csv')
print("=== 1. 数据诊断 ===")
print(f"数据形状: {df.shape}")
print(f"缺失值统计:\n{df.isnull().sum()}")
print(f"重复行数: {df.duplicated().sum()}")
print(f"数据类型:\n{df.dtypes}")

# ===== 进阶级：多策略清洗 =====
print("\n=== 2. 开始清洗 ===")

# 缺失值处理
df['年龄'].fillna(df['年龄'].median(), inplace=True)  # 中位数填充
df['城市'].fillna(df['城市'].mode()[0], inplace=True)  # 众数填充
df['注册日期'].fillna(method='ffill', inplace=True)     # 前向填充

# 去重
df.drop_duplicates(subset=['用户ID', '订单号'], keep='first', inplace=True)

# 异常值检测(IQR)
Q1, Q3 = df['订单金额'].quantile([0.25, 0.75])
IQR = Q3 - Q1
df = df[(df['订单金额'] >= Q1-1.5*IQR) & (df['订单金额'] <= Q3+1.5*IQR)]

# 类型转换
df['订单金额'] = pd.to_numeric(df['订单金额'].astype(str).str.replace(',',''), errors='coerce')
df['注册日期'] = pd.to_datetime(df['注册日期'], errors='coerce')

# ===== 验证结果 =====
print(f"\n=== 3. 清洗完成 ===")
print(f"清洗后行数: {len(df)}")
print(f"剩余缺失值: {df.isnull().sum().sum()}")
print(f"数值列统计:\n{df[['年龄', '订单金额']].describe().round(2)}")`
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
        title: '一、什么是购物篮分析？',
        items: [
          '购物篮分析：分析消费者购物篮中商品之间的关联关系，发现商品组合购买规律',
          '经典案例：「尿布与啤酒」——超市发现购买尿布的男性顾客常同时购买啤酒',
          '核心三度指标：支持度(Support)、置信度(Confidence)、提升度(Lift)',
          '支持度：P(A∩B) = 同时购买A和B的交易数 / 总交易数，反映普遍性',
          '置信度：P(B|A) = P(A∩B) / P(A)，反映购买A后购买B的概率',
          '提升度：P(B|A) / P(B)，衡量关联强度的纯度（>1正相关，=1独立，<1负相关）'
        ]
      },
      {
        title: '二、运用场景',
        items: [
          '零售：货架布局优化——将关联度高的商品摆放在邻近位置',
          '电商：交叉推荐——购买A商品后推荐关联商品B',
          '促销：捆绑销售——将关联商品组合成套餐促销',
          '供应链：库存管理——根据商品关联度优化库存补货',
          '餐饮：菜单设计——发现菜品搭配规律优化菜单',
          '医药：处方分析——发现药品搭配规律辅助用药建议'
        ]
      },
      {
        title: '三、入门做法（新手级别）',
        items: [
          '准备交易数据：list of list 格式，每个子列表是一笔交易的商品',
          'One-Hot编码：用 TransactionEncoder 转换为矩阵格式',
          '调用 apriori()：设置 min_support 参数挖掘频繁项集',
          '调用 association_rules()：生成关联规则',
          '筛选规则：按 lift 降序排序，筛选 lift>1 的规则',
          '简单解读：找出提升度最高的前5条规则并给出业务建议',
          '实战：分析小型超市交易数据，找出商品关联规则'
        ]
      },
      {
        title: '四、进阶做法（中级级别）',
        items: [
          '参数调优：尝试不同 min_support 值，观察项集数量变化',
          '多指标筛选：同时考虑支持度、置信度、提升度三个指标',
          'conviction/leverage：使用更多指标评估规则质量',
          '规则去重：合并等价规则，避免重复推荐',
          '可视化：绘制置信度-支持度散点图，找出"黄金规则"',
          '热力图：展示商品共现矩阵，发现商品组合模式',
          '实战：对电商订单数据完成完整分析，输出可执行的业务建议'
        ]
      },
      {
        title: '五、高级做法（专家级别）',
        items: [
          '算法优化：使用 FP-Growth 算法处理大规模数据（比 Apriori 更快）',
          '时序分析：结合时间维度，分析商品关联的时间规律',
          '个性化关联：基于用户画像，为不同用户群体发现个性化关联规则',
          '动态更新：定期重新挖掘，跟踪关联规则的变化趋势',
          '规则评估：使用业务指标验证规则效果（如推荐转化率）',
          '系统集成：将关联规则引擎嵌入推荐系统或库存管理系统',
          '实战：构建企业级购物篮分析系统，支持实时规则挖掘'
        ]
      }
    ],
    keyPoints: [
      '定义：分析消费者购物篮中商品的关联关系，发现组合购买规律',
      '核心指标：支持度(Support)、置信度(Confidence)、提升度(Lift)',
      '场景：货架布局、交叉推荐、捆绑销售、库存管理、菜单设计',
      '入门：TransactionEncoder + apriori + association_rules 三步流程',
      '进阶：多指标筛选、可视化分析、业务解读',
      '高级：FP-Growth算法、个性化关联、系统集成',
      '支持度公式：Support(A→B) = 同时购买A和B的交易数 / 总交易数，反映商品组合的普遍性',
      '置信度公式：Confidence(A→B) = Support(A∩B) / Support(A)，反映购买A后购买B的条件概率',
      '提升度公式：Lift(A→B) = Confidence(A→B) / Support(B)，衡量关联强度，>1正相关，=1独立，<1负相关',
      '杠杆值(Leverage)：P(A∩B) - P(A)×P(B)，衡量A和B同时出现的频率超过独立出现的程度',
      '确信度(Conviction)：(1-Support(B)) / (1-Confidence(A→B))，越高表示规则越可靠',
      'Apriori原理：如果一个项集是频繁的，那么它的所有子集也是频繁的；反过来说，非频繁项集的所有超集也是非频繁的',
      'Apriori vs FP-Growth：Apriori简单但需要多次扫描数据库，FP-Growth使用FP树只需两次扫描，大规模数据下更高效',
      '支持度选择：太低会产生大量无意义规则，太高会漏掉有价值的长尾商品，通常设为0.5%-5%',
      '规则筛选：同时满足支持度≥1%、置信度≥30%、提升度>1.2的规则才值得关注',
      '规则去重：A→B和B→A是不同规则，但实际业务含义相似，需结合商品价格/利润优先选择高价值方向',
      '业务价值评估：推荐转化率提升、交叉销售额增长、库存周转率改善、客单价提升',
      '常见陷阱：将相关性误认为因果关系、忽视样本量导致偶然规则、不考虑商品价格差异、季节性波动影响',
      '高级应用：时序关联分析(季节性变化)、多维度关联(用户分层+商品)、负关联规则(避免组合)、序列模式挖掘(购买顺序)',
      '工具链：mlxtend.frequent_patterns(入门) + pyfpgrowth(进阶) + Spark MLlib FPGrowth(大规模) + 自研引擎'
    ],
    codeExample: `import pandas as pd

# ===== 入门级：基础购物篮分析 =====
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules

# 交易数据
transactions = [
    ['牛奶', '面包'], ['面包', '尿布', '啤酒', '鸡蛋'],
    ['牛奶', '鸡蛋'], ['面包', '鸡蛋'], ['牛奶', '面包', '尿布'],
    ['啤酒', '尿布'], ['牛奶', '面包', '鸡蛋'], ['面包', '尿布'],
]

# 1. One-Hot编码
te = TransactionEncoder()
df = pd.DataFrame(te.fit_transform(transactions), columns=te.columns_)

# 2. 挖掘频繁项集
freq_items = apriori(df, min_support=0.2, use_colnames=True)
print("=== 频繁项集 ===")
print(freq_items.sort_values('support', ascending=False))

# 3. 生成关联规则
rules = association_rules(freq_items, metric="lift", min_threshold=1.0)
rules = rules.sort_values('lift', ascending=False)

# 4. 筛选优质规则
top_rules = rules[(rules['lift'] > 1.5) & (rules['confidence'] > 0.5)]
print("\n=== 高价值规则 ===")
print(top_rules[['antecedents', 'consequents', 'support', 'confidence', 'lift']])

# 5. 业务建议
print("\n=== 业务建议 ===")
for _, row in top_rules.iterrows():
    a = ', '.join(list(row['antecedents']))
    b = ', '.join(list(row['consequents']))
    print(f"• 将{a}和{b}摆放在邻近位置（提升度={row['lift']:.2f}）")`
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
        title: '一、什么是客户聚类分析？',
        items: [
          '客户聚类分析：根据客户的行为、消费、属性等特征，将相似客户自动分组的过程',
          '核心思想：物以类聚——相似的客户放在同一组，不同的客户分到不同组',
          '与RFM分群的区别：RFM是基于规则的分群（人工定义规则），聚类是基于模型的分群（算法自动发现）',
          '聚类算法分类：K-Means（快速高效）、层次聚类（可解释性强）、DBSCAN（自动识别簇数）',
          '聚类分析的价值：实现精准营销、差异化运营、资源优化配置',
          '完整流程：数据准备→特征工程→模型训练→评估→业务解读'
        ]
      },
      {
        title: '二、运用场景',
        items: [
          '电商：客户分群后实施差异化营销策略，提升转化率和客单价',
          '金融：识别高价值客户和风险客户，优化服务和风控策略',
          '零售：根据客户偏好制定个性化推荐，提升复购率',
          '互联网产品：用户分层运营，优化产品功能设计',
          '教育：根据学生学习行为分组，提供个性化学习路径',
          '医疗：患者聚类，优化诊疗方案和健康管理'
        ]
      },
      {
        title: '三、入门做法（新手级别）',
        items: [
          '准备客户特征数据：消费金额、消费频次、客单价等',
          '数据标准化：使用 StandardScaler 统一量纲',
          '选择K值：凭经验选择K=3~5个簇',
          '调用K-Means：sklearn.cluster.KMeans(n_clusters=K)',
          '解读结果：分析各簇中心的特征差异',
          '简单可视化：用散点图展示聚类结果',
          '实战：对小型客户数据集完成K-Means聚类分析'
        ]
      },
      {
        title: '四、进阶做法（中级级别）',
        items: [
          '特征工程：构建RFM等衍生指标，选择区分度高的特征',
          '确定最佳K值：肘部法则 + 轮廓系数综合判断',
          '多算法对比：尝试K-Means、层次聚类、DBSCAN',
          '评估指标：轮廓系数、Calinski-Harabasz指数',
          '簇画像分析：用雷达图展示各簇特征对比',
          '稳定性验证：多次聚类观察结果一致性',
          '实战：对电商客户数据完成完整聚类，输出各簇营销建议'
        ]
      },
      {
        title: '五、高级做法（专家级别）',
        items: [
          '特征选择：使用PCA降维、互信息筛选重要特征',
          '混合聚类：结合规则分群和模型聚类的优势',
          '时序聚类：考虑客户行为的时间变化趋势',
          '半监督聚类：结合标签数据提升聚类效果',
          '大规模数据处理：使用MiniBatchKMeans处理百万级客户',
          '聚类结果监控：定期重新聚类，跟踪客户群变化',
          '系统集成：将聚类结果嵌入CRM系统，支持业务决策'
        ]
      }
    ],
    keyPoints: [
      '定义：根据客户特征自动分组，相似客户在一起，不同客户分开',
      '场景：精准营销、风险识别、个性化推荐、用户分层运营',
      '入门：准备数据→标准化→K-Means→解读结果',
      '进阶：特征工程、肘部法则+轮廓系数确定K、多算法对比',
      '高级：PCA降维、时序聚类、大规模数据处理、系统集成',
      'RFM模型：Recency(最近购买天数)、Frequency(购买次数)、Monetary(累计消费金额)，客户分群经典框架',
      'RFM打分策略：R分5档(越小越好)、F分5档(越多越好)、M分5档(越高越好)，每档1-5分',
      'K-Means原理：随机初始化K个质心→分配样本到最近质心→更新质心为簇均值→重复至收敛',
      'K-Means的K值确定：肘部法则(Elbow Method)观察SSE下降拐点，轮廓系数(Silhouette Score)衡量簇内紧密度与簇间分离度',
      '特征标准化：必须使用StandardScaler或MinMaxScaler，否则量纲差异导致距离计算偏差(如金额vs天数)',
      '聚类算法对比：K-Means(球形簇,需预设K,快) vs 层次聚类(任意形状,解释性强,O(N²)慢) vs DBSCAN(自动发现K,识别噪声)',
      '客户画像：聚类后需为每个簇生成业务标签(高价值/流失风险/价格敏感/低频高质等)',
      '常用客户特征：消费金额(均值/总额/最大单笔)、消费频次(月订单数)、品类偏好(Top3品类占比)、价格敏感度(折扣使用率)、复购率、活跃度',
      '聚类评估：轮廓系数[-1,1]越接近1越好、Calinski-Harabasz指数(越大越好)、ARI(有标签时用)',
      '降维可视化：PCA将多维特征降为2D/3D，用散点图观察聚类效果，t-SNE/UMAP适合非线性降维',
      '最佳实践：先特征工程再聚类、尝试多个K值选最优、聚类后做业务解读、定期重新训练模型跟踪变化',
      '常见陷阱：未标准化导致距离失真、K值选择主观、将聚类结果当作绝对真理、忽略特征相关性',
      '工具链：sklearn.cluster(KMeans/DBSCAN) + sklearn.preprocessing(标准化) + sklearn.metrics(评估) + scipy.cluster.hierarchy(层次)'
    ],
    codeExample: `import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score

# ===== 入门级：基础客户聚类 =====
# 1. 准备数据
df = pd.DataFrame({
    '客户ID': range(1, 101),
    '消费金额': np.random.randint(100, 10000, 100),
    '消费频次': np.random.randint(1, 20, 100),
    '注册天数': np.random.randint(1, 365, 100),
})

# 2. 标准化
X = df[['消费金额', '消费频次', '注册天数']].values
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 3. K-Means聚类
km = KMeans(n_clusters=4, random_state=42, n_init=10)
df['簇'] = km.fit_predict(X_scaled)

# 4. 计算轮廓系数评估
score = silhouette_score(X_scaled, df['簇'])
print(f"轮廓系数: {score:.3f}")

# 5. 簇画像分析
print("\n=== 各簇特征均值 ===")
result = df.groupby('簇')[['消费金额', '消费频次', '注册天数']].mean().round(1)
print(result)

# 6. 命名簇（业务解读）
cluster_names = {
    0: '高价值活跃客户',
    1: '新客户',
    2: '低价值沉睡客户',
    3: '中等价值客户'
}
df['客户类型'] = df['簇'].map(cluster_names)
print(f"\n=== 各类型客户数量 ===")
print(df['客户类型'].value_counts())`
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
        title: '一、什么是数据可视化？',
        items: [
          '数据可视化：将数据转换为图形或图表，帮助人们快速理解数据中的模式和趋势',
          '核心价值：人类对图形的信息吸收速度是文字的6万倍，一图胜千言',
          '图表类型选择：比较数据→柱/条形图、趋势变化→折线图、占比分布→饼图、关系分析→散点图、数据分布→直方图',
          '设计原则：数据墨水比最大化、一图一结论、配色不超过5种、坐标轴从0开始',
          '常见错误：截断Y轴夸大差异、3D效果扭曲比例、饼图超过5块分类'
        ]
      },
      {
        title: '二、运用场景',
        items: [
          '商业报告：用图表展示销售趋势、市场份额、财务指标',
          '数据分析：探索数据分布、发现异常值、揭示变量关系',
          '业务监控：实时仪表盘展示关键业务指标',
          '学术研究：展示实验结果、数据分布、统计分析',
          '用户界面：数据驱动的产品界面设计',
          '新闻媒体：用图表讲新闻故事，增强说服力'
        ]
      },
      {
        title: '三、入门做法（新手级别）',
        items: [
          '使用 matplotlib 绘制基础图表：折线图、柱状图、饼图',
          '设置中文支持：plt.rcParams[\'font.sans-serif\'] = [\'SimHei\']',
          '添加标题、坐标轴标签、图例',
          '简单美化：添加网格线、调整颜色',
          '保存图片：plt.savefig() 导出为PNG/PDF',
          '实战：绘制月度销售趋势图和品类对比图'
        ]
      },
      {
        title: '四、进阶做法（中级级别）',
        items: [
          'Seaborn 统计图表：直方图、热力图、箱线图、pairplot',
          '多子图布局：plt.subplots() 创建组合仪表盘',
          '图表配色：使用颜色映射(cmap)和调色板',
          '添加注释和标注：ax.annotate() 标注关键点',
          '交互式图表：Plotly 创建可交互的图表',
          '实战：制作包含5张图的综合销售分析报告'
        ]
      },
      {
        title: '五、高级做法（专家级别）',
        items: [
          '数据故事化：设计有叙事逻辑的图表序列',
          '动态可视化：Matplotlib动画、Plotly Dash仪表盘',
          '地理可视化：地图绑定数据展示',
          '数据艺术化：信息图表设计、创意可视化',
          '自动化报告：脚本生成标准化报告',
          '实战：构建企业级数据可视化平台'
        ]
      }
    ],
    keyPoints: [
      '定义：将数据转换为图形，帮助快速理解模式和趋势',
      '场景：商业报告、数据分析、业务监控、学术研究',
      '入门：matplotlib基础图表、中文配置、基本美化',
      '进阶：seaborn统计图表、多子图布局、交互式图表',
      '高级：数据故事化、动态可视化、自动化报告',
      '设计原则：数据墨水比最大化(Tufte)、一图一结论、配色不超过5种、坐标轴从0开始(除特殊场景)',
      '图表选择指南：比较数据→柱状图(bar)、趋势变化→折线图(line)、占比分布→饼图/环形图(pie/donut)、变量关系→散点图(scatter)、数据分布→直方图(hist)/箱线图(box)、时间序列→折线/面积图、层级关系→树图(treemap)',
      '图表类型库：柱状图、堆叠柱图、分组柱图、折线图、面积图、饼图、散点图、气泡图、热力图、箱线图、小提琴图、雷达图、漏斗图、桑基图、树图',
      '中文支持：plt.rcParams[\"font.sans-serif\"] = [\"SimHei\", \"Microsoft YaHei\", \"Arial Unicode MS\"]；rcParams[\"axes.unicode_minus\"] = False 解决负号显示问题',
      '配色原则：区分色(分类数据)、渐变色(连续数据)、发散色(正负对比)；避免红绿配色(色盲不友好)；高对比度配色；保持配色一致性',
      'matplotlib架构：Figure(画布) → Axes(坐标系) → Axis(坐标轴) → Artist(元素)；plt是面向过程API，ax是面向对象API',
      '多子图布局：plt.subplots(nrows, ncols, figsize)创建网格布局；fig.add_subplot()手动添加；gridspec更灵活的网格控制',
      'seaborn高级图：sns.heatmap(相关性矩阵)、sns.pairplot(变量两两关系)、sns.boxplot/violinplot(分布对比)、sns.barplot(带误差棒的分组对比)、sns.lineplot(带置信区间的趋势)',
      '标注与注释：ax.text()添加文本、ax.annotate()带箭头的标注、ax.axhline/axvline()添加参考线、ax.legend()添加图例',
      '保存与导出：fig.savefig(filename, dpi=300) 高分辨率图片；dpi=72适合屏幕，dpi=300适合打印；bbox_inches=\"tight\"避免内容被裁剪',
      '交互式可视化：plotly.express生成可交互HTML图表；支持缩放、平移、悬停提示、导出PNG；适合仪表盘和数据分析',
      '仪表盘设计：关键指标卡片+趋势图+分布对比+地理分布；保持信息层级清晰，突出核心KPI，辅助图表提供深度洞察',
      '常见错误：截断Y轴夸大差异、3D图表扭曲比例、饼图超过5块难读、颜色过多分散注意力、缺失图表标题和数据来源',
      '数据讲故事：背景→问题→数据洞察→结论→行动建议的叙事结构；用图表序列引导读者理解复杂问题',
      '工具链：matplotlib(基础) + seaborn(统计) + plotly(交互) + pyecharts(ECharts Python版) + Tableau/Power BI(商业BI)'
    ],
    codeExample: `import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

# 中文配置
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 模拟数据
months = [f'{i}月' for i in range(1, 13)]
sales = [100, 115, 130, 120, 145, 160, 155, 175, 190, 205, 220, 250]

# 创建图表
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# 1. 折线图：销售趋势
ax1.plot(months, sales, 'o-', color='#2E86AB', linewidth=2)
ax1.axhline(y=np.mean(sales), color='red', linestyle='--')
ax1.set_title('月度销售趋势', fontweight='bold')
ax1.set_xlabel('月份'); ax1.set_ylabel('销售额(万元)')
ax1.grid(True, alpha=0.3)

# 2. 柱状图：季度对比
q_sales = [sum(sales[i*3:(i+1)*3]) for i in range(4)]
ax2.bar(['Q1','Q2','Q3','Q4'], q_sales, color=['#2E86AB','#F4A261','#2A9D8F','#E63946'])
ax2.set_title('季度销售对比', fontweight='bold')
ax2.set_ylabel('销售额(万元)')

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
        title: '一、什么是分组聚类分析？',
        items: [
          '分组聚类分析：根据数据特征自动将相似对象分组的无监督学习方法',
          '与K-Means的区别：K-Means需预设K值，层次聚类可生成完整分层结构',
          '层次聚类：凝聚式(自底向上合并) vs 分裂式(自顶向下拆分)',
          'DBSCAN：基于密度的聚类，无需预设K，能发现任意形状簇',
          '核心价值：发现数据中的自然分组，为业务决策提供依据',
          '完整流程：数据准备→特征选择→算法选择→模型训练→结果解读'
        ]
      },
      {
        title: '二、运用场景',
        items: [
          '客户分群：根据购买行为、消费能力将客户分成不同群体',
          '产品分类：根据产品特征进行自动分类',
          '文档聚类：对新闻、文章进行主题分组',
          '异常检测：DBSCAN可识别噪声点（异常值）',
          '图像分割：对图像像素进行聚类分割',
          '基因分析：对基因表达数据进行聚类分析'
        ]
      },
      {
        title: '三、入门做法（新手级别）',
        items: [
          '使用scipy进行层次聚类：linkage()生成树状结构',
          '绘制树状图(dendrogram)可视化聚类层次',
          '使用fcluster()按指定K值切割树状图',
          '使用sklearn的DBSCAN进行密度聚类',
          '评估聚类效果：轮廓系数、ARI指标',
          '实战：对简单数据集进行层次聚类并解读结果'
        ]
      },
      {
        title: '四、进阶做法（中级级别）',
        items: [
          '选择合适的距离度量方法：Ward法、单链、全链、平均链',
          '使用K-距离图确定DBSCAN的eps参数',
          '对比K-Means、层次聚类、DBSCAN的结果',
          '处理大规模数据：采样或使用MiniBatchKMeans',
          '特征工程：选择有区分度的特征',
          '实战：对客户数据用三种算法聚类，对比选择最优方案'
        ]
      },
      {
        title: '五、高级做法（专家级别）',
        items: [
          '大规模数据聚类：使用faiss加速相似度计算',
          '时序聚类：对时间序列数据进行聚类',
          '半监督聚类：结合少量标签信息',
          '聚类融合：集成多种聚类结果',
          '可视化：t-SNE/UMAP降维后可视化聚类结果',
          '实战：构建企业级客户分群系统，支持实时更新'
        ]
      }
    ],
    keyPoints: [
      '定义：无监督学习方法，自动将相似对象分组',
      '场景：客户分群、产品分类、文档聚类、异常检测',
      '入门：层次聚类树状图、DBSCAN基础使用',
      '进阶：参数调优、多算法对比、特征工程',
      '高级：大规模数据、时序聚类、系统集成',
      '层次聚类类型：凝聚式(Agglomerative)自底向上合并、分裂式(Divisive)自顶向下拆分，实际中凝聚式更常用',
      '距离度量方法：欧式距离(Euclidean)用于数值特征、曼哈顿距离(Manhattan)抗异常值、余弦相似度(Cosine)用于文本向量',
      '链接方法：单链(Single)最近点距离、全链(Complete)最远点距离、平均链(Average)平均点距离、Ward法最小化方差增量(最常用)',
      '树状图解读：从下往上读取，横线高度=合并距离；切割高度决定聚类数量，切割越高簇数越少',
      '层次聚类复杂度：O(N³)时间和O(N²)内存，不适合超过10000条数据，大数据需先抽样或使用K-Means',
      'DBSCAN核心概念：核心点(半径eps内≥min_samples邻居)、边界点(非核心但在核心点邻域)、噪声点(既非核心也非边界)',
      'DBSCAN参数eps：邻域半径，太小导致簇碎片化噪声多，太大导致所有点成一簇，可用K-距离图的拐点确定',
      'DBSCAN参数min_samples：成为核心点所需邻居数，通常设为维度数×2或4-10，太小产生过多小簇，太大多数点变噪声',
      'DBSCAN优势：无需预设K、可发现任意形状簇(月牙形/环形)、自动识别噪声点、对初始值不敏感',
      'DBSCAN局限：高维数据距离度量失效、密度不均数据效果差、eps和min_samples对结果敏感',
      '聚类算法选型：小数据(<5000)优先层次聚类(解释性强)、大数据优先K-Means(速度快)、非球形+有噪声优先DBSCAN、文本数据优先层次聚类',
      '聚类结果评估：轮廓系数(Silhouette)[-1,1]越接近1越好、Calinski-Harabasz(越大越好)、Adjusted Rand Index(有真实标签时)',
      '稳定性验证：多次运行不同随机种子，观察各样本被分到同一簇的比例，高稳定性意味着结果可靠',
      '业务解读：聚类后必须进行业务命名(如「价格敏感型」「高价值低频」)，否则无法指导业务决策',
      '工具链：scipy.cluster.hierarchy(层次) + sklearn.cluster(DBSCAN/KMeans) + sklearn.metrics(评估) + faiss(大规模相似度搜索)'
    ],
    codeExample: `import numpy as np
import matplotlib.pyplot as plt
from scipy.cluster.hierarchy import linkage, dendrogram, fcluster
from sklearn.cluster import KMeans, DBSCAN
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score

np.random.seed(42)
# 模拟数据
c1 = np.random.normal([2,2], 0.4, (30,2))
c2 = np.random.normal([8,8], 0.4, (30,2))
c3 = np.random.normal([5,2], 0.4, (30,2))
X = np.vstack([c1,c2,c3])
X_scaled = StandardScaler().fit_transform(X)

# 1. 层次聚类
Z = linkage(X_scaled, method='ward')
labels_hc = fcluster(Z, t=3, criterion='maxclust')

# 2. DBSCAN
db = DBSCAN(eps=0.5, min_samples=5)
labels_db = db.fit_predict(X_scaled)

# 3. K-Means
km = KMeans(n_clusters=3, random_state=42, n_init=10)
labels_km = km.fit_predict(X_scaled)

# 评估对比
print(f'K-Means轮廓系数: {silhouette_score(X_scaled, labels_km):.3f}')
print(f'层次聚类轮廓系数: {silhouette_score(X_scaled, labels_hc):.3f}')
print(f'DBSCAN轮廓系数: {silhouette_score(X_scaled, labels_db):.3f}')`
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
        title: '一、什么是AB测试？',
        items: [
          'AB测试：将用户随机分成两组（A=对照组/B=实验组），对比两组核心指标差异的实验方法',
          '核心原理：通过随机分组确保两组用户特征相似，排除干扰因素',
          '关键要素：随机化、对照组、实验组、核心指标、统计检验',
          '原假设(H0)：A和B没有差异；备择假设(H1)：A和B有差异',
          'P值含义：假设H0为真时，观察到当前差异的概率',
          '两类错误：Type I错误（误报）、Type II错误（漏报）'
        ]
      },
      {
        title: '二、运用场景',
        items: [
          'UI/UX测试：按钮颜色、页面布局、交互流程优化',
          '算法优化：推荐算法、搜索算法新版本对比',
          '运营策略：促销活动、优惠券设计、定价策略',
          '文案测试：标题、描述、广告语的效果对比',
          '产品功能：新功能上线前的效果验证',
          '营销策略：不同营销渠道、投放方式对比'
        ]
      },
      {
        title: '三、入门做法（新手级别）',
        items: [
          '明确测试目标和核心指标（如转化率、点击率）',
          '简单随机分组：将用户随机分配到A组或B组',
          '收集基础数据：记录每组样本量和转化数',
          '计算转化率和差异：基础统计量计算',
          '使用Z检验判断差异是否显著',
          '实战：设计按钮颜色AB测试，分析结果'
        ]
      },
      {
        title: '四、进阶做法（中级级别）',
        items: [
          '样本量估算：根据预期效应量计算所需样本',
          'AA验证：确保随机分组有效',
          '置信区间：估算真实效应范围',
          'Wilson区间：小样本更准确的区间估计',
          '分层实验：多个实验同时进行',
          '实战：完整AB测试流程，从设计到报告'
        ]
      },
      {
        title: '五、高级做法（专家级别）',
        items: [
          '多变量测试：同时测试多个变量组合',
          '序列测试：自适应样本量分配',
          '贝叶斯方法：更灵活的统计推断',
          '因果推断：排除混淆变量影响',
          '实验平台搭建：自动化AB测试系统',
          '实战：构建企业级AB测试平台'
        ]
      }
    ],
    keyPoints: [
      '定义：随机分组对比实验，数据驱动决策的核心方法，通过对照组vs实验组对比验证策略效果',
      '场景：UI优化、算法测试、运营策略、文案对比、价格测试、促销活动、产品功能',
      '入门：随机分组、基础统计、Z检验判断显著性',
      '进阶：样本量估算、AA验证、置信区间、效应量',
      '高级：多变量测试(MVT)、贝叶斯方法、实验平台搭建',
      '原假设H0：A和B无真实差异；备择假设H1：A和B有差异',
      'p值含义：假设H0为真时，观察到当前差异(或更极端)的概率；p<0.05表示差异统计显著',
      '两类错误：Type I错误(误报)：实际无差异但判断有差异，概率=α；Type II错误(漏报)：实际有差异但判断无差异，概率=β',
      '功效(Power)=1-β：真实差异存在时能正确检测到的概率，行业标准Power≥80%',
      '样本量公式：n = 2×(Z_{α/2}+Z_β)²×p̄(1-p̄)/δ²；提前计算确保实验需要的最小样本量',
      '最小可检测效应(MDE)：能检测到的最小相对差异，MDE越小所需样本越多',
      'Z检验公式：Z = (p_B - p_A) / √[p_pool(1-p_pool)(1/n_A+1/n_B)；p_pool=(x_A+x_B)/(n_A+n_B)',
      't检验vs Z检验：小样本(<30)用t检验，大样本用Z检验；连续型指标(均值)用t检验，比例型指标(转化率)用Z检验',
      '95%置信区间：CI = 点估计±1.96×标准误；CI不包含0表示显著，CI越窄估计越精确',
      'Wilson置信区间：对小样本/低转化率比正态近似更可靠，永不超出[0,1]',
      'AA测试(AA Test)：实验前验证两组是否天然相等，确认随机分组有效；AA测试不显著才能开始AB测试结果才可信',
      '效应量(Effect Size)：衡量差异的实际大小，Cohen\'s d = (μ_B-μ_A)/σ_pool；小效应d=0.2，中效应d=0.5，大效应d=0.8',
      '统计显著≠业务显著：p<0.05且效应量大但业务价值可能很小；需同时看绝对提升值和ROI',
      '多元比较修正：多组比较用Bonferroni修正α_new=α/n，避免Type I错误膨胀',
      '序贯检验(Sequential Testing)：实验过程中多次查看结果提前停止；需用α消耗函数(Pocock/O\'Brien-Fleming修正',
      '贝叶斯AB测试：用后验分布计算P(B>A)直接给出B优于A的概率，更易解释但计算更直观',
      '常见陷阱：偷看数据偷看(p-hacking)、样本量不足、多重比较不修正、混淆变量、幸存者偏差、季节性影响',
      '工具链：scipy.stats(基础检验) + statsmodels(高级统计) + Plotly/Dash(可视化) + Optimizely/VWO(商业平台)'
    ],
    codeExample: `from scipy.stats import norm
import numpy as np

# AB测试数据
n_A, x_A = 5000, 250  # 对照组
n_B, x_B = 5000, 315  # 实验组

# 基础统计
p_A = x_A / n_A
p_B = x_B / n_B
abs_diff = p_B - p_A
rel_lift = abs_diff / p_A

print(f"对照组转化率: {p_A*100:.2f}%")
print(f"实验组转化率: {p_B*100:.2f}%")
print(f"绝对提升: {abs_diff*100:.2f}%  相对提升: {rel_lift*100:.2f}%")

# Z检验
p_pool = (x_A + x_B) / (n_A + n_B)
SE = (p_pool * (1 - p_pool) * (1/n_A + 1/n_B)) ** 0.5
z_stat = abs_diff / SE
p_value = 2 * (1 - norm.cdf(abs(z_stat)))

print(f"\nz统计量: {z_stat:.4f}")
print(f"p值: {p_value:.6f}")
print(f"显著性: {'✅ 显著' if p_value < 0.05 else '❌ 不显著'}")`
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
        title: '一、什么是店铺经营分析？',
        items: [
          '店铺经营分析：对店铺运营数据进行系统性分析，评估经营状况并提供决策支持',
          '核心目的：发现问题、找出机会、优化策略、提升业绩',
          '关键指标体系：销售额、客单价、转化率、复购率、毛利率',
          '分析维度：时间(日/周/月)、客户(新老/价值分层)、品类(贡献度)、地域(分布)',
          '分析方法论：描述性分析→诊断性分析→预测性分析→指导性分析',
          '数据来源：订单系统、POS系统、CRM系统、电商平台后台'
        ]
      },
      {
        title: '二、运用场景',
        items: [
          '日常运营监控：每日/每周KPI看板，实时掌握业务状况',
          '销售趋势分析：识别销售高峰低谷，优化库存和人员配置',
          '客户分析：客户分层、复购分析、留存分析',
          '品类分析：品类贡献度、价格带分析、商品优化',
          '异常诊断：识别异常波动，快速响应问题',
          '经营决策：制定促销策略、定价策略、渠道策略'
        ]
      },
      {
        title: '三、入门做法（新手级别）',
        items: [
          '收集基础数据：订单数据、访客数据、商品数据',
          '计算核心指标：销售额、订单数、客单价、转化率',
          '制作基础报表：日报、周报、月报模板',
          '绘制基础图表：折线图(趋势)、柱状图(对比)、饼图(占比)',
          '分析同环比：比较本期与上期、本期与去年同期',
          '实战：制作店铺月度经营报表'
        ]
      },
      {
        title: '四、进阶做法（中级级别）',
        items: [
          '多维度分析：时间、客户、品类、地域交叉分析',
          '客户分群：新老客户、价值分层、生命周期分析',
          '销售归因：促销活动、节假日、天气等因素影响分析',
          '可视化仪表盘：多图表组合展示关键指标',
          '异常检测：识别异常值并预警',
          '实战：构建店铺经营分析仪表盘'
        ]
      },
      {
        title: '五、高级做法（专家级别）',
        items: [
          '销售预测：时间序列预测未来销售趋势',
          '智能预警系统：自动化异常检测和预警',
          '经营模拟：What-if分析，评估策略影响',
          '数据驱动决策：建立决策模型支持经营决策',
          '自动化报表：定时生成并分发分析报告',
          '实战：构建企业级店铺经营分析平台'
        ]
      }
    ],
    keyPoints: [
      '定义：对店铺运营数据系统性分析，支持决策优化、发现机会、诊断问题',
      '场景：日常监控、趋势分析、客户分析、品类分析、经营决策',
      '入门：基础指标计算、同环比分析、简单图表、日报周报',
      '进阶：多维度交叉分析、客户分群、可视化仪表盘、异常诊断',
      '高级：销售预测、智能预警、经营模拟、数据驱动决策',
      '销售指标体系：GMV(成交总额)、销售额、订单数、客单价(AOV)、件单价、连带率',
      '流量指标：访客数(UV)、浏览量(PV)、人均浏览页、跳出率、停留时长',
      '转化指标：转化率(CVR)、加购率、下单率、支付率、退款率',
      '客户指标：新增客户数、活跃客户数、复购率、客户留存率、流失率、客户生命周期价值(LTV)',
      '商品指标：SKU数、动销率、售罄率、库存周转天数、缺货率、滞销品占比',
      '财务指标：毛利率、净利润率、营销费用率、获客成本(CAC)、ROI(投资回报率)',
      '同环比：环比=本期/上期-1反映短期变化；同比=本期/去年同期-1反映年度趋势；环比×同比结合判断',
      '时间维度：日(波动)、周(周循环)、月(月度目标)、季度(季节性)、年度(战略规划)',
      '客户维度：新客vs老客贡献、RFM分层客户价值、客户生命周期阶段(获客→成长→成熟→休眠→流失)',
      '商品维度：品类贡献分析、价格带分布、畅销Top10/滞销Bottom10、ABC分类(销售额占比)、新品vs老品',
      '地域维度：省份/城市销售分布、区域增长差异、渠道覆盖',
      '经营诊断：销售异常→拆解为流量×转化率×客单价；流量下降→检查渠道；转化下降→检查页面/价格；客单价→检查促销',
      '同店同比(SSSG)：剔除新店影响的真实增长，Same-Store Sales Growth反映核心经营健康度',
      '仪表盘设计：KPI卡片(核心指标+同环比) + 趋势图(时间变化) + 排行榜(Top贡献) + 分布分析(结构占比)',
      '工具链：Pandas(数据处理) + NumPy(统计计算) + Matplotlib/Seaborn(可视化) + Excel(传统报表) + BI工具(商业智能)'
    ],
    codeExample: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 模拟经营数据
dates = pd.date_range('2024-01-01', '2024-12-31', freq='D')
df = pd.DataFrame({
    '日期': dates,
    '访客数': np.random.randint(500, 2000, len(dates)),
    '订单数': np.random.randint(20, 200, len(dates)),
    '销售额': np.random.randint(2000, 20000, len(dates)),
    '成本': np.random.randint(1200, 12000, len(dates)),
})
df['客单价'] = df['销售额'] / df['订单数']
df['毛利率'] = (df['销售额'] - df['成本']) / df['销售额'] * 100
df['转化率'] = df['订单数'] / df['访客数'] * 100

# 月度汇总
monthly = df.groupby(df['日期'].dt.to_period('M')).agg({
    '销售额': 'sum', '订单数': 'sum', '访客数': 'sum'
}).reset_index()
monthly['客单价'] = monthly['销售额'] / monthly['订单数']
monthly['转化率'] = monthly['订单数'] / monthly['访客数'] * 100

# 可视化
fig, axes = plt.subplots(2, 2, figsize=(14, 8))
axes[0,0].plot(monthly['日期'].astype(str), monthly['销售额'], 'o-', color='#2E86AB')
axes[0,0].set_title('月度销售额趋势')
axes[0,1].bar(monthly['日期'].astype(str), monthly['客单价'], color='#F4A261')
axes[0,1].set_title('月度客单价')
axes[1,0].plot(monthly['日期'].astype(str), monthly['转化率'], 's-', color='#2A9D8F')
axes[1,0].set_title('月度转化率')
plt.tight_layout(); plt.show()`
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
        title: '一、什么是消费者行为分析？',
        items: [
          '消费者行为分析：研究消费者在获取、使用、处置产品或服务过程中的行为规律',
          '核心目的：理解客户需求、预测购买行为、优化营销策略',
          'AISAS模型：注意→兴趣→搜索→行动→分享',
          '购买决策五阶段：需求认知→信息搜集→方案评估→购买决策→购后行为',
          '影响因素：文化、社会、个人、心理、情境、渠道、产品',
          '数据来源：行为日志、交易数据、问卷调查、访谈'
        ]
      },
      {
        title: '二、运用场景',
        items: [
          '用户画像构建：基于行为数据描绘用户特征',
          '购买路径分析：分析用户从浏览到购买的转化路径',
          'RFM客户分群：根据消费行为对客户分层',
          'AARRR漏斗分析：用户增长全链路分析',
          '个性化推荐：基于用户偏好推荐商品',
          '流失预警：识别潜在流失用户并召回'
        ]
      },
      {
        title: '三、入门做法（新手级别）',
        items: [
          '收集用户行为数据：浏览、点击、加购、购买记录',
          '构建用户画像：基础属性+消费行为',
          'RFM基础应用：计算RFM值并简单分群',
          '绘制转化漏斗：PV→点击→加购→下单→支付',
          '分析留存曲线：Day1/Day7/Day30留存',
          '实战：基于用户数据完成基础行为分析'
        ]
      },
      {
        title: '四、进阶做法（中级级别）',
        items: [
          '深度RFM分析：多维度分群、策略制定',
          'AARRR全链路分析：获客→激活→留存→变现→推荐',
          '用户生命周期管理：不同阶段差异化策略',
          '购买路径分析：漏斗优化、流失节点识别',
          '简单推荐系统：基于协同过滤的商品推荐',
          '实战：构建完整的用户行为分析体系'
        ]
      },
      {
        title: '五、高级做法（专家级别）',
        items: [
          '行为预测模型：预测购买概率、流失风险',
          '个性化推荐系统：多算法融合推荐',
          '实时行为分析：实时用户行为流处理',
          '因果推断：分析营销策略的真实效果',
          '用户行为仿真：模拟用户行为优化策略',
          '实战：构建企业级消费者行为分析平台'
        ]
      }
    ],
    keyPoints: [
      '定义：研究消费者获取、使用、处置产品过程中的行为规律，理解用户需求优化产品和营销',
      '场景：用户画像构建、购买路径分析、RFM客户分群、AARRR增长漏斗、个性化推荐、流失预警',
      '入门：基础RFM、转化漏斗、留存曲线、用户画像',
      '进阶：深度RFM、全链路分析、客户生命周期管理、协同过滤推荐',
      '高级：行为预测、大规模推荐系统、实时行为分析、因果推断',
      'AISAS模型：Attention(注意)→Interest(兴趣)→Search(搜索)→Action(行动)→Share(分享)，传统购买决策模型',
      'AIDEA模型：Awareness(认知)→Interest(兴趣)→Desire(渴望)→Action(行动)→Loyalty(忠诚)，现代用户转化模型',
      'AARRR海盗指标：Acquisition(获客)→Activation(激活)→Retention(留存)→Revenue(变现)→Referral(推荐)，增长模型',
      'RFM详解：Recency(最近购买天数，越小越好)、Frequency(购买次数，越多越好)、Monetary(累计消费金额，越高越好)',
      'RFM分段：等频分段(qcut)比等宽分段(cut)更合理，每维分5段，5×5×5=125细分组或3×3×3=27粗分组',
      '客户分群解读：重要价值客户(R/F/M都高)→VIP服务、重要发展(F/M高R低)→激励复购、重要保持(M高R/F低)→召回唤醒、重要挽留(R/F/M都低)→强力召回',
      '客户生命周期：获客期(0-3月)→成长期(3-12月)→成熟期(1-3年)→休眠期(3-6月未购)→流失期(6月+未购)',
      '留存曲线：第N天留存率=N天后仍活跃用户/新增用户总数；次日留存≥40%/7日≥20%/30日≥10%为行业基准',
      '转化漏斗：曝光→点击→浏览→加购→下单→支付，每个环节都有流失；关注关键环节转化率和流失点',
      '客户价值计算：LTV(生命周期价值)=客单价×复购率×平均生命周期月数；LTV/CAC>3为健康',
      '协同过滤：User-based(相似用户推荐)、Item-based(相似商品推荐)、Model-based(矩阵分解)；计算相似度用余弦/皮尔逊相关',
      '用户画像标签体系：基础属性(性别/年龄/地域)、行为标签(频次/时段/品类偏好)、价值标签(消费等级/RFM分层)、预测标签(流失概率/下次购买时间)',
      '行为数据埋点：PV/UV、点击、加购、收藏、下单、支付、退款、搜索、评论、分享；定义事件名+属性+时间戳',
      '工具链：Pandas(特征工程) + Scikit-learn(聚类/推荐) + XGBoost(预测) + Surprise(推荐系统) + PySpark(大规模)'
    ],
    codeExample: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)
# 模拟用户数据
users = pd.DataFrame({
    '用户ID': range(1, 501),
    '最近购买天数': np.random.randint(1, 180, 500),
    '购买次数': np.random.randint(1, 30, 500),
    '累计消费额': np.random.uniform(100, 10000, 500),
})

# RFM打分
users['R_score'] = pd.qcut(users['最近购买天数'], 5, labels=[5,4,3,2,1]).astype(int)
users['F_score'] = pd.qcut(users['购买次数'].rank(method='first'), 5, labels=[1,2,3,4,5]).astype(int)
users['M_score'] = pd.qcut(users['累计消费额'].rank(method='first'), 5, labels=[1,2,3,4,5]).astype(int)

# 客户分群
def classify_rfm(row):
    if row['R_score'] >= 4 and row['F_score'] >= 4 and row['M_score'] >= 4:
        return '重要价值客户'
    elif row['F_score'] >= 4 and row['M_score'] >= 4:
        return '重要发展客户'
    elif row['R_score'] >= 4 and row['M_score'] >= 4:
        return '重要保持客户'
    elif row['R_score'] <= 2 and row['F_score'] <= 2 and row['M_score'] <= 2:
        return '重要挽留客户'
    else:
        return '一般客户'

users['客户类型'] = users.apply(classify_rfm, axis=1)
print("客户分群统计:")
print(users['客户类型'].value_counts())`
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
        title: '一、什么是市场分析？',
        items: [
          '市场分析：对市场规模、趋势、竞争格局、消费者需求进行系统性研究',
          '核心目的：了解市场机会、评估竞争态势、制定战略决策',
          '市场规模三层：TAM(潜在市场)→SAM(可服务市场)→SOM(可获得市场)',
          '分析维度：市场规模、增长率、竞争格局、消费者需求',
          '分析框架：PEST、波特五力、SWOT',
          '数据来源：行业报告、政府统计、企业财报、问卷调查'
        ]
      },
      {
        title: '二、运用场景',
        items: [
          '市场进入决策：评估目标市场的吸引力和可行性',
          '竞争策略制定：分析竞争对手，制定差异化策略',
          '产品定位：基于市场需求和竞争状况定位产品',
          '投资决策：评估投资机会和风险',
          '战略规划：制定企业中长期发展战略',
          '营销决策：制定有效的营销策略'
        ]
      },
      {
        title: '三、入门做法（新手级别）',
        items: [
          '收集市场数据：行业报告、新闻资讯、企业财报',
          '计算核心指标：市场规模、增长率、市场份额',
          'PEST分析：政治、经济、社会、技术环境',
          '简单竞争分析：主要竞争对手识别和对比',
          'SWOT分析：优势、劣势、机会、威胁',
          '实战：完成某行业基础市场分析报告'
        ]
      },
      {
        title: '四、进阶做法（中级级别）',
        items: [
          '深度竞争分析：波特五力模型、竞争雷达图',
          '市场预测：线性回归、趋势外推',
          'STP战略：市场细分、目标选择、定位',
          '4P营销组合：产品、价格、渠道、促销',
          '市场集中度分析：CR3/CR5/CR10',
          '实战：完成完整的市场分析报告'
        ]
      },
      {
        title: '五、高级做法（专家级别）',
        items: [
          '市场预测模型：多元回归、时间序列预测',
          '竞争模拟：博弈论分析竞争策略',
          '消费者洞察：深度访谈、焦点小组',
          '大数据市场分析：社交媒体分析、网络爬虫',
          '战略规划模型：情景分析、决策树',
          '实战：构建企业级市场分析平台'
        ]
      }
    ],
    keyPoints: [
      '定义：对市场规模、趋势、竞争格局、消费者需求进行系统性研究，为战略决策提供依据',
      '场景：市场进入决策、竞争策略制定、产品定位、投资评估、战略规划、营销资源分配',
      '入门：PEST宏观分析、SWOT分析、基础竞争分析、市场规模估算',
      '进阶：波特五力模型、市场预测、STP战略、4P营销组合',
      '高级：大数据市场分析、竞争模拟博弈、情景规划、战略决策模型',
      '市场规模三层模型：TAM(潜在市场总量→所有可能消费者)、SAM(可服务市场→产品能触达的)、SOM(可获得市场→自身能抢占的份额)',
      '增长率指标：CAGR(复合年增长率)=(期末值/期初值)^(1/年数)-1，消除波动反映长期增长趋势',
      '市场渗透率=当前用户数/潜在用户总数×100%，渗透率低增长空间大',
      'PEST分析：Political(政策法规)、Economic(经济环境GDP/利率/通胀)、Social(人口结构/消费习惯)、Technological(技术趋势/创新)',
      '波特五力：现有竞争者竞争程度、新进入者威胁、替代品威胁、供应商议价能力、买方议价能力，决定行业利润水平',
      'CR集中度指数：CR3/CR5/CR10=前N大企业市场份额总和，衡量市场垄断程度，CR4>50%为高度集中',
      'SWOT矩阵：Strength(优势-S)、Weakness(劣势-W)、Opportunity(机会-O)、Threat(威胁-T)，生成SO/ST/WO/WT四类策略',
      'STP战略：Segmentation(市场细分→按特征划分群体)、Targeting(目标选择→选吸引力最大的)、Positioning(定位→在目标客群心智中建立独特形象)',
      '4P营销组合：Product(产品/功能/质量/包装)、Price(价格/折扣/付款条件)、Place(渠道/仓储/物流)、Promotion(促销/广告/公关)，7P增加People/Process/Physical Evidence',
      '竞争对手分析框架：目标(战略意图)、假设(对手对行业的假设)、策略(当前策略)、能力(资源/能力)，预测对手反击',
      '市场调研方法：一手数据(问卷/访谈/实验)、二手数据(政府统计/行业报告/财报)、定性(深度访谈/焦点小组)、定量(问卷/AB测试)',
      '市场预测方法：定性(专家判断/德尔菲法)、定量(时间序列/回归分析/趋势外推)、情景分析(多情景预测)',
      '竞争雷达图：多维度(产品力/价格力/渠道力/品牌力/服务力)对比自身与竞品，优劣势一目了然',
      '工具链：Pandas(数据处理) + NumPy/SciPy(统计) + Matplotlib(可视化) + Scikit-learn(预测模型)'
    ],
    codeExample: `import pandas as pd
import numpy as np

# 市场历史数据
years = list(range(2018, 2025))
market_size = [3.2, 4.1, 5.3, 6.7, 8.2, 9.8, 11.5]  # 万亿元

# CAGR计算
start_val, end_val = market_size[0], market_size[-1]
n_years = len(years) - 1
cagr = (end_val / start_val) ** (1 / n_years) - 1

print(f"市场规模分析:")
print(f"2018年: {start_val:.1f}万亿元")
print(f"2024年: {end_val:.1f}万亿元")
print(f"CAGR: {cagr*100:.1f}%")

# 竞争格局
companies = ['企业A', '企业B', '企业C', '企业D', '其他']
shares = [32, 25, 18, 12, 13]
print(f"\n竞争格局:")
for c, s in zip(companies, shares):
    print(f"{c}: {s}%")
print(f"CR3: {sum(shares[:3])}%")`
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
        title: '一、什么是时间序列分析？',
        items: [
          '时间序列分析：对随时间变化的数据进行分析和预测的方法',
          '时间序列四要素：趋势(Trend) + 季节性(Seasonality) + 周期性(Cyclical) + 不规则波动(Irregular)',
          '核心目的：理解数据规律、预测未来值、识别异常',
          '常见应用：销售预测、库存管理、流量预测、经济预测',
          '关键特征：平稳性、自相关性、季节性',
          '分析流程：数据准备→探索性分析→模型选择→预测→评估'
        ]
      },
      {
        title: '二、运用场景',
        items: [
          '销售预测：预测未来销量，优化库存',
          '流量预测：预测网站/APP流量，配置资源',
          '经济预测：GDP、CPI等宏观经济指标预测',
          '需求预测：生产计划和供应链管理',
          '异常检测：识别业务异常波动',
          '趋势分析：识别长期发展趋势'
        ]
      },
      {
        title: '三、入门做法（新手级别）',
        items: [
          '数据准备：设置日期索引、处理缺失值',
          '可视化：绘制时间序列图观察趋势',
          '移动平均：MA7/MA30消除短期波动',
          '季节性识别：月度/季度聚合分析',
          '简单预测：趋势外推、平均值法',
          '实战：对销售数据进行基础时间序列分析'
        ]
      },
      {
        title: '四、进阶做法（中级级别）',
        items: [
          '季节性分解：分离趋势、季节、残差成分',
          '平稳性检验：ADF检验判断序列平稳性',
          '差分处理：一阶差分消除趋势',
          'ARIMA模型：自回归综合移动平均模型',
          '参数选择：ACF/PACF确定p、q值',
          '实战：用ARIMA对月度销售数据建模预测'
        ]
      },
      {
        title: '五、高级做法（专家级别）',
        items: [
          'SARIMA：考虑季节性的ARIMA模型',
          'Prophet：Facebook开源时间序列预测工具',
          '机器学习方法：LSTM、XGBoost时间序列',
          '多模型融合：集成多种预测模型',
          '实时预测：流式数据实时预测',
          '实战：构建企业级时间序列预测系统'
        ]
      }
    ],
    keyPoints: [
      '定义：对随时间变化的数据进行分析和预测的统计方法，发现规律并预测未来',
      '场景：销售预测、库存优化、流量预测、产能规划、经济预测、异常检测、需求预测',
      '入门：数据准备、时间索引、可视化、移动平均、简单趋势外推',
      '进阶：季节性分解、平稳性检验、ARIMA建模、参数选择',
      '高级：SARIMA季节性ARIMA、Prophet、机器学习方法(LSTM/XGBoost)、多模型融合',
      '时间序列四要素：Trend(趋势-长期增长/下降)、Seasonality(季节性-固定周期)、Cyclical(周期性-经济周期)、Irregular(不规则波动-随机噪声)',
      '加法模型vs乘法模型：加法y=Trend+Seasonal+Residual(季节波动幅度稳定)；乘法y=Trend×Seasonal×Residual(波动随趋势增大)',
      '时间数据准备：pd.to_datetime()转换日期、df.set_index(\'日期\')设置索引、pd.date_range()生成时间序列、df.resample(\'M\').sum()聚合',
      '滞后特征(Lag)：df.shift(1/7/30)创建滞后特征，diff()差分，rolling(window=7).mean()移动平均',
      '移动平均：MA7消除日波动观察周趋势，MA30消除周波动观察月趋势，MA90消除月波动观察长期趋势',
      '平稳性(Stationarity)：均值和方差不随时间变化、自协方差不依赖时间；非平稳序列需差分处理后才能建模',
      'ADF检验(Augmented Dickey-Fuller)：p<0.05拒绝原假设(非平稳)→序列平稳；否则需差分',
      '一阶差分：y_t - y_{t-1}消除线性趋势；二阶差分消除二次趋势；季节差分lag=12消除年度季节性',
      'ARIMA(p,d,q)：AR(p)自回归(当前值与前p期关系)、I(d)差分阶数、MA(q)移动平均(当前值与前q期误差关系)',
      'ACF/PACF确定p,q：ACF(自相关函数)截尾位置→MA(q)阶数；PACF(偏自相关函数)截尾位置→AR(p)阶数',
      'AIC/BIC准则：衡量模型拟合度与复杂度的平衡，值越小越好，用于自动选择最优(p,d,q)组合',
      'ARIMA建模步骤：1.可视化序列→2.平稳性检验→3.差分→4.确定p,q→5.拟合模型→6.残差诊断→7.预测',
      'SARIMA(p,d,q)(P,D,Q,s)：加入季节项，s=周期长度(如12)，适合有明显季节性的序列',
      'Prophet(脸书开源)：自动处理节假日效应、趋势拐点、周度/年度季节性；对缺失值和异常值不敏感；易于使用',
      '模型评估指标：MAE(平均绝对误差)、RMSE(均方根误差)、MAPE(平均绝对百分比误差，最直观)、R²(拟合优度)',
      '滚动预测(Rolling Forecast Origin)：每次用历史数据预测下一期，再将真实值加入训练集，模拟真实应用场景，评估更可靠',
      '机器学习时间序列：LSTM/GRU(深度学习)、XGBoost/LightGBM(用滞后特征做回归预测)、Temporal Fusion Transformer(最新SOTA)',
      'Prophet使用：fit(df[ds,y])→make_future_dataframe(periods=365)→predict(future)→plot()/plot_components()',
      '最佳实践：80/20训练测试集(时间切分不随机)、滚动验证评估、多模型对比、置信区间量化不确定性、定期重训练',
      '常见陷阱：过度拟合历史噪声、忽略季节性变化、不做差分直接建模非平稳序列、随机切分破坏时间关系、忽略节假日/特殊事件',
      '工具链：statsmodels(ARIMA/季节性分解) + prophet(Prophet) + scikit-learn(特征工程) + TensorFlow/PyTorch(深度学习)'
    ],
    codeExample: `import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.seasonal import seasonal_decompose

# 模拟月度销售数据
months = pd.date_range('2020-01', '2024-12', freq='MS')
trend = np.linspace(100, 300, len(months))
seasonal = 20 * np.sin(2 * np.pi * np.arange(len(months)) / 12)
sales = trend + seasonal + np.random.normal(0, 10, len(months))
ts = pd.Series(sales, index=months)

# 季节性分解
decomp = seasonal_decompose(ts, model='additive', period=12)

# ARIMA建模
model = ARIMA(ts, order=(2, 1, 2))
fitted = model.fit()

# 预测未来12个月
forecast = fitted.forecast(steps=12)
print("未来12个月预测:")
print(forecast.round(1))`
  }
};

function getIconColor(color: string): string {
  const colors: Record<string, string> = {
    blue: '#2563eb',
    green: '#16a34a',
    purple: '#9333ea',
    orange: '#ea580c',
    red: '#dc2626',
    pink: '#db2777',
    cyan: '#0891b2',
    indigo: '#4f46e5',
    teal: '#0d9488',
    gray: '#4b5563'
  };
  return colors[color] || '#2563eb';
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || '1');
  const project = projectsData[projectId as keyof typeof projectsData];
  const [currentSection, setCurrentSection] = useState(0);
  const [showCode, setShowCode] = useState(false);

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

  const headerGradient: Record<string, string> = {
    blue: 'from-blue-600 to-blue-800',
    green: 'from-green-600 to-green-800',
    purple: 'from-purple-600 to-purple-800',
    orange: 'from-orange-500 to-orange-700',
    red: 'from-red-500 to-red-700',
    pink: 'from-pink-500 to-pink-700',
    cyan: 'from-cyan-500 to-cyan-700',
    indigo: 'from-indigo-600 to-indigo-800',
    teal: 'from-teal-500 to-teal-700',
    gray: 'from-gray-600 to-gray-800'
  };
  const headerBg = headerGradient[project.color] || 'from-blue-600 to-blue-800';

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
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-white text-gray-700">
              {project.level}
            </span>
            <span className="text-gray-500 text-sm">约{project.duration}</span>
          </div>
        </div>
      </nav>

      {/* 头部信息 - 渐变背景 + 大图标 */}
      <section className={`pt-20 pb-12 px-4 bg-gradient-to-r ${headerBg} text-white relative overflow-hidden`}>
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="flex flex-col md:flex-row items-center mb-6 gap-6">
            {/* 项目大图标 */}
            <div className="p-8 rounded-3xl bg-white shadow-2xl flex-shrink-0">
              <IconComponent className="w-16 h-16" style={{ color: getIconColor(project.color) }} />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{project.name}</h1>
              <p className="text-white text-opacity-90 text-lg leading-relaxed">{project.description}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm px-5 py-3 rounded-lg">
              <div className="text-sm text-white text-opacity-80 mb-1">学习难度</div>
              <div className="font-bold text-lg">{project.level}</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm px-5 py-3 rounded-lg">
              <div className="text-sm text-white text-opacity-80 mb-1">预计时长</div>
              <div className="font-bold text-lg">{project.duration}</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm px-5 py-3 rounded-lg">
              <div className="text-sm text-white text-opacity-80 mb-1">前置知识</div>
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
