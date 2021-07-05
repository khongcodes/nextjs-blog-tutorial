// You can code API Routes/endpoints at pages/api
// that can be deployed as Serverless Functions (Lambdas)
export default function handler(req, res) {
  // req is an instance of http.IncomingMessage, plus some middlewares
  // res is an instance of http.ServerResponse, plus some helper functions
  res.status(200).json({ text: "Hello" });
}