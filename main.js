song="";
leftWristx= 0;
leftWristy= 0;
rightWristx= 0;
rightWristy= 0;
scoreLeftWrist= 0;
scoreRightWrist= 0;


function preload()
{
    song=loadSound("music.mp3");
}

function setup()
{
    canvas=createCanvas(500,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    
    poseNet=ml5.poseNet(video,modalLoaded);
    poseNet.on('pose',gotPoses);
}

function draw()
{
    image(video,0,0,500,400);

    fill("#FF0000");
    stroke("#FF0000");

    circle(rightWristx,rightWristy,20);

    
    if(scoreLeftWrist>0.2)
    {
    circle(leftWristx,leftWristy,20);

    if(rightWristy>0 && rightWristy<=100)
    {
        document.getElementById("speed").innerHTML="Speed = 0.5x";
        song.rate(0.5);
    }

    else if(rightWristy>100 && rightWristy<=200)
    {
        document.getElementById("speed").innerHTML="Speed = 1.0x";
        song.rate(1.0);
    }

    else if(rightWristy>200 && rightWristy<=300)
    {
        document.getElementById("speed").innerHTML="Speed = 1.5x";
        song.rate(1.5);
    }

    else if(rightWristy>300 && rightWristy<=400)
    {
        document.getElementById("speed").innerHTML="Speed = 2.0x";
        song.rate(2.0);
    }

    else if(rightWristy>400 && rightWristy<=500)
    {
        document.getElementById("speed").innerHTML="Speed = 2.5x";
        song.rate(2.5);
    }

    inNumberleftWristy=Number(leftWristy);
    remove_decimal=floor(inNumberleftWristy);
    volume=remove_decimal/1000;
    volumeX=document.getElementById("volume").innerHTML="volume ="+volume;
    song.setVolume(volume);
    }
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("score for left wrist "+scoreLeftWrist);


        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("rightWristx = "+rightWristx+"rightWristy = "+rightWristy);
        
        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log("leftWristx = "+leftWristx+"leftWristy = "+leftWristy);
    }
}

function modalLoaded()
{
    console.log("Modal is initialized");
}


function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop()
{
    song.stop();
}

function pause()
{
    song.pause();

}