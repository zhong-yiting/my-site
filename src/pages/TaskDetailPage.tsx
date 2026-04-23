import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseById } from '../data/courses';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';

interface Task {
  id: string;
  chapterId: string;
  title: string;
  description: string;
  type: 'multiple-choice' | 'fill-blank' | 'code';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  initialCode?: string;
}

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = getCourseById('1');
  const chapter = course?.chapters.find(ch => ch.id === id);
  
  // 为每个章节创建对应的实训任务数据，大部分改为编程题
  const tasks: Task[] = [
    {
      id: '1-1',
      chapterId: '1-1',
      title: '销售数据清洗与预处理',
      description: '学习如何处理销售数据中的缺失值和异常值',
      type: 'code',
      question: '请编写代码处理销售数据中的缺失值，使用均值填充数值型列。',
      correctAnswer: `import pandas as pd
import numpy as np

# 假设sales_data是包含销售数据的DataFrame
# 处理缺失值
def clean_sales_data(df):
    # 数值型列使用均值填充
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].mean())
    return df

# 使用示例
cleaned_data = clean_sales_data(sales_data)
print(cleaned_data.isnull().sum())`,
      initialCode: `import pandas as pd
import numpy as np

# 假设sales_data是包含销售数据的DataFrame
# 请编写代码处理缺失值

def clean_sales_data(df):
    # 在这里编写你的代码
    pass

# 测试你的代码
# cleaned_data = clean_sales_data(sales_data)
# print(cleaned_data.isnull().sum())`,
      explanation: '这段代码使用pandas库，首先识别数值型列，然后使用均值填充这些列中的缺失值。这种方法可以保留数据的统计特性，同时避免了删除数据带来的信息损失。'
    },
    {
      id: '1-2',
      chapterId: '1-2',
      title: '销售趋势分析与预测',
      description: '分析销售数据的时间趋势，学习预测方法',
      type: 'code',
      question: '请编写代码计算7天移动平均值来分析销售趋势。',
      correctAnswer: `import pandas as pd
import numpy as np

# 假设sales_data是包含日期和销售额的DataFrame
# 计算7天移动平均
def calculate_moving_average(df, window=7):
    # 确保日期列是datetime类型
    df['date'] = pd.to_datetime(df['date'])
    df = df.sort_values('date')
    
    # 计算移动平均
    df['moving_average'] = df['sales'].rolling(window=window).mean()
    return df

# 使用示例
result = calculate_moving_average(sales_data, 7)
print(result[['date', 'sales', 'moving_average']].tail(10))`,
      initialCode: `import pandas as pd
import numpy as np

# 假设sales_data是包含日期和销售额的DataFrame
# 请编写代码计算7天移动平均值

def calculate_moving_average(df, window=7):
    # 在这里编写你的代码
    pass

# 测试你的代码
# result = calculate_moving_average(sales_data, 7)
# print(result[['date', 'sales', 'moving_average']].tail(10))`,
      explanation: '这段代码使用pandas的rolling函数计算7天移动平均值，这种方法可以平滑时间序列数据，消除短期波动，更好地观察长期趋势。移动平均是时间序列分析和预测的基础工具之一。'
    },
    {
      id: '1-3',
      chapterId: '1-3',
      title: '客户分群与精准营销',
      description: '使用K-means算法对客户进行分群',
      type: 'code',
      question: '请编写代码使用K-means算法对客户数据进行分群，设置聚类数为3。',
      correctAnswer: `from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import pandas as pd
import numpy as np

# 假设customer_data是包含客户特征的DataFrame
def customer_segmentation(df, n_clusters=3):
    # 选择用于聚类的特征
    features = ['age', 'income', 'spending_score', 'purchase_frequency']
    X = df[features]
    
    # 标准化数据
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # K-means聚类
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    df['cluster'] = kmeans.fit_predict(X_scaled)
    
    return df, kmeans

# 使用示例
segmented_data, model = customer_segmentation(customer_data, 3)
print(segmented_data['cluster'].value_counts())`,
      initialCode: `from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import pandas as pd
import numpy as np

# 假设customer_data是包含客户特征的DataFrame
# 请编写代码使用K-means算法对客户进行分群

def customer_segmentation(df, n_clusters=3):
    # 在这里编写你的代码
    pass

# 测试你的代码
# segmented_data, model = customer_segmentation(customer_data, 3)
# print(segmented_data['cluster'].value_counts())`,
      explanation: '这段代码使用scikit-learn库中的KMeans类，首先对数据进行标准化处理，然后设置聚类数为3，对客户数据进行聚类分析。标准化是非常重要的步骤，确保所有特征在相同的尺度上进行聚类。'
    },
    {
      id: '1-4',
      chapterId: '1-4',
      title: '产品销售分析与优化',
      description: '分析产品销售数据，优化产品组合',
      type: 'code',
      question: '请编写代码计算每个产品的毛利率，并找出最盈利的产品。',
      correctAnswer: `import pandas as pd

# 假设product_sales是包含产品销售数据的DataFrame
def analyze_product_profitability(df):
    # 计算每个产品的毛利率
    df['gross_margin'] = (df['revenue'] - df['cost']) / df['revenue']
    
    # 按产品分组，计算平均毛利率和总销售额
    product_summary = df.groupby('product_name').agg({
        'gross_margin': 'mean',
        'revenue': 'sum',
        'quantity': 'sum'
    }).reset_index()
    
    # 按毛利率排序
    product_summary = product_summary.sort_values('gross_margin', ascending=False)
    
    return product_summary

# 使用示例
results = analyze_product_profitability(product_sales)
print('最盈利的产品：')
print(results.head(5))
print('\\n最不盈利的产品：')
print(results.tail(5))`,
      initialCode: `import pandas as pd

# 假设product_sales是包含产品销售数据的DataFrame
# 请编写代码计算每个产品的毛利率，并找出最盈利的产品

def analyze_product_profitability(df):
    # 在这里编写你的代码
    pass

# 测试你的代码
# results = analyze_product_profitability(product_sales)
# print('最盈利的产品：')
# print(results.head(5))
# print('\\n最不盈利的产品：')
# print(results.tail(5))`,
      explanation: '毛利率是衡量产品盈利能力的核心指标，计算公式为（销售额-成本）/销售额。这段代码计算每个产品的毛利率，然后按毛利率排序，帮助企业识别最盈利和最不盈利的产品，从而优化产品组合。'
    },
    {
      id: '1-5',
      chapterId: '1-5',
      title: '库存优化分析',
      description: '优化库存水平，减少库存成本',
      type: 'code',
      question: '请编写代码计算经济订货量(EOQ)和安全库存。',
      correctAnswer: `import math
import pandas as pd
import numpy as np

# 计算经济订货量(EOQ)和安全库存
def inventory_optimization(demand, ordering_cost, holding_cost, service_level=0.95):
    """
    参数:
    demand: 年需求量
    ordering_cost: 每次订货成本
    holding_cost: 年单位持有成本
    service_level: 服务水平(默认0.95)
    """
    # 经济订货量(EOQ)
    eoq = math.sqrt((2 * demand * ordering_cost) / holding_cost)
    
    # 假设需求标准差是平均需求的20%
    demand_std = demand * 0.2
    # 假设提前期是1个月
    lead_time = 1/12
    
    # 提前期内的需求标准差
    lead_time_std = demand_std * math.sqrt(lead_time)
    
    # Z-score for 95% service level
    z_score = 1.645
    
    # 安全库存
    safety_stock = z_score * lead_time_std
    
    return {
        'EOQ': round(eoq, 2),
        'safety_stock': round(safety_stock, 2),
        'annual_ordering_cost': round((demand / eoq) * ordering_cost, 2),
        'annual_holding_cost': round((eoq / 2) * holding_cost, 2),
        'total_cost': round((demand / eoq) * ordering_cost + (eoq / 2) * holding_cost, 2)
    }

# 使用示例
results = inventory_optimization(
    demand=10000,
    ordering_cost=100,
    holding_cost=20,
    service_level=0.95
)
print('库存优化结果：')
for key, value in results.items():
    print(f'{key}: {value}')`,
      initialCode: `import math
import pandas as pd
import numpy as np

# 请编写代码计算经济订货量(EOQ)和安全库存

def inventory_optimization(demand, ordering_cost, holding_cost, service_level=0.95):
    # 在这里编写你的代码
    pass

# 测试你的代码
# results = inventory_optimization(
#     demand=10000,
#     ordering_cost=100,
#     holding_cost=20,
#     service_level=0.95
# )
# print('库存优化结果：')
# for key, value in results.items():
#     print(f'{key}: {value}')`,
      explanation: '经济订货量(EOQ)是库存管理的经典模型，用于确定最优订货量，平衡订货成本和持有成本。安全库存是为了应对需求和供应的不确定性而额外持有的库存，确保在95%的服务水平下不会缺货。'
    },
    {
      id: '1-6',
      chapterId: '1-6',
      title: '供应链数据分析',
      description: '分析供应链数据，优化供应链流程',
      type: 'code',
      question: '请编写代码分析供应商绩效，包括准时交付率和质量评分。',
      correctAnswer: `import pandas as pd
import numpy as np

# 假设supplier_data是包含供应商数据的DataFrame
def analyze_supplier_performance(df):
    # 计算准时交付率
    df['on_time'] = (df['actual_delivery_date'] <= df['expected_delivery_date']).astype(int)
    
    # 按供应商分组计算绩效指标
    supplier_performance = df.groupby('supplier_name').agg({
        'on_time': 'mean',  # 准时交付率
        'quality_score': 'mean',  # 平均质量评分
        'order_value': 'sum',  # 总订单价值
        'order_count': 'size'  # 订单数量
    }).reset_index()
    
    # 重命名列
    supplier_performance = supplier_performance.rename(columns={
        'on_time': 'on_time_delivery_rate',
        'quality_score': 'avg_quality_score',
        'order_value': 'total_order_value',
        'order_count': 'number_of_orders'
    })
    
    # 计算综合评分（准时交付率70%，质量评分30%）
    supplier_performance['overall_score'] = (
        supplier_performance['on_time_delivery_rate'] * 0.7 +
        supplier_performance['avg_quality_score'] * 0.3
    )
    
    # 按综合评分排序
    supplier_performance = supplier_performance.sort_values('overall_score', ascending=False)
    
    return supplier_performance

# 使用示例
results = analyze_supplier_performance(supplier_data)
print('供应商绩效排名：')
print(results[['supplier_name', 'on_time_delivery_rate', 'avg_quality_score', 'overall_score']])`,
      initialCode: `import pandas as pd
import numpy as np

# 假设supplier_data是包含供应商数据的DataFrame
# 请编写代码分析供应商绩效，包括准时交付率和质量评分

def analyze_supplier_performance(df):
    # 在这里编写你的代码
    pass

# 测试你的代码
# results = analyze_supplier_performance(supplier_data)
# print('供应商绩效排名：')
# print(results[['supplier_name', 'on_time_delivery_rate', 'avg_quality_score', 'overall_score']])`,
      explanation: '这段代码分析供应商的关键绩效指标：准时交付率和质量评分，并计算综合评分。综合评分考虑了准时交付（70%权重）和质量（30%权重），帮助企业识别最佳和最差的供应商，从而优化供应商选择和管理。'
    },
    {
      id: '1-7',
      chapterId: '1-7',
      title: '市场竞品分析',
      description: '收集和分析市场竞品数据',
      type: 'code',
      question: '请编写代码进行市场份额分析和竞品价格比较。',
      correctAnswer: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 假设market_data是包含市场销售数据的DataFrame
def analyze_market_competition(df):
    # 计算市场份额
    total_market_size = df['revenue'].sum()
    df['market_share'] = df['revenue'] / total_market_size * 100
    
    # 按公司分组
    market_summary = df.groupby('company').agg({
        'revenue': 'sum',
        'market_share': 'first',
        'average_price': 'mean',
        'product_count': 'nunique'
    }).reset_index()
    
    # 按市场份额排序
    market_summary = market_summary.sort_values('market_share', ascending=False)
    
    return market_summary

# 可视化市场份额
def plot_market_share(market_summary):
    plt.figure(figsize=(12, 6))
    plt.bar(market_summary['company'], market_summary['market_share'], color='skyblue')
    plt.title('市场份额分析')
    plt.xlabel('公司')
    plt.ylabel('市场份额 (%)')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig('market_share.png')
    plt.close()

# 使用示例
market_summary = analyze_market_competition(market_data)
print('市场份额排名：')
print(market_summary[['company', 'revenue', 'market_share', 'average_price']])
# plot_market_share(market_summary)`,
      initialCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 假设market_data是包含市场销售数据的DataFrame
# 请编写代码进行市场份额分析和竞品价格比较

def analyze_market_competition(df):
    # 在这里编写你的代码
    pass

# 可视化市场份额
def plot_market_share(market_summary):
    # 在这里编写你的代码
    pass

# 测试你的代码
# market_summary = analyze_market_competition(market_data)
# print('市场份额排名：')
# print(market_summary[['company', 'revenue', 'market_share', 'average_price']])
# plot_market_share(market_summary)`,
      explanation: '这段代码计算市场份额并分析竞品的价格策略。市场份额是公司销售额在市场总销售额中所占的比例，是衡量市场竞争力的关键指标。通过比较价格和市场份额，企业可以制定更有竞争力的定价策略。'
    },
    {
      id: '1-8',
      chapterId: '1-8',
      title: '客户流失预测',
      description: '使用机器学习方法预测客户流失',
      type: 'code',
      question: '请编写代码使用逻辑回归预测客户流失，并评估模型性能。',
      correctAnswer: `from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.preprocessing import StandardScaler
import pandas as pd
import numpy as np

# 假设customer_churn是包含客户流失数据的DataFrame
def predict_customer_churn(df):
    # 准备特征和标签
    features = ['tenure', 'monthly_charges', 'total_charges', 'number_of_services', 
                'contract_type', 'payment_method', 'paperless_billing', 'gender', 'senior_citizen']
    X = df[features]
    y = df['churn']  # 1表示流失，0表示未流失
    
    # 处理分类变量（简单示例，实际应用中可能需要独热编码）
    X = pd.get_dummies(X, drop_first=True)
    
    # 划分训练集和测试集
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # 标准化数据
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # 训练逻辑回归模型
    model = LogisticRegression(random_state=42, max_iter=1000)
    model.fit(X_train_scaled, y_train)
    
    # 预测
    y_pred = model.predict(X_test_scaled)
    
    # 评估模型
    metrics = {
        'accuracy': accuracy_score(y_test, y_pred),
        'precision': precision_score(y_test, y_pred),
        'recall': recall_score(y_test, y_pred),
        'f1_score': f1_score(y_test, y_pred),
        'confusion_matrix': confusion_matrix(y_test, y_pred).tolist()
    }
    
    return model, metrics, X.columns

# 使用示例
model, metrics, feature_names = predict_customer_churn(customer_churn)
print('模型性能评估：')
for key, value in metrics.items():
    if key != 'confusion_matrix':
        print(f'{key}: {value:.4f}')
    else:
        print(f'{key}: {value}')`,
      initialCode: `from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.preprocessing import StandardScaler
import pandas as pd
import numpy as np

# 假设customer_churn是包含客户流失数据的DataFrame
# 请编写代码使用逻辑回归预测客户流失，并评估模型性能

def predict_customer_churn(df):
    # 在这里编写你的代码
    pass

# 测试你的代码
# model, metrics, feature_names = predict_customer_churn(customer_churn)
# print('模型性能评估：')
# for key, value in metrics.items():
#     if key != 'confusion_matrix':
#         print(f'{key}: {value:.4f}')
#     else:
#         print(f'{key}: {value}')`,
      explanation: '这段代码使用逻辑回归模型预测客户流失。逻辑回归是一种广泛用于分类问题的算法，特别适合客户流失预测这种二元分类问题。代码还包括了完整的模型评估指标：准确率、精确率、召回率、F1分数和混淆矩阵，全面评估模型性能。'
    },
    {
      id: '1-9',
      chapterId: '1-9',
      title: '销售漏斗分析',
      description: '分析销售漏斗数据，优化销售流程',
      type: 'code',
      question: '请编写代码分析销售漏斗，计算各阶段转化率和识别瓶颈环节。',
      correctAnswer: `import pandas as pd
import numpy as np

# 假设sales_funnel是包含销售漏斗数据的DataFrame
def analyze_sales_funnel(df):
    # 按阶段排序
    stage_order = ['lead', 'prospect', 'qualified_lead', 'proposal', 'negotiation', 'closed_won', 'closed_lost']
    df['stage'] = pd.Categorical(df['stage'], categories=stage_order, ordered=True)
    df = df.sort_values('stage')
    
    # 计算每个阶段的数量
    funnel_counts = df['stage'].value_counts().sort_index()
    
    # 计算转化率
    conversion_rates = {}
    stages = list(funnel_counts.index)
    for i in range(len(stages) - 1):
        if funnel_counts[stages[i]] > 0:
            conversion_rates[f'{stages[i]}_to_{stages[i+1]}'] = (
                funnel_counts[stages[i+1]] / funnel_counts[stages[i]] * 100
            )
    
    # 找出瓶颈环节（转化率最低的环节）
    if conversion_rates:
        bottleneck = min(conversion_rates.items(), key=lambda x: x[1])
    else:
        bottleneck = None
    
    result = {
        'funnel_counts': funnel_counts.to_dict(),
        'conversion_rates': conversion_rates,
        'bottleneck': bottleneck,
        'overall_conversion_rate': funnel_counts.get('closed_won', 0) / funnel_counts.get('lead', 1) * 100
    }
    
    return result

# 使用示例
funnel_analysis = analyze_sales_funnel(sales_funnel)
print('销售漏斗分析：')
print('各阶段数量：', funnel_analysis['funnel_counts'])
print('各阶段转化率：', funnel_analysis['conversion_rates'])
print('瓶颈环节：', funnel_analysis['bottleneck'])
print('总转化率：', f"{funnel_analysis['overall_conversion_rate']:.2f}%")`,
      initialCode: `import pandas as pd
import numpy as np

# 假设sales_funnel是包含销售漏斗数据的DataFrame
# 请编写代码分析销售漏斗，计算各阶段转化率和识别瓶颈环节

def analyze_sales_funnel(df):
    # 在这里编写你的代码
    pass

# 测试你的代码
# funnel_analysis = analyze_sales_funnel(sales_funnel)
# print('销售漏斗分析：')
# print('各阶段数量：', funnel_analysis['funnel_counts'])
# print('各阶段转化率：', funnel_analysis['conversion_rates'])
# print('瓶颈环节：', funnel_analysis['bottleneck'])
# print('总转化率：', f"{funnel_analysis['overall_conversion_rate']:.2f}%")`,
      explanation: '销售漏斗分析是优化销售流程的关键工具。这段代码计算每个阶段的客户数量和各阶段之间的转化率，识别出转化率最低的瓶颈环节。通过优化瓶颈环节，可以显著提高整体转化率，从而增加销售额。'
    },
    {
      id: '1-10',
      chapterId: '1-10',
      title: '商业智能仪表盘开发',
      description: '设计和开发商业智能仪表盘',
      type: 'code',
      question: '请编写代码生成关键业务指标(KPIs)报告，用于仪表盘展示。',
      correctAnswer: `import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# 假设sales_data是包含销售数据的DataFrame
def generate_kpi_report(df):
    # 确保日期列是datetime类型
    df['date'] = pd.to_datetime(df['date'])
    
    # 计算时间范围
    end_date = df['date'].max()
    start_date = end_date - timedelta(days=365)
    previous_start = start_date - timedelta(days=365)
    previous_end = end_date - timedelta(days=365)
    
    # 过滤数据
    current_data = df[(df['date'] >= start_date) & (df['date'] <= end_date)]
    previous_data = df[(df['date'] >= previous_start) & (df['date'] <= previous_end)]
    
    # 计算KPIs
    kpis = {}
    
    # 总销售额
    kpis['total_revenue_current'] = current_data['revenue'].sum()
    kpis['total_revenue_previous'] = previous_data['revenue'].sum()
    kpis['revenue_growth'] = (kpis['total_revenue_current'] - kpis['total_revenue_previous']) / kpis['total_revenue_previous'] * 100
    
    # 客户数量
    kpis['total_customers_current'] = current_data['customer_id'].nunique()
    kpis['total_customers_previous'] = previous_data['customer_id'].nunique()
    kpis['customer_growth'] = (kpis['total_customers_current'] - kpis['total_customers_previous']) / kpis['total_customers_previous'] * 100
    
    # 平均订单价值
    kpis['avg_order_value_current'] = current_data['revenue'].sum() / current_data['order_id'].nunique()
    kpis['avg_order_value_previous'] = previous_data['revenue'].sum() / previous_data['order_id'].nunique()
    kpis['aov_growth'] = (kpis['avg_order_value_current'] - kpis['avg_order_value_previous']) / kpis['avg_order_value_previous'] * 100
    
    # 客户获取成本(CAC)和客户终身价值(LTV) - 假设有相关数据
    # 这里简化计算，实际应用中需要更多数据
    if 'marketing_spend' in df.columns:
        kpis['cac'] = current_data['marketing_spend'].sum() / kpis['total_customers_current']
    
    # 按月份聚合数据，用于趋势图
    current_data['month'] = current_data['date'].dt.to_period('M')
    monthly_trends = current_data.groupby('month').agg({
        'revenue': 'sum',
        'customer_id': 'nunique',
        'order_id': 'nunique'
    }).reset_index()
    
    return kpis, monthly_trends

# 使用示例
kpis, trends = generate_kpi_report(sales_data)
print('关键业务指标(KPIs)：')
for key, value in kpis.items():
    if isinstance(value, float):
        print(f'{key}: {value:.2f}')
    else:
        print(f'{key}: {value}')
print('\\n月度趋势数据：')
print(trends)`,
      initialCode: `import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# 假设sales_data是包含销售数据的DataFrame
# 请编写代码生成关键业务指标(KPIs)报告，用于仪表盘展示

def generate_kpi_report(df):
    # 在这里编写你的代码
    pass

# 测试你的代码
# kpis, trends = generate_kpi_report(sales_data)
# print('关键业务指标(KPIs)：')
# for key, value in kpis.items():
#     if isinstance(value, float):
#         print(f'{key}: {value:.2f}')
#     else:
#         print(f'{key}: {value}')
# print('\\n月度趋势数据：')
# print(trends)`,
      explanation: '这段代码生成关键业务指标(KPIs)报告，包括销售额、客户数量、平均订单价值等，同时计算同比增长率。还生成了月度趋势数据，用于在商业智能仪表盘中创建趋势图。这些指标帮助企业监控业务健康状况和发展趋势，支持数据驱动决策。'
    }
  ];

  const task = tasks.find(t => t.chapterId === id);
  const [userAnswer, setUserAnswer] = useState<string>(task?.type === 'multiple-choice' ? '' : task?.type === 'fill-blank' ? '' : task?.initialCode || '');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!course || !chapter || !task) {
    return (
      <div className="section">
        <div className="container">
          <h1 className="text-3xl font-bold mb-4">任务不存在</h1>
          <p className="text-gray-600 mb-6">抱歉，您请求的任务不存在。</p>
          <Link to="/courses/1" className="btn-primary">返回课程</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    // 简单的代码检查 - 实际应用中可能需要更复杂的评估
    // 这里只是一个简单的示例，实际应该使用更复杂的代码评估方法
    let correct = false;
    if (task.type === 'multiple-choice') {
      correct = userAnswer === task.correctAnswer;
    } else if (task.type === 'fill-blank') {
      correct = userAnswer === task.correctAnswer;
    } else if (task.type === 'code') {
      // 检查代码是否包含关键部分 - 这只是一个简化的检查
      const requiredKeywords = ['def', 'return'];
      correct = requiredKeywords.every(keyword => userAnswer.includes(keyword));
    }
    setIsCorrect(correct);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      {/* Task Header */}
      <section className="relative bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col">
            <Link to="/courses/1" className="text-primary-300 hover:text-white mb-4">
              ← 返回课程
            </Link>
            <h1 className="text-3xl font-bold mb-2">{task.title}</h1>
            <p className="text-gray-300 mb-6">{task.description}</p>
            <div className="flex items-center">
              <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium mr-4">
                {task.type === 'multiple-choice' ? '选择题' : task.type === 'fill-blank' ? '填空题' : '编程题'}
              </span>
              <span className="text-gray-300">{chapter.title}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Task Content */}
      <section className="section">
        <div className="container">
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">任务内容</h2>
            <p className="text-gray-600 mb-8">{task.question}</p>

            {/* Task Interaction */}
            <div className="mb-8">
              {task.type === 'multiple-choice' && (
                <div className="space-y-3">
                  {task.options?.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name="answer"
                        value={option}
                        checked={userAnswer === option}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="mr-3"
                      />
                      <label htmlFor={`option-${index}`}>{option}</label>
                    </div>
                  ))}
                </div>
              )}

              {task.type === 'fill-blank' && (
                <div>
                  <input
                    type="text"
                    value={userAnswer as string}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="请输入答案"
                  />
                </div>
              )}

              {task.type === 'code' && (
                <div>
                  <CodeMirror
                    value={userAnswer}
                    height="400px"
                    extensions={[python()]}
                    theme={oneDark}
                    onChange={(value) => {
                      setUserAnswer(value);
                    }}
                    placeholder="请编写Python代码..."
                  />
                  <p className="text-gray-500 text-sm mt-2">
                    使用Python语法编写代码。代码编辑器支持语法高亮显示。
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setUserAnswer(task.initialCode || '')}
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-gray-300"
                disabled={submitted}
              >
                重置代码
              </button>
              <button
                onClick={handleSubmit}
                className="btn-primary"
                disabled={submitted}
              >
                {submitted ? '已提交' : '提交答案'}
              </button>
            </div>

            {/* Feedback */}
            {submitted && (
              <div className={`mt-8 p-6 rounded-lg ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                <h3 className="text-xl font-bold mb-3">
                  {isCorrect ? '🎉 回答正确！' : '💡 回答错误'}
                </h3>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">题目解析：</h4>
                  <p>{task.explanation}</p>
                </div>
                {task.type === 'code' && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">参考代码：</h4>
                    <div className="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm">{task.correctAnswer}</pre>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="mt-12 flex justify-between">
              <Link to="/courses/1" className="text-primary font-medium hover:underline">
                返回课程
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TaskDetailPage;