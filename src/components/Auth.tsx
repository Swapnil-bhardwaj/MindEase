import { useState } from "react"
import { supabase } from "../supabaseClient"

export default function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignUp = async () => {
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) alert(error.message)
    else alert("Check your email for confirmation link!")
    setLoading(false)
  }

  const handleSignIn = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) alert(error.message)
    else alert("Signed in!")
    setLoading(false)
  }

  return (
    <div className="p-4 max-w-sm mx-auto">
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleSignUp}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded w-full mb-2"
      >
        Sign Up
      </button>
      <button
        onClick={handleSignIn}
        disabled={loading}
        className="bg-green-500 text-white p-2 rounded w-full"
      >
        Sign In
      </button>
    </div>
  )
}
