import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Database, ShoppingCart, Users, BarChart3, GitBranch, Target,
  TrendingUp, PieChart, Activity, ChevronLeft, Eye, EyeOff, Copy, Check, Lightbulb
} from 'lucide-react';

// ===== 图标 + 颜色 =====
const iconMap: Record<number, React.ComponentType<{ className?: string }>> = {
  1: Database, 2: ShoppingCart, 3: Users, 4: BarChart3, 5: GitBranch,
  6: Target, 7: TrendingUp, 8: Users, 9: PieChart, 10: Activity,
};
const colorMap: Record<number, { gradient: string; text: string; bg: string; border: string }> = {
  1: { gradient: 'from-blue-600 to-blue-800', text: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-400' },
  2: { gradient: 'from-green-600 to-green-800', text: 'text-green-600', bg: 'bg-green-100', border: 'border-green-400' },
  3: { gradient: 'from-purple-600 to-purple-800', text: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-400' },
  4: { gradient: 'from-orange-500 to-orange-700', text: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-400' },
  5: { gradient: 'from-red-500 to-red-700', text: 'text-red-600', bg: 'bg-red-100', border: 'border-red-400' },
  6: { gradient: 'from-pink-500 to-pink-700', text: 'text-pink-600', bg: 'bg-pink-100', border: 'border-pink-400' },
  7: { gradient: 'from-cyan-500 to-cyan-700', text: 'text-cyan-600', bg: 'bg-cyan-100', border: 'border-cyan-400' },
  8: { gradient: 'from-indigo-600 to-indigo-800', text: 'text-indigo-600', bg: 'bg-indigo-100', border: 'border-indigo-400' },
  9: { gradient: 'from-teal-500 to-teal-700', text: 'text-teal-600', bg: 'bg-teal-100', border: 'border-teal-400' },
  10: { gradient: 'from-gray-600 to-gray-800', text: 'text-gray-600', bg: 'bg-gray-100', border: 'border-gray-400' },
};
const nameMap: Record<number, string> = {
  1: '数据清洗', 2: '购物篮分析', 3: '客户聚类分析', 4: '数据可视化',
  5: '分组聚类分析', 6: 'AB测试', 7: '店铺经营分析', 8: '消费者行为分析',
  9: '市场分析', 10: '时间序列分析',
};

// ===== 练习题：每项目 3 道 =====
type Exercise = { title: string; description: string; hint: string; starter: string; solution: string };
const exercises: Record<number, Exercise[]> = {
  1: [
    {
      title: '练习1：缺失值统计与处理',
      description: '给定员工数据，统计每列缺失值数量，计算缺失率，并用均值填充「年龄」列。',
      hint: 'df.isnull().sum() → 统计；df[\'列\'].fillna(df[\'列\'].mean(), inplace=True) 填充。',
      starter: `import pandas as pd, numpy as np\ndf = pd.DataFrame({'姓名':['张三','李四',None,'王五'], '年龄':[25,np.nan,30,28]})\n\n# 在这里写代码\n`,
      solution: `import pandas as pd, numpy as np\ndf = pd.DataFrame({'姓名':['张三','李四',None,'王五'], '年龄':[25,np.nan,30,28]})\n\nprint('每列缺失值:'); print(df.isnull().sum())\nprint('缺失率:'); print(df.isnull().mean() * 100)\ndf['年龄'].fillna(df['年龄'].mean(), inplace=True)\nprint('填充后:'); print(df)\n`,
    },
    {
      title: '练习2：去重与异常值',
      description: '对订单数据，先按「订单号」去重保留第一条，再用 IQR 法检测「金额」列的异常值。',
      hint: 'df.drop_duplicates(subset=[\'订单号\'], keep=\'first\')；IQR=Q3-Q1；异常: < Q1-1.5*IQR 或 > Q3+1.5*IQR。',
      starter: `import pandas as pd, numpy as np\ndf = pd.DataFrame({'订单号':['A1','A2','A1','A3','A4'], '金额':[200,560,200,300,9999]})\n\n# 在这里写代码\n`,
      solution: `import pandas as pd, numpy as np\ndf = pd.DataFrame({'订单号':['A1','A2','A1','A3','A4'], '金额':[200,560,200,300,9999]})\ndf.drop_duplicates(subset=['订单号'], keep='first', inplace=True)\nQ1, Q3 = df['金额'].quantile(.25), df['金额'].quantile(.75)\nIQR = Q3 - Q1\nmask = (df['金额'] < Q1 - 1.5*IQR) | (df['金额'] > Q3 + 1.5*IQR)\nprint('异常订单:'); print(df[mask])\n`,
    },
    {
      title: '练习3：数据格式统一',
      description: '把日期字符串「2024/06/01」等转成 datetime；把「销售额」字符串「¥1,200」等转成整数。',
      hint: 'pd.to_datetime(df[\'日期\'])；df[\'销售额\'].str.replace(r\'[¥,]\',\'\').astype(int)。',
      starter: `import pandas as pd\ndf = pd.DataFrame({'日期':['2024/06/01','2024/06/02'], '销售额':['¥1,200','¥2,580']})\n\n# 在这里写代码\n`,
      solution: `import pandas as pd\ndf = pd.DataFrame({'日期':['2024/06/01','2024/06/02'], '销售额':['¥1,200','¥2,580']})\ndf['日期'] = pd.to_datetime(df['日期'])\ndf['销售额'] = df['销售额'].str.replace(r'[¥,]', '', regex=True).astype(int)\nprint(df.dtypes); print(df)\n`,
    },
  ],
  2: [
    {
      title: '练习1：支持度计算',
      description: '给定交易记录列表，计算商品「牛奶」和「面包」的支持度（含该商品的交易 / 总交易）。',
      hint: '遍历每条交易，count += 1 if 商品 in 交易；支持度 = count / len(transactions)。',
      starter: `transactions = [['牛奶','面包'], ['牛奶','尿布','啤酒'], ['面包','鸡蛋'], ['牛奶','面包','啤酒']]\n\n# 在这里写代码\n`,
      solution: `transactions = [['牛奶','面包'], ['牛奶','尿布','啤酒'], ['面包','鸡蛋'], ['牛奶','面包','啤酒']]\nn = len(transactions)\nsup_milk = sum(1 for t in transactions if '牛奶' in t) / n\nsup_bread = sum(1 for t in transactions if '面包' in t) / n\nprint(f'牛奶支持度: {sup_milk:.1%}, 面包支持度: {sup_bread:.1%}')\n`,
    },
    {
      title: '练习2：关联规则置信度',
      description: '计算规则「牛奶 → 面包」的置信度（P(面包|牛奶)）与提升度 Lift。',
      hint: '置信度 = 同时含牛奶面包的交易数 / 含牛奶的交易数；Lift = 置信度 / 支持度(面包)。',
      starter: `transactions = [['牛奶','面包'], ['牛奶','尿布','啤酒'], ['面包','鸡蛋'], ['牛奶','面包','啤酒']]\n\n# 在这里写代码\n`,
      solution: `transactions = [['牛奶','面包'], ['牛奶','尿布','啤酒'], ['面包','鸡蛋'], ['牛奶','面包','啤酒']]\nn = len(transactions)\nmilk = sum(1 for t in transactions if '牛奶' in t)\nbread = sum(1 for t in transactions if '面包' in t)\nboth = sum(1 for t in transactions if '牛奶' in t and '面包' in t)\nconf = both / milk\nlift = conf / (bread / n)\nprint(f'置信度(牛奶→面包): {conf:.1%}, Lift: {lift:.3f}')\n`,
    },
    {
      title: '练习3：Apriori 频繁项集',
      description: '用 TransactionEncoder + apriori 在最小支持度 0.4 下挖掘频繁项集。',
      hint: 'from mlxtend.preprocessing import TransactionEncoder；from mlxtend.frequent_patterns import apriori。',
      starter: `from mlxtend.preprocessing import TransactionEncoder\nfrom mlxtend.frequent_patterns import apriori\nimport pandas as pd\nt = [['牛奶','面包'], ['牛奶','尿布','啤酒'], ['面包','鸡蛋'], ['牛奶','面包','啤酒']]\n\n# 在这里写代码\n`,
      solution: `from mlxtend.preprocessing import TransactionEncoder\nfrom mlxtend.frequent_patterns import apriori\nimport pandas as pd\nt = [['牛奶','面包'], ['牛奶','尿布','啤酒'], ['面包','鸡蛋'], ['牛奶','面包','啤酒']]\nte = TransactionEncoder()\ndf = pd.DataFrame(te.fit(t).transform(t), columns=te.columns_)\nitems = apriori(df, min_support=0.4, use_colnames=True)\nprint(items.sort_values('support', ascending=False))\n`,
    },
  ],
  3: [
    {
      title: '练习1：K-Means 基础',
      description: '对客户（消费额，频次）二维数据使用 KMeans(n_clusters=3) 聚类，输出每个样本的标签及各簇中心。',
      hint: 'from sklearn.cluster import KMeans；先 StandardScaler 标准化。',
      starter: `import numpy as np\nfrom sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\nX = np.array([[15000,2],[8000,1],[25000,5],[30000,6],[6000,1],[18000,3],[22000,4],[9000,2]])\n\n# 在这里写代码\n`,
      solution: `import numpy as np\nfrom sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\nX = np.array([[15000,2],[8000,1],[25000,5],[30000,6],[6000,1],[18000,3],[22000,4],[9000,2]])\nXs = StandardScaler().fit_transform(X)\nkm = KMeans(n_clusters=3, random_state=42, n_init=10)\nlabels = km.fit_predict(Xs)\nfor i, (x, l) in enumerate(zip(X, labels)):\n    print(f'客户{i+1}: 消费{x[0]} 频次{x[1]} → 簇{l}')\nprint('中心(原尺度):', np.round(km.cluster_centers_, 2))\n`,
    },
    {
      title: '练习2：肘部法则选 K',
      description: '对同一数据循环 K=1~7，记录每次聚类的 inertia（簇内平方和），打印结果找出「肘部」。',
      hint: 'KMeans(n_clusters=k).fit(...).inertia_。',
      starter: `import numpy as np\nfrom sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\nX = np.array([[15000,2],[8000,1],[25000,5],[30000,6],[6000,1],[18000,3],[22000,4],[9000,2]])\n\n# 在这里写代码\n`,
      solution: `import numpy as np\nfrom sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\nX = np.array([[15000,2],[8000,1],[25000,5],[30000,6],[6000,1],[18000,3],[22000,4],[9000,2]])\nXs = StandardScaler().fit_transform(X)\nfor k in range(1, 8):\n    inertia = KMeans(n_clusters=k, random_state=42, n_init=10).fit(Xs).inertia_\n    print(f'K={k}: inertia={inertia:.3f}')\nprint('观察下降幅度，下降变缓的点就是肘部（合理 K）')\n`,
    },
    {
      title: '练习3：轮廓系数评估',
      description: '对 K=2,3,4 分别聚类，用 silhouette_score 比较各 K 的效果。',
      hint: 'from sklearn.metrics import silhouette_score。',
      starter: `import numpy as np\nfrom sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.metrics import silhouette_score\nX = np.array([[15000,2],[8000,1],[25000,5],[30000,6],[6000,1],[18000,3],[22000,4],[9000,2],[28000,5],[17000,3]])\n\n# 在这里写代码\n`,
      solution: `import numpy as np\nfrom sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.metrics import silhouette_score\nX = np.array([[15000,2],[8000,1],[25000,5],[30000,6],[6000,1],[18000,3],[22000,4],[9000,2],[28000,5],[17000,3]])\nXs = StandardScaler().fit_transform(X)\nfor k in [2,3,4]:\n    labels = KMeans(n_clusters=k, random_state=42, n_init=10).fit_predict(Xs)\n    score = silhouette_score(Xs, labels)\n    print(f'K={k}: silhouette={score:.4f}')\nprint('(silhouette 越接近 1 越好)')\n`,
    },
  ],
  4: [
    {
      title: '练习1：柱状图',
      description: '绘制 4 个季度的电子产品销售额柱状图，并在柱顶标注数值。',
      hint: 'plt.bar(x, height)；ax.bar_label(bars) 加数值标签。',
      starter: `import matplotlib.pyplot as plt\nq = ['Q1','Q2','Q3','Q4']\nsales = [120, 150, 180, 200]\n\n# 在这里写代码\n`,
      solution: `import matplotlib.pyplot as plt\nplt.rcParams['font.sans-serif'] = ['SimHei']\nq = ['Q1','Q2','Q3','Q4']\nsales = [120, 150, 180, 200]\nfig, ax = plt.subplots(figsize=(8,4))\nbars = ax.bar(q, sales, color=['#2E86AB','#E63946','#F4A261','#2A9D8F'])\nax.bar_label(bars)\nax.set_title('季度销售额'); ax.set_ylabel('万元')\nplt.tight_layout(); plt.show()\n`,
    },
    {
      title: '练习2：折线图趋势',
      description: '绘制 1~12 月销售额折线图，并在每个数据点上加圆点和文本标注。',
      hint: 'plt.plot(x, y, marker=\'o\')；plt.annotate 在每个点上写数值。',
      starter: `import matplotlib.pyplot as plt\nmonths = list(range(1,13))\nsales = [100,110,120,115,130,140,150,160,155,170,180,200]\n\n# 在这里写代码\n`,
      solution: `import matplotlib.pyplot as plt\nplt.rcParams['font.sans-serif'] = ['SimHei']\nmonths = list(range(1,13))\nsales = [100,110,120,115,130,140,150,160,155,170,180,200]\nfig, ax = plt.subplots(figsize=(10,4))\nax.plot(months, sales, marker='o', linewidth=2, color='#2E86AB')\nfor x, y in zip(months, sales): ax.annotate(y, (x, y), textcoords='offset points', xytext=(0,8), ha='center')\nax.set_title('月度销售趋势'); ax.set_xlabel('月'); ax.grid(True, alpha=.3)\nplt.tight_layout(); plt.show()\n`,
    },
    {
      title: '练习3：热力图',
      description: '用 seaborn.heatmap 画出 3×4 矩阵（商品×季度）的销售热力图，显示数值。',
      hint: 'sns.heatmap(matrix, annot=True, fmt=\'d\', cmap=\'YlOrRd\')。',
      starter: `import numpy as np, matplotlib.pyplot as plt, seaborn as sns\nmatrix = np.array([[50,60,70,80],[30,35,40,50],[40,45,55,65]])\nlabels_p = ['A','B','C']; labels_q = ['Q1','Q2','Q3','Q4']\n\n# 在这里写代码\n`,
      solution: `import numpy as np, matplotlib.pyplot as plt, seaborn as sns\nplt.rcParams['font.sans-serif'] = ['SimHei']\nmatrix = np.array([[50,60,70,80],[30,35,40,50],[40,45,55,65]])\nlabels_p = ['A','B','C']; labels_q = ['Q1','Q2','Q3','Q4']\nfig, ax = plt.subplots(figsize=(7,4))\nsns.heatmap(matrix, annot=True, fmt='d', cmap='YlOrRd', xticklabels=labels_q, yticklabels=labels_p, ax=ax)\nax.set_title('商品季度销售热力图')\nplt.tight_layout(); plt.show()\n`,
    },
  ],
  5: [
    {
      title: '练习1：层次聚类树状图',
      description: '用 scipy.cluster.hierarchy.ward + dendrogram 画层次聚类树状图。',
      hint: 'from scipy.cluster.hierarchy import linkage, dendrogram；linkage(X, method=\'ward\')。',
      starter: `import numpy as np, matplotlib.pyplot as plt\nfrom scipy.cluster.hierarchy import linkage, dendrogram\nfrom sklearn.preprocessing import StandardScaler\nX = np.array([[15000,2],[8000,1],[25000,5],[30000,6],[6000,1],[18000,3]])\n\n# 在这里写代码\n`,
      solution: `import numpy as np, matplotlib.pyplot as plt\nfrom scipy.cluster.hierarchy import linkage, dendrogram\nfrom sklearn.preprocessing import StandardScaler\nplt.rcParams['font.sans-serif'] = ['SimHei']\nX = np.array([[15000,2],[8000,1],[25000,5],[30000,6],[6000,1],[18000,3]])\nXs = StandardScaler().fit_transform(X)\nZ = linkage(Xs, method='ward')\nfig, ax = plt.subplots(figsize=(8,4))\ndendrogram(Z, labels=[f'客户{i+1}' for i in range(len(X))], ax=ax)\nax.set_title('层次聚类树状图'); plt.tight_layout(); plt.show()\n`,
    },
    {
      title: '练习2：DBSCAN 密度聚类',
      description: '用 DBSCAN(eps=0.6, min_samples=4) 对 2D 点聚类，打印各点标签并统计噪声数量。',
      hint: 'from sklearn.cluster import DBSCAN；labels == -1 的是噪声。',
      starter: `import numpy as np\nfrom sklearn.cluster import DBSCAN\nfrom sklearn.preprocessing import StandardScaler\nnp.random.seed(0)\nX = np.vstack([np.random.normal([3,3],.5,(8,2)), np.random.normal([8,8],.5,(8,2)), [[1,8],[10,2]]])\n\n# 在这里写代码\n`,
      solution: `import numpy as np\nfrom sklearn.cluster import DBSCAN\nfrom sklearn.preprocessing import StandardScaler\nnp.random.seed(0)\nX = np.vstack([np.random.normal([3,3],.5,(8,2)), np.random.normal([8,8],.5,(8,2)), [[1,8],[10,2]]])\nXs = StandardScaler().fit_transform(X)\nlabels = DBSCAN(eps=0.6, min_samples=4).fit_predict(Xs)\nfor i, (pt, lb) in enumerate(zip(X, labels)):\n    print(f'点{i+1}: ({pt[0]:.1f},{pt[1]:.1f}) → {\"噪声\" if lb==-1 else f\"簇{lb}\"}')\nprint(f'噪声数量: {(labels==-1).sum()}')\n`,
    },
    {
      title: '练习3：层次聚类切割成 K 簇',
      description: '对上面层次聚类结果，使用 fcluster 切割成 3 簇并打印样本标签。',
      hint: 'from scipy.cluster.hierarchy import fcluster；fcluster(Z, t=3, criterion=\'maxclust\')。',
      starter: `import numpy as np\nfrom scipy.cluster.hierarchy import linkage, fcluster\nfrom sklearn.preprocessing import StandardScaler\nX = np.array([[15000,2],[8000,1],[25000,5],[30000,6],[6000,1],[18000,3],[22000,4],[9000,2]])\n\n# 在这里写代码\n`,
      solution: `import numpy as np\nfrom scipy.cluster.hierarchy import linkage, fcluster\nfrom sklearn.preprocessing import StandardScaler\nX = np.array([[15000,2],[8000,1],[25000,5],[30000,6],[6000,1],[18000,3],[22000,4],[9000,2]])\nXs = StandardScaler().fit_transform(X)\nZ = linkage(Xs, method='ward')\nlabels = fcluster(Z, t=3, criterion='maxclust')\nfor i, (c, lb) in enumerate(zip(X, labels)):\n    print(f'客户{i+1}: {c[0]}元, {c[1]}次 → 簇{lb}')\n`,
    },
  ],
  6: [
    {
      title: '练习1：A/B 转化率',
      description: 'A 组：1000 人，45 购买；B 组：1000 人，65 购买。计算两组转化率与相对提升。',
      hint: '转化率 = 购买数 / 样本量；相对提升 = (B-A)/A。',
      starter: `nA, xA = 1000, 45\nnB, xB = 1000, 65\n\n# 在这里写代码\n`,
      solution: `nA, xA = 1000, 45\nnB, xB = 1000, 65\npA, pB = xA/nA, xB/nB\nprint(f'A: {pA:.2%}')\nprint(f'B: {pB:.2%}')\nprint(f'绝对提升: {pB-pA:.2%}')\nprint(f'相对提升: {(pB-pA)/pA:.2%}')\n`,
    },
    {
      title: '练习2：Z 检验显著性',
      description: '使用 pooled 两比例 Z 检验判断上述差异是否显著（α=0.05）。',
      hint: 'p_pool = (xA+xB)/(nA+nB)；SE = sqrt(p_pool*(1-p_pool)*(1/nA+1/nB))；z = (pB-pA)/SE；p = 2*(1-Φ(|z|))。',
      starter: `from scipy.stats import norm\nnA, xA = 1000, 45\nnB, xB = 1000, 65\n\n# 在这里写代码\n`,
      solution: `from scipy.stats import norm\nnA, xA = 1000, 45\nnB, xB = 1000, 65\npA, pB = xA/nA, xB/nB\np_pool = (xA+xB)/(nA+nB)\nSE = (p_pool*(1-p_pool)*(1/nA+1/nB))**0.5\nz = (pB - pA) / SE\np = 2 * (1 - norm.cdf(abs(z)))\nprint(f'z = {z:.3f}, p = {p:.4f}')\nprint('显著' if p<0.05 else '不显著')\n`,
    },
    {
      title: '练习3：Wilson 置信区间',
      description: '对 B 组 65/1000 的转化率计算 Wilson 95% 置信区间。',
      hint: 'Wilson score: (p̂+z²/(2n) ± z*√(p̂(1-p̂)/n+z²/(4n²))) / (1+z²/n), z=1.96。',
      starter: `from scipy.stats import norm\nx, n = 65, 1000\n\n# 在这里写代码\n`,
      solution: `from scipy.stats import norm\nx, n = 65, 1000\np = x / n\nz = norm.ppf(0.975)\ndenom = 1 + z**2/n\ncenter = (p + z**2/(2*n)) / denom\nmargin = z * (p*(1-p)/n + z**2/(4*n**2))**0.5 / denom\nprint(f'Wilson 95% CI: [{center-margin:.4f}, {center+margin:.4f}]')\n`,
    },
  ],
  7: [
    {
      title: '练习1：CVR 与 AOV 计算',
      description: '店铺日度数据：访客/订单/销售额。计算每日转化率(CVR)与客单价(AOV)。',
      hint: 'CVR=订单/访客；AOV=销售额/订单。',
      starter: `import pandas as pd\ndf = pd.DataFrame({'访客':[1000,1200,950,1100,1350], '订单':[80,95,70,85,110], '销售额':[4000,4800,3500,4200,5500]})\n\n# 在这里写代码\n`,
      solution: `import pandas as pd\ndf = pd.DataFrame({'访客':[1000,1200,950,1100,1350], '订单':[80,95,70,85,110], '销售额':[4000,4800,3500,4200,5500]})\ndf['CVR%'] = (df['订单']/df['访客']*100).round(2)\ndf['AOV'] = (df['销售额']/df['订单']).round(2)\nprint(df)\n`,
    },
    {
      title: '练习2：月度同比',
      description: '下表是 1~12 月销售额，计算每月环比增长率（与上月相比）。',
      hint: 'df[\'销售额\'].pct_change() * 100。',
      starter: `import pandas as pd\nsales = [100,110,120,115,130,140,150,160,155,170,180,200]\ndf = pd.DataFrame({'月份': range(1,13), '销售额': sales})\n\n# 在这里写代码\n`,
      solution: `import pandas as pd\nsales = [100,110,120,115,130,140,150,160,155,170,180,200]\ndf = pd.DataFrame({'月份': range(1,13), '销售额': sales})\ndf['环比%'] = (df['销售额'].pct_change()*100).round(2)\nprint(df)\nprint(f'月均增长: {df[\"环比%\"].mean():.2f}%')\n`,
    },
    {
      title: '练习3：客户分群价值',
      description: '根据每位客户的总消费额将客户按 30%/40%/30% 分为高(A)/中(B)/低(C) 价值三档，统计各档平均消费。',
      hint: 'pd.qcut(x, q=[0, 0.3, 0.7, 1], labels=[\'C\',\'B\',\'A\'])。',
      starter: `import pandas as pd, numpy as np\nnp.random.seed(0)\ncustomers = pd.DataFrame({'客户': range(1,21), '总额': np.random.randint(500, 5000, 20)})\n\n# 在这里写代码\n`,
      solution: `import pandas as pd, numpy as np\nnp.random.seed(0)\ncustomers = pd.DataFrame({'客户': range(1,21), '总额': np.random.randint(500, 5000, 20)})\ncustomers['档次'] = pd.qcut(customers['总额'], q=[0,0.3,0.7,1.0], labels=['C(低)','B(中)','A(高)'])\nprint(customers.sort_values('总额', ascending=False))\nprint('\\n按档次汇总:')\nprint(customers.groupby('档次', observed=False)['总额'].agg(['count','mean','min','max']).round(0))\n`,
    },
  ],
  8: [
    {
      title: '练习1：RFM 计算',
      description: '给定消费表（客户/日期/金额），按每位客户计算 R(距参考日天数，越小越好)、F(消费次数)、M(总金额)。参考日 2024-12-31。',
      hint: 'df.groupby(\'客户\').agg(R=(\'日期\', lambda x: (ref-x.max()).days), F=(\'日期\', \'count\'), M=(\'金额\', \'sum\'))。',
      starter: `import pandas as pd, numpy as np\nfrom datetime import datetime, timedelta\nnp.random.seed(0)\nref = datetime(2024,12,31)\ndf = pd.DataFrame({'客户': np.repeat([f'C{i}' for i in range(1,6)], 4), '日期': [ref - timedelta(days=int(d)) for d in np.random.randint(1,300,20)], '金额': np.random.randint(100,2000,20)})\n\n# 在这里写代码\n`,
      solution: `import pandas as pd, numpy as np\nfrom datetime import datetime, timedelta\nnp.random.seed(0)\nref = datetime(2024,12,31)\ndf = pd.DataFrame({'客户': np.repeat([f'C{i}' for i in range(1,6)], 4), '日期': [ref - timedelta(days=int(d)) for d in np.random.randint(1,300,20)], '金额': np.random.randint(100,2000,20)})\nrfm = df.groupby('客户').agg(R=('日期', lambda x: (ref-x.max()).days), F=('日期', 'count'), M=('金额', 'sum')).reset_index()\nprint(rfm.sort_values('M', ascending=False))\n`,
    },
    {
      title: '练习2：RFM 打分',
      description: '对上述 RFM，分别为 R/F/M 按分位数打 1~5 分（R 越小越好，所以反向），计算总 RFM 分并输出 TOP5。',
      hint: 'R: pd.qcut(R, 5, labels=[5,4,3,2,1])；F/M: pd.qcut(..., labels=[1,2,3,4,5])。',
      starter: `import pandas as pd, numpy as np\nfrom datetime import datetime, timedelta\nnp.random.seed(0)\nref = datetime(2024,12,31)\ndf = pd.DataFrame({'客户': np.repeat([f'C{i}' for i in range(1,11)], np.random.randint(1,8,10)), '日期': [ref - timedelta(days=int(d)) for d in np.random.randint(1,300,50)], '金额': np.random.randint(100,2000,50)})\n\n# 在这里写代码\n`,
      solution: `import pandas as pd, numpy as np\nfrom datetime import datetime, timedelta\nnp.random.seed(0)\nref = datetime(2024,12,31)\ndf = pd.DataFrame({'客户': np.repeat([f'C{i}' for i in range(1,11)], np.random.randint(1,8,10)), '日期': [ref - timedelta(days=int(d)) for d in np.random.randint(1,300,50)], '金额': np.random.randint(100,2000,50)})\nrfm = df.groupby('客户').agg(R=('日期',lambda x:(ref-x.max()).days), F=('日期','count'), M=('金额','sum')).reset_index()\nrfm['R_score'] = pd.qcut(rfm['R'], 5, labels=[5,4,3,2,1]).astype(int)\nrfm['F_score'] = pd.qcut(rfm['F'].rank(method='first'), 5, labels=[1,2,3,4,5]).astype(int)\nrfm['M_score'] = pd.qcut(rfm['M'].rank(method='first'), 5, labels=[1,2,3,4,5]).astype(int)\nrfm['总分'] = rfm['R_score'] + rfm['F_score'] + rfm['M_score']\nprint(rfm.sort_values('总分', ascending=False))\n`,
    },
    {
      title: '练习3：AARRR 漏斗计算',
      description: '某 APP 某月数据：访问 10000 → 注册 3000 → 激活 1500 → 付费 450 → 复购 270。计算每步转化率，并画一个简化漏斗。',
      hint: '漏斗：逐级计算 step_i / step_prev；最后画 barh。',
      starter: `import matplotlib.pyplot as plt\nstages = ['访问', '注册', '激活', '付费', '复购']\nvalues = [10000, 3000, 1500, 450, 270]\n\n# 在这里写代码\n`,
      solution: `import matplotlib.pyplot as plt\nplt.rcParams['font.sans-serif'] = ['SimHei']\nstages = ['访问','注册','激活','付费','复购']\nvalues = [10000, 3000, 1500, 450, 270]\nfor i in range(1, len(stages)):\n    conv = values[i]/values[i-1]*100\n    print(f'{stages[i-1]} → {stages[i]}: {conv:.1f}%')\nprint(f'整体转化: {values[-1]/values[0]*100:.2f}%')\nfig, ax = plt.subplots(figsize=(8,4))\nax.barh(stages[::-1], values[::-1], color='#2E86AB')\nax.set_title('AARRR 漏斗')\nfor i, v in enumerate(values[::-1]): ax.text(v, i, f' {v:,}', va='center')\nplt.tight_layout(); plt.show()\n`,
    },
  ],
  9: [
    {
      title: '练习1：市场规模与增长率',
      description: '某品类 2018-2024 年市场规模（亿元）：100,120,150,190,240,300,380。计算各年增长率及复合年增长率 CAGR。',
      hint: '增长率 = (y-y_prev)/y_prev；CAGR = (最后/首)^(1/n) - 1。',
      starter: `import pandas as pd\nyears = list(range(2018,2025))\nsize = [100,120,150,190,240,300,380]\n\n# 在这里写代码\n`,
      solution: `import pandas as pd\nyears = list(range(2018,2025))\nsize = [100,120,150,190,240,300,380]\ndf = pd.DataFrame({'年份': years, '规模': size})\ndf['增长率%'] = (df['规模'].pct_change()*100).round(2)\nprint(df)\ncagr = (df['规模'].iloc[-1]/df['规模'].iloc[0])**(1/(len(years)-1)) - 1\nprint(f'CAGR = {cagr*100:.2f}%')\n`,
    },
    {
      title: '练习2：市场份额',
      description: 'A/B/C/D 四家公司销售额：450, 320, 280, 150。计算每家市场份额并画饼图。',
      hint: '份额 = 值 / 总和；plt.pie(..., autopct=\'%.1f%%\')。',
      starter: `import matplotlib.pyplot as plt\ncompanies = ['A','B','C','D']\nsales = [450, 320, 280, 150]\n\n# 在这里写代码\n`,
      solution: `import matplotlib.pyplot as plt\nplt.rcParams['font.sans-serif'] = ['SimHei']\ncompanies = ['A','B','C','D']\nsales = [450, 320, 280, 150]\ntotal = sum(sales)\nfor c, s in zip(companies, sales):\n    print(f'{c}: {s} ({s/total*100:.1f}%)')\nfig, ax = plt.subplots(figsize=(5,5))\nax.pie(sales, labels=companies, autopct='%.1f%%', colors=['#2E86AB','#E63946','#F4A261','#2A9D8F'])\nax.set_title('市场份额'); plt.show()\n`,
    },
    {
      title: '练习3：SWOT 数据化打分',
      description: '某公司 SWOT 各维度评分（0-10）：S=8, W=4, O=7, T=5。计算 SWOT 矩阵坐标（S-W, O-T），输出所在象限。',
      hint: 'X = S - W；Y = O - T；X>0 且 Y>0 → 第一象限（优势+机会，SO 战略）。',
      starter: `S, W, O, T = 8, 4, 7, 5\n\n# 在这里写代码\n`,
      solution: `S, W, O, T = 8, 4, 7, 5\nX, Y = S - W, O - T\nprint(f'X = S - W = {X}')\nprint(f'Y = O - T = {Y}')\nif X>0 and Y>0: print('第一象限（SO）：增长型战略')\nelif X<0 and Y>0: print('第二象限（WO）：扭转型战略')\nelif X<0 and Y<0: print('第三象限（WT）：防御型战略')\nelse: print('第四象限（ST）：多元化战略')\n`,
    },
  ],
  10: [
    {
      title: '练习1：滑动平均值',
      description: '给定 12 个月销售额，计算 3 个月移动平均（MA3）并与原数据对比打印。',
      hint: 'df[\'销售额\'].rolling(3).mean()。',
      starter: `import pandas as pd\nsales = [100,110,120,115,130,140,150,160,155,170,180,200]\ndf = pd.DataFrame({'月': range(1,13), '销售额': sales})\n\n# 在这里写代码\n`,
      solution: `import pandas as pd\nsales = [100,110,120,115,130,140,150,160,155,170,180,200]\ndf = pd.DataFrame({'月': range(1,13), '销售额': sales})\ndf['MA3'] = df['销售额'].rolling(3).mean().round(1)\nprint(df)\n`,
    },
    {
      title: '练习2：同比差分',
      description: '对上述序列，计算差分（一阶差分即 y_t - y_{t-1}）作为平稳化处理的第一步，打印并统计波动。',
      hint: 'df[\'销售额\'].diff()。',
      starter: `import pandas as pd\nsales = [100,110,120,115,130,140,150,160,155,170,180,200]\n\n# 在这里写代码\n`,
      solution: `import pandas as pd\nsales = [100,110,120,115,130,140,150,160,155,170,180,200]\ndf = pd.DataFrame({'月': range(1,13), '销售额': sales})\ndf['差分'] = df['销售额'].diff()\nprint(df)\nprint(f'平均波动: {df[\"差分\"].mean():.2f}, 波动标准差: {df[\"差分\"].std():.2f}')\n`,
    },
    {
      title: '练习3：ARIMA 简易预测',
      description: '用 statsmodels 的 ARIMA(p=2, d=1, q=2) 对 12 个月销售额进行拟合，并预测未来 3 个月。',
      hint: 'from statsmodels.tsa.arima.model import ARIMA；model = ARIMA(series, order=(2,1,2))；result.forecast(steps=3)。',
      starter: `import pandas as pd\nfrom statsmodels.tsa.arima.model import ARIMA\nsales = pd.Series([100,110,120,115,130,140,150,160,155,170,180,200])\n\n# 在这里写代码\n`,
      solution: `import pandas as pd\nfrom statsmodels.tsa.arima.model import ARIMA\nsales = pd.Series([100,110,120,115,130,140,150,160,155,170,180,200])\nmodel = ARIMA(sales, order=(2,1,2)).fit()\nforecast = model.forecast(steps=3)\nfor i, v in enumerate(forecast.values, 1):\n    print(f'第 {len(sales)+i} 月预测: {v:.1f}')\nprint(f'AIC = {model.aic:.2f}')\n`,
    },
  ],
};

// ===== React UI 组件 =====
export default function Practice() {
  const { id } = useParams<{ id: string }>();
  const projectId = Math.max(1, Math.min(10, parseInt(id || '1')));
  const color = colorMap[projectId];
  const IconComponent = iconMap[projectId];
  const projectExercises = exercises[projectId] || [];
  const [activeExercise, setActiveExercise] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [code, setCode] = useState(projectExercises[0]?.starter || '');
  const [copied, setCopied] = useState(false);

  // 切换练习时重置代码
  const switchExercise = (idx: number) => {
    setActiveExercise(idx);
    setCode(projectExercises[idx]?.starter || '');
    setShowSolution(false);
  };

  const copySolution = async () => {
    try {
      await navigator.clipboard.writeText(projectExercises[activeExercise].solution);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* ignore */ }
  };

  const currentEx = projectExercises[activeExercise];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* 头部 */}
      <section className={`bg-gradient-to-r ${color.gradient} text-white py-8 px-4`}>
        <div className="container mx-auto max-w-5xl">
          <Link to="/" className="inline-flex items-center mb-4 text-white text-opacity-90 hover:text-white text-sm">
            <ChevronLeft className="w-4 h-4" /> 返回首页
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white bg-opacity-20 rounded-2xl">
              <IconComponent className="w-10 h-10" />
            </div>
            <div>
              <div className="text-sm text-white text-opacity-80 mb-1">实训练习</div>
              <h1 className="text-3xl font-bold">{nameMap[projectId]}</h1>
              <p className="mt-1 text-white text-opacity-90 text-sm">共 {projectExercises.length} 道代码练习，请在编辑器中作答，然后对照参考答案检查</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-4 py-8">
        {/* 练习选项卡 */}
        <div className="flex gap-2 mb-6 border-b overflow-x-auto">
          {projectExercises.map((ex, idx) => (
            <button key={idx} onClick={() => switchExercise(idx)}
              className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeExercise === idx ? `${color.border} ${color.text} -mb-px` : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}>{ex.title}</button>
          ))}
        </div>

        {currentEx && (
          <div className="space-y-6">
            {/* 题目描述 */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-xl font-bold text-gray-800 mb-3">{currentEx.title}</h2>
              <p className="text-gray-600 leading-relaxed">{currentEx.description}</p>
              <div className={`mt-4 p-3 rounded-lg ${color.bg}`}>
                <div className="flex items-start gap-2">
                  <Lightbulb className={`w-4 h-4 mt-1 flex-shrink-0 ${color.text}`} />
                  <div>
                    <div className={`text-sm font-medium ${color.text} mb-1`}>解题提示</div>
                    <div className="text-sm text-gray-700">{currentEx.hint}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 代码编辑器 */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-200 text-sm">
                <span className="font-medium">📝 我的代码编辑器（Python）</span>
                <span className="text-xs text-gray-400">在此编写你的答案</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full min-h-[300px] p-4 font-mono text-sm bg-gray-900 text-green-200 resize-y focus:outline-none"
              />
            </div>

            {/* 参考答案 */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-800 text-gray-200">
                <span className="font-medium text-sm">✅ 参考答案</span>
                <div className="flex gap-2">
                  <button onClick={copySolution} className="text-xs px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors flex items-center gap-1">
                    {copied ? <><Check className="w-3 h-3" /> 已复制</> : <><Copy className="w-3 h-3" /> 复制</>}
                  </button>
                  <button onClick={() => setShowSolution(!showSolution)} className="text-xs px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors flex items-center gap-1">
                    {showSolution ? <><EyeOff className="w-3 h-3" /> 隐藏</> : <><Eye className="w-3 h-3" /> 展开</>}
                  </button>
                </div>
              </div>
              {showSolution ? (
                <pre className="p-4 bg-white text-sm overflow-x-auto">
                  <code className="text-gray-800 whitespace-pre font-mono">{currentEx.solution}</code>
                </pre>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">点击右上角「展开」查看参考答案</div>
              )}
            </div>

            {/* 底部提示 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800 leading-relaxed">
              <strong>💡 运行方式：</strong>将上面「我的代码编辑器」中的代码复制到本地 <code className="bg-yellow-100 px-1 rounded">.py</code> 文件，或使用 <code className="bg-yellow-100 px-1 rounded">在线 Python 运行器</code>（如 python.org/shell）运行。本页面作为练习题板，不提供在线执行环境。
            </div>
          </div>
        )}
      </section>

      <footer className="bg-gray-800 text-gray-300 py-6 px-4 text-center text-sm">
        商务数据分析训练平台 · {nameMap[projectId]} 实训练习
      </footer>
    </div>
  );
}
