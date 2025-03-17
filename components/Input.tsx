
export default function Input({ setValue, value }: { setValue: (value: string) => void, value: string }) {
    return (
        <input
            type="text"
            placeholder="Buscar repositorios..."
            className="w-full p-3 border border-gray-300 rounded-md"
            onChange={(e) => {
                setValue(e.target.value);
            }}
            value={value}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    setValue(value);
                }
            }}
        />
    )
}
