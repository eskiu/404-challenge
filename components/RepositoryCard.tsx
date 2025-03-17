import Link from "next/link"
import Image from "next/image"
import useRepositoryStore from "@/stores/repositoryStore";
import { Repository } from "@/types/repositories";
import { ExternalLink, Star, Plus } from "lucide-react";

export default function RepositoryCard({ repository }: { repository: Repository; }) {

    const { selectedRepositories, addRepository, removeRepository } = useRepositoryStore();
    
    const isSelected = selectedRepositories.some(repo => repo.id === repository.id);

    return (
        <div
            key={repository.id}
            className="border rounded-lg p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
        >
            <button
                onClick={() => isSelected ? removeRepository(repository.id) : addRepository(repository)}
                className={`rounded-md cursor-pointer transition-transform duration-300 ease-in-out ${isSelected
                    ? "text-red-800 hover:text-red-900 rotate-45"
                    : "text-green-800 hover:text-green-900 rotate-0"
                    }`}
            >
                <Plus />
            </button>

            <Image
                src={repository.owner.avatar_url}
                alt={`${repository.owner.login}'s avatar`}
                width={50}
                height={50}
                className="rounded-full"
            />

            <div className="flex-1">
                <p className="font-medium">{repository.owner.login}</p>
                <h3 className="text-lg font-bold">{repository.name}</h3>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                    <span>{repository.stargazers_count.toLocaleString()}</span>
                </div>

                <Link href={repository.html_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-5 w-5 cursor-pointer" />
                    <span className="sr-only">Abrir repositorio</span>
                </Link>
            </div>
        </div>
    )
}
