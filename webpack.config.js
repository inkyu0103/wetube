const path = require("path");
const MODE = process.env.WEBPACK_ENV;

const ENTRY_FILE = path.resolve(__dirname,"assets","js","main.js");
const OUTPUT_DIR = path.join(__dirname,"static");


console.log(ENTRY_FILE);
console.log(OUTPUT_DIR);

const ExtractCSS = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");


// join은 인자로 받은 경로들을 하나로 합쳐주는 역할
// resolve도 마찬가지이다. 그러나 맨 오른쪽부터 합쳐나간다.

const config ={
    entry:["@babel/polyfill",ENTRY_FILE],
    mode:MODE,
    module:{
        rules:[
            {
                test: /\.(js)$/,
                use: [
                    {
                        loader:"babel-loader"
                    }
                ]
            },
            {
                test : /\.(scss)$/,
                use : ExtractCSS.extract([
                    {
                        loader :"css-loader"
                    },
                    {
                        loader:"postcss-loader",
                        options:{
                            plugins(){
                                return [autoprefixer({browswers : "cover 99.5%"})]
                            }
                        }
                    },
                    {
                        loader :"sass-loader"
                    }
                ])
            }
        ]
    }
    ,
    output : {
        path : OUTPUT_DIR,
        filename : "[name].js"
    },
    plugins:[
        new ExtractCSS("styles.css")
    ]
};

module.exports = config;