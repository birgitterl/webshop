const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;
module.exports = {
  output: {
    publicPath: 'http://localhost:3001/'
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
  },

  devServer: {
    port: 3001,
    historyApiFallback: true
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'account',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './LandingPage': './src/components/LandingPage.jsx',
        './Login': './src/components/Login.jsx',
        './Register': './src/components/Register.jsx'
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom']
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: deps['react-router-dom']
        },
        'react-bootstrap': {
          singleton: true,
          requiredVersion: deps['react-bootstrap']
        }
      }
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html'
    })
  ]
};
