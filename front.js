
function genera(){
    var element = document.getElementById("barcode");
    var cod = document.getElementById("codice");
    var type = document.getElementById("type").value;
    if(type == "EAN13" && cod.value.lengt== 12){
      checkDigit = checkDigitEAN13(cod);
      console.log(checkDigit);
      cod.value = cod.value + checkDigitEAN13(cod);
    }
    console.log(type);
    JsBarcode(element, cod.value, {format: type    } );
}
function inputControl(){ // controllo del input in base al tipo di codice che si va a generare
  var cod = document.getElementById("codice");
  var type = document.getElementById("type").value;
  if(type != "CODE128" ){
    cod.value = cod.value.replace(/[^0-9]/g, '');
  }
  if(type == "EAN13"){
    cod.value = "1234567890128";
    cod.minLength = "0";
    cod.maxLength ="12";
    cod.minLength = "12";
    genera();
  }
  if ( type == "EAN8"){
    cod.value = "12345670";
    cod.minLength = "0";
    cod.maxLength="7";
    cod.minLength = "7";
    genera();
  }
  if(type == "CODE128"){
    cod.value = "EXAMPLE";
    cod.minLength = "0";
    cod.maxLength ="128";
    cod.minLength = "0";
    genera();
  } 
}


function inputFilter(inputElement) {
  if(document.getElementById("type").value!="CODE128"){
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
  }else{
    inputElement.value = inputElement.value.replace(/[^\x00-\x7F]/g, "");
  }

}


function checkDigitEAN13(barcode) {
  const sum = barcode.split('')
    .map((n, i) => n * (i % 2 ? 3 : 1)) // alternate between multiplying with 3 and 1
    .reduce((sum, n) => sum + n, 0) // sum all values

  const roundedUp = Math.ceil(sum / 10) * 10; // round sum to nearest 10
  const checkDigit = roundedUp - sum; // subtract round to sum = check digit
  return checkDigit;
}