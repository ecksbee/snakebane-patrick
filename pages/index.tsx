import React from 'react'
import Router from 'next/router'
import Footer from '../components/Footer'
import logo from '../public/logo.png'
import styles from '../styles/Home.module.css'

const currentYear = (new Date()).getFullYear()
const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step))
const myXBRLYears = range(2016, currentYear, 1)
const debounce = (func : Function, timeout = 2000) => {
  let timer : NodeJS.Timeout
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  }
}
export default function Home() {
  const [year, setYear] = React.useState(`${currentYear}`)
  const [formType, setFormtype] = React.useState('8-k')
  const [search, setSearch] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [results, setResults] = React.useState([])
  React.useEffect(() => {
    const lambda = () => {
      const formdata = new FormData()
      formdata.append('form-type', formType)
      formdata.append('year', year)
      formdata.append('company-name', search)
      fetch('/company-search',{
        method: 'POST',
        body: formdata
      }).then(res => res.json())
      .then(data => setResults(data?.Results || []))
      .finally(() => {
        setIsLoading(false)
      })
    }
    if (!search) {
      setResults([])
      return
    }
    setIsLoading(true)
    debounce(() => lambda())()
  }, [formType, search, year])
  const refform = React.createRef<HTMLFormElement>()
  return <>
    <div>
      <h1 className={styles.Brand}>
                  <img src={logo.src} style={{verticalAlign: 'bottom'}} alt="man postage stamp" height={47.5} width={34} />
                  EDGARBrowser
      </h1>
      <form className={styles.SearchForm} ref={refform} onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
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
