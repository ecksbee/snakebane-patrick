import React from 'react'
import Router from 'next/router'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import path from 'path'
import fs from 'fs'
import Footer from '../components/Footer'
import logo from '../public/logo.png'
import styles from '../styles/Home.module.css'

type Props = {
  monetagBesttag: string
}
const currentYear = (new Date()).getFullYear()
const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step))
const myXBRLYears = range(2016, currentYear, 1)
const Home: NextPage<Props> = ({monetagBesttag} : Props) => {
  const [year, setYear] = React.useState(`${currentYear}`)
  const [formType, setFormtype] = React.useState('8-k')
  const [search, setSearch] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [results, setResults] = React.useState([])
  const submitSearch = () => {
    if (!search || isLoading) {
      return
    }
    const formdata = new FormData()
    formdata.append('form-type', formType)
    formdata.append('year', year)
    formdata.append('company-name', search)
    setIsLoading(true)
    fetch('/company-search',{
      method: 'POST',
      body: formdata
    }).then(res => res.json())
    .then(data => setResults(data?.Results || []))
    .finally(() => {
      setIsLoading(false)
    })
  }
  React.useEffect(() => {
    if (isLoading) {
      return
    }
    setResults([])
  }, [search])
  React.useEffect(() => {
    if (isLoading) {
      return
    }
    if (search) {
      submitSearch()
      return
    }
    setResults([])
  }, [formType, year])
  return <>
    <Head>
      <script data-cfasync="false"  type="text/javascript" dangerouslySetInnerHTML={{__html: monetagBesttag}}/>
    </Head>
    <div>
      <h1 className={styles.Brand}>
                  <img src={logo.src} style={{verticalAlign: 'bottom'}} alt="man postage stamp" height={47.5} width={34} />
                  EDGARBrowser
      </h1>
      <form className={styles.SearchForm} onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        submitSearch()
      }}>
        <label htmlFor="form-type">Type:</label>
        <select name="form-type" id="form-type" onChange={e => setFormtype(e.currentTarget.value)}>
          <option value="8-k">8K</option>
          <option value="10-k">10-K</option>
          <option value="10-q">10-Q</option>
          {/* <option value="485bpos">485BPOS</option> */}
        </select>
        <label htmlFor="year">Year:</label>
        <select name="year" id="year" defaultValue={currentYear} onChange={e => setYear(e.currentTarget.value)}>
          {
            myXBRLYears.map(
              i => <option key={i} value={i}>{i}</option>
            )
          }
        </select>
        <label htmlFor="company-name">Name:</label>
        <input type="text" id="company-name" name="company-name" onChange={e => setSearch(e.currentTarget.value)}/>
      </form>
      <>
        { isLoading && <div>loading...</div> }
        { !isLoading && !results?.length && <div><p>No results.  Submit search parameters to run a search for XBRL filings in EDGAR.</p></div> }
        {
          !isLoading && results?.length > 0 && <>
            <div>
              <h2>Results for {search}</h2>
                <ul className={styles.ResultList}>
                  {
                    results.map((i : any, n : number) => <li key={n} onClick={_ => 
                      Router.push(`review?path=${i.PercentEncodedEdgarUrl}`)}>
                      <h3>{i.Title}</h3>
                      <p dangerouslySetInnerHTML={{__html:i.Summary}}/>
                    </li>)
                  }
                </ul>
            </div>
          </>
        }
      </>
    </div>
    <Footer short={false} />
  </>
}

export const getStaticProps: GetStaticProps = async (context) => {
  const filePath1 = path.join(process.cwd(), 'monetag-besttag.txt')
  const monetagBesttag = fs.readFileSync(filePath1, 'utf8')
  return {
    props: {
      monetagBesttag
    }
  }
}
export default Home