import React, { useState } from 'react'
import '../style/interview.scss'

const Interview = () => {
  const [activeTab, setActiveTab] = useState('technical')
  const [expandedQuestion, setExpandedQuestion] = useState(0)

  const interviewData = {
    matchScore: 82,
    technicalQuestions: [
      {
        question: 'Explain the Node.js event loop and how it handles asynchronous I/O operations.',
        intention: 'To assess the candidate\'s deep understanding of Node.js internal architecture and non-blocking I/O.',
        modelAnswer: 'The candidate should explain the different phases of the event loop (timers, pending callbacks, idle/prepare, poll, check, close). They should mention how Libuv handles the thread pool and how the callback queue works with the call stack to ensure performance without blocking the main thread.'
      },
      {
        question: 'How do you optimize a MongoDB aggregation pipeline for high-volume data?',
        intention: 'To assess candidate knowledge of database optimization techniques',
        modelAnswer: 'Provide a detailed explanation with examples'
      },
      {
        question: 'Can you describe the Cache-Aside pattern and when you would use Redis in a Node.js application?',
        intention: 'To assess candidate knowledge',
        modelAnswer: 'Provide a detailed explanation with examples'
      },
      {
        question: 'What are the challenges of migrating a monolithic application to a modular service-based architecture?',
        intention: 'To assess candidate knowledge',
        modelAnswer: 'Provide a detailed explanation with examples'
      }
    ],
    behavioralQuestions: [
      {
        question: 'Describe a time you had to collaborate with backend developers using Git. How did you handle merge conflicts or API contract changes?',
        intention: 'To assess soft skills',
        modelAnswer: 'Use the STAR method to structure your answer'
      },
      {
        question: 'Tell me about a time you faced a significant technical hurdle. How did you research and resolve it?',
        intention: 'To assess soft skills',
        modelAnswer: 'Use the STAR method to structure your answer'
      }
    ],
    skillGaps: [
      { skill: 'redis', severity: 'medium' },
      { skill: 'Message queue', severity: 'medium' },
      { skill: 'Event loop', severity: 'medium' }
    ],
    preparationPlan: [
      {
        day: 1,
        title: 'Node.js internals & Streams',
        subtasks: [
          'Deep dive into the Event Loop phases and process.nextTick vs setImmediate.',
          'Practice implementing Node.js Streams for handling large data sets.'
        ]
      },
      {
        day: 2,
        title: 'Advanced MongoDB & Indexing',
        subtasks: [
          'Study Compound Indexes, TTL Indexes, and Text Indexes.',
          'Practice writing complex Aggregation pipelines and using the .explain(\'executionStats\') method.'
        ]
      },
      {
        day: 3,
        title: 'Caching & Redis Strategies',
        subtasks: [
          'Read about Redis data types beyond strings (Sets, Hashes, Sorted Sets).',
          'Implement a Redis-based rate limiter or a caching layer for a sample application.'
        ]
      },
      {
        day: 4,
        title: 'System Design & Microservices',
        subtasks: [
          'Study Microservices communication patterns (Synchronous vs Asynchronous).',
          'Learn about the API Gateway pattern and Circuit Breakers.'
        ]
      },
      {
        day: 5,
        title: 'Message Queues & DevOps Basics',
        subtasks: [
          'Watch introductory tutorials on RabbitMQ or Kafka.',
          'Dockerize a project and write a simple GitHub Actions workflow for CI.'
        ]
      },
      {
        day: 6,
        title: 'Data Structures & Algorithms',
        subtasks: [
          'Solve 5-10 Medium LeetCode problems focusing on Arrays, Strings, and Hash Maps.',
          'Review common sorting and searching algorithms.'
        ]
      },
      {
        day: 7,
        title: 'Mock Interview & Project Review',
        subtasks: [
          'Conduct a mock interview focusing on explaining the Real-time Chat Application architecture.',
          'Prepare concise summaries for all work experience bullets.'
        ]
      }
    ]
  }

  const getQuestions = () => {
    return activeTab === 'technical' ? interviewData.technicalQuestions : interviewData.behavioralQuestions
  }

  const questions = getQuestions()
  const sectionName = activeTab === 'technical' ? 'Technical Questions' : 'Behavioral Questions'

  return (
    <div className='interview'>
      {/* Left Sidebar */}
      <aside className='interview__sidebar interview__sidebar--left'>
        <div className='interview-sidebar__header'>
          <h3 className='interview-sidebar__title'>SECTIONS</h3>
        </div>
        <nav className='interview-nav'>
          <button
            className={`interview-nav__item ${activeTab === 'technical' ? 'interview-nav__item--active' : ''}`}
            onClick={() => setActiveTab('technical')}
          >
            <span className='interview-nav__icon'>&lt;&gt;</span>
            <span>Technical Questions</span>
          </button>
          <button
            className={`interview-nav__item ${activeTab === 'behavioral' ? 'interview-nav__item--active' : ''}`}
            onClick={() => setActiveTab('behavioral')}
          >
            <span className='interview-nav__icon'>☑</span>
            <span>Behavioral Questions</span>
          </button>
          <button
            className={`interview-nav__item ${activeTab === 'roadmap' ? 'interview-nav__item--active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
          >
            <span className='interview-nav__icon'>↗</span>
            <span>Road Map</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className='interview__main'>
        {activeTab !== 'roadmap' ? (
          <>
            {/* Section Header */}
            <div className='interview__section-header'>
              <h1 className='interview__section-title'>{sectionName}</h1>
              <p className='interview__section-count'>{questions.length} questions</p>
            </div>

            {/* Questions List */}
            <div className='questions-list'>
              {questions.map((item, index) => (
                <div
                  key={index}
                  className={`question-card ${expandedQuestion === index ? 'question-card--expanded' : ''}`}
                >
                  <button
                    className='question-card__header'
                    onClick={() => setExpandedQuestion(expandedQuestion === index ? -1 : index)}
                  >
                    <div className='question-card__title'>
                      <span className='question-card__number'>Q{index + 1}</span>
                      <p className='question-card__text'>{item.question}</p>
                    </div>
                    <span className='question-card__toggle'>
                      {expandedQuestion === index ? '▲' : '▼'}
                    </span>
                  </button>

                  {expandedQuestion === index && (
                    <div className='question-card__content'>
                      <div className='question-detail'>
                        <h4 className='question-detail__label'>INTENTION</h4>
                        <p className='question-detail__text'>{item.intention}</p>
                      </div>
                      <div className='question-detail'>
                        <h4 className='question-detail__label question-detail__label--answer'>MODEL ANSWER</h4>
                        <p className='question-detail__text'>{item.modelAnswer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Road Map Header */}
            <div className='interview__roadmap-header'>
              <h1 className='interview__roadmap-title'>Preparation Road Map</h1>
              <p className='interview__roadmap-subtitle'>{interviewData.preparationPlan.length}-day plan</p>
            </div>

            {/* Timeline */}
            <div className='timeline'>
              {interviewData.preparationPlan.map((plan, index) => (
                <div key={index} className='timeline__item'>
                  <div className='timeline__marker'>
                    <div className='timeline__dot'></div>
                    {index < interviewData.preparationPlan.length - 1 && <div className='timeline__line'></div>}
                  </div>
                  <div className='timeline__content'>
                    <div className='timeline__day'>Day {plan.day}</div>
                    <h3 className='timeline__title'>{plan.title}</h3>
                    <ul className='timeline__subtasks'>
                      {plan.subtasks.map((subtask, subIndex) => (
                        <li key={subIndex} className='timeline__subtask'>{subtask}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Right Sidebar */}
      <aside className='interview__sidebar interview__sidebar--right'>
        <div className='interview__sidebar-content'>
          {/* Match Score Card */}
          <section className='match-score-section'>
            <div className='match-score-card'>
              <div className='match-score-card__circle'>
                <div className='match-score-card__ring'></div>
                <span className='match-score-card__value'>{interviewData.matchScore}</span>
              </div>
              <p className='match-score-card__label'>Match Score</p>
            </div>
          </section>

          {/* Skill Gaps Section */}
          <section className='skill-gaps-section'>
            <h3 className='skill-gaps-section__title'>Skill Gaps</h3>
            <div className='skill-tags'>
              {interviewData.skillGaps.map((gap, index) => (
                <button key={index} className={`skill-tag skill-tag--${gap.severity}`}>
                  {gap.skill}
                </button>
              ))}
            </div>
          </section>
        </div>
      </aside>
    </div>
  )
}

export default Interview
