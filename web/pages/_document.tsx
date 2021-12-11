import { Head, Html, Main, NextScript } from "next/document";

import { AppConfig } from '@/web/appConfig';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content={AppConfig.applicationName} />
        <meta property="og:site_name" content={AppConfig.applicationName} />
        <meta property="twitter:title" content={AppConfig.applicationName} />

        {/* I always use this to generate favicons https://realfavicongenerator.net/ */}
        <link rel="apple-touch-icon" sizes="180x180" href={`/images/${AppConfig.shortName}/apple-touch-icon.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`/images/${AppConfig.shortName}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`/images/${AppConfig.shortName}/favicon-16x16.png`} />
        <link rel="manifest" href={`/images/${AppConfig.shortName}/site.webmanifest`} />
        <link rel="mask-icon" href={`/images/${AppConfig.shortName}/safari-pinned-tab.svg" color="#00abca`} />
        <link rel="shortcut icon" href={`/images/${AppConfig.shortName}/favicon.ico`} />
        <meta name="msapplication-TileColor" content={AppConfig.brandColor} />
        <meta name="msapplication-config" content="/images/appname/browserconfig.xml" />
        <meta name="theme-color" content={AppConfig.brandColor}></meta>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
