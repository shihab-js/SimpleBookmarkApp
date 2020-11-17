const siteName = document.getElementById("siteName");
const siteUrl = document.getElementById("siteUrl");

const addSite = document.getElementById("addSite");

addSite.addEventListener('click',fatchData);


function fatchData(e){
    e.preventDefault();
    var sName = siteName.value;
    var sUrl = siteUrl.value;

    var bookmark = {
        name : sName,
        url : sUrl
    }

   /*
    localStorage.setItem('test','google');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */

    if(localStorage.getItem('bookmarks') === null){
        //init array
        var bookmarks = [];
        //add to array
        bookmarks.push(bookmark);
        //set the local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        
    }else{
        //Get bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add bookmarks to array
        bookmarks.push(bookmark);
        //Re-set back to localstorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
        
    }

    document.getElementById("inputForm").reset();
    showBookmarks();
    
}

//retrive and show all book marks
function showBookmarks() {
    //Get the bookmarks from local storage
    var bookmark = JSON.parse(localStorage.getItem('bookmarks'));
    var boomarksResult = document.getElementById("boomarksResult");

    boomarksResult.innerHTML = "";

    //make output
    for (let i = 0; i < bookmark.length; i++) {
        var name = bookmark[i].name;
        var url = bookmark[i].url;
        
        boomarksResult.innerHTML +=`<div class="well"><h3>${name} <a class="btn btn-default" target="_blank" href="${url}">Quick visit</a>
                                    <a onclick="deleteBookmark('${url}')" class="btn btn-danger" href="#">Delete bookmark</a></h3></div> `;

    }


}

function deleteBookmark(url){
    var bkmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for (var i=0; i<bkmarks.length; i++){
        if(bkmarks[i].url == url){
            bkmarks.splice(i,1);
        }
    }
    //reset the local storage
    localStorage.setItem('bookmarks', JSON.stringify(bkmarks));
    // agin call showBookmark to update
    showBookmarks()
}



