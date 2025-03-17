"use client";

import { useEffect, useState } from 'react'
import Link from 'next/link'
import useGetRepositories from '@/hooks/useGetRepositories';
import { Repository } from '@/types/repositories';
import Input from '@/components/Input';
import RepositoryCard from '@/components/Home/RepositoryCard';

export default function BodySearch() {

    const [value, setValue] = useState<string>("");
    const { repositories, loading, getRepositories, error } = useGetRepositories();
    const [selectedRepositories, setSelectedRepositories] = useState<Repository[]>([]);

    useEffect(() => {
        getRepositories(value);
        if (value.length < 3) {
            setSelectedRepositories([]);
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
                {loading && value.length > 3 && <p className="text-sm text-center">Buscando repositorios...</p>}
                {error && !loading && <p className="text-sm text-center">{error}</p>}
                {!error && value.length > 3 && repositories.map((repository) => (
                    <RepositoryCard
                        key={repository.id}
                        repository={repository}
                    />
                ))}
            </div>
        </>
    )
}
