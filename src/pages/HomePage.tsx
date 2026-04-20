import React from 'react';
import { Link } from 'react-router-dom';
import { categories, getPopularCourses, getLearningPath } from '../data/courses';

const HomePage: React.FC = () => {
  const popularCourses = getPopularCourses();
  const learningPath = getLearningPath();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-800 to-primary-600 text-white py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              提升数据分析技能，助力职场发展
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              我们提供系统化的商务数据分析课程，从基础到进阶，帮助你掌握核心技能，在竞争激烈的职场中脱颖而出。
            </p>
            <Link to="/courses/1" className="btn-secondary inline-block">
              立即开始学习
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Course Categories */}
      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">课程分类</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/courses/1`}
                className="card text-center hover:scale-105 transition-transform"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">热门课程</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularCourses.map((course) => (
              <Link key={course.id} to={`/courses/${course.id}`} className="card group">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.level}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 font-medium">{course.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{course.duration}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">学习路径</h2>
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gray-200"></div>
            
            {/* Path Items */}
            <div className="space-y-12">
              {learningPath[0]?.chapters.map((chapter, index) => (
                <div key={chapter.id} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}">
                    <div className="card">
                      <h3 className="text-xl font-semibold mb-2">{chapter.title}</h3>
                      <p className="text-gray-600 mb-4">{chapter.content}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="bg-primary-100 text-primary px-3 py-1 rounded-full text-sm font-medium">{learningPath[0].level}</span>
                        <span className="text-gray-500 text-sm">{chapter.duration}</span>
                      </div>
                      <Link to={`/courses/1`} className="text-primary font-medium hover:underline">
                        查看详情 →
                      </Link>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center">
                    <div className="relative">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold z-10">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">准备好开始你的数据分析之旅了吗？</h2>
          <p className="text-xl mb-8 text-primary-100">
            加入我们的课程，提升你的数据分析技能，开启职场新篇章。
          </p>
          <Link to="/courses/1" className="btn-secondary inline-block">
            立即开始
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;