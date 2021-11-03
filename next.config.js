module.exports = {
  env: {
    REACT_APP_GOOGLE_DRIVE_API_KEY: process.env.REACT_APP_GOOGLE_DRIVE_API_KEY,
    REACT_APP_GOOGLE_DRIVE_CLIENT_ID: process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID,
    REACT_APP_BACKEND_PREFIX: process.env.REACT_APP_BACKEND_PREFIX,
    REACT_APP_AMPLITUDE: process.env.REACT_APP_AMPLITUDE,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/feed',
        permanent: true,
      },
    ]
  },
}