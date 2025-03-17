"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useGetRepositories from "@/hooks/useGetRepositories";
import Input from "@/components/Input";

export default function Home() {
  const [value, setValue] = useState<string>("");
  const { repositories, loading, getRepositories, setRepositories } = useGetRepositories();
  const [selectedRepositories, setSelectedRepositories] = useState<[]>([]);
  useEffect(() => {
    if (value.length > 3) {
      getRepositories(value);
    } else {
      setSelectedRepositories([]);
      setRepositories([]);
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-2xl font-bold">Buscador de repositorios</h1>
      <Input setValue={setValue} value={value} />
      <div className="flex justify-end">
        <Link
          href="/selected"
          className="text-sm rounded-md py-2 px-4 w-fit bg-emerald-700 text-white"
        >Ver seleccionados ({selectedRepositories.length})</Link>
      </div>
      <div className="flex flex-col gap-4 w-full">
        {loading && <p className="text-sm text-center">Buscando repositorios...</p>}
        {repositories.length === 0 && value.length > 3 && !loading && <p className="text-sm text-center">No se encontraron repositorios</p>}
        {repositories.length > 0 && value.length > 3 && repositories.map((repository) => (
          <div key={repository.id}>
            <h2>{repository.name}</h2>
            <p>{repository.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
