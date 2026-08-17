function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex-1 flex items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold text-slate-500">{title} — Coming soon</h1>
    </div>
  )
}

export default ComingSoon
