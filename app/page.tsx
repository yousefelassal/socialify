import Posts from "@/components/Posts";

export default function Home() {
  return (
    <div className="p-12 mt-20 grid grid-cols-7">
      <div className="col-span-2">
        [NAV]
      </div>
      <div className="col-span-3">
        <Posts />
      </div>
      <div className="col-span-2">
        [Suggestions]
      </div>
    </div>
  )
}
