import { useState, useCallback } from "react";
import { Repository } from "@/types/repositories";
import { debounce } from "@/utils/debounce";

export default function useGetRepositories() {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getRepositories = useCallback(
        debounce(async (value: string) => {

            if (value.length < 3) return;

            setError(null);
            setRepositories([]);
            setLoading(true);

            try {
                const response = await fetch(
                    `https://api.github.com/search/repositories?q=${encodeURIComponent(value)}&sort=stars&order=desc&per_page=20`
                );
                const data = await response.json();

                const repositories = data.items.map(({ id, name, owner, stargazers_count, html_url }: Repository) => ({
                    id,
                    name,
                    owner,
                    stargazers_count,
                    html_url,
                }));

                if (response.ok && repositories.length > 0) {
                    setRepositories(repositories);
                } else {
                    setError("Error al obtener los repositorios");
                    setRepositories([]);
                }
            } catch (error) {
                setError("Error al obtener los repositorios");
                setRepositories([]);
            } finally {
                setLoading(false);
            }
        }, 500),
        []
    );

    return {
        repositories,
        setRepositories,
        getRepositories,
        loading,
        error,
        setError,
    }
}
