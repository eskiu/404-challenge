import { Repository } from "@/types/repositories";
import { Star } from "lucide-react";

export default function BottomInfo({ repositories }: { repositories: Repository[] }) {
    return (
        <>
            {repositories.length > 0 && (
                <div className="p-4 border-t flex justify-between items-center w-full">
                    <p>Total de repositorios: {repositories.length}</p>
                    <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                        <p>Total de estrellas: {repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0)}</p>
                    </div>
                </div>
            )}
        </>
    )
}
