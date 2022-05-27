import Head from 'next/head'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Results from '../components/Results'
import requests from '../utils/requests'

export default function Home({results}) {
  return (
    <div className="">
      <Head>
        <title>Hulu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />
      {/* NavBar */}
      <Nav />
      {/* Main */}
      <Results results={results} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;
  const url = await requests[genre]?.url || requests.fetchTrending.url
  
  const request = await fetch(
    `https://api.themoviedb.org/3${url}`
  ).then(res => res.json())
  .catch(err => console.log(err));

  return {
    props: {
      results: request.results
    }
  }
}