import { useState, useEffect, useContext } from 'react';



const App = ({}) => {
  // const state = useContext(StateContext);
  const [username, setUserName] = useState('');
  const [userId, setUserId] = useState(-1);
  const [tweets, setTweets] = useState({});

  const checkUserAPI = async () => {
    var apiResponse = {};
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    if(username==''){
      return {};
    }
    await fetch('http://127.0.0.1:5000/checkuser/'+username, requestOptions)
    .then(async response => {
        const resp = await response.json();
        if (response.status === 200) {
          apiResponse = resp
        } else {
            console.log("Error with API")
        }
    })  
    .catch(error => {
        console.log(error);
    });
    console.log(apiResponse);
    return apiResponse;
  }

  const checkUser = async () => {
    const apiResponse = await checkUserAPI();
    
    if ("data" in apiResponse) {
      setUserId(apiResponse['data']['id']);
      // getTweetsAPI();

    } else {
      setUserId(-1);
      console.log('User not found');
    }
    console.log(userId);

  }

  const getTweetsAPI = async () => {
    var apiResponse = {};
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    await fetch('http://127.0.0.1:5000/getLatestTweets/'+userId, requestOptions)
    .then(async response => {
        const resp = await response.json();
        if (response.status === 200) {
          apiResponse = resp
        } else {
            console.log("Error with API")
        }
    })  
    .catch(error => {
        console.log(error);
    });
    console.log(apiResponse);
    setTweets(apiResponse);
    // var tweetsArray = []
    // for (let x in apiResponse['data']) {
    //   txt += numbers[x];
    // }
    const fileName = "tweets";
    const json = JSON.stringify(apiResponse);
    const blob = new Blob([json],{type:'application/json'});
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // return apiResponse;
  }

  const downloadFile = async () => {
    const fileName = "tweets";
    const json = JSON.stringify(tweets);
    const blob = new Blob([json],{type:'application/json'});
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return (
      <div>
        <button><a href={href} download={fileName + ".json"}>Download Tweets</a></button>
      </div>
    )

  }

  return (
    <div>
      <input type="text" placeholder="Enter user name" value={username} onInput={(e) => setUserName(e.target.value)}></input>
      <button onClick={checkUser}>Check</button>
      {userId !== -1 ? 
      <div>
        <p>User Found</p>
        <button onClick={getTweetsAPI}>Get latest Tweets</button>
      </div>
      : <p></p>}
    </div>
  );
  }

export { App }; 