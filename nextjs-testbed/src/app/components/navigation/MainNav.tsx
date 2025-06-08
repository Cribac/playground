import Link from 'next/link'
import type { Nav } from '@/types/nav'

export type MainNavProps = {
  navItems: Nav
  className?: string
}

export default function MainNav({ navItems, className = '' }: MainNavProps) {
  return (
    <nav className={className}>
      <ul className='flex items-center gap-4'>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link
              className='text-sm text-gray-400 hover:text-gray-200'
              href={item.href}
              target={item?.target || '_self'}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
