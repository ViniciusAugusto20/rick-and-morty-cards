import Dimension from './dimension'

export default interface Character {
  id: string
  name: string
  status: string
  species: string
  type: string
  gender: string
  url: string
  image: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
}
