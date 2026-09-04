import type { Metadata } from 'next';
import { Geist_Mono, Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google';
import './globals.css';

const notoSans = Noto_Sans_SC({
  variable: '--font-noto-sans-sc',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const notoSerif = Noto_Serif_SC({
  variable: '--font-noto-serif-sc',
  weight: ['400', '600', '700', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Alpha派 x 投研场景用户调研',
  description: 'Alpha派在信息发现、深度研究与持续跟踪场景中的交互式用户调研。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${notoSans.variable} ${notoSerif.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
