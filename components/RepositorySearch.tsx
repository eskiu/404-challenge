"use client";

import { useEffect, useState } from 'react'
import Link from 'next/link'
import useRepositoryStore from '@/stores/repositoryStore';
import useGetRepositories from '@/hooks/useGetRepositories';
import RepositoryCard from '@/components/RepositoryCard';
import Input from '@/components/Input';
import BottomInfo from '@/components/BottomInfo';
import Spinner from '@/components/Spinner';
import { List, Trash2 } from 'lucide-react';
export default function RepositorySearch() {

    const [value, setValue] = useState<string>("");
    const { repositories, loading, getRepositories, error, setError, setRepositories } = useGetRepositories();
    const { selectedRepositories, clearRepositories } = useRepositoryStore();

    useEffect(() => {
        getRepositories(value);
        if (value.length <= 3) {
            setError("Ingrese al menos 3 caracteres para realizar la búsqueda.");
            setRepositories([]);
        }
    }, [value, getRepositories]);

    return (
        <>
            <Input setValue={setValue} value={value} />
            <div className={`flex gap-2 w-full ${selectedRepositories.length > 0 ? 'justify-between' : 'justify-end'}`}>
                {selectedRepositories.length > 0 && (
                    <button
                        onClick={() => {
                            clearRepositories();
                        }}
                        className="flex items-center gap-2 text-sm rounded-md py-2 px-4 w-fit bg-red-700 text-white cursor-pointer hover:bg-red-800 transition-colors"
                    >
                        <Trash2 className="w-4" />
                        Borrar seleccionados
                    </button>
                )}
                <Link
                    href="/selected"
                    className="flex items-center gap-2 text-sm rounded-md py-2 px-4 w-fit text-center bg-emerald-700 text-white cursor-pointer hover:bg-emerald-800 transition-colors"
                >
                    <List className="w-4" />
                    Ver seleccionados ({selectedRepositories.length})
                </Link>
            </div>
            <div className="flex flex-col gap-4 w-full">
                {loading && value.length >= 3 && <Spinner />}
                {error && !loading && <p className="text-sm text-center">{error}</p>}
                {!error && value.length >= 3 && repositories.map((repository) => (
                    <RepositoryCard
                        key={repository.id}
                        repository={repository}
                    />
                ))}
            </div>
            <BottomInfo repositories={repositories} />
        </>
    )
}
