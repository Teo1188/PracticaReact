import React, { useState } from "react";

const Calculadora = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operacion, setOperacion] = useState("sumar");
  const [resultado, setResultado] = useState("");

  const calcular = () => {
    const numero1 = parseFloat(num1);
    const numero2 = parseFloat(num2);

    let resultadoCalculado;
    switch (operacion) {
      case "sumar":
        resultadoCalculado = numero1 + numero2;
        break;
      case "restar":
        resultadoCalculado = numero1 - numero2;
        break;
      case "multiplicar":
        resultadoCalculado = numero1 * numero2;
        break;
      case "dividir":
        resultadoCalculado = numero2 !== 0 ? numero1 / numero2 : "Error: División por cero";
        break;
      default:
        resultadoCalculado = "Operación no válida";
    }

    setResultado(resultadoCalculado);
  };

  const limpiarCampos = () => {
    setNum1("");
    setNum2("");
    setResultado("");
  };

  return (
    <div className="calculadora">
      <h1>Calculadora</h1>
      <input
        type="number"
        placeholder="Número 1"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />
      <input
        type="number"
        placeholder="Número 2"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />
      <select value={operacion} onChange={(e) => setOperacion(e.target.value)}>
        <option value="sumar">Sumar</option>
        <option value="restar">Restar</option>
        <option value="multiplicar">Multiplicar</option>
        <option value="dividir">Dividir</option>
      </select>
      <button className="buttonCalc" onClick={calcular}>
        Calcular
      </button>
      <button type="button" onClick={limpiarCampos}>
        Limpiar
      </button>
      <h2>Resultado: <span>{resultado}</span></h2>
    </div>
  );
};

export default Calculadora;