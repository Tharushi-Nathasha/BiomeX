

//To display image and the image description when hovering
function display(image){
	let largeImg = document.getElementById("expandedImage");
	largeImg.src = image.src;

    if (image.id == "img1"){						
		document.getElementById("description").innerHTML = document.getElementById("des1").innerHTML;			
	}else if(image.id == "img2"){
	document.getElementById("description").innerHTML = document.getElementById("des2").innerHTML;
	}else if(image.id == "img3"){
		document.getElementById("description").innerHTML = document.getElementById("des3").innerHTML;
	}else if(image.id == "img4"){
		document.getElementById("description").innerHTML = document.getElementById("des4").innerHTML;
	}else if(image.id == "img5"){
		document.getElementById("description").innerHTML = document.getElementById("des5").innerHTML;
	}else if(image.id == "img6"){
		document.getElementById("description").innerHTML = document.getElementById("des6").innerHTML;
	}else {
		document.getElementById("description").innerHTML = "";
    }
    largeImg.parentElement.style.display = "block";
}

document.addEventListener('DOMContentLoaded', function() {
    var colorSelect = document.getElementById('color');
    var largeImage = document.querySelector('.largeImage');

    colorSelect.addEventListener('change', function() {
        var selectedColor = this.value;
        largeImage.style.backgroundColor = selectedColor;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var fontSelect = document.getElementById('font');
    var largeImage = document.querySelector('#description');

    fontSelect.addEventListener('change', function() {
        var selectedFont = this.value;
        largeImage.style.fontFamily = selectedFont;
    });
});

const largeElemet =document.querySelector('.largeImage');
const closeIcon = document.getElementById('close-icon');

closeIcon.addEventListener('click',()=>{
    largeElemet.style.display="none"
})