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
        title: '第一阶段：数据质量问题诊断',
        items: [
          '什么是脏数据？现实世界中的数据质量问题有哪些',
          '使用 df.info() 和 df.describe() 快速诊断数据质量',
          '缺失值（NaN/None/null）的成因与影响分析',
          '重复记录的来源：同一用户重复提交、数据合并遗漏等',
          '异常值的定义：统计异常 vs 业务异常',
          '数据类型错误：字符串当成数字、格式不一致等',
          '实战：用 Pandas 读取真实 CSV 文件并生成质量报告'
        ]
      },
      {
        title: '第二阶段：缺失值处理方法',
        items: [
          '识别缺失值：df.isnull() / df.notnull() 的使用场景',
          '删除法：dropna(thresh=N) 保留有效数据比例高的行',
          '均值/中位数填充：数值列的常用填充策略',
          '众数填充：分类变量的缺失值填充',
          '向前/向后填充(ffill/bfill)：时间序列数据的特殊处理',
          '多重插补法：使用 sklearn 的 IterativeImputer',
          '业务规则填充：基于业务逻辑的定制填充方案',
          '实战：对电商用户数据综合使用多种填充策略'
        ]
      },
      {
        title: '第三阶段：去重与异常值检测',
        items: [
          '完全重复行：df.drop_duplicates() 全部字段匹配去重',
          "部分字段去重：subset=['字段1','字段2'] 条件去重",
          '基于时间的去重策略：保留最新或最旧记录',
          'IQR方法：Q1/Q3/四分位距计算异常值判定阈值',
          'Z-score方法：均值±3倍标准差判定极端异常',
          '散点图可视化：肉眼识别异常分布模式',
          '箱线图结合业务逻辑：统计异常≠业务异常的处理',
          '异常值处理三选择：删除 / 缩尾(Winsorize) / 单独建模'
        ]
      },
      {
        title: '第四阶段：数据类型转换与格式化',
        items: [
          '自动类型推断的坑：Pandas dtype 与 Python 原生类型差异',
          'astype() 强制类型转换与 pd.to_numeric() 安全转换',
          '字符串处理：strip() / lower() / replace() 清洗空格和大小写',
          '日期解析：pd.to_datetime() vs datetime.strptime()',
          '字符串日期格式："%Y-%m-%d" / "%Y/%m/%d" / "2024年06月01日"',
          '数值格式化：千分位符号(¥1,234)、百分比(23.5%)、科学计数法',
          '分类编码：LabelEncoder vs One-Hot Encoding 的选择',
          '数据标准化：MinMaxScaler vs StandardScaler 的适用场景'
        ]
      },
      {
        title: '第五阶段：正则表达式与数据验证',
        items: [
          '正则基础：字符类[abc]、量词{3,}、边界^$的用法',
          '手机号验证：^1[3-9]\\d{9}$ 的原理拆解',
          '邮箱验证：\\w+@\\w+\\.\\w+ 的匹配逻辑',
          '中文提取：[\u4e00-\u9fa5] 匹配中文字符',
          '批量替换：df[\'列\'].str.replace(pat, repl, regex=True)',
          '数据格式校验：身份证号18位、日期合法性等规则验证',
          'df.apply() 自定义验证函数：逐行/逐列校验数据质量',
          '数据清洗报告：统计各类问题占比，形成清洗记录文档',
          '实战：完整清洗一份包含以上所有问题的真实数据'
        ]
      }
    ],
    keyPoints: [
      'df.isnull() / df.info() / df.describe() 三步快速诊断数据质量',
      '缺失值处理：删除法(行/列) / 填充法(均值/中位数/众数/业务规则)',
      '去重策略：完全去重 vs 部分字段去重 vs 时间序列去重',
      '异常值检测：IQR法(适合非正态分布) / Z-score法(适合正态分布)',
      '数据类型转换：astype强制转换 vs pd.to_numeric/to_datetime安全转换',
      '正则表达式：\\d匹配数字、\\w匹配字母数字、^$边界、.任意字符',
      '数据验证：apply自定义规则 + replace/sub+正则批量清洗',
      '清洗质量评估：用 df.isnull().sum() / df.duplicated().sum() 收尾验证',
      '企业实战经验：永远保留原始数据副本，先验证再覆盖原数据'
    ],
    codeExample: `import pandas as pd
import numpy as np

# ===== Step 1: 读取并初步诊断 =====
df = pd.read_csv('sales_data.csv')
print("=== 数据基本信息 ===")
print(f"数据形状: {df.shape}")
print(f"数据类型:\n{df.dtypes}")
print(f"\n=== 缺失值统计 ===")
print(df.isnull().sum())
print(f"\n=== 重复行数: {df.duplicated().sum()} ===")

# ===== Step 2: 处理缺失值 =====
# 数值列用均值填充
df['年龄'].fillna(df['年龄'].mean(), inplace=True)
# 分类列用众数填充
df['城市'].fillna(df['城市'].mode()[0], inplace=True)
# 日期列用向前填充
df['注册日期'].fillna(method='ffill', inplace=True)

# ===== Step 3: 去重 =====
df.drop_duplicates(subset=['用户ID', '订单号'], keep='first', inplace=True)

# ===== Step 4: 异常值检测(IQR法) =====
Q1 = df['订单金额'].quantile(0.25)
Q3 = df['订单金额'].quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR
outliers = df[(df['订单金额'] < lower) | (df['订单金额'] > upper)]
print(f"\n=== 异常值数量: {len(outliers)} ===")
df = df[(df['订单金额'] >= lower) & (df['订单金额'] <= upper)]

# ===== Step 5: 数据类型转换 =====
df['订单金额'] = pd.to_numeric(df['订单金额'].astype(str).str.replace(',',''), errors='coerce')
df['注册日期'] = pd.to_datetime(df['注册日期'], errors='coerce')

# ===== Step 6: 清洗后验证 =====
print(f"\n=== 清洗后数据形状: {df.shape} ===")
print(df.info())
print(df.describe())`
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
        title: '第一阶段：关联规则核心概念',
        items: [
          '什么是购物篮分析？「尿布与啤酒」的经典故事',
          '支持度(Support)：该组合出现的频率，反映普遍性',
          '置信度(Confidence)：P(B|A) = 同时含AB的交易 / 含A的交易',
          '提升度(Lift)：置信度 / P(B)，衡量关联强度的纯度',
          '常用阈值：支持度≥1%、置信度≥50%、提升度>1 为有效规则',
          '关联规则的商业场景：货架摆放 / 交叉销售 / 促销选品 / bundling套餐',
          '实战：分析超市1000条交易，找出提升度最高的5条规则'
        ]
      },
      {
        title: '第二阶段：数据准备与编码',
        items: [
          '交易数据格式：list of list vs DataFrame vs Series',
          'TransactionEncoder：把交易列表转成 One-Hot 宽表',
          'min_support 参数的意义：设太低计算慢，设太高可能无结果',
          'use_colnames=True：输出项集名称而非列索引',
          'mlxtend 安装与使用：pip install mlxtend',
          '处理不支持 mlxtend 的情况：纯 Python 手写 Apriori 原理',
          '实战：把原始购物小票文本转成可用于分析的 one-hot 矩阵'
        ]
      },
      {
        title: '第三阶段：频繁项集挖掘',
        items: [
          'Apriori 算法原理：先验性质——若{A,B}频繁则{A}和{B}也频繁',
          '连接步：Lk-1 × Lk-1 生成候选项集 Ck',
          '剪枝步：Ck 中删除支持度 < min_support 的候选项',
          '逐层迭代：直到不再产生新的频繁项集',
          '支持度阈值选择：根据数据规模调整（1%=100条/万条数据）',
          '多种最小支持度对比：观察项集数量与质量的变化',
          '实战：对某电商订单数据挖掘频繁3项集，分析高组合价值商品'
        ]
      },
      {
        title: '第四阶段：关联规则生成与筛选',
        items: [
          '从频繁项集生成关联规则：A→B，A∩B为频繁项集',
          '筛选指标：lift > 1（正相关）/ lift < 1（负相关）/ lift = 1（独立）',
          'conviction 置信度：P(A)×(1-P(B)) / P(A∩~B)，衡量反向预测能力',
          'leverage 杠杆率：P(A∩B) - P(A)×P(B)，衡量超出独立假设的程度',
          '按 lift 降序排序，取 Top10 高价值规则',
          '规则去重：合并等价规则（如 A→B 与 ~B→~A）',
          '实战：从 Top 规则中提炼3条可执行的业务建议（如商品联动摆放）'
        ]
      },
      {
        title: '第五阶段：实战应用与可视化',
        items: [
          '置信度-支持度散点图：找出高支持+高置信的「黄金规则」象限',
          '热力图展示规则强度：行=前件，列=后件，颜色深浅=lift',
          '商品推荐引擎：基于已有购物车内容，推荐关联度最高的商品',
          '货架优化：根据商品共现频率设计最优摆放方案',
          '促销选品：选择哪些商品做捆绑促销效果最好',
          '综合实战：对真实零售数据集完成从数据清洗→规则挖掘→业务建议的全流程'
        ]
      }
    ],
    keyPoints: [
      '支持度(Support)=含AB交易/总交易，反映商品组合的普遍程度',
      '置信度(Conf)=P(B|A)=含AB交易/含A交易，反映购买A后买B的概率',
      '提升度(Lift)=Conf/P(B)，>1为正相关，=1为独立，<1为负相关',
      'Apriori原理：频繁项集的子集必然频繁，非频繁项集的超集必然非频繁',
      '规则筛选：优先关注 lift>1.5 + 支持度>1% + 置信度>50% 的规则',
      '商业应用：货架联动摆放、个性化推荐、促销套餐设计、用户流失预警',
      'mlxtend.frequent_patterns：apriori()挖掘频繁项集，association_rules()生成规则',
      '可视化：散点图(lift vs support)、热力图(商品共现矩阵)、网络图(规则关系)'
    ],
    codeExample: `import pandas as pd
import numpy as np

# ===== Step 1: 准备交易数据 =====
transactions = [
    ['牛奶', '面包'], ['面包', '尿布', '啤酒', '鸡蛋'],
    ['牛奶', '鸡蛋'], ['面包', '鸡蛋'], ['牛奶', '面包', '尿布'],
    ['啤酒', '尿布'], ['牛奶', '面包', '鸡蛋'], ['面包', '尿布'],
]

# ===== Step 2: One-Hot 编码 =====
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules

te = TransactionEncoder()
df = pd.DataFrame(te.fit_transform(transactions), columns=te.columns_)

# ===== Step 3: 挖掘频繁项集 =====
freq = apriori(df, min_support=0.2, use_colnames=True)
print("=== 频繁项集 ===")
print(freq.sort_values('support', ascending=False))

# ===== Step 4: 生成关联规则 =====
rules = association_rules(freq, metric="lift", min_threshold=1.0)
rules = rules.sort_values('lift', ascending=False)
print("\n=== Top 10 高价值规则 ===")
top = rules[['antecedals', 'consequents', 'support', 'confidence', 'lift']].head(10)
top['antecedals'] = top['antecedals'].apply(lambda x: ', '.join(list(x)))
top['consequents'] = top['consequents'].apply(lambda x: ', '.join(list(x)))
print(top.to_string(index=False))

# ===== Step 5: 业务解读 =====
print("\n=== 业务建议 ===")
for _, row in rules.head(3).iterrows():
    a = ', '.join(list(row['antecedals']))
    b = ', '.join(list(row['consequents']))
    print(f"推荐：购买{a}的顾客，可推荐{b}（提升度={row['lift']:.2f}，置信度={row['confidence']:.0%}）")`
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
        title: '第一阶段：客户分群基础概念',
        items: [
          '为什么要做客户分群？「一刀切营销」vs「精准营销」的效果差异',
          '基于规则的RFM分群：Recency/Frequency/Monetary 三维度打分的原理',
          '基于模型的聚类分群：让算法自动发现客户群，无需预先定义规则',
          '聚类分群的商业价值：差异化运营、精准推送、资源优化配置',
          '常用聚类算法：K-Means（快速，适合球形簇）/ 层次聚类（可解释性强）/ DBSCAN（自动K，无需预设）',
          '聚类分析完整流程：数据准备→特征工程→建模→评估→业务解读',
          '实战：用真实电商客户数据做一次完整的客户分群分析'
        ]
      },
      {
        title: '第二阶段：数据准备与特征工程',
        items: [
          '聚类特征选择原则：选取业务相关、区分度高的特征',
          '用户画像指标体系：消费类(金额/频次/客单价) + 行为类(浏览/收藏/加购) + 属性类(年龄/地域/性别)',
          '特征构建实例：从原始订单表 groupby 生成 R/F/M 衍生指标',
          '为什么必须标准化？消费额(万元) vs 频次(次)，量纲差异导致算法失效',
          'StandardScaler（均值归零方差归一）：适合有明确均值含义的业务场景',
          'MinMaxScaler（归一化到0~1）：适合需要保持原始比例的场景',
          '特征降维PCA：超过10个特征时用PCA压缩到3~5维便于可视化',
          '实战：构建包含8个特征的客户特征宽表，完成标准化处理'
        ]
      },
      {
        title: '第三阶段：K-Means 聚类原理与实现',
        items: [
          'K-Means 算法原理：随机选K个中心点 → 分配最近样本 → 更新中心 → 迭代收敛',
          '距离度量：欧氏距离 vs 曼哈顿距离，sklearn 默认用欧氏距离',
          '初始中心敏感性问题：random_state 不同结果可能不同',
          'n_init 参数：运行多次取最优（默认10次），避免局部最优',
          'max_iter：最大迭代次数，一般100~300足够',
          'K-Means++ 初始化：智能选择初始中心，避免随机性带来的不稳定',
          '实战：对4维客户数据执行K-Means(n_clusters=4)，解读各簇中心点含义'
        ]
      },
      {
        title: '第四阶段：确定最佳K值',
        items: [
          '肘部法则(Elbow Method)：绘制K=1~10的inertia（簇内平方和），找下降变缓的「肘点」',
          '为什么 inertia 总是随K递减？K越大，簇越细分，簇内距离必然减小',
          '肘部法则的局限：当数据分布没有明显肘点时难以判断',
          '轮廓系数(Silhouette Score)：越接近1越好，衡量簇内紧密度与簇间分离度',
          '轮廓系数公式：(b-a)/max(a,b)，a=样本到同簇其他点的平均距离，b=样本到最近异簇的平均距离',
          'Davies-Bouldin指数：越小越好，衡量簇内分散度与簇间距离的比值',
          'Calinski-Harabasz指数：越大越好，衡量簇间离散度与簇内离散度的比值',
          '实战：绘制K=2~8的肘部图+轮廓系数图，综合判断最优K'
        ]
      },
      {
        title: '第五阶段：聚类结果分析与业务应用',
        items: [
          '簇中心解读：用雷达图展示各簇在8个特征上的得分差异',
          '客户画像生成：给每个簇命名（如「高价值沉睡户」「低频新客」「活跃忠诚客」）',
          '簇大小分布：各簇客户数量占比，业务优先级排序',
          '交叉分析：各簇的渠道偏好、品类偏好、促销敏感度',
          '精准营销策略：VIP客户发专属优惠券、沉睡客户推召回活动、低价值客户降低运营投入',
          '聚类稳定性验证：用不同 random_state 多次聚类，观察簇成员变化比例',
          '聚类结果可视化：散点图（2维投影）、t-SNE降维可视化、雷达图对比各簇特征',
          '实战：对真实客户数据完成聚类，并输出各簇的精准营销建议报告'
        ]
      }
    ],
    keyPoints: [
      '聚类分析流程：选特征→标准化→确定K→K-Means→评估→业务解读',
      '标准化是必须步骤：量纲不一致会导致距离计算失效',
      'K-Means原理：随机初始化K中心→E步分配样本→M步更新中心→迭代直到收敛',
      '确定K值：肘部法则（inertia下降变缓）+ 轮廓系数（越接近1越好）',
      '簇中心解读：各特征均值描述该簇的典型特征，结合业务命名',
      '雷达图：多维度簇特征对比的标准可视化方式',
      '聚类不是终点：结果必须结合业务知识做解读和策略制定',
      '稳定性验证：多次聚类（不同random_state）观察结果一致性'
    ],
    codeExample: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score

# ===== Step 1: 构建客户特征宽表 =====
df = pd.DataFrame({
    '客户ID': range(1, 201),
    '年龄': np.random.randint(18, 60, 200),
    '月消费额': np.random.uniform(200, 8000, 200),
    '月消费次数': np.random.randint(1, 30, 200),
    '平均客单价': np.random.uniform(20, 500, 200),
    '注册时长_月': np.random.randint(1, 48, 200),
})
df['客单价'] = df['月消费额'] / (df['月消费次数'] + 1)
features = ['月消费额', '月消费次数', '平均客单价', '注册时长_月']

# ===== Step 2: 标准化 =====
X = df[features].values
X_scaled = StandardScaler().fit_transform(X)

# ===== Step 3: 肘部法则 + 轮廓系数 =====
K_range = range(2, 9)
inertias, silhouettes = [], []
for k in K_range:
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    km.fit(X_scaled)
    inertias.append(km.inertia_)
    silhouettes.append(silhouette_score(X_scaled, km.labels_))

# ===== Step 4: 绘图 =====
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))
ax1.plot(K_range, inertias, 'bo-')
ax1.set_title('肘部法则'); ax1.set_xlabel('K'); ax1.set_ylabel('Inertia')
ax2.plot(K_range, silhouettes, 'ro-')
ax2.set_title('轮廓系数'); ax2.set_xlabel('K'); ax2.set_ylabel('Silhouette')
plt.tight_layout(); plt.show()

# ===== Step 5: 最优K聚类 =====
best_k = list(K_range)[np.argmax(silhouettes)]
print(f'最优K={best_k} (轮廓系数={max(silhouettes):.3f})')
km = KMeans(n_clusters=best_k, random_state=42, n_init=10)
df['簇'] = km.fit_predict(X_scaled)

# ===== Step 6: 簇画像 =====
print("\n=== 各簇客户特征均值 ===")
print(df.groupby('簇')[features].mean().round(1))`
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
        title: '第一阶段：图表选择与设计原则',
        items: [
          '为什么要可视化？人类对图形的信息吸收速度是文字的6万倍',
          '图表选择指南：比较→柱/条形图、趋势→折线图、占比→饼图、关系→散点图、分布→直方图',
          '设计基本原则：删除冗余笔墨（Edward Tufte的「数据墨水比」理论）',
          '色彩使用：配色不超过5种、优先用「图表背景色 vs 数据色」对比色、避免红绿搭配',
          '标题与标注：图表要有「一句话结论」标题，坐标轴标签要完整，避免「数据1/数据2」式无意义标签',
          '常见错误：截断Y轴夸大差异、3D效果扭曲比例、饼图超过5块分类',
          '实战：用同一份数据制作4种不同图表，对比哪种最能传达核心信息'
        ]
      },
      {
        title: '第二阶段：Matplotlib 核心语法',
        items: [
          'matplotlib 架构：Figure（画布）→ Axes（坐标系）→ Axis（坐标轴）→ Artist（所有可见对象）',
          '面向过程（plt.bar()）vs 面向对象（ax.bar()）两种写法的区别与适用场景',
          'Figure 大小与 DPI：figsize=(12,6) 控制比例，dpi=150 适合网页展示',
          '中文乱码解决：plt.rcParams[\'font.sans-serif\'] = [\'SimHei\'] + plt.rcParams[\'axes.unicode_minus\']=False',
          '坐标轴精细控制：set_xticks() / set_xlim() / set_xlabel() / ax.bar_label() 数值标签',
          '多子图：plt.subplots(nrows=2, ncols=2, figsize=(12,8)) 一次性创建多个子图',
          '图例与注释：ax.legend() / ax.annotate(\'关键点\', xy=(x,y), xytext=(x+2,y+5), arrowprops=dict(...))',
          '实战：制作一个包含柱图、折线图、散点图的综合仪表盘'
        ]
      },
      {
        title: '第三阶段：Seaborn 高级统计图',
        items: [
          'Seaborn vs Matplotlib：Seaborn 是统计可视化库，内置置信区间和统计检验',
          '关系图 sns.relplot()：散点图+回归线，hue=\'分组\', style=\'分组\', size=\'变量\'',
          '分布图 sns.histplot() / kdeplot()：直方图+核密度估计，binwidth 调整分组宽度',
          '热力图 sns.heatmap()：相关系数矩阵、业务数据矩阵，annot=True 显示数值，cmap=\'YlOrRd\' 控制配色',
          'pairplot()：所有数值变量两两配对散点图，快速发现变量间关系',
          '分类图 sns.catplot()：箱线图violinplot / 条形图barplot / 点图stripplot',
          'Seaborn 主题：sns.set_style(\'whitegrid\') / \'darkgrid\' / \'ticks\'，sns.despine() 去边框线',
          '实战：用 seaborn 分析某数据集的相关性、分布和分组差异'
        ]
      },
      {
        title: '第四阶段：实战图表与报告',
        items: [
          '月销售趋势图：折线图 + 均值参考线 + 同比增长率标注',
          '品类销售对比：分组柱状图 + 堆叠柱状图 + 百分比堆叠柱状图的选择',
          '转化漏斗图：AARRR 各阶段用户数可视化，条形图按序排列',
          '地理数据可视化：用饼图/柱图代替地图（避免地图比例失真问题）',
          '相关性热力图：df.corr() → sns.heatmap(annot=True, fmt=\'.2f\')，发现高度相关变量',
          '组合图：大图+小图的布局（如：上方大折线图 + 下方各品类柱图）',
          '导出高清图：fig.savefig(\'chart.png\', dpi=300, bbox_inches=\'tight\') 适合报告打印',
          '实战：基于真实电商数据，完成一份包含5张图的销售分析报告'
        ]
      }
    ],
    keyPoints: [
      '图表选择原则：比较→柱图、趋势→折线、占比→饼图、关系→散点、分布→直方图',
      'Matplotlib 架构：Figure（画布）→ Axes（坐标系）→ Axis（坐标轴）',
      '中文配置：rcParams[font.sans-serif]=[SimHei] + axes.unicode_minus=False',
      'Seaborn：基于 matplotlib 的统计可视化，自动带置信区间，hue 分组染色',
      '热力图：sns.heatmap(annot=True, fmt=\'.2f\', cmap=YlOrRd) 展示相关性/业务矩阵',
      '导出：fig.savefig(dpi=300, bbox_inches=tight) 适合报告打印的高清图',
      '设计原则：删除冗余元素、一图一结论、配色不超过5种、坐标轴从0开始',
      '组合图：plt.subplots共享X轴/调整子图间距hspace/wspace，适合仪表盘'
    ],
    codeExample: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 模拟月销售数据
months = [f'{i}月' for i in range(1, 13)]
sales = [100, 115, 130, 120, 145, 160, 155, 175, 190, 205, 220, 250]
online = [30, 38, 45, 50, 60, 72, 80, 95, 110, 125, 140, 165]
offline = [s - o for s, o in zip(sales, online)]

# 创建组合图
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# (1) 总销售趋势
ax1 = axes[0, 0]
ax1.plot(months, sales, 'o-', linewidth=2.5, color='#2E86AB', label='总销售额')
ax1.axhline(y=np.mean(sales), color='red', linestyle='--', label=f'年均{np.mean(sales):.0f}')
ax1.set_title('2024年月度销售趋势', fontsize=12, fontweight='bold')
ax1.legend(); ax1.grid(True, alpha=0.3)

# (2) 线上线下对比堆叠柱图
ax2 = axes[0, 1]
x = np.arange(len(months))
ax2.bar(x, offline, label='线下', color='#F4A261')
ax2.bar(x, online, bottom=offline, label='线上', color='#2E86AB')
ax2.set_xticks(x[::2]); ax2.set_xticklabels([months[i] for i in range(0,12,2)])
ax2.set_title('线上线下销售对比(堆叠)', fontsize=12, fontweight='bold')
ax2.legend()

# (3) 月度占比饼图
ax3 = axes[1, 0]
ax3.pie(sales[-4:], labels=months[-4:], autopct='%.1f%%',
        colors=['#2E86AB','#E63946','#F4A261','#2A9D8F'])
ax3.set_title('Q4各月销售额占比', fontsize=12, fontweight='bold')

# (4) 销售分布箱线图
ax4 = axes[1, 1]
q_sales = [sales[i*3:(i+1)*3] for i in range(4)]
bp = ax4.boxplot(q_sales, labels=['Q1','Q2','Q3','Q4'], patch_artist=True)
for patch, color in zip(bp['boxes'], ['#2E86AB','#F4A261','#2A9D8F','#E63946']):
    patch.set_facecolor(color)
ax4.set_title('各季度销售分布', fontsize=12, fontweight='bold')
ax4.set_ylabel('销售额(万元)')

plt.tight_layout()
fig.savefig('sales_report.png', dpi=150, bbox_inches='tight')
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
        title: '第一阶段：层次聚类原理与树状图',
        items: [
          '层次聚类 vs K-Means：层次聚类无需预设K，可生成从1到N的所有分层方案',
          '凝聚层次聚类（Agglomerative）：每样本单独成簇→逐步合并最近的两个簇→直到只剩一个大簇',
          '分裂层次聚类（Divisive）：从一个大簇开始→逐步拆分成更小的簇（实际中不常用）',
          '距离计算方法：单链(Single Linkage)最近点距离 / 全链(Complete)最远点距离 / 平均链(Avg) / Ward(方差最小化)',
          '树状图(Dendrogram)解读：从下往上看，每合并一次画一条横线，横线高度=合并距离',
          '如何从树状图读出聚类数量：在某高度「横切」，切到的分叉数=K',
          '实战：对客户数据做层次聚类，绘制树状图并解读其含义'
        ]
      },
      {
        title: '第二阶段：层次聚类实现与参数调优',
        items: [
          'scipy.cluster.hierarchy.linkage()：method参数=single/complete/average/ward',
          'Ward方法：最小化合并导致的方差增量，是最常用的层次聚类距离',
          'linkage 输出格式：每行[idx_A, idx_B, 距离, 新簇样本数]，共 N-1 行',
          'fcluster() 切割树状图：criterion=maxclust（指定K数）/ distance（指定距离阈值）',
          'dendrogram() 可视化：leaf_rotation=45 防标签重叠、color_threshold=着色阈值',
          '层次聚类复杂度：O(N²) 内存，O(N²logN) 时间，不适合超过10000条数据',
          '实战：用 linkage + dendrogram + fcluster 完成客户分群，并与 K-Means 结果对比'
        ]
      },
      {
        title: '第三阶段：DBSCAN 密度聚类原理',
        items: [
          'DBSCAN 核心思想：密度高的区域成一簇，密度低的区域视为噪声',
          '三个概念：核心点（半径 eps 内有≥min_samples个邻居）、边界点（密度不足但在核心点邻域）、噪声点（既不是核心也不是边界）',
          '为什么 DBSCAN 不需要预设K？聚类数量由数据密度自然决定',
          '为什么 DBSCAN 能发现任意形状簇？K-Means 只发现球形簇，DBSCAN 可以发现月牙形、环形等复杂形状',
          '核心参数 eps：半径大小，决定「多近算邻居」，太小→噪声多，太大→所有点成一簇',
          '核心参数 min_samples：成为核心点所需的最少邻居数，太小→产生很多小簇，太大→大部分点变成噪声',
          'K-距离图(K-Distance Plot)确定eps：对每个点计算到第K个最近邻的距离，排序后找「陡增点」作为eps',
          '实战：对含噪声的2D数据集做 DBSCAN，对比 K-Means 的结果差异'
        ]
      },
      {
        title: '第四阶段：算法对比与实战选择',
        items: [
          'K-Means vs 层次聚类 vs DBSCAN：K-Means(快速/球形/K预设) vs 层次(可解释/任意形状/大N不行) vs DBSCAN(自动K/任意形状/参数敏感)',
          '选型建议：小数据(<5000条)优先层次聚类（可解释性强）；大数据优先 K-Means；形状复杂或含噪声优先 DBSCAN',
          '聚类质量评估：Adjusted Rand Index(ARI)对比两种聚类结果的一致性',
          '聚类稳定性：多次聚类（不同随机种子），观察各样本被分到同一簇的比例',
          '轮廓系数对比：分别计算 K-Means 和层次聚类在相同K下的轮廓系数，取高者',
          '业务可行性：聚类结果中每簇样本量不能过少（至少占总样本1%）',
          '实战：对同一份客户数据，分别用三种方法聚类，对比结果并输出最优方案的业务建议'
        ]
      }
    ],
    keyPoints: [
      '层次聚类：凝聚(自底向上合并) vs 分裂(自顶向下拆分)，Ward法是最常用距离',
      '树状图：横切树状图得K个簇，切割高度越高→簇越少，越低→簇越多',
      'DBSCAN三概念：核心点(邻域≥min_samples) / 边界点(在核心邻域) / 噪声点(孤立)',
      'DBSCAN参数：eps(邻域半径)用K-距离图找拐点，min_samples=4~10',
      'DBSCAN优势：无需预设K、可发现任意形状、自动识别噪声',
      '选型原则：小数据→层次聚类，大数据→K-Means，复杂形状+噪声→DBSCAN',
      '层次聚类复杂度O(N²)，不适合超大数据；K-Means O(NKI) 可处理大N',
      '稳定性验证：调整参数或随机种子，多次聚类观察结果一致性'
    ],
    codeExample: `import numpy as np
import matplotlib.pyplot as plt
from scipy.cluster.hierarchy import linkage, dendrogram, fcluster
from sklearn.cluster import KMeans, DBSCAN
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import adjusted_rand_score, silhouette_score

np.random.seed(42)
# 模拟3组簇+噪声数据
c1 = np.random.normal([2,2], 0.4, (30,2))
c2 = np.random.normal([8,8], 0.4, (30,2))
c3 = np.random.normal([5,2], 0.4, (30,2))
noise = np.random.uniform([0,0],[10,10],(10,2))
X = np.vstack([c1,c2,c3,noise])

# 标准化
X_scaled = StandardScaler().fit_transform(X)

# ===== 1. 层次聚类 =====
Z = linkage(X_scaled, method='ward')
fig, (ax1,ax2) = plt.subplots(1,2, figsize=(14,5))
dendrogram(Z, ax=ax1, truncate_mode='lastp', p=15)
ax1.set_title('层次聚类树状图')
labels_hc = fcluster(Z, t=3, criterion='maxclust')
ax2.scatter(X[:,0], X[:,1], c=labels_hc, cmap='tab10', s=50)
ax2.set_title(f'层次聚类 (K=3, ARI参考={adjusted_rand_score([1]*30+[2]*30+[3]*30, labels_hc):.2f})')

# ===== 2. DBSCAN =====
db = DBSCAN(eps=0.5, min_samples=5)
labels_db = db.fit_predict(X_scaled)
ax2.scatter(X[:,0], X[:,1], c=labels_db, cmap='tab10', s=50, marker='x')
ax2.set_title(f'DBSCAN (eps=0.5, min_samples=5, 噪声={sum(labels_db==-1)}个)')

# ===== 3. 对比评估 =====
km = KMeans(n_clusters=3, random_state=42, n_init=10)
labels_km = km.fit_predict(X_scaled)
print(f'K-Means轮廓系数: {silhouette_score(X_scaled, labels_km):.3f}')
print(f'层次聚类轮廓系数: {silhouette_score(X_scaled, labels_hc):.3f}')
print(f'DBSCAN轮廓系数: {silhouette_score(X_scaled, labels_db[labels_db!=-1]]):.3f}')
plt.tight_layout(); plt.show()`
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
        title: '第一阶段：AB测试基础概念与实验设计',
        items: [
          '什么是AB测试？将用户随机分成两组（A=对照组/B=实验组），对比两组核心指标的差异',
          'AB测试的适用场景：UI改版/算法优化/运营策略/价格调整/文案测试',
          'AB测试不适用场景：长期影响难以回滚、用户规模极小、敏感政策/道德风险',
          '核心指标选择原则：北极星指标（唯一最重要指标，如转化率/GMV）+ 护栏指标（辅助验证，如留存率/页面停留时长）',
          '实验设计要素：随机分组、时间窗口、样本量估算、最小可检测效应(MDE)',
          '流量分配：AA验证（前7天AA测试两组应无差异）、分层实验（不同功能同时测）',
          '实战：设计一个电商「立即购买按钮颜色从蓝色改红色」的AB测试方案'
        ]
      },
      {
        title: '第二阶段：统计假设检验原理',
        items: [
          '原假设(H0)：A和B没有差异（μA=μB）；备择假设(H1)：A和B有差异（μA≠μB）',
          '两类错误：Type I（错误拒绝H0，误以为有差异）= α(显著性水平) / Type II（错误接受H0，漏掉真实差异）= β',
          '功效(Power) = 1-β：当差异真实存在时，能正确检测到差异的概率；一般要求 Power≥80%',
          '样本量计算公式（双样本比例检验）：n = 2*(Z_α/2 + Z_β)² × [p̄(1-p̄)] / δ²',
          '最小可检测效应(MDE)：能检测到的最小相对差异，如「转化率提升5%以上才算有价值」',
          'P值的含义：假设H0为真，观察到当前差异（或更极端差异）的概率；p<0.05 ≠ 「B比A好95%」',
          '实战：用 Python 计算「转化率从5%提升到6%」所需最小样本量'
        ]
      },
      {
        title: '第三阶段：Z检验与置信区间',
        items: [
          '两比例Z检验：比较两个转化率/点击率等比例指标',
          'pooled proportion：合并两组数据估计总体比例，用合并比例计算标准误（比分开计算更准确）',
          'Z统计量 = (pB-pA) / SE，SE = √[p̄(1-p̄)(1/nA + 1/nB)]',
          '95%置信区间：估算真实效应范围，若CI不包含0则差异显著',
          'Wilson置信区间（推荐）：对小样本/低转化率更准确，避免经典正态近似的边界超出[0,1]问题',
          '多元比较修正：同时测多组（A/B/C/D）时用 Bonferroni 修正：α_修正 = α / 比较次数',
          '实战：完成一个AB测试的完整统计分析，包括Z检验 + 置信区间 + 效应量'
        ]
      },
      {
        title: '第四阶段：实战案例与结果解读',
        items: [
          '电商案例：购物车页面「立即购买」按钮颜色测试（红vs蓝），计算转化率提升与统计显著性',
          '互联网案例：推荐算法新版本AB测试，点击率提升是否显著，是否值得全量上线',
          '如何解读结果：显著≠有价值！需同时看「效应量」——转化率绝对提升了多少？带来了多少GMV增量？',
          '统计显著但业务不显著：转化率提升0.01%，p<0.05但ROI为负',
          '不显著但值得上线：转化率提升3%，p=0.08虽未达显著但方向一致，可持续观测或扩大样本',
          'AA验证失败的处理：若AA测试两组基础指标差异超过5%，说明随机分组有问题，需重新设计',
          '结果报告规范：实验组/对照组样本量 / 转化率 / 绝对提升 / 相对提升 / Z统计量 / p值 / 95%CI / 结论',
          '实战：模拟真实AB测试数据，完成从数据到业务建议的完整分析报告'
        ]
      }
    ],
    keyPoints: [
      'AB测试：用户随机分组 → 控制组/实验组 → 核心指标对比 → 统计检验',
      '原假设H0：A和B无差异；p值：假设H0为真时观察到当前差异的概率',
      '显著性水平α：Type I错误上限，通常取0.05；功效Power=1-β，要求≥80%',
      '两比例Z检验：pooled SE = √[p̄(1-p̄)(1/nA+1/nB)]；Z = (pB-pA)/SE',
      '95%置信区间：若CI不包含0→显著，包含0→不显著',
      'Wilson区间：对小样本/低转化率比正态近似更可靠，永不超出[0,1]',
      '结果解读：p<0.05≠「B比A好95%」≠「B更好」—— 需结合效应量与业务价值综合判断',
      '最小样本量：n = 2*(Z_α+Z_β)²×p̄(1-p̄)/δ²，提前计算避免样本不够或资源浪费'
    ],
    codeExample: `from scipy.stats import norm
import numpy as np

# ===== AB测试数据 =====
n_A, x_A = 5000, 250    # 对照组：5000人，250人购买
n_B, x_B = 5000, 315    # 实验组：5000人，315人购买
alpha = 0.05

# ===== Step 1: 基础统计 =====
p_A = x_A / n_A
p_B = x_B / n_B
abs_diff = p_B - p_A
rel_lift = abs_diff / p_A

print("=== AB测试分析报告 ===")
print(f"对照组(A)  样本: {n_A:,}  转化: {x_A}  转化率: {p_A:.4f} ({p_A*100:.2f}%)")
print(f"实验组(B)  样本: {n_B:,}  转化: {x_B}  转化率: {p_B:.4f} ({p_B*100:.2f}%)")
print(f"绝对提升: {abs_diff*100:.2f}%  相对提升: {rel_lift*100:.2f}%")

# ===== Step 2: Z检验(pooled) =====
p_pool = (x_A + x_B) / (n_A + n_B)
SE = (p_pool * (1 - p_pool) * (1/n_A + 1/n_B)) ** 0.5
z_stat = abs_diff / SE
p_value = 2 * (1 - norm.cdf(abs(z_stat)))

print(f"\n--- Z检验(pooled SE) ---")
print(f"z统计量 = {z_stat:.4f}")
print(f"p值     = {p_value:.6f}")
print(f"显著性  = {'✅ 显著 (p<0.05)' if p_value < alpha else '❌ 不显著 (p≥0.05)'}")

# ===== Step 3: Wilson 95%置信区间 =====
def wilson_ci(x, n, z=1.96):
    p = x / n
    denom = 1 + z**2/n
    center = (p + z**2/(2*n)) / denom
    margin = z * (p*(1-p)/n + z**2/(4*n**2)) ** 0.5 / denom
    return center - margin, center + margin

ci_A = wilson_ci(x_A, n_A)
ci_B = wilson_ci(x_B, n_B)
ci_diff_low = abs_diff - 1.96 * SE
ci_diff_high = abs_diff + 1.96 * SE

print(f"\n--- 95%置信区间(Wilson) ---")
print(f"A组区间: [{ci_A[0]:.4f}, {ci_A[1]:.4f}]")
print(f"B组区间: [{ci_B[0]:.4f}, {ci_B[1]:.4f}]")
print(f"效应区间: [{ci_diff_low:.4f}, {ci_diff_high:.4f}]")
print(f"显著性:   {'✅ 区间不包含0，差异显著' if ci_diff_low > 0 or ci_diff_high < 0 else '❌ 区间包含0，差异不显著'}")

# ===== Step 4: 业务建议 =====
print(f"\n=== 业务建议 ===")
if p_value < alpha and abs_diff > 0:
    print(f"✅ 推荐全量上线红色按钮：转化率提升 {rel_lift*100:.1f}%，")
    print(f"   预计每天额外转化 {int(n_A/7 * abs_diff)} 人（月增量约 ¥{int(n_A/7 * abs_diff * 200)}）")
elif p_value >= alpha:
    print(f"⚠️ 差异不显著（p={p_value:.3f}），建议延长测试时间或扩大样本")
else:
    print(f"❌ 转化率下降，不建议上线")`
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
        title: '第一阶段：核心经营指标体系',
        items: [
          '销售额/订单量/客单价：GMV/UV/PV/转化率漏斗的含义与计算',
          '访客数(UV) vs 浏览量(PV)：UV=去重访客数，PV=页面总浏览次数',
          '转化率(CVR)：支付买家数/访客数，反映流量质量',
          '客单价(AOV)=销售额/订单数，平均每笔订单金额',
          '复购率：回头客/总买家数，复购率>30%为优秀',
          '毛利率：(售价-成本)/售价，核心盈利能力指标',
          '环比(C2C)：本期与上期比较；同比(Y2Y)：本期与去年同期比较',
          '实战：构建店铺经营 KPI 看板，从原始订单数据计算所有核心指标'
        ]
      },
      {
        title: '第二阶段：销售分析与趋势预测',
        items: [
          '日/周/月/年多时间维度聚合：df.groupby(pd.Grouper(freq=\'W\')) 周度汇总',
          '日度趋势：识别异常高/低点，找出生意高峰与低谷的原因',
          '月累计同比：YTD累计销售额与去年同期对比，掌握年度进度',
          '热力图分析：星期×小时的销量热力矩阵，找出最佳营业时间段',
          '销售归因：天气/节假日/促销活动对销售额的影响量化分析',
          '移动平均：MA7/MA30 消除日间波动，看清长期趋势',
          '季节性分解：趋势成分 + 季节成分 + 残差成分（加法/乘法模型）',
          '实战：完成店铺全年日度销售数据的多维度分析报告'
        ]
      },
      {
        title: '第三阶段：客户分析与复购',
        items: [
          '新老客户划分：按首次购买时间划分，新客贡献率 vs 老客复购率',
          '客户生命周期：获客期(0~3月)→成长期(3~12月)→成熟期(1~3年)→休眠期→流失期',
          '复购周期分析：计算平均复购天数，识别最佳复购时间窗口',
          '客户留存曲线：第N个月留存率=N月后仍活跃的老客/当月新客总数',
          '客户价值分层：按累计消费金额分 Top20% / Middle50% / Bottom30%',
          '沉睡客户召回：识别30/60/90天未购买客户，计算召回成本ROI',
          '实战：从订单数据计算客户留存曲线并制定分层运营策略'
        ]
      },
      {
        title: '第四阶段：经营问题诊断与仪表盘',
        items: [
          '异常预警：日销售额超出均值±2σ自动触发预警',
          '品类结构分析：各品类销售额/毛利占比，找出贡献最大的品类',
          '地域分析：省份/城市维度的销售分布，发现高增长/高潜力区域',
          '价格带分析：不同价格区间的销量分布，优化商品结构',
          'matplotlib 多子图仪表盘：KPI卡片 + 趋势图 + 排行榜 + 热力图',
          'seaborn 统计图：sns.barplot 分组对比、sns.lineplot 趋势分析',
          '实战：制作一份完整的店铺月度经营分析报告，包含所有核心指标'
        ]
      }
    ],
    keyPoints: [
      '核心指标：CVR转化率 / AOV客单价 / 复购率 / 毛利率 / GMV',
      '同环比：环比=本期/上期-1，同比=本期/去年同期-1，判断增长质量',
      '复购率=回头客数/总买家数，>30%为优秀；留存曲线衡量客户粘性',
      '热力图：sns.heatmap(星期×小时) 找最佳营业时间',
      '移动平均：MA7消除日波动，MA30消除周波动',
      '留存曲线：第N月留存=N月后仍活跃的老客/当月新客总数',
      '异常预警：日销售超出均值±2σ自动报警',
      '经营仪表盘：多子图组合展示（趋势+对比+占比+热力图）'
    ],
    codeExample: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 模拟日度经营数据
dates = pd.date_range('2024-01-01', '2024-12-31', freq='D')
np.random.seed(42)
df = pd.DataFrame({
    '日期': dates,
    '访客数': np.random.randint(500, 2000, len(dates)),
    '订单数': np.random.randint(20, 200, len(dates)),
    '销售额': np.random.randint(2000, 20000, len(dates)),
    '成本': np.random.randint(1200, 12000, len(dates)),
    '退货数': np.random.randint(0, 10, len(dates)),
})
df['客单价'] = df['销售额'] / df['订单数']
df['毛利'] = df['销售额'] - df['成本']
df['毛利率'] = df['毛利'] / df['销售额'] * 100
df['转化率'] = df['订单数'] / df['访客数'] * 100

# ===== 日度KPI =====
print("=== 关键指标 ===")
print(f"总销售额: ¥{df['销售额'].sum():,.0f}")
print(f"平均客单价: ¥{df['客单价'].mean():.2f}")
print(f"平均转化率: {df['转化率'].mean():.2f}%")
print(f"整体毛利率: {df['毛利'].sum()/df['销售额'].sum()*100:.2f}%")

# ===== 月度趋势 =====
df['月份'] = df['日期'].dt.to_period('M')
monthly = df.groupby('月份').agg({
    '访客数': 'sum', '订单数': 'sum', '销售额': 'sum', '毛利': 'sum'
}).reset_index()
monthly['客单价'] = monthly['销售额'] / monthly['订单数']
monthly['毛利率'] = monthly['毛利'] / monthly['销售额'] * 100
monthly['月份_str'] = monthly['月份'].astype(str)

fig, axes = plt.subplots(2, 2, figsize=(14, 8))
axes[0,0].plot(monthly['月份_str'], monthly['销售额'], 'o-', color='#2E86AB')
axes[0,0].set_title('月度销售额趋势'); axes[0,0].grid(True, alpha=0.3)
axes[0,1].bar(monthly['月份_str'], monthly['客单价'], color='#F4A261')
axes[0,1].set_title('月度客单价'); axes[0,1].grid(True, alpha=0.3)
axes[1,0].plot(monthly['月份_str'], monthly['转化率'], 's-', color='#2A9D8F')
axes[1,0].set_title('月度转化率趋势'); axes[1,0].grid(True, alpha=0.3)
axes[1,1].bar(monthly['月份_str'], monthly['毛利率'], color='#E63946')
axes[1,1].axhline(y=monthly['毛利率'].mean(), color='black', linestyle='--', label='均值')
axes[1,1].set_title('月度毛利率'); axes[1,1].legend()
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
        title: '第一阶段：消费者行为基础与决策模型',
        items: [
          'AISAS模型：Attention(注意)→Interest(兴趣)→Search(搜索)→Action(行动)→Share(分享)',
          '消费者购买决策5阶段：需求认知→信息搜集→方案评估→购买决策→购后行为',
          '影响购买决策的七大因素：文化/社会/个人/心理/情境/渠道/产品',
          '用户画像(Business Persona)：人口属性+消费行为+心理特征的综合描述',
          '用户标签体系：基础标签(性别/年龄/地域) + 行为标签(频次/品类/价格) + 预测标签(流失概率/价值等级)',
          '数据埋点体系：PV/UV/点击/加购/收藏/下单/支付七层漏斗数据采集',
          '实战：从原始用户行为日志构建完整的用户画像标签体系'
        ]
      },
      {
        title: '第二阶段：RFM 模型深度应用',
        items: [
          'RFM详解：Recency(最近购买距今天数，越小越好) / Frequency(购买次数，越多越好) / Monetary(累计消费金额，越高越好)',
          'RFM打分的两种方式：等宽分段(pd.qcut按分位点) vs 等频分段(每段人数相同)',
          'RFM 3×3×3=27 分箱法：每维度分3段(高/中/低)，形成27种客户类型',
          '客户类型解读：重要价值(高R高F高M) / 重要发展(高F高M低R) / 重要保持(高R高M低F) / 重要挽留(低R低F低M)',
          '基于RFM的精准营销：重要价值客户→专属VIP服务；重要挽留客户→召回激励活动',
          'RFM模型局限性：仅考虑交易数据，忽视浏览/加购等行为信号',
          '实战：对电商用户完成RFM打分，并制定各类型的精准营销策略'
        ]
      },
      {
        title: '第三阶段：AARRR 增长漏斗分析',
        items: [
          'AARRR Pirates指标：Acquisition(获客)→Activation(激活)→Retention(留存)→Revenue(变现)→Referral(推荐)',
          '各环节核心指标：获客(CAC获客成本/新增用户数)→激活(首购率/新手转化率)→留存(Day7/30留存率)→变现(ARPU/LTV)→推荐(K因子/口碑指数)',
          '留存曲线绘制：从首购日算起，观察Day1/Day3/Day7/Day30/Day90留存率变化',
          '流失节点分析：用 Sankey 图(分支流向图)可视化用户从获客到流失的路径',
          'K因子计算：K = 每个老用户带来的新用户数，K>1 才有病毒式增长',
          'LTV计算：用户生命周期价值 = 平均订单金额 × 月均购买次数 × 平均生命周期(月)',
          '实战：基于某 APP 用户行为数据，完成 AARRR 全链路漏斗分析与增长诊断'
        ]
      },
      {
        title: '第四阶段：个性化推荐与精准营销',
        items: [
          '协同过滤(CF)：基于「相似用户买了A，你也可能喜欢A」的逻辑(user-based / item-based)',
          '基于内容推荐：根据商品属性(品类/价格/标签)的相似度进行推荐',
          '混合推荐：协同过滤 + 基于内容 + 热销榜 三路融合推荐',
          'A/B 测试验证推荐效果：推荐点击率 vs 随机推荐点击率',
          '用户生命周期营销：获客期(新人礼包)→成长期(满减券)→成熟期(积分兑换)→流失期(召回短信)',
          '精准推送时机：用户行为触发型(加购未支付→1h后发提醒) vs 周期型(每周五推优惠)',
          '实战：构建一个简化版的商品推荐系统，并用历史数据评估推荐准确率'
        ]
      }
    ],
    keyPoints: [
      'AISAS购买决策模型：注意→兴趣→搜索→行动→分享',
      'RFM：Recency(近度)/Frequency(频度)/Monetary(额度)，每维度高/中/低3分段=27种客户类型',
      '客户分群解读：重要价值(高R高F高M)→VIP服务；重要挽留(低R低F低M)→召回激励',
      'AARRR漏斗：Acquisition获客→Activation激活→Retention留存→Revenue变现→Referral推荐',
      '留存曲线：Day1/3/7/30/90留存率，观察用户粘性变化规律',
      'K因子：每个老用户带来的新用户数，K>1才能病毒式增长',
      'LTV=ARPU×月均购买次数×生命周期，衡量用户长期价值',
      '精准营销时机：加购未支付1h提醒、周五推优惠、流失用户召回短信'
    ],
    codeExample: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)
# 模拟用户行为数据
users = pd.DataFrame({
    '用户ID': range(1, 501),
    '最近购买天数': np.random.randint(1, 180, 500),
    '购买次数': np.random.randint(1, 30, 500),
    '累计消费额': np.random.uniform(100, 10000, 500),
})

# ===== RFM打分 =====
users['R_score'] = pd.qcut(users['最近购买天数'], 5, labels=[5,4,3,2,1]).astype(int)
users['F_score'] = pd.qcut(users['购买次数'].rank(method='first'), 5, labels=[1,2,3,4,5]).astype(int)
users['M_score'] = pd.qcut(users['累计消费额'].rank(method='first'), 5, labels=[1,2,3,4,5]).astype(int)
users['RFM_score'] = users['R_score'] + users['F_score'] + users['M_score']

# ===== 客户分群 =====
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

# ===== 分析报告 =====
counts = users['客户类型'].value_counts()
print("=== 客户分群统计 ===")
for ctype, count in counts.items():
    print(f"{ctype}: {count}人 ({count/len(users)*100:.1f}%)")

# ===== 策略建议 =====
print("\n=== 精准营销建议 ===")
for ctype in ['重要价值客户', '重要发展客户', '重要保持客户', '重要挽留客户']:
    if ctype == '重要价值客户': print(f"💎 {ctype}: 专属VIP服务 + 生日专属折扣")
    elif ctype == '重要发展客户': print(f"📈 {ctype}: 高频触达 + 积分加倍活动")
    elif ctype == '重要保持客户': print(f"🔄 {ctype}: 定期关怀 + 满减券召回")
    else: print(f"⚠️ {ctype}: 强力召回 + 大额首购激励")

# ===== 留存曲线模拟 =====
days = list(range(0, 31))
retention = [100] + [100 * np.exp(-0.08 * d) for d in days[1:]]
plt.figure(figsize=(10, 4))
plt.plot(days, [100] + [100*np.exp(-0.08*d) for d in days[1:]], 'o-', color='#2E86AB')
plt.axhline(y=30, color='red', linestyle='--', label='关键阈值30%')
plt.title('用户30日留存曲线'); plt.xlabel('天数'); plt.ylabel('留存率(%)')
plt.grid(True, alpha=0.3); plt.legend(); plt.tight_layout(); plt.show()`
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
        title: '第一阶段：市场数据采集与分析',
        items: [
          '市场规模(TAM/SAM/SOM)：潜在市场总量(TAM)→可服务市场(SAM)→可获得市场(SOM)',
          '市场数据采集渠道：国家统计局 / 行业协会报告 / 第三方数据平台(艾瑞/QuestMobile) / 企业财报',
          '增长率计算：同比增长率 = (本期-去年同期)/去年同期 × 100%',
          '复合年增长率(CAGR) = (期末/期初)^(1/年数) - 1，反映多年平均增速',
          '市场渗透率 = 当前用户数 / 潜在用户总数 × 100%',
          'PEST宏观分析框架：Political(政治) / Economic(经济) / Social(社会) / Technological(技术)',
          '实战：采集某行业5年市场数据，计算 CAGR 并预测未来3年市场规模'
        ]
      },
      {
        title: '第二阶段：竞争格局分析',
        items: [
          '波特五力分析：行业内现有竞争者 / 新进入者威胁 / 替代品威胁 / 供应商议价能力 / 买方议价能力',
          '竞争对手分析维度：市场份额 / 产品线 / 价格带 / 渠道覆盖 / 营销策略',
          '市场份额计算：某品牌销售额 / 行业总销售额 × 100%',
          'CR3/CR5/CR10：行业前3/5/10名企业的市场份额之和，判断市场集中度',
          '竞争雷达图：多维度对比自身与主要竞品的竞争力得分',
          '差异化定位：价格领先 vs 差异化 vs 聚焦细分市场',
          '实战：完成某行业竞争格局分析报告，包含市场份额、CR集中度、SWOT矩阵'
        ]
      },
      {
        title: '第三阶段：市场预测与策略制定',
        items: [
          '线性回归预测：y = a + bx，用最小二乘法拟合历史数据并外推',
          '多项式回归：y = a + bx + cx²，捕捉非线性增长趋势',
          '指数增长模型：y = a × e^(bx)，适合处于快速扩张期的市场',
          '市场预测的局限性：无法预测黑天鹅事件(如疫情/政策变化)',
          'SWOT分析量化：将Strength/Weakness/Opportunity/Threat各维度的各子项打分，相加得综合评分',
          'STP战略：市场细分(Segmentation)→目标选择(Targeting)→定位(Positioning)',
          '4P营销组合：Product(产品) / Price(价格) / Place(渠道) / Promotion(促销)',
          '实战：基于某行业历史数据，建立市场预测模型，并提出3年发展战略建议'
        ]
      }
    ],
    keyPoints: [
      '市场规模三层：TAM(潜在) → SAM(可服务) → SOM(可获得)',
      'CAGR = (期末/期初)^(1/年数) - 1，反映多年平均增速',
      '波特五力：现有竞争者 / 新进入者 / 替代品 / 供应商议价 / 买方议价',
      'CR3/CR5/CR10：行业前N名市占率之和，衡量市场集中度',
      '竞争雷达图：多维度(价格/产品/渠道/服务)对比自身与竞品',
      'SWOT量化：各子项打分后汇总，Strength-Weakness与Opportunity-Threat对比',
      'STP战略：细分市场 → 选目标市场 → 差异化定位',
      '4P营销：Product(产品) / Price(价格) / Place(渠道) / Promotion(促销)'
    ],
    codeExample: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

plt.rcParams['font.sans-serif'] = ['SimHei']

# ===== 市场历史数据 =====
years = list(range(2018, 2025))
market_size = [3.2, 4.1, 5.3, 6.7, 8.2, 9.8, 11.5]  # 万亿元
df = pd.DataFrame({'年份': years, '市场规模': market_size})

# ===== CAGR计算 =====
start_val, end_val = market_size[0], market_size[-1]
n_years = len(years) - 1
cagr = (end_val / start_val) ** (1 / n_years) - 1
print(f"=== {years[0]}-{years[-1]} 市场规模分析 ===")
print(f"2018年市场规模: {start_val:.1f}万亿元")
print(f"{years[-1]}年市场规模: {end_val:.1f}万亿元")
print(f"复合年增长率(CAGR): {cagr*100:.1f}%")

# ===== 线性回归预测 =====
z = np.polyfit(df['年份'], df['市场规模'], 1)
predict = np.poly1d(z)
df['线性预测'] = predict(df['年份'])
df['残差'] = df['市场规模'] - df['线性预测']

# ===== 未来3年预测 =====
future_years = [2025, 2026, 2027]
future_pred = [predict(y) for y in future_years]
print(f"\n=== 未来3年市场规模预测(线性回归) ===")
for y, p in zip(future_years, future_pred):
    print(f"{y}年: {p:.2f}万亿元")

# ===== 竞争格局 =====
companies = ['企业A', '企业B', '企业C', '企业D', '其他']
shares = [32, 25, 18, 12, 13]
print(f"\n=== 竞争格局 ===")
for c, s in zip(companies, shares):
    print(f"{c}: {s}%")
print(f"CR3(前三集中度): {sum(shares[:3])}%")

# ===== 可视化 =====
fig, axes = plt.subplots(1, 3, figsize=(15, 4))

# 1. 市场规模趋势
ax1 = axes[0]
ax1.plot(df['年份'], df['市场规模'], 'o-', color='#2E86AB', linewidth=2.5, label='实际值')
ax1.plot(df['年份'], df['线性预测'], 's--', color='#E63946', alpha=0.7, label='线性拟合')
ax1.plot(future_years, future_pred, 'x--', color='#E63946', markersize=12, label='预测值')
ax1.set_title(f'市场规模趋势 (CAGR={cagr*100:.1f}%)'); ax1.legend()
ax1.set_xlabel('年份'); ax1.set_ylabel('万亿元')
ax1.grid(True, alpha=0.3)

# 2. 市场份额饼图
axes[1].pie(shares, labels=companies, autopct='%.1f%%', colors=['#2E86AB','#F4A261','#E63946','#2A9D8F','#9B59B6'])
axes[1].set_title('市场份额分布')

# 3. 竞争雷达图(简化)
categories = ['产品力', '价格力', '渠道力', '品牌力', '服务力']
scores_A = [85, 80, 75, 90, 85]
scores_B = [75, 85, 80, 70, 75]
angles = np.linspace(0, 2*np.pi, len(categories), endpoint=False).tolist()
angles += angles[:1]
scores_A += scores_A[:1]; scores_B += scores_B[:1]
ax3 = axes[2]
ax3 = plt.subplot(133, projection='polar')
ax3.plot(angles, scores_A, 'o-', label='企业A', color='#2E86AB')
ax3.fill(angles, scores_A, alpha=0.25, color='#2E86AB')
ax3.plot(angles, scores_B, 's-', label='企业B', color='#F4A261')
ax3.set_xticks(angles[:-1]); ax3.set_xticklabels(categories)
ax3.set_title('竞争力雷达图', pad=20); ax3.legend(loc='upper right')

plt.tight_layout(); plt.show()`
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
        title: '第一阶段：时间序列概念与数据准备',
        items: [
          '什么是时间序列？随时间变化的观测值序列（股票价格/销售量/气温/网站PV）',
          '时间序列四要素：趋势(Trend) + 季节性(Seasonality) + 周期性(Cyclical) + 不规则波动(Irregular)',
          'pandas 时间索引：pd.date_range() / pd.to_datetime() / df.set_index(\'日期\')',
          '时间重采样：df.resample(\'M\') 月度汇总 / \'W\' 周度 / \'Q\' 季度',
          '前向填充(ffill) vs 后向填充(bfill)：缺失日期补全的处理策略',
          '滞后序列：df[\'列\'].shift(1) 创建前1期值，用于特征工程',
          '实战：把原始销售数据转成日度时间序列，设置正确的日期索引'
        ]
      },
      {
        title: '第二阶段：探索性分析与平稳性',
        items: [
          '趋势分析：移动平均线（MA7/MA30/MA90）消除短期波动，揭示长期趋势',
          '季节性识别：用 pd.groupby(ts.index.month).mean() 观察月度规律',
          '季节性分解 statsmodels：seasonal_decompose(series, model=additive/multiplicative)',
          '分解三成分：趋势(Trend) + 季节(Seasonal) + 残差(Residual)',
          '加法模型 vs 乘法模型：季节波动幅度不随趋势变化→加法；季节波动幅度随趋势成比例变化→乘法',
          '平稳性概念：均值不变、方差恒定、自协方差与时间无关',
          'ADF检验(Augmented Dickey-Fuller)：p<0.05→拒绝原假设(非平稳)→序列平稳',
          '实战：对月度销售额数据完成季节性分解，识别趋势+季节成分'
        ]
      },
      {
        title: '第三阶段：差分与平滑',
        items: [
          '差分(Differencing)：一阶差分=diff()=y(t)-y(t-1)，消除趋势使序列更平稳',
          '二阶差分：对一阶差分结果再差分，处理二次趋势',
          '季节差分：lag=12（年度季节），消除年度季节性影响',
          '差分阶数选择：差分后序列均值≈0、ACF快速衰减至0即可',
          '指数移动平均(EWMA)：exponentially weighted moving average，给近期数据更高权重',
          'Span参数：span=7相当于MA7，但EWMA对近期变化更敏感',
          '实战：对销售序列做一阶差分和年度季节差分，比较平稳化效果'
        ]
      },
      {
        title: '第四阶段：ARIMA 模型',
        items: [
          'ARIMA(p,d,q)：Autoregressive(p阶自回归) + Integrated(d阶差分) + Moving Average(q阶滑动平均)',
          'AR(p)自回归：当前值≈线性组合(前p期值) + 随机误差',
          'MA(q)滑动平均：当前值≈线性组合(前q期随机误差) + 常数项',
          'p和q的确定：ACF(自相关函数)截尾→MA(q)阶数；PACF(偏自相关)截尾→AR(p)阶数',
          'AIC/BIC准则：同时考虑模型拟合优度与参数个数，越小越好',
          'ARIMA参数选择：auto_arima自动搜索最优(p,d,q)组合',
          '模型诊断：残差正态性检验(JB检验) / 残差自相关检验(Ljung-Box检验)',
          '实战：用ARIMA对月销售额建模，预测未来6个月的销售趋势'
        ]
      },
      {
        title: '第五阶段：SARIMA 与 Prophet',
        items: [
          'SARIMA：ARIMA + Seasonal，参数多一个(s,P,D,m)，s=周期长度(如12个月)',
          'SARIMA适用场景：有明显年度季节性模式的序列（如空调销售/节日消费/旅游数据）',
          'Prophet(Facebook)：对年度季节性 + 周季节性 + 节假日效应 + 趋势变化点有良好建模能力',
          'Prophet优势：自动检测趋势变点、对缺失值不敏感、安装简单( pip install prophet)',
          'Prophet三组件：趋势(growth) + 季节性(seasonality) +  holidays(节假日)',
          'Prophet预测流程：fit(df)→make_future_dataframe(periods=N)→predict()→plot()',
          '模型评估指标：MAE(平均绝对误差) / RMSE(均方根误差) / MAPE(平均绝对百分比误差)',
          '实战：用Prophet对日度销售数据建模，预测未来30天销售额，并绘制置信区间'
        ]
      },
      {
        title: '第六阶段：实战预测项目',
        items: [
          '完整预测流程：数据导入→缺失值处理→平稳性检验→差分→模型拟合→预测→评估',
          '滚动预测(Rolling Forecast)：用前N期预测下一期，逐期滚动更新预测值',
          '多模型对比：ARIMA vs SARIMA vs Prophet，在同一测试集上比较MAE/RMSE/MAPE',
          '置信区间解读：95%CI意味着「未来真实值有95%概率落在这个区间内」',
          '业务应用场景：销售预测→库存优化 / 流量预测→服务器扩容 / 需求预测→生产排程',
          '预测结果可视化：历史数据+预测值+置信区间+异常标注',
          '实战：完成从日度数据→月度预测→业务建议的完整项目，输出预测报告'
        ]
      }
    ],
    keyPoints: [
      '时间序列四要素：趋势Trend + 季节Seasonality + 周期Cyclical + 不规则Irregular',
      '季节性分解：seasonal_decompose(series, model=additive/multiplicative)',
      '平稳性检验：ADF检验，p<0.05拒绝非平稳原假设',
      '差分：diff()一阶差分消除趋势，lag=12季节差分消除年度季节性',
      'ARIMA(p,d,q)：p=自回归阶数，d=差分阶数，q=滑动平均阶数',
      'ACF→确定q(PACF→确定p)；AIC/BIC越小模型越优',
      'Prophet：对年度/周季节性+节假日+趋势变点建模能力强，安装pip install prophet',
      '评估指标：MAE/RMSE/MAPE，越小越好；MAPE对业务人员最直观（百分比误差）'
    ],
    codeExample: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.seasonal import seasonal_decompose

np.random.seed(42)
# 模拟月度销售数据（趋势 + 季节 + 噪声）
months = pd.date_range('2020-01', '2024-12', freq='MS')
trend = np.linspace(100, 300, len(months))
seasonal = 20 * np.sin(2 * np.pi * np.arange(len(months)) / 12)
noise = np.random.normal(0, 10, len(months))
sales = trend + seasonal + noise
ts = pd.Series(sales, index=months)

# ===== Step 1: 季节性分解 =====
decomp = seasonal_decompose(ts, model='additive', period=12)
fig = decomp.plot(); fig.set_size_inches(12, 8); plt.tight_layout(); plt.show()

# ===== Step 2: 平稳性检验 =====
from statsmodels.tsa.stattools import adfuller
def adf_test(series):
    result = adfuller(series.dropna())
    print(f'ADF统计量: {result[0]:.4f}')
    print(f'p值: {result[1]:.4f}')
    print(f'结论: {"平稳" if result[1] < 0.05 else "非平稳（需要差分）"}')
print('=== 原序列ADF检验 ===')
adf_test(ts)
print('\n=== 一阶差分后ADF检验 ===')
adf_test(ts.diff().dropna())

# ===== Step 3: ACF/PACF 确定参数 =====
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))
plot_acf(ts.diff().dropna(), lags=24, ax=ax1); ax1.set_title('ACF（确定q）')
plot_pacf(ts.diff().dropna(), lags=24, ax=ax2); ax2.set_title('PACF（确定p）')
plt.tight_layout(); plt.show()

# ===== Step 4: ARIMA建模与预测 =====
model = ARIMA(ts, order=(2, 1, 2))
fitted = model.fit()
forecast = fitted.forecast(steps=12)
conf_int = fitted.get_forecast(steps=12).conf_int()

print('\n=== 未来12个月预测 ===')
for i, (pred, (lo, hi)) in enumerate(zip(forecast.values, conf_int.values)):
    print(f'{months[-1] + pd.DateOffset(months=i+1):%Y-%m} 预测: {pred:.1f} (95%CI: [{lo:.1f}, {hi:.1f}])')

# ===== Step 5: 绘图 =====
fig, ax = plt.subplots(figsize=(12, 5))
ax.plot(ts.index, ts, 'b-', label='历史数据')
ax.plot(forecast.index, forecast, 'r--', label='ARIMA预测')
ax.fill_between(forecast.index, conf_int.iloc[:,0], conf_int.iloc[:,1], alpha=0.2, color='red')
ax.legend(); ax.set_title('销售预测(ARIMA(2,1,2))'); plt.tight_layout(); plt.show()`
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
