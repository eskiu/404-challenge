import { Repository } from '@/types/repositories'
import { create } from 'zustand'

interface StoreState {
    selectedRepositories: Repository[]
    addRepository: (repository: Repository) => void
    removeRepository: (id: number) => void
    clearRepositories: () => void
  }

const useRepositoryStore = create<StoreState>((set) => ({
    selectedRepositories: [],
    addRepository: (repository) => 
        set((state) => ({
          selectedRepositories: state.selectedRepositories.some(repo => repo.id === repository.id)
            ? state.selectedRepositories
            : [...state.selectedRepositories, repository]
        })),
      removeRepository: (id) => 
        set((state) => ({
          selectedRepositories: state.selectedRepositories.filter(repo => repo.id !== id)
        })),
      clearRepositories: () => set({ selectedRepositories: [] }),
}))

export default useRepositoryStore;
