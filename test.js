const txt = "123";
const numberExp = ".*\\d+.*";
const letterExp = /[a-z]/i
if (txt.match(numberExp) && txt.match(letterExp)) {
  console.log("has numbers");
}
