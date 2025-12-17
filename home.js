document.addEventListener('DOMContentLoaded' , function(){
    const inputid = document.getElementById('username');
    const searchButton = document.getElementById('search');
    const stats = document.querySelector('.stats-container');
    const progress = document.querySelector('.progress');
    const progressstats = document.querySelectorAll('.progress-stats');
    const easy = document.querySelector('.easycircle');
    const medium = document.querySelector('.mediumcircle');
    const hard = document.querySelector('.hardcircle');
    const easyt = document.getElementById('easy');
    const mediumt = document.getElementById('medium');
    const hardt = document.getElementById('hard');
    
    function validateUsername(userid){
        if (userid.trim() === "") {
        alert("userID is empty");
        return false;
        }

        const regex = /^[a-zA-Z0-9_-]{3,16}$/; 
        const isMatch = regex.test(userid);
        if(!isMatch){
        alert('username not matching');
        }
        return isMatch;
    }

    async function fetchData(userid){
        const url = `https://leetcode-stats-api.herokuapp.com/${userid}`;
        try{
            searchButton.textContent ='Searching';
            searchButton.disabled  = true;

                const response = await fetch(url);
            if(!response.ok){
                throw new Error('appi not working');
            }
            const parsedData = await response.json();
            console.log("logging" , parsedData);

            userdata(parsedData);
        }
        catch(error){
            stats.innerHTML = '<p>no data found</p>'
            
        }
        finally{
            searchButton.textContent = 'Search'
            searchButton.disabled = false;
        }
    }

    function updateProgres(solved , total , label , circle){
            const progressAch = (solved/total)*100;
            circle.style.setProperty("--progress-degree", `${progressAch}%`);

            label.textContent = `${solved}/${total}`;

    }

    function userdata(parsedData){
        const totalQuestion = parsedData.totalQuestions;
        const totalEasy = parsedData.totalEasy;
        const totalMedium = parsedData.totalMedium;
        const totalHard = parsedData.totalHard;

        const totalSolved = parsedData.totalSolved;
        const easyQuestion = parsedData.easySolved;
        const mediumQuestion = parsedData.mediumSolved;
        const hardQuestion = parsedData.hardSolved;

        updateProgres(easyQuestion , totalEasy , easyt , easy )
        updateProgres(mediumQuestion , totalMedium , mediumt , medium )
        updateProgres(hardQuestion , totalHard , hardt , hard )

    }
    

    function adduser(){
        const userid = inputid.value;
        console.log("User name = " + userid);
        if(validateUsername(userid)){
            fetchData(userid);
        }
    }

    searchButton.addEventListener('click', adduser);

})