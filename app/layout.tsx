import type { Metadata } from 'next';
import '@fontsource/baloo-2/400.css';
import '@fontsource/baloo-2/500.css';
import '@fontsource/baloo-2/600.css';
import '@fontsource/baloo-2/700.css';
import './globals.css';
export const metadata: Metadata={title:'ORA | Portal do cliente',description:'Acompanhe seus negócios e todas as etapas da sua conquista.'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pt-BR"><body>{children}</body></html>;}
