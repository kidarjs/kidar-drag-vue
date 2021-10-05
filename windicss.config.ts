import { defineConfig } from 'windicss/helpers'
import formsPlugin from 'windicss/plugin/forms'

function range(size, startAt = 1) {
  return Array.from(Array(size).keys()).map(i => i + startAt)
}

const config = defineConfig({
  darkMode: 'class',
  theme: {
  },
  plugins: [
    formsPlugin
  ]
})

export default config