"use strict";
$(document).ready(function() { 
    generateCaptcha();
    resetSelection();
});
var stateByCountry = {
    USA: ["NY","NJ"],
    Singapore: ["taas","naas"]
}
function showForm(){
    $("#signup").fadeOut(500);
    $(".flexbox").css("display","flex").fadeIn(1000);
    $(".foot").css("position","relative");
}
function makeSubmenu(obj) {
    var value=obj.value;
    var state=obj.id[0]+'stateSelect';
    if(value.length == 0) {
        $("#"+state).html("<option>state</option>");
        //document.getElementById(state).innerHTML = "<option>state</option>";
    }
    else {
        var statesOptions = "";
        for(var stateId in stateByCountry[value]) {
            statesOptions+="<option>"+stateByCountry[value][stateId]+"</option>";
        }
        //document.getElementById(state).innerHTML = statesOptions;
        $("#"+state).html(statesOptions);
    }
}
var op1,op2,operator;
function generateCaptcha(){
    op1=getRandom(10,100);
    op2=getRandom(10,100);
    operator=getRandom(0,4);
    var arr=["+","-","/","*"];
    var expression=op1+arr[operator]+op2;   
        if(((op1%op2)!==0) || (op2>op1))
        {
            generateCaptcha();
        }
        else{
           // document.getElementById("expression").innerHTML=expression;
            $("#expression").text(expression).fadeIn(500);
        }
}
function resetSelection() {
    $("#ccountrySelect").selectedIndex = 0;
    $("#cstateSelect").selectedIndex = 0;
    $("#pcountrySelect").selectedIndex = 0;
    $("#pstateSelect").selectedIndex = 0;
    //document.getElementById("ccountrySelect").selectedIndex = 0;
    //document.getElementById("cstateSelect").selectedIndex = 0;
    //document.getElementById("pcountrySelect").selectedIndex = 0;
    //document.getElementById("pstateSelect").selectedIndex = 0;
}
function addressCopy(){
    var status=$('#addresscopy').prop('checked');
    var pcountry=$("#pcountrySelect").get(0);
    if(status){
    $("#padd").val($("#cadd").val());
    $("#pcity").val($("#ccity").val());
    $("#pzip").val($("#czip").val());
    //document.getElementById("pcountry").value=document.getElementById("ccountry").value;
    //document.myForm.pcountry.value=document.myForm.ccountry.value;
    $("#pcountrySelect").val($("#ccountrySelect").val());
    makeSubmenu(pcountry);
    $("#pstateSelect").val($("#cstateSelect").val());
    }
    else{
        $("#padd").val("");
    $("#pcity").val("");
    $("#pzip").val("");
    $("#pcountrySelect").val("");
    makeSubmenu(pcountry);
    }
}
function refreshCaptcha()
{
$("#captchaerror").css("display","none");
$("#result").val("").css("border","1px solid #ccc");
$('#expression').fadeOut(500,generateCaptcha)
//generateCaptcha();
}
function changeScreen(){
    var size=$("#scrollable").css("height");
    if(size=="450px"){
    $("#scrollable").css("height","auto");
    $("#screenControl").text("Normal");
}
    else{
        $("#scrollable").css("height","450px");
        $("#screenControl").text("Full Screen");
    }
}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
function validateForm(){
var condition = true ;
if(validText('#fname')){
    condition = false;
}
if( ($("#mname").val().length !== 0) && validText('#mname')){
    condition = false;
}
if(validText('#lname')){
    condition = false;
}
if(validMail('#mail')){
    condition = false;
}
if(validPhNo('#phno')){
    condition = false;
}
if(validPass(('#pass'),('#repass'))){
    condition = false;
}
if(validDate('#dob')){
    condition = false;
}   
if(validAdd('#cadd')){
    condition = false;
}
if(validText('#ccity')){
    condition = false;
}
if(validcountry('#ccountrySelect')){
    condition = false;
}
if(validZip('#czip')){
    condition = false;
}
if(validAdd('#padd')){
    condition = false;
}
if(validText('#pcity')){
    condition = false;
}
if(validcountry('#pcountrySelect')){
    condition = false;
}
if(validZip('#pzip')){
    condition = false;
}
if( ($("#interests").val().length !== 0) && validText('#interests')){
    condition = false;
}
if(checkCaptcha('#result'))
{
 condition=false; 
}
if(condition){
 alert("Submission Successful");
 return true;
}
return condition;
}

function checkCaptcha(result){
   // var result=$(id).get(0);
    if($(result).val().length === 0){
        $(result).val("").css("border","1px solid #ff0000");
        $("#captchaerror").css("display","block");
        return true;      
    }
    else{
    var answer="";
    if(operator == 0){
        answer= op1 + op2;
    }
    else if(operator == 1){
        answer= op1 - op2;
    }
    else if(operator == 2){
        answer= op1 / op2;
    }
    else{
        answer= op1 * op2;
    }
    if($(result).val() == answer){
        $("#captchaerror").css("display","none");
        $(result).css("border","1px solid rgb(11, 243, 116)");
        return false;
    }
    else{
        $(result).val("").css("border","1px solid #ff0000");
        $("#captchaerror").css("display","block");
        return true;
    }
    }
}
function validText(text){
    //var text=$(id).get(0);
    var length=$(text).val().length;
    var fieldName=$(text).attr('name');
    if(length > 0){
        var patt = /^\S[a-zA-Z\s]+$/;
        if($(text).val().match(patt))
        {
        $(text).css("border","1px solid rgb(11, 243, 116)");
        return false;
        }
        else
        {
        $(text).css("border","1px solid #ff0000").val("");      
        if(fieldName === "pcity" || fieldName === "ccity"){
            $(text).attr("placeholder","City name shouldn't contain numbers or symbols !!");
        }
        else if(fieldName == "interests"){
            $(text).attr("placeholder","Intetrsts shouldn't contain numbers or symbols !!");
        }
        else{
            $(text).attr("placeholder","Name shouldn't contain numbers or symbols !!");
        }
        return true;
        }
    }
    else{
        $(text).css("border","1px solid #ff0000");     
        if(fieldName === "pcity" || fieldName === "ccity"){
            $(text).attr("placeholder","City cannot be empty !!");
        }  
        else{
            $(text).attr("placeholder","This field cannot be empty !!");
        }    
        return true;
    }
}
function validAdd(address){
   // var add=$(id).get(0);
    var length=$(address).val().length;
    if(length > 0){
        var patt = /^\w[\w\.\/\,\s\(\):-]+$/;
        if($(address).val().match(patt))
        {
        $(address).css("border","1px solid rgb(11, 243, 116)");
        return false;
        }
        else
        {
        $(address).css("border","1px solid #ff0000").val("")
        .attr("placeholder","Address should contain only letters,numbers or (: / . () - ,)");       
        return true;
        }
    }
    else{
        $(address).css("border","1px solid #ff0000").attr("placeholder","Address cannot be empty !!");       
        return true;
    }
}
function validMail(mail){
    //var mail=$(id).get(0);
    var length=$(mail).val().length;
    if(length > 0){
        var patt = /^(\w[\w_.]+)@(\S)+\.([a-zA-Z]+)$/;
        if($(mail).val().match(patt))
        {
        $(mail).css("border","1px solid rgb(11, 243, 116)");
        return false;
        }
        else
        {
        $(mail).css("border","1px solid #ff0000").val("").attr("placeholder","Please Enter A Valid e-mail");
        return true;
        }
    }
    else{
        $(mail).css("border","1px solid #ff0000").attr("placeholder","This field cannot be empty !!");
        return true;
    }
}
function validPhNo(number){
        //var number=$(id).get(0);
        var length=$(number).val().length;
    if(length > 0){
        var numbers = /^[0-9]+$/;
        if($(number).val().match(numbers)&& length===10)
        {
            $(number).css("border","1px solid rgb(11, 243, 116)");
        return false;
        }
        else
        {
        $(number).css("border","1px solid #ff0000").val("").attr("placeholder","phone no. should be 10 digits");
        return true;
        }
    }
    else{
        $(number).css("border","1px solid #ff0000").attr("placeholder","This field cannot be empty !!");
        return true;
    }
}
function validZip(number){
    //var number=$(id).get(0);
    var length=$(number).val().length;
    if(length > 0){
        var numbers = /^[0-9]+$/;
        var zero=/0{6}/;
        if($(number).val().match(numbers) && !(zero.test($(number).val())) && length===6)
        {
        $(number).css("border","1px solid rgb(11, 243, 116)");
        return false;
        }
        else
        {
        $(number).css("border","1px solid #ff0000").val("")
        .attr("placeholder","Zip code should be 6 digits and Not 6 0's");
        return true;
        }
    }
    else{
        $(number).css("border","1px solid #ff0000").attr("placeholder","Zip code cannot be empty !!");
        return true;
    }    
}
function validcountry(country){
    //var country=$(countryid).get(0);
    var status=$(country).attr('id');
    var id=status[0]+'countryerror';
    if($(country).val().length === 0){
        $("#"+id).text("*Country & State cannot be empty!!").css("display","block");
        return true;
    }
    else{
        $("#"+id).text("").val("");
        return false;
    }
}
function validPass(pass,repass){
    //var pass=$(passid).get(0);
    //var repass=$(repassid).get(0);
    if($(pass).val().length === 0 || $(repass).val().length === 0){
        if($(pass).val().length === 0){
            $(pass).css("border","1px solid #ff0000").attr("placeholder","This field cannot be empty !!");
        }
        if($(repass).val().length === 0){
            $(repass).css("border","1px solid #ff0000").attr("placeholder","This field cannot be empty !!");
        }
        return true;
    }
    else if($(pass).val() != $(repass).val()){
        $(pass).val("");
        $(repass).val("");
        $(pass).css("border","1px solid #ff0000").attr("placeholder","Passwords do not match !!");
        $(repass).css("border","1px solid #ff0000").attr("placeholder","Passwords do not match !! !!");
        return true;
    }
    else{
        $(pass).css("border","1px solid rgb(11, 243, 116)");
        $(repass).css("border","1px solid rgb(11, 243, 116)");
        return false;
    }
}
function validDate(date){
    //var date=$(id).get(0);
    if($(date).val()){
        var today = new Date();
        var day = today.getDate();
        var mon = today.getMonth()+1;
        var year = today.getFullYear();
        if(day<10){
                day="0"+day;
            } 
            if(mon<10){
                mon="0"+mon;
            }        
        today = year+"-"+mon+"-"+day;
        if( $(date).val() > today){
            $(date).css("border","1px solid #ff0000");
            $("#dateerror").text("*can't be future date!!").css("display","block");
            return true;
        } 
        else{
            $(date).css("border","1px solid rgb(11, 243, 116)");
            $("#dateerror").css("display","none");
            return false;
        }
    }
    else{
        $(date).css("border","1px solid #ff0000");
        $("#dateerror").text("*put date of birth!!").css("display","block");
        return true;       
    }    
}
