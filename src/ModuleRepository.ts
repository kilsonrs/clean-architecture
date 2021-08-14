import { Module } from './Module'

export interface ModuleRepository {
  findByCode(level: string, code: string): Module
}
