import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import {MantineProvider} from '@mantine/core'
import {QueryClient, QueryClientProvider} from "react-query";
import IdentityContextProvider from "./context/IdentityContext.tsx";
import MessagesContextProvider from "./context/MessagesContext.tsx";
import {Notifications} from "@mantine/notifications";

const queryClient = new QueryClient()


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <MantineProvider>
                <Notifications position={'top-center'} />
                <IdentityContextProvider>
                    <MessagesContextProvider>
                        <App/>
                    </MessagesContextProvider>
                </IdentityContextProvider>
            </MantineProvider>
        </QueryClientProvider>
    </StrictMode>,
)
