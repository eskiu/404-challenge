"use client";

import { useEffect, useState } from 'react'
import Link from 'next/link'
import useRepositoryStore from '@/stores/repositoryStore';
import useGetRepositories from '@/hooks/useGetRepositories';
import RepositoryCard from '@/components/RepositoryCard';
import Input from '@/components/Input';
import BottomInfo from '@/components/BottomInfo';
import Spinner from '@/components/Spinner';

export default function RepositorySearch() {

    const [value, setValue] = useState<string>("");
    const { repositories, loading, getRepositories, error, setError, setRepositories } = useGetRepositories();
    const { selectedRepositories } = useRepositoryStore();

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
            <div className="flex justify-end">
                <Link
                    href="/selected"
                    className="text-sm rounded-md py-2 px-4 w-fit bg-emerald-700 text-white"
                >Ver seleccionados ({selectedRepositories.length})</Link>
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
