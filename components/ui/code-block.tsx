import { cn } from "@/lib/utils"

interface CodeBlockProps extends React.ComponentProps<"div"> {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
}

function CodeBlock({
  code,
  language = "typescript",
  filename,
  showLineNumbers = false,
  className,
  ...props
}: CodeBlockProps) {
  const lines = code.split("\n")

  return (
    <div
      data-slot="code-block"
      className={cn(
        "overflow-hidden border border-border bg-muted text-sm",
        className
      )}
      {...props}
    >
      {filename && (
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          <svg
            className="size-4 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-caption">{filename}</span>
        </div>
      )}
      <div className="overflow-x-auto">
        <pre className="p-4">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex">
                {showLineNumbers && (
                  <span className="mr-4 inline-block w-8 select-none text-right text-muted-foreground/50">
                    {i + 1}
                  </span>
                )}
                <span className="flex-1">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}

export { CodeBlock, type CodeBlockProps }
