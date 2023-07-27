//here we define all the expense methods which has to dsiplayed in the browser.
let amount=document.getElementById("amount");
let description=document.getElementById("description");
let category=document.getElementById("category");
let button=document.getElementById("press");
let error=document.getElementById("error");
let parentNode=document.getElementById("allExpenses");
//let parentSelectNode = document.getElementById("selecting");
let btn = document.getElementById("premium");
let paginationBtn = document.getElementById("page");


//token decoder
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function showPremiumButton(){
    
    btn.style.visibility="hidden";
    const element = document.createElement("h6");
    const text = document.createTextNode("You are a Premium User.");
    element.appendChild(text);
    const heading = document.getElementById("heading");
    heading.appendChild(element);
    //showDownloadButton();
}

async function showLeaderboard(){
    try{
        const inputElement = document.createElement("input");
        inputElement.type = "button";
        inputElement.value = "Show Leaderboard";
        console.log(inputElement);

        inputElement.onclick = async()=>{
            
                const token = localStorage.getItem("token");
                const userLeaderboardArray= await axios.get("http:/localhost:3500/leaderboard",{headers:{"Authorization": token}});
                console.log(userLeaderboardArray);

                var leaderboardElem = document.getElementById("board");
                leaderboardElem.innerHTML += `<h1>LeaderBoard</h1>`
                userLeaderboardArray.data.forEach((userDetails)=>{
                    leaderboardElem.innerHTML += `<li>Name-${userDetails.name} TotalExpense-${userDetails.totalExpense}</li>`;
                
                })
               
            }
            document.getElementById("message").appendChild(inputElement);
            
            }
            catch(err){
                console.log(err);
            }
           

}

async function showDownloadButton(){
    try{
        //const id = req.params.id;
        const element = document.createElement("input");
        element.type="button";
        element.value="Download expense";
        console.log(element);
        
        element.onclick = async()=>{
                //e.preventDefault();
                const token = localStorage.getItem('token');
                const downloaded = await axios.get(`http://localhost:3500/download`,{headers:{"Authorization": token}});
                console.log(downloaded);
                if(downloaded.data.success===true){
                    var a = document.createElement("a");
                    a.href = downloaded.data.fileUrl;
                    a.download = "myexpense.csv";
                    a.click();
        
                }else{
                    console.log(downloaded.data.msg);
                }
                
            }
        document.getElementById("expenseDownloadButton").appendChild(element);
    }catch(err){
        console.log(err);

    }
    
    
    
}



//fetch all the expensedata  using get service
window.addEventListener("DOMContentLoaded", async()=>{
    try{
        const token = localStorage.getItem('token');
        const decodeToken = parseJwt(token);
        console.log(decodeToken);
        const isPremium = decodeToken.isPremium;
        //console.log(isPremium);
        
       if(isPremium === true){
       
        showPremiumButton();
        showLeaderboard();
        showDownloadButton();
        localStorage.setItem('token', token);
        
       }
       pagination();
    
       
    
        
    }catch(err){
        console.log({Error: err});
        console.log("Error in DOM CONTENT!!");
    }
})

// paginationBtn.addEventListener("click", async(e) =>{
async function pagination(){
    try{
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3500/expenses",{headers: {"Authorization": token}})
        //console.log(response.data.allExpense);
        var pagination = document.getElementById("pagination");
        const pagesize=document.getElementById("pagesize");
        var totalPagesize = localStorage.getItem("pageSize");
        const totalPage = Math.ceil((response.data.allExpense.length)/totalPagesize);
        // for(let i=0;i<response.data.allExpense.length;i++){
        //     showBrowser(response.data.allExpense[i]);
        // }
        console.log("This is >>>>>>>>>>>>>>>>>>>>>>>>>>>>", totalPage);
        if(!totalPagesize){
            localStorage.setItem("pageSize", 5);
        }

        

        const result = await axios.get(`http://localhost:3500/pagination?page=${1}&pagesize=${totalPagesize}`,{headers: {"Authorization": token}});
        let allExpense = result.data.Data;
        console.log("Length>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", allExpense.length);
        for(let i=0;i<allExpense.length;i++){
            showBrowser(result.data.Data[i]);
        }


        for(let i=0;i<totalPage;i++){
            let page=i+1;
            button = document.createElement("button");
            button.innerHTML=i+1;
            button.onclick = async()=>{
                parentNode.innerHTML = "";
                const ress = await axios.get(`http://localhost:3500/pagination?page=${page}&pagesize=${totalPagesize}`,{headers: {"Authorization": token}});
                let allExpense = ress.data.Data;
                console.log("Expense legth>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..", allExpense.length);
                for(let i=0;i<allExpense.length;i++){
                    showBrowser(ress.data.Data[i]);
                }        
            } 
            pagination.appendChild(button);

        }
        pagesize.value="";

    }catch(err){
        console.log(err);
    }
    

}

function showBrowser(show){

    const pagesize=document.getElementById("pagesize")
        pagesize.addEventListener("click",()=>{
            localStorage.setItem("pageSize",pagesize.value)
            //window.location.reload()
           })

    //console.log(show);
    var childNode=`<li id=${show._id} style="margin-bottom:10px;">${show.description}-${show.amount}-${show.category}
             <button onclick="deleteExpense('${show._id}')" style="float:right; margin-left:5px;">Delete</button>  
             
                     </li>`
                     parentNode.innerHTML=parentNode.innerHTML+childNode;

}

//delete the expense

async function deleteExpense(key){
    try{
        console.log(parentNode)
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3500/expenses/${key}`,{headers: {"Authorization": token}})
        console.log("Entered Deleted DOM");
        let child = document.getElementById(key);
        //console.log(child);
        parentNode.removeChild(child);
    }catch(err){
        console.log(err);
    }
    

}

//storing the data on the database
button.addEventListener("click", async(e)=>{
    try{
        e.preventDefault();
        const token = localStorage.getItem("token");
        const decodeToken = parseJwt(token);    
    //store the values in the object
    myObj={
        description: description.value,
        amount:amount.value,
        category:category.value,
        userId: decodeToken.userId
    };
    console.log(myObj);
    
    const addExpense = await axios.post("http://localhost:3500/expenses",myObj,{headers:{'Authorization': token}})
        //console.log(response);
        console.log("post -->", addExpense.data.newexpense);
        showBrowser(addExpense.data.newexpense);
        //Making the input box empty
        description.value="";
        amount.value="";
        category.value="";
    }catch(err){
        console.log(err);
    } 
})

//premium button code
document.getElementById("premium").onclick = async function(e){
    try{
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3500/premiummembership',{headers:{"Authorization": token}});
    console.log(response);
    var options = {
        "key": response.data.key_id,
        "order_id": response.data.orderr.id,
        "handler": async function(response){
            let result = await axios.post("http://localhost:3500/updatetransactionstatus",{
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
        },{headers: {"Authorization": token}})

        alert("Your are a premium user now");
        
        localStorage.setItem('token', result.data.token);
        
        showPremiumButton();
        
        showLeaderboard(); 
        showDownloadButton();
        
           
           
        }
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on("payment.failed", async()=>{
        key = response.data.order.id;
        let failed = await axios.post("http://localhost:3500/updatetransactionstatus",{
            order_id: key,
            payment_id: null
        },{headers: {"Authorization": token}})
        console.log(failed.data.msg);
        alert("Somthing went wrong");
    });
}catch(err){
    console.log(err);
}
}



