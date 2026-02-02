import Header from '../components/Header'
import ProjectDocs from '../components/ProjectDocs'
import StylingGuide from '../components/StylingGuide'
import Layout from '../components/Layout'

export default function Docs() {
  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-6xl mx-auto flex flex-col gap-12 md:flex-row px-6">
          <ProjectDocs />
          <StylingGuide />
        </div>
      </div>
    </Layout>
  )
}