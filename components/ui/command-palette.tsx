"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

export type Command = {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
  keywords?: string
  group?: string
  perform: () => void
}

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  commands: Command[]
  placeholder?: string
}

export function CommandPalette({
  open,
  onOpenChange,
  commands,
  placeholder = "Type a command or search...",
}: CommandPaletteProps) {
  const [query, setQuery] = React.useState("")
  const [activeIndex, setActiveIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) =>
      `${c.label} ${c.description ?? ""} ${c.keywords ?? ""} ${c.group ?? ""}`
        .toLowerCase()
        .includes(q),
    )
  }, [commands, query])

  const groups = React.useMemo(() => {
    const map = new Map<string, Command[]>()
    for (const c of filtered) {
      const g = c.group ?? "Actions"
      if (!map.has(g)) map.set(g, [])
      map.get(g)!.push(c)
    }
    return Array.from(map.entries())
  }, [filtered])

  React.useEffect(() => {
    if (!open) return
    setQuery("")
    setActiveIndex(0)
    const raf = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(raf)
  }, [open])

  React.useEffect(() => {
    setActiveIndex((i) => Math.min(i, Math.max(0, filtered.length - 1)))
  }, [filtered.length])

  React.useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" })
  }, [activeIndex])

  if (!open) return null

  const runCommand = (cmd: Command) => {
    onOpenChange(false)
    setTimeout(() => cmd.perform(), 0)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setActiveIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0))
        break
      case "ArrowUp":
        e.preventDefault()
        setActiveIndex((i) =>
          filtered.length ? (i - 1 + filtered.length) % filtered.length : 0,
        )
        break
      case "Home":
        e.preventDefault()
        setActiveIndex(0)
        break
      case "End":
        e.preventDefault()
        setActiveIndex(Math.max(0, filtered.length - 1))
        break
      case "Enter": {
        e.preventDefault()
        const cmd = filtered[activeIndex]
        if (cmd) runCommand(cmd)
        break
      }
      case "Escape":
        e.preventDefault()
        onOpenChange(false)
        break
    }
  }

  const activeId = filtered[activeIndex] ? `cmd-${filtered[activeIndex].id}` : undefined

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[12vh]"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false)
      }}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in-0"
        aria-hidden="true"
        onMouseDown={() => onOpenChange(false)}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl animate-in fade-in-0 zoom-in-95 dark:border-gray-700 dark:bg-gray-800"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-gray-200 px-4 dark:border-gray-700">
          <Search className="h-4 w-4 shrink-0 text-gray-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActiveIndex(0)
            }}
            placeholder={placeholder}
            role="combobox"
            aria-expanded="true"
            aria-controls="command-palette-list"
            aria-activedescendant={activeId}
            className="w-full bg-transparent py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
          />
          <kbd className="hidden rounded border border-gray-200 px-1.5 py-0.5 text-[10px] text-gray-400 sm:inline-block dark:border-gray-600">
            ESC
          </kbd>
        </div>

        <div
          ref={listRef}
          id="command-palette-list"
          role="listbox"
          aria-label="Commands"
          className="max-h-[50vh] overflow-y-auto p-2"
        >
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-sm text-gray-400">
              No results found.
            </div>
          ) : (
            groups.map(([groupName, items]) => (
              <div key={groupName} className="mb-1">
                <div className="px-2 py-1.5 text-[11px] font-medium uppercase tracking-wide text-gray-400">
                  {groupName}
                </div>
                {items.map((cmd) => {
                  const idx = filtered.indexOf(cmd)
                  const active = idx === activeIndex
                  return (
                    <button
                      key={cmd.id}
                      id={`cmd-${cmd.id}`}
                      data-index={idx}
                      role="option"
                      aria-selected={active}
                      type="button"
                      onMouseMove={() => setActiveIndex(idx)}
                      onClick={() => runCommand(cmd)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                        active
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700",
                      )}
                    >
                      {cmd.icon && (
                        <span
                          className={cn(
                            "shrink-0",
                            active ? "text-white" : "text-gray-400",
                          )}
                        >
                          {cmd.icon}
                        </span>
                      )}
                      <span className="flex-1 truncate">{cmd.label}</span>
                      {cmd.description && (
                        <span
                          className={cn(
                            "truncate text-xs",
                            active ? "text-blue-100" : "text-gray-400",
                          )}
                        >
                          {cmd.description}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-2 text-[11px] text-gray-400 dark:border-gray-700">
          <span className="flex items-center gap-1.5">
            <kbd className="rounded border border-gray-200 px-1.5 py-0.5 dark:border-gray-600">
              ↑
            </kbd>
            <kbd className="rounded border border-gray-200 px-1.5 py-0.5 dark:border-gray-600">
              ↓
            </kbd>
            navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="rounded border border-gray-200 px-1.5 py-0.5 dark:border-gray-600">
              ↵
            </kbd>
            select
          </span>
        </div>
      </div>
    </div>
  )
}
