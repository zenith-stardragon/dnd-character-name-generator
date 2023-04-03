import Head from 'next/head';
import NameGenerator from '../components/NameGenerator';

export default function Home() {
  return (
    <div>
      <Head>
        <title>D&D Name Generator</title>
        <meta
          name="description"
          content="A simple D&D character name generator using Next.js, Material-UI, and Google Sheets."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NameGenerator />
    </div>
  );
}