import { Level } from './Level'

export interface LevelRepository {
  findByCode(code: string): Level
}
