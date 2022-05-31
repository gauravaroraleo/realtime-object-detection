function setup(){
    c1=createCanvas(640,420);
    c1.center()
    v1=createCapture(VIDEO)
    v1.hide()
   
}
status=""
objects=[]
function modelLoaded(){
    console.log("modeel iis loadeedss")
status=true
    
    
}
function start(){
        myModel=ml5.objectDetector('cocossd',modelLoaded)
 document.getElementById("status").innerHTML="Status: Detecting Objects"
    
}
function gotResult(error,results){
    if(error){console.log(error)}
else{
console.log(results)    
    objects=results
}    
}

function draw(){
    image   (v1,0,0,640,420);
    if(status != ""){
        r=random(255)
        g=random(255)
        b=random(255)
        myModel.detect(v1,gotResult)
        for(i=0; i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Detected Objects"
            document.getElementById("number").innerHTML="Number Of Objects Detected: "+objects.length
            p=floor(objects[i].confidence*100);
            fill(r,g,b)
            text(objects[i].label+" "+p+" %",objects[i].x,objects[i].y)
            noFill()
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height   )
            
        }
        
    }
}