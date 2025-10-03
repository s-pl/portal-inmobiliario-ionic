const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const gemini_api_key = process.env.GEMINI_API_KEY;

const generateAIDescription = async (title, propertyType, transactionType, bedrooms, city) => {
  // Si no hay API key, devolvemos un texto básico para no tumbar el backend
  if (!gemini_api_key) {
    return `No tienes una api_key de Gemini (Google Generative AI) configurada. Por favor, configura la variable de entorno GEMINI_API_KEY para usar esta funcionalidad.`;
  }

  try {
    const googleAI = new GoogleGenerativeAI(gemini_api_key);
    const model = googleAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `-IMPORTANTE- Eres una IA cuyo objetivo es generar la descripción de una propiedad inmobiliaria. Genera una descripción atractiva y comercial usando ESPAÑOL, Y SIN MARKDOWN NI SALTOS DE LINEA.
    
    Detalles:
    - Título: ${title}
    - Tipo de propiedad: ${propertyType}
    - Tipo de transacción: ${transactionType}
    - Número de habitaciones: ${bedrooms}
    - Ciudad: ${city}
    
    Usa un tono profesional pero cercano.`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.9,
        topP: 1,
        topK: 1,
        maxOutputTokens: 512,
      }
    });

    return result.response.text();
  } catch (error) {
    console.error("Error en AI Service:", error);
    throw new Error("Error al generar la descripción con IA");
  }
};

module.exports = { generateAIDescription };
    