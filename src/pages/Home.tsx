import { useState } from 'react';
import { Database, ShoppingCart, Users, BarChart3, GitBranch, Target, TrendingUp, Clock, PieChart, Activity } from 'lucide-react';

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

  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* 导航栏 */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600">钟依廷的个人页面</div>
          <div className="flex space-x-4">
            <a href="#home" className="text-blue-600 hover:text-blue-800">首页</a>
            <a href="#projects" className="text-blue-600 hover:text-blue-800">训练项目</a>
            <a href="#guestbook" className="text-blue-600 hover:text-blue-800">留言板</a>
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

      {/* 训练项目部分 */}
      <section id="projects" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-800">商务数据分析训练项目</h2>
          <p className="text-center text-gray-600 mb-12">包含教学教程讲解和实训环节，全面提升数据分析实战能力</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const IconComponent = project.icon;
              const colors = colorSchemes[project.color as keyof typeof colorSchemes];
              const isLoaded = loadedImages[project.id];
              
              return (
                <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* 图片区域 */}
                  <div className="h-48 relative overflow-hidden">
                    {/* 主图 */}
                    <img 
                      src={getPhotoUrl(project.id)}
                      alt={project.name}
                      onLoad={() => setLoadedImages(prev => ({...prev, [project.id]: true}))}
                      onError={() => setLoadedImages(prev => ({...prev, [project.id]: false}))}
                      className={`w-full h-full object-cover transition-transform duration-500 hover:scale-110 ${
                        isLoaded === true ? 'block' : 'hidden'
                      }`}
                    />
                    
                    {/* 备用渐变背景 + 图标 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} flex flex-col items-center justify-center ${
                      isLoaded === true ? 'hidden' : 'flex'
                    }`}>
                      <IconComponent className="w-20 h-20 text-white mb-3" />
                      <span className="text-white text-xl font-bold">{project.name}</span>
                    </div>
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

function getPhotoUrl(projectId: number): string {
  // 为每个项目分配稳定的图片URL，优先使用picsum确保可访问
  const seeds: Record<number, string> = {
    1: 'data-cleaning-analytics', // 数据清洗
    2: 'shopping-basket-retail', // 购物篮分析
    3: 'customer-segmentation', // 客户聚类分析
    4: 'data-visualization-charts', // 数据可视化
    5: 'clustering-algorithms', // 分组聚类分析
    6: 'ab-testing-experiment', // AB测试
    7: 'store-business-analytics', // 店铺经营分析
    8: 'consumer-behavior-research', // 消费者行为分析
    9: 'market-analysis-competition', // 市场分析
    10: 'time-series-forecasting' // 时间序列分析
  };
  const seed = seeds[projectId] || 'business-data';
  return `https://picsum.photos/seed/${seed}/800/500`;
}
