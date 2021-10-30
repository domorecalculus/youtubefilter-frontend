module.exports = {
  devServer: {
      proxy: {
          "/api": {
            target: "http://web:8000",
            changeOrigin: true,
          },
          "/auth": {
            target: "http://web:8000",
            changeOrigin: true,
          },
          "/admin": {
            target: "http://web:8000",
            changeOrigin: true,
          }
        }
  },
}
