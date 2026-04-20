import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseById } from '../data/courses';

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
}

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = getCourseById('1');
  const chapter = course?.chapters.find(ch => ch.id === id);
  
  // 为每个章节创建对应的实训任务数据
  const tasks: Task[] = [
    {
      id: '1-1',
      chapterId: '1-1',
      title: '销售数据清洗与预处理',
      description: '学习如何处理销售数据中的缺失值和异常值',
      type: 'multiple-choice',
      question: '以下哪种方法不适合处理缺失值？',
      options: ['删除含有缺失值的行', '均值填充', '中位数填充', '随机数填充'],
      correctAnswer: '随机数填充',
      explanation: '随机数填充会引入噪声，不适合处理缺失值。应该使用更合理的方法如均值、中位数或插值填充。'
    },
    {
      id: '1-2',
      chapterId: '1-2',
      title: '销售趋势分析与预测',
      description: '分析销售数据的时间趋势，学习预测方法',
      type: 'fill-blank',
      question: '移动平均法的主要作用是什么？',
      correctAnswer: '平滑时间序列数据，减少短期波动',
      explanation: '移动平均法通过计算一定时期内数据的平均值，来平滑时间序列数据，减少短期波动，更好地观察长期趋势。'
    },
    {
      id: '1-3',
      chapterId: '1-3',
      title: '客户分群与精准营销',
      description: '使用K-means算法对客户进行分群',
      type: 'code',
      question: '请编写代码使用K-means算法对客户数据进行分群，设置聚类数为3。',
      correctAnswer: `from sklearn.cluster import KMeans
import pandas as pd

# 假设customer_data是包含客户特征的DataFrame
kmeans = KMeans(n_clusters=3, random_state=42)
customer_data['cluster'] = kmeans.fit_predict(customer_data)`,
      explanation: '这段代码使用scikit-learn库中的KMeans类，设置聚类数为3，对客户数据进行聚类分析，并将聚类结果添加到原始数据中。'
    },
    {
      id: '1-4',
      chapterId: '1-4',
      title: '产品销售分析与优化',
      description: '分析产品销售数据，优化产品组合',
      type: 'multiple-choice',
      question: '在进行产品销售分析时，以下哪个指标最能反映产品的盈利能力？',
      options: ['销售量', '销售额', '毛利率', '库存周转率'],
      correctAnswer: '毛利率',
      explanation: '毛利率直接反映了产品在扣除直接成本后的盈利空间，是衡量产品盈利能力的核心指标。'
    },
    {
      id: '1-5',
      chapterId: '1-5',
      title: '库存优化分析',
      description: '优化库存水平，减少库存成本',
      type: 'fill-blank',
      question: '安全库存的主要目的是什么？',
      correctAnswer: '应对需求不确定性和供应延迟',
      explanation: '安全库存是为了应对需求波动和供应延迟等不确定性因素而额外持有的库存，以防止缺货。'
    },
    {
      id: '1-6',
      chapterId: '1-6',
      title: '供应链数据分析',
      description: '分析供应链数据，优化供应链流程',
      type: 'multiple-choice',
      question: '以下哪个指标最能反映供应链的效率？',
      options: ['采购成本', '物流成本', '订单履行周期', '供应商数量'],
      correctAnswer: '订单履行周期',
      explanation: '订单履行周期衡量从订单接收到交付的时间，是评估供应链整体效率的关键指标。'
    },
    {
      id: '1-7',
      chapterId: '1-7',
      title: '市场竞品分析',
      description: '收集和分析市场竞品数据',
      type: 'fill-blank',
      question: '市场份额的计算公式是什么？',
      correctAnswer: '公司销售额 / 市场总销售额 × 100%',
      explanation: '市场份额是公司销售额在市场总销售额中所占的比例，反映了公司在市场中的竞争地位。'
    },
    {
      id: '1-8',
      chapterId: '1-8',
      title: '客户流失预测',
      description: '使用机器学习方法预测客户流失',
      type: 'code',
      question: '请编写代码使用逻辑回归预测客户流失。',
      correctAnswer: `from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 假设X是特征，y是标签（1表示流失，0表示未流失）
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LogisticRegression(random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
print(f'准确率: {accuracy_score(y_test, y_pred)}')`,
      explanation: '这段代码使用scikit-learn库中的逻辑回归模型，将数据分为训练集和测试集，训练模型并评估预测准确率。'
    },
    {
      id: '1-9',
      chapterId: '1-9',
      title: '销售漏斗分析',
      description: '分析销售漏斗数据，优化销售流程',
      type: 'multiple-choice',
      question: '销售漏斗中最关键的优化点是什么？',
      options: ['增加顶部流量', '提高中间转化率', '加速底部成交', '优化每个环节'],
      correctAnswer: '优化每个环节',
      explanation: '销售漏斗的每个环节都需要优化，因为任何一个环节的低效都会影响最终结果，需要综合分析和持续改进。'
    },
    {
      id: '1-10',
      chapterId: '1-10',
      title: '商业智能仪表盘开发',
      description: '设计和开发商业智能仪表盘',
      type: 'fill-blank',
      question: '好的商业智能仪表盘应该具备什么特点？',
      correctAnswer: '直观、简洁、实时、可交互',
      explanation: '好的BI仪表盘应该直观易懂，简洁清晰，数据实时更新，并且支持用户交互探索。'
    }
  ];

  const task = tasks.find(t => t.chapterId === id);
  const [userAnswer, setUserAnswer] = useState<string>(task?.type === 'multiple-choice' ? '' : task?.type === 'fill-blank' ? '' : '');
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
    let correct = false;
    if (task.type === 'multiple-choice') {
      correct = userAnswer === task.correctAnswer;
    } else if (task.type === 'fill-blank') {
      // 简单的答案匹配，实际应用中可能需要更复杂的匹配逻辑
      correct = userAnswer === task.correctAnswer;
    } else if (task.type === 'code') {
      // 实际应用中可能需要更复杂的代码评估
      correct = userAnswer === task.correctAnswer;
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
                  <textarea
                    value={userAnswer as string}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    rows={10}
                    placeholder="请编写代码"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
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
              <div className={`mt-8 p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                <h3 className="font-semibold mb-2">
                  {isCorrect ? '回答正确！' : '回答错误'}
                </h3>
                <p>{task.explanation}</p>
                {!isCorrect && (
                  <div className="mt-4">
                    <p className="font-medium">正确答案：</p>
                    <p className="mt-2">{task.correctAnswer}</p>
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