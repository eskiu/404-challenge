import Link from 'next/link'
import React from 'react'
import { ArrowLeft } from 'lucide-react'

export default function page() {
    return (
        <div className="flex gap-4 w-full">
            <Link href="/" className="text-sm rounded-md w-fit flex items-center justify-center">
                <ArrowLeft className="w-10" />
            </Link>
            <h1 className="text-2xl font-bold">Repositorios seleccionados</h1>
        </div>
    )
}
