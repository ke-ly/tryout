import React, { FC, useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { nums, bigThanFive } from './testjs.js'
import Home from '@/pages/index'
import User from '@/pages/user'
import NotFound from '@/pages/404'

// const AsyncImport:FC<{ path:string }> = ({ path })r => {
// 	const H1 = lazy(() => import('@/pages/index'))
// 	return <>
// 		<H1 />
// 	</>
// }

const H1 = lazy(() => import(/* webpackChunkName:"chunksb" */ './pages/index'))
const U1 = lazy(() => import('@/pages/user'))
const Pw = lazy(() => import('@/pages/user/password'))
const Music = lazy(() => import('@/pages/index/music'))
const Socket = lazy(() => import('@/pages/socket'))

export default function App() {
	useEffect(() => {
		const dynamic = () => {
			import(/* webpackChunkName : 'sbbb'*/ './pages/desc').then(
				({ default: desc }) => {
					// console.info(desc)
				}
			)
		}
		dynamic()
	}, [])

	return (
		<Suspense
			fallback={
				<div>
					<h1>loading...</h1>
				</div>
			}
		>
			<BrowserRouter>
				<div>
					<Link to="/home">home</Link> /<Link to="/user">user</Link> /
					<Link to="/ps">ps</Link> /<Link to="/ps1">ps1</Link> /
					<Link to="/music">music</Link> /
					<Link to="/socket">Socket</Link> /
				</div>
				<Switch>
					<Route path={['/', '/home']} exact>
						<H1 />
					</Route>
					<Route path="/user" exact>
						<U1 />
					</Route>
					<Route path="/pw" exact component={Pw} />
					<Route path="/404" component={NotFound} exact />
					<Route path="/music" component={Music} exact />
					<Route path="/socket" component={Socket} exact />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		</Suspense>
	)
}
