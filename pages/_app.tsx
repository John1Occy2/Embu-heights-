import React from 'react'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/navigation";
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <Component {...pageProps} />
      <Toaster />
    </QueryClientProvider>
  )
}