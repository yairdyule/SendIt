import Image from 'next/image'

export default function Footer({}) {
  return (
    <div className="footer">
      <div></div>
      <div>
        <span>Powered by</span>
        {/* <Image src="logo.png" alt="" /> */}
      </div>
      <div className="flex flex-end">
        <a href="https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fsupabase%2Fsupabase%2Ftree%2Fmaster%2Fexamples%2Fnextjs-ts-user-management&project-name=supabase-user-management&repository-name=supabase-user-management&demo-title=Supabase%20User%20Management&demo-description=An%20example%20web%20app%20using%20Supabase%20and%20Next.js&demo-url=https%3A%2F%2Fsupabase-nextjs-ts-user-management.vercel.app&demo-image=https%3A%2F%2Fi.imgur.com%2FZ3HkQqe.png&integration-ids=oac_jUduyjQgOyzev1fjrW83NYOv&external-id=nextjs-user-management">
          <Image layout="fill" src="https://vercel.com/button" alt="vercel" />
        </a>
      </div>
    </div>
  )
}
