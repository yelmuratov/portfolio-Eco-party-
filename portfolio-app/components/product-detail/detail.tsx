import { useRouter } from "next/router"
import { SVGProps, useEffect, useState } from "react"
import Link from "next/link"
import { fetchProjectWithId } from "@/services/api"

type Project = {
  id: number
  name: string
  category: string
  image: string
  link: string
  demo_video: string
  description: string
}

export default function DetailPage() {
  const router = useRouter()
  const { id } = router.query
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const data = await fetchProjectWithId(Number(id))
          setProject(data)
        } catch (err) {
          setError("Error while fetching project")
        } finally {
          setLoading(false)
        }
      }
      fetchProject()
    }
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
        <div className="flex items-center justify-center">
          <img
            src={project.image}
            alt={project.name}
            width={600}
            height={600}
            className="w-full max-w-[400px] rounded-lg shadow-lg"
          />
        </div>
        <div className="grid gap-6 md:gap-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{project.name}</h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              Revolutionize your vision with our cutting-edge mobile app.
            </p>
          </div>
          <div className="grid gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">Description</h2>
              <p className="text-muted-foreground text-base md:text-lg">
                {project.description}
              </p>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">Category</h2>
              <p className="text-muted-foreground text-base md:text-lg">{project.category}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href={project.link}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                <GithubIcon className="w-5 h-5" />
                GitHub
              </Link>
              <Link
                href={project.demo_video}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2 text-secondary-foreground transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                <VideoIcon className="w-5 h-5" />
                Demo Video
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GithubIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function VideoIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  )
}
