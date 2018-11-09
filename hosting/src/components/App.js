import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../redux/actions'
import AsyncComponent from './AsyncComponent'
import Bio from './about/BioBlurb'
import Theme from './Theme'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

//
//const Bio = () => <AsyncComponent moduleProvider={() => import(
//	/* webpackChunkName: "bio" */
//  	/* webpackMode: "lazy" */
//  	'./about/about')} />


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
        color: 'white'
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
					background: "linear-gradient(0deg, #000000, #000000 70%, #000000)"
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
									<Bio/>
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
