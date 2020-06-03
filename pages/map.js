import dynamic from 'next/dynamic'
import Head from 'next/head';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/BoulderMap'),
  { ssr: false }
)

export default function MapView() {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin="" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css"
        />
        <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
          integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
          crossorigin="" />
        <script src="https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css"></script>
      </Head>
      <DynamicComponentWithNoSSR />
    </div>
  )
}