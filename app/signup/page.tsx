import SignUpForm from "@/components/SignUpForm";

export default function page() {
  
  return (
    <div className="mx-auto w-fit p-12 mt-6 shadow-md rounded-xl border grid place-content-center">
      <h1>Sign Up</h1>
      <SignUpForm />
    </div>
  )
}
