import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseById } from '../data/courses';

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = getCourseById(id || '1');
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);

  if (!course) {
    return (
      <div className="section">
        <div className="container">
          <h1 className="text-3xl font-bold mb-4">课程不存在</h1>
          <p className="text-gray-600 mb-6">抱歉，您请求的课程不存在。</p>
          <Link to="/" className="btn-primary">返回首页</Link>
        </div>
      </div>
    );
  }

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId) 
        : [...prev, chapterId]
    );
  };

  return (
    <div className="min-h-screen">
      {/* Course Header */}
      <section className="relative bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-2/3">
              <div className="flex items-center mb-4">
                <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium mr-4">
                  {course.level}
                </span>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 font-medium">{course.rating}</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-gray-300 mb-6">{course.description}</p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{course.chapters.length} 章节</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  <span>{course.category}</span>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-white">学习成果</h3>
                <ul className="space-y-2">
                  {course.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="btn-secondary w-full md:w-auto">
                开始学习
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="section">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Course Chapters */}
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold mb-6">课程章节</h2>
              <div className="space-y-4">
                {course.chapters.map((chapter) => (
                  <div key={chapter.id} className="card">
                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      className="w-full flex justify-between items-center text-left"
                    >
                      <div className="flex items-center">
                        <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-4">
                          {chapter.id.split('-')[1]}
                        </div>
                        <div>
                          <h3 className="font-semibold">{chapter.title}</h3>
                          <p className="text-sm text-gray-500">{chapter.duration}</p>
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transition-transform ${expandedChapters.includes(chapter.id) ? 'transform rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedChapters.includes(chapter.id) && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-gray-600 mb-6">{chapter.content}</p>
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3">实践任务</h4>
                          <ul className="space-y-2">
                            {chapter.practicalTasks.map((task, index) => (
                              <li key={index} className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Link to={`/tasks/${chapter.id}`} className="text-primary font-medium hover:underline">
                            查看详情 →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Course Resources */}
            <div className="lg:w-1/3">
              <div className="card sticky top-8">
                <h2 className="text-2xl font-bold mb-6">学习资源</h2>
                <div className="space-y-4">
                  {course.resources.map((resource) => (
                    <div key={resource.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className="bg-primary-100 text-primary p-3 rounded-lg mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">{resource.name}</h3>
                        <p className="text-sm text-gray-500">{resource.type}</p>
                      </div>
                      <a href={resource.link} className="ml-auto text-primary hover:underline">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">相关课程</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[2, 3, 5].map((courseId) => {
              const relatedCourse = getCourseById(courseId.toString());
              if (!relatedCourse) return null;
              return (
                <Link key={relatedCourse.id} to={`/courses/${relatedCourse.id}`} className="card group">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={relatedCourse.thumbnail}
                      alt={relatedCourse.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {relatedCourse.level}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{relatedCourse.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{relatedCourse.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 font-medium">{relatedCourse.rating}</span>
                    </div>
                    <span className="text-gray-500 text-sm">{relatedCourse.duration}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetailPage;