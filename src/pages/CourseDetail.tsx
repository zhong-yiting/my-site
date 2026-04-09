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
          { week: 1, title: 'Python概述与环境搭建', content: 'Python简介、安装配置、IDE选择' },
          { week: 2, title: 'Python基础语法', content: '变量、数据类型、运算符、表达式' },
          { week: 3, title: '控制结构', content: '条件语句、循环语句、异常处理' },
          { week: 4, title: '函数', content: '函数定义、参数传递、返回值' },
          { week: 5, title: '数据结构', content: '列表、元组、字典、集合' },
          { week: 6, title: '文件操作', content: '文件读写、异常处理' },
          { week: 7, title: '模块与包', content: '模块导入、包的使用' },
          { week: 8, title: '综合项目', content: '小型项目实战' }
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
          { week: 1, title: '数据分析概述', content: '数据分析定义、流程、工具介绍' },
          { week: 2, title: '数据获取与存储', content: '数据来源、数据格式、数据存储' },
          { week: 3, title: '数据清洗', content: '缺失值处理、异常值检测、数据转换' },
          { week: 4, title: '数据预处理', content: '特征工程、数据标准化、数据规约' },
          { week: 5, title: '描述性统计分析', content: '集中趋势、离散程度、分布特征' },
          { week: 6, title: '数据可视化基础', content: 'Matplotlib、Seaborn库使用' },
          { week: 7, title: '高级数据可视化', content: '交互式可视化、仪表盘设计' },
          { week: 8, title: '综合案例分析', content: '实际业务数据案例分析' }
        ],
        assessment: '平时作业(30%) + 项目实践(40%) + 期末考试(30%)',
        references: ['Python数据分析', '利用Python进行数据分析', '数据可视化实战']
      }
    },
    {
      id: '3',
      name: '数据采集与处理',
      description: '学习数据采集的方法和工具，以及数据处理的技术。',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20collection%20and%20processing%20workflow%2C%20modern%20design&image_size=landscape_16_9',
      details: {
        objectives: ['掌握网络数据采集技术', '学习API数据获取方法', '了解数据处理流程', '能够处理各种类型的数据'],
        outline: [
          { week: 1, title: '数据采集概述', content: '数据采集定义、方法、工具' },
          { week: 2, title: '网络爬虫基础', content: 'HTTP协议、Requests库、BeautifulSoup' },
          { week: 3, title: '高级爬虫技术', content: 'Selenium、Scrapy框架' },
          { week: 4, title: 'API数据获取', content: 'RESTful API、API认证、数据解析' },
          { week: 5, title: '数据存储', content: '文件存储、数据库存储' },
          { week: 6, title: '数据清洗', content: '数据质量评估、数据清洗方法' },
          { week: 7, title: '数据转换', content: '数据格式转换、数据集成' },
          { week: 8, title: '综合实践', content: '完整数据采集与处理项目' }
        ],
        assessment: '平时作业(30%) + 爬虫项目(40%) + 期末考试(30%)',
        references: ['Python网络爬虫权威指南', '数据采集与预处理', '网络数据挖掘']
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
          { week: 1, title: '供应链管理概述', content: '供应链概念、供应链管理目标、供应链流程' },
          { week: 2, title: '供应链数据类型', content: '采购数据、库存数据、物流数据、销售数据' },
          { week: 3, title: '供应链绩效指标', content: '服务水平、库存周转率、订单履行率' },
          { week: 4, title: '需求预测', content: '时间序列分析、预测模型、预测误差评估' },
          { week: 5, title: '库存优化', content: 'EOQ模型、安全库存、库存分类' },
          { week: 6, title: '供应商分析', content: '供应商评估、供应商选择、供应商关系管理' },
          { week: 7, title: '物流网络优化', content: '配送路线优化、仓库选址、运输成本分析' },
          { week: 8, title: '供应链风险管理', content: '风险识别、风险评估、风险应对' }
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
          { week: 1, title: '数据库系统概述', content: '数据库概念、数据库管理系统、数据库应用' },
          { week: 2, title: '关系数据库基础', content: '关系模型、关系代数、关系演算' },
          { week: 3, title: 'SQL语言基础', content: 'SELECT语句、WHERE子句、ORDER BY子句' },
          { week: 4, title: 'SQL高级查询', content: 'JOIN操作、子查询、聚合函数' },
          { week: 5, title: '数据库设计', content: '实体-关系模型、范式理论、数据库设计步骤' },
          { week: 6, title: '数据库管理', content: '用户管理、权限控制、备份与恢复' },
          { week: 7, title: 'NoSQL数据库', content: 'NoSQL概念、MongoDB、Redis' },
          { week: 8, title: '数据库应用开发', content: 'Python与数据库连接、Web应用中的数据库' }
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
          { week: 1, title: '商务分析概述', content: '商务分析定义、发展历程、应用领域' },
          { week: 2, title: '商务数据类型与来源', content: '内部数据、外部数据、数据质量评估' },
          { week: 3, title: '描述性分析', content: '数据汇总、数据可视化、业务指标分析' },
          { week: 4, title: '诊断性分析', content: '相关性分析、假设检验、根因分析' },
          { week: 5, title: '预测性分析', content: '时间序列分析、回归分析、预测模型评估' },
          { week: 6, title: '规范性分析', content: '优化模型、决策树、仿真模拟' },
          { week: 7, title: '商务分析工具', content: 'Excel高级功能、Python分析库、商业智能工具' },
          { week: 8, title: '综合案例分析', content: '销售数据分析、客户行为分析、市场趋势分析' }
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