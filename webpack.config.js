import defaults from "@wordpress/scripts/config/webpack.config.js";

export default {
  ...defaults,
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};
