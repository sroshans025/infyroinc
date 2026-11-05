import { motion } from 'framer-motion'

const TAGS = { div: motion.div, li: motion.li, section: motion.section, article: motion.article, p: motion.p }

// Fades and lifts its children into view once they scroll on screen.
export default function Reveal({ as = 'div', delay = 0, className = '', children, ...rest }) {
  const Tag = TAGS[as] || motion.div
  return (
    <Tag
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.7, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}
