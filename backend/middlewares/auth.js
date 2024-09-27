//Importamos jsonwebtoken para poder generar y verificar tokens
const jwt = require("jsonwebtoken");

//Creamos una constante verifyToken que recibe tres parámetros: req (objeto de solicitud), res (objeto de respuesta) y next (función que permite pasar la solicitud al siguiente middleware en la pila de middleware).
const verifyToken = (req, res, next) => {
  //Extraemos el token del encabezado de la solicitud (auth-token).
  const token = req.header("auth-token");
  //Si no tenemos token entonces error 401 y mensaje Access Denied
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  //Verificamos el token con un try catch
  try {
    const verified = jwt.verify(token, process.env.TOKEN);
    req.user = verified;
    next();
  } catch (error) {
    try {
      //Creamos la contante verified para verificar el token utilizando
      const verified = jwt.verify(token, process.env.REFRESH_TOKEN);
      
      //Hacemos que req.user tenga el token verificado
      req.user = verified;

      //Damos paso al siguiente middleware de la cadena
      next();
    } catch (error) {
      console.log(error);
      //Si algo falla enviamos error 400
      res.status(400).send("Expired token");
    }
  }
};

module.exports = { verifyToken };