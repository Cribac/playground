import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  /* config options here */
}

const withNextIntl = createNextIntlPlugin({
  /* options */
})

export default withNextIntl(nextConfig)
