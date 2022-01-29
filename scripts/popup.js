// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyA88zDb-zeQA16p-PqAGbglnArIBbdHfTw",
    authDomain: "psihopassport.firebaseapp.com",
    databaseURL: "https://psihopassport-default-rtdb.firebaseio.com",
    projectId: "psihopassport",
    storageBucket: "psihopassport.appspot.com",
    messagingSenderId: "994533382565",
    appId: "1:994533382565:web:2d3f0e786011890601b04c",
    measurementId: "G-4Z2978J7F1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

$("#gender").prop('selectedIndex', -1)
var checkBox = document.querySelector('#checkbox1');
var button = document.querySelector('#send');
checkBox.addEventListener('change', () => {
  button.disabled = !button.disabled;
});
const popupLink=document.querySelector('#send');
const body=document.querySelector('body');
const lockPadding=document.querySelectorAll('.lock-padding');
var unlock=true;
var keyQR;
const timeout=800;

		popupLink.addEventListener("click",function(e){
var lastName=document.getElementById('last_name').value;
var name=document.getElementById('name').value;
var middleName=document.getElementById('middle_name').value;
var birthDay=document.getElementById('birth_day').value;
var gender=document.getElementById('gender').value;
var email=document.getElementById('email').value;
var series=document.getElementById('series').value;
var numberPass=document.getElementById('number_pass').value;
var code=document.getElementById('code').value;
var date=document.getElementById('date').value;
var who_gave=document.getElementById('who_gave').value;
if(lastName!="" && name!="" && middleName!="" && birthDay!="" && gender!="" && email!="" && series!="" && numberPass!="" && code!="" && date!="" && who_gave!="")
{
	if(ValidMail())
	{
		var id=email.replace("$","+").toLowerCase();
			id=id.replace("#","-");
id=id.replace('.','=');
firebase.database().ref("users/"+id).once("value", snapshot => {
   if (snapshot.exists()){
let postRef = firebase.database().ref('/qrs/');
var newkey= postRef.push({ 
name:name,
lastName:lastName,
middleName:middleName,
birthDay:birthDay,
gender:gender,
for:email,
series:series,
numberPass:numberPass,
department_code:code,
date_of_issue:date,
who_gave:who_gave
 }, (error) =>{
	 if(error)
	 {
		 
	 }
else
{
	  keyQR=newkey;
	  $('#popup_one_text').text("Данные успешно отправлены получателю на аккаунт "+email);
	  
	  var  baseURL = 'https://api.qrserver.com/v1/create-qr-code/?data=';
			var config = '&size=120x120';
			$('.img_qr').attr('src', baseURL + encodeURIComponent(htmlEncode(keyQR)) + config);
			var lastName=document.getElementById('last_name').value;

document.getElementById('last_name').value="";
document.getElementById('name').value="";
document.getElementById('middle_name').value="";
document.getElementById('birth_day').value="";
$("#gender").prop('selectedIndex', -1)
document.getElementById('email').value="";
document.getElementById('series').value="";
document.getElementById('number_pass').value="";
document.getElementById('code').value="";
document.getElementById('date').value="";
document.getElementById('who_gave').value="";
			document.querySelector('#checkbox1').checked = false;;
			 button.disabled = !button.disabled;
			 
	const popup=document.getElementById('popup');
popupOpen(popup);

}	
 }).key;

    }
	else
	{
		alert("Пользователь не найден");
	}
});
	}
	else
	{
		alert("Некоректная почта");
	}
}
else
{
	alert("Заполните все данные");
}
//alert("фамилия:"+lastName+";"+"имя:"+name+";"+"отчество:"+middleName+";"+"дата_рождения:"+birthDay+";"+"пол:"+gender+";"+"почта:"+email+";"+"серия:"+series+";"+"номер:"+numberPass+";"+"код_подразделения:"+code+";"+"дата_выдачи:"+date+";"+"кем_выдан"+who_gave+";");

			
		});
		const popup_qr_link=document.querySelector('#look');
		popup_qr_link.addEventListener("click",function(e){
			
		const popup=document.getElementById('popup_qr');
popupOpen(popup);

		});

const popupCloseIcon=document.querySelectorAll('.close-popup');
if(popupCloseIcon.length>0)
{
	for(var index=0; index<popupCloseIcon.length;index++)
	{
		const el=popupCloseIcon[index];
		el.addEventListener('click',function(e){
			popupClose(el.closest('.popup'));
			e.preventDefault();
			
		});
		
	}
}
function htmlEncode(value) {
  return $('<div/>').text(value).html();
}
function popupOpen(curentPopup)
{
	if(curentPopup && unlock)
	{
		const popupActive = document.querySelector('.popup.open');
		if(popupActive)
		{
			popupClose(popupActive,false);
		}else
		{
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener('click',function(e){
			if(!e.target.closest('.popup_content')){
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}
function popupClose(popupActive,doUnlock=true)
{
	if(unlock)
	{
		popupActive.classList.remove('open');
		if(doUnlock)
		{
			bodyUnlock();
		}
	}
}
function bodyLock()
{
	const lockPaddingValue = window.innerWidth - document.querySelector('.container').offsetWidth + 'px';
	if(lockPadding.length>0)
	{
		for(var index=0;index<lockPadding.length;index++)
	{
		const el=lockPadding[index];
		el.style.paddingRight=lockPaddingValue;
	}
	}
	body.style.paddingRight=lockPaddingValue;
	body.classList.add('lock');
	unlock=false;
	setTimeout(function(){
		unlock=true;
	},timeout);
}
function bodyUnlock()
{
	setTimeout(function(){
		if(lockPadding.length>0)
		{for(var index=0;index<lockPadding.length;index++)
		{
			const el=lockPadding[index];
			el.style.paddingRight='0px';
		}
		}
		body.style.paddingRight='0px';
		body.classList.remove('lock');
	},timeout);
	unlock=false;
	setTimeout(function(){
		unlock=true;
	},timeout);
}
document.addEventListener('keydown',function(e){
	if(e.which==27)
	{
		const popupActive=document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});
  	function ValidMail() {
			var myMail = document.getElementById('email').value;
    var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    var valid = re.test(myMail);
    return valid;
}
(function(){
	//проверяем поддержку
	if(!Element.prototype.closest){
		//реализуем
		Element.prototype.closest=function(css){
			var node=this;
			while(node){
				if(node.matches(css)) return node;
				else node=node.parentElement;
			}
			return null;
		};
	}
})();

(function (){
//проверяем поддержку
if(!Element.prototype.matches){
	//определяем свойство
	Element.prototype.matches=Element.prototype.matchesSelector|| 
	Element.prototype.webkitMatchesSelector ||
	Element.prototype.mozMatchesSelector ||
	Element.prototype.msMatchesSelector;
}	
	
})();