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
              <p className="text-lg">商学院 · 商务数据分析与应用专业</p>
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