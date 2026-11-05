import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

// shadcn Accordion on Radix: keyboard navigation and aria wiring come for free.
export const Accordion = AccordionPrimitive.Root

export function AccordionItem({ className, ...props }) {
  return <AccordionPrimitive.Item className={cn('rounded-xl border border-white/10 bg-white/[0.03] transition data-[state=open]:border-brand-400/40 data-[state=open]:bg-brand/10', className)} {...props} />
}

export function AccordionTrigger({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'group flex flex-1 items-center justify-between gap-4 rounded-xl px-5 py-4 text-left text-base font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400',
          className
        )}
        {...props}
      >
        {children}
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-300 transition duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-brand group-data-[state=open]:text-white">
          <Plus className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" {...props}>
      <div className={cn('px-5 pb-5 pr-12 text-[15px] leading-relaxed text-slate-300', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}
