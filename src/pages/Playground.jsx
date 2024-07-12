import SideBar from "@components/playground/SideBar";
import Editor from "@components/playground/Editor";
import '@styles/layouts/playground.css'

export default function Playground() {
  return (
    <main className="Root-main">
      <SideBar />
      <Editor />
    </main>
  )
}
