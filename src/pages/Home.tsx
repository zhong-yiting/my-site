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
      description: '学习数据清洗的基本方法，处理缺失值、异常值、重复值等数据质量问题。',
      color: 'blue',
      tags: ['Python', 'pandas', '数据预处理']
    },
    {
      id: 2,
      name: '购物篮分析',
      icon: ShoppingCart,
      description: '使用关联规则挖掘技术分析购物篮数据，发现商品间的关联关系。',
      color: 'green',
      tags: ['关联规则', 'Apriori', '市场篮分析']
    },
    {
      id: 3,
      name: '客户聚类分析',
      icon: Users,
      description: '使用聚类算法对客户进行分群，识别不同客户群体的特征和行为模式。',
      color: 'purple',
      tags: ['K-means', '客户分群', '聚类分析']
    },
    {
      id: 4,
      name: '数据可视化',
      icon: BarChart3,
      description: '学习使用Python可视化库创建各种图表，有效展示数据分析结果。',
      color: 'orange',
      tags: ['Matplotlib', 'Seaborn', '数据展示']
    },
    {
      id: 5,
      name: '分组聚类分析',
      icon: GitBranch,
      description: '深入学习聚类分析方法，包括层次聚类、密度聚类等多种聚类技术。',
      color: 'red',
      tags: ['层次聚类', 'DBSCAN', '聚类评估']
    },
    {
      id: 6,
      name: 'AB测试',
      icon: Target,
      description: '学习AB测试的设计与分析方法，评估不同方案的效果差异。',
      color: 'pink',
      tags: ['假设检验', '统计分析', '实验设计']
    },
    {
      id: 7,
      name: '店铺经营分析',
      icon: TrendingUp,
      description: '分析店铺经营数据，包括销售额、客流量、转化率等关键指标。',
      color: 'cyan',
      tags: ['经营指标', '销售分析', 'KPI分析']
    },
    {
      id: 8,
      name: '消费者行为分析',
      icon: Users,
      description: '分析消费者购买行为数据，了解消费者偏好和购买决策过程。',
      color: 'indigo',
      tags: ['行为分析', '用户画像', 'RFM模型']
    },
    {
      id: 9,
      name: '市场分析',
      icon: PieChart,
      description: '进行市场趋势分析、竞争分析，为市场决策提供数据支持。',
      color: 'teal',
      tags: ['市场趋势', '竞争分析', 'SWOT分析']
    },
    {
      id: 10,
      name: '时间序列分析',
      icon: Activity,
      description: '学习时间序列数据的分析方法，进行趋势预测和季节性分析。',
      color: 'gray',
      tags: ['时间序列', 'ARIMA', '预测模型']
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
          <div className="hidden md:flex space-x-4 text-sm">
            <a href="#home" className="text-blue-600 hover:text-blue-800">首页</a>
            <a href="#skills" className="text-blue-600 hover:text-blue-800">技能</a>
            <a href="#honors" className="text-blue-600 hover:text-blue-800">荣誉</a>
            <a href="#experience" className="text-blue-600 hover:text-blue-800">实践</a>
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
            <div className="md:ml-8 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">钟依廷</h1>
              <p className="text-xl mb-4">广东科学技术职业学院</p>
              <p className="text-lg mb-6">商学院 · 商务数据分析与应用专业</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Python</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">数据可视化</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">数据库应用</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">数据分析</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">数据采集</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">供应链分析</span>
              </div>
              <p className="text-white mb-4">
                具有扎实的数据分析基础，熟练掌握Python编程、数据可视化和数据库应用技能，
                具备较强的问题解决能力和团队协作精神，
                目标成为一名优秀的商务数据分析专员。
              </p>
              <div className="flex space-x-4">
                <a href="#projects" className="bg-white text-blue-800 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  训练项目
                </a>
                <a href="#guestbook" className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-blue-800 transition-colors">
                  留言板
                </a>
              </div>
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
                <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* 图标区域（渐变背景 + 大图标） */}
                  <div className={`h-48 relative overflow-hidden bg-gradient-to-br ${colors.gradient} flex flex-col items-center justify-center`}>
                    <IconComponent className="w-20 h-20 text-white mb-3" />
                    <span className="text-white text-xl font-bold">{project.name}</span>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center mr-3`}>
                        <IconComponent className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <h3 className="text-xl font-bold text-blue-800">{project.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, index) => (
                        <span key={index} className={`${colors.bg} ${colors.text} px-2 py-1 rounded text-xs font-medium`}>{tag}</span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <a href={`/project/${project.id}`} className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        教学教程
                      </a>
                      <a href={`/practice/${project.id}`} className="flex-1 text-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
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
