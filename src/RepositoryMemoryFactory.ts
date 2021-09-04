import { ClassroomRepositoryMemory } from "./ClassroomRepositoryMemory";
import { EnrollmentRepositoryMemory } from "./EnrollmentRepositoryMemory";
import { LevelRepositoryMemory } from "./LevelRepositoryMemory";
import { ModuleRepositoryMemory } from "./ModuleRepositoryMemory";
import { RepositoryAbstractFactory } from "./RepositoryAbstractFactory";

export class RepositoryMemoryFactory implements RepositoryAbstractFactory {

  createLevelRepository() {
    return new LevelRepositoryMemory()
  }

  createModuleRepository() {
    return new ModuleRepositoryMemory()
  }

  createClassroomRepository() {
    return new ClassroomRepositoryMemory()
  }

  createEnrollmentRepository() {
    return new EnrollmentRepositoryMemory()
  }
}
