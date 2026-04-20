import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* About Hero */}
      <section className="relative bg-gradient-to-r from-primary-800 to-primary-600 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">关于我们</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-primary-100">
            我们是一家专注于商务数据分析教育的平台，致力于为学习者提供高质量的课程和资源。
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Our Mission */}
      <section className="section">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">我们的使命</h2>
              <p className="text-gray-600 mb-6">
                我们的使命是通过提供高质量的数据分析课程，帮助学习者掌握核心技能，提升职场竞争力，
                为企业培养更多数据分析人才，推动数据驱动决策的广泛应用。
              </p>
              <p className="text-gray-600 mb-6">
                我们相信，数据是现代商业的核心资产，而数据分析能力是未来职场的必备技能。
                我们致力于通过系统化的课程体系，让每个学习者都能掌握数据分析的精髓。
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2">专业课程</h3>
                  <p className="text-sm text-gray-600">由行业专家精心设计的课程内容</p>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2">实战导向</h3>
                  <p className="text-sm text-gray-600">注重实际应用和案例分析</p>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2">终身学习</h3>
                  <p className="text-sm text-gray-600">提供持续更新的学习资源</p>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2">社区支持</h3>
                  <p className="text-sm text-gray-600">建立学习者交流和分享的平台</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Business%20data%20analysis%20team%20working%20together%20in%20modern%20office&image_size=landscape_16_9"
                alt="我们的团队"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">我们的团队</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: '张教授',
                position: '数据科学总监',
                bio: '拥有10年数据分析和教学经验，曾在多家知名企业担任数据分析师。',
                avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20Chinese%20male%20professor%20headshot%20with%20glasses&image_size=square'
              },
              {
                name: '李老师',
                position: 'Python讲师',
                bio: 'Python专家，著有《Python数据分析实战》等多本畅销书籍。',
                avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20Chinese%20female%20lecturer%20headshot%20smiling&image_size=square'
              },
              {
                name: '王工程师',
                position: '数据工程师',
                bio: '专注于数据采集和处理技术，拥有丰富的大数据处理经验。',
                avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20Chinese%20male%20engineer%20headshot%20confident&image_size=square'
              },
              {
                name: '赵分析师',
                position: '商业分析师',
                bio: '擅长供应链数据分析和商业智能，曾为多家企业提供数据分析解决方案。',
                avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20Chinese%20female%20analyst%20headshot%20professional&image_size=square'
              }
            ].map((member, index) => (
              <div key={index} className="card text-center hover:shadow-lg transition-shadow">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary mb-4">{member.position}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">联系我们</h2>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <div className="card h-full">
                <h3 className="text-2xl font-semibold mb-6">联系方式</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary-100 text-primary p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">邮箱</h4>
                      <p className="text-gray-600">info@data-analysis-platform.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary-100 text-primary p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">电话</h4>
                      <p className="text-gray-600">+86 123 4567 8910</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary-100 text-primary p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">地址</h4>
                      <p className="text-gray-600">北京市朝阳区商务中心区</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h4 className="font-medium mb-4">关注我们</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                    <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="card">
                <h3 className="text-2xl font-semibold mb-6">发送消息</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="请输入您的姓名"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="请输入您的邮箱"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">消息</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="请输入您的消息"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    发送消息
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;