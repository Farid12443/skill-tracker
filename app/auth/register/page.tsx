"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [loading, setLoading] = useState(false)

    const handleRegister = async () => {
        setErrorMsg("")

        if (!email || !password || !confirmPassword) {
            setErrorMsg("Semua field wajib diisi")
            return
        }

        if (password !== confirmPassword) {
            setErrorMsg("Password tidak sama")
            return
        }

        if (password.length < 6) {
            setErrorMsg("Password minimal 6 karakter")
            return
        }

        setLoading(true)

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    display_name: name
                }
            }
        })

        setLoading(false)

        if (error) {
            setErrorMsg(error.message)
        } else {
            router.push("/")
        }
    }

    return (
        <>
            <div className="flex flex-col gap-3 p-10 max-w-sm mx-auto">
                {errorMsg && <p className="text-red-500">{errorMsg}</p>}
                <input
                    type="text"
                    placeholder="Nama"
                    className="border p-2"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="bg-black text-white p-2"
                >
                    Register
                </button>
            </div>
        </>
    )
}