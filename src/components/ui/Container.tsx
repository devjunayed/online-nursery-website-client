import { ReactNode } from "react"

const Container = ({children}: {children: ReactNode}) => {
  return (
    <div className="max-w-[90vw] mx-auto">
        {children}
    </div>
  )
}

export default Container
