// var content= document.getElementById('heading');

// content.setAttribute('id','aa');


var courseApi= "http://localhost:3000/courses";

function  start(){
    getCourses(rederCourses);
    handlerCreate();
}

start();


function getCourses(callback){
    fetch(courseApi)
        .then(function(reponse){
            return reponse.json();
        })
        .then(callback)
        .catch()
}

function createCourse(data,callback1){
    var option={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data)
    }
    fetch(courseApi, option)
    .then(function(reponse){
        reponse.json();
    })
    .then (callback1)
        
     
}

function deleteCourse(id){
    var option={
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        
    }
    fetch(courseApi+'/'+id, option)
    .then(function(reponse){
        reponse.json();
    })
    .then (function(){
        var itemDeleted=document.querySelector('.courses-item-'+id)
        itemDeleted.remove();

    });  
}

function handleUpdateCourses(id){
    var btnCreate=document.querySelector('#create');
    btnCreate.id='update'
    btnCreate.textContent='Update'
    document.querySelector('input[name="name"]').value=id;
    document.querySelector('input[name="description"]').value=id;

}
function updateCourse(id){
    var option={
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        
    }
    fetch(courseApi+'/'+id, option)
    .then(function(reponse){
        reponse.json();
    })
    .then (function(id){
        var itemDeleted=document.querySelector('.courses-item-'+id)
        
    });  

}

 function rederCourses(courses){
    var listCoursesBlock= document.querySelector('#list-courses')
    var htmls= courses.map(function(course){
        return `
                <li class="courses-item-${course.id}">
                    <h4> ${course.Name}</h4>
                    <p> ${course.Description}</p>
                    <button onclick=deleteCourse(${course.id})>Xóa</button>
                    <button onclick=handleUpdateCourses(${course.id})> Sửa </button>
                </li>
                `;
    });
    listCoursesBlock.innerHTML=htmls.join('')

 }

  function handlerCreate(){
      var btnCreate= document.querySelector('#create');
      btnCreate.onclick= function(){
          var name = document.querySelector('input[name="name"]').value;
          var description = document.querySelector('input[name="description"]').value;
          var formData={
              Name:name,
              Description: description
          }
          createCourse(formData,function(){
            getCourses(rederCourses);
          })
      }
  }


  