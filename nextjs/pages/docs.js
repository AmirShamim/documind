import Layout from '../components/Layout'
import ProjectDocs from '../components/ProjectDocs'
import StylingGuide from '../components/StylingGuide'
import TableOfContents from '../components/TableOfContents'

export default function Docs() {

  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-8">Docs</h1>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main content */}
            <div className="lg:col-span-3 space-y-8">
              <ProjectDocs />
              <StylingGuide />
            </div>

            {/* Table of contents sidebar */}
            <div className="lg:col-span-1">
              <TableOfContents />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}