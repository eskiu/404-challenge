"use client";

import Input from "@/components/Input";
import Link from "next/link";
import { useState } from "react";


export default function Home() {
  const [value, setValue] = useState<string>("");
  const [repositories, setRepositories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRepositories, setSelectedRepositories] = useState<string[]>([]);


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
        {repositories.length === 0 && <p className="text-sm text-center">No se encontraron repositorios</p>}
      </div>
    </div>
  );
}
