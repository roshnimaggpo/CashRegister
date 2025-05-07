const content = document.querySelector("#content");
const billAmt = document.querySelector("#bill__amt");

let isBillEntered = false;

const cashGivenDiv = document.createElement("div");
cashGivenDiv.classList.add("cash-given");
cashGivenDiv.innerHTML = `
<h2 class="cash-given__heading">Cash Given</h2>
<input class="cash-given__amt" id="cash-given__amt" type="number"/>
`;

const checkBtn = document.createElement("button");
checkBtn.classList.add("check-btn");
checkBtn.innerText = "Check";

const returnChangeDiv = document.createElement("div");
returnChangeDiv.classList.add("return-change");
returnChangeDiv.innerHTML = `
    <h2 class="return-change__heading">Return Change</h2>
    <table>
        <tbody>
            <tr>
                <th>Frequency</th>
                <td class="freq-2000" id="freq-2000"></td>
                <td class="freq-500" id="freq-500"></td>
                <td class="freq-100" id="freq-100"></td>
                <td class="freq-20" id="freq-20"></td>
                <td class="freq-10" id="freq-10"></td>
                <td class="freq-5" id="freq-5"></td>
                <td class="freq-1" id="freq-1"></td>
            </tr>
            <tr>
            <th>Note</th>
                <td class="note-2000">2000</td>
                <td class="note-500">500</td>
                <td class="note-100">100</td>
                <td class="note-20">20</td>
                <td class="note-10">10</td>
                <td class="note-5">5</td>
                <td class="note-1">1</td>
            </tr>
        </tbody>
    </table>
    `;
const invalidInputMsg = document.createElement("h3");
invalidInputMsg.classList.add("invalid-msg");

const notes = [2000, 500, 100, 20, 10, 5, 1];

billAmt.addEventListener("input", event => {
  if (event.target.value > 0 && !isBillEntered) {
    content.appendChild(cashGivenDiv);
    content.appendChild(checkBtn);
    isBillEntered = true;
  }
  if (event.target.value === "" || parseInt(event.target.value) <= 0) {
    cashGivenDiv.remove();
    checkBtn.remove();
    returnChangeDiv.remove();
    invalidInputMsg.remove();
    isBillEntered = false;
  }
});

checkBtn.addEventListener("click", event => {
  const billVal = parseInt(document.querySelector("#bill__amt").value);
  const cashGivenVal = parseInt(
    document.querySelector("#cash-given__amt").value
  );

  while (document.querySelectorAll(".invalid-msg").length !== 0)
    invalidInputMsg.remove();

  while (document.querySelectorAll(".return-change").length !== 0)
    returnChangeDiv.remove();

  if (cashGivenVal < billVal) {
    invalidInputMsg.innerText =
      "Cash given is less than bill. Please verify both the values.";
    content.appendChild(invalidInputMsg);
  } else if (cashGivenVal === billVal) {
    invalidInputMsg.innerText = "Nothing required to return";
    content.appendChild(invalidInputMsg);
  } else if (cashGivenVal > billVal) {
    content.appendChild(returnChangeDiv);

    for (let noteIndex = 0; noteIndex < notes.length; noteIndex++) {
      const note = notes[noteIndex];
      document.querySelector("#freq-" + note).innerText = "";
    }

    let changeToBeReturned = cashGivenVal - billVal;

    console.log("Total Change: " + changeToBeReturned);
    for (let noteIndex = 0; noteIndex < notes.length; noteIndex++) {
      if (changeToBeReturned === 0) break;

      const note = notes[noteIndex];
      const changeLeft = changeToBeReturned % note;

      // check if note's value is greater than the change
      if (changeLeft === changeToBeReturned) continue;

      const wholeDividend = changeToBeReturned - changeLeft;
      const freq = wholeDividend / note;
      console.log("Note: " + note);
      console.log("Freq: " + freq);
      changeToBeReturned = changeLeft;
      console.log("Change Left: " + changeLeft);
      document.querySelector("#freq-" + note).innerText = freq;
    }
  }
});
