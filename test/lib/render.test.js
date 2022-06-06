import * as path from "path";
import pkg from "webpack";
const { webpack } = pkg;
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
let file = path.join(__dirname, "../src/test.test.tsx");
const compiler = webpack({
    mode: "production",
    entry: file,
    output: {
        path: path.join(__dirname, ".snowblind/cache/"),
        filename: (Math.random() * 100).toString(36) + "_bundle_.js",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-react",
                                {
                                    pragma: "Snowblind.make",
                                    pragmaFrag: "Snowblind.Fragment",
                                    useSpread: false,
                                },
                            ],
                        ],
                        minified: true,
                        comments: false,
                    },
                },
            },
        ],
    },
});
compiler.run((err, stats) => {
    console.log(stats.toJson(), err);
});
