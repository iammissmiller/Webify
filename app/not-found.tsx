import Link from "next/link"
import { Code2 } from "lucide-react"

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Code2 className="w-8 h-8 text-blue-600" />
        <span className="text-2xl font-bold text-gray-900 dark:text-white">Webify</span>
      </Link>
      <h1 className="text-6xl font-bold text-gray-200 dark:text-gray-700 mb-4">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">Page not found</p>
      <p className="text-gray-400 dark:text-gray-500 mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Back to Editor
      </Link>
    </div>
  )
}
