import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import globalAntStyles from 'antd/dist/antd.min.css';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <title>NextJS Example</title>
          <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='chrome=1, IE=edge' />
          <meta httpEquiv='Cache-Control' content='no-cache, no-store, must-revalidate' />
          <meta httpEquiv='Pragma' content='no-cache' />
          <meta httpEquiv='Expires' content='0' />
          <meta name='viewport' content='user-scalable=no, initial-scale=1.0, maximum-scale=1.0 minimal-ui' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='black' />
          <meta name='theme-color' content='#ffffff' />
          <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i' rel='stylesheet' />
          <style dangerouslySetInnerHTML={{ __html: globalAntStyles }} />
          {this.props.styleTags}
        </Head>
        <body>
          <div className='root' style={{ height: '100%' }}>
            <Main />
          </div>
          <NextScript />
        </body>
      </html>
    );
  }
}
