// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Federico Martinez and his approach to technical partnership.',
}

export default function AboutPage() {
  return (
    <div className="prose prose-lg dark:prose-invert mx-auto">
      <h1>About Me</h1>
      <p className="lead">
        Technical Partner specializing in systematic solutions and scalable architectures.
      </p>
      
      <h2>My Approach</h2>
      <p>
        I combine systematic thinking with deep engineering expertise to create
        scalable solutions that stand the test of time.
      </p>
      
      <h2>Experience</h2>
      <ul>
        <li>Software Engineering since 2015</li>
        <li>Technical Leadership</li>
        <li>System Architecture</li>
        <li>Strategic Planning</li>
      </ul>
      
      <h2>Values</h2>
      <ul>
        <li>Long-term thinking</li>
        <li>Systematic approach</li>
        <li>Continuous learning</li>
        <li>Value optimization</li>
      </ul>
    </div>
  )
}