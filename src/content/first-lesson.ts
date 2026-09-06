import type { Lesson } from '../domain/content'

export const firstLesson: Lesson = {
  id: 'ts-functions-decomposition-001',
  programId: 'software-engineering',
  topicId: 'program-decomposition-typescript-functions',
  title: 'Program Decomposition with TypeScript Functions',
  summary: 'Turn a larger programming problem into small, testable functions with clear responsibilities.',
  depth: 'foundation',
  objectives: [
    'Identify distinct responsibilities inside a programming problem.',
    'Design functions around inputs, outputs, and one clear responsibility.',
    'Explain why decomposition improves testing and maintenance.',
  ],
  sections: [
    {
      id: 'mental-model',
      kind: 'text',
      title: 'The mental model',
      body: 'A function is a boundary around one responsibility. Good decomposition makes the parts of a problem independently understandable and testable.',
    },
    {
      id: 'example',
      kind: 'example',
      title: 'Example',
      body: 'Instead of one function that reads data, validates it, calculates a result, and formats output, separate those responsibilities so each part can be tested independently.',
    },
    {
      id: 'code',
      kind: 'code',
      title: 'TypeScript example',
      body: 'function calculateTotal(prices: number[]): number {\n  return prices.reduce((total, price) => total + price, 0)\n}\n\nfunction formatTotal(total: number): string {\n  return `Total: ${total.toFixed(2)}`\n}',
    },
  ],
  practice: [
    {
      id: 'practice-1',
      type: 'question',
      prompt: 'Name two separate responsibilities that could be extracted from a function that loads users, filters inactive users, and formats a report.',
    },
    {
      id: 'practice-2',
      type: 'code',
      prompt: 'Write two TypeScript functions that split validation from calculation for a simple numeric input.',
    },
  ],
  assessmentId: 'ts-functions-decomposition-assessment-001',
}
