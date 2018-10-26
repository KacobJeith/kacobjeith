import ReactGA from 'react-ga'

export const initialize = () => {
	ReactGA.initialize('UA-128207884-1');
}

export const logPageView = () => {
	ReactGA.set({ page: window.location.pathname });
	ReactGA.pageview(window.location.pathname);
}