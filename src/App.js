import React, { Fragment, useState } from 'react'
import { useHistory, Switch, Route, Redirect } from 'react-router-dom'

import HomePage from './pages/HomePage'
import FormPage from './pages/FormPage'
import BanksPage from './pages/BanksPage'
import BankPage from './pages/BankPage'
import { Navigation } from './components/Navigation'
import { ConnectProvider } from './context/connect-context'
import { BankHashProvider } from './context/bankHash-context'
import { BankDatasProvider } from './context/bankDatas-context'
import { BankNameProvider } from './context/bankName-context'
import { LoadingProvider } from './context/loading-context'
import { GlobalStyles } from './styles/global-styles'


const App = () => {
  // global initialisation
  let history = useHistory()
  const [nameBank, setNameBank] = useState('')

  return (
    <Fragment>
      <GlobalStyles />
      <ConnectProvider>
        <BankHashProvider>
          <BankDatasProvider>
            <BankNameProvider>
              <LoadingProvider>
              <header>
                <Navigation />
              </header>
              <Switch>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route
                  path="/home"
                  component={HomePage}
                  history={history}
                  nameBank={nameBank}
                  setNameBank={name => setNameBank(name)}
                />
                <Route
                  path="/form"
                  component={FormPage}
                  history={history}
                />
                <Route
                  path="/banks"
                  component={BanksPage}
                  history={history}
                />
                <Route
                  path="/bank/:slug"
                  component={BankPage}
                  history={history}
                />
              </Switch>
              </LoadingProvider>
            </BankNameProvider>
          </BankDatasProvider>
        </BankHashProvider>
      </ConnectProvider>
    </Fragment>
  )
}

export default App
