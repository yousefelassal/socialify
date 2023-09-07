import Posts from "@/components/Posts";

export default function Home() {
  return (
    <div className="mx-auto w-fit p-12 mt-6 shadow-md rounded-xl border grid place-content-center">
      <h1>Home</h1>
      <Posts />
    </div>
  )
}
