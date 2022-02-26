const path = require("path"); // добавляем блиблиотеку из пространства node (пути)

module.exports = {
  entry: {
    // точка входа
    main: "./src/main.js",
    goods: "./src/goods.js",
  },
  output: {
    // точка выхода
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "eval-source-map", // определенное отображение ошибок
};
