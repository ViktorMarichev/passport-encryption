 document.addEventListener('DOMContentLoaded', function(){ 
$(function() {
  //задание заполнителя с помощью параметра placeholder
  $("#code").mask("999-999", {placeholder: "   -   " });
$("#number_pass").mask("999999",{placeholder:"      "});
$("#series").mask("99 99",{placeholder:"    "});
});
 });