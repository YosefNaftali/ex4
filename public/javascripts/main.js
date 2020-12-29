
// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/'             : 'home'
    ,'/home'        : 'home'
    , '/about'      : 'about'
    , '/contactUs'   : 'contactUs'
    , '/branchManagement'   : 'branchManagement'
    , '/catalog'   : 'catalog'
    ,'/usersManagement':'usersManagement'
};
function senMailContactUs(){
    alert("mail sent seccessfuly");
}
function parseRequestURL(){
    console.log(location.hash);
    let url = location.hash.slice(1)|| '/';
    console.log(url);
    let r = url.split("/")
    console.log(r[0]);
    console.log(r[1]);
    let request = {
        resource    : null,
    }
    request.resource    = r[1]
    return request
}



$(document).ready(function(){
    
       //     
       let userDetails = {
        userName: '',
        password:'',
        type:''
        }
    console.log("111")
    
    // The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
    const router = async () => {
      console.log("async func");
    // Get the parsed URl from the addressbar
    let request = parseRequestURL()
    console.log("222")
    // Parse the URL 
    let parsedURL = (request.resource ? '/' + request.resource : '/') 

    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : 'Error404'

    let url = page+"?" + $.param({user: userDetails.userName, pass: userDetails.password})
   
    console.log(url);
    //render the page
    $("#midllePart").load("/"+url, function(responseTxt, statusTxt, xhr){
      console.log("load page");
        if(statusTxt == "error")
         alert("Error: " + xhr.status + ":blablablabla " + xhr.statusText);
         return;
         });
    }
    // Listen on hash change:
    window.addEventListener('hashchange', router);
    // Listen on page load:
    window.addEventListener('load', router);
    //load the home page
    $("#midllePart").load("home", function(responseTxt, statusTxt, xhr){
        if(statusTxt == "error")
         alert("Error: " + xhr.status + ": " + xhr.statusText);
         });
    
 

    $("#logout").hide();
    $("#catalog").hide();
    $("#usersMan").hide();
    $("#branchMan").hide();
    
    $("#loginBtn").on('click', function(event){
     
        //Check the information
        let userName= $("#userName").val();
        let password = $("#password").val();
        if(userName == ''){
     //       $('#modalLoginForm').modal('show');   TO-DO why its not show
            alert("Please Enter Oser Name");
      //      $('#modalLoginForm').modal('show');
      //      console.log("modal shude open but its not.....?")
            return;
        }else if(password ==''){
            alert("Please Enter Password");
            return;
        }
        let data = {userName: userName, password:password};
        

        //Send login msg
        let login = (async function() {
            console.log("ad kan 00000")
            try {
                let response = await fetch('/login',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(data),
                });
                console.log("ad kan 11111")
                
                let json = await response.json();

                console.log(JSON.stringify (json))

                if(json.message === "User Name Not Exsist"){
                    alert(json.message)
                }else if(json.message === "Wrong Password"){
                    alert(json.message)
                }else if(json.message === "Succesfull"){
                    $("#login").hide();
                    $("#logout").show();
                    $("#catalog").show();
                    $("#userName").val('');
                     $("#password").val('');
                    userDetails.userName = data.userName;
                    userDetails.password = data.password;
                    userDetails.type = json.type;
                    //premissions
                    console.log("1111111111111111111"+JSON.stringify(userDetails.type).toString())
                    console.log("222222222222"+JSON.stringify("manager").toString())
                    if(JSON.stringify(userDetails.type).toString()===JSON.stringify("manager").toString()){
                    $("#branchMan").show();
                    $("#usersMan").show();
                    }
                    if(JSON.stringify(userDetails.type).toString()===JSON.stringify("worker").toString()){
                        $("#usersMan").show();
                    }
              
                }

              }
              catch(e) {
                console.log("im in error");
                console.log('Error!', e);
              }
          })();
            
        console.log("im Clicked")
        $('#modalLoginForm').modal('hide');
    })

    //on click logout
    $('#logout').click(function(e) { 
        $("#logout").hide();
        $("#catalog").hide();
        $("#usersMan").hide();
        $("#branchMan").hide();
        userDetails.type = '';
        userDetails.userName = '';
        userDetails.password = '';
        $("#bodyofpage").load("home", function(responseTxt, statusTxt, xhr){
            if(statusTxt == "error")
             alert("Error: " + xhr.status + ": " + xhr.statusText);
             });
        $("#login").show();
    });


});