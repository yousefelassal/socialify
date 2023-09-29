import Posts from "@/components/Posts";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <div className="p-12 mt-16 grid grid-cols-12">
      <div className="col-span-3">
        <Nav />
      </div>
      <div className="col-span-6">
        <Posts />
      </div>
      <div className="col-span-3">
        [Suggestions]
      </div>
    </div>
  )
}
