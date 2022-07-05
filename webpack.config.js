const pathModule = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
//npx webpack uahk hulg bulid 
module.exports = {
  // مود بنحدد فيها احنا فى مرحلة البرودكشن ولا الديفلوب
  mode: "production",
  // انترى نقطة البداية للبروجكت
  entry: "./javascript/app.js",
  // عاوز لما اهمل برودكشن يكون اسم الملف ايه ويتحفظ فين
  output: {
    filename: "bundle.js",
    // dirname بتوصل لمكان الملف
    // pathModule ميثود فى نود بتساعدنا نوصل باث بتاع الملف  فى بوردكشن واسم الفولدر
    path: pathModule.resolve(__dirname, "build"),
    assetModuleFilename: "images/[name][ext]",
  },
  module: {
    rules: [
      // بنعملهم install dev depandency

      //css files
      // louder css  بتضيف style فى ملف سثقرث
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      //images
      // install louder for asset
      {
        // regexp for all image exation
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  // بيحصل فيه injection
  // بنحدد المكان اللى هيعمل فيه serve للملفات فيه
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new MiniCssExtractPlugin(),
    new CssMinimizerPlugin(),
  ],
  optimization: {
    minimizer: [
      //terser
      "...",
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["mozjpeg", { quality: 60 }],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                "svgo",
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      // customize plugin options
                      convertShapeToPath: {
                        convertArcs: true,
                      },
                      // disable plugins
                      convertPathData: false,
                    },
                  },
                },
              ],
            ],
          },
        },
      }),
    ],
  },
};
