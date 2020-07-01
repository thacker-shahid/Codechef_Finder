
let clickBtn1 = document.getElementById("enterBtn");
clickBtn1.addEventListener('click', userProfile1);
    
 async function userProfile1() {

    let username = $('.text-field1')[0].value;
    let result = document.getElementById("result1");
    result.style.display = 'block';
    document.getElementById('loading').style.display = 'block'; 

        let response = await fetch(`https://competitive-coding-api.herokuapp.com/api/codechef/${username}`)
        let data = await response.json();


        if(data){
            document.getElementById('loading').style.display = 'none'; 
        }
       
        if (data.status === 'Success') 
           {
            document.querySelector('#NoUsers1AreThere').style.display = 'none';
            show(data);
           } 
        else if(data.status != 'Success'){
             alert("Oops Some Internal Error Occured for first user !!");
           }    
    }
     


            function show(data){
                let string1 = `
                        <div class="container baap  my-5">
                            <div class="card badaCard" style="width: 20rem; border: none;">
                                <div class="card-header text-center">
                                    <h1>${data.stars}</h1>
                                    <h3>${data.rating}</h3>
                                    <h5>${data.global_rank}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${data.country_rank}</h5>
                                    <p>Global Rank&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Country Rank</p>
                                 </div>
                
                                <div class="card-body text-center" style="width: 20rem; border: none;">
                                  <table class="text-center mr-auto" style="width: 18rem;">
                                        <tr>
                                            <th>Contest</th>
                                            <th>Rating</th>
                                            <th>Global Rank</th>
                                            <th>Country Rank</th>
                                        </tr>
                                        <tr style="text-align:center">
                                            <td>Long challenge</td>
                                            <td>${data.contests[0].rating}</td>
                                            <td>${data.contests[0].global_rank}</td>
                                            <td>${data.contests[0].country_rank}</td>
                                        </tr>
                                        <tr style="text-align:center">
                                            <td>Cook-Off</td>
                                            <td>${data.contests[0].rating}</td>
                                            <td>${data.contests[0].global_rank}</td>
                                            <td>${data.contests[0].country_rank}</td>
                                        </tr>
                                        <tr style="text-align:center">
                                            <td>Lunch-Time</td>
                                            <td>${data.contests[0].rating}</td>
                                            <td>${data.contests[0].global_rank}</td>
                                            <td>${data.contests[0].country_rank}</td>
                                        </tr>
                                  </table>
                                  <hr>

                                  <div class="card-body text-center" style="width: 20rem; border: none;">
                                  <h3 class="my-3" style="text-align: left;">User Details:-</h3>
                               <table class="text-center" style="width: 18rem;">
                                     
                                     <tr style="text-align:center">
                                         <td><strong>Name:</strong></td>
                                         <td>${data.user_details.name}</td>
                                     </tr>
                                  
                                     <tr style="text-align:center">
                                         <td><strong>Username:</strong></td>
                                         <td>${data.user_details.username}</td>                                         
                                     </tr>

                                     <tr style="text-align:center">
                                          <td><strong>About me:</strong></td>
                                          <td>${data.user_details.country}</td>
                                    </tr>

                                     <tr style="text-align:center">
                                         <td><strong>Country:</strong></td>
                                         <td>${data.user_details.state}</td>                                         
                                     </tr>

                                     <tr style="text-align:center">
                                         <td><strong>State:</strong></td>
                                         <td>${data.user_details.city}</td>
                                    </tr> 
                               </table>
                               <hr>

                                <h3 class="my-3" style="text-align: left;">Problem Solved:-</h3>
                                <h5 style="text-align: left;">Fully Solved(${data.fully_solved.count}):-</h5>
                                <br>
                                `;
                                
// ============================== fully Solved ==============================

                            let html1 ="";
                             for(const[name,url] of Object.entries(data.fully_solved))
                             {
                                 if( name==="count")
                                 continue;

                                let s=`
                                    <h6 style="text-align: left;">${name}</h6> 
                                        `;

                                    let html2 ="";
                                    for(let data of url)
                                    {
                                        let s1 =`
                                            <div>
                                            <a href= "${data.link}" class="badge badge-success">${data.name}</a>
                                            </div>
                                                `;
                                    html2 +=s1;
                                    }
                                    html1 += s+ html2;
                            }

                            html1 += `
                                    <hr>
                                    <h5 class="my-3" style="text-align: left;">Partially Solved(${data.partially_solved.count}):-</h5>
                                    `;

                        
// ============================ Partially Solved =========================

                            let html3 ="";
                            for(const[name,url] of Object.entries(data.partially_solved))
                             {
                                if( name==="count")
                                 continue;

                                let s2 =`
                                <h6 style="text-align: left;">${name}</h6> 
                                    `;
                                    let html4 ="";
                                for(let data of url)
                                {
                                    let s3 =`
                                    <div>
                                      <a href= "${data.link}" class="badge badge-danger">${data.name}</a>
                                    </div>
                                 `;
                                 html4 +=s3;
                                }
                                html3 += s2 +html4;
                             }

                             html3 += `
                             <hr>
                            <h3 class="my-3" style="text-align: left;"> Contests:-</h3>
                            <br>
                        `;

                    let html4="";
                        for(let index=0;index<data.contest_ratings.length;++index)
                        {
                        let s4 =`
                        <div class="container card mt-2" style="width: 18rem;">
                            <div class="card-header text-center">
                                <h5>${data.contest_ratings[index].name}</h5><br>
                                <h6>${data.contest_ratings[index].code}</h6>
                            </div>
                            <div class="card-body">
                            <p>Rating:- ${data.contest_ratings[index].rating}</p> 
                            <p>Rank:- ${data.contest_ratings[index].rank}</p>
                            <p>End Date:- ${data.contest_ratings[index].end_date}</p>
                            </div>
                        </div>`;
                        html4+=s4;
                    };

                let result = document.querySelector("#result1");
                result.innerHTML = string1 + html1 +html3 + html4 +`</div></div>`;
           }

                       

   


  
  









// let clickBtn1 = document.getElementById("enterBtn");
// clickBtn1.addEventListener('click', userProfile1);

// let username1 = $('.text-field1')[0].value;
    
//  function userProfile1() {


//     let username = $('.text-field1')[0].value;

//     let result = document.getElementById("result1");
//     result.style.display = 'block';
//     fetch(`https://competitive-coding-api.herokuapp.com/api/codechef/${username}`)
//         .then(function (res) {

//             return res.json();
//         })

//         .then(function (data) {
             
//             if(data){
//                 let loading = document.getElementById("loading");
//                 loading.style.display = 'block';
//             }
            

//             let html = "";
//             if (data.status === 'Success') 
//            {
//             document.querySelector('#NoUsers1AreThere').style.display = 'none';
//             show(data);
//            } 
//            else if(data.status != 'Success'){
//              alert("Oops Some Internal Error Occured for first user !!");
//         }
            
//     });
     
// } 


//                 function show(data){

//                 let string1 = `
//                         <div class="container baap  my-5">
//                             <div class="card badaCard" style="width: 20rem; border: none;">
//                                 <div class="card-header text-center">
//                                     <h1>${data.stars}</h1>
//                                     <h3>${data.rating}</h3>
//                                     <h5>${data.global_rank}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${data.country_rank}</h5>
//                                     <p>Global Rank&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Country Rank</p>
//                                  </div>
                
//                                 <div class="card-body text-center" style="width: 20rem; border: none;">
//                                   <table class="text-center mr-auto" style="width: 18rem;">
//                                         <tr>
//                                             <th>Contest</th>
//                                             <th>Rating</th>
//                                             <th>Global Rank</th>
//                                             <th>Country Rank</th>
//                                         </tr>
//                                         <tr style="text-align:center">
//                                             <td>Long challenge</td>
//                                             <td>${data.contests[0].rating}</td>
//                                             <td>${data.contests[0].global_rank}</td>
//                                             <td>${data.contests[0].country_rank}</td>
//                                         </tr>
//                                         <tr style="text-align:center">
//                                             <td>Cook-Off</td>
//                                             <td>${data.contests[0].rating}</td>
//                                             <td>${data.contests[0].global_rank}</td>
//                                             <td>${data.contests[0].country_rank}</td>
//                                         </tr>
//                                         <tr style="text-align:center">
//                                             <td>Lunch-Time</td>
//                                             <td>${data.contests[0].rating}</td>
//                                             <td>${data.contests[0].global_rank}</td>
//                                             <td>${data.contests[0].country_rank}</td>
//                                         </tr>
//                                   </table>
//                                   <hr>

//                                   <div class="card-body text-center" style="width: 20rem; border: none;">
//                                   <h3 class="my-3" style="text-align: left;">User Details:-</h3>
//                                <table class="text-center" style="width: 18rem;">
                                     
//                                      <tr style="text-align:center">
//                                          <td><strong>Name:</strong></td>
//                                          <td>${data.user_details.name}</td>
//                                      </tr>
                                  
//                                      <tr style="text-align:center">
//                                          <td><strong>Username:</strong></td>
//                                          <td>${data.user_details.username}</td>                                         
//                                      </tr>

//                                      <tr style="text-align:center">
//                                           <td><strong>About me:</strong></td>
//                                           <td>${data.user_details.country}</td>
//                                     </tr>

//                                      <tr style="text-align:center">
//                                          <td><strong>Country:</strong></td>
//                                          <td>${data.user_details.state}</td>                                         
//                                      </tr>

//                                      <tr style="text-align:center">
//                                          <td><strong>State:</strong></td>
//                                          <td>${data.user_details.city}</td>
//                                     </tr> 
//                                </table>
//                                <hr>

//                                 <h3 class="my-3" style="text-align: left;">Problem Solved:-</h3>
//                                 <h5 style="text-align: left;">Fully Solved(${data.fully_solved.count}):-</h5>
//                                 <br>
//                                 `;
                                
// // ============================== fully Solved ==============================

//                             let html1 ="";
//                              for(const[name,url] of Object.entries(data.fully_solved))
//                              {
//                                  if( name==="count")
//                                  continue;

//                                 let s=`
//                                     <h6 style="text-align: left;">${name}</h6> 
//                                         `;

//                                     let html2 ="";
//                                     for(let data of url)
//                                     {
//                                         let s1 =`
//                                             <div>
//                                             <a href= "${data.link}" class="badge badge-success">${data.name}</a>
//                                             </div>
//                                                 `;
//                                     html2 +=s1;
//                                     }
//                                     html1 += s+ html2;
//                             }

//                             html1 += `
//                                     <hr>
//                                     <h5 class="my-3" style="text-align: left;">Partially Solved(${data.partially_solved.count}):-</h5>
//                                     `;

                        
// // ============================ Partially Solved =========================

//                             let html3 ="";
//                             for(const[name,url] of Object.entries(data.partially_solved))
//                              {
//                                 if( name==="count")
//                                  continue;

//                                 let s2 =`
//                                 <h6 style="text-align: left;">${name}</h6> 
//                                     `;
//                                     let html4 ="";
//                                 for(let data of url)
//                                 {
//                                     let s3 =`
//                                     <div>
//                                       <a href= "${data.link}" class="badge badge-danger">${data.name}</a>
//                                     </div>
//                                  `;
//                                  html4 +=s3;
//                                 }
//                                 html3 += s2 +html4;
//                              }

//                              html3 += `
//                              <hr>
//                             <h3 class="my-3" style="text-align: left;"> Contests:-</h3>
//                             <br>
//                         `;

//                     let html4="";
//                         for(let index=0;index<data.contest_ratings.length;++index)
//                         {
//                         let s4 =`
//                         <div class="container card mt-2" style="width: 18rem;">
//                             <div class="card-header text-center">
//                                 <h5>${data.contest_ratings[index].name}</h5><br>
//                                 <h6>${data.contest_ratings[index].code}</h6>
//                             </div>
//                             <div class="card-body">
//                             <p>Rating:- ${data.contest_ratings[index].rating}</p> 
//                             <p>Rank:- ${data.contest_ratings[index].rank}</p>
//                             <p>End Date:- ${data.contest_ratings[index].end_date}</p>
//                             </div>
//                         </div>`;
//                         html4+=s4;
//                     };

//                 let result = document.querySelector("#result1");
//                 result.innerHTML = string1 + html1 +html3 + html4 +`</div></div>`;
//            }

                       

   


  
  
