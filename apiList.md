# dev connect apis

## auth router
-POST /signup
-POST /login
-POST /logout

## profile router
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

## /connectionRequestRouter
//-POST /request/send/:status/:userId
//-POST /request/review/:status/:requestId

## userRouter
-GET /user/requests/received
-GET /user/connections
-GET /user/feed (gets other profiles on platform)





status:ignored,intrested,accepted,rejected