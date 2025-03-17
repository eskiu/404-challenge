import { useState } from "react";
import { Repository } from "@/types/repositories";

export default function useGetRepositories() {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getRepositories = async (value: string) => {
        setLoading(true);
        const response = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(value)}&sort=stars&order=desc&per_page=20`);
        const data = await response.json();
        setRepositories(data.items);
        setLoading(false);
    }

    return {
        repositories,
        setRepositories,
        loading,
        getRepositories
    }
}
