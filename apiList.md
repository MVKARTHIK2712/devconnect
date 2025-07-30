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
-POST /request/send/intrested/:userId
-POST /request/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

## userRouter
-GET /user/connections
-GET /user/request/received
-GET /user/feed (gets other profiles on platform)





status:ignored,intrested,accepted,rejected