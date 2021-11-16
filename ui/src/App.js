import { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Button, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';


const App = ({ }) => {
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
    if (username === '') {
      return {};
    }
    await fetch('http://127.0.0.1:5000/checkuser/' + username, requestOptions)
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
    await fetch('http://127.0.0.1:5000/getLatestTweets/' + userId, requestOptions)
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

    const fileName = "tweets";
    const json = JSON.stringify(apiResponse);
    const blob = new Blob([json], { type: 'application/json' });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }

  return (
    <Container className="input-pad" fluid="md">
      <Row className="justify-content-md-center">
        <Col lg={true}>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <FormControl
            placeholder="Enter user name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={username} onInput={(e) => setUserName(e.target.value)}
          />
          <Button variant="primary" onClick={checkUser}>Check</Button>
        </InputGroup>
          {userId !== -1 ?
            <div>
              <p className="large-font">User Found</p>
              <Button variant="success" onClick={getTweetsAPI}>Get latest Tweets</Button>{' '}
            </div>
            : <p></p>}
        </Col>
      </Row>
    </Container>
  );
}

export { App };