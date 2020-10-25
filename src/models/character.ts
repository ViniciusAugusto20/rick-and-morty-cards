import ILocation from './location'

export default interface ICharacter {
  id: string
  name: string
  status: string
  species: string
  type: string
  gender: string
  url: string
  image: string
  origin: ILocation
  location: ILocation
}
