import RepositorySearch from "@/components/RepositorySearch";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-2xl font-bold">Buscador de repositorios</h1>
      <RepositorySearch />
    </div>
  );
}
