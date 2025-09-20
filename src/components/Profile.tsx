import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

export default function Profile() {
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        let { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()
        setProfile(data)
      }
    }
    getProfile()
  }, [])

  if (!profile) return <p>Loading profile...</p>

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Welcome, {profile.username || "User"}!</h2>
      <p>{profile.full_name}</p>
    </div>
  )
}
