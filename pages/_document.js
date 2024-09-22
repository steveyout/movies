import * as React from 'react';
// next
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

// emotion
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
// theme
import palette from '@/theme/palette';

// ----------------------------------------------------------------------

function createEmotionCache() {
  return createCache({ key: 'css' });
}

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />

          <meta name="theme-color" content={palette.light.primary.main} />
          <link rel="manifest" href="/manifest.json" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <meta name="description" content="Watch and stream movies for free" />
          <meta name="keywords"
                content="Youplex,earn,games,live stream,instant withdrawals,movies,free movies,youtube,free series,netflix,hulu,onstream" />
          <meta name="author" content="Youplex" />
          <meta name="subject" content="Youplex" />
          <meta name="copyright" content="Youplex" />
          <meta name="language" content="EN" />
          <meta name="robots" content="index,follow" />
          <meta name="abstract" content="" />
          <meta name="topic" content="" />
          <meta name="summary" content="" />
          <meta name="Classification" content="Business" />
          <meta name="author" content="Youplex, support@youplex.live" />
          <meta name="designer" content="Youplex" />
          <meta name="reply-to" content="support@youplex.live" />
          <meta name="owner" content="" />
          <meta name="url" content="http://youplex.live" />
          <meta name="identifier-URL" content="http://youplex.live" />
          <meta name="directory" content="submission" />
          <meta
            name="pagename"
            content="Youplex,earn,games,live stream,instant withdrawals,movies,free movies,youtube,free series,netflix,hulu,onstream"
          />
          <meta name="category" content="Movie Streaming" />
          <meta name="coverage" content="Worldwide" />
          <meta name="distribution" content="Global" />
          <meta name="rating" content="General" />
          <meta name="revisit-after" content="1 day" />
          <meta name="subtitle" content="Youplex.live" />
          <meta name="target" content="all" />
          <meta name="HandheldFriendly" content="True" />
          <meta name="MobileOptimized" content="320" />
          <meta name="DC.title" content="Unstoppable Robot Ninja" />
          <meta name="ResourceLoaderDynamicStyles" content="" />
          <meta name="medium" content="blog" />
          <meta httpEquiv="Expires" content="0" />
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta httpEquiv="Cache-Control" content="no-cache" />
          <meta httpEquiv="imagetoolbar" content="no" />
          <meta httpEquiv="x-dns-prefetch-control" content="off" />

          <meta name="og:title" content="Youplex" />
          <meta name="og:type" content="Company" />
          <meta name="og:url" content="http://youplex.live" />
          <meta name="og:image" content="http://youplex.live" />
          <meta name="og:site_name" content="Youplex" />
          <meta name="og:description" content="Watch and stream movies for free" />

          <meta name="fb:page_id" content="43929265776" />
          <meta name="application-name" content="Youplex" />
          <meta name="og:email" content="support@youplex.live" />
          <meta name="og:phone_number" content="650-123-4567" />
          <meta name="og:fax_number" content="+1-415-123-4567" />

          <meta name="og:latitude" content="37.416343" />
          <meta name="og:longitude" content="-122.153013" />
          <meta name="og:street-address" content="USA,california" />
          <meta name="og:locality" content="USA" />
          <meta name="og:region" content="NA" />
          <meta name="og:postal-code" content="94304" />
          <meta name="og:country-name" content="USA" />
          {/* Google tag (gtag.js)*/}
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-V6DHJJF5SN"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-V6DHJJF5SN');
            `}
          </Script>

          <Script data-cfasync="false" strategy="afterInteractive">
            {`
            atOptions = {
'key' : '2cfeb92ebc6a94cd7f70931f0bd20e6c',
'format' : 'iframe',
'height' : 300,
'width' : 160,
'params' : {}
};
            `}
          </Script>

          <Script data-cfasync="false" strategy="afterInteractive"
                  src="//cheesydrinks.com/2cfeb92ebc6a94cd7f70931f0bd20e6c/invoke.js"></Script>

          {/*
          <Script data-cfasync="false" strategy="afterInteractive" src='//pl23615274.highrevenuenetwork.com/06/41/dd/0641ddefaabf30c9e76bf1d5f78ba3da.js'></Script>
          */}


          <Script data-cfasync="false" strategy="afterInteractive">
            {`
            (function(){var q=window,c="d061ebe4653123b01d4fa04a702b307a",l=[["siteId",649+751-552*137+5210070],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default","PHNjcmlwdCB0eXBlPSd0ZXh0L2phdmFzY3JpcHQnIHNyYz0nLy9wbDIzNjE1Mjc0LmhpZ2hyZXZlbnVlbmV0d29yay5jb20vMDYvNDEvZGQvMDY0MWRkZWZhYWJmMzBjOWU3NmJmMWQ1Zjc4YmEzZGEuanMnPjwvc2NyaXB0Pg=="],["defaultPerDay",0],["topmostLayer","auto"]],h=["d3d3LmJsb2NrYWRzbm90LmNvbS94cEZFL2dvcGVuZmwubWluLmpz","ZG5oZmk1bm4yZHQ2Ny5jbG91ZGZyb250Lm5ldC9Pdk15di9SQ2lBL3h1dGY4Lm1pbi5jc3M="],e=-1,g,o,u=function(){clearTimeout(o);e++;if(h[e]&&!(1752927238000<(new Date).getTime()&&1<e)){g=q.document.createElement("script");g.type="text/javascript";g.async=!0;var r=q.document.getElementsByTagName("script")[0];g.src="https://"+atob(h[e]);g.crossOrigin="anonymous";g.onerror=u;g.onload=function(){clearTimeout(o);q[c.slice(0,16)+c.slice(0,16)]||u()};o=setTimeout(u,5E3);r.parentNode.insertBefore(g,r)}};if(!q[c]){try{Object.freeze(q[c]=l)}catch(e){}u()}})();
            
            `}
          </Script>

          {/*
          <Script src="https://unpkg.com/magic-snowflakes/dist/snowflakes.min.js" strategy="afterInteractive" />
          <Script strategy="lazyOnload">
            {`
        [
            '#FF69B4',
            '#DC143C',
            '#9ACD32',
            '#FF8C00',
            '#7FFFD4',
            '#9370DB',
            '#FFD700'
        ].forEach(function(item) {
            new Snowflakes({
                count: 15,
                maxSize: 60,
                color: item
            });
        });
    `}
          </Script>
          */}
        </Head>

        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}

// ----------------------------------------------------------------------

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        (
          <CacheProvider value={cache}>
            <App {...props} />
          </CacheProvider>
        ),
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
  };
};
