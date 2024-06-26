// TODO improve SEO

import { Suspense } from 'react';
import type { Metadata } from 'next';
import AuthContextProvider from '@/firebase/auth/state';
import RecoilProvider from '@/state/provider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { theme } from '@/styles/theme';

import Wrapper from '@/components/common/wrapper';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import Loading from '@/components/common/loading';
import favicon from '@/assets/favicon/favicon.ico';

export const metadata: Metadata = {
    title: '리플렛',
    description: '책을 좋아하는 사람들을 위한 소셜 플랫폼',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AppRouterCacheProvider>
            <CssVarsProvider theme={theme}>
                <CssBaseline />
                <html lang="en">
                    <head>
                        <link
                            rel="icon"
                            href={favicon.src}
                            type="image/x-icon"
                        />
                    </head>
                    <body>
                        <RecoilProvider>
                            <AuthContextProvider>
                                <Suspense fallback={<Loading />}>
                                    <Header />
                                    <Wrapper>{children}</Wrapper>
                                </Suspense>
                                <Footer />
                            </AuthContextProvider>
                        </RecoilProvider>
                    </body>
                </html>
            </CssVarsProvider>
        </AppRouterCacheProvider>
    );
}
