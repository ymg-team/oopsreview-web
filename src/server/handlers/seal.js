import { generateSeal } from '../middlewares/seal'

export default (req, res) => {
  const seal = generateSeal()
  return res.send(200, seal)
}