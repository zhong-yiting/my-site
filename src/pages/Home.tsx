import { useState } from 'react';
import {
  Database, ShoppingCart, Users, BarChart3, GitBranch, Target,
  TrendingUp, PieChart, Activity, Code, LineChart,
  Search, Package, Mail, MessageCircle, Download, Award, Trophy,
  Briefcase, GraduationCap, Star, CheckCircle2
} from 'lucide-react';

const skillLevels: Record<string, number> = {
  '精通': 95,
  '熟练': 80,
  '掌握': 70,
  '熟悉': 60,
  '了解': 45
};

const colorSchemes = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', gradient: 'from-blue-500 to-blue-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600', gradient: 'from-green-500 to-green-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600', gradient: 'from-purple-500 to-purple-600' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600', gradient: 'from-orange-500 to-orange-600' },
  red: { bg: 'bg-red-100', text: 'text-red-600', gradient: 'from-red-500 to-red-600' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-600', gradient: 'from-pink-500 to-pink-600' },
  cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600', gradient: 'from-cyan-500 to-cyan-600' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', gradient: 'from-indigo-500 to-indigo-600' },
  teal: { bg: 'bg-teal-100', text: 'text-teal-600', gradient: 'from-teal-500 to-teal-600' },
  gray: { bg: 'bg-gray-100', text: 'text-gray-600', gradient: 'from-gray-500 to-gray-600' }
};

export default function Home() {
  const [projects] = useState([
    {
      id: 1,
      name: '数据清洗',
      icon: Database,
      color: 'blue',
      level: '入门',
      description: '学习数据清洗的基本方法，处理缺失值、异常值、重复值等数据质量问题。',
      tags: ['Python', 'pandas', '数据预处理'],
      dataset: '校园便利店 3 个月真实销售流水（8,263 条记录）',
      datasetFields: '订单号、商品名、单价、数量、金额、会员号、下单时间、支付方式',
      process: [
        '① 用 df.info() / df.isnull().sum() 诊断缺失值（发现「会员号」缺失 18%）',
        '② 用 df.duplicated().sum() 检测重复行（发现 23 条完全重复订单）',
        '③ IQR 法识别异常金额（检出 5 笔金额 > 均值 + 3×IQR）',
        '④ 用中位数填充「会员号」缺失值，删除重复行，截尾异常金额',
        '⑤ pd.to_datetime() 统一日期格式，str.strip() 清洗商品名空格'
      ],
      visualizations: [
        '缺失值热力图（发现缺失集中在会员字段）',
        '金额分布直方图 + 箱线图（发现右偏分布和离群值）',
        '清洗前后数据质量对比柱状图（缺失率 18%→0%，重复率 0.28%→0%）'
      ],
      conclusions: [
        '会员系统上线初期数据采集不完整，建议优先完善会员信息录入',
        '识别出 5 个滞销 SKU（连续 30 天零销量），建议做下架评估',
        '日均客单价 42.3 元，周末峰值达 68 元，适合做周末促销'
      ],
      businessInsight: '数据清洗后质量达标，输出 1 份 Excel 看板上报店长，滞销 SKU 已安排采购部核查。'
    },
    {
      id: 2,
      name: '购物篮分析',
      icon: ShoppingCart,
      color: 'green',
      level: '入门',
      description: '使用关联规则挖掘技术分析购物篮数据，发现商品间的关联关系。',
      tags: ['关联规则', 'Apriori', '市场篮分析'],
      dataset: '电商平台 1 个月真实订单（1,500 笔交易，4,200+ 件商品）',
      datasetFields: '订单ID、商品品类、商品名称、购买数量、订单金额、用户ID',
      process: [
        '① 将订单表转为 list of list 格式（每笔交易一个商品列表）',
        '② TransactionEncoder 做 One-Hot 编码，得到 0/1 交易矩阵',
        '③ apriori() 挖掘频繁项集（min_support=0.01，过滤低频组合）',
        '④ association_rules() 生成关联规则，筛选 lift > 1.5、confidence > 40%',
        '⑤ 按 lift 降序，输出 Top10 关联规则并做业务解读'
      ],
      visualizations: [
        '置信度 × 支持度散点图（找出「黄金象限」——高置信+高支持）',
        '商品共现热力图（发现强关联商品对，如「薯片↔可乐」）',
        'Top10 关联规则条形图（lift 排序，标注前项→后项）'
      ],
      conclusions: [
        '「啤酒+尿布」规则 lift=2.3，置信度 52%，支持度 3.1%（中度普遍）',
        '「薯片+可乐」规则 lift=3.1，为全场最强关联，适合捆绑促销',
        '「方便面+火腿肠」规则置信度 61%，可设计「泡面搭档」套餐'
      ],
      businessInsight: '建议将「薯片+可乐」邻近陈列，同时在薯片货架旁放置可乐促销牌，预计可提升客单价 8-12%。'
    },
    {
      id: 3,
      name: '客户聚类分析',
      icon: Users,
      color: 'purple',
      level: '进阶',
      description: '使用聚类算法对客户进行分群，识别不同客户群体的特征和行为模式。',
      tags: ['K-means', '客户分群', '聚类分析'],
      dataset: '某电商平台注册用户行为数据（1,000 条，8 个特征）',
      datasetFields: '用户ID、累计消费额、购买次数、最近购买天数、平均订单金额、注册天数、活跃天数、折扣利用率',
      process: [
        '① 选取 5 个核心特征：消费额、频次、最近购买天数、件单价、折扣率',
        '② StandardScaler 标准化（消除量纲差异）',
        '③ 肘部法则 + 轮廓系数确定最优 K=4',
        '④ K-Means(n_clusters=4) 完成聚类，计算各簇中心特征',
        '⑤ 轮廓系数=0.62（聚类质量良好），各簇命名并输出营销策略'
      ],
      visualizations: [
        '肘部法则曲线（SSE 随 K 值变化，找出拐点 K=4）',
        '轮廓系数折线图（K=4 时 silhouette=0.62 最优）',
        '4 簇特征雷达图（对比各簇在消费额/频次/活跃度上的差异）'
      ],
      conclusions: [
        '簇0「高价值活跃客户」（占 15%）：消费额高、频次高、折扣率低→VIP 服务',
        '簇1「沉睡流失客户」（占 23%）：最近购买天数>120天→强力召回',
        '簇2「价格敏感客户」（占 35%）：折扣利用率最高→推送优惠券',
        '簇3「潜力成长客户」（占 27%）：注册天数短但件单价高→重点培育'
      ],
      businessInsight: '针对沉睡客户推送专属召回优惠（满50减10），预计可唤醒 15%-20% 的沉睡用户，直接贡献约 ¥12,000 月销售额。'
    },
    {
      id: 4,
      name: '数据可视化',
      icon: BarChart3,
      color: 'orange',
      level: '入门',
      description: '学习使用Python可视化库创建各种图表，有效展示数据分析结果。',
      tags: ['Matplotlib', 'Seaborn', '数据展示'],
      dataset: '店铺全年经营数据（365 天，包含流量、订单、转化、库存）',
      datasetFields: '日期、访客数、浏览量、订单数、销售额、退款额、库存量、客单价',
      process: [
        '① Matplotlib 配置中文字体（SimHei + axes.unicode_minus=False）',
        '② 读取 CSV 数据，pd.to_datetime() 设置日期索引',
        '③ 按月/周/日聚合，计算核心 KPI（同环比增长率）',
        '④ 按图表类型选择最佳呈现：趋势→折线图、占比→饼图、对比→柱状图',
        '⑤ Seaborn 绘制带置信区间的统计图，Plotly 生成交互式 HTML 图表'
      ],
      visualizations: [
        '月度销售额折线图（标注春节/618/双11峰值，揭示季节性规律）',
        '品类销售占比环形图（识别 Top3 品类占 68%）',
        '访客→订单转化漏斗图（整体转化率 3.2%，识别瓶颈在「浏览→加购」）',
        '客单价分布直方图+正态拟合（均值 ¥86，标准差 ¥23）'
      ],
      conclusions: [
        '2 月（春节）销售额最低（¥32,000），11 月最高（¥128,000）',
        '食品类占全店销售额 42%，其次是日用品 26%、服饰 18%',
        '「浏览→加购」转化率仅 12%，详情页跳失率偏高（68%）',
        '客单价 ¥86，低于行业均值 ¥100，有 15% 提升空间'
      ],
      businessInsight: '详情页跳失率高是最大瓶颈，建议优化商品主图和详情页文案；搭配「满100减10」活动提升客单价，目标客单价提升至 ¥99。'
    },
    {
      id: 5,
      name: '分组聚类分析',
      icon: GitBranch,
      color: 'red',
      level: '进阶',
      description: '深入学习聚类分析方法，包括层次聚类、密度聚类等多种聚类技术。',
      tags: ['层次聚类', 'DBSCAN', '聚类评估'],
      dataset: '商品特征数据（500 个 SKU，6 个维度）',
      datasetFields: '商品名、品类、单价、月销量、退货率、库存周转天数',
      process: [
        '① 数据标准化（StandardScaler），选取 4 个核心特征',
        '② 层次聚类：scipy.linkage(Ward 法) 生成树状图，确定切割高度',
        '③ DBSCAN(eps=0.8, min_samples=5) 自动发现密度簇',
        '④ K-Means 对比（三种算法轮廓系数对照）',
        '⑤ 对非球形簇（DBSCAN 检出 2 个环形簇）重点做业务解读'
      ],
      visualizations: [
        '层次聚类树状图（dendrogram，颜色区分 4 个大类）',
        'K-距离图（确定 DBSCAN eps=0.8 的拐点）',
        '3 种算法聚类结果对比散点图（PCA 降维到 2D）'
      ],
      conclusions: [
        '层次聚类分出 4 大类商品：爆款(12%)、常规品(48%)、长尾(28%)、问题品(12%)',
        'DBSCAN 识别出 2 个异常簇（共 8 个 SKU），包括 1 个高退货率簇和 1 个零动销簇',
        'K-Means 对环形簇无效，DBSCAN 更适合复杂结构数据'
      ],
      businessInsight: '识别出的「问题品簇」（退货率>15%）建议立即下架；「零动销簇」商品建议促销清仓，释放仓储资金。'
    },
    {
      id: 6,
      name: 'AB测试',
      icon: Target,
      color: 'pink',
      level: '进阶',
      description: '学习AB测试的设计与分析方法，评估不同方案的效果差异。',
      tags: ['假设检验', '统计分析', '实验设计'],
      dataset: '电商首页按钮文案 AB 测试数据（各 5,000 样本）',
      datasetFields: '用户ID、实验组别（A/B）、曝光数、点击数、转化数、下单金额',
      process: [
        '① 设计实验：A 组「立即购买」vs B 组「去抢购」（等量随机分流）',
        '② 收集数据：运行 7 天，各收集 5,000 次曝光的转化数据',
        '③ 计算核心指标：转化率 = 转化数/曝光数',
        '④ Z 检验（双侧）：H0：A=B 无差异；H1：A≠B',
        '⑤ 计算 95% 置信区间，评估效应量（Cohen\'s d）'
      ],
      visualizations: [
        '两组转化率柱状图（带误差棒，标注 95% 置信区间）',
        '转化率差异分布图（Bootstrap 重抽样 10,000 次）',
        'p 值变化曲线（随样本量增长，p 值趋近显著）'
      ],
      conclusions: [
        'A 组转化率 5.0%（250/5000），B 组转化率 6.3%（315/5000）',
        'B 组相对提升 26%，Z=3.21，p=0.0013（显著）',
        '95% 置信区间[0.6%, 2.0%]，不包含 0，结论可靠'
      ],
      businessInsight: '「去抢购」文案显著优于「立即购买」，预计全站推广后每月可多带来约 ¥45,000 订单额。建议 618 大促期间全量上线。'
    },
    {
      id: 7,
      name: '店铺经营分析',
      icon: TrendingUp,
      color: 'cyan',
      level: '入门',
      description: '分析店铺经营数据，包括销售额、客流量、转化率等关键指标。',
      tags: ['经营指标', '销售分析', 'KPI分析'],
      dataset: '门店 POS 系统全年日度经营数据（365 天，12 个字段）',
      datasetFields: '日期、门店、访客数、订单数、销售额、毛利、库存量、客单价、件单价、连带率',
      process: [
        '① 按日/周/月聚合，计算 GMV、客单价、转化率、毛利率等 12 个 KPI',
        '② 计算环比（vs 上期）和同比（vs 去年同期），找出异常波动点',
        '③ 拆解「销售额 = 访客数 × 转化率 × 客单价」，定位下滑原因',
        '④ 品类贡献度分析（ABC 分类：销售额前 20% SKU 占 80% 销售额）',
        '⑤ 制作月度经营看板：KPI 卡片 + 趋势图 + 排行榜'
      ],
      visualizations: [
        '月度销售额趋势折线图（标注春节/五一/618/双11 节点）',
        '品类贡献度帕累托图（前 3 品类贡献 72% 销售额）',
        '销售拆解漏斗（访客↓ → 转化率×客单价 → 定位增长瓶颈）',
        '门店 vs 全国平均对比雷达图（6 个维度找差距）'
      ],
      conclusions: [
        '全年 GMV ¥268 万，同比↑12%，但 Q2 下滑 8%（受竞品开业影响）',
        '连带率 1.42（行业均值 1.6），主因是品类关联推荐不足',
        '库存周转天数 38 天（行业均值 45 天），库存管理良好',
        '客单价 ¥86，低于均值 ¥100，连带率是最大提升空间'
      ],
      businessInsight: '建议在收银台增加「加购推荐话术」并设置连带奖励，连带率提升至 1.6 后可月增 ¥18,000 销售额。'
    },
    {
      id: 8,
      name: '消费者行为分析',
      icon: Users,
      color: 'indigo',
      level: '进阶',
      description: '分析消费者购买行为数据，了解消费者偏好和购买决策过程。',
      tags: ['行为分析', '用户画像', 'RFM模型'],
      dataset: '电商用户行为日志（10,000 用户，3 个月浏览/加购/购买记录）',
      datasetFields: '用户ID、行为类型(浏览/加购/购买)、商品ID、品类、时间戳、订单金额',
      process: [
        '① 提取 500 名活跃买家，计算 R/F/M 三个维度指标',
        '② RFM 等频分箱（qcut 各 5 等分），打分 1-5 分',
        '③ 按 R×F×M 组合规则划分为 4 大客户群',
        '④ 构建 AARRR 漏斗：曝光→点击→浏览→加购→下单→支付',
        '⑤ 留存曲线：Day1/Day7/Day30 留存率'
      ],
      visualizations: [
        'RFM 分群箱形图（各群 R/F/M 分布差异对比）',
        'AARRR 转化漏斗图（各环节转化率标注，总转化率 2.8%）',
        '客户生命周期留存曲线（标注关键节点留存率）'
      ],
      conclusions: [
        '高价值客户占 18%，贡献 52% 销售额，平均 LTV ¥8,600',
        '「浏览→加购」转化率仅 15%，详情页 CTA 按钮需要优化',
        '7 日留存率 28%（行业均值 35%），新用户体验有待提升',
        'RFM 模型识别出 92 名高流失风险客户（R 分≤2 且 F≤2）'
      ],
      businessInsight: '针对 92 名高流失风险客户发送专属优惠（满80减15），结合短信+Push 双触达，预计召回率 20%-25%，挽回月销售额约 ¥16,000。'
    },
    {
      id: 9,
      name: '市场分析',
      icon: PieChart,
      color: 'teal',
      level: '进阶',
      description: '进行市场趋势分析、竞争分析，为市场决策提供数据支持。',
      tags: ['市场趋势', '竞争分析', 'SWOT分析'],
      dataset: '中国电商市场宏观数据（2018-2024，7 年，CAGR 计算）',
      datasetFields: '年份、市场规模(万亿元)、增长率(%)、CR3市占率(%)、移动端占比(%)',
      process: [
        '① 收集艾瑞咨询/CNnic 权威报告数据，构建市场规模面板',
        '② 计算 CAGR=(期末/期初)^(1/年数)-1，衡量 7 年复合增长率',
        '③ PEST 分析：政策（电商法）、经济（消费升级）、社会（Z世代崛起）、技术（直播电商）',
        '④ 波特五力：现有竞争、新进入者、替代品、供应商、买家议价',
        '⑤ SWOT 矩阵：识别 SO/WO/ST/WT 四象限战略'
      ],
      visualizations: [
        '市场规模趋势折线图（标注 TAM/SAM/SOM 三层市场）',
        '竞争格局雷达图（对比自身与 Top3 竞品 5 个维度）',
        'PEST 四象限图（标注各维度的关键驱动因素）'
      ],
      conclusions: [
        '市场规模从 2018 ¥3.2 万亿增至 2024 ¥11.5 万亿，CAGR=23.8%',
        'CR3=75%（阿里+京东+拼多多），市场高度集中',
        '移动端占比从 62% 升至 91%，移动化趋势已成熟',
        '机会：下沉市场、跨境电商；威胁：监管趋严、流量红利消退'
      ],
      businessInsight: '建议聚焦下沉市场（SAM 仍有两倍增长空间），通过拼多多/抖音渠道渗透三四线城市，3 年目标拿下 2% SOM 份额（约 ¥230 亿市场）。'
    },
    {
      id: 10,
      name: '时间序列分析',
      icon: Activity,
      color: 'gray',
      level: '进阶',
      description: '学习时间序列数据的分析方法，进行趋势预测和季节性分析。',
      tags: ['时间序列', 'ARIMA', '预测模型'],
      dataset: '某饮料品牌 4 年月度销量（48 个月，销售额+折扣率+气温）',
      datasetFields: '月份、销售额(万元)、折扣率(%)、平均气温(℃)、是否节假日',
      process: [
        '① pd.date_range() 设置时间索引，ts.set_index() 绑定日期',
        '② seasonal_decompose(ts, model="additive", period=12) 分解趋势/季节/残差',
        '③ ADF 检验：p=0.32（非平稳）→ 一阶差分 → p=0.001（平稳）',
        '④ ACF/PACF 确定 p=2, q=2，训练 ARIMA(2,1,2)',
        '⑤ 滚动预测未来 12 个月，MAPE=8.3%（预测精度良好）'
      ],
      visualizations: [
        '原始序列 vs 趋势成分折线图（揭示 3 月/8 月双峰季节性）',
        '季节性成分热力图（12×1 月份系数，6-8 月为旺季）',
        '未来 12 个月预测折线图（附 95% 置信区间阴影带）'
      ],
      conclusions: [
        '长期趋势：年均增长 15%，预计 2025 年月销突破 ¥180 万',
        '季节性：6-8 月为旺季（系数 +30%），1-2 月为淡季（系数 -25%）',
        '残差均值≈0，无系统性偏差，模型拟合良好',
        'ARIMA 预测 MAPE=8.3%，比简单均值法（MAPE=18%）精度提升一倍以上'
      ],
      businessInsight: '根据季节性规律，建议在淡季（1-2 月）提前备货控制在 ¥80 万以下，旺季（6-8 月）备货提升至 ¥160 万，减少库存积压风险。'
    }
  ]);

  const [skills] = useState([
    {
      name: 'Python 编程',
      level: '熟练',
      icon: Code,
      color: 'blue',
      scenarios: ['数据分析脚本编写', '数据自动化处理', '爬虫采集', '利用 pandas / numpy 做批量清洗与统计'],
      stack: ['Python', 'pandas', 'NumPy', 'requests']
    },
    {
      name: '数据可视化',
      level: '熟练',
      icon: BarChart3,
      color: 'orange',
      scenarios: ['店铺经营指标看板', '消费者行为画像图', '市场趋势折线图', '向管理层汇报成果'],
      stack: ['Matplotlib', 'Seaborn', 'Plotly', 'Excel 图表']
    },
    {
      name: '数据库应用',
      level: '掌握',
      icon: Database,
      color: 'green',
      scenarios: ['商品订单表设计', '销售数据聚合查询', '多表连接统计', '日常报表数据源准备'],
      stack: ['MySQL', 'SQL', '数据库建模', '索引优化']
    },
    {
      name: '数据分析',
      level: '熟练',
      icon: LineChart,
      color: 'indigo',
      scenarios: ['AB 测试效果评估', '客户分群与 RFM 分析', '经营 KPI 监控', '撰写分析报告与建议'],
      stack: ['描述统计', '假设检验', 'K-means', '回归分析']
    },
    {
      name: '数据采集与处理',
      level: '掌握',
      icon: Search,
      color: 'cyan',
      scenarios: ['电商商品信息采集', '缺失值 / 异常值处理', '重复数据去重', '结构化非结构化数据转换'],
      stack: ['网页抓取', '数据清洗', '格式规范化', '数据去重']
    },
    {
      name: '供应链数据分析',
      level: '熟悉',
      icon: Package,
      color: 'teal',
      scenarios: ['库存周转分析', '补货建议', '供应商到货周期监控', '缺货与滞销 SKU 识别'],
      stack: ['库存分析', '周转天数', '缺货率', '供应链 KPI']
    }
  ]);

  const [certifications] = useState([
    { title: '全国计算机等级考试', level: '二级 Python', year: '2025', icon: Award },
    { title: '1+X 商务数据分析职业技能等级证书', level: '中级', year: '2025', icon: Award },
    { title: '全国大学生市场调查与分析大赛', level: '省赛二等奖', year: '2025', icon: Trophy },
    { title: '校级优秀学生奖学金', level: '二等奖学金', year: '2024', icon: Star }
  ]);

  const [experiences] = useState([
    {
      title: '校园销售数据分析实践',
      period: '2025.03 - 2025.06',
      desc: '以校园便利店真实销售数据为对象，使用 pandas 清洗 3 个月销售记录，完成商品热度排名与库存周转分析，输出 Excel 看板一份，识别出 5 个滞销 SKU。',
      highlights: ['清洗约 8,000 条销售流水', '设计 12 项经营 KPI', '完成可视化看板 1 份']
    },
    {
      title: '电商平台消费者行为分析实训',
      period: '2024.10 - 2024.12',
      desc: '基于课程提供的电商用户行为数据集，使用 Python 进行 RFM 客户分群，划分出 4 类客户群体并给出差异化运营建议，报告获课程优秀。',
      highlights: ['完成 RFM 模型客户分群', '撰写 10 页分析报告', '提出 6 条运营建议']
    },
    {
      title: '商务数据分析训练平台开发',
      period: '2025.01 - 至今',
      desc: '以个人身份搭建商务数据分析训练网站，覆盖数据清洗、AB 测试、客户聚类等 10 个项目，包含教学教程和实训练习，部署于 Cloudflare Pages。',
      highlights: ['10 个训练项目', 'React + TypeScript 开发', '独立部署上线']
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* 导航栏 */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600">钟依廷的个人页面</div>
          <div className="hidden md:flex space-x-3 text-sm">
            <a href="#home" className="text-blue-600 hover:text-blue-800">首页</a>
            <a href="#education" className="text-blue-600 hover:text-blue-800">学习背景</a>
            <a href="#skills" className="text-blue-600 hover:text-blue-800">技能</a>
            <a href="#highlights" className="text-blue-600 hover:text-blue-800">能力亮点</a>
            <a href="#honors" className="text-blue-600 hover:text-blue-800">荣誉</a>
            <a href="#experience" className="text-blue-600 hover:text-blue-800">实践</a>
            <a href="#career" className="text-blue-600 hover:text-blue-800">职业规划</a>
            <a href="#projects" className="text-blue-600 hover:text-blue-800">训练项目</a>
            <a href="#contact" className="text-blue-600 hover:text-blue-800">联系我</a>
          </div>
        </div>
      </nav>

      {/* 个人信息部分 */}
      <section id="home" className="pt-24 pb-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="mb-8 md:mb-0">
              <div className="w-48 h-48 rounded-full bg-white p-2 shadow-lg">
                <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-4xl font-bold text-blue-600">钟</span>
                </div>
              </div>
            </div>
            <div className="md:ml-8 text-center md:text-left md:flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">钟依廷</h1>
              <p className="text-xl mb-2 opacity-95">广东科学技术职业学院 · 商学院</p>
              <p className="text-lg mb-4 opacity-85">商务数据分析与应用专业 · 在校大三学生</p>

              {/* 学习背景标签 */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-white bg-opacity-15 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">🎓 核心课程：Python / 统计分析 / 数据可视化 / 数据库</span>
                <span className="bg-white bg-opacity-15 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">📚 在校课程平均成绩：85+</span>
                <span className="bg-white bg-opacity-15 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">🏆 全国大学生市调大赛省二等奖</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Python</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">数据可视化</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">数据库应用</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">数据分析</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">数据采集</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">供应链分析</span>
              </div>

              <p className="text-white mb-4 leading-relaxed">
                具有扎实的数据分析基础，熟练掌握Python编程、数据可视化和数据库应用技能，
                擅长从真实业务数据中提取信息并转化为可执行的业务洞察。
                已独立完成 10+ 个商务数据分析训练项目，
                具备较强的问题解决能力和团队协作精神，
                目标成为一名优秀的商务数据分析专员。
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#projects" className="bg-white text-blue-800 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  查看训练项目
                </a>
                <a href="#highlights" className="bg-white text-blue-800 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  能力亮点
                </a>
                <a href="#career" className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-blue-800 transition-colors">
                  我的职业规划
                </a>
                <a href="#contact" className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-blue-800 transition-colors">
                  联系我
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 学习背景 */}
      <section id="education" className="py-14 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-800">学习背景</h2>
          <p className="text-center text-gray-600 mb-10">系统化课程体系 + 真实项目训练，夯实商务数据分析基础</p>

          {/* 学校主卡 */}
          <div className="bg-white rounded-2xl shadow-md p-8 mb-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 mx-auto md:mx-0">
                🏫
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-1">广东科学技术职业学院 · 商学院</h3>
                <p className="text-blue-600 font-medium mb-3">商务数据分析与应用专业 · 全日制专科（预计 2026 年毕业）</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">📖 核心课程（85+）</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Python 基础', '数据采集与处理', '数据分析技术', '数据可视化', '数据库原理', '统计学基础', '供应链数据分析', 'Excel 高级应用', 'SQL 查询'].map((c, i) => (
                        <span key={i} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">{c}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">🛠 实训项目</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['电商销售预测', '客户 RFM 分群', 'AB 测试分析', '购物篮关联规则', '门店运营看板', '市场调研与报告'].map((c, i) => (
                        <span key={i} className="bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <span className="font-semibold text-gray-800">学习方式：</span>
                    课堂学习 + 课程实训 + 个人项目三位一体。课程理论打基础 → 课程实训练工具 → 独立项目做综合产出。
                    日常使用 Jupyter Notebook / Pandas / Matplotlib / MySQL 完成作业和项目。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 自学路径 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mb-3">
                <span className="text-xl">📚</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">自学教材与资源</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li>• 《Python数据分析快速上手》—— 入门到实战</li>
                <li>• Kaggle 平台 - 学习他人分析思路（EDA 经典项目）</li>
                <li>• 掘金 / CSDN - 中文技术社区，快速排错</li>
                <li>• Matplotlib 官方 Gallery - 学习可视化图表技巧</li>
                <li>• Towards Data Science - 英文优质博文</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mb-3">
                <span className="text-xl">💡</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">持续学习计划</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li>• 每日刷题：Pandas / SQL 基础，保持手感</li>
                <li>• 每周复盘：整理本周项目笔记，写成长记录</li>
                <li>• 每月输出：完成 1 个完整数据分析项目并部署展示</li>
                <li>• 长期目标：考取 1+X 商务数据分析中级证书</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 技能熟练度与应用场景 */}
      <section id="skills" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-800">专业技能</h2>
          <p className="text-center text-gray-600 mb-12">按熟练度分级呈现，每个技能都有真实的应用场景说明</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, idx) => {
              const SkillIcon = skill.icon;
              const colors = colorSchemes[skill.color as keyof typeof colorSchemes];
              const percent = skillLevels[skill.level] || 60;
              return (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center mr-4`}>
                      <SkillIcon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800">{skill.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-500 mr-2">熟练度：</span>
                        <span className={`text-sm font-semibold ${colors.text}`}>{skill.level}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full transition-all`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-2">应用场景</p>
                    <ul className="space-y-1.5">
                      {skill.scenarios.map((s, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.stack.map((tag, i) => (
                      <span key={i} className={`${colors.bg} ${colors.text} px-2 py-0.5 rounded text-xs font-medium`}>{tag}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 能力亮点 */}
      <section id="highlights" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-800">能力亮点</h2>
          <p className="text-center text-gray-600 mb-12">三大能力维度 + 量化成果，展示真实分析水平</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* 硬技能 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3">
                  <span className="text-2xl">💻</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">硬技能</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <p><span className="font-semibold text-blue-700">Python</span>：熟练 pandas / numpy / matplotlib 做数据清洗与可视化</p>
                <p><span className="font-semibold text-blue-700">SQL</span>：熟练多表 JOIN、聚合查询、窗口函数，能独立编写复杂查询</p>
                <p><span className="font-semibold text-blue-700">Excel</span>：熟练使用 VLOOKUP、数据透视表、条件格式，制作分析报表</p>
                <p><span className="font-semibold text-blue-700">统计分析</span>：描述统计、假设检验、相关性分析、AB 测试设计</p>
                <p><span className="font-semibold text-blue-700">工具链</span>：Jupyter Notebook、Git、VS Code、基本命令行操作</p>
              </div>
            </div>

            {/* 软技能 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mr-3">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">软技能</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <p><span className="font-semibold text-green-700">业务理解</span>：能将业务问题转化为可分析的数据问题</p>
                <p><span className="font-semibold text-green-700">结构化思维</span>：拆解问题 → 提出假设 → 数据验证 → 得出结论</p>
                <p><span className="font-semibold text-green-700">沟通表达</span>：分析结果清晰传达给非技术业务方</p>
                <p><span className="font-semibold text-green-700">团队协作</span>：在实训项目中担任小组组长，协调分工</p>
                <p><span className="font-semibold text-green-700">持续学习</span>：每日刷题、每周总结，保持进步节奏</p>
              </div>
            </div>

            {/* 量化成果 */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mr-3">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">量化成果</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <p><span className="font-semibold text-orange-700">10+</span> 完整商务数据分析项目（从取数到业务建议）</p>
                <p><span className="font-semibold text-orange-700">8 种</span> 分析方法掌握（RFM、关联规则、聚类、AB 测试、时间序列、漏斗、帕累托、对比）</p>
                <p><span className="font-semibold text-orange-700">3 份</span> 可落地业务建议报告（面向店长 / 运营岗位）</p>
                <p><span className="font-semibold text-orange-700">1 份</span> 全国大学生市调大赛省二等奖</p>
                <p><span className="font-semibold text-orange-700">独立搭建</span> 个人展示网站，部署到 Cloudflare Pages</p>
              </div>
            </div>
          </div>

          {/* 特色成就 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: '10+', label: '完成项目', icon: '📊' },
              { num: '85+', label: '课程平均成绩', icon: '📖' },
              { num: '3', label: '项目获业务可落地建议', icon: '💡' },
              { num: '24/7', label: '持续学习状态', icon: '⏰' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-blue-700 mb-1">{item.num}</div>
                <div className="text-xs text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 证件与荣誉 */}
      <section id="honors" className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-800">证件 & 荣誉</h2>
          <p className="text-center text-gray-600 mb-12">职业背书与在校荣誉，展示学习与竞赛成果</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {certifications.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div key={idx} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md border border-gray-200 text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-3">
                    <ItemIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{item.title}</h3>
                  <p className="text-orange-600 text-sm font-medium mb-1">{item.level}</p>
                  <p className="text-xs text-gray-400">{item.year}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 实践经历 */}
      <section id="experience" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-800">实践经历</h2>
          <p className="text-center text-gray-600 mb-12">用真实项目展现数据分析实战能力</p>
          <div className="space-y-5">
            {experiences.map((exp, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{exp.title}</h3>
                      <p className="text-sm text-blue-600 mt-0.5">{exp.period}</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm mb-4 md:ml-14">{exp.desc}</p>
                <div className="flex flex-wrap gap-2 md:ml-14">
                  {exp.highlights.map((h, i) => (
                    <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white text-center">
            <GraduationCap className="w-8 h-8 mx-auto mb-2 opacity-80" />
            <p className="text-sm opacity-90">在校持续积累实践经验，更多项目正在进行中…</p>
          </div>
        </div>
      </section>

      {/* 职业规划 */}
      <section id="career" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-800">我的职业规划</h2>
          <p className="text-center text-gray-600 mb-12">明确目标 + 阶段计划，持续成长为高价值数据分析师</p>

          {/* 三阶段时间线 */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  0-1 年
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">短期目标：成为一名能独立产出分析结果的初级数据分析师</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                    <div>
                      <p className="font-semibold text-blue-700 mb-1">💼 岗位期望</p>
                      <p>商务数据分析专员 / 运营数据分析师 / 零售电商数据分析岗</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-700 mb-1">✍ 技能提升</p>
                      <p>精通 SQL 复杂查询、掌握 BI 工具（Tableau/Power BI）、进阶 Python 数据分析</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-700 mb-1">🎯 关键产出</p>
                      <p>入职半年内能独立完成日/周/月报，快速响应业务方数据需求</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-700 mb-1">🏅 考证计划</p>
                      <p>考取 1+X 商务数据分析中级证书，为职业发展打基础</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  1-3 年
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">中期目标：成长为能驱动业务决策的中级数据分析师</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                    <div>
                      <p className="font-semibold text-green-700 mb-1">💼 能力进阶</p>
                      <p>从「取数+报表」升级为「诊断型分析」，能独立完成专题分析并提出业务建议</p>
                    </div>
                    <div>
                      <p className="font-semibold text-green-700 mb-1">📐 方法论沉淀</p>
                      <p>形成自己的分析框架（RFM、漏斗、归因、A/B、留存），可指导新人上手</p>
                    </div>
                    <div>
                      <p className="font-semibold text-green-700 mb-1">🤝 跨部门协作</p>
                      <p>熟悉业务流程，与运营/产品/市场协作，让数据真正驱动决策</p>
                    </div>
                    <div>
                      <p className="font-semibold text-green-700 mb-1">📈 行业选择</p>
                      <p>深耕零售/电商/快消行业，成为该领域有深度理解的业务型分析师</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  3-5 年
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">长期目标：成为能定义问题、搭建指标体系的资深分析师 / 团队负责人</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                    <div>
                      <p className="font-semibold text-orange-700 mb-1">🧭 战略视野</p>
                      <p>从被动取数转变为主动定义问题，发现业务增长点与风险点</p>
                    </div>
                    <div>
                      <p className="font-semibold text-orange-700 mb-1">📊 体系搭建</p>
                      <p>设计业务核心指标体系，搭建数据看板与自动化报表</p>
                    </div>
                    <div>
                      <p className="font-semibold text-orange-700 mb-1">👥 团队协作</p>
                      <p>带领 3-5 人小团队，建立数据分析 SOP，培养新人</p>
                    </div>
                    <div>
                      <p className="font-semibold text-orange-700 mb-1">🎓 持续精进</p>
                      <p>持续学习机器学习、因果推断等进阶方法；考虑提升学历，攻读本科/硕士</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 职业定位宣言 */}
          <div className="mt-10 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl p-8 text-white text-center shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold mb-3">我的职业定位</h3>
            <p className="text-base md:text-lg leading-relaxed opacity-95 max-w-3xl mx-auto">
              做一个「懂业务的数据分析人」—— 不只是取数做表，而是用数据发现问题、提出方案、推动落地，
              让每一份分析都能带来实际业务价值。我相信数据分析的终极价值是让更好的决策更快发生。
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm">
              <span className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-1.5 rounded-full">#业务敏感</span>
              <span className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-1.5 rounded-full">#扎实技术</span>
              <span className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-1.5 rounded-full">#结构化思维</span>
              <span className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-1.5 rounded-full">#持续学习</span>
              <span className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-1.5 rounded-full">#沟通协作</span>
            </div>
          </div>
        </div>
      </section>

      {/* 求职配套信息 - 联系方式 + 简历下载 */}
      <section id="contact" className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-800">联系方式</h2>
          <p className="text-center text-gray-600 mb-12">欢迎招聘方联系，期待与贵公司共同成长</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-200">
              <div className="w-14 h-14 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <Mail className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">联系邮箱</h3>
              <a href="mailto:2985384232@qq.com" className="text-blue-600 text-sm hover:text-blue-800 break-all">
                2985384232@qq.com
              </a>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-200">
              <div className="w-14 h-14 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-3">
                <MessageCircle className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">微信联系</h3>
              <p className="text-gray-700 text-sm">扫码或搜索手机号添加</p>
              <p className="text-green-600 text-xs mt-1 font-medium">请备注"应聘 · 岗位名称"</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-200">
              <div className="w-14 h-14 mx-auto rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                <Download className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">简历下载</h3>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-block text-indigo-600 text-sm hover:text-indigo-800 underline"
              >
                点击下载 PDF 简历
              </a>
              <p className="text-xs text-gray-400 mt-1">（如需简历请邮件索取）</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-blue-800 mb-2">求职意向</h3>
            <p className="text-gray-700 mb-4">
              商务数据分析专员 · 数据分析师助理 · 运营数据专员 · 市场数据分析岗
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {['全职', '实习', '广州/深圳/珠海', '数据分析方向'].map((tag, i) => (
                <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">{tag}</span>
              ))}
            </div>
            <p className="text-sm text-gray-500">更多材料 / 作品集请发邮件索取，感谢您的阅读 ❤</p>
          </div>
        </div>
      </section>

      {/* 训练项目部分 */}
      <section id="projects" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-800">商务数据分析训练项目</h2>
          <p className="text-center text-gray-600 mb-12">包含教学教程讲解和实训环节，全面提升数据分析实战能力</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const IconComponent = project.icon;
              const colors = colorSchemes[project.color as keyof typeof colorSchemes];
              return (
                <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  {/* 顶部渐变区：大图标 + 名称 */}
                  <div className={`h-36 relative overflow-hidden bg-gradient-to-br ${colors.gradient} flex flex-col items-center justify-center`}>
                    <IconComponent className="w-16 h-16 text-white mb-2" />
                    <span className="text-white text-lg font-bold">{project.name}</span>
                    <span className="absolute top-3 right-3 bg-white bg-opacity-20 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">{project.level}</span>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    {/* 数据集信息 */}
                    <div className={`${colors.bg} rounded-lg p-3 mb-3`}>
                      <p className={`text-xs font-medium ${colors.text} mb-0.5`}>📊 数据集</p>
                      <p className="text-gray-700 text-xs leading-relaxed">{project.dataset}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{project.datasetFields}</p>
                    </div>

                    {/* 分析流程（展示前 2 步）*/}
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-500 mb-1.5">⚙️ 分析流程</p>
                      <div className="space-y-1">
                        {project.process.slice(0, 2).map((step, i) => (
                          <p key={i} className="text-xs text-gray-600 leading-snug">
                            <span className={`font-semibold ${colors.text}`}>{step.split('）')[0]}）</span>
                            {step.split('）')[1]}
                          </p>
                        ))}
                        {project.process.length > 2 && (
                          <p className="text-xs text-gray-400 italic">+{project.process.length - 2} 步分析…</p>
                        )}
                      </div>
                    </div>

                    {/* 可视化图表 */}
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-500 mb-1.5">📈 产出图表</p>
                      <div className="flex flex-wrap gap-1">
                        {project.visualizations.slice(0, 3).map((v, i) => (
                          <span key={i} className={`${colors.bg} ${colors.text} px-2 py-0.5 rounded text-xs`}>{v.split('（')[0]}</span>
                        ))}
                        {project.visualizations.length > 3 && (
                          <span className="text-xs text-gray-400">+{project.visualizations.length - 3}</span>
                        )}
                      </div>
                    </div>

                    {/* 核心结论 */}
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-500 mb-1.5">💡 核心结论</p>
                      <div className="space-y-0.5">
                        {project.conclusions.slice(0, 2).map((c, i) => (
                          <p key={i} className="text-xs text-gray-700 leading-snug flex items-start">
                            <span className="text-green-500 mr-1 flex-shrink-0">✓</span>
                            {c.length > 50 ? c.substring(0, 50) + '…' : c}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* 业务价值（强调区） */}
                    <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-lg p-2.5 mb-4">
                      <p className="text-xs text-gray-600 leading-snug">
                        <span className="font-semibold text-gray-700">→ 业务价值：</span>
                        {project.businessInsight.length > 60
                          ? project.businessInsight.substring(0, 60) + '…'
                          : project.businessInsight}
                      </p>
                    </div>

                    {/* 技术标签 */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag, index) => (
                        <span key={index} className={`${colors.bg} ${colors.text} px-2 py-0.5 rounded text-xs font-medium`}>{tag}</span>
                      ))}
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex space-x-2 mt-auto">
                      <a href={`/project/${project.id}`} className="flex-1 text-center bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        教学教程
                      </a>
                      <a href={`/practice/${project.id}`} className="flex-1 text-center bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                        实训练习
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 留言板部分 */}
      <section id="guestbook" className="py-16 px-4 bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">留言板</h2>
          
          {/* 留言表单 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold mb-4 text-blue-800">留下您的留言</h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">姓名</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入您的姓名"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">邮箱</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入您的邮箱"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">留言内容</label>
                <textarea 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="请输入您的留言内容"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                提交留言
              </button>
            </form>
          </div>
          
          {/* 留言列表 */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4 text-blue-800">最新留言</h3>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-blue-600">张</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800">张老师</h4>
                  <p className="text-sm text-gray-500">2026-04-13</p>
                </div>
              </div>
              <p className="text-gray-600">课程内容很丰富，项目经验展示得很好，继续加油！</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-blue-600">李</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800">李同学</h4>
                  <p className="text-sm text-gray-500">2026-04-12</p>
                </div>
              </div>
              <p className="text-gray-600">页面设计得很好看，项目经验展示得很清晰！</p>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-blue-800 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p>© 2026 钟依廷的个人页面</p>
        </div>
      </footer>
    </div>
  );
}
