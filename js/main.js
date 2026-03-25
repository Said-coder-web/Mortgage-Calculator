let buttonClear = document.querySelector(".button__clear"),
  threeInbut = document.querySelectorAll(
    ".content:first-of-type form:first-of-type input",
  ),
  twoInput = document.querySelectorAll(
    ".content:first-of-type form:nth-of-type(2) input",
  ),
  inputDiv = document.querySelectorAll(".inp"),
  conTwo = document.querySelector(".content:nth-of-type(2)"),
  inputRedio = document.querySelectorAll(`[type="radio"]`),
  buttonSend = document.querySelector(".button__send");

//------------------------------------------ //
// Functions //

//- Click Button Clear
function resetInputs() {
  threeInbut.forEach((input) => {
    input.value = "";
  });
}

//- Click Button Send
function sendInfo() {
  let hasError = false;
  threeInbut.forEach((input) => {
    let inputDiv = input.parentElement;
    if (input.value === "") {
      inputDiv.classList.add("error");
      hasError = true;
    } else {
      inputDiv.classList.remove("error");
    }
  });

  if (!hasError) {
    conTwo.innerHTML = "";
    infoResult();
  }
}

//- Information Result
function infoResult() {
  let divTitle = document.createElement("div"),
    titleContent = document.createElement("h2"),
    titleText = document.createTextNode("Your results"),
    pra = document.createElement("p"),
    praText = document.createTextNode(
      "Your results are shown below based on the information you provided.To adjust the results, edit the form and click “calculate repayments” again.",
    );

  let divInfo = document.createElement("div"),
    divRes = document.createElement("div"),
    resTitle = document.createElement("h3"),
    resTitleText = document.createTextNode("Your monthly repayments"),
    spanRes = document.createElement("span"),
    resNumber = document.createTextNode(
      `£${calcRes(
        threeInbut[0].value,
        threeInbut[1].value,
        threeInbut[2].value,
        inputRedio,
      ).toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    ),
    divTotal = document.createElement("div"),
    totalTitle = document.createElement("h3"),
    totalText = document.createTextNode("Total you'll repay over the term"),
    spanTotal = document.createElement("span"),
    totalNumber = document.createTextNode(
      `£${total().toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    );

  conTwo.style.textAlign = "initial";
  conTwo.style.alignContent = "initial";

  conTwo.append(divTitle);
  divTitle.append(titleContent);
  titleContent.append(titleText);
  titleContent.classList.add("content__title");
  divTitle.append(pra);
  pra.append(praText);

  divInfo.className = "content__info";
  divRes.className = "result";
  divTotal.className = "total";

  conTwo.append(divInfo);
  divInfo.append(divRes);
  divRes.append(resTitle);
  resTitle.append(resTitleText);
  divRes.append(spanRes);
  spanRes.append(resNumber);
  divInfo.append(divTotal);
  divTotal.append(totalTitle);
  totalTitle.append(totalText);
  divTotal.append(spanTotal);
  spanTotal.append(totalNumber);
}

//- Result
function calcRes(amount = 0, term = 0, rate = 0, checked) {
  for (let check of checked) {
    if (check.checked && check.id === "rep") {
      let p = +amount,
        n = +term * 12,
        r = +rate / 12 / 100;

      let past = r * Math.pow(1 + r, n);
      let maqam = r === 0 ? p / n : Math.pow(1 + r, n) - 1;

      let result = p * (past / maqam);

      return result;
    } else if (check.checked && check.id === "inter") {
      let r = amount * (rate / 12 / 100);
      return r;
    }
  }

  return 0;
}

//- Total
function total() {
  return (
    calcRes(
      threeInbut[0].value,
      threeInbut[1].value,
      threeInbut[2].value,
      inputRedio,
    ) *
    (threeInbut[1].value * 12)
  );
}

//- Focus Input
function focusInput() {
  threeInbut[0].focus();
}

//- Click Enter
let i = 0;
function clickEnter(e) {
  if (e.key === "Enter") {
    if (i === 2) {
      i = 0;
      threeInbut[0].focus();
      buttonSend.click();
    } else {
      i++;
      threeInbut[i].focus();
    }
  }
  // console.log(e.key);
}

//------------------------------------------ //

// Events //
buttonClear.addEventListener("click", resetInputs);

buttonSend.addEventListener("click", sendInfo);

window.addEventListener("load", focusInput);

document.addEventListener("keydown", clickEnter);
