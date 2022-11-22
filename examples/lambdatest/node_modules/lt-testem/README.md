
==========================

This library allows you to integrate your javascript test results into a [lambdatest results page](https://automation.lambdatest.com/).

It's available for running QUnit, Jasmine and Mocha tests through various browsers hosted on LambdaTest.


Instructions
------------

1. Get a [LambdaTest](https://lambdatest.com/) account.
2. Make sure lambdatest credentials are set in env:
    * **LT_USERNAME** - your LambdaTest username
    * **LT_ACCESS_KEY** - your LambdaTest API/Access key.
3. run npm install testem -g.
4. Run `testem ci --port 8080` to run it on all the listed browsers - see `testem launchers` for the full list.
    * *It will take a while at the first time. This will only happen once to download the exe of lambdatest tunnel*
