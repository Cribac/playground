import { useSum } from "~~/utils/sum"

export default eventHandler((event) => {
  const sum = useSum(1, 6)
  return `Start by editing <code>server/routes/index.ts</code>. Sum: ${sum}`
})
