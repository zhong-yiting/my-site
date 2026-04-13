import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 课程数据
  const courses = [
    {
      id: '1',
      name: 'Python基础',
      description: '学习Python编程语言的基础知识，包括语法、数据类型、控制结构等。',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20programming%20code%20on%20screen%2C%20clean%20modern%20design&image_size=landscape_16_9',
      details: {
        objectives: ['掌握Python基本语法和数据类型', '学习Python控制结构和函数', '了解Python模块和包的使用', '能够编写简单的Python程序'],
        outline: [
          { week: 1, title: 'Python概述与环境搭建', content: 'Python简介、版本选择、Windows/Linux/Mac安装配置、IDE选择（PyCharm、VS Code）、第一个Python程序' },
          { week: 2, title: 'Python基础语法', content: '变量定义与命名规则、基本数据类型（整数、浮点数、字符串、布尔值）、运算符（算术、比较、逻辑）、表达式与语句' },
          { week: 3, title: '控制结构', content: '条件语句（if-elif-else）、循环语句（for、while）、循环控制（break、continue）、异常处理（try-except）' },
          { week: 4, title: '函数', content: '函数定义与调用、参数传递（位置参数、默认参数、关键字参数）、返回值、局部变量与全局变量、lambda表达式' },
          { week: 5, title: '数据结构', content: '列表（创建、访问、修改、常用方法）、元组、字典、集合、数据结构的选择与应用' },
          { week: 6, title: '文件操作', content: '文件打开与关闭、文件读写模式、文本文件操作、CSV文件读写、异常处理' },
          { week: 7, title: '模块与包', content: '模块导入方式、标准库使用、自定义模块、包的结构与导入、虚拟环境' },
          { week: 8, title: '综合项目', content: '小型项目实战（如简单计算器、学生成绩管理系统）、代码调试与优化、项目文档编写' }
        ],
        assessment: '平时作业(40%) + 期末考试(60%)',
        references: ['Python编程：从入门到实践', 'Python核心编程', 'Python官方文档']
      }
    },
    {
      id: '2',
      name: '数据分析技术',
      description: '学习数据分析的基本方法和技术，包括数据清洗、数据可视化等。',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20analysis%20dashboard%20with%20charts%20and%20graphs%2C%20modern%20design&image_size=landscape_16_9',
      details: {
        objectives: ['掌握数据分析的基本流程', '学习数据清洗和预处理技术', '掌握数据可视化方法', '能够使用Python进行数据分析'],
        outline: [
          { week: 1, title: '数据分析概述', content: '数据分析定义与重要性、数据分析流程（CRISP-DM）、常用分析工具（Python、Excel、SQL）、案例介绍' },
          { week: 2, title: '数据获取与存储', content: '数据来源（内部数据库、API、公开数据集）、数据格式（CSV、JSON、Excel）、数据存储（文件系统、数据库）' },
          { week: 3, title: '数据清洗', content: '数据质量评估、缺失值处理（删除、填充）、异常值检测与处理、重复数据识别与删除、数据类型转换' },
          { week: 4, title: '数据预处理', content: '特征工程（特征提取、特征选择）、数据标准化与归一化、数据规约（降维）、数据集成' },
          { week: 5, title: '描述性统计分析', content: '集中趋势指标（均值、中位数、众数）、离散程度指标（方差、标准差）、分布特征（偏度、峰度）、相关分析' },
          { week: 6, title: '数据可视化基础', content: 'Matplotlib库使用、Seaborn库使用、常见图表类型（折线图、柱状图、散点图、饼图）、图表定制与美化' },
          { week: 7, title: '高级数据可视化', content: '交互式可视化（Plotly）、仪表盘设计、地理数据可视化、可视化最佳实践' },
          { week: 8, title: '综合案例分析', content: '实际业务数据案例分析、分析报告撰写、结果呈现与解读' }
        ],
        assessment: '平时作业(30%) + 项目实践(40%) + 期末考试(30%)',
        references: ['Python数据分析', '利用Python进行数据分析', '数据可视化实战']
      }
    },
    {
      id: '3',
      name: '数据采集与处理',
      description: '学习数据采集的方法和工具，以及数据处理的技术，包括网络爬虫、API数据获取、数据清洗与转换等。',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20collection%20and%20processing%20workflow%2C%20modern%20design&image_size=landscape_16_9',
      details: {
        objectives: ['掌握网络数据采集的基本原理和技术', '学习使用Python实现网络爬虫', '掌握API数据获取和解析方法', '了解数据处理的完整流程', '能够处理和分析各种类型的数据', '培养数据质量意识和数据处理能力'],
        outline: [
          { week: 1, title: '数据采集概述', content: '数据采集定义与应用场景、常用数据采集方法与工具、数据采集的伦理与法律问题、数据采集项目规划' },
          { week: 2, title: '网络爬虫基础', content: 'HTTP协议基础（请求/响应、头部信息、状态码）、Requests库使用、BeautifulSoup解析HTML、XPath选择器、基本爬虫实战' },
          { week: 3, title: '高级爬虫技术', content: 'Selenium自动化测试工具、Scrapy框架使用、反爬策略与应对方法（代理IP、User-Agent、验证码处理）、分布式爬虫' },
          { week: 4, title: 'API数据获取', content: 'RESTful API概念、API认证方式（API Key、OAuth）、JSON/XML数据解析、API rate limit处理、API数据获取实战' },
          { week: 5, title: '数据存储', content: '文件存储（CSV、JSON、Excel）、数据库存储（MySQL、MongoDB）、数据存储最佳实践、数据备份与恢复' },
          { week: 6, title: '数据清洗', content: '数据质量评估指标、缺失值处理方法、异常值检测与处理、重复数据处理、数据一致性检查' },
          { week: 7, title: '数据转换与集成', content: '数据格式转换、数据标准化、数据集成方法、数据规约技术、数据仓库概念' },
          { week: 8, title: '综合实践', content: '完整数据采集与处理项目：从需求分析、数据采集、存储、清洗到分析的全流程实践' }
        ],
        assessment: '平时作业(20%) + 爬虫项目(40%) + 数据处理实验(20%) + 期末考试(20%)',
        references: ['Python网络爬虫权威指南', '数据采集与预处理', '网络数据挖掘', 'Python数据分析', 'Web Scraping with Python', 'Data Wrangling with Python']
      }
    },
    {
      id: '4',
      name: '供应链数据分析',
      description: '学习如何分析供应链数据，优化供应链管理。',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Supply%20chain%20data%20analysis%20diagram%2C%20modern%20design&image_size=landscape_16_9',
      details: {
        objectives: ['了解供应链管理基本概念', '掌握供应链数据分析方法', '学习供应链优化技术', '能够分析和解决供应链问题'],
        outline: [
          { week: 1, title: '供应链管理概述', content: '供应链概念与结构、供应链管理目标与挑战、供应链流程（采购、生产、物流、销售）、供应链管理演变' },
          { week: 2, title: '供应链数据类型', content: '采购数据（供应商信息、采购价格、采购数量）、库存数据（库存水平、库存周转率）、物流数据（运输成本、配送时间）、销售数据（销售量、销售预测）' },
          { week: 3, title: '供应链绩效指标', content: '服务水平指标（订单履行率、按时交付率）、库存指标（库存周转率、库存持有成本）、成本指标（采购成本、物流成本）、财务指标（ROI、现金流）' },
          { week: 4, title: '需求预测', content: '时间序列分析方法、预测模型（移动平均、指数平滑、ARIMA）、预测误差评估（MAE、MSE、RMSE）、预测结果应用' },
          { week: 5, title: '库存优化', content: 'EOQ模型原理与应用、安全库存计算、库存分类方法（ABC分类）、库存优化策略' },
          { week: 6, title: '供应商分析', content: '供应商评估指标体系、供应商选择方法（层次分析法、加权评分法）、供应商关系管理、供应商绩效监控' },
          { week: 7, title: '物流网络优化', content: '配送路线优化算法、仓库选址模型、运输成本分析、物流网络设计' },
          { week: 8, title: '供应链风险管理', content: '风险识别方法、风险评估技术、风险应对策略、供应链弹性构建' }
        ],
        assessment: '平时作业(30%) + 案例分析(40%) + 期末考试(30%)',
        references: ['供应链管理：战略、规划与运营', '供应链数据分析', '物流与供应链管理']
      }
    },
    {
      id: '5',
      name: '数据库原理与应用',
      description: '学习数据库的基本原理和应用，包括SQL语言、数据库设计等。',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Database%20schema%20and%20SQL%20queries%2C%20modern%20design&image_size=landscape_16_9',
      details: {
        objectives: ['了解数据库基本概念', '掌握SQL语言', '学习数据库设计方法', '能够设计和管理数据库'],
        outline: [
          { week: 1, title: '数据库系统概述', content: '数据库概念与发展、数据库管理系统（DBMS）类型、数据库应用场景、数据库系统架构' },
          { week: 2, title: '关系数据库基础', content: '关系模型基本概念、关系代数（选择、投影、连接）、关系演算、完整性约束' },
          { week: 3, title: 'SQL语言基础', content: 'SELECT语句基本语法、WHERE子句条件查询、ORDER BY排序、LIMIT限制结果' },
          { week: 4, title: 'SQL高级查询', content: 'JOIN操作（INNER JOIN、LEFT JOIN、RIGHT JOIN）、子查询、聚合函数（SUM、AVG、COUNT）、GROUP BY分组' },
          { week: 5, title: '数据库设计', content: '实体-关系模型（ER图）、范式理论（1NF、2NF、3NF）、数据库设计步骤、数据字典' },
          { week: 6, title: '数据库管理', content: '用户管理与权限控制、数据库备份与恢复、性能优化、数据库安全' },
          { week: 7, title: 'NoSQL数据库', content: 'NoSQL概念与特点、MongoDB基本操作、Redis缓存应用、NoSQL与关系数据库对比' },
          { week: 8, title: '数据库应用开发', content: 'Python与数据库连接（pymysql、pymongo）、Web应用中的数据库操作、数据库设计实践' }
        ],
        assessment: '平时作业(30%) + 数据库设计(30%) + 期末考试(40%)',
        references: ['数据库系统概论', 'SQL必知必会', 'NoSQL精粹']
      }
    },
    {
      id: '6',
      name: '商务分析技术',
      description: '学习商务数据分析的高级技术和方法，包括统计分析、预测模型等。',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Business%20analysis%20dashboard%20with%20charts%20and%20metrics%2C%20modern%20design&image_size=landscape_16_9',
      details: {
        objectives: ['掌握商务数据分析的核心方法', '学习统计分析和预测模型', '能够分析商务问题并提供解决方案', '培养数据驱动决策能力'],
        outline: [
          { week: 1, title: '商务分析概述', content: '商务分析定义与重要性、商务分析发展历程、商务分析应用领域、商务分析 maturity模型' },
          { week: 2, title: '商务数据类型与来源', content: '内部数据（销售数据、客户数据、财务数据）、外部数据（市场数据、行业数据）、数据质量评估、数据治理' },
          { week: 3, title: '描述性分析', content: '数据汇总与统计、数据可视化技术、业务指标分析、报表设计与制作' },
          { week: 4, title: '诊断性分析', content: '相关性分析、假设检验、根因分析、归因分析、数据挖掘技术' },
          { week: 5, title: '预测性分析', content: '时间序列分析、回归分析（线性回归、逻辑回归）、预测模型评估、机器学习在预测中的应用' },
          { week: 6, title: '规范性分析', content: '优化模型（线性规划）、决策树分析、仿真模拟、多准则决策分析' },
          { week: 7, title: '商务分析工具', content: 'Excel高级功能（数据透视表、函数）、Python分析库（pandas、scikit-learn）、商业智能工具（Power BI、Tableau）' },
          { week: 8, title: '综合案例分析', content: '销售数据分析、客户行为分析、市场趋势分析、商务分析报告撰写' }
        ],
        assessment: '平时作业(20%) + 案例分析(40%) + 期末考试(40%)',
        references: ['商务数据分析', '数据驱动的商务决策', '商业智能与数据分析']
      }
    }
  ];

  useEffect(() => {
    // 查找对应课程
    const foundCourse = courses.find(c => c.id === id);
    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      // 如果没找到，重定向到首页
      navigate('/');
    }
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">加载中...</div>;
  }

  if (!course) {
    return <div className="flex justify-center items-center min-h-screen">课程不存在</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* 导航栏 */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600">钟依廷的个人页面</div>
          <div className="flex space-x-4">
            <a href="/" className="text-blue-600 hover:text-blue-800">首页</a>
            <a href="/#courses" className="text-blue-600 hover:text-blue-800">课程</a>
          </div>
        </div>
      </nav>

      {/* 课程详情 */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* 课程基本信息 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="h-64 overflow-hidden">
              <img 
                src={course.image} 
                alt={course.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4 text-blue-800">{course.name}</h1>
              <p className="text-gray-600 mb-6">{course.description}</p>
            </div>
          </div>

          {/* 课程目标 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">课程目标</h2>
            <ul className="list-disc pl-6 space-y-2">
              {course.details.objectives.map((objective: string, index: number) => (
                <li key={index} className="text-gray-700">{objective}</li>
              ))}
            </ul>
          </div>

          {/* 课程大纲 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">课程大纲</h2>
            <div className="space-y-4">
              {course.details.outline.map((item: { week: number; title: string; content: string }, index: number) => (
                <div key={index} className="border-b pb-4 last:border-0">
                  <h3 className="text-lg font-semibold text-blue-700">第{item.week}周：{item.title}</h3>
                  <p className="text-gray-600 mt-2">{item.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 考核方式 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">考核方式</h2>
            <p className="text-gray-700">{course.details.assessment}</p>
          </div>

          {/* 参考资料 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">参考资料</h2>
            <ul className="list-disc pl-6 space-y-2">
              {course.details.references.map((reference: string, index: number) => (
                <li key={index} className="text-gray-700">{reference}</li>
              ))}
            </ul>
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