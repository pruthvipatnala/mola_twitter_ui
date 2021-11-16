import requests
import os
import json
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# bearer_token = os.environ.get("BEARER_TOKEN")
bearer_token = "AAAAAAAAAAAAAAAAAAAAAKhUVwEAAAAAhVKm6JRFFWBm3JoSuMzRUOM6HiE%3Dufbv9u4piqhcG0crrJaYRir5HBakrgh9apV2nFshmbQsnfXWbH"

def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """

    # r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["Authorization"] = "Bearer " + bearer_token
    r.headers["User-Agent"] = "v2UserCheckPython"
    return r

@app.route('/checkuser/<name>')
def check_user(name):

    search_url = "https://api.twitter.com/2/users/by/username/"+name
    response = requests.get(search_url, auth=bearer_oauth)
    return response.json()

@app.route('/getLatestTweets/<userId>')
def get_latest_tweets(userId):

    search_url = "https://api.twitter.com/2/users/"+str(userId)+"/tweets"
    response = requests.get(search_url, auth=bearer_oauth)
    return response.json()


if __name__ == '__main__':
   app.run()
