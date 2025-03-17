import { useState, useCallback } from "react";
import { Repository } from "@/types/repositories";
import { debounce } from "@/utils/debounce";

export default function useGetRepositories() {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const getRepositories = useCallback(
        debounce(async (value: string) => {

            if (value.length < 3) {
                setError("Ingrese al menos 3 caracteres para realizar la búsqueda.");
                setRepositories([]);
                return;
            }

            setError(null);
            setRepositories([]);
            setLoading(true);

            try {
                const response = await fetch(
                    `https://api.github.com/search/repositories?q=${encodeURIComponent(value)}&sort=stars&order=desc&per_page=20`
                );
                const data = await response.json();
                if (response.ok) {
                    setRepositories(data.items);
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
    }
}
