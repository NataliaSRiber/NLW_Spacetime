import { getUser } from '@/lib/auth'
import Image from 'next/image'

export default function Profile() {
  const { name, avatarUrl } = getUser()
  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        src={avatarUrl}
        width={40}
        height={40}
        alt="profile-picture"
        className="h-10 w-10 rounded-full"
      />
      <p className="max-w-[140px] text-sm leading-snug">{name}</p>
      <a
        href="/api/auth/logout"
        className="block text-red-400 hover:text-red-300"
      >
        Sair
      </a>
    </div>
  )
}
