'use client'

import React from 'react'

import { store } from 'lib/store'
import { Provider } from 'react-redux'

interface ReduxProviderProps {
	children: React.ReactNode
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
