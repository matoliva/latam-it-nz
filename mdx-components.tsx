import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Sobrescribe elementos básicos con estilo Tailwind
    h1: (props) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
    h2: (props) => <h2 className="text-2xl font-semibold mt-10 mb-4" {...props} />,
    h3: (props) => <h3 className="text-xl font-medium mt-6 mb-3" {...props} />,
    h4: (props) => <h4 className="text-lg font-semibold mt-4 mb-2" {...props} />,
    p: (props) => <p className="text-base leading-relaxed mb-4" {...props} />,
    ul: (props) => <ul className="list-disc list-inside space-y-2 mb-4" {...props} />,
    ol: (props) => <ol className="list-decimal list-inside space-y-2 mb-4" {...props} />,
    li: (props) => <li className="text-base leading-relaxed" {...props} />,
    blockquote: (props) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4" {...props} />
    ),
    code: (props) => (
      <code className="bg-gray-100 rounded px-1.5 py-0.5 font-mono text-sm text-pink-600" {...props} />
    ),
    pre: (props) => (
      <pre className="bg-gray-900 text-white rounded-lg p-4 overflow-x-auto my-6" {...props} />
    ),
    a: (props) => (
      <a className="text-blue-600 dark:text-sky-400 hover:underline hover:text-blue-800 dark:hover:text-sky-300" target="_blank" rel="noopener noreferrer" {...props} />
    ),
    strong: (props) => <strong className="font-semibold text-gray-900" {...props} />,
    em: (props) => <em className="italic text-gray-800" {...props} />,
    hr: () => <hr className="my-8 border-gray-300" />,
    ...components,
  };
}
