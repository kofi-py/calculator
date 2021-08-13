const $input = document.querySelector("input");

document.querySelectorAll(".key-num").forEach(
    el => {
      el.onclick = () => $input.value = $input.value !== "0" ? $input.value + el.innerText : el.innerText;
    }
);

const buffer = []

const opCallback = opName => () => {
    let currentVal = parseFloat($input.value);
    if (opName === "percent") {
      currentVal *= 0.01;
      $input.value = currentVal;
    }
    else {
      if (buffer && buffer.length) {
        buffer.push({ value: currentVal });

        const result = evaluate(buffer);

        buffer.push({ value: result });
        buffer.push({ value: opName });

        $input.value = "";
      }
      else {
        buffer.push({ value: currentVal });
        buffer.push({ value: opName });
        $input.value = "";
      }
    }
}

const evaluate = buffer => {
    const secondOperand = buffer.pop().value;
    const operator = buffer.pop().value;
    const firstOperand = buffer.pop().value;

    switch (operator) {
        case "add":
          return firstOperand + secondOperand;
          break;
        case "subtract":
          return firstOperand - secondOperand;
          break;
        case "multiply":
          return firstOperand * secondOperand;
          break;
        case "divide":
          return firstOperand / secondOperand;
          break;
        default:
          return secondOperand;
      }
}

for (const opName of [ "add", "subtract", "multiply", "divide", "percent" ]) {
    document.querySelector(`.key-op[op=${opName}]`).onclick =
      opCallback(opName);
}
  
  document.querySelector(".key-eq").onclick =
    () => {
      if (buffer && buffer.length) {
        buffer.push({ value: parseFloat($input.value) });
        $input.value = evaluate(buffer);
      }
    }
  
  document.querySelector(".key-op[op=clear]").onclick =
    () => {
      $input.value = 0;
      buffer.length = 0;
    }
  
  document.querySelector(".key-op[op=negate]").onclick =
    () => $input.value = -parseFloat($input.value);
