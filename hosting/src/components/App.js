import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../redux/actions'
import AsyncComponent from './AsyncComponent'


const Landing = () => <AsyncComponent moduleProvider={() => import(
	/* webpackChunkName: "landing" */
  	/* webpackMode: "lazy" */
  	'./pages/LandingIIOT')} />



const Technology = () => <AsyncComponent moduleProvider={() => import(
	/* webpackChunkName: "iiot" */
  	/* webpackMode: "lazy" */
  	'./pages/iiot')} />

const diy = () => <AsyncComponent moduleProvider={() => import(
	/* webpackChunkName: "diy" */
  	/* webpackMode: "lazy" */
  	'./pages/diy')} />


import Theme from './Theme'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

const mapStateToProps = (state) => ({
	loginStatus: state.loginStatus,
})

class App extends React.Component {
	constructor(props) {
		super(props);
		this.handleScroll = this.handleScroll.bind(this)
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        this.props.updateScrollPosition(window.scrollY)
    }

  topSpacer() {
    const inputs = {
      style: {
        height: 60,
        width: '100%',
      }
    }

    return (
      <div id="top" {...inputs}/>
    )
  }

	render() {
		

		const inputs = {
			container : {
				style: {
					height: "100vh",
					width: "100%",
					marginTop: 0,
					display: "flex",
					flexDirection: 'column',
					background: "linear-gradient(0deg, #040404d1, #2b1486 70%, #020202)"
				}

			},
			content: {
				style: {
					flex: '1 0 auto',
					maxWidth:'100%'
				}
			}
	    }

	    return(
			<Router >
			    	<MuiThemeProvider theme={Theme}>
							<div {...inputs.container}>
								<div {...inputs.content}>
                  					{this.topSpacer()}
									
								</div>
						    </div>
				    </MuiThemeProvider>
			</Router>);

	}
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
