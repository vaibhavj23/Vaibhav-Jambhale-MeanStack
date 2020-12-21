var table="";
function getData()
{
    document.getElementById("show").disabled=false;
    var name=document.getElementById("name").value;
    var email=document.getElementById("email").value;
    var cb1=document.getElementById("extra_cheese");
    var cb2=document.getElementById("peperoni");
    var cb3=document.getElementById("olives");
    var cb4=document.getElementById("pepper");
    var cb5=document.getElementById("bacon");
    var cb6=document.getElementById("tomatoes");
    var cb7=document.getElementById("mushrooms");
    
    var getpizzaby=document.getElementsByName("getpizza");
    var delivery_option="";
    for(i=0;i<getpizzaby.length;i++)
    {
        if(getpizzaby[i].checked)
        {
            delivery_option=getpizzaby[i].value;
        }
    }

    var tip=Number(document.getElementById("tip").value);
    var address=document.getElementById("address").value;
    var toppings=[cb1,cb2,cb3,cb4,cb5,cb6,cb7]
    var toppings_value=[];
    no_of_toppings=0;
    for(j=0;j<7;j++)
    {
        if(toppings[j].checked)
        {
            no_of_toppings++;
            toppings_value.push(toppings[j].value);
        }
    }
    var delivery_cost=0;
    var cost=0;
    if(delivery_option=="yes")
    {
        delivery_cost=5;
    }
    cost=(10+(1.5*no_of_toppings)+delivery_cost)*(1+(tip/100));

    
    table="<table><caption> Pizza Order Summary</caption>";
    table=table+"<tr><th>Name: </th><td>"+name+"</td></tr>";
    table=table+"<tr><th>Email: </th><td>"+email+"</td><tr>";
    table=table+"<tr><th>Toppings: </th></tr>";

    for(k=0;k<no_of_toppings;k++)
    {
        table=table+"<tr><th>Topping: </th><td>"+toppings_value[k]+"</td><tr>";
    }

    table=table+"<tr><th>Delivery ?: </th><td>"+delivery_option+"</td><tr>";
    table=table+"<tr><th>Tip Amount: </th><td>"+tip+"%</td><tr>";
    table=table+"<tr><th>Address: </th><td>"+address+"</td><tr>";
    table=table+"<tr><th>Total: </th><td>Rs "+cost+"</td><tr>";
    

    return false;
    
}

function showSummary()
{
    document.getElementById("table").innerHTML=table;
    console.log(table);
}

function helptext()
{
    document.getElementById("help").innerHTML="hover over items to find what to do";
}
function myOverFunction1()
{
    document.getElementById("help").innerHTML="Enter your name here.";
}
function myOverFunction2()
{
    document.getElementById("help").innerHTML="Enter your email here";
}
function myOverFunction3()
{
    document.getElementById("help").innerHTML="choose toppings you want on pizza";
}
function myOverFunction4()
{
    document.getElementById("help").innerHTML="choose do you want delivery or not";
}
function myOverFunction5()
{
    document.getElementById("help").innerHTML="choose amount of tip you want to give";
}
function myOverFunction6()
{
    document.getElementById("help").innerHTML="Enter your address here.";
}
function myOverFunction7()
{
    document.getElementById("help").innerHTML="click this button to submit";
}
function myOverFunction8()
{
    document.getElementById("help").innerHTML="click this button to reset.";
}
function myOverFunction9()
{
    document.getElementById("help").innerHTML="click this button to show summary of order.";
}

