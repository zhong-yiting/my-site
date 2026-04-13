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
          { 
            week: 1, 
            title: 'Python概述与环境搭建', 
            content: 'Python简介、版本选择、Windows/Linux/Mac安装配置、IDE选择（PyCharm、VS Code）、第一个Python程序',
            daily: [
              { day: 1, content: 'Python简介与发展历程，版本选择建议' },
              { day: 2, content: 'Windows系统Python安装与环境配置' },
              { day: 3, content: 'Linux/Mac系统Python安装与环境配置' },
              { day: 4, content: 'IDE选择与安装（PyCharm、VS Code）' },
              { day: 5, content: '第一个Python程序，Hello World实践' }
            ]
          },
          { 
            week: 2, 
            title: 'Python基础语法', 
            content: '变量定义与命名规则、基本数据类型（整数、浮点数、字符串、布尔值）、运算符（算术、比较、逻辑）、表达式与语句',
            daily: [
              { day: 1, content: '变量定义与命名规则，赋值语句' },
              { day: 2, content: '基本数据类型：整数、浮点数、布尔值' },
              { day: 3, content: '字符串类型与字符串操作' },
              { day: 4, content: '算术运算符与比较运算符' },
              { day: 5, content: '逻辑运算符与表达式' }
            ]
          },
          { 
            week: 3, 
            title: '控制结构', 
            content: '条件语句（if-elif-else）、循环语句（for、while）、循环控制（break、continue）、异常处理（try-except）',
            daily: [
              { day: 1, content: 'if语句与条件判断' },
              { day: 2, content: 'if-elif-else多条件判断' },
              { day: 3, content: 'for循环与range函数' },
              { day: 4, content: 'while循环与循环控制（break、continue）' },
              { day: 5, content: '异常处理（try-except）' }
            ]
          },
          { 
            week: 4, 
            title: '函数', 
            content: '函数定义与调用、参数传递（位置参数、默认参数、关键字参数）、返回值、局部变量与全局变量、lambda表达式',
            daily: [
              { day: 1, content: '函数定义与基本调用' },
              { day: 2, content: '位置参数与默认参数' },
              { day: 3, content: '关键字参数与可变参数' },
              { day: 4, content: '返回值与局部变量、全局变量' },
              { day: 5, content: 'lambda表达式与函数式编程基础' }
            ]
          },
          { 
            week: 5, 
            title: '数据结构', 
            content: '列表（创建、访问、修改、常用方法）、元组、字典、集合、数据结构的选择与应用',
            daily: [
              { day: 1, content: '列表的创建、访问与修改' },
              { day: 2, content: '列表的常用方法（append、extend、remove等）' },
              { day: 3, content: '元组与集合的使用' },
              { day: 4, content: '字典的创建、访问与修改' },
              { day: 5, content: '数据结构的选择与应用场景' }
            ]
          },
          { 
            week: 6, 
            title: '文件操作', 
            content: '文件打开与关闭、文件读写模式、文本文件操作、CSV文件读写、异常处理',
            daily: [
              { day: 1, content: '文件打开与关闭，文件读写模式' },
              { day: 2, content: '文本文件的读取操作' },
              { day: 3, content: '文本文件的写入操作' },
              { day: 4, content: 'CSV文件的读写操作' },
              { day: 5, content: '文件操作中的异常处理' }
            ]
          },
          { 
            week: 7, 
            title: '模块与包', 
            content: '模块导入方式、标准库使用、自定义模块、包的结构与导入、虚拟环境',
            daily: [
              { day: 1, content: '模块导入方式与标准库介绍' },
              { day: 2, content: '常用标准库的使用（math、random等）' },
              { day: 3, content: '自定义模块的创建与导入' },
              { day: 4, content: '包的结构与导入' },
              { day: 5, content: '虚拟环境的创建与使用' }
            ]
          },
          { 
            week: 8, 
            title: '综合项目', 
            content: '小型项目实战（如简单计算器、学生成绩管理系统）、代码调试与优化、项目文档编写',
            daily: [
              { day: 1, content: '项目需求分析与规划' },
              { day: 2, content: '项目框架搭建与核心功能实现' },
              { day: 3, content: '项目功能完善与测试' },
              { day: 4, content: '代码调试与优化' },
              { day: 5, content: '项目文档编写与总结' }
            ]
          }
        ],
        assessment: {
          description: '平时作业(40%) + 期末考试(60%)',
          details: [
            '平时作业：每天布置编程练习，内容与当日学习主题相关，要求当天完成并提交',
            '期末考试：闭卷考试，考察Python基础语法、控制结构、函数、数据结构等核心知识点',
            '项目实践：完成一个小型应用项目，综合运用所学知识解决实际问题'
          ],
          dailyHomework: [
            '第1周：Python环境搭建练习，编写Hello World程序',
            '第2周：变量和数据类型练习，编写简单的计算程序',
            '第3周：控制结构练习，编写条件判断和循环程序',
            '第4周：函数练习，编写带有不同参数类型的函数',
            '第5周：数据结构练习，使用列表、字典等解决实际问题',
            '第6周：文件操作练习，读写文本文件和CSV文件',
            '第7周：模块与包练习，创建和使用自定义模块',
            '第8周：综合项目开发，实现一个完整的小型应用'
          ]
        },
        references: {
          books: ['Python编程：从入门到实践', 'Python核心编程', 'Python官方文档'],
          selfStudy: [
            'Python官方教程：https://docs.python.org/zh-cn/3/tutorial/',
            'Codecademy Python课程：互动式学习平台',
            'LeetCode Python题目：通过刷题巩固编程技能',
            'GitHub上的Python项目：学习优秀代码实践'
          ]
        }
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
          { 
            week: 1, 
            title: '数据分析概述', 
            content: '数据分析定义与重要性、数据分析流程（CRISP-DM）、常用分析工具（Python、Excel、SQL）、案例介绍',
            daily: [
              { day: 1, content: '数据分析定义与重要性，应用场景' },
              { day: 2, content: '数据分析流程（CRISP-DM）介绍' },
              { day: 3, content: '常用分析工具对比（Python、Excel、SQL）' },
              { day: 4, content: '数据分析案例介绍与分析思路' },
              { day: 5, content: '数据分析项目规划与管理' }
            ]
          },
          { 
            week: 2, 
            title: '数据获取与存储', 
            content: '数据来源（内部数据库、API、公开数据集）、数据格式（CSV、JSON、Excel）、数据存储（文件系统、数据库）',
            daily: [
              { day: 1, content: '数据来源类型与获取方法' },
              { day: 2, content: 'CSV文件格式与读写操作' },
              { day: 3, content: 'JSON文件格式与读写操作' },
              { day: 4, content: 'Excel文件格式与读写操作' },
              { day: 5, content: '数据存储方式选择与实践' }
            ]
          },
          { 
            week: 3, 
            title: '数据清洗', 
            content: '数据质量评估、缺失值处理（删除、填充）、异常值检测与处理、重复数据识别与删除、数据类型转换',
            daily: [
              { day: 1, content: '数据质量评估指标与方法' },
              { day: 2, content: '缺失值检测与删除方法' },
              { day: 3, content: '缺失值填充方法（均值、中位数、插值）' },
              { day: 4, content: '异常值检测与处理方法' },
              { day: 5, content: '重复数据识别与删除，数据类型转换' }
            ]
          },
          { 
            week: 4, 
            title: '数据预处理', 
            content: '特征工程（特征提取、特征选择）、数据标准化与归一化、数据规约（降维）、数据集成',
            daily: [
              { day: 1, content: '特征工程概念与重要性' },
              { day: 2, content: '特征提取方法与实践' },
              { day: 3, content: '特征选择方法与实践' },
              { day: 4, content: '数据标准化与归一化' },
              { day: 5, content: '数据规约（降维）方法，数据集成' }
            ]
          },
          { 
            week: 5, 
            title: '描述性统计分析', 
            content: '集中趋势指标（均值、中位数、众数）、离散程度指标（方差、标准差）、分布特征（偏度、峰度）、相关分析',
            daily: [
              { day: 1, content: '集中趋势指标：均值、中位数、众数' },
              { day: 2, content: '离散程度指标：方差、标准差、四分位数' },
              { day: 3, content: '分布特征：偏度、峰度' },
              { day: 4, content: '相关分析：皮尔逊相关系数' },
              { day: 5, content: '描述性统计分析实战' }
            ]
          },
          { 
            week: 6, 
            title: '数据可视化基础', 
            content: 'Matplotlib库使用、Seaborn库使用、常见图表类型（折线图、柱状图、散点图、饼图）、图表定制与美化',
            daily: [
              { day: 1, content: 'Matplotlib库基本使用' },
              { day: 2, content: '折线图与柱状图绘制' },
              { day: 3, content: '散点图与饼图绘制' },
              { day: 4, content: 'Seaborn库使用与美化' },
              { day: 5, content: '图表定制与最佳实践' }
            ]
          },
          { 
            week: 7, 
            title: '高级数据可视化', 
            content: '交互式可视化（Plotly）、仪表盘设计、地理数据可视化、可视化最佳实践',
            daily: [
              { day: 1, content: 'Plotly库基本使用' },
              { day: 2, content: '交互式图表设计' },
              { day: 3, content: '仪表盘设计与实现' },
              { day: 4, content: '地理数据可视化' },
              { day: 5, content: '可视化最佳实践与案例' }
            ]
          },
          { 
            week: 8, 
            title: '综合案例分析', 
            content: '实际业务数据案例分析、分析报告撰写、结果呈现与解读',
            daily: [
              { day: 1, content: '案例数据获取与理解' },
              { day: 2, content: '数据清洗与预处理' },
              { day: 3, content: '数据分析与可视化' },
              { day: 4, content: '分析报告撰写' },
              { day: 5, content: '结果呈现与解读' }
            ]
          }
        ],
        assessment: {
          description: '平时作业(30%) + 项目实践(40%) + 期末考试(30%)',
          details: [
            '平时作业：每天布置数据分析练习，内容与当日学习主题相关，要求当天完成并提交',
            '项目实践：完成一个完整的数据分析项目，从数据获取、清洗到分析和可视化',
            '期末考试：闭卷考试，考察数据分析流程、方法和工具使用等核心知识点'
          ],
          dailyHomework: [
            '第1周：数据分析流程练习，分析一个简单的数据集',
            '第2周：数据获取与存储练习，从不同来源获取数据并存储',
            '第3周：数据清洗练习，处理缺失值和异常值',
            '第4周：数据预处理练习，进行特征工程和数据标准化',
            '第5周：描述性统计分析练习，计算各种统计指标',
            '第6周：数据可视化练习，使用Matplotlib绘制各种图表',
            '第7周：高级数据可视化练习，使用Plotly创建交互式图表',
            '第8周：综合案例分析，完成一个完整的数据分析报告'
          ]
        },
        references: {
          books: ['Python数据分析', '利用Python进行数据分析', '数据可视化实战'],
          selfStudy: [
            'Kaggle平台：参与数据分析竞赛，学习实际项目',
            'DataCamp：交互式数据分析学习平台',
            'Towards Data Science：数据分析博客和教程',
            'Python Data Science Handbook：在线电子书'
          ]
        }
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
          { 
            week: 1, 
            title: '数据采集概述', 
            content: '数据采集定义与应用场景、常用数据采集方法与工具、数据采集的伦理与法律问题、数据采集项目规划',
            daily: [
              { day: 1, content: '数据采集定义与应用场景' },
              { day: 2, content: '常用数据采集方法与工具介绍' },
              { day: 3, content: '数据采集的伦理问题' },
              { day: 4, content: '数据采集的法律问题' },
              { day: 5, content: '数据采集项目规划与管理' }
            ]
          },
          { 
            week: 2, 
            title: '网络爬虫基础', 
            content: 'HTTP协议基础（请求/响应、头部信息、状态码）、Requests库使用、BeautifulSoup解析HTML、XPath选择器、基本爬虫实战',
            daily: [
              { day: 1, content: 'HTTP协议基础：请求与响应' },
              { day: 2, content: 'HTTP头部信息与状态码' },
              { day: 3, content: 'Requests库基本使用' },
              { day: 4, content: 'BeautifulSoup解析HTML' },
              { day: 5, content: 'XPath选择器与基本爬虫实战' }
            ]
          },
          { 
            week: 3, 
            title: '高级爬虫技术', 
            content: 'Selenium自动化测试工具、Scrapy框架使用、反爬策略与应对方法（代理IP、User-Agent、验证码处理）、分布式爬虫',
            daily: [
              { day: 1, content: 'Selenium自动化测试工具介绍' },
              { day: 2, content: 'Selenium实战：动态页面爬取' },
              { day: 3, content: 'Scrapy框架基本使用' },
              { day: 4, content: '反爬策略与应对方法' },
              { day: 5, content: '分布式爬虫概念与实现' }
            ]
          },
          { 
            week: 4, 
            title: 'API数据获取', 
            content: 'RESTful API概念、API认证方式（API Key、OAuth）、JSON/XML数据解析、API rate limit处理、API数据获取实战',
            daily: [
              { day: 1, content: 'RESTful API概念与设计原则' },
              { day: 2, content: 'API认证方式：API Key' },
              { day: 3, content: 'API认证方式：OAuth' },
              { day: 4, content: 'JSON/XML数据解析' },
              { day: 5, content: 'API rate limit处理与实战' }
            ]
          },
          { 
            week: 5, 
            title: '数据存储', 
            content: '文件存储（CSV、JSON、Excel）、数据库存储（MySQL、MongoDB）、数据存储最佳实践、数据备份与恢复',
            daily: [
              { day: 1, content: '文件存储：CSV格式' },
              { day: 2, content: '文件存储：JSON与Excel格式' },
              { day: 3, content: '数据库存储：MySQL' },
              { day: 4, content: '数据库存储：MongoDB' },
              { day: 5, content: '数据存储最佳实践与备份恢复' }
            ]
          },
          { 
            week: 6, 
            title: '数据清洗', 
            content: '数据质量评估指标、缺失值处理方法、异常值检测与处理、重复数据处理、数据一致性检查',
            daily: [
              { day: 1, content: '数据质量评估指标' },
              { day: 2, content: '缺失值检测与处理方法' },
              { day: 3, content: '异常值检测与处理方法' },
              { day: 4, content: '重复数据识别与处理' },
              { day: 5, content: '数据一致性检查与处理' }
            ]
          },
          { 
            week: 7, 
            title: '数据转换与集成', 
            content: '数据格式转换、数据标准化、数据集成方法、数据规约技术、数据仓库概念',
            daily: [
              { day: 1, content: '数据格式转换方法' },
              { day: 2, content: '数据标准化技术' },
              { day: 3, content: '数据集成方法' },
              { day: 4, content: '数据规约技术' },
              { day: 5, content: '数据仓库概念与应用' }
            ]
          },
          { 
            week: 8, 
            title: '综合实践', 
            content: '完整数据采集与处理项目：从需求分析、数据采集、存储、清洗到分析的全流程实践',
            daily: [
              { day: 1, content: '项目需求分析与规划' },
              { day: 2, content: '数据采集方案设计与实现' },
              { day: 3, content: '数据存储与管理' },
              { day: 4, content: '数据清洗与预处理' },
              { day: 5, content: '数据分析与结果呈现' }
            ]
          }
        ],
        assessment: {
          description: '平时作业(20%) + 爬虫项目(40%) + 数据处理实验(20%) + 期末考试(20%)',
          details: [
            '平时作业：每天布置数据采集和处理练习，内容与当日学习主题相关，要求当天完成并提交',
            '爬虫项目：完成一个完整的网络爬虫项目，从网站抓取数据并进行处理',
            '数据处理实验：完成一系列数据处理实验，包括数据清洗、转换和集成'
          ],
          dailyHomework: [
            '第1周：数据采集项目规划练习，设计一个数据采集方案',
            '第2周：网络爬虫基础练习，使用Requests和BeautifulSoup抓取网页数据',
            '第3周：高级爬虫练习，使用Selenium和Scrapy抓取动态网页',
            '第4周：API数据获取练习，从公开API获取数据并解析',
            '第5周：数据存储练习，将采集的数据存储到文件和数据库',
            '第6周：数据清洗练习，处理采集到的原始数据',
            '第7周：数据转换与集成练习，将不同来源的数据进行整合',
            '第8周：综合项目实践，完成一个完整的数据采集与处理项目'
          ]
        },
        references: {
          books: ['Python网络爬虫权威指南', '数据采集与预处理', '网络数据挖掘', 'Python数据分析', 'Web Scraping with Python', 'Data Wrangling with Python'],
          selfStudy: [
            'Scrapy官方文档：学习Scrapy框架的使用',
            'Selenium官方文档：学习自动化测试和网页抓取',
            'OpenAPI规范：了解API设计和使用',
            'GitHub上的爬虫项目：学习优秀的爬虫实现'
          ]
        }
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
          { 
            week: 1, 
            title: '供应链管理概述', 
            content: '供应链概念与结构、供应链管理目标与挑战、供应链流程（采购、生产、物流、销售）、供应链管理演变',
            daily: [
              { day: 1, content: '供应链概念与结构' },
              { day: 2, content: '供应链管理目标与挑战' },
              { day: 3, content: '供应链流程：采购与生产' },
              { day: 4, content: '供应链流程：物流与销售' },
              { day: 5, content: '供应链管理演变与趋势' }
            ]
          },
          { 
            week: 2, 
            title: '供应链数据类型', 
            content: '采购数据（供应商信息、采购价格、采购数量）、库存数据（库存水平、库存周转率）、物流数据（运输成本、配送时间）、销售数据（销售量、销售预测）',
            daily: [
              { day: 1, content: '采购数据类型与管理' },
              { day: 2, content: '库存数据类型与管理' },
              { day: 3, content: '物流数据类型与管理' },
              { day: 4, content: '销售数据类型与管理' },
              { day: 5, content: '供应链数据集成与共享' }
            ]
          },
          { 
            week: 3, 
            title: '供应链绩效指标', 
            content: '服务水平指标（订单履行率、按时交付率）、库存指标（库存周转率、库存持有成本）、成本指标（采购成本、物流成本）、财务指标（ROI、现金流）',
            daily: [
              { day: 1, content: '服务水平指标' },
              { day: 2, content: '库存指标' },
              { day: 3, content: '成本指标' },
              { day: 4, content: '财务指标' },
              { day: 5, content: '绩效指标体系构建与应用' }
            ]
          },
          { 
            week: 4, 
            title: '需求预测', 
            content: '时间序列分析方法、预测模型（移动平均、指数平滑、ARIMA）、预测误差评估（MAE、MSE、RMSE）、预测结果应用',
            daily: [
              { day: 1, content: '时间序列分析基础' },
              { day: 2, content: '移动平均与指数平滑模型' },
              { day: 3, content: 'ARIMA模型' },
              { day: 4, content: '预测误差评估方法' },
              { day: 5, content: '预测结果应用与调整' }
            ]
          },
          { 
            week: 5, 
            title: '库存优化', 
            content: 'EOQ模型原理与应用、安全库存计算、库存分类方法（ABC分类）、库存优化策略',
            daily: [
              { day: 1, content: 'EOQ模型原理' },
              { day: 2, content: 'EOQ模型应用' },
              { day: 3, content: '安全库存计算' },
              { day: 4, content: 'ABC分类方法' },
              { day: 5, content: '库存优化策略' }
            ]
          },
          { 
            week: 6, 
            title: '供应商分析', 
            content: '供应商评估指标体系、供应商选择方法（层次分析法、加权评分法）、供应商关系管理、供应商绩效监控',
            daily: [
              { day: 1, content: '供应商评估指标体系' },
              { day: 2, content: '层次分析法' },
              { day: 3, content: '加权评分法' },
              { day: 4, content: '供应商关系管理' },
              { day: 5, content: '供应商绩效监控' }
            ]
          },
          { 
            week: 7, 
            title: '物流网络优化', 
            content: '配送路线优化算法、仓库选址模型、运输成本分析、物流网络设计',
            daily: [
              { day: 1, content: '配送路线优化算法' },
              { day: 2, content: '仓库选址模型' },
              { day: 3, content: '运输成本分析' },
              { day: 4, content: '物流网络设计' },
              { day: 5, content: '物流网络优化案例' }
            ]
          },
          { 
            week: 8, 
            title: '供应链风险管理', 
            content: '风险识别方法、风险评估技术、风险应对策略、供应链弹性构建',
            daily: [
              { day: 1, content: '供应链风险识别方法' },
              { day: 2, content: '风险评估技术' },
              { day: 3, content: '风险应对策略' },
              { day: 4, content: '供应链弹性构建' },
              { day: 5, content: '供应链风险管理案例' }
            ]
          }
        ],
        assessment: {
          description: '平时作业(30%) + 案例分析(40%) + 期末考试(30%)',
          details: [
            '平时作业：每天布置供应链数据分析练习，内容与当日学习主题相关，要求当天完成并提交',
            '案例分析：完成一个供应链管理案例分析，运用所学知识解决实际问题',
            '期末考试：闭卷考试，考察供应链管理概念、分析方法和优化技术等核心知识点'
          ],
          dailyHomework: [
            '第1周：供应链管理概念练习，分析一个企业的供应链结构',
            '第2周：供应链数据类型练习，收集和整理不同类型的供应链数据',
            '第3周：供应链绩效指标练习，计算和分析供应链绩效指标',
            '第4周：需求预测练习，使用不同方法进行需求预测',
            '第5周：库存优化练习，计算EOQ和安全库存',
            '第6周：供应商分析练习，评估和选择供应商',
            '第7周：物流网络优化练习，设计和优化物流网络',
            '第8周：供应链风险管理练习，识别和评估供应链风险'
          ]
        },
        references: {
          books: ['供应链管理：战略、规划与运营', '供应链数据分析', '物流与供应链管理'],
          selfStudy: [
            'APICS供应链管理知识体系：学习供应链管理专业知识',
            'MIT OpenCourseWare：供应链管理相关课程',
            'Supply Chain Management Review：供应链管理专业杂志',
            '真实企业供应链案例：分析实际企业的供应链管理实践'
          ]
        }
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
          { 
            week: 1, 
            title: '数据库系统概述', 
            content: '数据库概念与发展、数据库管理系统（DBMS）类型、数据库应用场景、数据库系统架构',
            daily: [
              { day: 1, content: '数据库概念与发展历程' },
              { day: 2, content: '数据库管理系统（DBMS）类型' },
              { day: 3, content: '数据库应用场景' },
              { day: 4, content: '数据库系统架构' },
              { day: 5, content: '数据库技术发展趋势' }
            ]
          },
          { 
            week: 2, 
            title: '关系数据库基础', 
            content: '关系模型基本概念、关系代数（选择、投影、连接）、关系演算、完整性约束',
            daily: [
              { day: 1, content: '关系模型基本概念' },
              { day: 2, content: '关系代数：选择与投影' },
              { day: 3, content: '关系代数：连接操作' },
              { day: 4, content: '关系演算' },
              { day: 5, content: '完整性约束' }
            ]
          },
          { 
            week: 3, 
            title: 'SQL语言基础', 
            content: 'SELECT语句基本语法、WHERE子句条件查询、ORDER BY排序、LIMIT限制结果',
            daily: [
              { day: 1, content: 'SELECT语句基本语法' },
              { day: 2, content: 'WHERE子句条件查询' },
              { day: 3, content: 'ORDER BY排序' },
              { day: 4, content: 'LIMIT限制结果' },
              { day: 5, content: 'SQL基础查询实战' }
            ]
          },
          { 
            week: 4, 
            title: 'SQL高级查询', 
            content: 'JOIN操作（INNER JOIN、LEFT JOIN、RIGHT JOIN）、子查询、聚合函数（SUM、AVG、COUNT）、GROUP BY分组',
            daily: [
              { day: 1, content: 'INNER JOIN操作' },
              { day: 2, content: 'LEFT JOIN与RIGHT JOIN操作' },
              { day: 3, content: '子查询' },
              { day: 4, content: '聚合函数' },
              { day: 5, content: 'GROUP BY分组与HAVING子句' }
            ]
          },
          { 
            week: 5, 
            title: '数据库设计', 
            content: '实体-关系模型（ER图）、范式理论（1NF、2NF、3NF）、数据库设计步骤、数据字典',
            daily: [
              { day: 1, content: '实体-关系模型基础' },
              { day: 2, content: 'ER图绘制' },
              { day: 3, content: '范式理论：1NF与2NF' },
              { day: 4, content: '范式理论：3NF' },
              { day: 5, content: '数据库设计步骤与数据字典' }
            ]
          },
          { 
            week: 6, 
            title: '数据库管理', 
            content: '用户管理与权限控制、数据库备份与恢复、性能优化、数据库安全',
            daily: [
              { day: 1, content: '用户管理' },
              { day: 2, content: '权限控制' },
              { day: 3, content: '数据库备份与恢复' },
              { day: 4, content: '数据库性能优化' },
              { day: 5, content: '数据库安全' }
            ]
          },
          { 
            week: 7, 
            title: 'NoSQL数据库', 
            content: 'NoSQL概念与特点、MongoDB基本操作、Redis缓存应用、NoSQL与关系数据库对比',
            daily: [
              { day: 1, content: 'NoSQL概念与特点' },
              { day: 2, content: 'MongoDB基本操作' },
              { day: 3, content: 'MongoDB高级查询' },
              { day: 4, content: 'Redis缓存应用' },
              { day: 5, content: 'NoSQL与关系数据库对比' }
            ]
          },
          { 
            week: 8, 
            title: '数据库应用开发', 
            content: 'Python与数据库连接（pymysql、pymongo）、Web应用中的数据库操作、数据库设计实践',
            daily: [
              { day: 1, content: 'Python与MySQL连接（pymysql）' },
              { day: 2, content: 'Python与MongoDB连接（pymongo）' },
              { day: 3, content: 'Web应用中的数据库操作' },
              { day: 4, content: '数据库设计实践' },
              { day: 5, content: '数据库应用开发案例' }
            ]
          }
        ],
        assessment: {
          description: '平时作业(30%) + 数据库设计(30%) + 期末考试(40%)',
          details: [
            '平时作业：每天布置数据库练习，内容与当日学习主题相关，要求当天完成并提交',
            '数据库设计：完成一个完整的数据库设计项目，包括需求分析、ER图设计和SQL实现',
            '期末考试：闭卷考试，考察数据库原理、SQL语言和数据库设计等核心知识点'
          ],
          dailyHomework: [
            '第1周：数据库概念练习，了解不同类型的数据库管理系统',
            '第2周：关系数据库基础练习，使用关系代数进行查询',
            '第3周：SQL基础练习，编写基本的SELECT语句',
            '第4周：SQL高级查询练习，使用JOIN和子查询',
            '第5周：数据库设计练习，绘制ER图和设计表结构',
            '第6周：数据库管理练习，设置用户权限和备份数据库',
            '第7周：NoSQL数据库练习，使用MongoDB和Redis',
            '第8周：数据库应用开发练习，使用Python连接数据库并开发应用'
          ]
        },
        references: {
          books: ['数据库系统概论', 'SQL必知必会', 'NoSQL精粹'],
          selfStudy: [
            'MySQL官方文档：学习MySQL数据库的使用',
            'PostgreSQL官方文档：学习PostgreSQL数据库的使用',
            'MongoDB官方文档：学习NoSQL数据库的使用',
            'SQLZoo：交互式SQL学习平台'
          ]
        }
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
          { 
            week: 1, 
            title: '商务分析概述', 
            content: '商务分析定义与重要性、商务分析发展历程、商务分析应用领域、商务分析 maturity模型',
            daily: [
              { day: 1, content: '商务分析定义与重要性' },
              { day: 2, content: '商务分析发展历程' },
              { day: 3, content: '商务分析应用领域' },
              { day: 4, content: '商务分析 maturity模型' },
              { day: 5, content: '商务分析职业发展' }
            ]
          },
          { 
            week: 2, 
            title: '商务数据类型与来源', 
            content: '内部数据（销售数据、客户数据、财务数据）、外部数据（市场数据、行业数据）、数据质量评估、数据治理',
            daily: [
              { day: 1, content: '内部数据类型与管理' },
              { day: 2, content: '外部数据类型与获取' },
              { day: 3, content: '数据质量评估方法' },
              { day: 4, content: '数据治理概念与实践' },
              { day: 5, content: '商务数据集成' }
            ]
          },
          { 
            week: 3, 
            title: '描述性分析', 
            content: '数据汇总与统计、数据可视化技术、业务指标分析、报表设计与制作',
            daily: [
              { day: 1, content: '数据汇总与统计方法' },
              { day: 2, content: '数据可视化技术' },
              { day: 3, content: '业务指标分析' },
              { day: 4, content: '报表设计与制作' },
              { day: 5, content: '描述性分析实战' }
            ]
          },
          { 
            week: 4, 
            title: '诊断性分析', 
            content: '相关性分析、假设检验、根因分析、归因分析、数据挖掘技术',
            daily: [
              { day: 1, content: '相关性分析' },
              { day: 2, content: '假设检验' },
              { day: 3, content: '根因分析' },
              { day: 4, content: '归因分析' },
              { day: 5, content: '数据挖掘技术' }
            ]
          },
          { 
            week: 5, 
            title: '预测性分析', 
            content: '时间序列分析、回归分析（线性回归、逻辑回归）、预测模型评估、机器学习在预测中的应用',
            daily: [
              { day: 1, content: '时间序列分析基础' },
              { day: 2, content: '线性回归分析' },
              { day: 3, content: '逻辑回归分析' },
              { day: 4, content: '预测模型评估方法' },
              { day: 5, content: '机器学习在预测中的应用' }
            ]
          },
          { 
            week: 6, 
            title: '规范性分析', 
            content: '优化模型（线性规划）、决策树分析、仿真模拟、多准则决策分析',
            daily: [
              { day: 1, content: '线性规划模型' },
              { day: 2, content: '决策树分析' },
              { day: 3, content: '仿真模拟' },
              { day: 4, content: '多准则决策分析' },
              { day: 5, content: '规范性分析实战' }
            ]
          },
          { 
            week: 7, 
            title: '商务分析工具', 
            content: 'Excel高级功能（数据透视表、函数）、Python分析库（pandas、scikit-learn）、商业智能工具（Power BI、Tableau）',
            daily: [
              { day: 1, content: 'Excel数据透视表' },
              { day: 2, content: 'Excel高级函数' },
              { day: 3, content: 'Python pandas库' },
              { day: 4, content: 'Python scikit-learn库' },
              { day: 5, content: 'Power BI与Tableau' }
            ]
          },
          { 
            week: 8, 
            title: '综合案例分析', 
            content: '销售数据分析、客户行为分析、市场趋势分析、商务分析报告撰写',
            daily: [
              { day: 1, content: '销售数据分析' },
              { day: 2, content: '客户行为分析' },
              { day: 3, content: '市场趋势分析' },
              { day: 4, content: '商务分析报告撰写' },
              { day: 5, content: '分析结果呈现与决策支持' }
            ]
          }
        ],
        assessment: {
          description: '平时作业(20%) + 案例分析(40%) + 期末考试(40%)',
          details: [
            '平时作业：每天布置商务分析练习，内容与当日学习主题相关，要求当天完成并提交',
            '案例分析：完成一个商务分析案例，运用所学知识解决实际商务问题',
            '期末考试：闭卷考试，考察商务分析方法、工具和应用等核心知识点'
          ],
          dailyHomework: [
            '第1周：商务分析概念练习，分析一个企业的商务分析应用',
            '第2周：商务数据类型练习，收集和整理不同类型的商务数据',
            '第3周：描述性分析练习，使用统计方法分析商务数据',
            '第4周：诊断性分析练习，使用相关性分析和假设检验',
            '第5周：预测性分析练习，使用时间序列和回归分析进行预测',
            '第6周：规范性分析练习，使用优化模型和决策树进行决策',
            '第7周：商务分析工具练习，使用Excel、Python和BI工具',
            '第8周：综合案例分析，完成一个完整的商务分析报告'
          ]
        },
        references: {
          books: ['商务数据分析', '数据驱动的商务决策', '商业智能与数据分析'],
          selfStudy: [
            'Harvard Business Review：商业分析相关文章',
            'Coursera商业分析课程：学习商业分析专业知识',
            'Tableau Public：学习数据可视化和商业智能',
            '真实商业分析案例：分析实际企业的商业分析实践'
          ]
        }
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
            <div className="space-y-6">
              {course.details.outline.map((item: { week: number; title: string; content: string; daily: { day: number; content: string }[] }, index: number) => (
                <div key={index} className="border-b pb-6 last:border-0">
                  <h3 className="text-lg font-semibold text-blue-700">第{item.week}周：{item.title}</h3>
                  <p className="text-gray-600 mt-2 mb-4">{item.content}</p>
                  <div className="ml-4">
                    <h4 className="font-medium text-blue-600 mb-2">每日学习计划：</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      {item.daily.map((day: { day: number; content: string }, dayIndex: number) => (
                        <li key={dayIndex} className="text-gray-600">
                          <span className="font-medium">第{day.day}天：</span>{day.content}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 考核方式 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">考核方式</h2>
            <p className="text-gray-700 mb-4">{course.details.assessment.description}</p>
            <div className="mb-6">
              <h3 className="font-medium text-blue-600 mb-2">考核细则：</h3>
              <ul className="list-disc pl-6 space-y-2">
                {course.details.assessment.details.map((detail: string, index: number) => (
                  <li key={index} className="text-gray-700">{detail}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-blue-600 mb-2">每日作业安排：</h3>
              <ul className="list-disc pl-6 space-y-2">
                {course.details.assessment.dailyHomework.map((homework: string, index: number) => (
                  <li key={index} className="text-gray-700">{homework}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 参考资料 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">参考资料</h2>
            <div className="mb-6">
              <h3 className="font-medium text-blue-600 mb-2">推荐书籍：</h3>
              <ul className="list-disc pl-6 space-y-2">
                {course.details.references.books.map((book: string, index: number) => (
                  <li key={index} className="text-gray-700">{book}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-blue-600 mb-2">自学资源：</h3>
              <ul className="list-disc pl-6 space-y-2">
                {course.details.references.selfStudy.map((resource: string, index: number) => (
                  <li key={index} className="text-gray-700">{resource}</li>
                ))}
              </ul>
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