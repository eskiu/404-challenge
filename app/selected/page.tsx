'use client'

import Link from 'next/link'
import useRepositoryStore from "@/stores/repositoryStore";
import RepositoryCard from '@/components/RepositoryCard'
import BottomInfo from '@/components/BottomInfo';
import { Repository } from '@/types/repositories'
import { ArrowLeft } from 'lucide-react'

export default function SelectedRepositories() {
    const { selectedRepositories } = useRepositoryStore();

    return (
        <>
            <div className="flex gap-4 w-full">
                <Link href="/" className="text-sm rounded-md w-fit flex items-center justify-center">
                    <ArrowLeft className="w-10" />
                </Link>
                <h1 className="text-2xl font-bold">Repositorios seleccionados</h1>
            </div>
            <div className="flex flex-col gap-4 py-4 w-full">
                {
                    selectedRepositories.length > 0 &&
                    selectedRepositories.map((repository: Repository) => (
                        <RepositoryCard key={repository.id} repository={repository} />
                    ))}
                {
                    selectedRepositories.length === 0 &&
                    <div className="text-center py-12">
                        <p className="text-gray-500">No hay repositorios seleccionados.</p>
                        <Link href="/" className="text-blue-500 hover:underline mt-2 inline-block">
                            Volver a la búsqueda
                        </Link>
                    </div>
                }
            </div>
            <BottomInfo repositories={selectedRepositories} />
        </>
    )
}
