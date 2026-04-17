import React from 'react'
import '../style/home.scss'

const Home = () => {
  const MAX_JOB_DESCRIPTION_CHARS = 5000;

  return (
    <main className='home'>
      {/* Header Section */}
      <section className='home__header'>
        <h1 className='home__title'>
          Create Your Custom <span className='home__title--highlight'>Interview Plan</span>
        </h1>
        <p className='home__subtitle'>
          Let our AI analyze the job requirements and your unique profile to build a winning strategy.
        </p>
        <div className='home__indicator'>•</div>
      </section>

      {/* Main Content Section */}
      <section className='home__content'>
        <div className='interview-card'>
          {/* Left Column - Job Description */}
          <div className='interview-card__column interview-card__column--left'>
            <div className='form-group'>
              <div className='form-group__header'>
                <div className='form-group__icon'>📌</div>
                <h2 className='form-group__title'>Target Job Description</h2>
                <span className='form-group__required'>Required</span>
              </div>
              
              <textarea
                className='textarea'
                name='jobDescription'
                id='jobDescription'
                placeholder='Paste the full job description here...
e.g. "Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."'
                maxLength={MAX_JOB_DESCRIPTION_CHARS}
              />
              
              <div className='form-group__footer'>
                <span className='char-count'>0 / {MAX_JOB_DESCRIPTION_CHARS} chars</span>
              </div>
            </div>
          </div>

          {/* Right Column - Profile */}
          <div className='interview-card__column interview-card__column--right'>
            <div className='form-group'>
              <div className='form-group__header'>
                <div className='form-group__icon'>👤</div>
                <h2 className='form-group__title'>Your Profile</h2>
              </div>

              {/* Resume Upload Section */}
              <div className='upload-section'>
                <p className='upload-section__label'>
                  Upload Resume <small className='upload-section__hint'>(PDF files only)</small>
                </p>

                <label className='upload-dropzone' htmlFor='resume'>
                  <div className='upload-dropzone__content'>
                    <div className='upload-dropzone__icon'>☁️</div>
                    <p className='upload-dropzone__text'>Click to upload or drag & drop</p>
                    <p className='upload-dropzone__format'>PDF or DOCX Max 5MB</p>
                  </div>
                  <input
                    hidden
                    type='file'
                    name='resume'
                    id='resume'
                    accept='.pdf,.docx'
                  />
                </label>
              </div>

              {/* Divider */}
              <div className='divider'>
                <span className='divider__text'>OR</span>
              </div>

              {/* Self Description Section */}
              <div className='form-group__section'>
                <label className='form-label' htmlFor='selfDescription'>
                  Quick Self-Description
                </label>
                <textarea
                  className='textarea'
                  name='selfDescription'
                  id='selfDescription'
                  placeholder='Briefly describe your experience, key skills, and years of experience if you don&apos;t have a resume handy...'
                />
              </div>

              {/* Requirement Note */}
              <div className='requirement-note'>
                <div className='requirement-note__icon'>ℹ️</div>
                <p className='requirement-note__text'>
                  Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Button Section */}
      <section className='home__footer'>
        <button className='button button--primary'>
          ✨ Generate My Interview Strategy
        </button>
        <p className='home__processing-info'>AI-Powered Strategy Generation • Approx 30s</p>
      </section>

      {/* Bottom Footer */}
      <footer className='home__bottom-footer'>
        <a href='#privacy'>Privacy Policy</a>
        <a href='#terms'>Terms of Service</a>
        <a href='#help'>Help Center</a>
      </footer>
    </main>
  )
}

export default Home