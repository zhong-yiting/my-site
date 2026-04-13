import { useState } from 'react';

export default function Home() {
  const [courses] = useState([
    {
      id: 1,
      name: 'Python基础',
      description: '学习Python编程语言的基础知识，包括语法、数据类型、控制结构等。',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20programming%20code%20on%20screen%2C%20clean%20modern%20design&image_size=landscape_16_9'
    },
    {
      id: 2,
      name: '数据分析技术',
      description: '学习数据分析的基本方法和技术，包括数据清洗、数据可视化等。',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20analysis%20dashboard%20with%20charts%20and%20graphs%2C%20modern%20design&image_size=landscape_16_9'
    },
    {
      id: 3,
      name: '数据采集与处理',
      description: '学习数据采集的方法和工具，以及数据处理的技术。',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20collection%20and%20processing%20workflow%2C%20modern%20design&image_size=landscape_16_9'
    },
    {
      id: 4,
      name: '供应链数据分析',
      description: '学习如何分析供应链数据，优化供应链管理。',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Supply%20chain%20data%20analysis%20diagram%2C%20modern%20design&image_size=landscape_16_9'
    },
    {
      id: 5,
      name: '数据库原理与应用',
      description: '学习数据库的基本原理和应用，包括SQL语言、数据库设计等。',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Database%20schema%20and%20SQL%20queries%2C%20modern%20design&image_size=landscape_16_9'
    },
    {
      id: 6,
      name: '商务分析技术',
      description: '学习商务数据分析的高级技术和方法，包括统计分析、预测模型等。',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Business%20analysis%20dashboard%20with%20charts%20and%20metrics%2C%20modern%20design&image_size=landscape_16_9'
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* 导航栏 */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600">钟依廷的个人页面</div>
          <div className="flex space-x-4">
            <a href="#home" className="text-blue-600 hover:text-blue-800">首页</a>
            <a href="#courses" className="text-blue-600 hover:text-blue-800">课程</a>
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
                <a href="#courses" className="bg-white text-blue-800 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  查看课程
                </a>
                <a href="#projects" className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-blue-800 transition-colors">
                  项目经验
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 项目经验部分 */}
      <section id="projects" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">项目经验</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=E-commerce%20sales%20data%20analysis%20dashboard%2C%20modern%20design&image_size=landscape_16_9" 
                  alt="电商销售数据分析" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-800">电商销售数据分析</h3>
                <p className="text-gray-600 mb-4">
                  使用Python和pandas对电商平台销售数据进行分析，
                  构建数据可视化仪表盘，识别销售趋势和客户行为模式，
                  为营销决策提供数据支持。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Python</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">pandas</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">数据可视化</span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Supply%20chain%20optimization%20analysis%20dashboard%2C%20modern%20design&image_size=landscape_16_9" 
                  alt="供应链优化分析" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-800">供应链优化分析</h3>
                <p className="text-gray-600 mb-4">
                  分析供应链数据，使用库存优化模型计算最优库存水平，
                  识别供应链瓶颈，提出优化建议，
                  预计可降低库存成本15%。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Excel</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">供应链分析</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">优化模型</span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Customer%20profile%20analysis%20dashboard%2C%20modern%20design&image_size=landscape_16_9" 
                  alt="客户画像构建" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-800">客户画像构建</h3>
                <p className="text-gray-600 mb-4">
                  使用SQL从数据库中提取客户数据，
                  进行数据清洗和特征工程，
                  构建客户画像，为精准营销提供支持。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">SQL</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">数据库</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">客户分析</span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Web%20data%20collection%20system%2C%20modern%20design&image_size=landscape_16_9" 
                  alt="网络数据采集系统" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-800">网络数据采集系统</h3>
                <p className="text-gray-600 mb-4">
                  使用Python和Scrapy框架开发网络爬虫，
                  采集电商平台商品数据，
                  存储到MongoDB数据库，为价格监测提供数据支持。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Python</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Scrapy</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">MongoDB</span>
                </div>
              </div>
            </div>
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

      {/* 课程列表部分 */}
      <section id="courses" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">我的课程</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-blue-800">{course.name}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <a href={`/course/${course.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                    查看详情 →
                  </a>
                </div>
              </div>
            ))}
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