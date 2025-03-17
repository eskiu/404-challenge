import useRepositoryStore from '@/stores/repositoryStore';
import { createMockRepository } from './mocks/mockStateRepository';

beforeEach(() => {
    useRepositoryStore.getState().clearRepositories();
});

describe('Test del store del repositorio', () => {
    test('debería iniciar con un array vacío de repositorios', () => {
        expect(useRepositoryStore.getState().selectedRepositories).toEqual([]);
    });

    test('debería agregar un repositorio correctamente', () => {
        const repository = createMockRepository(1);

        useRepositoryStore.getState().addRepository(repository);

        expect(useRepositoryStore.getState().selectedRepositories).toHaveLength(1);
        expect(useRepositoryStore.getState().selectedRepositories[0].id).toBe(1);
    });

    test('no debería agregar repositorios duplicados', () => {
        const repository = createMockRepository(1);

        useRepositoryStore.getState().addRepository(repository);
        useRepositoryStore.getState().addRepository(repository);

        expect(useRepositoryStore.getState().selectedRepositories).toHaveLength(1);
    });

    test('debería eliminar un repositorio por ID', () => {
        const repository1 = createMockRepository(1);
        const repository2 = createMockRepository(2);

        useRepositoryStore.getState().addRepository(repository1);
        useRepositoryStore.getState().addRepository(repository2);
        expect(useRepositoryStore.getState().selectedRepositories).toHaveLength(2);

        useRepositoryStore.getState().removeRepository(1);

        expect(useRepositoryStore.getState().selectedRepositories).toHaveLength(1);
        expect(useRepositoryStore.getState().selectedRepositories[0].id).toBe(2);
    });

    test('debería limpiar todos los repositorios', () => {
        useRepositoryStore.getState().addRepository(createMockRepository(1));
        useRepositoryStore.getState().addRepository(createMockRepository(2));
        useRepositoryStore.getState().addRepository(createMockRepository(3));

        expect(useRepositoryStore.getState().selectedRepositories).toHaveLength(3);

        useRepositoryStore.getState().clearRepositories();

        expect(useRepositoryStore.getState().selectedRepositories).toHaveLength(0);
    });
});